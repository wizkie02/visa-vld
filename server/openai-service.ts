import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface DocumentAnalysis {
  extractedText: string;
  documentType: string;
  issuingCountry?: string;
  expirationDate?: string;
  documentNumber?: string;
  fullName?: string;
  dateOfBirth?: string;
  nationality?: string;
  confidence: number;
}

export interface ValidationResult {
  verified: Array<{
    type: string;
    message: string;
  }>;
  issues: Array<{
    type: string;
    title: string;
    description: string;
    recommendation: string;
  }>;
  score: number;
  completedAt: string;
}

export async function analyzeDocument(fileBuffer: Buffer, filename: string, mimetype: string): Promise<DocumentAnalysis> {
  try {
    if (mimetype.startsWith('image/')) {
      // For image files, use vision API
      const base64Image = fileBuffer.toString('base64');
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a document analysis expert. Analyze travel documents and extract key information. Respond with JSON in this format: { 'extractedText': 'full text content', 'documentType': 'passport/visa/id/other', 'issuingCountry': 'country name', 'expirationDate': 'YYYY-MM-DD or null', 'documentNumber': 'number or null', 'fullName': 'name or null', 'dateOfBirth': 'YYYY-MM-DD or null', 'nationality': 'nationality or null', 'confidence': number_0_to_1 }"
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this travel document and extract all relevant information for visa application purposes."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimetype};base64,${base64Image}`
                }
              }
            ],
          },
        ],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } else {
      // For text/PDF files, extract text first then analyze
      const textContent = fileBuffer.toString('utf-8');
      
      // Truncate content if too long to avoid token limits
      const maxContentLength = 50000; // Limit content to prevent token overflow
      const truncatedContent = textContent.length > maxContentLength 
        ? textContent.substring(0, maxContentLength) + "\n[Content truncated due to length]"
        : textContent;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a document analysis expert. Analyze travel documents and extract key information. Respond with JSON in this format: { 'extractedText': 'summary of relevant content', 'documentType': 'passport/visa/id/bank_statement/flight_itinerary/hotel_booking/employment_letter/payroll/contract/other', 'issuingCountry': 'country name or null', 'expirationDate': 'YYYY-MM-DD or null', 'documentNumber': 'number or null', 'fullName': 'name or null', 'dateOfBirth': 'YYYY-MM-DD or null', 'nationality': 'nationality or null', 'confidence': number_0_to_1 }"
          },
          {
            role: "user",
            content: `Analyze this document content for visa application purposes:\n\nFilename: ${filename}\nContent:\n${truncatedContent}`
          }
        ],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    }
  } catch (error) {
    console.error('Error analyzing document:', error);
    throw new Error('Failed to analyze document');
  }
}

export async function validateDocumentsAgainstRequirements(
  documents: DocumentAnalysis[],
  personalInfo: any,
  country: string,
  visaType: string
): Promise<ValidationResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a visa requirements expert. Validate documents against official visa requirements for ${country} ${visaType} visa. 

Check for:
- Required document types (passport, photos, financial statements, etc.)
- Document validity periods
- Information consistency across documents
- Missing requirements
- Quality and completeness

Respond with JSON in this format:
{
  "verified": [{"type": "document_type", "message": "what was verified"}],
  "issues": [{"type": "issue_category", "title": "Issue Title", "description": "Description", "recommendation": "How to fix"}],
  "score": number_0_to_100,
  "completedAt": "ISO_timestamp"
}`
        },
        {
          role: "user",
          content: `Validate these documents for ${country} ${visaType} visa application:

Personal Information:
Name: ${personalInfo.applicantName}
Passport: ${personalInfo.passportNumber}
Nationality: ${personalInfo.nationality}
Travel Date: ${personalInfo.travelDate}
Stay Duration: ${personalInfo.stayDuration} days

Analyzed Documents Summary:
${documents.map(doc => `- ${doc.documentType}: ${doc.fullName || 'N/A'}, Confidence: ${doc.confidence}`).join('\n')}

Provide detailed validation results including any issues found and recommendations.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      ...result,
      completedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error validating documents:', error);
    // Return fallback validation results instead of throwing
    return {
      verified: [],
      issues: [
        {
          type: "validation_error", 
          title: "Document Validation Temporarily Unavailable",
          description: "AI validation service is currently unavailable. Your documents have been uploaded successfully.",
          recommendation: "Please try again later or contact support for manual review."
        }
      ],
      score: 0,
      completedAt: new Date().toISOString()
    };
  }
}

export async function getVisaRequirementsOnline(country: string, visaType: string): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a visa requirements research expert. Provide current, accurate visa requirements information. Always include official embassy/consulate sources. Respond with JSON format."
        },
        {
          role: "user",
          content: `What are the current official requirements for a ${visaType} visa to ${country}? Include:
- Required documents
- Processing time
- Fees
- Validity period
- Special conditions
- Official embassy/consulate contact information

Format as JSON with these fields: requirements, processingTime, fees, validity, specialConditions, officialSources`
        }
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error fetching visa requirements:', error);
    throw new Error('Failed to fetch current visa requirements');
  }
}