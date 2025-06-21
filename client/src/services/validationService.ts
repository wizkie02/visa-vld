import { apiRequest } from "@/lib/queryClient";

export interface ValidationResult {
  verified: Array<{
    type: string;
    message: string;
  }>;
  issues: Array<{
    type: string;
    title: string;
    description: string;
    recommendation: string;
  }>;
  score: number;
  completedAt: string;
}

export interface ValidationSession {
  sessionId: string;
  country: string;
  visaType: string;
  personalInfo: PersonalInfo;
  uploadedFiles: any[];
  checkedDocuments: Record<string, boolean>;
}

export interface PersonalInfo {
  applicantName: string;
  passportNumber: string;
  dateOfBirth: string;
  nationality: string;
  travelDate: string;
  stayDuration: number;
  dataProcessingConsent: boolean;
}

export class ValidationService {
  static async createValidationSession(data: {
    country: string;
    visaType: string;
    personalInfo: PersonalInfo;
    uploadedFiles: any[];
    checkedDocuments: Record<string, boolean>;
  }): Promise<{ sessionId: string }> {
    const response = await apiRequest('/api/create-validation-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create validation session');
    }

    return response.json();
  }

  static async validateDocuments(sessionId: string): Promise<{ validationResults: ValidationResult }> {
    const response = await apiRequest('/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      throw new Error('Document validation failed');
    }

    return response.json();
  }

  static async generatePDF(type: 'requirements' | 'validation-report', data: any): Promise<Blob> {
    const response = await apiRequest('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data }),
    });

    if (!response.ok) {
      throw new Error('PDF generation failed');
    }

    return response.blob();
  }

  static downloadPDF(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}