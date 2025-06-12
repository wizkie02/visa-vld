import pdf from 'html-pdf-node';
import fs from 'fs';
import path from 'path';
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

// Convert base64 image to data URL for PDF inclusion
function getLogoDataUrl(): string {
  // Using a data URL for the VisaValidator logo
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
}

export async function generateValidationReportPDF(data: ReportData): Promise<Buffer> {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });

  const logoDataUrl = getLogoDataUrl();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #fff;
        }
        
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 3px solid #1E40AF;
            margin-bottom: 30px;
        }
        
        .logo {
            width: 200px;
            height: auto;
            margin-bottom: 15px;
        }
        
        .company-name {
            font-size: 32px;
            font-weight: bold;
            color: #1E40AF;
            margin: 10px 0;
        }
        
        .tagline {
            font-size: 16px;
            color: #6B7280;
            font-style: italic;
        }
        
        .report-title {
            font-size: 28px;
            font-weight: bold;
            color: #1F2937;
            text-align: center;
            margin: 30px 0;
            padding: 15px;
            background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
            border-radius: 8px;
        }
        
        .meta-info {
            background-color: #F8FAFC;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #1E40AF;
        }
        
        .meta-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .meta-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #E5E7EB;
        }
        
        .meta-label {
            font-weight: 600;
            color: #374151;
        }
        
        .meta-value {
            color: #6B7280;
        }
        
        .section {
            margin: 30px 0;
            padding: 0;
        }
        
        .section-title {
            font-size: 22px;
            font-weight: bold;
            color: #1F2937;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #E5E7EB;
        }
        
        .score-container {
            text-align: center;
            padding: 25px;
            margin: 20px 0;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .score-excellent {
            background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
            border: 2px solid #10B981;
        }
        
        .score-good {
            background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
            border: 2px solid #F59E0B;
        }
        
        .score-poor {
            background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
            border: 2px solid #EF4444;
        }
        
        .score-critical {
            background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
            border: 2px solid #DC2626;
        }
        
        .score-value {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .score-label {
            font-size: 18px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .verified-list, .issues-list {
            list-style: none;
            padding: 0;
        }
        
        .verified-item {
            background-color: #F0FDF4;
            border-left: 4px solid #22C55E;
            padding: 12px 16px;
            margin-bottom: 10px;
            border-radius: 0 6px 6px 0;
        }
        
        .issue-item {
            background-color: #FEF2F2;
            border-left: 4px solid #EF4444;
            padding: 15px 20px;
            margin-bottom: 15px;
            border-radius: 0 6px 6px 0;
        }
        
        .issue-title {
            font-weight: bold;
            color: #991B1B;
            margin-bottom: 8px;
        }
        
        .issue-description {
            color: #7F1D1D;
            margin-bottom: 8px;
        }
        
        .issue-recommendation {
            color: #B45309;
            font-style: italic;
            padding: 8px 12px;
            background-color: #FEF3C7;
            border-radius: 4px;
        }
        
        .document-grid {
            display: grid;
            gap: 15px;
        }
        
        .document-card {
            background-color: #F8FAFC;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 15px;
        }
        
        .document-name {
            font-weight: bold;
            color: #1F2937;
            margin-bottom: 8px;
            font-size: 16px;
        }
        
        .document-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            font-size: 14px;
            color: #6B7280;
        }
        
        .next-steps {
            background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
            border: 1px solid #3B82F6;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .recommendations-list {
            list-style-type: disc;
            padding-left: 20px;
            margin: 15px 0;
        }
        
        .recommendations-list li {
            margin-bottom: 8px;
            color: #374151;
        }
        
        .disclaimer {
            background-color: #F9FAFB;
            border: 2px solid #D1D5DB;
            border-radius: 8px;
            padding: 20px;
            margin-top: 40px;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .disclaimer-title {
            font-weight: bold;
            color: #991B1B;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #E5E7EB;
            color: #6B7280;
            font-size: 12px;
        }
        
        .page-break {
            page-break-after: always;
        }
        
        @media print {
            body { margin: 0; }
            .page-break { page-break-after: always; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-name">VisaValidator</div>
        <div class="tagline">Comprehensive Visa Validation with AI Technology</div>
    </div>
    
    <div class="report-title">Visa Document Validation Report</div>
    
    <div class="meta-info">
        <div class="meta-grid">
            <div class="meta-item">
                <span class="meta-label">Generated:</span>
                <span class="meta-value">${currentDate}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Destination:</span>
                <span class="meta-value">${data.country}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Visa Type:</span>
                <span class="meta-value">${data.visaType}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Session ID:</span>
                <span class="meta-value">VV-${Date.now()}</span>
            </div>
        </div>
    </div>
    
    <div class="section">
        <h2 class="section-title">Applicant Information</h2>
        <div class="meta-info">
            <div class="meta-grid">
                <div class="meta-item">
                    <span class="meta-label">Name:</span>
                    <span class="meta-value">${data.personalInfo.applicantName}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Nationality:</span>
                    <span class="meta-value">${data.nationality}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Passport Number:</span>
                    <span class="meta-value">${data.personalInfo.passportNumber}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Date of Birth:</span>
                    <span class="meta-value">${data.personalInfo.dateOfBirth}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Travel Date:</span>
                    <span class="meta-value">${new Date(data.personalInfo.travelDate).toLocaleDateString()}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Stay Duration:</span>
                    <span class="meta-value">${data.personalInfo.stayDuration} days</span>
                </div>
            </div>
        </div>
    </div>
    
    <div class="section">
        <h2 class="section-title">Validation Score</h2>
        <div class="score-container ${
          data.validationResults.score === 0 ? 'score-critical' :
          data.validationResults.score >= 80 ? 'score-excellent' :
          data.validationResults.score >= 60 ? 'score-good' : 'score-poor'
        }">
            <div class="score-value">${data.validationResults.score}%</div>
            <div class="score-label">${
              data.validationResults.score === 0 ? 'CRITICAL: Missing Required Documents' :
              data.validationResults.score >= 80 ? 'EXCELLENT: Strong Application' :
              data.validationResults.score >= 60 ? 'GOOD: Minor Issues' : 'NEEDS IMPROVEMENT'
            }</div>
        </div>
    </div>
    
    ${data.validationResults.verified.length > 0 ? `
    <div class="section">
        <h2 class="section-title">✅ Verified Documents & Information</h2>
        <ul class="verified-list">
            ${data.validationResults.verified.map(item => `
                <li class="verified-item">
                    <strong>${item.type}:</strong> ${item.message}
                </li>
            `).join('')}
        </ul>
    </div>
    ` : ''}
    
    ${data.validationResults.issues.length > 0 ? `
    <div class="section">
        <h2 class="section-title">⚠️ Issues Requiring Attention</h2>
        <ul class="issues-list">
            ${data.validationResults.issues.map(issue => `
                <li class="issue-item">
                    <div class="issue-title">${issue.title}</div>
                    <div class="issue-description"><strong>Type:</strong> ${issue.type}</div>
                    <div class="issue-description">${issue.description}</div>
                    <div class="issue-recommendation"><strong>Recommendation:</strong> ${issue.recommendation}</div>
                </li>
            `).join('')}
        </ul>
    </div>
    ` : ''}
    
    <div class="section">
        <h2 class="section-title">📄 Analyzed Documents Summary</h2>
        <div class="document-grid">
            ${data.uploadedDocuments.map((doc, index) => `
                <div class="document-card">
                    <div class="document-name">${index + 1}. ${doc.originalName}</div>
                    <div class="document-details">
                        <div><strong>Type:</strong> ${doc.analysis?.documentType || 'Unknown'}</div>
                        <div><strong>Size:</strong> ${(doc.size / 1024).toFixed(1)} KB</div>
                        <div><strong>Confidence:</strong> ${doc.analysis?.confidence ? Math.round(doc.analysis.confidence * 100) + '%' : 'N/A'}</div>
                        <div><strong>Upload Date:</strong> ${new Date(doc.uploadedAt).toLocaleDateString()}</div>
                    </div>
                    ${doc.analysis?.extractedText ? `<div style="margin-top: 10px; color: #6B7280;"><strong>Content Summary:</strong> ${doc.analysis.extractedText.substring(0, 100)}...</div>` : ''}
                </div>
            `).join('')}
        </div>
    </div>
    
    <div class="section">
        <h2 class="section-title">📋 Next Steps & Recommendations</h2>
        <div class="next-steps">
            ${data.validationResults.score === 0 ? 
              '<p><strong>🚨 IMMEDIATE ACTION REQUIRED:</strong> Obtain and upload all required documents before proceeding with your visa application.</p>' : ''
            }
            
            ${data.validationResults.issues.length > 0 ? `
                <h3>Priority Actions:</h3>
                <ul class="recommendations-list">
                    ${data.validationResults.issues.map(issue => `<li>${issue.recommendation}</li>`).join('')}
                </ul>
            ` : ''}
            
            <h3>General Recommendations:</h3>
            <ul class="recommendations-list">
                <li>Review official embassy requirements for the most current information</li>
                <li>Ensure all documents are translated and certified if required</li>
                <li>Keep all original documents for your embassy appointment</li>
                <li>Apply well in advance of your planned travel date</li>
                <li>Verify that your passport has sufficient validity and blank pages</li>
            </ul>
        </div>
    </div>
    
    <div class="disclaimer">
        <div class="disclaimer-title">⚖️ Important Legal Disclaimer</div>
        <p><strong>LEGAL NOTICE:</strong> This validation report is generated by AI analysis and is intended for informational purposes only. It should not be considered as official legal advice or a guarantee of visa approval. Visa requirements can change frequently, and final decisions rest with the respective embassy or consulate. Always verify current requirements with official government sources before submitting your application.</p>
        <p><strong>VisaValidator is not responsible for any visa application outcomes based on this report.</strong></p>
    </div>
    
    <div class="footer">
        <p>Report completed at: ${data.validationResults.completedAt}</p>
        <p>Generated by VisaValidator AI Document Analysis System</p>
        <p>© ${new Date().getFullYear()} VisaValidator. All rights reserved.</p>
        <p><strong>Contact Support:</strong> For questions about this report or assistance with your visa application, please contact our support team.</p>
    </div>
</body>
</html>`;

  const options = {
    format: 'A4',
    border: {
      top: '0.5in',
      right: '0.5in', 
      bottom: '0.5in',
      left: '0.5in'
    },
    type: 'pdf'
  };

  try {
    const pdfBuffer = await pdf.generatePdf({content: htmlContent}, options);
    return pdfBuffer;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
}

export async function generateRequirementsChecklistPDF(requirements: ComprehensiveVisaRequirements): Promise<Buffer> {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #fff;
        }
        
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 3px solid #1E40AF;
            margin-bottom: 30px;
        }
        
        .company-name {
            font-size: 32px;
            font-weight: bold;
            color: #1E40AF;
            margin: 10px 0;
        }
        
        .tagline {
            font-size: 16px;
            color: #6B7280;
            font-style: italic;
        }
        
        .report-title {
            font-size: 28px;
            font-weight: bold;
            color: #1F2937;
            text-align: center;
            margin: 30px 0;
            padding: 15px;
            background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
            border-radius: 8px;
        }
        
        .meta-info {
            background-color: #F8FAFC;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #1E40AF;
        }
        
        .section {
            margin: 30px 0;
            padding: 0;
        }
        
        .section-title {
            font-size: 22px;
            font-weight: bold;
            color: #1F2937;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #E5E7EB;
        }
        
        .requirement-category {
            background-color: #F8FAFC;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #3B82F6;
        }
        
        .requirement-item {
            background-color: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 6px;
            padding: 15px;
            margin: 10px 0;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        
        .requirement-required {
            border-left: 4px solid #DC2626;
        }
        
        .requirement-optional {
            border-left: 4px solid #059669;
        }
        
        .requirement-title {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }
        
        .required-badge {
            background-color: #DC2626;
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            margin-right: 10px;
        }
        
        .optional-badge {
            background-color: #059669;
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            margin-right: 10px;
        }
        
        .checkbox {
            width: 15px;
            height: 15px;
            border: 2px solid #6B7280;
            display: inline-block;
            margin-right: 8px;
            position: relative;
            top: 2px;
        }
        
        .disclaimer {
            background-color: #F9FAFB;
            border: 2px solid #D1D5DB;
            border-radius: 8px;
            padding: 20px;
            margin-top: 40px;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .disclaimer-title {
            font-weight: bold;
            color: #991B1B;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #E5E7EB;
            color: #6B7280;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-name">VisaValidator</div>
        <div class="tagline">Official Visa Documentation Checklist</div>
    </div>
    
    <div class="report-title">${requirements.country} Visa Requirements Checklist</div>
    
    <div class="meta-info">
        <p><strong>Visa Type:</strong> ${requirements.visaType}</p>
        <p><strong>Last Updated:</strong> ${new Date(requirements.lastUpdated).toLocaleDateString()}</p>
        <p><strong>Generated:</strong> ${currentDate}</p>
    </div>
    
    <div class="section">
        <h2 class="section-title">📊 Quick Reference Information</h2>
        <div class="meta-info">
            <p><strong>Processing Time:</strong> ${requirements.generalInfo.processingTime}</p>
            <p><strong>Visa Validity:</strong> ${requirements.generalInfo.validity}</p>
            <p><strong>Application Fee:</strong> ${requirements.generalInfo.fees}</p>
            <p><strong>Application Methods:</strong> ${requirements.generalInfo.applicationMethods.join(', ')}</p>
        </div>
    </div>
    
    <div class="section">
        <h2 class="section-title">⚠️ Important Notes</h2>
        <ul>
            ${requirements.importantNotes.map(note => `<li>${note}</li>`).join('')}
        </ul>
        
        ${requirements.recentChanges && requirements.recentChanges.length > 0 ? `
        <h3>🆕 Recent Changes</h3>
        <ul>
            ${requirements.recentChanges.map(change => `<li>${change}</li>`).join('')}
        </ul>
        ` : ''}
    </div>
    
    <div class="section">
        <h2 class="section-title">📋 Document Requirements Checklist</h2>
        
        ${Object.entries(
          requirements.requirements.reduce((acc, req) => {
            if (!acc[req.category]) acc[req.category] = [];
            acc[req.category].push(req);
            return acc;
          }, {} as Record<string, typeof requirements.requirements>)
        ).map(([category, reqs]) => `
        <div class="requirement-category">
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Documents</h3>
            
            ${reqs.map(req => `
            <div class="requirement-item ${req.required ? 'requirement-required' : 'requirement-optional'}">
                <div class="requirement-title">
                    <span class="${req.required ? 'required-badge' : 'optional-badge'}">
                        ${req.required ? 'REQUIRED' : 'OPTIONAL'}
                    </span>
                    ${req.title}
                </div>
                
                <p><strong>Description:</strong> ${req.description}</p>
                
                ${req.formats ? `<p><strong>Accepted Formats:</strong> ${req.formats.join(', ')}</p>` : ''}
                ${req.processingTime ? `<p><strong>Processing Time:</strong> ${req.processingTime}</p>` : ''}
                ${req.specificNotes ? req.specificNotes.map(note => `<p><strong>Note:</strong> ${note}</p>`).join('') : ''}
                ${req.additionalInfo ? `<p><strong>Additional Info:</strong> ${req.additionalInfo}</p>` : ''}
                
                <div style="margin-top: 15px; padding: 10px; background-color: #F3F4F6; border-radius: 4px;">
                    <div><span class="checkbox"></span> Obtained</div>
                    <div><span class="checkbox"></span> Reviewed</div>
                    <div><span class="checkbox"></span> Submitted</div>
                </div>
            </div>
            `).join('')}
        </div>
        `).join('')}
    </div>
    
    <div class="section">
        <h2 class="section-title">📝 Application Process Steps</h2>
        <div class="meta-info">
            <h3>1. Document Preparation</h3>
            <ul>
                <li>Gather all required documents listed above</li>
                <li>Ensure documents meet format and validity requirements</li>
                <li>Translate documents if required</li>
            </ul>
            
            <h3>2. Application Submission</h3>
            <ul>
                <li>Complete visa application form</li>
                <li>Schedule appointment (if required)</li>
                <li>Submit documents and pay fees</li>
            </ul>
            
            <h3>3. Processing & Interview</h3>
            <ul>
                <li>Attend interview if requested</li>
                <li>Provide additional documents if requested</li>
                <li>Wait for processing completion</li>
            </ul>
            
            <h3>4. Collection</h3>
            <ul>
                <li>Collect passport with visa decision</li>
                <li>Review visa details for accuracy</li>
            </ul>
        </div>
    </div>
    
    <div class="section">
        <h2 class="section-title">🔗 Official Sources & Contacts</h2>
        <ul>
            ${requirements.officialSources.map(source => `<li>${source}</li>`).join('')}
        </ul>
    </div>
    
    <div class="disclaimer">
        <div class="disclaimer-title">⚖️ Important Legal Disclaimer</div>
        <p><strong>LEGAL NOTICE:</strong> This checklist is generated based on available information and is intended for guidance only. Visa requirements can change frequently without notice. Always verify current requirements with the official embassy or consulate before submitting your application.</p>
        <p><strong>VisaValidator is not responsible for any application outcomes based on this checklist.</strong></p>
    </div>
    
    <div class="footer">
        <p>Checklist ID: CL-${Date.now()}</p>
        <p>Generated by VisaValidator Requirements System</p>
        <p>© ${new Date().getFullYear()} VisaValidator. All rights reserved.</p>
        <p><strong>Need Help?</strong> Contact the official embassy or consulate for the most current requirements and assistance with your application.</p>
    </div>
</body>
</html>`;

  const options = {
    format: 'A4',
    border: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in', 
      left: '0.5in'
    },
    type: 'pdf'
  };

  try {
    const pdfBuffer = await pdf.generatePdf({content: htmlContent}, options);
    return pdfBuffer;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF checklist');
  }
}