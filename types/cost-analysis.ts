export type CostType =
    | 'material'
    | 'labor'
    | 'services'
    | 'rental'
    | 'administration';

export type PaymentMethod = 'cash' | 'pix' | 'check' | 'card' | 'boleto';

export type FilterPeriod = 'month' | 'year' | 'total';

export interface CostDistribution {
    type: CostType;
    label: string;
    value: number;
    percentage: number;
    color: string;
}

export interface ExpenseStage {
    id: string;
    name: string;
    value: number;
    percentage: number;
    color: string;
}

export interface ExpenseEntry {
    id: string;
    date: string;
    invoiceNumber: string;
    description: string;
    supplier: string;
    stage: string;
    class: string;
    type: CostType;
    paymentMethod: PaymentMethod;
    admPercentage: number; // Changed from adm string to percentage number
    value: number;
}

export interface CostAnalysisData {
    costDistribution: CostDistribution[];
    expenseStages: ExpenseStage[];
    expenseEntries: ExpenseEntry[];
    totalCostDistribution: number;
    totalExpenseStages: number;
}

export interface CostAnalysisProps {
    data: CostAnalysisData;
    className?: string;
}

export interface TableFilters {
    search: string;
    dateRange: { start: string; end: string };
    supplier: string;
    stage: string;
    class: string;
    type: CostType | '';
    valueRange: { min: number; max: number };
}

export interface ChartFilters {
    period: FilterPeriod;
    month: number;
    year: number;
}

export type TabType = 'cost-distribution' | 'stage-expenses';
