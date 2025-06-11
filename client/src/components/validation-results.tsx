import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface ValidationResult {
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

interface ValidationResultsProps {
  results: ValidationResult;
}

export default function ValidationResults({ results }: ValidationResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-emerald-50 border-emerald-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <Card className={`${getScoreBgColor(results.score)}`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(results.score)} mb-2`}>
              {results.score}%
            </div>
            <p className="text-gray-600">Validation Score</p>
            <p className="text-sm text-gray-500 mt-2">
              Completed on {new Date(results.completedAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Validation Results Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Passed Items */}
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-emerald-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
              Documents Verified ({results.verified.length})
            </h3>
            <ul className="space-y-2">
              {results.verified.map((item, index) => (
                <li key={index} className="flex items-start text-emerald-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item.message}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Issues Found */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-red-900 mb-4 flex items-center">
              <XCircle className="w-5 h-5 text-red-600 mr-2" />
              Issues Found ({results.issues.length})
            </h3>
            <ul className="space-y-3">
              {results.issues.map((issue, index) => (
                <li key={index} className="flex items-start text-red-800">
                  <XCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{issue.title}</div>
                    <div className="text-xs text-red-700">{issue.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="bg-white rounded-xl shadow-lg">
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
            Recommendations
          </h3>
          <div className="space-y-4">
            {results.issues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{issue.title}</h4>
                  <p className="text-slate-600 text-sm">{issue.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
