import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import { passportIndexCache } from "./passport-index-loader";
import CacheOptimizer from "./enhanced-cache-service";
import PerformanceMonitor, { performanceTracking, BackgroundMonitor } from "./performance-monitor";

const app = express();

// Trust proxy for deployments
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add performance tracking middleware
app.use(performanceTracking);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Document cleanup service - runs every hour to delete documents older than 24 hours
async function cleanupOldDocuments() {
  try {
    const deletedCount = await storage.deleteOldDocuments();
    if (deletedCount > 0) {
      log(`Auto-deleted ${deletedCount} documents older than 24 hours`);
    }
  } catch (error) {
    log(`Error during document cleanup: ${error}`);
  }
}

// Start cleanup service
setInterval(cleanupOldDocuments, 60 * 60 * 1000); // Run every hour
cleanupOldDocuments(); // Run immediately on startup

// ✅ Initialize Passport Index CSV cache on server start
async function initializeRAGSystem() {
  try {
    log('[RAG] Initializing Passport Index CSV cache...');
    await passportIndexCache.init();
    log('[RAG] ✅ CSV cache initialized successfully');
  } catch (error) {
    log(`[RAG] ⚠️ Warning: Could not initialize CSV cache: ${error}`);
    log('[RAG] System will fallback to API-only mode');
  }
}

(async () => {
  // Initialize RAG system before starting server
  await initializeRAGSystem();

  // Initialize Enhanced Cache Optimizer
  const cacheOptimizer = CacheOptimizer.getInstance();
  cacheOptimizer.start();
  log("[CACHE] Enhanced cache optimizer started");

  // Initialize Background Performance Monitor
  const backgroundMonitor = BackgroundMonitor.getInstance();
  backgroundMonitor.start();
  log("[PERF] Background performance monitor started");

  // Visa Data Manager will be available later via API
  // visaDataManager.initialize().catch(error => {
  //   log(`[VISA-DATA] Failed to initialize visa data manager: ${error}`);
  // });

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = process.env.PORT || 5000;

  // Windows doesn't support reusePort, use conditional config
  const isWindows = process.platform === 'win32';
  const listenOptions: any = {
    port,
    host: "0.0.0.0"
  };

  // Only add reusePort on non-Windows platforms
  if (!isWindows) {
    listenOptions.reusePort = true;
  }

  server.listen(listenOptions, () => {
    log(`serving on port ${port}`);
  });
})();
