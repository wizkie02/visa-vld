import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tickets, CheckCircle, XCircle, Download, List, ArrowLeft } from "lucide-react";
import ValidationResults from "@/components/validation-results";

export default function Results() {
  const { sessionId } = useParams<{ sessionId: string }>();

  const { data: results, isLoading, error } = useQuery({
    queryKey: [`/api/validation-results/${sessionId}`],
    enabled: !!sessionId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[var(--visa-primary)] border-t-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-[var(--visa-text-secondary)]">Loading validation results...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="card-enterprise p-8 max-w-md mx-4">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[var(--visa-text-primary)] mb-3">Results Not Found</h2>
            <p className="text-[var(--visa-text-secondary)] mb-6">
              The validation results could not be loaded. This may be because the session has expired or the validation is still processing.
            </p>
            <Link href="/">
              <button className="btn-primary">Return to Home</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="glass border-b border-[var(--visa-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                  <Tickets className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">VisaValidator Pro</h1>
                  <p className="text-xs text-slate-600">Validation Results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Results Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Validation Complete!</h2>
          <p className="text-slate-600">Your documents have been analyzed. Review the results below.</p>
        </div>

        <ValidationResults results={results.results} />

        {/* Download Options */}
        <Card className="bg-white rounded-xl shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Download Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center justify-center space-x-2 p-4 h-auto">
                <Download className="w-4 h-4 text-blue-700" />
                <span>Validation Report (PDF)</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 p-4 h-auto">
                <List className="w-4 h-4 text-blue-700" />
                <span>Required Documents Checklist</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
