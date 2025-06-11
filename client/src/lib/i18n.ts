// Multi-language support for top 20 languages worldwide
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' }
];

export const translations: Record<string, any> = {
  en: {
    // Header & Navigation
    appName: "VisaValidator Pro",
    tagline: "Document Validation Service",
    back: "Back",
    
    // Home Page
    homeTitle: "Professional Visa Document Validation",
    homeSubtitle: "Get your travel documents verified by AI technology before applying",
    homeDescription: "Our advanced AI analyzes your documents against current embassy requirements, ensuring your visa application has the best chance of approval.",
    startValidation: "Start Document Validation",
    
    // Features
    featuresTitle: "Why Choose VisaValidator Pro?",
    aiAnalysis: "AI-Powered Analysis",
    aiAnalysisDesc: "Advanced OCR and document analysis using cutting-edge AI technology",
    currentRequirements: "Current Requirements",
    currentRequirementsDesc: "Real-time verification against latest embassy and consulate requirements",
    comprehensiveReport: "Comprehensive Reports",
    comprehensiveReportDesc: "Detailed validation results with actionable recommendations",
    
    // Steps
    selectDestination: "Select Destination",
    uploadDocuments: "Upload Documents", 
    personalInfo: "Personal Information",
    validation: "Validation",
    payment: "Payment",
    
    // Country Selection
    selectCountryTitle: "Select Your Destination",
    selectCountryDesc: "Choose the country you're planning to visit and visa type",
    destination: "Destination Country",
    visaType: "Visa Type",
    tourist: "Tourist",
    business: "Business",
    student: "Student", 
    work: "Work",
    transit: "Transit",
    next: "Next",
    previous: "Previous",
    
    // File Upload
    uploadTitle: "Upload Your Documents",
    uploadDesc: "Upload your travel documents for AI analysis",
    uploadArea: "Drop files here or click to browse",
    supportedFormats: "Supported formats: PDF, JPG, PNG, DOCX, DOC, TXT",
    chooseFiles: "Choose Files",
    analyzing: "Analyzing...",
    analyzed: "Analyzed",
    analysisFailed: "Analysis Failed",
    uploadError: "Upload Error",
    aiAnalysisResults: "AI Analysis Results",
    documentType: "Document Type",
    issuingCountry: "Issuing Country",
    nameFound: "Name Found",
    documentNumber: "Document Number",
    expiryDate: "Expiry Date",
    aiConfidence: "AI Confidence",
    extractedText: "Extracted Text (first 200 chars)",
    
    // Personal Information
    personalInfoTitle: "Personal Information",
    personalInfoDesc: "Enter your personal details for document validation",
    applicantName: "Full Name",
    passportNumber: "Passport Number",
    dateOfBirth: "Date of Birth",
    nationality: "Nationality", 
    travelDate: "Travel Date",
    stayDuration: "Stay Duration (days)",
    
    // Validation
    validationTitle: "Document Validation",
    validationDesc: "AI analysis and validation against current requirements",
    whatHappensNext: "What happens next:",
    analysisStep1: "Our AI analyzes your uploaded documents using OCR technology",
    analysisStep2: "We cross-reference against current embassy requirements", 
    analysisStep3: "You'll see a preview of validation results before payment",
    analysisStep4: "Complete payment to receive the full detailed report",
    startValidationBtn: "Start Validation",
    
    // Results
    resultsTitle: "Validation Results Preview",
    overallScore: "Overall Compliance Score",
    verifiedItems: "Verified Items",
    issuesFound: "Issues Found",
    payForFullReport: "Pay $9.99 for Full Detailed Report",
    
    // Payment
    securePayment: "Secure Payment",
    paymentDesc: "Complete payment to start document validation",
    documentValidationService: "Document Validation Service",
    processing: "Processing...",
    payNow: "Pay Now",
    cancel: "Cancel",
    
    // Footer
    aboutUs: "About Us", 
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contactUs: "Contact Us",
    allRightsReserved: "All rights reserved",
    
    // Toast Messages
    uploadSuccessful: "Upload and Analysis Complete",
    validationComplete: "Validation Complete", 
    validationCompleteDesc: "Document analysis completed using AI technology",
    paymentSuccessful: "Payment Successful",
    paymentFailed: "Payment Failed",
    validationFailed: "Validation Failed",
    
    // About Page
    aboutTitle: "About VisaValidator Pro",
    aboutDescription: "Professional visa document validation service powered by advanced AI technology.",
    importantDisclaimer: "Important Legal Disclaimer",
    disclaimerText: "VisaValidator Pro is an independent document analysis service and is not affiliated with any government, embassy, or consulate. Our AI-powered analysis provides guidance based on publicly available visa requirements, but should not be considered as official legal advice.",
    accuracyLimitations: "Accuracy and Limitations",
    limitationsText: "While our AI technology is highly advanced, document analysis may not be 100% accurate. Visa requirements can change frequently, and different consulates may have varying requirements. We strongly recommend verifying all information with official embassy or consulate sources.",
    noGuarantee: "No Guarantee of Visa Approval",
    guaranteeText: "Using VisaValidator Pro does not guarantee visa approval. Visa decisions are made solely by the relevant embassy or consulate based on their own criteria and assessment. Our service is designed to help you prepare better documentation, but the final decision rests with the visa authorities.",
  },
  
  zh: {
    // Header & Navigation  
    appName: "签证验证专家",
    tagline: "文件验证服务",
    back: "返回",
    
    // Home Page
    homeTitle: "专业签证文件验证",
    homeSubtitle: "在申请前通过AI技术验证您的旅行文件",
    homeDescription: "我们的先进AI根据当前大使馆要求分析您的文件，确保您的签证申请有最佳的批准机会。",
    startValidation: "开始文件验证",
    
    // Features
    featuresTitle: "为什么选择签证验证专家？",
    aiAnalysis: "AI驱动分析",
    aiAnalysisDesc: "使用尖端AI技术进行高级OCR和文件分析",
    currentRequirements: "当前要求",
    currentRequirementsDesc: "根据最新大使馆和领事馆要求进行实时验证",
    comprehensiveReport: "全面报告",
    comprehensiveReportDesc: "详细的验证结果和可操作的建议",
    
    // Steps
    selectDestination: "选择目的地",
    uploadDocuments: "上传文件",
    personalInfo: "个人信息", 
    validation: "验证",
    payment: "付款",
    
    // Country Selection
    selectCountryTitle: "选择您的目的地",
    selectCountryDesc: "选择您计划访问的国家和签证类型",
    destination: "目的地国家",
    visaType: "签证类型",
    tourist: "旅游",
    business: "商务",
    student: "学生",
    work: "工作",
    transit: "过境",
    next: "下一步",
    previous: "上一步",
    
    // File Upload
    uploadTitle: "上传您的文件",
    uploadDesc: "上传您的旅行文件进行AI分析",
    uploadArea: "拖放文件到这里或点击浏览",
    supportedFormats: "支持格式：PDF、JPG、PNG、DOCX、DOC、TXT",
    chooseFiles: "选择文件",
    analyzing: "分析中...",
    analyzed: "已分析",
    analysisFailed: "分析失败",
    uploadError: "上传错误",
    aiAnalysisResults: "AI分析结果",
    documentType: "文件类型",
    issuingCountry: "签发国家",
    nameFound: "发现姓名",
    documentNumber: "文件编号",
    expiryDate: "到期日期",
    aiConfidence: "AI置信度",
    extractedText: "提取文本（前200字符）",
    
    // Personal Information
    personalInfoTitle: "个人信息",
    personalInfoDesc: "输入您的个人详细信息进行文件验证",
    applicantName: "全名",
    passportNumber: "护照号码",
    dateOfBirth: "出生日期",
    nationality: "国籍",
    travelDate: "旅行日期",
    stayDuration: "停留时间（天）",
    
    // Validation
    validationTitle: "文件验证",
    validationDesc: "AI分析和根据当前要求验证",
    whatHappensNext: "接下来会发生什么：",
    analysisStep1: "我们的AI使用OCR技术分析您上传的文件",
    analysisStep2: "我们根据当前大使馆要求进行交叉参考",
    analysisStep3: "您将在付款前看到验证结果预览",
    analysisStep4: "完成付款以接收完整的详细报告",
    startValidationBtn: "开始验证",
    
    // Results
    resultsTitle: "验证结果预览",
    overallScore: "整体合规评分",
    verifiedItems: "已验证项目",
    issuesFound: "发现的问题",
    payForFullReport: "支付$9.99获取完整详细报告",
    
    // Payment
    securePayment: "安全付款",
    paymentDesc: "完成付款以开始文件验证",
    documentValidationService: "文件验证服务",
    processing: "处理中...",
    payNow: "立即付款",
    cancel: "取消",
    
    // Footer
    aboutUs: "关于我们",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款", 
    contactUs: "联系我们",
    allRightsReserved: "版权所有",
    
    // Toast Messages
    uploadSuccessful: "上传和分析完成",
    validationComplete: "验证完成",
    validationCompleteDesc: "使用AI技术完成文件分析",
    paymentSuccessful: "付款成功",
    paymentFailed: "付款失败",
    validationFailed: "验证失败",
    
    // About Page
    aboutTitle: "关于签证验证专家",
    aboutDescription: "由先进AI技术驱动的专业签证文件验证服务。",
    importantDisclaimer: "重要法律免责声明",
    disclaimerText: "签证验证专家是一个独立的文件分析服务，与任何政府、大使馆或领事馆无关。我们的AI驱动分析基于公开可用的签证要求提供指导，但不应被视为官方法律建议。",
    accuracyLimitations: "准确性和局限性",
    limitationsText: "虽然我们的AI技术非常先进，但文件分析可能不是100%准确的。签证要求可能经常变化，不同的领事馆可能有不同的要求。我们强烈建议您向官方大使馆或领事馆来源验证所有信息。",
    noGuarantee: "不保证签证批准",
    guaranteeText: "使用签证验证专家不保证签证批准。签证决定完全由相关大使馆或领事馆根据其自己的标准和评估做出。我们的服务旨在帮助您准备更好的文件，但最终决定取决于签证当局。",
  },
  
  es: {
    // Header & Navigation
    appName: "VisaValidator Pro",
    tagline: "Servicio de Validación de Documentos",
    back: "Atrás",
    
    // Home Page
    homeTitle: "Validación Profesional de Documentos de Visa",
    homeSubtitle: "Verifica tus documentos de viaje con tecnología IA antes de aplicar",
    homeDescription: "Nuestra IA avanzada analiza tus documentos contra los requisitos actuales de embajadas, asegurando que tu solicitud de visa tenga la mejor oportunidad de aprobación.",
    startValidation: "Iniciar Validación de Documentos",
    
    // Features
    featuresTitle: "¿Por qué elegir VisaValidator Pro?",
    aiAnalysis: "Análisis Impulsado por IA",
    aiAnalysisDesc: "OCR avanzado y análisis de documentos usando tecnología IA de vanguardia",
    currentRequirements: "Requisitos Actuales",
    currentRequirementsDesc: "Verificación en tiempo real contra los últimos requisitos de embajadas y consulados",
    comprehensiveReport: "Informes Completos",
    comprehensiveReportDesc: "Resultados de validación detallados con recomendaciones accionables",
    
    // Steps
    selectDestination: "Seleccionar Destino",
    uploadDocuments: "Subir Documentos",
    personalInfo: "Información Personal",
    validation: "Validación",
    payment: "Pago",
    
    // Country Selection
    selectCountryTitle: "Selecciona tu Destino",
    selectCountryDesc: "Elige el país que planeas visitar y el tipo de visa",
    destination: "País de Destino",
    visaType: "Tipo de Visa",
    tourist: "Turista",
    business: "Negocios",
    student: "Estudiante",
    work: "Trabajo",
    transit: "Tránsito",
    next: "Siguiente",
    previous: "Anterior",
    
    // File Upload
    uploadTitle: "Sube tus Documentos",
    uploadDesc: "Sube tus documentos de viaje para análisis de IA",
    uploadArea: "Arrastra archivos aquí o haz clic para explorar",
    supportedFormats: "Formatos soportados: PDF, JPG, PNG, DOCX, DOC, TXT",
    chooseFiles: "Elegir Archivos",
    analyzing: "Analizando...",
    analyzed: "Analizado",
    analysisFailed: "Análisis Falló",
    uploadError: "Error de Subida",
    aiAnalysisResults: "Resultados de Análisis IA",
    documentType: "Tipo de Documento",
    issuingCountry: "País Emisor",
    nameFound: "Nombre Encontrado",
    documentNumber: "Número de Documento",
    expiryDate: "Fecha de Vencimiento",
    aiConfidence: "Confianza IA",
    extractedText: "Texto Extraído (primeros 200 caracteres)",
    
    // Personal Information
    personalInfoTitle: "Información Personal",
    personalInfoDesc: "Ingresa tus datos personales para validación de documentos",
    applicantName: "Nombre Completo",
    passportNumber: "Número de Pasaporte",
    dateOfBirth: "Fecha de Nacimiento",
    nationality: "Nacionalidad",
    travelDate: "Fecha de Viaje",
    stayDuration: "Duración de Estancia (días)",
    
    // Validation
    validationTitle: "Validación de Documentos",
    validationDesc: "Análisis IA y validación contra requisitos actuales",
    whatHappensNext: "Qué sucede después:",
    analysisStep1: "Nuestra IA analiza tus documentos subidos usando tecnología OCR",
    analysisStep2: "Hacemos referencias cruzadas contra requisitos actuales de embajadas",
    analysisStep3: "Verás una vista previa de resultados de validación antes del pago",
    analysisStep4: "Completa el pago para recibir el informe detallado completo",
    startValidationBtn: "Iniciar Validación",
    
    // Results
    resultsTitle: "Vista Previa de Resultados de Validación",
    overallScore: "Puntuación General de Cumplimiento",
    verifiedItems: "Elementos Verificados",
    issuesFound: "Problemas Encontrados",
    payForFullReport: "Pagar $9.99 por Informe Detallado Completo",
    
    // Payment
    securePayment: "Pago Seguro",
    paymentDesc: "Completa el pago para iniciar validación de documentos",
    documentValidationService: "Servicio de Validación de Documentos",
    processing: "Procesando...",
    payNow: "Pagar Ahora",
    cancel: "Cancelar",
    
    // Footer
    aboutUs: "Acerca de Nosotros",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    contactUs: "Contáctanos",
    allRightsReserved: "Todos los derechos reservados",
    
    // Toast Messages
    uploadSuccessful: "Subida y Análisis Completo",
    validationComplete: "Validación Completa",
    validationCompleteDesc: "Análisis de documentos completado usando tecnología IA",
    paymentSuccessful: "Pago Exitoso",
    paymentFailed: "Pago Falló",
    validationFailed: "Validación Falló",
    
    // About Page
    aboutTitle: "Acerca de VisaValidator Pro",
    aboutDescription: "Servicio profesional de validación de documentos de visa impulsado por tecnología IA avanzada.",
    importantDisclaimer: "Descargo de Responsabilidad Legal Importante",
    disclaimerText: "VisaValidator Pro es un servicio independiente de análisis de documentos y no está afiliado con ningún gobierno, embajada o consulado. Nuestro análisis impulsado por IA proporciona orientación basada en requisitos de visa públicamente disponibles, pero no debe considerarse como asesoramiento legal oficial.",
    accuracyLimitations: "Precisión y Limitaciones",
    limitationsText: "Aunque nuestra tecnología IA es altamente avanzada, el análisis de documentos puede no ser 100% preciso. Los requisitos de visa pueden cambiar frecuentemente, y diferentes consulados pueden tener requisitos variables. Recomendamos encarecidamente verificar toda la información con fuentes oficiales de embajadas o consulados.",
    noGuarantee: "Sin Garantía de Aprobación de Visa",
    guaranteeText: "Usar VisaValidator Pro no garantiza la aprobación de visa. Las decisiones de visa son tomadas únicamente por la embajada o consulado relevante basándose en sus propios criterios y evaluación. Nuestro servicio está diseñado para ayudarte a preparar mejor la documentación, pero la decisión final recae en las autoridades de visa.",
  },
  
  // Add other languages with similar comprehensive translations
  fr: {
    appName: "VisaValidator Pro",
    tagline: "Service de Validation de Documents",
    back: "Retour",
    homeTitle: "Validation Professionnelle de Documents de Visa",
    homeSubtitle: "Vérifiez vos documents de voyage avec la technologie IA avant de postuler",
    homeDescription: "Notre IA avancée analyse vos documents selon les exigences actuelles des ambassades, garantissant que votre demande de visa ait les meilleures chances d'approbation.",
    startValidation: "Commencer la Validation des Documents",
    featuresTitle: "Pourquoi choisir VisaValidator Pro ?",
    aiAnalysis: "Analyse Alimentée par IA",
    aiAnalysisDesc: "OCR avancé et analyse de documents utilisant une technologie IA de pointe",
    currentRequirements: "Exigences Actuelles",
    currentRequirementsDesc: "Vérification en temps réel contre les dernières exigences d'ambassades et consulats",
    comprehensiveReport: "Rapports Complets",
    comprehensiveReportDesc: "Résultats de validation détaillés avec recommandations exploitables",
    selectDestination: "Sélectionner la Destination",
    uploadDocuments: "Télécharger des Documents",
    personalInfo: "Informations Personnelles",
    validation: "Validation",
    payment: "Paiement",
    selectCountryTitle: "Sélectionnez votre Destination",
    selectCountryDesc: "Choisissez le pays que vous prévoyez de visiter et le type de visa",
    destination: "Pays de Destination",
    visaType: "Type de Visa",
    tourist: "Touriste",
    business: "Affaires",
    student: "Étudiant",
    work: "Travail",
    transit: "Transit",
    next: "Suivant",
    previous: "Précédent",
    uploadTitle: "Téléchargez vos Documents",
    uploadDesc: "Téléchargez vos documents de voyage pour analyse IA",
    uploadArea: "Déposez les fichiers ici ou cliquez pour parcourir",
    supportedFormats: "Formats supportés : PDF, JPG, PNG, DOCX, DOC, TXT",
    chooseFiles: "Choisir des Fichiers",
    analyzing: "Analyse en cours...",
    analyzed: "Analysé",
    analysisFailed: "Analyse Échouée",
    uploadError: "Erreur de Téléchargement",
    aboutUs: "À Propos de Nous",
    privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions de Service",
    contactUs: "Nous Contacter",
    allRightsReserved: "Tous droits réservés"
  }
};

