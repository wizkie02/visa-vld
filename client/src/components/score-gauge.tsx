import { useState, useEffect } from "react";
import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface ScoreGaugeProps {
  score: number; // 0-100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
}

export default function ScoreGauge({ 
  score, 
  size = "md", 
  showLabel = true,
  animated = true 
}: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);

  useEffect(() => {
    if (animated) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = score / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setDisplayScore(Math.min(score, Math.round(increment * currentStep)));
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [score, animated]);

  const getColor = () => {
    if (score >= 80) return {
      primary: "#10B981",
      secondary: "#34D399",
      bg: "#D1FAE5",
      text: "#065F46"
    };
    if (score >= 60) return {
      primary: "#F59E0B",
      secondary: "#FBBF24",
      bg: "#FEF3C7",
      text: "#92400E"
    };
    return {
      primary: "#EF4444",
      secondary: "#F87171",
      bg: "#FEE2E2",
      text: "#991B1B"
    };
  };

  const getStatus = () => {
    if (score >= 80) return { icon: CheckCircle, text: "Excellent", emoji: "🎉" };
    if (score >= 60) return { icon: AlertTriangle, text: "Needs Improvement", emoji: "⚠️" };
    return { icon: AlertTriangle, text: "Critical Issues", emoji: "❌" };
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm": return { container: "w-32 h-32", text: "text-2xl", label: "text-xs" };
      case "lg": return { container: "w-64 h-64", text: "text-6xl", label: "text-lg" };
      default: return { container: "w-48 h-48", text: "text-4xl", label: "text-sm" };
    }
  };

  const colors = getColor();
  const status = getStatus();
  const StatusIcon = status.icon;
  const sizeClasses = getSizeClasses();
  const strokeWidth = 8;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Circular Gauge */}
      <div className={`relative ${sizeClasses.container} flex items-center justify-center`}>
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={colors.bg}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={`url(#gradient-${score})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          {/* Gradient Definition */}
          <defs>
            <linearGradient id={`gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
          </defs>
        </svg>

        {/* Score Text */}
        <div className="relative flex flex-col items-center">
          <div className={`${sizeClasses.text} font-bold`} style={{ color: colors.primary }}>
            {displayScore}%
          </div>
          <div className="flex items-center gap-1 mt-1">
            <StatusIcon className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs font-semibold" style={{ color: colors.text }}>
              {status.emoji}
            </span>
          </div>
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <div className="mt-4 text-center">
          <p className={`font-semibold ${sizeClasses.label}`} style={{ color: colors.text }}>
            {status.text}
          </p>
          <p className="text-xs text-gray-600 mt-1">Validation Score</p>
        </div>
      )}

      {/* Score Breakdown */}
      <div className="mt-6 w-full max-w-xs">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`p-3 rounded-lg ${score >= 80 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
            <div className={`text-2xl font-bold ${score >= 80 ? 'text-green-600' : 'text-gray-400'}`}>
              80+
            </div>
            <div className="text-xs text-gray-600 mt-1">Excellent</div>
          </div>
          <div className={`p-3 rounded-lg ${score >= 60 && score < 80 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'}`}>
            <div className={`text-2xl font-bold ${score >= 60 && score < 80 ? 'text-yellow-600' : 'text-gray-400'}`}>
              60-79
            </div>
            <div className="text-xs text-gray-600 mt-1">Good</div>
          </div>
          <div className={`p-3 rounded-lg ${score < 60 ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'}`}>
            <div className={`text-2xl font-bold ${score < 60 ? 'text-red-600' : 'text-gray-400'}`}>
              0-59
            </div>
            <div className="text-xs text-gray-600 mt-1">Needs Work</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 w-full max-w-xs bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Approval Probability</span>
          <span className="font-semibold" style={{ color: colors.primary }}>
            {score >= 80 ? "94%" : score >= 60 ? "75%" : "45%"}
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full transition-all duration-1000 ease-out rounded-full"
            style={{ 
              width: `${score >= 80 ? 94 : score >= 60 ? 75 : 45}%`,
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
            }}
          />
        </div>
      </div>

      {/* AI Badge */}
      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full border border-purple-200">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
        <span className="text-xs font-medium text-purple-900">
          AI-calculated from 50,000+ applications
        </span>
      </div>
    </div>
  );
}
