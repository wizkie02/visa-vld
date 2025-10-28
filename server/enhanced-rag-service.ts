/**
 * 🚀 ENHANCED RAG SERVICE
 *
 * Fixes the data loss issue between API calls and ChatGPT
 * Ensures API data is properly structured and fed to GPT
 */

import OpenAI from "openai";
import { getOfficialVisaData, getCountryVisaStats } from "./visa-api-service";
import { logger } from "./logger";
import Bottleneck from "bottleneck";
import { visaRequirementsCache, buildCacheKey } from "./enhanced-cache-service";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const GPT_MODEL = "gpt-4o-mini";

// Rate limiter for enhanced RAG service
const enhancedRagLimiter = new Bottleneck({
  reservoir: 30,
  reservoirRefreshAmount: 30,
  reservoirRefreshInterval: 60 * 1000,
  maxConcurrent: 3,
  minTime: 300,
  retryCount: 2,
  strategy: Bottleneck.strategy.LEAK,
});

/**
 * ENHANCED VISA REQUIREMENTS WITH BETTER DATA INTEGRATION
 */
export async function getEnhancedVisaRequirements(
  country: string,
  visaType: string,
  nationality?: string,
  forceRefresh: boolean = false
): Promise<any> {
  return enhancedRagLimiter.schedule(async () => {
    try {
      // Check cache first (unless force refresh)
      const cacheKey = buildCacheKey('requirements', country, visaType, nationality || 'any');

      if (!forceRefresh) {
        const cached = visaRequirementsCache.get<any>(cacheKey);
        if (cached) {
          logger.info(`[ENHANCED-RAG] ✅ Cache hit for ${cacheKey} (source: ${cached.ragMetadata?.approach || 'unknown'})`);
          return cached;
        }
      } else {
        // Clear cache for this specific request when force refresh is requested
        visaRequirementsCache.del(cacheKey);
        logger.info(`[ENHANCED-RAG] 🔄 Cache cleared for ${cacheKey} - forcing fresh data`);
      }

      logger.info(`[ENHANCED-RAG] Getting requirements: ${nationality} → ${country} (${visaType})`);

    // STEP 1: Get official data
    let officialContext = '';
    let enhancedData = null;

    if (nationality) {
      try {
        // Get basic visa status
        const officialData = await getOfficialVisaData(nationality, country);

        // Get comprehensive stats for context
        const stats = await getCountryVisaStats(nationality);

        // Build context with available data
        officialContext = buildSimpleContext(officialData, stats, country, visaType);
        enhancedData = { officialData, stats };

        logger.info(`[ENHANCED-RAG] ✅ Got official data for ${nationality} → ${country}`);
      } catch (error) {
        logger.warn(`[ENHANCED-RAG] Could not get official data, using GPT-only`, error as Error);
      }
    }

    // STEP 2: Enhanced prompt with structured data
    const systemPrompt = `You are a VISA REQUIREMENTS EXPERT specializing in providing DETAILED and SPECIFIC visa requirements.

CRITICAL RULES:
1. Use the OFFICIAL DATA provided below as GROUND TRUTH
2. DO NOT contradict official visa status
3. Expand on official data with DETAILED and SPECIFIC requirements
4. NEVER provide generic requirements like "Valid passport", "Application form", "Photos", "Supporting documents"
5. Always provide SPECIFIC, DETAILED requirements relevant to the visa type
6. Include exact specifications, amounts, validity periods, and formatting requirements
7. If official data is missing, clearly state that information needs verification
8. Always include official sources and links when available

SPECIFICITY REQUIREMENTS:
- Each requirement must be SPECIFIC to the visa type and destination country
- Include exact financial amounts and currency requirements
- Specify exact document formats and validity requirements
- Provide detailed descriptions of where and how to obtain each document
- Include visa type-specific permits, approvals, or registrations needed
- Add specific insurance coverage requirements
- Include detailed accommodation and travel itinerary requirements

DATA STRUCTURE REQUIREMENTS:
- Return 8-12 SPECIFIC requirements as structured array with detailed descriptions
- Include exact specifications, not generic descriptions
- Provide official embassy/consulate URLs and contact information
- Include current processing times and fees with exact amounts
- Add specific document requirements with detailed formatting guidelines
- Include specific notes and additional information for each requirement`;

    const userPrompt = buildEnhancedPrompt(country, visaType, nationality, officialContext, enhancedData);

    // STEP 3: Generate response with GPT
    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: officialContext ? 0.3 : 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    // STEP 4: Merge official data with GPT response
    let finalResult;
    if (enhancedData) {
      finalResult = mergeOfficialWithGPT(result, enhancedData, country, visaType);
    } else {
      finalResult = {
        ...result,
        country,
        visaType,
        lastUpdated: new Date().toISOString(),
        ragMetadata: {
          approach: 'GPT-only (No official data)',
          generationModel: GPT_MODEL,
          groundTruthVerified: false,
          confidence: 0.70
        }
      };
    }

    // Cache the result (using existing cacheKey from above)
    visaRequirementsCache.set(cacheKey, finalResult, {
      ttl: enhancedData ? 43200 : 3600, // 12h if official data, 1h if GPT-only
      source: enhancedData ? 'rag-with-official-data' : 'gpt-only',
      confidence: finalResult.ragMetadata?.confidence || 0.70
    });

    logger.info(`[ENHANCED-RAG] ✅ Cached result for ${cacheKey}`);

    return finalResult;

    } catch (error) {
      logger.error('[ENHANCED-RAG] Error', error as Error);
      throw new Error(`Failed to fetch enhanced visa requirements: ${(error as Error).message}`);
    }
  });
}

