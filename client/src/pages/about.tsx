import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Tickets, 
  ArrowLeft, 
  Users, 
  Briefcase, 
  Shield, 
  AlertTriangle, 
  FileCheck, 
  Clock,
  Globe,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function About() {
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
                  <Tickets className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">VisaValidator Pro</h1>
                  <p className="text-xs text-slate-600">About Our Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About VisaValidator Pro</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            An AI-powered document validation service designed to help business and tourist travelers 
            prepare their visa applications with confidence.
          </p>
        </div>

        {/* Critical Legal Disclaimer */}
        <Alert className="bg-red-50 border-red-200 mb-8">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription>
            <h3 className="font-semibold text-red-800 mb-2">IMPORTANT LEGAL DISCLAIMER</h3>
            <div className="text-red-700 space-y-2 text-sm">
              <p><strong>No Guarantee of Visa Approval:</strong> VisaValidator Pro is a document preparation assistance tool only. We do not guarantee visa approval or represent any government agency. Visa decisions are made solely by embassy and consular officials.</p>
              <p><strong>Accuracy Limitation:</strong> While our AI analyzes documents against known requirements, results may not be 100% accurate. Embassy requirements change frequently and vary by individual circumstances.</p>
              <p><strong>Professional Consultation:</strong> For complex cases, specific legal questions, or official guidance, always consult licensed immigration attorneys or contact embassies directly.</p>
              <p><strong>Document Security:</strong> All uploaded documents are automatically deleted after validation for your privacy and security.</p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Who Is This For */}
        <Card className="bg-white rounded-xl shadow-lg mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Who Is VisaValidator For?</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Business Travelers</h4>
                  <p className="text-slate-600 text-sm">
                    Professionals attending conferences, meetings, or business negotiations who need to ensure 
                    their B-1 visa documents are properly prepared before embassy submission.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tourist Travelers</h4>
                  <p className="text-slate-600 text-sm">
                    Individuals planning vacation, family visits, or leisure travel who want to validate 
                    their B-2 tourist visa documentation before applying.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">First-Time Applicants</h4>
                  <p className="text-slate-600 text-sm">
                    People applying for visas for the first time who want guidance on document 
                    requirements and preparation best practices.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-6 h-6 text-orange-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Document Checkers</h4>
                  <p className="text-slate-600 text-sm">
                    Anyone who wants a second opinion on their visa application documents before 
                    submitting to embassies or consulates.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="bg-white rounded-xl shadow-lg mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">How Our Validation Works</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Document Analysis</h4>
                  <p className="text-slate-600 text-sm">
                    Our AI uses Optical Character Recognition (OCR) to extract text and data from your uploaded documents, 
                    identifying key information like passport numbers, dates, and document types.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Requirements Matching</h4>
                  <p className="text-slate-600 text-sm">
                    We cross-reference your documents against current embassy requirements for your destination 
                    country and visa type, checking for completeness and compliance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Gap Identification</h4>
                  <p className="text-slate-600 text-sm">
                    The system identifies missing documents, expired items, or formatting issues that might 
                    cause delays or rejections in your visa application.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Actionable Recommendations</h4>
                  <p className="text-slate-600 text-sm">
                    You receive specific recommendations on how to address any issues, including where to obtain 
                    missing documents and how to correct formatting problems.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What We Check */}
        <Card className="bg-white rounded-xl shadow-lg mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">What We Validate</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Document Types We Analyze
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Passport validity and expiration dates</li>
                  <li>• Visa application forms (DS-160, etc.)</li>
                  <li>• Financial statements and bank records</li>
                  <li>• Employment letters and business documents</li>
                  <li>• Travel itineraries and hotel bookings</li>
                  <li>• Passport-style photographs</li>
                  <li>• Supporting evidence documents</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  Validation Checks
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Document format and file type compliance</li>
                  <li>• Date validity and expiration checking</li>
                  <li>• Required information completeness</li>
                  <li>• Photo specification requirements</li>
                  <li>• Embassy-specific document lists</li>
                  <li>• Common application mistakes</li>
                  <li>• Missing signature or stamp detection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitations */}
        <Card className="bg-yellow-50 border-yellow-200 mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <XCircle className="w-6 h-6 text-yellow-600 mr-2" />
              Service Limitations
            </h3>
            
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                <strong>Not a Government Service:</strong> VisaValidator Pro is an independent commercial service 
                and is not affiliated with any government agency, embassy, or consulate.
              </p>
              <p>
                <strong>Requirements Change:</strong> Visa requirements are subject to change without notice. 
                Always verify current requirements with official embassy sources before submitting applications.
              </p>
              <p>
                <strong>Individual Circumstances:</strong> Each visa application is unique. Our analysis may not 
                account for special circumstances, previous immigration history, or country-specific variations.
              </p>
              <p>
                <strong>Technology Limitations:</strong> OCR and AI analysis may miss subtle details or 
                misinterpret document content, especially with poor quality scans or handwritten text.
              </p>
              <p>
                <strong>No Legal Advice:</strong> This service does not provide legal advice. For complex 
                immigration matters, consult qualified immigration attorneys.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-white rounded-xl shadow-lg mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 text-blue-600 mr-2" />
              Privacy & Security
            </h3>
            
            <div className="space-y-4 text-sm text-slate-600">
              <p>
                <strong>Automatic Document Deletion:</strong> All uploaded documents are automatically deleted 
                from our servers immediately after validation processing is complete.
              </p>
              <p>
                <strong>Secure Processing:</strong> Documents are transmitted using industry-standard encryption 
                and processed in secure, isolated environments.
              </p>
              <p>
                <strong>No Data Storage:</strong> We do not store personal information, passport numbers, or 
                any sensitive data beyond the validation session.
              </p>
              <p>
                <strong>GDPR Compliance:</strong> Our service complies with data protection regulations and 
                respects user privacy rights.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Link href="/validate">
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-8 text-lg">
              Start Document Validation
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Ready to validate your visa documents? Start the process now.
          </p>
        </div>
      </main>
    </div>
  );
}