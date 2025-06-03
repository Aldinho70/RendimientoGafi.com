export const TOKEN = "fa54a97c1348167613707146e3ce1c2163C874116C8222C592D6EF7CB721C8F09EB9A4C9";
export const CDN = "https://hst-api.wialon.com";

/* configuracion de sensores y parametros necesarios para  */
export const params = {
    combustible: {
        "TFS - 109": {
            name: 'Combustible Total',
            type: 'fuel level',
            id: 34,
        },
        "TFS - 26": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 34,
        },
        "TFS - 31": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 28,
        },
        "TFS - 47": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 28,
        },
        "TFS - 49": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 28,
        },
        "TFS - 108": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 28,
        },
        "TFS - 109": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 34,
        },
        "TFS - 24": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 9,
        },
        "TFS - 25": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 8,
        },
        "TFS - 104": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 10,
        },
        "TFS - 105": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 10,
        },
        "TFS - 106": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 10,
        },
        "TFS - 107": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 10,
        },
        "TFS - 110": {
            name: 'COMBUSTIBLE TOTAL',
            type: 'fuel level',
            id: 2,
        }
    },
    combustible_usado: {
        "TFS - 109": {
            name: 'Combustible utilizado',
            id: 27,
        },
    },

    odometer: ['odometer']
}

/* Configuraciones del componente Navbar */
export const Navbar = {
    brand: 'Rendimiento de combustible Ticsa-Trafusa',
    img_brand: './src/img/' + 'TicsaTrafusa_logo.png', /* brand principal */
    img_brand_2: './src/img/' + 'logojd.png',/* brand secundario */
    items: [
        { label: 'Dashboard', icon: 'fas fa-tachometer-alt', to: '/dashboard' },
        { label: 'Unidades', icon: 'fas fa-car-side', to: '/units' },
        { label: 'Mensajes', icon: 'fas fa-envelope', to: '/messages' },
        { label: 'Ajustes', icon: 'fas fa-cog', to: '/settings' },
    ],
}

/* Configuraciones del componente Main */
export const Main = {
    class_bootstrap: 'primary' /* color de algunos componentes(buttons, label, background, etc) */
}

/* Configuraciones del componente Footer */
export const Footer = {
    copyright: 'Diseñado por JMBobadilla 2025 para uso exclusivo de Jornada Digital. Todos los derechos reservados.',
    links: [
        { label: 'Acerca de', to: '/about' },
        { label: 'Términos y condiciones', to: '/terms' },
        { label: 'Política de privacidad', to: '/privacy' },
    ],
}

/**
 * USUARIO: DASHCOMB TRAFUSA
 * CONTRASEÑA: Dash-2025
 */