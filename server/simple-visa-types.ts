/**
 * 🚀 SIMPLE VISA TYPES SERVICE
 *
 * Burn down complex logic, start fresh
 * Fast, reliable, no dependencies
 */

import { logger } from './logger';

// Pre-defined visa types for popular countries
const VISA_TYPES_DATA = {
  usa: {
    country: "United States",
    visaTypes: [
      {
        id: "b1_b2",
        name: "B1/B2 Visitor Visa",
        category: "tourist|business",
        duration: "Up to 6 months",
        purpose: "Tourism, business meetings, medical treatment",
        description: "For temporary pleasure visits or business activities",
        requirements: [
          "Valid passport (6 months validity)",
          "DS-160 confirmation page",
          "Passport photo (2x2 inches)",
          "Proof of financial support",
          "Return ticket"
        ],
        processingTime: "3-5 working days",
        fees: { amount: "185", currency: "USD" },
        applicationMethods: ["Online application", "In-person interview"],
        officialSources: [
          {
            name: "U.S. Department of State",
            website: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html"
          }
        ]
      },
      {
        id: "f1",
        name: "F1 Student Visa",
        category: "student",
        duration: "Duration of study program",
        purpose: "Academic studies in US institutions",
        description: "For full-time academic or language study programs",
        requirements: [
          "I-20 form from SEVP-certified school",
          "Valid passport",
          "SEVIS fee payment receipt",
          "Proof of financial support",
          "Academic transcripts"
        ],
        processingTime: "3-5 working days",
        fees: { amount: "185", currency: "USD" },
        applicationMethods: ["Online application", "In-person interview"],
        officialSources: [
          {
            name: "U.S. Department of State",
            website: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
          }
        ]
      },
      {
        id: "h1b",
        name: "H1B Work Visa",
        category: "work",
        duration: "Up to 3 years (extendable to 6 years)",
        purpose: "Specialty occupation work",
        description: "For professionals in specialty occupations requiring bachelor's degree or higher",
        requirements: [
          "Job offer from US employer",
          "Bachelor's degree or equivalent",
          "Labor Condition Application (LCA)",
          "Company sponsorship",
          "Professional credentials"
        ],
        processingTime: "2-8 months",
        fees: { amount: "190", currency: "USD" },
        applicationMethods: ["Employer petition", "In-person interview"],
        officialSources: [
          {
            name: "U.S. Department of State",
            website: "https://travel.state.gov/content/travel/en/us-visas/immigrate/temporary-worker-visas.html"
          }
        ]
      },
      {
        id: "f2",
        name: "F-2 Family Visa",
        category: "family",
        duration: "Same as principal F-1 holder",
        purpose: "Dependents of F-1 students",
        description: "For spouses and unmarried children under 21 of F-1 students",
        requirements: [
          "Proof of relationship to F-1 holder",
          "Valid F-1 holder status",
          "Financial support from F-1 holder",
          "Valid passport",
          "I-20 form (for dependents)"
        ],
        processingTime: "2-4 weeks",
        fees: { amount: "185", currency: "USD" },
        applicationMethods: ["Online application + embassy interview"],
        officialSources: [
          {
            name: "U.S. Department of State",
            website: "https://travel.state.gov/content/travel/en/us-visas/family-family/f2-visa.html"
          }
        ]
      },
      {
        id: "h4",
        name: "H-4 Family Visa",
        category: "family",
        duration: "Same as principal H-1B holder",
        purpose: "Dependents of H-1B workers",
        description: "For spouses and unmarried children under 21 of H-1B workers",
        requirements: [
          "Proof of relationship to H-1B holder",
          "Valid H-1B holder status",
          "Financial support from H-1B holder",
          "Valid passport"
        ],
        processingTime: "2-4 weeks",
        fees: { amount: "185", currency: "USD" },
        applicationMethods: ["Online application + embassy interview"],
        officialSources: [
          {
            name: "U.S. Department of State",
            website: "https://travel.state.gov/content/travel/en/us-visas/family-family/h4-visa.html"
          }
        ]
      },
      {
        id: "permanent_resident",
        name: "Green Card (Permanent Resident)",
        category: "family|work",
        duration: "Permanent (10-year renewal)",
        purpose: "Permanent residency in the US",
        description: "For permanent immigration to the United States through family, employment, or diversity lottery",
        requirements: [
          "Approved petition (family, employment, or diversity)",
          "Priority date current",
          "Medical examination",
          "Police certificates",
          "Affidavit of support (if required)",
          "Financial documentation"
        ],
        processingTime: "8 months - 2 years",
        fees: { amount: "1,140", currency: "USD" },
        applicationMethods: ["Application through USCIS + consulate processing"],
        officialSources: [
          {
            name: "U.S. Citizenship and Immigration Services",
            website: "https://www.uscis.gov/green-card"
          }
        ]
      }
    ]
  },

  france: {
    country: "France",
    visaTypes: [
      {
        id: "schengen_c",
        name: "Schengen Visa (Type C)",
        category: "tourist|business",
        duration: "Up to 90 days",
        purpose: "Short-term tourism, business, family visits",
        description: "Allows travel within Schengen Area for short stays",
        requirements: [
          "Valid passport (3 months beyond stay)",
          "Schengen visa application form",
          "Passport photos",
          "Travel insurance (€30,000 coverage)",
          "Proof of accommodation",
          "Proof of sufficient funds (€65/day)"
        ],
        processingTime: "15 calendar days",
        fees: { amount: "80", currency: "EUR" },
        applicationMethods: ["Online application", "In-person appointment"],
        officialSources: [
          {
            name: "France-Visas",
            website: "https://france-visas.gouv.fr"
          }
        ]
      },
      {
        id: "long_stay",
        name: "Long-Stay Visa (Type D)",
        category: "student|work|family",
        duration: "More than 90 days",
        purpose: "Study, work, family reunification",
        description: "For extended stays in France",
        requirements: [
          "Valid passport",
          "Long-stay visa application",
          "Purpose-specific documents (study/work/family)",
          "Proof of financial resources",
          "Medical insurance"
        ],
        processingTime: "2-3 months",
        fees: { amount: "99", currency: "EUR" },
        applicationMethods: ["Online application", "In-person appointment"],
        officialSources: [
          {
            name: "France-Visas",
            website: "https://france-visas.gouv.fr"
          }
        ]
      }
    ]
  },

  japan: {
    country: "Japan",
    visaTypes: [
      {
        id: "temporary_visitor",
        name: "Temporary Visitor Visa",
        category: "tourist|business",
        duration: "Up to 90 days",
        purpose: "Tourism, business meetings, conferences",
        description: "For short-term visits to Japan",
        requirements: [
          "Valid passport",
          "Visa application form",
          "Passport photos",
          "Flight itinerary",
          "Hotel reservations",
          "Proof of financial support"
        ],
        processingTime: "5 working days",
        fees: { amount: "30", currency: "USD" },
        applicationMethods: ["In-person application"],
        officialSources: [
          {
            name: "Ministry of Foreign Affairs of Japan",
            website: "https://www.mofa.go.jp/j_info/visit/visa/short.html"
          }
        ]
      },
      {
        id: "student_visa",
        name: "Student Visa",
        category: "student",
        duration: "Up to 2 years (renewable)",
        purpose: "Study at Japanese educational institutions",
        description: "For international students to study in Japan",
        requirements: [
          "Valid passport",
          "Certificate of Eligibility (COE)",
          "School admission letter",
          "Proof of financial support",
          "Academic transcripts",
          "Health examination certificate"
        ],
        processingTime: "1-3 months",
        fees: { amount: "30", currency: "USD" },
        applicationMethods: ["In-person application", "Mail application"],
        officialSources: [
          {
            name: "Ministry of Foreign Affairs of Japan",
            website: "https://www.mofa.go.jp/j_info/visit/visa/long.html"
          }
        ]
      },
      {
        id: "work_visa_engineer",
        name: "Engineer/Specialist in Humanities/International Services Visa",
        category: "work",
        duration: "Up to 5 years (renewable)",
        purpose: "Professional work in Japan",
        description: "For skilled professionals working in Japanese companies",
        requirements: [
          "Valid passport",
          "Certificate of Eligibility (COE)",
          "Job offer from Japanese company",
          "Professional degree or experience",
          " employment contract",
          "Proof of qualifications"
        ],
        processingTime: "2-4 months",
        fees: { amount: "30", currency: "USD" },
        applicationMethods: ["In-person application"],
        officialSources: [
          {
            name: "Ministry of Foreign Affairs of Japan",
            website: "https://www.mofa.go.jp/j_info/visit/visa/long.html"
          }
        ]
      },
      {
        id: "work_visa_skilled_labor",
        name: "Specified Skilled Worker Visa",
        category: "work",
        duration: "Up to 5 years (renewable)",
        purpose: "Skilled work in specific industries",
        description: "For foreign workers with specific skills in designated industries",
        requirements: [
          "Valid passport",
          "Certificate of Eligibility (COE)",
          "Pass skill assessment test",
          "Japanese language proficiency test",
          "Job offer in designated industry",
          "Work experience verification"
        ],
        processingTime: "2-3 months",
        fees: { amount: "30", currency: "USD" },
        applicationMethods: ["In-person application"],
        officialSources: [
          {
            name: "Ministry of Foreign Affairs of Japan",
            website: "https://www.mofa.go.jp/j_info/visit/visa/long.html"
          }
        ]
      },
      {
        id: "spouse_visa",
        name: "Spouse or Child of Japanese National Visa",
        category: "family",
        duration: "Up to 1 year (renewable)",
        purpose: "Join Japanese spouse or parent",
        description: "For foreign spouses and children of Japanese nationals",
        requirements: [
          "Valid passport",
          "Marriage certificate (for spouse)",
          "Birth certificate (for child)",
          "Japanese family register (Koseki)",
          "Proof of relationship",
          "Financial support documentation"
        ],
        processingTime: "1-2 months",
        fees: { amount: "30", currency: "USD" },
        applicationMethods: ["In-person application"],
        officialSources: [
          {
            name: "Ministry of Foreign Affairs of Japan",
            website: "https://www.mofa.go.jp/j_info/visit/visa/long.html"
          }
        ]
      },
      {
        id: "spouse_permanent_resident_visa",
        name: "Spouse or Child of Permanent Resident Visa",
        category: "family",
        duration: "Up to 1 year (renewable)",
        purpose: "Join permanent resident spouse or parent",
        description: "For foreign spouses and children of Japanese permanent residents",
        requirements: [
          "Valid passport",
          "Marriage certificate (for spouse)",
          "Birth certificate (for child)",
          "Permanent resident status of family member",
          "Proof of relationship",
          "Financial support documentation"
        ],
        processingTime: "2-4 months",
        fees: { amount: "30", currency: "USD" },
        applicationMethods: ["In-person application"],
        officialSources: [
          {
            name: "Ministry of Foreign Affairs of Japan",
            website: "https://www.mofa.go.jp/j_info/visit/visa/long.html"
          }
        ]
      },
      {
        id: "designated_activities_visa",
        name: "Designated Activities Visa",
        category: "other",
        duration: "Up to 3 years (case-dependent)",
        purpose: "Specific activities authorized by Minister",
        description: "For various special activities not covered by other visa types",
        requirements: [
          "Valid passport",
          "Certificate of Eligibility (COE)",
          "Detailed activity plan",
          "Supporting documents for specific activity",
          "Proof of financial support",
          "Local government or organization approval"
        ],
        processingTime: "1-3 months",
        fees: { amount: "30", currency: "USD" },
        applicationMethods: ["In-person application"],
        officialSources: [
          {
            name: "Ministry of Foreign Affairs of Japan",
            website: "https://www.mofa.go.jp/j_info/visit/visa/long.html"
          }
        ]
      },
      {
        id: "transit_visa",
        name: "Transit Visa",
        category: "transit",
        duration: "Up to 72 hours",
        purpose: "Airport transit or short stopover",
        description: "For travelers transiting through Japan",
        requirements: [
          "Valid passport",
          "Valid visa for final destination",
          "Confirmed onward travel ticket",
          "Proof of sufficient funds",
          "Transit purpose documentation"
        ],
        processingTime: "3-5 working days",
        fees: { amount: "15", currency: "USD" },
        applicationMethods: ["In-person application"],
        officialSources: [
          {
            name: "Ministry of Foreign Affairs of Japan",
            website: "https://www.mofa.go.jp/j_info/visit/visa/transit.html"
          }
        ]
      }
    ]
  },

  uk: {
    country: "United Kingdom",
    visaTypes: [
      {
        id: "standard_visitor",
        name: "Standard Visitor Visa",
        category: "tourist|business",
        duration: "Up to 6 months",
        purpose: "Tourism, business meetings, family visits",
        description: "For temporary visits to the UK",
        requirements: [
          "Valid passport",
          "Visa application form",
          "Proof of financial support",
          "Accommodation details",
          "Return ticket"
        ],
        processingTime: "3 weeks",
        fees: { amount: "100", currency: "GBP" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "UK Visas and Immigration",
            website: "https://www.gov.uk/standard-visitor-visa"
          }
        ]
      }
    ]
  },

  canada: {
    country: "Canada",
    visaTypes: [
      {
        id: "temporary_resident",
        name: "Temporary Resident Visa (Visitor)",
        category: "tourist|business",
        duration: "Up to 6 months",
        purpose: "Tourism, business meetings, visiting family",
        description: "For temporary visits to Canada for tourism, business or family visits",
        requirements: [
          "Valid passport",
          "Visitor visa application form (IMM 5257)",
          "Photos",
          "Proof of financial support",
          "Letter of invitation (if visiting family)",
          "Travel itinerary"
        ],
        processingTime: "2-4 weeks",
        fees: { amount: "100", currency: "CAD" },
        applicationMethods: ["Online application", "Paper application"],
        officialSources: [
          {
            name: "Immigration, Refugees and Citizenship Canada",
            website: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html"
          }
        ]
      },
      {
        id: "study_permit",
        name: "Study Permit",
        category: "student",
        duration: "Length of study + 90 days",
        purpose: "Academic studies at designated learning institutions",
        description: "For international students to study in Canada",
        requirements: [
          "Letter of acceptance from DLI",
          "Proof of financial support",
          "Valid passport",
          "Study permit application",
          "Medical exam (if required)",
          "Police certificate (if required)"
        ],
        processingTime: "4-6 weeks",
        fees: { amount: "150", currency: "CAD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Immigration, Refugees and Citizenship Canada",
            website: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"
          }
        ]
      },
      {
        id: "work_permit",
        name: "Work Permit",
        category: "work",
        duration: "Varies (usually 1-4 years)",
        purpose: "Employment in Canada",
        description: "For temporary foreign workers with job offers",
        requirements: [
          "Job offer from Canadian employer",
          "Labour Market Impact Assessment (LMIA)",
          "Work permit application",
          "Proof of qualifications",
          "Medical exam (if required)"
        ],
        processingTime: "8-12 weeks",
        fees: { amount: "155", currency: "CAD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Immigration, Refugees and Citizenship Canada",
            website: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/apply.html"
          }
        ]
      },
      {
        id: "permanent_resident",
        name: "Permanent Resident Visa",
        category: "family|work",
        duration: "Permanent",
        purpose: "Immigration to Canada permanently",
        description: "For people who want to immigrate to Canada permanently",
        requirements: [
          "Complete application package",
          "Medical exam",
          "Police certificates",
          "Proof of funds",
          "Language test results",
          "Educational credential assessment"
        ],
        processingTime: "6-12 months",
        fees: { amount: "850", currency: "CAD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Immigration, Refugees and Citizenship Canada",
            website: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html"
          }
        ]
      }
    ]
  },

  australia: {
    country: "Australia",
    visaTypes: [
      {
        id: "visitor_visa_600",
        name: "Visitor Visa (Subclass 600)",
        category: "tourist|business",
        duration: "Up to 12 months",
        purpose: "Tourism, business meetings, visiting family",
        description: "For temporary visits to Australia for tourism, business, or visiting family and friends",
        requirements: [
          "Valid passport",
          "Visitor visa application form",
          "Digital photo",
          "Health insurance (recommended)",
          "Proof of financial support",
          "Letter of invitation (if visiting family)",
          "Travel itinerary"
        ],
        processingTime: "15-30 calendar days",
        fees: { amount: "150", currency: "AUD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Department of Home Affairs",
            website: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visitor-visa"
          }
        ]
      },
      {
        id: "student_visa_500",
        name: "Student Visa (Subclass 500)",
        category: "student",
        duration: "Duration of course + 3 months",
        purpose: "Full-time study in Australia",
        description: "For international students to study full-time in Australia",
        requirements: [
          "Confirmation of Enrolment (CoE)",
          "Genuine Temporary Entrant (GTE) requirement",
          "Evidence of sufficient funds",
          "English language proficiency test (IELTS/TOEFL)",
          "Overseas Student Health Cover (OSHC)",
          "Valid passport",
          "Character and health requirements"
        ],
        processingTime: "4-6 weeks",
        fees: { amount: "710", currency: "AUD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Department of Home Affairs",
            website: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/student-visa"
          }
        ]
      },
      {
        id: "work_visa_482",
        name: "Temporary Skill Shortage Visa (Subclass 482)",
        category: "work",
        duration: "Up to 4 years (extendable)",
        purpose: "Temporary work in Australia",
        description: "For skilled workers to work in Australia temporarily in occupations on the skilled occupation list",
        requirements: [
          "Skills assessment from relevant authority",
          "Nomination from an Australian employer or state/territory government",
          "English language proficiency test",
          "Skills assessment",
          "Health insurance",
          "Character requirements"
        ],
        processingTime: "4-6 months",
        fees: { amount: "4,240", currency: "AUD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Department of Home Affairs",
            website: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/work-visa/temporary-skills-shortage-visa"
          }
        ]
      },
      {
        id: "work_visa_189",
        name: "Skilled Independent Visa (Subclass 189)",
        category: "work",
        duration: "Permanent",
        purpose: "Skilled migration to Australia",
        description: "For skilled workers who want to live and work in Australia permanently without sponsorship",
        requirements: [
          "Points test score (minimum 65 points)",
          "Skills assessment",
          "English language proficiency",
          "Age requirements (under 45 years)",
          "Nomination (optional, extra points)",
          "Health and character requirements"
        ],
        processingTime: "6-12 months",
        fees: { amount: "4,115", currency: "AUD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Department of Home Affairs",
            website: "https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-assessment"
          }
        ]
      },
      {
        id: "work_visa_190",
        name: "Skilled Nominated Visa (Subclass 190)",
        category: "work",
        duration: "Permanent",
        purpose: "Skilled migration with state nomination",
        description: "For skilled workers nominated by an Australian state or territory government",
        requirements: [
          "State or territory nomination",
          "Skills assessment",
          "English language proficiency",
          "Points test (minimum 60 points)",
          "Health and character requirements",
          "Age requirements (under 45 years)"
        ],
        processingTime: "6-12 months",
        fees: { amount: "4,115", currency: "AUD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Department of Home Affairs",
            website: "https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-nominated-visa"
          }
        ]
      },
      {
        id: "partner_visa_309",
        name: "Partner Visa (Subclass 309)",
        category: "family",
        duration: "Temporary (can lead to permanent)",
        purpose: "Join or stay with your partner in Australia",
        description: "For partners or spouses of Australian citizens or permanent residents",
        requirements: [
          "Evidence of genuine relationship",
          "Partner is Australian citizen or permanent resident",
          "Sponsorship from partner",
          "Health and character requirements",
          "Proof of financial support"
        ],
        processingTime: "12-18 months",
        fees: { amount: "8,505", currency: "AUD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Department of Home Affairs",
            website: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/partner-visa"
          }
        ]
      },
      {
        id: "parent_visa_143",
        name: "Parent Visa (Subclass 143)",
        category: "family",
        duration: "Permanent",
        purpose: "Join children in Australia",
        description: "For parents of Australian citizens or permanent residents",
        requirements: [
          "Child is Australian citizen or permanent resident",
          "Balance of family test",
          "Sponsorship from child",
          "Health and character requirements",
          "Financial support evidence"
        ],
        processingTime: "30-45 months",
        fees: { amount: "4,745", currency: "AUD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Department of Home Affairs",
            website: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/parent-visa"
          }
        ]
      },
      {
        id: "training_visa_407",
        name: "Training Visa (Subclass 407)",
        category: "work",
        duration: "Up to 2 years",
        purpose: "Workplace-based training in Australia",
        description: "For people who want to undertake workplace-based training in Australia to enhance their skills",
        requirements: [
          "Approved training program",
          "Training plan from employer",
          "English language proficiency",
          "Health insurance",
          "Genuine temporary entrant requirement"
        ],
        processingTime: "4-6 weeks",
        fees: { amount: "330", currency: "AUD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Department of Home Affairs",
            website: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/training-visa"
          }
        ]
      },
      {
        id: "working_holiday_visa_462",
        name: "Working Holiday Visa (Subclass 462)",
        category: "other",
        duration: "Up to 12 months (extendable to 24 months for eligible countries)",
        purpose: "Holiday and work in Australia",
        description: "For young adults from eligible countries to have an extended holiday while working",
        requirements: [
          "Valid passport",
          "Age 18-30 years (35 for some countries)",
          "Application from eligible country",
          "No dependent children",
          "Sufficient funds for initial stay (AUD 5,000)",
          "Health insurance (recommended)",
          "No specific work or study restrictions"
        ],
        processingTime: "1-3 months",
        fees: { amount: "510", currency: "AUD" },
        applicationMethods: ["Online application"],
        officialSources: [
          {
            name: "Department of Home Affairs",
            website: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/working-holiday-visa"
          }
        ]
      }
    ]
  }
};

