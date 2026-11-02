import { SHOW_PRESS_KIT } from './features';
import { localizePath, useTranslations, type Locale, type RouteId } from '../i18n';

/** A page of the site, or a same-page anchor shared by every page */
type NavItem = { routeId: RouteId } | { anchor: string; labelKey: 'nav.contact' };

export interface NavLink {
  label: string;
  href: string;
  /** Set for pages, so the current one can be marked */
  routeId?: RouteId;
}

// Main navigation. "Contacto" is a section rendered on every page,
// so it is a same-page anchor rather than a route. Press kit only shows
// while it's enabled (see data/features).
const navItems: NavItem[] = [
  { routeId: 'bio' },
  { routeId: 'music' },
  ...(SHOW_PRESS_KIT ? [{ routeId: 'pressKit' as const }] : []),
  { routeId: 'filmScoring' },
  { anchor: '#contacto', labelKey: 'nav.contact' },
];

// Footer sitemap: home + main navigation
const sitemapItems: NavItem[] = [{ routeId: 'home' }, ...navItems];

const legalItems: NavItem[] = [{ routeId: 'terms' }, { routeId: 'privacy' }];

function localize(items: NavItem[], locale: Locale): NavLink[] {
  const t = useTranslations(locale);
  return items.map((item) =>
    'anchor' in item
      ? { label: t(item.labelKey), href: item.anchor }
      : { label: t(`nav.${item.routeId}`), href: localizePath(item.routeId, locale), routeId: item.routeId },
  );
}

export const getNavLinks = (locale: Locale) => localize(navItems, locale);
export const getSitemapLinks = (locale: Locale) => localize(sitemapItems, locale);
export const getLegalLinks = (locale: Locale) => localize(legalItems, locale);
