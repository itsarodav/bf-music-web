import { statSync } from 'node:fs';
import { join } from 'node:path';

// A file offered for download from /public. While it doesn't exist yet,
// `available: false` shows it as "Próximamente" instead of a broken link:
// flipping that one flag (and dropping the file in public/) turns it on.
export interface Download {
  label: string;
  /** Path under /public, no spaces or accents (it's also the saved file name) */
  file: string;
  /** Shown as a tag: PDF, ZIP, JPG, SVG… */
  format: string;
  available: boolean;
}

export interface ResolvedDownload extends Download {
  /** null while unavailable */
  href: string | null;
  /** "1,9 MB", read from the file at build time */
  size: string | null;
  /** File name for the `download` attribute */
  filename: string;
}

const MB = 1024 * 1024;

// Spanish decimal comma: 1,9 MB · 240 KB
function formatSize(bytes: number) {
  if (bytes < MB) return `${Math.round(bytes / 1024)} KB`;
  const mb = bytes / MB;
  return `${mb < 10 ? mb.toFixed(1).replace('.', ',') : Math.round(mb)} MB`;
}

export function resolveDownload(download: Download): ResolvedDownload {
  const filename = download.file.split('/').pop() ?? download.file;
  const unavailable = { ...download, href: null, size: null, filename };
  if (!download.available) return unavailable;

  try {
    const { size } = statSync(join(process.cwd(), 'public', download.file));
    return { ...download, href: download.file, size: formatSize(size), filename };
  } catch {
    console.warn(`[downloads] "${download.file}" is marked available but missing from public/: shown as "Próximamente"`);
    return unavailable;
  }
}
