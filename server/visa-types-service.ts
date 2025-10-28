import OpenAI from "openai";
import { getComprehensiveVisaData } from "./comprehensive-visa-data";
import { getCountryVisaStats } from "./visa-api-service";
import { logger } from "./logger";

// DEBUG: Track rate limiter status
const RATE_LIMITER_DEBUG = {
  lastAccess: 0,
  queueSize: 0,
  activeRequests: 0
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Using GPT-4o-mini for fast responses
const GPT_MODEL = "gpt-4o-mini";

export interface VisaType {
  id: string;
  name: string;
  category: string;
  duration: string;
  purpose: string;
  description: string;
  requirements?: string[];
  processingTime?: string;
  fees?: string;
}

export interface CountryVisaTypes {
  country: string;
  lastUpdated: string;
  visaTypes: VisaType[];
  categories: {
    tourist: VisaType[];
    business: VisaType[];
    transit: VisaType[];
    student: VisaType[];
    work: VisaType[];
    family: VisaType[];
    other: VisaType[];
  };
}

/**
 * ✅ RAG APPROACH for Visa Types
 *
 * STEP 1: Get ground truth from Passport Index (what visas exist globally)
 * STEP 2: GPT-5 enhances with detailed info (fees, processing, descriptions)
 * STEP 3: Return verified + enhanced data
 */
export async function fetchAvailableVisaTypes(country: string, nationality?: string): Promise<CountryVisaTypes> {
  const functionStartTime = Date.now();
  logger.info(`[RAG-VISA-TYPES] === FUNCTION START === Fetching for ${country} at ${new Date().toISOString()}`);
  RATE_LIMITER_DEBUG.lastAccess = functionStartTime;
  RATE_LIMITER_DEBUG.activeRequests++;

  try {
    // STEP 1: Try to get ground truth from Passport API
    let groundTruthContext = '';
    let hasApiData = false;
    try {
      const stats = await getCountryVisaStats(country.toUpperCase());
      hasApiData = true;
      groundTruthContext = `
VERIFIED DATA from Passport Index (Government-sourced):
- Visa Free destinations: ${stats.visaFree}
- Visa on Arrival: ${stats.visaOnArrival}
- eVisa destinations: ${stats.eVisa}
- Visa Required: ${stats.visaRequired}
- Total destinations tracked: ${stats.total}

This shows ${country} issues these visa categories to travelers.
`;
      logger.info(`[RAG-VISA-TYPES] Got Passport API stats for ${country}: VF=${stats.visaFree}, VOA=${stats.visaOnArrival}, EV=${stats.eVisa}, VR=${stats.visaRequired}`);
    } catch (error) {
      logger.warn(`[RAG-VISA-TYPES] Could not get Passport API stats for ${country}`, error as Error);
      groundTruthContext = `Note: Travel Buddy API data unavailable for ${country}. Using GPT-4o-mini knowledge with fallback.`;
    }

    // DEBUG: Log the exact prompt being sent to GPT
    const systemPrompt = `You are a visa information expert. Your task is to provide accurate, comprehensive visa type information for ${country}.

CONTEXT DATA (for grounding):
${groundTruthContext}

Your role is to:
1. Use the VERIFIED DATA above as ground truth about visa categories
2. Provide detailed, accurate visa type information based on your knowledge of ${country}'s immigration system
3. Include official visa codes, fees, processing times, and requirements
4. Be transparent if certain information may not be current
5. Organize visa types by standard categories

Return factual, well-structured information with appropriate disclaimers about verification.`;

    const userPrompt = `CRITICAL: You MUST provide the EXHAUSTIVE, COMPLETE list of ALL visa types for ${country}.

${groundTruthContext ? 'Use the VERIFIED DATA above to understand what visa categories this country offers.' : ''}

**MANDATORY REQUIREMENT - READ CAREFULLY:**
- DO NOT provide only "popular" or "common" visas
- You MUST include ALL visa subclasses, even if they're rarely used
- For Australia: Include ALL subclasses from 100-990 series
- For USA: Include ALL A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W visa categories
- For Canada: Include ALL visitor, student, work, family, and permanent residency classes
- For UK: Include ALL Standard, Visit, Work, Study, Family routes

**For ${country.toUpperCase()}, you MUST include:**

${country.toLowerCase() === 'australia' ? `
**AUSTRALIA - ALL SUBCLASSES REQUIRED:**

**VISITOR VISAS (Required):**
- Subclass 600 (All streams: Tourist, Sponsored Family, Business Visitor, etc.)
- Subclass 601 (Electronic Travel Authority)
- Subclass 651 (eVisitor)
- Subclass 444 (Special Category)
- Subclass 090 (Special Purpose)

**STUDENT VISAS (Required):**
- Subclass 500 (All streams: Independent, Schools, ELICOS, VET, Higher Education, Postgraduate Research, Non-award, Foreign Affairs, Defence)
- Subclass 590 (Student Guardian)

**WORK VISAS (Required - ALL OF THEM):**
- Subclass 400 (Temporary Work - Short Stay)
- Subclass 402 (Training and Research)
- Subclass 403 (Temporary Work - International Relations)
- Subclass 405 (Investor Retirement)
- Subclass 407 (Training)
- Subclass 408 (Temporary Activity - All streams)
- Subclass 410 (Retirement)
- Subclass 417 (Working Holiday)
- Subclass 462 (Work and Holiday)
- Subclass 476 (Skilled - Recognised Graduate)
- Subclass 482 (Temporary Skill Shortage - All streams)
- Subclass 485 (Temporary Graduate)
- Subclass 489 (Skilled - Regional (Provisional))
- Subclass 491 (Skilled Work Regional (Provisional))
- Subclass 494 (Skilled Employer Sponsored Regional (Provisional))
- Subclass 870 (Parent Visa - Sponsored)
- Subclass 887 (Skilled Regional)
- Subclass 888 (Business Innovation and Investment)
- Subclass 890 (Business Owner)
- Subclass 891 (Investor)
- Subclass 892 (State/Territory Sponsored Business Owner)
- Subclass 893 (State/Territory Sponsored Investor)
- Subclass 994 (Medical Practitioner)

**FAMILY VISAS (Required - ALL OF THEM):**
- Subclass 100 (Partner)
- Subclass 101 (Parent)
- Subclass 103 (Parent)
- Subclass 115 (Remaining Relative)
- Subclass 116 (Carer)
- Subclass 143 (Contributory Parent)
- Subclass 173 (Contributory Parent (Temporary))
- Subclass 300 (Prospective Marriage)
- Subclass 309 (Partner (Provisional))
- Subclass 310 (Partner (Temporary))
- Subclass 445 (Dependent Child)
- Subclass 461 (New Zealand Citizen Family Relationship)

**PERMANENT RESIDENCY (Required):**
- Subclass 132 (Business Talent)
- Subclass 186 (Employer Nomination Scheme)
- Subclass 187 (Regional Sponsored Migration Scheme)
- Subclass 188 (Business Innovation and Investment)
- Subclass 189 (Skilled Independent)
- Subclass 190 (Skilled Nominated)
- Subclass 191 (Skilled Regional)

**SPECIAL VISAS (Required):**
- Subclass 151 (Former Resident)
- Subclass 152 (Former Resident)
- Subclass 155 (Resident Return)
- Subclass 157 (Resident Return)
- Subclass 159 (Resident Return)
- Subclass 160 (Resident Return)
- Subclass 161 (Resident Return)
- Subclass 162 (Resident Return)
- Subclass 163 (Resident Return)
- Subclass 165 (Resident Return)
- Subclass 167 (Resident Return)
- Subclass 168 (Resident Return)

**TRANSIT VISAS (Required):**
- Subclass 771 (Transit)
- Subclass 671 (Transit - Sponsored Family)

**BRIDGING VISAS (Required):**
- Subclass 010 (Bridging Visa A)
- Subclass 020 (Bridging Visa B)
- Subclass 030 (Bridging Visa C)
- Subclass 050 (Bridging Visa E)
- Subclass 051 (Bridging Visa D)
` : ''}

**MANDATORY OUTPUT FORMAT:**
{
  "visaTypes": [
    {
      "id": "official-subclass-number",
      "name": "EXACT OFFICIAL VISA NAME WITH SUBCLASS",
      "category": "tourist|business|student|work|family|transit|other",
      "duration": "Exact duration",
      "purpose": "Official purpose",
      "description": "Detailed description",
      "processingTime": "Current processing time",
      "fees": "Current fee with currency",
      "requirements": ["Requirement 1", "Requirement 2", "Requirement 3"],
      "applicationMethods": ["Method 1", "Method 2"]
    }
  ],
  "source": "Government official source",
  "lastUpdated": "${new Date().toISOString().split('T')[0]}",
  "totalVisaTypes": "NUMBER OF VISAS INCLUDED"
}

**CRITICAL INSTRUCTIONS:**
- Return MINIMUM 25-50 visa types for Australia
- Include ALL subclasses listed above
- NEVER use "Not specified" - provide real data
- Include ALL streams for visas with multiple streams
- Use exact official names with subclass numbers
- Provide real fees and processing times
- This is for immigration purposes - accuracy is CRITICAL
- Missing visa types will cause serious immigration issues

Current date: ${new Date().toISOString().split('T')[0]}`;

    // DEBUG: Log prompt lengths and content
    logger.info(`[DEBUG] GPT PROMPT ANALYSIS for ${country}:`);
    logger.info(`[DEBUG] System prompt length: ${systemPrompt.length} characters`);
    logger.info(`[DEBUG] User prompt length: ${userPrompt.length} characters`);
    logger.info(`[DEBUG] Total prompt length: ${(systemPrompt + userPrompt).length} characters`);
    logger.info(`[DEBUG] Ground Truth Context: ${groundTruthContext ? '✅ Available' : '❌ Missing'}`);
    logger.info(`[DEBUG] Context content: ${groundTruthContext.substring(0, 200)}...`);

    // DEBUG: Log the exact prompts being sent
    logger.info(`[DEBUG] === SYSTEM PROMPT START ===`);
    logger.info(systemPrompt);
    logger.info(`[DEBUG] === SYSTEM PROMPT END ===`);

    logger.info(`[DEBUG] === USER PROMPT START ===`);
    logger.info(userPrompt);
    logger.info(`[DEBUG] === USER PROMPT END ===`);

    // Add timeout to OpenAI request (30 seconds)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('OpenAI request timeout')), 30000)
    );

    // STEP 2: GPT-4o-mini enhances with detailed visa type information
    const startTime = Date.now();
    logger.info(`[RAG-VISA-TYPES] Calling GPT-4o-mini with context from ${hasApiData ? 'Travel Buddy/Passport Index' : 'fallback'} at ${new Date().toISOString()}`);

    const openaiPromise = openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2, // Low temperature for factual accuracy
    });

    logger.info(`[DEBUG] OpenAI request sent, waiting for response...`);

    const openaiResponse = await Promise.race([openaiPromise, timeoutPromise]) as any;

    const responseTime = Date.now() - startTime;
    logger.info(`[DEBUG] OpenAI response received in ${responseTime}ms (${(responseTime/1000).toFixed(1)} seconds)`);

    const rawContent = openaiResponse.choices[0].message.content || '{}';
    logger.info(`[DEBUG] === GPT RESPONSE START ===`);
    logger.info(`[DEBUG] Raw response length: ${rawContent.length} characters`);
    logger.info(`[DEBUG] Raw response preview: ${rawContent.substring(0, 1000)}...`);

    // DEBUG: Check if response looks like valid JSON
    const isValidJSON = rawContent.trim().startsWith('{') && rawContent.trim().endsWith('}');
    logger.info(`[DEBUG] Response appears to be valid JSON: ${isValidJSON ? '✅ Yes' : '❌ No'}`);

    logger.info(`[DEBUG] Full GPT response:`);
    logger.info(rawContent);
    logger.info(`[DEBUG] === GPT RESPONSE END ===`);

    let result;
    try {
      result = JSON.parse(rawContent);
      logger.info(`[DEBUG] ✅ JSON parsing successful`);
      logger.info(`[DEBUG] Response structure: ${Object.keys(result).join(', ')}`);
      logger.info(`[DEBUG] Visa types array length: ${result.visaTypes?.length || 0}`);

      if (result.visaTypes && result.visaTypes.length > 0) {
        logger.info(`[DEBUG] First visa type sample: ${JSON.stringify(result.visaTypes[0], null, 2)}`);
      }
    } catch (parseError) {
      logger.error(`[DEBUG] ❌ JSON parsing failed: ${parseError.message}`);
      logger.error(`[DEBUG] Attempted to parse: ${rawContent.substring(0, 200)}...`);
      throw new Error(`Invalid JSON response from GPT: ${parseError.message}`);
    }

    logger.info(`[RAG-VISA-TYPES] ✅ Retrieved ${result.visaTypes?.length || 0} visa types for ${country} (enhanced by GPT-4o-mini)`);

    // Validate and structure the response
    const visaTypes: VisaType[] = result.visaTypes || [];
    
    if (visaTypes.length === 0) {
      logger.warn(`[RAG-VISA-TYPES] No visa types from GPT-5 for ${country}, checking fallback`);
    }

    // STEP 3: Structure and categorize the enhanced data
    const categorizedVisas: CountryVisaTypes = {
      country: country,
      lastUpdated: new Date().toISOString(),
      visaTypes: visaTypes,
      categories: {
        tourist: visaTypes.filter(v => ['tourist', 'visitor', 'tourism'].includes(v.category?.toLowerCase())),
        business: visaTypes.filter(v => ['business', 'commercial'].includes(v.category?.toLowerCase())),
        transit: visaTypes.filter(v => ['transit', 'airside', 'stopover'].includes(v.category?.toLowerCase())),
        student: visaTypes.filter(v => ['student', 'study', 'education', 'academic'].includes(v.category?.toLowerCase())),
        work: visaTypes.filter(v => ['work', 'employment', 'skilled', 'labor', 'working'].includes(v.category?.toLowerCase())),
        family: visaTypes.filter(v => ['family', 'spouse', 'partner', 'dependent', 'child'].includes(v.category?.toLowerCase())),
        other: visaTypes.filter(v => !['tourist', 'visitor', 'tourism', 'business', 'commercial', 'transit', 'airside', 'stopover', 'student', 'study', 'education', 'academic', 'work', 'employment', 'skilled', 'labor', 'working', 'family', 'spouse', 'partner', 'dependent', 'child'].includes(v.category?.toLowerCase()))
      }
    };

    logger.info(`[RAG-VISA-TYPES] Categorized for ${country}: Total=${categorizedVisas.visaTypes.length}, Tourist=${categorizedVisas.categories.tourist.length}, Work=${categorizedVisas.categories.work.length}, Student=${categorizedVisas.categories.student.length}`);

    const totalTime = Date.now() - functionStartTime;
    logger.info(`[RAG-VISA-TYPES] === FUNCTION END === Total time: ${totalTime}ms (${(totalTime/1000).toFixed(1)}s) for ${country}`);
    RATE_LIMITER_DEBUG.activeRequests--;

    return categorizedVisas;
  } catch (error) {
    const totalTime = Date.now() - functionStartTime;
    logger.error(`[RAG-VISA-TYPES] === FUNCTION ERROR === Error for ${country} after ${totalTime}ms`, error as Error);
    RATE_LIMITER_DEBUG.activeRequests--;
    logger.error(`[DEBUG] Rate limiter status: Active=${RATE_LIMITER_DEBUG.activeRequests}, Last access=${Date.now() - RATE_LIMITER_DEBUG.lastAccess}ms ago`);

    // Check for comprehensive visa data fallback
    const comprehensiveData = getComprehensiveVisaData(country);
    if (comprehensiveData) {
      logger.info(`[RAG-VISA-TYPES] Using fallback data for ${country}: ${comprehensiveData.visaTypes.length} visa types`);
      return comprehensiveData;
    }

    // Return error indication to frontend for fallback handling
    throw new Error(`Failed to fetch visa types for ${country}: ${(error as Error).message}`);
  }
}

export function getVisaTypesByCategory(visaTypes: CountryVisaTypes, category: string): VisaType[] {
  const categoryKey = category.toLowerCase() as keyof typeof visaTypes.categories;
  return visaTypes.categories[categoryKey] || [];
}

export function getAllVisaTypes(visaTypes: CountryVisaTypes): VisaType[] {
  return visaTypes.visaTypes;
}

export function findVisaTypeById(visaTypes: CountryVisaTypes, id: string): VisaType | undefined {
  return visaTypes.visaTypes.find(visa => visa.id === id);
}