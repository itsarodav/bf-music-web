// Prepares the press kit downloads (public/press-kit) and the web versions of
// the press photos (src/assets/images/press) from the untouched originals in
// _reference. One-off: run again only when an original changes.
//
//   node scripts/build-press-kit-assets.mjs
//
// The wordmark is provisional: the BF monogram plus "Blanca Ferrer" set in
// Diphylleia and converted to outlines, so the SVG needs no font installed.
import sharp from 'sharp';
import { create } from 'fontkitten';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';

const DESIGN = '_reference/design';
const ORIGINALS = '_reference/originals';
const PUBLIC_DIR = 'public/press-kit';
const WEB_DIR = 'src/assets/images/press';

// Written into every press photo download, so the credit travels with the file
const PHOTO_CREDIT = { IFD0: { Artist: 'Lemonims', Copyright: '© Lemonims' } };

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function report(input, output) {
  const [before, after] = await Promise.all([stat(input), stat(output)]);
  console.log(`${output}: ${kb(before.size)} → ${kb(after.size)}`);
}

await mkdir(`${PUBLIC_DIR}/fotos`, { recursive: true });
await mkdir(WEB_DIR, { recursive: true });

// ---------- Press photos ----------
// slug: web source name; file: download name (no spaces or accents)
const photos = [
  { input: `${DESIGN}/20250926_192730.jpg`, slug: 'concierto', file: 'BlancaFerrer_Foto01_Concierto.jpg' },
  { input: `${DESIGN}/hero pic.jpg`, slug: 'jardin', file: 'BlancaFerrer_Foto02_Jardin.jpg' },
  { input: `${DESIGN}/20260411_101428(1).jpg`, slug: 'estudio', file: 'BlancaFerrer_Foto03_Estudio.jpg' },
  { input: `${DESIGN}/IMG-20250129-WA0007.jpg`, slug: 'piano', file: 'BlancaFerrer_Foto04_Piano.jpg' },
  { input: `${DESIGN}/20260411_175458.jpg`, slug: 'estudio-pared', file: 'BlancaFerrer_Foto05_EstudioPared.jpg' },
  { input: `${ORIGINALS}/hero-bg-original.jpg`, slug: 'naranjo', file: 'BlancaFerrer_Foto06_Naranjo.jpg' },
];

for (const { input, slug, file } of photos) {
  // Download: full resolution, upright, high quality
  const download = `${PUBLIC_DIR}/fotos/${file}`;
  await sharp(input).rotate().withExif(PHOTO_CREDIT).jpeg({ quality: 90, mozjpeg: true }).toFile(download);
  await report(input, download);

  // Web: astro:assets makes the responsive variants from this
  const web = `${WEB_DIR}/${slug}.jpg`;
  await sharp(input)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(web);
  await report(input, web);
}

// ---------- Album cover (3000 × 3000) ----------
{
  const input = `${ORIGINALS}/album-cover-original.jpg`;
  const output = `${PUBLIC_DIR}/BlancaFerrer_SokalAffair_Portada_3000.jpg`;
  await sharp(input).rotate().resize(3000, 3000, { fit: 'cover' }).jpeg({ quality: 92, mozjpeg: true }).toFile(output);
  await report(input, output);
}

// ---------- Wordmark (provisional) ----------
const FONT_URL = 'https://fonts.gstatic.com/s/diphylleia/v2/DtVmJxCtRKMixK4_HXsIulw.ttf';
const font = create(Buffer.from(await (await fetch(FONT_URL)).arrayBuffer()));

