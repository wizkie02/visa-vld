import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, FileText, CheckCircle, AlertCircle, RefreshCw, Globe, Clock, DollarSign } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { ValidationData } from '@/pages/validation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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

interface RequiredDocumentsDisplayProps {
  data: ValidationData;
  onNext: () => void;
  onPrevious: () => void;
}

// Fallback requirements data (only used if API fails)
const fallbackRequirements: Record<string, Record<string, any>> = {
  China: {
    Tourist: {
      general: [
        {
          id: 'passport',
          title: 'Valid Passport',
          description: 'Original passport with at least 6 months validity and 2 blank pages',
          required: true,
          formats: ['Original document'],
          specificNotes: ['Must be valid for at least 6 months from entry date', 'At least 2 blank pages required']
        },
        {
          id: 'visa-form',
          title: 'Visa Application Form',
          description: 'Completed and signed visa application form V.2013',
          required: true,
          formats: ['PDF', 'Original printed form']
        },
        {
          id: 'photo',
          title: 'Passport Photo',
          description: 'Recent passport-sized color photo (white background)',
          required: true,
          formats: ['JPG', 'PNG', 'Physical photo'],
          specificNotes: ['35mm x 45mm', 'White background', 'Taken within last 6 months']
        },
        {
          id: 'flight-tickets',
          title: 'Flight Itinerary',
          description: 'Round-trip flight reservations',
          required: true,
          formats: ['PDF', 'Email confirmation']
        },
        {
          id: 'hotel-booking',
          title: 'Accommodation Proof',
          description: 'Hotel reservations or invitation letter',
          required: true,
          formats: ['PDF', 'Email confirmation']
        },
        {
          id: 'bank-statement',
          title: 'Financial Proof',
          description: 'Bank statements from last 3 months',
          required: true,
          formats: ['PDF', 'Original bank statements'],
          specificNotes: ['Must show sufficient funds for travel', 'Recent 3-month history required']
        }
      ],
      nationalitySpecific: {
        US: [
          {
            id: 'us-status',
            title: 'US Legal Status',
            description: 'Green card or valid US visa for non-US citizens',
            required: true,
            formats: ['PDF copy', 'Original document']
          }
        ]
      }
    },
    Business: {
      general: [
        {
          id: 'passport',
          title: 'Valid Passport',
          description: 'Original passport with at least 6 months validity and 2 blank pages',
          required: true,
          formats: ['Original document']
        },
        {
          id: 'invitation-letter',
          title: 'Business Invitation Letter',
          description: 'Invitation from Chinese company with business license',
          required: true,
          formats: ['PDF', 'Original letter']
        },
        {
          id: 'company-letter',
          title: 'Employment Letter',
          description: 'Letter from your employer confirming employment and travel purpose',
          required: true,
          formats: ['PDF', 'Company letterhead']
        }
      ]
    }
  },
  Japan: {
    Tourist: {
      general: [
        {
          id: 'passport',
          title: 'Valid Passport',
          description: 'Passport valid for duration of stay',
          required: true,
          formats: ['Original document']
        },
        {
          id: 'application-form',
          title: 'Visa Application Form',
          description: 'Completed visa application form',
          required: true,
          formats: ['PDF', 'Original form']
        },
        {
          id: 'photo',
          title: 'Passport Photo',
          description: 'Recent passport-sized photo',
          required: true,
          formats: ['JPG', 'PNG', 'Physical photo']
        }
      ]
    }
  }
};

export default function RequiredDocumentsDisplay({ data, onNext, onPrevious }: RequiredDocumentsDisplayProps) {
  const { t } = useLanguage();

  const getRequirements = () => {
    const countryReqs = visaRequirements[data.country];
    if (!countryReqs) return [];
    
    const visaReqs = countryReqs[data.visaType];
    if (!visaReqs) return [];
    
    let requirements = [...visaReqs.general];
    
    // Add nationality-specific requirements
    if (visaReqs.nationalitySpecific) {
      const nationalityKey = data.personalInfo.nationality;
      if (visaReqs.nationalitySpecific[nationalityKey]) {
        requirements = [...requirements, ...visaReqs.nationalitySpecific[nationalityKey]];
      }
    }
    
    return requirements;
  };

  const downloadRequirementsList = () => {
    const requirements = getRequirements();
    
    let content = `VISA REQUIREMENTS CHECKLIST\n`;
    content += `Destination: ${data.country}\n`;
    content += `Visa Type: ${data.visaType}\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    content += `===========================================\n\n`;
    
    requirements.forEach((req, index) => {
      content += `${index + 1}. ${req.title}\n`;
      content += `   ${req.description}\n`;
      if (req.formats) {
        content += `   Accepted formats: ${req.formats.join(', ')}\n`;
      }
      if (req.specificNotes) {
        content += `   Important notes:\n`;
        req.specificNotes.forEach((note: string) => {
          content += `   - ${note}\n`;
        });
      }
      content += `\n`;
    });
    
    content += `===========================================\n`;
    content += `Please ensure all documents are clear, legible, and meet the specified requirements.\n`;
    content += `Contact the embassy or consulate for any clarifications.\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visa-requirements-${data.country}-${data.visaType}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const requirements = getRequirements();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">{t('requiredDocuments') || 'Required Documents'}</h2>
        <p className="text-gray-600">
          {t('reviewRequiredDocs') || 'Please review the required documents before uploading'}
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <span className="font-semibold">{t('destination') || 'Destination'}:</span>
            <span>{data.country}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <span className="font-semibold">{t('visaType') || 'Visa Type'}:</span>
            <span>{data.visaType}</span>
          </span>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <Button 
          onClick={downloadRequirementsList}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
        >
          <Download className="w-4 h-4 mr-2" />
          {t('downloadChecklist') || 'Download Requirements Checklist'}
        </Button>
      </div>

      <div className="grid gap-4">
        {requirements.map((requirement, index) => (
          <Card key={requirement.id} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {requirement.required ? (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                      <span>{requirement.title}</span>
                      <Badge variant={requirement.required ? "destructive" : "secondary"}>
                        {requirement.required ? (t('required') || 'Required') : (t('optional') || 'Optional')}
                      </Badge>
                    </CardTitle>
                  </div>
                </div>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 mb-3">{requirement.description}</p>
              
              {requirement.formats && (
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    {t('acceptedFormats') || 'Accepted formats'}: 
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {requirement.formats.map((format: string) => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {requirement.specificNotes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <span className="text-sm font-medium text-yellow-800 block mb-2">
                    {t('importantNotes') || 'Important Notes'}:
                  </span>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {requirement.specificNotes.map((note: string, noteIndex: number) => (
                      <li key={noteIndex} className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          {t('preparationTips') || 'Preparation Tips'}
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• {t('tip1') || 'Ensure all documents are clear and legible'}</li>
          <li>• {t('tip2') || 'Scan documents in high resolution (300 DPI or higher)'}</li>
          <li>• {t('tip3') || 'Keep original documents for your appointment'}</li>
          <li>• {t('tip4') || 'Verify all information matches across documents'}</li>
        </ul>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          {t('previous')}
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white">
          {t('proceedToUpload') || 'Proceed to Upload Documents'}
        </Button>
      </div>
    </div>
  );
}