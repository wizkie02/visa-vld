import { jsPDF } from 'jspdf';

interface ValidationResult {
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

interface VisaRequirement {
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

interface ComprehensiveVisaRequirements {
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

interface ReportData {
  validationResults: ValidationResult;
  personalInfo: any;
  country: string;
  visaType: string;
  nationality: string;
  requirements?: ComprehensiveVisaRequirements;
  uploadedDocuments: any[];
}

export function generateValidationReportPDF(data: ReportData): Buffer {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 30;

  // Helper function to add text with word wrapping
  function addText(text: string, fontSize: number = 10, isBold: boolean = false) {
    doc.setFontSize(fontSize);
    if (isBold) {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * (fontSize * 0.4) + 5;
    
    // Check if we need a new page
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 30;
    }
  }

  // Title
  addText('VISA VALIDATION REPORT', 16, true);
  yPosition += 10;

  // Personal Information
  addText('PERSONAL INFORMATION', 14, true);
  addText(`Applicant Name: ${data.personalInfo?.applicantName || 'N/A'}`);
  addText(`Passport Number: ${data.personalInfo?.passportNumber || 'N/A'}`);
  addText(`Date of Birth: ${data.personalInfo?.dateOfBirth || 'N/A'}`);
  addText(`Nationality: ${data.nationality || 'N/A'}`);
  addText(`Travel Date: ${data.personalInfo?.travelDate || 'N/A'}`);
  addText(`Stay Duration: ${data.personalInfo?.stayDuration || 'N/A'} days`);
  yPosition += 10;

  // Validation Summary
  addText('VALIDATION SUMMARY', 14, true);
  addText(`Overall Score: ${data.validationResults.score}%`);
  addText(`Completed: ${new Date(data.validationResults.completedAt).toLocaleString()}`);
  yPosition += 10;

  // Verified Documents
  if (data.validationResults.verified?.length > 0) {
    addText('VERIFIED DOCUMENTS', 14, true);
    data.validationResults.verified.forEach((item, index) => {
      addText(`${index + 1}. ${item.type.toUpperCase()}: ${item.message}`);
    });
    yPosition += 10;
  }

  // Missing Documents Section
  const missingDocs = data.validationResults.issues?.filter(issue => issue.type === 'missing_document') || [];
  if (missingDocs.length > 0) {
    addText('MISSING REQUIRED DOCUMENTS', 14, true);
    addText('The following documents are REQUIRED for your visa application but are missing:', 12, false);
    yPosition += 5;
    missingDocs.forEach((doc, index) => {
      addText(`${index + 1}. ${doc.title.replace('Missing Required Document: ', '')}`, 11, true);
      addText(`   ${doc.description}`);
      addText(`   Action Required: ${doc.recommendation}`);
      yPosition += 3;
    });
    yPosition += 10;
  }

  // Documents Marked as Available but Not Uploaded
  if (data.uploadedDocuments) {
    const checkedButNotUploaded = data.uploadedDocuments.filter((doc: any) => doc.checked && !doc.uploaded);
    if (checkedButNotUploaded.length > 0) {
      addText('DOCUMENTS MARKED AS AVAILABLE (NOT UPLOADED)', 14, true);
      addText('WARNING: You indicated you have these documents but did not upload them for verification.', 12, false);
      addText('Any errors in these documents are YOUR RESPONSIBILITY:', 12, true);
      yPosition += 5;
      checkedButNotUploaded.forEach((doc: any, index: number) => {
        addText(`${index + 1}. ${doc.name}`, 11, true);
        addText(`   We cannot verify this document for errors, spelling mistakes, or completeness.`);
        addText(`   Ensure all information is accurate before submitting to embassy/consulate.`);
        yPosition += 3;
      });
      yPosition += 10;
    }
  }

  // Other Issues Found
  const otherIssues = data.validationResults.issues?.filter(issue => issue.type !== 'missing_document') || [];
  if (otherIssues.length > 0) {
    addText('DOCUMENT VALIDATION ISSUES', 14, true);
    addText('The following issues were found in your uploaded documents:', 12, false);
    yPosition += 5;
    otherIssues.forEach((issue, index) => {
      addText(`${index + 1}. ${issue.title}`, 12, true);
      addText(`   Problem: ${issue.description}`);
      addText(`   Solution: ${issue.recommendation}`);
      yPosition += 5;
    });
    yPosition += 10;
  }

  // Cross-check warnings
  addText('DOCUMENT CROSS-CHECK WARNINGS', 14, true);
  addText('Common errors to verify in your documents:', 12, false);
  addText('• Name spelling must match passport EXACTLY across all documents');
  addText('• Date of birth consistency between passport and application forms');
  addText('• Passport number accuracy in all forms and bookings');
  addText('• Travel dates must match flight bookings and hotel reservations');
  addText('• Financial amounts should be sufficient for stated trip duration');
  addText('• Employment letters should have recent dates and proper letterhead');
  yPosition += 10;

  // Official Resources and Next Steps
  addText('OFFICIAL VISA APPLICATION RESOURCES', 14, true);
  addText('IMPORTANT: Complete your official visa application at these websites:', 12, true);
  yPosition += 3;
  
  // Country-specific official websites
  const officialSites: Record<string, string> = {
    'Australia': 'https://immi.homeaffairs.gov.au/visas',
    'United States': 'https://travel.state.gov/content/travel/en/us-visas.html',
    'United Kingdom': 'https://www.gov.uk/browse/visas-immigration',
    'Canada': 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
    'Schengen': 'Contact respective EU country embassy website',
    'Germany': 'https://www.auswaertiges-amt.de/en/einreiseundaufenthalt/visabestimmungen-node',
    'France': 'https://france-visas.gouv.fr/en_US/',
    'Netherlands': 'https://www.netherlandsandyou.nl/travel-and-residence/visas-for-the-netherlands',
    'Italy': 'https://vistoperitalia.esteri.it/home/en',
    'Spain': 'http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/InformacionParaExtranjeros/Paginas/RequisitosDeEntrada.aspx',
    'China': 'http://www.china-embassy.org/eng/visas/',
    'Japan': 'https://www.mofa.go.jp/j_info/visit/visa/',
    'South Korea': 'https://www.0404.go.kr/consulate/consul_visa_tab1.jsp',
    'Singapore': 'https://www.ica.gov.sg/visitor/visitor_entryvisa',
    'Thailand': 'https://www.mfa.go.th/en/content/visa-information',
    'Vietnam': 'https://evisa.xuatnhapcanh.gov.vn/',
    'India': 'https://indianvisaonline.gov.in/evisa/',
    'Brazil': 'https://www.gov.br/mre/pt-br/assuntos/portal-consular/vistos',
    'Russia': 'https://visa.kdmid.ru/PetitionChoice.aspx'
  };
  
  const countryKey = Object.keys(officialSites).find(key => 
    data.country.toLowerCase().includes(key.toLowerCase()) || 
    key.toLowerCase().includes(data.country.toLowerCase())
  );
  
  if (countryKey) {
    addText(`${data.country} Official Visa Website:`, 11, true);
    addText(`${officialSites[countryKey]}`);
  } else {
    addText('Contact the embassy or consulate of your destination country for official application procedures.');
  }
  yPosition += 5;

  // VFS Global warning
  addText('EXTERNAL PROCESSING AGENCIES (IMPORTANT!)', 12, true);
  addText('Many countries use VFS Global, TLS Contact, or BLS International for visa processing.');
  addText('If your destination uses these services, you MUST apply through their websites:');
  addText('• VFS Global: https://www.vfsglobal.com/');
  addText('• TLS Contact: https://www.tlscontact.com/');
  addText('• BLS International: https://www.blsinternational.com/');
  yPosition += 10;

  // Requirements summary
  if (data.requirements) {
    addText('VISA REQUIREMENTS SUMMARY', 14, true);
    addText(`Country: ${data.requirements.country || data.country}`);
    addText(`Visa Type: ${data.requirements.visaType || data.visaType}`);
    addText(`Processing Time: ${data.requirements.generalInfo?.processingTime || 'Contact embassy for details'}`);
    addText(`Validity: ${data.requirements.generalInfo?.validity || 'Varies by case'}`);
    addText(`Fees: ${data.requirements.generalInfo?.fees || 'Contact embassy for current fees'}`);
    yPosition += 5;
  }

  // Footer
  yPosition = 280;
  doc.setFontSize(8);
  doc.text('Generated by VisaValidator - All rights reserved', margin, yPosition);
  doc.text(`Report generated on ${new Date().toLocaleDateString()}`, margin, yPosition + 10);

  return Buffer.from(doc.output('arraybuffer'));
}

export function generateRequirementsChecklistPDF(requirements: ComprehensiveVisaRequirements): Buffer {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 30;

  // Helper function to add text with word wrapping
  function addText(text: string, fontSize: number = 10, isBold: boolean = false) {
    doc.setFontSize(fontSize);
    if (isBold) {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * (fontSize * 0.4) + 5;
    
    // Check if we need a new page
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 30;
    }
  }

  // Title
  addText(`VISA REQUIREMENTS CHECKLIST`, 16, true);
  addText(`${requirements.country.toUpperCase()} - ${requirements.visaType.toUpperCase()}`, 14, true);
  yPosition += 10;

  // General Information
  addText('GENERAL INFORMATION', 14, true);
  addText(`Processing Time: ${requirements.generalInfo.processingTime}`);
  addText(`Validity: ${requirements.generalInfo.validity}`);
  addText(`Fees: ${requirements.generalInfo.fees}`);
  yPosition += 10;

  // Important Notes
  if (requirements.importantNotes?.length > 0) {
    addText('IMPORTANT NOTES', 14, true);
    requirements.importantNotes.forEach((note, index) => {
      addText(`${index + 1}. ${note}`);
    });
    yPosition += 10;
  }

  // Requirements by Category
  const categories = ['document', 'financial', 'personal', 'travel', 'health'];
  categories.forEach(category => {
    const categoryReqs = requirements.requirements.filter(req => req.category === category);
    if (categoryReqs.length > 0) {
      addText(`${category.toUpperCase()} REQUIREMENTS`, 14, true);
      categoryReqs.forEach((req, index) => {
        const status = req.required ? '□ REQUIRED' : '□ OPTIONAL';
        addText(`${status}: ${req.title}`, 10, true);
        addText(`${req.description}`);
        if (req.specificNotes?.length) {
          req.specificNotes.forEach(note => {
            addText(`• ${note}`, 9);
          });
        }
        yPosition += 5;
      });
      yPosition += 5;
    }
  });

  // Footer
  yPosition = 280;
  doc.setFontSize(8);
  doc.text('Generated by VisaValidator - All rights reserved', margin, yPosition);
  doc.text(`Checklist generated on ${new Date().toLocaleDateString()}`, margin, yPosition + 10);

  return Buffer.from(doc.output('arraybuffer'));
}