// Monogram: the navbar logo (88 × 88 viewBox). Its visible box is measured
// by rendering it, since the SVG carries padding around the mark.
const monogramSvg = await readFile('src/icons/logo-bf.svg', 'utf8');
const monogramPaths = [...monogramSvg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
const MONO_RENDER = 10; // render at 880px to measure precisely
const { info } = await sharp(Buffer.from(monogramSvg.replace(/fill="currentColor"/g, 'fill="#000"')), {
  density: 72 * MONO_RENDER,
})
  .flatten({ background: '#fff' })
  .trim()
  .toBuffer({ resolveWithObject: true });
const mono = {
  x: -info.trimOffsetLeft / MONO_RENDER,
  y: -info.trimOffsetTop / MONO_RENDER,
  width: info.width / MONO_RENDER,
  height: info.height / MONO_RENDER,
};

// Text: glyph outlines laid out by advance width, in font units (y up)
const TEXT = 'Blanca Ferrer';
// Slightly tighter than the font's default spacing (-2% of the em)
const TRACKING = -0.02 * font.unitsPerEm;
let penX = 0;
const glyphPaths = [];
for (const glyph of font.glyphsForString(TEXT)) {
  const d = glyph.path.translate(penX, 0).toSVG();
  if (d) glyphPaths.push(d);
  penX += glyph.advanceWidth + TRACKING;
}
const capHeight = font.capHeight;
const textWidth = penX - TRACKING; // no tracking after the last letter

// Composition (font units): monogram 1.7 × cap height, centered on the caps
const monoScale = (capHeight * 1.7) / mono.height;
const monoW = mono.width * monoScale;
const monoH = mono.height * monoScale;
const gap = capHeight * 0.45;
const pad = capHeight * 0.25;
const height = monoH + pad * 2;
const width = pad + monoW + gap + textWidth + pad;
const baseline = pad + monoH / 2 + capHeight / 2;

function wordmarkSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(1)} ${height.toFixed(1)}" fill="${color}">
<title>Blanca Ferrer</title>
<g transform="translate(${(pad - mono.x * monoScale).toFixed(2)} ${(pad - mono.y * monoScale).toFixed(2)}) scale(${monoScale.toFixed(4)})">
${monogramPaths.map((d) => `<path fill-rule="evenodd" clip-rule="evenodd" d="${d}"/>`).join('\n')}
</g>
<g transform="translate(${(pad + monoW + gap).toFixed(2)} ${baseline.toFixed(2)}) scale(1 -1)">
${glyphPaths.map((d) => `<path d="${d}"/>`).join('\n')}
</g>
</svg>
`;
}

const PNG_WIDTH = 3000;
for (const [name, color] of [
  ['Negro', '#141414'],
  ['Blanco', '#FFFFFF'],
]) {
  const svg = wordmarkSvg(color);
  const svgFile = `${PUBLIC_DIR}/BlancaFerrer_Wordmark_${name}.svg`;
  const pngFile = `${PUBLIC_DIR}/BlancaFerrer_Wordmark_${name}.png`;
  await writeFile(svgFile, svg);
  await sharp(Buffer.from(svg), { density: (72 * PNG_WIDTH) / width }).resize({ width: PNG_WIDTH }).png().toFile(pngFile);
  console.log(`${svgFile}, ${pngFile}`);
}

// ---------- Isotype (monogram only) ----------
// Square canvas with the mark centered and some air around it
{
  const side = Math.max(mono.width, mono.height) * 1.25;
  const x = (side - mono.width) / 2 - mono.x;
  const y = (side - mono.height) / 2 - mono.y;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side.toFixed(2)} ${side.toFixed(2)}" fill="#141414">
<title>Blanca Ferrer</title>
<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)})">
${monogramPaths.map((d) => `<path fill-rule="evenodd" clip-rule="evenodd" d="${d}"/>`).join('\n')}
</g>
</svg>
`;
  const svgFile = `${PUBLIC_DIR}/BlancaFerrer_Isotipo_Negro.svg`;
  const pngFile = `${PUBLIC_DIR}/BlancaFerrer_Isotipo_Negro.png`;
  await writeFile(svgFile, svg);
  await sharp(Buffer.from(svg), { density: (72 * 2000) / side }).resize({ width: 2000 }).png().toFile(pngFile);
  console.log(`${svgFile}, ${pngFile}`);
}
