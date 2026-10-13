import type { CollageVideo } from '../components/media/MediaCollage.astro';
import { featuredRelease } from './releases';

// Loop of the "Helena" music video (same compressed cut as linkims),
// linked to the full video on YouTube
export const helenaLoop: CollageVideo = {
  type: 'video',
  sources: [
    { src: '/media/helena-loop.webm', type: 'video/webm' },
    { src: '/media/helena-loop.mp4', type: 'video/mp4' },
  ],
  poster: '/media/helena-loop-poster.webp',
  label: "Ver el videoclip de 'Helena' en YouTube",
  href: featuredRelease.links.youtube,
};
