import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import multer from "multer";
import { storage } from "./storage";
import { personalInfoSchema } from "@shared/schema";
import { nanoid } from "nanoid";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create validation session
  app.post("/api/validation-session", async (req, res) => {
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

  // File upload endpoint
  app.post("/api/upload", upload.array("files", 10), async (req, res) => {
    try {
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const uploadedFiles = req.files.map((file) => ({
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      }));

      res.json({ files: uploadedFiles });
    } catch (error: any) {
      res.status(500).json({ message: "Error uploading files: " + error.message });
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
