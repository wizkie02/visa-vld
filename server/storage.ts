import { validationSessions, users, type ValidationSession, type InsertValidationSession, type User, type InsertUser, type RegisterData } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  // User operations for custom auth
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(userData: RegisterData & { password: string }): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getUserStats(): Promise<{ totalUsers: number; activeUsers: number; totalRevenue: string }>;
  getMonthlyRevenue(): Promise<Array<{ month: string; revenue: string; userCount: number }>>;
  
  // Validation session operations
  createValidationSession(session: InsertValidationSession): Promise<ValidationSession>;
  getValidationSession(sessionId: string): Promise<ValidationSession | undefined>;
  updateValidationResults(sessionId: string, results: any): Promise<ValidationSession | undefined>;
  updatePaymentStatus(sessionId: string, status: string, paymentIntentId?: string): Promise<ValidationSession | undefined>;
  getUserValidationSessions(userId: number): Promise<ValidationSession[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations for custom auth
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(userData: RegisterData & { password: string }): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.isAdmin, false));
  }

  async getUserStats(): Promise<{ totalUsers: number; activeUsers: number; totalRevenue: string }> {
    const totalUsersResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.isAdmin, false));
    
    const activeUsersResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(sql`${users.isAdmin} = false AND ${users.isActive} = true`);
    
    const totalRevenueResult = await db
      .select({ sum: sql<string>`COALESCE(sum(${users.totalPaid}), '0.00')` })
      .from(users)
      .where(eq(users.isAdmin, false));

    return {
      totalUsers: totalUsersResult[0]?.count || 0,
      activeUsers: activeUsersResult[0]?.count || 0,
      totalRevenue: totalRevenueResult[0]?.sum || '0.00'
    };
  }

  async getMonthlyRevenue(): Promise<Array<{ month: string; revenue: string; userCount: number }>> {
    const result = await db
      .select({
        month: sql<string>`to_char(${users.createdAt}, 'YYYY-MM')`,
        revenue: sql<string>`COALESCE(sum(${users.totalPaid}), '0.00')`,
        userCount: sql<number>`count(*)`
      })
      .from(users)
      .where(eq(users.isAdmin, false))
      .groupBy(sql`to_char(${users.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`to_char(${users.createdAt}, 'YYYY-MM') DESC`);

    return result;
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