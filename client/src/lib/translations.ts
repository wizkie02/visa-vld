// translations.ts
// Base English keys used to enforce structure across all languages
const baseKeys = {
  appName: "VisaValidator Pro",
  back: "Back",
  next: "Next", 
  previous: "Previous",
  homeTitle: "Professional Visa Document Validation",
  homeSubtitle: "Get your travel documents verified by AI technology before applying",
  startValidation: "Start Document Validation",
  documentValidationService: "Professional Document Validation",
  
  // Navigation
  about: "About",
  howItWorksNav: "How it Works",
  pricing: "Pricing",
  support: "Support",
  
  // Legal Disclaimer
  criticalLegalDisclaimer: "CRITICAL LEGAL DISCLAIMER",
  noGuaranteeTitle: "NO VISA APPROVAL GUARANTEE:",
  noGuaranteeText: "VisaValidator Pro is only a document preparation assistance tool. We do not guarantee visa approval, represent any government agencies, or influence embassy decisions.",
  accuracyLimitationsTitle: "ACCURACY LIMITATIONS:",
  accuracyLimitationsText: "While our AI analyzes documents according to known requirements, results may not be 100% accurate. Embassy requirements frequently change and vary by individual circumstances.",
  notOfficialGuidanceTitle: "NOT OFFICIAL GUIDANCE:",
  notOfficialGuidanceText: "This service does not replace official embassy websites, consular advice, or consultation with an immigration attorney. Always verify current requirements with official sources.",
  individualResponsibilityTitle: "INDIVIDUAL RESPONSIBILITY:",
  individualResponsibilityText: "Each traveler bears full responsibility for ensuring their visa application meets all requirements. Visa approval decisions are made solely by embassy and consular officials.",
  readFullDisclaimer: "Read full disclaimer and service limitations →",
  
  // Features Section
  whyChoose: "Why Choose VisaValidator Pro",
  securePrivate: "Secure & Private",
  securePrivateDesc: "All documents automatically deleted after validation for your privacy and security.",
  fastProcessing: "Fast Processing",
  fastProcessingDesc: "Get validation results in minutes, not days.",
  comprehensiveAnalysis: "Comprehensive Analysis", 
  comprehensiveAnalysisDesc: "AI-powered document analysis with detailed recommendations and requirement checking.",
  
  // How it Works
  howItWorks: "How it Works",
  step1: "Select Destination",
  step1Desc: "Choose your destination country and visa type",
  step2: "Upload Documents",
  step2Desc: "Upload your visa application documents", 
  step3: "Enter Details",
  step3Desc: "Fill in your personal information",
  step4: "Preview Results",
  step4Desc: "See validation preview before payment",
  step5: "Pay and Download",
  step5Desc: "Complete payment for full detailed report",
  
  // Pricing Section
  simplePricing: "Simple, Transparent Pricing",
  perValidation: "Per validation",
  completeDocAnalysis: "Complete document analysis",
  detailedValidationReport: "Detailed validation report",
  recommendationsChecklist: "Recommendations & checklist",
  secureHandling: "Secure document handling",
  startValidationButton: "Start Validation",
  
  // Footer and Navigation
  professionalService: "Professional document validation service for travelers worldwide.",
  service: "Service",
  supportedCountries: "Supported Countries",
  contactUs: "Contact Us",
  legal: "Legal",
  disclaimer: "Disclaimer", 
  dataProtection: "Data Protection",
  copyright: "© 2024 VisaValidator Pro. All rights reserved.",
  
  // Country Selection
  selectCountry: "Select your destination country",
  selectNationality: "Select your nationality",
  selectYourDestination: "Select Your Destination",
  chooseDestinationCountry: "Choose the country you plan to visit",
  selectYourNationality: "Select Your Nationality",
  yourNationalityDescription: "Choose your nationality to get personalized visa requirements",
  popularChoices: "Popular Choices",
  searchCountries: "Search countries...",
  searchNationalities: "Search nationalities...",
  proceedToValidation: "Proceed to Validation",
  
  // Visa Types
  tourist: "Tourist",
  business: "Business", 
  student: "Student",
  work: "Work",
  transit: "Transit",
  family: "Family Visit",
  
  // Document Upload
  uploadFiles: "Upload Documents",
  selectFiles: "Select Files",
  uploadedFiles: "Uploaded Files",
  noFilesUploaded: "No files uploaded yet",
  analyzing: "Analyzing...",
  uploadSuccess: "Upload successful",
  
  // Personal Information
  personalInformation: "Personal Information",
  fullName: "Full Name",
  firstName: "First Name",
  lastName: "Last Name", 
  middleName: "Middle Name",
  passportNumber: "Passport Number",
  dateOfBirth: "Date of Birth",
  nationality: "Nationality",
  plannedTravelDate: "Planned Travel Date",
  durationOfStay: "Duration of Stay (days)",
  
  // Validation Results
  validationResults: "Validation Results",
  overallScore: "Overall Score",
  verifiedItems: "Verified Items",
  issuesFound: "Issues Found",
  recommendations: "Recommendations",
  downloadReport: "Download Report",
  
  // Payment
  payment: "Payment",
  paymentDescription: "Complete payment to receive your full validation report",
  price: "$9.99",
  payNow: "Pay Now",
  
  // Common
  loading: "Loading...",
  error: "Error",
  success: "Success",
  close: "Close",
  save: "Save",
  cancel: "Cancel",
  continue: "Continue",
  required: "Required",
  optional: "Optional",
  
  // Additional
  contact: "Contact",
  privacy: "Privacy Policy",
  terms: "Terms of Service"
};

