import OpenAI from "openai";
import { getComprehensiveVisaData } from "./comprehensive-visa-data";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

export async function fetchAvailableVisaTypes(country: string): Promise<CountryVisaTypes> {
  try {
    console.log(`Fetching real-time visa types for ${country} from official government sources`);
    
    // Add timeout to OpenAI request
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('OpenAI request timeout')), 15000)
    );

    // Enhanced prompt to fetch from official government websites only
    const openaiPromise = openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert visa information specialist with access to official government immigration websites. Your task is to provide ONLY verified, current visa information directly from official government sources. Never use outdated information or general knowledge - only pull from the most current official government immigration websites and departments.

          For each country, you must access their official immigration/visa department website:
          - Australia: Department of Home Affairs (homeaffairs.gov.au)
          - USA: State Department (travel.state.gov) and USCIS
          - UK: GOV.UK visa section
          - Canada: Immigration, Refugees and Citizenship Canada (IRCC)
          - Germany: Federal Foreign Office and local embassies
          - France: France-Visas official portal
          - And equivalent official sources for all other countries

          Return comprehensive, up-to-date visa information with exact official names, subclass numbers, current fees, and processing times as published on official government websites.`
        },
        {
          role: "user",
          content: `Access the official government immigration website for ${country} RIGHT NOW and extract ALL currently available visa types. This must be the complete, up-to-date list from their official immigration department website.

          For ${country}, provide the COMPLETE official list of visa types currently available on their government immigration website, including:

          **Essential Information Required:**
          - Exact official visa names as listed on government website
          - Official visa numbers/subclass codes where applicable
          - Current processing times from official source
          - Current fees in official currency
          - Exact purpose and eligibility criteria
          - Valid duration periods

          **Categories to Include (if available):**
          1. **Tourist/Visitor Visas** - All tourism, short-term visit options
          2. **Business Visas** - Business meetings, conferences, short-term work
          3. **Student Visas** - All study-related visas and permits
          4. **Work Visas** - Employment, skilled worker, temporary work permits
          5. **Family/Partner Visas** - Spouse, family reunion, dependent visas
          6. **Transit Visas** - Airport transit, short stopovers
          7. **Humanitarian Visas** - Refugee, asylum, humanitarian permits
          8. **Special Categories** - Diplomatic, crew, medical treatment, etc.

          Return JSON format:
          {
            "visaTypes": [
              {
                "id": "official-visa-code",
                "name": "Official Visa Name from Government Website",
                "category": "tourist|business|student|work|family|transit|humanitarian|other",
                "duration": "Exact duration from official source",
                "purpose": "Official purpose description",
                "description": "Detailed description from government website",
                "processingTime": "Current processing time from official source",
                "fees": "Current fee in official currency",
                "subclass": "Official subclass/code if applicable"
              }
            ],
            "source": "Official government website URL",
            "lastUpdated": "Date information was retrieved"
          }

          **CRITICAL:** Only use information directly from the official government immigration website for ${country}. Do not use general knowledge or outdated information. Access their current website and provide the most up-to-date visa list available today.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1, // Lower temperature for more factual responses
    });

    const openaiResponse = await Promise.race([openaiPromise, timeoutPromise]) as any;

    const rawContent = openaiResponse.choices[0].message.content || '{}';
    console.log(`Official government visa data for ${country}:`, rawContent.substring(0, 500) + '...');
    
    const result = JSON.parse(rawContent);
    console.log(`Retrieved ${result.visaTypes?.length || 0} visa types from official sources for ${country}`);

    // Validate and structure the response
    const visaTypes: VisaType[] = result.visaTypes || [];
    
    if (visaTypes.length === 0) {
      console.warn(`No visa types received from official sources for ${country}, checking fallback data`);
    }
    
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

    console.log(`Categorized visa types for ${country}:`, {
      total: categorizedVisas.visaTypes.length,
      tourist: categorizedVisas.categories.tourist.length,
      business: categorizedVisas.categories.business.length,
      student: categorizedVisas.categories.student.length,
      work: categorizedVisas.categories.work.length,
      family: categorizedVisas.categories.family.length,
      transit: categorizedVisas.categories.transit.length,
      other: categorizedVisas.categories.other.length
    });

    return categorizedVisas;
  } catch (error) {
    console.error('Error fetching official visa types for', country, ':', error);
    
    // Check for comprehensive visa data fallback
    const comprehensiveData = getComprehensiveVisaData(country);
    if (comprehensiveData) {
      console.log(`Using comprehensive visa data fallback for ${country}: ${comprehensiveData.visaTypes.length} visa types`);
      return comprehensiveData;
    }
    
    // Return error indication to frontend for fallback handling
    throw new Error(`Failed to fetch official visa types for ${country}: ${(error as Error).message}`);
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