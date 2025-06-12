import { ValidationResult } from "./openai-service";
import { ComprehensiveVisaRequirements } from "./visa-requirements-service";

interface ReportData {
  validationResults: ValidationResult;
  personalInfo: any;
  country: string;
  visaType: string;
  nationality: string;
  requirements?: ComprehensiveVisaRequirements;
  uploadedDocuments: any[];
}

export function generateValidationReportHTML(data: ReportData): string {
  const { validationResults, personalInfo, country, visaType, nationality, requirements, uploadedDocuments } = data;
  
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Visa Document Validation Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; }
        .score { font-size: 2em; font-weight: bold; color: ${validationResults.score >= 80 ? '#059669' : validationResults.score >= 60 ? '#d97706' : '#dc2626'}; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
        .section h3 { color: #374151; margin-top: 20px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
        .info-item { padding: 8px; background: #f9fafb; border-radius: 4px; }
        .document-item { background: #f3f4f6; padding: 12px; margin: 8px 0; border-radius: 6px; }
        .verified-item { background: #d1fae5; padding: 10px; margin: 5px 0; border-radius: 4px; border-left: 4px solid #059669; }
        .issue-item { background: #fef3c7; padding: 12px; margin: 10px 0; border-radius: 4px; border-left: 4px solid #d97706; }
        .requirement-item { background: #f8fafc; padding: 10px; margin: 8px 0; border-radius: 4px; border-left: 3px solid #3b82f6; }
        .note-item { background: #fef2f2; padding: 8px; margin: 5px 0; border-radius: 4px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 0.9em; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Visa Document Validation Report</h1>
        <div class="score">${validationResults.score}%</div>
        <p>Validation Score</p>
    </div>

    <div class="section">
        <h2>Summary</h2>
        <div class="info-grid">
            <div class="info-item"><strong>Country:</strong> ${country}</div>
            <div class="info-item"><strong>Visa Type:</strong> ${visaType}</div>
            <div class="info-item"><strong>Nationality:</strong> ${nationality}</div>
            <div class="info-item"><strong>Validation Date:</strong> ${new Date(validationResults.completedAt).toLocaleDateString()}</div>
        </div>
    </div>

    ${personalInfo ? `
    <div class="section">
        <h2>Personal Information</h2>
        <div class="info-grid">
            ${personalInfo.fullName ? `<div class="info-item"><strong>Full Name:</strong> ${personalInfo.fullName}</div>` : ''}
            ${personalInfo.passportNumber ? `<div class="info-item"><strong>Passport Number:</strong> ${personalInfo.passportNumber}</div>` : ''}
            ${personalInfo.dateOfBirth ? `<div class="info-item"><strong>Date of Birth:</strong> ${new Date(personalInfo.dateOfBirth).toLocaleDateString()}</div>` : ''}
            ${personalInfo.travelDate ? `<div class="info-item"><strong>Travel Date:</strong> ${new Date(personalInfo.travelDate).toLocaleDateString()}</div>` : ''}
            ${personalInfo.stayDuration ? `<div class="info-item"><strong>Stay Duration:</strong> ${personalInfo.stayDuration} days</div>` : ''}
        </div>
    </div>
    ` : ''}

    <div class="section">
        <h2>Documents Overview</h2>
        <p><strong>Total Documents Uploaded:</strong> ${uploadedDocuments.length}</p>
        ${uploadedDocuments.length > 0 ? `
        <h3>Uploaded Documents</h3>
        ${uploadedDocuments.map((doc, index) => `
        <div class="document-item">
            <strong>${index + 1}. ${doc.originalName}</strong>
            ${doc.analysis ? `
            <ul>
                <li>Document Type: ${doc.analysis.documentType}</li>
                ${doc.analysis.issuingCountry ? `<li>Issuing Country: ${doc.analysis.issuingCountry}</li>` : ''}
                ${doc.analysis.expirationDate ? `<li>Expiration Date: ${doc.analysis.expirationDate}</li>` : ''}
                ${doc.analysis.confidence ? `<li>Confidence: ${Math.round(doc.analysis.confidence * 100)}%</li>` : ''}
            </ul>
            ` : ''}
        </div>
        `).join('')}
        ` : ''}
    </div>

    ${validationResults.verified.length > 0 ? `
    <div class="section">
        <h2>✅ Verified Documents</h2>
        ${validationResults.verified.map((item, index) => `
        <div class="verified-item">
            <strong>${item.type}:</strong> ${item.message}
        </div>
        `).join('')}
    </div>
    ` : ''}

    ${validationResults.issues.length > 0 ? `
    <div class="section">
        <h2>⚠️ Issues Found</h2>
        ${validationResults.issues.map((issue, index) => `
        <div class="issue-item">
            <h3>${index + 1}. ${issue.title}</h3>
            <p><strong>Type:</strong> ${issue.type}</p>
            <p><strong>Description:</strong> ${issue.description}</p>
            <p><strong>Recommendation:</strong> ${issue.recommendation}</p>
        </div>
        `).join('')}
    </div>
    ` : ''}

    ${requirements ? `
    <div class="section">
        <h2>Visa Requirements for ${country}</h2>
        <p><strong>Visa Type:</strong> ${requirements.visaType}</p>
        <p><strong>Last Updated:</strong> ${requirements.lastUpdated}</p>

        ${requirements.generalInfo ? `
        <h3>General Information</h3>
        <div class="info-grid">
            <div class="info-item"><strong>Processing Time:</strong> ${requirements.generalInfo.processingTime}</div>
            <div class="info-item"><strong>Validity:</strong> ${requirements.generalInfo.validity}</div>
            <div class="info-item"><strong>Fees:</strong> ${requirements.generalInfo.fees}</div>
            <div class="info-item"><strong>Application Methods:</strong> ${requirements.generalInfo.applicationMethods.join(', ')}</div>
        </div>
        ` : ''}

        ${requirements.requirements.length > 0 ? `
        <h3>Required Documents</h3>
        ${requirements.requirements.map((req, index) => `
        <div class="requirement-item">
            <strong>${index + 1}. ${req.title}</strong> ${req.required ? '(Required)' : '(Optional)'}
            <p>${req.description}</p>
            ${req.specificNotes && req.specificNotes.length > 0 ? `
            <ul>
                ${req.specificNotes.map(note => `<li>${note}</li>`).join('')}
            </ul>
            ` : ''}
        </div>
        `).join('')}
        ` : ''}

        ${requirements.importantNotes.length > 0 ? `
        <h3>Important Notes</h3>
        ${requirements.importantNotes.map((note, index) => `
        <div class="note-item">
            ${index + 1}. ${note}
        </div>
        `).join('')}
        ` : ''}

        ${requirements.officialSources.length > 0 ? `
        <h3>Official Sources (English/International Sections)</h3>
        <ul>
            ${requirements.officialSources.map((source, index) => {
              const internationalSource = source.includes('/en/') || source.includes('/english/') || source.includes('/international/') 
                ? source 
                : source.replace(/\/$/, '') + '/en/';
              return `<li><a href="${internationalSource}">${internationalSource}</a></li>`;
            }).join('')}
        </ul>
        ` : ''}
    </div>
    ` : ''}

    <div class="footer">
        <p>Generated by VisaValidator Requirements System</p>
        <p>All rights reserved.</p>
        <p>Need Help? Contact the official embassy or consulate for the most current requirements and assistance with your application.</p>
    </div>
</body>
</html>
  `;
  
  return html;
}

export function generateRequirementsChecklistHTML(requirements: ComprehensiveVisaRequirements): string {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Visa Requirements Checklist - ${requirements.country}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
        .section h3 { color: #374151; margin-top: 20px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
        .info-item { padding: 8px; background: #f9fafb; border-radius: 4px; }
        .requirement-item { background: #f8fafc; padding: 12px; margin: 8px 0; border-radius: 4px; border-left: 3px solid #3b82f6; }
        .required { border-left-color: #dc2626; }
        .optional { border-left-color: #059669; }
        .note-item { background: #fef2f2; padding: 8px; margin: 5px 0; border-radius: 4px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 0.9em; color: #6b7280; }
        .checkbox { margin-right: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Visa Requirements Checklist</h1>
        <h2>${requirements.country} - ${requirements.visaType}</h2>
        <p>Last Updated: ${requirements.lastUpdated}</p>
    </div>

    ${requirements.generalInfo ? `
    <div class="section">
        <h2>General Information</h2>
        <div class="info-grid">
            <div class="info-item"><strong>Processing Time:</strong> ${requirements.generalInfo.processingTime}</div>
            <div class="info-item"><strong>Validity:</strong> ${requirements.generalInfo.validity}</div>
            <div class="info-item"><strong>Fees:</strong> ${requirements.generalInfo.fees}</div>
            <div class="info-item"><strong>Application Methods:</strong> ${requirements.generalInfo.applicationMethods.join(', ')}</div>
        </div>
    </div>
    ` : ''}

    <div class="section">
        <h2>Document Checklist</h2>
        ${requirements.requirements.map((req, index) => `
        <div class="requirement-item ${req.required ? 'required' : 'optional'}">
            <input type="checkbox" class="checkbox"> 
            <strong>${index + 1}. ${req.title}</strong> ${req.required ? '(Required)' : '(Optional)'}
            <p>${req.description}</p>
            ${req.specificNotes && req.specificNotes.length > 0 ? `
            <ul>
                ${req.specificNotes.map(note => `<li>${note}</li>`).join('')}
            </ul>
            ` : ''}
        </div>
        `).join('')}
    </div>

    ${requirements.importantNotes.length > 0 ? `
    <div class="section">
        <h2>Important Notes</h2>
        ${requirements.importantNotes.map((note, index) => `
        <div class="note-item">
            ${index + 1}. ${note}
        </div>
        `).join('')}
    </div>
    ` : ''}

    ${requirements.officialSources.length > 0 ? `
    <div class="section">
        <h2>Official Sources (English/International Sections)</h2>
        <ul>
            ${requirements.officialSources.map((source, index) => {
              const internationalSource = source.includes('/en/') || source.includes('/english/') || source.includes('/international/') 
                ? source 
                : source.replace(/\/$/, '') + '/en/';
              return `<li><a href="${internationalSource}">${internationalSource}</a></li>`;
            }).join('')}
        </ul>
    </div>
    ` : ''}

    <div class="footer">
        <p>Generated by VisaValidator Requirements System</p>
        <p>All rights reserved.</p>
        <p>Need Help? Contact the official embassy or consulate for the most current requirements and assistance with your application.</p>
    </div>
</body>
</html>
  `;
  
  return html;
}