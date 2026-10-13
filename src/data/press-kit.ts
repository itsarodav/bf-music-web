// Press kit page: every text, link and file in one place, so copy can be
// curated (and translated later) without touching the components.
// Texts in [BRACKETS] are placeholders still to be written with Blanca.
import { resolveDownload, type Download } from './downloads';
import { featuredRelease } from './releases';
import type { PressPhoto } from '../components/media/PressPhotoGrid.astro';

import concierto from '../assets/images/press/concierto.jpg';
import jardin from '../assets/images/press/jardin.jpg';
import estudio from '../assets/images/press/estudio.jpg';
import piano from '../assets/images/press/piano.jpg';
import estudioPared from '../assets/images/press/estudio-pared.jpg';
import naranjo from '../assets/images/press/naranjo.jpg';
import albumCover from '../assets/images/album-sokal-affair.jpg';

const DIR = '/press-kit';

// ---------- Files ----------
// To publish one: put the file in public/press-kit and set available: true
const files = {
  zip: { label: 'Press kit completo', file: `${DIR}/BlancaFerrer_PressKit_2026.zip`, format: 'ZIP', available: false },
  dossier: { label: 'Dossier', file: `${DIR}/BlancaFerrer_Dossier_2026.pdf`, format: 'PDF', available: false },
  pressRelease: { label: 'Nota de prensa', file: `${DIR}/BlancaFerrer_NotaDePrensa_2026.pdf`, format: 'PDF', available: false },
  rider: { label: 'Rider técnico', file: `${DIR}/BlancaFerrer_RiderTecnico_2026.pdf`, format: 'PDF', available: false },
  photosZip: { label: 'Descargar todas las fotos', file: `${DIR}/BlancaFerrer_Fotos_2026.zip`, format: 'ZIP', available: false },
} satisfies Record<string, Download>;

export const downloads = {
  zip: resolveDownload(files.zip),
  dossier: resolveDownload(files.dossier),
  pressRelease: resolveDownload(files.pressRelease),
  rider: resolveDownload(files.rider),
  photosZip: resolveDownload(files.photosZip),
};

