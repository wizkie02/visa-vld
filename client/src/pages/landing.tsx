import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, FileCheck, Globe, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Landing() {
  const { t } = useLanguage();

  const handleLogin = () => {
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Chrome Translation Notice */}
      <div className="bg-blue-600 text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            <strong>Non-English speakers:</strong> Use Google Chrome's translate feature! 
            Right-click anywhere on this page → "Translate to [your language]" or go to Chrome Settings → Languages → Auto-translate pages
          </p>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Visa Validator Pro
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Get your travel documents verified by AI technology before applying
          </p>
          <Button
            onClick={handleLogin}
            size="lg"
            className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Login to Start
          </Button>
        </div>
      </div>

      {/* VFS Global Notice */}
      <div className="bg-orange-50 border-l-4 border-orange-400 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">
              Important: External Visa Processing Agencies
            </h2>
            <p className="text-orange-700 text-lg mb-4">
              Many countries use external agencies like <strong>VFS Global</strong>, TLS Contact, or BLS International to handle visa applications. 
              If your destination country uses these services, you must book appointments and submit applications through their official websites.
            </p>
            <p className="text-orange-700">
              Our document validation helps you prepare, but final submissions must be done through the official processing centers.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Visa Validator Pro
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All documents automatically deleted after validation for your privacy and security.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Fast Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get validation results in minutes, not days.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <FileCheck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Comprehensive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI-powered document analysis with detailed recommendations and requirement checking.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {t('howItWorks')}
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('step1')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('step1Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('step2')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('step2Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('step3')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('step3Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('step4')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('step4Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('step5')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('step5Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
              {t('privacyFirst')}
            </h3>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              {t('privacyNotice')}
            </p>
            <a
              href="/privacy"
              className="text-blue-700 dark:text-blue-300 underline hover:text-blue-900 dark:hover:text-blue-100"
            >
              {t('readPrivacyPolicy')}
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t('readyToStart')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t('loginRequired')}
          </p>
          <Button
            onClick={handleLogin}
            size="lg"
            className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {t('signInNow')}
          </Button>
        </div>
      </div>
    </div>
  );
}