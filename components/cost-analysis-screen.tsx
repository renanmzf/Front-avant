'use client';

import { useState } from 'react';
import { CostDistributionChart } from './cost-distribution-chart';
import { StageExpensesChart } from './stage-expenses-chart';
import { TabNavigation } from './tab-navigation';
import { ExpenseTable } from './expense-table';
import { useCostAnalysisData } from '../hooks/use-cost-analysis-data';
import type { TabType } from '../types/cost-analysis';
import { AdministrationExpensesChart } from './administration-expenses-chart';

export default function CostAnalysisScreen() {
    const [activeTab, setActiveTab] = useState<TabType>(
        'administration-expenses'
    );
    const {
        data,
        chartFilters,
        setChartFilters,
        administrationYear,
        setAdministrationYear,
    } = useCostAnalysisData();

    const renderTabContent = () => {
        switch (activeTab) {
            case 'administration-expenses':
                return (
                    <AdministrationExpensesChart
                        data={data.administrationExpenses}
                        total={data.totalAdministrationExpenses}
                        selectedYear={administrationYear}
                        onYearChange={setAdministrationYear}
                        className=""
                    />
                );
            case 'cost-distribution':
                return (
                    <CostDistributionChart
                        data={data.costDistribution}
                        total={data.totalCostDistribution}
                        filters={chartFilters}
                        onFiltersChange={setChartFilters}
                        className=""
                    />
                );
            case 'stage-expenses':
                return (
                    <StageExpensesChart
                        data={data.expenseStages}
                        total={data.totalExpenseStages}
                        filters={chartFilters}
                        onFiltersChange={setChartFilters}
                        className=""
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Análise de Custos
                </h1>
                <p className="text-gray-600">
                    Controle financeiro completo de todos os custos da
                    construção
                </p>
            </div>

            <div className="space-y-8">
                <TabNavigation
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    className="max-w-2xl mx-auto"
                />

                <div className="min-h-[500px]">{renderTabContent()}</div>

                <ExpenseTable entries={data.expenseEntries} />
            </div>
        </div>
    );
}
