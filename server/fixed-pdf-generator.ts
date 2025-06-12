import { ComprehensiveVisaRequirements } from './visa-requirements-service';

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

interface ReportData {
  validationResults: ValidationResult;
  personalInfo: any;
  country: string;
  visaType: string;
  nationality: string;
  requirements?: ComprehensiveVisaRequirements;
  uploadedDocuments: any[];
}

export function generateValidationReportPDF(data: ReportData): string {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Visa Document Validation Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .score { font-size: 48px; font-weight: bold; color: ${data.validationResults.score >= 80 ? '#059669' : data.validationResults.score >= 60 ? '#d97706' : '#dc2626'}; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
        .verified { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin-bottom: 10px; }
        .issue { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin-bottom: 10px; }
        .document { background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; margin-bottom: 10px; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #6b7280; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Visa Document Validation Report</h1>
        <p><strong>Destination:</strong> ${data.country} | <strong>Visa Type:</strong> ${data.visaType}</p>
        <p><strong>Applicant Nationality:</strong> ${data.nationality}</p>
        <div class="score">${data.validationResults.score}%</div>
        <p>Validation Score</p>
        <p><small>Completed on ${new Date(data.validationResults.completedAt).toLocaleDateString()}</small></p>
    </div>

    <div class="section">
        <h2>Personal Information</h2>
        <p><strong>Full Name:</strong> ${data.personalInfo?.fullName || 'Not provided'}</p>
        <p><strong>Date of Birth:</strong> ${data.personalInfo?.dateOfBirth || 'Not provided'}</p>
        <p><strong>Passport Number:</strong> ${data.personalInfo?.passportNumber || 'Not provided'}</p>
        <p><strong>Nationality:</strong> ${data.nationality}</p>
    </div>

    <div class="section">
        <h2>Uploaded Documents</h2>
        ${data.uploadedDocuments.map(doc => `
            <div class="document">
                <strong>${doc.originalName}</strong><br>
                <small>Type: ${doc.analysis?.documentType || 'Unknown'} | Size: ${(doc.size / 1024).toFixed(1)} KB</small>
                ${doc.analysis?.extractedText ? `<br><em>Content Preview: ${doc.analysis.extractedText.substring(0, 100)}...</em>` : ''}
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2>Verification Results</h2>
        ${data.validationResults.verified.map(item => `
            <div class="verified">
                <strong>✓ ${item.type.replace('_', ' ').toUpperCase()}</strong><br>
                ${item.message}
            </div>
        `).join('')}
    </div>

    ${data.validationResults.issues.length > 0 ? `
    <div class="section">
        <h2>Issues Found</h2>
        ${data.validationResults.issues.map(issue => `
            <div class="issue">
                <strong>⚠ ${issue.title}</strong><br>
                ${issue.description}<br>
                <em>Recommendation: ${issue.recommendation}</em>
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${data.requirements ? `
    <div class="section">
        <h2>Current Visa Requirements</h2>
        <h3>General Information</h3>
        <ul>
            <li><strong>Processing Time:</strong> ${data.requirements.generalInfo.processingTime}</li>
            <li><strong>Validity:</strong> ${data.requirements.generalInfo.validity}</li>
            <li><strong>Fees:</strong> ${data.requirements.generalInfo.fees}</li>
            <li><strong>Application Methods:</strong> ${data.requirements.generalInfo.applicationMethods.join(', ')}</li>
        </ul>
        
        <h3>Required Documents</h3>
        <ul>
        ${data.requirements.requirements.filter(req => req.required).map(req => `
            <li><strong>${req.title}</strong> - ${req.description}</li>
        `).join('')}
        </ul>
        
        <h3>Important Notes</h3>
        <ul>
        ${data.requirements.importantNotes.map(note => `<li>${note}</li>`).join('')}
        </ul>
        
        <h3>Official Sources</h3>
        <ul>
        ${data.requirements.officialSources.map(source => `<li>${source}</li>`).join('')}
        </ul>
    </div>
    ` : ''}

    <div class="footer">
        <p>Generated by VisaValidator on ${new Date().toLocaleDateString()}</p>
        <p>This report is for informational purposes only. Always verify requirements with official sources.</p>
    </div>
</body>
</html>`;

  return html;
}

export function generateRequirementsChecklistPDF(requirements: ComprehensiveVisaRequirements): string {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Visa Requirements Checklist</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
        .requirement { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; margin-bottom: 10px; }
        .required { border-left: 4px solid #dc2626; }
        .optional { border-left: 4px solid #059669; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #6b7280; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        .checkbox { display: inline-block; width: 15px; height: 15px; border: 2px solid #374151; margin-right: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Visa Requirements Checklist</h1>
        <p><strong>Country:</strong> ${requirements.country}</p>
        <p><strong>Visa Type:</strong> ${requirements.visaType}</p>
        <p><strong>Last Updated:</strong> ${requirements.lastUpdated}</p>
    </div>

    <div class="section">
        <h2>General Information</h2>
        <ul>
            <li><strong>Processing Time:</strong> ${requirements.generalInfo.processingTime}</li>
            <li><strong>Validity:</strong> ${requirements.generalInfo.validity}</li>
            <li><strong>Fees:</strong> ${requirements.generalInfo.fees}</li>
            <li><strong>Application Methods:</strong> ${requirements.generalInfo.applicationMethods.join(', ')}</li>
        </ul>
    </div>

    ${['document', 'financial', 'personal', 'travel', 'health'].map(category => {
      const categoryReqs = requirements.requirements.filter(req => req.category === category);
      if (categoryReqs.length === 0) return '';
      
      const categoryNames = {
        'document': 'Document Requirements',
        'financial': 'Financial Requirements',
        'personal': 'Personal Requirements',
        'travel': 'Travel Requirements',
        'health': 'Health Requirements'
      };
      
      return `
        <div class="section">
            <h2>${categoryNames[category]}</h2>
            ${categoryReqs.map(req => `
                <div class="requirement ${req.required ? 'required' : 'optional'}">
                    <span class="checkbox"></span>
                    <strong>${req.title}</strong> ${req.required ? '(REQUIRED)' : '(OPTIONAL)'}<br>
                    ${req.description}
                    ${req.formats ? `<br><em>Accepted formats: ${req.formats.join(', ')}</em>` : ''}
                    ${req.specificNotes ? req.specificNotes.map(note => `<br><small>Note: ${note}</small>`).join('') : ''}
                </div>
            `).join('')}
        </div>
      `;
    }).join('')}

    ${requirements.importantNotes.length > 0 ? `
    <div class="section">
        <h2>Important Notes</h2>
        <ul>
        ${requirements.importantNotes.map(note => `<li>${note}</li>`).join('')}
        </ul>
    </div>
    ` : ''}

    ${requirements.recentChanges && requirements.recentChanges.length > 0 ? `
    <div class="section">
        <h2>Recent Changes</h2>
        <ul>
        ${requirements.recentChanges.map(change => `<li>${change}</li>`).join('')}
        </ul>
    </div>
    ` : ''}

    <div class="section">
        <h2>Official Sources</h2>
        <ul>
        ${requirements.officialSources.map(source => `<li>${source}</li>`).join('')}
        </ul>
    </div>

    <div class="footer">
        <p>Generated by VisaValidator on ${new Date().toLocaleDateString()}</p>
        <p>This checklist is for informational purposes only. Always verify requirements with official sources.</p>
        <p>Contact the official embassy or consulate for the most current requirements and assistance with your application.</p>
    </div>
</body>
</html>`;

  return html;
}