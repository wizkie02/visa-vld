import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Ticket, ArrowLeft, Download } from "lucide-react";
import StepIndicator from "@/components/step-indicator";
import CountrySelection from "@/components/country-selection";
import NationalitySelection from "@/components/nationality-selection";
import RequiredDocumentsDisplay from "@/components/required-documents-display";
import FileUpload from "@/components/file-upload";
import PersonalInfoForm from "@/components/personal-info-form";
import PaymentModal from "@/components/payment-modal";
import VisaRequirementsDisplay from "@/components/visa-requirements-display";
import FlagIconReal from "@/components/flag-icon-real";
import LoadingSpinner, { CardLoader, ButtonLoading } from "@/components/loading-spinner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n";
import { apiRequest } from "@/lib/queryClient";
import horizontalLogo from "@assets/horizontal_2@3x_1750492153266.webp";

// 🚀 Country flag mapping with emoji flags
const COUNTRY_FLAGS: Record<string, string> = {
  'afghanistan': '🇦🇫',
  'albania': '🇦🇱',
  'algeria': '🇩🇿',
  'andorra': '🇦🇩',
  'angola': '🇦🇴',
  'argentina': '🇦🇷',
  'armenia': '🇦🇲',
  'australia': '🇦🇺',
  'austria': '🇦🇹',
  'azerbaijan': '🇦🇿',
  'bahrain': '🇧🇭',
  'bangladesh': '🇧🇩',
  'belarus': '🇧🇾',
  'belgium': '🇧🇪',
  'belize': '🇧🇿',
  'benin': '🇧🇯',
  'bhutan': '🇧🇹',
  'bolivia': '🇧🇴',
  'bosnia': '🇧🇦',
  'botswana': '🇧🇼',
  'brazil': '🇧🇷',
  'brunei': '🇧🇳',
  'bulgaria': '🇧🇬',
  'burkina-faso': '🇧🇫',
  'burundi': '🇧🇮',
  'cambodia': '🇰🇭',
  'cameroon': '🇨🇲',
  'canada': '🇨🇦',
  'cape-verde': '🇨🇻',
  'chad': '🇹🇩',
  'chile': '🇨🇱',
  'china': '🇨🇳',
  'colombia': '🇨🇴',
  'comoros': '🇰🇲',
  'congo': '🇨🇬',
  'costa-rica': '🇨🇷',
  'croatia': '🇭🇷',
  'cuba': '🇨🇺',
  'cyprus': '🇨🇾',
  'czech-republic': '🇨🇿',
  'denmark': '🇩🇰',
  'djibouti': '🇩🇯',
  'dominican-republic': '🇩🇴',
  'ecuador': '🇪🇨',
  'egypt': '🇪🇬',
  'el-salvador': '🇸🇻',
  'estonia': '🇪🇪',
  'eswatini': '🇸🇿',
  'ethiopia': '🇪🇹',
  'fiji': '🇫🇯',
  'finland': '🇫🇮',
  'france': '🇫🇷',
  'gabon': '🇬🇦',
  'gambia': '🇬🇲',
  'georgia': '🇬🇪',
  'germany': '🇩🇪',
  'ghana': '🇬🇭',
  'greece': '🇬🇷',
  'guatemala': '🇬🇹',
  'guinea': '🇬🇳',
  'guyana': '🇬🇾',
  'haiti': '🇭🇹',
  'honduras': '🇭🇳',
  'hungary': '🇭🇺',
  'iceland': '🇮🇸',
  'india': '🇮🇳',
  'indonesia': '🇮🇩',
  'iran': '🇮🇷',
  'iraq': '🇮🇶',
  'ireland': '🇮🇪',
  'israel': '🇮🇱',
  'italy': '🇮🇹',
  'ivory-coast': '🇨🇮',
  'jamaica': '🇯🇲',
  'japan': '🇯🇵',
  'jordan': '🇯🇴',
  'kazakhstan': '🇰🇿',
  'kenya': '🇰🇪',
  'kuwait': '🇰🇼',
  'kyrgyzstan': '🇰🇬',
  'laos': '🇱🇦',
  'latvia': '🇱🇻',
  'lebanon': '🇱🇧',
  'lesotho': '🇱🇸',
  'liberia': '🇱🇷',
  'libya': '🇱🇾',
  'lithuania': '🇱🇹',
  'luxembourg': '🇱🇺',
  'madagascar': '🇲🇬',
  'malawi': '🇲🇼',
  'malaysia': '🇲🇾',
  'maldives': '🇲🇻',
  'mali': '🇲🇱',
  'malta': '🇲🇹',
  'mauritania': '🇲🇷',
  'mauritius': '🇲🇺',
  'mexico': '🇲🇽',
  'moldova': '🇲🇩',
  'monaco': '🇲🇨',
  'mongolia': '🇲🇳',
  'montenegro': '🇲🇪',
  'morocco': '🇲🇦',
  'mozambique': '🇲🇿',
  'myanmar': '🇲🇲',
  'namibia': '🇳🇦',
  'nepal': '🇳🇵',
  'netherlands': '🇳🇱',
  'new-zealand': '🇳🇿',
  'nicaragua': '🇳🇮',
  'niger': '🇳🇪',
  'nigeria': '🇳🇬',
  'north-korea': '🇰🇵',
  'north-macedonia': '🇲🇰',
  'norway': '🇳🇴',
  'oman': '🇴🇲',
  'pakistan': '🇵🇰',
  'panama': '🇵🇦',
  'papua-new-guinea': '🇵🇬',
  'paraguay': '🇵🇾',
  'peru': '🇵🇪',
  'philippines': '🇵🇭',
  'poland': '🇵🇱',
  'portugal': '🇵🇹',
  'qatar': '🇶🇦',
  'romania': '🇷🇴',
  'russia': '🇷🇺',
  'rwanda': '🇷🇼',
  'samoa': '🇼🇸',
  'san-marino': '🇸🇲',
  'saudi-arabia': '🇸🇦',
  'senegal': '🇸🇳',
  'serbia': '🇷🇸',
  'seychelles': '🇸🇨',
  'sierra-leone': '🇸🇱',
  'singapore': '🇸🇬',
  'slovakia': '🇸🇰',
  'slovenia': '🇸🇮',
  'solomon-islands': '🇸🇧',
  'somalia': '🇸🇴',
  'south-africa': '🇿🇦',
  'south-korea': '🇰🇷',
  'south-sudan': '🇸🇸',
  'spain': '🇪🇸',
  'sri-lanka': '🇱🇰',
  'sudan': '🇸🇩',
  'suriname': '🇸🇷',
  'sweden': '🇸🇪',
  'switzerland': '🇨🇭',
  'syria': '🇸🇾',
  'taiwan': '🇹🇼',
  'tajikistan': '🇹🇯',
  'tanzania': '🇹🇿',
  'thailand': '🇹🇭',
  'timor-leste': '🇹🇱',
  'togo': '🇹🇬',
  'tonga': '🇹🇴',
  'trinidad-tobago': '🇹🇹',
  'tunisia': '🇹🇳',
  'turkey': '🇹🇷',
  'turkmenistan': '🇹🇲',
  'uganda': '🇺🇬',
  'ukraine': '🇺🇦',
  'uae': '🇦🇪',
  'uk': '🇬🇧',
  'usa': '🇺🇸',
  'uruguay': '🇺🇾',
  'uzbekistan': '🇺🇿',
  'vanuatu': '🇻🇺',
  'vatican': '🇻🇦',
  'venezuela': '🇻🇪',
  'vietnam': '🇻🇳',
  'yemen': '🇾🇪',
  'zambia': '🇿🇲',
  'zimbabwe': '🇿🇼'
};

