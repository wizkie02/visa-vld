# 🏗️ FULL TECH STACK - VISUAL OVERVIEW

## 🎯 Core Technologies Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    VISA VALIDATOR SYSTEM                         │
│                   Full-Stack + AI/ML Platform                    │
└─────────────────────────────────────────────────────────────────┘

📱 FRONTEND                    ⚙️ BACKEND                    🤖 AI/DATA
┌──────────────────┐          ┌──────────────────┐         ┌──────────────────┐
│ React 18.3.1     │◄────────►│ Node.js + Express│◄───────►│ Travel Buddy AI  │
│ TypeScript       │          │ TypeScript       │         │ (Primary Data)   │
│ Vite             │          │ ESM Modules      │         └──────────────────┘
│ Tailwind CSS     │          │                  │         ┌──────────────────┐
│ Radix UI         │          │ Authentication:  │◄───────►│ OpenAI           │
│ TanStack Query   │          │ - Passport.js    │         │ gpt-4o-mini      │
│ React Hook Form  │          │ - JWT            │         │ (RAG Enhanced)   │
│ Zod Validation   │          │ - Sessions       │         └──────────────────┘
│ Wouter (Router)  │          │                  │         ┌──────────────────┐
│ Framer Motion    │          │ Database:        │◄───────►│ Passport Index   │
└──────────────────┘          │ - PostgreSQL     │         │ API (Fallback)   │
                              │ - Drizzle ORM    │         └──────────────────┘
                              │ - Neon Serverless│
                              │                  │         💳 PAYMENT
                              │ Payment:         │         ┌──────────────────┐
                              │ - Stripe API     │◄───────►│ Stripe           │
                              │                  │         │ Payment Gateway  │
                              │ File Processing: │         └──────────────────┘
                              │ - Multer         │
                              │ - PDFKit         │         📊 DATABASE
                              │ - Puppeteer      │         ┌──────────────────┐
                              └──────────────────┘         │ Neon PostgreSQL  │
                                                           │ Serverless       │
                                                           │ Auto-scaling     │
                                                           └──────────────────┘
```

---

## 🔄 Data Flow Architecture

```
┌──────────────┐
│    USER      │
│   Upload     │
│  Document    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │   Form     │→ │  Validate  │→ │   Upload   │        │
│  │ (RHF+Zod)  │  │   (Zod)    │  │  (Axios)   │        │
│  └────────────┘  └────────────┘  └────────────┘        │
└──────────────────────┬───────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────┐
│              BACKEND API (Express)                        │
│                                                           │
│  1. File Upload Handler (Multer)                         │
│     └─→ Parse multipart/form-data                        │
│                                                           │
│  2. Extract Countries                                     │
│     └─→ passportCountry, destinationCountry             │
│                                                           │
│  3. Get Official Visa Status                             │
│     ├─→ Try Travel Buddy API (v2/visa/check)            │
│     │   └─→ ✅ "eVisa - 90 days"                        │
│     ├─→ Fallback: Passport Index API                     │
│     └─→ Fallback: CSV Cache                             │
│                                                           │
│  4. Analyze Document (OpenAI Vision)                     │
│     ├─→ Convert image to base64                          │
│     ├─→ Send to gpt-4o-mini with vision                 │
│     └─→ Extract: passport info, visa stamps, dates       │
│                                                           │
│  5. Generate Requirements (RAG)                          │
│     ├─→ Context: Travel Buddy data                       │
│     ├─→ Augment: GPT-4o-mini                            │
│     └─→ Generate: Detailed requirements list             │
│                                                           │
│  6. Compare & Validate                                    │
│     ├─→ Document content vs Requirements                 │
│     ├─→ Calculate match percentage                       │
│     └─→ Identify missing items                          │
│                                                           │
│  7. Generate PDF Report                                   │
│     └─→ PDFKit generates validation report               │
│                                                           │
└──────────────────────┬───────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                            │
│                                                           │
│  ┌─────────────────────────────────────────────┐        │
│  │ Travel Buddy AI (RapidAPI)                   │        │
│  │ POST /v2/visa/check                          │        │
│  │ Response: {                                  │        │
│  │   status: "eVisa",                          │        │
│  │   duration: "90 days",                      │        │
│  │   embassy_url: "https://...",               │        │
│  │   mandatory_registration: {...}             │        │
│  │ }                                            │        │
│  └─────────────────────────────────────────────┘        │
│                                                           │
│  ┌─────────────────────────────────────────────┐        │
│  │ OpenAI API                                   │        │
│  │ POST /v1/chat/completions                    │        │
│  │ Model: gpt-4o-mini                          │        │
│  │ Temperature: 0.1-0.2                        │        │
│  │ Response: Structured JSON                    │        │
│  └─────────────────────────────────────────────┘        │
│                                                           │
│  ┌─────────────────────────────────────────────┐        │
│  │ Neon PostgreSQL                              │        │
│  │ - User data                                  │        │
│  │ - Validation history                         │        │
│  │ - Payment records                            │        │
│  └─────────────────────────────────────────────┘        │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 🎨 Frontend Stack Detail

