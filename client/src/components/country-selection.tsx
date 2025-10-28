import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Globe, Sparkles, CheckCircle, Search } from "lucide-react";
import LoadingSpinner from "@/components/loading-spinner";
import { useLanguage } from "@/lib/i18n";
import type { ValidationData } from "@/pages/validation";
import FlagIconReal from "@/components/flag-icon-real";
import { useNewAuth } from "@/hooks/use-new-auth";

// 🚀 Country flag mapping with emoji flags
const COUNTRY_FLAGS: Record<string, string> = {
  'afghanistan': '🇦🇫',
  'albania': '🇦🇱',
  'algeria': '🇩🇿',
  'andorra': '🇦🇩',
  'angola': '🇦🇴',
  'argentina': '🇦🇷',
  'armenia': '🇦🇲',
  'australia': '🇦🇺',
  'austria': '🇦🇹',
  'azerbaijan': '🇦🇿',
  'bahrain': '🇧🇭',
  'bangladesh': '🇧🇩',
  'belarus': '🇧🇾',
  'belgium': '🇧🇪',
  'belize': '🇧🇿',
  'benin': '🇧🇯',
  'bhutan': '🇧🇹',
  'bolivia': '🇧🇴',
  'bosnia': '🇧🇦',
  'botswana': '🇧🇼',
  'brazil': '🇧🇷',
  'brunei': '🇧🇳',
  'bulgaria': '🇧🇬',
  'burkina-faso': '🇧🇫',
  'burundi': '🇧🇮',
  'cambodia': '🇰🇭',
  'cameroon': '🇨🇲',
  'canada': '🇨🇦',
  'cape-verde': '🇨🇻',
  'chad': '🇹🇩',
  'chile': '🇨🇱',
  'china': '🇨🇳',
  'colombia': '🇨🇴',
  'comoros': '🇰🇲',
  'congo': '🇨🇬',
  'costa-rica': '🇨🇷',
  'croatia': '🇭🇷',
  'cuba': '🇨🇺',
  'cyprus': '🇨🇾',
  'czech-republic': '🇨🇿',
  'denmark': '🇩🇰',
  'djibouti': '🇩🇯',
  'dominican-republic': '🇩🇴',
  'ecuador': '🇪🇨',
  'egypt': '🇪🇬',
  'el-salvador': '🇸🇻',
  'estonia': '🇪🇪',
  'eswatini': '🇸🇿',
  'ethiopia': '🇪🇹',
  'fiji': '🇫🇯',
  'finland': '🇫🇮',
  'france': '🇫🇷',
  'gabon': '🇬🇦',
  'gambia': '🇬🇲',
  'georgia': '🇬🇪',
  'germany': '🇩🇪',
  'ghana': '🇬🇭',
  'greece': '🇬🇷',
  'guatemala': '🇬🇹',
  'guinea': '🇬🇳',
  'guyana': '🇬🇾',
  'haiti': '🇭🇹',
  'honduras': '🇭🇳',
  'hungary': '🇭🇺',
  'iceland': '🇮🇸',
  'india': '🇮🇳',
  'indonesia': '🇮🇩',
  'iran': '🇮🇷',
  'iraq': '🇮🇶',
  'ireland': '🇮🇪',
  'israel': '🇮🇱',
  'italy': '🇮🇹',
  'ivory-coast': '🇨🇮',
  'jamaica': '🇯🇲',
  'japan': '🇯🇵',
  'jordan': '🇯🇴',
  'kazakhstan': '🇰🇿',
  'kenya': '🇰🇪',
  'kuwait': '🇰🇼',
  'kyrgyzstan': '🇰🇬',
  'laos': '🇱🇦',
  'latvia': '🇱🇻',
  'lebanon': '🇱🇧',
  'lesotho': '🇱🇸',
  'liberia': '🇱🇷',
  'libya': '🇱🇾',
  'lithuania': '🇱🇹',
  'luxembourg': '🇱🇺',
  'madagascar': '🇲🇬',
  'malawi': '🇲🇼',
  'malaysia': '🇲🇾',
  'maldives': '🇲🇻',
  'mali': '🇲🇱',
  'malta': '🇲🇹',
  'mauritania': '🇲🇷',
  'mauritius': '🇲🇺',
  'mexico': '🇲🇽',
  'moldova': '🇲🇩',
  'monaco': '🇲🇨',
  'mongolia': '🇲🇳',
  'montenegro': '🇲🇪',
  'morocco': '🇲🇦',
  'mozambique': '🇲🇿',
  'myanmar': '🇲🇲',
  'namibia': '🇳🇦',
  'nepal': '🇳🇵',
  'netherlands': '🇳🇱',
  'new-zealand': '🇳🇿',
  'nicaragua': '🇳🇮',
  'niger': '🇳🇪',
  'nigeria': '🇳🇬',
  'north-korea': '🇰🇵',
  'north-macedonia': '🇲🇰',
  'norway': '🇳🇴',
  'oman': '🇴🇲',
  'pakistan': '🇵🇰',
  'panama': '🇵🇦',
  'papua-new-guinea': '🇵🇬',
  'paraguay': '🇵🇾',
  'peru': '🇵🇪',
  'philippines': '🇵🇭',
  'poland': '🇵🇱',
  'portugal': '🇵🇹',
  'qatar': '🇶🇦',
  'romania': '🇷🇴',
  'russia': '🇷🇺',
  'rwanda': '🇷🇼',
  'samoa': '🇼🇸',
  'san-marino': '🇸🇲',
  'saudi-arabia': '🇸🇦',
  'senegal': '🇸🇳',
  'serbia': '🇷🇸',
  'seychelles': '🇸🇨',
  'sierra-leone': '🇸🇱',
  'singapore': '🇸🇬',
  'slovakia': '🇸🇰',
  'slovenia': '🇸🇮',
  'solomon-islands': '🇸🇧',
  'somalia': '🇸🇴',
  'south-africa': '🇿🇦',
  'south-korea': '🇰🇷',
  'south-sudan': '🇸🇸',
  'spain': '🇪🇸',
  'sri-lanka': '🇱🇰',
  'sudan': '🇸🇩',
  'suriname': '🇸🇷',
  'sweden': '🇸🇪',
  'switzerland': '🇨🇭',
  'syria': '🇸🇾',
  'taiwan': '🇹🇼',
  'tajikistan': '🇹🇯',
  'tanzania': '🇹🇿',
  'thailand': '🇹🇭',
  'timor-leste': '🇹🇱',
  'togo': '🇹🇬',
  'tonga': '🇹🇴',
  'trinidad-tobago': '🇹🇹',
  'tunisia': '🇹🇳',
  'turkey': '🇹🇷',
  'turkmenistan': '🇹🇲',
  'uganda': '🇺🇬',
  'ukraine': '🇺🇦',
  'uae': '🇦🇪',
  'uk': '🇬🇧',
  'usa': '🇺🇸',
  'uruguay': '🇺🇾',
  'uzbekistan': '🇺🇿',
  'vanuatu': '🇻🇺',
  'vatican': '🇻🇦',
  'venezuela': '🇻🇪',
  'vietnam': '🇻🇳',
  'yemen': '🇾🇪',
  'zambia': '🇿🇲',
  'zimbabwe': '🇿🇼'
};

