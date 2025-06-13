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
const JWT_SECRET = process.env.SESSION_SECRET || "your-jwt-secret-key-here";

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
    { expiresIn: "7d" }
  );
}

export function setupNewAuth(app: Express) {
  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(validatedData.password);
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Generate token and set in localStorage (client-side)
      const token = generateToken(user);

      res.status(201).json({
        user: {
          id: user.id,
          username: user.username,
          nationality: user.nationality,
          isAdmin: user.isAdmin,
        },
        token: token
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

      // Generate token for client-side storage
      const token = generateToken(user);

      console.log('Login successful for:', user.username);
      console.log('Sending token to client');

      res.json({
        user: {
          id: user.id,
          username: user.username,
          nationality: user.nationality,
          isAdmin: user.isAdmin,
        },
        token: token
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
    res.json({ message: "Logged out successfully" });
  });

  // Get current user endpoint
  app.get("/api/user", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      console.log('GET /api/user - Auth header:', authHeader);
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No valid auth header found');
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      console.log('Token extracted, length:', token.length);
      
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

// Middleware to check if user is authenticated using Authorization header
export function requireNewAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Attach user info to request
    req.user = {
      id: decoded.id,
      username: decoded.username,
      isAdmin: decoded.isAdmin
    } as any;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// Middleware to check if user is admin
export function requireNewAdmin(req: Request, res: Response, next: NextFunction) {
  requireNewAuth(req, res, () => {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  });
}