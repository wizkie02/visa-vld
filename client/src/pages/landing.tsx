import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, FileCheck, Globe } from "lucide-react";
import PersistentLanguageSelector from "@/components/persistent-language-selector";

export default function Landing() {
  const { t } = useLanguage();

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <PersistentLanguageSelector />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('appName')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            {t('homeSubtitle')}
          </p>
          <Button
            onClick={handleLogin}
            size="lg"
            className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {t('loginToStart')}
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t('whyChoose')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>{t('securePrivate')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t('securePrivateDesc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>{t('fastProcessing')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t('fastProcessingDesc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <FileCheck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>{t('comprehensiveAnalysis')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t('comprehensiveAnalysisDesc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>{t('multiLanguageSupport')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t('multiLanguageSupportDesc')}
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