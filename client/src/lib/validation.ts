export interface ValidationRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  formats?: string[];
}

export interface CountryVisaRequirements {
  country: string;
  visaType: string;
  requirements: ValidationRequirement[];
}

// Mock visa requirements data
export const visaRequirements: Record<string, Record<string, ValidationRequirement[]>> = {
  usa: {
    tourist: [
      {
        id: "passport",
        name: "Valid Passport",
        description: "Passport must be valid for at least 6 months beyond intended stay",
        required: true,
        formats: ["pdf", "jpg", "png"],
      },
      {
        id: "ds160",
        name: "DS-160 Confirmation",
        description: "Completed DS-160 online application confirmation page",
        required: true,
        formats: ["pdf"],
      },
      {
        id: "photo",
        name: "Passport Photo",
        description: "Recent passport-style photograph meeting US requirements",
        required: true,
        formats: ["jpg", "png"],
      },
      {
        id: "financial",
        name: "Financial Documents",
        description: "Bank statements, income proof, or sponsorship documents",
        required: true,
        formats: ["pdf", "jpg", "png", "docx"],
      },
      {
        id: "itinerary",
        name: "Travel Itinerary",
        description: "Flight bookings, hotel reservations, or detailed travel plans",
        required: false,
        formats: ["pdf", "jpg", "png", "docx"],
      },
    ],
    business: [
      {
        id: "passport",
        name: "Valid Passport",
        description: "Passport must be valid for at least 6 months beyond intended stay",
        required: true,
        formats: ["pdf", "jpg", "png"],
      },
      {
        id: "ds160",
        name: "DS-160 Confirmation",
        description: "Completed DS-160 online application confirmation page",
        required: true,
        formats: ["pdf"],
      },
      {
        id: "invitation",
        name: "Business Invitation",
        description: "Letter of invitation from US company or organization",
        required: true,
        formats: ["pdf", "docx"],
      },
    ],
  },
  uk: {
    tourist: [
      {
        id: "passport",
        name: "Valid Passport",
        description: "Passport must be valid for the duration of stay",
        required: true,
        formats: ["pdf", "jpg", "png"],
      },
      {
        id: "application",
        name: "Visa Application",
        description: "Completed UK visa application form",
        required: true,
        formats: ["pdf"],
      },
      {
        id: "financial",
        name: "Financial Evidence",
        description: "Bank statements and income proof",
        required: true,
        formats: ["pdf", "jpg", "png", "docx"],
      },
    ],
  },
};

export function getRequirementsForCountryAndVisa(country: string, visaType: string): ValidationRequirement[] {
  return visaRequirements[country]?.[visaType] || [];
}

export function validateDocumentAgainstRequirements(
  uploadedFiles: Array<{ originalName: string; mimetype: string }>,
  requirements: ValidationRequirement[]
): {
  verified: Array<{ type: string; message: string }>;
  issues: Array<{ type: string; title: string; description: string; recommendation: string }>;
  score: number;
} {
  const verified: Array<{ type: string; message: string }> = [];
  const issues: Array<{ type: string; title: string; description: string; recommendation: string }> = [];

  // Check each requirement
  requirements.forEach((req) => {
    const hasMatchingFile = uploadedFiles.some((file) => {
      const fileExtension = file.originalName.split('.').pop()?.toLowerCase();
      return req.formats?.includes(fileExtension || '') || 
             req.formats?.includes(file.mimetype.split('/')[1]);
    });

    if (hasMatchingFile) {
      verified.push({
        type: req.id,
        message: `${req.name} detected and validated`,
      });
    } else if (req.required) {
      issues.push({
        type: req.id,
        title: `Missing ${req.name}`,
        description: req.description,
        recommendation: `Please upload your ${req.name.toLowerCase()} in one of the supported formats: ${req.formats?.join(', ') || 'any format'}.`,
      });
    }
  });

  // Calculate score based on verified vs total required
  const totalRequired = requirements.filter(r => r.required).length;
  const verifiedRequired = verified.filter(v => 
    requirements.find(r => r.id === v.type)?.required
  ).length;
  
  const score = totalRequired > 0 ? Math.round((verifiedRequired / totalRequired) * 100) : 100;

  return { verified, issues, score };
}
