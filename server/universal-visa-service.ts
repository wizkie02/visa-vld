/**
 * 🌍 UNIVERSAL VISA SERVICE
 *
 * Supports ALL 195+ countries using existing APIs:
 * 1. Passport Index CSV (39,601 entries) - Free, comprehensive
 * 2. Travel Buddy API (210 destinations) - Premium fallback
 * 3. Smart templates for visa types generation
 */

import { passportIndexCache } from './passport-index-loader';
import { travelBuddyAPI } from './travel-buddy-api';
import { logger } from './logger';

interface UniversalVisaData {
  country: string;
  countryCode: string;
  visaStatus: 'visa free' | 'visa on arrival' | 'e-visa' | 'visa required' | 'no admission';
  visaTypes: VisaType[];
  confidence: number;
  sources: string[];
}

interface VisaType {
  id: string;
  name: string;
  category: string;
  duration: string;
  purpose: string;
  description: string;
  requirements: string[];
  processingTime: string;
  fees: { amount: string; currency: string };
  applicationMethods: string[];
  officialSources: { name: string; website: string }[];
}

export class UniversalVisaService {
  // Regional templates for visa types based on common patterns
  private readonly REGIONAL_TEMPLATES = {
    developed: {
      north_america: ['usa', 'canada'],
      europe: ['gb', 'de', 'fr', 'it', 'es', 'nl', 'se', 'no', 'dk', 'fi', 'ch', 'at'],
      asia_pacific: ['au', 'nz', 'jp', 'kr', 'sg'],
    },
    developing: {
      asia: ['in', 'cn', 'th', 'vn', 'id', 'my', 'ph'],
      latin_america: ['br', 'ar', 'mx', 'cl', 'pe', 'co'],
      africa: ['za', 'ke', 'ng', 'eg', 'ma'],
      eastern_europe: ['ru', 'pl', 'cz', 'hu', 'ro'],
    }
  };

  // Visa type templates based on country development level
  private readonly VISA_TYPE_TEMPLATES = {
    developed: {
      tourist: {
        id: 'tourist_visa',
        name: 'Tourist Visa',
        category: 'tourist',
        duration: 'Up to 90 days',
        purpose: 'Tourism, leisure, short visits',
        description: 'For tourism and short-term leisure visits',
        processingTime: '5-15 working days',
        fees: { amount: '50-150', currency: 'USD/EUR/GBP' },
        requirements: [
          'Valid passport (6+ months validity)',
          'Passport photos',
          'Proof of financial support',
          'Travel itinerary',
          'Travel insurance'
        ]
      },
      business: {
        id: 'business_visa',
        name: 'Business Visa',
        category: 'business',
        duration: 'Up to 90 days',
        purpose: 'Business meetings, conferences',
        description: 'For business-related activities',
        processingTime: '5-15 working days',
        fees: { amount: '100-200', currency: 'USD/EUR/GBP' },
        requirements: [
          'Valid passport',
          'Invitation letter from host company',
          'Business registration documents',
          'Proof of accommodation',
          'Round-trip ticket'
        ]
      },
      student: {
        id: 'student_visa',
        name: 'Student Visa',
        category: 'student',
        duration: '1-4 years',
        purpose: 'Academic studies',
        description: 'For full-time academic programs',
        processingTime: '2-8 weeks',
        fees: { amount: '100-300', currency: 'USD/EUR/GBP' },
        requirements: [
          'Valid passport',
          'Acceptance letter from educational institution',
          'Proof of financial support',
          'Academic transcripts',
          'Language proficiency test results'
        ]
      },
      work: {
        id: 'work_visa',
        name: 'Work Visa',
        category: 'work',
        duration: '1-4 years',
        purpose: 'Employment',
        description: 'For working in the country',
        processingTime: '1-6 months',
        fees: { amount: '200-500', currency: 'USD/EUR/GBP' },
        requirements: [
          'Valid passport',
          'Job offer from employer',
          'Work permit approval',
          'Professional qualifications',
          'Medical examination'
        ]
      }
    },
    developing: {
      tourist: {
        id: 'tourist_visa',
        name: 'Tourist Visa',
        category: 'tourist',
        duration: '30-90 days',
        purpose: 'Tourism, visits',
        description: 'For tourism and short visits',
        processingTime: '3-10 working days',
        fees: { amount: '25-100', currency: 'Local currency/USD' },
        requirements: [
          'Valid passport (6+ months)',
          'Passport photos (2-4)',
          'Hotel reservations',
          'Proof of funds',
          'Return ticket'
        ]
      },
      business: {
        id: 'business_visa',
        name: 'Business Visa',
        category: 'business',
        duration: '30-90 days',
        purpose: 'Business activities',
        description: 'For business meetings and activities',
        processingTime: '5-15 working days',
        fees: { amount: '50-150', currency: 'Local currency/USD' },
        requirements: [
          'Valid passport',
          'Invitation letter',
          'Company registration',
          'Business purpose proof'
        ]
      }
    }
  };