// Simple fallback for countries not in our data
function getFallbackVisaTypes(country: string) {
  return {
    country: country.charAt(0).toUpperCase() + country.slice(1),
    visaTypes: [
      {
        id: "tourist_visa",
        name: "Tourist Visa",
        category: "tourist",
        duration: "Up to 90 days",
        purpose: "Tourism and short-term visits",
        description: "Standard tourist visa for leisure travel",
        requirements: [
          "Valid passport",
          "Passport photos",
          "Proof of funds",
          "Return ticket"
        ],
        processingTime: "Information not available",
        fees: { amount: "Not specified", currency: "Local currency" },
        applicationMethods: ["Contact embassy"],
        officialSources: []
      },
      {
        id: "business_visa",
        name: "Business Visa",
        category: "business",
        duration: "Up to 90 days",
        purpose: "Business meetings and conferences",
        description: "Visa for business-related activities",
        requirements: [
          "Valid passport",
          "Invitation letter",
          "Business documents"
        ],
        processingTime: "Information not available",
        fees: { amount: "Not specified", currency: "Local currency" },
        applicationMethods: ["Contact embassy"],
        officialSources: []
      }
    ]
  };
}

// Helper function to categorize visa types
function categorizeVisaTypes(visaTypes: any[]) {
  return {
    tourist: visaTypes.filter(v => {
      const category = v.category?.toLowerCase() || '';
      return ['tourist', 'visitor', 'tourism'].some(cat => category.includes(cat));
    }),
    business: visaTypes.filter(v => {
      const category = v.category?.toLowerCase() || '';
      return ['business', 'commercial'].some(cat => category.includes(cat));
    }),
    student: visaTypes.filter(v => {
      const category = v.category?.toLowerCase() || '';
      return ['student', 'study', 'education', 'academic'].some(cat => category.includes(cat));
    }),
    work: visaTypes.filter(v => {
      const category = v.category?.toLowerCase() || '';
      return ['work', 'employment', 'skilled', 'labor', 'working'].some(cat => category.includes(cat));
    }),
    family: visaTypes.filter(v => {
      const category = v.category?.toLowerCase() || '';
      return ['family', 'spouse', 'partner', 'dependent', 'child'].some(cat => category.includes(cat));
    }),
    transit: visaTypes.filter(v => {
      const category = v.category?.toLowerCase() || '';
      return ['transit', 'airside', 'stopover'].some(cat => category.includes(cat));
    }),
    other: visaTypes.filter(v => {
      const category = v.category?.toLowerCase() || '';
      const excludedCategories = ['tourist', 'visitor', 'tourism', 'business', 'commercial', 'transit', 'airside', 'stopover', 'student', 'study', 'education', 'academic', 'work', 'employment', 'skilled', 'labor', 'working', 'family', 'spouse', 'partner', 'dependent', 'child'];
      return !excludedCategories.some(cat => category.includes(cat));
    })
  };
}

