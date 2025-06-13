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
  
  // Authentication
  welcomeBack: "Welcome Back",
  accessYourAccount: "Access your account to continue",
  signIn: "Sign In",
  signUp: "Sign Up",
  username: "Username",
  password: "Password",
  enterUsername: "Enter your username",
  enterPassword: "Enter your password",
  chooseUsername: "Choose a username",
  createPassword: "Create a password",
  nationality: "Nationality",
  selectNationality: "Select your nationality",
  signingIn: "Signing in...",
  creatingAccount: "Creating account...",
  createAccount: "Create Account",
  getStarted: "Get Started",
  
  // Hero Features
  secureValidation: "Secure Validation",
  secureValidationDesc: "Bank-level security for your documents",
  quickProcessing: "Quick Processing",
  quickProcessingDesc: "Results in minutes",
  globalSupport: "Global Support",
  globalSupportDesc: "Support for 190+ countries",
  comprehensiveReports: "Comprehensive Reports",
  comprehensiveReportsDesc: "Detailed analysis and recommendations",
  
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
  loadingVisaTypes: "Loading visa types...",
  
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
  terms: "Terms of Service",
  
  // Step Indicator
  stepDestination: "Destination",
  stepNationality: "Nationality", 
  stepRequirements: "Requirements",
  stepUpload: "Upload",
  stepInformation: "Information",
  stepReview: "Review",
  stepPayment: "Payment",
  
  // Country Selection
  selectDestinationVisa: "Select Destination & Visa Type",
  destinationCountry: "Destination Country",
  selectCountryPlaceholder: "Choose your destination country",
  visaType: "Visa Type",
  selectVisaTypePlaceholder: "Select visa type",
  commonRequirementsFor: "Common requirements for",
  
  // Personal Info Form
  selectNationalityPlaceholder: "Select your nationality",
  daysPlaceholder: "Enter number of days",
  
  // File Upload
  uploadAnalysisComplete: "Upload and Analysis Complete",
  documentsAnalyzedSuccessfully: "document(s) analyzed successfully",
  documentsFailed: "failed",
  uploadFailed: "Upload failed",
  
  // Validation Results
  validationScore: "Validation Score",
  completedOn: "Completed on",
  documentsVerified: "Documents Verified",
  
  // Language Modal
  chooseYourLanguage: "Choose Your Language",
  selectPreferredLanguage: "Select your preferred language for the visa validation application",
  continueButton: "Continue",
  
  // Extended Visa Types
  medical: "Medical",
  conference: "Conference",
  journalist: "Journalist", 
  religious: "Religious",
  cultural: "Cultural",
  research: "Research",
  training: "Training",
  diplomatic: "Diplomatic",
  crew: "Crew",
  investment: "Investment",
  retirement: "Retirement",
  volunteer: "Volunteer",
  sports: "Sports",
  other: "Other",
  
  // Document Requirements
  validPassportMinimum: "Valid passport (minimum 6 months validity)",
  ds160ConfirmationPage: "DS-160 confirmation page",
  passportStylePhotograph: "Passport-style photograph", 
  financialDocuments: "Financial documents (bank statements, income proof)",
  travelItineraryAccommodation: "Travel itinerary and accommodation proof",
  completedVisaApplication: "Completed visa application form",
  supportingDocuments: "Supporting documents (varies by visa type)",
  
  // Privacy Policy
  privacyPolicy: "Privacy Policy",
  dataCollection: "Data Collection",
  dataCollectionDesc: "We collect information necessary to provide visa validation services, including personal details, travel documents, and payment information.",
  aiProcessing: "AI Processing & OpenAI Partnership",
  openaiProcessing: "Document Analysis with OpenAI",
  openaiProcessingDesc: "Your uploaded documents are processed using OpenAI's advanced AI models to extract information and validate against visa requirements. This processing happens securely and temporarily.",
  dataRetention: "Data Retention",
  dataRetentionDesc: "Documents are automatically deleted after processing. OpenAI does not retain your data.",
  dataLocation: "Data Processing Location",
  dataLocationDesc: "Processing occurs in secure, SOC 2 compliant data centers in the United States.",
  complianceStandards: "Security Standards",
  complianceDesc: "OpenAI maintains enterprise-grade security with SOC 2 Type II certification and GDPR compliance.",
  openaiTerms: "OpenAI Terms & Policies",
  openaiTermsDesc: "Our AI processing is governed by OpenAI's enterprise privacy commitments. Review their",
  openaiDpaLink: "Data Processing Agreement",
  openaiDataPolicy: "API Data Usage Policies",
  and: "and",
  dataProtectionRights: "Your Data Protection Rights",
  dataRightsDesc: "You have the following rights regarding your personal data:",
  accessRight: "Access",
  accessRightDesc: "Request access to your personal data and processing activities",
  correctionRight: "Correction",
  correctionRightDesc: "Request correction of inaccurate or incomplete data",
  deletionRight: "Deletion",
  deletionRightDesc: "Request deletion of your personal data (data is automatically deleted after processing)",
  portabilityRight: "Portability",
  portabilityRightDesc: "Request a copy of your data in a machine-readable format",
  dataSecurityMeasures: "Data Security Measures",
  securityDesc: "We implement comprehensive security measures to protect your data:",
  encryptionInTransit: "End-to-end encryption for all data transmission",
  encryptionAtRest: "Encryption of stored data using industry-standard protocols",
  accessControls: "Strict access controls and authentication requirements",
  automaticDeletion: "Automatic deletion of documents after validation completion",
  securePaymentProcessing: "PCI-compliant payment processing through Stripe",
  cookiesTracking: "Cookies & Tracking",
  cookiesDesc: "We use essential session cookies for authentication and functionality. No tracking or advertising cookies are used.",
  contactPrivacy: "Privacy Questions",
  contactPrivacyDesc: "For questions about this privacy policy or your data rights, contact us through our support channels.",
  lastUpdated: "Last Updated",
  lastUpdatedDate: "June 13, 2025",
  
  // Data Processing Consent
  dataProcessingConsent: "Data Processing Consent",
  dataProcessingConsentText: "I understand and agree that my uploaded documents and personal information will be processed using artificial intelligence (AI) technology, including OpenAI's services, for the purpose of visa document validation. I acknowledge that this processing is necessary to provide the validation service and that all data will be handled securely and deleted after processing.",
  dataProcessingRequired: "You must agree to data processing to continue",
  learnMorePrivacy: "Learn more about our privacy practices",
  personalInfoDescription: "Name, passport number, nationality, travel dates, and other visa application details",
  uploadedDocuments: "Uploaded Documents",
  documentsDesc: "Passport scans, visa application forms, financial documents, and supporting materials",
  paymentInformation: "Payment Information",
  paymentDesc: "Payment information processed securely through Stripe (we do not store payment details)",
  
  // Landing Page
  loginToStart: "Sign In to Start",
  multiLanguageSupport: "Multi-Language Support",
  multiLanguageSupportDesc: "Available in 20+ languages with native translations",
  privacyFirst: "Privacy First",
  privacyNotice: "We prioritize your privacy with automatic document deletion and secure AI processing through OpenAI's enterprise services.",
  readPrivacyPolicy: "Read our Privacy Policy",
  readyToStart: "Ready to Validate Your Documents?",
  loginRequired: "Create an account or sign in to access our professional visa document validation service.",
  signInNow: "Sign In Now"
};

const languages = [
  "en", "vi", "zh", "hi", "es", "fr", "ar", "ru", "pt", "id", "de", "ja", "tr", "ko", "sw", "te", "mr", "ta", "ur", "bn"
];