  /**
   * Get visa information for any country (195+ supported)
   */
  async getUniversalVisaInfo(destinationCountry: string, nationality?: string): Promise<UniversalVisaData> {
    const destCode = this.getCountryCode(destinationCountry);
    const natCode = nationality ? this.getCountryCode(nationality) : null;

    logger.info(`[UNIVERSAL-VISA] Getting visa info: ${natCode || 'Any'} → ${destCode}`);

    try {
      // Step 1: Try Travel Buddy API for detailed info
      if (natCode && destCode) {
        try {
          const travelBuddyData = await travelBuddyAPI.checkVisaRequirement(natCode, destCode);
          logger.info(`[UNIVERSAL-VISA] ✅ Travel Buddy data found: ${travelBuddyData.visaRules.primaryRule.name}`);

          return {
            country: travelBuddyData.destination.name,
            countryCode: destCode,
            visaStatus: this.parseVisaStatus(travelBuddyData.visaRules.primaryRule.name),
            visaTypes: this.generateVisaTypesFromRule(
              travelBuddyData.destination.name,
              travelBuddyData.visaRules.primaryRule.name,
              travelBuddyData.destination.currency || 'USD'
            ),
            confidence: 0.95,
            sources: ['Travel Buddy AI API']
          };
        } catch (error) {
          logger.warn(`[UNIVERSAL-VISA] Travel Buddy failed, using CSV fallback:`, error);
        }
      }

      // Step 2: Use Passport Index CSV (covers 195+ countries)
      if (natCode && destCode) {
        const csvData = passportIndexCache.lookup(natCode, destCode);
        if (csvData) {
          logger.info(`[UNIVERSAL-VISA] ✅ CSV data found: ${natCode} → ${destCode}: ${csvData.category.name}`);

          return {
            country: csvData.destination.name,
            countryCode: destCode,
            visaStatus: csvData.category.name.toLowerCase().replace(' ', '-') as any,
            visaTypes: this.generateVisaTypesFromRule(
              csvData.destination.name,
              csvData.category.name,
              'USD' // Default currency for CSV data
            ),
            confidence: 0.90,
            sources: ['Passport Index Dataset (GitHub)']
          };
        }
      }

      // Step 3: Generate smart template for destination country
      const templateData = this.generateTemplateForCountry(destCode);
      logger.info(`[UNIVERSAL-VISA] ✅ Using template for ${destinationCountry}`);

      return {
        country: destinationCountry,
        countryCode: destCode,
        visaStatus: 'visa required', // Default assumption
        visaTypes: templateData.visaTypes,
        confidence: 0.70,
        sources: ['Smart Template (Regional Pattern)']
      };

    } catch (error) {
      logger.error(`[UNIVERSAL-VISA] Error for ${destinationCountry}:`, error);

      // Ultimate fallback
      return {
        country: destinationCountry,
        countryCode: destCode || destinationCountry.toUpperCase(),
        visaStatus: 'visa required',
        visaTypes: this.getBasicFallbackVisaTypes(),
        confidence: 0.50,
        sources: ['Emergency Fallback']
      };
    }
  }