export async function getVisaTypes(country: string, nationality?: string) {
  const countryKey = country.toLowerCase();

  logger.info(`[SIMPLE-VISA-TYPES] Getting visa types for ${country}, nationality: ${nationality || 'NOT PROVIDED'}`);

  try {
    // 📚 Check if we have predefined data first
    const countryData = VISA_TYPES_DATA[countryKey as keyof typeof VISA_TYPES_DATA];
    if (countryData) {
      const categories = categorizeVisaTypes(countryData.visaTypes);
      logger.info(`[SIMPLE-VISA-TYPES] ✅ Using predefined data for ${country} (${countryData.visaTypes.length} visa types)`);

      return {
        ...countryData,
        categories,
        lastUpdated: "2025-10-09",
        source: nationality
          ? `Official Research (Pre-defined) for ${nationality} citizens`
          : "Official Research (Pre-defined)",
        confidence: 0.75,
        basedOn: nationality
          ? `Government official sources for ${nationality} citizens`
          : "Government official sources (researched)",
        apiData: {
          verificationSource: "Pre-defined research",
          realTimeVerified: false,
          aiGenerated: false,
          universalCoverage: false,
          nationality: nationality
        }
      };
    }

    // 🤖 Try OpenAI Visa Advisor (real-time web search + GPT-4o)
    const { openaiVisaAdvisor } = await import('./openai-visa-advisor');

    // Always use OpenAI for certain countries to get real-time data
    const shouldUseOpenAI = nationality && (
      !VISA_TYPES_DATA[countryKey as keyof typeof VISA_TYPES_DATA] ||
      countryKey === 'costa-rica' // Always use OpenAI for Costa Rica
    );

    if (shouldUseOpenAI) {
      try {
        const openaiData = await openaiVisaAdvisor.getVisaTypes(nationality, country);

        // Validate OpenAI response quality (more lenient for testing)
        const isValidOpenAIResponse = openaiData &&
          openaiData.length > 0 &&
          openaiData.some(visa =>
            visa.visa_type &&
            !visa.visa_type.includes('Not specified')
          );

        if (isValidOpenAIResponse) {
          // Convert to expected format
          const visaTypes = openaiData.map((visa, index) => ({
            id: `visa_${index + 1}`,
            name: visa.visa_type,
            category: categorizeVisaType(visa.purpose),
            duration: visa.duration,
            purpose: visa.purpose,
            description: visa.eligibility,
            requirements: visa.required_documents,
            processingTime: visa.processing_time,
            fees: {
              amount: visa.cost,
              currency: extractCurrency(visa.cost)
            },
            applicationMethods: [visa.application_method],
            officialSources: [{
              name: `${country} Embassy/Consulate`,
              website: generateEmbassyWebsite(country)
            }]
          }));

          const categories = categorizeVisaTypes(visaTypes);

          logger.info(`[SIMPLE-VISA-TYPES] ✅ Using OpenAI data for ${country} (${visaTypes.length} visa types)`);

          return {
            country,
            visaTypes,
            categories,
            lastUpdated: "2025-10-09",
            source: `OpenAI GPT-4o (Web Search + AI Analysis) for ${nationality} citizens`,
            confidence: 0.85,
            basedOn: "Real-time web search and AI analysis",
            apiData: {
              verificationSource: "OpenAI GPT-4o",
              realTimeVerified: true,
              aiGenerated: true,
              searchEnabled: true,
              nationality: nationality
            }
          };
        } else {
          logger.warn(`[SIMPLE-VISA-TYPES] OpenAI returned poor quality data for ${country}, falling back to predefined data`);
        }
      } catch (openaiError) {
        logger.warn(`[SIMPLE-VISA-TYPES] OpenAI failed for ${country}, falling back to predefined data:`, openaiError);
      }
    }

    // 📚 Use predefined data if available
    const predefinedCountryData = VISA_TYPES_DATA[countryKey as keyof typeof VISA_TYPES_DATA];
    if (predefinedCountryData) {
      const categories = categorizeVisaTypes(predefinedCountryData.visaTypes);
      logger.info(`[SIMPLE-VISA-TYPES] ✅ Using predefined data for ${country} (${predefinedCountryData.visaTypes.length} visa types)`);

      return {
        ...predefinedCountryData,
        categories,
        lastUpdated: "2025-10-09",
        source: nationality
          ? `Official Research (Pre-defined) for ${nationality} citizens`
          : "Official Research (Pre-defined)",
        confidence: 0.75,
        basedOn: nationality
          ? `Government official sources for ${nationality} citizens`
          : "Government official sources (researched)",
        apiData: {
          verificationSource: "Pre-defined research",
          realTimeVerified: false,
          aiGenerated: false,
          universalCoverage: false,
          nationality: nationality
        }
      };
    }

    // 🌍 Fallback - use simple template data for countries not in predefined data
    logger.info(`[SIMPLE-VISA-TYPES] Using fallback template for ${country}`);
    const fallbackData = getFallbackVisaTypes(country);
    const categories = categorizeVisaTypes(fallbackData.visaTypes);

    return {
      ...fallbackData,
      categories,
      lastUpdated: "2025-10-09",
      source: "Regional Template (Fast Response)",
      confidence: 0.6,
      basedOn: "Standard regional patterns - verify with official sources",
      apiData: {
        verificationSource: "Template-based",
        realTimeVerified: false,
        aiGenerated: false,
        universalCoverage: false,
        nationality: nationality
      }
    };

  } catch (error) {
    logger.error(`[SIMPLE-VISA-TYPES] All methods failed for ${country}`, error);

    // 🔄 Try real-time verification for 6 premium countries
    try {
      const { visaVerifier } = await import('./real-time-visa-verifier');
      const verifiedData = await visaVerifier.getVerifiedVisaData(country);

      const categories = categorizeVisaTypes(verifiedData.visaTypes);

      return {
        country: verifiedData.country,
        visaTypes: verifiedData.visaTypes,
        categories,
        lastUpdated: verifiedData.lastVerified,
        source: verifiedData.verificationSource,
        confidence: verifiedData.confidence,
        basedOn: "Real-time official government sources",
        apiData: {
          verificationSource: verifiedData.verificationSource,
          realTimeVerified: true,
          aiGenerated: false,
          universalCoverage: false
        }
      };
    } catch (error2) {
      // 📚 Fallback to pre-defined data if all else fails
      logger.warn(`[SIMPLE-VISA-TYPES] All methods failed for ${country}, using pre-defined data`, error2);

      const countryData = VISA_TYPES_DATA[countryKey as keyof typeof VISA_TYPES_DATA];

      if (countryData) {
        const categories = categorizeVisaTypes(countryData.visaTypes);
        return {
          ...countryData,
          categories,
          lastUpdated: "2025-10-09",
          source: "Official Research (Pre-defined)",
          confidence: 0.75,
          basedOn: "Government official sources (researched)",
          apiData: {
            verificationSource: "Pre-defined research",
            realTimeVerified: false,
            aiGenerated: false,
            universalCoverage: false
          }
        };
      }

      // Ultimate fallback for unknown countries
      const fallbackData = getFallbackVisaTypes(country);
      const categories = categorizeVisaTypes(fallbackData.visaTypes);
      return {
        ...fallbackData,
        categories,
        lastUpdated: "2025-10-09",
        source: "Fallback (Limited data)",
        confidence: 0.5,
        basedOn: "Standard visa categories - please verify with official sources",
        apiData: {
          verificationSource: "Standard template",
          realTimeVerified: false,
          aiGenerated: false,
          universalCoverage: false
        }
      };
    }
  }
}

// Helper functions
function categorizeVisaType(purpose: string): string {
  const lower = purpose.toLowerCase();

  if (lower.includes('tourist') || lower.includes('visitor') || lower.includes('travel')) {
    return 'tourist';
  }
  if (lower.includes('business') || lower.includes('commercial')) {
    return 'business';
  }
  if (lower.includes('student') || lower.includes('study') || lower.includes('education')) {
    return 'student';
  }
  if (lower.includes('work') || lower.includes('employment') || lower.includes('job')) {
    return 'work';
  }
  if (lower.includes('family') || lower.includes('spouse') || lower.includes('dependent')) {
    return 'family';
  }
  if (lower.includes('transit') || lower.includes('transit')) {
    return 'transit';
  }

  return 'other';
}

function extractCurrency(cost: string): string {
  // Try to extract currency from cost string
  const currencyMatch = cost.match(/(?:USD|EUR|GBP|CAD|AUD|JPY|SGD|CNY|INR|VND|THB|MYR|PHP)/i);
  return currencyMatch ? currencyMatch[0].toUpperCase() : 'USD';
}

function generateEmbassyWebsite(country: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(country + ' embassy visa website')}`;
}