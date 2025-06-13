import OpenAI from "openai";

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
  visaSubclass?: string
): Promise<VisaSpecificRequirements> {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('OpenAI API timeout')), 15000)
    );

    const openaiPromise = openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a visa documentation expert. Provide comprehensive, accurate document requirements for specific visa types. Focus on official government requirements and include all mandatory and optional documents. Return detailed information in JSON format.`
        },
        {
          role: "user",
          content: `Provide complete document requirements for ${visaType}${visaSubclass ? ` (subclass ${visaSubclass})` : ''} visa to ${country}.

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
      temperature: 0.2,
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