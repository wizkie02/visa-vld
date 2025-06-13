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
          content: `List ALL available visa types for ${country}. For Australia, include the complete list of 134+ visa types with subclass numbers. Return a JSON object with the following structure:

{
  "visaTypes": [
    {
      "id": "subclass-601",
      "name": "Electronic Travel Authority (subclass 601)",
      "category": "tourist",
      "duration": "12 months multiple entry",
      "purpose": "Tourism and short business visits",
      "description": "Electronic travel authority for tourism and business",
      "processingTime": "Within minutes to 72 hours",
      "fees": "AUD $20",
      "subclass": "601"
    }
  ]
}

For ${country}, research and provide the COMPLETE official list including:
- ALL visitor visas (Electronic Travel Authority, eVisitor, Transit, Visitor, Work and Holiday, Working Holiday)
- ALL studying and training visas (Student, Student Guardian, Training)
- ALL family and partner visas (Adoption, Aged Parent, Carer, Child, Partner, etc.)
- ALL working and skilled visas (Business Innovation, Employer Nomination, Skilled Independent, etc.)
- ALL refugee and humanitarian visas
- ALL other visas (Bridging, Medical Treatment, Crew, etc.)
- ALL repealed visas that are no longer available

Include accurate subclass numbers, current processing times, and fees. This must be comprehensive - include every single visa type available.`
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