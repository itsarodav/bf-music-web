import type { VideoGridItem } from '../components/media/VideoGrid.astro';
import type { LoopVideo } from '../components/cards/VideoCard.astro';

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
export const filmScoringProjects: VideoGridItem[] = [
  { title: 'Happiness', href: 'https://youtu.be/ATReZ6rSEi4', video: loop('happiness') },
  { title: 'Bridgerton', href: 'https://youtu.be/kjn3pvRF_1Y', video: loop('bridgerton') },
  { title: 'Heavy', href: 'https://youtu.be/4qB6_tMaCEQ', video: loop('heavy') },
  { title: 'Fruta', href: 'https://youtu.be/Tmr4lm6q9oI', video: loop('fruta') },
  { title: 'Accidents Happen', href: 'https://youtu.be/z7wVKpyyJ9k', video: loop('jazz') },
  { title: 'Joe & Clou', href: 'https://youtu.be/U59i2lNMhqA', video: loop('joe-clou') },
];
