// Builds the Film Scoring loops (public/media) from the source videos in
// _reference/design, like the Helena one: a short muted excerpt at 25 fps,
// as MP4 (H.264) + WebM (VP9), plus a WebP poster from its first frame.
// The first project fills the full-width row, so it gets 1280 × 720; the
// rest show smaller and get 960 × 540.
//
// Needs ffmpeg: FFMPEG=/path/to/ffmpeg node scripts/build-film-scoring-loops.mjs
import { execFileSync } from 'node:child_process';
import { stat, unlink } from 'node:fs/promises';
import sharp from 'sharp';

const FFMPEG = process.env.FFMPEG ?? 'ffmpeg';
const SOURCE = '_reference/design';
const OUT = 'public/media';
const DURATION = 12; // seconds per loop
const FPS = 25;
// Quality: the full-width loop gets a bit more, the small ones less (they
// show at a third of the width)
const QUALITY = { large: { x264: 28, vp9: 38 }, small: { x264: 31, vp9: 42 } };

// start: second where the excerpt begins (picked for a representative scene)
// crop: source area to keep before scaling (16:9), when the source needs it
// quality: overrides the size-based CRF for one loop
const loops = [
  // Dense, grainy animation: compressed harder so it stays near the others
  { slug: 'happiness', input: 'InMics_Round2_BlancaFerrandoSanchez.mp4', start: 22, size: [1280, 720], quality: { x264: 32, vp9: 46 } },
  // Letterboxed (1920 × 960 from y = 60): picture only, cut to 16:9
  { slug: 'bridgerton', input: 'bridgerton-07.mp4', start: 60, size: [960, 540], crop: '1706:960:107:60' },
  // Letterboxed with a burned-in timecode under the picture: keep the
  // picture only (1920 × 816 from y = 132), cut to 16:9 at the center
  { slug: 'heavy', input: 'heavy-04.mp4', start: 30, size: [960, 540], crop: '1450:816:235:132' },
  // Fades to black at 70.2 s and at the end (89 s): excerpt well before
  { slug: 'fruta', input: 'fruta-05.mp4', start: 22, size: [960, 540] },
  { slug: 'jazz', input: 'Animation (Jazz).mp4', start: 14, size: [960, 540] },
  { slug: 'joe-clou', input: 'Joe&Clou.mp4', start: 3, size: [960, 540] },
];

const kb = async (file) => `${((await stat(file)).size / 1024).toFixed(0)} KB`;

for (const { slug, input, start, size, crop, quality: override } of loops) {
  const [width, height] = size;
  const quality = override ?? (width >= 1280 ? QUALITY.large : QUALITY.small);
  const filters = [crop && `crop=${crop}`, `scale=${width}:${height}:force_original_aspect_ratio=increase`, `crop=${width}:${height}`, `fps=${FPS}`]
    .filter(Boolean)
    .join(',');
  const base = `${OUT}/film-${slug}-loop`;
  const common = ['-y', '-v', 'error', '-ss', String(start), '-t', String(DURATION), '-i', `${SOURCE}/${input}`, '-an', '-vf', filters];

  execFileSync(FFMPEG, [...common, '-c:v', 'libx264', '-crf', String(quality.x264), '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${base}.mp4`]);
  execFileSync(FFMPEG, [...common, '-c:v', 'libvpx-vp9', '-crf', String(quality.vp9), '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', `${base}.webm`]);

  // Poster: the loop's first frame
  const png = `${base}-poster.png`;
  execFileSync(FFMPEG, ['-y', '-v', 'error', '-i', `${base}.mp4`, '-frames:v', '1', png]);
  await sharp(png).webp({ quality: 78 }).toFile(`${base}-poster.webp`);
  await unlink(png);

  console.log(`${slug}: mp4 ${await kb(`${base}.mp4`)}, webm ${await kb(`${base}.webm`)}, poster ${await kb(`${base}-poster.webp`)}`);
}
