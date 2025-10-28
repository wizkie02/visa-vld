/**
 * 🚀 ENHANCED VISA TYPES SERVICE
 *
 * Fixes the visa types API integration issue
 * Ensures proper data flow from APIs to ChatGPT
 */

import OpenAI from "openai";
import { getCountryVisaStats, getOfficialVisaData } from "./visa-api-service";
import { travelBuddyAPI, getCountryCode } from "./travel-buddy-api";
import { logger } from "./logger";
import Bottleneck from "bottleneck";
import { visaTypesCache, buildCacheKey } from "./enhanced-cache-service";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const GPT_MODEL = "gpt-3.5-turbo";

// Rate limiter for enhanced visa types service
const enhancedVisaTypesLimiter = new Bottleneck({
  reservoir: 40,
  reservoirRefreshAmount: 40,
  reservoirRefreshInterval: 60 * 1000,
  maxConcurrent: 4,
  minTime: 200,
  retryCount: 2,
  strategy: Bottleneck.strategy.LEAK,
});

export interface EnhancedVisaType {
  id: string;
  name: string;
  category: string;
  duration: string;
  purpose: string;
  description: string;
  requirements?: string[];
  processingTime?: string;
  fees?: {
    amount: string;
    currency: string;
    paymentMethods?: string[];
  };
  applicationMethods?: string[];
  officialSources?: {
    name: string;
    website: string;
  }[];
}

export interface EnhancedCountryVisaTypes {
  country: string;
  lastUpdated: string;
  visaTypes: EnhancedVisaType[];
  categories: {
    tourist: EnhancedVisaType[];
    business: EnhancedVisaType[];
    student: EnhancedVisaType[];
    work: EnhancedVisaType[];
    family: EnhancedVisaType[];
    transit: EnhancedVisaType[];
    other: EnhancedVisaType[];
  };
  source: string;
  confidence: number;
  basedOn: string;
  apiData: {
    travelBuddy?: any;
    passportIndex?: any;
  };
}

/**
 * ENHANCED VISA TYPES WITH MULTI-SOURCE DATA
 */
