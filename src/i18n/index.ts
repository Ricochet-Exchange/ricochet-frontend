import { addResource, LocaleKey, useTranslation } from './utils';
import en from './en';
import de from './de';

addResource(LocaleKey.en, en);
addResource(LocaleKey.de, de);

export { useTranslation };
