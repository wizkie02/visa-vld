# 🏗️ FULL TECH STACK - Visa Validator System

## 📊 Tổng Quan Hệ Thống

```
┌─────────────────────────────────────────────────────────────┐
│                      VISA VALIDATOR                          │
│                    Full-Stack Application                    │
└─────────────────────────────────────────────────────────────┘
         │
         ├── Frontend (React + TypeScript)
         ├── Backend (Node.js + Express)
         ├── AI/ML Layer (OpenAI + RAG)
         ├── Data Layer (PostgreSQL + APIs)
         └── Infrastructure (Vite + Deployment)
```

---

## 🎨 **FRONTEND STACK**

### **Core Framework**
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server (HMR)
- **Wouter 3.3.5** - Lightweight routing (thay vì React Router)

### **UI Components & Styling**
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless component primitives:
  - Dialog, Dropdown, Popover, Select, Tabs
  - Toast, Tooltip, Accordion, Navigation
  - 20+ components từ Radix UI
- **shadcn/ui** - Pre-built components với Radix + Tailwind
- **Lucide React** - Icon library (450+ icons)
- **Framer Motion 11.13.1** - Animation library
- **class-variance-authority** - Component variants
- **tailwindcss-animate** - Animation utilities

### **State Management & Data Fetching**
- **TanStack Query 5.60.5** (React Query) - Server state management
- **React Hook Form 7.55.0** - Form handling
- **Zod 3.24.2** - Schema validation
- **@hookform/resolvers** - Zod integration với React Hook Form

### **Charts & Visualization**
- **Recharts 2.15.2** - Chart library
- **Embla Carousel** - Carousel component
- **react-resizable-panels** - Resizable layouts

### **Additional Frontend Tools**
- **date-fns 3.6.0** - Date manipulation
- **html2canvas 1.4.1** - Screenshot generation
- **react-icons 5.4.0** - Icon collections
- **cmdk** - Command palette
- **vaul** - Drawer component
- **input-otp** - OTP input

---

## ⚙️ **BACKEND STACK**

### **Core Framework**
- **Node.js** - Runtime environment
- **Express 4.21.2** - Web framework
- **TypeScript** - Type safety
- **tsx** - TypeScript execution (dev)
- **esbuild** - Build tool (production)

### **API & External Services**
1. **Travel Buddy AI API** (RapidAPI)
   - Primary visa data source
   - 200 passports × 210 destinations
   - Daily updates from government sources
   - Endpoint: `https://visa-requirement.p.rapidapi.com/v2/visa/check`

2. **OpenAI API** (gpt-4o-mini)
   - Document analysis với Vision
   - RAG-enhanced visa requirements
   - Visa types generation
   - Temperature: 0.1-0.2 for accuracy

3. **Passport Index API** (Fallback)
   - Endpoint: `https://rough-sun-2523.fly.dev`
   - CSV cache backup
   - Basic visa status data

### **Authentication & Security**
- **Passport.js 0.7.0** - Authentication middleware
- **passport-local** - Local strategy
- **jsonwebtoken 9.0.2** - JWT tokens
- **cookie-parser 1.4.7** - Cookie handling
- **express-rate-limit 8.1.0** - Rate limiting

### **Database & ORM**
- **PostgreSQL** (Neon Database) - Primary database
- **Drizzle ORM 0.39.1** - Type-safe ORM
- **drizzle-zod 0.7.0** - Zod integration
- **@neondatabase/serverless** - Serverless PostgreSQL client

### **Payment Processing**
- **Stripe 18.2.1** - Payment gateway (server-side)
- **@stripe/stripe-js** - Payment gateway (client-side)
- **@stripe/react-stripe-js** - React integration

### **File Processing**
- **Multer 2.0.1** - File upload handling
- **PDFKit 0.17.1** - PDF generation (primary)
- **jsPDF 3.0.1** - PDF generation (alternative)
- **html-pdf-node** - HTML to PDF conversion
- **Puppeteer 24.10.0** - Headless browser for PDF

### **Data Processing**
- **axios 1.12.2** - HTTP client
- **csv-parse 6.1.0** - CSV parsing (passport data)
- **memoizee 0.4.17** - Function memoization (caching)
- **bottleneck 2.19.5** - Rate limiting for APIs

### **Email Service**
- **@sendgrid/mail 8.1.5** - Email sending

---

## 🤖 **AI/ML LAYER (RAG Architecture)**

### **RAG Pipeline Components**

```
┌───────────────────────────────────────────────────────────┐
│                   RAG ARCHITECTURE                         │
└───────────────────────────────────────────────────────────┘
         │
         ├── RETRIEVE (Data Sources)
         │   ├── Travel Buddy AI API
         │   ├── Passport Index API  
         │   └── CSV Cache
         │
         ├── AUGMENT (Context Enhancement)
         │   └── GPT-4o-mini (temperature: 0.1-0.2)
         │
         └── GENERATE (Output Creation)
             ├── Visa types generation
             ├── Requirements generation
             └── Document validation
```

### **AI Models Used**
1. **gpt-4o-mini** (Primary)
   - Document analysis (Vision API)
   - Visa requirements generation
   - Visa types generation
   - Context enhancement
   - Temperature: 0.1-0.2 for factual accuracy

