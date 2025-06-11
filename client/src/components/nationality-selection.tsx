import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { ValidationData } from '@/pages/validation';

interface NationalitySelectionProps {
  data: ValidationData;
  onUpdate: (updates: Partial<ValidationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
}

// Common nationalities for quick selection
const popularNationalities = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland',
  'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Ireland',
  'New Zealand', 'Japan', 'South Korea', 'Singapore', 'Hong Kong',
  'India', 'China', 'Brazil', 'Mexico', 'Argentina', 'South Africa',
  'Israel', 'United Arab Emirates', 'Saudi Arabia', 'Turkey'
];

// Complete list of countries/nationalities
const allNationalities = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
  'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
  'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
  'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China',
  'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus',
  'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea',
  'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
  'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
  'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
  'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco',
  'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
  'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger',
  'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
  'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
  'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
  'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka',
  'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
  'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

export default function NationalitySelection({ data, onUpdate, onNext, onPrevious, canProceed }: NationalitySelectionProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNationality, setSelectedNationality] = useState(data.personalInfo.nationality || '');

  const filteredNationalities = allNationalities.filter(nationality =>
    nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNationalitySelect = (nationality: string) => {
    setSelectedNationality(nationality);
    onUpdate({
      personalInfo: {
        ...data.personalInfo,
        nationality: nationality
      }
    });
  };

  const handleNext = () => {
    if (selectedNationality) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <Globe className="w-16 h-16 mx-auto text-blue-600" />
        <h2 className="text-3xl font-bold">{t('selectNationality') || 'Select Your Nationality'}</h2>
        <p className="text-gray-600">
          {t('nationalityDescription') || 'Visa requirements vary by nationality. Please select your citizenship to see accurate requirements.'}
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <span className="font-semibold">{t('destination') || 'Destination'}:</span>
            <span>{data.country}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <span className="font-semibold">{t('visaType') || 'Visa Type'}:</span>
            <span>{data.visaType}</span>
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('quickSelection') || 'Popular Nationalities'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {popularNationalities.map((nationality) => (
              <Button
                key={nationality}
                variant={selectedNationality === nationality ? "default" : "outline"}
                size="sm"
                onClick={() => handleNationalitySelect(nationality)}
                className="text-left justify-start"
              >
                {nationality}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('searchNationality') || 'Search All Nationalities'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={t('searchPlaceholder') || 'Search for your nationality...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {searchTerm && (
            <div className="max-h-48 overflow-y-auto border rounded-lg">
              {filteredNationalities.length > 0 ? (
                filteredNationalities.map((nationality) => (
                  <button
                    key={nationality}
                    onClick={() => handleNationalitySelect(nationality)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0 ${
                      selectedNationality === nationality ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    {nationality}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  {t('noNationalityFound') || 'No nationality found'}
                </div>
              )}
            </div>
          )}

          {selectedNationality && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">
                  {t('selectedNationality') || 'Selected Nationality'}:
                </span>
                <span className="text-green-700">{selectedNationality}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          {t('whyNationality') || 'Why do we need your nationality?'}
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• {t('nationalityReason1') || 'Visa requirements differ significantly by nationality'}</li>
          <li>• {t('nationalityReason2') || 'Some countries have visa-free agreements with specific nations'}</li>
          <li>• {t('nationalityReason3') || 'Processing times and fees may vary by citizenship'}</li>
          <li>• {t('nationalityReason4') || 'Required documents can be nationality-specific'}</li>
        </ul>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          {t('previous')}
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!selectedNationality}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {t('viewRequirements') || 'View Requirements'}
        </Button>
      </div>
    </div>
  );
}