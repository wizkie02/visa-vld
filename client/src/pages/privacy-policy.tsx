import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
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
            <CardTitle className="text-3xl text-center">Privacy Policy</CardTitle>
            <p className="text-center text-slate-600">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
              <p className="mb-4">
                VisaValidator Pro collects the following types of information to provide our document validation services:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Personal information you provide (name, passport number, nationality, travel dates)</li>
                <li>Uploaded documents and their contents</li>
                <li>Payment information processed through Stripe</li>
                <li>Usage analytics and technical information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use collected information to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Analyze your documents using AI technology</li>
                <li>Provide validation reports and recommendations</li>
                <li>Process payments and maintain account records</li>
                <li>Improve our services and user experience</li>
                <li>Communicate with you about your validation requests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>All data transmission is encrypted using SSL/TLS</li>
                <li>Documents are processed securely and deleted after analysis</li>
                <li>Payment information is handled by Stripe with PCI compliance</li>
                <li>Access to personal data is restricted to authorized personnel only</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Retention</h2>
              <p className="mb-4">
                We retain your data for the following periods:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Uploaded documents: Deleted within 24 hours after processing</li>
                <li>Validation results: Stored for 1 year for customer support</li>
                <li>Payment records: Retained as required by law (typically 7 years)</li>
                <li>Account information: Until account deletion is requested</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
              <p className="mb-4">
                We use the following third-party services that may collect data:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>OpenAI for document analysis</li>
                <li>Stripe for payment processing</li>
                <li>Analytics services for usage statistics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                For privacy-related questions or requests, contact us at:
                <br />
                Email: privacy@visavalidator.pro
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