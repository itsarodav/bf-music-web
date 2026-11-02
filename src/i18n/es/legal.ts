// Legal pages. Each section body is HTML (paragraphs, lists, links), with
// {owner}, {manager}, {email} and {domain} filled in from data/site (legal).
export const legal = {
  lastUpdated: 'Última actualización: {date}',

  terms: {
    title: 'Términos y condiciones',
    description: 'Términos y condiciones de uso de la web de Blanca Ferrer.',
    sections: {
      owner: {
        title: '1. Titular de la web',
        body: '<p>Esta web ({domain}) es titularidad de <strong>{owner}</strong>. Su gestión y representación corresponden a <strong>{manager}</strong>, sello discográfico y agencia de management de la artista.</p><p>Para cualquier consulta puedes escribir a <a href="mailto:{email}">{email}</a>.</p>',
      },
      purpose: {
        title: '2. Objeto',
        body: '<p>La web ofrece información sobre la actividad artística de {owner}: su música, biografía, proyectos, materiales de prensa y vías de contacto profesional. Al navegar por ella aceptas estas condiciones.</p>',
      },
      ip: {
        title: '3. Propiedad intelectual',
        body: '<p>La música, las imágenes, los textos, los logotipos y el diseño de esta web pertenecen a {owner}, a {manager} o a sus respectivos autores. No está permitido reproducirlos, distribuirlos ni modificarlos sin autorización previa, salvo para uso personal y privado.</p><p>Los medios de comunicación pueden usar los materiales del press kit para informar sobre la artista, citando su procedencia.</p>',
      },
      links: {
        title: '4. Enlaces externos',
        body: '<p>La web incluye enlaces a plataformas de terceros como Spotify, YouTube, Instagram o TikTok. No controlamos sus contenidos ni somos responsables de ellos; al visitarlas se aplican sus propias condiciones y políticas de privacidad.</p>',
      },
      liability: {
        title: '5. Responsabilidad',
        body: '<p>Intentamos que la información publicada sea correcta y esté actualizada, pero puede contener errores o cambiar sin previo aviso (por ejemplo, fechas de conciertos o lanzamientos). No nos hacemos responsables de los daños derivados del uso de la web.</p>',
      },
      changes: {
        title: '6. Cambios',
        body: '<p>Podemos actualizar estos términos en cualquier momento. La fecha de la última actualización aparece al principio de esta página.</p>',
      },
      law: {
        title: '7. Legislación aplicable',
        body: '<p>Estas condiciones se rigen por la legislación española.</p>',
      },
    },
  },

  privacy: {
    title: 'Política de privacidad',
    description: 'Cómo se tratan los datos personales en la web de Blanca Ferrer.',
    sections: {
      controller: {
        title: '1. Responsable',
        body: '<p>La responsable del tratamiento de tus datos es <strong>{owner}</strong>, representada por <strong>{manager}</strong>, su sello y agencia de management. Puedes contactar con nosotros en <a href="mailto:{email}">{email}</a>.</p>',
      },
      data: {
        title: '2. Qué datos tratamos y para qué',
        body: '<p>Esta web no tiene formularios ni zona de registro. Solo tratamos datos personales en estos casos:</p><ul><li><strong>Si nos escribes por email:</strong> tu nombre, tu dirección de correo y lo que incluyas en el mensaje, para responder a tu consulta (booking, prensa, colaboraciones…). Los conservamos mientras dure la conversación o la relación profesional.</li><li><strong>Analítica, solo si la aceptas:</strong> datos de uso de la web (páginas visitadas, clics, scroll, tipo de dispositivo y ubicación aproximada) para entender cómo se usa y mejorarla. Ver el apartado 3.</li></ul><p>La base legal es tu consentimiento. Nunca vendemos tus datos ni los usamos para enviarte publicidad.</p>',
      },
      cookies: {
        title: '3. Cookies y analítica',
        body: '<p>La web no usa cookies propias. Si aceptas las cookies de analítica, utilizamos <strong>Microsoft Clarity</strong>, que instala cookies para medir el uso de la web y generar mapas de calor y grabaciones anónimas de la navegación. Clarity oculta por defecto los datos que escribes en la página.</p><p>Microsoft actúa como proveedor del servicio y puede tratar los datos en Estados Unidos, con las garantías del Marco de Privacidad de Datos UE-EE. UU. Más información en la <a href="https://privacy.microsoft.com/es-es/privacystatement" target="_blank" rel="noopener noreferrer">política de privacidad de Microsoft</a>.</p><p>Puedes retirar tu consentimiento en cualquier momento borrando las cookies de tu navegador.</p>',
      },
      thirdParties: {
        title: '4. Servicios de terceros',
        body: '<ul><li><strong>Google Fonts:</strong> las tipografías de la web se cargan desde servidores de Google, que reciben tu dirección IP para poder enviarlas.</li><li><strong>Plataformas externas:</strong> al seguir un enlace a Spotify, YouTube, Instagram o TikTok sales de esta web y se aplica la política de privacidad de cada plataforma.</li></ul>',
      },
      rights: {
        title: '5. Tus derechos',
        body: '<p>Puedes pedir el acceso, la rectificación o la supresión de tus datos, así como oponerte a su tratamiento, limitarlo o solicitar su portabilidad, escribiendo a <a href="mailto:{email}">{email}</a>. Si crees que no hemos atendido bien tu solicitud, puedes reclamar ante la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">Agencia Española de Protección de Datos</a>.</p>',
      },
      changes: {
        title: '6. Cambios',
        body: '<p>Podemos actualizar esta política, por ejemplo si añadimos nuevos servicios. La fecha de la última actualización aparece al principio de esta página.</p>',
      },
    },
  },
};
