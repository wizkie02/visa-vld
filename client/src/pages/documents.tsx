import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNewAuth } from "@/hooks/use-new-auth";
import { useLanguage } from "@/lib/i18n";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { FileText, Trash2, Upload, Download, Eye, Calendar, HardDrive, CheckCircle, XCircle, Clock } from "lucide-react";
import type { DocumentAnalysisLog } from "@shared/schema";
import PersistentLanguageSelector from "@/components/persistent-language-selector";

export default function Documents() {
  const { user } = useNewAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDocument, setSelectedDocument] = useState<DocumentAnalysisLog | null>(null);

  const { data: documents = [], isLoading, error } = useQuery<DocumentAnalysisLog[]>({
    queryKey: ["/api/documents"],
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: async (documentId: number) => {
      await apiRequest("DELETE", `/api/documents/${documentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      toast({
        title: t("success"),
        description: t("documentDeletedSuccessfully"),
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentTypeIcon = (docType: string | null) => {
    switch (docType) {
      case 'passport':
        return '🛂';
      case 'id':
        return '🆔';
      case 'bank_statement':
        return '🏦';
      case 'visa':
        return '📄';
      default:
        return '📋';
    }
  };

  const getValidationStatusBadge = (docType: string | null) => {
    if (docType && docType !== 'analysis_failed') {
      return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"><CheckCircle className="w-3 h-3 mr-1" />Analyzed</Badge>;
    } else if (docType === 'analysis_failed') {
      return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
    } else {
      return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PersistentLanguageSelector />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <PersistentLanguageSelector />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t("error")}</h3>
              <p className="text-gray-600 dark:text-gray-400">{error.message}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <PersistentLanguageSelector />

      <div className="container-premium py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              {t("myDocuments")}
            </h1>
            <p className="text-xl text-[var(--visa-text-secondary)]">
              {t("manageUploadedDocuments")}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="card-enterprise p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FileText className="w-6 h-6 text-[var(--visa-primary)]" />
              </div>
              <p className="text-sm text-[var(--visa-text-muted)]">{t("totalDocuments")}</p>
              <p className="text-2xl font-bold gradient-text">{documents.length}</p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("validated")}</p>
                    <p className="text-2xl font-bold">
                      {documents.filter(doc => doc.detectedDocumentType && doc.detectedDocumentType !== 'analysis_failed').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("pending")}</p>
                    <p className="text-2xl font-bold">
                      {documents.filter(doc => !doc.detectedDocumentType || doc.detectedDocumentType === 'analysis_failed').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("totalSize")}</p>
                    <p className="text-2xl font-bold">
                      {formatFileSize(documents.reduce((total, doc) => total + doc.fileSize, 0))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload New Document Button */}
          <div className="mb-6">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = "/validation"}
            >
              <Upload className="w-4 h-4 mr-2" />
              {t("uploadNewDocument")}
            </Button>
          </div>

          {/* Documents List */}
          {documents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t("noDocuments")}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t("noDocumentsDescription")}
                </p>
                <Button 
                  onClick={() => window.location.href = "/validation"}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {t("uploadFirstDocument")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((document) => (
                <Card key={document.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getDocumentTypeIcon(document.detectedDocumentType)}</span>
                        <div>
                          <CardTitle className="text-base truncate max-w-[180px]" title={document.originalFileName}>
                            {document.originalFileName}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {document.detectedDocumentType || 'Unknown Type'}
                          </CardDescription>
                        </div>
                      </div>
                      {getValidationStatusBadge(document.detectedDocumentType)}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{t("fileType")}:</span>
                        <span className="font-medium">{document.fileType.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{t("fileSize")}:</span>
                        <span className="font-medium">{formatFileSize(document.fileSize)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{t("uploaded")}:</span>
                        <span className="font-medium">
                          {new Date(document.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedDocument(document)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        {t("view")}
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t("deleteDocument")}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t("deleteDocumentConfirmation")} "{document.originalFileName}"?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(document.id)}
                              className="bg-red-600 hover:bg-red-700"
                              disabled={deleteMutation.isPending}
                            >
                              {deleteMutation.isPending ? t("deleting") : t("delete")}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Document Details Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedDocument.originalFileName}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDocument(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">{t("documentType")}:</span>
                  <p>{selectedDocument.detectedDocumentType || 'Unknown'}</p>
                </div>
                <div>
                  <span className="font-semibold">{t("fileType")}:</span>
                  <p>{selectedDocument.fileType}</p>
                </div>
                <div>
                  <span className="font-semibold">{t("fileSize")}:</span>
                  <p>{formatFileSize(selectedDocument.fileSize)}</p>
                </div>
                <div>
                  <span className="font-semibold">{t("uploadDate")}:</span>
                  <p>{new Date(selectedDocument.uploadedAt).toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-semibold">{t("analysisStatus")}:</span>
                  <p>{getValidationStatusBadge(selectedDocument.detectedDocumentType)}</p>
                </div>
              </div>

              {selectedDocument.analysisResults && (
                <div>
                  <h4 className="font-semibold mb-2">{t("analysisResults")}:</h4>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                    {JSON.stringify(selectedDocument.analysisResults, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}