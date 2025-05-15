export const TOKEN = "733a7307cd0dd55c139f57fcaa9269d3686C2000651F8B1F06E56BFFCFC37C2656113BC6";
export const CDN = "https://hst-api.wialon.com";

/* configuracion de sensores y parametros necesarios para  */
export const params = {
        combustible: {
            "GAFI 679 GAS":{
                name: 'Combustible Total',
                type: 'fuel level',
                id: 9,
            },            
            "GAFI 679 OBD":{
                name: 'Combustible Total',
                type: 'fuel level',
                id: 2,
            },            
            "GAFI - 516":{
                name: 'Combustible Total',
                type: 'fuel level',
                id: 9,
            },            
        },
        combustible_usado: {
            "GAFI - 516":{
                name: 'Combustible Total',
                type: 'fuel level',
                id: 9,
            }, 
        },

    odometer: ['odometer']
}

/* Configuraciones del componente Navbar */
export const Navbar = {
    brand: 'Rendimiento de combustible Gafi',
    img_brand: './src/img/' + 'logogafi.jpeg', /* brand principal */
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
 * KM RECORRIDOS  - ODOMETRO
 * LITROS CONSUMIDOS - TANQUES
 * Tiempos
 * velocidad
 */

/**
 * USUARIO: DEVCUENTADEMO
 * CONTRASEÑA: Devcdemo-2024
 */