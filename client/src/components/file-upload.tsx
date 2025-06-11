import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CloudUpload, FileText, Image, X, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
}

export default function FileUpload({ data, onUpdate, onNext, onPrevious, canProceed }: FileUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest("POST", "/api/upload", formData);
      return response.json();
    },
    onSuccess: (result) => {
      // Update files status to uploaded
      setFiles(prev => prev.map(f => ({ ...f, status: 'uploaded' as const, progress: 100 })));
      
      // Update validation data
      onUpdate({ uploadedFiles: result.files });
      
      toast({
        title: "Upload successful",
        description: `${result.files.length} file(s) uploaded successfully`,
      });
    },
    onError: (error) => {
      setFiles(prev => prev.map(f => ({ ...f, status: 'error' as const })));
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (selectedFiles: FileList) => {
    const newFiles: UploadFile[] = Array.from(selectedFiles).map(file => ({
      file,
      originalName: file.name,
      mimetype: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: 'uploading',
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((_, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 90) {
          clearInterval(interval);
          progress = 90;
        }
        setFiles(prev => prev.map((f, i) => 
          i >= prev.length - newFiles.length + index 
            ? { ...f, progress } 
            : f
        ));
      }, 200);
    });

    // Upload files
    const formData = new FormData();
    Array.from(selectedFiles).forEach(file => {
      formData.append('files', file);
    });
    
    uploadMutation.mutate(formData);
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
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Upload Your Documents</h3>
        
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-700 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Drag and drop your files here</h4>
          <p className="text-slate-600 mb-4">or click to browse and select files</p>
          <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG, DOCX (Max 10MB per file)</p>
          <Button variant="outline" className="mt-4">
            Choose Files
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.docx"
          className="hidden"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        />
        
        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                  {file.status === 'uploaded' && (
                    <div className="flex items-center text-emerald-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Uploaded</span>
                    </div>
                  )}
                  {file.status === 'uploading' && (
                    <div className="flex items-center text-blue-600">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-1"></div>
                      <span className="text-sm">Processing...</span>
                    </div>
                  )}
                  {file.status === 'error' && (
                    <span className="text-sm text-red-600">Error</span>
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
