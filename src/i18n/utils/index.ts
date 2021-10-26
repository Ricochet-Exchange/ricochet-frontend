import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import keys from 'ramda/es/keys';

export enum LocaleKey {
  en = 'en',
  de = 'de',
}

export const localeNames = {
  [LocaleKey.en]: 'English',
  [LocaleKey.de]: 'Deutsch',
};
export const localeShortNames = {
  [LocaleKey.en]: 'En',
  [LocaleKey.de]: 'De',
};

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => cb(LocaleKey.en),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: LocaleKey.en,
    resources: {},
    debug: process.env.NODE_ENV === 'development',
    defaultNS: 'main',
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      useSuspense: true,
    },
  });

/**
 * Adds single namespace to language
 */
const addNamespace = (
  lng: LocaleKey,
  ns: string,
  resources: Record<string, string>,
) => i18n.addResources(lng, ns, resources);

/**
 * Adds pack of namespaces to i18n
 */
const addResource = (
  lng: LocaleKey,
  bundle: Record<string, Record<string, string>>,
) => keys(bundle).forEach((ns) => i18n.addResources(lng, ns, bundle[ns]));

export { useTranslation } from 'react-i18next';
export { addNamespace, addResource };

export default i18n;
