import type { VideoGridItem } from '../components/media/VideoGrid.astro';
import type { LoopVideo } from '../components/cards/VideoCard.astro';
import { youtubeChannel } from './shorts';

// Loop files in public/media, built by scripts/build-film-scoring-loops.mjs
const loop = (slug: string): LoopVideo => ({
  sources: [
    { src: `/media/film-${slug}-loop.webm`, type: 'video/webm' },
    { src: `/media/film-${slug}-loop.mp4`, type: 'video/mp4' },
  ],
  poster: `/media/film-${slug}-loop-poster.webp`,
});

// Film Scoring projects, in grid order (see VideoGrid): 1 full width, then
// 2 halves, then 3 thirds.
// TODO: titles are provisional (from the file names) and every card links to
// the channel until each project's YouTube link is ready.
export const filmScoringProjects: VideoGridItem[] = [
  { title: 'Happiness', href: youtubeChannel.url, video: loop('happiness') },
  { title: 'Bridgerton', href: youtubeChannel.url, video: loop('bridgerton') },
  { title: 'Heavy', href: youtubeChannel.url, video: loop('heavy') },
  { title: 'Fruta', href: youtubeChannel.url, video: loop('fruta') },
  { title: 'Animation (Jazz)', href: youtubeChannel.url, video: loop('jazz') },
  { title: 'Joe & Clou', href: youtubeChannel.url, video: loop('joe-clou') },
];
