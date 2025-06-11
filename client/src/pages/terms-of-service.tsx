import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Terms of Service</CardTitle>
            <p className="text-center text-slate-600">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using VisaValidator Pro, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Service Description</h2>
              <p className="mb-4">
                VisaValidator Pro provides AI-powered document analysis and validation services for visa applications. Our service:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Analyzes uploaded documents using optical character recognition (OCR)</li>
                <li>Validates documents against publicly available visa requirements</li>
                <li>Provides guidance and recommendations for visa applications</li>
                <li>Does not guarantee visa approval or act as official legal advice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="mb-4">Users agree to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and truthful information</li>
                <li>Upload only documents they own or have permission to use</li>
                <li>Not upload documents containing illegal content</li>
                <li>Verify all information with official embassy sources</li>
                <li>Use the service only for legitimate visa application purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Service Limitations</h2>
              <p className="mb-4">
                Our service has the following limitations:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>AI analysis may not be 100% accurate</li>
                <li>Visa requirements change frequently and may not reflect latest updates</li>
                <li>Different consulates may have varying requirements</li>
                <li>Service does not constitute official legal advice</li>
                <li>No guarantee of visa approval</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Payment and Refunds</h2>
              <p className="mb-4">
                Payment terms and conditions:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Payment is required before receiving detailed validation reports</li>
                <li>All payments are processed securely through Stripe</li>
                <li>Refunds may be provided at our discretion for technical issues</li>
                <li>No refunds for visa application rejections</li>
                <li>Disputes should be reported within 30 days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                All content, features, and functionality of VisaValidator Pro are owned by us and protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
              <p className="mb-4">
                VisaValidator Pro is provided "as is" without any warranties, express or implied. We do not warrant that:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>The service will be uninterrupted or error-free</li>
                <li>The results will be accurate or complete</li>
                <li>Any errors in the service will be corrected</li>
                <li>The service will meet your specific requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall VisaValidator Pro be liable for any indirect, incidental, special, consequential, or punitive damages, including visa application rejections, travel delays, or financial losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">9. Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify and hold harmless VisaValidator Pro from any claims, damages, or expenses arising from your use of the service or violation of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">10. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your access to the service immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">11. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective when posted on this page. Your continued use of the service constitutes acceptance of modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">12. Contact Information</h2>
              <p className="mb-4">
                For questions about these terms, contact us at:
                <br />
                Email: legal@visavalidator.pro
                <br />
                Address: [Company Address]
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}