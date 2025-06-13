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
  validationResults: jsonb("validation_results"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  dataProcessingConsent: boolean("data_processing_consent").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userDocuments = pgTable("user_documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  fileType: varchar("file_type", { length: 50 }).notNull(),
  fileSize: integer("file_size").notNull(),
  filePath: varchar("file_path", { length: 500 }).notNull(),
  documentType: varchar("document_type", { length: 100 }), // passport, id, bank_statement, etc.
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  validationStatus: varchar("validation_status", { length: 50 }).default("pending"),
  validationResults: jsonb("validation_results"),
});

export const insertUserSchema = createInsertSchema(users);
export const insertUserDocumentSchema = createInsertSchema(userDocuments);

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
export type UserDocument = typeof userDocuments.$inferSelect;
export type InsertUserDocument = z.infer<typeof insertUserDocumentSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
