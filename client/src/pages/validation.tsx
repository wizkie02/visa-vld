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
import LanguageSelectionModal from "@/components/language-selection-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n";
import { apiRequest } from "@/lib/queryClient";

export interface ValidationData {
  country: string;
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
    const saved = localStorage.getItem('validation_payment_status');
    return saved || "pending";
  });
  
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Debug payment modal state
  useEffect(() => {
    console.log("Payment modal state changed:", {
      showPaymentModal,
      sessionId,
      currentStep,
      hasValidationResults: !!validationResults
    });
  }, [showPaymentModal, sessionId, currentStep, validationResults]);
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

  // Check if language has been selected before
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (!savedLanguage) {
      setShowLanguageModal(true);
    }
  }, []);

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
    setValidationData({
      country: "",
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
    if (!sessionId) return;
    
    try {
      // Use apiRequest to ensure proper authentication headers
      const response = await apiRequest("GET", `/api/validation-report/${sessionId}/download`);
      
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
        return validationData.personalInfo.nationality;
      case 3:
        return true; // Required documents review step
      case 4:
        return validationData.uploadedFiles.length > 0;
      case 5:
        return (
          validationData.personalInfo.applicantName &&
          validationData.personalInfo.passportNumber &&
          validationData.personalInfo.dateOfBirth &&
          validationData.personalInfo.nationality &&
          validationData.personalInfo.travelDate &&
          validationData.personalInfo.stayDuration > 0
        );
      case 6:
        return true;
      case 7:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                  <Ticket className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">VisaValidator Pro</h1>
                  <p className="text-xs text-slate-600">Document Validation Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} />

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
          <NationalitySelection
            data={validationData}
            onUpdate={updateValidationData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={!!canProceed()}
          />
        )}

        {currentStep === 3 && (
          <RequiredDocumentsDisplay
            data={validationData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

        {currentStep === 4 && (
          <FileUpload
            data={validationData}
            onUpdate={updateValidationData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={!!canProceed()}
          />
        )}

        {currentStep === 5 && (
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

        {currentStep === 6 && (
          <Card className="bg-white rounded-xl shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Review Your Information</h3>
              
              <div className="space-y-6">
                {/* Destination Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Destination & Visa Type</h4>
                  <p className="text-blue-800">
                    Country: {validationData.country} • Visa Type: {validationData.visaType}
                  </p>
                </div>

                {/* Documents Summary */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Uploaded Documents</h4>
                  <p className="text-green-800">
                    {validationData.uploadedFiles.length} document(s) uploaded
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
                    <p>Nationality: {validationData.personalInfo.nationality}</p>
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
                <Button 
                  type="button"
                  onClick={handleValidate} 
                  disabled={isValidating}
                  className="flex-1 bg-blue-700 hover:bg-blue-800"
                >
                  {isValidating ? "Analyzing Documents..." : "Start Validation"}
                </Button>
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
                    
                    <Button 
                      type="button"
                      onClick={downloadValidationReport} 
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Complete Report
                    </Button>
                    
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
                      <Button type="button" onClick={handlePayment} className="flex-1 bg-blue-700 hover:bg-blue-800">
                        Pay & Get Full Report
                      </Button>
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
            localStorage.setItem('validation_payment_status', 'completed');
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

      {/* Language Selection Modal */}
      <LanguageSelectionModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </div>
  );
}