  /**
   * Generate visa types based on visa rule and country pattern
   */
  private generateVisaTypesFromRule(countryName: string, visaRule: string, currency: string): VisaType[] {
    const rule = visaRule.toLowerCase();
    const isDeveloped = this.isDevelopedCountry(countryName);
    const templates = isDeveloped ? this.VISA_TYPE_TEMPLATES.developed : this.VISA_TYPE_TEMPLATES.developing;

    const visaTypes: VisaType[] = [];

    // Always include tourist visa unless visa free
    if (!rule.includes('visa free') && !rule.includes('freedom')) {
      visaTypes.push({
        ...templates.tourist,
        fees: {
          amount: this.adjustFee(templates.tourist.fees.amount, rule),
          currency
        },
        officialSources: [{
          name: `${countryName} Embassy/Consulate`,
          website: this.generateEmbassyWebsite(countryName)
        }]
      });
    }

    // Add business visa for countries that typically require it
    if (rule.includes('visa required') || rule.includes('e-visa')) {
      visaTypes.push({
        ...templates.business,
        fees: {
          amount: this.adjustFee(templates.business.fees.amount, rule),
          currency
        },
        officialSources: [{
          name: `${countryName} Embassy/Consulate`,
          website: this.generateEmbassyWebsite(countryName)
        }]
      });
    }

    // Add student and work visas for developed countries
    if (isDeveloped) {
      visaTypes.push({
        ...templates.student,
        fees: {
          amount: this.adjustFee(templates.student.fees.amount, rule),
          currency
        },
        officialSources: [{
          name: `${countryName} Immigration`,
          website: this.generateImmigrationWebsite(countryName)
        }]
      });

      visaTypes.push({
        ...templates.work,
        fees: {
          amount: this.adjustFee(templates.work.fees.amount, rule),
          currency
        },
        officialSources: [{
          name: `${countryName} Immigration`,
          website: this.generateImmigrationWebsite(countryName)
        }]
      });
    }

    return visaTypes;
  }

  /**
   * Generate smart template for country based on regional patterns
   */
  private generateTemplateForCountry(countryCode: string): { visaTypes: VisaType[] } {
    const isDeveloped = this.isDevelopedCountryCode(countryCode);
    const templates = isDeveloped ? this.VISA_TYPE_TEMPLATES.developed : this.VISA_TYPE_TEMPLATES.developing;

    const visaTypes: VisaType[] = [];

    // Generate relevant visa types based on country development level
    Object.values(templates).forEach(template => {
      visaTypes.push({
        ...template,
        officialSources: [{
          name: `${countryCode.toUpperCase()} Embassy/Consulate`,
          website: this.generateEmbassyWebsite(countryCode.toUpperCase())
        }]
      });
    });

    return { visaTypes };
  }

  /**
   * Check if country is developed based on common patterns
   */
  private isDevelopedCountry(countryName: string): boolean {
    const developedCountries = [
      'united states', 'canada', 'united kingdom', 'germany', 'france', 'italy', 'spain',
      'netherlands', 'sweden', 'norway', 'denmark', 'finland', 'switzerland', 'austria',
      'australia', 'new zealand', 'japan', 'south korea', 'singapore', 'hong kong'
    ];

    return developedCountries.some(country =>
      countryName.toLowerCase().includes(country)
    );
  }

  private isDevelopedCountryCode(countryCode: string): boolean {
    const developedCodes = [
      'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK',
      'FI', 'CH', 'AT', 'AU', 'NZ', 'JP', 'KR', 'SG'
    ];

    return developedCodes.includes(countryCode.toUpperCase());
  }

  /**
   * Parse visa status from various formats
   */
  private parseVisaStatus(rule: string): 'visa free' | 'visa on arrival' | 'e-visa' | 'visa required' | 'no admission' {
    const ruleLower = rule.toLowerCase();

    if (ruleLower.includes('visa free') || ruleLower.includes('freedom')) {
      return 'visa free';
    }
    if (ruleLower.includes('visa on arrival') || ruleLower.includes('on arrival')) {
      return 'visa on arrival';
    }
    if (ruleLower.includes('e-visa') || ruleLower.includes('evisa') || ruleLower.includes('electronic')) {
      return 'e-visa';
    }
    if (ruleLower.includes('no admission') || ruleLower.includes('denied')) {
      return 'no admission';
    }

    return 'visa required';
  }

