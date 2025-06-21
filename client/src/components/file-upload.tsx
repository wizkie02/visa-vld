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
        title: t('uploadFailed'),
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
        title: t('noFilesSelected'),
        description: t('pleaseSelectAtLeastOneFile'),
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
        title: t('invalidFileType'),
        description: `${t('pleaseUploadValidFiles')} ${invalidFiles.map(f => f.name).join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    console.log(`Processing ${filesArray.length} files for upload`);

    const newFiles: UploadFile[] = filesArray.map((file, index) => ({
      file,
      originalName: file.name,
      mimetype: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: 'uploading',
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Upload files immediately - all at once
    const formData = new FormData();
    filesArray.forEach((file, index) => {
      console.log(`Adding file ${index + 1}/${filesArray.length} to FormData:`, file.name, file.type);
      formData.append('files', file);
    });
    
    console.log("FormData entries count:", Array.from(formData.entries()).length);
    console.log("FormData file entries:", Array.from(formData.entries()).map(([key, value]) => ({ key, fileName: value instanceof File ? value.name : 'not a file' })));
    
    uploadMutation.mutate(formData, {
      onSuccess: (response) => {
        console.log("Upload response received:", response);
        console.log("Response files count:", response.files?.length || 0);
        
        // Keep existing uploaded files and add new ones
        const existingFiles = data.uploadedFiles || [];
        const newFiles = response.files || [];
        
        console.log("Existing files count:", existingFiles.length);
        console.log("New files count:", newFiles.length);
        console.log("Total files after upload:", existingFiles.length + newFiles.length);
        
        // Ensure no duplicates based on file name and size
        const allFiles = [...existingFiles];
        newFiles.forEach((newFile: any) => {
          const isDuplicate = existingFiles.some(existing => 
            existing.originalName === newFile.originalName && 
            existing.size === newFile.size
          );
          if (!isDuplicate) {
            allFiles.push(newFile);
          }
        });
        
        onUpdate({
          uploadedFiles: allFiles
        });
        
        // Clear only the current upload state (temp files), not persisted files
        setFiles([]);
        
        toast({
          title: "Upload Successful",
          description: `${newFiles.length} document${newFiles.length === 1 ? '' : 's'} uploaded and analyzed`,
          variant: "default",
        });
      },
      onError: (error) => {
        console.error("Upload failed:", error);
        setFiles(prev => prev.map(f => ({ ...f, status: 'error' as const })));
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
    // Only remove from current upload state, not from persisted uploaded files
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    // Don't update the uploadedFiles array when removing from current uploads
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
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1C4473] transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-700 mb-2">{t('selectFiles')}</h4>
          <p className="text-slate-600 mb-4">{t('dragDropFiles')}</p>
          <p className="text-sm text-gray-500">{t('supportedFormats')}</p>
          <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4 text-sm text-blue-700">
            <div className="font-medium mb-1">Multi-Document Upload Instructions:</div>
            <div>• Hold Ctrl (Windows) or Cmd (Mac) while clicking to select multiple files</div>
            <div>• All selected documents will be uploaded and analyzed together</div>
            <div>• Each document will appear individually in your validation report</div>
          </div>
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
        
        {/* All Uploaded Documents - Enhanced Display */}
        {(data.uploadedFiles && data.uploadedFiles.length > 0) && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {t('uploadedDocuments')} ({data.uploadedFiles.length} {data.uploadedFiles.length === 1 ? 'document' : 'documents'})
            </h4>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm">
              <div className="flex items-center space-x-2 text-green-700">
                <CheckCircle className="w-4 h-4" />
                <span>All {data.uploadedFiles.length} documents have been uploaded and analyzed successfully</span>
              </div>
              <div className="mt-2 text-xs text-green-600">
                Ready for validation - these documents will be analyzed against visa requirements
              </div>
            </div>
            <div className="space-y-3">
              {data.uploadedFiles.map((file: any, index: number) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.mimetype)}
                      <div>
                        <span className="font-medium text-blue-900">
                          Document {index + 1}: {file.originalName}
                        </span>
                        <span className="text-sm text-blue-700 ml-2">({formatFileSize(file.size)})</span>
                        {file.analysis && (
                          <div className="text-xs text-blue-600 mt-1 space-y-1">
                            <div>{t('documentType')}: {file.analysis.documentType}</div>
                            {file.analysis.confidence && (
                              <div className={`${file.analysis.confidence >= 0.8 ? 'text-green-600' : file.analysis.confidence >= 0.6 ? 'text-yellow-600' : 'text-red-600'}`}>
                                Analysis Confidence: {Math.round(file.analysis.confidence * 100)}%
                              </div>
                            )}
                            {file.analysis.fullName && <div>Name: {file.analysis.fullName}</div>}
                            {file.analysis.documentNumber && <div>Number: {file.analysis.documentNumber}</div>}
                            {file.analysis.expirationDate && <div>Expires: {file.analysis.expirationDate}</div>}
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
                    <h5 className="font-medium text-gray-800 mb-2">AI analysis results</h5>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Document type:</span>
                        <p className="capitalize">{file.analysis.documentType || 'Unknown'}</p>
                      </div>
                      {file.analysis.issuingCountry && (
                        <div>
                          <span className="font-medium text-gray-600">Issuing country:</span>
                          <p>{file.analysis.issuingCountry}</p>
                        </div>
                      )}
                      {file.analysis.fullName && (
                        <div>
                          <span className="font-medium text-gray-600">Name found:</span>
                          <p>{file.analysis.fullName}</p>
                        </div>
                      )}
                      {file.analysis.documentNumber && (
                        <div>
                          <span className="font-medium text-gray-600">Document number:</span>
                          <p>{file.analysis.documentNumber}</p>
                        </div>
                      )}
                      {file.analysis.expirationDate && (
                        <div>
                          <span className="font-medium text-gray-600">Expiry date:</span>
                          <p>{file.analysis.expirationDate}</p>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-gray-600">AI confidence:</span>
                        <p>{Math.round(file.analysis.confidence * 100)}%</p>
                      </div>
                    </div>
                    {file.analysis.extractedText && (
                      <div className="mt-3">
                        <span className="font-medium text-gray-600">Extracted text (first 200 chars):</span>
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

        {/* Document Checklist for non-uploaded documents */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-amber-900 mb-3">
            Documents You Have But Don't Want to Upload
          </h4>
          <p className="text-sm text-amber-800 mb-4">
            ⚠️ Warning: By checking these boxes, you confirm you have these documents but understand the system cannot validate their correctness without uploading them.
          </p>
          
          <div className="space-y-3">
            {[
              'Passport',
              'Travel insurance certificate',
              'Bank statements (financial proof)',
              'Hotel booking confirmation', 
              'Flight itinerary',
              'Employment certificate',
              'Invitation letter',
              'Passport-sized photos',
              'Cover letter'
            ].map((doc) => (
              <label key={doc} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.checkedDocuments?.[doc] || false}
                  onChange={(e) => {
                    onUpdate({
                      checkedDocuments: {
                        ...data.checkedDocuments,
                        [doc]: e.target.checked
                      }
                    });
                  }}
                  className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-amber-900">{doc}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <Button variant="outline" onClick={onPrevious} className="flex-1">
            Previous
          </Button>
          <Button onClick={onNext} disabled={!canProceed} className="flex-1 bg-[#1C4473] hover:bg-[#1C4473]/90">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
