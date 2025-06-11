import { useState } from "react";
import { Link } from "wouter";
import { Ticket, ArrowLeft } from "lucide-react";
import StepIndicator from "@/components/step-indicator";
import CountrySelection from "@/components/country-selection";
import FileUpload from "@/components/file-upload";
import PersonalInfoForm from "@/components/personal-info-form";
import PaymentModal from "@/components/payment-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
}

export default function Validation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [validationData, setValidationData] = useState<ValidationData>({
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
  });

  const updateValidationData = (updates: Partial<ValidationData>) => {
    setValidationData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleValidate = () => {
    setShowPaymentModal(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return validationData.country && validationData.visaType;
      case 2:
        return validationData.uploadedFiles.length > 0;
      case 3:
        return (
          validationData.personalInfo.applicantName &&
          validationData.personalInfo.passportNumber &&
          validationData.personalInfo.dateOfBirth &&
          validationData.personalInfo.nationality &&
          validationData.personalInfo.travelDate &&
          validationData.personalInfo.stayDuration > 0
        );
      case 4:
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
      <StepIndicator currentStep={currentStep} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentStep === 1 && (
          <CountrySelection
            data={validationData}
            onUpdate={updateValidationData}
            onNext={handleNext}
            canProceed={canProceed()}
          />
        )}

        {currentStep === 2 && (
          <FileUpload
            data={validationData}
            onUpdate={updateValidationData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
          />
        )}

        {currentStep === 3 && (
          <PersonalInfoForm
            data={validationData}
            onUpdate={updateValidationData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
          />
        )}

        {currentStep === 4 && (
          <Card className="bg-white rounded-xl shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Ready to Validate</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">What happens next:</h4>
                <ol className="list-decimal list-inside text-blue-800 space-y-2">
                  <li>Our AI analyzes your uploaded documents using OCR technology</li>
                  <li>We cross-reference against current embassy requirements</li>
                  <li>You'll receive a detailed validation report with recommendations</li>
                  <li>All files are automatically deleted after processing for privacy</li>
                </ol>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900">Validation Service</h4>
                  <p className="text-sm text-slate-600">Complete document analysis and report</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-700">$9.99</div>
                  <div className="text-sm text-slate-600">One-time fee</div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button variant="outline" onClick={handlePrevious} className="flex-1">
                  Previous
                </Button>
                <Button onClick={handleValidate} className="flex-1 bg-blue-700 hover:bg-blue-800">
                  Validate My Documents
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Secure payment powered by Stripe. Your documents will be processed immediately after payment.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          data={validationData}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
