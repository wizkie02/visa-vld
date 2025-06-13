import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CloudUpload, FileText, Image, X, CheckCircle, AlertTriangle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n";
import type { ValidationData } from "@/pages/validation";

interface FileUploadProps {
  data: ValidationData;
  onUpdate: (updates: Partial<ValidationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
}

interface UploadFile {
  file: File;
  originalName: string;
  mimetype: string;
  size: number;
  uploadedAt: string;
  status: 'uploading' | 'uploaded' | 'error';
  progress: number;
  analysis?: {
    extractedText: string;
    documentType: string;
    issuingCountry?: string;
    expirationDate?: string;
    documentNumber?: string;
    fullName?: string;
    dateOfBirth?: string;
    nationality?: string;
    confidence: number;
  };
  error?: string;
}

export default function FileUpload({ data, onUpdate, onNext, onPrevious, canProceed }: FileUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("Uploading files:", Array.from(formData.entries()));
      const response = await apiRequest("POST", "/api/upload", formData);
      return response.json();
    },
    onSuccess: (result) => {
      // Update files with analysis results
      const analyzedFiles = result.files.map((file: any) => ({
        file: files.find(f => f.originalName === file.originalName)?.file,
        originalName: file.originalName,
        mimetype: file.mimetype,
        size: file.size,
        uploadedAt: file.uploadedAt,
        status: 'uploaded' as const,
        progress: 100,
        analysis: file.analysis,
        error: file.error
      }));
      
      setFiles(analyzedFiles);
      
      // Update validation data
      onUpdate({ uploadedFiles: result.files });
      
      const successCount = result.files.filter((f: any) => f.analysis && !f.error).length;
      const errorCount = result.files.filter((f: any) => f.error).length;
      
      toast({
        title: "Upload and Analysis Complete",
        description: `${successCount} document(s) analyzed successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
      });
    },
    onError: (error) => {
      console.error("Upload error:", error);
      setFiles(prev => prev.map(f => ({ ...f, status: 'error' as const })));
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (selectedFiles: FileList) => {
    console.log("Selected files:", selectedFiles);
    console.log("Files count:", selectedFiles.length);
    
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      });
      return;
    }

    // Validate file types
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
    const filesArray = Array.from(selectedFiles);
    
    const invalidFiles = filesArray.filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid file type",
        description: `Please upload only PDF, JPG, PNG, DOCX, DOC, or TXT files. Invalid files: ${invalidFiles.map(f => f.name).join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    const newFiles: UploadFile[] = filesArray.map(file => ({
      file,
      originalName: file.name,
      mimetype: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: 'uploading',
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Upload files immediately
    const formData = new FormData();
    filesArray.forEach(file => {
      console.log("Adding file to FormData:", file.name, file.type);
      formData.append('files', file);
    });
    
    console.log("FormData entries:", Array.from(formData.entries()));
    uploadMutation.mutate(formData, {
      onSuccess: (response) => {
        // Keep existing uploaded files and add new ones
        const existingFiles = data.uploadedFiles || [];
        const newFiles = response.files || [];
        
        onUpdate({
          uploadedFiles: [...existingFiles, ...newFiles]
        });
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    
    const uploadedFiles = newFiles
      .filter(f => f.status === 'uploaded')
      .map(f => ({
        originalName: f.originalName,
        mimetype: f.mimetype,
        size: f.size,
        uploadedAt: f.uploadedAt,
      }));
    
    onUpdate({ uploadedFiles });
  };

  const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith('image/')) return <Image className="w-5 h-5 text-blue-500" />;
    if (mimetype === 'application/pdf') return <FileText className="w-5 h-5 text-red-500" />;
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg">
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('uploadFiles')}</h3>
        
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-700 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-700 mb-2">{t('selectFiles')}</h4>
          <p className="text-slate-600 mb-4">{t('dragDropFiles')}</p>
          <p className="text-sm text-gray-500">{t('supportedFormats')}</p>
          <Button variant="outline" className="mt-4">
            {t('uploadFiles')}
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.docx,.doc,.txt"
          className="hidden"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        />
        
        {/* All Uploaded Documents - Real-time List */}
        {(data.uploadedFiles && data.uploadedFiles.length > 0) && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('uploadedDocuments')} ({data.uploadedFiles.length})</h4>
            <div className="space-y-3">
              {data.uploadedFiles.map((file: any, index: number) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.mimetype)}
                      <div>
                        <span className="font-medium text-blue-900">{file.originalName}</span>
                        <span className="text-sm text-blue-700 ml-2">({formatFileSize(file.size)})</span>
                        {file.analysis && (
                          <div className="text-xs text-blue-600 mt-1">
                            {t('documentType')}: {file.analysis.documentType}
                            {file.analysis.confidence && ` (${Math.round(file.analysis.confidence * 100)}% ${t('confidence')})`}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-emerald-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">{t('uploaded')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Currently Uploading Files */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('currentUploads')}</h4>
            {files.map((file, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.mimetype)}
                    <div>
                      <span className="font-medium">{file.originalName}</span>
                      <span className="text-sm text-slate-600 ml-2">({formatFileSize(file.size)})</span>
                      {file.status === 'uploading' && (
                        <Progress value={file.progress} className="w-24 mt-1" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'uploaded' && file.analysis && (
                      <div className="flex items-center text-emerald-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{t('documentAnalyzed')}</span>
                      </div>
                    )}
                    {file.status === 'uploaded' && file.error && (
                      <div className="flex items-center text-amber-600">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        <span className="text-sm">Analysis Failed</span>
                      </div>
                    )}
                    {file.status === 'uploading' && (
                      <div className="flex items-center text-blue-600">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-1"></div>
                        <span className="text-sm">{t('analyzing')}</span>
                      </div>
                    )}
                    {file.status === 'error' && (
                      <span className="text-sm text-red-600">{t('uploadError')}</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {file.analysis && (
                  <div className="mt-3 p-3 bg-white rounded border">
                    <h5 className="font-medium text-gray-800 mb-2">AI Analysis Results</h5>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Document Type:</span>
                        <p className="capitalize">{file.analysis.documentType || 'Unknown'}</p>
                      </div>
                      {file.analysis.issuingCountry && (
                        <div>
                          <span className="font-medium text-gray-600">Issuing Country:</span>
                          <p>{file.analysis.issuingCountry}</p>
                        </div>
                      )}
                      {file.analysis.fullName && (
                        <div>
                          <span className="font-medium text-gray-600">Name Found:</span>
                          <p>{file.analysis.fullName}</p>
                        </div>
                      )}
                      {file.analysis.documentNumber && (
                        <div>
                          <span className="font-medium text-gray-600">Document Number:</span>
                          <p>{file.analysis.documentNumber}</p>
                        </div>
                      )}
                      {file.analysis.expirationDate && (
                        <div>
                          <span className="font-medium text-gray-600">Expiry Date:</span>
                          <p>{file.analysis.expirationDate}</p>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-gray-600">AI Confidence:</span>
                        <p>{Math.round(file.analysis.confidence * 100)}%</p>
                      </div>
                    </div>
                    {file.analysis.extractedText && (
                      <div className="mt-3">
                        <span className="font-medium text-gray-600">Extracted Text (first 200 chars):</span>
                        <p className="text-xs text-gray-500 mt-1 bg-gray-50 p-2 rounded">
                          {file.analysis.extractedText.substring(0, 200)}...
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {file.error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-700">{file.error}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-4 mt-6">
          <Button variant="outline" onClick={onPrevious} className="flex-1">
            Previous
          </Button>
          <Button onClick={onNext} disabled={!canProceed} className="flex-1 bg-blue-700 hover:bg-blue-800">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
