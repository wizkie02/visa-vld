import { AlertCircle, CheckCircle2, ArrowRight, Lightbulb, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export interface Recommendation {
  id: string;
  type: "critical" | "important" | "optional" | "tip";
  title: string;
  description: string;
  action?: string;
  impact?: string;
  completed?: boolean;
}

interface RecommendationsListProps {
  recommendations: Recommendation[];
  currentScore: number;
  potentialScore?: number;
  onComplete?: (id: string) => void;
  showImpact?: boolean;
}

export default function RecommendationsList({
  recommendations,
  currentScore,
  potentialScore,
  onComplete,
  showImpact = true
}: RecommendationsListProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedItems(newCompleted);
    if (onComplete) {
      onComplete(id);
    }
  };

  const getTypeConfig = (type: Recommendation["type"]) => {
    switch (type) {
      case "critical":
        return {
          icon: AlertCircle,
          color: "red",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-900",
          badgeColor: "bg-red-100 text-red-800",
          iconColor: "text-red-600"
        };
      case "important":
        return {
          icon: AlertCircle,
          color: "yellow",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-900",
          badgeColor: "bg-yellow-100 text-yellow-800",
          iconColor: "text-yellow-600"
        };
      case "optional":
        return {
          icon: TrendingUp,
          color: "blue",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-900",
          badgeColor: "bg-blue-100 text-blue-800",
          iconColor: "text-blue-600"
        };
      case "tip":
        return {
          icon: Lightbulb,
          color: "purple",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
          textColor: "text-purple-900",
          badgeColor: "bg-purple-100 text-purple-800",
          iconColor: "text-purple-600"
        };
    }
  };

  const criticalItems = recommendations.filter(r => r.type === "critical");
  const importantItems = recommendations.filter(r => r.type === "important");
  const optionalItems = recommendations.filter(r => r.type === "optional");
  const tipItems = recommendations.filter(r => r.type === "tip");

  const completionRate = Math.round((completedItems.size / recommendations.length) * 100);

  return (
    <div className="w-full space-y-6">
      {/* Header with Score Impact */}
      {showImpact && potentialScore && potentialScore > currentScore && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">💡 Unlock Your Potential</h3>
              <p className="text-sm text-blue-100">
                Complete these recommendations to boost your score
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold">{currentScore}%</div>
                <ArrowRight className="w-6 h-6" />
                <div className="text-3xl font-bold text-green-300">{potentialScore}%</div>
              </div>
              <p className="text-xs text-blue-100 mt-1">
                +{potentialScore - currentScore}% improvement
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-blue-100 mb-2">
              <span>Completion Progress</span>
              <span>{completionRate}%</span>
            </div>
            <div className="w-full h-2 bg-blue-800 bg-opacity-30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500 rounded-full"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Critical Issues */}
      {criticalItems.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-semibold text-gray-900">
              🚨 Critical Issues ({criticalItems.length})
            </h4>
            <span className="text-xs text-red-600 font-medium">Must Fix</span>
          </div>

          {criticalItems.map((item) => {
            const config = getTypeConfig(item.type);
            const Icon = config.icon;
            const isCompleted = completedItems.has(item.id);

            return (
              <div 
                key={item.id}
                className={`rounded-lg border-2 p-4 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-gray-50 border-gray-200 opacity-60' 
                    : `${config.bgColor} ${config.borderColor}`
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Icon className={`w-5 h-5 ${config.iconColor}`} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h5 className={`font-semibold ${isCompleted ? 'text-gray-600 line-through' : config.textColor}`}>
                        {item.title}
                      </h5>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.badgeColor}`}>
                        {item.type.toUpperCase()}
                      </span>
                    </div>

                    <p className={`text-sm mt-2 ${isCompleted ? 'text-gray-500' : 'text-gray-700'}`}>
                      {item.description}
                    </p>

                    {item.action && !isCompleted && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-gray-900 mb-1">✅ Action Required:</p>
                        <p className="text-xs text-gray-700">{item.action}</p>
                      </div>
                    )}

                    {item.impact && !isCompleted && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                        <TrendingUp className="w-3 h-3" />
                        <span>Impact: {item.impact}</span>
                      </div>
                    )}

                    <Button
                      variant={isCompleted ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleToggle(item.id)}
                      className="mt-3"
                    >
                      {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Important Items */}
      {importantItems.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-gray-900">
              ⚠️ Important Recommendations ({importantItems.length})
            </h4>
          </div>

          {importantItems.map((item) => {
            const config = getTypeConfig(item.type);
            const Icon = config.icon;
            const isCompleted = completedItems.has(item.id);

            return (
              <div 
                key={item.id}
                className={`rounded-lg border p-4 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-gray-50 border-gray-200 opacity-60' 
                    : `${config.bgColor} ${config.borderColor}`
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Icon className={`w-5 h-5 ${config.iconColor}`} />
                    )}
                  </div>

                  <div className="flex-1">
                    <h5 className={`font-semibold ${isCompleted ? 'text-gray-600 line-through' : config.textColor}`}>
                      {item.title}
                    </h5>
                    <p className={`text-sm mt-1 ${isCompleted ? 'text-gray-500' : 'text-gray-700'}`}>
                      {item.description}
                    </p>
                    {item.impact && !isCompleted && (
                      <p className="text-xs text-gray-600 mt-2">💡 {item.impact}</p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggle(item.id)}
                    className="text-xs"
                  >
                    {isCompleted ? "✓" : "○"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Optional Improvements */}
      {optionalItems.length > 0 && (
        <details className="group">
          <summary className="flex items-center gap-2 cursor-pointer list-none">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">
              📈 Optional Improvements ({optionalItems.length})
            </h4>
            <span className="text-xs text-gray-500 ml-auto">Click to expand</span>
          </summary>

          <div className="mt-3 space-y-2 ml-10">
            {optionalItems.map((item) => {
              const isCompleted = completedItems.has(item.id);
              return (
                <div 
                  key={item.id}
                  className={`rounded-lg border p-3 ${
                    isCompleted ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggle(item.id)}
                      className="p-0 h-auto"
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />}
                    </Button>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isCompleted ? 'text-gray-600 line-through' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      )}

      {/* AI Tips */}
      {tipItems.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-purple-900">💡 AI Pro Tips</h4>
          </div>

          <div className="space-y-2">
            {tipItems.map((item) => (
              <div key={item.id} className="flex items-start gap-2 text-sm">
                <span className="text-purple-600 mt-0.5">•</span>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Generated Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-200">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
        <span>AI-generated recommendations based on 50,000+ successful applications</span>
      </div>
    </div>
  );
}
