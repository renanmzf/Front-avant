import { MONTHS } from '../constants/revenue-chart';
import type { MonthlyRevenue, ContractRevenue } from '../types/revenue-chart';

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatCurrencyDetailed = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
};

export const formatPeriod = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startMonth = MONTHS[start.getMonth()];
    const endMonth = MONTHS[end.getMonth()];
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    if (startYear === endYear) {
        return `${startMonth} - ${endMonth} ${startYear}`;
    }

    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
};

export const getMonthName = (monthNumber: number): string => {
    return MONTHS[monthNumber - 1] || '';
};

export const groupRevenuesByMonth = (
    contracts: ContractRevenue[],
    year: number
): MonthlyRevenue[] => {
    const monthlyData: Record<number, MonthlyRevenue> = {};

    // Initialize all months with zero revenue
    for (let i = 1; i <= 12; i++) {
        monthlyData[i] = {
            month: getMonthName(i),
            monthNumber: i,
            totalAmount: 0,
            contracts: [],
        };
    }

    // Group contracts by month
    contracts.forEach((contract) => {
        const paymentDate = new Date(contract.paymentDate);
        if (paymentDate.getFullYear() === year) {
            const month = paymentDate.getMonth() + 1;
            if (monthlyData[month]) {
                monthlyData[month].totalAmount += contract.amount;
                monthlyData[month].contracts.push(contract);
            }
        }
    });

    return Object.values(monthlyData).sort(
        (a, b) => a.monthNumber - b.monthNumber
    );
};

export const calculateTotalRevenue = (
    monthlyRevenues: MonthlyRevenue[]
): number => {
    return monthlyRevenues.reduce(
        (total, month) => total + month.totalAmount,
        0
    );
};

export const getActivePeriod = (
    contracts: ContractRevenue[]
): { startDate: string; endDate: string } => {
    if (contracts.length === 0) {
        const currentDate = new Date().toISOString().split('T')[0];
        return { startDate: currentDate, endDate: currentDate };
    }

    const dates = contracts.map((contract) => new Date(contract.paymentDate));
    const startDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const endDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
    };
};

export const formatTooltipContent = (contracts: ContractRevenue[]): string => {
    if (contracts.length === 0) return 'Nenhum recebimento';

    return contracts
        .map(
            (contract) =>
                `${contract.contractTitle} - ${
                    contract.clientName
                }: ${formatCurrencyDetailed(contract.amount)}`
        )
        .join('\n');
};
