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

    // Features Section
    'features.header': 'Built on Bitcoin principles',
    'features.subheader': 'Every feature designed for sovereignty and simplicity',
    'features.phoenixd.title': 'Integrated Phoenixd Node',
    'features.phoenixd.description': "Runs ACINQ's phoenixd Lightning node natively. Manage your own channels, handle your own liquidity, full node sovereignty.",
    'features.custody.title': 'Self-Custodial by Design',
    'features.custody.description': "Your private keys never leave your device. Non-custodial architecture means you're always in complete control of your funds.",
    'features.instant.title': 'Instant Payments, Zero Waiting',
    'features.instant.description': 'Accept Lightning payments in seconds. No confirmation delays, no chargebacks, no intermediaries taking a cut.',
    'features.free.title': 'Free Forever, No Surprises',
    'features.free.description': 'Download once, use forever. No monthly fees, no transaction limits, no premium tiers. Open Source means truly free.',
    'features.setup.title': 'Running in Under 5 Minutes',
    'features.setup.description': 'Zero configuration required. Download, install, and start accepting bitcoin. Your phoenixd node handles everything automatically.',
    'features.opensource.title': 'Fully Open Source',
    'features.opensource.description': 'MIT licensed, auditable codebase. Fork it, modify it, verify it. Community-driven development with full transparency.',

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

    // Features Section
    'features.header': 'Construido sobre principios Bitcoin',
    'features.subheader': 'Cada característica diseñada para soberanía y simplicidad',
    'features.phoenixd.title': 'Nodo Phoenixd Integrado',
    'features.phoenixd.description': 'Ejecuta el nodo Lightning phoenixd de ACINQ nativamente. Gestiona tus propios canales, maneja tu propia liquidez, soberanía total del nodo.',
    'features.custody.title': 'Auto-Custodia por Diseño',
    'features.custody.description': 'Tus llaves privadas nunca salen de tu dispositivo. Arquitectura no custodial significa que siempre tienes control completo de tus fondos.',
    'features.instant.title': 'Pagos Instantáneos, Cero Esperas',
    'features.instant.description': 'Acepta pagos Lightning en segundos. Sin esperas de confirmación, sin contracargos, sin intermediarios cobrando comisiones.',
    'features.free.title': 'Gratis para Siempre, Sin Sorpresas',
    'features.free.description': 'Descarga una vez, usa para siempre. Sin cuotas mensuales, sin límites de transacciones, sin planes premium. Open Source significa verdaderamente gratis.',
    'features.setup.title': 'Funcionando en Menos de 5 Minutos',
    'features.setup.description': 'Cero configuración requerida. Descarga, instala y comienza a aceptar bitcoin. Tu nodo phoenixd maneja todo automáticamente.',
    'features.opensource.title': 'Completamente Open Source',
    'features.opensource.description': 'Licencia MIT, código auditable. Bifúrcalo, modifícalo, verifícalo. Desarrollo impulsado por la comunidad con transparencia total.',

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
