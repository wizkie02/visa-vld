import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage, SUPPORTED_LANGUAGES } from '@/lib/i18n';

interface LanguageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LanguageSelectionModal({ isOpen, onClose }: LanguageSelectionModalProps) {
  const { changeLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleConfirm = () => {
    changeLanguage(selectedLanguage);
    localStorage.setItem('languageSelected', 'true');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Choose Your Language / 选择您的语言 / अपनी भाषा चुनें
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-center text-gray-600 mb-6">
            Select your preferred language for the visa validation application
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SUPPORTED_LANGUAGES.map((language) => (
              <Card 
                key={language.code}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedLanguage === language.code 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{language.flag}</div>
                  <div className="font-semibold text-sm mb-1">{language.name}</div>
                  <div className="text-xs text-gray-600">{language.nativeName}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleConfirm}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Continue / 继续 / जारी रखें
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}