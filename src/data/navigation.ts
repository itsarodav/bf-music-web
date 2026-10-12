export interface NavLink {
  label: string;
  href: string;
}

// Current page path without the trailing slash, to compare with link hrefs
export const getCurrentPath = (url: URL) => url.pathname.replace(/\/$/, '') || '/';

// Main navigation. "Contacto" is a section rendered on every page,
// so it is a same-page anchor rather than a route.
export const navLinks: NavLink[] = [
  { label: 'Bio', href: '/bio' },
  { label: 'Música', href: '/musica' },
  { label: 'Press kit', href: '/press-kit' },
  { label: 'Film Scoring', href: '/film-scoring' },
  { label: 'Contacto', href: '#contacto' },
];

// Footer sitemap: home + main navigation
export const sitemapLinks: NavLink[] = [{ label: 'Inicio', href: '/' }, ...navLinks];

export const legalLinks: NavLink[] = [
  { label: 'Términos y condiciones', href: '/terminos-y-condiciones' },
  { label: 'Política de privacidad', href: '/politica-de-privacidad' },
];
