import { useState, useEffect } from 'react';
import { ValidationService, ValidationResult, PersonalInfo } from '@/services/validationService';
import { UploadedFile } from '@/services/uploadService';

export interface ValidationData {
  country: string;
  visaCategory: string;
  visaType: string;
  personalInfo: PersonalInfo;
  uploadedFiles: UploadedFile[];
  checkedDocuments: Record<string, boolean>;
}

export interface ValidationState {
  currentStep: number;
  validationData: ValidationData;
  validationResults: ValidationResult | null;
  sessionId: string;
  paymentStatus: string;
  isValidating: boolean;
  showPaymentModal: boolean;
}

const STORAGE_KEYS = {
  STEP: 'validation_current_step',
  DATA: 'validation_data',
  RESULTS: 'validation_results',
  SESSION: 'validation_session_id',
  PAYMENT: (sessionId: string) => `validation_payment_status_${sessionId}`,
};

export function useValidation() {
  const [state, setState] = useState<ValidationState>(() => {
    const savedStep = localStorage.getItem(STORAGE_KEYS.STEP);
    const savedData = localStorage.getItem(STORAGE_KEYS.DATA);
    const savedResults = localStorage.getItem(STORAGE_KEYS.RESULTS);
    const savedSession = localStorage.getItem(STORAGE_KEYS.SESSION);

    return {
      currentStep: savedStep ? parseInt(savedStep, 10) : 1,
      validationData: savedData ? JSON.parse(savedData) : {
        country: "",
        visaCategory: "",
        visaType: "",
        personalInfo: {
          applicantName: "",
          passportNumber: "",
          dateOfBirth: "",
          nationality: "",
          travelDate: "",
          stayDuration: 0,
          dataProcessingConsent: false,
        },
        uploadedFiles: [],
        checkedDocuments: {},
      },
      validationResults: savedResults ? JSON.parse(savedResults) : null,
      sessionId: savedSession || "",
      paymentStatus: "pending",
      isValidating: false,
      showPaymentModal: false,
    };
  });

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STEP, state.currentStep.toString());
  }, [state.currentStep]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(state.validationData));
  }, [state.validationData]);

  useEffect(() => {
    if (state.validationResults) {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(state.validationResults));
    }
  }, [state.validationResults]);

  useEffect(() => {
    if (state.sessionId) {
      localStorage.setItem(STORAGE_KEYS.SESSION, state.sessionId);
      const savedPayment = localStorage.getItem(STORAGE_KEYS.PAYMENT(state.sessionId));
      if (savedPayment) {
        setState(prev => ({ ...prev, paymentStatus: savedPayment }));
      }
    }
  }, [state.sessionId]);

  const updateValidationData = (updates: Partial<ValidationData>) => {
    setState(prev => ({
      ...prev,
      validationData: { ...prev.validationData, ...updates }
    }));
  };

  const updateUploadedFiles = (files: UploadedFile[]) => {
    setState(prev => ({
      ...prev,
      validationData: {
        ...prev.validationData,
        uploadedFiles: files
      }
    }));
  };

  const nextStep = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 7)
    }));
  };

  const previousStep = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1)
    }));
  };

  const goToStep = (step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, 7))
    }));
  };

  const createValidationSession = async () => {
    try {
      setState(prev => ({ ...prev, isValidating: true }));
      
      const response = await ValidationService.createValidationSession({
        country: state.validationData.country,
        visaType: state.validationData.visaType,
        personalInfo: state.validationData.personalInfo,
        uploadedFiles: state.validationData.uploadedFiles,
        checkedDocuments: state.validationData.checkedDocuments,
      });

      setState(prev => ({ 
        ...prev, 
        sessionId: response.sessionId,
        isValidating: false 
      }));

      return response.sessionId;
    } catch (error) {
      setState(prev => ({ ...prev, isValidating: false }));
      throw error;
    }
  };

  const validateDocuments = async (sessionId: string) => {
    try {
      setState(prev => ({ ...prev, isValidating: true }));
      
      const response = await ValidationService.validateDocuments(sessionId);
      
      setState(prev => ({
        ...prev,
        validationResults: response.validationResults,
        isValidating: false
      }));

      return response.validationResults;
    } catch (error) {
      setState(prev => ({ ...prev, isValidating: false }));
      throw error;
    }
  };

  const updatePaymentStatus = (status: string) => {
    setState(prev => ({ ...prev, paymentStatus: status }));
    if (state.sessionId) {
      localStorage.setItem(STORAGE_KEYS.PAYMENT(state.sessionId), status);
    }
  };

  const setShowPaymentModal = (show: boolean) => {
    setState(prev => ({ ...prev, showPaymentModal: show }));
  };

  const reset = () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (typeof key === 'string') {
        localStorage.removeItem(key);
      }
    });
    setState({
      currentStep: 1,
      validationData: {
        country: "",
        visaCategory: "",
        visaType: "",
        personalInfo: {
          applicantName: "",
          passportNumber: "",
          dateOfBirth: "",
          nationality: "",
          travelDate: "",
          stayDuration: 0,
          dataProcessingConsent: false,
        },
        uploadedFiles: [],
        checkedDocuments: {},
      },
      validationResults: null,
      sessionId: "",
      paymentStatus: "pending",
      isValidating: false,
      showPaymentModal: false,
    });
  };

  return {
    ...state,
    updateValidationData,
    updateUploadedFiles,
    nextStep,
    previousStep,
    goToStep,
    createValidationSession,
    validateDocuments,
    updatePaymentStatus,
    setShowPaymentModal,
    reset,
  };
}