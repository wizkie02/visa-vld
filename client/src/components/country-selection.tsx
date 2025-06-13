import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { ValidationData } from "@/pages/validation";

interface CountrySelectionProps {
  data: ValidationData;
  onUpdate: (updates: Partial<ValidationData>) => void;
  onNext: () => void;
  canProceed: boolean;
}

const getCountries = (t: any) => [
  { value: "afghanistan", label: t('afghanistan') },
  { value: "albania", label: t('albania') },
  { value: "algeria", label: t('algeria') },
  { value: "andorra", label: t('andorra') },
  { value: "angola", label: t('angola') },
  { value: "argentina", label: t('argentina') },
  { value: "armenia", label: t('armenia') },
  { value: "australia", label: t('australia') },
  { value: "austria", label: t('austria') },
  { value: "azerbaijan", label: t('azerbaijan') },
  { value: "bahrain", label: t('bahrain') },
  { value: "bangladesh", label: t('bangladesh') },
  { value: "belarus", label: t('belarus') },
  { value: "belgium", label: t('belgium') },
  { value: "belize", label: t('belize') },
  { value: "benin", label: t('benin') },
  { value: "bhutan", label: t('bhutan') },
  { value: "bolivia", label: t('bolivia') },
  { value: "bosnia", label: t('bosnia') },
  { value: "botswana", label: t('botswana') },
  { value: "brazil", label: t('brazil') },
  { value: "brunei", label: t('brunei') },
  { value: "bulgaria", label: t('bulgaria') },
  { value: "burkina-faso", label: t('burkinaFaso') },
  { value: "burundi", label: t('burundi') },
  { value: "cambodia", label: t('cambodia') },
  { value: "cameroon", label: t('cameroon') },
  { value: "canada", label: t('canada') },
  { value: "cape-verde", label: t('capeVerde') },
  { value: "chad", label: t('chad') },
  { value: "chile", label: t('chile') },
  { value: "china", label: t('china') },
  { value: "colombia", label: t('colombia') },
  { value: "comoros", label: t('comoros') },
  { value: "congo", label: t('congo') },
  { value: "costa-rica", label: t('costaRica') },
  { value: "croatia", label: t('croatia') },
  { value: "cuba", label: t('cuba') },
  { value: "cyprus", label: t('cyprus') },
  { value: "czech-republic", label: t('czechRepublic') },
  { value: "denmark", label: t('denmark') },
  { value: "djibouti", label: t('djibouti') },
  { value: "dominican-republic", label: t('dominicanRepublic') },
  { value: "ecuador", label: t('ecuador') },
  { value: "egypt", label: t('egypt') },
  { value: "el-salvador", label: t('elSalvador') },
  { value: "estonia", label: t('estonia') },
  { value: "eswatini", label: t('eswatini') },
  { value: "ethiopia", label: t('ethiopia') },
  { value: "fiji", label: t('fiji') },
  { value: "finland", label: t('finland') },
  { value: "france", label: t('france') },
  { value: "gabon", label: t('gabon') },
  { value: "gambia", label: t('gambia') },
  { value: "georgia", label: t('georgia') },
  { value: "germany", label: t('germany') },
  { value: "ghana", label: t('ghana') },
  { value: "greece", label: t('greece') },
  { value: "guatemala", label: t('guatemala') },
  { value: "guinea", label: t('guinea') },
  { value: "guyana", label: t('guyana') },
  { value: "haiti", label: t('haiti') },
  { value: "honduras", label: t('honduras') },
  { value: "hungary", label: t('hungary') },
  { value: "iceland", label: t('iceland') },
  { value: "india", label: t('india') },
  { value: "indonesia", label: t('indonesia') },
  { value: "iran", label: t('iran') },
  { value: "iraq", label: t('iraq') },
  { value: "ireland", label: t('ireland') },
  { value: "israel", label: t('israel') },
  { value: "italy", label: t('italy') },
  { value: "ivory-coast", label: t('ivoryCoast') },
  { value: "jamaica", label: t('jamaica') },
  { value: "japan", label: t('japan') },
  { value: "jordan", label: t('jordan') },
  { value: "kazakhstan", label: t('kazakhstan') },
  { value: "kenya", label: t('kenya') },
  { value: "kuwait", label: t('kuwait') },
  { value: "kyrgyzstan", label: t('kyrgyzstan') },
  { value: "laos", label: t('laos') },
  { value: "latvia", label: t('latvia') },
  { value: "lebanon", label: t('lebanon') },
  { value: "lesotho", label: t('lesotho') },
  { value: "liberia", label: t('liberia') },
  { value: "libya", label: t('libya') },
  { value: "lithuania", label: t('lithuania') },
  { value: "luxembourg", label: t('luxembourg') },
  { value: "madagascar", label: t('madagascar') },
  { value: "malawi", label: t('malawi') },
  { value: "malaysia", label: t('malaysia') },
  { value: "maldives", label: t('maldives') },
  { value: "mali", label: t('mali') },
  { value: "malta", label: t('malta') },
  { value: "mauritania", label: t('mauritania') },
  { value: "mauritius", label: t('mauritius') },
  { value: "mexico", label: t('mexico') },
  { value: "moldova", label: t('moldova') },
  { value: "monaco", label: t('monaco') },
  { value: "mongolia", label: t('mongolia') },
  { value: "montenegro", label: t('montenegro') },
  { value: "morocco", label: t('morocco') },
  { value: "mozambique", label: t('mozambique') },
  { value: "myanmar", label: t('myanmar') },
  { value: "namibia", label: t('namibia') },
  { value: "nepal", label: t('nepal') },
  { value: "netherlands", label: t('netherlands') },
  { value: "new-zealand", label: t('newZealand') },
  { value: "nicaragua", label: t('nicaragua') },
  { value: "niger", label: t('niger') },
  { value: "nigeria", label: t('nigeria') },
  { value: "north-korea", label: t('northKorea') },
  { value: "north-macedonia", label: t('northMacedonia') },
  { value: "norway", label: t('norway') },
  { value: "oman", label: t('oman') },
  { value: "pakistan", label: t('pakistan') },
  { value: "panama", label: t('panama') },
  { value: "papua-new-guinea", label: t('papuaNewGuinea') },
  { value: "paraguay", label: t('paraguay') },
  { value: "peru", label: t('peru') },
  { value: "philippines", label: t('philippines') },
  { value: "poland", label: t('poland') },
  { value: "portugal", label: t('portugal') },
  { value: "qatar", label: t('qatar') },
  { value: "romania", label: t('romania') },
  { value: "russia", label: t('russia') },
  { value: "rwanda", label: t('rwanda') },
  { value: "samoa", label: t('samoa') },
  { value: "san-marino", label: t('sanMarino') },
  { value: "saudi-arabia", label: t('saudiArabia') },
  { value: "senegal", label: t('senegal') },
  { value: "serbia", label: t('serbia') },
  { value: "seychelles", label: t('seychelles') },
  { value: "sierra-leone", label: t('sierraLeone') },
  { value: "singapore", label: t('singapore') },
  { value: "slovakia", label: t('slovakia') },
  { value: "slovenia", label: t('slovenia') },
  { value: "solomon-islands", label: t('solomonIslands') },
  { value: "somalia", label: t('somalia') },
  { value: "south-africa", label: t('southAfrica') },
  { value: "south-korea", label: t('southKorea') },
  { value: "south-sudan", label: t('southSudan') },
  { value: "spain", label: t('spain') },
  { value: "sri-lanka", label: t('sriLanka') },
  { value: "sudan", label: t('sudan') },
  { value: "suriname", label: t('suriname') },
  { value: "sweden", label: t('sweden') },
  { value: "switzerland", label: t('switzerland') },
  { value: "syria", label: t('syria') },
  { value: "taiwan", label: t('taiwan') },
  { value: "tajikistan", label: t('tajikistan') },
  { value: "tanzania", label: t('tanzania') },
  { value: "thailand", label: t('thailand') },
  { value: "timor-leste", label: t('timorLeste') },
  { value: "togo", label: t('togo') },
  { value: "tonga", label: t('tonga') },
  { value: "trinidad-tobago", label: t('trinidadTobago') },
  { value: "tunisia", label: t('tunisia') },
  { value: "turkey", label: t('turkey') },
  { value: "turkmenistan", label: t('turkmenistan') },
  { value: "uganda", label: t('uganda') },
  { value: "ukraine", label: t('ukraine') },
  { value: "uae", label: t('uae') },
  { value: "uk", label: t('uk') },
  { value: "usa", label: t('usa') },
  { value: "uruguay", label: t('uruguay') },
  { value: "uzbekistan", label: t('uzbekistan') },
  { value: "vanuatu", label: t('vanuatu') },
  { value: "vatican", label: t('vatican') },
  { value: "venezuela", label: t('venezuela') },
  { value: "vietnam", label: t('vietnam') },
  { value: "yemen", label: t('yemen') },
  { value: "zambia", label: t('zambia') },
  { value: "zimbabwe", label: t('zimbabwe') }
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
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState(data.country);
  const countries = getCountries(t);
  
  // Fetch ALL visa types immediately when country is selected
  const { data: visaTypesData, isLoading: isLoadingVisaTypes, error: visaTypesError } = useQuery({
    queryKey: ['/api/visa-types', selectedCountry],
    queryFn: async () => {
      if (!selectedCountry) return null;
      const response = await fetch(`/api/visa-types?country=${encodeURIComponent(selectedCountry)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch visa types: ${response.statusText}`);
      }
      return response.json();
    },
    enabled: !!selectedCountry,
    retry: 2,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Prepare all available visa types for display
  const availableVisaTypes = React.useMemo(() => {
    if ((visaTypesData as any)?.visaTypes?.length > 0) {
      // Use all fetched visa types from official government sources
      return (visaTypesData as any).visaTypes.map((visa: any) => ({
        value: visa.id,
        label: visa.name,
        category: visa.category,
        details: visa
      }));
    }
    return [];
  }, [visaTypesData]);

  // Group visa types by category for better organization
  const visaTypesByCategory = React.useMemo(() => {
    const grouped: Record<string, any[]> = {};
    availableVisaTypes.forEach((visa: any) => {
      const category = visa.category || 'other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(visa);
    });
    return grouped;
  }, [availableVisaTypes]);

  const requirements = data.country && data.visaType ? getRequirements(data.country, data.visaType) : [];

  // Update selected country and immediately fetch visa types
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    onUpdate({ 
      country, 
      visaType: "", // Reset visa type when country changes
    });
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg">
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('selectDestinationVisa')}</h3>
        
        <div className="space-y-6">
          {/* Step 1: Destination Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('destinationCountry')}</label>
            <Select
              value={data.country}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('selectCountryPlaceholder')} />
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
          
          {/* Step 2: All Available Visa Types */}
          {data.country && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('selectVisaType')} 
                {isLoadingVisaTypes && (
                  <span className="text-blue-600 text-sm ml-2">
                    ({t('fetchingFromOfficialSources')})
                  </span>
                )}
              </label>
              <Select
                value={data.visaType}
                onValueChange={(value) => onUpdate({ visaType: value })}
                disabled={isLoadingVisaTypes}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={
                    isLoadingVisaTypes 
                      ? t('loadingOfficialVisaTypes')
                      : availableVisaTypes.length === 0 
                        ? t('noVisaTypesFound')
                        : t('selectFromAllVisaTypes')
                  } />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {isLoadingVisaTypes ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="ml-2 text-sm">{t('fetchingOfficialVisaData')}</span>
                    </div>
                  ) : visaTypesError ? (
                    <div className="p-4 text-center text-red-600 text-sm">
                      <p>{t('errorFetchingVisaTypes')}</p>
                      <p className="text-xs mt-1">{t('usingFallbackData')}</p>
                    </div>
                  ) : (
                    Object.keys(visaTypesByCategory).map((category) => (
                      <div key={category}>
                        {/* Category Header */}
                        <div className="px-2 py-2 text-xs font-medium text-gray-500 uppercase bg-gray-50 border-b">
                          {t(category)} ({visaTypesByCategory[category].length})
                        </div>
                        {/* Visa Types in Category */}
                        {visaTypesByCategory[category].map((visa: any) => (
                          <SelectItem key={visa.value} value={visa.value} className="pl-4">
                            <div className="flex flex-col">
                              <span className="font-medium">{visa.label}</span>
                              {visa.details?.fees && (
                                <span className="text-xs text-gray-500">{visa.details.fees}</span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    ))
                  )}
                </SelectContent>
              </Select>
              
              {/* Display visa count and source info */}
              {availableVisaTypes.length > 0 && !isLoadingVisaTypes && (
                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span>
                      {availableVisaTypes.length} {t('officialVisaTypesFound')} • {t('fromGovernmentSources')}
                    </span>
                  </div>
                </div>
              )}
              
              {availableVisaTypes.length === 0 && !isLoadingVisaTypes && visaTypesError && (
                <Alert className="mt-3">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {t('errorFetchingVisaTypes')} {t('pleaseContactSupport')}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Display selected visa type details */}
          {data.visaType && availableVisaTypes.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">{t('selectedVisaDetails')}</h4>
              {(() => {
                const selectedVisa = availableVisaTypes.find((v: any) => v.value === data.visaType);
                if (selectedVisa?.details) {
                  return (
                    <div className="space-y-2 text-sm text-blue-800">
                      {selectedVisa.details.description && (
                        <p><strong>{t('description')}:</strong> {selectedVisa.details.description}</p>
                      )}
                      {selectedVisa.details.duration && (
                        <p><strong>{t('duration')}:</strong> {selectedVisa.details.duration}</p>
                      )}
                      {selectedVisa.details.processingTime && (
                        <p><strong>{t('processingTime')}:</strong> {selectedVisa.details.processingTime}</p>
                      )}
                      {selectedVisa.details.fees && (
                        <p><strong>{t('fees')}:</strong> {selectedVisa.details.fees}</p>
                      )}
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}
        </div>
        
        {/* Show dynamic visa type information */}
        {data.visaType && (visaTypesData as any)?.visaTypes?.length > 0 && (
          <div className="mt-6">
            {(() => {
              const selectedVisa = (visaTypesData as any).visaTypes.find((v: any) => v.id === data.visaType);
              return selectedVisa ? (
                <Alert className="bg-green-50 border-green-200">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <div className="font-semibold text-green-900">{selectedVisa.name}</div>
                      <div className="text-sm text-gray-700 grid grid-cols-2 gap-2">
                        <div><strong>Duration:</strong> {selectedVisa.duration}</div>
                        <div><strong>Processing Time:</strong> {selectedVisa.processingTime}</div>
                        <div><strong>Purpose:</strong> {selectedVisa.purpose}</div>
                        <div><strong>Fees:</strong> {selectedVisa.fees}</div>
                      </div>
                      <div className="text-sm text-gray-600">{selectedVisa.description}</div>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : null;
            })()}
          </div>
        )}
        
        {requirements.length > 0 && (
          <Alert className="mt-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <h4 className="font-semibold text-blue-900 mb-2">
                {t('commonRequirementsFor')} {countries.find(c => c.value === data.country)?.label} {availableVisaTypes.find((v: any) => v.value === data.visaType)?.label}
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
          <Button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNext();
            }}
            disabled={!canProceed} 
            className="bg-blue-700 hover:bg-blue-800"
          >
            {t('next')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}