export async function fetchEnhancedVisaTypes(
  country: string,
  nationality?: string
): Promise<EnhancedCountryVisaTypes> {
  return enhancedVisaTypesLimiter.schedule(async () => {
    const startTime = Date.now();
    logger.info(`[ENHANCED-VISA-TYPES] Fetching visa types for ${country}`);

    try {
      // Check cache first
      const cacheKey = buildCacheKey('visa-types', country, nationality || 'any');
      const cached = visaTypesCache.get<EnhancedCountryVisaTypes>(cacheKey);
      if (cached) {
        logger.info(`[ENHANCED-VISA-TYPES] ✅ Cache hit for ${cacheKey} (source: ${cached.source})`);
        return cached;
      }

      // Check fallback cache for common countries (even faster)
      const fallbackCacheKey = `fallback-visa-types:${country.toLowerCase()}`;
      const fallbackCached = visaTypesCache.get<EnhancedCountryVisaTypes>(fallbackCacheKey);
      if (fallbackCached && !nationality) {
        logger.info(`[ENHANCED-VISA-TYPES] ✅ Fallback cache hit for ${country}`);
        return fallbackCached;
      }
    // STEP 1: Get data from multiple sources (SCRAPER FIRST, THEN APIs)
    let scrapedData = null;
    let travelBuddyData = null;
    let fallbackData = null;
    let hasApiData = false;

    try {
      // First: Try to scrape from official government website (most accurate)
      try {
        const { OfficialVisaScraper } = await import('./official-visa-scraper');
        const scraper = new OfficialVisaScraper();
        scrapedData = await scraper.scrapeVisaTypes(country);

        if (scrapedData && scrapedData.length > 0) {
          logger.info(`[ENHANCED-VISA-TYPES] ✅ Scraped ${scrapedData.length} visa types from official ${country} website`);
          hasApiData = true;
        }
      } catch (error) {
        logger.warn(`[ENHANCED-VISA-TYPES] Official scraper failed for ${country}`, error);
      }

      // Second: Get Travel Buddy data (if no scraped data)
      if (!scrapedData && nationality) {
        const countryCode = getCountryCode(country);
        const nationalityCode = getCountryCode(nationality);

        if (countryCode && nationalityCode) {
          try {
            travelBuddyData = await travelBuddyAPI.checkVisaRequirement(
              nationalityCode,
              countryCode
            );
            logger.info(`[ENHANCED-VISA-TYPES] ✅ Travel Buddy data for ${nationality} → ${country}`);
          } catch (error) {
            logger.warn(`[ENHANCED-VISA-TYPES] Travel Buddy API failed for ${nationality} → ${country}`, error);
          }
        }
      }

      // Third: Get Fallback API data (visa status confirmation)
      if (!scrapedData && nationality) {
        try {
          const { getOfficialVisaData } = await import('./visa-api-service');
          fallbackData = await getOfficialVisaData(nationality, country);
          logger.info(`[ENHANCED-VISA-TYPES] ✅ Fallback API data for ${nationality} → ${country}`);
        } catch (error) {
          logger.warn(`[ENHANCED-VISA-TYPES] Fallback API failed for ${nationality} → ${country}`, error);
        }
      }

      hasApiData = !!(scrapedData || travelBuddyData || fallbackData);
      logger.info(`[ENHANCED-VISA-TYPES] ✅ Got data for ${country}: Scraped=${!!scrapedData}, TravelBuddy=${!!travelBuddyData}, Fallback=${!!fallbackData}`);
    } catch (error) {
      logger.warn(`[ENHANCED-VISA-TYPES] API data unavailable for ${country}`, error as Error);
    }

    // STEP 2: Build enhanced prompt with structured data
    const systemPrompt = `You are a visa information expert. Provide accurate visa types for ${country} based on the data below.

RULES:
- Use the provided data as ground truth
- Include realistic fees and processing times
- Return only visa types that actually exist
- Keep responses concise and accurate`;

    const userPrompt = buildVisaTypesPrompt(country, nationality, scrapedData, travelBuddyData, fallbackData);

    // STEP 3: Generate enhanced visa types with GPT (no timeout)
    const gptStartTime = Date.now();
    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3, // Slightly higher temperature for faster responses
      max_tokens: 300, // Further limit response length for speed
    });

    const gptTime = Date.now() - gptStartTime;
    logger.info(`[ENHANCED-VISA-TYPES] ✅ GPT call completed in ${gptTime}ms`);

    const result = JSON.parse(response.choices[0].message.content || '{}');

    // STEP 4: Process and structure the response
    const enhancedVisaTypes = processVisaTypesResponse(result, country, scrapedData, travelBuddyData, fallbackData);

    // Cache the result
    visaTypesCache.set(cacheKey, enhancedVisaTypes, {
      ttl: hasApiData ? 604800 : 86400, // 7 days if API data, 1 day if GPT-only
      source: hasApiData ? 'enhanced-visa-types-multi-source' : 'enhanced-visa-types-gpt-only',
      confidence: enhancedVisaTypes.confidence
    });

    // Also cache in fallback cache for common countries (no nationality)
    if (!nationality && hasApiData) {
      const fallbackCacheKey = `fallback-visa-types:${country.toLowerCase()}`;
      visaTypesCache.set(fallbackCacheKey, enhancedVisaTypes, {
        ttl: 604800, // 7 days for fallback
        source: 'enhanced-visa-types-fallback',
        confidence: enhancedVisaTypes.confidence
      });
      logger.info(`[ENHANCED-VISA-TYPES] ✅ Cached fallback result for ${fallbackCacheKey}`);
    }

    const totalTime = Date.now() - startTime;
    logger.info(`[ENHANCED-VISA-TYPES] ✅ Complete in ${totalTime}ms: ${enhancedVisaTypes.visaTypes.length} visa types for ${country}`);
    logger.info(`[ENHANCED-VISA-TYPES] ✅ Cached result for ${cacheKey}`);

    return enhancedVisaTypes;

    } catch (error) {
      const totalTime = Date.now() - startTime;
      logger.error(`[ENHANCED-VISA-TYPES] ❌ Error for ${country} after ${totalTime}ms`, error as Error);

      // Return fallback response
      return getFallbackVisaTypes(country);
    }
  });
}

/**
 * Build enhanced prompt for visa types
 */
function buildVisaTypesPrompt(
  country: string,
  nationality: string | undefined,
  scrapedData: any,
  travelBuddyData: any,
  fallbackData: any
): string {
  let context = `Country: ${country}\n`;

  // Add scraped data (highest priority - from official government websites)
  if (scrapedData && scrapedData.length > 0) {
    context += `
OFFICIAL GOVERNMENT SCRAPED DATA (${scrapedData.length} visa types):
${JSON.stringify(scrapedData, null, 2)}

IMPORTANT: This data is scraped from official government websites - use it as the primary source!
`;
  }

  // Add Travel Buddy API response
  if (travelBuddyData) {
    context += `
TRAVEL BUDDY API RESPONSE:
${JSON.stringify(travelBuddyData, null, 2)}
`;
  }

  // Add Fallback API response
  if (fallbackData) {
    context += `
FALLBACK API RESPONSE:
${JSON.stringify(fallbackData, null, 2)}
`;
  }

  return `
${context}

TASK: Process the data above and return visa types for ${country} in JSON format.

${scrapedData ?
  'Use the scraped government data as the primary source. Format it into the required JSON structure.' :
  'Based on the API responses above, provide visa types for ' + country + '.'
}

Return JSON:
{
  "visaTypes": [
    {
      "name": "Visa Name",
      "category": "tourist|business|student|work|family|transit|other",
      "duration": "Duration",
      "purpose": "Purpose",
      "description": "Description",
      "requirements": ["req1", "req2"],
      "processingTime": "Processing time",
      "fees": {"amount": "Amount", "currency": "Currency"},
      "applicationMethods": ["Online", "Embassy"],
      "officialSources": [{"name": "Source", "website": "URL"}]
    }
  ]
}

Be concise but accurate based on the provided data.
`;
}