// Helper function to capitalize first letter of each word
const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Helper function to format country display with flag and capitalized name
const formatCountryDisplay = (countryKey: string, label: string) => {
  const capitalizedName = capitalizeWords(label);
  return capitalizedName;
};

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

// Helper function to safely render values that might be objects or strings
const renderValue = (value: any): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    // Handle fees object with amount, currency, paymentMethods
    if (value.amount || value.currency || value.paymentMethods) {
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
    // Handle object with name, url, contact structure
    if (value.name || value.url || value.contact) {
      const parts = [];
      if (value.name) parts.push(value.name);
      if (value.url) parts.push(value.url);
      if (value.contact) parts.push(value.contact);
      return parts.join(' - ');
    }
    // For other objects, try to stringify
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
};

export default function CountrySelection({ data, onUpdate, onNext, canProceed }: CountrySelectionProps) {
  const { t } = useLanguage();
  const { user } = useNewAuth();
  const [selectedCountry, setSelectedCountry] = useState(data.country);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const countries = getCountries(t);

  // Auto-fill nationality from authenticated user if not already set
  useEffect(() => {
    if (user?.nationality && !data.personalInfo.nationality) {
      onUpdate({
        personalInfo: {
          ...data.personalInfo,
          nationality: user.nationality
        }
      });
    }
  }, [user, data.personalInfo.nationality, onUpdate]);

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Fetch ALL visa types immediately when country is selected
  const { data: visaTypesData, isLoading: isLoadingVisaTypes, error: visaTypesError } = useQuery({
    queryKey: ['/api/visa-types', selectedCountry, data.personalInfo.nationality || user?.nationality],
    queryFn: async () => {
      if (!selectedCountry) return null;

      // Build URL with nationality parameter for better API integration
      const params = new URLSearchParams({
        country: encodeURIComponent(selectedCountry)
      });

      // Add nationality from form data or authenticated user for better data integration
      const nationality = data.personalInfo.nationality || user?.nationality;
      if (nationality) {
        params.append('nationality', nationality);
      }

      const response = await fetch(`/api/visa-types?${params.toString()}`);
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
    <div className="card-enterprise p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold gradient-text mb-2">{t('selectDestinationVisa')}</h3>
        <p className="text-[var(--visa-text-secondary)]">Choose your destination country and visa type to begin validation</p>
      </div>
        
        <div className="space-y-8">
          {/* 🚀 Step 1: Destination Country */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Globe className="h-4 w-4 text-[var(--visa-primary)]" />
              <label className="text-base font-semibold text-[var(--visa-text-primary)]">{t('destinationCountry') || 'Destination Country'}</label>
            </div>

            {/* Custom Searchable Dropdown */}
            <div className="relative">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={
                    searchTerm
                      ? `Found ${filteredCountries.length} countries matching "${searchTerm}"`
                      : data.country
                        ? `${countries.find(c => c.value === data.country)?.label || data.country} (click to change)`
                        : "Type country name or browse alphabetically..."
                  }
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsDropdownOpen(false);
                      setSearchTerm('');
                    }
                    if (e.key === 'Enter' && filteredCountries.length === 1) {
                      handleCountryChange(filteredCountries[0].value);
                      setSearchTerm('');
                      setIsDropdownOpen(false);
                    }
                  }}
                  className="pl-10 pr-4 h-12 bg-[var(--visa-surface)] border-[var(--visa-border)] rounded-xl"
                />
              </div>

              {/* Dropdown List */}
              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[var(--visa-border)] rounded-xl shadow-lg max-h-80 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    <>
                      {/* If no search, show alphabetical sections */}
                      {!searchTerm && (
                        <div className="max-h-80 overflow-y-auto">
                          {Object.entries(
                            filteredCountries.reduce((acc, country) => {
                              const firstLetter = country.label.charAt(0).toUpperCase();
                              if (!acc[firstLetter]) acc[firstLetter] = [];
                              acc[firstLetter].push(country);
                              return acc;
                            }, {} as Record<string, typeof filteredCountries>)
                          ).map(([letter, countries]) => (
                            <div key={letter}>
                              {/* Letter Header */}
                              <div className="sticky top-0 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 border-b">
                                {letter}
                              </div>
                              {/* Countries in this letter group */}
                              {countries.map((country) => (
                                <div
                                  key={country.value}
                                  onClick={() => {
                                    handleCountryChange(country.value);
                                    setSearchTerm('');
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 ${
                                    data.country === country.value ? 'bg-blue-50 text-blue-700' : ''
                                  }`}
                                >
                                  <FlagIconReal country={country.value} size="sm" />
                                  <span className="font-medium">{capitalizeWords(country.label)}</span>
                                  {data.country === country.value && (
                                    <span className="ml-auto text-blue-600">✓</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* If searching, show all filtered results */}
                      {searchTerm && (
                        <div className="max-h-80 overflow-y-auto">
                          {filteredCountries.map((country) => (
                            <div
                              key={country.value}
                              onClick={() => {
                                handleCountryChange(country.value);
                                setSearchTerm('');
                                setIsDropdownOpen(false);
                              }}
                              className={`flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 ${
                                data.country === country.value ? 'bg-blue-50 text-blue-700' : ''
                              }`}
                            >
                              <FlagIconReal country={country.value} size="sm" />
                              <span className="font-medium">{capitalizeWords(country.label)}</span>
                              {data.country === country.value && (
                                <span className="ml-auto text-blue-600">✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="px-3 py-4 text-center text-gray-500">
                      No Countries Found. Try A Different Search Term.
                    </div>
                  )}

                  {/* Search tips */}
                  {searchTerm && filteredCountries.length > 0 && (
                    <div className="px-3 py-2 text-xs text-gray-500 text-center border-t bg-gray-50">
                      💡 Tip: Press Enter to select the only result, or click to browse
                    </div>
                  )}
                </div>
              )}

              {/* Click outside to close dropdown */}
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}
            </div>

            {/* Popular Countries Quick Selection */}
            {!searchTerm && !data.country && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2 font-medium">Popular Destinations (click or browse alphabetically):</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'usa', label: 'USA' },
                    { value: 'uk', label: 'UK' },
                    { value: 'canada', label: 'Canada' },
                    { value: 'australia', label: 'Australia' },
                    { value: 'japan', label: 'Japan' },
                    { value: 'france', label: 'France' },
                    { value: 'germany', label: 'Germany' },
                    { value: 'singapore', label: 'Singapore' },
                    { value: 'italy', label: 'Italy' },
                    { value: 'spain', label: 'Spain' },
                    { value: 'netherlands', label: 'Netherlands' },
                    { value: 'new-zealand', label: 'New Zealand' }
                  ].map((country) => {
                    const fullCountry = countries.find(c => c.value === country.value);
                    return (
                      <button
                        key={country.value}
                        onClick={() => {
                          handleCountryChange(country.value);
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-xs font-medium transition-colors shadow-sm"
                      >
                        <FlagIconReal country={country.value} size="sm" />
                        <span>{country.label}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  🌍 Showing 12 of {countries.length} countries • Click search field to see all countries alphabetically
                </p>
              </div>
            )}

            {/* Selected Country Display */}
            {data.country && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <span>Selected:</span>
                <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded">
                  <FlagIconReal country={data.country} size="sm" />
                  <span>{countries.find(c => c.value === data.country)?.label || capitalizeWords(data.country.replace(/-/g, ' '))}</span>
                  <button
                    onClick={() => {
                      handleCountryChange('');
                      setIsDropdownOpen(false);
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    title="Clear selection"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}
          </div>

          {/* 🚀 Step 2: All Available Visa Types */}
          {data.country && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="h-4 w-4 text-[var(--visa-primary)]" />
                <label className="text-base font-semibold text-[var(--visa-text-primary)]">
                  {t('selectVisaType') || 'Select Visa Type'}
                  {isLoadingVisaTypes && (
                    <span className="text-[var(--visa-primary)] text-sm ml-2">
                      ({t('fetchingVisaTypes') || 'Fetching visa options'})
                    </span>
                  )}
                </label>
              </div>
              <Select
                value={data.visaType}
                onValueChange={(value) => onUpdate({ visaType: value })}
                disabled={isLoadingVisaTypes}
              >
                <SelectTrigger className="w-full h-14 bg-white border-2 border-green-100 rounded-xl shadow-sm hover:border-green-200 transition-colors">
                  <SelectValue placeholder={
                    isLoadingVisaTypes
                      ? "Loading visa options..."
                      : availableVisaTypes.length === 0
                        ? "No visa options available"
                        : "Select your visa type"
                  } className="text-gray-600" />
                </SelectTrigger>
                <SelectContent className="max-h-96 border-2 border-green-100 shadow-xl">
                  {isLoadingVisaTypes ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="relative mb-4">
                          <div className="w-12 h-12 border-4 border-green-200 rounded-full"></div>
                          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-800">Finding visa options...</p>
                          <div className="flex items-center justify-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            </div>
                            <span className="text-xs text-gray-600">Searching official sources</span>
                          </div>
                          <p className="text-xs text-gray-500">Verifying government requirements</p>
                        </div>
                      </div>
                    </div>
                  ) : visaTypesError ? (
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-red-800">Unable to load visa options</p>
                      <p className="text-xs text-gray-600 mt-1">Please try again later</p>
                    </div>
                  ) : (
                    Object.keys(visaTypesByCategory).map((category) => (
                      <div key={category}>
                        {/* Professional Category Header */}
                        <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-green-900 capitalize">
                              {category === 'tourist' ? 'Tourism & Travel' :
                               category === 'business' ? 'Business & Work' :
                               category === 'student' ? 'Education & Study' :
                               category === 'family' ? 'Family & Visit' :
                               category === 'transit' ? 'Transit & Connection' :
                               category.charAt(0).toUpperCase() + category.slice(1)}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              {visaTypesByCategory[category].length} options
                            </span>
                          </div>
                        </div>
                        {/* Enhanced Visa Type Items */}
                        {visaTypesByCategory[category].map((visa: any) => (
                          <SelectItem key={visa.value} value={visa.value} className="pl-4 pr-4 py-3 hover:bg-green-50 cursor-pointer">
                            <div className="flex items-start justify-between w-full gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm text-gray-900 truncate">{visa.label}</div>
                                {visa.details?.duration && (
                                  <div className="text-xs text-gray-600 mt-1">Duration: {renderValue(visa.details.duration)}</div>
                                )}
                              </div>
                              {visa.details?.fees && (
                                <div className="flex-shrink-0 text-right ml-3">
                                  <div className="text-sm font-semibold text-green-600 whitespace-nowrap">{renderValue(visa.details.fees)}</div>
                                </div>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    ))
                  )}
                </SelectContent>
              </Select>
              
              {/* Display simple trust indicators */}
              {availableVisaTypes.length > 0 && !isLoadingVisaTypes && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-900">
                          {availableVisaTypes.length} Visa Options Available
                        </h4>
                        {(visaTypesData as any)?.lastUpdated && (
                          <p className="text-xs text-green-600 mt-1">
                            Updated {new Date((visaTypesData as any).lastUpdated).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    {(visaTypesData as any)?.apiData?.nationality && (
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        For {((visaTypesData as any).apiData.nationality || '').charAt(0).toUpperCase() + ((visaTypesData as any).apiData.nationality || '').slice(1)} Citizens
                      </div>
                    )}
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

          {/* Compact selected visa type details */}
          {data.visaType && availableVisaTypes.length > 0 && (
            <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-green-900 mb-1">SELECTED</h4>
                  {(() => {
                    const selectedVisa = availableVisaTypes.find((v: any) => v.value === data.visaType);
                    if (selectedVisa) {
                      return (
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-900 truncate">{selectedVisa.label}</div>
                            <div className="flex items-center gap-3 mt-1">
                              {selectedVisa.details?.duration && (
                                <div className="flex items-center gap-1">
                                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-xs text-gray-600 truncate">{renderValue(selectedVisa.details.duration)}</span>
                                </div>
                              )}
                              {selectedVisa.details?.fees && (
                                <div className="flex items-center gap-1">
                                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-xs font-semibold text-green-700 whitespace-nowrap">{renderValue(selectedVisa.details.fees)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
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
                      <div className="font-semibold text-green-900">{renderValue(selectedVisa.name)}</div>
                      <div className="text-sm text-gray-700 grid grid-cols-2 gap-2">
                        <div><strong>Duration:</strong> {renderValue(selectedVisa.duration)}</div>
                        <div><strong>Processing Time:</strong> {renderValue(selectedVisa.processingTime)}</div>
                        <div><strong>Purpose:</strong> {renderValue(selectedVisa.purpose)}</div>
                        <div><strong>Fees:</strong> {renderValue(selectedVisa.fees)}</div>
                      </div>
                      <div className="text-sm text-gray-600">{renderValue(selectedVisa.description)}</div>
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
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <span>{t('commonRequirementsFor')}</span>
                <span className="flex items-center gap-1">
                  <FlagIconReal country={data.country} size="sm" />
                  <span>{formatCountryDisplay(data.country, countries.find(c => c.value === data.country)?.label || '')}</span>
                </span>
                <span>{availableVisaTypes.find((v: any) => v.value === data.visaType)?.label}</span>
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {requirements.map((req, index) => (
                  <li key={index}>• {req}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center mt-10">
          {/* Trust badges */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Official Sources</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 00-2.812 2.812 3.066 3.066 0 01-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 01-1.745-.723 3.066 3.066 0 00-2.812-2.812 3.066 3.066 0 01-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 002.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Verified Information</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNext();
            }}
            disabled={!canProceed}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Continue to Documents
          </button>
        </div>

        {/* Footer trust elements */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>🔒 SSL Encrypted</span>
              <span>📋 GDPR Compliant</span>
              <span>🛡️ Data Protected</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
    </div>
  );
}