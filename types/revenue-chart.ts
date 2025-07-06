export interface ContractRevenue {
    contractId: string;
    contractTitle: string;
    clientName: string;
    amount: number;
    paymentDate: string;
}

export interface MonthlyRevenue {
    month: string;
    monthNumber: number;
    totalAmount: number;
    contracts: ContractRevenue[];
}

export interface RevenueData {
    monthlyRevenues: MonthlyRevenue[];
    totalRevenue: number;
    activePeriod: {
        startDate: string;
        endDate: string;
    };
    year: number;
}

export interface RevenueChartProps {
    data: RevenueData;
    className?: string;
}

export interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        payload: MonthlyRevenue;
    }>;
    label?: string;
}
