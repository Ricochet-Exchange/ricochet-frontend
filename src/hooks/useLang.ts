import { useCallback, useState } from 'react';
import i18n from 'i18next';
import { Namespace, useTranslation, UseTranslationOptions } from 'react-i18next';
import { LocaleKey } from '../i18n/utils';

export const useLang = (ns?: Namespace,
  options?: UseTranslationOptions) => {
  const { t } = useTranslation(ns, options);

  const [language, setLanguage] = useState<LocaleKey>(
    i18n.language as LocaleKey,
  );

  const changeLanguage = useCallback(
    (lang: LocaleKey) => i18n.changeLanguage(lang),
    [],
  );

  i18n.on('languageChanged', setLanguage);

  return { language, changeLanguage, t };
};
