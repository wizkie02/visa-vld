import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, index, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table disabled - using JWT authentication only
// export const sessions = pgTable(
//   "sessions",
//   {
//     sid: varchar("sid").primaryKey(),
//     sess: jsonb("sess").notNull(),
//     expire: timestamp("expire").notNull(),
//   },
//   (table) => [index("IDX_session_expire").on(table.expire)],
// );

// User storage table for custom authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 50 }),
  lastName: varchar("last_name", { length: 50 }),
  nationality: varchar("nationality", { length: 50 }).notNull(),
  dataProcessingConsent: boolean("data_processing_consent").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  isAdmin: boolean("is_admin").notNull().default(false),
  totalPaid: decimal("total_paid", { precision: 10, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const validationSessions = pgTable("validation_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  userId: integer("user_id").references(() => users.id),
  country: text("country").notNull(),
  visaType: text("visa_type").notNull(),
  applicantName: text("applicant_name").notNull(),
  passportNumber: text("passport_number").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  nationality: text("nationality").notNull(),
  travelDate: text("travel_date").notNull(),
  stayDuration: integer("stay_duration").notNull(),
  uploadedFiles: jsonb("uploaded_files").notNull(),
  checkedDocuments: jsonb("checked_documents").notNull().default('{}'),
  validationResults: jsonb("validation_results"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  dataProcessingConsent: boolean("data_processing_consent").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const documentAnalysisLogs = pgTable("document_analysis_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  sessionId: varchar("session_id", { length: 100 }),
  originalFileName: varchar("original_file_name", { length: 255 }).notNull(),
  fileType: varchar("file_type", { length: 50 }).notNull(),
  fileSize: integer("file_size").notNull(),
  detectedDocumentType: varchar("detected_document_type", { length: 100 }), // AI detected type: passport, payslip, bank_statement, etc.
  extractedText: text("extracted_text"),
  confidenceScore: integer("confidence_score"), // 0-100
  analysisResults: jsonb("analysis_results"),
  shouldDelete: boolean("should_delete").notNull().default(true),
  deletedAt: timestamp("deleted_at"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

// Final reports storage - permanent storage for completed validation reports
export const finalReports = pgTable("final_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id").notNull(),
  country: text("country").notNull(),
  visaType: text("visa_type").notNull(),
  applicantName: text("applicant_name").notNull(),
  validationScore: integer("validation_score").notNull(),
  reportData: jsonb("report_data").notNull(), // Full validation results and recommendations
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertDocumentAnalysisLogSchema = createInsertSchema(documentAnalysisLogs);
export const insertFinalReportSchema = createInsertSchema(finalReports).omit({
  id: true,
  createdAt: true,
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
  dataProcessingConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to data processing to continue"
  }),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  nationality: z.string().min(1, "Nationality is required"),
  dataProcessingConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to data processing to continue"
  }),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type ValidationSession = typeof validationSessions.$inferSelect;
export type InsertValidationSession = z.infer<typeof insertValidationSessionSchema>;
export type DocumentAnalysisLog = typeof documentAnalysisLogs.$inferSelect;
export type InsertDocumentAnalysisLog = z.infer<typeof insertDocumentAnalysisLogSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
