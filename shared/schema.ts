import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const validationSessions = pgTable("validation_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  userId: varchar("user_id").references(() => users.id),
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

export const insertUserSchema = createInsertSchema(users);

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

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type ValidationSession = typeof validationSessions.$inferSelect;
export type InsertValidationSession = z.infer<typeof insertValidationSessionSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
