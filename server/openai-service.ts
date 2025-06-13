import OpenAI from "openai";
import { getNameFormattingRules, validateNameFormatting } from "./country-specific-rules";

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
  visaType: string,
  requiredDocuments?: any[],
  checkedDocuments?: Record<string, boolean>
): Promise<ValidationResult> {
  try {
    // Get required documents for cross-referencing
    const visaRequirements = await getVisaRequirementsOnline(country, visaType);
    const requiredDocs = requiredDocuments || visaRequirements?.requirements || [];
    
    // Get country-specific name formatting rules
    const nameFormattingRules = getNameFormattingRules(country);
    
    // Extract document types from uploaded documents
    const uploadedDocTypes = documents.map(doc => doc.documentType.toLowerCase());
    
    // Check for missing required documents
    const missingRequiredDocs = requiredDocs.filter((req: any) => {
      // Handle both string arrays and object arrays
      const reqType = typeof req === 'string' ? req.toLowerCase() : (req.title || '').toLowerCase();
      const isRequired = typeof req === 'string' ? true : req.required !== false;
      
      if (!isRequired) return false;
      
      // Check if document is uploaded
      const isUploaded = uploadedDocTypes.some(uploaded => {
        return (
          reqType.includes(uploaded) ||
          uploaded.includes('passport') && reqType.includes('passport') ||
          uploaded.includes('bank') && reqType.includes('financial') ||
          uploaded.includes('employment') && reqType.includes('employment') ||
          uploaded.includes('flight') && reqType.includes('itinerary') ||
          uploaded.includes('hotel') && reqType.includes('accommodation')
        );
      });
      
      // Check if document is marked as checked (user has it but didn't upload)
      const isChecked = checkedDocuments && Object.entries(checkedDocuments).some(([docName, isChecked]) => {
        if (!isChecked) return false;
        const checkedType = docName.toLowerCase();
        return (
          reqType.includes(checkedType) ||
          checkedType.includes('travel insurance') && reqType.includes('insurance') ||
          checkedType.includes('bank') && reqType.includes('financial') ||
          checkedType.includes('hotel') && reqType.includes('accommodation') ||
          checkedType.includes('flight') && reqType.includes('itinerary') ||
          checkedType.includes('employment') && reqType.includes('employment') ||
          checkedType.includes('invitation') && reqType.includes('invitation')
        );
      });
      
      return !isUploaded && !isChecked;
    });

    // Validate name formatting for destination country
    const passportDoc = documents.find(doc => doc.documentType.toLowerCase().includes('passport'));
    let nameValidationIssues: string[] = [];
    
    if (passportDoc && passportDoc.fullName && personalInfo?.firstName && personalInfo?.lastName) {
      const passportName = passportDoc.fullName;
      const applicationName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();
      
      const nameValidation = validateNameFormatting(passportName, applicationName, country);
      nameValidationIssues = nameValidation.issues;
    }

    // If missing required documents, set score to 0%
    const hasAllRequiredDocs = missingRequiredDocs.length === 0;
    const hasNameIssues = nameValidationIssues.length > 0;
    const baseScore = hasAllRequiredDocs && !hasNameIssues ? 75 : 0;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a visa requirements expert. Validate documents against official visa requirements for ${country} ${visaType} visa. 

CRITICAL ENFORCEMENT RULES:
1. If ANY required documents are missing: score = 0%
2. Missing required documents count: ${missingRequiredDocs.length}
3. If missing count > 0: AUTOMATIC score = 0%

DOCUMENT STATUS:
- Required documents missing: ${missingRequiredDocs.map((doc: any) => typeof doc === 'string' ? doc : doc.title).join(', ') || 'None'}
- Documents uploaded: ${documents.map(d => d.documentType).join(', ')}
- Documents checked (user has but didn't upload): ${checkedDocuments ? Object.entries(checkedDocuments).filter(([_, checked]) => checked).map(([name, _]) => name).join(', ') : 'None'}

COUNTRY-SPECIFIC NAME VALIDATION RULES:
- Vietnam: ALL names from passport must be written EXACTLY as they appear in visa applications
- China: Full name as in passport, including all given names
- Schengen countries: Name order and spelling must match passport exactly
- USA: Name consistency across all documents is strictly enforced
- UK: All names from passport must be included in application forms

Check for:
- Required document types (passport, photos, financial statements, etc.)
- Document validity periods
- Information consistency across documents
- Name formatting compliance for destination country
- Missing requirements
- Quality and completeness

Missing Required Documents: ${missingRequiredDocs.map((doc: any) => typeof doc === 'string' ? doc : doc.title).join(', ') || 'None'}

Respond with JSON in this format:
{
  "verified": [{"type": "document_type", "message": "what was verified"}],
  "issues": [{"type": "issue_category", "title": "Issue Title", "description": "Description", "recommendation": "How to fix"}],
  "score": ${baseScore},
  "completedAt": "ISO_timestamp"
}`
        },
        {
          role: "user",
          content: `Validate these documents for ${country} ${visaType} visa application:

Personal Information: ${JSON.stringify(personalInfo)}

Documents uploaded: ${documents.map(doc => `${doc.documentType}: ${doc.extractedText?.substring(0, 200)}...`).join('\n\n')}

Required documents: ${JSON.stringify(requiredDocs)}

Country-specific name formatting rules for ${country}:
${nameFormattingRules.join('\n')}

Name validation issues detected: ${nameValidationIssues.length > 0 ? nameValidationIssues.join(', ') : 'None'}

${missingRequiredDocs.length > 0 ? 'WARNING: Missing required documents detected. Score must be 0%.' : ''}

Provide detailed validation results including any issues found and recommendations.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    // CRITICAL: Force 0% score if required documents are missing
    if (missingRequiredDocs.length > 0) {
      console.log(`Forcing 0% score due to ${missingRequiredDocs.length} missing required documents`);
      result.score = 0;
      
      // Add issues for each missing document
      const missingDocIssues = missingRequiredDocs.map((doc: any) => ({
        type: 'missing_document',
        title: `Missing Required Document: ${typeof doc === 'string' ? doc : doc.title}`,
        description: `This document is required for ${country} ${visaType} visa applications and must be provided.`,
        recommendation: `Obtain and upload the required ${typeof doc === 'string' ? doc : doc.title} document before proceeding with your application.`
      }));
      
      result.issues = [...(result.issues || []), ...missingDocIssues];
    }
    
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