// Helper function to capitalize first letter of each word
const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// 🚀 Full country names mapping
const FULL_COUNTRY_NAMES: Record<string, string> = {
  'afghanistan': 'Afghanistan',
  'albania': 'Albania',
  'algeria': 'Algeria',
  'andorra': 'Andorra',
  'angola': 'Angola',
  'argentina': 'Argentina',
  'armenia': 'Armenia',
  'australia': 'Australia',
  'austria': 'Austria',
  'azerbaijan': 'Azerbaijan',
  'bahrain': 'Bahrain',
  'bangladesh': 'Bangladesh',
  'belarus': 'Belarus',
  'belgium': 'Belgium',
  'belize': 'Belize',
  'benin': 'Benin',
  'bhutan': 'Bhutan',
  'bolivia': 'Bolivia',
  'bosnia': 'Bosnia and Herzegovina',
  'botswana': 'Botswana',
  'brazil': 'Brazil',
  'brunei': 'Brunei Darussalam',
  'bulgaria': 'Bulgaria',
  'burkina-faso': 'Burkina Faso',
  'burundi': 'Burundi',
  'cambodia': 'Cambodia',
  'cameroon': 'Cameroon',
  'canada': 'Canada',
  'cape-verde': 'Cape Verde',
  'chad': 'Chad',
  'chile': 'Chile',
  'china': 'China',
  'colombia': 'Colombia',
  'comoros': 'Comoros',
  'congo': 'Congo',
  'costa-rica': 'Costa Rica',
  'croatia': 'Croatia',
  'cuba': 'Cuba',
  'cyprus': 'Cyprus',
  'czech-republic': 'Czech Republic',
  'denmark': 'Denmark',
  'djibouti': 'Djibouti',
  'dominican-republic': 'Dominican Republic',
  'ecuador': 'Ecuador',
  'egypt': 'Egypt',
  'el-salvador': 'El Salvador',
  'estonia': 'Estonia',
  'eswatini': 'Eswatini',
  'ethiopia': 'Ethiopia',
  'fiji': 'Fiji',
  'finland': 'Finland',
  'france': 'France',
  'gabon': 'Gabon',
  'gambia': 'Gambia',
  'georgia': 'Georgia',
  'germany': 'Germany',
  'ghana': 'Ghana',
  'greece': 'Greece',
  'guatemala': 'Guatemala',
  'guinea': 'Guinea',
  'guyana': 'Guyana',
  'haiti': 'Haiti',
  'honduras': 'Honduras',
  'hungary': 'Hungary',
  'iceland': 'Iceland',
  'india': 'India',
  'indonesia': 'Indonesia',
  'iran': 'Iran',
  'iraq': 'Iraq',
  'ireland': 'Ireland',
  'israel': 'Israel',
  'italy': 'Italy',
  'ivory-coast': 'Ivory Coast',
  'jamaica': 'Jamaica',
  'japan': 'Japan',
  'jordan': 'Jordan',
  'kazakhstan': 'Kazakhstan',
  'kenya': 'Kenya',
  'kuwait': 'Kuwait',
  'kyrgyzstan': 'Kyrgyzstan',
  'laos': 'Laos',
  'latvia': 'Latvia',
  'lebanon': 'Lebanon',
  'lesotho': 'Lesotho',
  'liberia': 'Liberia',
  'libya': 'Libya',
  'lithuania': 'Lithuania',
  'luxembourg': 'Luxembourg',
  'madagascar': 'Madagascar',
  'malawi': 'Malawi',
  'malaysia': 'Malaysia',
  'maldives': 'Maldives',
  'mali': 'Mali',
  'malta': 'Malta',
  'mauritania': 'Mauritania',
  'mauritius': 'Mauritius',
  'mexico': 'Mexico',
  'moldova': 'Moldova',
  'monaco': 'Monaco',
  'mongolia': 'Mongolia',
  'montenegro': 'Montenegro',
  'morocco': 'Morocco',
  'mozambique': 'Mozambique',
  'myanmar': 'Myanmar',
  'namibia': 'Namibia',
  'nepal': 'Nepal',
  'netherlands': 'Netherlands',
  'new-zealand': 'New Zealand',
  'nicaragua': 'Nicaragua',
  'niger': 'Niger',
  'nigeria': 'Nigeria',
  'north-korea': 'North Korea',
  'north-macedonia': 'North Macedonia',
  'norway': 'Norway',
  'oman': 'Oman',
  'pakistan': 'Pakistan',
  'panama': 'Panama',
  'papua-new-guinea': 'Papua New Guinea',
  'paraguay': 'Paraguay',
  'peru': 'Peru',
  'philippines': 'Philippines',
  'poland': 'Poland',
  'portugal': 'Portugal',
  'qatar': 'Qatar',
  'romania': 'Romania',
  'russia': 'Russia',
  'rwanda': 'Rwanda',
  'samoa': 'Samoa',
  'san-marino': 'San Marino',
  'saudi-arabia': 'Saudi Arabia',
  'senegal': 'Senegal',
  'serbia': 'Serbia',
  'seychelles': 'Seychelles',
  'sierra-leone': 'Sierra Leone',
  'singapore': 'Singapore',
  'slovakia': 'Slovakia',
  'slovenia': 'Slovenia',
  'solomon-islands': 'Solomon Islands',
  'somalia': 'Somalia',
  'south-africa': 'South Africa',
  'south-korea': 'South Korea',
  'south-sudan': 'South Sudan',
  'spain': 'Spain',
  'sri-lanka': 'Sri Lanka',
  'sudan': 'Sudan',
  'suriname': 'Suriname',
  'sweden': 'Sweden',
  'switzerland': 'Switzerland',
  'syria': 'Syria',
  'taiwan': 'Taiwan',
  'tajikistan': 'Tajikistan',
  'tanzania': 'Tanzania',
  'thailand': 'Thailand',
  'timor-leste': 'Timor-Leste',
  'togo': 'Togo',
  'tonga': 'Tonga',
  'trinidad-tobago': 'Trinidad and Tobago',
  'tunisia': 'Tunisia',
  'turkey': 'Turkey',
  'turkmenistan': 'Turkmenistan',
  'uganda': 'Uganda',
  'ukraine': 'Ukraine',
  'uae': 'United Arab Emirates',
  'uk': 'United Kingdom',
  'usa': 'United States',
  'uruguay': 'Uruguay',
  'uzbekistan': 'Uzbekistan',
  'vanuatu': 'Vanuatu',
  'vatican': 'Vatican City',
  'venezuela': 'Venezuela',
  'vietnam': 'Vietnam',
  'yemen': 'Yemen',
  'zambia': 'Zambia',
  'zimbabwe': 'Zimbabwe'
};

