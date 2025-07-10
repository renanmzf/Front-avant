export const COST_DISTRIBUTION_COLORS = {
    material: '#ef4444', // red-500
    labor: '#10b981', // emerald-500
    services: '#3b82f6', // blue-500
    rental: '#f59e0b', // amber-500
    administration: '#8b5cf6', // violet-500
} as const;

export const COST_TYPE_LABELS = {
    material: 'Material',
    labor: 'Mão de Obra',
    services: 'Serviços',
    rental: 'Locação',
    administration: 'Administração',
} as const;

export const PAYMENT_METHOD_LABELS = {
    cash: 'Dinheiro',
    pix: 'PIX',
    check: 'Cheque',
    card: 'Cartão',
    boleto: 'Boleto',
} as const;

export const EXPENSE_STAGE_COLORS = [
    '#1e40af', // blue-800
    '#2563eb', // blue-600
    '#3b82f6', // blue-500
    '#60a5fa', // blue-400
    '#93c5fd', // blue-300
    '#1d4ed8', // blue-700
    '#2dd4bf', // teal-400
    '#06b6d4', // cyan-500
    '#0891b2', // cyan-600
    '#0e7490', // cyan-700
    '#155e75', // cyan-800
    '#164e63', // cyan-900
    '#7c3aed', // violet-600
    '#8b5cf6', // violet-500
    '#a78bfa', // violet-400
    '#c4b5fd', // violet-300
    '#6366f1', // indigo-500
    '#4f46e5', // indigo-600
    '#4338ca', // indigo-700
    '#3730a3', // indigo-800
] as const;

export const EXPENSE_STAGES_LIST = [
    'Fundações',
    'Estrutura',
    'Mão de obra',
    'Alvenaria',
    'Administração',
    'Projetos e aprovações',
    'Telhado e forro',
    'Portas, janelas e vidros',
    'Instalação hidráulica',
    'Instalação Elétrica',
    'Serviços preliminares',
    'Cobertura',
    'Pintura interna e externa',
    'Revestimento piso e parede',
    'Paredes e reboco',
    'Bancadas, louças e metais',
    'Serviços complementares',
    'Instalações complementares',
    'Instalações',
    'Acabamento',
] as const;

export const CHART_CONFIG = {
    donutInnerRadius: 60,
    donutOuterRadius: 120,
    pieInnerRadius: 0,
    pieOuterRadius: 120,
    paddingAngle: 2,
    cornerRadius: 4,
} as const;

export const TAB_OPTIONS = [
    { id: 'administration-expenses', label: 'Gasto com Administração' },
    { id: 'cost-distribution', label: 'Distribuição por Tipo de Custo' },
    { id: 'stage-expenses', label: 'Gastos por Etapa' },
] as const;

export const FILTER_PERIODS = [
    { value: 'total', label: 'Total' },
    { value: 'year', label: 'Por Ano' },
    { value: 'month', label: 'Por Mês' },
] as const;

export const MONTHS = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
] as const;
