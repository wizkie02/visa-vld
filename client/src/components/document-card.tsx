import { FileText, CheckCircle2, AlertCircle, Eye, Trash2 } from "lucide-react";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "./ui/button";

export interface DocumentAnalysis {
  extractedText?: string;
  documentType: string;
  issuingCountry?: string;
  expirationDate?: string;
  documentNumber?: string;
  fullName?: string;
  dateOfBirth?: string;
  nationality?: string;
  confidence: number;
  passportValidityWarning?: string;
  balance?: string;
  currency?: string;
}

interface DocumentCardProps {
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  analysis?: DocumentAnalysis;
  isAnalyzing?: boolean;
  analysisProgress?: number;
  onRemove?: () => void;
  onViewDetails?: () => void;
  error?: string;
}

export default function DocumentCard({
  fileName,
  fileSize,
  uploadedAt,
  analysis,
  isAnalyzing = false,
  analysisProgress = 0,
  onRemove,
  onViewDetails,
  error
}: DocumentCardProps) {
  
  const getFileIcon = () => {
    const docType = analysis?.documentType.toLowerCase() || "";
    if (docType.includes("passport")) return "🛂";
    if (docType.includes("bank")) return "💰";
    if (docType.includes("flight")) return "✈️";
    if (docType.includes("hotel")) return "🏨";
    if (docType.includes("employment")) return "💼";
    if (docType.includes("insurance")) return "🏥";
    return "📄";
  };

  const getStatusColor = () => {
    if (error) return "border-red-300 bg-red-50";
    if (isAnalyzing) return "border-blue-300 bg-blue-50";
    if (analysis) return "border-green-300 bg-green-50";
    return "border-gray-300 bg-gray-50";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`rounded-lg border-2 transition-all duration-300 ${getStatusColor()}`}>
      {/* Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-3xl mt-1">{getFileIcon()}</div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 break-all">{fileName}</h4>
            <p className="text-xs text-gray-500 mt-1">
              {formatFileSize(fileSize)} • Uploaded {new Date(uploadedAt).toLocaleString()}
            </p>
          </div>
        </div>
        
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700 hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Analysis Content */}
      <div className="px-4 pb-4">
        {/* Error State */}
        {error && (
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900">Analysis Failed</p>
                <p className="text-xs text-red-700 mt-1">{error}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 text-red-600 border-red-300 hover:bg-red-50"
            >
              Re-upload
            </Button>
          </div>
        )}

        {/* Analyzing State */}
        {isAnalyzing && !error && (
          <div className="bg-white rounded-lg p-4 border border-blue-200 loading-enterprise">
            <LoadingSpinner
              size="sm"
              text="AI Analysis in progress..."
              className="mb-3"
            />
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
            <p className="text-xs text-blue-700">{analysisProgress}% complete</p>
            
            {/* Steps */}
            <div className="mt-3 space-y-1 text-xs text-gray-600">
              <div className={analysisProgress > 10 ? "text-green-600" : ""}>
                {analysisProgress > 10 ? "✓" : "⏳"} Extracting text from document...
              </div>
              <div className={analysisProgress > 40 ? "text-green-600" : ""}>
                {analysisProgress > 40 ? "✓" : "⏳"} Detecting document type...
              </div>
              <div className={analysisProgress > 70 ? "text-green-600" : ""}>
                {analysisProgress > 70 ? "✓" : "⏳"} Extracting key information...
              </div>
            </div>
          </div>
        )}

        {/* Complete State */}
        {analysis && !isAnalyzing && !error && (
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-900">
                Analysis Complete
              </span>
              <span className="ml-auto text-xs text-green-700 px-2 py-1 bg-green-100 rounded-full">
                {Math.round(analysis.confidence * 100)}% confidence
              </span>
            </div>

            {/* Key Information */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Document Type:</span>
                <span className="font-semibold text-gray-900 capitalize">
                  {analysis.documentType.replace(/_/g, ' ')}
                </span>
              </div>

              {analysis.fullName && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-900">{analysis.fullName}</span>
                </div>
              )}

              {analysis.documentNumber && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Document #:</span>
                  <span className="font-mono text-sm text-gray-900">{analysis.documentNumber}</span>
                </div>
              )}

              {analysis.expirationDate && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Expiry Date:</span>
                  <span className="font-semibold text-gray-900">{analysis.expirationDate}</span>
                </div>
              )}

              {analysis.balance && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Balance:</span>
                  <span className="font-semibold text-green-700">
                    {analysis.balance} {analysis.currency || ""}
                  </span>
                </div>
              )}

              {analysis.nationality && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Nationality:</span>
                  <span className="font-semibold text-gray-900">{analysis.nationality}</span>
                </div>
              )}
            </div>

            {/* Passport Validity Warning */}
            {analysis.passportValidityWarning && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 font-medium">
                  {analysis.passportValidityWarning}
                </p>
              </div>
            )}

            {/* AI Assessment */}
            {analysis.balance && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="text-lg">💡</div>
                  <div>
                    <p className="text-xs font-semibold text-blue-900">AI Assessment</p>
                    <p className="text-xs text-blue-700 mt-1">
                      {parseFloat(analysis.balance.replace(/[^0-9.]/g, '')) > 100000 
                        ? "✅ Sufficient funds for visa application"
                        : "⚠️ Balance may be insufficient for this visa type"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* View Details Button */}
            {onViewDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={onViewDetails}
                className="mt-3 w-full text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Full Details
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
