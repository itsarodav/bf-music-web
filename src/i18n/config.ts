// Languages of the site. Spanish is the default and has no URL prefix; the
// others live under /va and /en. Mirrored in astro.config.mjs (i18n).
export const locales = ['es', 'va', 'en'] as const;
export const defaultLocale = 'es' as const;

export type Locale = (typeof locales)[number];

interface LocaleMeta {
  /** Button and mobile tabs */
  short: string;
  /** Dropdown option, in its own language */
  name: string;
  /** <html lang> and hreflang. Valencian has no ISO code of its own: BCP 47 is ca-ES-valencia */
  htmlLang: string;
  ogLocale: string;
  /** Dates and numbers (Intl) */
  intl: string;
  /** nf_lang cookie value: Netlify's language redirects match it (public/_redirects) */
  netlifyLang: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  es: { short: 'ES', name: 'Español', htmlLang: 'es', ogLocale: 'es_ES', intl: 'es-ES', netlifyLang: 'es' },
  va: { short: 'VA', name: 'Valencià', htmlLang: 'ca-ES-valencia', ogLocale: 'ca_ES', intl: 'ca-ES-valencia', netlifyLang: 'ca' },
  en: { short: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_GB', intl: 'en-GB', netlifyLang: 'en' },
};
