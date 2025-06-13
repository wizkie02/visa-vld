import OpenAI from "openai";

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
    console.log(`Starting visa type fetch for ${country}`);
    
    // Add timeout to OpenAI request
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('OpenAI request timeout')), 8000)
    );

    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const openaiPromise = openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a visa information expert. Provide comprehensive, current visa types available for travelers to a specific country. Return accurate information about all visa categories including tourist, business, transit, student, work, and family visas. Include processing times, validity periods, and purposes. Respond with JSON in the specified format.`
        },
        {
          role: "user",
          content: `List all available visa types for ${country}. Return a JSON object with the following structure:

{
  "visaTypes": [
    {
      "id": "tourist-90",
      "name": "Tourist Visa (90 days)",
      "category": "tourist",
      "duration": "90 days",
      "purpose": "Tourism and leisure travel",
      "description": "Standard tourist visa for short-term visits",
      "processingTime": "3-5 business days",
      "fees": "$160"
    }
  ]
}

Include all major visa categories: tourist, business, transit, student, work, family, and other specific types available for ${country}.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const openaiResponse = await Promise.race([openaiPromise, timeoutPromise]) as any;

    const rawContent = openaiResponse.choices[0].message.content || '{}';
    console.log(`OpenAI raw response for ${country}:`, rawContent);
    
    const result = JSON.parse(rawContent);
    console.log(`Parsed result for ${country}:`, result);

    // Validate and structure the response
    const visaTypes: VisaType[] = result.visaTypes || [];
    console.log(`Extracted visa types for ${country}:`, visaTypes);
    
    const categorizedVisas: CountryVisaTypes = {
      country: country,
      lastUpdated: new Date().toISOString(),
      visaTypes: visaTypes,
      categories: {
        tourist: visaTypes.filter(v => v.category === 'tourist'),
        business: visaTypes.filter(v => v.category === 'business'),
        transit: visaTypes.filter(v => v.category === 'transit'),
        student: visaTypes.filter(v => v.category === 'student'),
        work: visaTypes.filter(v => v.category === 'work'),
        family: visaTypes.filter(v => v.category === 'family'),
        other: visaTypes.filter(v => !['tourist', 'business', 'transit', 'student', 'work', 'family'].includes(v.category))
      }
    };

    return categorizedVisas;
  } catch (error) {
    console.error('Error fetching visa types for', country, ':', error);
    
    // Return error indication to frontend for fallback handling
    throw new Error(`Failed to fetch visa types for ${country}: ${error.message}`);
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