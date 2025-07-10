'use client';

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '../utils/cost-analysis-utils';
import { CHART_CONFIG } from '../constants/cost-analysis';
import type { CostDistribution, ChartFiltersType } from '../types/cost-analysis';
import  {ChartFilters}  from './chart-filters';

interface CostDistributionChartProps {
    data: CostDistribution[];
    total: number;
    filters: ChartFiltersType;
    onFiltersChange: (filters: ChartFiltersType) => void;
    className?: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        name: string;
        value: number;
        payload: CostDistribution;
    }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                <p className="font-medium text-gray-900">{data.label}</p>
                <p className="font-semibold" style={{ color: data.color }}>
                    {formatCurrency(data.value)} ({data.percentage}%)
                </p>
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ payload }: any) => {
    console.log(payload);
    return (
        <div className="flex justify-center gap-6 mt-4">
            {payload?.map((entry: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                        {entry.payload.label} {entry.payload.percentage}%
                    </span>
                </div>
            ))}
        </div>
    );
};

export const CostDistributionChart = ({
    data,
    total,
    filters,
    onFiltersChange,
    className = '',
}: CostDistributionChartProps) => {
    return (
        <Card className={`w-full ${className}`}>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle className="text-xl font-semibold text-gray-900">
                            Distribuição por Tipo de Custo
                        </CardTitle>
                        <CardDescription>
                            Percentual de Material vs Mão de Obra
                        </CardDescription>
                    </div>
                    <ChartFilters
                        filters={filters}
                        onFiltersChange={onFiltersChange}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center">
                    <div className="w-full h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={CHART_CONFIG.donutInnerRadius}
                                    outerRadius={CHART_CONFIG.donutOuterRadius}
                                    paddingAngle={CHART_CONFIG.paddingAngle}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend content={<CustomLegend />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="text-center mt-4">
                        <div className="text-2xl font-bold text-gray-900">
                            {formatCurrency(total)}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total de custos
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
