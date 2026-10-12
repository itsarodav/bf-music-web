// Latest YouTube Shorts (home "Últimos vídeos" section).
// Read at build time from the channel's public Shorts feed (no API key).
// A Netlify scheduled function rebuilds the site daily, so new Shorts show up
// on their own (see netlify/functions/daily-rebuild.mts).

export const youtubeChannel = {
  handle: '@blancaferrermusic',
  id: 'UCOZ5bQmM4MtlIixWzCssAEQ',
  url: 'https://www.youtube.com/@blancaferrermusic',
  // Opens the channel with the "Subscribe" prompt already showing
  subscribeUrl: 'https://www.youtube.com/@blancaferrermusic?sub_confirmation=1',
};

// YouTube keeps a Shorts-only playlist per channel: "UUSH" + channel id without "UC"
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=UUSH${youtubeChannel.id.slice(2)}`;

export interface Short {
  id: string;
  title: string;
  url: string;
  /** ISO date */
  publishedAt: string;
  thumbnail: { src: string; width: number; height: number };
}

// Last known Shorts, used if the feed can't be reached during a build
const fallback: Pick<Short, 'id' | 'title' | 'publishedAt'>[] = [
  {
    id: 'C2f7Fe3a82c',
    title: 'Descubriendo el fortepiano con Laura Granero 🎹 y su perrita Chufa 🐶',
    publishedAt: '2026-10-11T16:16:39+00:00',
  },
  {
    id: 'vKAaBzen0QY',
    title: 'Esta semana no hizo falta ir al gym 🏃‍♀️ Fugue à la Gigue - J. S. Bach',
    publishedAt: '2026-10-08T22:15:18+00:00',
  },
  {
    id: 'VwveOKMfMS8',
    title: 'En busca de nuevos descubrimientos musicales 💽🤓',
    publishedAt: '2026-10-07T21:43:10+00:00',
  },
];

const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

function decode(text: string) {
  return text.replace(/&(#x?[\da-f]+|\w+);/gi, (match, code: string) => {
    if (code[0] !== '#') return entities[code] ?? match;
    return String.fromCodePoint(code[1] === 'x' ? parseInt(code.slice(2), 16) : Number(code.slice(1)));
  });
}

// Titles are written for the feed, full of emojis; on the web they read as
// noise next to the photo, so they're stripped (the meaning is in the words)
function withoutEmojis(text: string) {
  return text
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Modifier}\p{Regional_Indicator}\u200D\uFE0F\u20E3]/gu, '')
    .replace(/\s+([,.:;!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function pick(xml: string, tag: string) {
  return xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))?.[1] ?? '';
}

// Shorts have a native 9:16 thumbnail (oardefault, 1080×1920). Older videos may
// not, so fall back to the classic 4:3 one (the card crops it to 9:16).
async function thumbnailFor(id: string): Promise<Short['thumbnail']> {
  const vertical = `https://i.ytimg.com/vi/${id}/oardefault.jpg`;
  try {
    const res = await fetch(vertical, { method: 'HEAD' });
    if (res.ok) return { src: vertical, width: 1080, height: 1920 };
  } catch {}
  return { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, width: 480, height: 360 };
}

export async function getLatestShorts(count = 3): Promise<Short[]> {
  let entries = fallback;

  try {
    const res = await fetch(FEED_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();

    const parsed = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => ({
      id: pick(entry, 'yt:videoId'),
      title: decode(pick(entry, 'title')),
      publishedAt: pick(entry, 'published'),
    }));

    if (parsed.length > 0) entries = parsed;
  } catch (error) {
    console.warn(`[shorts] Feed unavailable, using fallback list: ${error}`);
  }

  // The feed is already newest first, but don't rely on it
  const latest = [...entries]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, count);

  return Promise.all(
    latest.map(async (entry) => ({
      ...entry,
      title: withoutEmojis(entry.title),
      url: `https://www.youtube.com/shorts/${entry.id}`,
      thumbnail: await thumbnailFor(entry.id),
    })),
  );
}
