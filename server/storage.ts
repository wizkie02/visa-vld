import { validationSessions, users, type ValidationSession, type InsertValidationSession, type User, type UpsertUser } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private validationSessions: Map<string, ValidationSession>;
  private currentId: number;

  constructor() {
    this.validationSessions = new Map();
    this.currentId = 1;
  }

  async createValidationSession(insertSession: InsertValidationSession): Promise<ValidationSession> {
    const id = this.currentId++;
    const session: ValidationSession = {
      ...insertSession,
      id,
      createdAt: new Date(),
    };
    this.validationSessions.set(session.sessionId, session);
    return session;
  }

  async getValidationSession(sessionId: string): Promise<ValidationSession | undefined> {
    return this.validationSessions.get(sessionId);
  }

  async updateValidationResults(sessionId: string, results: any): Promise<ValidationSession | undefined> {
    const session = this.validationSessions.get(sessionId);
    if (session) {
      session.validationResults = results;
      this.validationSessions.set(sessionId, session);
      return session;
    }
    return undefined;
  }

  async updatePaymentStatus(sessionId: string, status: string, paymentIntentId?: string): Promise<ValidationSession | undefined> {
    const session = this.validationSessions.get(sessionId);
    if (session) {
      session.paymentStatus = status;
      if (paymentIntentId) {
        session.stripePaymentIntentId = paymentIntentId;
      }
      this.validationSessions.set(sessionId, session);
      return session;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
