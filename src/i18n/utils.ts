import en from './en';
import tr from './tr';
import de from './de';
import fr from './fr';
import ar from './ar';

const dictionaries = { en, tr, de, fr, ar } as const;
export type Locale = keyof typeof dictionaries;

function getNested(obj: any, key: string): string | undefined {
  return key.split('.').reduce((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), obj);
}

export function useTranslations(locale: string) {
  const safeLocale = (locale in dictionaries ? locale : 'en') as Locale;
  return function t(key: string): string {
    return (getNested(dictionaries[safeLocale], key) as string)
      ?? (getNested(dictionaries.en, key) as string)
      ?? key;
  };
}

export const locales: Locale[] = ['en', 'tr', 'de', 'fr', 'ar'];
export const localeNames: Record<Locale, string> = {
  en: 'English', tr: 'Türkçe', de: 'Deutsch', fr: 'Français', ar: 'العربية',
};