2. **GPT-4o** (Optional/Backup)
   - More expensive, higher quality
   - Used for complex document analysis

### **AI Services Architecture**

**File: `server/openai-service.ts`**
- Document analysis với Vision
- Base64 image encoding
- Structured JSON responses

**File: `server/visa-types-service.ts`**
- RAG-enhanced visa types
- Ground truth from Travel Buddy
- GPT enhancement

**File: `server/dynamic-requirements-service.ts`**
- Visa-specific requirements
- Travel Buddy context integration

**File: `server/visa-requirements-service.ts`**
- Alternative requirements service

### **Caching Strategy**
- **Layer 1**: Official visa data (1 hour cache)
- **Layer 2**: GPT-enhanced data (24 hours cache)
- **Layer 3**: Visa types (24 hours cache)
- **Implementation**: `memoizee` library

---

## 💾 **DATA LAYER**

### **Primary Database**
- **PostgreSQL** (Neon Serverless)
- **Drizzle ORM** for type-safe queries
- **Connection**: Serverless driver

### **External Data Sources**

| Source | Type | Purpose | Update Frequency |
|--------|------|---------|------------------|
| **Travel Buddy AI** | REST API | Visa status, duration, links | Daily |
| **Passport Index** | REST API + CSV | Visa status fallback | Static |
| **OpenAI** | REST API | Document analysis, generation | Real-time |
| **Stripe** | REST API | Payment processing | Real-time |

### **Data Flow**

```
User Upload Document
    ↓
Backend receives file (Multer)
    ↓
1. Extract country info
2. Call Travel Buddy API → Get visa status
3. Call OpenAI Vision → Analyze document
4. Call OpenAI GPT → Generate requirements
5. Compare & validate
    ↓
Return validation result
```

---

## 🔧 **INFRASTRUCTURE & DevOps**

### **Build Tools**
- **Vite** - Frontend bundler & dev server
  - Hot Module Replacement (HMR)
  - Fast builds
  - Plugin system
- **esbuild** - Backend bundler
  - ESM format output
  - Bundle server code
- **TypeScript Compiler (tsc)** - Type checking

### **Development Tools**
- **tsx** - TypeScript execution for dev
- **cross-env** - Environment variables
- **@replit/vite-plugin-cartographer** - Replit integration

### **Package Manager**
- **npm** - Dependency management

### **Module System**
- **ESM (ES Modules)** - `"type": "module"` in package.json
- All imports use `import/export` syntax

---

## 📁 **PROJECT STRUCTURE**

```
VisaValidator/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities
│   │   ├── services/      # API services
│   │   ├── App.tsx        # Root component
│   │   └── main.tsx       # Entry point
│   └── index.html
│
├── server/                 # Backend (Node.js + Express)
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── db.ts              # Database connection
│   ├── storage.ts         # File storage
│   │
│   ├── # AI/RAG Services
│   ├── openai-service.ts
│   ├── visa-types-service.ts
│   ├── dynamic-requirements-service.ts
│   ├── visa-requirements-service.ts
│   │
│   ├── # Data Services
│   ├── travel-buddy-api.ts        # Primary data source
│   ├── visa-api-service.ts        # Fallback integration
│   ├── passport-index-loader.ts   # CSV cache
│   │
│   ├── # Utilities
│   ├── cache.ts           # Caching layer
│   ├── rate-limiter.ts    # API rate limiting
│   ├── logger.ts          # Logging
│   │
│   └── # PDF Generation
│       ├── requirements-pdf-generator.ts
│       ├── document-generator.ts
│       └── jspdf-generator.ts
│
├── shared/                 # Shared types
│   └── schema.ts          # Zod schemas
│
├── .env                    # Environment variables
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
└── tailwind.config.ts     # Tailwind config
```

---

## 🔐 **ENVIRONMENT VARIABLES**

```bash
# Database
DATABASE_URL=postgresql://...

# OpenAI API
OPENAI_API_KEY=sk-proj-...

# Travel Buddy AI (RapidAPI)
RAPIDAPI_KEY=5c9348753cmshc81047c0737dbc5p1db439jsn7fe578b8ace3
USE_TRAVEL_BUDDY=true

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Authentication
JWT_SECRET=...
SESSION_SECRET=...

# Environment
NODE_ENV=development|production
```

---

## 🚀 **DEPLOYMENT ARCHITECTURE**

### **Development**
```bash
npm run dev
# → tsx watches server/index.ts
# → Vite serves frontend with HMR
# → Port 5000 (or configured port)
```

### **Production Build**
```bash
npm run build
# → Vite builds frontend → dist/public/
# → esbuild bundles server → dist/index.js

npm start
# → node dist/index.js
# → Serves frontend + API
```

