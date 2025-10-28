import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Globe, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { ValidationData } from '@/pages/validation';
import FlagIconReal from '@/components/flag-icon-real';

// 🚀 Nationality flag mapping with emoji flags
const NATIONALITY_FLAGS: Record<string, string> = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Italy': '🇮🇹',
  'Spain': '🇪🇸',
  'Netherlands': '🇳🇱',
  'Belgium': '🇧🇪',
  'Switzerland': '🇨🇭',
  'Austria': '🇦🇹',
  'Sweden': '🇸🇪',
  'Norway': '🇳🇴',
  'Denmark': '🇩🇰',
  'Finland': '🇫🇮',
  'Ireland': '🇮🇪',
  'New Zealand': '🇳🇿',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'Singapore': '🇸🇬',
  'Hong Kong': '🇭🇰',
  'India': '🇮🇳',
  'China': '🇨🇳',
  'Brazil': '🇧🇷',
  'Mexico': '🇲🇽',
  'Argentina': '🇦🇷',
  'South Africa': '🇿🇦',
  'Israel': '🇮🇱',
  'United Arab Emirates': '🇦🇪',
  'Saudi Arabia': '🇸🇦',
  'Turkey': '🇹🇷',
  'Afghanistan': '🇦🇫',
  'Albania': '🇦🇱',
  'Algeria': '🇩🇿',
  'Andorra': '🇦🇩',
  'Angola': '🇦🇴',
  'Antigua and Barbuda': '🇦🇬',
  'Argentina': '🇦🇷',
  'Armenia': '🇦🇲',
  'Austria': '🇦🇹',
  'Azerbaijan': '🇦🇿',
  'Bahamas': '🇧🇸',
  'Bahrain': '🇧🇭',
  'Bangladesh': '🇧🇩',
  'Barbados': '🇧🇧',
  'Belarus': '🇧🇾',
  'Belgium': '🇧🇪',
  'Belize': '🇧🇿',
  'Benin': '🇧🇯',
  'Bhutan': '🇧🇹',
  'Bolivia': '🇧🇴',
  'Bosnia and Herzegovina': '🇧🇦',
  'Botswana': '🇧🇼',
  'Brazil': '🇧🇷',
  'Brunei': '🇧🇳',
  'Bulgaria': '🇧🇬',
  'Burkina Faso': '🇧🇫',
  'Burundi': '🇧🇮',
  'Cambodia': '🇰🇭',
  'Cameroon': '🇨🇲',
  'Canada': '🇨🇦',
  'Cape Verde': '🇨🇻',
  'Central African Republic': '🇨🇫',
  'Chad': '🇹🇩',
  'Chile': '🇨🇱',
  'China': '🇨🇳',
  'Colombia': '🇨🇴',
  'Comoros': '🇰🇲',
  'Congo': '🇨🇬',
  'Costa Rica': '🇨🇷',
  'Croatia': '🇭🇷',
  'Cuba': '🇨🇺',
  'Cyprus': '🇨🇾',
  'Czech Republic': '🇨🇿',
  'Denmark': '🇩🇰',
  'Djibouti': '🇩🇯',
  'Dominica': '🇩🇲',
  'Dominican Republic': '🇩🇴',
  'East Timor': '🇹🇱',
  'Ecuador': '🇪🇨',
  'Egypt': '🇪🇬',
  'El Salvador': '🇸🇻',
  'Equatorial Guinea': '🇬🇶',
  'Eritrea': '🇪🇷',
  'Estonia': '🇪🇪',
  'Ethiopia': '🇪🇹',
  'Fiji': '🇫🇯',
  'Finland': '🇫🇮',
  'France': '🇫🇷',
  'Gabon': '🇬🇦',
  'Gambia': '🇬🇲',
  'Georgia': '🇬🇪',
  'Germany': '🇩🇪',
  'Ghana': '🇬🇭',
  'Greece': '🇬🇷',
  'Grenada': '🇬🇩',
  'Guatemala': '🇬🇹',
  'Guinea': '🇬🇳',
  'Guinea-Bissau': '🇬🇼',
  'Guyana': '🇬🇾',
  'Haiti': '🇭🇹',
  'Honduras': '🇭🇳',
  'Hong Kong': '🇭🇰',
  'Hungary': '🇭🇺',
  'Iceland': '🇮🇸',
  'India': '🇮🇳',
  'Indonesia': '🇮🇩',
  'Iran': '🇮🇷',
  'Iraq': '🇮🇶',
  'Ireland': '🇮🇪',
  'Israel': '🇮🇱',
  'Italy': '🇮🇹',
  'Ivory Coast': '🇨🇮',
  'Jamaica': '🇯🇲',
  'Japan': '🇯🇵',
  'Jordan': '🇯🇴',
  'Kazakhstan': '🇰🇿',
  'Kenya': '🇰🇪',
  'Kiribati': '🇰🇮',
  'Kuwait': '🇰🇼',
  'Kyrgyzstan': '🇰🇬',
  'Laos': '🇱🇦',
  'Latvia': '🇱🇻',
  'Lebanon': '🇱🇧',
  'Lesotho': '🇱🇸',
  'Liberia': '🇱🇷',
  'Libya': '🇱🇾',
  'Liechtenstein': '🇱🇨',
  'Lithuania': '🇱🇹',
  'Luxembourg': '🇱🇺',
  'Macao': '🇲🇴',
  'Madagascar': '🇲🇬',
  'Malawi': '🇲🇼',
  'Malaysia': '🇲🇾',
  'Maldives': '🇲🇻',
  'Mali': '🇲🇱',
  'Malta': '🇲🇹',
  'Mauritania': '🇲🇷',
  'Mauritius': '🇲🇺',
  'Mexico': '🇲🇽',
  'Micronesia': '🇫🇲',
  'Moldova': '🇲🇩',
  'Monaco': '🇲🇨',
  'Mongolia': '🇲🇳',
  'Montenegro': '🇲🇪',
  'Morocco': '🇲🇦',
  'Mozambique': '🇲🇿',
  'Myanmar': '🇲🇲',
  'Namibia': '🇳🇦',
  'Nauru': '🇳🇷',
  'Nepal': '🇳🇵',
  'Netherlands': '🇳🇱',
  'New Zealand': '🇳🇿',
  'Nicaragua': '🇳🇮',
  'Niger': '🇳🇪',
  'Nigeria': '🇳🇬',
  'North Korea': '🇰🇵',
  'North Macedonia': '🇲🇰',
  'Norway': '🇳🇴',
  'Oman': '🇴🇲',
  'Pakistan': '🇵🇰',
  'Palau': '🇵🇼',
  'Panama': '🇵🇦',
  'Papua New Guinea': '🇵🇬',
  'Paraguay': '🇵🇾',
  'Peru': '🇵🇪',
  'Philippines': '🇵🇭',
  'Poland': '🇵🇱',
  'Portugal': '🇵🇹',
  'Qatar': '🇶🇦',
  'Romania': '🇷🇴',
  'Russia': '🇷🇺',
  'Rwanda': '🇷🇼',
  'Saint Kitts and Nevis': '🇰🇳',
  'Saint Lucia': '🇱🇨',
  'Saint Vincent and the Grenadines': '🇻🇻',
  'Samoa': '🇼🇸',
  'San Marino': '🇸🇲',
  'Saudi Arabia': '🇸🇦',
  'Senegal': '🇸🇳',
  'Serbia': '🇷🇸',
  'Seychelles': '🇸🇨',
  'Sierra Leone': '🇸🇱',
  'Singapore': '🇸🇬',
  'Slovakia': '🇸🇰',
  'Slovenia': '🇸🇮',
  'Solomon Islands': '🇸🇧',
  'Somalia': '🇸🇴',
  'South Africa': '🇿🇦',
  'South Korea': '🇰🇷',
  'South Sudan': '🇸🇸',
  'Spain': '🇪🇸',
  'Sri Lanka': '🇱🇰',
  'Sudan': '🇸🇩',
  'Suriname': '🇸🇷',
  'Swaziland': '��🇿',
  'Sweden': '🇸🇪',
  'Switzerland': '🇨🇭',
  'Syria': '🇸🇾',
  'Taiwan': '🇹🇼',
  'Tajikistan': '🇹🇯',
  'Tanzania': '🇹🇿',
  'Thailand': '🇹🇭',
  'Timor-Leste': '🇹🇱',
  'Togo': '🇹🇬',
  'Tonga': '🇹🇴',
  'Trinidad and Tobago': '🇹🇹',
  'Tunisia': '🇹🇳',
  'Turkey': '🇹🇷',
  'Turkmenistan': '🇹🇲',
  'Tuvalu': '🇹🇻',
  'Uganda': '🇺🇬',
  'Ukraine': '🇺🇦',
  'United Arab Emirates': '🇦🇪',
  'United Kingdom': '🇬🇧',
  'United States': '🇺🇸',
  'United States': '🇺🇸',
  'Uruguay': '🇺🇾',
  'Uzbekistan': '🇺🇿',
  'Vanuatu': '🇻🇺',
  'Vatican': '🇻🇦',
  'Venezuela': '🇻🇪',
  'Vietnam': '🇻🇳',
  'Yemen': '🇾🇪',
  'Zambia': '🇿🇲',
  'Zimbabwe': '🇿🇼'
};

