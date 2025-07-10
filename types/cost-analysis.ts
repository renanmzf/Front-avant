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
    adm: string;
    value: number;
}

// Add new interface for administration expenses
export interface AdministrationExpense {
    id: string;
    year: number;
    month: string;
    monthNumber: number;
    value: number;
    description: string;
}

// Update CostAnalysisData interface
export interface CostAnalysisData {
    costDistribution: CostDistribution[];
    expenseStages: ExpenseStage[];
    administrationExpenses: AdministrationExpense[];
    expenseEntries: ExpenseEntry[];
    totalCostDistribution: number;
    totalExpenseStages: number;
    totalAdministrationExpenses: number;
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

export interface ChartFiltersType {
    period: FilterPeriod;
    month: number;
    year: number;
}

// Update the TabType to include the new administration tab
export type TabType =
    | 'administration-expenses'
    | 'cost-distribution'
    | 'stage-expenses';
