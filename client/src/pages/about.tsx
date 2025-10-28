import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  Briefcase,
  Shield,
  AlertTriangle,
  FileCheck,
  Clock,
  Globe,
  CheckCircle,
  XCircle,
  Sparkles,
  Lock,
  Award,
  Target,
  Zap
} from "lucide-react";
import horizontalLogo from "@assets/horizontal_2@3x_1750492153266.webp";

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 🚀 Enterprise Header 2.0 */}
      <header className="glass border-b border-[var(--visa-border)]">
        <div className="container-premium">
          <div className="flex justify-between items-center h-16 py-3">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <button className="btn-secondary flex items-center space-x-2 px-4 py-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              </Link>
              <div className="flex items-center space-x-3">
                <img src={horizontalLogo} alt="Visa Validator" className="h-10 w-auto" />
                <div className="hidden sm:block">
                  <p className="text-xs text-[var(--visa-text-muted)] font-medium">About Our Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 🚀 Enterprise Main Content */}
      <main className="container-premium py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-[var(--visa-surface)] border border-[var(--visa-border)] mb-6 shadow-md">
            <Sparkles className="h-4 w-4 text-[var(--visa-primary)]" />
            <span className="text-sm font-semibold text-[var(--visa-text-primary)]">Enterprise AI-Powered Service</span>
          </div>
          <h2 className="text-4xl font-bold gradient-text mb-6">About VisaValidator</h2>
          <p className="text-xl text-[var(--visa-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade AI-powered document validation service designed to help business and tourist travelers
            prepare their visa applications with confidence.
          </p>
        </div>

        {/* 🚀 Enterprise Legal Disclaimer */}
        <div className="card-premium border-2 border-[var(--visa-primary)]/20 bg-gradient-to-br from-[var(--visa-primary-light)]/30 to-[var(--visa-primary)]/10 p-8 mb-16">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--visa-primary)] to-[var(--visa-primary-dark)] flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[var(--visa-text-primary)] mb-4">IMPORTANT LEGAL DISCLAIMER</h3>
              <div className="space-y-3 text-[var(--visa-text-secondary)] leading-relaxed">
                <p><strong className="text-[var(--visa-primary)]">No Guarantee of Visa Approval:</strong> VisaValidator is a document preparation assistance tool only. We do not guarantee visa approval or represent any government agency. Visa decisions are made solely by embassy and consular officials.</p>
                <p><strong className="text-[var(--visa-primary)]">Accuracy Limitation:</strong> While our AI analyzes documents against known requirements, results may not be 100% accurate. Embassy requirements change frequently and vary by individual circumstances.</p>
                <p><strong className="text-[var(--visa-primary)]">Professional Consultation:</strong> For complex cases, specific legal questions, or official guidance, always consult licensed immigration attorneys or contact embassies directly.</p>
                <p><strong className="text-[var(--visa-primary)]">Document Security:</strong> All uploaded documents are automatically deleted after validation for your privacy and security.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🚀 Who Is This For */}
        <div className="card-enterprise p-8 mb-16">
          <h3 className="text-3xl font-bold text-[var(--visa-text-primary)] mb-8">Who Is VisaValidator For?</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--visa-text-primary)] mb-3">Business Travelers</h4>
                <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                  Professionals attending conferences, meetings, or business negotiations who need to ensure
                  their B-1 visa documents are properly prepared before embassy submission.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-teal-500/20 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-teal-600" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--visa-text-primary)] mb-3">Tourist Travelers</h4>
                <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                  Individuals planning vacation, family visits, or leisure travel who want to validate
                  their B-2 tourist visa documentation before applying.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-green-500/20 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--visa-text-primary)] mb-3">First-Time Applicants</h4>
                <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                  People applying for visas for the first time who want guidance on document
                  requirements and preparation best practices.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-600/10 to-teal-700/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-700/20 group-hover:scale-110 transition-transform">
                <FileCheck className="w-7 h-7 text-emerald-700" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--visa-text-primary)] mb-3">Document Checkers</h4>
                <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                  Anyone who wants a second opinion on their visa application documents before
                  submitting to embassies or consulates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🚀 How Our Validation Works */}
        <div className="card-enterprise p-8 mb-16">
          <h3 className="text-3xl font-bold text-[var(--visa-text-primary)] mb-8">How Our Validation Works</h3>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[var(--visa-text-primary)] mb-2">Document Analysis</h4>
                <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                  Our AI uses advanced Optical Character Recognition (OCR) to extract text and data from your uploaded documents,
                  identifying key information like passport numbers, dates, and document types.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[var(--visa-text-primary)] mb-2">Requirements Matching</h4>
                <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                  We cross-reference your documents against current embassy requirements for your destination
                  country and visa type, checking for completeness and compliance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[var(--visa-text-primary)] mb-2">Gap Identification</h4>
                <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                  The system identifies missing documents, expired items, or formatting issues that might
                  cause delays or rejections in your visa application.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[var(--visa-text-primary)] mb-2">Actionable Recommendations</h4>
                <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                  You receive specific recommendations on how to address any issues, including where to obtain
                  missing documents and how to correct formatting problems.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🚀 What We Validate */}
        <div className="card-enterprise p-8 mb-16">
          <h3 className="text-3xl font-bold text-[var(--visa-text-primary)] mb-8">What We Validate</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-[var(--visa-text-primary)] mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-[var(--visa-primary)] mr-3" />
                Document Types We Analyze
              </h4>
              <ul className="space-y-3 text-[var(--visa-text-secondary)]">
                <li className="flex items-start">
                  <span className="text-[var(--visa-primary)] mr-2">•</span>
                  <span>Passport validity and expiration dates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-primary)] mr-2">•</span>
                  <span>Visa application forms (DS-160, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-primary)] mr-2">•</span>
                  <span>Financial statements and bank records</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-primary)] mr-2">•</span>
                  <span>Employment letters and business documents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-primary)] mr-2">•</span>
                  <span>Travel itineraries and hotel bookings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-primary)] mr-2">•</span>
                  <span>Passport-style photographs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-primary)] mr-2">•</span>
                  <span>Supporting evidence documents</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[var(--visa-text-primary)] mb-4 flex items-center">
                <Clock className="w-6 h-6 text-[var(--visa-accent)] mr-3" />
                Validation Checks
              </h4>
              <ul className="space-y-3 text-[var(--visa-text-secondary)]">
                <li className="flex items-start">
                  <span className="text-[var(--visa-accent)] mr-2">•</span>
                  <span>Document format and file type compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-accent)] mr-2">•</span>
                  <span>Date validity and expiration checking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-accent)] mr-2">•</span>
                  <span>Required information completeness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-accent)] mr-2">•</span>
                  <span>Photo specification requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-accent)] mr-2">•</span>
                  <span>Embassy-specific document lists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-accent)] mr-2">•</span>
                  <span>Common application mistakes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--visa-accent)] mr-2">•</span>
                  <span>Missing signature or stamp detection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 🚀 Service Limitations */}
        <div className="card-premium border-2 border-orange-300/30 bg-gradient-to-br from-orange-50/30 to-amber-50/30 p-8 mb-16">
          <h3 className="text-3xl font-bold text-[var(--visa-text-primary)] mb-6 flex items-center">
            <XCircle className="w-7 h-7 text-orange-600 mr-3" />
            Service Limitations
          </h3>

          <div className="space-y-4 text-[var(--visa-text-secondary)] leading-relaxed">
            <p>
              <strong className="text-orange-600">Not a Government Service:</strong> VisaValidator is an independent commercial service
              and is not affiliated with any government agency, embassy, or consulate.
            </p>
            <p>
              <strong className="text-orange-600">Requirements Change:</strong> Visa requirements are subject to change without notice.
              Always verify current requirements with official embassy sources before submitting applications.
            </p>
            <p>
              <strong className="text-orange-600">Individual Circumstances:</strong> Each visa application is unique. Our analysis may not
              account for special circumstances, previous immigration history, or country-specific variations.
            </p>
            <p>
              <strong className="text-orange-600">Technology Limitations:</strong> OCR and AI analysis may miss subtle details or
              misinterpret document content, especially with poor quality scans or handwritten text.
            </p>
            <p>
              <strong className="text-orange-600">No Legal Advice:</strong> This service does not provide legal advice. For complex
              immigration matters, consult qualified immigration attorneys.
            </p>
          </div>
        </div>

        {/* 🚀 Privacy & Security */}
        <div className="card-enterprise p-8 mb-16">
          <h3 className="text-3xl font-bold text-[var(--visa-text-primary)] mb-6 flex items-center">
            <Shield className="w-7 h-7 text-[var(--visa-primary)] mr-3" />
            Privacy & Security
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-[var(--visa-text-primary)] flex items-center">
                <Lock className="w-5 h-5 text-[var(--visa-primary)] mr-2" />
                Data Protection
              </h4>
              <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                <strong>Automatic Document Deletion:</strong> All uploaded documents are automatically deleted
                from our servers immediately after validation processing is complete.
              </p>
              <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                <strong>No Data Storage:</strong> We do not store personal information, passport numbers, or
                any sensitive data beyond the validation session.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-[var(--visa-text-primary)] flex items-center">
                <Award className="w-5 h-5 text-[var(--visa-primary)] mr-2" />
                Security Standards
              </h4>
              <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                <strong>Secure Processing:</strong> Documents are transmitted using industry-standard encryption
                and processed in secure, isolated environments.
              </p>
              <p className="text-[var(--visa-text-secondary)] leading-relaxed">
                <strong>GDPR Compliance:</strong> Our service complies with data protection regulations and
                respects user privacy rights.
              </p>
            </div>
          </div>
        </div>

        {/* 🚀 Enterprise CTA */}
        <div className="text-center">
          <Link href="/validation">
            <button className="btn-primary group px-12 py-4 text-xl font-semibold shadow-2xl hover:shadow-3xl mb-4">
              <span>Start Document Validation</span>
              <Zap className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>
          </Link>
          <p className="text-[var(--visa-text-muted)] text-lg">
            Ready to validate your visa documents? Start the process now.
          </p>
          <div className="flex items-center justify-center space-x-6 mt-8">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-[var(--visa-primary)]" />
              <span className="text-[var(--visa-text-secondary)] font-medium">99.8% Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[var(--visa-accent)]" />
              <span className="text-[var(--visa-text-secondary)] font-medium">&lt;2 Min Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-[var(--visa-primary)]" />
              <span className="text-[var(--visa-text-secondary)] font-medium">Enterprise Security</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}