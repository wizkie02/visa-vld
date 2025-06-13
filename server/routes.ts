import type { Express } from "express";
import { createServer, type Server } from "http";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import Stripe from "stripe";
import multer from "multer";
import { storage } from "./storage";
import { setupNewAuth, requireNewAuth, requireNewAdmin } from "./new-auth";
import { personalInfoSchema } from "@shared/schema";

const scryptAsync = promisify(scrypt);
import { nanoid } from "nanoid";
import { analyzeDocument, validateDocumentsAgainstRequirements, getVisaRequirementsOnline } from "./openai-service";
import { fetchCurrentVisaRequirements, generateRequirementsChecklist } from "./visa-requirements-service";
import { generateValidationReport, generateRequirementsChecklist as generateChecklistHtml } from "./document-generator";
import { generateValidationReportMarkdown, generateRequirementsChecklistMarkdown } from "./markdown-generator-fixed";
import { generateValidationReportPDF } from "./jspdf-generator";
import { generateRequirementsChecklistBuffer } from "./simple-pdf-generator";
import { generateValidationReportHTML, generateRequirementsChecklistHTML } from "./working-pdf-generator";
import puppeteer from "puppeteer";
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
  // Auth middleware - setupNewAuth with Authorization headers
  setupNewAuth(app);

  // Admin panel routes
  app.get('/api/admin/users', requireNewAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get('/api/admin/stats', requireNewAdmin, async (req, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.get('/api/admin/revenue', requireNewAdmin, async (req, res) => {
    try {
      const revenue = await storage.getMonthlyRevenue();
      res.json(revenue);
    } catch (error) {
      console.error("Error fetching revenue:", error);
      res.status(500).json({ message: "Failed to fetch revenue" });
    }
  });

  app.put('/api/admin/users/:id', requireNewAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updates = req.body;
      const user = await storage.updateUser(userId, updates);
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  app.post('/api/admin/reset-password', requireNewAdmin, async (req, res) => {
    try {
      const { userId, newPassword, sendEmail } = req.body;
      
      // Hash the new password
      const salt = randomBytes(16).toString('hex');
      const buf = (await scryptAsync(newPassword, salt, 64)) as Buffer;
      const hashedPassword = `${buf.toString('hex')}.${salt}`;
      
      // Update password in database
      const user = await storage.resetUserPassword(userId, hashedPassword);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Send email notification if requested
      if (sendEmail && user.username) {
        try {
          // Simple email notification (would need SendGrid setup for production)
          console.log(`Password reset for user ${user.username}: ${newPassword}`);
          console.log(`Email would be sent to: info@dldv.nl`);
          // TODO: Implement actual email sending with SendGrid
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
        }
      }

      res.json({ 
        message: "Password reset successfully",
        user: {
          id: user.id,
          username: user.username,
          nationality: user.nationality,
          isActive: user.isActive,
          isAdmin: user.isAdmin
        }
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Failed to reset password" });
    }
  });

  // Document analysis routes (no storage)
  app.get("/api/documents", requireNewAuth, async (req: any, res) => {
    try {
      const analysisLogs = await storage.getUserDocumentAnalysisLogs(req.user.id);
      res.json(analysisLogs);
    } catch (error) {
      console.error("Error fetching user document analysis logs:", error);
      res.status(500).json({ message: "Failed to fetch document analysis logs" });
    }
  });

  app.get("/api/admin/documents", requireNewAdmin, async (req, res) => {
    try {
      const analysisLogs = await storage.getAllDocumentAnalysisLogs();
      res.json(analysisLogs);
    } catch (error) {
      console.error("Error fetching document analysis logs:", error);
      res.status(500).json({ message: "Failed to fetch document analysis logs" });
    }
  });

  // User validation sessions
  app.get('/api/user/validation-sessions', requireNewAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const sessions = await storage.getUserValidationSessions(userId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching user sessions:", error);
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });
  
  // Create validation session
  app.post("/api/create-validation-session", requireNewAuth, async (req: any, res) => {
    try {
      const { country, visaType, personalInfo, uploadedFiles } = req.body;
      
      // Validate personal info
      const validatedPersonalInfo = personalInfoSchema.parse(personalInfo);
      
      const sessionId = nanoid();
      
      const userId = req.user.id;
      
      const session = await storage.createValidationSession({
        sessionId,
        userId,
        country,
        visaType,
        applicantName: validatedPersonalInfo.applicantName,
        passportNumber: validatedPersonalInfo.passportNumber,
        dateOfBirth: validatedPersonalInfo.dateOfBirth,
        nationality: validatedPersonalInfo.nationality,
        travelDate: validatedPersonalInfo.travelDate,
        stayDuration: validatedPersonalInfo.stayDuration,
        dataProcessingConsent: validatedPersonalInfo.dataProcessingConsent,
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
  app.post("/api/upload", requireNewAuth, upload.array("files", 10), async (req: any, res) => {
    try {
      console.log("Upload request received");
      
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        console.log("No files found in request");
        return res.status(400).json({ message: "No files uploaded" });
      }

      const sessionId = req.body.sessionId || `temp-${Date.now()}`;
      console.log(`Analyzing ${req.files.length} documents with OpenAI...`);
      
      // Analyze each document with OpenAI and log metadata (no file storage)
      const analyzedFiles = await Promise.all(
        req.files.map(async (file: any) => {
          try {
            const analysis = await analyzeDocument(file.buffer, file.originalname, file.mimetype);
            
            // Create analysis log without storing the file
            await storage.createDocumentAnalysisLog({
              userId: req.user!.id,
              sessionId: sessionId,
              originalFileName: file.originalname,
              fileType: file.mimetype,
              fileSize: file.size,
              detectedDocumentType: analysis.documentType || 'unknown',
              extractedText: analysis.extractedText,
              confidenceScore: Math.round(analysis.confidence * 100),
              analysisResults: analysis
            });
            
            return {
              originalName: file.originalname,
              mimetype: file.mimetype,
              size: file.size,
              uploadedAt: new Date().toISOString(),
              analysis: analysis,
            };
          } catch (error) {
            console.error(`Error analyzing file ${file.originalname}:`, error);
            
            // Still log failed analysis attempts
            await storage.createDocumentAnalysisLog({
              userId: req.user!.id,
              sessionId: sessionId,
              originalFileName: file.originalname,
              fileType: file.mimetype,
              fileSize: file.size,
              detectedDocumentType: 'analysis_failed',
              extractedText: '',
              confidenceScore: 0,
              analysisResults: { error: 'Failed to analyze document' }
            });
            
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
  app.post("/api/validate", requireNewAuth, async (req, res) => {
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
      // Extract the required documents array from the requirements structure
      const requiredDocuments = currentRequirements?.requirements?.requiredDocuments || [];
      
      try {
        // Extract checked documents from session data
        const checkedDocuments = session.checkedDocuments || {};
        
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
          requiredDocuments,
          checkedDocuments
        );
      } catch (error: any) {
        console.error("Error validating documents:", error);
        console.error("Error stack:", error.stack);
        console.error("Required documents passed:", requiredDocuments);
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
  app.post("/api/create-payment-intent", requireNewAuth, async (req, res) => {
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
  app.post("/api/validate-documents", requireNewAuth, async (req, res) => {
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
  app.get("/api/visa-requirements/:country/:visaType", requireNewAuth, async (req, res) => {
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
  app.get("/api/visa-requirements/:country/:visaType/download", requireNewAuth, async (req, res) => {
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
          `⚠️ IMPORTANT: ${country} ${visaType} visa applications are processed through ${vfsInfo.provider} instead of the embassy. You must submit your application at ${vfsInfo.applicationCenter}. Visit: ${vfsInfo.website} to book an appointment and find your nearest location.`
        );
      }
      
      const checklistMarkdown = generateRequirementsChecklistMarkdown(requirements);
      
      res.setHeader('Content-Type', 'text/markdown');
      res.setHeader('Content-Disposition', `attachment; filename="visa-requirements-${country}-${visaType}.md"`);
      res.send(Buffer.from(checklistMarkdown, 'utf-8'));
    } catch (error: any) {
      console.error("Error generating requirements checklist:", error);
      res.status(500).json({ message: "Error generating checklist: " + error.message });
    }
  });

  // Get validation results
  app.get("/api/validation-results/:sessionId", requireNewAuth, async (req, res) => {
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
  app.get("/api/validation-report/:sessionId/download", requireNewAuth, async (req, res) => {
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

      const pdfBuffer = generateValidationReportPDF(reportData);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="visa-validation-report-${sessionId}.pdf"`);
      res.send(pdfBuffer);
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
