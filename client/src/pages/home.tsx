import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tickets, Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";


export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <Tickets className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t("appName")}</h1>
                <p className="text-xs text-slate-600">{t("documentValidationService")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <Link href="/about">
                  <span className="text-slate-600 hover:text-blue-700 transition-colors cursor-pointer">{t("about")}</span>
                </Link>
                <a href="#how-it-works" className="text-slate-600 hover:text-blue-700 transition-colors">{t("howItWorksNav")}</a>
                <a href="#pricing" className="text-slate-600 hover:text-blue-700 transition-colors">{t("pricing")}</a>
                <a href="#support" className="text-slate-600 hover:text-blue-700 transition-colors">{t("support")}</a>
              </nav>

            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t("homeTitle")}
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            {t("homeSubtitle")}
          </p>
          
          {/* Legal Disclaimer Card */}
          <Card className="bg-red-50 border-red-200 mb-8 max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3 text-left">
                <AlertTriangle className="text-red-600 text-lg mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-3">{t("criticalLegalDisclaimer")}</h3>
                  <div className="text-sm text-red-700 leading-relaxed space-y-2">
                    <p><strong>{t("noGuaranteeTitle")}</strong> {t("noGuaranteeText")}</p>
                    <p><strong>{t("accuracyLimitationsTitle")}</strong> {t("accuracyLimitationsText")}</p>
                    <p><strong>{t("notOfficialGuidanceTitle")}</strong> {t("notOfficialGuidanceText")}</p>
                    <p><strong>{t("individualResponsibilityTitle")}</strong> {t("individualResponsibilityText")}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-red-200">
                    <Link href="/about">
                      <span className="text-red-600 hover:text-red-800 underline text-sm font-medium cursor-pointer">
                        {t("readFullDisclaimer")}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Link href="/validate">
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-8 text-lg transform hover:scale-105 transition-all duration-200 shadow-lg">
              {t("startValidation")}
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">{t("howItWorks")}</h3>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t("step1")}</h4>
              <p className="text-sm text-slate-600">{t("step1Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t("step2")}</h4>
              <p className="text-sm text-slate-600">{t("step2Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t("step3")}</h4>
              <p className="text-sm text-slate-600">{t("step3Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t("step4")}</h4>
              <p className="text-sm text-slate-600">{t("step4Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">5</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t("step5")}</h4>
              <p className="text-sm text-slate-600">{t("step5Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose VisaValidator Pro</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Shield className="w-8 h-8 text-blue-700 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
                <p className="text-sm text-slate-600">All documents are automatically deleted after validation for your privacy and security.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Clock className="w-8 h-8 text-blue-700 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Fast Processing</h4>
                <p className="text-sm text-slate-600">Get your validation results within minutes, not days.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <CheckCircle className="w-8 h-8 text-blue-700 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Analysis</h4>
                <p className="text-sm text-slate-600">AI-powered analysis against current embassy requirements from official sources.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Simple, Transparent Pricing</h3>
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">$9.99</div>
                <div className="text-slate-600 mb-6">Per validation</div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    Complete document analysis
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    Detailed validation report
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    Recommendations & checklist
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    Secure document handling
                  </li>
                </ul>
                <Link href="/validate">
                  <Button className="w-full bg-blue-700 hover:bg-blue-800">
                    Start Validation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                  <Tickets className="text-white w-4 h-4" />
                </div>
                <span className="text-lg font-bold">VisaValidator Pro</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional document validation service for visa applications worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Supported Countries</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Disclaimer</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Data Protection</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 VisaValidator Pro. All rights reserved. This service is not affiliated with any government agency.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