/**
 * Process and structure visa types response
 */
function processVisaTypesResponse(
  result: any,
  country: string,
  scrapedData: any,
  travelBuddyData: any,
  fallbackData: any
): EnhancedCountryVisaTypes {
  const visaTypes: EnhancedVisaType[] = (result.visaTypes || []).map((vt: any) => ({
    ...vt,
    // Ensure all required fields exist
    id: vt.id || vt.name?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
    category: vt.category || 'other',
    duration: vt.duration || 'Not specified',
    purpose: vt.purpose || 'Not specified',
    description: vt.description || vt.name || 'Not specified',
    requirements: vt.requirements || [],
    processingTime: vt.processingTime || 'Information not available',
    fees: vt.fees || { amount: 'Not specified', currency: travelBuddyData?.destination?.currency || 'USD' },
    applicationMethods: vt.applicationMethods || ['Contact embassy'],
    officialSources: vt.officialSources || []
  }));

  // Categorize visa types
  const categories = {
    tourist: visaTypes.filter(v => ['tourist', 'visitor', 'tourism'].includes(v.category?.toLowerCase())),
    business: visaTypes.filter(v => ['business', 'commercial'].includes(v.category?.toLowerCase())),
    student: visaTypes.filter(v => ['student', 'study', 'education', 'academic'].includes(v.category?.toLowerCase())),
    work: visaTypes.filter(v => ['work', 'employment', 'skilled', 'labor', 'working'].includes(v.category?.toLowerCase())),
    family: visaTypes.filter(v => ['family', 'spouse', 'partner', 'dependent', 'child'].includes(v.category?.toLowerCase())),
    transit: visaTypes.filter(v => ['transit', 'airside', 'stopover'].includes(v.category?.toLowerCase())),
    other: visaTypes.filter(v => !['tourist', 'visitor', 'tourism', 'business', 'commercial', 'transit', 'airside', 'stopover', 'student', 'study', 'education', 'academic', 'work', 'employment', 'skilled', 'labor', 'working', 'family', 'spouse', 'partner', 'dependent', 'child'].includes(v.category?.toLowerCase()))
  };

  // Determine confidence and source based on available data
  const hasScrapedData = scrapedData && scrapedData.length > 0;
  const hasApiData = !!(travelBuddyData || fallbackData);

  let source, confidence, basedOn;
  if (hasScrapedData) {
    source = 'Official Government Scraper';
    confidence = 0.99; // Highest confidence for scraped data
    basedOn = 'Official government website data';
  } else if (hasApiData) {
    source = 'Enhanced RAG (Travel Buddy + Fallback)';
    confidence = 0.95;
    basedOn = 'Travel Buddy AI + Fallback API data';
  } else {
    source = 'GPT-only';
    confidence = 0.75;
    basedOn = 'GPT knowledge base';
  }

  return {
    country,
    lastUpdated: new Date().toISOString(),
    visaTypes,
    categories,
    source,
    confidence,
    basedOn,
    apiData: {
      scraped: scrapedData,
      travelBuddy: travelBuddyData,
      fallback: fallbackData
    }
  };
}

/**
 * Fallback visa types for countries without API data
 */
function getFallbackVisaTypes(country: string): EnhancedCountryVisaTypes {
  const fallbackTypes: EnhancedVisaType[] = [
    {
      id: 'tourist_visa',
      name: 'Tourist Visa',
      category: 'tourist',
      duration: 'Up to 90 days',
      purpose: 'Tourism and short-term visits',
      description: 'Standard tourist visa for leisure travel',
      requirements: ['Valid passport', 'Passport photos', 'Proof of funds', 'Return ticket'],
      processingTime: 'Information not available',
      fees: { amount: 'Information not available', currency: 'Local currency' },
      applicationMethods: ['Contact embassy'],
      officialSources: []
    },
    {
      id: 'business_visa',
      name: 'Business Visa',
      category: 'business',
      duration: 'Up to 90 days',
      purpose: 'Business meetings and conferences',
      description: 'Visa for business-related activities',
      requirements: ['Valid passport', 'Invitation letter', 'Business documents'],
      processingTime: 'Information not available',
      fees: { amount: 'Information not available', currency: 'Local currency' },
      applicationMethods: ['Contact embassy'],
      officialSources: []
    }
  ];

  const categories = {
    tourist: fallbackTypes.filter(v => v.category === 'tourist'),
    business: fallbackTypes.filter(v => v.category === 'business'),
    student: [],
    work: [],
    family: [],
    transit: [],
    other: []
  };

  return {
    country,
    lastUpdated: new Date().toISOString(),
    visaTypes: fallbackTypes,
    categories,
    source: 'Fallback (Limited data)',
    confidence: 0.5,
    basedOn: 'Standard visa categories - please verify with official sources',
    apiData: {}
  };
}

