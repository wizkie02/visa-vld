import { useState, useEffect } from 'react';

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

export const translations: Record<string, Record<string, string>> = {
  en: {
    // Header & Navigation
    appName: "VisaValidator Pro",
    back: "Back",
    next: "Next",
    previous: "Previous",
    
    // Home Page
    homeTitle: "Professional Visa Document Validation",
    homeSubtitle: "Get your travel documents verified by AI technology before applying",
    startValidation: "Start Document Validation",
    
    // Workflow Steps
    stepDestination: "Destination",
    stepNationality: "Nationality",
    stepRequirements: "Requirements", 
    stepUpload: "Upload",
    stepInformation: "Information",
    stepReview: "Review",
    stepPayment: "Payment",
    
    // Country & Visa Selection
    selectCountry: "Select your destination country",
    selectNationality: "Select your nationality",
    selectVisaType: "Select visa type",
    chooseDestination: "Choose Destination",
    chooseNationality: "Choose Your Nationality",
    tourist: "Tourist",
    business: "Business",
    student: "Student",
    work: "Work",
    
    // Countries
    china: "China",
    japan: "Japan",
    usa: "United States",
    uk: "United Kingdom", 
    germany: "Germany",
    france: "France",
    netherlands: "Netherlands",
    vietnam: "Vietnam",
    
    // Requirements
    requiredDocuments: "Required Documents",
    downloadChecklist: "Download Requirements Checklist",
    viewRequirements: "View Detailed Requirements",
    
    // File Upload
    uploadFiles: "Upload Documents",
    dragDropFiles: "Drag and drop files here, or click to select",
    supportedFormats: "Supported formats: PDF, JPG, PNG, DOCX",
    analyzing: "Analyzing...",
    uploadSuccess: "Upload successful",
    removeFile: "Remove file",
    
    // Personal Information
    personalInfo: "Personal Information",
    fullName: "Full Name",
    passportNumber: "Passport Number", 
    dateOfBirth: "Date of Birth",
    nationality: "Nationality",
    travelDate: "Travel Date",
    stayDuration: "Stay Duration (days)",
    
    // Validation
    startValidationBtn: "Start Validation",
    analyzingDocuments: "Analyzing Documents...",
    validationComplete: "Validation Complete",
    validationFailed: "Validation Failed",
    
    // Results
    validationResults: "Validation Results",
    validationPreview: "Validation Results Preview",
    overallScore: "Overall Score",
    preliminaryScore: "Preliminary Validation Score",
    verifiedItems: "Verified Items",
    issuesFound: "Issues Found",
    documentsFound: "Documents Found",
    issuesDetected: "Issues Detected",
    recommendations: "Recommendations",
    downloadReport: "Download Report",
    downloadCompleteReport: "Download Complete Report",
    missingRequiredDocs: "Missing Required Documents",
    incompleteApplication: "Incomplete Application - Missing Required Documents",
    strongApplication: "Strong Application",
    goodApplication: "Good Application with Minor Issues",
    needsImprovement: "Application Needs Improvement",
    
    // Payment
    payment: "Payment",
    paymentRequired: "Complete Payment for Full Report",
    paymentDescription: "Complete payment to receive your full validation report",
    fullValidationReport: "Full Validation Report",
    completeAnalysis: "Complete analysis and recommendations",
    price: "$9.99",
    oneTimeFee: "One-time fee",
    payNow: "Pay Now",
    payGetFullReport: "Pay & Get Full Report",
    backToReview: "Back to Review",
    securePayment: "Secure payment powered by Stripe. Full report available immediately after payment.",
    
    // Completion
    validationCompleteTitle: "Validation Complete!",
    validationCompleteDesc: "Your documents have been successfully validated. You can now download your comprehensive report.",
    validateAnother: "Validate Another Destination",
    returnHome: "Return to Home",
    thankYou: "Thank you for using our visa document validation service. Keep your report for your visa application.",
    
    // Language Selection
    selectLanguage: "Select Language",
    languagePreference: "Language Preference",
    changeLanguage: "Change Language",
    chooseLanguage: "Choose your preferred language",
    continueInLanguage: "Continue in {language}",
    
    // Toast Messages
    reportDownloaded: "Professional Report Downloaded",
    reportDownloadDesc: "Your comprehensive validation report with logo and disclaimer has been downloaded.",
    downloadFailed: "Download Failed",
    downloadFailedDesc: "Failed to download report. Please try again.",
    documentAnalysisComplete: "Document analysis completed using AI technology",
    paymentSuccess: "Payment Successful",
    paymentFailed: "Payment Failed",
    processing: "Processing...",
    
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
    
    // Footer
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    
    // Documents Section
    reviewRequiredDocs: "Please review the required documents before uploading", 
    documentsPreparation: "Documents Preparation",
    preparationTips: "Preparation Tips",
    tip1: "Ensure all documents are clear and legible",
    tip2: "Scan documents in high resolution (300 DPI or higher)",
    tip3: "Keep original documents for your appointment",
    tip4: "Verify all information matches across documents",
    proceedToUpload: "Proceed to Upload Documents"
  },
  
  vi: {
    // Header & Navigation
    appName: "VisaValidator Pro",
    back: "Quay lại",
    next: "Tiếp theo", 
    previous: "Trước đó",
    
    // Home Page
    homeTitle: "Xác thực Tài liệu Visa Chuyên nghiệp",
    homeSubtitle: "Xác minh tài liệu du lịch bằng công nghệ AI trước khi nộp đơn",
    startValidation: "Bắt đầu Xác thực Tài liệu",
    
    // Workflow Steps
    stepDestination: "Điểm đến",
    stepNationality: "Quốc tịch", 
    stepRequirements: "Yêu cầu",
    stepUpload: "Tải lên",
    stepInformation: "Thông tin",
    stepReview: "Xem xét",
    stepPayment: "Thanh toán",
    
    // Country & Visa Selection
    selectCountry: "Chọn quốc gia đích",
    selectNationality: "Chọn quốc tịch của bạn",
    selectVisaType: "Chọn loại visa",
    chooseDestination: "Chọn Điểm đến",
    chooseNationality: "Chọn Quốc tịch của Bạn",
    tourist: "Du lịch",
    business: "Kinh doanh",
    student: "Du học",
    work: "Lao động",
    
    // Countries
    china: "Trung Quốc",
    japan: "Nhật Bản", 
    usa: "Hoa Kỳ",
    uk: "Vương quốc Anh",
    germany: "Đức",
    france: "Pháp",
    netherlands: "Hà Lan",
    vietnam: "Việt Nam",
    
    // Requirements
    requiredDocuments: "Tài liệu Bắt buộc",
    downloadChecklist: "Tải Danh sách Yêu cầu",
    viewRequirements: "Xem Yêu cầu Chi tiết",
    
    // File Upload
    uploadFiles: "Tải lên Tài liệu",
    dragDropFiles: "Kéo thả tệp vào đây hoặc nhấp để chọn",
    supportedFormats: "Định dạng hỗ trợ: PDF, JPG, PNG, DOCX",
    analyzing: "Đang phân tích...",
    uploadSuccess: "Tải lên thành công",
    removeFile: "Xóa tệp",
    
    // Personal Information
    personalInfo: "Thông tin Cá nhân",
    fullName: "Họ và Tên",
    passportNumber: "Số Hộ chiếu",
    dateOfBirth: "Ngày sinh",
    nationality: "Quốc tịch",
    travelDate: "Ngày du lịch", 
    stayDuration: "Thời gian lưu trú (ngày)",
    
    // Validation
    startValidationBtn: "Bắt đầu Xác thực",
    analyzingDocuments: "Đang phân tích Tài liệu...",
    validationComplete: "Xác thực Hoàn tất",
    validationFailed: "Xác thực Thất bại",
    
    // Results
    validationResults: "Kết quả Xác thực",
    validationPreview: "Xem trước Kết quả Xác thực",
    overallScore: "Điểm Tổng thể",
    preliminaryScore: "Điểm Xác thực Sơ bộ",
    verifiedItems: "Mục đã Xác minh",
    issuesFound: "Vấn đề đã Tìm thấy",
    documentsFound: "Tài liệu đã Tìm thấy",
    issuesDetected: "Vấn đề được Phát hiện",
    recommendations: "Khuyến nghị",
    downloadReport: "Tải Báo cáo",
    downloadCompleteReport: "Tải Báo cáo Hoàn chỉnh",
    missingRequiredDocs: "Thiếu Tài liệu Bắt buộc",
    incompleteApplication: "Đơn chưa Đầy đủ - Thiếu Tài liệu Bắt buộc",
    strongApplication: "Đơn Mạnh",
    goodApplication: "Đơn Tốt với Vấn đề Nhỏ",
    needsImprovement: "Đơn Cần Cải thiện",
    
    // Payment
    payment: "Thanh toán",
    paymentRequired: "Hoàn thành Thanh toán cho Báo cáo Đầy đủ",
    paymentDescription: "Hoàn thành thanh toán để nhận báo cáo xác thực đầy đủ",
    fullValidationReport: "Báo cáo Xác thực Đầy đủ",
    completeAnalysis: "Phân tích và khuyến nghị hoàn chỉnh",
    price: "$9.99",
    oneTimeFee: "Phí một lần",
    payNow: "Thanh toán Ngay",
    payGetFullReport: "Thanh toán & Nhận Báo cáo Đầy đủ",
    backToReview: "Quay lại Xem xét",
    securePayment: "Thanh toán an toàn được hỗ trợ bởi Stripe. Báo cáo đầy đủ có sẵn ngay sau khi thanh toán.",
    
    // Completion
    validationCompleteTitle: "Xác thực Hoàn tất!",
    validationCompleteDesc: "Tài liệu của bạn đã được xác thực thành công. Bạn có thể tải báo cáo toàn diện.",
    validateAnother: "Xác thực Điểm đến Khác",
    returnHome: "Quay về Trang chủ",
    thankYou: "Cảm ơn bạn đã sử dụng dịch vụ xác thực tài liệu visa. Giữ báo cáo cho đơn xin visa của bạn.",
    
    // Language Selection
    selectLanguage: "Chọn Ngôn ngữ",
    languagePreference: "Tùy chọn Ngôn ngữ",
    changeLanguage: "Thay đổi Ngôn ngữ",
    chooseLanguage: "Chọn ngôn ngữ ưa thích",
    continueInLanguage: "Tiếp tục bằng {language}",
    
    // Toast Messages
    reportDownloaded: "Đã Tải Báo cáo Chuyên nghiệp",
    reportDownloadDesc: "Báo cáo xác thực toàn diện với logo và tuyên bố miễn trừ trách nhiệm đã được tải.",
    downloadFailed: "Tải xuống Thất bại",
    downloadFailedDesc: "Không thể tải báo cáo. Vui lòng thử lại.",
    documentAnalysisComplete: "Phân tích tài liệu hoàn tất bằng công nghệ AI",
    
    // Documents Section
    reviewRequiredDocs: "Vui lòng xem xét các tài liệu bắt buộc trước khi tải lên",
    documentsPreparation: "Chuẩn bị Tài liệu",
    preparationTips: "Mẹo Chuẩn bị",
    tip1: "Đảm bảo tất cả tài liệu rõ ràng và dễ đọc",
    tip2: "Quét tài liệu với độ phân giải cao (300 DPI trở lên)",
    tip3: "Giữ tài liệu gốc cho cuộc hẹn",
    tip4: "Xác minh tất cả thông tin khớp giữa các tài liệu",
    proceedToUpload: "Tiến hành Tải lên Tài liệu",
    
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
    
    // Footer
    about: "Giới thiệu",
    contact: "Liên hệ",
    privacy: "Chính sách Bảo mật",
    terms: "Điều khoản Dịch vụ",
  },
  
  zh: {
    appName: "签证验证专家",
    back: "返回",
    next: "下一步",
    previous: "上一步",
    homeTitle: "专业签证文件验证",
    homeSubtitle: "使用AI技术在申请前验证您的旅行文件",
    startValidation: "开始文件验证",
    step1Title: "选择目的地和签证类型",
    step2Title: "上传文件",
    step3Title: "个人信息",
    step4Title: "审核和验证",
    step5Title: "结果和付款",
    selectCountry: "选择您的目的地国家",
    selectVisaType: "选择签证类型",
    tourist: "旅游",
    business: "商务",
    student: "学生",
    work: "工作",
    uploadFiles: "上传文件",
    dragDropFiles: "拖放文件到此处，或点击选择",
    supportedFormats: "支持格式：PDF、JPG、PNG、DOCX",
    analyzing: "分析中...",
    uploadSuccess: "上传成功",
    personalInfo: "个人信息",
    fullName: "全名",
    passportNumber: "护照号码",
    dateOfBirth: "出生日期",
    nationality: "国籍",
    travelDate: "旅行日期",
    stayDuration: "停留天数",
    validationResults: "验证结果",
    overallScore: "总分",
    verifiedItems: "已验证项目",
    issuesFound: "发现的问题",
    recommendations: "建议",
    downloadReport: "下载报告",
    payment: "付款",
    paymentDescription: "完成付款以获取完整验证报告",
    price: "$9.99",
    payNow: "立即付款",
    loading: "加载中...",
    error: "错误",
    success: "成功",
    close: "关闭",
    save: "保存",
    cancel: "取消",
    about: "关于",
    contact: "联系",
    privacy: "隐私政策",
    terms: "服务条款"
  },
  
  hi: {
    appName: "वीज़ा वैलिडेटर प्रो",
    back: "वापस",
    next: "अगला", 
    previous: "पिछला",
    homeTitle: "पेशेवर वीज़ा दस्तावेज़ सत्यापन",
    homeSubtitle: "आवेदन से पहले अपने यात्रा दस्तावेज़ों को AI तकनीक से सत्यापित कराएं",
    startValidation: "दस्तावेज़ सत्यापन शुरू करें",
    step1Title: "गंतव्य और वीज़ा प्रकार चुनें",
    step2Title: "दस्तावेज़ अपलोड करें",
    step3Title: "व्यक्तिगत जानकारी",
    step4Title: "समीक्षा और सत्यापन",
    step5Title: "परिणाम और भुगतान",
    selectCountry: "अपना गंतव्य देश चुनें",
    selectVisaType: "वीज़ा प्रकार चुनें",
    tourist: "पर्यटक",
    business: "व्यापार",
    student: "छात्र",
    work: "कार्य",
    uploadFiles: "दस्तावेज़ अपलोड करें",
    dragDropFiles: "फ़ाइलों को यहाँ खींचकर छोड़ें, या चुनने के लिए क्लिक करें",
    supportedFormats: "समर्थित प्रारूप: PDF, JPG, PNG, DOCX",
    analyzing: "विश्लेषण कर रहे हैं...",
    uploadSuccess: "अपलोड सफल",
    personalInfo: "व्यक्तिगत जानकारी",
    fullName: "पूरा नाम",
    passportNumber: "पासपोर्ट नंबर",
    dateOfBirth: "जन्म तिथि",
    nationality: "राष्ट्रीयता",
    travelDate: "यात्रा तिथि",
    stayDuration: "ठहरने की अवधि (दिन)",
    validationResults: "सत्यापन परिणाम",
    overallScore: "कुल स्कोर",
    verifiedItems: "सत्यापित आइटम",
    issuesFound: "मिली समस्याएं",
    recommendations: "सिफारिशें",
    downloadReport: "रिपोर्ट डाउनलोड करें",
    payment: "भुगतान",
    paymentDescription: "पूर्ण सत्यापन रिपोर्ट प्राप्त करने के लिए भुगतान पूरा करें",
    price: "$9.99",
    payNow: "अभी भुगतान करें",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    close: "बंद करें",
    save: "सहेजें",
    cancel: "रद्द करें",
    about: "के बारे में",
    contact: "संपर्क",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें"
  },
  
  es: {
    appName: "VisaValidator Pro",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    homeTitle: "Validación Profesional de Documentos de Visa",
    homeSubtitle: "Verifica tus documentos de viaje con tecnología AI antes de aplicar",
    startValidation: "Iniciar Validación de Documentos",
    step1Title: "Seleccionar Destino y Tipo de Visa",
    step2Title: "Subir Documentos",
    step3Title: "Información Personal",
    step4Title: "Revisar y Validar",
    step5Title: "Resultados y Pago",
    selectCountry: "Selecciona tu país de destino",
    selectVisaType: "Selecciona tipo de visa",
    tourist: "Turista",
    business: "Negocios",
    student: "Estudiante",
    work: "Trabajo",
    uploadFiles: "Subir Documentos",
    dragDropFiles: "Arrastra y suelta archivos aquí, o haz clic para seleccionar",
    supportedFormats: "Formatos soportados: PDF, JPG, PNG, DOCX",
    analyzing: "Analizando...",
    uploadSuccess: "Subida exitosa",
    personalInfo: "Información Personal",
    fullName: "Nombre Completo",
    passportNumber: "Número de Pasaporte",
    dateOfBirth: "Fecha de Nacimiento",
    nationality: "Nacionalidad",
    travelDate: "Fecha de Viaje",
    stayDuration: "Duración de Estadía (días)",
    validationResults: "Resultados de Validación",
    overallScore: "Puntuación General",
    verifiedItems: "Elementos Verificados",
    issuesFound: "Problemas Encontrados",
    recommendations: "Recomendaciones",
    downloadReport: "Descargar Reporte",
    payment: "Pago",
    paymentDescription: "Completa el pago para recibir tu reporte completo de validación",
    price: "$9.99",
    payNow: "Pagar Ahora",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    close: "Cerrar",
    save: "Guardar",
    cancel: "Cancelar",
    about: "Acerca de",
    contact: "Contacto",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio"
  },
  
  fr: {
    appName: "VisaValidator Pro",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    homeTitle: "Validation Professionnelle de Documents de Visa",
    homeSubtitle: "Faites vérifier vos documents de voyage par l'IA avant de postuler",
    startValidation: "Commencer la Validation des Documents",
    step1Title: "Sélectionner Destination et Type de Visa",
    step2Title: "Télécharger Documents",
    step3Title: "Informations Personnelles",
    step4Title: "Réviser et Valider",
    step5Title: "Résultats et Paiement",
    selectCountry: "Sélectionnez votre pays de destination",
    selectVisaType: "Sélectionnez le type de visa",
    tourist: "Touriste",
    business: "Affaires",
    student: "Étudiant",
    work: "Travail",
    uploadFiles: "Télécharger Documents",
    dragDropFiles: "Glissez et déposez les fichiers ici, ou cliquez pour sélectionner",
    supportedFormats: "Formats supportés: PDF, JPG, PNG, DOCX",
    analyzing: "Analyse en cours...",
    uploadSuccess: "Téléchargement réussi",
    personalInfo: "Informations Personnelles",
    fullName: "Nom Complet",
    passportNumber: "Numéro de Passeport",
    dateOfBirth: "Date de Naissance",
    nationality: "Nationalité",
    travelDate: "Date de Voyage",
    stayDuration: "Durée de Séjour (jours)",
    validationResults: "Résultats de Validation",
    overallScore: "Score Global",
    verifiedItems: "Éléments Vérifiés",
    issuesFound: "Problèmes Trouvés",
    recommendations: "Recommandations",
    downloadReport: "Télécharger le Rapport",
    payment: "Paiement",
    paymentDescription: "Complétez le paiement pour recevoir votre rapport complet de validation",
    price: "$9.99",
    payNow: "Payer Maintenant",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    close: "Fermer",
    save: "Sauvegarder",
    cancel: "Annuler",
    about: "À Propos",
    contact: "Contact",
    privacy: "Politique de Confidentialité",
    terms: "Conditions de Service"
  },
  
  ar: {
    appName: "مدقق التأشيرة المحترف",
    back: "رجوع",
    next: "التالي",
    previous: "السابق"
  },
  
  bn: {
    appName: "ভিসা ভ্যালিডেটর প্রো",
    back: "পিছনে",
    next: "পরবর্তী",
    previous: "পূর্ববর্তী"
  },
  
  ru: {
    appName: "VisaValidator Pro",
    back: "Назад",
    next: "Далее",
    previous: "Предыдущий"
  },
  
  pt: {
    appName: "VisaValidator Pro",
    back: "Voltar",
    next: "Próximo",
    previous: "Anterior"
  },
  
  id: {
    appName: "VisaValidator Pro",
    back: "Kembali",
    next: "Selanjutnya",
    previous: "Sebelumnya"
  },
  
  ur: {
    appName: "ویزا ویلیڈیٹر پرو",
    back: "واپس",
    next: "اگلا",
    previous: "پچھلا"
  },
  
  de: {
    appName: "VisaValidator Pro",
    back: "Zurück",
    next: "Weiter",
    previous: "Vorherige"
  },
  
  ja: {
    appName: "ビザバリデータープロ",
    back: "戻る",
    next: "次へ",
    previous: "前へ"
  },
  
  sw: {
    appName: "VisaValidator Pro",
    back: "Nyuma",
    next: "Inayofuata",
    previous: "Iliyotangulia"
  },
  
  te: {
    appName: "వీసా వేలిడేటర్ ప్రో",
    back: "వెనుకకు",
    next: "తరువాత",
    previous: "మునుపటి"
  },
  
  mr: {
    appName: "व्हिसा व्हॅलिडेटर प्रो",
    back: "मागे",
    next: "पुढे",
    previous: "मागील"
  },
  
  ta: {
    appName: "வீசா சரிபார்ப்பாளர் புரோ",
    back: "பின்னோக்கு",
    next: "அடுத்து",
    previous: "முந்தைய"
  },
  
  tr: {
    appName: "VisaValidator Pro",
    back: "Geri",
    next: "İleri",
    previous: "Önceki"
  },
  
  ko: {
    appName: "비자검증기 프로",
    back: "뒤로",
    next: "다음",
    previous: "이전"
  }
};

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }

    // Listen for language change events
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const changeLanguage = (languageCode: string) => {
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode)) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('preferredLanguage', languageCode);
      // Trigger a window event to notify all components
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: languageCode }));
    }
  };

  const t = (key: string): string => {
    const languageTranslations = translations[currentLanguage] || translations.en;
    return languageTranslations[key] || translations.en[key] || key;
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: SUPPORTED_LANGUAGES
  };
}