// ---------- Page ----------
export const pressKit = {
  description:
    'Press kit de Blanca Ferrer, pianista de jazz y compositora: bio, fotos en alta, logotipos, rider técnico y contacto de booking.',

  // Draft, to confirm with Blanca
  oneLiner:
    'Pianista y compositora que cruza la tradición clásica y el jazz contemporáneo en Sokal Affair, su álbum debut.',

  // Sub-navigation, in page order (ids are the section anchors)
  sections: [
    { id: 'ver-y-escuchar', label: 'Ver y escuchar' },
    { id: 'sobre-blanca', label: 'Sobre Blanca' },
    { id: 'fotos', label: 'Fotos' },
    { id: 'marca', label: 'Marca' },
    { id: 'en-directo', label: 'En directo' },
  ],

  watch: {
    title: 'Ver y escuchar',
    // TODO: swap for a full live performance when there's one
    video: {
      youtubeId: '60sEKpCR2T8',
      title: 'Helena, videoclip oficial',
      poster: '/media/helena-loop-poster.webp',
    },
    listen: { label: 'Escuchar en Spotify', short: 'Spotify', href: featuredRelease.links.spotify },
  },

  bio: {
    title: 'Sobre Blanca',
    // Draft (75 words), to confirm with Blanca
    short:
      'Blanca Ferrer es pianista y compositora. Formada en piano clásico, se adentra en el jazz y la música moderna hasta graduarse en el Conservatorio Superior del Liceu de Barcelona. Su interés por el órgano y el clave enriquece un lenguaje compositivo donde tradición y frescura dialogan con naturalidad. Reconocida en el concurso de composición FeminaJazz (Madrid, 2021), presenta Sokal Affair, su álbum debut, con el que se consolida como una voz propia del panorama actual.',
    full: { label: 'Bio completa', href: '/bio' },
  },

  photos: {
    title: 'Fotos de prensa',
    // Grid order, row by row. position: where the square preview crop sits
    items: [
      {
        image: concierto,
        position: '50% 35%',
        alt: 'Blanca Ferrer sentada en el escenario junto a un arpa, durante un concierto',
        download: resolveDownload({ label: 'Concierto', file: `${DIR}/fotos/BlancaFerrer_Foto01_Concierto.jpg`, format: 'JPG', available: true }),
      },
      {
        image: estudio,
        alt: 'Blanca Ferrer sonríe sentada en un estudio de grabación',
        download: resolveDownload({ label: 'Estudio', file: `${DIR}/fotos/BlancaFerrer_Foto03_Estudio.jpg`, format: 'JPG', available: true }),
      },
      {
        image: jardin,
        position: '38% 50%',
        alt: 'Blanca Ferrer sonríe en un jardín, bajo un limonero',
        download: resolveDownload({ label: 'Jardín', file: `${DIR}/fotos/BlancaFerrer_Foto02_Jardin.jpg`, format: 'JPG', available: true }),
      },
      {
        image: piano,
        alt: 'Blanca Ferrer toca el piano en casa',
        // TODO: only a 1200 × 1600 copy exists, ask for the original
        download: resolveDownload({ label: 'Piano', file: `${DIR}/fotos/BlancaFerrer_Foto04_Piano.jpg`, format: 'JPG', available: true }),
      },
      {
        image: naranjo,
        alt: 'Blanca Ferrer mira hacia arriba frente a un naranjo',
        download: resolveDownload({ label: 'Naranjo', file: `${DIR}/fotos/BlancaFerrer_Foto06_Naranjo.jpg`, format: 'JPG', available: true }),
      },
      {
        image: estudioPared,
        position: '78% 50%',
        alt: 'Blanca Ferrer aplaude en un estudio de grabación',
        download: resolveDownload({ label: 'Estudio, pared', file: `${DIR}/fotos/BlancaFerrer_Foto05_EstudioPared.jpg`, format: 'JPG', available: true }),
      },
    ] as PressPhoto[],
    // Credit (Lemonims) is not shown on the web: it travels in each file's
    // metadata (scripts/build-press-kit-assets.mjs) and goes in the ZIP/dossier
    downloadAll: resolveDownload(files.photosZip),
  },

  brand: {
    title: 'Marca',
    items: [
      {
        title: 'Logo completo',
        variant: 'Negro',
        preview: { src: `${DIR}/BlancaFerrer_Wordmark_Negro.svg`, tone: 'light' as const, fit: 'wide' as const },
        files: [
          resolveDownload({ label: 'SVG', file: `${DIR}/BlancaFerrer_Wordmark_Negro.svg`, format: 'SVG', available: true }),
          resolveDownload({ label: 'PNG', file: `${DIR}/BlancaFerrer_Wordmark_Negro.png`, format: 'PNG', available: true }),
        ],
      },
      {
        title: 'Logo completo',
        variant: 'Blanco',
        preview: { src: `${DIR}/BlancaFerrer_Wordmark_Blanco.svg`, tone: 'dark' as const, fit: 'wide' as const },
        files: [
          resolveDownload({ label: 'SVG', file: `${DIR}/BlancaFerrer_Wordmark_Blanco.svg`, format: 'SVG', available: true }),
          resolveDownload({ label: 'PNG', file: `${DIR}/BlancaFerrer_Wordmark_Blanco.png`, format: 'PNG', available: true }),
        ],
      },
      {
        title: 'Isotipo',
        variant: 'Negro',
        preview: { src: `${DIR}/BlancaFerrer_Isotipo_Negro.svg`, tone: 'light' as const, fit: 'square' as const },
        files: [
          resolveDownload({ label: 'SVG', file: `${DIR}/BlancaFerrer_Isotipo_Negro.svg`, format: 'SVG', available: true }),
          resolveDownload({ label: 'PNG', file: `${DIR}/BlancaFerrer_Isotipo_Negro.png`, format: 'PNG', available: true }),
        ],
      },
      {
        title: 'Portada',
        variant: 'Sokal Affair, 3000 px',
        preview: { image: albumCover, alt: "Portada del álbum 'Sokal Affair' de Blanca Ferrer" },
        files: [
          resolveDownload({ label: 'JPG', file: `${DIR}/BlancaFerrer_SokalAffair_Portada_3000.jpg`, format: 'JPG', available: true }),
        ],
      },
    ],
  },

  live: {
    title: 'En directo',
    // Draft, to confirm with Blanca
    text: 'Un proyecto propio de Blanca Ferrer que sube al escenario en formato trío.',
    // Sentence after the text, with the link inside
    repertoire: { before: 'Descubre su', label: 'música y repertorio', href: '/musica' },
  },

  contact: {
    status: 'Booking abierto',
    ticker: 'Sello discográfico, booking y management',
  },
};
