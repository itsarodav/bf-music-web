import type { NavLink } from './navigation';

export const contact = {
  bookingEmail: 'hi@lemonims.com',
};

// Profile URLs, reused by the contact section and the latest videos section
export const social = {
  instagram: 'https://www.instagram.com/blancaferrermusic',
  tiktok: 'https://www.tiktok.com/@blancaferrermusic',
  youtube: 'https://www.youtube.com/watch?v=60sEKpCR2T8',
  spotify: 'https://open.spotify.com/artist/17WhWrgt4kJEjJZZgJ5wAE',
  linkims: 'https://link.lemonims.com/blanca-ferrer/',
};

export const socialLinks: NavLink[] = [
  { label: 'Instagram', href: social.instagram },
  { label: 'TikTok', href: social.tiktok },
  { label: 'YouTube', href: social.youtube },
  { label: 'Spotify', href: social.spotify },
  { label: 'Linkims', href: social.linkims },
];
