import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import type { ValidationData } from "@/pages/validation";

interface CountrySelectionProps {
  data: ValidationData;
  onUpdate: (updates: Partial<ValidationData>) => void;
  onNext: () => void;
  canProceed: boolean;
}

const countries = [
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "germany", label: "Germany" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "japan", label: "Japan" },
];

const visaTypes = [
  { value: "tourist", label: "Tourist/Visitor (B-1/B-2)" },
  { value: "business", label: "Business (B-1)" },
  { value: "student", label: "Student (F-1)" },
  { value: "work", label: "Work (H-1B)" },
  { value: "transit", label: "Transit" },
];

const getRequirements = (country: string, visaType: string) => {
  if (country === "usa" && visaType === "tourist") {
    return [
      "Valid passport (minimum 6 months validity)",
      "DS-160 confirmation page",
      "Passport-style photograph",
      "Financial documents (bank statements, income proof)",
      "Travel itinerary and accommodation proof",
    ];
  }
  return [
    "Valid passport (minimum 6 months validity)",
    "Completed visa application form",
    "Passport-style photograph",
    "Supporting documents (varies by visa type)",
  ];
};

export default function CountrySelection({ data, onUpdate, onNext, canProceed }: CountrySelectionProps) {
  const requirements = data.country && data.visaType ? getRequirements(data.country, data.visaType) : [];

  return (
    <Card className="bg-white rounded-xl shadow-lg">
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select Destination & Visa Type</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination Country</label>
            <Select
              value={data.country}
              onValueChange={(value) => onUpdate({ country: value, visaType: "" })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country..." />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type</label>
            <Select
              value={data.visaType}
              onValueChange={(value) => onUpdate({ visaType: value })}
              disabled={!data.country}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select visa type..." />
              </SelectTrigger>
              <SelectContent>
                {visaTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {requirements.length > 0 && (
          <Alert className="mt-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <h4 className="font-semibold text-blue-900 mb-2">
                Common Requirements for {countries.find(c => c.value === data.country)?.label} {visaTypes.find(v => v.value === data.visaType)?.label}
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {requirements.map((req, index) => (
                  <li key={index}>• {req}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end mt-6">
          <Button onClick={onNext} disabled={!canProceed} className="bg-blue-700 hover:bg-blue-800">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
