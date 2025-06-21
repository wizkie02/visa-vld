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
  // Header with brand colors
  doc.rect(0, 0, doc.page.width, 80)
     .fill('#1C4473');

  doc.fillColor('white')
     .fontSize(24)
     .font('Helvetica-Bold')
     .text('VISA VALIDATOR', 50, 25);

  doc.fontSize(12)
     .font('Helvetica')
     .text('Professional Visa Documentation Service', 50, 50);

  // Reset to black for content
  doc.fillColor('black')
     .moveDown(3);

  // Title section
  doc.fontSize(20)
     .font('Helvetica-Bold')
     .text('VISA REQUIREMENTS CHECKLIST', { align: 'center' });

  doc.fontSize(16)
     .text(`${requirements.country.toUpperCase()} - ${requirements.visaType.toUpperCase()}`, { align: 'center' })
     .moveDown();

  doc.fontSize(10)
     .font('Helvetica')
     .text(`Last Updated: ${requirements.lastUpdated}`, { align: 'center' })
     .moveDown(2);

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
        const checkbox = req.required ? '☐ REQUIRED' : '☐ OPTIONAL';
        
        doc.fontSize(11)
           .font('Helvetica-Bold')
           .fillColor(req.required ? '#DC2626' : '#059669')
           .text(checkbox, { continued: true })
           .fillColor('black')
           .text(`: ${req.title}`)
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

  // Footer
  const footerY = doc.page.height - 50;
  doc.fontSize(8)
     .fillColor('#6B7280')
     .text('Generated by Visa Validator - Professional Visa Documentation Service', 50, footerY)
     .text(`Report generated on ${new Date().toLocaleDateString()}`, 50, footerY + 12);
}

function generateValidationReportPDF(doc: PDFKit.PDFDocument, data: ValidationReportData) {
  // Header with brand colors
  doc.rect(0, 0, doc.page.width, 80)
     .fill('#1C4473');

  doc.fillColor('white')
     .fontSize(24)
     .font('Helvetica-Bold')
     .text('VISA VALIDATOR', 50, 25);

  doc.fontSize(12)
     .font('Helvetica')
     .text('AI-Powered Document Validation Report', 50, 50);

  // Reset to black for content
  doc.fillColor('black')
     .moveDown(3);

  // Title section
  doc.fontSize(20)
     .font('Helvetica-Bold')
     .text('DOCUMENT VALIDATION REPORT', { align: 'center' });

  doc.fontSize(14)
     .text(`${data.country.toUpperCase()} - ${data.visaType.toUpperCase()}`, { align: 'center' })
     .moveDown(2);

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
     .text(`Report Generated: ${new Date(data.validationResults.completedAt).toLocaleDateString()}`)
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

  // Issues Found
  if (data.validationResults.issues.length > 0) {
    addSection(doc, 'ISSUES & RECOMMENDATIONS');
    data.validationResults.issues.forEach((issue, index) => {
      doc.fontSize(11)
         .font('Helvetica-Bold')
         .fillColor('#DC2626')
         .text('⚠', { continued: true })
         .fillColor('black')
         .text(` ${issue.title}`)
         .fontSize(10)
         .font('Helvetica')
         .text(issue.description, { indent: 20, width: 480 })
         .fontSize(9)
         .fillColor('#1FA947')
         .text(`Recommendation: ${issue.recommendation}`, { indent: 20, width: 480 })
         .fillColor('black')
         .moveDown();
    });
  }

  // Footer
  const footerY = doc.page.height - 50;
  doc.fontSize(8)
     .fillColor('#6B7280')
     .text('Generated by Visa Validator - AI-Powered Document Analysis', 50, footerY)
     .text(`Report ID: ${data.validationResults.completedAt}`, 50, footerY + 12);
}

function addSection(doc: PDFKit.PDFDocument, title: string) {
  doc.fontSize(14)
     .font('Helvetica-Bold')
     .fillColor('#1C4473')
     .text(title)
     .fillColor('black')
     .moveDown(0.5);
}