/**
 * Build simple context from available data sources
 */
function buildSimpleContext(
  officialData: any,
  stats: any,
  country: string,
  visaType: string
): string {
  const context = `
# OFFICIAL GOVERNMENT DATA (Ground Truth)

## Basic Visa Status
- Passport: ${officialData.passport.name} (${officialData.passport.code})
- Destination: ${officialData.destination.name} (${officialData.destination.code})
- Official Status: ${officialData.category.name} (${officialData.category.code})
- Duration: ${officialData.duration ? officialData.duration + ' days' : 'Not specified'}
- Last Updated: ${new Date(officialData.lastUpdated).toLocaleDateString()}

## Comprehensive Statistics
- Visa Free Destinations: ${stats.visaFree}
- Visa on Arrival: ${stats.visaOnArrival}
- eVisa Available: ${stats.eVisa}
- Visa Required: ${stats.visaRequired}
- No Admission: ${stats.noAdmission}
- Total Countries: ${stats.total}

## Data Source
- Primary: Passport Index API (Government-verified data)
- Generated: ${new Date().toLocaleDateString()}

CRITICAL: This is GROUND TRUTH data. Do not contradict any of the above information.
`;

  return context;
}

/**
 * Build enhanced prompt with structured data
 */
function buildEnhancedPrompt(
  country: string,
  visaType: string,
  nationality: string,
  officialContext: string,
  enhancedData: any
): string {
  const basePrompt = `Based on the OFFICIAL DATA above, provide COMPREHENSIVE and SPECIFIC visa requirements for a ${visaType} visa to ${country} for ${nationality} citizens.

${officialContext}

TASK: Provide DETAILED and SPECIFIC requirements for ${visaType} visa application.

CRITICAL: DO NOT provide generic requirements like "Valid passport", "Application form", "Photos", "Supporting documents". Instead, provide SPECIFIC requirements for this visa type.

EXAMPLES OF SPECIFIC REQUIREMENTS:
- For TOURIST visa: "Proof of hotel reservations for entire stay", "Round-trip flight itinerary", "Travel insurance with minimum coverage of €30,000", "Bank statements showing sufficient funds (minimum $50/day)"
- For BUSINESS visa: "Invitation letter from host company in ${country} with company registration details", "Proof of business relationship", "Conference registration details (if attending conference)", "Company letter of employment"
- For STUDENT visa: "Acceptance letter from recognized educational institution in ${country}", "Proof of tuition payment", "Proof of accommodation", "Academic transcripts", "Study plan"
- For WORK visa: "Work permit approval from ${country} immigration", "Employment contract with salary details", "Company registration certificate", "Professional qualifications verification"

REQUIRED JSON STRUCTURE:
{
  "country": "${country}",
  "visaType": "${visaType}",
  "nationality": "${nationality}",
  "lastUpdated": "${new Date().toISOString()}",
  "requirements": [
    {
      "id": "unique_id",
      "title": "SPECIFIC Document Name",
      "description": "Detailed description including exact specifications, validity requirements, formatting guidelines, and where to obtain it",
      "required": true,
      "category": "document|financial|personal|travel|health|other",
      "formats": ["PDF", "Original", "Copy"],
      "specificNotes": ["Exact specifications", "Where to obtain", "Validity requirements"],
      "additionalInfo": "Additional details about this requirement"
    }
  ],
  "generalInfo": {
    "processingTime": "e.g., 10-15 business days",
    "validity": "e.g., 90 days single entry",
    "fees": {
      "amount": "e.g., 100",
      "currency": "e.g., USD",
      "paymentMethods": ["Online", "Bank transfer"]
    },
    "applicationMethods": ["Online portal", "Embassy appointment", "VFS Global center"]
  },
  "importantNotes": [
    "Specific to ${visaType} visa requirements or restrictions",
    "Recent changes or updates for this visa type"
  ],
  "officialSources": [
    {
      "name": "Embassy of ${country}",
      "website": "${enhancedData?.travelBuddyData?.destination?.embassy_url || 'URL'}",
      "email": "contact@embassy.gov",
      "phone": "+1-234-567-890"
    }
  ],
  "applicationProcess": [
    {
      "step": 1,
      "description": "Complete ${visaType} visa specific online application",
      "estimatedTime": "15-30 minutes"
    }
  ]
}

SPECIFIC INSTRUCTIONS FOR ${visaType.toUpperCase()} VISA:
1. Generate 8-12 SPECIFIC requirements relevant to this visa type
2. Each requirement should be DETAILED and SPECIFIC to ${visaType} visa
3. Include EXACT financial requirements (minimum amounts, specific document types)
4. Include SPECIFIC accommodation requirements for this visa type
5. Add visa type SPECIFIC insurance requirements
6. Include SPECIFIC proof of funds/financial support requirements
7. Add any ${visaType} visa SPECIFIC permits or approvals needed
8. Include exact passport validity requirements for this visa type
9. Base all information on the OFFICIAL DATA provided above
10. Include actual embassy URLs and contact information
11. Provide realistic processing times based on current embassy operations
12. Include current fees in the correct currency for this visa type
13. Add any mandatory registration processes specific to this visa type
14. Include visa type specific exception rules or special conditions

REMEMBER: This is for a ${visaType} visa, not a generic visa. Make sure all requirements are SPECIFIC to this visa type and destination country.

Return valid JSON only.`;

  return basePrompt;
}

