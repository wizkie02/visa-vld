import type { ValidationResult } from './openai-service';
import type { ComprehensiveVisaRequirements } from './visa-requirements-service';

interface ReportData {
  validationResults: ValidationResult;
  personalInfo: any;
  country: string;
  visaType: string;
  nationality: string;
  requirements?: ComprehensiveVisaRequirements;
  uploadedDocuments: any[];
}

export function generateValidationReport(data: ReportData): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const logoSvg = `
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="8" fill="#1E40AF"/>
      <path d="M15 20L25 15L35 20L25 25L15 20Z" fill="white"/>
      <text x="45" y="16" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">VisaValidator</text>
      <text x="45" y="28" font-family="Arial, sans-serif" font-size="8" fill="#93C5FD">Document Validation</text>
    </svg>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visa Document Validation Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            padding: 2rem;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 200px;
            height: 200px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
        }
        
        .header-content {
            position: relative;
            z-index: 2;
        }
        
        .logo {
            margin-bottom: 1rem;
        }
        
        .report-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .report-subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .report-meta {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
            background: #f1f5f9;
            border-bottom: 3px solid #e2e8f0;
        }
        
        .meta-group h3 {
            color: #1e40af;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.5rem;
        }
        
        .score-section {
            padding: 2rem;
            text-align: center;
            background: ${data.validationResults.score === 0 ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' : 
                        data.validationResults.score >= 80 ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' : 
                        'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'};
        }
        
        .score-circle {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            font-weight: 700;
            color: ${data.validationResults.score === 0 ? '#dc2626' : 
                    data.validationResults.score >= 80 ? '#059669' : '#d97706'};
            background: white;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            margin-bottom: 1rem;
        }
        
        .score-label {
            font-size: 1.2rem;
            font-weight: 600;
            color: #374151;
        }
        
        .content-section {
            padding: 2rem;
        }
        
        .section-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .verified-item, .issue-item {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 8px;
            border-left: 4px solid;
        }
        
        .verified-item {
            background: #f0fdf4;
            border-left-color: #22c55e;
        }
        
        .issue-item {
            background: #fef2f2;
            border-left-color: #ef4444;
        }
        
        .item-title {
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .item-description {
            color: #6b7280;
            font-size: 0.9rem;
        }
        
        .recommendations {
            background: #eff6ff;
            border: 1px solid #dbeafe;
            border-radius: 8px;
            padding: 1.5rem;
            margin-top: 2rem;
        }
        
        .recommendations h3 {
            color: #1e40af;
            margin-bottom: 1rem;
        }
        
        .recommendations ul {
            list-style: none;
        }
        
        .recommendations li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .recommendations li::before {
            content: '→';
            position: absolute;
            left: 0;
            color: #3b82f6;
            font-weight: bold;
        }
        
        .footer {
            background: #1f2937;
            color: #9ca3af;
            padding: 2rem;
            text-align: center;
            font-size: 0.8rem;
            line-height: 1.8;
        }
        
        .footer-logo {
            margin-bottom: 1rem;
            opacity: 0.7;
        }
        
        .disclaimer {
            max-width: 600px;
            margin: 0 auto;
            padding: 1rem;
            background: #374151;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        
        .document-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .document-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1rem;
        }
        
        .document-type {
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 0.5rem;
        }
        
        .document-details {
            font-size: 0.9rem;
            color: #64748b;
        }
        
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
            .header::before { display: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-content">
                <div class="logo">${logoSvg}</div>
                <h1 class="report-title">Visa Document Validation Report</h1>
                <p class="report-subtitle">Comprehensive Analysis for ${data.country} ${data.visaType} Visa Application</p>
            </div>
        </div>

        <!-- Report Metadata -->
        <div class="report-meta">
            <div class="meta-group">
                <h3>Applicant Information</h3>
                <p><strong>Name:</strong> ${data.personalInfo.applicantName}</p>
                <p><strong>Nationality:</strong> ${data.nationality}</p>
                <p><strong>Passport:</strong> ${data.personalInfo.passportNumber}</p>
                <p><strong>Travel Date:</strong> ${new Date(data.personalInfo.travelDate).toLocaleDateString()}</p>
            </div>
            <div class="meta-group">
                <h3>Validation Details</h3>
                <p><strong>Destination:</strong> ${data.country}</p>
                <p><strong>Visa Type:</strong> ${data.visaType}</p>
                <p><strong>Report Date:</strong> ${currentDate}</p>
                <p><strong>Documents Analyzed:</strong> ${data.uploadedDocuments.length}</p>
            </div>
        </div>

        <!-- Validation Score -->
        <div class="score-section">
            <div class="score-circle">${data.validationResults.score}%</div>
            <div class="score-label">
                ${data.validationResults.score === 0 ? 'Incomplete Application - Missing Required Documents' :
                  data.validationResults.score >= 80 ? 'Strong Application' :
                  data.validationResults.score >= 60 ? 'Good Application with Minor Issues' :
                  'Application Needs Improvement'}
            </div>
        </div>

        <!-- Verified Documents -->
        ${data.validationResults.verified.length > 0 ? `
        <div class="content-section">
            <h2 class="section-title">✓ Verified Documents & Information</h2>
            ${data.validationResults.verified.map(item => `
                <div class="verified-item">
                    <div class="item-title">${item.type}</div>
                    <div class="item-description">${item.message}</div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <!-- Issues Found -->
        ${data.validationResults.issues.length > 0 ? `
        <div class="content-section">
            <h2 class="section-title">⚠ Issues Requiring Attention</h2>
            ${data.validationResults.issues.map(issue => `
                <div class="issue-item">
                    <div class="item-title">${issue.title}</div>
                    <div class="item-description">${issue.description}</div>
                    ${issue.recommendation ? `<div style="margin-top: 0.5rem; font-weight: 500; color: #dc2626;">Recommendation: ${issue.recommendation}</div>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        <!-- Uploaded Documents Summary -->
        <div class="content-section">
            <h2 class="section-title">📎 Analyzed Documents</h2>
            <div class="document-grid">
                ${data.uploadedDocuments.map(doc => `
                    <div class="document-card">
                        <div class="document-type">${doc.originalName}</div>
                        <div class="document-details">
                            Type: ${doc.analysis?.documentType || 'Unknown'}<br>
                            Confidence: ${doc.analysis?.confidence ? Math.round(doc.analysis.confidence * 100) + '%' : 'N/A'}<br>
                            Size: ${(doc.size / 1024).toFixed(1)} KB
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Recommendations -->
        <div class="content-section">
            <div class="recommendations">
                <h3>📋 Next Steps & Recommendations</h3>
                <ul>
                    ${data.validationResults.score === 0 ? 
                        '<li>CRITICAL: Obtain and upload all required documents before proceeding with your visa application</li>' : ''}
                    ${data.validationResults.issues.length > 0 ? 
                        '<li>Address all identified issues listed above to improve your application strength</li>' : ''}
                    <li>Review official embassy requirements for the most current information</li>
                    <li>Ensure all documents are translated and certified if required</li>
                    <li>Keep all original documents for your embassy appointment</li>
                    <li>Apply well in advance of your planned travel date</li>
                </ul>
            </div>
        </div>

        <!-- Footer with Disclaimer -->
        <div class="footer">
            <div class="footer-logo">${logoSvg}</div>
            
            <div class="disclaimer">
                <strong>IMPORTANT DISCLAIMER</strong><br><br>
                This validation report is generated by AI analysis and is intended for informational purposes only. 
                It should not be considered as official legal advice or a guarantee of visa approval. 
                Visa requirements can change frequently, and final decisions rest with the respective embassy or consulate. 
                Always verify current requirements with official government sources before submitting your application. 
                VisaValidator is not responsible for any visa application outcomes based on this report.
            </div>
            
            <p>Generated by VisaValidator AI Document Analysis System<br>
            Report ID: VV-${Date.now()}<br>
            © ${new Date().getFullYear()} VisaValidator. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
}

export function generateRequirementsChecklist(requirements: ComprehensiveVisaRequirements): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const logoSvg = `
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="8" fill="#1E40AF"/>
      <path d="M15 20L25 15L35 20L25 25L15 20Z" fill="white"/>
      <text x="45" y="16" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">VisaValidator</text>
      <text x="45" y="28" font-family="Arial, sans-serif" font-size="8" fill="#93C5FD">Requirements Guide</text>
    </svg>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visa Requirements Checklist - ${requirements.country}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        
        .checklist-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .checklist-subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .info-section {
            padding: 2rem;
            background: #f1f5f9;
            border-bottom: 3px solid #e2e8f0;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .info-item {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .info-label {
            font-size: 0.8rem;
            color: #059669;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-value {
            font-size: 1.1rem;
            font-weight: 500;
            margin-top: 0.2rem;
        }
        
        .requirements-section {
            padding: 2rem;
        }
        
        .category-section {
            margin-bottom: 2rem;
        }
        
        .category-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #059669;
            margin-bottom: 1rem;
            padding: 0.5rem 0;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .requirement-item {
            display: flex;
            align-items: flex-start;
            padding: 1rem;
            margin-bottom: 0.5rem;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            background: #fafafa;
        }
        
        .requirement-item.required {
            border-left: 4px solid #dc2626;
            background: #fef2f2;
        }
        
        .requirement-item.optional {
            border-left: 4px solid #3b82f6;
            background: #eff6ff;
        }
        
        .checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid #d1d5db;
            border-radius: 4px;
            margin-right: 1rem;
            margin-top: 0.1rem;
            flex-shrink: 0;
        }
        
        .requirement-content {
            flex: 1;
        }
        
        .requirement-title {
            font-weight: 600;
            margin-bottom: 0.3rem;
        }
        
        .requirement-title.required::after {
            content: ' *';
            color: #dc2626;
            font-weight: bold;
        }
        
        .requirement-description {
            color: #6b7280;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .requirement-notes {
            font-size: 0.8rem;
            color: #059669;
            background: #ecfdf5;
            padding: 0.5rem;
            border-radius: 4px;
            margin-top: 0.5rem;
        }
        
        .important-notes {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .important-notes h3 {
            color: #92400e;
            margin-bottom: 1rem;
        }
        
        .notes-list {
            list-style: none;
        }
        
        .notes-list li {
            padding: 0.3rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .notes-list li::before {
            content: '⚠';
            position: absolute;
            left: 0;
            color: #f59e0b;
        }
        
        .footer {
            background: #1f2937;
            color: #9ca3af;
            padding: 2rem;
            text-align: center;
            font-size: 0.8rem;
            line-height: 1.8;
        }
        
        .disclaimer {
            max-width: 600px;
            margin: 0 auto;
            padding: 1rem;
            background: #374151;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div style="margin-bottom: 1rem;">${logoSvg}</div>
            <h1 class="checklist-title">${requirements.country} Visa Requirements</h1>
            <p class="checklist-subtitle">${requirements.visaType} Visa Application Checklist</p>
        </div>

        <!-- General Information -->
        <div class="info-section">
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Processing Time</div>
                    <div class="info-value">${requirements.generalInfo.processingTime}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Visa Validity</div>
                    <div class="info-value">${requirements.generalInfo.validity}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Application Fee</div>
                    <div class="info-value">${requirements.generalInfo.fees}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Last Updated</div>
                    <div class="info-value">${new Date(requirements.lastUpdated).toLocaleDateString()}</div>
                </div>
            </div>
        </div>

        <!-- Important Notes -->
        ${requirements.importantNotes.length > 0 ? `
        <div class="requirements-section">
            <div class="important-notes">
                <h3>⚠ Important Notes</h3>
                <ul class="notes-list">
                    ${requirements.importantNotes.map(note => `<li>${note}</li>`).join('')}
                </ul>
            </div>
        </div>
        ` : ''}

        <!-- Requirements by Category -->
        <div class="requirements-section">
            ${Object.entries(
                requirements.requirements.reduce((acc, req) => {
                    if (!acc[req.category]) acc[req.category] = [];
                    acc[req.category].push(req);
                    return acc;
                }, {} as Record<string, typeof requirements.requirements>)
            ).map(([category, reqs]) => `
                <div class="category-section">
                    <h2 class="category-title">${category.charAt(0).toUpperCase() + category.slice(1)} Documents</h2>
                    ${reqs.map(req => `
                        <div class="requirement-item ${req.required ? 'required' : 'optional'}">
                            <div class="checkbox"></div>
                            <div class="requirement-content">
                                <div class="requirement-title ${req.required ? 'required' : ''}">${req.title}</div>
                                <div class="requirement-description">${req.description}</div>
                                ${req.formats ? `<div class="requirement-notes">Accepted formats: ${req.formats.join(', ')}</div>` : ''}
                                ${req.specificNotes ? req.specificNotes.map(note => `<div class="requirement-notes">${note}</div>`).join('') : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>

        <!-- Application Methods -->
        <div class="requirements-section">
            <div class="important-notes">
                <h3>📋 Application Methods</h3>
                <ul class="notes-list">
                    ${requirements.generalInfo.applicationMethods.map(method => `<li>${method}</li>`).join('')}
                </ul>
            </div>
        </div>

        <!-- Official Sources -->
        <div class="requirements-section">
            <div class="category-section">
                <h2 class="category-title">📚 Official Sources</h2>
                ${requirements.officialSources.map(source => `
                    <div class="requirement-item">
                        <div class="requirement-content">
                            <div class="requirement-description">${source}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div style="margin-bottom: 1rem; opacity: 0.7;">${logoSvg}</div>
            
            <div class="disclaimer">
                <strong>IMPORTANT DISCLAIMER</strong><br><br>
                This checklist is generated based on available information and is intended for guidance only. 
                Visa requirements can change frequently without notice. Always verify current requirements 
                with the official embassy or consulate before submitting your application. 
                VisaValidator is not responsible for any application outcomes based on this checklist.
            </div>
            
            <p>Generated by VisaValidator Requirements System<br>
            Checklist ID: CL-${Date.now()}<br>
            Generated on: ${currentDate}<br>
            © ${new Date().getFullYear()} VisaValidator. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
}