import { useLanguage } from "@/lib/i18n";

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  validationData?: any; // Add validation data prop
}

export default function StepIndicator({ currentStep, onStepClick, validationData }: StepIndicatorProps) {
  const { t } = useLanguage();

  // Check if a step is accessible (completed or current)
  const isStepAccessible = (stepNumber: number) => {
    return stepNumber <= currentStep;
  };

  // Check if step is completed
  const isStepCompleted = (stepNumber: number) => {
    if (stepNumber >= currentStep) return false;

    switch (stepNumber) {
      case 1:
        return !!(validationData?.country && validationData?.visaType);
      case 2:
        return true; // Requirements review is always accessible after step 1
      case 3:
        return !!(validationData?.uploadedFiles?.length > 0 ||
                 Object.values(validationData?.checkedDocuments || {}).some(checked => checked));
      case 4:
        return !!(validationData?.personalInfo?.applicantName &&
                 validationData?.personalInfo?.passportNumber &&
                 validationData?.personalInfo?.dateOfBirth &&
                 validationData?.personalInfo?.travelDate &&
                 validationData?.personalInfo?.stayDuration > 0);
      case 5:
        return true; // Review step is always accessible after step 4
      default:
        return false;
    }
  };
  
  const steps = [
    { number: 1, label: t('stepDestination') || 'Destination' },
    { number: 2, label: t('stepRequirements') || 'Requirements' },
    { number: 3, label: t('stepUpload') || 'Upload' },
    { number: 4, label: t('stepInformation') || 'Information' },
    { number: 5, label: t('stepReview') || 'Review' },
    { number: 6, label: t('stepPayment') || 'Payment' },
  ];

  return (
    <div className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => isStepAccessible(step.number) && onStepClick(step.number)}
                  disabled={!isStepAccessible(step.number)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isStepCompleted(step.number)
                      ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                      : step.number === currentStep
                      ? "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  title={
                    isStepAccessible(step.number)
                      ? `Go to ${step.label}`
                      : step.number > currentStep
                      ? `Complete previous steps first`
                      : `Current step: ${step.label}`
                  }
                >
                  {isStepCompleted(step.number) ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </button>
                <span
                  className={`font-medium ${
                    isStepCompleted(step.number)
                      ? "text-green-600"
                      : step.number === currentStep
                      ? "text-blue-700"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    step.number < currentStep ? "bg-blue-700" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
