import { useLanguage } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return { t };
}