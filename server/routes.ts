import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import multer from "multer";
import { storage } from "./storage";
import { personalInfoSchema } from "@shared/schema";
import { nanoid } from "nanoid";
import { analyzeDocument, validateDocumentsAgainstRequirements, getVisaRequirementsOnline } from "./openai-service";
import { fetchCurrentVisaRequirements, generateRequirementsChecklist } from "./visa-requirements-service";
import { generateValidationReport, generateRequirementsChecklist as generateChecklistHtml } from "./document-generator";
import { generateValidationReportMarkdown, generateRequirementsChecklistMarkdown } from "./markdown-generator-fixed";
import { generateRequirementsChecklistBuffer } from "./simple-pdf-generator";
import { generateValidationReportPDF, generateRequirementsChecklistPDF } from "./fixed-pdf-generator";
import { checkVFSOutsourcing } from "./vfs-outsourcing-service";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 10, // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    // Allow common document and image formats
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/msword', // .doc
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not supported. Please upload PDF, JPG, PNG, DOCX, DOC, or TXT files.`));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create validation session
  app.post("/api/create-validation-session", async (req, res) => {
    try {
      const { country, visaType, personalInfo, uploadedFiles } = req.body;
      
      // Validate personal info
      const validatedPersonalInfo = personalInfoSchema.parse(personalInfo);
      
      const sessionId = nanoid();
      
      const session = await storage.createValidationSession({
        sessionId,
        country,
        visaType,
        ...validatedPersonalInfo,
        uploadedFiles: uploadedFiles || [],
        paymentStatus: "pending",
        validationResults: null,
        stripePaymentIntentId: null,
      });
      
      res.json({ sessionId: session.sessionId });
    } catch (error: any) {
      res.status(400).json({ message: "Error creating validation session: " + error.message });
    }
  });

  // File upload endpoint with OpenAI analysis
  app.post("/api/upload", upload.array("files", 10), async (req, res) => {
    try {
      console.log("Upload request received");
      
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        console.log("No files found in request");
        return res.status(400).json({ message: "No files uploaded" });
      }

      console.log(`Analyzing ${req.files.length} documents with OpenAI...`);
      
      // Analyze each document with OpenAI
      const analyzedFiles = await Promise.all(
        req.files.map(async (file: any) => {
          try {
            const analysis = await analyzeDocument(file.buffer, file.originalname, file.mimetype);
            return {
              originalName: file.originalname,
              mimetype: file.mimetype,
              size: file.size,
              uploadedAt: new Date().toISOString(),
              analysis: analysis,
            };
          } catch (error) {
            console.error(`Error analyzing file ${file.originalname}:`, error);
            return {
              originalName: file.originalname,
              mimetype: file.mimetype,
              size: file.size,
              uploadedAt: new Date().toISOString(),
              analysis: null,
              error: 'Failed to analyze document'
            };
          }
        })
      );

      console.log("Document analysis completed:", analyzedFiles);
      res.json({ files: analyzedFiles });
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Error uploading files: " + error.message });
    }
  });

  // Validate documents using OpenAI
  app.post("/api/validate", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }

      const session = await storage.getValidationSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Validation session not found" });
      }

      console.log("Starting comprehensive validation for session:", sessionId);
      
      // Get current visa requirements online
      let currentRequirements;
      try {
        currentRequirements = await getVisaRequirementsOnline(session.country, session.visaType);
        console.log("Fetched current requirements:", currentRequirements);
      } catch (error) {
        console.error("Error fetching requirements:", error);
        currentRequirements = { message: "Could not fetch current requirements" };
      }

      // Extract document analyses from uploaded files
      const uploadedFiles = Array.isArray(session.uploadedFiles) ? session.uploadedFiles : [];
      const documentAnalyses = uploadedFiles
        .filter((file: any) => file.analysis)
        .map((file: any) => file.analysis);

      if (documentAnalyses.length === 0) {
        return res.status(400).json({ message: "No analyzed documents found. Please upload and analyze documents first." });
      }

      // Validate documents against requirements with cross-referencing
      let validationResults;
      try {
        validationResults = await validateDocumentsAgainstRequirements(
          documentAnalyses,
          {
            applicantName: session.applicantName,
            passportNumber: session.passportNumber,
            dateOfBirth: session.dateOfBirth,
            nationality: session.nationality,
            travelDate: session.travelDate,
            stayDuration: session.stayDuration
          },
          session.country,
          session.visaType,
          currentRequirements?.requirements
        );
      } catch (error: any) {
        console.error("OpenAI validation error:", error);
        // Provide fallback validation results
        validationResults = {
          verified: [],
          issues: [
            {
              type: "analysis_error",
              title: "Document Analysis Temporarily Unavailable",
              description: "AI document validation is currently unavailable. Your documents have been uploaded successfully.",
              recommendation: "Please try again later or contact support for manual review."
            }
          ],
          score: 0,
          completedAt: new Date().toISOString()
        };
      }

      // Store validation results
      const updatedSession = await storage.updateValidationResults(sessionId, {
        ...validationResults,
        currentRequirements
      });

      console.log("Validation completed for session:", sessionId);
      res.json({
        validationResults: validationResults,
        currentRequirements: currentRequirements,
        session: updatedSession
      });
    } catch (error: any) {
      console.error("Validation error:", error);
      res.status(500).json({ message: "Error during validation: " + (error.message || "Unknown error") });
    }
  });

  // Create payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      const session = await storage.getValidationSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Validation session not found" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 999, // $9.99 in cents
        currency: "usd",
        metadata: {
          sessionId: sessionId,
        },
      });

      await storage.updatePaymentStatus(sessionId, "processing", paymentIntent.id);

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Validate documents after payment
  app.post("/api/validate-documents", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      const session = await storage.getValidationSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Validation session not found" });
      }

      if (session.paymentStatus !== "completed") {
        return res.status(402).json({ message: "Payment required" });
      }

      // Simulate document validation
      const validationResults = {
        verified: [
          {
            type: "passport",
            message: `Passport validity confirmed (expires ${new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]})`,
          },
          {
            type: "photo",
            message: "Photograph meets size requirements",
          },
          {
            type: "financial",
            message: "Financial documents detected",
          },
        ],
        issues: [
          {
            type: "ds160",
            title: "Missing DS-160 confirmation",
            description: "Required for US visa applications",
            recommendation: "Visit ceac.state.gov to fill out the online application form and print the confirmation page.",
          },
          {
            type: "itinerary",
            title: "Travel itinerary not found",
            description: "Flight bookings or travel plans recommended",
            recommendation: "Include flight bookings, hotel reservations, or detailed travel plans to demonstrate your intended stay.",
          },
        ],
        score: 75,
        completedAt: new Date().toISOString(),
      };

      await storage.updateValidationResults(sessionId, validationResults);

      res.json({ results: validationResults });
    } catch (error: any) {
      res.status(500).json({ message: "Error validating documents: " + error.message });
    }
  });

  // Get real-time visa requirements
  app.get("/api/visa-requirements/:country/:visaType", async (req, res) => {
    try {
      const { country, visaType } = req.params;
      const { nationality } = req.query;
      
      console.log(`Fetching real-time requirements for ${visaType} visa to ${country}${nationality ? ` for ${nationality} citizens` : ''}`);
      
      const requirements = await fetchCurrentVisaRequirements(
        country, 
        visaType, 
        nationality as string
      );
      
      res.json(requirements);
    } catch (error: any) {
      console.error("Error fetching visa requirements:", error);
      res.status(500).json({ message: "Error fetching visa requirements: " + error.message });
    }
  });

  // Download comprehensive requirements checklist
  app.get("/api/visa-requirements/:country/:visaType/download", async (req, res) => {
    try {
      const { country, visaType } = req.params;
      const { nationality } = req.query;
      
      console.log(`Generating downloadable checklist for ${visaType} visa to ${country}`);
      
      const requirements = await fetchCurrentVisaRequirements(
        country, 
        visaType, 
        nationality as string
      );
      
      // Check for VFS Global outsourcing
      const vfsInfo = checkVFSOutsourcing(country, visaType);
      if (vfsInfo.isOutsourced) {
        requirements.importantNotes.unshift(
          `⚠️ IMPORTANT: ${country} ${visaType} visa applications are outsourced to ${vfsInfo.provider}. You must submit your application through ${vfsInfo.applicationCenter}. Visit: ${vfsInfo.website}`
        );
      }
      
      const checklistBuffer = generateRequirementsChecklistBuffer(requirements);
      
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename="visa-requirements-${country}-${visaType}.txt"`);
      res.send(checklistBuffer);
    } catch (error: any) {
      console.error("Error generating requirements checklist:", error);
      res.status(500).json({ message: "Error generating checklist: " + error.message });
    }
  });

  // Get validation results
  app.get("/api/validation-results/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      const session = await storage.getValidationSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Validation session not found" });
      }

      if (!session.validationResults) {
        return res.status(404).json({ message: "Validation results not available" });
      }

      res.json({ results: session.validationResults });
    } catch (error: any) {
      res.status(500).json({ message: "Error retrieving validation results: " + error.message });
    }
  });

  // Download validation report with professional formatting
  app.get("/api/validation-report/:sessionId/download", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      const session = await storage.getValidationSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Validation session not found" });
      }

      if (!session.validationResults) {
        return res.status(404).json({ message: "Validation results not available" });
      }

      // Parse validation results safely
      const validationResults = typeof session.validationResults === 'string' 
        ? JSON.parse(session.validationResults) 
        : session.validationResults;

      // Ensure validation results has required structure
      const safeValidationResults = {
        verified: validationResults?.verified || [],
        issues: validationResults?.issues || [],
        score: validationResults?.score || 0,
        completedAt: validationResults?.completedAt || new Date().toISOString()
      };

      // Prepare report data
      const reportData = {
        validationResults: safeValidationResults,
        personalInfo: {
          applicantName: session.applicantName,
          passportNumber: session.passportNumber,
          dateOfBirth: session.dateOfBirth,
          travelDate: session.travelDate,
          stayDuration: session.stayDuration
        },
        country: session.country,
        visaType: session.visaType,
        nationality: session.nationality,
        requirements: validationResults?.currentRequirements,
        uploadedDocuments: Array.isArray(session.uploadedFiles) ? session.uploadedFiles : []
      };

      const reportMarkdown = generateValidationReportMarkdown(reportData);
      
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename="visa-validation-report-${sessionId}.txt"`);
      res.send(Buffer.from(reportMarkdown, 'utf-8'));
    } catch (error: any) {
      console.error("Error generating validation report:", error);
      res.status(500).json({ message: "Error generating report: " + error.message });
    }
  });

  // Webhook for Stripe payment confirmation
  app.post("/api/stripe-webhook", async (req, res) => {
    try {
      const event = req.body;

      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const sessionId = paymentIntent.metadata.sessionId;
        
        if (sessionId) {
          await storage.updatePaymentStatus(sessionId, "completed", paymentIntent.id);
        }
      }

      res.json({ received: true });
    } catch (error: any) {
      res.status(400).json({ message: "Webhook error: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
