export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.why': 'Why Ambrosia',
    'nav.how': 'How it Works',
    'nav.opensource': 'Open Source',
    'nav.download': 'Download',

    // Hero
    'hero.eyebrow': 'For stores that understand Bitcoin',
    'hero.headline': 'Open Source. Free. Sovereign.',
    'hero.subheadline': 'Accept Lightning payments with your own Phoenixd node. No middlemen, no custody, no compromises.',
    'hero.cta.download': 'Download',
    'hero.cta.github': 'View on GitHub',
    'hero.trust': 'Setup in under 5 minutes • No KYC • No subscriptions',

    // Feature Badges
    'hero.badge.node': 'Your Node',
    'hero.badge.lightning': 'Lightning Channels',
    'hero.badge.opensource': '100% Open Source',
    'hero.badge.free': 'Free Forever',

    // Footer
    'footer.tagline': 'Open source point of sale for Bitcoin Lightning payments.',
    'footer.product': 'Product',
    'footer.resources': 'Resources',
    'footer.community': 'Community',
    'footer.docs': 'Documentation',
    'footer.releases': 'Releases',
    'footer.discussions': 'Discussions',
    'footer.issues': 'Report Issues',
    'footer.rights': 'All rights reserved.',
    'footer.license': 'Released under MIT License.',

    // Meta
    'meta.title': 'Ambrosia - Accept Bitcoin Lightning Payments',
    'meta.description': 'Open source point of sale for Bitcoin Lightning. Run your own Phoenixd node. No custody, no KYC, no subscriptions.',
  },
  es: {
    // Navigation
    'nav.features': 'Características',
    'nav.why': 'Por qué Ambrosia',
    'nav.how': 'Cómo funciona',
    'nav.opensource': 'Open Source',
    'nav.download': 'Descargar',

    // Hero
    'hero.eyebrow': 'Para tiendas que entienden Bitcoin',
    'hero.headline': 'Open Source. Gratuito. Soberano.',
    'hero.subheadline': 'Acepta pagos Lightning con tu propio nodo Phoenixd. Sin intermediarios, sin custodia, sin compromisos.',
    'hero.cta.download': 'Descargar',
    'hero.cta.github': 'Ver en GitHub',
    'hero.trust': 'Configura en menos de 5 minutos • Sin KYC • Sin suscripciones',

    // Feature Badges
    'hero.badge.node': 'Tu Nodo',
    'hero.badge.lightning': 'Canales Lightning',
    'hero.badge.opensource': '100% Open Source',
    'hero.badge.free': 'Gratis para siempre',

    // Footer
    'footer.tagline': 'Punto de venta open source para pagos Bitcoin Lightning.',
    'footer.product': 'Producto',
    'footer.resources': 'Recursos',
    'footer.community': 'Comunidad',
    'footer.docs': 'Documentación',
    'footer.releases': 'Versiones',
    'footer.discussions': 'Discusiones',
    'footer.issues': 'Reportar Problemas',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.license': 'Publicado bajo Licencia MIT.',

    // Meta
    'meta.title': 'Ambrosia - Acepta Pagos Bitcoin Lightning',
    'meta.description': 'Punto de venta open source para Bitcoin Lightning. Corre tu propio nodo Phoenixd. Sin custodia, sin KYC, sin suscripciones.',
  },
} as const;

export type Lang = keyof typeof ui;
export type TranslationKey = keyof typeof ui.en;