### **Scripts**
```json
{
  "dev": "tsx --env-file=.env server/index.ts",
  "build": "vite build && esbuild server/...",
  "start": "node dist/index.js",
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

---

## 📊 **PERFORMANCE OPTIMIZATIONS**

### **Caching**
- ✅ 24-hour cache for GPT responses (memoizee)
- ✅ 1-hour cache for Travel Buddy API
- ✅ Static CSV fallback cache

### **Rate Limiting**
- ✅ Express rate limiter (API protection)
- ✅ Bottleneck for OpenAI API (50 req/min)
- ✅ Travel Buddy free tier: 100 req/month

### **Code Splitting**
- ✅ Vite automatic code splitting
- ✅ Lazy loading for routes (Wouter)

### **Build Optimization**
- ✅ esbuild for fast server builds
- ✅ Vite for optimized frontend bundles
- ✅ Tree shaking enabled

---

## 🔗 **KEY INTEGRATIONS**

### **1. Travel Buddy AI (Primary Data)**
```typescript
POST https://visa-requirement.p.rapidapi.com/v2/visa/check
Headers:
  - X-RapidAPI-Key: [key]
  - Content-Type: application/json
Body:
  { "passport": "VN", "destination": "US" }
```

### **2. OpenAI (AI Enhancement)**
```typescript
POST https://api.openai.com/v1/chat/completions
Headers:
  - Authorization: Bearer [key]
  - Content-Type: application/json
Body:
  {
    "model": "gpt-4o-mini",
    "messages": [...],
    "temperature": 0.1
  }
```

### **3. Stripe (Payment)**
```typescript
// Server-side
const stripe = new Stripe(STRIPE_SECRET_KEY);

// Client-side
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(VITE_STRIPE_PUBLIC_KEY);
```

### **4. Neon PostgreSQL (Database)**
```typescript
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(DATABASE_URL);
const db = drizzle(sql);
```

---

## 🎯 **TECHNOLOGY CHOICES - WHY?**

| Technology | Reason |
|------------|--------|
| **React** | Industry standard, rich ecosystem |
| **TypeScript** | Type safety, better DX |
| **Vite** | Fast builds, excellent DX |
| **Tailwind** | Rapid UI development |
| **Radix UI** | Accessible, headless components |
| **Express** | Simple, flexible, proven |
| **Drizzle ORM** | Type-safe, lightweight |
| **Neon PostgreSQL** | Serverless, auto-scaling |
| **Travel Buddy AI** | Daily updates, government sources |
| **OpenAI gpt-4o-mini** | Fast, affordable, accurate |
| **Stripe** | Industry standard payments |
| **Wouter** | Lightweight routing (10KB vs 40KB React Router) |
| **TanStack Query** | Server state management best practice |

---

## 📈 **SCALABILITY CONSIDERATIONS**

### **Current Limits**
- OpenAI: 50 requests/min (Bottleneck configured)
- Travel Buddy: 100 requests/month (Free tier)
- Neon PostgreSQL: Serverless auto-scaling

### **Upgrade Paths**
1. **Travel Buddy**: $10-15/month → 1,000 req/month
2. **OpenAI**: Pay-as-you-go, no hard limits
3. **Neon**: Auto-scales with usage
4. **Add Redis**: For distributed caching

---

## 🛡️ **SECURITY FEATURES**

- ✅ JWT authentication
- ✅ Cookie-based sessions
- ✅ Rate limiting (express-rate-limit)
- ✅ Environment variable protection
- ✅ Input validation (Zod)
- ✅ SQL injection protection (Drizzle ORM)
- ✅ XSS protection (React escaping)
- ✅ CORS configuration
- ✅ Secure file uploads (Multer)

---

## 📦 **TOTAL DEPENDENCIES**

- **Frontend**: ~50 packages
- **Backend**: ~40 packages
- **Total**: ~90 npm packages

**Main Categories:**
- UI/Styling: 25 packages (Radix UI, Tailwind, icons)
- Backend framework: 15 packages (Express, auth, DB)
- AI/ML: 2 packages (OpenAI, axios for APIs)
- Build tools: 10 packages (Vite, esbuild, TypeScript)
- Utilities: 48 packages (forms, dates, PDF, etc.)

---

## 🎉 **SUMMARY: FULL TECH STACK**

### **Frontend (Client)**
- React 18 + TypeScript + Vite
- Tailwind CSS + Radix UI + shadcn/ui
- TanStack Query + React Hook Form + Zod
- Wouter (routing) + Framer Motion (animation)

### **Backend (Server)**
- Node.js + Express + TypeScript
- Drizzle ORM + Neon PostgreSQL
- Passport.js (auth) + Stripe (payment)
- Multer (upload) + PDFKit (generation)

### **AI/Data Layer**
- **Travel Buddy AI** (primary data source)
- **OpenAI gpt-4o-mini** (RAG enhancement)
- **Passport Index API** (fallback)
- **RAG Architecture** (Retrieve-Augment-Generate)

### **Infrastructure**
- Vite (frontend build) + esbuild (backend build)
- ESM modules throughout
- Environment-based configuration
- Multi-tier caching strategy

---

**Total Lines of Code**: ~15,000+ lines  
**Languages**: TypeScript (95%), CSS (3%), JSON (2%)  
**Architecture**: Full-stack monorepo with RAG AI integration  
**Status**: ✅ Production-ready

**Date**: October 1, 2025  
**Version**: 1.0.0