```
React Application
├── UI Framework
│   ├── React 18.3.1 (Core)
│   ├── TypeScript (Type Safety)
│   └── Vite (Build Tool)
│
├── Styling
│   ├── Tailwind CSS (Utility-first)
│   ├── Radix UI (Headless Components)
│   │   ├── Dialog, Dropdown, Select
│   │   ├── Popover, Tooltip, Toast
│   │   └── 20+ accessible components
│   ├── shadcn/ui (Pre-built with Radix)
│   ├── Framer Motion (Animations)
│   └── Lucide Icons (450+ icons)
│
├── State Management
│   ├── TanStack Query (Server State)
│   ├── React Hook Form (Form State)
│   └── Zod (Validation)
│
├── Routing & Navigation
│   └── Wouter (10KB lightweight router)
│
├── Data Visualization
│   ├── Recharts (Charts)
│   └── Embla Carousel
│
└── Utilities
    ├── date-fns (Date manipulation)
    ├── html2canvas (Screenshots)
    └── class-variance-authority (Variants)
```

---

## ⚙️ Backend Stack Detail

```
Node.js Server
├── Core Framework
│   ├── Express 4.21.2
│   ├── TypeScript
│   └── ESM Modules
│
├── Authentication & Security
│   ├── Passport.js (Auth middleware)
│   ├── JWT (Token-based auth)
│   ├── cookie-parser (Session handling)
│   └── express-rate-limit (API protection)
│
├── Database Layer
│   ├── PostgreSQL (Neon Serverless)
│   ├── Drizzle ORM (Type-safe queries)
│   └── Drizzle-Zod (Schema validation)
│
├── File Processing
│   ├── Multer (Upload handling)
│   ├── PDFKit (PDF generation)
│   ├── jsPDF (Alternative PDF)
│   └── Puppeteer (Headless browser)
│
├── External APIs
│   ├── axios (HTTP client)
│   ├── Travel Buddy AI client
│   ├── OpenAI client
│   └── Stripe SDK
│
├── Caching & Performance
│   ├── memoizee (Function caching)
│   ├── bottleneck (Rate limiting)
│   └── Custom cache layer (24h TTL)
│
└── Utilities
    ├── csv-parse (CSV data)
    ├── @sendgrid/mail (Email)
    └── Winston/Custom logger
```

---

## 🤖 AI/ML Layer (RAG)

```
RAG Architecture
├── STEP 1: RETRIEVE (Data Sources)
│   │
│   ├── Primary: Travel Buddy AI
│   │   ├── Endpoint: POST /v2/visa/check
│   │   ├── Auth: X-RapidAPI-Key
│   │   ├── Data: Government-sourced
│   │   ├── Update: Daily
│   │   └── Coverage: 200×210 countries
│   │
│   ├── Fallback: Passport Index API
│   │   ├── Endpoint: GET /visa/{from}/{to}
│   │   ├── Auth: None (public)
│   │   └── Coverage: ~200 countries
│   │
│   └── Cache: CSV Data
│       ├── File: passport-index.csv
│       └── Loaded at startup
│
├── STEP 2: AUGMENT (Context Enhancement)
│   │
│   └── GPT-4o-mini
│       ├── Model: gpt-4o-mini
│       ├── Temperature: 0.1-0.2
│       ├── Context: Travel Buddy data
│       ├── Purpose: Add details
│       └── Response: JSON structured
│
└── STEP 3: GENERATE (Output Creation)
    │
    ├── Visa Types Service
    │   ├── Input: Country name
    │   ├── Context: Travel Buddy stats
    │   ├── Output: 5-10 visa types
    │   └── Cache: 24 hours
    │
    ├── Requirements Service
    │   ├── Input: Country + Visa type
    │   ├── Context: Official status
    │   ├── Output: Document checklist
    │   └── Cache: 24 hours
    │
    └── Document Validation
        ├── Vision: Document analysis
        ├── Compare: Requirements vs Document
        └── Output: Validation report + PDF
```

---

## 💾 Data Storage

