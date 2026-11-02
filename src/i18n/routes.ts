import type { Locale } from './config';

// Every page has one id and a slug per language (without the language prefix).
// Pages are generated from this table by src/pages/[...slug].astro.
export const routes = {
  home: { es: '', va: '', en: '' },
  bio: { es: 'bio', va: 'bio', en: 'bio' },
  music: { es: 'musica', va: 'musica', en: 'music' },
  pressKit: { es: 'press-kit', va: 'press-kit', en: 'press-kit' },
  filmScoring: { es: 'film-scoring', va: 'film-scoring', en: 'film-scoring' },
  terms: { es: 'terminos-y-condiciones', va: 'termes-i-condicions', en: 'terms-and-conditions' },
  privacy: { es: 'politica-de-privacidad', va: 'politica-de-privacitat', en: 'privacy-policy' },
} satisfies Record<string, Record<Locale, string>>;

export type RouteId = keyof typeof routes;

export const routeIds = Object.keys(routes) as RouteId[];
