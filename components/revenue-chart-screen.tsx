'use client';

import { useState } from 'react';
import { RevenueBarChart } from './revenue-bar-chart';
import { useRevenueData } from '../hooks/use-revenue-data';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function RevenueChartScreen() {
    const [selectedYear, setSelectedYear] = useState(2024);
    const revenueData = useRevenueData(selectedYear);

    const handlePreviousYear = () => {
        setSelectedYear((prev) => prev - 1);
    };

    const handleNextYear = () => {
        setSelectedYear((prev) => prev + 1);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Dashboard de Recebimentos
                        </h1>
                        <p className="text-gray-600">
                            Acompanhe os recebimentos mensais por contrato
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePreviousYear}
                            className="p-2 bg-transparent"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold text-gray-900 min-w-[60px] text-center">
                            {selectedYear}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNextYear}
                            className="p-2 bg-transparent"
                            disabled={selectedYear >= new Date().getFullYear()}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <RevenueBarChart data={revenueData} className="max-w-6xl mx-auto" />
        </div>
    );
}