// Add basic translations for languages not in languageTranslations
const additionalLanguageTranslations: Record<string, Record<string, string>> = {
  hi: {
    // Hindi complete translations
    appName: "VisaValidator Pro",
    back: "वापस",
    next: "अगला",
    previous: "पिछला",
    homeTitle: "पेशेवर वीज़ा दस्तावेज़ सत्यापन",
    homeSubtitle: "आवेदन करने से पहले AI तकनीक के साथ अपने यात्रा दस्तावेज़ों को सत्यापित करें",
    startValidation: "दस्तावेज़ सत्यापन शुरू करें",
    documentValidationService: "पेशेवर दस्तावेज़ सत्यापन",
    
    // Navigation
    about: "के बारे में",
    howItWorksNav: "यह कैसे काम करता है",
    pricing: "मूल्य निर्धारण",
    support: "सहायता",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "महत्वपूर्ण कानूनी अस्वीकरण",
    noGuaranteeTitle: "वीज़ा अनुमोदन की कोई गारंटी नहीं:",
    noGuaranteeText: "VisaValidator Pro केवल एक दस्तावेज़ तैयारी सहायता उपकरण है। हम वीज़ा अनुमोदन की गारंटी नहीं देते, किसी भी सरकारी एजेंसी का प्रतिनिधित्व नहीं करते, और दूतावास के निर्णयों को प्रभावित नहीं करते।",
    accuracyLimitationsTitle: "सटीकता की सीमाएं:",
    accuracyLimitationsText: "हालांकि हमारा AI ज्ञात आवश्यकताओं के अनुसार दस्तावेज़ों का विश्लेषण करता है, परिणाम 100% सटीक नहीं हो सकते। दूतावास की आवश्यकताएं अक्सर बदलती रहती हैं और व्यक्तिगत परिस्थितियों के अनुसार भिन्न होती हैं।",
    notOfficialGuidanceTitle: "आधिकारिक मार्गदर्शन नहीं:",
    notOfficialGuidanceText: "यह सेवा आधिकारिक दूतावास वेबसाइटों, वाणिज्य दूतावास की सलाह, या आप्रवासन वकील के साथ परामर्श का विकल्प नहीं है। हमेशा आधिकारिक स्रोतों के साथ वर्तमान आवश्यकताओं को सत्यापित करें।",
    individualResponsibilityTitle: "व्यक्तिगत जिम्मेदारी:",
    individualResponsibilityText: "प्रत्येक यात्री अपने वीज़ा आवेदन की सभी आवश्यकताओं को पूरा करने की पूरी जिम्मेदारी रखता है। वीज़ा अनुमोदन निर्णय केवल दूतावास और वाणिज्य दूतावास के अधिकारियों द्वारा लिए जाते हैं।",
    readFullDisclaimer: "पूर्ण अस्वीकरण और सेवा सीमाएं पढ़ें →",
    
    stepDestination: "गंतव्य",
    stepNationality: "राष्ट्रीयता",
    stepRequirements: "आवश्यकताएं",
    stepUpload: "अपलोड",
    stepInformation: "जानकारी",
    stepReview: "समीक्षा",
    stepPayment: "भुगतान",
    selectDestinationVisa: "गंतव्य और वीजा प्रकार चुनें",
    destinationCountry: "गंतव्य देश",
    selectCountryPlaceholder: "अपना गंतव्य देश चुनें",
    visaType: "वीजा प्रकार",
    selectVisaTypePlaceholder: "वीजा प्रकार चुनें",
    continue: "जारी रखें",
    
    // Visa Types
    tourist: "पर्यटक",
    business: "व्यावसायिक",
    student: "छात्र",
    work: "कार्य",
    transit: "पारगमन",
    family: "पारिवारिक यात्रा",
    
    // Features Section
    whyChoose: "VisaValidator Pro क्यों चुनें",
    securePrivate: "सुरक्षित और निजी",
    securePrivateDesc: "आपकी गोपनीयता और सुरक्षा के लिए सत्यापन के बाद सभी दस्तावेज़ अपने आप हटा दिए जाते हैं।",
    fastProcessing: "तेज़ प्रसंस्करण",
    fastProcessingDesc: "दिनों नहीं, मिनटों में सत्यापन परिणाम प्राप्त करें।",
    comprehensiveAnalysis: "व्यापक विश्लेषण",
    comprehensiveAnalysisDesc: "विस्तृत सिफारिशों और आवश्यकता जांच के साथ AI-संचालित दस्तावेज़ विश्लेषण।",
    
    // How it Works
    howItWorks: "यह कैसे काम करता है",
    step1: "गंतव्य चुनें",
    step1Desc: "अपना गंतव्य देश और वीज़ा प्रकार चुनें",
    step2: "दस्तावेज़ अपलोड करें",
    step2Desc: "अपने वीज़ा आवेदन दस्तावेज़ अपलोड करें",
    step3: "विवरण दर्ज करें",
    step3Desc: "अपनी व्यक्तिगत जानकारी भरें",
    step4: "परिणाम पूर्वावलोकन",
    step4Desc: "भुगतान से पहले सत्यापन पूर्वावलोकन देखें",
    step5: "भुगतान करें और डाउनलोड करें",
    step5Desc: "पूर्ण विस्तृत रिपोर्ट के लिए भुगतान पूरा करें",
    
    // Pricing Section
    simplePricing: "सरल, पारदर्शी मूल्य निर्धारण",
    perValidation: "प्रति सत्यापन",
    completeDocAnalysis: "पूर्ण दस्तावेज़ विश्लेषण",
    detailedValidationReport: "विस्तृत सत्यापन रिपोर्ट",
    recommendationsChecklist: "सिफारिशें और चेकलिस्ट",
    secureHandling: "सुरक्षित दस्तावेज़ प्रबंधन",
    startValidationButton: "सत्यापन शुरू करें",
    
    // Footer and Navigation
    professionalService: "दुनिया भर के यात्रियों के लिए पेशेवर दस्तावेज़ सत्यापन सेवा।",
    service: "सेवा",
    supportedCountries: "समर्थित देश",
    contactUs: "हमसे संपर्क करें",
    legal: "कानूनी",
    disclaimer: "अस्वीकरण",
    dataProtection: "डेटा सुरक्षा",
    copyright: "© 2024 VisaValidator Pro। सभी अधिकार सुरक्षित।",
    
    // Country Selection
    selectCountry: "अपना गंतव्य देश चुनें",
    selectNationality: "अपनी राष्ट्रीयता चुनें",
    selectYourDestination: "अपना गंतव्य चुनें",
    chooseDestinationCountry: "वह देश चुनें जहाँ आप जाने की योजना बना रहे हैं",
    selectYourNationality: "अपनी राष्ट्रीयता चुनें",
    yourNationalityDescription: "व्यक्तिगत वीज़ा आवश्यकताएं प्राप्त करने के लिए अपनी राष्ट्रीयता चुनें",
    popularChoices: "लोकप्रिय विकल्प",
    searchCountries: "देश खोजें...",
    searchNationalities: "राष्ट्रीयताएं खोजें...",
    proceedToValidation: "सत्यापन के लिए आगे बढ़ें",
    
    // Document Upload
    uploadFiles: "दस्तावेज़ अपलोड करें",
    selectFiles: "फ़ाइलें चुनें",
    uploadedFiles: "अपलोड की गई फ़ाइलें",
    noFilesUploaded: "अभी तक कोई फ़ाइल अपलोड नहीं की गई",
    analyzing: "विश्लेषण कर रहे हैं...",
    uploadSuccess: "अपलोड सफल",
    
    // Personal Information
    personalInformation: "व्यक्तिगत जानकारी",
    fullName: "पूरा नाम",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    middleName: "मध्य नाम",
    passportNumber: "पासपोर्ट नंबर",
    dateOfBirth: "जन्म की तारीख",
    nationality: "राष्ट्रीयता",
    plannedTravelDate: "नियोजित यात्रा तिथि",
    durationOfStay: "ठहरने की अवधि (दिन)",
    
    // Validation Results
    validationResults: "सत्यापन परिणाम",
    overallScore: "समग्र स्कोर",
    verifiedItems: "सत्यापित आइटम",
    issuesFound: "मुद्दे मिले",
    recommendations: "सिफारिशें",
    downloadReport: "रिपोर्ट डाउनलोड करें",
    
    // Payment
    payment: "भुगतान",
    paymentDescription: "अपनी पूर्ण सत्यापन रिपोर्ट प्राप्त करने के लिए भुगतान पूरा करें",
    price: "$9.99",
    payNow: "अभी भुगतान करें",
    
    // Additional
    contact: "संपर्क",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें",
    
    // Country Selection
    commonRequirementsFor: "के लिए सामान्य आवश्यकताएं",
    
    // Personal Info Form
    selectNationalityPlaceholder: "अपनी राष्ट्रीयता चुनें",
    daysPlaceholder: "दिनों की संख्या दर्ज करें",
    
    // File Upload
    uploadAnalysisComplete: "अपलोड और विश्लेषण पूर्ण",
    documentsAnalyzedSuccessfully: "दस्तावेज़(ों) का सफलतापूर्वक विश्लेषण किया गया",
    documentsFailed: "असफल",
    uploadFailed: "अपलोड असफल",
    
    // Validation Results
    validationScore: "सत्यापन स्कोर",
    completedOn: "पूर्ण हुआ",
    documentsVerified: "दस्तावेज़ सत्यापित",
    
    // Language Modal
    chooseYourLanguage: "अपनी भाषा चुनें",
    selectPreferredLanguage: "वीज़ा सत्यापन एप्लिकेशन के लिए अपनी पसंदीदा भाषा चुनें",
    continueButton: "जारी रखें",
    
    // Extended Visa Types
    medical: "चिकित्सा",
    conference: "सम्मेलन",
    journalist: "पत्रकार",
    religious: "धार्मिक",
    cultural: "सांस्कृतिक",
    research: "अनुसंधान",
    training: "प्रशिक्षण",
    diplomatic: "राजनयिक",
    crew: "चालक दल",
    investment: "निवेश",
    retirement: "सेवानिवृत्ति",
    volunteer: "स्वयंसेवक",
    sports: "खेल",
    other: "अन्य",
    
    // Document Requirements
    validPassportMinimum: "वैध पासपोर्ट (न्यूनतम 6 महीने की वैधता)",
    ds160ConfirmationPage: "DS-160 पुष्टिकरण पृष्ठ",
    passportStylePhotograph: "पासपोर्ट-शैली फोटोग्राफ",
    financialDocuments: "वित्तीय दस्तावेज़ (बैंक स्टेटमेंट, आय प्रमाण)",
    travelItineraryAccommodation: "यात्रा कार्यक्रम और आवास प्रमाण",
    completedVisaApplication: "पूर्ण वीज़ा आवेदन फॉर्म",
    supportingDocuments: "सहायक दस्तावेज़ (वीज़ा प्रकार के अनुसार भिन्न)",
    
    // Common
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    close: "बंद करें",
    save: "सहेजें",
    cancel: "रद्द करें",
    required: "आवश्यक",
    optional: "वैकल्पिक"
  },
  ar: {
    // Arabic complete translations
    appName: "VisaValidator Pro",
    back: "السابق",
    next: "التالي",
    previous: "السابق",
    homeTitle: "التحقق المهني من وثائق التأشيرة",
    homeSubtitle: "تحقق من وثائق السفر الخاصة بك بتكنولوجيا الذكاء الاصطناعي قبل التقديم",
    startValidation: "بدء التحقق من الوثائق",
    documentValidationService: "خدمة التحقق المهني من الوثائق",
    
    // Navigation
    about: "حول",
    howItWorksNav: "كيف يعمل",
    pricing: "التسعير",
    support: "الدعم",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "إخلاء مسؤولية قانوني مهم",
    noGuaranteeTitle: "لا ضمان لموافقة التأشيرة:",
    noGuaranteeText: "VisaValidator Pro هو مجرد أداة مساعدة لإعداد الوثائق. نحن لا نضمن موافقة التأشيرة، ولا نمثل أي وكالة حكومية، ولا نؤثر على قرارات السفارة.",
    accuracyLimitationsTitle: "قيود الدقة:",
    accuracyLimitationsText: "على الرغم من أن الذكاء الاصطناعي الخاص بنا يحلل الوثائق وفقاً للمتطلبات المعروفة، قد لا تكون النتائج دقيقة بنسبة 100%. متطلبات السفارة تتغير بشكل متكرر وتختلف حسب الظروف الفردية.",
    notOfficialGuidanceTitle: "ليس إرشاداً رسمياً:",
    notOfficialGuidanceText: "هذه الخدمة لا تحل محل المواقع الرسمية للسفارات، أو المشورة الق領事، أو التشاور مع محامي الهجرة. تحقق دائماً من المتطلبات الحالية مع المصادر الرسمية.",
    individualResponsibilityTitle: "المسؤولية الفردية:",
    individualResponsibilityText: "كل مسافر يتحمل المسؤولية الكاملة لضمان أن طلب التأشيرة الخاص به يلبي جميع المتطلبات. قرارات موافقة التأشيرة تُتخذ فقط من قبل مسؤولي السفارات والقنصليات.",
    readFullDisclaimer: "اقرأ إخلاء المسؤولية الكامل وقيود الخدمة →",
    
    stepDestination: "الوجهة",
    stepNationality: "الجنسية",
    stepRequirements: "المتطلبات",
    stepUpload: "رفع",
    stepInformation: "المعلومات",
    stepReview: "مراجعة",
    stepPayment: "الدفع",
    selectDestinationVisa: "اختر الوجهة ونوع التأشيرة",
    destinationCountry: "دولة المقصد",
    selectCountryPlaceholder: "اختر دولة الوجهة",
    visaType: "نوع التأشيرة",
    selectVisaTypePlaceholder: "اختر نوع التأشيرة",
    continue: "متابعة",
    
    // Visa Types
    tourist: "سياحي",
    business: "أعمال",
    student: "طالب",
    work: "عمل",
    transit: "عبور",
    family: "زيارة عائلية",
    
    // Features Section
    whyChoose: "لماذا تختار VisaValidator Pro",
    securePrivate: "آمن وخاص",
    securePrivateDesc: "يتم حذف جميع المستندات تلقائياً بعد التحقق لضمان خصوصيتك وأمانك.",
    fastProcessing: "معالجة سريعة",
    fastProcessingDesc: "احصل على نتائج التحقق في دقائق، وليس أيام.",
    comprehensiveAnalysis: "تحليل شامل",
    comprehensiveAnalysisDesc: "تحليل مستندات مدعوم بالذكاء الاصطناعي مع توصيات مفصلة وفحص المتطلبات.",
    
    // How it Works
    howItWorks: "كيف يعمل",
    step1: "اختر الوجهة",
    step1Desc: "اختر بلد الوجهة ونوع التأشيرة",
    step2: "ارفع المستندات",
    step2Desc: "ارفع مستندات طلب التأشيرة الخاصة بك",
    step3: "أدخل التفاصيل",
    step3Desc: "املأ معلوماتك الشخصية",
    step4: "معاينة النتائج",
    step4Desc: "اطلع على معاينة التحقق قبل الدفع",
    step5: "ادفع وحمّل",
    step5Desc: "أكمل الدفع للحصول على التقرير المفصل الكامل",
    
    // Pricing Section
    simplePricing: "تسعير بسيط وشفاف",
    perValidation: "لكل تحقق",
    completeDocAnalysis: "تحليل كامل للمستندات",
    detailedValidationReport: "تقرير تحقق مفصل",
    recommendationsChecklist: "توصيات وقائمة مراجعة",
    secureHandling: "معالجة آمنة للمستندات",
    startValidationButton: "بدء التحقق",
    
    // Footer and Navigation
    professionalService: "خدمة تحقق مستندات احترافية للمسافرين حول العالم.",
    service: "الخدمة",
    supportedCountries: "البلدان المدعومة",
    contactUs: "اتصل بنا",
    legal: "قانوني",
    disclaimer: "إخلاء المسؤولية",
    dataProtection: "حماية البيانات",
    copyright: "© 2024 VisaValidator Pro. جميع الحقوق محفوظة.",
    
    // Country Selection
    selectCountry: "اختر بلد الوجهة",
    selectNationality: "اختر جنسيتك",
    selectYourDestination: "اختر وجهتك",
    chooseDestinationCountry: "اختر البلد الذي تخطط لزيارته",
    selectYourNationality: "اختر جنسيتك",
    yourNationalityDescription: "اختر جنسيتك للحصول على متطلبات التأشيرة الشخصية",
    popularChoices: "الخيارات الشائعة",
    searchCountries: "البحث في البلدان...",
    searchNationalities: "البحث في الجنسيات...",
    proceedToValidation: "المتابعة إلى التحقق",
    
    // Document Upload
    uploadFiles: "رفع المستندات",
    selectFiles: "اختر الملفات",
    uploadedFiles: "الملفات المرفوعة",
    noFilesUploaded: "لم يتم رفع أي ملفات بعد",
    analyzing: "جاري التحليل...",
    uploadSuccess: "تم الرفع بنجاح",
    
    // Personal Information
    personalInformation: "المعلومات الشخصية",
    fullName: "الاسم الكامل",
    firstName: "الاسم الأول",
    lastName: "الاسم الأخير",
    middleName: "الاسم الأوسط",
    passportNumber: "رقم جواز السفر",
    dateOfBirth: "تاريخ الميلاد",
    nationality: "الجنسية",
    plannedTravelDate: "تاريخ السفر المخطط",
    durationOfStay: "مدة الإقامة (أيام)",
    
    // Validation Results
    validationResults: "نتائج التحقق",
    overallScore: "النتيجة الإجمالية",
    verifiedItems: "العناصر المتحققة",
    issuesFound: "المشاكل الموجودة",
    recommendations: "التوصيات",
    downloadReport: "تحميل التقرير",
    
    // Payment
    payment: "الدفع",
    paymentDescription: "أكمل الدفع لتلقي تقرير التحقق الكامل",
    price: "$9.99",
    payNow: "ادفع الآن",
    
    // Additional
    contact: "اتصال",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    
    // Country Selection
    commonRequirementsFor: "المتطلبات الشائعة لـ",
    
    // Personal Info Form
    selectNationalityPlaceholder: "اختر جنسيتك",
    daysPlaceholder: "أدخل عدد الأيام",
    
    // File Upload
    uploadAnalysisComplete: "اكتمل الرفع والتحليل",
    documentsAnalyzedSuccessfully: "تم تحليل المستند(ات) بنجاح",
    documentsFailed: "فشل",
    uploadFailed: "فشل الرفع",
    
    // Validation Results
    validationScore: "نتيجة التحقق",
    completedOn: "اكتمل في",
    documentsVerified: "المستندات المتحققة",
    
    // Language Modal
    chooseYourLanguage: "اختر لغتك",
    selectPreferredLanguage: "اختر لغتك المفضلة لتطبيق تحقق التأشيرة",
    continueButton: "متابعة",
    
    // Extended Visa Types
    medical: "طبي",
    conference: "مؤتمر",
    journalist: "صحفي",
    religious: "ديني",
    cultural: "ثقافي",
    research: "بحث",
    training: "تدريب",
    diplomatic: "دبلوماسي",
    crew: "طاقم",
    investment: "استثمار",
    retirement: "تقاعد",
    volunteer: "تطوع",
    sports: "رياضة",
    other: "أخرى",
    
    // Document Requirements
    validPassportMinimum: "جواز سفر صالح (صالح لمدة 6 أشهر على الأقل)",
    ds160ConfirmationPage: "صفحة تأكيد DS-160",
    passportStylePhotograph: "صورة بطراز جواز السفر",
    financialDocuments: "المستندات المالية (كشوف بنكية، إثبات دخل)",
    travelItineraryAccommodation: "خط سير السفر وإثبات الإقامة",
    completedVisaApplication: "نموذج طلب التأشيرة المكتمل",
    supportingDocuments: "المستندات الداعمة (تختلف حسب نوع التأشيرة)",
    
    // Common
    loading: "جارٍ التحميل...",
    error: "خطأ",
    success: "نجح",
    close: "إغلاق",
    save: "حفظ",
    cancel: "إلغاء",
    required: "مطلوب",
    optional: "اختياري"
  },
  ru: {
    // Russian complete translations
    appName: "VisaValidator Pro",
    back: "Назад",
    next: "Далее",
    previous: "Предыдущий",
    homeTitle: "Профессиональная проверка визовых документов",
    homeSubtitle: "Проверьте свои путевые документы с помощью ИИ-технологий перед подачей заявления",
    startValidation: "Начать проверку документов",
    documentValidationService: "Профессиональная служба проверки документов",
    
    // Navigation
    about: "О нас",
    howItWorksNav: "Как это работает",
    pricing: "Цены",
    support: "Поддержка",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "КРИТИЧЕСКОЕ ПРАВОВОЕ УВЕДОМЛЕНИЕ",
    noGuaranteeTitle: "НЕТ ГАРАНТИИ ОДОБРЕНИЯ ВИЗЫ:",
    noGuaranteeText: "VisaValidator Pro - это лишь инструмент помощи в подготовке документов. Мы не гарантируем одобрение визы, не представляем какие-либо государственные агентства и не влияем на решения посольства.",
    accuracyLimitationsTitle: "ОГРАНИЧЕНИЯ ТОЧНОСТИ:",
    accuracyLimitationsText: "Хотя наш ИИ анализирует документы согласно известным требованиям, результаты могут быть не на 100% точными. Требования посольств часто меняются и варьируются в зависимости от индивидуальных обстоятельств.",
    notOfficialGuidanceTitle: "НЕ ОФИЦИАЛЬНОЕ РУКОВОДСТВО:",
    notOfficialGuidanceText: "Эта служба не заменяет официальные веб-сайты посольств, консульские советы или консультации с иммиграционным адвокатом. Всегда проверяйте текущие требования через официальные источники.",
    individualResponsibilityTitle: "ИНДИВИДУАЛЬНАЯ ОТВЕТСТВЕННОСТЬ:",
    individualResponsibilityText: "Каждый путешественник несет полную ответственность за обеспечение соответствия своего визового заявления всем требованиям. Решения об одобрении визы принимаются исключительно должностными лицами посольств и консульств.",
    readFullDisclaimer: "Читать полное уведомление и ограничения службы →",
    
    stepDestination: "Назначение",
    stepNationality: "Национальность",
    stepRequirements: "Требования",
    stepUpload: "Загрузить",
    stepInformation: "Информация",
    stepReview: "Обзор",
    stepPayment: "Оплата",
    selectDestinationVisa: "Выберите направление и тип визы",
    destinationCountry: "Страна назначения",
    selectCountryPlaceholder: "Выберите страну назначения",
    visaType: "Тип визы",
    selectVisaTypePlaceholder: "Выберите тип визы",
    continue: "Продолжить",
    
    // Visa Types
    tourist: "Туристическая",
    business: "Деловая",
    student: "Студенческая",
    work: "Рабочая",
    transit: "Транзитная",
    family: "Семейная поездка",
    
    // Features Section
    whyChoose: "Почему выбирают VisaValidator Pro",
    securePrivate: "Безопасно и конфиденциально",
    securePrivateDesc: "Все документы автоматически удаляются после проверки для вашей конфиденциальности и безопасности.",
    fastProcessing: "Быстрая обработка",
    fastProcessingDesc: "Получите результаты проверки за минуты, а не дни.",
    comprehensiveAnalysis: "Комплексный анализ",
    comprehensiveAnalysisDesc: "Анализ документов с помощью ИИ с подробными рекомендациями и проверкой требований.",
    
    // How it Works
    howItWorks: "Как это работает",
    step1: "Выберите пункт назначения",
    step1Desc: "Выберите страну назначения и тип визы",
    step2: "Загрузите документы",
    step2Desc: "Загрузите документы для визового заявления",
    step3: "Введите данные",
    step3Desc: "Заполните вашу личную информацию",
    step4: "Предварительный просмотр результатов",
    step4Desc: "Посмотрите предварительные результаты проверки перед оплатой",
    step5: "Оплатите и скачайте",
    step5Desc: "Завершите оплату для получения полного подробного отчета",
    
    // Pricing Section
    simplePricing: "Простое, прозрачное ценообразование",
    perValidation: "За проверку",
    completeDocAnalysis: "Полный анализ документов",
    detailedValidationReport: "Подробный отчет о проверке",
    recommendationsChecklist: "Рекомендации и контрольный список",
    secureHandling: "Безопасная обработка документов",
    startValidationButton: "Начать проверку",
    
    // Footer and Navigation
    professionalService: "Профессиональная служба проверки документов для путешественников по всему миру.",
    service: "Служба",
    supportedCountries: "Поддерживаемые страны",
    contactUs: "Свяжитесь с нами",
    legal: "Правовая информация",
    disclaimer: "Отказ от ответственности",
    dataProtection: "Защита данных",
    copyright: "© 2024 VisaValidator Pro. Все права защищены.",
    
    // Country Selection
    selectCountry: "Выберите страну назначения",
    selectNationality: "Выберите ваше гражданство",
    selectYourDestination: "Выберите вашу цель",
    chooseDestinationCountry: "Выберите страну, которую планируете посетить",
    selectYourNationality: "Выберите ваше гражданство",
    yourNationalityDescription: "Выберите ваше гражданство для получения персональных визовых требований",
    popularChoices: "Популярные варианты",
    searchCountries: "Поиск стран...",
    searchNationalities: "Поиск гражданств...",
    proceedToValidation: "Перейти к проверке",
    
    // Document Upload
    uploadFiles: "Загрузить документы",
    selectFiles: "Выбрать файлы",
    uploadedFiles: "Загруженные файлы",
    noFilesUploaded: "Файлы еще не загружены",
    analyzing: "Анализирую...",
    uploadSuccess: "Загрузка успешна",
    
    // Personal Information
    personalInformation: "Личная информация",
    fullName: "Полное имя",
    firstName: "Имя",
    lastName: "Фамилия",
    middleName: "Отчество",
    passportNumber: "Номер паспорта",
    dateOfBirth: "Дата рождения",
    nationality: "Гражданство",
    plannedTravelDate: "Планируемая дата поездки",
    durationOfStay: "Продолжительность пребывания (дни)",
    
    // Validation Results
    validationResults: "Результаты проверки",
    overallScore: "Общий балл",
    verifiedItems: "Проверенные элементы",
    issuesFound: "Найденные проблемы",
    recommendations: "Рекомендации",
    downloadReport: "Скачать отчет",
    
    // Payment
    payment: "Оплата",
    paymentDescription: "Завершите оплату для получения полного отчета о проверке",
    price: "$9.99",
    payNow: "Оплатить сейчас",
    
    // Additional
    contact: "Контакт",
    privacy: "Политика конфиденциальности",
    terms: "Условия обслуживания",
    
    // Country Selection
    commonRequirementsFor: "Общие требования для",
    
    // Personal Info Form
    selectNationalityPlaceholder: "Выберите ваше гражданство",
    daysPlaceholder: "Введите количество дней",
    
    // File Upload
    uploadAnalysisComplete: "Загрузка и анализ завершены",
    documentsAnalyzedSuccessfully: "документ(ы) успешно проанализированы",
    documentsFailed: "не удалось",
    uploadFailed: "Загрузка не удалась",
    
    // Validation Results
    validationScore: "Балл проверки",
    completedOn: "Завершено",
    documentsVerified: "Документы проверены",
    
    // Language Modal
    chooseYourLanguage: "Выберите ваш язык",
    selectPreferredLanguage: "Выберите предпочитаемый язык для приложения проверки визы",
    continueButton: "Продолжить",
    
    // Extended Visa Types
    medical: "Медицинская",
    conference: "Конференция",
    journalist: "Журналистская",
    religious: "Религиозная",
    cultural: "Культурная",
    research: "Исследовательская",
    training: "Обучение",
    diplomatic: "Дипломатическая",
    crew: "Экипаж",
    investment: "Инвестиционная",
    retirement: "Пенсионная",
    volunteer: "Волонтерская",
    sports: "Спортивная",
    other: "Другая",
    
    // Document Requirements
    validPassportMinimum: "Действительный паспорт (минимум 6 месяцев действия)",
    ds160ConfirmationPage: "Страница подтверждения DS-160",
    passportStylePhotograph: "Фотография в стиле паспорта",
    financialDocuments: "Финансовые документы (банковские выписки, справка о доходах)",
    travelItineraryAccommodation: "Маршрут поездки и подтверждение размещения",
    completedVisaApplication: "Заполненная анкета на визу",
    supportingDocuments: "Сопроводительные документы (варьируются в зависимости от типа визы)",
    
    // Common
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успех",
    close: "Закрыть",
    save: "Сохранить",
    cancel: "Отмена",
    required: "Обязательно",
    optional: "Необязательно"
  },
  pt: {
    // Portuguese complete translations
    appName: "VisaValidator Pro",
    back: "Voltar",
    next: "Próximo",
    previous: "Anterior",
    homeTitle: "Validação Profissional de Documentos de Visto",
    homeSubtitle: "Verifique seus documentos de viagem com tecnologia IA antes de solicitar",
    startValidation: "Iniciar Validação de Documentos",
    documentValidationService: "Serviço Profissional de Validação de Documentos",
    
    // Navigation
    about: "Sobre",
    howItWorksNav: "Como Funciona",
    pricing: "Preços",
    support: "Suporte",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "AVISO LEGAL CRÍTICO",
    noGuaranteeTitle: "NENHUMA GARANTIA DE APROVAÇÃO DE VISTO:",
    noGuaranteeText: "VisaValidator Pro é apenas uma ferramenta de auxílio na preparação de documentos. Não garantimos aprovação de visto, não representamos qualquer agência governamental, nem influenciamos decisões de embaixadas.",
    accuracyLimitationsTitle: "LIMITAÇÕES DE PRECISÃO:",
    accuracyLimitationsText: "Embora nossa IA analise documentos de acordo com requisitos conhecidos, os resultados podem não ser 100% precisos. Os requisitos de embaixadas mudam frequentemente e variam conforme circunstâncias individuais.",
    notOfficialGuidanceTitle: "NÃO É ORIENTAÇÃO OFICIAL:",
    notOfficialGuidanceText: "Este serviço não substitui sites oficiais de embaixadas, conselhos consulares ou consulta com advogado de imigração. Sempre verifique requisitos atuais com fontes oficiais.",
    individualResponsibilityTitle: "RESPONSABILIDADE INDIVIDUAL:",
    individualResponsibilityText: "Cada viajante tem total responsabilidade por garantir que sua solicitação de visto atenda a todos os requisitos. Decisões de aprovação de visto são tomadas exclusivamente por funcionários de embaixadas e consulados.",
    readFullDisclaimer: "Ler aviso completo e limitações do serviço →",
    
    stepDestination: "Destino",
    stepNationality: "Nacionalidade",
    stepRequirements: "Requisitos",
    stepUpload: "Carregar",
    stepInformation: "Informações",
    stepReview: "Revisão",
    stepPayment: "Pagamento",
    selectDestinationVisa: "Selecionar Destino e Tipo de Visto",
    destinationCountry: "País de Destino",
    selectCountryPlaceholder: "Escolha seu país de destino",
    visaType: "Tipo de Visto",
    selectVisaTypePlaceholder: "Selecionar tipo de visto",
    continue: "Continuar",
    
    // Visa Types
    tourist: "Turista",
    business: "Negócios",
    student: "Estudante",
    work: "Trabalho",
    transit: "Trânsito",
    family: "Visita Familiar",
    
    // Features Section
    whyChoose: "Por que escolher VisaValidator Pro",
    securePrivate: "Seguro e Privado",
    securePrivateDesc: "Todos os documentos são automaticamente excluídos após a validação para sua privacidade e segurança.",
    fastProcessing: "Processamento Rápido",
    fastProcessingDesc: "Obtenha resultados de validação em minutos, não dias.",
    comprehensiveAnalysis: "Análise Abrangente",
    comprehensiveAnalysisDesc: "Análise de documentos com IA com recomendações detalhadas e verificação de requisitos.",
    
    // How it Works
    howItWorks: "Como Funciona",
    step1: "Selecionar Destino",
    step1Desc: "Escolha seu país de destino e tipo de visto",
    step2: "Carregar Documentos",
    step2Desc: "Faça upload dos documentos de aplicação de visto",
    step3: "Inserir Detalhes",
    step3Desc: "Preencha suas informações pessoais",
    step4: "Visualizar Resultados",
    step4Desc: "Veja a prévia da validação antes do pagamento",
    step5: "Pagar e Baixar",
    step5Desc: "Complete o pagamento para relatório detalhado completo",
    
    // Pricing Section
    simplePricing: "Preços Simples e Transparentes",
    perValidation: "Por validação",
    completeDocAnalysis: "Análise completa de documentos",
    detailedValidationReport: "Relatório detalhado de validação",
    recommendationsChecklist: "Recomendações e checklist",
    secureHandling: "Manuseio seguro de documentos",
    startValidationButton: "Iniciar Validação",
    
    // Footer and Navigation
    professionalService: "Serviço profissional de validação de documentos para viajantes em todo o mundo.",
    service: "Serviço",
    supportedCountries: "Países Suportados",
    contactUs: "Entre em Contato",
    legal: "Legal",
    disclaimer: "Isenção de Responsabilidade",
    dataProtection: "Proteção de Dados",
    copyright: "© 2024 VisaValidator Pro. Todos os direitos reservados.",
    
    // Country Selection
    selectCountry: "Selecione seu país de destino",
    selectNationality: "Selecione sua nacionalidade",
    selectYourDestination: "Selecione Seu Destino",
    chooseDestinationCountry: "Escolha o país que planeja visitar",
    selectYourNationality: "Selecione Sua Nacionalidade",
    yourNationalityDescription: "Escolha sua nacionalidade para obter requisitos de visto personalizados",
    popularChoices: "Escolhas Populares",
    searchCountries: "Buscar países...",
    searchNationalities: "Buscar nacionalidades...",
    proceedToValidation: "Prosseguir para Validação",
    
    // Document Upload
    uploadFiles: "Carregar Documentos",
    selectFiles: "Selecionar Arquivos",
    uploadedFiles: "Arquivos Carregados",
    noFilesUploaded: "Nenhum arquivo carregado ainda",
    analyzing: "Analisando...",
    uploadSuccess: "Upload bem-sucedido",
    
    // Personal Information
    personalInformation: "Informações Pessoais",
    fullName: "Nome Completo",
    firstName: "Primeiro Nome",
    lastName: "Sobrenome",
    middleName: "Nome do Meio",
    passportNumber: "Número do Passaporte",
    dateOfBirth: "Data de Nascimento",
    nationality: "Nacionalidade",
    plannedTravelDate: "Data de Viagem Planejada",
    durationOfStay: "Duração da Estadia (dias)",
    
    // Validation Results
    validationResults: "Resultados da Validação",
    overallScore: "Pontuação Geral",
    verifiedItems: "Itens Verificados",
    issuesFound: "Problemas Encontrados",
    recommendations: "Recomendações",
    downloadReport: "Baixar Relatório",
    
    // Payment
    payment: "Pagamento",
    paymentDescription: "Complete o pagamento para receber seu relatório de validação completo",
    price: "$9.99",
    payNow: "Pagar Agora",
    
    // Additional
    contact: "Contato",
    privacy: "Política de Privacidade",
    terms: "Termos de Serviço",
    
    // Country Selection
    commonRequirementsFor: "Requisitos comuns para",
    
    // Personal Info Form
    selectNationalityPlaceholder: "Selecione sua nacionalidade",
    daysPlaceholder: "Digite o número de dias",
    
    // File Upload
    uploadAnalysisComplete: "Upload e Análise Completos",
    documentsAnalyzedSuccessfully: "documento(s) analisados com sucesso",
    documentsFailed: "falharam",
    uploadFailed: "Upload falhou",
    
    // Validation Results
    validationScore: "Pontuação de Validação",
    completedOn: "Concluído em",
    documentsVerified: "Documentos Verificados",
    
    // Language Modal
    chooseYourLanguage: "Escolha Seu Idioma",
    selectPreferredLanguage: "Selecione seu idioma preferido para a aplicação de validação de visto",
    continueButton: "Continuar",
    
    // Extended Visa Types
    medical: "Médico",
    conference: "Conferência",
    journalist: "Jornalista",
    religious: "Religioso",
    cultural: "Cultural",
    research: "Pesquisa",
    training: "Treinamento",
    diplomatic: "Diplomático",
    crew: "Tripulação",
    investment: "Investimento",
    retirement: "Aposentadoria",
    volunteer: "Voluntário",
    sports: "Esportes",
    other: "Outro",
    
    // Document Requirements
    validPassportMinimum: "Passaporte válido (validade mínima de 6 meses)",
    ds160ConfirmationPage: "Página de confirmação DS-160",
    passportStylePhotograph: "Fotografia estilo passaporte",
    financialDocuments: "Documentos financeiros (extratos bancários, comprovante de renda)",
    travelItineraryAccommodation: "Itinerário de viagem e comprovante de acomodação",
    completedVisaApplication: "Formulário de aplicação de visto preenchido",
    supportingDocuments: "Documentos de apoio (varia por tipo de visto)",
    
    // Common
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
    close: "Fechar",
    save: "Salvar",
    cancel: "Cancelar",
    required: "Obrigatório",
    optional: "Opcional"
  },
  de: {
    // German complete translations
    appName: "VisaValidator Pro",
    back: "Zurück",
    next: "Weiter",
    previous: "Vorherige",
    homeTitle: "Professionelle Visa-Dokumentenvalidierung",
    homeSubtitle: "Überprüfen Sie Ihre Reisedokumente mit KI-Technologie vor der Beantragung",
    startValidation: "Dokumentenvalidierung starten",
    documentValidationService: "Professioneller Dokumentenvalidierungsservice",
    
    // Navigation
    about: "Über uns",
    howItWorksNav: "Wie es funktioniert",
    pricing: "Preise",
    support: "Support",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "WICHTIGER RECHTLICHER HAFTUNGSAUSSCHLUSS",
    noGuaranteeTitle: "KEINE GARANTIE FÜR VISA-GENEHMIGUNG:",
    noGuaranteeText: "VisaValidator Pro ist nur ein Hilfswerkzeug zur Dokumentenvorbereitung. Wir garantieren keine Visa-Genehmigung, vertreten keine Regierungsbehörden und beeinflussen keine Botschaftsentscheidungen.",
    accuracyLimitationsTitle: "GENAUIGKEITSBESCHRÄNKUNGEN:",
    accuracyLimitationsText: "Obwohl unsere KI Dokumente nach bekannten Anforderungen analysiert, können die Ergebnisse nicht 100% genau sein. Botschaftsanforderungen ändern sich häufig und variieren je nach individuellen Umständen.",
    notOfficialGuidanceTitle: "KEINE OFFIZIELLE BERATUNG:",
    notOfficialGuidanceText: "Dieser Service ersetzt nicht offizielle Botschaftswebsites, konsularische Beratung oder Beratung durch einen Einwanderungsanwalt. Überprüfen Sie immer aktuelle Anforderungen bei offiziellen Quellen.",
    individualResponsibilityTitle: "INDIVIDUELLE VERANTWORTUNG:",
    individualResponsibilityText: "Jeder Reisende trägt die volle Verantwortung dafür, dass sein Visa-Antrag alle Anforderungen erfüllt. Visa-Genehmigungsentscheidungen werden ausschließlich von Botschafts- und Konsulatsbeamten getroffen.",
    readFullDisclaimer: "Vollständigen Haftungsausschluss und Service-Beschränkungen lesen →",
    
    stepDestination: "Ziel",
    stepNationality: "Staatsangehörigkeit",
    stepRequirements: "Anforderungen",
    stepUpload: "Hochladen",
    stepInformation: "Informationen",
    stepReview: "Überprüfung",
    stepPayment: "Zahlung",
    selectDestinationVisa: "Ziel und Visum-Typ auswählen",
    destinationCountry: "Zielland",
    selectCountryPlaceholder: "Wählen Sie Ihr Zielland",
    visaType: "Visum-Typ",
    selectVisaTypePlaceholder: "Visum-Typ auswählen",
    continue: "Fortfahren",
    
    // Visa Types
    tourist: "Tourist",
    business: "Geschäftlich",
    student: "Student",
    work: "Arbeit",
    transit: "Transit",
    family: "Familienbesuch",
    
    // Features Section
    whyChoose: "Warum VisaValidator Pro wählen",
    securePrivate: "Sicher und Privat",
    securePrivateDesc: "Alle Dokumente werden nach der Validierung automatisch gelöscht für Ihre Privatsphäre und Sicherheit.",
    fastProcessing: "Schnelle Verarbeitung",
    fastProcessingDesc: "Erhalten Sie Validierungsergebnisse in Minuten, nicht Tagen.",
    comprehensiveAnalysis: "Umfassende Analyse",
    comprehensiveAnalysisDesc: "KI-gestützte Dokumentenanalyse mit detaillierten Empfehlungen und Anforderungsprüfung.",
    
    // How it Works
    howItWorks: "Wie es funktioniert",
    step1: "Ziel auswählen",
    step1Desc: "Wählen Sie Ihr Zielland und Ihren Visa-Typ",
    step2: "Dokumente hochladen",
    step2Desc: "Laden Sie Ihre Visa-Antragsdokumente hoch",
    step3: "Details eingeben",
    step3Desc: "Füllen Sie Ihre persönlichen Informationen aus",
    step4: "Ergebnisse vorschau",
    step4Desc: "Sehen Sie die Validierungsvorschau vor der Zahlung",
    step5: "Bezahlen und Herunterladen",
    step5Desc: "Schließen Sie die Zahlung für den vollständigen detaillierten Bericht ab",
    
    // Pricing Section
    simplePricing: "Einfache, transparente Preisgestaltung",
    perValidation: "Pro Validierung",
    completeDocAnalysis: "Vollständige Dokumentenanalyse",
    detailedValidationReport: "Detaillierter Validierungsbericht",
    recommendationsChecklist: "Empfehlungen und Checkliste",
    secureHandling: "Sichere Dokumentenbehandlung",
    startValidationButton: "Validierung starten",
    
    // Footer and Navigation
    professionalService: "Professioneller Dokumentenvalidierungsservice für Reisende weltweit.",
    service: "Service",
    supportedCountries: "Unterstützte Länder",
    contactUs: "Kontaktieren Sie uns",
    legal: "Rechtliches",
    disclaimer: "Haftungsausschluss",
    dataProtection: "Datenschutz",
    copyright: "© 2024 VisaValidator Pro. Alle Rechte vorbehalten.",
    
    // Country Selection
    selectCountry: "Wählen Sie Ihr Zielland",
    selectNationality: "Wählen Sie Ihre Nationalität",
    selectYourDestination: "Wählen Sie Ihr Ziel",
    chooseDestinationCountry: "Wählen Sie das Land, das Sie besuchen möchten",
    selectYourNationality: "Wählen Sie Ihre Nationalität",
    yourNationalityDescription: "Wählen Sie Ihre Nationalität für personalisierte Visa-Anforderungen",
    popularChoices: "Beliebte Optionen",
    searchCountries: "Länder suchen...",
    searchNationalities: "Nationalitäten suchen...",
    proceedToValidation: "Zur Validierung fortfahren",
    
    // Document Upload
    uploadFiles: "Dokumente hochladen",
    selectFiles: "Dateien auswählen",
    uploadedFiles: "Hochgeladene Dateien",
    noFilesUploaded: "Noch keine Dateien hochgeladen",
    analyzing: "Analysiere...",
    uploadSuccess: "Upload erfolgreich",
    
    // Personal Information
    personalInformation: "Persönliche Informationen",
    fullName: "Vollständiger Name",
    firstName: "Vorname",
    lastName: "Nachname",
    middleName: "Zweiter Vorname",
    passportNumber: "Passnummer",
    dateOfBirth: "Geburtsdatum",
    nationality: "Nationalität",
    plannedTravelDate: "Geplantes Reisedatum",
    durationOfStay: "Aufenthaltsdauer (Tage)",
    
    // Validation Results
    validationResults: "Validierungsergebnisse",
    overallScore: "Gesamtpunktzahl",
    verifiedItems: "Verifizierte Elemente",
    issuesFound: "Gefundene Probleme",
    recommendations: "Empfehlungen",
    downloadReport: "Bericht herunterladen",
    
    // Payment
    payment: "Zahlung",
    paymentDescription: "Schließen Sie die Zahlung ab, um Ihren vollständigen Validierungsbericht zu erhalten",
    price: "$9.99",
    payNow: "Jetzt bezahlen",
    
    // Additional
    contact: "Kontakt",
    privacy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen",
    
    // Country Selection
    commonRequirementsFor: "Allgemeine Anforderungen für",
    
    // Personal Info Form
    selectNationalityPlaceholder: "Wählen Sie Ihre Nationalität",
    daysPlaceholder: "Anzahl der Tage eingeben",
    
    // File Upload
    uploadAnalysisComplete: "Upload und Analyse abgeschlossen",
    documentsAnalyzedSuccessfully: "Dokument(e) erfolgreich analysiert",
    documentsFailed: "fehlgeschlagen",
    uploadFailed: "Upload fehlgeschlagen",
    
    // Validation Results
    validationScore: "Validierungspunktzahl",
    completedOn: "Abgeschlossen am",
    documentsVerified: "Dokumente verifiziert",
    
    // Language Modal
    chooseYourLanguage: "Wählen Sie Ihre Sprache",
    selectPreferredLanguage: "Wählen Sie Ihre bevorzugte Sprache für die Visa-Validierungsanwendung",
    continueButton: "Weiter",
    
    // Extended Visa Types
    medical: "Medizinisch",
    conference: "Konferenz",
    journalist: "Journalist",
    religious: "Religiös",
    cultural: "Kulturell",
    research: "Forschung",
    training: "Ausbildung",
    diplomatic: "Diplomatisch",
    crew: "Besatzung",
    investment: "Investition",
    retirement: "Ruhestand",
    volunteer: "Freiwillig",
    sports: "Sport",
    other: "Andere",
    
    // Document Requirements
    validPassportMinimum: "Gültiger Reisepass (mindestens 6 Monate gültig)",
    ds160ConfirmationPage: "DS-160 Bestätigungsseite",
    passportStylePhotograph: "Passfoto",
    financialDocuments: "Finanzdokumente (Kontoauszüge, Einkommensnachweis)",
    travelItineraryAccommodation: "Reiseverlauf und Unterkunftsnachweis",
    completedVisaApplication: "Ausgefülltes Visa-Antragsformular",
    supportingDocuments: "Unterstützende Dokumente (variiert je nach Visa-Typ)",
    
    // Common
    loading: "Laden...",
    error: "Fehler",
    success: "Erfolg",
    close: "Schließen",
    save: "Speichern",
    cancel: "Abbrechen",
    required: "Erforderlich",
    optional: "Optional"
  },
  ja: {
    // Japanese complete translations
    appName: "VisaValidator Pro",
    back: "戻る",
    next: "次へ",
    previous: "前へ",
    homeTitle: "プロフェッショナルビザ書類検証",
    homeSubtitle: "申請前にAI技術で旅行書類を検証します",
    startValidation: "書類検証を開始",
    documentValidationService: "プロフェッショナル書類検証サービス",
    
    // Navigation
    about: "について",
    howItWorksNav: "仕組み",
    pricing: "料金",
    support: "サポート",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "重要な法的免責事項",
    noGuaranteeTitle: "ビザ承認の保証なし：",
    noGuaranteeText: "VisaValidator Proは書類準備支援ツールに過ぎません。ビザ承認を保証せず、政府機関を代表せず、大使館の決定に影響を与えません。",
    accuracyLimitationsTitle: "精度の制限：",
    accuracyLimitationsText: "AIは既知の要件に従って書類を分析しますが、結果が100%正確とは限りません。大使館の要件は頻繁に変更され、個別の状況により異なります。",
    notOfficialGuidanceTitle: "公式ガイダンスではありません：",
    notOfficialGuidanceText: "このサービスは公式大使館ウェブサイト、領事アドバイス、入国管理弁護士との相談に代わるものではありません。常に公式情報源で最新の要件を確認してください。",
    individualResponsibilityTitle: "個人責任：",
    individualResponsibilityText: "各旅行者はビザ申請がすべての要件を満たすことを確保する完全な責任を負います。ビザ承認の決定は大使館・領事館職員のみが行います。",
    readFullDisclaimer: "完全な免責事項とサービス制限を読む →",
    
    stepDestination: "目的地",
    stepNationality: "国籍",
    stepRequirements: "要件",
    stepUpload: "アップロード",
    stepInformation: "情報",
    stepReview: "レビュー",
    stepPayment: "支払い",
    selectDestinationVisa: "目的地とビザタイプを選択",
    destinationCountry: "目的地の国",
    selectCountryPlaceholder: "目的地の国を選択してください",
    visaType: "ビザタイプ",
    selectVisaTypePlaceholder: "ビザタイプを選択",
    continue: "続行",
    
    // Visa Types
    tourist: "観光",
    business: "ビジネス",
    student: "学生",
    work: "就労",
    transit: "通過",
    family: "家族訪問",
    
    // Features Section
    whyChoose: "VisaValidator Proを選ぶ理由",
    securePrivate: "安全でプライベート",
    securePrivateDesc: "プライバシーとセキュリティのため、検証後すべての文書が自動的に削除されます。",
    fastProcessing: "高速処理",
    fastProcessingDesc: "日数ではなく、分で検証結果を取得。",
    comprehensiveAnalysis: "包括的分析",
    comprehensiveAnalysisDesc: "詳細な推奨事項と要件チェックを含むAI搭載文書分析。",
    
    // How it Works
    howItWorks: "仕組み",
    step1: "目的地を選択",
    step1Desc: "目的地の国とビザの種類を選択",
    step2: "書類をアップロード",
    step2Desc: "ビザ申請書類をアップロード",
    step3: "詳細を入力",
    step3Desc: "個人情報を入力",
    step4: "結果をプレビュー",
    step4Desc: "支払い前に検証プレビューを確認",
    step5: "支払いとダウンロード",
    step5Desc: "完全な詳細レポートのために支払いを完了",
    
    // Pricing Section
    simplePricing: "シンプルで透明な価格設定",
    perValidation: "検証あたり",
    completeDocAnalysis: "完全な文書分析",
    detailedValidationReport: "詳細な検証レポート",
    recommendationsChecklist: "推奨事項とチェックリスト",
    secureHandling: "安全な文書処理",
    startValidationButton: "検証を開始",
    
    // Footer and Navigation
    professionalService: "世界中の旅行者のための専門文書検証サービス。",
    service: "サービス",
    supportedCountries: "対応国",
    contactUs: "お問い合わせ",
    legal: "法的情報",
    disclaimer: "免責事項",
    dataProtection: "データ保護",
    copyright: "© 2024 VisaValidator Pro。全著作権所有。",
    
    // Country Selection
    selectCountry: "目的地の国を選択",
    selectNationality: "国籍を選択",
    selectYourDestination: "目的地を選択",
    chooseDestinationCountry: "訪問予定の国を選択",
    selectYourNationality: "国籍を選択",
    yourNationalityDescription: "個人向けビザ要件を取得するために国籍を選択",
    popularChoices: "人気の選択肢",
    searchCountries: "国を検索...",
    searchNationalities: "国籍を検索...",
    proceedToValidation: "検証に進む",
    
    // Document Upload
    uploadFiles: "書類をアップロード",
    selectFiles: "ファイルを選択",
    uploadedFiles: "アップロード済みファイル",
    noFilesUploaded: "まだファイルがアップロードされていません",
    analyzing: "分析中...",
    uploadSuccess: "アップロード成功",
    
    // Personal Information
    personalInformation: "個人情報",
    fullName: "氏名",
    firstName: "名",
    lastName: "姓",
    middleName: "ミドルネーム",
    passportNumber: "パスポート番号",
    dateOfBirth: "生年月日",
    nationality: "国籍",
    plannedTravelDate: "予定旅行日",
    durationOfStay: "滞在期間（日数）",
    
    // Validation Results
    validationResults: "検証結果",
    overallScore: "総合スコア",
    verifiedItems: "検証済み項目",
    issuesFound: "発見された問題",
    recommendations: "推奨事項",
    downloadReport: "レポートダウンロード",
    
    // Payment
    payment: "支払い",
    paymentDescription: "完全な検証レポートを受け取るために支払いを完了",
    price: "$9.99",
    payNow: "今すぐ支払い",
    
    // Additional
    contact: "連絡先",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    
    // Country Selection
    commonRequirementsFor: "の一般的な要件",
    
    // Personal Info Form
    selectNationalityPlaceholder: "国籍を選択",
    daysPlaceholder: "日数を入力",
    
    // File Upload
    uploadAnalysisComplete: "アップロードと分析完了",
    documentsAnalyzedSuccessfully: "書類の分析が正常に完了",
    documentsFailed: "失敗",
    uploadFailed: "アップロード失敗",
    
    // Validation Results
    validationScore: "検証スコア",
    completedOn: "完了日",
    documentsVerified: "書類検証済み",
    
    // Language Modal
    chooseYourLanguage: "言語を選択",
    selectPreferredLanguage: "ビザ検証アプリケーションの希望言語を選択",
    continueButton: "続行",
    
    // Extended Visa Types
    medical: "医療",
    conference: "会議",
    journalist: "ジャーナリスト",
    religious: "宗教",
    cultural: "文化",
    research: "研究",
    training: "研修",
    diplomatic: "外交",
    crew: "乗務員",
    investment: "投資",
    retirement: "退職",
    volunteer: "ボランティア",
    sports: "スポーツ",
    other: "その他",
    
    // Document Requirements
    validPassportMinimum: "有効なパスポート（最低6ヶ月有効）",
    ds160ConfirmationPage: "DS-160確認ページ",
    passportStylePhotograph: "パスポート用写真",
    financialDocuments: "財務書類（銀行明細書、収入証明）",
    travelItineraryAccommodation: "旅行日程と宿泊証明",
    completedVisaApplication: "記入済みビザ申請書",
    supportingDocuments: "補助書類（ビザタイプにより異なる）",
    
    // Common
    loading: "読み込み中...",
    error: "エラー",
    success: "成功",
    close: "閉じる",
    save: "保存",
    cancel: "キャンセル",
    required: "必須",
    optional: "任意"
  },
  tr: {
    // Turkish complete translations
    appName: "VisaValidator Pro",
    back: "Geri",
    next: "İleri",
    previous: "Önceki",
    homeTitle: "Profesyonel Vize Belge Doğrulama",
    homeSubtitle: "Başvuru yapmadan önce AI teknolojisi ile seyahat belgelerinizi doğrulayın",
    startValidation: "Belge Doğrulamayı Başlat",
    documentValidationService: "Profesyonel Belge Doğrulama Hizmeti",
    
    // Navigation
    about: "Hakkında",
    howItWorksNav: "Nasıl Çalışır",
    pricing: "Fiyatlandırma",
    support: "Destek",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "KRİTİK HUKUKI SORUMLULUK REDDİ",
    noGuaranteeTitle: "VİZE ONAYLANMA GARANTİSİ YOK:",
    noGuaranteeText: "VisaValidator Pro yalnızca bir belge hazırlama yardım aracıdır. Vize onayı garanti etmez, herhangi bir devlet kurumunu temsil etmez ve büyükelçilik kararlarını etkilemez.",
    accuracyLimitationsTitle: "DOĞRULUK SINIRLARI:",
    accuracyLimitationsText: "AI'mız bilinen gereksinimlere göre belgeleri analiz etse de, sonuçlar %100 doğru olmayabilir. Büyükelçilik gereksinimleri sık sık değişir ve bireysel koşullara göre farklılık gösterir.",
    notOfficialGuidanceTitle: "RESMİ REHBERLİK DEĞİL:",
    notOfficialGuidanceText: "Bu hizmet resmi büyükelçilik web sitelerini, konsolosluk tavsiyelerini veya göçmenlik avukatıyla danışmayı yerine geçmez. Her zaman güncel gereksinimleri resmi kaynaklardan doğrulayın.",
    individualResponsibilityTitle: "BİREYSEL SORUMLULUK:",
    individualResponsibilityText: "Her yolcu, vize başvurusunun tüm gereksinimleri karşıladığından emin olma konusunda tam sorumluluğa sahiptir. Vize onay kararları yalnızca büyükelçilik ve konsolosluk yetkilileri tarafından verilir.",
    readFullDisclaimer: "Tam sorumluluk reddi ve hizmet sınırlarını okuyun →",
    
    stepDestination: "Hedef",
    stepNationality: "Milliyet",
    stepRequirements: "Gereksinimler",
    stepUpload: "Yükle",
    stepInformation: "Bilgi",
    stepReview: "İnceleme",
    stepPayment: "Ödeme",
    selectDestinationVisa: "Hedef ve Vize Türünü Seçin",
    destinationCountry: "Hedef Ülke",
    selectCountryPlaceholder: "Hedef ülkenizi seçin",
    visaType: "Vize Türü",
    selectVisaTypePlaceholder: "Vize türünü seçin",
    continue: "Devam Et",
    
    // Visa Types
    tourist: "Turist",
    business: "İş",
    student: "Öğrenci",
    work: "Çalışma",
    transit: "Transit",
    family: "Aile Ziyareti",
    
    // Features Section
    whyChoose: "Neden VisaValidator Pro'yu Seçin",
    securePrivate: "Güvenli ve Özel",
    securePrivateDesc: "Tüm belgeler gizliliğiniz ve güvenliğiniz için doğrulama sonrası otomatik olarak silinir.",
    fastProcessing: "Hızlı İşlem",
    fastProcessingDesc: "Günler değil, dakikalar içinde doğrulama sonuçları alın.",
    comprehensiveAnalysis: "Kapsamlı Analiz",
    comprehensiveAnalysisDesc: "Detaylı öneriler ve gereksinim kontrolü ile AI destekli belge analizi.",
    
    // How it Works
    howItWorks: "Nasıl Çalışır",
    step1: "Hedef Seçin",
    step1Desc: "Hedef ülkenizi ve vize türünüzü seçin",
    step2: "Belgeleri Yükleyin",
    step2Desc: "Vize başvuru belgelerinizi yükleyin",
    step3: "Detayları Girin",
    step3Desc: "Kişisel bilgilerinizi doldurun",
    step4: "Sonuçları Önizleyin",
    step4Desc: "Ödeme öncesi doğrulama önizlemesini görün",
    step5: "Ödeyin ve İndirin",
    step5Desc: "Tam detaylı rapor için ödemeyi tamamlayın",
    
    // Pricing Section
    simplePricing: "Basit, Şeffaf Fiyatlandırma",
    perValidation: "Doğrulama başına",
    completeDocAnalysis: "Tam belge analizi",
    detailedValidationReport: "Detaylı doğrulama raporu",
    recommendationsChecklist: "Öneriler ve kontrol listesi",
    secureHandling: "Güvenli belge işleme",
    startValidationButton: "Doğrulamayı Başlat",
    
    // Footer and Navigation
    professionalService: "Dünya çapında yolcular için profesyonel belge doğrulama hizmeti.",
    service: "Hizmet",
    supportedCountries: "Desteklenen Ülkeler",
    contactUs: "Bizimle İletişime Geçin",
    legal: "Yasal",
    disclaimer: "Sorumluluk Reddi",
    dataProtection: "Veri Koruma",
    copyright: "© 2024 VisaValidator Pro. Tüm hakları saklıdır.",
    
    // Country Selection
    selectCountry: "Hedef ülkenizi seçin",
    selectNationality: "Uyruğunuzu seçin",
    selectYourDestination: "Hedefinizi Seçin",
    chooseDestinationCountry: "Ziyaret etmeyi planladığınız ülkeyi seçin",
    selectYourNationality: "Uyruğunuzu Seçin",
    yourNationalityDescription: "Kişiselleştirilmiş vize gereksinimleri almak için uyruğunuzu seçin",
    popularChoices: "Popüler Seçenekler",
    searchCountries: "Ülke ara...",
    searchNationalities: "Uyruk ara...",
    proceedToValidation: "Doğrulamaya Geç",
    
    // Document Upload
    uploadFiles: "Belgeleri Yükle",
    selectFiles: "Dosya Seç",
    uploadedFiles: "Yüklenen Dosyalar",
    noFilesUploaded: "Henüz dosya yüklenmedi",
    analyzing: "Analiz ediliyor...",
    uploadSuccess: "Yükleme başarılı",
    
    // Personal Information
    personalInformation: "Kişisel Bilgiler",
    fullName: "Tam Adı",
    firstName: "Ad",
    lastName: "Soyad",
    middleName: "İkinci Ad",
    passportNumber: "Pasaport Numarası",
    dateOfBirth: "Doğum Tarihi",
    nationality: "Uyruk",
    plannedTravelDate: "Planlanan Seyahat Tarihi",
    durationOfStay: "Kalış Süresi (gün)",
    
    // Validation Results
    validationResults: "Doğrulama Sonuçları",
    overallScore: "Genel Puan",
    verifiedItems: "Doğrulanmış Öğeler",
    issuesFound: "Bulunan Sorunlar",
    recommendations: "Öneriler",
    downloadReport: "Raporu İndir",
    
    // Payment
    payment: "Ödeme",
    paymentDescription: "Tam doğrulama raporunuzu almak için ödemeyi tamamlayın",
    price: "$9.99",
    payNow: "Şimdi Öde",
    
    // Additional
    contact: "İletişim",
    privacy: "Gizlilik Politikası",
    terms: "Hizmet Şartları",
    
    // Country Selection
    commonRequirementsFor: "için ortak gereksinimler",
    
    // Personal Info Form
    selectNationalityPlaceholder: "Uyruğunuzu seçin",
    daysPlaceholder: "Gün sayısını girin",
    
    // File Upload
    uploadAnalysisComplete: "Yükleme ve Analiz Tamamlandı",
    documentsAnalyzedSuccessfully: "belge(ler) başarıyla analiz edildi",
    documentsFailed: "başarısız",
    uploadFailed: "Yükleme başarısız",
    
    // Validation Results
    validationScore: "Doğrulama Puanı",
    completedOn: "Tamamlandı",
    documentsVerified: "Belgeler Doğrulandı",
    
    // Language Modal
    chooseYourLanguage: "Dilinizi Seçin",
    selectPreferredLanguage: "Vize doğrulama uygulaması için tercih ettiğiniz dili seçin",
    continueButton: "Devam Et",
    
    // Extended Visa Types
    medical: "Tıbbi",
    conference: "Konferans",
    journalist: "Gazeteci",
    religious: "Dini",
    cultural: "Kültürel",
    research: "Araştırma",
    training: "Eğitim",
    diplomatic: "Diplomatik",
    crew: "Mürettebat",
    investment: "Yatırım",
    retirement: "Emeklilik",
    volunteer: "Gönüllü",
    sports: "Spor",
    other: "Diğer",
    
    // Document Requirements
    validPassportMinimum: "Geçerli pasaport (minimum 6 ay geçerlilik)",
    ds160ConfirmationPage: "DS-160 onay sayfası",
    passportStylePhotograph: "Pasaport tarzı fotoğraf",
    financialDocuments: "Mali belgeler (banka ekstreleri, gelir kanıtı)",
    travelItineraryAccommodation: "Seyahat programı ve konaklama kanıtı",
    completedVisaApplication: "Tamamlanmış vize başvuru formu",
    supportingDocuments: "Destekleyici belgeler (vize türüne göre değişir)",
    
    // Common
    loading: "Yükleniyor...",
    error: "Hata",
    success: "Başarılı",
    close: "Kapat",
    save: "Kaydet",
    cancel: "İptal",
    required: "Gerekli",
    optional: "İsteğe bağlı"
  },
  ko: {
    // Korean complete translations
    appName: "VisaValidator Pro",
    back: "뒤로",
    next: "다음",
    previous: "이전",
    homeTitle: "전문 비자 서류 검증",
    homeSubtitle: "신청하기 전에 AI 기술로 여행 서류를 검증하세요",
    startValidation: "서류 검증 시작",
    documentValidationService: "전문 서류 검증 서비스",
    
    // Navigation
    about: "소개",
    howItWorksNav: "작동 방식",
    pricing: "가격",
    support: "지원",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "중요한 법적 면책조항",
    noGuaranteeTitle: "비자 승인 보장 없음:",
    noGuaranteeText: "VisaValidator Pro는 서류 준비 보조 도구일 뿐입니다. 비자 승인을 보장하지 않으며, 정부 기관을 대표하지 않고, 대사관 결정에 영향을 주지 않습니다.",
    accuracyLimitationsTitle: "정확도 제한:",
    accuracyLimitationsText: "AI가 알려진 요구사항에 따라 서류를 분석하지만, 결과가 100% 정확하지 않을 수 있습니다. 대사관 요구사항은 자주 변경되며 개별 상황에 따라 다릅니다.",
    notOfficialGuidanceTitle: "공식 지침이 아님:",
    notOfficialGuidanceText: "이 서비스는 공식 대사관 웹사이트, 영사 조언 또는 이민 변호사와의 상담을 대체하지 않습니다. 항상 공식 출처를 통해 현재 요구사항을 확인하세요.",
    individualResponsibilityTitle: "개인 책임:",
    individualResponsibilityText: "각 여행자는 비자 신청이 모든 요구사항을 충족하도록 하는 완전한 책임을 집니다. 비자 승인 결정은 대사관 및 영사관 직원만이 내립니다.",
    readFullDisclaimer: "전체 면책조항 및 서비스 제한사항 읽기 →",
    
    stepDestination: "목적지",
    stepNationality: "국적",
    stepRequirements: "요구사항",
    stepUpload: "업로드",
    stepInformation: "정보",
    stepReview: "검토",
    stepPayment: "결제",
    selectDestinationVisa: "목적지 및 비자 유형 선택",
    destinationCountry: "목적지 국가",
    selectCountryPlaceholder: "목적지 국가를 선택하세요",
    visaType: "비자 유형",
    selectVisaTypePlaceholder: "비자 유형 선택",
    continue: "계속",
    
    // Visa Types
    tourist: "관광",
    business: "비즈니스",
    student: "학생",
    work: "취업",
    transit: "경유",
    family: "가족 방문",
    
    // Features Section
    whyChoose: "VisaValidator Pro를 선택하는 이유",
    securePrivate: "안전하고 비공개",
    securePrivateDesc: "개인 정보 보호와 보안을 위해 검증 후 모든 문서가 자동으로 삭제됩니다.",
    fastProcessing: "빠른 처리",
    fastProcessingDesc: "며칠이 아닌 몇 분 만에 검증 결과를 받아보세요.",
    comprehensiveAnalysis: "포괄적 분석",
    comprehensiveAnalysisDesc: "상세한 권장사항과 요구사항 확인이 포함된 AI 기반 문서 분석.",
    
    // How it Works
    howItWorks: "작동 방식",
    step1: "목적지 선택",
    step1Desc: "목적지 국가와 비자 유형을 선택하세요",
    step2: "문서 업로드",
    step2Desc: "비자 신청 문서를 업로드하세요",
    step3: "세부정보 입력",
    step3Desc: "개인 정보를 입력하세요",
    step4: "결과 미리보기",
    step4Desc: "결제 전 검증 미리보기를 확인하세요",
    step5: "결제 및 다운로드",
    step5Desc: "전체 상세 보고서를 위해 결제를 완료하세요",
    
    // Pricing Section
    simplePricing: "간단하고 투명한 가격",
    perValidation: "검증당",
    completeDocAnalysis: "완전한 문서 분석",
    detailedValidationReport: "상세한 검증 보고서",
    recommendationsChecklist: "권장사항 및 체크리스트",
    secureHandling: "안전한 문서 처리",
    startValidationButton: "검증 시작",
    
    // Footer and Navigation
    professionalService: "전 세계 여행자를 위한 전문 문서 검증 서비스.",
    service: "서비스",
    supportedCountries: "지원 국가",
    contactUs: "문의하기",
    legal: "법적 정보",
    disclaimer: "면책조항",
    dataProtection: "데이터 보호",
    copyright: "© 2024 VisaValidator Pro. 모든 권리 보유.",
    
    // Country Selection
    selectCountry: "목적지 국가를 선택하세요",
    selectNationality: "국적을 선택하세요",
    selectYourDestination: "목적지 선택",
    chooseDestinationCountry: "방문할 국가를 선택하세요",
    selectYourNationality: "국적 선택",
    yourNationalityDescription: "개인 맞춤 비자 요구사항을 받으려면 국적을 선택하세요",
    popularChoices: "인기 선택",
    searchCountries: "국가 검색...",
    searchNationalities: "국적 검색...",
    proceedToValidation: "검증 진행",
    
    // Document Upload
    uploadFiles: "문서 업로드",
    selectFiles: "파일 선택",
    uploadedFiles: "업로드된 파일",
    noFilesUploaded: "아직 파일이 업로드되지 않음",
    analyzing: "분석 중...",
    uploadSuccess: "업로드 성공",
    
    // Personal Information
    personalInformation: "개인 정보",
    fullName: "전체 이름",
    firstName: "이름",
    lastName: "성",
    middleName: "중간 이름",
    passportNumber: "여권 번호",
    dateOfBirth: "생년월일",
    nationality: "국적",
    plannedTravelDate: "계획된 여행 날짜",
    durationOfStay: "체류 기간(일)",
    
    // Validation Results
    validationResults: "검증 결과",
    overallScore: "전체 점수",
    verifiedItems: "검증된 항목",
    issuesFound: "발견된 문제",
    recommendations: "권장사항",
    downloadReport: "보고서 다운로드",
    
    // Payment
    payment: "결제",
    paymentDescription: "전체 검증 보고서를 받으려면 결제를 완료하세요",
    price: "$9.99",
    payNow: "지금 결제",
    
    // Additional
    contact: "연락처",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    
    // Country Selection
    commonRequirementsFor: "에 대한 일반적인 요구사항",
    
    // Personal Info Form
    selectNationalityPlaceholder: "국적을 선택하세요",
    daysPlaceholder: "일수를 입력하세요",
    
    // File Upload
    uploadAnalysisComplete: "업로드 및 분석 완료",
    documentsAnalyzedSuccessfully: "문서가 성공적으로 분석됨",
    documentsFailed: "실패",
    uploadFailed: "업로드 실패",
    
    // Validation Results
    validationScore: "검증 점수",
    completedOn: "완료일",
    documentsVerified: "문서 검증됨",
    
    // Language Modal
    chooseYourLanguage: "언어 선택",
    selectPreferredLanguage: "비자 검증 애플리케이션의 선호 언어를 선택하세요",
    continueButton: "계속",
    
    // Extended Visa Types
    medical: "의료",
    conference: "회의",
    journalist: "기자",
    religious: "종교",
    cultural: "문화",
    research: "연구",
    training: "연수",
    diplomatic: "외교",
    crew: "승무원",
    investment: "투자",
    retirement: "은퇴",
    volunteer: "자원봉사",
    sports: "스포츠",
    other: "기타",
    
    // Document Requirements
    validPassportMinimum: "유효한 여권 (최소 6개월 유효)",
    ds160ConfirmationPage: "DS-160 확인 페이지",
    passportStylePhotograph: "여권용 사진",
    financialDocuments: "재정 서류 (은행 명세서, 소득 증명)",
    travelItineraryAccommodation: "여행 일정 및 숙박 증명",
    completedVisaApplication: "작성된 비자 신청서",
    supportingDocuments: "지원 서류 (비자 유형에 따라 다름)",
    
    // Common
    loading: "로딩 중...",
    error: "오류",
    success: "성공",
    close: "닫기",
    save: "저장",
    cancel: "취소",
    required: "필수",
    optional: "선택사항"
  },
  sw: {
    // Swahili complete translations
    appName: "VisaValidator Pro",
    back: "Kurudi",
    next: "Ijayo",
    previous: "Iliyopita",
    homeTitle: "Uthibitisho wa Kitaaluma wa Hati za Visa",
    homeSubtitle: "Hakikisha hati zako za usafiri kwa teknolojia ya AI kabla ya kuomba",
    startValidation: "Anza Uthibitisho wa Hati",
    documentValidationService: "Huduma ya Kitaaluma ya Uthibitisho wa Hati",
    
    // Navigation
    about: "Kuhusu",
    howItWorksNav: "Jinsi Inavyofanya Kazi",
    pricing: "Bei",
    support: "Msaada",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "ONYO MUHIMU LA KISHERIA",
    noGuaranteeTitle: "HAKUNA DHAMANA YA IDHINI YA VISA:",
    noGuaranteeText: "VisaValidator Pro ni chombo cha msaada wa maandalizi ya hati tu. Hatudhamini idhini ya visa, hatuwakilishi shirika lolote la serikali, na hatuathiri maamuzi ya ubalozi.",
    accuracyLimitationsTitle: "VIKWAZO VYA USAHIHI:",
    accuracyLimitationsText: "Ingawa AI yetu inachambua hati kulingana na mahitaji yanayojulikana, matokeo yanaweza yasikuwe sahihi 100%. Mahitaji ya ubalozi yanabadilika mara kwa mara na yanatofautiana kulingana na mazingira ya kibinafsi.",
    notOfficialGuidanceTitle: "SI MWONGOZO RASMI:",
    notOfficialGuidanceText: "Huduma hii haichukui nafasi ya tovuti rasmi za ubalozi, ushauri wa ukonsuli, au mashauriano na mwanasheria wa uhamiaji. Hakikisha mahitaji ya sasa kupitia vyanzo rasmi.",
    individualResponsibilityTitle: "UWAJIBIKAJI WA KIBINAFSI:",
    individualResponsibilityText: "Kila msafiri ana jukumu kamili la kuhakikisha kwamba ombi lake la visa linakidhi mahitaji yote. Maamuzi ya idhini ya visa yanafanywa na maafisa wa ubalozi na ukonsuli pekee.",
    readFullDisclaimer: "Soma onyo kamili na vikwazo vya huduma →",
    
    stepDestination: "Marudio",
    stepNationality: "Utaifa",
    stepRequirements: "Mahitaji",
    stepUpload: "Pakia",
    stepInformation: "Maelezo",
    stepReview: "Mapitio",
    stepPayment: "Malipo",
    selectDestinationVisa: "Chagua Marudio na Aina ya Visa",
    destinationCountry: "Nchi ya Marudio",
    selectCountryPlaceholder: "Chagua nchi yako ya marudio",
    visaType: "Aina ya Visa",
    selectVisaTypePlaceholder: "Chagua aina ya visa",
    continue: "Endelea",
    
    // Visa Types
    tourist: "Utalii",
    business: "Biashara",
    student: "Mwanafunzi",
    work: "Kazi",
    transit: "Mpito",
    family: "Ziara ya Familia",
    
    // Features Section
    whyChoose: "Kwa nini Chagua VisaValidator Pro",
    securePrivate: "Salama na ya Binafsi",
    securePrivateDesc: "Hati zote zinafutwa kiotomatiki baada ya uthibitisho kwa faragha na usalama wako.",
    fastProcessing: "Uchakataji wa Haraka",
    fastProcessingDesc: "Pata matokeo ya uthibitisho katika dakika, si siku.",
    comprehensiveAnalysis: "Uchambuzi wa Kina",
    comprehensiveAnalysisDesc: "Uchambuzi wa hati unaotumia AI pamoja na mapendekezo ya kina na ukaguzi wa mahitaji.",
    
    // How it Works
    howItWorks: "Jinsi Inavyofanya Kazi",
    step1: "Chagua Marudio",
    step1Desc: "Chagua nchi yako ya marudio na aina ya visa",
    step2: "Pakia Hati",
    step2Desc: "Pakia hati zako za maombi ya visa",
    step3: "Ingiza Maelezo",
    step3Desc: "Jaza maelezo yako ya kibinafsi",
    step4: "Chunguza Matokeo",
    step4Desc: "Ona hakiki ya uthibitisho kabla ya malipo",
    step5: "Lipa na Pakua",
    step5Desc: "Maliza malipo kwa ripoti kamili ya kina",
    
    // Pricing Section
    simplePricing: "Bei Rahisi na Wazi",
    perValidation: "Kwa uthibitisho",
    completeDocAnalysis: "Uchambuzi kamili wa hati",
    detailedValidationReport: "Ripoti ya kina ya uthibitisho",
    recommendationsChecklist: "Mapendekezo na orodha ya ukaguzi",
    secureHandling: "Utunzaji salama wa hati",
    startValidationButton: "Anza Uthibitisho",
    
    // Footer and Navigation
    professionalService: "Huduma ya kitaaluma ya uthibitisho wa hati kwa wasafiri ulimwenguni.",
    service: "Huduma",
    supportedCountries: "Nchi Zinazotumika",
    contactUs: "Wasiliana Nasi",
    legal: "Kisheria",
    disclaimer: "Kanusho",
    dataProtection: "Ulinzi wa Data",
    copyright: "© 2024 VisaValidator Pro. Haki zote zimehifadhiwa.",
    
    // Country Selection
    selectCountry: "Chagua nchi yako ya marudio",
    selectNationality: "Chagua utaifa wako",
    selectYourDestination: "Chagua Marudio Lako",
    chooseDestinationCountry: "Chagua nchi unayopanga kutembelea",
    selectYourNationality: "Chagua Utaifa Wako",
    yourNationalityDescription: "Chagua utaifa wako kupata mahitaji ya visa ya kibinafsi",
    popularChoices: "Uchaguzi Maarufu",
    searchCountries: "Tafuta nchi...",
    searchNationalities: "Tafuta utaifa...",
    proceedToValidation: "Endelea kwa Uthibitisho",
    
    // Document Upload
    uploadFiles: "Pakia Hati",
    selectFiles: "Chagua Faili",
    uploadedFiles: "Faili Zilizopakiwa",
    noFilesUploaded: "Hakuna faili zilizopakiwa bado",
    analyzing: "Inachambuliwa...",
    uploadSuccess: "Upakiaji umefanikiwa",
    
    // Personal Information
    personalInformation: "Maelezo ya Kibinafsi",
    fullName: "Jina Kamili",
    firstName: "Jina la Kwanza",
    lastName: "Jina la Mwisho",
    middleName: "Jina la Kati",
    passportNumber: "Nambari ya Pasipoti",
    dateOfBirth: "Tarehe ya Kuzaliwa",
    nationality: "Utaifa",
    plannedTravelDate: "Tarehe ya Safari Iliyopangwa",
    durationOfStay: "Muda wa Kukaa (siku)",
    
    // Validation Results
    validationResults: "Matokeo ya Uthibitisho",
    overallScore: "Alama ya Jumla",
    verifiedItems: "Vitu Vilivyothibitishwa",
    issuesFound: "Matatizo Yaliyopatikana",
    recommendations: "Mapendekezo",
    downloadReport: "Pakua Ripoti",
    
    // Payment
    payment: "Malipo",
    paymentDescription: "Maliza malipo kupokea ripoti yako kamili ya uthibitisho",
    price: "$9.99",
    payNow: "Lipa Sasa",
    
    // Additional
    contact: "Mawasiliano",
    privacy: "Sera ya Faragha",
    terms: "Masharti ya Huduma",
    
    // Country Selection
    commonRequirementsFor: "Mahitaji ya kawaida kwa",
    
    // Personal Info Form
    selectNationalityPlaceholder: "Chagua utaifa wako",
    daysPlaceholder: "Ingiza idadi ya siku",
    
    // File Upload
    uploadAnalysisComplete: "Upakiaji na Uchambuzi Umekamilika",
    documentsAnalyzedSuccessfully: "hati imechambuliwa kwa mafanikio",
    documentsFailed: "imeshindwa",
    uploadFailed: "Upakiaji umeshindwa",
    
    // Validation Results
    validationScore: "Alama ya Uthibitisho",
    completedOn: "Imekamilika",
    documentsVerified: "Hati Zimethibitishwa",
    
    // Language Modal
    chooseYourLanguage: "Chagua Lugha Yako",
    selectPreferredLanguage: "Chagua lugha yako unayopendelea kwa programu ya uthibitisho wa visa",
    continueButton: "Endelea",
    
    // Extended Visa Types
    medical: "Kwa Matibabu",
    conference: "Mkutano",
    journalist: "Mwanahabari",
    religious: "Kidini",
    cultural: "Kitamaduni",
    research: "Utafiti",
    training: "Mafunzo",
    diplomatic: "Kidiplomasia",
    crew: "Wafanyakazi",
    investment: "Uwekezaji",
    retirement: "Ustaafu",
    volunteer: "Kujitolea",
    sports: "Michezo",
    other: "Nyingine",
    
    // Document Requirements
    validPassportMinimum: "Pasipoti halali (angalau miezi 6 halali)",
    ds160ConfirmationPage: "Ukurasa wa uthibitisho wa DS-160",
    passportStylePhotograph: "Picha ya mtindo wa pasipoti",
    financialDocuments: "Hati za kifedha (taarifa za benki, uthibitisho wa mapato)",
    travelItineraryAccommodation: "Ratiba ya safari na uthibitisho wa malazi",
    completedVisaApplication: "Fomu ya maombi ya visa iliyokamilika",
    supportingDocuments: "Hati za msaada (hutofautiana kulingana na aina ya visa)",
    
    // Common
    loading: "Inapakia...",
    error: "Hitilafu",
    success: "Mafanikio",
    close: "Funga",
    save: "Hifadhi",
    cancel: "Ghairi",
    required: "Lazima",
    optional: "Hiari"
  },
  te: {
    // Telugu complete translations
    appName: "VisaValidator Pro",
    back: "వెనుకకు",
    next: "తరువాత",
    previous: "మునుపటి",
    homeTitle: "వృత్తిపరమైన వీసా డాక్యుమెంట్ ధృవీకరణ",
    homeSubtitle: "దరఖాస్తు చేయడానికి ముందు AI సాంకేతికతతో మీ ప్రయాణ పత్రాలను ధృవీకరించండి",
    startValidation: "డాక్యుమెంట్ ధృవీకరణ ప్రారంభించండి",
    documentValidationService: "వృత్తిపరమైన డాక్యుమెంట్ ధృవీకరణ సేవ",
    
    // Navigation
    about: "గురించి",
    howItWorksNav: "ఎలా పని చేస్తుంది",
    pricing: "ధరలు",
    support: "మద్దతు",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "క్రిటికల్ లీగల్ డిస్క్లైమర్",
    noGuaranteeTitle: "వీసా ఆమోదానికి హామీ లేదు:",
    noGuaranteeText: "VisaValidator Pro కేవలం డాక్యుమెంట్ తయారీ సహాయ సాధనం. మేము వీసా ఆమోదానికి హామీ ఇవ్వము, ఏ ప్రభుత్వ ఏజెన్సీకి ప్రాతినిధ్యం వహించము మరియు రాయబార కార్యాలయ నిర్णయాలను ప్రభావితం చేయము.",
    accuracyLimitationsTitle: "ఖచ్చితత్వ పరిమితులు:",
    accuracyLimitationsText: "మా AI తెలిసిన అవసరాల ప్రకారం డాక్యుమెంట్లను విశ్లేషిస్తున్నప్పటికీ, ఫలితాలు 100% ఖచ్చితమైనవి కాకపోవచ్చు. రాయబార కార్యాలయ అవసరాలు తరచుగా మారుతూ ఉంటాయి మరియు వ్యక్తిగత పరిస్థితుల ప్రకారం మారుతాయి.",
    notOfficialGuidanceTitle: "అధికారిక మార్గదర్శకత్వం కాదు:",
    notOfficialGuidanceText: "ఈ సేవ అధికారిక రాయబార కార్యాలయ వెబ్‌సైట్లు, కాన్సులర్ సలహా లేదా ఇమ్మిగ్రేషన్ న్యాయవాదితో సంప్రదింపులకు ప్రత్యామ్నాయం కాదు. ఎల్లప్పుడూ అధికారిక మూలాధారాల ద్వారా ప్రస్తుత అవసరాలను ధృవీకరించండి.",
    individualResponsibilityTitle: "వ్యక్తిగత బాధ్యత:",
    individualResponsibilityText: "ప్రతి ప్రయాణికుడు తమ వీసా దరఖాస్తు అన్ని అవసరాలను తీరుస్తుందని నిర్ధారించడంలో పూర్తి బాధ్యత వహిస్తారు. వీసా ఆమోద నిర్णయాలు రాయబార కార్యాలయం మరియు కాన్సులేట్ అధికారులు మాత్రమే తీసుకుంటారు.",
    readFullDisclaimer: "పూర్తి నిరాకరణ మరియు సేవా పరిమితులను చదవండి →",
    
    stepDestination: "గమ్యస్థానం",
    stepNationality: "జాతీయత",
    stepRequirements: "అవసరాలు",
    stepUpload: "అప్‌లోడ్",
    stepInformation: "సమాచారం",
    stepReview: "సమీక్ష",
    stepPayment: "చెల్లింపు",
    selectDestinationVisa: "గమ్యస్థానం మరియు వీసా రకాన్ని ఎంచుకోండి",
    destinationCountry: "గమ్యస్థాన దేశం",
    selectCountryPlaceholder: "మీ గమ్యస్థాన దేశాన్ని ఎంచుకోండి",
    visaType: "వీసా రకం",
    selectVisaTypePlaceholder: "వీసా రకాన్ని ఎంచుకోండి",
    continue: "కొనసాగించు",
    
    // Visa Types
    tourist: "పర్యాటక",
    business: "వ్యాపార",
    student: "విద్యార్థి",
    work: "పని",
    transit: "రవాణా",
    family: "కుటుంబ సందర్శన",
    
    // Features Section
    whyChoose: "VisaValidator Pro ఎందుకు ఎంచుకోవాలి",
    securePrivate: "సురక్షిత మరియు వ్యక్తిగత",
    securePrivateDesc: "మీ గోప్యత మరియు భద్రత కోసం ధృవీకరణ తర్వాత అన్ని పత్రాలు స్వయంచాలకంగా తొలగించబడతాయి.",
    fastProcessing: "వేగవంతమైన ప్రాసెసింగ్",
    fastProcessingDesc: "రోజులు కాకుండా నిమిషాల్లో ధృవీకరణ ఫలితాలను పొందండి.",
    comprehensiveAnalysis: "సమగ్ర విశ్లేషణ",
    comprehensiveAnalysisDesc: "వివరణాత్మక సిఫార్సులు మరియు అవసరాల తనిఖీతో AI-ఆధారిత పత్రాల విశ్లేషణ.",
    
    // How it Works
    howItWorks: "ఎలా పని చేస్తుంది",
    step1: "గమ్యస్థానం ఎంచుకోండి",
    step1Desc: "మీ గమ్యస్థాన దేశం మరియు వీసా రకాన్ని ఎంచుకోండి",
    step2: "పత్రాలను అప్‌లోడ్ చేయండి",
    step2Desc: "మీ వీసా దరఖాస్తు పత్రాలను అప్‌లోడ్ చేయండి",
    step3: "వివరాలను నమోదు చేయండి",
    step3Desc: "మీ వ్యక్తిగత సమాచారాన్ని పూరించండి",
    step4: "ఫలితాలను ప్రివ్యూ చేయండి",
    step4Desc: "చెల్లింపుకు ముందు ధృవీకరణ ప్రివ్యూని చూడండి",
    step5: "చెల్లించండి మరియు డౌన్‌లోడ్ చేయండి",
    step5Desc: "పూర్తి వివరణాత్మక నివేదిక కోసం చెల్లింపును పూర్తి చేయండి",
    
    // Pricing Section
    simplePricing: "సాధారణ, పారదర్శక ధర",
    perValidation: "ధృవీకరణకు",
    completeDocAnalysis: "పూర్తి పత్రాల విశ్లేషణ",
    detailedValidationReport: "వివరణాత్మక ధృవీకరణ నివేదిక",
    recommendationsChecklist: "సిఫార్సులు మరియు చెక్‌లిస్ట్",
    secureHandling: "సురక్షిత పత్రాల నిర్వహణ",
    startValidationButton: "ధృవీకరణ ప్రారంభించండి",
    
    // Footer and Navigation
    professionalService: "ప్రపంచవ్యాప్తంగా ప్రయాణికుల కోసం వృత్తిపరమైన పత్రాల ధృవీకరణ సేవ.",
    service: "సేవ",
    supportedCountries: "మద్దతు ఇవ్వబడిన దేశాలు",
    contactUs: "మమ్మల్ని సంప్రదించండి",
    legal: "చట్టపరమైన",
    disclaimer: "నిరాకరణ",
    dataProtection: "డేటా రక్షణ",
    copyright: "© 2024 VisaValidator Pro. అన్ని హక్కులు రక్షించబడ్డాయి.",
    
    // Country Selection
    selectCountry: "మీ గమ్యస్థాన దేశాన్ని ఎంచుకోండి",
    selectNationality: "మీ జాతీయతను ఎంచుకోండి",
    selectYourDestination: "మీ గమ్యస్థానాన్ని ఎంచుకోండి",
    chooseDestinationCountry: "మీరు సందర్శించాలని అనుకుంటున్న దేశాన్ని ఎంచుకోండి",
    selectYourNationality: "మీ జాతీయతను ఎంచుకోండి",
    yourNationalityDescription: "వ్యక్తిగతీకరించిన వీసా అవసరాలను పొందడానికి మీ జాతీయతను ఎంచుకోండి",
    popularChoices: "ప్రాచుర్యమైన ఎంపికలు",
    searchCountries: "దేశాలను వెతకండి...",
    searchNationalities: "జాతీయతలను వెతకండి...",
    proceedToValidation: "ధృవీకరణకు కొనసాగండి",
    
    // Document Upload
    uploadFiles: "పత్రాలను అప్‌లోడ్ చేయండి",
    selectFiles: "ఫైల్‌లను ఎంచుకోండి",
    uploadedFiles: "అప్‌లోడ్ చేయబడిన ఫైల్‌లు",
    noFilesUploaded: "ఇంకా ఫైల్‌లు అప్‌లోడ్ చేయబడలేదు",
    analyzing: "విశ్లేషిస్తోంది...",
    uploadSuccess: "అప్‌లోడ్ విజయవంతమైంది",
    
    // Personal Information
    personalInformation: "వ్యక్తిగత సమాచారం",
    fullName: "పూర్తి పేరు",
    firstName: "మొదటి పేరు",
    lastName: "చివరి పేరు",
    middleName: "మధ్య పేరు",
    passportNumber: "పాస్‌పోర్ట్ నంబర్",
    dateOfBirth: "పుట్టిన తేదీ",
    nationality: "జాతీయత",
    plannedTravelDate: "ప్రణాళికాబద్ధమైన ప్రయాణ తేదీ",
    durationOfStay: "ఉండే వ్యవధి (రోజులు)",
    
    // Validation Results
    validationResults: "ధృవీకరణ ఫలితాలు",
    overallScore: "మొత్తం స్కోర్",
    verifiedItems: "ధృవీకరించబడిన అంశాలు",
    issuesFound: "కనుగొనబడిన సమస్యలు",
    recommendations: "సిఫార్సులు",
    downloadReport: "నివేదికను డౌన్‌లోడ్ చేయండి",
    
    // Payment
    payment: "చెల్లింపు",
    paymentDescription: "మీ పూర్తి ధృవీకరణ నివేదికను పొందడానికి చెల్లింపును పూర్తి చేయండి",
    price: "$9.99",
    payNow: "ఇప్పుడు చెల్లించండి",
    
    // Additional
    contact: "సంప్రదించండి",
    privacy: "గోప్యతా విధానం",
    terms: "సేవా నిబంధనలు",
    
    // Country Selection
    commonRequirementsFor: "కోసం సాధారణ అవసరాలు",
    
    // Personal Info Form
    selectNationalityPlaceholder: "మీ జాతీయతను ఎంచుకోండి",
    daysPlaceholder: "రోజుల సంఖ్యను నమోదు చేయండి",
    
    // File Upload
    uploadAnalysisComplete: "అప్‌లోడ్ మరియు విశ్లేషణ పూర్తయింది",
    documentsAnalyzedSuccessfully: "పత్రం(లు) విజయవంతంగా విశ్లేషించబడింది",
    documentsFailed: "విఫలమైంది",
    uploadFailed: "అప్‌లోడ్ విఫలమైంది",
    
    // Validation Results
    validationScore: "ధృవీకరణ స్కోర్",
    completedOn: "పూర్తయిన తేదీ",
    documentsVerified: "పత్రాలు ధృవీకరించబడ్డాయి",
    
    // Language Modal
    chooseYourLanguage: "మీ భాషను ఎంచుకోండి",
    selectPreferredLanguage: "వీసా ధృవీకరణ అప్లికేషన్ కోసం మీ ఇష్టమైన భాషను ఎంచుకోండి",
    continueButton: "కొనసాగించు",
    
    // Extended Visa Types
    medical: "వైద్య",
    conference: "సమావేశం",
    journalist: "పాత్రికేయుడు",
    religious: "మతపరమైన",
    cultural: "సాంస్కృతిక",
    research: "పరిశోధన",
    training: "శిక్షణ",
    diplomatic: "దౌత్య",
    crew: "సిబ్బంది",
    investment: "పెట్టుబడి",
    retirement: "పదవీ విరమణ",
    volunteer: "స్వచ్ఛంద",
    sports: "క్రీడలు",
    other: "ఇతర",
    
    // Document Requirements
    validPassportMinimum: "చెల్లుబాటు అయ్యే పాస్‌పోర్ట్ (కనీసం 6 నెలల చెల్లుబాటు)",
    ds160ConfirmationPage: "DS-160 నిర్ధారణ పేజీ",
    passportStylePhotograph: "పాస్‌పోర్ట్ శైలి ఫోటోగ్రాఫ్",
    financialDocuments: "ఆర్థిక పత్రాలు (బ్యాంక్ స్టేట్‌మెంట్‌లు, ఆదాయ రుజువు)",
    travelItineraryAccommodation: "ప్రయాణ కార్యక్రమం మరియు వసతి రుజువు",
    completedVisaApplication: "పూర్తి చేయబడిన వీసా దరఖాస్తు ఫారం",
    supportingDocuments: "సహాయక పత్రాలు (వీసా రకాన్ని బట్టి మారుతుంది)",
    
    // Common
    loading: "లోడ్ అవుతోంది...",
    error: "లోపం",
    success: "విజయం",
    close: "మూసివేయి",
    save: "సేవ్ చేయి",
    cancel: "రద్దు చేయి",
    required: "అవసరం",
    optional: "ఐచ్ఛికం"
  },
  mr: {
    // Marathi complete translations
    appName: "VisaValidator Pro",
    back: "मागे",
    next: "पुढे",
    previous: "मागील",
    homeTitle: "व्यावसायिक व्हिसा दस्तऐवज प्रमाणीकरण",
    homeSubtitle: "अर्ज करण्यापूर्वी AI तंत्रज्ञानाने आपले प्रवास दस्तऐवज प्रमाणित करा",
    startValidation: "दस्तऐवज प्रमाणीकरण सुरू करा",
    documentValidationService: "व्यावसायिक दस्तऐवज प्रमाणीकरण सेवा",
    
    // Navigation
    about: "बद्दल",
    howItWorksNav: "हे कसे कार्य करते",
    pricing: "किंमत",
    support: "सहाय्य",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "गंभीर कायदेशीर अस्वीकरण",
    noGuaranteeTitle: "व्हिसा मंजुरीची हमी नाही:",
    noGuaranteeText: "VisaValidator Pro हे केवळ दस्तऐवज तयारी सहाय्यक साधन आहे. आम्ही व्हिसा मंजुरीची हमी देत नाही, कोणत्याही सरकारी एजन्सीचे प्रतिनिधित्व करत नाही आणि दूतावासाच्या निर्णयांवर प्रभाव टाकत नाही.",
    accuracyLimitationsTitle: "अचूकतेच्या मर्यादा:",
    accuracyLimitationsText: "आमचे AI ज्ञात आवश्यकतांनुसार दस्तऐवजांचे विश्लेषण करते, परंतु परिणाम 100% अचूक असू शकत नाहीत. दूतावासाच्या आवश्यकता वारंवार बदलत राहतात आणि व्यक्तिगत परिस्थितीनुसार भिन्न असतात.",
    notOfficialGuidanceTitle: "अधिकृत मार्गदर्शन नाही:",
    notOfficialGuidanceText: "ही सेवा अधिकृत दूतावास वेबसाइट्स, वाणिज्य दूतावासाच्या सल्ल्याचा किंवा इमिग्रेशन वकीलाशी सल्लामसलत करण्याचा पर्याय नाही. नेहमी अधिकृत स्रोतांकडून वर्तमान आवश्यकता तपासा.",
    individualResponsibilityTitle: "वैयक्तिक जबाबदारी:",
    individualResponsibilityText: "प्रत्येक प्रवाशाची व्हिसा अर्ज सर्व आवश्यकता पूर्ण करत असल्याची खात्री करण्याची संपूर्ण जबाबदारी आहे. व्हिसा मंजुरीचे निर्णय केवळ दूतावास आणि वाणिज्य दूतावासाचे अधिकारी घेतात.",
    readFullDisclaimer: "संपूर्ण अस्वीकरण आणि सेवा मर्यादा वाचा →",
    
    stepDestination: "गंतव्य",
    stepNationality: "राष्ट्रीयत्व",
    stepRequirements: "आवश्यकता",
    stepUpload: "अपलोड",
    stepInformation: "माहिती",
    stepReview: "पुनरावलोकन",
    stepPayment: "पेमेंट",
    selectDestinationVisa: "गंतव्य आणि व्हिसा प्रकार निवडा",
    destinationCountry: "गंतव्य देश",
    selectCountryPlaceholder: "तुमचा गंतव्य देश निवडा",
    visaType: "व्हिसा प्रकार",
    selectVisaTypePlaceholder: "व्हिसा प्रकार निवडा",
    continue: "सुरू ठेवा",
    
    // Visa Types
    tourist: "पर्यटन",
    business: "व्यवसाय",
    student: "विद्यार्थी",
    work: "काम",
    transit: "पारगमन",
    family: "कुटुंब भेट",
    
    // Common
    loading: "लोड होत आहे...",
    error: "त्रुटी",
    success: "यश",
    close: "बंद करा",
    save: "जतन करा",
    cancel: "रद्द करा",
    required: "आवश्यक",
    optional: "पर्यायी"
  },
  ta: {
    // Tamil complete translations
    appName: "VisaValidator Pro",
    back: "பின்",
    next: "அடுத்து",
    previous: "முந்தைய",
    homeTitle: "தொழில்முறை வீசா ஆவண சரிபார்ப்பு",
    homeSubtitle: "விண்ணப்பிக்கும் முன் AI தொழில்நுட்பத்துடன் உங்கள் பயண ஆவணங்களை சரிபார்க்கவும்",
    startValidation: "ஆவண சரிபார்ப்பைத் தொடங்கவும்",
    documentValidationService: "தொழில்முறை ஆவண சரிபார்ப்பு சேவை",
    
    // Navigation
    about: "பற்றி",
    howItWorksNav: "இது எப்படி வேலை செய்கிறது",
    pricing: "விலை நிர்ணயம்",
    support: "ஆதரவு",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "முக்கியமான சட்ட மறுப்பு",
    noGuaranteeTitle: "வீசா ஒப்புதலுக்கு உத்தரவாதம் இல்லை:",
    noGuaranteeText: "VisaValidator Pro வெறும் ஆவண தயாரிப்பு உதவி கருவி மட்டுமே. நாங்கள் வீசா ஒப்புதலுக்கு உத்தரவாதம் அளிக்கவில்லை, எந்த அரசு நிறுவனத்தையும் பிரதிநிதித்துவப்படுத்துவதில்லை, மற்றும் தூதரக முடிவுகளை பாதிக்கவில்லை.",
    accuracyLimitationsTitle: "துல்லியத்தின் வரம்புகள்:",
    accuracyLimitationsText: "எங்கள் AI அறியப்பட்ட தேவைகளின்படி ஆவணங்களை பகுப்பாய்வு செய்தாலும், முடிவுகள் 100% துல்லியமாக இருக்காது. தூதரக தேவைகள் அடிக்கடி மாறுகின்றன மற்றும் தனிப்பட்ட சூழ்நிலைகளைப் பொறுத்து மாறுபடும்.",
    notOfficialGuidanceTitle: "அதிகாரப்பூர்வ வழிகாட்டுதல் அல்ல:",
    notOfficialGuidanceText: "இந்த சேவை அதிகாரப்பூர்வ தூதரக வலைத்தளங்கள், தூதரக ஆலோசனை அல்லது குடியுரிமை வழக்கறிஞருடன் ஆலோசனைக்கு மாற்றாக இல்லை. எப்போதும் அதிகாரப்பூர்வ ஆதாரங்களுடன் தற்போதைய தேவைகளை சரிபார்க்கவும்.",
    individualResponsibilityTitle: "தனிப்பட்ட பொறுப்பு:",
    individualResponsibilityText: "ஒவ்வொரு பயணியும் தங்கள் வீசா விண்ணப்பம் அனைத்து தேவைகளையும் பூர்த்தி செய்வதை உறுதி செய்வதில் முழு பொறுப்பு உடையவர். வீசா ஒப்புதல் முடிவுகள் தூதரகம் மற்றும் தூதரக அதிகாரிகளால் மட்டுமே எடுக்கப்படுகின்றன.",
    readFullDisclaimer: "முழு மறுப்பு மற்றும் சேவை வரம்புகளைப் படிக்கவும் →",
    
    stepDestination: "இலக்கு",
    stepNationality: "தேசியம்",
    stepRequirements: "தேவைகள்",
    stepUpload: "பதிவேற்று",
    stepInformation: "தகவல்",
    stepReview: "மீளாய்வு",
    stepPayment: "கட்டணம்",
    selectDestinationVisa: "இலக்கு மற்றும் வீசா வகையைத் தேர்ந்தெடுக்கவும்",
    destinationCountry: "இலக்கு நாடு",
    selectCountryPlaceholder: "உங்கள் இலக்கு நாட்டைத் தேர்ந்தெடுக்கவும்",
    visaType: "வீசா வகை",
    selectVisaTypePlaceholder: "வீசா வகையைத் தேர்ந்தெடுக்கவும்",
    continue: "தொடரவும்",
    
    // Visa Types
    tourist: "சுற்றுலா",
    business: "வணிகம்",
    student: "மாணவர்",
    work: "வேலை",
    transit: "போக்குவரத்து",
    family: "குடும்ப வருகை",
    
    // Common
    loading: "ஏற்றப்படுகிறது...",
    error: "பிழை",
    success: "வெற்றி",
    close: "மூடு",
    save: "சேமி",
    cancel: "ரத்து செய்",
    required: "தேவையான",
    optional: "விருப்பமான"
  },
  ur: {
    // Urdu complete translations
    appName: "VisaValidator Pro",
    back: "واپس",
    next: "اگلا",
    previous: "پچھلا",
    homeTitle: "پیشہ ورانہ ویزا دستاویز کی تصدیق",
    homeSubtitle: "درخواست دینے سے پہلے AI ٹیکنالوجی کے ساتھ اپنے سفری دستاویزات کی تصدیق کریں",
    startValidation: "دستاویز کی تصدیق شروع کریں",
    documentValidationService: "پیشہ ورانہ دستاویز تصدیق کی سروس",
    
    // Navigation
    about: "کے بارے میں",
    howItWorksNav: "یہ کیسے کام کرتا ہے",
    pricing: "قیمتوں کا تعین",
    support: "سپورٹ",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "اہم قانونی دستبرداری",
    noGuaranteeTitle: "ویزا کی منظوری کی کوئی ضمانت نہیں:",
    noGuaranteeText: "VisaValidator Pro صرف دستاویز کی تیاری میں مدد کرنے والا آلہ ہے۔ ہم ویزا کی منظوری کی ضمانت نہیں دیتے، کسی بھی سرکاری ایجنسی کی نمائندگی نہیں کرتے، اور سفارت خانے کے فیصلوں کو متاثر نہیں کرتے۔",
    accuracyLimitationsTitle: "درستگی کی حدود:",
    accuracyLimitationsText: "اگرچہ ہمارا AI معلوم ضروریات کے مطابق دستاویزات کا تجزیہ کرتا ہے، لیکن نتائج 100% درست نہیں ہو سکتے۔ سفارت خانے کی ضروریات اکثر تبدیل ہوتی رہتی ہیں اور انفرادی حالات کے مطابق مختلف ہوتی ہیں۔",
    notOfficialGuidanceTitle: "سرکاری رہنمائی نہیں:",
    notOfficialGuidanceText: "یہ سروس سرکاری سفارت خانے کی ویب سائٹس، قونصلی مشورے، یا امیگریشن وکیل کے ساتھ مشاورت کا متبادل نہیں ہے۔ ہمیشہ سرکاری ذرائع سے موجودہ ضروریات کی تصدیق کریں۔",
    individualResponsibilityTitle: "انفرادی ذمہ داری:",
    individualResponsibilityText: "ہر مسافر اپنی ویزا درخواست تمام ضروریات کو پورا کرنے کو یقینی بنانے کی مکمل ذمہ داری رکھتا ہے۔ ویزا کی منظوری کے فیصلے صرف سفارت خانے اور قونصل خانے کے افسران کرتے ہیں۔",
    readFullDisclaimer: "مکمل دستبرداری اور سروس کی حدود پڑھیں →",
    
    stepDestination: "منزل",
    stepNationality: "قومیت",
    stepRequirements: "ضروریات",
    stepUpload: "اپ لوڈ",
    stepInformation: "معلومات",
    stepReview: "جائزہ",
    stepPayment: "ادائیگی",
    selectDestinationVisa: "منزل اور ویزا کی قسم منتخب کریں",
    destinationCountry: "منزل کا ملک",
    selectCountryPlaceholder: "اپنے منزل کا ملک منتخب کریں",
    visaType: "ویزا کی قسم",
    selectVisaTypePlaceholder: "ویزا کی قسم منتخب کریں",
    continue: "جاری رکھیں",
    
    // Visa Types
    tourist: "سیاحتی",
    business: "کاروباری",
    student: "طالب علم",
    work: "کام",
    transit: "ٹرانزٹ",
    family: "خاندانی ملاقات",
    
    // Common
    loading: "لوڈ ہو رہا ہے...",
    error: "خرابی",
    success: "کامیابی",
    close: "بند کریں",
    save: "محفوظ کریں",
    cancel: "منسوخ کریں",
    required: "ضروری",
    optional: "اختیاری"
  },
  bn: {
    // Bengali complete translations
    appName: "VisaValidator Pro",
    back: "পিছনে",
    next: "পরবর্তী",
    previous: "পূর্ববর্তী",
    homeTitle: "পেশাদার ভিসা ডকুমেন্ট যাচাইকরণ",
    homeSubtitle: "আবেদন করার আগে AI প্রযুক্তি দিয়ে আপনার ভ্রমণ ডকুমেন্ট যাচাই করুন",
    startValidation: "ডকুমেন্ট যাচাইকরণ শুরু করুন",
    documentValidationService: "পেশাদার ডকুমেন্ট যাচাইকরণ সেবা",
    
    // Navigation
    about: "সম্পর্কে",
    howItWorksNav: "এটি কীভাবে কাজ করে",
    pricing: "মূল্য নির্ধারণ",
    support: "সহায়তা",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "গুরুত্বপূর্ণ আইনি দাবিত্যাগ",
    noGuaranteeTitle: "ভিসা অনুমোদনের কোনো গ্যারান্টি নেই:",
    noGuaranteeText: "VisaValidator Pro শুধুমাত্র একটি ডকুমেন্ট প্রস্তুতি সহায়ক টুল। আমরা ভিসা অনুমোদনের গ্যারান্টি দিই না, কোনো সরকারি সংস্থার প্রতিনিধিত্ব করি না, এবং দূতাবাসের সিদ্ধান্তকে প্রভাবিত করি না।",
    accuracyLimitationsTitle: "নির্ভুলতার সীমাবদ্ধতা:",
    accuracyLimitationsText: "যদিও আমাদের AI জানা প্রয়োজনীয়তা অনুযায়ী ডকুমেন্ট বিশ্লেষণ করে, ফলাফল ১০০% নির্ভুল নাও হতে পারে। দূতাবাসের প্রয়োজনীয়তা প্রায়ই পরিবর্তিত হয় এবং ব্যক্তিগত পরিস্থিতি অনুযায়ী ভিন্ন হয়।",
    notOfficialGuidanceTitle: "সরকারি নির্দেশনা নয়:",
    notOfficialGuidanceText: "এই সেবা সরকারি দূতাবাস ওয়েবসাইট, কনস্যুলার পরামর্শ, বা ইমিগ্রেশন আইনজীবীর সাথে পরামর্শের বিকল্প নয়। সর্বদা সরকারি সূত্রের সাথে বর্তমান প্রয়োজনীয়তা যাচাই করুন।",
    individualResponsibilityTitle: "ব্যক্তিগত দায়বদ্ধতা:",
    individualResponsibilityText: "প্রত্যেক ভ্রমণকারী তাদের ভিসা আবেদন সমস্ত প্রয়োজনীয়তা পূরণ করে তা নিশ্চিত করার সম্পূর্ণ দায়বদ্ধতা বহন করে। ভিসা অনুমোদনের সিদ্ধান্ত শুধুমাত্র দূতাবাস এবং কনস্যুলেট কর্মকর্তারা গ্রহণ করেন।",
    readFullDisclaimer: "সম্পূর্ণ দাবিত্যাগ এবং সেবার সীমাবদ্ধতা পড়ুন →",
    
    stepDestination: "গন্তব্য",
    stepNationality: "জাতীয়তা",
    stepRequirements: "প্রয়োজনীয়তা",
    stepUpload: "আপলোড",
    stepInformation: "তথ্য",
    stepReview: "পর্যালোচনা",
    stepPayment: "পেমেন্ট",
    selectDestinationVisa: "গন্তব্য এবং ভিসার ধরন নির্বাচন করুন",
    destinationCountry: "গন্তব্য দেশ",
    selectCountryPlaceholder: "আপনার গন্তব্য দেশ নির্বাচন করুন",
    visaType: "ভিসার ধরন",
    selectVisaTypePlaceholder: "ভিসার ধরন নির্বাচন করুন",
    continue: "চালিয়ে যান",
    
    // Visa Types
    tourist: "পর্যটন",
    business: "ব্যবসায়িক",
    student: "ছাত্র",
    work: "কাজ",
    transit: "ট্রানজিট",
    family: "পারিবারিক সফর",
    
    // Common
    loading: "লোড হচ্ছে...",
    error: "ত্রুটি",
    success: "সফলতা",
    close: "বন্ধ করুন",
    save: "সংরক্ষণ করুন",
    cancel: "বাতিল করুন",
    required: "প্রয়োজনীয়",
    optional: "ঐচ্ছিক"
  }
};

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
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "TUYÊN BỐ PHÁP LÝ QUAN TRỌNG",
    noGuaranteeTitle: "KHÔNG BẢO ĐẢÁM PHÊ DUYỆT VISA:",
    noGuaranteeText: "VisaValidator Pro chỉ là công cụ hỗ trợ chuẩn bị tài liệu. Chúng tôi không bảo đảm việc phê duyệt visa, không đại diện cho bất kỳ cơ quan chính phủ nào, và không ảnh hưởng đến quyết định của đại sứ quán.",
    accuracyLimitationsTitle: "HẠN CHẾ ĐỘ CHÍNH XÁC:",
    accuracyLimitationsText: "Mặc dù AI của chúng tôi phân tích tài liệu theo các yêu cầu đã biết, kết quả có thể không chính xác 100%. Yêu cầu của đại sứ quán thường xuyên thay đổi và khác nhau tùy theo hoàn cảnh cá nhân.",
    notOfficialGuidanceTitle: "KHÔNG PHẢI HƯỚNG DẪN CHÍNH THỨC:",
    notOfficialGuidanceText: "Dịch vụ này không thay thế các trang web chính thức của đại sứ quán, lời khuyên lãnh sự, hoặc tư vấn với luật sư di trú. Luôn xác minh các yêu cầu hiện tại với các nguồn chính thức.",
    individualResponsibilityTitle: "TRÁCH NHIỆM CÁ NHÂN:",
    individualResponsibilityText: "Mỗi du khách có trách nhiệm hoàn toàn đảm bảo đơn xin visa của họ đáp ứng tất cả các yêu cầu. Quyết định phê duyệt visa chỉ được đưa ra bởi các quan chức đại sứ quán và lãnh sự quán.",
    readFullDisclaimer: "Đọc toàn bộ tuyên bố miễn trừ trách nhiệm và hạn chế dịch vụ →",
    
    // Features Section
    whyChoose: "Tại sao chọn VisaValidator Pro",
    securePrivate: "Bảo mật & Riêng tư",
    securePrivateDesc: "Tất cả tài liệu được tự động xóa sau xác thực để bảo vệ quyền riêng tư và an ninh của bạn.",
    fastProcessing: "Xử lý Nhanh chóng",
    fastProcessingDesc: "Nhận kết quả xác thực trong vài phút, không phải vài ngày.",
    comprehensiveAnalysis: "Phân tích Toàn diện",
    comprehensiveAnalysisDesc: "Phân tích tài liệu được hỗ trợ bởi AI với khuyến nghị chi tiết và kiểm tra yêu cầu.",
    
    // How it Works
    howItWorks: "Cách thức hoạt động",
    step1: "Chọn Điểm đến",
    step1Desc: "Chọn quốc gia đích và loại visa của bạn",
    step2: "Tải lên Tài liệu",
    step2Desc: "Tải lên các tài liệu đơn xin visa của bạn",
    step3: "Nhập Chi tiết",
    step3Desc: "Điền thông tin cá nhân của bạn",
    step4: "Xem trước Kết quả",
    step4Desc: "Xem bản xem trước xác thực trước khi thanh toán",
    step5: "Thanh toán và Tải xuống",
    step5Desc: "Hoàn tất thanh toán để có báo cáo chi tiết đầy đủ",
    
    // Pricing Section
    simplePricing: "Giá cả Đơn giản, Minh bạch",
    perValidation: "Mỗi lần xác thực",
    completeDocAnalysis: "Phân tích tài liệu hoàn chỉnh",
    detailedValidationReport: "Báo cáo xác thực chi tiết",
    recommendationsChecklist: "Khuyến nghị và danh sách kiểm tra",
    secureHandling: "Xử lý tài liệu an toàn",
    startValidationButton: "Bắt đầu Xác thực",
    
    // Footer and Navigation
    professionalService: "Dịch vụ xác thực tài liệu chuyên nghiệp cho khách du lịch trên toàn thế giới.",
    service: "Dịch vụ",
    supportedCountries: "Các quốc gia được hỗ trợ",
    contactUs: "Liên hệ chúng tôi",
    legal: "Pháp lý",
    disclaimer: "Tuyên bố miễn trừ trách nhiệm",
    dataProtection: "Bảo vệ dữ liệu",
    copyright: "© 2024 VisaValidator Pro. Bảo lưu mọi quyền.",
    
    // Country Selection
    selectCountry: "Chọn quốc gia đích của bạn",
    selectNationality: "Chọn quốc tịch của bạn",
    selectYourDestination: "Chọn Điểm đến của Bạn",
    chooseDestinationCountry: "Chọn quốc gia bạn dự định ghé thăm",
    selectYourNationality: "Chọn Quốc tịch của Bạn",
    yourNationalityDescription: "Chọn quốc tịch của bạn để nhận yêu cầu visa được cá nhân hóa",
    popularChoices: "Lựa chọn Phổ biến",
    searchCountries: "Tìm kiếm quốc gia...",
    searchNationalities: "Tìm kiếm quốc tịch...",
    proceedToValidation: "Tiến hành Xác thực",
    
    // Visa Types
    tourist: "Du lịch",
    business: "Kinh doanh",
    student: "Sinh viên",
    work: "Làm việc",
    transit: "Quá cảnh",
    family: "Thăm gia đình",
    
    // Document Upload
    uploadFiles: "Tải lên Tài liệu",
    selectFiles: "Chọn File",
    uploadedFiles: "File đã tải lên",
    noFilesUploaded: "Chưa có file nào được tải lên",
    analyzing: "Đang phân tích...",
    uploadSuccess: "Tải lên thành công",
    
    // Personal Information
    personalInformation: "Thông tin Cá nhân",
    fullName: "Họ và Tên",
    firstName: "Tên",
    lastName: "Họ",
    middleName: "Tên đệm",
    passportNumber: "Số Hộ chiếu",
    dateOfBirth: "Ngày sinh",
    nationality: "Quốc tịch",
    plannedTravelDate: "Ngày Du lịch Dự kiến",
    durationOfStay: "Thời gian Lưu trú (ngày)",
    
    // Validation Results
    validationResults: "Kết quả Xác thực",
    overallScore: "Điểm Tổng thể",
    verifiedItems: "Mục đã Xác minh",
    issuesFound: "Vấn đề Phát hiện",
    recommendations: "Khuyến nghị",
    downloadReport: "Tải xuống Báo cáo",
    
    // Payment
    payment: "Thanh toán",
    paymentDescription: "Hoàn tất thanh toán để nhận báo cáo xác thực đầy đủ của bạn",
    price: "$9.99",
    payNow: "Thanh toán Ngay",
    
    // Common
    loading: "Đang tải...",
    error: "Lỗi",
    success: "Thành công",
    close: "Đóng",
    save: "Lưu",
    cancel: "Hủy",
    continue: "Tiếp tục",
    required: "Bắt buộc",
    optional: "Tùy chọn",
    
    // Additional
    contact: "Liên hệ",
    privacy: "Chính sách Bảo mật",
    terms: "Điều khoản Dịch vụ",
    
    // Step Indicator
    stepDestination: "Điểm đến",
    stepNationality: "Quốc tịch", 
    stepRequirements: "Yêu cầu",
    stepUpload: "Tải lên",
    stepInformation: "Thông tin",
    stepReview: "Xem lại",
    stepPayment: "Thanh toán",
    
    // Country Selection
    selectDestinationVisa: "Chọn Điểm đến & Loại Visa",
    destinationCountry: "Quốc gia Đích",
    selectCountryPlaceholder: "Chọn quốc gia đích của bạn",
    visaType: "Loại Visa",
    selectVisaTypePlaceholder: "Chọn loại visa",
    commonRequirementsFor: "Yêu cầu chung cho",
    
    // Personal Info Form
    selectNationalityPlaceholder: "Chọn quốc tịch của bạn",
    daysPlaceholder: "Nhập số ngày",
    
    // File Upload
    uploadAnalysisComplete: "Tải lên và Phân tích Hoàn tất",
    documentsAnalyzedSuccessfully: "tài liệu được phân tích thành công",
    documentsFailed: "thất bại",
    uploadFailed: "Tải lên thất bại",
    
    // Validation Results
    validationScore: "Điểm Xác thực",
    completedOn: "Hoàn thành vào",
    documentsVerified: "Tài liệu Đã Xác minh",
    
    // Language Modal
    chooseYourLanguage: "Chọn Ngôn ngữ của Bạn",
    selectPreferredLanguage: "Chọn ngôn ngữ ưa thích của bạn cho ứng dụng xác thực visa",
    continueButton: "Tiếp tục",
    
    // Extended Visa Types
    medical: "Y tế",
    conference: "Hội nghị",
    journalist: "Nhà báo", 
    religious: "Tôn giáo",
    cultural: "Văn hóa",
    research: "Nghiên cứu",
    training: "Đào tạo",
    diplomatic: "Ngoại giao",
    crew: "Phi hành đoàn",
    investment: "Đầu tư",
    retirement: "Nghỉ hưu",
    volunteer: "Tình nguyện",
    sports: "Thể thao",
    other: "Khác",
    
    // Document Requirements
    validPassportMinimum: "Hộ chiếu hợp lệ (tối thiểu 6 tháng có hiệu lực)",
    ds160ConfirmationPage: "Trang xác nhận DS-160",
    passportStylePhotograph: "Ảnh kiểu hộ chiếu", 
    financialDocuments: "Tài liệu tài chính (sao kê ngân hàng, bằng chứng thu nhập)",
    travelItineraryAccommodation: "Lịch trình du lịch và bằng chứng chỗ ở",
    completedVisaApplication: "Mẫu đơn xin visa đã hoàn thành",
    supportingDocuments: "Tài liệu hỗ trợ (khác nhau theo loại visa)"
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
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "重要法律免责声明",
    noGuaranteeTitle: "不保证签证批准：",
    noGuaranteeText: "VisaValidator Pro仅为文档准备辅助工具。我们不保证签证批准，不代表任何政府机构，也不影响大使馆决定。",
    accuracyLimitationsTitle: "准确性限制：",
    accuracyLimitationsText: "虽然我们的AI根据已知要求分析文档，但结果可能不是100%准确。大使馆要求经常变化，并因个人情况而异。",
    notOfficialGuidanceTitle: "非官方指导：",
    notOfficialGuidanceText: "此服务不能替代官方大使馆网站、领事建议或移民律师咨询。请始终通过官方渠道验证当前要求。",
    individualResponsibilityTitle: "个人责任：",
    individualResponsibilityText: "每位旅行者都有完全责任确保其签证申请符合所有要求。签证批准决定仅由大使馆和领事馆官员做出。",
    readFullDisclaimer: "阅读完整免责声明和服务限制 →",
    
    // Features Section
    whyChoose: "为什么选择VisaValidator Pro",
    securePrivate: "安全私密",
    securePrivateDesc: "所有文档在验证后自动删除，保护您的隐私和安全。",
    fastProcessing: "快速处理",
    fastProcessingDesc: "在几分钟内获得验证结果，而非几天。",
    comprehensiveAnalysis: "全面分析",
    comprehensiveAnalysisDesc: "AI驱动的文档分析，提供详细建议和要求检查。",
    
    // How it Works
    howItWorks: "工作原理",
    step1: "选择目的地",
    step1Desc: "选择您的目的地国家和签证类型",
    step2: "上传文档",
    step2Desc: "上传您的签证申请文档",
    step3: "输入详情",
    step3Desc: "填写您的个人信息",
    step4: "预览结果",
    step4Desc: "付款前查看验证预览",
    step5: "付款和下载",
    step5Desc: "完成付款以获得完整详细报告",
    
    // Pricing Section
    simplePricing: "简单透明的定价",
    perValidation: "每次验证",
    completeDocAnalysis: "完整文档分析",
    detailedValidationReport: "详细验证报告",
    recommendationsChecklist: "建议和清单",
    secureHandling: "安全文档处理",
    startValidationButton: "开始验证",
    
    // Footer and Navigation
    professionalService: "为全球旅行者提供专业文档验证服务。",
    service: "服务",
    supportedCountries: "支持的国家",
    contactUs: "联系我们",
    legal: "法律",
    disclaimer: "免责声明", 
    dataProtection: "数据保护",
    copyright: "© 2024 VisaValidator Pro. 保留所有权利。",
    
    // Country Selection
    selectCountry: "选择您的目的地国家",
    selectNationality: "选择您的国籍",
    selectYourDestination: "选择您的目的地",
    chooseDestinationCountry: "选择您计划访问的国家",
    selectYourNationality: "选择您的国籍",
    yourNationalityDescription: "选择您的国籍以获得个性化签证要求",
    popularChoices: "热门选择",
    searchCountries: "搜索国家...",
    searchNationalities: "搜索国籍...",
    proceedToValidation: "进行验证",
    
    // Visa Types
    tourist: "旅游",
    business: "商务",
    student: "学生",
    work: "工作",
    transit: "过境",
    family: "探亲",
    
    // Document Upload
    uploadFiles: "上传文档",
    selectFiles: "选择文件",
    uploadedFiles: "已上传文件",
    noFilesUploaded: "尚未上传文件",
    analyzing: "分析中...",
    uploadSuccess: "上传成功",
    
    // Personal Information
    personalInformation: "个人信息",
    fullName: "全名",
    firstName: "名",
    lastName: "姓",
    middleName: "中间名",
    passportNumber: "护照号码",
    dateOfBirth: "出生日期",
    nationality: "国籍",
    plannedTravelDate: "计划旅行日期",
    durationOfStay: "停留时间（天）",
    
    // Validation Results
    validationResults: "验证结果",
    overallScore: "总分",
    verifiedItems: "已验证项目",
    issuesFound: "发现的问题",
    recommendations: "建议",
    downloadReport: "下载报告",
    
    // Payment
    payment: "付款",
    paymentDescription: "完成付款以获得您的完整验证报告",
    price: "$9.99",
    payNow: "立即付款",
    
    // Common
    loading: "加载中...",
    error: "错误",
    success: "成功",
    close: "关闭",
    save: "保存",
    cancel: "取消",
    continue: "继续",
    required: "必填",
    optional: "可选",
    
    // Additional
    contact: "联系",
    privacy: "隐私政策",
    terms: "服务条款",
    
    // Step Indicator
    stepDestination: "目的地",
    stepNationality: "国籍", 
    stepRequirements: "要求",
    stepUpload: "上传",
    stepInformation: "信息",
    stepReview: "审查",
    stepPayment: "付款",
    
    // Country Selection
    selectDestinationVisa: "选择目的地和签证类型",
    destinationCountry: "目的地国家",
    selectCountryPlaceholder: "选择您的目的地国家",
    visaType: "签证类型",
    selectVisaTypePlaceholder: "选择签证类型",
    commonRequirementsFor: "常见要求",
    
    // Personal Info Form
    selectNationalityPlaceholder: "选择您的国籍",
    daysPlaceholder: "输入天数",
    
    // File Upload
    uploadAnalysisComplete: "上传和分析完成",
    documentsAnalyzedSuccessfully: "文档分析成功",
    documentsFailed: "失败",
    uploadFailed: "上传失败",
    
    // Validation Results
    validationScore: "验证分数",
    completedOn: "完成于",
    documentsVerified: "文档已验证",
    
    // Language Modal
    chooseYourLanguage: "选择您的语言",
    selectPreferredLanguage: "为签证验证应用程序选择您的首选语言",
    continueButton: "继续",
    
    // Extended Visa Types
    medical: "医疗",
    conference: "会议",
    journalist: "记者", 
    religious: "宗教",
    cultural: "文化",
    research: "研究",
    training: "培训",
    diplomatic: "外交",
    crew: "船员",
    investment: "投资",
    retirement: "退休",
    volunteer: "志愿者",
    sports: "体育",
    other: "其他",
    
    // Document Requirements
    validPassportMinimum: "有效护照（至少6个月有效期）",
    ds160ConfirmationPage: "DS-160确认页面",
    passportStylePhotograph: "护照风格照片", 
    financialDocuments: "财务文件（银行对账单，收入证明）",
    travelItineraryAccommodation: "旅行行程和住宿证明",
    completedVisaApplication: "完成的签证申请表",
    supportingDocuments: "支持文件（因签证类型而异）"
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
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "AVISO LEGAL CRÍTICO",
    noGuaranteeTitle: "SIN GARANTÍA DE APROBACIÓN DE VISA:",
    noGuaranteeText: "VisaValidator Pro es solo una herramienta de asistencia para la preparación de documentos. No garantizamos la aprobación de visa, no representamos ninguna agencia gubernamental, ni influenciamos las decisiones de la embajada.",
    accuracyLimitationsTitle: "LIMITACIONES DE PRECISIÓN:",
    accuracyLimitationsText: "Aunque nuestra IA analiza documentos según los requisitos conocidos, los resultados pueden no ser 100% precisos. Los requisitos de la embajada cambian frecuentemente y varían según las circunstancias individuales.",
    notOfficialGuidanceTitle: "NO ES ORIENTACIÓN OFICIAL:",
    notOfficialGuidanceText: "Este servicio no reemplaza los sitios web oficiales de embajadas, consejos consulares, o consulta con un abogado de inmigración. Siempre verifique los requisitos actuales con fuentes oficiales.",
    individualResponsibilityTitle: "RESPONSABILIDAD INDIVIDUAL:",
    individualResponsibilityText: "Cada viajero tiene la responsabilidad completa de asegurar que su solicitud de visa cumple con todos los requisitos. Las decisiones de aprobación de visa son tomadas únicamente por funcionarios de embajadas y consulados.",
    readFullDisclaimer: "Leer descargo completo y limitaciones del servicio →",
    
    // Features Section
    whyChoose: "Por qué elegir VisaValidator Pro",
    securePrivate: "Seguro y Privado",
    securePrivateDesc: "Todos los documentos se eliminan automáticamente después de la validación para su privacidad y seguridad.",
    fastProcessing: "Procesamiento Rápido",
    fastProcessingDesc: "Obtenga resultados de validación en minutos, no días.",
    comprehensiveAnalysis: "Análisis Integral",
    comprehensiveAnalysisDesc: "Análisis de documentos impulsado por IA con recomendaciones detalladas y verificación de requisitos.",
    
    // How it Works
    howItWorks: "Cómo funciona",
    step1: "Seleccionar Destino",
    step1Desc: "Elija su país de destino y tipo de visa",
    step2: "Subir Documentos",
    step2Desc: "Suba sus documentos de solicitud de visa",
    step3: "Introducir Detalles",
    step3Desc: "Complete su información personal",
    step4: "Vista Previa de Resultados",
    step4Desc: "Vea la vista previa de validación antes del pago",
    step5: "Pagar y Descargar",
    step5Desc: "Complete el pago para el informe detallado completo",
    
    // Pricing Section
    simplePricing: "Precios Simples y Transparentes",
    perValidation: "Por validación",
    completeDocAnalysis: "Análisis completo de documentos",
    detailedValidationReport: "Informe de validación detallado",
    recommendationsChecklist: "Recomendaciones y lista de verificación",
    secureHandling: "Manejo seguro de documentos",
    startValidationButton: "Comenzar Validación",
    
    // Footer and Navigation
    professionalService: "Servicio profesional de validación de documentos para viajeros de todo el mundo.",
    service: "Servicio",
    supportedCountries: "Países Compatibles",
    contactUs: "Contáctanos",
    legal: "Legal",
    disclaimer: "Descargo de responsabilidad",
    dataProtection: "Protección de Datos",
    copyright: "© 2024 VisaValidator Pro. Todos los derechos reservados.",
    
    // Country Selection
    selectCountry: "Seleccione su país de destino",
    selectNationality: "Seleccione su nacionalidad",
    selectYourDestination: "Seleccione Su Destino",
    chooseDestinationCountry: "Elija el país que planea visitar",
    selectYourNationality: "Seleccione Su Nacionalidad",
    yourNationalityDescription: "Elija su nacionalidad para obtener requisitos de visa personalizados",
    popularChoices: "Opciones Populares",
    searchCountries: "Buscar países...",
    searchNationalities: "Buscar nacionalidades...",
    proceedToValidation: "Proceder a la Validación",
    
    // Visa Types
    tourist: "Turista",
    business: "Negocios",
    student: "Estudiante",
    work: "Trabajo",
    transit: "Tránsito",
    family: "Visita Familiar",
    
    // Document Upload
    uploadFiles: "Subir Documentos",
    selectFiles: "Seleccionar Archivos",
    uploadedFiles: "Archivos Subidos",
    noFilesUploaded: "Aún no se han subido archivos",
    analyzing: "Analizando...",
    uploadSuccess: "Subida exitosa",
    
    // Personal Information
    personalInformation: "Información Personal",
    fullName: "Nombre Completo",
    firstName: "Nombre",
    lastName: "Apellido",
    middleName: "Segundo Nombre",
    passportNumber: "Número de Pasaporte",
    dateOfBirth: "Fecha de Nacimiento",
    nationality: "Nacionalidad",
    plannedTravelDate: "Fecha de Viaje Planificada",
    durationOfStay: "Duración de la Estancia (días)",
    
    // Validation Results
    validationResults: "Resultados de Validación",
    overallScore: "Puntuación General",
    verifiedItems: "Elementos Verificados",
    issuesFound: "Problemas Encontrados",
    recommendations: "Recomendaciones",
    downloadReport: "Descargar Informe",
    
    // Payment
    payment: "Pago",
    paymentDescription: "Complete el pago para recibir su informe de validación completo",
    price: "$9.99",
    payNow: "Pagar Ahora",
    
    // Common
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    close: "Cerrar",
    save: "Guardar",
    cancel: "Cancelar",
    continue: "Continuar",
    required: "Obligatorio",
    optional: "Opcional",
    
    // Additional
    contact: "Contacto",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    
    // Step Indicator
    stepDestination: "Destino",
    stepNationality: "Nacionalidad", 
    stepRequirements: "Requisitos",
    stepUpload: "Subir",
    stepInformation: "Información",
    stepReview: "Revisión",
    stepPayment: "Pago",
    
    // Country Selection
    selectDestinationVisa: "Seleccionar Destino y Tipo de Visa",
    destinationCountry: "País de Destino",
    selectCountryPlaceholder: "Elija su país de destino",
    visaType: "Tipo de Visa",
    selectVisaTypePlaceholder: "Seleccionar tipo de visa",
    commonRequirementsFor: "Requisitos comunes para",
    
    // Personal Info Form
    selectNationalityPlaceholder: "Seleccione su nacionalidad",
    daysPlaceholder: "Ingrese número de días",
    
    // File Upload
    uploadAnalysisComplete: "Carga y Análisis Completo",
    documentsAnalyzedSuccessfully: "documento(s) analizados con éxito",
    documentsFailed: "fallaron",
    uploadFailed: "Carga fallida",
    
    // Validation Results
    validationScore: "Puntuación de Validación",
    completedOn: "Completado el",
    documentsVerified: "Documentos Verificados",
    
    // Language Modal
    chooseYourLanguage: "Elija Su Idioma",
    selectPreferredLanguage: "Seleccione su idioma preferido para la aplicación de validación de visa",
    continueButton: "Continuar",
    
    // Extended Visa Types
    medical: "Médico",
    conference: "Conferencia",
    journalist: "Periodista", 
    religious: "Religioso",
    cultural: "Cultural",
    research: "Investigación",
    training: "Entrenamiento",
    diplomatic: "Diplomático",
    crew: "Tripulación",
    investment: "Inversión",
    retirement: "Jubilación",
    volunteer: "Voluntario",
    sports: "Deportes",
    other: "Otro",
    
    // Document Requirements
    validPassportMinimum: "Pasaporte válido (mínimo 6 meses de validez)",
    ds160ConfirmationPage: "Página de confirmación DS-160",
    passportStylePhotograph: "Fotografía estilo pasaporte", 
    financialDocuments: "Documentos financieros (estados de cuenta bancarios, comprobante de ingresos)",
    travelItineraryAccommodation: "Itinerario de viaje y comprobante de alojamiento",
    completedVisaApplication: "Formulario de solicitud de visa completado",
    supportingDocuments: "Documentos de apoyo (varía según el tipo de visa)"
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
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "AVIS LÉGAL CRITIQUE",
    noGuaranteeTitle: "AUCUNE GARANTIE D'APPROBATION DE VISA :",
    noGuaranteeText: "VisaValidator Pro n'est qu'un outil d'assistance à la préparation de documents. Nous ne garantissons pas l'approbation de visa, ne représentons aucune agence gouvernementale, et n'influençons pas les décisions d'ambassade.",
    accuracyLimitationsTitle: "LIMITATIONS DE PRÉCISION :",
    accuracyLimitationsText: "Bien que notre IA analyse les documents selon les exigences connues, les résultats peuvent ne pas être précis à 100%. Les exigences d'ambassade changent fréquemment et varient selon les circonstances individuelles.",
    notOfficialGuidanceTitle: "PAS DE CONSEILS OFFICIELS :",
    notOfficialGuidanceText: "Ce service ne remplace pas les sites web officiels d'ambassades, les conseils consulaires, ou la consultation avec un avocat en immigration. Vérifiez toujours les exigences actuelles avec les sources officielles.",
    individualResponsibilityTitle: "RESPONSABILITÉ INDIVIDUELLE :",
    individualResponsibilityText: "Chaque voyageur porte l'entière responsabilité de s'assurer que sa demande de visa répond à toutes les exigences. Les décisions d'approbation de visa sont prises uniquement par les fonctionnaires d'ambassades et de consulats.",
    readFullDisclaimer: "Lire l'avis complet et les limitations du service →",
    
    // Features Section
    whyChoose: "Pourquoi choisir VisaValidator Pro",
    securePrivate: "Sécurisé et Privé",
    securePrivateDesc: "Tous les documents sont automatiquement supprimés après validation pour votre confidentialité et sécurité.",
    fastProcessing: "Traitement Rapide",
    fastProcessingDesc: "Obtenez les résultats de validation en minutes, pas en jours.",
    comprehensiveAnalysis: "Analyse Complète",
    comprehensiveAnalysisDesc: "Analyse de documents alimentée par IA avec des recommandations détaillées et vérification des exigences.",
    
    // How it Works
    howItWorks: "Comment ça marche",
    step1: "Sélectionner la Destination",
    step1Desc: "Choisissez votre pays de destination et type de visa",
    step2: "Télécharger les Documents",
    step2Desc: "Téléchargez vos documents de demande de visa",
    step3: "Entrer les Détails",
    step3Desc: "Remplissez vos informations personnelles",
    step4: "Aperçu des Résultats",
    step4Desc: "Voyez l'aperçu de validation avant le paiement",
    step5: "Payer et Télécharger",
    step5Desc: "Complétez le paiement pour le rapport détaillé complet",
    
    // Pricing Section
    simplePricing: "Prix Simple et Transparent",
    perValidation: "Par validation",
    completeDocAnalysis: "Analyse complète des documents",
    detailedValidationReport: "Rapport de validation détaillé",
    recommendationsChecklist: "Recommandations et liste de contrôle",
    secureHandling: "Traitement sécurisé des documents",
    startValidationButton: "Commencer la Validation",
    
    // Footer and Navigation
    professionalService: "Service professionnel de validation de documents pour les voyageurs du monde entier.",
    service: "Service",
    supportedCountries: "Pays Pris en Charge",
    contactUs: "Nous Contacter",
    legal: "Légal",
    disclaimer: "Avis de non-responsabilité",
    dataProtection: "Protection des Données",
    copyright: "© 2024 VisaValidator Pro. Tous droits réservés.",
    
    // Country Selection
    selectCountry: "Sélectionnez votre pays de destination",
    selectNationality: "Sélectionnez votre nationalité",
    selectYourDestination: "Sélectionnez Votre Destination",
    chooseDestinationCountry: "Choisissez le pays que vous prévoyez visiter",
    selectYourNationality: "Sélectionnez Votre Nationalité",
    yourNationalityDescription: "Choisissez votre nationalité pour obtenir des exigences de visa personnalisées",
    popularChoices: "Choix Populaires",
    searchCountries: "Rechercher des pays...",
    searchNationalities: "Rechercher des nationalités...",
    proceedToValidation: "Procéder à la Validation",
    
    // Visa Types
    tourist: "Touriste",
    business: "Affaires",
    student: "Étudiant",
    work: "Travail",
    transit: "Transit",
    family: "Visite Familiale",
    
    // Document Upload
    uploadFiles: "Télécharger des Documents",
    selectFiles: "Sélectionner des Fichiers",
    uploadedFiles: "Fichiers Téléchargés",
    noFilesUploaded: "Aucun fichier téléchargé encore",
    analyzing: "Analyse en cours...",
    uploadSuccess: "Téléchargement réussi",
    
    // Personal Information
    personalInformation: "Informations Personnelles",
    fullName: "Nom Complet",
    firstName: "Prénom",
    lastName: "Nom de Famille",
    middleName: "Deuxième Prénom",
    passportNumber: "Numéro de Passeport",
    dateOfBirth: "Date de Naissance",
    nationality: "Nationalité",
    plannedTravelDate: "Date de Voyage Prévue",
    durationOfStay: "Durée du Séjour (jours)",
    
    // Validation Results
    validationResults: "Résultats de Validation",
    overallScore: "Score Global",
    verifiedItems: "Éléments Vérifiés",
    issuesFound: "Problèmes Trouvés",
    recommendations: "Recommandations",
    downloadReport: "Télécharger le Rapport",
    
    // Payment
    payment: "Paiement",
    paymentDescription: "Complétez le paiement pour recevoir votre rapport de validation complet",
    price: "9,99 $",
    payNow: "Payer Maintenant",
    
    // Common
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    close: "Fermer",
    save: "Enregistrer",
    cancel: "Annuler",
    continue: "Continuer",
    required: "Obligatoire",
    optional: "Optionnel",
    
    // Additional
    contact: "Contact",
    privacy: "Politique de Confidentialité",
    terms: "Conditions de Service",
    
    // Step Indicator
    stepDestination: "Destination",
    stepNationality: "Nationalité", 
    stepRequirements: "Exigences",
    stepUpload: "Télécharger",
    stepInformation: "Informations",
    stepReview: "Révision",
    stepPayment: "Paiement",
    
    // Country Selection
    selectDestinationVisa: "Sélectionner Destination et Type de Visa",
    destinationCountry: "Pays de Destination",
    selectCountryPlaceholder: "Choisissez votre pays de destination",
    visaType: "Type de Visa",
    selectVisaTypePlaceholder: "Sélectionner le type de visa",
    commonRequirementsFor: "Exigences communes pour",
    
    // Personal Info Form
    selectNationalityPlaceholder: "Sélectionnez votre nationalité",
    daysPlaceholder: "Entrez le nombre de jours",
    
    // File Upload
    uploadAnalysisComplete: "Téléchargement et Analyse Terminés",
    documentsAnalyzedSuccessfully: "document(s) analysé(s) avec succès",
    documentsFailed: "échoué",
    uploadFailed: "Téléchargement échoué",
    
    // Validation Results
    validationScore: "Score de Validation",
    completedOn: "Terminé le",
    documentsVerified: "Documents Vérifiés",
    
    // Language Modal
    chooseYourLanguage: "Choisissez Votre Langue",
    selectPreferredLanguage: "Sélectionnez votre langue préférée pour l'application de validation de visa",
    continueButton: "Continuer",
    
    // Extended Visa Types
    medical: "Médical",
    conference: "Conférence",
    journalist: "Journaliste", 
    religious: "Religieux",
    cultural: "Culturel",
    research: "Recherche",
    training: "Formation",
    diplomatic: "Diplomatique",
    crew: "Équipage",
    investment: "Investissement",
    retirement: "Retraite",
    volunteer: "Bénévole",
    sports: "Sports",
    other: "Autre",
    
    // Document Requirements
    validPassportMinimum: "Passeport valide (validité minimale de 6 mois)",
    ds160ConfirmationPage: "Page de confirmation DS-160",
    passportStylePhotograph: "Photographie de style passeport", 
    financialDocuments: "Documents financiers (relevés bancaires, preuve de revenus)",
    travelItineraryAccommodation: "Itinéraire de voyage et preuve d'hébergement",
    completedVisaApplication: "Formulaire de demande de visa complété",
    supportingDocuments: "Documents justificatifs (varie selon le type de visa)"
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
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "PENYANGKALAN HUKUM KRITIS",
    noGuaranteeTitle: "TIDAK ADA JAMINAN PERSETUJUAN VISA:",
    noGuaranteeText: "VisaValidator Pro hanya alat bantu persiapan dokumen. Kami tidak menjamin persetujuan visa, tidak mewakili lembaga pemerintah manapun, dan tidak mempengaruhi keputusan kedutaan.",
    accuracyLimitationsTitle: "KETERBATASAN AKURASI:",
    accuracyLimitationsText: "Meskipun AI kami menganalisis dokumen sesuai persyaratan yang diketahui, hasilnya mungkin tidak 100% akurat. Persyaratan kedutaan sering berubah dan bervariasi menurut keadaan individu.",
    notOfficialGuidanceTitle: "BUKAN PANDUAN RESMI:",
    notOfficialGuidanceText: "Layanan ini tidak menggantikan situs web kedutaan resmi, saran konsuler, atau konsultasi dengan pengacara imigrasi. Selalu verifikasi persyaratan terkini dengan sumber resmi.",
    individualResponsibilityTitle: "TANGGUNG JAWAB INDIVIDU:",
    individualResponsibilityText: "Setiap wisatawan bertanggung jawab penuh untuk memastikan aplikasi visa mereka memenuhi semua persyaratan. Keputusan persetujuan visa dibuat hanya oleh pejabat kedutaan dan konsulat.",
    readFullDisclaimer: "Baca penyangkalan lengkap dan keterbatasan layanan →",
    
    // Features Section
    whyChoose: "Mengapa Memilih VisaValidator Pro",
    securePrivate: "Aman & Pribadi",
    securePrivateDesc: "Semua dokumen otomatis dihapus setelah validasi untuk privasi dan keamanan Anda.",
    fastProcessing: "Pemrosesan Cepat",
    fastProcessingDesc: "Dapatkan hasil validasi dalam hitungan menit, bukan hari.",
    comprehensiveAnalysis: "Analisis Komprehensif",
    comprehensiveAnalysisDesc: "Analisis dokumen bertenaga AI dengan rekomendasi terperinci dan pemeriksaan persyaratan.",
    
    // How it Works
    howItWorks: "Cara Kerja",
    step1: "Pilih Tujuan",
    step1Desc: "Pilih negara tujuan dan jenis visa Anda",
    step2: "Unggah Dokumen",
    step2Desc: "Unggah dokumen aplikasi visa Anda",
    step3: "Masukkan Detail",
    step3Desc: "Isi informasi pribadi Anda",
    step4: "Pratinjau Hasil",
    step4Desc: "Lihat pratinjau validasi sebelum pembayaran",
    step5: "Bayar dan Unduh",
    step5Desc: "Selesaikan pembayaran untuk laporan detail lengkap",
    
    // Pricing Section
    simplePricing: "Harga yang Sederhana dan Transparan",
    perValidation: "Per validasi",
    completeDocAnalysis: "Analisis dokumen lengkap",
    detailedValidationReport: "Laporan validasi terperinci",
    recommendationsChecklist: "Rekomendasi dan daftar periksa",
    secureHandling: "Penanganan dokumen yang aman",
    startValidationButton: "Mulai Validasi",
    
    // Footer and Navigation
    professionalService: "Layanan validasi dokumen profesional untuk pelancong di seluruh dunia.",
    service: "Layanan",
    supportedCountries: "Negara yang Didukung",
    contactUs: "Hubungi Kami",
    legal: "Hukum",
    disclaimer: "Penafian",
    dataProtection: "Perlindungan Data",
    copyright: "© 2024 VisaValidator Pro. Semua hak dilindungi.",
    
    // Country Selection
    selectCountry: "Pilih negara tujuan Anda",
    selectNationality: "Pilih kewarganegaraan Anda",
    selectYourDestination: "Pilih Tujuan Anda",
    chooseDestinationCountry: "Pilih negara yang akan Anda kunjungi",
    selectYourNationality: "Pilih Kewarganegaraan Anda",
    yourNationalityDescription: "Pilih kewarganegaraan Anda untuk mendapat persyaratan visa yang dipersonalisasi",
    popularChoices: "Pilihan Populer",
    searchCountries: "Cari negara...",
    searchNationalities: "Cari kewarganegaraan...",
    proceedToValidation: "Lanjut ke Validasi",
    
    // Visa Types
    tourist: "Wisata",
    business: "Bisnis",
    student: "Pelajar",
    work: "Kerja",
    transit: "Transit",
    family: "Kunjungan Keluarga",
    
    // Document Upload
    uploadFiles: "Unggah Dokumen",
    selectFiles: "Pilih File",
    uploadedFiles: "File yang Diunggah",
    noFilesUploaded: "Belum ada file yang diunggah",
    analyzing: "Menganalisis...",
    uploadSuccess: "Unggahan berhasil",
    
    // Personal Information
    personalInformation: "Informasi Pribadi",
    fullName: "Nama Lengkap",
    firstName: "Nama Depan",
    lastName: "Nama Belakang",
    middleName: "Nama Tengah",
    passportNumber: "Nomor Paspor",
    dateOfBirth: "Tanggal Lahir",
    nationality: "Kewarganegaraan",
    plannedTravelDate: "Tanggal Perjalanan yang Direncanakan",
    durationOfStay: "Durasi Tinggal (hari)",
    
    // Validation Results
    validationResults: "Hasil Validasi",
    overallScore: "Skor Keseluruhan",
    verifiedItems: "Item yang Diverifikasi",
    issuesFound: "Masalah Ditemukan",
    recommendations: "Rekomendasi",
    downloadReport: "Unduh Laporan",
    
    // Payment
    payment: "Pembayaran",
    paymentDescription: "Selesaikan pembayaran untuk menerima laporan validasi lengkap Anda",
    price: "$9.99",
    payNow: "Bayar Sekarang",
    
    // Common
    loading: "Memuat...",
    error: "Kesalahan",
    success: "Berhasil",
    close: "Tutup",
    save: "Simpan",
    cancel: "Batal",
    continue: "Lanjutkan",
    required: "Wajib",
    optional: "Opsional",
    
    // Additional
    contact: "Kontak",
    privacy: "Kebijakan Privasi",
    terms: "Syarat Layanan",
    
    // Step Indicator
    stepDestination: "Tujuan",
    stepNationality: "Kewarganegaraan", 
    stepRequirements: "Persyaratan",
    stepUpload: "Unggah",
    stepInformation: "Informasi",
    stepReview: "Tinjau",
    stepPayment: "Pembayaran",
    
    // Country Selection
    selectDestinationVisa: "Pilih Tujuan & Jenis Visa",
    destinationCountry: "Negara Tujuan",
    selectCountryPlaceholder: "Pilih negara tujuan Anda",
    visaType: "Jenis Visa",
    selectVisaTypePlaceholder: "Pilih jenis visa",
    commonRequirementsFor: "Persyaratan umum untuk",
    
    // Personal Info Form
    selectNationalityPlaceholder: "Pilih kewarganegaraan Anda",
    daysPlaceholder: "Masukkan jumlah hari",
    
    // File Upload
    uploadAnalysisComplete: "Unggah dan Analisis Selesai",
    documentsAnalyzedSuccessfully: "dokumen berhasil dianalisis",
    documentsFailed: "gagal",
    uploadFailed: "Unggahan gagal",
    
    // Validation Results
    validationScore: "Skor Validasi",
    completedOn: "Selesai pada",
    documentsVerified: "Dokumen Terverifikasi",
    
    // Language Modal
    chooseYourLanguage: "Pilih Bahasa Anda",
    selectPreferredLanguage: "Pilih bahasa pilihan Anda untuk aplikasi validasi visa",
    continueButton: "Lanjutkan",
    
    // Extended Visa Types
    medical: "Medis",
    conference: "Konferensi",
    journalist: "Jurnalis", 
    religious: "Agama",
    cultural: "Budaya",
    research: "Penelitian",
    training: "Pelatihan",
    diplomatic: "Diplomatik",
    crew: "Kru",
    investment: "Investasi",
    retirement: "Pensiun",
    volunteer: "Sukarelawan",
    sports: "Olahraga",
    other: "Lainnya",
    
    // Document Requirements
    validPassportMinimum: "Paspor yang valid (minimal 6 bulan berlaku)",
    ds160ConfirmationPage: "Halaman konfirmasi DS-160",
    passportStylePhotograph: "Foto gaya paspor", 
    financialDocuments: "Dokumen keuangan (rekening koran, bukti penghasilan)",
    travelItineraryAccommodation: "Itinerary perjalanan dan bukti akomodasi",
    completedVisaApplication: "Formulir aplikasi visa yang telah diisi",
    supportingDocuments: "Dokumen pendukung (bervariasi menurut jenis visa)"
  }
};

export const translations: Record<string, Record<string, string>> = {};

// Initialize translations for all languages
for (const lang of languages) {
  translations[lang] = {};
  
  // Use language-specific translations if available, otherwise use base English or placeholder
  for (const key in baseKeys) {
    if (languageTranslations[lang] && languageTranslations[lang][key]) {
      // Use full language-specific translations first
      translations[lang][key] = languageTranslations[lang][key];
    } else if (additionalLanguageTranslations[lang] && additionalLanguageTranslations[lang][key]) {
      // Use additional basic translations for critical UI elements
      translations[lang][key] = additionalLanguageTranslations[lang][key];
    } else if (lang === "en") {
      // Use base English for English language
      translations[lang][key] = (baseKeys as any)[key];
    } else {
      // Use placeholder format for languages without any translations
      translations[lang][key] = `[${lang}] ${(baseKeys as any)[key]}`;
    }
  }
}