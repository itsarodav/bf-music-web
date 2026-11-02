import type { CollageVideo } from '../components/media/MediaCollage.astro';
import type { Translate } from '../i18n';
import { featuredRelease } from './releases';

// Loop of the "Helena" music video (same compressed cut as linkims),
// linked to the full video on YouTube
export const getHelenaLoop = (t: Translate): CollageVideo => ({
  type: 'video',
  sources: [
    { src: '/media/helena-loop.webm', type: 'video/webm' },
    { src: '/media/helena-loop.mp4', type: 'video/mp4' },
  ],
  poster: '/media/helena-loop-poster.webp',
  label: t('release.helenaVideo'),
  href: featuredRelease.links.youtube,
});
