export const MONTHS = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
] as const;

export const CHART_CONFIG = {
    barRadius: 6,
    barColor: '#3b82f6', // blue-500
    barHoverColor: '#2563eb', // blue-600
    height: 300,
    margin: {
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
    },
} as const;

export const ANIMATION_CONFIG = {
    duration: 800,
    easing: 'ease-out',
} as const;

export const RESPONSIVE_CONFIG = {
    breakpoints: {
        mobile: 640,
        tablet: 768,
        desktop: 1024,
    },
} as const;
