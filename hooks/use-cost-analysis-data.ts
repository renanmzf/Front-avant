'use client';

import { useMemo, useState } from 'react';
import {
    generateCostDistribution,
    generateExpenseStages,
    filterEntriesByPeriod,
} from '../utils/cost-analysis-utils';
import type {
    CostAnalysisData,
    ExpenseEntry,
    ChartFilters,
} from '../types/cost-analysis';

// Mock data for expense entries - Updated with admPercentage
const mockExpenseEntries: ExpenseEntry[] = [
    {
        id: '001',
        date: '2024-01-14',
        invoiceNumber: 'NF-001',
        description: 'Concreto usinado FCK 25',
        supplier: 'Concreteira São Paulo',
        stage: 'Estrutura',
        class: 'Concreto',
        type: 'material',
        paymentMethod: 'pix',
        admPercentage: 15, // 15% ADM
        value: 15000,
    },
    {
        id: '002',
        date: '2024-01-17',
        invoiceNumber: 'NF-002',
        description: 'Ferragem CA-50 12mm',
        supplier: 'Aços Bragança',
        stage: 'Estrutura',
        class: 'Aço',
        type: 'material',
        paymentMethod: 'boleto',
        admPercentage: 20, // 20% ADM
        value: 8500,
    },
    {
        id: '003',
        date: '2024-01-19',
        invoiceNumber: 'NF-003',
        description: 'Pedreiro especializado',
        supplier: 'João Silva Construções',
        stage: 'Alvenaria',
        class: 'Mão de obra especializada',
        type: 'labor',
        paymentMethod: 'check',
        admPercentage: 25, // 25% ADM
        value: 3200,
    },
    {
        id: '004',
        date: '2024-01-24',
        invoiceNumber: 'NF-004',
        description: 'Tijolos cerâmicos',
        supplier: 'Cerâmica Moderna',
        stage: 'Alvenaria',
        class: 'Cerâmica',
        type: 'material',
        paymentMethod: 'cash',
        admPercentage: 18, // 18% ADM
        value: 2800,
    },
    {
        id: '005',
        date: '2024-02-05',
        invoiceNumber: 'NF-005',
        description: 'Locação de betoneira',
        supplier: 'Equipamentos ABC',
        stage: 'Estrutura',
        class: 'Equipamentos',
        type: 'rental',
        paymentMethod: 'pix',
        admPercentage: 12, // 12% ADM
        value: 1200,
    },
    {
        id: '006',
        date: '2024-02-10',
        invoiceNumber: 'NF-006',
        description: 'Projeto estrutural',
        supplier: 'Engenharia XYZ',
        stage: 'Projetos e aprovações',
        class: 'Projetos',
        type: 'services',
        paymentMethod: 'boleto',
        admPercentage: 30, // 30% ADM
        value: 5500,
    },
    {
        id: '007',
        date: '2024-02-15',
        invoiceNumber: 'NF-007',
        description: 'Cimento Portland',
        supplier: 'Materiais Norte',
        stage: 'Fundações',
        class: 'Cimento',
        type: 'material',
        paymentMethod: 'card',
        admPercentage: 22, // 22% ADM
        value: 4200,
    },
    {
        id: '008',
        date: '2024-03-01',
        invoiceNumber: 'NF-008',
        description: 'Administração de obra',
        supplier: 'Gestão Obras Ltda',
        stage: 'Administração',
        class: 'Gestão',
        type: 'administration',
        paymentMethod: 'boleto',
        admPercentage: 35, // 35% ADM
        value: 3800,
    },
    {
        id: '009',
        date: '2024-03-10',
        invoiceNumber: 'NF-009',
        description: 'Telhas cerâmicas',
        supplier: 'Telhas Premium',
        stage: 'Telhado e forro',
        class: 'Cobertura',
        type: 'material',
        paymentMethod: 'pix',
        admPercentage: 16, // 16% ADM
        value: 6800,
    },
    {
        id: '010',
        date: '2024-03-15',
        invoiceNumber: 'NF-010',
        description: 'Instalação elétrica',
        supplier: 'Elétrica Moderna',
        stage: 'Instalação Elétrica',
        class: 'Instalações',
        type: 'services',
        paymentMethod: 'check',
        admPercentage: 28, // 28% ADM
        value: 4500,
    },
];

export const useCostAnalysisData = (): {
    data: CostAnalysisData;
    chartFilters: ChartFilters;
    setChartFilters: (filters: ChartFilters) => void;
} => {
    const [chartFilters, setChartFilters] = useState<ChartFilters>({
        period: 'total',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });

    const costAnalysisData = useMemo(() => {
        // Filter entries based on chart filters
        const filteredEntries = filterEntriesByPeriod(
            mockExpenseEntries,
            chartFilters
        );

        const costDistribution = generateCostDistribution(filteredEntries);
        const expenseStages = generateExpenseStages(filteredEntries);

        const totalCostDistribution = costDistribution.reduce(
            (sum, item) => sum + item.value,
            0
        );
        const totalExpenseStages = expenseStages.reduce(
            (sum, item) => sum + item.value,
            0
        );

        return {
            costDistribution,
            expenseStages,
            expenseEntries: mockExpenseEntries, // Always return all entries for table
            totalCostDistribution,
            totalExpenseStages,
        };
    }, [chartFilters]);

    return {
        data: costAnalysisData,
        chartFilters,
        setChartFilters,
    };
};