// Add minimal translations for remaining languages
const minimalTranslations = {
  hi: { appName: "वीज़ा वैलिडेटर प्रो", back: "वापस", next: "अगला", previous: "पिछला" },
  ar: { appName: "فيزا فاليديتر برو", back: "رجوع", next: "التالي", previous: "السابق" },
  bn: { appName: "ভিসা ভ্যালিডেটর প্রো", back: "ফিরে", next: "পরবর্তী", previous: "আগের" },
  ru: { appName: "ВизаВалидатор Про", back: "Назад", next: "Далее", previous: "Назад" },
  pt: { appName: "VisaValidator Pro", back: "Voltar", next: "Próximo", previous: "Anterior" },
  id: { appName: "VisaValidator Pro", back: "Kembali", next: "Berikutnya", previous: "Sebelumnya" },
  ur: { appName: "ویزا ویلیڈیٹر پرو", back: "واپس", next: "اگلا", previous: "پچھلا" },
  de: { appName: "VisaValidator Pro", back: "Zurück", next: "Weiter", previous: "Zurück" },
  ja: { appName: "ビザバリデータープロ", back: "戻る", next: "次へ", previous: "前へ" },
  sw: { appName: "VisaValidator Pro", back: "Rudi", next: "Ifuatayo", previous: "Iliyotangulia" },
  te: { appName: "వీసా వాలిడేటర్ ప్రో", back: "వెనుకకు", next: "తదుపరి", previous: "మునుపటి" },
  mr: { appName: "व्हिसा व्हॅलिडेटर प्रो", back: "मागे", next: "पुढे", previous: "मागील" },
  ta: { appName: "விசா வேலிடேட்டர் புரோ", back: "பின்", next: "அடுத்து", previous: "முந்தைய" },
  tr: { appName: "VisaValidator Pro", back: "Geri", next: "İleri", previous: "Önceki" },
  ko: { appName: "비자 검증기 프로", back: "뒤로", next: "다음", previous: "이전" },
  vi: { appName: "VisaValidator Pro", back: "Quay lại", next: "Tiếp theo", previous: "Trước đó" }
};

// Merge minimal translations with full translations
Object.keys(minimalTranslations).forEach(lang => {
  if (!translations[lang]) {
    translations[lang] = { ...translations.en, ...minimalTranslations[lang] };
  }
});

// Simple language hook without context complexity
export function useLanguage() {
  const currentLanguage = 'en'; // Default to English for now
  
  const setLanguage = (lang: string) => {
    localStorage.setItem('preferred-language', lang);
    window.location.reload(); // Simple refresh for language change
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  const getSupportedLanguages = (): Language[] => SUPPORTED_LANGUAGES;

  return { currentLanguage, setLanguage, t, getSupportedLanguages };
}