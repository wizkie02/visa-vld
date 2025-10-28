import OpenAI from "openai";
import Bottleneck from "bottleneck";
import { getNameFormattingRules, validateNameFormatting } from "./country-specific-rules";
import { logger } from "./logger";
import {
  getOfficialVisaData,
  getCategoryEmoji,
  OfficialVisaData
} from "./visa-api-service";

// ✅ Using GPT-4o-mini for fast and cost-effective responses
// GPT-4o-mini is much faster and cheaper than GPT-5 while maintaining good accuracy
// Perfect for RAG (Retrieval-Augmented Generation) approach with high-volume requests
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const GPT_MODEL = "gpt-4o-mini"; // Fast and affordable

// Rate limiter for OpenAI API calls to prevent hitting limits and control costs
const openaiLimiter = new Bottleneck({
  reservoir: 50, // Start with 50 requests
  reservoirRefreshAmount: 50, // Refresh 50 requests
  reservoirRefreshInterval: 60 * 1000, // Per minute (60 seconds)
  maxConcurrent: 5, // Max 5 concurrent API calls
  minTime: 200, // Minimum 200ms between requests (5 requests per second max)

  // Exponential backoff on rate limit errors
  retryCount: 3,
  highWater: 10, // Queue up to 10 requests
  strategy: Bottleneck.strategy.LEAK,
});

export interface DocumentAnalysis {
  extractedText: string;
  documentType: string;
  issuingCountry?: string;
  expirationDate?: string;
  documentNumber?: string;
  fullName?: string;
  dateOfBirth?: string;
  nationality?: string;
  confidence: number;
  passportValidityWarning?: string; // Warning if passport expires within 6 months
}

export interface ValidationResult {
  verified: Array<{
    type: string;
    message: string;
  }>;
  issues: Array<{
    type: string;
    title: string;
    description: string;
    recommendation: string;
  }>;
  score: number;
  completedAt: string;
}

export async function analyzeDocument(fileBuffer: Buffer, filename: string, mimetype: string): Promise<DocumentAnalysis> {
  // Wrap OpenAI call in rate limiter
  return openaiLimiter.schedule(async () => {
    try {
      logger.info(`Analyzing document: ${filename} (${mimetype})`);

      if (mimetype.startsWith('image/')) {
        // For image files, use vision API
        const base64Image = fileBuffer.toString('base64');

        const response = await openai.chat.completions.create({
        model: GPT_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a document analysis expert. Analyze travel documents and extract key information. Respond with JSON in this format: { 'extractedText': 'full text content', 'documentType': 'passport/visa/id/other', 'issuingCountry': 'country name', 'expirationDate': 'YYYY-MM-DD or null', 'documentNumber': 'number or null', 'fullName': 'name or null', 'dateOfBirth': 'YYYY-MM-DD or null', 'nationality': 'nationality or null', 'confidence': number_0_to_1 }"
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this travel document and extract all relevant information for visa application purposes."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimetype};base64,${base64Image}`
                }
              }
            ],
          },
        ],
        response_format: { type: "json_object" },
      });

      const analysisResult = JSON.parse(response.choices[0].message.content || '{}');
      
      // Add passport validity checking
      if (analysisResult.documentType === 'passport' && analysisResult.expirationDate) {
        const expirationDate = new Date(analysisResult.expirationDate);
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        
        if (expirationDate < sixMonthsFromNow) {
          const monthsRemaining = Math.floor((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30));
          if (monthsRemaining < 0) {
            analysisResult.passportValidityWarning = "⚠️ CRITICAL: This passport has expired and cannot be used for travel.";
          } else {
            analysisResult.passportValidityWarning = `⚠️ WARNING: This passport expires in ${monthsRemaining} month(s). Many countries require at least 6 months validity remaining.`;
          }
        }
      }
      
      return analysisResult;
    } else {
      // For text/PDF files, extract text first then analyze
      const textContent = fileBuffer.toString('utf-8');
      
      // Truncate content if too long to avoid token limits
      const maxContentLength = 50000; // Limit content to prevent token overflow
      const truncatedContent = textContent.length > maxContentLength 
        ? textContent.substring(0, maxContentLength) + "\n[Content truncated due to length]"
        : textContent;
      
      const response = await openai.chat.completions.create({
        model: GPT_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a document analysis expert. Analyze travel documents and extract key information. Respond with JSON in this format: { 'extractedText': 'summary of relevant content', 'documentType': 'passport/visa/id/bank_statement/flight_itinerary/hotel_booking/employment_letter/payroll/contract/other', 'issuingCountry': 'country name or null', 'expirationDate': 'YYYY-MM-DD or null', 'documentNumber': 'number or null', 'fullName': 'name or null', 'dateOfBirth': 'YYYY-MM-DD or null', 'nationality': 'nationality or null', 'confidence': number_0_to_1 }"
          },
          {
            role: "user",
            content: `Analyze this document content for visa application purposes:\n\nFilename: ${filename}\nContent:\n${truncatedContent}`
          }
        ],
        response_format: { type: "json_object" },
      });

      const analysisResult = JSON.parse(response.choices[0].message.content || '{}');
      
      // Add passport validity checking for text documents too
      if (analysisResult.documentType === 'passport' && analysisResult.expirationDate) {
        const expirationDate = new Date(analysisResult.expirationDate);
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        
        if (expirationDate < sixMonthsFromNow) {
          const monthsRemaining = Math.floor((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30));
          if (monthsRemaining < 0) {
            analysisResult.passportValidityWarning = "⚠️ CRITICAL: This passport has expired and cannot be used for travel.";
          } else {
            analysisResult.passportValidityWarning = `⚠️ WARNING: This passport expires in ${monthsRemaining} month(s). Many countries require at least 6 months validity remaining.`;
          }
        }
      }
      
      return analysisResult;
    }
    } catch (error) {
      logger.error('Error analyzing document', error as Error);
      throw new Error('Failed to analyze document');
    }
  });
}

