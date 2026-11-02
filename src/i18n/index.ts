import { defaultLocale, localeMeta, locales, type Locale } from './config';
import { routeIds, routes, type RouteId } from './routes';
import type { Dictionary, Translate, TranslationKey } from './types';
import { es } from './es';
import { va } from './va';
import { en } from './en';

export { defaultLocale, localeMeta, locales, routeIds, routes };
export type { Locale, RouteId, Translate, TranslationKey };

const dictionaries: Record<Locale, Dictionary> = { es, va, en };

function lookup(dictionary: Dictionary, key: TranslationKey): string | undefined {
  const value = key.split('.').reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], dictionary);
  return typeof value === 'string' ? value : undefined;
}

/** t('nav.music'), t('release.tracks', { title }): falls back to Spanish */
export function useTranslations(locale: Locale): Translate {
  return (key, params) => {
    const text = lookup(dictionaries[locale], key) ?? lookup(dictionaries[defaultLocale], key) ?? key;
    if (!params) return text;
    return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in params ? String(params[name]) : match));
  };
}

/** Page URL in a language: '/musica', '/va/musica', '/en/music', '/en' */
export function localizePath(routeId: RouteId, locale: Locale): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const slug = routes[routeId][locale];
  return slug ? `${prefix}/${slug}` : prefix || '/';
}

/** Language and page of a URL, from its prefix and slug (reverse of localizePath) */
export function getRoute(url: URL): { locale: Locale; routeId: RouteId } {
  const segments = url.pathname.split('/').filter(Boolean);
  const locale = locales.find((code) => code !== defaultLocale && code === segments[0]) ?? defaultLocale;
  const slug = (locale === defaultLocale ? segments : segments.slice(1)).join('/');
  const routeId = routeIds.find((id) => routes[id][locale] === slug) ?? 'home';
  return { locale, routeId };
}

/** Everything a component needs from the current URL */
export function getI18n(url: URL) {
  const { locale, routeId } = getRoute(url);
  return { locale, routeId, t: useTranslations(locale), meta: localeMeta[locale] };
}

/** The same page in every language (language switcher, hreflang) */
export function getAlternates(routeId: RouteId) {
  return locales.map((locale) => ({ locale, href: localizePath(routeId, locale), ...localeMeta[locale] }));
}

/** "12 de octubre de 2026", "12 d’octubre de 2026", "12 October 2026" */
export function formatDate(isoDate: string, locale: Locale, options: Intl.DateTimeFormatOptions = { dateStyle: 'long' }) {
  return new Intl.DateTimeFormat(localeMeta[locale].intl, { timeZone: 'UTC', ...options }).format(new Date(isoDate));
}

/** "Blanca es <em>pianista</em>…" → ['Blanca es ', { em: 'pianista' }, '…'] (Statement parts) */
export function toEmParts(text: string): (string | { em: string })[] {
  return text
    .split(/(<em>.*?<\/em>)/)
    .filter(Boolean)
    .map((part) => (part.startsWith('<em>') ? { em: part.slice(4, -5) } : part));
}
