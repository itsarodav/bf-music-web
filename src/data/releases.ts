import sokalAffairCover from '../assets/images/album-sokal-affair.jpg';
import helenaCover from '../assets/images/single-helena.jpg';

export interface Track {
  title: string;
  /** In milliseconds, as Spotify gives it */
  durationMs: number;
  /** The track on Spotify (the whole row links to it) */
  spotify: string;
  /** Guest artists, shown under the title */
  featuring?: string[];
}

export interface Release {
  /** Key of its translated texts (release.covers.<id>) */
  id: 'sokalAffair' | 'helena';
  title: string;
  /** Label in release.type.<type> */
  type: 'album' | 'ep' | 'single';
  /** ISO date (YYYY-MM-DD) */
  releaseDate: string;
  cover: ImageMetadata;
  links: {
    spotify: string;
    appleMusic: string;
  };
  /** Only listed when there's more than one */
  tracks: Track[];
}

const sokalAffair: Release = {
  id: 'sokalAffair',
  title: 'Sokal Affair',
  type: 'album',
  releaseDate: '2026-09-25',
  cover: sokalAffairCover,
  links: {
    spotify: 'https://open.spotify.com/album/5wszrDGx7PaO2oP6UdGkJK',
    appleMusic: 'https://music.apple.com/es/album/sokal-affair-ep/6801011911',
  },
  tracks: [
    { title: 'Helena', durationMs: 245473, spotify: 'https://open.spotify.com/track/38YqQiidGSGZDeeOiAUSsU' },
    { title: 'Performing Gravity', durationMs: 155720, spotify: 'https://open.spotify.com/track/1xbiUcRIBQ7iCIKroERbbG' },
    { title: 'Falling Alice', durationMs: 266915, spotify: 'https://open.spotify.com/track/7ajiRPER1c4zuryVQf3S8h' },
    {
      title: 'Hey, Pippi Langstrumpf!',
      durationMs: 266736,
      spotify: 'https://open.spotify.com/track/4pFTUBWr9vpI9m5x7ww4OX',
      featuring: ['Latino Blanco'],
    },
    { title: 'Covert Operations', durationMs: 140298, spotify: 'https://open.spotify.com/track/6gaAac4xdkDsVHmZCZwaNy' },
  ],
};

const helena: Release = {
  id: 'helena',
  title: 'Helena',
  type: 'single',
  releaseDate: '2026-05-22',
  cover: helenaCover,
  links: {
    spotify: 'https://open.spotify.com/album/1ysr8oRpRDlr0tuJIJ78jW',
    appleMusic: 'https://music.apple.com/es/album/helena-single/6766793791',
  },
  tracks: [{ title: 'Helena', durationMs: 245473, spotify: 'https://open.spotify.com/track/5axGcwG9pXy5jPDGmBsDVH' }],
};

// Música page, newest first
export const releases: Release[] = [sokalAffair, helena];

// Release featured in the home hero card (its text: home.card)
export const featuredRelease = {
  id: sokalAffair.id,
  cover: sokalAffair.cover,
  links: {
    spotify: sokalAffair.links.spotify,
    youtube: 'https://www.youtube.com/watch?v=60sEKpCR2T8',
  },
};
