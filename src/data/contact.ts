import type { NavLink } from './navigation';
import { youtubeChannel } from './shorts';

export const contact = {
  bookingEmail: 'hi@lemonims.com',
};

// Booking contact shown in the press kit (Lemonims). Only this name is
// public: no full surnames, personal email or phone anywhere.
export const booking = {
  name: 'Andrea R.D.',
  role: 'Booking & Management',
  agency: 'Lemonims',
  email: contact.bookingEmail,
  // TODO: replace with the real number when available
  phone: '+34 888 88 88 88',
};

// Profile URLs, reused by the contact section and the latest videos section
export const social = {
  instagram: 'https://www.instagram.com/blancaferrermusic',
  tiktok: 'https://www.tiktok.com/@blancaferrermusic',
  youtube: youtubeChannel.url,
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

// Lemonims' own profiles (press kit contact card), not Blanca's
export const lemonimsSocial: (NavLink & { icon: string })[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/lemonims', icon: 'instagram' },
  { label: 'Linkims', href: 'https://link.lemonims.com', icon: 'web' },
];