// Helper function to capitalize first letter of each word
const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// 🚀 Nationality name to country code mapping for FlagIcon
const NATIONALITY_COUNTRY_CODES: Record<string, string> = {
  'United States': 'us',
  'United Kingdom': 'gb',
  'Canada': 'ca',
  'Australia': 'au',
  'Germany': 'de',
  'France': 'fr',
  'Italy': 'it',
  'Spain': 'es',
  'Netherlands': 'nl',
  'Belgium': 'be',
  'Switzerland': 'ch',
  'Austria': 'at',
  'Sweden': 'se',
  'Norway': 'no',
  'Denmark': 'dk',
  'Finland': 'fi',
  'Ireland': 'ie',
  'New Zealand': 'nz',
  'Japan': 'jp',
  'South Korea': 'kr',
  'Singapore': 'sg',
  'Hong Kong': 'hk',
  'India': 'in',
  'China': 'cn',
  'Brazil': 'br',
  'Mexico': 'mx',
  'Argentina': 'ar',
  'South Africa': 'za',
  'Israel': 'il',
  'United Arab Emirates': 'ae',
  'Saudi Arabia': 'sa',
  'Turkey': 'tr',
  'Afghanistan': 'af',
  'Albania': 'al',
  'Algeria': 'dz',
  'Andorra': 'ad',
  'Angola': 'ao',
  'Antigua and Barbuda': 'ag',
  'Armenia': 'am',
  'Azerbaijan': 'az',
  'Bahamas': 'bs',
  'Bahrain': 'bh',
  'Bangladesh': 'bd',
  'Barbados': 'bb',
  'Belarus': 'by',
  'Belize': 'bz',
  'Benin': 'bj',
  'Bhutan': 'bt',
  'Bolivia': 'bo',
  'Bosnia and Herzegovina': 'ba',
  'Botswana': 'bw',
  'Brunei': 'bn',
  'Bulgaria': 'bg',
  'Burkina Faso': 'bf',
  'Burundi': 'bi',
  'Cambodia': 'kh',
  'Cameroon': 'cm',
  'Cape Verde': 'cv',
  'Central African Republic': 'cf',
  'Chad': 'td',
  'Chile': 'cl',
  'Colombia': 'co',
  'Comoros': 'km',
  'Congo': 'cg',
  'Costa Rica': 'cr',
  'Croatia': 'hr',
  'Cuba': 'cu',
  'Cyprus': 'cy',
  'Czech Republic': 'cz',
  'Djibouti': 'dj',
  'Dominica': 'dm',
  'Dominican Republic': 'do',
  'East Timor': 'tl',
  'Ecuador': 'ec',
  'Egypt': 'eg',
  'El Salvador': 'sv',
  'Equatorial Guinea': 'gq',
  'Eritrea': 'er',
  'Estonia': 'ee',
  'Ethiopia': 'et',
  'Fiji': 'fj',
  'Gabon': 'ga',
  'Gambia': 'gm',
  'Georgia': 'ge',
  'Ghana': 'gh',
  'Greece': 'gr',
  'Grenada': 'gd',
  'Guatemala': 'gt',
  'Guinea': 'gn',
  'Guinea-Bissau': 'gw',
  'Guyana': 'gy',
  'Haiti': 'ht',
  'Honduras': 'hn',
  'Hungary': 'hu',
  'Iceland': 'is',
  'Indonesia': 'id',
  'Iran': 'ir',
  'Iraq': 'iq',
  'Ivory Coast': 'ci',
  'Jamaica': 'jm',
  'Jordan': 'jo',
  'Kazakhstan': 'kz',
  'Kenya': 'ke',
  'Kiribati': 'ki',
  'Kuwait': 'kw',
  'Kyrgyzstan': 'kg',
  'Laos': 'la',
  'Latvia': 'lv',
  'Lebanon': 'lb',
  'Lesotho': 'ls',
  'Liberia': 'lr',
  'Libya': 'ly',
  'Liechtenstein': 'li',
  'Lithuania': 'lt',
  'Luxembourg': 'lu',
  'Macao': 'mo',
  'Madagascar': 'mg',
  'Malawi': 'mw',
  'Malaysia': 'my',
  'Maldives': 'mv',
  'Mali': 'ml',
  'Malta': 'mt',
  'Marshall Islands': 'mh',
  'Mauritania': 'mr',
  'Mauritius': 'mu',
  'Micronesia': 'fm',
  'Moldova': 'md',
  'Monaco': 'mc',
  'Mongolia': 'mn',
  'Montenegro': 'me',
  'Morocco': 'ma',
  'Mozambique': 'mz',
  'Myanmar': 'mm',
  'Namibia': 'na',
  'Nauru': 'nr',
  'Nepal': 'np',
  'Nicaragua': 'ni',
  'Niger': 'ne',
  'Nigeria': 'ng',
  'North Korea': 'kp',
  'North Macedonia': 'mk',
  'Oman': 'om',
  'Pakistan': 'pk',
  'Palau': 'pw',
  'Palestine': 'ps',
  'Panama': 'pa',
  'Papua New Guinea': 'pg',
  'Paraguay': 'py',
  'Peru': 'pe',
  'Philippines': 'ph',
  'Poland': 'pl',
  'Portugal': 'pt',
  'Qatar': 'qa',
  'Romania': 'ro',
  'Russia': 'ru',
  'Rwanda': 'rw',
  'Saint Kitts and Nevis': 'kn',
  'Saint Lucia': 'lc',
  'Saint Vincent and the Grenadines': 'vc',
  'Samoa': 'ws',
  'Sao Tome and Principe': 'st',
  'Senegal': 'sn',
  'Serbia': 'rs',
  'Seychelles': 'sc',
  'Sierra Leone': 'sl',
  'Slovakia': 'sk',
  'Slovenia': 'si',
  'Solomon Islands': 'sb',
  'Somalia': 'so',
  'South Korea': 'kr',
  'South Sudan': 'ss',
  'Sri Lanka': 'lk',
  'Sudan': 'sd',
  'Suriname': 'sr',
  'Swaziland': 'sz',
  'Syria': 'sy',
  'Taiwan': 'tw',
  'Tajikistan': 'tj',
  'Tanzania': 'tz',
  'Thailand': 'th',
  'Timor-Leste': 'tl',
  'Togo': 'tg',
  'Tonga': 'to',
  'Trinidad and Tobago': 'tt',
  'Tunisia': 'tn',
  'Turkey': 'tr',
  'Turkmenistan': 'tm',
  'Tuvalu': 'tv',
  'Uganda': 'ug',
  'Ukraine': 'ua',
  'United Arab Emirates': 'ae',
  'United Kingdom': 'gb',
  'United States': 'us',
  'Uruguay': 'uy',
  'Uzbekistan': 'uz',
  'Vanuatu': 'vu',
  'Vatican City': 'va',
  'Venezuela': 've',
  'Vietnam': 'vn',
  'Yemen': 'ye',
  'Zambia': 'zm',
  'Zimbabwe': 'zw'
};

