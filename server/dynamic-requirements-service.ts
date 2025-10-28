import OpenAI from "openai";
import { getOfficialVisaData } from './visa-api-service';
import { logger } from './logger';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: 'passport' | 'photo' | 'financial' | 'form' | 'supporting' | 'medical' | 'other';
  formats?: string[];
  specificNotes?: string[];
}

export interface VisaSpecificRequirements {
  visaType: string;
  country: string;
  documents: DocumentRequirement[];
  additionalInfo: string[];
  processingNotes: string[];
}

export async function getVisaSpecificDocuments(
  country: string,
  visaType: string,
  visaSubclass?: string,
  nationality?: string
): Promise<VisaSpecificRequirements> {
  try {
    // ✅ RAG STEP 1: Get official visa status from Passport API
    let groundTruthContext = '';
    if (nationality) {
      try {
        const officialData = await getOfficialVisaData(nationality.toUpperCase(), country.toUpperCase());
        groundTruthContext = `\n\n📌 OFFICIAL VISA STATUS (Government-verified data from Travel Buddy):\n- Status: ${officialData.category.name} (${
          officialData.category.code === 'VF' ? 'Visa Free' :
          officialData.category.code === 'VOA' ? 'Visa on Arrival' :
          officialData.category.code === 'EV' ? 'E-Visa Available' :
          'Visa Required'
        })\n- Last Updated: ${officialData.lastUpdated}\n\nUSE THIS GROUND TRUTH when determining document requirements. Adjust requirements based on the official visa status.`;
        logger.info(`[RAG-DYNAMIC] ✅ Official data: ${nationality} → ${country}: ${officialData.category.name}`);
      } catch (err) {
        logger.warn(`[RAG-DYNAMIC] ⚠️ Could not fetch official data: ${err}`);
      }
    }

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('OpenAI API timeout')), 30000)
    );

    // ✅ RAG STEP 2+3: Augment with GPT-4o-mini using Travel Buddy data and generate detailed requirements
    const openaiPromise = openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a visa documentation expert with access to official government data. Provide comprehensive, accurate document requirements for specific visa types. Focus on official government requirements and include all mandatory and optional documents. Return detailed information in JSON format.${groundTruthContext}`
        },
        {
          role: "user",
          content: `Provide complete document requirements for ${visaType}${visaSubclass ? ` (subclass ${visaSubclass})` : ''} visa to ${country}${nationality ? ` for ${nationality} passport holders` : ''}.

Return a JSON object with this structure:
{
  "documents": [
    {
      "id": "passport",
      "name": "Valid Passport",
      "description": "Current passport with minimum 6 months validity",
      "required": true,
      "category": "passport",
      "formats": ["Original document"],
      "specificNotes": ["Must have at least 2 blank pages", "Validity must extend 6 months beyond intended stay"]
    }
  ],
  "additionalInfo": [
    "Processing time: 15-20 business days",
    "Application fee: $XXX"
  ],
  "processingNotes": [
    "Submit application at least 3 weeks before travel",
    "Incomplete applications will be rejected"
  ]
}

Include ALL required documents such as:
- Passport requirements (validity, pages, etc.)
- Application forms (specific form numbers if applicable)
- Photographs (size, background, recent requirements)
- Financial documents (bank statements, employment letters, tax returns)
- Supporting documents (travel itinerary, accommodation, invitation letters)
- Medical requirements (health insurance, medical examinations)
- Character documents (police clearances if required)
- Relationship documents (for family visas)
- Education documents (for student visas)
- Employment documents (for work visas)

Be specific about formats, timeframes, and official requirements. Include any country-specific or visa-specific variations.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2, // Low temperature for factual accuracy
    });

    const openaiResponse = await Promise.race([openaiPromise, timeoutPromise]) as any;
    const rawContent = openaiResponse.choices[0].message.content || '{}';
    console.log(`Document requirements for ${visaType} to ${country}:`, rawContent);
    
    const result = JSON.parse(rawContent);
    
    return {
      visaType,
      country,
      documents: result.documents || [],
      additionalInfo: result.additionalInfo || [],
      processingNotes: result.processingNotes || []
    };

  } catch (error: any) {
    console.error(`Error fetching document requirements for ${visaType}:`, error.message);
    
    // Return basic fallback requirements
    return {
      visaType,
      country,
      documents: [
        {
          id: "passport",
          name: "Valid Passport",
          description: "Current passport with minimum 6 months validity",
          required: true,
          category: "passport",
          formats: ["Original document"],
          specificNotes: ["Must have at least 2 blank pages"]
        },
        {
          id: "application-form",
          name: "Visa Application Form",
          description: "Completed and signed visa application form",
          required: true,
          category: "form",
          formats: ["PDF", "Online submission"]
        },
        {
          id: "passport-photo",
          name: "Passport Photographs",
          description: "Recent passport-style photographs",
          required: true,
          category: "photo",
          formats: ["35mm x 45mm", "Digital format"],
          specificNotes: ["White background", "Taken within last 6 months"]
        },
        {
          id: "financial-proof",
          name: "Financial Documentation",
          description: "Proof of sufficient funds for travel",
          required: true,
          category: "financial",
          formats: ["Bank statements", "Employment letter", "Tax returns"]
        }
      ],
      additionalInfo: ["Requirements may vary based on nationality and specific circumstances"],
      processingNotes: ["Contact embassy for complete requirements"]
    };
  }
}

export async function getAllDocumentCategories(): Promise<string[]> {
  return [
    'passport',
    'photo', 
    'financial',
    'form',
    'supporting',
    'medical',
    'other'
  ];
}