  /**
   * Adjust fee ranges based on visa complexity
   */
  private adjustFee(baseFee: string, visaRule: string): string {
    const rule = visaRule.toLowerCase();

    if (rule.includes('e-visa') || rule.includes('electronic')) {
      // e-Visas are typically cheaper
      return baseFee.replace(/\d+/, (match) => Math.floor(parseInt(match) * 0.6).toString());
    }

    return baseFee;
  }

  /**
   * Generate embassy website URL
   */
  private generateEmbassyWebsite(countryName: string): string {
    return `https://www.google.com/search?q=${encodeURIComponent(countryName + ' embassy visa information')}`;
  }

  /**
   * Generate immigration website URL
   */
  private generateImmigrationWebsite(countryName: string): string {
    return `https://www.google.com/search?q=${encodeURIComponent(countryName + ' immigration visa website')}`;
  }

  /**
   * Get country code from country name
   */
  private getCountryCode(country: string): string {
    const codes: Record<string, string> = {
      'afghanistan': 'AF', 'albania': 'AL', 'algeria': 'DZ', 'andorra': 'AD', 'angola': 'AO',
      'argentina': 'AR', 'armenia': 'AM', 'australia': 'AU', 'austria': 'AT', 'azerbaijan': 'AZ',
      'bahamas': 'BS', 'bahrain': 'BH', 'bangladesh': 'BD', 'barbados': 'BB', 'belarus': 'BY',
      'belgium': 'BE', 'belize': 'BZ', 'benin': 'BJ', 'bhutan': 'BT', 'bolivia': 'BO',
      'bosnia': 'BA', 'botswana': 'BW', 'brazil': 'BR', 'brunei': 'BN', 'bulgaria': 'BG',
      'burkina faso': 'BF', 'burundi': 'BI', 'cambodia': 'KH', 'cameroon': 'CM', 'canada': 'CA',
      'central african republic': 'CF', 'chad': 'TD', 'chile': 'CL', 'china': 'CN', 'colombia': 'CO',
      'comoros': 'KM', 'congo': 'CG', 'costa rica': 'CR', 'croatia': 'HR', 'cuba': 'CU',
      'cyprus': 'CY', 'czech republic': 'CZ', 'denmark': 'DK', 'djibouti': 'DJ', 'dominica': 'DM',
      'dominican republic': 'DO', 'east timor': 'TL', 'ecuador': 'EC', 'egypt': 'EG', 'el salvador': 'SV',
      'equatorial guinea': 'GQ', 'eritrea': 'ER', 'estonia': 'EE', 'ethiopia': 'ET', 'fiji': 'FJ',
      'finland': 'FI', 'france': 'FR', 'gabon': 'GA', 'gambia': 'GM', 'georgia': 'GE',
      'germany': 'DE', 'ghana': 'GH', 'greece': 'GR', 'grenada': 'GD', 'guatemala': 'GT',
      'guinea': 'GN', 'guinea-bissau': 'GW', 'guyana': 'GY', 'haiti': 'HT', 'honduras': 'HN',
      'hungary': 'HU', 'iceland': 'IS', 'india': 'IN', 'indonesia': 'ID', 'iran': 'IR',
      'iraq': 'IQ', 'ireland': 'IE', 'israel': 'IL', 'italy': 'IT', 'ivory coast': 'CI',
      'jamaica': 'JM', 'japan': 'JP', 'jordan': 'JO', 'kazakhstan': 'KZ', 'kenya': 'KE',
      'kiribati': 'KI', 'north korea': 'KP', 'south korea': 'KR', 'kosovo': 'XK', 'kuwait': 'KW',
      'kyrgyzstan': 'KG', 'laos': 'LA', 'latvia': 'LV', 'lebanon': 'LB', 'lesotho': 'LS',
      'liberia': 'LR', 'libya': 'LY', 'liechtenstein': 'LI', 'lithuania': 'LT', 'luxembourg': 'LU',
      'madagascar': 'MG', 'malawi': 'MW', 'malaysia': 'MY', 'maldives': 'MV', 'mali': 'ML',
      'malta': 'MT', 'marshall islands': 'MH', 'mauritania': 'MR', 'mauritius': 'MU', 'mexico': 'MX',
      'micronesia': 'FM', 'moldova': 'MD', 'monaco': 'MC', 'mongolia': 'MN', 'montenegro': 'ME',
      'morocco': 'MA', 'mozambique': 'MZ', 'myanmar': 'MM', 'namibia': 'NA', 'nauru': 'NR',
      'nepal': 'NP', 'netherlands': 'NL', 'new zealand': 'NZ', 'nicaragua': 'NI', 'niger': 'NE',
      'nigeria': 'NG', 'north macedonia': 'MK', 'norway': 'NO', 'oman': 'OM', 'pakistan': 'PK',
      'palau': 'PW', 'palestine': 'PS', 'panama': 'PA', 'papua new guinea': 'PG', 'paraguay': 'PY',
      'peru': 'PE', 'philippines': 'PH', 'poland': 'PL', 'portugal': 'PT', 'qatar': 'QA',
      'romania': 'RO', 'russia': 'RU', 'rwanda': 'RW', 'saint kitts and nevis': 'KN', 'saint lucia': 'LC',
      'saint vincent': 'VC', 'samoa': 'WS', 'san marino': 'SM', 'sao tome': 'ST', 'saudi arabia': 'SA',
      'senegal': 'SN', 'serbia': 'RS', 'seychelles': 'SC', 'sierra leone': 'SL', 'singapore': 'SG',
      'slovakia': 'SK', 'slovenia': 'SI', 'solomon islands': 'SB', 'somalia': 'SO', 'south africa': 'ZA',
      'south sudan': 'SS', 'spain': 'ES', 'sri lanka': 'LK', 'sudan': 'SD', 'suriname': 'SR',
      'swaziland': 'SZ', 'sweden': 'SE', 'switzerland': 'CH', 'syria': 'SY', 'taiwan': 'TW',
      'tajikistan': 'TJ', 'tanzania': 'TZ', 'thailand': 'TH', 'togo': 'TG', 'tonga': 'TO',
      'trinidad': 'TT', 'tunisia': 'TN', 'turkey': 'TR', 'turkmenistan': 'TM', 'tuvalu': 'TV',
      'uganda': 'UG', 'ukraine': 'UA', 'united arab emirates': 'AE', 'united kingdom': 'GB',
      'united states': 'US', 'uruguay': 'UY', 'uzbekistan': 'UZ', 'vanuatu': 'VU', 'vatican': 'VA',
      'venezuela': 'VE', 'vietnam': 'VN', 'yemen': 'YE', 'zambia': 'ZM', 'zimbabwe': 'ZW'
    };

    // Direct lookup
    const lower = country.toLowerCase();
    if (codes[lower]) return codes[lower];

    // Check if already a code
    if (/^[A-Z]{2}$/i.test(country)) return country.toUpperCase();

    return country.toUpperCase();
  }

