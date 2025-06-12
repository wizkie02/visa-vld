interface CountrySpecificRule {
  country: string;
  nameFormatting: {
    strictMatching: boolean;
    allNamesRequired: boolean;
    orderMustMatch: boolean;
    noAbbreviations: boolean;
    specificRules: string[];
  };
  documentRequirements: {
    photoSpecs: string[];
    passportValidityMonths: number;
    specificForms: string[];
    additionalRequirements: string[];
  };
  applicationProcess: {
    onlineApplicationRequired: boolean;
    inPersonSubmission: boolean;
    appointmentRequired: boolean;
    processingTimeRange: string;
  };
}

export const COUNTRY_SPECIFIC_RULES: Record<string, CountrySpecificRule> = {
  vietnam: {
    country: "Vietnam",
    nameFormatting: {
      strictMatching: true,
      allNamesRequired: true,
      orderMustMatch: true,
      noAbbreviations: true,
      specificRules: [
        "ALL names from passport must be written EXACTLY as they appear",
        "Include all middle names and maiden names",
        "Order must match passport precisely",
        "No nicknames or short forms allowed",
        "Spacing and punctuation must match exactly"
      ]
    },
    documentRequirements: {
      photoSpecs: ["4x6cm", "White background", "Taken within last 6 months"],
      passportValidityMonths: 6,
      specificForms: ["NA1 form", "Entry/Exit form"],
      additionalRequirements: [
        "Invitation letter may be required",
        "Proof of accommodation booking",
        "Return flight tickets"
      ]
    },
    applicationProcess: {
      onlineApplicationRequired: false,
      inPersonSubmission: true,
      appointmentRequired: false,
      processingTimeRange: "3-5 business days"
    }
  },
  china: {
    country: "China",
    nameFormatting: {
      strictMatching: true,
      allNamesRequired: true,
      orderMustMatch: true,
      noAbbreviations: true,
      specificRules: [
        "Full name including all given names as shown in passport",
        "No abbreviations allowed in any part of name",
        "Include all middle names",
        "Chinese characters not required but helpful if available"
      ]
    },
    documentRequirements: {
      photoSpecs: ["48mm x 33mm", "White background", "Bare head", "Recent within 6 months"],
      passportValidityMonths: 6,
      specificForms: ["V.2013 form"],
      additionalRequirements: [
        "Invitation letter from Chinese entity",
        "Detailed itinerary",
        "Hotel bookings or accommodation proof"
      ]
    },
    applicationProcess: {
      onlineApplicationRequired: true,
      inPersonSubmission: true,
      appointmentRequired: true,
      processingTimeRange: "4-10 business days"
    }
  },
  "schengen-area": {
    country: "Schengen Area",
    nameFormatting: {
      strictMatching: true,
      allNamesRequired: true,
      orderMustMatch: true,
      noAbbreviations: true,
      specificRules: [
        "Name order and spelling must match passport exactly",
        "Include all names shown in passport",
        "Surname and given names must be clearly distinguished",
        "No partial names or nicknames allowed"
      ]
    },
    documentRequirements: {
      photoSpecs: ["35mm x 45mm", "Light background", "80% face coverage"],
      passportValidityMonths: 3,
      specificForms: ["Schengen visa application form"],
      additionalRequirements: [
        "Travel insurance minimum €30,000",
        "Proof of accommodation",
        "Flight reservations"
      ]
    },
    applicationProcess: {
      onlineApplicationRequired: true,
      inPersonSubmission: true,
      appointmentRequired: true,
      processingTimeRange: "15 calendar days"
    }
  },
  usa: {
    country: "United States",
    nameFormatting: {
      strictMatching: true,
      allNamesRequired: true,
      orderMustMatch: true,
      noAbbreviations: false,
      specificRules: [
        "Strict name consistency across all documents",
        "All names from passport must appear in forms",
        "If name has changed, provide documentation",
        "Given names can be abbreviated if consistent"
      ]
    },
    documentRequirements: {
      photoSpecs: ["2x2 inches", "White background", "Taken within 6 months"],
      passportValidityMonths: 6,
      specificForms: ["DS-160 online form"],
      additionalRequirements: [
        "SEVIS fee for students",
        "Biometric data collection",
        "Interview required for most applicants"
      ]
    },
    applicationProcess: {
      onlineApplicationRequired: true,
      inPersonSubmission: true,
      appointmentRequired: true,
      processingTimeRange: "3-5 weeks"
    }
  },
  uk: {
    country: "United Kingdom",
    nameFormatting: {
      strictMatching: true,
      allNamesRequired: true,
      orderMustMatch: true,
      noAbbreviations: true,
      specificRules: [
        "All names from passport must be included",
        "No partial names or nicknames",
        "Include all given names and surnames",
        "Name changes must be documented"
      ]
    },
    documentRequirements: {
      photoSpecs: ["45mm x 35mm", "Light grey or cream background"],
      passportValidityMonths: 6,
      specificForms: ["Online application form"],
      additionalRequirements: [
        "Biometric information required",
        "Financial documents",
        "Accommodation proof"
      ]
    },
    applicationProcess: {
      onlineApplicationRequired: true,
      inPersonSubmission: true,
      appointmentRequired: true,
      processingTimeRange: "3 weeks"
    }
  }
};

export function getCountrySpecificRules(country: string): CountrySpecificRule | null {
  const normalizedCountry = country.toLowerCase().replace(/\s+/g, "-");
  return COUNTRY_SPECIFIC_RULES[normalizedCountry] || null;
}

export function getNameFormattingRules(country: string): string[] {
  const rules = getCountrySpecificRules(country);
  return rules?.nameFormatting.specificRules || [
    "Ensure name matches passport exactly",
    "Include all names as shown in official documents"
  ];
}

export function validateNameFormatting(
  passportName: string, 
  applicationName: string, 
  country: string
): { isValid: boolean; issues: string[] } {
  const rules = getCountrySpecificRules(country);
  const issues: string[] = [];
  
  if (!rules) {
    return { isValid: true, issues: [] };
  }
  
  const { strictMatching, allNamesRequired, orderMustMatch, noAbbreviations } = rules.nameFormatting;
  
  if (strictMatching && passportName !== applicationName) {
    if (orderMustMatch) {
      issues.push("Name order must match passport exactly");
    }
    if (allNamesRequired) {
      issues.push("All names from passport must be included");
    }
    if (noAbbreviations && applicationName.includes('.')) {
      issues.push("No abbreviations allowed for this destination");
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}