import { useState, useEffect } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import LoadingSpinner from "@/components/loading-spinner";

interface AIProcessStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "active" | "complete";
}

interface AIProcessIndicatorProps {
  currentStep?: number;
  totalSteps?: number;
  steps?: AIProcessStep[];
  showTimeEstimate?: boolean;
  estimatedTime?: number; // in seconds
}

export default function AIProcessIndicator({
  currentStep = 0,
  totalSteps = 3,
  steps,
  showTimeEstimate = true,
  estimatedTime = 30
}: AIProcessIndicatorProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (currentStep > 0 && currentStep < totalSteps) {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep, totalSteps]);

  const defaultSteps: AIProcessStep[] = [
    {
      id: "retrieve",
      title: "🔍 RETRIEVE - Travel Buddy API",
      description: "Fetching official visa requirements from government sources",
      status: currentStep > 0 ? "complete" : currentStep === 0 ? "active" : "pending"
    },
    {
      id: "augment",
      title: "🧠 AUGMENT - Building Context",
      description: "Combining verified data with your documents",
      status: currentStep > 1 ? "complete" : currentStep === 1 ? "active" : "pending"
    },
    {
      id: "generate",
      title: "✨ GENERATE - GPT-4o-mini Analysis",
      description: "Creating detailed validation report",
      status: currentStep > 2 ? "complete" : currentStep === 2 ? "active" : "pending"
    }
  ];

  const displaySteps = steps || defaultSteps;
  const progress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
  const remainingTime = Math.max(0, estimatedTime - elapsedTime);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center loading-pulse-soft">
            <LoadingSpinner size="sm" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">RAG AI Processing</h3>
            <p className="text-sm text-gray-600">Retrieval-Augmented Generation</p>
          </div>
        </div>
        
        {showTimeEstimate && (
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              {remainingTime}s remaining
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span className="font-semibold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          >
            <div className="w-full h-full bg-white opacity-30 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {displaySteps.map((step, index) => (
          <div 
            key={step.id}
            className={`relative pl-8 pb-4 border-l-2 transition-all duration-300 ${
              step.status === "complete" 
                ? "border-green-500" 
                : step.status === "active"
                ? "border-blue-500"
                : "border-gray-300"
            } ${index === displaySteps.length - 1 ? "border-l-0" : ""}`}
          >
            {/* Status Icon */}
            <div className={`absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              step.status === "complete"
                ? "bg-green-500"
                : step.status === "active"
                ? "bg-blue-500 animate-pulse"
                : "bg-gray-300"
            }`}>
              {step.status === "complete" ? (
                <CheckCircle2 className="w-4 h-4 text-white" />
              ) : step.status === "active" ? (
                <LoadingSpinner size="sm" />
              ) : (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className={`transition-opacity duration-300 ${
              step.status === "pending" ? "opacity-50" : "opacity-100"
            }`}>
              <h4 className={`text-sm font-semibold mb-1 ${
                step.status === "complete"
                  ? "text-green-700"
                  : step.status === "active"
                  ? "text-blue-700"
                  : "text-gray-600"
              }`}>
                {step.title}
              </h4>
              <p className="text-xs text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>AI-powered by Travel Buddy API + GPT-4o-mini</span>
          </div>
          <span>99% accuracy from government sources</span>
        </div>
      </div>
    </div>
  );
}