// Helper function to get nationality display with flag
const getNationalityWithFlag = (nationalityName: string) => {
  return (
    <span className="flex items-center gap-1">
      <FlagIconReal country={nationalityName} size="sm" />
      <span>{nationalityName}</span>
    </span>
  );
};

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
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-6">
        <Globe className="w-20 h-20 mx-auto text-[var(--visa-primary)] mb-4" />
        <h2 className="text-4xl font-bold gradient-text mb-3">{t('selectNationality') || 'Select Your Nationality'}</h2>
        <p className="text-xl text-[var(--visa-text-secondary)]">
          {t('nationalityDescription') || 'Visa requirements vary by nationality. Please select your citizenship to see accurate requirements.'}
        </p>
        <div className="flex items-center justify-center space-x-6 text-[var(--visa-text-muted)]">
          <span className="flex items-center space-x-2">
            <span className="font-semibold text-[var(--visa-text-primary)]">{t('destination') || 'Destination'}:</span>
            <span className="font-medium px-3 py-1 rounded-full bg-[var(--visa-primary-light)] text-[var(--visa-primary-dark)]">{data.country}</span>
          </span>
          <span className="text-[var(--visa-text-muted)]">•</span>
          <span className="flex items-center space-x-2">
            <span className="font-semibold text-[var(--visa-text-primary)]">{t('visaType') || 'Visa Type'}:</span>
            <span className="font-medium px-3 py-1 rounded-full bg-[var(--visa-accent-light)] text-[var(--visa-accent-dark)]">{data.visaType}</span>
          </span>
        </div>
      </div>

      {/* 🚀 Enterprise Quick Selection */}
      <div className="card-premium p-6 mb-8">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-[var(--visa-text-primary)] mb-2">{t('quickSelection') || 'Popular Nationalities'}</h3>
          <p className="text-[var(--visa-text-secondary)]">Choose from frequently selected nationalities for faster access</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {popularNationalities.map((nationality) => (
            <button
              key={nationality}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 ${selectedNationality === nationality ? 'bg-[var(--visa-primary-light)] border-[var(--visa-primary)]' : 'bg-[var(--visa-surface)] border-[var(--visa-border)] hover:bg-[var(--visa-surface-alt)] transition-all duration-200'}`}
              onClick={() => handleNationalitySelect(nationality)}
            >
              <div className="flex items-center space-x-3">
                <FlagIconReal country={nationality} size="sm" />
                <span className="font-medium">{capitalizeWords(nationality)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 🚀 Search All Nationalities */}
      <div className="card-premium p-6">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-[var(--visa-text-primary)] mb-2">{t('searchNationality') || 'Search All Nationalities'}</h3>
          <p className="text-[var(--visa-text-secondary)]">Type to search through all available nationalities</p>
        </div>
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
      </div>

      

      <div className="flex justify-between pt-6">
        <button onClick={onPrevious} className="btn-secondary flex items-center space-x-3 px-6 py-3">
          <ArrowLeft className="h-5 w-5" />
          {t('previous') || 'Previous'}
        </button>

        <button
          disabled={!selectedNationality}
          onClick={onNext}
          className="btn-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('next') || 'Next'}
        </button>
      </div>
    </div>
  );
}