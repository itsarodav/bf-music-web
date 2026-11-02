// Press kit page: every link and file in one place, built per language. The
// copy lives in src/i18n (press.*), so it can be curated and translated
// without touching the components.
import { resolveDownload, type Download } from './downloads';
import { featuredRelease } from './releases';
import { localizePath, useTranslations, type Locale } from '../i18n';
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
// To publish one: put the file in public/press-kit and set available: true.
// Labels come from press.files.<key>.
const files = {
  zip: { file: `${DIR}/BlancaFerrer_PressKit_2026.zip`, format: 'ZIP', available: false },
  dossier: { file: `${DIR}/BlancaFerrer_Dossier_2026.pdf`, format: 'PDF', available: false },
  pressRelease: { file: `${DIR}/BlancaFerrer_NotaDePrensa_2026.pdf`, format: 'PDF', available: false },
  rider: { file: `${DIR}/BlancaFerrer_RiderTecnico_2026.pdf`, format: 'PDF', available: false },
  photosZip: { file: `${DIR}/BlancaFerrer_Fotos_2026.zip`, format: 'ZIP', available: false },
} satisfies Record<string, Omit<Download, 'label'>>;

// Press photos, in grid order (row by row). position: where the square preview
// crop sits. key: its label and alt in press.photos.<key>
const photos = [
  { key: 'concert', image: concierto, position: '50% 35%', file: 'BlancaFerrer_Foto01_Concierto.jpg' },
  { key: 'studio', image: estudio, file: 'BlancaFerrer_Foto03_Estudio.jpg' },
  { key: 'garden', image: jardin, position: '38% 50%', file: 'BlancaFerrer_Foto02_Jardin.jpg' },
  // TODO: only a 1200 × 1600 copy exists, ask for the original
  { key: 'piano', image: piano, file: 'BlancaFerrer_Foto04_Piano.jpg' },
  { key: 'orangeTree', image: naranjo, file: 'BlancaFerrer_Foto06_Naranjo.jpg' },
  { key: 'studioWall', image: estudioPared, position: '78% 50%', file: 'BlancaFerrer_Foto05_EstudioPared.jpg' },
] as const;

// Brand assets: logo files and their formats
const logo = (name: string, formats: string[]) =>
  formats.map((format) => ({ label: format, file: `${DIR}/${name}.${format.toLowerCase()}`, format, available: true }));

export function getPressKit(locale: Locale) {
  const t = useTranslations(locale);
  const resolve = (download: Download) => resolveDownload(download, locale);
  const resolveFile = (key: keyof typeof files) => resolve({ ...files[key], label: t(`press.files.${key}`) });

  const downloads = {
    zip: resolveFile('zip'),
    dossier: resolveFile('dossier'),
    pressRelease: resolveFile('pressRelease'),
    rider: resolveFile('rider'),
    photosZip: resolveFile('photosZip'),
  };

  const pressKit = {
    title: t('press.title'),
    description: t('press.description'),

    // Draft, to confirm with Blanca
    oneLiner: t('press.oneLiner'),

    // Sub-navigation, in page order (ids are the section anchors, the same in every language)
    sections: {
      watch: { id: 'ver-y-escuchar', label: t('press.sections.watch') },
      bio: { id: 'sobre-blanca', label: t('press.sections.bio') },
      photos: { id: 'fotos', label: t('press.sections.photos') },
      brand: { id: 'marca', label: t('press.sections.brand') },
      live: { id: 'en-directo', label: t('press.sections.live') },
    },

    watch: {
      title: t('press.watch.title'),
      // TODO: swap for a full live performance when there's one
      video: {
        youtubeId: '60sEKpCR2T8',
        title: t('press.watch.videoTitle'),
        poster: '/media/helena-loop-poster.webp',
      },
      listen: { label: t('press.watch.listen'), short: 'Spotify', href: featuredRelease.links.spotify },
    },

    bio: {
      title: t('press.bio.title'),
      // Draft (75 words), to confirm with Blanca
      short: t('press.bio.short'),
      full: { label: t('press.bio.full'), href: localizePath('bio', locale) },
    },

    photos: {
      title: t('press.photos.title'),
      items: photos.map(({ key, image, file, ...rest }) => ({
        ...rest,
        image,
        alt: t(`press.photos.${key}.alt`),
        download: resolve({ label: t(`press.photos.${key}.label`), file: `${DIR}/fotos/${file}`, format: 'JPG', available: true }),
      })) as PressPhoto[],
      // Credit (Lemonims) is not shown on the web: it travels in each file's
      // metadata (scripts/build-press-kit-assets.mjs) and goes in the ZIP/dossier
      downloadAll: downloads.photosZip,
    },

    brand: {
      title: t('press.brand.title'),
      items: [
        {
          title: t('press.brand.wordmark'),
          variant: t('press.brand.black'),
          preview: { src: `${DIR}/BlancaFerrer_Wordmark_Negro.svg`, tone: 'light' as const, fit: 'wide' as const },
          files: logo('BlancaFerrer_Wordmark_Negro', ['SVG', 'PNG']).map(resolve),
        },
        {
          title: t('press.brand.wordmark'),
          variant: t('press.brand.white'),
          preview: { src: `${DIR}/BlancaFerrer_Wordmark_Blanco.svg`, tone: 'dark' as const, fit: 'wide' as const },
          files: logo('BlancaFerrer_Wordmark_Blanco', ['SVG', 'PNG']).map(resolve),
        },
        {
          title: t('press.brand.isotype'),
          variant: t('press.brand.black'),
          preview: { src: `${DIR}/BlancaFerrer_Isotipo_Negro.svg`, tone: 'light' as const, fit: 'square' as const },
          files: logo('BlancaFerrer_Isotipo_Negro', ['SVG', 'PNG']).map(resolve),
        },
        {
          title: t('press.brand.cover'),
          variant: 'Sokal Affair, 3000 px',
          preview: { image: albumCover, alt: t('release.covers.sokalAffair') },
          files: logo('BlancaFerrer_SokalAffair_Portada_3000', ['JPG']).map(resolve),
        },
      ],
    },

    live: {
      title: t('press.live.title'),
      // Draft, to confirm with Blanca
      text: t('press.live.text'),
      // Sentence after the text, with the link inside
      repertoire: { before: t('press.live.repertoireBefore'), label: t('press.live.repertoireLink'), href: localizePath('music', locale) },
    },

    contact: {
      status: t('press.contact.status'),
      ticker: t('press.contact.ticker'),
    },
  };

  return { pressKit, downloads };
}
