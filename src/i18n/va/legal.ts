// Valencià (norma AVL). Draft, to review before publishing.
export const legal = {
  lastUpdated: 'Última actualització: {date}',

  terms: {
    title: 'Termes i condicions',
    description: 'Termes i condicions d’ús del web de Blanca Ferrer.',
    sections: {
      owner: {
        title: '1. Titular del web',
        body: '<p>Este web ({domain}) és titularitat de <strong>{owner}</strong>. La seua gestió i representació corresponen a <strong>{manager}</strong>, segell discogràfic i agència de management de l’artista.</p><p>Per a qualsevol consulta pots escriure a <a href="mailto:{email}">{email}</a>.</p>',
      },
      purpose: {
        title: '2. Objecte',
        body: '<p>El web oferix informació sobre l’activitat artística de {owner}: la seua música, biografia, projectes, materials de premsa i vies de contacte professional. En navegar-hi acceptes estes condicions.</p>',
      },
      ip: {
        title: '3. Propietat intel·lectual',
        body: '<p>La música, les imatges, els textos, els logotips i el disseny d’este web pertanyen a {owner}, a {manager} o als seus respectius autors. No està permés reproduir-los, distribuir-los ni modificar-los sense autorització prèvia, excepte per a ús personal i privat.</p><p>Els mitjans de comunicació poden usar els materials del press kit per a informar sobre l’artista, sempre que en citen la procedència.</p>',
      },
      links: {
        title: '4. Enllaços externs',
        body: '<p>El web inclou enllaços a plataformes de tercers com Spotify, YouTube, Instagram o TikTok. No en controlem els continguts ni en som responsables; quan les visites s’hi apliquen les seues pròpies condicions i polítiques de privacitat.</p>',
      },
      liability: {
        title: '5. Responsabilitat',
        body: '<p>Intentem que la informació publicada siga correcta i estiga actualitzada, però pot contindre errors o canviar sense avís previ (per exemple, dates de concerts o llançaments). No ens fem responsables dels danys derivats de l’ús del web.</p>',
      },
      changes: {
        title: '6. Canvis',
        body: '<p>Podem actualitzar estos termes en qualsevol moment. La data de l’última actualització apareix al principi d’esta pàgina.</p>',
      },
      law: {
        title: '7. Legislació aplicable',
        body: '<p>Estes condicions es regixen per la legislació espanyola.</p>',
      },
    },
  },

  privacy: {
    title: 'Política de privacitat',
    description: 'Com es tracten les dades personals en el web de Blanca Ferrer.',
    sections: {
      controller: {
        title: '1. Responsable',
        body: '<p>La responsable del tractament de les teues dades és <strong>{owner}</strong>, representada per <strong>{manager}</strong>, el seu segell i agència de management. Pots contactar amb nosaltres en <a href="mailto:{email}">{email}</a>.</p>',
      },
      data: {
        title: '2. Quines dades tractem i per a què',
        body: '<p>Este web no té formularis ni zona de registre. Només tractem dades personals en estos casos:</p><ul><li><strong>Si ens escrius per correu electrònic:</strong> el teu nom, la teua adreça de correu i el que inclogues en el missatge, per a respondre la teua consulta (booking, premsa, col·laboracions…). Les conservem mentres dure la conversa o la relació professional.</li><li><strong>Analítica, només si l’acceptes:</strong> dades d’ús del web (pàgines visitades, clics, desplaçament, tipus de dispositiu i ubicació aproximada) per a entendre com s’usa i millorar-lo. Consulta l’apartat 3.</li></ul><p>La base legal és el teu consentiment. Mai venem les teues dades ni les usem per a enviar-te publicitat.</p>',
      },
      cookies: {
        title: '3. Galetes i analítica',
        body: '<p>El web no usa galetes pròpies. Si acceptes les galetes d’analítica, utilitzem <strong>Microsoft Clarity</strong>, que instal·la galetes per a mesurar l’ús del web i generar mapes de calor i gravacions anònimes de la navegació. Clarity oculta per defecte les dades que escrius en la pàgina.</p><p>Microsoft actua com a proveïdor del servei i pot tractar les dades als Estats Units, amb les garanties del Marc de Privacitat de Dades UE-EUA. Més informació en la <a href="https://privacy.microsoft.com/ca-es/privacystatement" target="_blank" rel="noopener noreferrer">política de privacitat de Microsoft</a>.</p><p>Pots retirar el teu consentiment en qualsevol moment esborrant les galetes del teu navegador.</p>',
      },
      thirdParties: {
        title: '4. Servicis de tercers',
        body: '<ul><li><strong>Google Fonts:</strong> les tipografies del web es carreguen des de servidors de Google, que reben la teua adreça IP per a poder enviar-les.</li><li><strong>Plataformes externes:</strong> quan seguixes un enllaç a Spotify, YouTube, Instagram o TikTok ixes d’este web i s’aplica la política de privacitat de cada plataforma.</li></ul>',
      },
      rights: {
        title: '5. Els teus drets',
        body: '<p>Pots demanar l’accés, la rectificació o la supressió de les teues dades, així com oposar-te al seu tractament, limitar-lo o sol·licitar-ne la portabilitat, escrivint a <a href="mailto:{email}">{email}</a>. Si creus que no hem atés bé la teua sol·licitud, pots reclamar davant de l’<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">Agència Espanyola de Protecció de Dades</a>.</p>',
      },
      changes: {
        title: '6. Canvis',
        body: '<p>Podem actualitzar esta política, per exemple si afegim nous servicis. La data de l’última actualització apareix al principi d’esta pàgina.</p>',
      },
    },
  },
};