const languages = [
  "en", "vi", "zh", "hi", "es", "fr", "ar", "ru", "pt", "id", "de", "ja", "tr", "ko", "sw", "te", "mr", "ta", "ur", "bn"
];

// Language-specific translations
const languageTranslations: Record<string, Record<string, string>> = {
  vi: {
    appName: "VisaValidator Pro",
    back: "Quay lại",
    next: "Tiếp theo",
    previous: "Trước đó",
    homeTitle: "Xác thực Tài liệu Visa Chuyên nghiệp",
    homeSubtitle: "Xác minh tài liệu du lịch bằng công nghệ AI trước khi nộp đơn",
    startValidation: "Bắt đầu Xác thực Tài liệu",
    documentValidationService: "Dịch vụ Xác thực Tài liệu Chuyên nghiệp",
    
    // Navigation
    about: "Giới thiệu",
    howItWorksNav: "Cách thức hoạt động",
    pricing: "Bảng giá",
    support: "Hỗ trợ",
    
    // Pricing Section
    simplePricing: "Giá cả Đơn giản, Minh bạch",
    perValidation: "Mỗi lần xác thực",
    completeDocAnalysis: "Phân tích tài liệu hoàn chỉnh",
    detailedValidationReport: "Báo cáo xác thực chi tiết",
    recommendationsChecklist: "Khuyến nghị và danh sách kiểm tra",
    secureHandling: "Xử lý tài liệu an toàn",
    startValidationButton: "Bắt đầu Xác thực",
    
    // Footer
    professionalService: "Dịch vụ xác thực tài liệu chuyên nghiệp cho khách du lịch trên toàn thế giới.",
    service: "Dịch vụ",
    supportedCountries: "Các quốc gia được hỗ trợ",
    contactUs: "Liên hệ chúng tôi",
    legal: "Pháp lý",
    disclaimer: "Tuyên bố miễn trừ trách nhiệm",
    dataProtection: "Bảo vệ dữ liệu",
    copyright: "© 2024 VisaValidator Pro. Bảo lưu mọi quyền."
  },
  
  zh: {
    appName: "VisaValidator Pro",
    back: "返回",
    next: "下一步",
    previous: "上一步", 
    homeTitle: "专业签证文件验证",
    homeSubtitle: "在申请前使用AI技术验证您的旅行文件",
    startValidation: "开始文档验证",
    documentValidationService: "专业文档验证",
    
    // Navigation
    about: "关于",
    howItWorksNav: "工作原理",
    pricing: "价格",
    support: "支持",
    
    // Pricing Section
    simplePricing: "简单透明的定价",
    perValidation: "每次验证",
    completeDocAnalysis: "完整文档分析",
    detailedValidationReport: "详细验证报告",
    recommendationsChecklist: "建议和清单",
    secureHandling: "安全文档处理",
    startValidationButton: "开始验证",
    
    // Footer
    professionalService: "为全球旅行者提供专业文档验证服务。",
    service: "服务",
    supportedCountries: "支持的国家",
    contactUs: "联系我们",
    legal: "法律",
    disclaimer: "免责声明", 
    dataProtection: "数据保护",
    copyright: "© 2024 VisaValidator Pro. 保留所有权利。"
  },
  
  es: {
    appName: "VisaValidator Pro",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    homeTitle: "Validación Profesional de Documentos de Visa",
    homeSubtitle: "Verifique sus documentos de viaje con tecnología IA antes de aplicar",
    startValidation: "Iniciar Validación de Documentos",
    documentValidationService: "Validación Profesional de Documentos",
    
    // Navigation
    about: "Acerca de",
    howItWorksNav: "Cómo funciona",
    pricing: "Precios",
    support: "Soporte",
    
    // Pricing Section
    simplePricing: "Precios Simples y Transparentes",
    perValidation: "Por validación",
    completeDocAnalysis: "Análisis completo de documentos",
    detailedValidationReport: "Informe de validación detallado",
    recommendationsChecklist: "Recomendaciones y lista de verificación",
    secureHandling: "Manejo seguro de documentos",
    startValidationButton: "Comenzar Validación",
    
    // Footer
    professionalService: "Servicio profesional de validación de documentos para viajeros de todo el mundo.",
    service: "Servicio",
    supportedCountries: "Países Compatibles",
    contactUs: "Contáctanos",
    legal: "Legal",
    disclaimer: "Descargo de responsabilidad",
    dataProtection: "Protección de Datos",
    copyright: "© 2024 VisaValidator Pro. Todos los derechos reservados."
  },

  fr: {
    appName: "VisaValidator Pro",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    homeTitle: "Validation Professionnelle de Documents de Visa",
    homeSubtitle: "Faites vérifier vos documents de voyage par la technologie IA avant de postuler",
    startValidation: "Commencer la Validation de Documents",
    documentValidationService: "Validation Professionnelle de Documents",
    
    // Navigation
    about: "À propos",
    howItWorksNav: "Comment ça marche",
    pricing: "Tarifs",
    support: "Support",
    
    // Pricing Section
    simplePricing: "Prix Simple et Transparent",
    perValidation: "Par validation",
    completeDocAnalysis: "Analyse complète des documents",
    detailedValidationReport: "Rapport de validation détaillé",
    recommendationsChecklist: "Recommandations et liste de contrôle",
    secureHandling: "Traitement sécurisé des documents",
    startValidationButton: "Commencer la Validation",
    
    // Footer
    professionalService: "Service professionnel de validation de documents pour les voyageurs du monde entier.",
    service: "Service",
    supportedCountries: "Pays Pris en Charge",
    contactUs: "Nous Contacter",
    legal: "Légal",
    disclaimer: "Avis de non-responsabilité",
    dataProtection: "Protection des Données",
    copyright: "© 2024 VisaValidator Pro. Tous droits réservés."
  },

  id: {
    appName: "VisaValidator Pro",
    back: "Kembali",
    next: "Selanjutnya",
    previous: "Sebelumnya",
    homeTitle: "Validasi Dokumen Visa Profesional",
    homeSubtitle: "Verifikasi dokumen perjalanan Anda dengan teknologi AI sebelum mengajukan",
    startValidation: "Mulai Validasi Dokumen",
    documentValidationService: "Validasi Dokumen Profesional",
    
    // Navigation
    about: "Tentang",
    howItWorksNav: "Cara Kerja",
    pricing: "Harga",
    support: "Dukungan",
    
    // Pricing Section
    simplePricing: "Harga yang Sederhana dan Transparan",
    perValidation: "Per validasi",
    completeDocAnalysis: "Analisis dokumen lengkap",
    detailedValidationReport: "Laporan validasi terperinci",
    recommendationsChecklist: "Rekomendasi dan daftar periksa",
    secureHandling: "Penanganan dokumen yang aman",
    startValidationButton: "Mulai Validasi",
    
    // Footer
    professionalService: "Layanan validasi dokumen profesional untuk pelancong di seluruh dunia.",
    service: "Layanan",
    supportedCountries: "Negara yang Didukung",
    contactUs: "Hubungi Kami",
    legal: "Hukum",
    disclaimer: "Penafian",
    dataProtection: "Perlindungan Data",
    copyright: "© 2024 VisaValidator Pro. Semua hak dilindungi."
  }
};

export const translations: Record<string, Record<string, string>> = {};

// Initialize translations for all languages
for (const lang of languages) {
  translations[lang] = {};
  
  // Use language-specific translations if available, otherwise use base English or placeholder
  for (const key in baseKeys) {
    if (languageTranslations[lang] && languageTranslations[lang][key]) {
      translations[lang][key] = languageTranslations[lang][key];
    } else if (lang === "en") {
      translations[lang][key] = (baseKeys as any)[key];
    } else {
      // Use placeholder format for languages without specific translations
      translations[lang][key] = `[${lang}] ${(baseKeys as any)[key]}`;
    }
  }
}