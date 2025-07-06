export const WORK_TYPES = [
    { value: 'RESIDENCIAL_UNIFAMILIAR', label: 'Residencial Unifamiliar' },
    { value: 'RESIDENCIAL_MULTIFAMILIAR', label: 'Residencial Multifamiliar' },
    { value: 'COMERCIAL', label: 'Comercial' },
    { value: 'MISTO', label: 'Misto' },
] as const;

export const WORK_TYPE_DESCRIPTIONS = {
    RESIDENCIAL_UNIFAMILIAR: 'Casa individual ou sobrado para uma família',
    RESIDENCIAL_MULTIFAMILIAR:
        'Edifício ou condomínio com múltiplas unidades habitacionais',
    COMERCIAL: 'Estabelecimentos comerciais, escritórios ou lojas',
    MISTO: 'Combinação de uso residencial e comercial',
} as const;