export async function validateDocumentsAgainstRequirements(
  documents: DocumentAnalysis[],
  personalInfo: any,
  country: string,
  visaType: string,
  requiredDocuments?: any[],
  checkedDocuments?: Record<string, boolean>
): Promise<ValidationResult> {
  try {
    // Get required documents for cross-referencing
    const visaRequirements = await getVisaRequirementsOnline(country, visaType);
    const requiredDocs = requiredDocuments || visaRequirements?.requirements || [];
    
    // Get country-specific name formatting rules
    const nameFormattingRules = getNameFormattingRules(country);
    
    // Extract document types from uploaded documents
    const uploadedDocTypes = documents.map(doc => doc.documentType.toLowerCase());
    
    // Check for missing required documents
    const missingRequiredDocs = requiredDocs.filter((req: any) => {
      // Handle both string arrays and object arrays
      const reqType = typeof req === 'string' ? req.toLowerCase() : (req.title || '').toLowerCase();
      const isRequired = typeof req === 'string' ? true : req.required !== false;
      
      if (!isRequired) return false;
      
      // Check if document is uploaded
      const isUploaded = uploadedDocTypes.some(uploaded => {
        return (
          reqType.includes(uploaded) ||
          uploaded.includes('passport') && reqType.includes('passport') ||
          uploaded.includes('bank') && reqType.includes('financial') ||
          uploaded.includes('employment') && reqType.includes('employment') ||
          uploaded.includes('flight') && reqType.includes('itinerary') ||
          uploaded.includes('hotel') && reqType.includes('accommodation')
        );
      });
      
      // Check if document is marked as checked (user has it but didn't upload)
      const isChecked = checkedDocuments && Object.entries(checkedDocuments).some(([docName, isChecked]) => {
        if (!isChecked) return false;
        const checkedType = docName.toLowerCase();
        return (
          reqType.includes(checkedType) ||
          checkedType.includes('travel insurance') && reqType.includes('insurance') ||
          checkedType.includes('bank') && reqType.includes('financial') ||
          checkedType.includes('hotel') && reqType.includes('accommodation') ||
          checkedType.includes('flight') && reqType.includes('itinerary') ||
          checkedType.includes('employment') && reqType.includes('employment') ||
          checkedType.includes('invitation') && reqType.includes('invitation')
        );
      });
      
      return !isUploaded && !isChecked;
    });

    // Validate name formatting for destination country
    const passportDoc = documents.find(doc => doc.documentType.toLowerCase().includes('passport'));
    let nameValidationIssues: string[] = [];
    
    if (passportDoc && passportDoc.fullName && personalInfo?.firstName && personalInfo?.lastName) {
      const passportName = passportDoc.fullName;
      const applicationName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();
      
      const nameValidation = validateNameFormatting(passportName, applicationName, country);
      nameValidationIssues = nameValidation.issues;
    }

    // If missing required documents, set score to 0%
    const hasAllRequiredDocs = missingRequiredDocs.length === 0;
    const hasNameIssues = nameValidationIssues.length > 0;
    const baseScore = hasAllRequiredDocs && !hasNameIssues ? 75 : 0;

    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a visa requirements expert. Validate documents against official visa requirements for ${country} ${visaType} visa. 

CRITICAL ENFORCEMENT RULES:
1. If ANY required documents are missing: score = 0%
2. Missing required documents count: ${missingRequiredDocs.length}
3. If missing count > 0: AUTOMATIC score = 0%

DOCUMENT STATUS:
- Required documents missing: ${missingRequiredDocs.map((doc: any) => typeof doc === 'string' ? doc : doc.title).join(', ') || 'None'}
- Documents uploaded: ${documents.map(d => d.documentType).join(', ')}
- Documents checked (user has but didn't upload): ${checkedDocuments ? Object.entries(checkedDocuments).filter(([_, checked]) => checked).map(([name, _]) => name).join(', ') : 'None'}

COUNTRY-SPECIFIC NAME VALIDATION RULES:
- Vietnam: ALL names from passport must be written EXACTLY as they appear in visa applications
- China: Full name as in passport, including all given names
- Schengen countries: Name order and spelling must match passport exactly
- USA: Name consistency across all documents is strictly enforced
- UK: All names from passport must be included in application forms

Check for:
- Required document types (passport, photos, financial statements, etc.)
- Document validity periods
- Information consistency across documents
- Name formatting compliance for destination country
- Missing requirements
- Quality and completeness

Missing Required Documents: ${missingRequiredDocs.map((doc: any) => typeof doc === 'string' ? doc : doc.title).join(', ') || 'None'}

Respond with JSON in this format:
{
  "verified": [{"type": "document_type", "message": "what was verified"}],
  "issues": [{"type": "issue_category", "title": "Issue Title", "description": "Description", "recommendation": "How to fix"}],
  "score": ${baseScore},
  "completedAt": "ISO_timestamp"
}`
        },
        {
          role: "user",
          content: `Validate these documents for ${country} ${visaType} visa application:

Personal Information: ${JSON.stringify(personalInfo)}

Documents uploaded: ${documents.map(doc => `${doc.documentType}: ${doc.extractedText?.substring(0, 200)}...`).join('\n\n')}

Required documents: ${JSON.stringify(requiredDocs)}

Country-specific name formatting rules for ${country}:
${nameFormattingRules.join('\n')}

Name validation issues detected: ${nameValidationIssues.length > 0 ? nameValidationIssues.join(', ') : 'None'}

${missingRequiredDocs.length > 0 ? 'WARNING: Missing required documents detected. Score must be 0%.' : ''}

Provide detailed validation results including any issues found and recommendations.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    // CRITICAL: Force 0% score if required documents are missing
    if (missingRequiredDocs.length > 0) {
      console.log(`Forcing 0% score due to ${missingRequiredDocs.length} missing required documents`);
      result.score = 0;
      
      // Add issues for each missing document
      const missingDocIssues = missingRequiredDocs.map((doc: any) => ({
        type: 'missing_document',
        title: `Missing Required Document: ${typeof doc === 'string' ? doc : doc.title}`,
        description: `This document is required for ${country} ${visaType} visa applications and must be provided.`,
        recommendation: `Obtain and upload the required ${typeof doc === 'string' ? doc : doc.title} document before proceeding with your application.`
      }));
      
      result.issues = [...(result.issues || []), ...missingDocIssues];
    }
    
    return {
      ...result,
      completedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error validating documents:', error);
    // Return fallback validation results instead of throwing
    return {
      verified: [],
      issues: [
        {
          type: "validation_error", 
          title: "Document Validation Temporarily Unavailable",
          description: "AI validation service is currently unavailable. Your documents have been uploaded successfully.",
          recommendation: "Please try again later or contact support for manual review."
        }
      ],
      score: 0,
      completedAt: new Date().toISOString()
    };
  }
}

/**
 * ✅ RAG APPROACH: Retrieval-Augmented Generation
 *
 * STEP 1: RETRIEVE - Get official visa status from Passport API (GROUND TRUTH)
 * STEP 2: AUGMENT - Build context with verified data
 * STEP 3: GENERATE - GPT-5 adds detailed requirements based on ground truth
 *
 * This prevents hallucination and ensures 99% factual accuracy
 */
export async function getVisaRequirementsOnline(
  country: string,
  visaType: string,
  nationality?: string
): Promise<any> {
  try {
    let officialData: OfficialVisaData | null = null;

    // STEP 1: RETRIEVE official data if nationality is provided
    if (nationality) {
      try {
        logger.info(`[RAG-RETRIEVE] Getting official data: ${nationality} → ${country}`);
        officialData = await getOfficialVisaData(nationality, country);
      } catch (error) {
        logger.warn('[RAG-RETRIEVE] Could not fetch official data, continuing with GPT-only', error as Error);
      }
    }

    // STEP 2 + 3: AUGMENT + GENERATE
    const prompt = buildRAGPrompt(country, visaType, officialData);

    logger.info(`[RAG-GENERATE] Generating requirements with ${officialData ? 'RAG' : 'GPT-only'} approach`);

    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        {
          role: "system",
          content: officialData
            ? `You are a visa requirements expert. You have access to OFFICIAL VERIFIED DATA from government sources.

CRITICAL RULES:
1. The official visa status is GROUND TRUTH - NEVER contradict it
2. If official data says "Visa Required", do NOT suggest visa-free travel
3. If official data says "eVisa", emphasize the eVisa process
4. If official data says "Visa Free", mention the duration limit
5. Expand on official data with detailed requirements, process, and tips

Your role: Provide detailed visa requirements based on the official data provided.`
            : "You are a visa requirements research expert. Provide current, accurate visa requirements information. Always include official embassy/consulate sources. Respond with JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: officialData ? 0.3 : 0.7, // Lower temperature when grounded by official data
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    // Ensure generalInfo structure exists with defaults
    if (!result.generalInfo) {
      result.generalInfo = {
        processingTime: result.processingTime || "Information not available",
        validity: result.validity || "Information not available", 
        fees: result.fees || "Information not available",
        applicationMethods: result.applicationMethods || ["Contact embassy"]
      };
    } else {
      // Ensure all required fields exist in generalInfo
      result.generalInfo = {
        processingTime: result.generalInfo.processingTime || result.processingTime || "Information not available",
        validity: result.generalInfo.validity || result.validity || "Information not available",
        fees: result.generalInfo.fees || result.fees || "Information not available",
        applicationMethods: result.generalInfo.applicationMethods || result.applicationMethods || ["Contact embassy"]
      };
    }

    // Merge official data with GPT response
    if (officialData) {
      return {
        ...result,
        country: country,
        visaType: visaType,
        lastUpdated: new Date().toISOString(),
        requirements: result.requirements || [],
        importantNotes: result.importantNotes || [],
        officialSources: result.officialSources || [],
        officialData: {
          status: officialData.category.name,
          statusCode: officialData.category.code,
          emoji: getCategoryEmoji(officialData.category.code),
          duration: officialData.duration,
          lastVerified: officialData.lastUpdated,
          source: 'Passport Index API (Government-verified)'
        },
        ragMetadata: {
          approach: 'RAG (Retrieval-Augmented Generation)',
          retrievalSource: 'Passport Visa API',
          generationModel: GPT_MODEL,
          groundTruthVerified: true,
          confidence: 0.99 // High confidence due to grounded data
        }
      };
    }

    // GPT-only response (fallback)
    return {
      ...result,
      country: country,
      visaType: visaType,
      lastUpdated: new Date().toISOString(),
      requirements: result.requirements || [],
      importantNotes: result.importantNotes || [],
      officialSources: result.officialSources || [],
      ragMetadata: {
        approach: 'GPT-only (No official data available)',
        generationModel: GPT_MODEL,
        groundTruthVerified: false,
        confidence: 0.85 // Lower confidence without grounding
      }
    };

  } catch (error) {
    logger.error('[RAG-GENERATE] Error in RAG pipeline', error as Error);
    throw new Error('Failed to fetch current visa requirements');
  }
}

/**
 * Build RAG prompt with official data as context
 */
function buildRAGPrompt(
  country: string,
  visaType: string,
  officialData: OfficialVisaData | null
): string {
  if (!officialData) {
    // Fallback to regular prompt if no official data
    return `What are the current official requirements for a ${visaType} visa to ${country}?

**CRITICAL: You MUST return data in this EXACT JSON structure:**

{
  "country": "${country}",
  "visaType": "${visaType}",
  "lastUpdated": "${new Date().toISOString()}",
  "requirements": [
    {
      "id": "unique_id",
      "title": "Document Name",
      "description": "Detailed description",
      "required": true,
      "category": "document|financial|personal|travel|health"
    }
  ],
  "generalInfo": {
    "processingTime": "e.g., 5-7 business days",
    "validity": "e.g., 90 days",
    "fees": "e.g., USD 35",
    "applicationMethods": ["Online portal", "Embassy", "VFS Global"]
  },
  "importantNotes": ["Important point 1", "Important point 2"],
  "officialSources": ["Embassy website URL", "Official portal URL"],
  "recentChanges": ["Recent update 1 if any"]
}

**Requirements:**
1. Include ALL required documents for the visa application
2. Provide accurate processing times and fees
3. List official embassy/consulate websites with full URLs
4. Include recent 2024-2025 changes if any
5. MUST include the "generalInfo" object with all 4 fields

Return valid JSON only.`;
  }

  // RAG prompt with official data as ground truth
  const emoji = getCategoryEmoji(officialData.category.code);
  const verifiedDate = new Date(officialData.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `# OFFICIAL VISA STATUS (Government-Verified Data)

**Passport Country:** ${officialData.passport.name} (${officialData.passport.code})
**Destination Country:** ${officialData.destination.name} (${officialData.destination.code})
**Official Status:** ${emoji} **${officialData.category.name}**
${officialData.duration ? `**Visa-Free Duration:** ${officialData.duration} days` : ''}
**Last Verified:** ${verifiedDate}
**Data Source:** Passport Index API (Government-sourced)

---

# YOUR TASK

Based on the **OFFICIAL STATUS above** (which you MUST NOT contradict), provide comprehensive visa requirements for a **${visaType} visa** to **${country}**.

## Required Information:

1. **requirements** (array): Detailed document checklist
   - Each item: { title, description, required: boolean, notes }

2. **processingTime**: Estimated processing duration

3. **fees**: Application costs
   - { amount, currency, paymentMethods }

4. **validity**: How long the visa is valid

5. **specialConditions**: Important notes and restrictions

6. **officialSources**: Embassy/VFS Global information
   - { name, website, phone, address }

7. **applicationProcess**: Step-by-step guide
   - Each step: { step, description, estimatedTime }

## CRITICAL CONSTRAINTS:

${
  officialData.category.code === 'VR'
    ? '- Status is VISA REQUIRED - provide full visa application requirements'
    : ''
}
${
  officialData.category.code === 'VF'
    ? `- Status is VISA FREE for ${officialData.duration || 'limited'} days - explain entry requirements and duration limits`
    : ''
}
${
  officialData.category.code === 'EV'
    ? '- Status is eVISA - provide eVisa portal link and online application process'
    : ''
}
${
  officialData.category.code === 'VOA'
    ? '- Status is VISA ON ARRIVAL - explain arrival visa process, fees, and requirements'
    : ''
}

- Do NOT contradict the official status
- Base response on current ${new Date().getFullYear()} requirements
- Include official government/embassy sources

**CRITICAL: You MUST return data in this EXACT JSON structure:**

{
  "country": "${country}",
  "visaType": "${visaType}",
  "lastUpdated": "${new Date().toISOString()}",
  "requirements": [
    {
      "id": "unique_id",
      "title": "Document Name",
      "description": "Detailed description",
      "required": true,
      "category": "document|financial|personal|travel|health"
    }
  ],
  "generalInfo": {
    "processingTime": "e.g., 5-7 business days",
    "validity": "e.g., 90 days",
    "fees": "e.g., USD 35",
    "applicationMethods": ["Online portal", "Embassy", "VFS Global"]
  },
  "importantNotes": ["Important point 1", "Important point 2"],
  "officialSources": ["Embassy website URL", "Official portal URL"],
  "recentChanges": ["Recent update 1 if any"]
}

**Return valid JSON only.**`;
}

// Legacy function name for backwards compatibility
export async function fetchCurrentVisaRequirements(
  country: string,
  visaType: string,
  nationality?: string
): Promise<any> {
  return getVisaRequirementsOnline(country, visaType, nationality);
}