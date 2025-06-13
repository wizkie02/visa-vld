import { validationSessions, users, type ValidationSession, type InsertValidationSession, type User, type UpsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Validation session operations
  createValidationSession(session: InsertValidationSession): Promise<ValidationSession>;
  getValidationSession(sessionId: string): Promise<ValidationSession | undefined>;
  updateValidationResults(sessionId: string, results: any): Promise<ValidationSession | undefined>;
  updatePaymentStatus(sessionId: string, status: string, paymentIntentId?: string): Promise<ValidationSession | undefined>;
  getUserValidationSessions(userId: string): Promise<ValidationSession[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Validation session operations
  async createValidationSession(insertSession: InsertValidationSession): Promise<ValidationSession> {
    const [session] = await db
      .insert(validationSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getValidationSession(sessionId: string): Promise<ValidationSession | undefined> {
    const [session] = await db
      .select()
      .from(validationSessions)
      .where(eq(validationSessions.sessionId, sessionId));
    return session || undefined;
  }

  async updateValidationResults(sessionId: string, results: any): Promise<ValidationSession | undefined> {
    const [session] = await db
      .update(validationSessions)
      .set({ validationResults: results })
      .where(eq(validationSessions.sessionId, sessionId))
      .returning();
    return session || undefined;
  }

  async updatePaymentStatus(sessionId: string, status: string, paymentIntentId?: string): Promise<ValidationSession | undefined> {
    const updateData: any = { paymentStatus: status };
    if (paymentIntentId) {
      updateData.stripePaymentIntentId = paymentIntentId;
    }
    
    const [session] = await db
      .update(validationSessions)
      .set(updateData)
      .where(eq(validationSessions.sessionId, sessionId))
      .returning();
    return session || undefined;
  }

  async getUserValidationSessions(userId: string): Promise<ValidationSession[]> {
    return await db
      .select()
      .from(validationSessions)
      .where(eq(validationSessions.userId, userId));
  }
}

export const storage = new DatabaseStorage();