import type { VideoGridItem } from '../components/media/VideoGrid.astro';
import { youtubeChannel } from './shorts';

// Film Scoring projects, in grid order (see VideoGrid for the layout).
// Placeholders: titles, YouTube links and loops still to come. Each loop
// goes in public/media like the Helena one:
// video: { sources: [{ src: '/media/x.webm', type: 'video/webm' }, { src: '/media/x.mp4', type: 'video/mp4' }], poster: '/media/x-poster.webp' }
export const filmScoringProjects: VideoGridItem[] = [
  { title: 'Proyecto 1', href: youtubeChannel.url },
  { title: 'Proyecto 2', href: youtubeChannel.url },
  { title: 'Proyecto 3', href: youtubeChannel.url },
  { title: 'Proyecto 4', href: youtubeChannel.url },
  { title: 'Proyecto 5', href: youtubeChannel.url },
];
