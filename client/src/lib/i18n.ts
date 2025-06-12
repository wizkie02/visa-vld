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
    selectDestinationVisa: "Select Destination & Visa Type",
    destinationCountry: "Destination Country",
    selectCountryPlaceholder: "Select a country...",
    selectVisaTypePlaceholder: "Select visa type...",
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
    downloadComplete: "Download Complete",
    checklistDownloadedSuccess: "Comprehensive requirements checklist downloaded with the latest information.",
    requirementsDownloadFailed: "Download Failed",
    requirementsDownloadFailedDescription: "Could not download the checklist. Please try again.",
    reviewRequiredDocs: "Please review the current visa requirements before uploading documents",
    destination: "Destination",
    fetchingRequirements: "Fetching current visa requirements online...",
    unableToFetchRequirements: "Unable to fetch current visa requirements",
    tryAgain: "Try Again",
    
    // File Upload
    uploadFiles: "Upload Documents",
    dragDropFiles: "Drag and drop files here, or click to select",
    supportedFormats: "Supported formats: PDF, JPG, PNG, DOCX",
    uploadedDocuments: "Uploaded Documents",
    currentUploads: "Current Uploads",
    documentType: "Document Type",
    confidence: "confidence",
    uploaded: "Uploaded",
    analyzing: "Analyzing...",
    uploadError: "Upload Error",
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
    validationScore: "Validation Score",
    completedOn: "Completed on",
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
    reportDownloadFailed: "Download Failed",
    reportDownloadFailedDesc: "Failed to download report. Please try again.",
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
    
    // Additional Translation Keys
    selectYourNationality: "Select Your Nationality",
    yourNationalityDescription: "Choose your nationality to get personalized visa requirements",
    popularChoices: "Popular Choices",
    searchNationalities: "Search nationalities...",
    proceedToValidation: "Proceed to Validation",
    selectFiles: "Select Files",
    uploadedFiles: "Uploaded Files",
    noFilesUploaded: "No files uploaded yet",
    documentAnalyzed: "Document analyzed successfully",
    issuingCountry: "Issuing Country",
    expirationDate: "Expiration Date",
    documentNumber: "Document Number",
    personalInformation: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phoneNumber: "Phone Number",
    uploading: "Uploading...",
    completed: "Completed",
    failed: "Failed",
    warning: "Warning",
    info: "Information",
    yes: "Yes",
    no: "No",
    ok: "OK",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    search: "Search",
    filter: "Filter",
    clear: "Clear",
    select: "Select",
    all: "All",
    none: "None",
    page: "Page",
    of: "of",
    total: "Total",
    showing: "Showing",
    results: "results",
    noResults: "No results found",
    pleaseWait: "Please wait",
    
    // Footer
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    
    // Documents Section
    documentsPreparation: "Documents Preparation",
    preparationTips: "Preparation Tips",
    tip1: "Ensure all documents are clear and legible",
    tip2: "Scan documents in high resolution (300 DPI or higher)",
    tip3: "Keep original documents for your appointment",
    tip4: "Verify all information matches across documents",
    proceedToUpload: "Proceed to Upload Documents",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "CRITICAL LEGAL DISCLAIMER",
    noGuaranteeTitle: "NO GUARANTEE OF VISA APPROVAL:",
    noGuaranteeText: "VisaValidator Pro is a document preparation assistance tool only. We do not guarantee visa approval, represent any government agency, or influence embassy decisions.",
    accuracyLimitationsTitle: "ACCURACY LIMITATIONS:",
    accuracyLimitationsText: "While our AI analyzes documents against known requirements, results may not be 100% accurate. Embassy requirements change frequently and vary by individual circumstances.",
    notOfficialGuidanceTitle: "NOT OFFICIAL GUIDANCE:",
    notOfficialGuidanceText: "This service does not replace official embassy websites, consular advice, or immigration attorney consultation. Always verify current requirements with official sources.",
    individualResponsibilityTitle: "INDIVIDUAL RESPONSIBILITY:",
    individualResponsibilityText: "Each traveler is solely responsible for ensuring their visa application meets all requirements. Visa approval decisions are made exclusively by embassy and consular officials.",
    readFullDisclaimer: "Read Full Disclaimer & Service Limitations →",
    
    // Features Section
    whyChoose: "Why Choose VisaValidator Pro",
    securePrivate: "Secure & Private",
    securePrivateDesc: "All documents are automatically deleted after validation for your privacy and security.",
    fastProcessing: "Fast Processing",
    fastProcessingDesc: "Get your validation results within minutes, not days.",
    comprehensiveAnalysis: "Comprehensive Analysis",
    comprehensiveAnalysisDesc: "AI-powered document analysis with detailed recommendations and requirements checking.",
    
    // How it Works
    howItWorks: "How it Works",
    step1: "Choose Destination",
    step1Desc: "Select your destination country and visa type",
    step2: "Upload Documents", 
    step2Desc: "Upload your visa application documents",
    step3: "Enter Details",
    step3Desc: "Fill in your personal information",
    step4: "Preview Results",
    step4Desc: "See validation preview before payment",
    step5: "Pay & Download",
    step5Desc: "Complete payment for full detailed report"
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
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "TUYÊN BỐ PHÁP LÝ QUAN TRỌNG",
    noGuaranteeTitle: "KHÔNG BẢO ĐẢMM PHÊ DUYỆT VISA:",
    noGuaranteeText: "VisaValidator Pro chỉ là công cụ hỗ trợ chuẩn bị tài liệu. Chúng tôi không đảm bảo phê duyệt visa, không đại diện cho bất kỳ cơ quan chính phủ nào, hoặc ảnh hưởng đến quyết định của đại sứ quán.",
    accuracyLimitationsTitle: "GIỚI HẠN ĐỘ CHÍNH XÁC:",
    accuracyLimitationsText: "Mặc dù AI của chúng tôi phân tích tài liệu theo các yêu cầu đã biết, kết quả có thể không chính xác 100%. Yêu cầu của đại sứ quán thay đổi thường xuyên và khác nhau theo hoàn cảnh cá nhân.",
    notOfficialGuidanceTitle: "KHÔNG PHẢI HƯỚNG DẪN CHÍNH THỨC:",
    notOfficialGuidanceText: "Dịch vụ này không thay thế các trang web chính thức của đại sứ quán, tư vấn lãnh sự, hoặc tư vấn luật sư di trú. Luôn xác minh các yêu cầu hiện tại với các nguồn chính thức.",
    individualResponsibilityTitle: "TRÁCH NHIỆM CÁ NHÂN:",
    individualResponsibilityText: "Mỗi du khách hoàn toàn chịu trách nhiệm đảm bảo đơn xin visa của họ đáp ứng tất cả các yêu cầu. Quyết định phê duyệt visa được đưa ra độc quyền bởi các quan chức đại sứ quán và lãnh sự.",
    readFullDisclaimer: "Đọc Toàn bộ Tuyên bố Miễn trừ & Giới hạn Dịch vụ →"
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
    terms: "服务条款",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "重要法律免责声明",
    noGuaranteeTitle: "不保证签证获批：",
    noGuaranteeText: "签证验证专家仅为文件准备辅助工具。我们不保证签证获批，不代表任何政府机构，也不影响大使馆决定。",
    accuracyLimitationsTitle: "准确性限制：",
    accuracyLimitationsText: "虽然我们的AI会根据已知要求分析文件，但结果可能不是100%准确。大使馆要求经常变化，因个人情况而异。",
    notOfficialGuidanceTitle: "非官方指导：",
    notOfficialGuidanceText: "此服务不能替代官方大使馆网站、领事建议或移民律师咨询。请务必通过官方渠道核实当前要求。",
    individualResponsibilityTitle: "个人责任：",
    individualResponsibilityText: "每位旅行者都有独自确保其签证申请符合所有要求的责任。签证获批决定完全由大使馆和领事官员做出。",
    readFullDisclaimer: "阅读完整免责声明和服务限制 →",
    
    // Features Section
    whyChoose: "为什么选择签证验证专家",
    securePrivate: "安全私密",
    securePrivateDesc: "所有文件在验证后自动删除，保护您的隐私和安全。",
    fastProcessing: "快速处理",
    fastProcessingDesc: "几分钟内获得验证结果，而不是几天。",
    comprehensiveAnalysis: "全面分析",
    comprehensiveAnalysisDesc: "AI驱动的文件分析，提供详细建议和要求检查。",
    
    // How it Works
    howItWorks: "工作流程",
    step1: "选择目的地",
    step1Desc: "选择您的目的地国家和签证类型",
    step2: "上传文件", 
    step2Desc: "上传您的签证申请文件",
    step3: "输入详情",
    step3Desc: "填写您的个人信息",
    step4: "预览结果",
    step4Desc: "付款前查看验证预览",
    step5: "付款并下载",
    step5Desc: "完成付款获取完整详细报告"
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
    terms: "सेवा की शर्तें",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "महत्वपूर्ण कानूनी अस्वीकरण",
    noGuaranteeTitle: "वीज़ा अनुमोदन की कोई गारंटी नहीं:",
    noGuaranteeText: "वीज़ा वैलिडेटर प्रो केवल एक दस्तावेज़ तैयारी सहायता उपकरण है। हम वीज़ा अनुमोदन की गारंटी नहीं देते, किसी सरकारी एजेंसी का प्रतिनिधित्व नहीं करते, या दूतावास के निर्णयों को प्रभावित नहीं करते।",
    accuracyLimitationsTitle: "सटीकता की सीमाएं:",
    accuracyLimitationsText: "जबकि हमारा AI ज्ञात आवश्यकताओं के अनुसार दस्तावेज़ों का विश्लेषण करता है, परिणाम 100% सटीक नहीं हो सकते। दूतावास की आवश्यकताएं अक्सर बदलती रहती हैं और व्यक्तिगत परिस्थितियों के अनुसार भिन्न होती हैं।",
    notOfficialGuidanceTitle: "आधिकारिक मार्गदर्शन नहीं:",
    notOfficialGuidanceText: "यह सेवा आधिकारिक दूतावास वेबसाइटों, वाणिज्य दूतावास सलाह, या आप्रवासन वकील परामर्श की जगह नहीं लेती। हमेशा आधिकारिक स्रोतों से वर्तमान आवश्यकताओं की पुष्टि करें।",
    individualResponsibilityTitle: "व्यक्तिगत जिम्मेदारी:",
    individualResponsibilityText: "प्रत्येक यात्री यह सुनिश्चित करने के लिए पूर्णतः जिम्मेदार है कि उनका वीज़ा आवेदन सभी आवश्यकताओं को पूरा करता है। वीज़ा अनुमोदन निर्णय विशेष रूप से दूतावास और वाणिज्य दूतावास अधिकारियों द्वारा लिए जाते हैं।",
    readFullDisclaimer: "पूर्ण अस्वीकरण और सेवा सीमाएं पढ़ें →",
    
    // Features Section
    whyChoose: "वीज़ा वैलिडेटर प्रो क्यों चुनें",
    securePrivate: "सुरक्षित और निजी",
    securePrivateDesc: "आपकी गोपनीयता और सुरक्षा के लिए सभी दस्तावेज़ सत्यापन के बाद स्वचालित रूप से हटा दिए जाते हैं।",
    fastProcessing: "तेज़ प्रसंस्करण",
    fastProcessingDesc: "दिनों नहीं, मिनटों में अपने सत्यापन परिणाम प्राप्त करें।",
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
    step5Desc: "पूर्ण विस्तृत रिपोर्ट के लिए भुगतान पूरा करें"
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
    terms: "Términos de Servicio",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "DESCARGO DE RESPONSABILIDAD LEGAL CRÍTICO",
    noGuaranteeTitle: "SIN GARANTÍA DE APROBACIÓN DE VISA:",
    noGuaranteeText: "VisaValidator Pro es solo una herramienta de asistencia para preparación de documentos. No garantizamos la aprobación de visa, no representamos ninguna agencia gubernamental, ni influimos en las decisiones de la embajada.",
    accuracyLimitationsTitle: "LIMITACIONES DE PRECISIÓN:",
    accuracyLimitationsText: "Aunque nuestra IA analiza documentos según requisitos conocidos, los resultados pueden no ser 100% precisos. Los requisitos de embajada cambian frecuentemente y varían según circunstancias individuales.",
    notOfficialGuidanceTitle: "NO ES ORIENTACIÓN OFICIAL:",
    notOfficialGuidanceText: "Este servicio no reemplaza sitios web oficiales de embajadas, asesoría consular, o consulta con abogado de inmigración. Siempre verifique los requisitos actuales con fuentes oficiales.",
    individualResponsibilityTitle: "RESPONSABILIDAD INDIVIDUAL:",
    individualResponsibilityText: "Cada viajero es únicamente responsable de asegurar que su solicitud de visa cumpla todos los requisitos. Las decisiones de aprobación de visa son tomadas exclusivamente por funcionarios de embajada y consulares.",
    readFullDisclaimer: "Leer Descargo Completo y Limitaciones del Servicio →",
    
    // Features Section
    whyChoose: "Por qué Elegir VisaValidator Pro",
    securePrivate: "Seguro y Privado",
    securePrivateDesc: "Todos los documentos se eliminan automáticamente después de la validación para su privacidad y seguridad.",
    fastProcessing: "Procesamiento Rápido",
    fastProcessingDesc: "Obtenga sus resultados de validación en minutos, no días.",
    comprehensiveAnalysis: "Análisis Integral",
    comprehensiveAnalysisDesc: "Análisis de documentos impulsado por IA con recomendaciones detalladas y verificación de requisitos.",
    
    // How it Works
    howItWorks: "Cómo Funciona",
    step1: "Elegir Destino",
    step1Desc: "Seleccione su país de destino y tipo de visa",
    step2: "Subir Documentos", 
    step2Desc: "Suba sus documentos de solicitud de visa",
    step3: "Ingresar Detalles",
    step3Desc: "Complete su información personal",
    step4: "Vista Previa de Resultados",
    step4Desc: "Vea la vista previa de validación antes del pago",
    step5: "Pagar y Descargar",
    step5Desc: "Complete el pago para obtener el reporte detallado completo"
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
    terms: "Conditions de Service",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "AVERTISSEMENT LÉGAL CRITIQUE",
    noGuaranteeTitle: "AUCUNE GARANTIE D'APPROBATION DE VISA :",
    noGuaranteeText: "VisaValidator Pro est uniquement un outil d'assistance à la préparation de documents. Nous ne garantissons pas l'approbation du visa, ne représentons aucune agence gouvernementale, ni n'influençons les décisions d'ambassade.",
    accuracyLimitationsTitle: "LIMITATIONS DE PRÉCISION :",
    accuracyLimitationsText: "Bien que notre IA analyse les documents selon les exigences connues, les résultats peuvent ne pas être précis à 100%. Les exigences d'ambassade changent fréquemment et varient selon les circonstances individuelles.",
    notOfficialGuidanceTitle: "PAS DE GUIDANCE OFFICIELLE :",
    notOfficialGuidanceText: "Ce service ne remplace pas les sites web officiels d'ambassade, les conseils consulaires, ou la consultation d'avocat en immigration. Vérifiez toujours les exigences actuelles avec les sources officielles.",
    individualResponsibilityTitle: "RESPONSABILITÉ INDIVIDUELLE :",
    individualResponsibilityText: "Chaque voyageur est seul responsable de s'assurer que sa demande de visa répond à toutes les exigences. Les décisions d'approbation de visa sont prises exclusivement par les fonctionnaires d'ambassade et consulaires.",
    readFullDisclaimer: "Lire l'Avertissement Complet et les Limitations du Service →",
    
    // Features Section
    whyChoose: "Pourquoi Choisir VisaValidator Pro",
    securePrivate: "Sécurisé et Privé",
    securePrivateDesc: "Tous les documents sont automatiquement supprimés après validation pour votre confidentialité et sécurité.",
    fastProcessing: "Traitement Rapide",
    fastProcessingDesc: "Obtenez vos résultats de validation en minutes, pas en jours.",
    comprehensiveAnalysis: "Analyse Complète",
    comprehensiveAnalysisDesc: "Analyse de documents alimentée par IA avec recommandations détaillées et vérification des exigences.",
    
    // How it Works
    howItWorks: "Comment Ça Marche",
    step1: "Choisir la Destination",
    step1Desc: "Sélectionnez votre pays de destination et type de visa",
    step2: "Télécharger Documents", 
    step2Desc: "Téléchargez vos documents de demande de visa",
    step3: "Entrer les Détails",
    step3Desc: "Remplissez vos informations personnelles",
    step4: "Aperçu des Résultats",
    step4Desc: "Voir l'aperçu de validation avant paiement",
    step5: "Payer et Télécharger",
    step5Desc: "Complétez le paiement pour obtenir le rapport détaillé complet"
  },
  
  ar: {
    appName: "مدقق التأشيرة المحترف",
    back: "رجوع",
    next: "التالي",
    previous: "السابق",
    homeTitle: "التحقق المهني من وثائق التأشيرة",
    homeSubtitle: "تحقق من وثائق السفر بتقنية الذكاء الاصطناعي قبل التقديم",
    startValidation: "بدء التحقق من الوثائق",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "إخلاء مسؤولية قانوني مهم",
    noGuaranteeTitle: "لا ضمان لموافقة التأشيرة:",
    noGuaranteeText: "مدقق التأشيرة المحترف هو مجرد أداة مساعدة لإعداد الوثائق. لا نضمن موافقة التأشيرة، ولا نمثل أي وكالة حكومية، ولا نؤثر على قرارات السفارة.",
    accuracyLimitationsTitle: "قيود الدقة:",
    accuracyLimitationsText: "بينما يحلل الذكاء الاصطناعي الوثائق وفقاً للمتطلبات المعروفة، قد لا تكون النتائج دقيقة بنسبة 100%. متطلبات السفارة تتغير بكثرة وتختلف حسب الظروف الفردية.",
    notOfficialGuidanceTitle: "ليس إرشاداً رسمياً:",
    notOfficialGuidanceText: "هذه الخدمة لا تحل محل مواقع السفارات الرسمية، أو الاستشارة القنصلية، أو استشارة محامي الهجرة. تحقق دائماً من المتطلبات الحالية مع المصادر الرسمية.",
    individualResponsibilityTitle: "المسؤولية الفردية:",
    individualResponsibilityText: "كل مسافر مسؤول بالكامل عن ضمان أن طلب التأشيرة يلبي جميع المتطلبات. قرارات موافقة التأشيرة تتخذ حصرياً من قبل مسؤولي السفارة والقنصلية.",
    readFullDisclaimer: "اقرأ إخلاء المسؤولية الكامل وقيود الخدمة ←",
    
    // Features Section
    whyChoose: "لماذا تختار مدقق التأشيرة المحترف",
    securePrivate: "آمن وخاص",
    securePrivateDesc: "جميع الوثائق تُحذف تلقائياً بعد التحقق لحماية خصوصيتك وأمانك.",
    fastProcessing: "معالجة سريعة",
    fastProcessingDesc: "احصل على نتائج التحقق في دقائق، وليس أيام.",
    comprehensiveAnalysis: "تحليل شامل",
    comprehensiveAnalysisDesc: "تحليل وثائق مدعوم بالذكاء الاصطناعي مع توصيات مفصلة وفحص المتطلبات.",
    
    // How it Works
    howItWorks: "كيف يعمل",
    step1: "اختر الوجهة",
    step1Desc: "اختر بلد الوجهة ونوع التأشيرة",
    step2: "رفع الوثائق", 
    step2Desc: "ارفع وثائق طلب التأشيرة",
    step3: "إدخال التفاصيل",
    step3Desc: "املأ معلوماتك الشخصية",
    step4: "معاينة النتائج",
    step4Desc: "اطلع على معاينة التحقق قبل الدفع",
    step5: "الدفع والتحميل",
    step5Desc: "أكمل الدفع للحصول على التقرير المفصل الكامل"
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
    previous: "Предыдущий",
    homeTitle: "Профессиональная проверка визовых документов",
    homeSubtitle: "Проверьте ваши документы для путешествий с помощью ИИ перед подачей заявления",
    startValidation: "Начать проверку документов",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "КРИТИЧЕСКОЕ ПРАВОВОЕ ПРЕДУПРЕЖДЕНИЕ",
    noGuaranteeTitle: "НЕТ ГАРАНТИИ ОДОБРЕНИЯ ВИЗЫ:",
    noGuaranteeText: "VisaValidator Pro - это только инструмент помощи в подготовке документов. Мы не гарантируем одобрение визы, не представляем никакие государственные агентства и не влияем на решения посольства.",
    accuracyLimitationsTitle: "ОГРАНИЧЕНИЯ ТОЧНОСТИ:",
    accuracyLimitationsText: "Хотя наш ИИ анализирует документы согласно известным требованиям, результаты могут быть не на 100% точными. Требования посольства часто меняются и варьируются в зависимости от индивидуальных обстоятельств.",
    notOfficialGuidanceTitle: "НЕ ОФИЦИАЛЬНОЕ РУКОВОДСТВО:",
    notOfficialGuidanceText: "Эта услуга не заменяет официальные сайты посольств, консульские советы или консультацию с иммиграционным адвокатом. Всегда проверяйте текущие требования с официальными источниками.",
    individualResponsibilityTitle: "ИНДИВИДУАЛЬНАЯ ОТВЕТСТВЕННОСТЬ:",
    individualResponsibilityText: "Каждый путешественник полностью несет ответственность за обеспечение соответствия своего заявления на визу всем требованиям. Решения об одобрении визы принимаются исключительно должностными лицами посольства и консульства.",
    readFullDisclaimer: "Читать полное предупреждение и ограничения услуг →",
    
    // Features Section
    whyChoose: "Почему выбрать VisaValidator Pro",
    securePrivate: "Безопасно и приватно",
    securePrivateDesc: "Все документы автоматически удаляются после проверки для вашей конфиденциальности и безопасности.",
    fastProcessing: "Быстрая обработка",
    fastProcessingDesc: "Получите результаты проверки за минуты, а не дни.",
    comprehensiveAnalysis: "Всесторонний анализ",
    comprehensiveAnalysisDesc: "Анализ документов с помощью ИИ с подробными рекомендациями и проверкой требований.",
    
    // How it Works
    howItWorks: "Как это работает",
    step1: "Выбрать направление",
    step1Desc: "Выберите страну назначения и тип визы",
    step2: "Загрузить документы", 
    step2Desc: "Загрузите документы для заявления на визу",
    step3: "Ввести данные",
    step3Desc: "Заполните вашу личную информацию",
    step4: "Предварительный просмотр результатов",
    step4Desc: "Посмотрите предварительный просмотр проверки перед оплатой",
    step5: "Оплатить и скачать",
    step5Desc: "Завершите оплату для получения полного подробного отчета"
  },
  
  pt: {
    appName: "VisaValidator Pro",
    back: "Voltar",
    next: "Próximo",
    previous: "Anterior",
    homeTitle: "Validação Profissional de Documentos de Visto",
    homeSubtitle: "Valide seus documentos de viagem com tecnologia IA antes da aplicação",
    startValidation: "Iniciar Validação de Documentos",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "AVISO LEGAL CRÍTICO",
    noGuaranteeTitle: "SEM GARANTIA DE APROVAÇÃO DE VISTO:",
    noGuaranteeText: "VisaValidator Pro é apenas uma ferramenta de assistência para preparação de documentos. Não garantimos aprovação de visto, não representamos nenhuma agência governamental, nem influenciamos decisões de embaixada.",
    accuracyLimitationsTitle: "LIMITAÇÕES DE PRECISÃO:",
    accuracyLimitationsText: "Embora nossa IA analise documentos de acordo com requisitos conhecidos, os resultados podem não ser 100% precisos. Requisitos de embaixada mudam frequentemente e variam conforme circunstâncias individuais.",
    notOfficialGuidanceTitle: "NÃO É ORIENTAÇÃO OFICIAL:",
    notOfficialGuidanceText: "Este serviço não substitui sites oficiais de embaixadas, aconselhamento consular, ou consulta com advogado de imigração. Sempre verifique requisitos atuais com fontes oficiais.",
    individualResponsibilityTitle: "RESPONSABILIDADE INDIVIDUAL:",
    individualResponsibilityText: "Cada viajante é inteiramente responsável por garantir que sua aplicação de visto atenda todos os requisitos. Decisões de aprovação de visto são tomadas exclusivamente por funcionários de embaixada e consulares.",
    readFullDisclaimer: "Ler Aviso Completo e Limitações do Serviço →",
    
    // Features Section
    whyChoose: "Por que Escolher VisaValidator Pro",
    securePrivate: "Seguro e Privado",
    securePrivateDesc: "Todos os documentos são automaticamente deletados após validação para sua privacidade e segurança.",
    fastProcessing: "Processamento Rápido",
    fastProcessingDesc: "Obtenha seus resultados de validação em minutos, não dias.",
    comprehensiveAnalysis: "Análise Abrangente",
    comprehensiveAnalysisDesc: "Análise de documentos alimentada por IA com recomendações detalhadas e verificação de requisitos.",
    
    // How it Works
    howItWorks: "Como Funciona",
    step1: "Escolher Destino",
    step1Desc: "Selecione seu país de destino e tipo de visto",
    step2: "Enviar Documentos", 
    step2Desc: "Envie seus documentos de aplicação de visto",
    step3: "Inserir Detalhes",
    step3Desc: "Preencha suas informações pessoais",
    step4: "Visualizar Resultados",
    step4Desc: "Veja a prévia de validação antes do pagamento",
    step5: "Pagar e Baixar",
    step5Desc: "Complete o pagamento para relatório detalhado completo"
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
    previous: "Vorherige",
    homeTitle: "Professionelle Visa-Dokument-Validierung",
    homeSubtitle: "Validieren Sie Ihre Reisedokumente mit KI-Technologie vor der Antragstellung",
    startValidation: "Dokument-Validierung starten",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "KRITISCHER RECHTLICHER HAFTUNGSAUSSCHLUSS",
    noGuaranteeTitle: "KEINE GARANTIE FÜR VISA-GENEHMIGUNG:",
    noGuaranteeText: "VisaValidator Pro ist nur ein Hilfswerkzeug zur Dokumentenvorbereitung. Wir garantieren keine Visa-Genehmigung, vertreten keine Regierungsbehörde und beeinflussen keine Botschaftsentscheidungen.",
    accuracyLimitationsTitle: "GENAUIGKEITSBESCHRÄNKUNGEN:",
    accuracyLimitationsText: "Obwohl unsere KI Dokumente nach bekannten Anforderungen analysiert, können die Ergebnisse nicht 100% genau sein. Botschaftsanforderungen ändern sich häufig und variieren je nach individuellen Umständen.",
    notOfficialGuidanceTitle: "KEINE OFFIZIELLE BERATUNG:",
    notOfficialGuidanceText: "Dieser Service ersetzt nicht offizielle Botschaftswebsites, konsularische Beratung oder Beratung durch Einwanderungsanwälte. Überprüfen Sie immer aktuelle Anforderungen bei offiziellen Quellen.",
    individualResponsibilityTitle: "INDIVIDUELLE VERANTWORTUNG:",
    individualResponsibilityText: "Jeder Reisende ist allein verantwortlich dafür sicherzustellen, dass sein Visa-Antrag alle Anforderungen erfüllt. Visa-Genehmigungsentscheidungen werden ausschließlich von Botschafts- und Konsularbeamten getroffen.",
    readFullDisclaimer: "Vollständigen Haftungsausschluss und Service-Beschränkungen lesen →",
    
    // Features Section
    whyChoose: "Warum VisaValidator Pro wählen",
    securePrivate: "Sicher und Privat",
    securePrivateDesc: "Alle Dokumente werden nach der Validierung automatisch gelöscht für Ihre Privatsphäre und Sicherheit.",
    fastProcessing: "Schnelle Verarbeitung",
    fastProcessingDesc: "Erhalten Sie Ihre Validierungsergebnisse in Minuten, nicht Tagen.",
    comprehensiveAnalysis: "Umfassende Analyse",
    comprehensiveAnalysisDesc: "KI-gestützte Dokumentenanalyse mit detaillierten Empfehlungen und Anforderungsüberprüfung.",
    
    // How it Works
    howItWorks: "Wie es funktioniert",
    step1: "Ziel wählen",
    step1Desc: "Wählen Sie Ihr Zielland und Visa-Typ",
    step2: "Dokumente hochladen", 
    step2Desc: "Laden Sie Ihre Visa-Antragsdokumente hoch",
    step3: "Details eingeben",
    step3Desc: "Füllen Sie Ihre persönlichen Informationen aus",
    step4: "Ergebnisse vorschau",
    step4Desc: "Sehen Sie die Validierungsvorschau vor der Zahlung",
    step5: "Zahlen und herunterladen",
    step5Desc: "Zahlung abschließen für vollständigen detaillierten Bericht"
  },
  
  ja: {
    appName: "ビザバリデータープロ",
    back: "戻る",
    next: "次へ",
    previous: "前へ",
    homeTitle: "プロフェッショナルビザ書類検証",
    homeSubtitle: "申請前にAI技術で旅行書類を検証",
    startValidation: "書類検証を開始",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "重要な法的免責事項",
    noGuaranteeTitle: "ビザ承認の保証なし：",
    noGuaranteeText: "VisaValidator Proは書類準備支援ツールに過ぎません。ビザ承認を保証せず、政府機関を代表せず、大使館の決定に影響を与えません。",
    accuracyLimitationsTitle: "精度の制限：",
    accuracyLimitationsText: "AIは既知の要件に従って書類を分析しますが、結果が100%正確でない場合があります。大使館の要件は頻繁に変更され、個別の状況によって異なります。",
    notOfficialGuidanceTitle: "公式ガイダンスではありません：",
    notOfficialGuidanceText: "このサービスは公式大使館ウェブサイト、領事アドバイス、または移民弁護士相談の代替ではありません。常に公式ソースで現在の要件を確認してください。",
    individualResponsibilityTitle: "個人の責任：",
    individualResponsibilityText: "各旅行者は、ビザ申請がすべての要件を満たすことを確実にする完全な責任を負います。ビザ承認決定は大使館および領事館職員によってのみ行われます。",
    readFullDisclaimer: "完全な免責事項とサービス制限を読む →",
    
    // Features Section
    whyChoose: "なぜVisaValidator Proを選ぶのか",
    securePrivate: "安全でプライベート",
    securePrivateDesc: "プライバシーとセキュリティのため、すべての書類は検証後に自動的に削除されます。",
    fastProcessing: "高速処理",
    fastProcessingDesc: "数日ではなく数分で検証結果を取得。",
    comprehensiveAnalysis: "包括的分析",
    comprehensiveAnalysisDesc: "詳細な推奨事項と要件確認を備えたAI駆動の書類分析。",
    
    // How it Works
    howItWorks: "仕組み",
    step1: "目的地を選択",
    step1Desc: "目的地国とビザタイプを選択",
    step2: "書類をアップロード", 
    step2Desc: "ビザ申請書類をアップロード",
    step3: "詳細を入力",
    step3Desc: "個人情報を記入",
    step4: "結果をプレビュー",
    step4Desc: "支払い前に検証プレビューを確認",
    step5: "支払いとダウンロード",
    step5Desc: "完全な詳細レポートのために支払いを完了"
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
    previous: "이전",
    homeTitle: "전문 비자 서류 검증",
    homeSubtitle: "신청 전 AI 기술로 여행 서류를 검증하세요",
    startValidation: "서류 검증 시작",
    
    // Legal Disclaimer
    criticalLegalDisclaimer: "중요한 법적 면책조항",
    noGuaranteeTitle: "비자 승인 보장 없음:",
    noGuaranteeText: "VisaValidator Pro는 서류 준비 지원 도구일 뿐입니다. 비자 승인을 보장하지 않으며, 정부 기관을 대표하지 않고, 대사관 결정에 영향을 주지 않습니다.",
    accuracyLimitationsTitle: "정확도 제한:",
    accuracyLimitationsText: "AI가 알려진 요구사항에 따라 서류를 분석하지만, 결과가 100% 정확하지 않을 수 있습니다. 대사관 요구사항은 자주 변경되며 개별 상황에 따라 달라집니다.",
    notOfficialGuidanceTitle: "공식 안내가 아님:",
    notOfficialGuidanceText: "이 서비스는 공식 대사관 웹사이트, 영사 조언, 또는 이민 변호사 상담을 대체하지 않습니다. 항상 공식 출처에서 현재 요구사항을 확인하세요.",
    individualResponsibilityTitle: "개인 책임:",
    individualResponsibilityText: "각 여행자는 비자 신청이 모든 요구사항을 충족하는지 확인할 전적인 책임이 있습니다. 비자 승인 결정은 대사관 및 영사관 직원에 의해서만 이루어집니다.",
    readFullDisclaimer: "전체 면책조항 및 서비스 제한사항 읽기 →",
    
    // Features Section
    whyChoose: "왜 VisaValidator Pro를 선택해야 하나요",
    securePrivate: "안전하고 비공개",
    securePrivateDesc: "개인정보 보호와 보안을 위해 모든 서류는 검증 후 자동으로 삭제됩니다.",
    fastProcessing: "빠른 처리",
    fastProcessingDesc: "며칠이 아닌 몇 분 만에 검증 결과를 받으세요.",
    comprehensiveAnalysis: "포괄적 분석",
    comprehensiveAnalysisDesc: "상세한 권장사항과 요구사항 확인이 포함된 AI 기반 서류 분석.",
    
    // How it Works
    howItWorks: "작동 방식",
    step1: "목적지 선택",
    step1Desc: "목적지 국가와 비자 유형을 선택하세요",
    step2: "서류 업로드", 
    step2Desc: "비자 신청 서류를 업로드하세요",
    step3: "세부사항 입력",
    step3Desc: "개인 정보를 입력하세요",
    step4: "결과 미리보기",
    step4Desc: "결제 전 검증 미리보기를 확인하세요",
    step5: "결제 및 다운로드",
    step5Desc: "전체 상세 보고서를 위한 결제를 완료하세요"
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