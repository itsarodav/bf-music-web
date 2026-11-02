import type { es } from './es';

// Same shape as the Spanish dictionary, any text
type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

export type Dictionary = Widen<typeof es>;

// Every leaf as a dotted path: 'nav.music', 'legal.terms.sections.owner.title'…
type Paths<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${Paths<T[K]>}`;
}[keyof T & string];

export type TranslationKey = Paths<Dictionary>;

export type Translate = (key: TranslationKey, params?: Record<string, string | number>) => string;
