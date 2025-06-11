import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface VisaRequirement {
  id: string;
  title: string;
  description: string;
  required: boolean;
  formats?: string[];
  specificNotes?: string[];
  category: 'document' | 'financial' | 'personal' | 'travel' | 'health';
  processingTime?: string;
  additionalInfo?: string;
}

export interface ComprehensiveVisaRequirements {
  country: string;
  visaType: string;
  lastUpdated: string;
  officialSources: string[];
  requirements: VisaRequirement[];
  generalInfo: {
    processingTime: string;
    validity: string;
    fees: string;
    applicationMethods: string[];
  };
  importantNotes: string[];
  recentChanges?: string[];
}

export async function fetchCurrentVisaRequirements(
  destinationCountry: string, 
  visaType: string, 
  applicantNationality?: string
): Promise<ComprehensiveVisaRequirements> {
  
  const prompt = `You are a visa requirements expert. Provide the most current and comprehensive visa requirements for ${visaType} visa to ${destinationCountry}${applicantNationality ? ` for ${applicantNationality} citizens` : ''}. 

Please provide detailed, accurate, and up-to-date information including:

1. Complete list of required documents
2. Financial requirements and proof needed
3. Application procedures and timelines
4. Recent changes or updates to requirements
5. Official embassy/consulate sources
6. Processing times and fees
7. Validity periods and restrictions

Focus on providing information that would be current as of 2024-2025. Be specific about document formats, financial amounts, and any nationality-specific requirements.

Respond in JSON format with the following structure:
{
  "country": "${destinationCountry}",
  "visaType": "${visaType}",
  "lastUpdated": "current date",
  "officialSources": ["embassy websites", "consulate sites"],
  "requirements": [
    {
      "id": "unique_id",
      "title": "Document Name",
      "description": "Detailed description",
      "required": true/false,
      "formats": ["PDF", "Original"],
      "specificNotes": ["specific requirements"],
      "category": "document|financial|personal|travel|health",
      "processingTime": "if applicable",
      "additionalInfo": "extra details"
    }
  ],
  "generalInfo": {
    "processingTime": "typical processing time",
    "validity": "visa validity period",
    "fees": "current fees",
    "applicationMethods": ["online", "in-person", "mail"]
  },
  "importantNotes": ["key points", "recent changes"],
  "recentChanges": ["any 2024-2025 updates"]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are an expert visa consultant with access to the most current visa requirements from official government sources. Provide accurate, detailed, and up-to-date visa requirements information."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1 // Low temperature for factual accuracy
    });

    const requirementsData = JSON.parse(response.choices[0].message.content || '{}');
    
    // Validate and ensure proper structure
    const validatedRequirements: ComprehensiveVisaRequirements = {
      country: destinationCountry,
      visaType: visaType,
      lastUpdated: new Date().toISOString(),
      officialSources: requirementsData.officialSources || [],
      requirements: requirementsData.requirements || [],
      generalInfo: {
        processingTime: requirementsData.generalInfo?.processingTime || "Information not available",
        validity: requirementsData.generalInfo?.validity || "Information not available",
        fees: requirementsData.generalInfo?.fees || "Information not available",
        applicationMethods: requirementsData.generalInfo?.applicationMethods || ["Contact embassy"]
      },
      importantNotes: requirementsData.importantNotes || [],
      recentChanges: requirementsData.recentChanges || []
    };

    return validatedRequirements;

  } catch (error) {
    console.error("Error fetching visa requirements:", error);
    
    // Fallback with basic structure if AI request fails
    return {
      country: destinationCountry,
      visaType: visaType,
      lastUpdated: new Date().toISOString(),
      officialSources: [`${destinationCountry} Embassy Official Website`],
      requirements: [
        {
          id: "passport",
          title: "Valid Passport",
          description: "Original passport with at least 6 months validity from intended date of entry",
          required: true,
          formats: ["Original document"],
          specificNotes: ["Must have at least 2 blank pages for visa stamps"],
          category: "document"
        },
        {
          id: "application-form",
          title: "Visa Application Form",
          description: "Completed and signed visa application form",
          required: true,
          formats: ["PDF", "Online submission"],
          category: "document"
        },
        {
          id: "photo",
          title: "Passport Photograph",
          description: "Recent passport-sized photograph meeting specific requirements",
          required: true,
          formats: ["Physical photo", "Digital upload"],
          specificNotes: ["White background", "Taken within last 6 months"],
          category: "document"
        }
      ],
      generalInfo: {
        processingTime: "Please contact embassy for current processing times",
        validity: "Please contact embassy for validity information",
        fees: "Please contact embassy for current fees",
        applicationMethods: ["Contact embassy or consulate"]
      },
      importantNotes: [
        "Requirements may change frequently. Always verify with official embassy sources.",
        "Processing times may vary based on application volume and individual circumstances."
      ],
      recentChanges: []
    };
  }
}

export function generateRequirementsChecklist(requirements: ComprehensiveVisaRequirements): string {
  const checklist = `
COMPREHENSIVE VISA REQUIREMENTS CHECKLIST
==========================================

Destination: ${requirements.country}
Visa Type: ${requirements.visaType}
Last Updated: ${new Date(requirements.lastUpdated).toLocaleDateString()}

OFFICIAL SOURCES:
${requirements.officialSources.map(source => `• ${source}`).join('\n')}

GENERAL INFORMATION:
• Processing Time: ${requirements.generalInfo.processingTime}
• Visa Validity: ${requirements.generalInfo.validity}
• Application Fees: ${requirements.generalInfo.fees}
• Application Methods: ${requirements.generalInfo.applicationMethods.join(', ')}

REQUIRED DOCUMENTS:
==================

${requirements.requirements.map((req, index) => {
  let section = `${index + 1}. ${req.title} ${req.required ? '[REQUIRED]' : '[OPTIONAL]'}\n`;
  section += `   Description: ${req.description}\n`;
  
  if (req.formats && req.formats.length > 0) {
    section += `   Accepted Formats: ${req.formats.join(', ')}\n`;
  }
  
  if (req.specificNotes && req.specificNotes.length > 0) {
    section += `   Important Notes:\n`;
    req.specificNotes.forEach(note => {
      section += `   - ${note}\n`;
    });
  }
  
  if (req.processingTime) {
    section += `   Processing Time: ${req.processingTime}\n`;
  }
  
  if (req.additionalInfo) {
    section += `   Additional Info: ${req.additionalInfo}\n`;
  }
  
  section += `   Category: ${req.category.toUpperCase()}\n`;
  
  return section;
}).join('\n')}

IMPORTANT NOTES:
================
${requirements.importantNotes.map(note => `• ${note}`).join('\n')}

${requirements.recentChanges && requirements.recentChanges.length > 0 ? `
RECENT CHANGES (2024-2025):
===========================
${requirements.recentChanges.map(change => `• ${change}`).join('\n')}
` : ''}

DISCLAIMER:
===========
This information is provided for reference purposes only. Visa requirements can change 
frequently and without notice. Always verify current requirements with the official 
embassy or consulate before submitting your application.

Generated: ${new Date().toLocaleString()}
`;

  return checklist;
}