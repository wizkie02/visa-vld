/**
 * 🤖 OPENAI VISA ADVISOR SERVICE
 *
 * Uses OpenAI API with web search to get real-time visa information
 * Returns structured visa types for any country combination
 */

import OpenAI from "openai";
import { logger } from './logger';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface VisaTypeInfo {
  visa_type: string;
  purpose: string;
  eligibility: string;
  duration: string;
  application_method: string;
  processing_time: string;
  cost: string;
  required_documents: string[];
  last_updated: string;
  source: string;
}

export class OpenAIVisaAdvisor {
  private cache = new Map<string, { data: VisaTypeInfo[]; timestamp: number }>();
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours cache for performance

  /**
   * Get visa types using OpenAI API with web search
   */
  async getVisaTypes(originCountry: string, destinationCountry: string): Promise<VisaTypeInfo[]> {
    const cacheKey = `${originCountry.toLowerCase()}-${destinationCountry.toLowerCase()}`;

    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      logger.info(`[OPENAI-VISA] Cache hit for ${originCountry} → ${destinationCountry}`);
      return cached.data;
    }

    try {
      logger.info(`[OPENAI-VISA] Getting visa types for ${originCountry} → ${destinationCountry}`);

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert visa advisor working for a government immigration service. You MUST provide detailed, accurate visa information for ${originCountry} citizens visiting ${destinationCountry}.

CRITICAL REQUIREMENTS:
- NEVER use generic names like "Tourist Visa", "Business Visa"
- ALWAYS use official visa names: "B-1/B-2 Visitor Visa", "Schengen Visa Type C", "Temporary Resident Visa", etc.
- NEVER use ranges for fees - provide exact amounts: "$185 USD", "€80 EUR", "SGD 100"
- NEVER use "Not specified" - provide real, current information
- Include specific subclass numbers where applicable: "Subclass 600", "Type C", etc.

For each visa type, return:
{
  "visa_type": "EXACT OFFICIAL NAME (include subclass/type)",
  "purpose": "Specific purpose (tourism, business meetings, academic studies)",
  "eligibility": "Who can apply (age, citizenship, financial requirements)",
  "duration": "Exact validity period (up to 90 days, 6 months, etc)",
  "application_method": "How to apply (online portal, embassy, VFS center)",
  "processing_time": "Exact processing time (5-10 business days, 2-4 weeks)",
  "cost": "EXACT AMOUNT WITH CURRENCY SYMBOL",
  "required_documents": ["Document 1", "Document 2", "Document 3"],
  "last_updated": "${new Date().toISOString().split('T')[0]}",
  "source": "Official government immigration website"
}

Return ONLY a JSON array. No explanations, no markdown, just raw JSON.`
          },
          {
            role: "user",
            content: `Get comprehensive visa types for ${originCountry} citizens visiting ${destinationCountry}.

CRITICAL REQUIREMENT: Each visa type MUST have completely DIFFERENT, SPECIFIC documents. DO NOT INCLUDE ANY of these generic items: passport, visa application form, application form, basic documents.

Return 8-15 visa types with UNIQUE requirements:
- visa_type: Official name with subclass/type
- purpose: Specific purpose
- eligibility: Basic requirements
- duration: Validity period
- application_method: How to apply
- processing_time: Specific timeframe
- cost: EXACT amount with currency
- required_documents: 3-5 COMPLETELY DIFFERENT, SPECIFIC documents

FORBIDDEN WORDS (never use in required_documents): passport, application form, visa application, valid passport, basic documents, supporting documents.

EXAMPLE of CORRECT specific documents:
- Tourist visa: Hotel booking confirmations, Round-trip flight itineraries, Travel insurance certificates, Bank statements showing daily funds
- Business visa: Company invitation letterhead, Business registration certificates, Conference enrollment confirmations, Meeting schedules with dates/locations
- Student visa: University enrollment letters, Academic transcript copies, Course fee payment receipts, Financial guarantee letters from banks
- Work visa: Signed employment contracts, Professional license copies, Work permit pre-approvals, Employer tax identification documents
- Family visa: Official marriage certificates, Birth certificates of family members, Family member's residence cards, Sponsor bank statements
- Transit visa: Confirmed onward flight bookings, Final destination visa copies, Hotel reservations for transit, Transit travel insurance

ABSOLUTELY FORBIDDEN: passport, application form, visa application, basic documents, supporting documents.
Use real-time search for current 2025 ${destinationCountry} specific requirements.
Return JSON array only.

Current date: ${new Date().toISOString().split('T')[0]}
Origin: ${originCountry}
Destination: ${destinationCountry}`
          }
        ],
            temperature: 0.1, // Lower for faster, more consistent results
        max_tokens: 2000 // Reduced tokens for faster response
      });

      let result = response.choices[0].message.content;

      // Clean up the response - remove markdown formatting if present
      if (result.includes('```json')) {
        result = result.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
      } else if (result.includes('```')) {
        result = result.replace(/```\s*/g, '');
      }

      // Try to parse the response
      let visaTypes: VisaTypeInfo[];
      try {
        const parsed = JSON.parse(result);
        logger.info('[OPENAI-VISA] Successfully parsed JSON response');

        // If it's not an array, wrap it
        if (Array.isArray(parsed)) {
          visaTypes = parsed;
        } else if (parsed.visa_types || parsed.visaTypes || parsed.data || parsed.visas) {
          visaTypes = parsed.visa_types || parsed.visaTypes || parsed.data || parsed.visas;
        } else if (typeof parsed === 'object') {
          // Try to find an array property in the response
          const arrayValues = Object.values(parsed).filter(Array.isArray);
          if (arrayValues.length > 0) {
            visaTypes = arrayValues[0] as VisaTypeInfo[];
          } else {
            // If no array found, create one from the object
            visaTypes = [parsed as VisaTypeInfo];
          }
        } else {
          // Extract from response text if JSON parsing fails
          logger.warn('[OPENAI-VISA] Unexpected JSON structure, extracting from text');
          visaTypes = this.extractVisaTypesFromText(result);
        }
      } catch (error) {
        logger.warn('[OPENAI-VISA] Failed to parse JSON, extracting from text. Error:', error);
        visaTypes = this.extractVisaTypesFromText(result);
      }

      // Ensure we have a proper array
      if (!Array.isArray(visaTypes)) {
        visaTypes = [visaTypes];
      }

      // Process and validate each visa type
      visaTypes = visaTypes.map((visaType, index) => {
        // Filter out generic documents
        let filteredDocuments = Array.isArray(visaType.required_documents) ? visaType.required_documents : [];

        // Remove generic items
        const forbiddenWords = ['passport', 'application form', 'visa application', 'valid passport', 'basic documents', 'supporting documents'];
        filteredDocuments = filteredDocuments.filter(doc => {
          const lowerDoc = doc.toLowerCase();
          return !forbiddenWords.some(word => lowerDoc.includes(word));
        });

        // Add specific documents based on visa type if too few documents remain
        if (filteredDocuments.length < 2) {
          const visaPurpose = (visaType.purpose || '').toLowerCase();

          if (visaPurpose.includes('tourist')) {
            filteredDocuments = ['Hotel booking confirmations', 'Round-trip flight tickets', 'Travel insurance policy'];
          } else if (visaPurpose.includes('business')) {
            filteredDocuments = ['Company invitation letter', 'Business registration documents', 'Conference registration'];
          } else if (visaPurpose.includes('student') || visaPurpose.includes('study')) {
            filteredDocuments = ['University enrollment letter', 'Academic transcripts', 'Financial guarantee letter'];
          } else if (visaPurpose.includes('work') || visaPurpose.includes('employment')) {
            filteredDocuments = ['Signed employment contract', 'Professional certification', 'Work permit pre-approval'];
          } else if (visaPurpose.includes('family')) {
            filteredDocuments = ['Marriage certificate', 'Family member residence card', 'Sponsor bank statements'];
          } else if (visaPurpose.includes('transit')) {
            filteredDocuments = ['Confirmed onward flight booking', 'Final destination visa copy', 'Transit hotel reservation'];
          } else {
            filteredDocuments = ['Purpose-specific documents', 'Financial proof', 'Supporting paperwork'];
          }
        }

        return {
          visa_type: visaType.visa_type || visaType.name || `Visa Type ${index + 1}`,
          purpose: visaType.purpose || 'Not specified',
          eligibility: visaType.eligibility || 'Check embassy requirements',
          duration: visaType.duration || 'Not specified',
          application_method: visaType.application_method || visaType.applicationMethod || 'Embassy/Consulate',
          processing_time: visaType.processing_time || visaType.processingTime || 'Not specified',
          cost: visaType.cost || visaType.fees || 'Not specified',
          required_documents: filteredDocuments,
          last_updated: visaType.last_updated || new Date().toISOString().split('T')[0],
          source: visaType.source || 'OpenAI Research'
        };
      });

      // Cache the result
      this.cache.set(cacheKey, {
        data: visaTypes,
        timestamp: Date.now()
      });

      logger.info(`[OPENAI-VISA] ✅ Got ${visaTypes.length} visa types for ${originCountry} → ${destinationCountry}`);
      return visaTypes;

    } catch (error) {
      logger.error('[OPENAI-VISA] Error getting visa types:', error);
      throw new Error(`Failed to get visa types: ${(error as Error).message}`);
    }
  }

  /**
   * Extract visa types from text response when JSON parsing fails
   */
  private extractVisaTypesFromText(text: string): VisaTypeInfo[] {
    const visaTypes: VisaTypeInfo[] = [];

    // Look for common visa type patterns
    const visaTypePatterns = [
      /(?:visa|e-visa|evisa|electronic visa)/gi,
      /(?:work visa|employment visa|working visa)/gi,
      /(?:student visa|study visa)/gi,
      /(?:tourist visa|visitor visa|travel visa)/gi,
      /(?:business visa)/gi,
      /(?:family visa|dependent visa)/gi,
      /(?:transit visa|transit)/gi
    ];

    const lines = text.split('\n').filter(line => line.trim().length > 0);

    lines.forEach((line, index) => {
      const lowerLine = line.toLowerCase();

      // Check if this line mentions a visa type
      const hasVisaType = visaTypePatterns.some(pattern => pattern.test(lowerLine));

      if (hasVisaType) {
        // Extract basic information
        const visaType: VisaTypeInfo = {
          visa_type: `Visa Type ${index + 1}`,
          purpose: 'Not specified',
          eligibility: 'Check embassy requirements',
          duration: 'Not specified',
          application_method: 'Embassy/Consulate',
          processing_time: 'Not specified',
          cost: 'Not specified',
          required_documents: ['Valid passport', 'Application form'],
          last_updated: new Date().toISOString().split('T')[0],
          source: 'OpenAI Research (Text Extracted)'
        };

        // Try to extract specific information
        if (lowerLine.includes('tourist') || lowerLine.includes('visitor')) {
          visaType.visa_type = 'Tourist Visa';
          visaType.purpose = 'Tourism and short visits';
        }
        if (lowerLine.includes('business')) {
          visaType.visa_type = 'Business Visa';
          visaType.purpose = 'Business activities';
        }
        if (lowerLine.includes('work') || lowerLine.includes('employment')) {
          visaType.visa_type = 'Work Visa';
          visaType.purpose = 'Employment';
        }
        if (lowerLine.includes('student') || lowerLine.includes('study')) {
          visaType.visa_type = 'Student Visa';
          visaType.purpose = 'Education';
        }

        visaTypes.push(visaType);
      }
    });

    return visaTypes;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
    logger.info('[OPENAI-VISA] Cache cleared');
  }

  /**
   * Get cache status
   */
  getCacheStatus(): { [key: string]: { age: number; count: number } } {
    const status: { [key: string]: { age: number; count: number } } = {};
    const now = Date.now();

    for (const [key, cached] of this.cache.entries()) {
      status[key] = {
        age: Math.round((now - cached.timestamp) / 60000), // age in minutes
        count: cached.data.length
      };
    }

    return status;
  }
}

// Singleton instance
export const openaiVisaAdvisor = new OpenAIVisaAdvisor();