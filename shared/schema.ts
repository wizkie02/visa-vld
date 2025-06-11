import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const validationSessions = pgTable("validation_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  country: text("country").notNull(),
  visaType: text("visa_type").notNull(),
  applicantName: text("applicant_name").notNull(),
  passportNumber: text("passport_number").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  nationality: text("nationality").notNull(),
  travelDate: text("travel_date").notNull(),
  stayDuration: integer("stay_duration").notNull(),
  uploadedFiles: jsonb("uploaded_files").notNull(),
  validationResults: jsonb("validation_results"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertValidationSessionSchema = createInsertSchema(validationSessions).omit({
  id: true,
  createdAt: true,
});

export const personalInfoSchema = z.object({
  applicantName: z.string().min(1, "Full name is required"),
  passportNumber: z.string().min(6, "Valid passport number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  travelDate: z.string().min(1, "Travel date is required"),
  stayDuration: z.number().min(1, "Duration of stay is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ValidationSession = typeof validationSessions.$inferSelect;
export type InsertValidationSession = z.infer<typeof insertValidationSessionSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
