import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AppFallbackProps {
  error?: Error;
  resetError?: () => void;
}

export default function AppFallback({ error, resetError }: AppFallbackProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.reload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Loading Application
        </h1>
        
        <p className="text-gray-600 mb-6">
          Please wait while we prepare your visa validation platform.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">
              Technical issue detected. Automatically refreshing in {countdown} seconds.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Refresh Now
          </Button>
          
          {resetError && (
            <Button
              onClick={resetError}
              variant="outline"
              className="w-full"
            >
              Try Again
            </Button>
          )}
        </div>

        <div className="mt-6 text-xs text-gray-500">
          If this issue persists, please contact support.
        </div>
      </div>
    </div>
  );
}