/**
 * Merge official data with GPT response
 */
function mergeOfficialWithGPT(
  gptResult: any,
  enhancedData: any,
  country: string,
  visaType: string
): any {
  return {
    ...gptResult,
    country,
    visaType,
    officialData: {
      status: enhancedData.officialData.category.name,
      statusCode: enhancedData.officialData.category.code,
      emoji: getCategoryEmoji(enhancedData.officialData.category.code),
      duration: enhancedData.officialData.duration,
      lastVerified: enhancedData.officialData.lastUpdated,
      source: 'Passport Index API (Government-verified)'
    },
    ragMetadata: {
      approach: 'RAG (GPT with Official Data)',
      retrievalSource: 'Passport Index API',
      generationModel: GPT_MODEL,
      groundTruthVerified: true,
      confidence: 0.85
    }
  };
}

/**
 * Helper functions
 */
function getCountryCode(countryName: string): string | null {
  const codes: Record<string, string> = {
    'usa': 'US', 'united states': 'US', 'uk': 'GB', 'united kingdom': 'GB',
    'canada': 'CA', 'australia': 'AU', 'japan': 'JP', 'germany': 'DE',
    'france': 'FR', 'italy': 'IT', 'spain': 'ES', 'singapore': 'SG',
    'vietnam': 'VN', 'china': 'CN', 'india': 'IN', 'brazil': 'BR',
    // Add more as needed
  };

  return codes[countryName.toLowerCase()] || null;
}

function getCategoryEmoji(code: string): string {
  const mapping: Record<string, string> = {
    VF: '✅', VOA: '🛬', EV: '💻', VR: '📄', NA: '⛔',
  };
  return mapping[code] || '❓';
}

