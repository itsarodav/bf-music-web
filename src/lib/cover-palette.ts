// Build time only (sharp): picks the two most vivid colors of a cover, so a
// card can glow in the cover's own colors. The cover is shrunk to a small
// grid, each cell scored by how vivid it is (saturated, not too dark or
// washed out), and the second color must sit far enough on the hue wheel
// from the first so the glow has two tones. Colors come back as "r g b",
// ready for `rgb(var(--x) / <alpha>)` in CSS.
import sharp from 'sharp';

export interface CoverPalette {
  primary: string;
  secondary: string;
}

// Tokens
const GRID_SIZE = 8; // cells per side
const MIN_HUE_DISTANCE = 60; // degrees between the two colors

interface Cell {
  rgb: [number, number, number];
  hue: number;
  score: number;
}

function toCell(r: number, g: number, b: number): Cell {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const lightness = (max + min) / 2;
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  let hue = 0;
  if (delta !== 0) {
    if (max === rn) hue = 60 * (((gn - bn) / delta) % 6);
    else if (max === gn) hue = 60 * ((bn - rn) / delta + 2);
    else hue = 60 * ((rn - gn) / delta + 4);
  }

  // Peaks at mid lightness: near black or white glows look muddy
  const lightnessWeight = 1 - Math.abs(2 * lightness - 1);

  return { rgb: [r, g, b], hue: (hue + 360) % 360, score: saturation * lightnessWeight };
}

function hueDistance(a: number, b: number) {
  const distance = Math.abs(a - b);
  return Math.min(distance, 360 - distance);
}

const format = ({ rgb }: Cell) => rgb.join(' ');

export async function getCoverPalette(cover: ImageMetadata): Promise<CoverPalette> {
  const { data } = await sharp(cover.fsPath)
    .resize(GRID_SIZE, GRID_SIZE, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cells: Cell[] = [];
  for (let i = 0; i < data.length; i += 3) cells.push(toCell(data[i], data[i + 1], data[i + 2]));
  cells.sort((a, b) => b.score - a.score);

  const primary = cells[0];
  const secondary = cells.find((cell) => hueDistance(cell.hue, primary.hue) >= MIN_HUE_DISTANCE) ?? primary;

  return { primary: format(primary), secondary: format(secondary) };
}
