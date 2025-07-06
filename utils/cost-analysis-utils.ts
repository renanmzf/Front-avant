import {
    EXPENSE_STAGE_COLORS,
    COST_DISTRIBUTION_COLORS,
    COST_TYPE_LABELS,
} from '../constants/cost-analysis';
import type {
    CostDistribution,
    ExpenseStage,
    ExpenseEntry,
    ChartFilters,
    CostType,
} from '../types/cost-analysis';

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
};

export const formatPercentage = (value: number): string => {
    return `${value}%`;
};

export const calculateAdmFee = (value: number, percentage: number): number => {
    return (value * percentage) / 100;
};

export const calculatePercentage = (value: number, total: number): number => {
    return Math.round((value / total) * 100);
};

export const filterEntriesByPeriod = (
    entries: ExpenseEntry[],
    filters: ChartFilters
): ExpenseEntry[] => {
    if (filters.period === 'total') return entries;

    return entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        const entryYear = entryDate.getFullYear();
        const entryMonth = entryDate.getMonth() + 1;

        if (filters.period === 'year') {
            return entryYear === filters.year;
        }

        if (filters.period === 'month') {
            return entryYear === filters.year && entryMonth === filters.month;
        }

        return true;
    });
};

export const generateCostDistribution = (
    entries: ExpenseEntry[]
): CostDistribution[] => {
    const typeValues: Record<CostType, number> = {
        material: 0,
        labor: 0,
        services: 0,
        rental: 0,
        administration: 0,
    };

    entries.forEach((entry) => {
        typeValues[entry.type] += entry.value;
    });

    const total = Object.values(typeValues).reduce(
        (sum, value) => sum + value,
        0
    );

    return Object.entries(typeValues)
        .filter(([_, value]) => value > 0)
        .map(([type, value]) => ({
            type: type as CostType,
            label: COST_TYPE_LABELS[type as CostType],
            value,
            percentage: calculatePercentage(value, total),
            color: COST_DISTRIBUTION_COLORS[type as CostType],
        }));
};

export const generateExpenseStages = (
    entries: ExpenseEntry[]
): ExpenseStage[] => {
    const stageValues: Record<string, number> = {};

    entries.forEach((entry) => {
        stageValues[entry.stage] =
            (stageValues[entry.stage] || 0) + entry.value;
    });

    const total = Object.values(stageValues).reduce(
        (sum, value) => sum + value,
        0
    );

    return Object.entries(stageValues)
        .map(([stage, value], index) => ({
            id: `stage-${index}`,
            name: stage,
            value,
            percentage: calculatePercentage(value, total),
            color: EXPENSE_STAGE_COLORS[index % EXPENSE_STAGE_COLORS.length],
        }))
        .sort((a, b) => b.value - a.value);
};

export const getUniqueValues = (
    entries: ExpenseEntry[],
    field: keyof ExpenseEntry
): string[] => {
    const values = entries.map((entry) => String(entry[field]));
    return Array.from(new Set(values)).sort();
};

export const applyTableFilters = (
    entries: ExpenseEntry[],
    filters: any
): ExpenseEntry[] => {
    return entries.filter((entry) => {
        // Search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const searchableFields = [
                entry.description,
                entry.supplier,
                entry.invoiceNumber,
            ];
            if (
                !searchableFields.some((field) =>
                    field.toLowerCase().includes(searchTerm)
                )
            ) {
                return false;
            }
        }

        // Date range filter
        if (filters.dateRange.start && filters.dateRange.end) {
            const entryDate = new Date(entry.date);
            const startDate = new Date(filters.dateRange.start);
            const endDate = new Date(filters.dateRange.end);
            if (entryDate < startDate || entryDate > endDate) {
                return false;
            }
        }

        // Other filters
        if (filters.supplier && entry.supplier !== filters.supplier)
            return false;
        if (filters.stage && entry.stage !== filters.stage) return false;
        if (filters.class && entry.class !== filters.class) return false;
        if (filters.type && entry.type !== filters.type) return false;

        // Value range filter
        if (filters.valueRange.min && entry.value < filters.valueRange.min)
            return false;
        if (filters.valueRange.max && entry.value > filters.valueRange.max)
            return false;

        return true;
    });
};
