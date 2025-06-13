import { Express, Request, Response, NextFunction } from "express";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { storage } from "./storage";
import { User as UserType, registerSchema, loginSchema } from "@shared/schema";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

const scryptAsync = promisify(scrypt);
const JWT_SECRET = process.env.SESSION_SECRET || "your-jwt-secret-key";

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

function generateToken(user: UserType): string {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username,
      isAdmin: user.isAdmin 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function setupSimpleAuth(app: Express) {
  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Create user with hashed password
      const hashedPassword = await hashPassword(validatedData.password);
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Generate token
      const token = generateToken(user);

      // Set token as HTTP-only cookie
      res.cookie('auth-token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/'
      });

      res.status(201).json({
        id: user.id,
        username: user.username,
        nationality: user.nationality,
        isAdmin: user.isAdmin,
      });
    } catch (error: any) {
      if (error.issues) {
        return res.status(400).json({ message: error.issues[0].message });
      }
      return res.status(500).json({ message: "Registration failed" });
    }
  });

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user by username
      const user = await storage.getUserByUsername(validatedData.username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Verify password
      const isValidPassword = await comparePasswords(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token
      const token = generateToken(user);

      // Set token as accessible cookie for debugging
      res.cookie('auth-token', token, {
        httpOnly: false, // Allow JS access for debugging
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/'
      });

      console.log('Login successful for:', user.username);
      console.log('Token set in cookie:', token.substring(0, 20) + '...');

      res.json({
        id: user.id,
        username: user.username,
        nationality: user.nationality,
        isAdmin: user.isAdmin,
      });
    } catch (error: any) {
      if (error.issues) {
        return res.status(400).json({ message: error.issues[0].message });
      }
      return res.status(500).json({ message: "Login failed" });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    res.clearCookie('auth-token', { path: '/' });
    res.json({ message: "Logged out successfully" });
  });

  // Debug endpoint to check cookies
  app.get("/api/debug/cookies", (req, res) => {
    console.log('Debug cookies:', req.cookies);
    res.json({ 
      cookies: req.cookies,
      hasAuthToken: !!req.cookies['auth-token']
    });
  });

  // Get current user endpoint
  app.get("/api/user", async (req, res) => {
    try {
      console.log('GET /api/user - Cookies:', req.cookies);
      const token = req.cookies['auth-token'];
      console.log('Token found:', !!token);
      
      if (!token) {
        console.log('No token found in cookies');
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;
      console.log('Token decoded for user ID:', decoded.id);
      
      const user = await storage.getUser(decoded.id);
      
      if (!user) {
        console.log('User not found in database');
        return res.status(401).json({ message: "Unauthorized" });
      }

      console.log('Returning user:', user.username);
      res.json({
        id: user.id,
        username: user.username,
        nationality: user.nationality,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      console.log('JWT verification error:', error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
}

// Middleware to check if user is authenticated
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies['auth-token'];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    // We'll attach the user ID for now, full user can be fetched if needed
    req.user = { id: decoded.id } as UserType;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// Middleware to check if user is admin
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  requireAuth(req, res, async (err) => {
    if (err) return next(err);
    
    try {
      const user = await storage.getUser(req.user!.id);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
}