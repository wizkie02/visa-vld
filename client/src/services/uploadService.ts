import { apiRequest } from "@/lib/queryClient";

export interface UploadedFile {
  originalName: string;
  mimetype: string;
  size: number;
  uploadedAt: string;
  analysis?: DocumentAnalysis;
  error?: string;
}

export interface DocumentAnalysis {
  extractedText: string;
  documentType: string;
  issuingCountry?: string;
  expirationDate?: string;
  documentNumber?: string;
  fullName?: string;
  dateOfBirth?: string;
  nationality?: string;
  confidence: number;
  passportValidityWarning?: string;
}

export interface UploadResponse {
  files: UploadedFile[];
}

export class UploadService {
  static async uploadFiles(files: FileList): Promise<UploadResponse> {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  static validateFileTypes(files: FileList): { valid: File[], invalid: File[] } {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];

    const filesArray = Array.from(files);
    const valid = filesArray.filter(file => allowedTypes.includes(file.type));
    const invalid = filesArray.filter(file => !allowedTypes.includes(file.type));

    return { valid, invalid };
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static mergeDuplicateFiles(existing: UploadedFile[], newFiles: UploadedFile[]): UploadedFile[] {
    const merged = [...existing];
    
    newFiles.forEach(newFile => {
      const isDuplicate = existing.some(existingFile => 
        existingFile.originalName === newFile.originalName && 
        existingFile.size === newFile.size
      );
      
      if (!isDuplicate) {
        merged.push(newFile);
      }
    });

    return merged;
  }
}