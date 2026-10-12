import type { NavLink } from './navigation';

export const contact = {
  bookingEmail: 'hi@lemonims.com',
};

// Profile URLs, reused by the contact section and the latest videos section
export const social = {
  instagram: 'https://www.instagram.com/blancaferrermusic',
  tiktok: 'https://www.tiktok.com/@blancaferrermusic',
  youtube: 'https://www.youtube.com/watch?v=60sEKpCR2T8',
};

export const socialLinks: NavLink[] = [
  { label: 'Instagram', href: social.instagram },
  { label: 'TikTok', href: social.tiktok },
  { label: 'YouTube', href: social.youtube },
];