```
Storage Layers
│
├── 1. PostgreSQL (Persistent)
│   ├── Database: Neon Serverless
│   ├── ORM: Drizzle
│   ├── Tables:
│   │   ├── users
│   │   ├── validations
│   │   ├── payments
│   │   └── sessions
│   └── Features:
│       ├── Auto-scaling
│       ├── Serverless
│       └── Type-safe queries
│
├── 2. Application Cache (Memory)
│   ├── Library: memoizee
│   ├── TTL: 1-24 hours
│   ├── Cached Data:
│   │   ├── Travel Buddy responses (1h)
│   │   ├── GPT responses (24h)
│   │   └── Visa types (24h)
│   └── Benefit: Reduce API costs
│
├── 3. File Storage (Temporary)
│   ├── Location: /tmp or memory
│   ├── Purpose: Uploaded documents
│   ├── Cleanup: After processing
│   └── Handler: Multer
│
└── 4. Static Cache (CSV)
    ├── File: passport-index.csv
    ├── Size: ~500KB
    ├── Purpose: Ultimate fallback
    └── Update: Manual
```

---

## 🔌 API Endpoints

```
External APIs Used
│
├── 1. Travel Buddy AI (Primary Data)
│   ├── Base: https://visa-requirement.p.rapidapi.com
│   ├── Endpoints:
│   │   ├── POST /v2/visa/check
│   │   ├── POST /v2/visa/map
│   │   └── GET /v2/health
│   ├── Auth: X-RapidAPI-Key
│   ├── Rate: 100 req/month (free)
│   └── Cost: $0-15/month
│
├── 2. OpenAI (AI Processing)
│   ├── Base: https://api.openai.com
│   ├── Endpoints:
│   │   └── POST /v1/chat/completions
│   ├── Models:
│   │   ├── gpt-4o-mini (primary)
│   │   └── gpt-4o (backup)
│   ├── Auth: Bearer token
│   └── Cost: Pay-as-you-go
│
├── 3. Passport Index (Fallback)
│   ├── Base: https://rough-sun-2523.fly.dev
│   ├── Endpoints:
│   │   ├── GET /visa/{from}/{to}
│   │   └── GET /country/{code}
│   ├── Auth: None
│   └── Cost: Free
│
└── 4. Stripe (Payment)
    ├── Base: https://api.stripe.com
    ├── SDK: stripe npm package
    ├── Endpoints: Various
    ├── Auth: API key
    └── Cost: 2.9% + $0.30/transaction
```

---

## 🚀 Build & Deploy

```
Development
├── Frontend: Vite dev server (Port 5173)
│   ├── Hot Module Replacement (HMR)
│   ├── Fast refresh
│   └── TypeScript compilation
│
├── Backend: tsx server (Port 5000)
│   ├── Watch mode
│   ├── Auto-restart
│   └── Environment variables from .env
│
└── Command: npm run dev

Production
├── Build Process
│   ├── Frontend:
│   │   └── vite build → dist/public/
│   ├── Backend:
│   │   └── esbuild → dist/index.js
│   └── Command: npm run build
│
├── Start Server
│   └── node dist/index.js
│
└── Features
    ├── Static file serving (Express)
    ├── API routes
    ├── SSR-ready
    └── Optimized bundles
```

---

## 📊 Performance Metrics

```
Optimization Strategy
│
├── Caching
│   ├── GPT responses: 24h cache
│   ├── Travel Buddy: 1h cache
│   ├── Visa types: 24h cache
│   └── Savings: ~70% API calls
│
├── Rate Limiting
│   ├── OpenAI: 50 req/min (Bottleneck)
│   ├── Travel Buddy: 100 req/month (free tier)
│   └── Express: Configurable per endpoint
│
├── Bundle Size
│   ├── Frontend: ~500KB gzipped
│   ├── Backend: ~2MB (with dependencies)
│   └── Optimization: Tree shaking, code splitting
│
└── Response Times
    ├── Static pages: <100ms
    ├── API calls: 200-500ms
    ├── GPT requests: 2-5 seconds
    └── Full validation: 5-10 seconds
```

---

## 🎯 SUMMARY: Top 10 Core Technologies

| # | Technology | Purpose | Why? |
|---|------------|---------|------|
| 1 | **React 18** | Frontend framework | Industry standard, rich ecosystem |
| 2 | **TypeScript** | Type safety | Catch errors early, better DX |
| 3 | **Vite** | Build tool | Fast HMR, modern bundling |
| 4 | **Tailwind CSS** | Styling | Rapid development, consistent design |
| 5 | **Express** | Backend framework | Simple, flexible, proven |
| 6 | **PostgreSQL** | Database | Reliable, powerful, scalable |
| 7 | **Travel Buddy AI** | Visa data | Daily updates, government sources |
| 8 | **OpenAI gpt-4o-mini** | AI processing | Fast, affordable, accurate |
| 9 | **Drizzle ORM** | Database ORM | Type-safe, lightweight |
| 10 | **Stripe** | Payment | Industry standard, easy integration |

---

**Total Tech Stack**: 90+ packages  
**Primary Language**: TypeScript (95%)  
**Architecture**: Full-stack monorepo with RAG AI  
**Lines of Code**: ~15,000+  
**Status**: ✅ Production-ready

**Date**: October 1, 2025
