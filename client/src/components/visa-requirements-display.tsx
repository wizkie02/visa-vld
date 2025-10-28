import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, FileText, Clock, DollarSign } from "lucide-react";
import type { ValidationData } from "@/pages/validation";

// Helper function to safely render values that might be objects or strings
const renderValue = (value: any): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    // Handle fees object with amount, currency, paymentMethods
    if (value.amount || value.currency) {
      const parts = [];
      if (value.amount && value.currency) {
        parts.push(`${value.currency} ${value.amount}`);
      } else if (value.amount) {
        parts.push(value.amount);
      } else if (value.currency) {
        parts.push(value.currency);
      }
      if (value.paymentMethods && Array.isArray(value.paymentMethods)) {
        parts.push(`(${value.paymentMethods.join(', ')})`);
      }
      return parts.join(' ');
    }
    // Handle other objects
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
};

interface VisaRequirement {
  id: string;
  title: string;
  description: string;
  required: boolean;
  translationRequired?: boolean;
  certificationRequired?: boolean;
  specificNotes?: string[];
}

interface VisaRequirementsDisplayProps {
  data: ValidationData;
}

export default function VisaRequirementsDisplay({ data }: VisaRequirementsDisplayProps) {
  const [requirements, setRequirements] = useState<VisaRequirement[]>([]);
  const [processingInfo, setProcessingInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.country && data.visaType && data.personalInfo.nationality) {
      fetchRequirements();
    }
  }, [data.country, data.visaType, data.personalInfo.nationality]);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      // Call API to get requirements from our OpenAI service
    const response = await fetch(
        `/api/visa-requirements/${data.country.toLowerCase()}/${data.visaType.toLowerCase()}?nationality=${data.personalInfo.nationality}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch requirements: ${response.statusText}`);
      }

      const data = await response.json();

      // Set requirements from API response
      if (data.requirements && Array.isArray(data.requirements)) {
        // Transform API requirements to component format
        const transformedRequirements = data.requirements.map((req: any, index: number) => ({
          id: req.id || `req_${index}`,
          title: req.title || `Document ${index + 1}`,
          description: req.description || 'Document description',
          required: req.required || false,
          category: req.category || 'other',
          notes: req.notes || []
        }));
        setRequirements(transformedRequirements);
      }

      // Set processing info from API response
      setProcessingInfo(data.processingInfo || {
        processingTime: data.processingTime || "Processing time varies",
        fees: data.fees || { amount: "Fee varies", currency: "USD" },
        specialNotes: data.specialNotes || []
      });
    } catch (error) {
      console.error("Error fetching requirements:", error);
      // Fallback to basic hardcoded requirements if API fails
      const fallbackData = getSpecificRequirements(
        data.country,
        data.visaType,
        data.personalInfo.nationality
      );
      setRequirements(fallbackData.requirements);
      setProcessingInfo(fallbackData.processingInfo);
    } finally {
      setLoading(false);
    }
  };

  const getSpecificRequirements = (destination: string, visaType: string, nationality: string) => {
    // Comprehensive visa requirements database
    const requirementsDatabase = {
      "China": {
        "Tourist": {
          general: [
            {
              id: "passport",
              title: "Valid Passport",
              description: "Passport with at least 6 months validity and 2 blank pages",
              required: true,
              specificNotes: ["Must have at least 6 months validity from intended entry date"]
            },
            {
              id: "form",
              title: "Visa Application Form V.2013",
              description: "Completed and signed visa application form",
              required: true,
              specificNotes: ["Must be filled out completely in black ink or typed"]
            },
            {
              id: "photo",
              title: "Passport Photo",
              description: "Recent color passport-style photograph (48mm x 33mm)",
              required: true,
              specificNotes: ["White background, taken within last 6 months"]
            },
            {
              id: "itinerary",
              title: "Travel Itinerary",
              description: "Round-trip flight tickets and hotel reservations",
              required: true
            },
            {
              id: "financial",
              title: "Financial Proof",
              description: "Bank statements showing sufficient funds",
              required: true,
              specificNotes: ["Last 3 months of bank statements", "Minimum $100 per day of stay recommended"]
            }
          ],
          nationalitySpecific: {
            "US": [
              {
                id: "financial_us",
                title: "Enhanced Financial Documentation",
                description: "Additional financial proof required for US citizens",
                required: true,
                specificNotes: ["Employment letter required", "Tax returns may be requested"]
              }
            ],
            "EU": [
              {
                id: "travel_insurance",
                title: "Travel Insurance",
                description: "Travel insurance covering medical expenses",
                required: false,
                specificNotes: ["Recommended but not mandatory for EU citizens"]
              }
            ]
          }
        },
        "Business": {
          general: [
            {
              id: "passport",
              title: "Valid Passport",
              description: "Passport with at least 6 months validity and 2 blank pages",
              required: true
            },
            {
              id: "invitation",
              title: "Business Invitation Letter",
              description: "Official invitation from Chinese company",
              required: true,
              certificationRequired: true,
              specificNotes: [
                "Must include company registration details",
                "Must specify purpose and duration of visit",
                "Must be notarized by Chinese authorities"
              ]
            },
            {
              id: "company_letter",
              title: "Employment Letter",
              description: "Letter from your employer stating purpose of travel",
              required: true,
              specificNotes: ["Must be on company letterhead", "Must include salary and position details"]
            }
          ]
        }
      },
      "Japan": {
        "Tourist": {
          general: [
            {
              id: "passport",
              title: "Valid Passport",
              description: "Passport valid for duration of stay",
              required: true
            },
            {
              id: "form",
              title: "Visa Application Form",
              description: "Completed visa application form",
              required: true
            },
            {
              id: "financial",
              title: "Financial Documentation",
              description: "Proof of sufficient funds for the trip",
              required: true,
              translationRequired: true,
              specificNotes: ["Bank statements must be translated to Japanese or English"]
            }
          ]
        }
      }
    };

    const countryReqs = requirementsDatabase[destination];
    if (!countryReqs) {
      return { requirements: [], processingInfo: null };
    }

    const visaReqs = countryReqs[visaType];
    if (!visaReqs) {
      return { requirements: [], processingInfo: null };
    }

    let allRequirements = [...visaReqs.general];

    // Add nationality-specific requirements
    if (visaReqs.nationalitySpecific && visaReqs.nationalitySpecific[nationality]) {
      allRequirements = [...allRequirements, ...visaReqs.nationalitySpecific[nationality]];
    }

    const processingInfo = {
      processingTime: getProcessingTime(destination, visaType, nationality),
      fees: getFees(destination, visaType, nationality),
      specialNotes: getSpecialNotes(destination, visaType, nationality)
    };

    return { requirements: allRequirements, processingInfo };
  };

  const getProcessingTime = (destination: string, visaType: string, nationality: string) => {
    const times = {
      "China": {
        "Tourist": { "US": "4-5 business days", "EU": "3-4 business days", "default": "4-5 business days" },
        "Business": { "US": "5-7 business days", "EU": "4-6 business days", "default": "5-7 business days" }
      },
      "Japan": {
        "Tourist": { "US": "3-5 business days", "EU": "2-4 business days", "default": "3-5 business days" }
      }
    };

    return times[destination]?.[visaType]?.[nationality] || 
           times[destination]?.[visaType]?.["default"] || 
           "Processing time varies";
  };

  const getFees = (destination: string, visaType: string, nationality: string) => {
    const fees = {
      "China": {
        "Tourist": { "US": "$140", "EU": "€60", "default": "$100" },
        "Business": { "US": "$140", "EU": "€60", "default": "$120" }
      },
      "Japan": {
        "Tourist": { "US": "$27", "EU": "€22", "default": "$25" }
      }
    };

    return fees[destination]?.[visaType]?.[nationality] || 
           fees[destination]?.[visaType]?.["default"] || 
           "Fee varies";
  };

  const getSpecialNotes = (destination: string, visaType: string, nationality: string) => {
    const notes = {
      "China": [
        "Biometric data collection may be required",
        "Interview may be required for certain applicants",
        "Additional documents may be requested based on individual circumstances"
      ],
      "Japan": [
        "Visa-free entry available for some nationalities for short stays",
        "Multiple entry visas available for frequent travelers"
      ]
    };

    return notes[destination] || [];
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Requirements...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Requirements List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Required Documents for {data.country} {data.visaType} Visa
          </CardTitle>
          <p className="text-sm text-gray-600">
            Based on your nationality: {data.personalInfo.nationality}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requirements.map((req) => (
              <div key={req.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {req.required ? (
                      <CheckCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    )}
                    <h4 className="font-semibold">{req.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    {req.required && (
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    )}
                    {req.translationRequired && (
                      <Badge variant="outline" className="text-xs">Translation Required</Badge>
                    )}
                    {req.certificationRequired && (
                      <Badge variant="outline" className="text-xs">Certification Required</Badge>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{req.description}</p>
                {req.specificNotes && req.specificNotes.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">Important Notes:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                      {req.specificNotes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Processing Information */}
      {processingInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5" />
                Processing Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{processingInfo.processingTime}</p>
              <p className="text-sm text-gray-600 mt-1">Standard processing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5" />
                Visa Fee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{renderValue(processingInfo.fees)}</p>
              <p className="text-sm text-gray-600 mt-1">Consular fee</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5" />
                Special Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                {processingInfo.specialNotes.slice(0, 2).map((note, index) => (
                  <li key={index}>• {note}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Important Alert */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Requirements may vary by consulate and can change without notice. 
          Always verify current requirements with the official embassy or consulate before applying. 
          Some documents may need to be translated and/or notarized.
        </AlertDescription>
      </Alert>
    </div>
  );
}