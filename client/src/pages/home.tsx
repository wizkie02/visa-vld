import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  FileCheck,
  Upload,
  User,
  CreditCard,
  CheckCircle2,
  Shield,
  Clock,
  Sparkles,
  AlertTriangle,
  LogOut,
  UserCircle,
  ChevronRight,
  Star,
  TrendingUp,
  Lock
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useNewAuth } from "@/hooks/use-new-auth";
import horizontalLogo from "@assets/horizontal_2@3x_1750492153266.webp";
import stackedWhiteLogo from "@assets/stacked_white@3x_1750497205092.webp";

export default function Home() {
  const { t } = useLanguage();
  const { user, logoutMutation } = useNewAuth();

  const steps = [
    {
      num: 1,
      icon: Globe,
      title: "Select Destination",
      desc: "Choose your destination country and visa type",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      num: 2,
      icon: FileCheck,
      title: "Review Requirements",
      desc: "See current visa requirements and download checklist",
      color: "from-teal-500 to-emerald-500"
    },
    {
      num: 3,
      icon: Upload,
      title: "Upload Documents",
      desc: "Upload your travel documents for AI analysis",
      color: "from-green-500 to-teal-500"
    },
    {
      num: 4,
      icon: User,
      title: "Personal Information",
      desc: "Enter your travel details and consent",
      color: "from-emerald-600 to-green-600"
    },
    {
      num: 5,
      icon: CreditCard,
      title: "Review & Pay",
      desc: "Review information and complete secure payment",
      color: "from-teal-600 to-emerald-700"
    },
    {
      num: 6,
      icon: CheckCircle2,
      title: "Get Results",
      desc: "Receive detailed validation report with recommendations",
      color: "from-green-600 to-emerald-800"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: t("securePrivate"),
      desc: t("securePrivateDesc"),
      gradient: "from-emerald-500/10 to-teal-600/10",
      iconColor: "text-emerald-600"
    },
    {
      icon: Clock,
      title: t("fastProcessing"),
      desc: t("fastProcessingDesc"),
      gradient: "from-green-500/10 to-emerald-600/10",
      iconColor: "text-green-600"
    },
    {
      icon: Sparkles,
      title: t("comprehensiveAnalysis"),
      desc: t("comprehensiveAnalysisDesc"),
      gradient: "from-teal-500/10 to-emerald-700/10",
      iconColor: "text-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 🚀 Enterprise Header 2.0 */}
      <header className="sticky top-0 z-50 glass border-b border-[var(--visa-border)]">
        <div className="container-premium">
          <div className="flex justify-between items-center h-16 py-3">
            <div className="flex items-center space-x-3">
              <img src={horizontalLogo} alt="Visa Validator" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[var(--visa-primary)] rounded-full"></div>
                  <p className="text-xs text-[var(--visa-text-muted)] font-medium">Enterprise Edition</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <nav className="hidden lg:flex space-x-8">
                <a href="#how-it-works" className="text-sm font-medium text-[var(--visa-text-secondary)] hover:text-[var(--visa-primary)] transition-colors">
                  How it Works
                </a>
                <a href="#pricing" className="text-sm font-medium text-[var(--visa-text-secondary)] hover:text-[var(--visa-primary)] transition-colors">
                  Pricing
                </a>
                <Link href="/about">
                  <span className="text-sm font-medium text-[var(--visa-text-secondary)] hover:text-[var(--visa-primary)] transition-colors cursor-pointer">
                    {t("about")}
                  </span>
                </Link>
                {user?.isAdmin && (
                  <Link href="/admin">
                    <span className="text-sm font-medium text-[var(--visa-text-secondary)] hover:text-[var(--visa-primary)] transition-colors cursor-pointer">
                      Admin
                    </span>
                  </Link>
                )}
              </nav>

              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <div className="hidden sm:flex items-center space-x-3 px-4 py-2 rounded-xl bg-[var(--visa-surface-alt)] border border-[var(--visa-border)]">
                      <UserCircle className="h-4 w-4 text-[var(--visa-text-secondary)]" />
                      <span className="text-sm font-semibold text-[var(--visa-text-primary)]">{user.username}</span>
                    </div>
                    <button
                      onClick={() => logoutMutation.mutate()}
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl text-[var(--visa-text-secondary)] hover:text-[var(--visa-text-primary)] hover:bg-[var(--visa-surface-alt)] transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth">
                      <button className="btn-primary px-6 py-2 text-sm font-semibold">
                        Sign In
                      </button>
                    </Link>
                    <Link href="/auth">
                      <button className="btn-secondary px-6 py-2 text-sm font-semibold">
                        Sign Up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chrome Translation Notice - Only for unauthenticated users */}
      {!user && (
        <div className="bg-blue-600 text-white py-3">
          <div className="container-premium px-4 text-center">
            <p className="text-sm">
              <strong>Non-English speakers:</strong> Use Google Chrome's translate feature!
              Right-click anywhere on this page → "Translate to [your language]" or go to Chrome Settings → Languages → Auto-translate pages
            </p>
          </div>
        </div>
      )}

      {/* 🚀 Enterprise Hero Section 2.0 */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 gradient-hero opacity-60"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 3px 3px, rgba(16, 185, 129, 0.06) 3px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>

        {/* Floating elements */}
        <div className="absolute top-16 left-8 w-16 h-16 bg-gradient-to-br from-[var(--visa-primary)]/15 to-[var(--visa-primary-dark)]/15 rounded-2xl float-animation"></div>
        <div className="absolute top-32 right-12 w-12 h-12 bg-gradient-to-br from-[var(--visa-accent)]/15 to-[var(--visa-accent)]/30 rounded-xl float-animation" style={{animationDelay: '1s'}}></div>

        <div className="relative container-premium">
          <div className="text-center max-w-4xl mx-auto">
            {/* Enterprise Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[var(--visa-surface)] border border-[var(--visa-border)] mb-6 shadow-md fade-in">
              <div className="w-1.5 h-1.5 bg-[var(--visa-primary)] rounded-full animate-pulse"></div>
              <Sparkles className="h-3 w-3 text-[var(--visa-primary)]" />
              <span className="text-xs font-semibold text-[var(--visa-text-primary)]">AI-Powered Validation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight slide-up">
              <span className="gradient-text">{t("homeTitle")}</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--visa-text-secondary)] mb-8 max-w-3xl mx-auto leading-relaxed slide-up" style={{animationDelay: '0.2s'}}>
              {t("homeSubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 slide-up" style={{animationDelay: '0.4s'}}>
              {user ? (
                <>
                  <Link href="/validation">
                    <button className="btn-primary group px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl flex items-center whitespace-nowrap">
                      <span>{t("startValidation")}</span>
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  <a href="#how-it-works">
                    <button className="btn-secondary group px-6 py-3 text-base font-semibold flex items-center whitespace-nowrap">
                      <span>Learn More</span>
                      <div className="ml-2 w-4 h-4 rounded-full border-2 border-[var(--visa-primary)] flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-[var(--visa-primary)] rounded-full"></div>
                      </div>
                    </button>
                  </a>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <button className="btn-primary group px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl flex items-center whitespace-nowrap">
                      <span>Login to Start</span>
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  <a href="#how-it-works">
                    <button className="btn-secondary group px-6 py-3 text-base font-semibold flex items-center whitespace-nowrap">
                      <span>Learn More</span>
                      <div className="ml-2 w-4 h-4 rounded-full border-2 border-[var(--visa-primary)] flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-[var(--visa-primary)] rounded-full"></div>
                      </div>
                    </button>
                  </a>
                </>
              )}
            </div>

            {/* Enterprise Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto scale-in" style={{animationDelay: '0.6s'}}>
              <div className="card-enterprise p-4 text-center">
                <div className="flex justify-center mb-2">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-2xl font-bold gradient-text">5.0</p>
                <p className="text-xs text-[var(--visa-text-muted)] font-medium">Rating</p>
              </div>
              <div className="card-enterprise p-4 text-center">
                <TrendingUp className="h-8 w-8 text-[var(--visa-primary)] mx-auto mb-2" />
                <p className="text-2xl font-bold gradient-text">99.8%</p>
                <p className="text-xs text-[var(--visa-text-muted)] font-medium">AI Accuracy</p>
              </div>
              <div className="card-enterprise p-4 text-center">
                <Clock className="h-8 w-8 text-[var(--visa-accent)] mx-auto mb-2" />
                <p className="text-2xl font-bold gradient-text">&lt;2 min</p>
                <p className="text-xs text-[var(--visa-text-muted)] font-medium">Processing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VFS Global Notice - Only for unauthenticated users */}
      {!user && (
        <section className="bg-orange-50 border-l-4 border-orange-400 py-8">
          <div className="container-premium">
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
        </section>
      )}

      {/* 🚀 Enterprise How It Works 2.0 */}
      <section id="how-it-works" className="py-16 bg-[var(--visa-surface)]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">{t("howItWorks")}</h2>
            <p className="text-lg text-[var(--visa-text-secondary)] max-w-2xl mx-auto">
              Simple 6-step process for accurate visa validation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="card-enterprise p-6 group fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="relative">
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${step.color} opacity-10 rounded-bl-[80px] rounded-tr-xl`}></div>

                    <div className="relative">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg mb-4 group-hover:scale-110 transition-all duration-300`}>
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[var(--visa-primary)]"></div>
                        <span className="text-xs font-bold text-[var(--visa-text-muted)] tracking-wider">STEP {step.num}</span>
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-[var(--visa-primary)] to-transparent"></div>
                      </div>

                      <h4 className="text-lg font-bold text-[var(--visa-text-primary)] mb-2">{step.title}</h4>
                      <p className="text-sm text-[var(--visa-text-secondary)] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🚀 Enterprise Features 2.0 */}
      <section className="py-16 gradient-hero">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">{t("whyChoose")}</h2>
            <p className="text-lg text-[var(--visa-text-secondary)]">Trusted features for accurate visa validation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card-premium p-6 text-center slide-up" style={{animationDelay: `${idx * 0.2}s`}}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}>
                    <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h4 className="text-xl font-bold text-[var(--visa-text-primary)] mb-3">{feature.title}</h4>
                  <p className="text-[var(--visa-text-secondary)] leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🚀 Enterprise Legal Disclaimer 2.0 */}
      <section className="py-16 bg-[var(--visa-surface)]">
        <div className="container-premium">
          <div className="card-premium border-2 border-[var(--visa-primary)]/20 bg-gradient-to-br from-[var(--visa-primary-light)]/30 to-[var(--visa-primary)]/10 p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--visa-primary)] to-[var(--visa-primary-dark)] flex items-center justify-center shadow-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[var(--visa-text-primary)] mb-4">{t("criticalLegalDisclaimer")}</h3>
                <div className="space-y-3 text-[var(--visa-text-secondary)] leading-relaxed">
                  <p><strong className="text-[var(--visa-primary)]">{t("noGuaranteeTitle")}</strong> {t("noGuaranteeText")}</p>
                  <p><strong className="text-[var(--visa-primary)]">{t("accuracyLimitationsTitle")}</strong> {t("accuracyLimitationsText")}</p>
                  <p><strong className="text-[var(--visa-primary)]">{t("notOfficialGuidanceTitle")}</strong> {t("notOfficialGuidanceText")}</p>
                  <p><strong className="text-[var(--visa-primary)]">{t("individualResponsibilityTitle")}</strong> {t("individualResponsibilityText")}</p>
                </div>
                <div className="mt-6">
                  <Link href="/about">
                    <button className="btn-secondary px-6 py-2 font-semibold">
                      {t("readFullDisclaimer")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Enterprise Pricing Section 2.0 */}
      <section id="pricing" className="py-16 gradient-hero">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">{t("simplePricing")}</h2>
            <p className="text-lg text-[var(--visa-text-secondary)] max-w-2xl mx-auto">Transparent pricing for professional visa validation</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="card-enterprise p-8 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 gradient-success"></div>

              <div className="text-center mb-8">
                <div className="inline-flex items-baseline">
                  <span className="text-2xl font-semibold text-[var(--visa-text-secondary)] mr-2">$</span>
                  <span className="text-5xl font-extrabold gradient-text">9.99</span>
                </div>
                <p className="text-[var(--visa-text-secondary)] mt-2 font-medium">{t("perValidation")}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--visa-primary-light)] border border-[var(--visa-primary)] mt-3">
                  <Lock className="h-3 w-3 text-[var(--visa-primary)] mr-1" />
                  <span className="text-xs font-semibold text-[var(--visa-primary-dark)]">Secure Payment</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { text: t("completeDocAnalysis"), icon: CheckCircle2 },
                  { text: t("detailedValidationReport"), icon: CheckCircle2 },
                  { text: t("recommendationsChecklist"), icon: CheckCircle2 },
                  { text: t("secureHandling"), icon: Lock }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-[var(--visa-primary-light)] border border-[var(--visa-primary)] flex items-center justify-center">
                      <item.icon className="w-3 h-3 text-[var(--visa-primary)]" />
                    </div>
                    <span className="text-[var(--visa-text-primary)] leading-relaxed text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              {user ? (
                <Link href="/validation">
                  <button className="w-full btn-primary py-4 text-lg font-semibold shadow-lg hover:shadow-xl whitespace-nowrap">
                    {t("startValidationButton")}
                  </button>
                </Link>
              ) : (
                <Link href="/auth">
                  <button className="w-full btn-primary py-4 text-lg font-semibold shadow-lg hover:shadow-xl whitespace-nowrap">
                    Login to Start Validation
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

    {/* 🚀 Enterprise Footer 2.0 */}
      <footer className="bg-gradient-to-br from-[var(--visa-primary-dark)] to-[#047857] text-white py-12">
        <div className="container-premium">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src={stackedWhiteLogo} alt="Visa Validator" className="h-8 w-auto" />
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("professionalService")}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-white mb-3">Service</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-white/80 hover:text-white transition-colors text-sm">How It Works</a></li>
                <li><a href="#pricing" className="text-white/80 hover:text-white transition-colors text-sm">Pricing</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-white mb-3">{t("support")}</h4>
              <ul className="space-y-2">
                <li><Link href="/about"><span className="text-white/80 hover:text-white transition-colors cursor-pointer text-sm">{t("about")}</span></Link></li>
                <li><Link href="/contact"><span className="text-white/80 hover:text-white transition-colors cursor-pointer text-sm">{t("contactUs")}</span></Link></li>
                <li><Link href="/privacy-policy"><span className="text-white/80 hover:text-white transition-colors cursor-pointer text-sm">{t("privacyPolicy")}</span></Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-white mb-3">{t("legal")}</h4>
              <ul className="space-y-2">
                <li><Link href="/terms-of-service"><span className="text-white/80 hover:text-white transition-colors cursor-pointer text-sm">{t("termsOfService")}</span></Link></li>
                <li><Link href="/about"><span className="text-white/80 hover:text-white transition-colors cursor-pointer text-sm">{t("disclaimer")}</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/80 text-sm mb-3 md:mb-0">{t("copyright")}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/80">System Operational</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur border border-white/20">
                  <Lock className="h-3 w-3 text-white/80" />
                  <span className="text-xs text-white/90">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
