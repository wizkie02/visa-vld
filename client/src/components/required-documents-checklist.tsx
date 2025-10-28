import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import LoadingSpinner from "@/components/loading-spinner";
import { useLanguage } from "@/lib/i18n";

interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: 'passport' | 'photo' | 'financial' | 'form' | 'supporting' | 'medical' | 'other';
  formats?: string[];
  specificNotes?: string[];
}

interface VisaSpecificRequirements {
  visaType: string;
  country: string;
  documents: DocumentRequirement[];
  additionalInfo: string[];
  processingNotes: string[];
}

interface RequiredDocumentsChecklistProps {
  country: string;
  visaType: string;
  subclass?: string;
  onDocumentsChanged: (checkedDocuments: string[], requiredDocuments: string[]) => void;
}

export default function RequiredDocumentsChecklist({
  country,
  visaType,
  subclass,
  onDocumentsChanged
}: RequiredDocumentsChecklistProps) {
  const { t } = useLanguage();
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([]);

  const { data: requirements, isLoading, error } = useQuery<VisaSpecificRequirements>({
    queryKey: ['/api/dynamic-requirements', country, visaType, subclass],
    enabled: !!(country && visaType),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2
  });

  useEffect(() => {
    if (requirements) {
      const requiredDocs = requirements.documents
        .filter(doc => doc.required)
        .map(doc => doc.id);
      onDocumentsChanged(checkedDocuments, requiredDocs);
    }
  }, [requirements, checkedDocuments, onDocumentsChanged]);

  const handleDocumentCheck = (documentId: string, checked: boolean) => {
    setCheckedDocuments(prev => 
      checked 
        ? [...prev, documentId]
        : prev.filter(id => id !== documentId)
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'passport': return '📘';
      case 'photo': return '📸';
      case 'financial': return '💰';
      case 'form': return '📋';
      case 'supporting': return '📄';
      case 'medical': return '🏥';
      default: return '📎';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'passport': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'photo': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'financial': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'form': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'supporting': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'medical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (!country || !visaType) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('requiredDocuments')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t('selectVisaTypeFirst')}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('requiredDocuments')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner
              size="md"
              text={t('loadingDocumentRequirements') || 'Loading document requirements...'}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('requiredDocuments')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>{t('errorLoadingRequirements')}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!requirements || requirements.documents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('requiredDocuments')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t('noDocumentRequirementsFound')}
          </p>
        </CardContent>
      </Card>
    );
  }

  const requiredDocuments = requirements.documents.filter(doc => doc.required);
  const optionalDocuments = requirements.documents.filter(doc => !doc.required);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('requiredDocuments')} - {requirements.visaType}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('checkDocumentsYouHave')}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Required Documents */}
          {requiredDocuments.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                {t('requiredDocuments')} ({requiredDocuments.length})
              </h3>
              <div className="grid gap-4">
                {requiredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start space-x-3 p-4 rounded-lg border bg-card"
                  >
                    <Checkbox
                      id={doc.id}
                      checked={checkedDocuments.includes(doc.id)}
                      onCheckedChange={(checked) => 
                        handleDocumentCheck(doc.id, checked as boolean)
                      }
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCategoryIcon(doc.category)}</span>
                        <label
                          htmlFor={doc.id}
                          className="font-medium cursor-pointer"
                        >
                          {doc.name}
                        </label>
                        <Badge className={getCategoryColor(doc.category)}>
                          {doc.category}
                        </Badge>
                        {doc.required && (
                          <Badge variant="destructive" className="text-xs">
                            {t('required')}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                      
                      {doc.formats && doc.formats.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          <strong>{t('acceptedFormats')}:</strong> {doc.formats.join(', ')}
                        </div>
                      )}
                      
                      {doc.specificNotes && doc.specificNotes.length > 0 && (
                        <div className="text-xs space-y-1">
                          <strong className="text-muted-foreground">{t('importantNotes')}:</strong>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {doc.specificNotes.map((note, index) => (
                              <li key={index}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional Documents */}
          {optionalDocuments.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                {t('optionalDocuments')} ({optionalDocuments.length})
              </h3>
              <div className="grid gap-4">
                {optionalDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start space-x-3 p-4 rounded-lg border bg-muted/30"
                  >
                    <Checkbox
                      id={doc.id}
                      checked={checkedDocuments.includes(doc.id)}
                      onCheckedChange={(checked) => 
                        handleDocumentCheck(doc.id, checked as boolean)
                      }
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCategoryIcon(doc.category)}</span>
                        <label
                          htmlFor={doc.id}
                          className="font-medium cursor-pointer"
                        >
                          {doc.name}
                        </label>
                        <Badge className={getCategoryColor(doc.category)}>
                          {doc.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {t('optional')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                      
                      {doc.formats && doc.formats.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          <strong>{t('acceptedFormats')}:</strong> {doc.formats.join(', ')}
                        </div>
                      )}
                      
                      {doc.specificNotes && doc.specificNotes.length > 0 && (
                        <div className="text-xs space-y-1">
                          <strong className="text-muted-foreground">{t('importantNotes')}:</strong>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {doc.specificNotes.map((note, index) => (
                              <li key={index}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {requirements.additionalInfo.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">{t('additionalInformation')}</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {requirements.additionalInfo.map((info, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Processing Notes */}
          {requirements.processingNotes.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">{t('processingNotes')}</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {requirements.processingNotes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">⚠️</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}