// Helper function to get country display with flag
const getCountryDisplay = (countryKey: string) => {
  const fullName = FULL_COUNTRY_NAMES[countryKey] || capitalizeWords(countryKey.replace(/-/g, ' '));
  return fullName;
};

// Helper function to get nationality display with flag
const getNationalityDisplay = (nationalityKey: string) => {
  const fullName = FULL_COUNTRY_NAMES[nationalityKey] || nationalityKey;
  return fullName;
};

export interface ValidationData {
  country: string;
  visaCategory: string;
  visaType: string;
  personalInfo: {
    applicantName: string;
    passportNumber: string;
    dateOfBirth: string;
    nationality: string;
    travelDate: string;
    stayDuration: number;
  };
  uploadedFiles: Array<{
    originalName: string;
    mimetype: string;
    size: number;
    uploadedAt: string;
  }>;
  checkedDocuments: Record<string, boolean>;
}

export default function Validation() {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('validation_current_step');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [validationResults, setValidationResults] = useState<any>(() => {
    const saved = localStorage.getItem('validation_results');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved validation results:', e);
      }
    }
    return null;
  });
  const [sessionId, setSessionId] = useState(() => {
    const saved = localStorage.getItem('validation_session_id');
    return saved || "";
  });
  const [isValidating, setIsValidating] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(() => {
    const savedSessionId = localStorage.getItem('validation_session_id');
    if (savedSessionId) {
      const saved = localStorage.getItem(`validation_payment_status_${savedSessionId}`);
      return saved || "pending";
    }
    return "pending";
  });
  

  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Update payment status when session changes
  useEffect(() => {
    if (sessionId) {
      const saved = localStorage.getItem(`validation_payment_status_${sessionId}`);
      setPaymentStatus(saved || "pending");
    }
  }, [sessionId]);

  // Debug payment modal state
  useEffect(() => {
    console.log("Payment modal state changed:", {
      showPaymentModal,
      sessionId,
      currentStep,
      hasValidationResults: !!validationResults,
      paymentStatus
    });
  }, [showPaymentModal, sessionId, currentStep, validationResults, paymentStatus]);
  const [validationData, setValidationData] = useState<ValidationData>(() => {
    const saved = localStorage.getItem('validation_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved validation data:', e);
      }
    }
    return {
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
      },
      uploadedFiles: [],
      checkedDocuments: {},
    };
  });



  const updateValidationData = (updates: Partial<ValidationData>) => {
    setValidationData(prev => {
      const newData = { ...prev, ...updates };
      localStorage.setItem('validation_data', JSON.stringify(newData));
      return newData;
    });
  };

  const handleNext = () => {
    try {
      console.log(`Navigating from step ${currentStep} to step ${currentStep + 1}`);
      if (currentStep < 7) {
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
        localStorage.setItem('validation_current_step', newStep.toString());
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "Navigation Error",
        description: "Unable to proceed to next step. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      localStorage.setItem('validation_current_step', newStep.toString());
    }
  };

  const resetToStep1 = () => {
    // Clear payment status for current session
    if (sessionId) {
      localStorage.removeItem(`validation_payment_status_${sessionId}`);
    }
    
    setValidationData({
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
      },
      uploadedFiles: [],
      checkedDocuments: {},
    });
    setValidationResults(null);
    setSessionId("");
    setPaymentStatus("pending");
    localStorage.removeItem('validation_data');
    localStorage.removeItem('validation_results');
    localStorage.removeItem('validation_session_id');
    setCurrentStep(1);
    localStorage.setItem('validation_current_step', '1');
  };

  const handleStepClick = (targetStep: number) => {
    // Allow navigation to any step from 1 to 7
    if (targetStep >= 1 && targetStep <= 7) {
      setCurrentStep(targetStep);
      localStorage.setItem('validation_current_step', targetStep.toString());
      console.log(`Direct navigation to step ${targetStep}`);
    }
  };

  const handleValidate = async () => {
    setIsValidating(true);
    try {
      console.log('Attempting to create validation session with data:', validationData);
      console.log('Personal info specifically:', validationData.personalInfo);
      
      // Create validation session first
      const sessionResponse = await apiRequest("POST", "/api/create-validation-session", validationData);
      const sessionResult = await sessionResponse.json();
      setSessionId(sessionResult.sessionId);
      localStorage.setItem('validation_session_id', sessionResult.sessionId);
      
      console.log("Session created successfully:", sessionResult);
      
      console.log("Starting OpenAI validation for session:", sessionResult.sessionId);
      
      // Run OpenAI validation
      console.log("Making validation request to /api/validate with sessionId:", sessionResult.sessionId);
      const validationResponse = await apiRequest("POST", "/api/validate", { 
        sessionId: sessionResult.sessionId 
      });
      console.log("Validation response received:", validationResponse.status, validationResponse.statusText);
      
      // Check if response is actually JSON
      const contentType = validationResponse.headers.get("content-type");
      console.log("Validation response content-type:", contentType);
      
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await validationResponse.text();
        console.error("Expected JSON but got:", textResponse.substring(0, 200));
        throw new Error("Server returned non-JSON response");
      }
      
      const validationResult = await validationResponse.json();
      
      console.log("OpenAI validation completed:", validationResult);
      
      // Store validation results with persistence
      const results = validationResult.validationResults;
      setValidationResults(results);
      localStorage.setItem('validation_results', JSON.stringify(results));
      
      // Update step and persist to localStorage
      setCurrentStep(6);
      localStorage.setItem('validation_current_step', '6');
      console.log("Navigating to step 6 - Results display");
      console.log("Validation results set and persisted:", results);
      
      toast({
        title: "Validation Complete",
        description: "Document analysis completed using AI technology",
      });
    } catch (error: any) {
      console.error("Validation error:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        cause: error.cause
      });
      toast({
        title: "Validation Failed",
        description: error.message || "Failed to validate documents. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePayment = async () => {
    console.log("Payment button clicked, sessionId:", sessionId);
    console.log("Validation data:", validationData);
    
    // If no session ID exists, create one for existing validation results
    if (!sessionId && validationResults) {
      try {
        console.log("Creating new session for existing validation results");
        const sessionResponse = await apiRequest("POST", "/api/create-validation-session", validationData);
        const sessionResult = await sessionResponse.json();
        setSessionId(sessionResult.sessionId);
        localStorage.setItem('validation_session_id', sessionResult.sessionId);
        console.log("New session created for payment:", sessionResult.sessionId);
      } catch (error) {
        console.error("Failed to create session for payment:", error);
        toast({
          title: "Error",
          description: "Unable to prepare payment. Please try validating again.",
          variant: "destructive",
        });
        return;
      }
    } else if (!sessionId) {
      toast({
        title: "Error",
        description: "No validation session found. Please complete validation first.",
        variant: "destructive",
      });
      return;
    }
    
    setShowPaymentModal(true);
  };

  const downloadValidationReport = async () => {
    if (!sessionId || !validationResults) return;
    
    try {
      // Use the new PDFKit endpoint for better PDF generation
      const response = await apiRequest("POST", `/api/generate-pdf`, {
        type: 'validation-report',
        data: {
          validationResults,
          personalInfo: validationData.personalInfo,
          country: validationData.country,
          visaType: validationData.visaType,
          nationality: validationData.personalInfo.nationality,
          uploadedDocuments: validationData.uploadedFiles || []
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to download professional report');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `visa-validation-report-${validationData.country}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: t("reportDownloaded"),
        description: t("reportDownloadDesc"),
      });
    } catch (error) {
      console.error("Error downloading report:", error);
      toast({
        title: t("downloadFailed"),
        description: t("downloadFailedDesc"),
        variant: "destructive",
      });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return validationData.country && validationData.visaType;
      case 2:
        return true; // Required documents review step
      case 3:
        // Allow proceeding if user has uploaded files OR checked documents (but warn them)
        return validationData.uploadedFiles.length > 0 || 
               (validationData.checkedDocuments && Object.values(validationData.checkedDocuments).some(checked => checked));
      case 4:
        return (
          validationData.personalInfo.applicantName &&
          validationData.personalInfo.passportNumber &&
          validationData.personalInfo.dateOfBirth &&
          validationData.personalInfo.travelDate &&
          validationData.personalInfo.stayDuration > 0
        );
      case 5:
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 🚀 Enterprise Header 2.0 */}
      <header className="glass border-b border-[var(--visa-border)]">
        <div className="container-premium">
          <div className="flex justify-between items-center h-16 py-3">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <button className="btn-secondary flex items-center space-x-2 px-4 py-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              </Link>
              <img src={horizontalLogo} alt="Visa Validator" className="h-10 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--visa-primary-light)] border border-[var(--visa-primary)]">
                <div className="w-1.5 h-1.5 bg-[var(--visa-primary)] rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-[var(--visa-primary-dark)]">Step {currentStep} of 7</span>
              </div>
              <button
                className="btn-secondary flex items-center space-x-2 px-4 py-2"
                onClick={() => {
                  localStorage.removeItem('validation_data');
                  localStorage.removeItem('validation_current_step');
                  localStorage.removeItem('validation_session_id');
                  localStorage.removeItem('validation_results');
                  Object.keys(localStorage).forEach(key => {
                    if (key.startsWith('validation_payment_status_')) {
                      localStorage.removeItem(key);
                    }
                  });
                  window.location.reload();
                }}
              >
                <span>Start Over</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        onStepClick={handleStepClick}
        validationData={validationData}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentStep === 1 && (
          <CountrySelection
            data={validationData}
            onUpdate={updateValidationData}
            onNext={handleNext}
            canProceed={!!canProceed()}
          />
        )}

        {currentStep === 2 && (
          <RequiredDocumentsDisplay
            data={validationData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

        {currentStep === 3 && (
          <FileUpload
            data={validationData}
            onUpdate={updateValidationData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={!!canProceed()}
          />
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <PersonalInfoForm
              data={validationData}
              onUpdate={updateValidationData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              canProceed={!!canProceed()}
            />
            
            {/* Show visa requirements after personal info is filled */}
            {validationData.personalInfo.nationality && (
              <VisaRequirementsDisplay data={validationData} />
            )}
          </div>
        )}

        {currentStep === 5 && (
          <Card className="bg-white rounded-xl shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Review Your Information</h3>
              
              <div className="space-y-6">
                {/* Destination Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Destination & Visa Type</h4>
                  <p className="text-blue-800 flex items-center gap-2">
                    <span>Country:</span>
                    <span className="flex items-center gap-1">
                      <FlagIconReal country={validationData.country} size="sm" />
                      <span>{getCountryDisplay(validationData.country)}</span>
                    </span>
                    <span className="mx-2">•</span>
                    <span>Visa Type: {validationData.visaType}</span>
                  </p>
                </div>

                {/* Documents Summary */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Uploaded Documents</h4>
                  <p className="text-green-800">
                    {validationData.uploadedFiles.length} Document{validationData.uploadedFiles.length !== 1 ? 's' : ''} Uploaded
                  </p>
                  <ul className="text-sm text-green-700 mt-2">
                    {validationData.uploadedFiles.map((file, index) => (
                      <li key={index}>• {file.originalName}</li>
                    ))}
                  </ul>
                </div>

                {/* Personal Info Summary */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Personal Information</h4>
                  <div className="text-purple-800 text-sm space-y-1">
                    <p>Name: {validationData.personalInfo.applicantName}</p>
                    <p>Passport: {validationData.personalInfo.passportNumber}</p>
                    <p className="flex items-center gap-1">
                    <span>Nationality:</span>
                    <span className="flex items-center gap-1">
                      <FlagIconReal country={validationData.personalInfo.nationality} size="sm" />
                      <span>{getNationalityDisplay(validationData.personalInfo.nationality)}</span>
                    </span>
                  </p>
                    <p>Travel Date: {validationData.personalInfo.travelDate}</p>
                    <p>Duration: {validationData.personalInfo.stayDuration} days</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="font-semibold text-yellow-900 mb-3">What happens next:</h4>
                  <ol className="list-decimal list-inside text-yellow-800 space-y-2">
                    <li>Our AI analyzes your uploaded documents using OCR technology</li>
                    <li>We cross-reference against current embassy requirements</li>
                    <li>You'll see a preview of validation results before payment</li>
                    <li>Complete payment to receive the full detailed report</li>
                  </ol>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <Button type="button" variant="outline" onClick={handlePrevious} className="flex-1">
                  Previous
                </Button>
                <ButtonLoading
                  loading={isValidating}
                  onClick={handleValidate}
                  disabled={isValidating}
                  className="flex-1"
                  size="lg"
                >
                  Start Validation
                </ButtonLoading>
              </div>
            </CardContent>
          </Card>
        )}



        {currentStep === 6 && validationResults && (
          <div className="space-y-6">
            {/* Visa Requirements Display */}
            <VisaRequirementsDisplay data={validationData} />
            
            {/* Validation Results Preview */}
            <Card className="bg-white rounded-xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Validation Results Preview</h3>
                
                {/* Score Overview */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">
                      {validationResults.score}%
                    </div>
                    <p className="text-gray-600">Preliminary Validation Score</p>
                  </div>
                </div>

                {/* Quick Summary */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-900 mb-2">✓ Documents Found</h4>
                    <p className="text-emerald-800 text-sm">{validationResults.verified.length} items verified</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-2">⚠ Issues Detected</h4>
                    <p className="text-red-800 text-sm">{validationResults.issues.length} items need attention</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Complete Payment for Full Report</h4>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• Detailed analysis of each document</li>
                    <li>• Specific recommendations for missing items</li>
                    <li>• Embassy-specific requirements checklist</li>
                    <li>• Downloadable PDF report</li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900">Full Validation Report</h4>
                    <p className="text-sm text-slate-600">Complete analysis and recommendations</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-700">$9.99</div>
                    <div className="text-sm text-slate-600">One-time fee</div>
                  </div>
                </div>
                
                {paymentStatus === "completed" ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-green-800 mb-2">Payment Successful!</h4>
                      <p className="text-green-700 text-sm">Your professional validation report is now ready for download.</p>
                    </div>
                    
                    <ButtonLoading
                      loading={false}
                      onClick={downloadValidationReport}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Complete Report
                    </ButtonLoading>
                    
                    <div className="flex space-x-4">
                      <Button type="button" variant="outline" onClick={handlePrevious} className="flex-1">
                        Back to Review
                      </Button>
                      <Button type="button" onClick={() => {
                        setCurrentStep(7);
                        localStorage.setItem('validation_current_step', '7');
                      }} className="flex-1 bg-blue-700 hover:bg-blue-800">
                        View Summary
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <Button type="button" variant="outline" onClick={handlePrevious} className="flex-1">
                        Back to Review
                      </Button>
                      <ButtonLoading
                        loading={false}
                        onClick={handlePayment}
                        className="flex-1 bg-blue-700 hover:bg-blue-800"
                        size="lg"
                      >
                        Pay & Get Full Report
                      </ButtonLoading>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center">
                      Secure payment powered by Stripe. Full report available immediately after payment.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 7 && (
          <Card className="bg-white rounded-xl shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Validation Complete!</h3>
              <p className="text-gray-600 mb-6">
                Your documents have been successfully validated. You can now download your comprehensive report.
              </p>
              
              <div className="space-y-4">
                <Button 
                  type="button"
                  onClick={downloadValidationReport} 
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Download Complete Report
                </Button>
                
                <div className="flex space-x-4">
                  <Button type="button" variant="outline" onClick={resetToStep1} className="flex-1">
                    Validate Another Destination
                  </Button>
                  <Button type="button" variant="outline" onClick={() => window.location.href = "/"} className="flex-1">
                    Return to Home
                  </Button>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-6">
                Thank you for using our visa document validation service. Keep your report for your visa application.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Loading Overlay for Validation */}
      {isValidating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 loading-enterprise">
            <div className="text-center">
              <LoadingSpinner
                size="lg"
                text="Analyzing Your Documents..."
                className="mb-4"
              />
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Scanning document content</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Cross-referencing visa requirements</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Generating validation report</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">This usually takes 10-30 seconds</p>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && sessionId && (
        <PaymentModal
          data={validationData}
          sessionId={sessionId}
          onClose={() => {
            console.log("Closing payment modal");
            setShowPaymentModal(false);
          }}
          onPaymentSuccess={() => {
            console.log("Payment successful, updating status");
            setPaymentStatus("completed");
            localStorage.setItem(`validation_payment_status_${sessionId}`, 'completed');
            setShowPaymentModal(false);
          }}
        />
      )}
      
      {/* Debug info for payment modal */}
      {showPaymentModal && !sessionId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Payment Error</h3>
            <p className="text-gray-700 mb-4">No validation session found. Please validate your documents first.</p>
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}


    </div>
  );
}