  /**
   * Basic fallback visa types
   */
  private getBasicFallbackVisaTypes(): VisaType[] {
    return [
      {
        id: 'tourist_visa',
        name: 'Tourist Visa',
        category: 'tourist',
        duration: '30-90 days',
        purpose: 'Tourism and visits',
        description: 'Standard tourist visa',
        requirements: ['Valid passport', 'Photos', 'Itinerary', 'Proof of funds'],
        processingTime: '5-15 working days',
        fees: { amount: '50-100', currency: 'USD' },
        applicationMethods: ['Embassy/Consulate'],
        officialSources: []
      },
      {
        id: 'business_visa',
        name: 'Business Visa',
        category: 'business',
        duration: '30-90 days',
        purpose: 'Business activities',
        description: 'For business-related activities',
        requirements: ['Valid passport', 'Invitation letter', 'Business documents'],
        processingTime: '5-15 working days',
        fees: { amount: '100-200', currency: 'USD' },
        applicationMethods: ['Embassy/Consulate'],
        officialSources: []
      }
    ];
  }

  /**
   * Get supported countries count
   */
  getSupportedCountriesCount(): number {
    return 195; // All UN member states
  }

  /**
   * Check if country is supported
   */
  isCountrySupported(country: string): boolean {
    const code = this.getCountryCode(country);
    return code.length === 2;
  }
}

// Singleton instance
export const universalVisaService = new UniversalVisaService();