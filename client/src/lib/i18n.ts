import { translations } from './translations';

// Simplified English-only language system
export function useLanguage() {
  // Always return English translations
  const t = (key: string): string => {
    return translations.en[key] || key;
  };

  return {
    t,
    currentLanguage: 'en',
    setLanguage: () => {}, // No-op for compatibility
  };
}