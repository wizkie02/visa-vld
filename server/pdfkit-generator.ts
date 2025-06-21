import PDFDocument from 'pdfkit';
import type { ComprehensiveVisaRequirements } from './visa-requirements-service';

interface PDFGenerationRequest {
  type: 'requirements' | 'validation-report';
  data: any;
}

interface ValidationReportData {
  validationResults: {
    verified: Array<{ type: string; message: string }>;
    issues: Array<{ type: string; title: string; description: string; recommendation: string }>;
    score: number;
    completedAt: string;
  };
  personalInfo: {
    applicantName: string;
    passportNumber?: string;
    dateOfBirth?: string;
    travelDate?: string;
    stayDuration?: number;
  };
  country: string;
  visaType: string;
  nationality: string;
  requirements?: ComprehensiveVisaRequirements;
  uploadedDocuments: Array<any>;
}

export function generatePDF(request: PDFGenerationRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      if (request.type === 'requirements') {
        generateRequirementsPDF(doc, request.data as ComprehensiveVisaRequirements);
      } else if (request.type === 'validation-report') {
        generateValidationReportPDF(doc, request.data as ValidationReportData);
      } else {
        throw new Error('Invalid PDF type requested');
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

function generateRequirementsPDF(doc: PDFKit.PDFDocument, requirements: ComprehensiveVisaRequirements) {
  // Header with brand colors and logo
  doc.rect(0, 0, doc.page.width, 60)
     .fill('#1C4473');

  // Add logo (simplified representation)
  doc.strokeColor('#1FA947')
     .lineWidth(2)
     .circle(70, 30, 15)
     .fillAndStroke('white', '#1FA947');
  
  doc.fillColor('#1FA947')
     .fontSize(16)
     .font('Helvetica-Bold')
     .text('✓', 65, 25);

  doc.fillColor('white')
     .fontSize(20)
     .font('Helvetica-Bold')
     .text('VISA VALIDATOR', 100, 20);

  doc.fontSize(10)
     .font('Helvetica')
     .text('Professional Visa Documentation Service', 100, 40);

  // Reset to black for content
  doc.fillColor('black')
     .y = 80;

  // Title section with better spacing
  doc.fontSize(18)
     .font('Helvetica-Bold')
     .text('VISA REQUIREMENTS CHECKLIST', { align: 'center' });

  doc.fontSize(14)
     .text(`${requirements.country.toUpperCase()} - ${requirements.visaType.toUpperCase()}`, { align: 'center' });

  doc.fontSize(9)
     .font('Helvetica')
     .text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, { align: 'center' })
     .moveDown(1.5);

  // General Information
  addSection(doc, 'GENERAL INFORMATION');
  doc.fontSize(10)
     .font('Helvetica')
     .text(`Processing Time: ${requirements.generalInfo.processingTime}`)
     .text(`Validity: ${requirements.generalInfo.validity}`)
     .text(`Fees: ${requirements.generalInfo.fees}`)
     .text(`Application Methods: ${requirements.generalInfo.applicationMethods.join(', ')}`)
     .moveDown();

  // Important Notes
  if (requirements.importantNotes?.length > 0) {
    addSection(doc, 'IMPORTANT NOTES');
    requirements.importantNotes.forEach((note, index) => {
      doc.fontSize(10)
         .font('Helvetica')
         .text(`${index + 1}. ${note}`, { width: 500 })
         .moveDown(0.5);
    });
    doc.moveDown();
  }

  // Requirements by Category
  const categories = [
    { key: 'document', title: 'DOCUMENT REQUIREMENTS' },
    { key: 'financial', title: 'FINANCIAL REQUIREMENTS' },
    { key: 'personal', title: 'PERSONAL REQUIREMENTS' },
    { key: 'travel', title: 'TRAVEL REQUIREMENTS' },
    { key: 'health', title: 'HEALTH REQUIREMENTS' }
  ];

  categories.forEach(category => {
    const categoryReqs = requirements.requirements.filter(req => req.category === category.key);
    if (categoryReqs.length > 0) {
      addSection(doc, category.title);
      
      categoryReqs.forEach((req, index) => {
        const checkbox = req.required ? '☐' : '☐';
        const status = req.required ? 'REQUIRED' : 'OPTIONAL';
        
        doc.fontSize(11)
           .font('Helvetica-Bold')
           .fillColor('#1C4473')
           .text(checkbox, { continued: true })
           .text(` ${req.title}`)
           .fontSize(9)
           .fillColor(req.required ? '#1C4473' : '#059669')
           .text(` (${status})`)
           .fillColor('black')
           .fontSize(10)
           .font('Helvetica')
           .text(req.description, { indent: 20, width: 480 });

        if (req.specificNotes?.length) {
          req.specificNotes.forEach(note => {
            doc.fontSize(9)
               .fillColor('#6B7280')
               .text(`• ${note}`, { indent: 30, width: 470 });
          });
        }
        doc.fillColor('black').moveDown(0.5);
      });
      doc.moveDown();
    }
  });

  // Recent Changes
  if (requirements.recentChanges?.length) {
    addSection(doc, 'RECENT CHANGES');
    requirements.recentChanges.forEach((change, index) => {
      doc.fontSize(10)
         .font('Helvetica')
         .text(`${index + 1}. ${change}`, { width: 500 })
         .moveDown(0.5);
    });
  }

  // Add comprehensive disclaimer
  doc.addPage();
  addSection(doc, 'IMPORTANT DISCLAIMER & LEGAL NOTICE');
  
  const disclaimerText = `
ACCURACY AND COMPLETENESS: This document is generated based on publicly available information from official government sources at the time of generation. Visa requirements can change without notice. We strongly recommend verifying all information with the relevant embassy or consulate before submitting your application.

LIABILITY LIMITATION: Visa Validator provides this information as a service but accepts no responsibility for any consequences arising from the use of this information. Users are solely responsible for ensuring compliance with all visa requirements.

OFFICIAL VERIFICATION: This document does not constitute official advice. Always consult with the appropriate embassy, consulate, or authorized visa service provider for the most current and accurate requirements.

DATA SOURCES: Information is compiled from official government websites, embassy publications, and verified sources. However, requirements may vary by individual circumstances, nationality, and other factors not covered in this general checklist.

APPLICATION RESPONSIBILITY: The applicant is solely responsible for ensuring all documents meet the specific requirements of the destination country. Processing times, fees, and requirements may vary by location and individual circumstances.

DOCUMENT VALIDATION: This checklist is for informational purposes only. Actual document verification and validation must be performed by authorized officials at the time of application submission.

COPYRIGHT: This document is generated by Visa Validator and is protected by copyright. Redistribution without permission is prohibited.

UPDATES: Requirements change frequently. Always check for the most recent information before beginning your application process.
`;

  doc.fontSize(8)
     .font('Helvetica')
     .text(disclaimerText.trim(), { width: 500, align: 'justify' });

  // Official Sources
  if (requirements.officialSources?.length > 0) {
    addSection(doc, 'OFFICIAL SOURCES & APPLICATION WEBSITES');
    doc.fontSize(10)
       .font('Helvetica')
       .text('For the most current requirements and to apply online, visit these official sources:')
       .moveDown(0.5);
       
    requirements.officialSources.forEach((source, index) => {
      doc.fontSize(9)
         .font('Helvetica-Bold')
         .fillColor('#1C4473')
         .text(`${index + 1}. ${source}`, { width: 480 })
         .fillColor('black')
         .font('Helvetica')
         .moveDown(0.2);
    });
    doc.moveDown();
  }

  // Footer
  const footerY = doc.page.height - 40;
  doc.fontSize(8)
     .fillColor('#6B7280')
     .text('Generated by Visa Validator - Professional Visa Documentation Service', 50, footerY)
     .text(`Document generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 50, footerY + 12);
}

function generateValidationReportPDF(doc: PDFKit.PDFDocument, data: ValidationReportData) {
  // Header with brand colors and logo
  doc.rect(0, 0, doc.page.width, 60)
     .fill('#1C4473');

  // Add logo
  doc.strokeColor('#1FA947')
     .lineWidth(2)
     .circle(70, 30, 15)
     .fillAndStroke('white', '#1FA947');
  
  doc.fillColor('#1FA947')
     .fontSize(16)
     .font('Helvetica-Bold')
     .text('✓', 65, 25);

  doc.fillColor('white')
     .fontSize(20)
     .font('Helvetica-Bold')
     .text('VISA VALIDATOR', 100, 20);

  doc.fontSize(10)
     .font('Helvetica')
     .text('AI-Powered Document Validation Report', 100, 40);

  // Reset to black for content
  doc.fillColor('black')
     .y = 80;

  // Title section with better spacing
  doc.fontSize(18)
     .font('Helvetica-Bold')
     .text('DOCUMENT VALIDATION REPORT', { align: 'center' });

  doc.fontSize(14)
     .text(`${data.country.toUpperCase()} - ${data.visaType.toUpperCase()}`, { align: 'center' });

  doc.fontSize(9)
     .font('Helvetica')
     .text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, { align: 'center' })
     .moveDown(1.5);

  // Validation Score
  const scoreColor = data.validationResults.score >= 80 ? '#059669' : 
                    data.validationResults.score >= 60 ? '#D97706' : '#DC2626';
  
  doc.fontSize(48)
     .fillColor(scoreColor)
     .text(`${data.validationResults.score}%`, { align: 'center' });

  const scoreLabel = data.validationResults.score === 0 ? 'Incomplete Application - Missing Required Documents' :
                    data.validationResults.score >= 80 ? 'Strong Application' :
                    data.validationResults.score >= 60 ? 'Good Application with Minor Issues' :
                    'Application Needs Improvement';

  doc.fontSize(14)
     .fillColor('black')
     .font('Helvetica-Bold')
     .text(scoreLabel, { align: 'center' })
     .moveDown(2);

  // Personal Information
  addSection(doc, 'APPLICANT INFORMATION');
  doc.fontSize(10)
     .font('Helvetica')
     .text(`Name: ${data.personalInfo.applicantName}`)
     .text(`Nationality: ${data.nationality}`)
     .text(`Passport: ${data.personalInfo.passportNumber || 'Not provided'}`)
     .text(`Travel Date: ${data.personalInfo.travelDate ? new Date(data.personalInfo.travelDate).toLocaleDateString() : 'Not provided'}`)
     .text(`Documents Uploaded: ${data.uploadedDocuments.length}`)
     .text(`Validation Completed: ${new Date(data.validationResults.completedAt).toLocaleString()}`)
     .moveDown();

  // Verified Items
  if (data.validationResults.verified.length > 0) {
    addSection(doc, 'VERIFIED DOCUMENTS & INFORMATION');
    data.validationResults.verified.forEach((item, index) => {
      doc.fontSize(10)
         .fillColor('#059669')
         .text('✓', { continued: true })
         .fillColor('black')
         .text(` ${item.message}`, { width: 480 })
         .moveDown(0.3);
    });
    doc.moveDown();
  }

  // Document Processing Summary
  addSection(doc, 'DOCUMENT PROCESSING SUMMARY');
  
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .fillColor('#1C4473')
     .text(`Total Documents Processed: ${data.uploadedDocuments.length}`)
     .fillColor('black')
     .font('Helvetica')
     .fontSize(10);

  if (data.uploadedDocuments.length > 0) {
    const successfulAnalyses = data.uploadedDocuments.filter(doc => doc.analysis).length;
    const failedAnalyses = data.uploadedDocuments.length - successfulAnalyses;
    
    doc.text(`Successfully Analyzed: ${successfulAnalyses}`)
       .text(`Analysis Failures: ${failedAnalyses}`)
       .moveDown();

    // Quick overview of all documents
    doc.font('Helvetica-Bold')
       .text('Document Overview:')
       .font('Helvetica');

    data.uploadedDocuments.forEach((uploadedDoc, index) => {
      const docType = uploadedDoc.analysis?.documentType || 'Analysis failed';
      const confidence = uploadedDoc.analysis?.confidence || 0;
      const statusIcon = uploadedDoc.analysis ? '✓' : '⚠';
      const statusColor = uploadedDoc.analysis ? '#059669' : '#DC2626';
      
      doc.fontSize(9)
         .fillColor(statusColor)
         .text(statusIcon, { continued: true })
         .fillColor('black')
         .text(` ${index + 1}. ${uploadedDoc.originalName} → ${docType}`, { width: 480 });
      
      if (uploadedDoc.analysis && confidence > 0) {
        const confidenceColor = confidence >= 0.8 ? '#059669' : confidence >= 0.6 ? '#D97706' : '#DC2626';
        doc.fillColor(confidenceColor)
           .text(`   (${Math.round(confidence * 100)}% confidence)`, { indent: 20 })
           .fillColor('black');
      }
    });
    
    doc.moveDown();
    
    // Summary statement
    doc.fontSize(10)
       .fillColor('#1FA947')
       .text(`All ${data.uploadedDocuments.length} uploaded documents have been processed and included in this validation analysis.`)
       .fillColor('black')
       .moveDown();

  } else {
    doc.fontSize(9)
       .fillColor('#DC2626')
       .text('⚠ No documents were uploaded for analysis');
  }
  
  doc.fillColor('black').moveDown();
  
  // Check for documents claimed but not uploaded
  doc.fontSize(10)
     .font('Helvetica-Bold')
     .text('IMPORTANT: Documents Not Available for Validation')
     .font('Helvetica')
     .fontSize(9)
     .text('The following analysis limitations apply:', { width: 480 });
  
  doc.fontSize(9)
     .fillColor('#DC2626')
     .text('• Documents marked as "have" but not uploaded cannot be validated by our AI system')
     .text('• Missing document uploads significantly impact validation accuracy')
     .text('• Physical document verification will be required during official application review')
     .text('• This report reflects only the documents that were uploaded and analyzed')
     .fillColor('black')
     .moveDown();

  // Issues Found
  if (data.validationResults.issues.length > 0) {
    addSection(doc, 'VALIDATION ISSUES & RECOMMENDATIONS');
    data.validationResults.issues.forEach((issue, index) => {
      doc.fontSize(11)
         .font('Helvetica-Bold')
         .fillColor('#1C4473')
         .text(`Issue ${index + 1}: ${issue.title}`)
         .fontSize(10)
         .font('Helvetica')
         .fillColor('black')
         .text(issue.description, { indent: 20, width: 480 })
         .fontSize(9)
         .fillColor('#1FA947')
         .text(`Recommendation: ${issue.recommendation}`, { indent: 20, width: 480 })
         .fillColor('black')
         .moveDown();
    });
  }

  // Missing Required Documents Analysis
  if (data.requirements?.requirements) {
    const requiredDocs = data.requirements.requirements.filter(req => req.required);
    const uploadedDocTypes = data.uploadedDocuments.map(doc => doc.analysis?.documentType?.toLowerCase() || '');
    
    const missingDocs = requiredDocs.filter(req => {
      const reqType = req.title.toLowerCase();
      return !uploadedDocTypes.some(uploaded => {
        return (
          reqType.includes(uploaded) ||
          uploaded.includes('passport') && reqType.includes('passport') ||
          uploaded.includes('bank') && reqType.includes('financial') ||
          uploaded.includes('employment') && reqType.includes('employment') ||
          uploaded.includes('flight') && reqType.includes('itinerary') ||
          uploaded.includes('hotel') && reqType.includes('accommodation')
        );
      });
    });

    if (missingDocs.length > 0) {
      addSection(doc, 'MISSING REQUIRED DOCUMENTS');
      doc.fontSize(10)
         .font('Helvetica')
         .text('The following required documents were not uploaded for analysis:')
         .moveDown(0.5);

      missingDocs.forEach((missingDocument, index) => {
        doc.fontSize(10)
           .fillColor('#1C4473')
           .text(`${index + 1}. ${missingDocument.title}`)
           .fillColor('black')
           .fontSize(9)
           .text(missingDocument.description, { indent: 15, width: 470 })
           .moveDown(0.5);
      });
      doc.moveDown();
    }
  }

  // Individual Document Analysis Results
  if (data.uploadedDocuments.length > 0) {
    addSection(doc, 'DETAILED DOCUMENT ANALYSIS');
    
    data.uploadedDocuments.forEach((uploadedDoc, index) => {
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor('#1C4473')
         .text(`Document ${index + 1}: ${uploadedDoc.originalName}`)
         .fillColor('black')
         .font('Helvetica')
         .fontSize(10);

      if (uploadedDoc.analysis) {
        const analysis = uploadedDoc.analysis;
        const confidenceColor = analysis.confidence >= 0.8 ? '#059669' : 
                                analysis.confidence >= 0.6 ? '#D97706' : '#DC2626';
        
        // Analysis summary
        doc.text(`Document Type: ${analysis.documentType}`, { indent: 15 })
           .fillColor(confidenceColor)
           .text(`Analysis Confidence: ${Math.round(analysis.confidence * 100)}%`, { indent: 15 })
           .fillColor('black');

        // Validation contribution
        const docType = analysis.documentType.toLowerCase();
        let contribution = 'Document processed and included in validation';
        
        if (docType.includes('passport')) {
          contribution = 'Primary identity verification - Essential for all applications';
        } else if (docType.includes('bank') || docType.includes('financial')) {
          contribution = 'Financial evidence - Demonstrates financial capability';
        } else if (docType.includes('hotel') || docType.includes('accommodation')) {
          contribution = 'Accommodation proof - Confirms travel arrangements';
        } else if (docType.includes('flight') || docType.includes('itinerary')) {
          contribution = 'Travel documentation - Validates travel intentions';
        } else if (docType.includes('employment') || docType.includes('work')) {
          contribution = 'Employment verification - Confirms professional status';
        }

        doc.fillColor('#1FA947')
           .text(`Validation Role: ${contribution}`, { indent: 15 })
           .fillColor('black');

        // Extracted data
        if (analysis.fullName || analysis.documentNumber || analysis.expirationDate) {
          doc.text('Extracted Information:', { indent: 15 });
          if (analysis.fullName) {
            doc.text(`• Full Name: ${analysis.fullName}`, { indent: 25 });
          }
          if (analysis.documentNumber) {
            doc.text(`• Document Number: ${analysis.documentNumber}`, { indent: 25 });
          }
          if (analysis.expirationDate) {
            doc.text(`• Expiration Date: ${analysis.expirationDate}`, { indent: 25 });
          }
          if (analysis.issuingCountry) {
            doc.text(`• Issuing Country: ${analysis.issuingCountry}`, { indent: 25 });
          }
          if (analysis.nationality) {
            doc.text(`• Nationality: ${analysis.nationality}`, { indent: 25 });
          }
        }

        // Special warnings
        if (analysis.passportValidityWarning) {
          doc.fillColor('#D97706')
             .text(`⚠ Important: ${analysis.passportValidityWarning}`, { indent: 15 })
             .fillColor('black');
        }

      } else {
        doc.fillColor('#1C4473')
           .text('Analysis Failed: Document could not be processed', { indent: 15 })
           .text('This document was not included in validation calculations', { indent: 15 })
           .fillColor('black');
      }

      doc.moveDown(1);
    });
  }

  // Official Sources for Application
  const officialSources = data.requirements?.officialSources;
  if (officialSources && officialSources.length > 0) {
    addSection(doc, 'OFFICIAL SOURCES & APPLICATION WEBSITES');
    doc.fontSize(10)
       .font('Helvetica')
       .text('For current requirements and online applications, visit these official sources:')
       .moveDown(0.5);
       
    officialSources.forEach((source, index) => {
      doc.fontSize(10)
         .font('Helvetica-Bold')
         .fillColor('#1C4473')
         .text(`${index + 1}. ${source}`)
         .fillColor('black')
         .font('Helvetica')
         .moveDown(0.3);
    });
    doc.moveDown();
  }

  // Add comprehensive disclaimer (no page break to reduce blank space)
  addSection(doc, 'IMPORTANT DISCLAIMER & LEGAL NOTICE');
  
  const validationDisclaimerText = `
VALIDATION LIMITATIONS: This AI-powered analysis is based solely on documents uploaded to our system. Documents marked as "have" but not uploaded could not be validated and may significantly impact the accuracy of this report.

DOCUMENT AUTHENTICITY: Our AI system analyzes document structure, format, and content but cannot verify the authenticity of documents. Only official authorities can perform document authentication.

MISSING DOCUMENT IMPACT: If you indicated you have certain documents but did not upload them for analysis, this report's accuracy is limited. The validation score reflects only uploaded and analyzed documents.

APPLICATION RESPONSIBILITY: This report does not guarantee visa approval. The final decision rests with immigration authorities who will conduct their own document verification process.

REAL-TIME CHANGES: Visa requirements change frequently. This analysis is based on requirements available at the time of generation and may not reflect the most current information.

OFFICIAL VERIFICATION: Always verify requirements with the relevant embassy or consulate before submitting your application. This report is for informational purposes only.

LIABILITY LIMITATION: Visa Validator provides this analysis as a service but accepts no responsibility for visa application outcomes or any consequences arising from relying on this report.

PROFESSIONAL ADVICE: This report does not constitute legal or professional immigration advice. Consult with qualified immigration professionals for complex cases.

DATA PRIVACY: Uploaded documents are analyzed securely and automatically deleted within 24 hours for privacy protection.

COPYRIGHT: This validation report is generated by Visa Validator and is protected by copyright law.
`;

  doc.fontSize(8)
     .font('Helvetica')
     .text(validationDisclaimerText.trim(), { width: 500, align: 'justify' });

  // Footer
  const footerY = doc.page.height - 40;
  doc.fontSize(8)
     .fillColor('#6B7280')
     .text('Generated by Visa Validator - AI-Powered Document Analysis', 50, footerY)
     .text(`Report generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 50, footerY + 12);
}

function addSection(doc: PDFKit.PDFDocument, title: string) {
  doc.fontSize(14)
     .font('Helvetica-Bold')
     .fillColor('#1C4473')
     .text(title)
     .fillColor('black')
     .moveDown(0.5);
}