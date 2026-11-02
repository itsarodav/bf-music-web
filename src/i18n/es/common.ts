// Shared UI: navigation, language switcher, contact, buttons and cards.
// {placeholders} are filled in by t(key, params).
export const common = {
  site: {
    tagline: 'Pianista y compositora',
    description: 'Blanca Ferrer, pianista de jazz y compositora. Escucha "Sokal Affair", su álbum debut.',
    ogImageAlt: 'Blanca Ferrer frente a un naranjo',
  },

  a11y: {
    skipToContent: 'Saltar al contenido',
    newTab: '(se abre en una pestaña nueva)',
    comingSoon: '(próximamente)',
  },

  // Page labels use the route id (nav.<routeId>)
  nav: {
    main: 'Principal',
    mobile: 'Menú móvil',
    homeLabel: '{name}, inicio',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    sitemap: 'Mapa del sitio',
    legal: 'Legal',
    home: 'Inicio',
    bio: 'Bio',
    music: 'Música',
    pressKit: 'Press kit',
    filmScoring: 'Film Scoring',
    contact: 'Contacto',
    terms: 'Términos y condiciones',
    privacy: 'Política de privacidad',
  },

  lang: {
    label: 'Idioma',
    current: 'Idioma: {language}',
  },

  contact: {
    title: 'Contacto',
    social: 'Redes sociales',
  },

  ui: {
    comingSoon: 'Próximamente.',
    copy: 'Copiar texto',
    copied: 'Texto copiado',
    copyFailed: 'No se ha podido copiar el texto',
    watchOnYoutube: 'Ver en YouTube',
    watchTitleOnYoutube: 'Ver «{title}» en YouTube',
    play: 'Reproducir «{title}»',
  },

  release: {
    type: {
      album: 'Álbum',
      ep: 'EP',
      single: 'Single',
    },
    covers: {
      sokalAffair: "Portada del álbum 'Sokal Affair' de Blanca Ferrer",
      helena: "Portada del single 'Helena' de Blanca Ferrer",
    },
    helenaVideo: "Ver el videoclip de 'Helena' en YouTube",
    tracks: 'Canciones de {title}',
    listenTrack: 'Escuchar «{title}» en Spotify, {duration}',
    featuring: 'con {artists}',
  },

  booking: {
    label: 'Contacto de booking: {name}, {agency}',
    email: 'Email',
    phone: 'Teléfono',
    social: '{agency} en redes',
    socialLink: '{agency} en {network}',
  },
};
