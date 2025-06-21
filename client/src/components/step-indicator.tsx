import { useLanguage } from "@/lib/i18n";

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  const { t } = useLanguage();
  
  const steps = [
    { number: 1, label: 'Destination' },
    { number: 2, label: 'Requirements' },
    { number: 3, label: 'Upload Documents' },
    { number: 4, label: 'Personal Information' },
    { number: 5, label: 'Review' },
    { number: 6, label: 'Payment' },
  ];

  return (
    <div className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onStepClick(step.number)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    step.number <= currentStep
                      ? "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer"
                  }`}
                  title={`Go to ${step.label}`}
                >
                  {step.number}
                </button>
                <span
                  className={`font-medium ${
                    step.number <= currentStep ? "text-blue-700" : "text-gray-400"
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
