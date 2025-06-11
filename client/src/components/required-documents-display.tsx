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

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'financial':
      return <DollarSign className="w-4 h-4" />;
    case 'health':
      return <CheckCircle className="w-4 h-4" />;
    case 'travel':
      return <Globe className="w-4 h-4" />;
    case 'personal':
      return <FileText className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'financial':
      return 'border-l-green-500';
    case 'health':
      return 'border-l-red-500';
    case 'travel':
      return 'border-l-purple-500';
    case 'personal':
      return 'border-l-orange-500';
    default:
      return 'border-l-blue-500';
  }
};

export default function RequiredDocumentsDisplay({ data, onNext, onPrevious }: RequiredDocumentsDisplayProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch real-time visa requirements from API
  const { data: liveRequirements, isLoading, error, refetch } = useQuery<ComprehensiveVisaRequirements>({
    queryKey: ['/api/visa-requirements', data.country, data.visaType],
    queryFn: async () => {
      const response = await fetch(`/api/visa-requirements/${encodeURIComponent(data.country)}/${encodeURIComponent(data.visaType)}?nationality=${encodeURIComponent(data.personalInfo?.nationality || '')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch visa requirements');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false,
  });

  const downloadComprehensiveChecklist = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/visa-requirements/${encodeURIComponent(data.country)}/${encodeURIComponent(data.visaType)}/download?nationality=${encodeURIComponent(data.personalInfo?.nationality || '')}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate checklist');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `comprehensive-visa-requirements-${data.country}-${data.visaType}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download Complete",
        description: "Comprehensive requirements checklist downloaded with the latest information.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download the checklist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">{t('requiredDocuments') || 'Required Documents'}</h2>
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Fetching current visa requirements online...</span>
          </div>
        </div>
        
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="border-l-4 border-l-gray-300">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Show error state with retry option
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">{t('requiredDocuments') || 'Required Documents'}</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-red-600 mb-4">
              <AlertCircle className="w-5 h-5" />
              <span>Unable to fetch current visa requirements</span>
            </div>
            <Button onClick={() => refetch()} variant="outline" className="mx-auto block">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const requirements = liveRequirements?.requirements || [];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">{t('requiredDocuments') || 'Required Documents'}</h2>
        <p className="text-gray-600">
          {t('reviewRequiredDocs') || 'Please review the current visa requirements before uploading documents'}
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
        
        {liveRequirements && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Globe className="w-4 h-4" />
              <span>Information updated: {new Date(liveRequirements.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* General Information Card */}
      {liveRequirements && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-900">
              <Clock className="w-5 h-5" />
              <span>General Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-blue-800">Processing Time:</span>
                <p className="text-blue-700">{liveRequirements.generalInfo.processingTime}</p>
              </div>
              <div>
                <span className="font-semibold text-blue-800">Visa Validity:</span>
                <p className="text-blue-700">{liveRequirements.generalInfo.validity}</p>
              </div>
              <div>
                <span className="font-semibold text-blue-800">Application Fees:</span>
                <p className="text-blue-700">{liveRequirements.generalInfo.fees}</p>
              </div>
              <div>
                <span className="font-semibold text-blue-800">Application Methods:</span>
                <p className="text-blue-700">{liveRequirements.generalInfo.applicationMethods.join(', ')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={downloadComprehensiveChecklist}
          disabled={isDownloading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
        >
          {isDownloading ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isDownloading ? 'Generating...' : (t('downloadChecklist') || 'Download Complete Checklist')}
        </Button>
        
        <Button 
          onClick={() => refetch()}
          variant="outline"
          className="px-6 py-3"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Requirements
        </Button>
      </div>

      <div className="grid gap-4">
        {requirements.map((requirement) => (
          <Card key={requirement.id} className={`border-l-4 ${getCategoryColor(requirement.category)}`}>
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
                      <Badge variant="outline" className="flex items-center space-x-1">
                        {getCategoryIcon(requirement.category)}
                        <span className="capitalize">{requirement.category}</span>
                      </Badge>
                    </CardTitle>
                  </div>
                </div>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{requirement.description}</p>
              
              {requirement.formats && requirement.formats.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-600 block mb-2">
                    {t('acceptedFormats') || 'Accepted Formats'}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {requirement.formats.map((format, formatIndex) => (
                      <Badge key={formatIndex} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {requirement.processingTime && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Processing Time:</span>
                    <span className="text-sm text-blue-700">{requirement.processingTime}</span>
                  </div>
                </div>
              )}

              {requirement.additionalInfo && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-sm font-medium text-gray-700 block mb-1">Additional Information:</span>
                  <p className="text-sm text-gray-600">{requirement.additionalInfo}</p>
                </div>
              )}
              
              {requirement.specificNotes && requirement.specificNotes.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <span className="text-sm font-medium text-yellow-800 block mb-2">
                    {t('importantNotes') || 'Important Notes'}:
                  </span>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {requirement.specificNotes.map((note, noteIndex) => (
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

      {/* Important Notes Section */}
      {liveRequirements && liveRequirements.importantNotes.length > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-900">Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-orange-800 space-y-2">
              {liveRequirements.importantNotes.map((note, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recent Changes Section */}
      {liveRequirements && liveRequirements.recentChanges && liveRequirements.recentChanges.length > 0 && (
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-900">Recent Changes (2024-2025)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-purple-800 space-y-2">
              {liveRequirements.recentChanges.map((change, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Official Sources */}
      {liveRequirements && liveRequirements.officialSources.length > 0 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Official Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-700 space-y-1">
              {liveRequirements.officialSources.map((source, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          {t('preparationTips') || 'Preparation Tips'}
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• {t('tip1') || 'Ensure all documents are clear and legible'}</li>
          <li>• {t('tip2') || 'Scan documents in high resolution (300 DPI or higher)'}</li>
          <li>• {t('tip3') || 'Keep original documents for your appointment'}</li>
          <li>• {t('tip4') || 'Verify all information matches across documents'}</li>
          <li>• Always verify requirements with official embassy sources before submission</li>
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