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
  title: string;
  type: 'Álbum' | 'EP' | 'Single';
  /** ISO date (YYYY-MM-DD) */
  releaseDate: string;
  cover: ImageMetadata;
  coverAlt: string;
  links: {
    spotify: string;
    appleMusic: string;
  };
  /** Only listed when there's more than one */
  tracks: Track[];
}

const sokalAffair: Release = {
  title: 'Sokal Affair',
  type: 'Álbum',
  releaseDate: '2026-09-25',
  cover: sokalAffairCover,
  coverAlt: "Portada del álbum 'Sokal Affair' de Blanca Ferrer",
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
      featuring: ['Miquel Álvarez', 'Quique Ramirez', 'Latino Blanco'],
    },
    { title: 'Covert Operations', durationMs: 140298, spotify: 'https://open.spotify.com/track/6gaAac4xdkDsVHmZCZwaNy' },
  ],
};

const helena: Release = {
  title: 'Helena',
  type: 'Single',
  releaseDate: '2026-05-22',
  cover: helenaCover,
  coverAlt: "Portada del single 'Helena' de Blanca Ferrer",
  links: {
    spotify: 'https://open.spotify.com/album/1ysr8oRpRDlr0tuJIJ78jW',
    appleMusic: 'https://music.apple.com/es/album/helena-single/6766793791',
  },
  tracks: [{ title: 'Helena', durationMs: 245473, spotify: 'https://open.spotify.com/track/5axGcwG9pXy5jPDGmBsDVH' }],
};

// Música page, newest first
export const releases: Release[] = [sokalAffair, helena];

// Release featured in the home hero card
export const featuredRelease = {
  cover: sokalAffair.cover,
  coverAlt: "Portada del álbum 'Sokal Affair' de Blanca Ferrer",
  text: "Escucha 'Sokal Affair', el álbum debut. ¡Ya disponible en todas las plataformas!",
  textShort: "Escucha 'Sokal Affair', el álbum debut. ¡Ya disponible!",
  links: {
    spotify: sokalAffair.links.spotify,
    youtube: 'https://www.youtube.com/watch?v=60sEKpCR2T8',
  },
};
