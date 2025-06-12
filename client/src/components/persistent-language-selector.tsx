import { useState } from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useLanguage, SUPPORTED_LANGUAGES, type Language } from '@/lib/i18n';

export default function PersistentLanguageSelector() {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage.code);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer bg-white border rounded-md px-3 py-1.5 shadow-sm hover:bg-gray-50">
          <Globe className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">
            {SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)?.nativeName || 'English'}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-64 overflow-y-auto">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang)}
            className={`flex items-center space-x-2 cursor-pointer ${
              currentLanguage === lang.code ? 'bg-blue-50 text-blue-700' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{lang.name}</span>
              <span className="text-xs text-gray-500">{lang.nativeName}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}