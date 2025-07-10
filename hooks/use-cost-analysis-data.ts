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

// Mock data for expense entries - Updated with all stages
const mockExpenseEntries: ExpenseEntry[] = [
    // Fundações
    {
        id: '001',
        date: '2024-01-14',
        invoiceNumber: 'NF-001',
        description: 'Concreto para fundação',
        supplier: 'Concreteira São Paulo',
        stage: 'Fundações',
        class: 'Concreto',
        type: 'material',
        paymentMethod: 'pix',
        adm: 'João Silva',
        value: 25000,
    },
    {
        id: '002',
        date: '2024-01-16',
        invoiceNumber: 'NF-002',
        description: 'Escavação e preparo do terreno',
        supplier: 'Terraplanagem ABC',
        stage: 'Fundações',
        class: 'Terraplanagem',
        type: 'services',
        paymentMethod: 'boleto',
        adm: 'João Silva',
        value: 8000,
    },
    // Estrutura
    {
        id: '003',
        date: '2024-01-17',
        invoiceNumber: 'NF-003',
        description: 'Ferragem CA-50 12mm',
        supplier: 'Aços Bragança',
        stage: 'Estrutura',
        class: 'Aço',
        type: 'material',
        paymentMethod: 'boleto',
        adm: 'João Silva',
        value: 45000,
    },
    {
        id: '004',
        date: '2024-01-20',
        invoiceNumber: 'NF-004',
        description: 'Concreto usinado FCK 25',
        supplier: 'Concreteira São Paulo',
        stage: 'Estrutura',
        class: 'Concreto',
        type: 'material',
        paymentMethod: 'pix',
        adm: 'João Silva',
        value: 35000,
    },
    // Mão de obra
    {
        id: '005',
        date: '2024-01-19',
        invoiceNumber: 'NF-005',
        description: 'Pedreiro especializado',
        supplier: 'João Silva Construções',
        stage: 'Mão de obra',
        class: 'Mão de obra especializada',
        type: 'labor',
        paymentMethod: 'check',
        adm: 'Maria Santos',
        value: 38000,
    },
    // Alvenaria
    {
        id: '006',
        date: '2024-01-24',
        invoiceNumber: 'NF-006',
        description: 'Tijolos cerâmicos',
        supplier: 'Cerâmica Moderna',
        stage: 'Alvenaria',
        class: 'Cerâmica',
        type: 'material',
        paymentMethod: 'cash',
        adm: 'João Silva',
        value: 28000,
    },
    // Administração
    {
        id: '007',
        date: '2024-03-01',
        invoiceNumber: 'NF-007',
        description: 'Administração de obra',
        supplier: 'Gestão Obras Ltda',
        stage: 'Administração',
        class: 'Gestão',
        type: 'administration',
        paymentMethod: 'boleto',
        adm: 'Maria Santos',
        value: 15000,
    },
    // Projetos e aprovações
    {
        id: '008',
        date: '2024-02-10',
        invoiceNumber: 'NF-008',
        description: 'Projeto estrutural',
        supplier: 'Engenharia XYZ',
        stage: 'Projetos e aprovações',
        class: 'Projetos',
        type: 'services',
        paymentMethod: 'boleto',
        adm: 'Maria Santos',
        value: 22000,
    },
    // Telhado e forro
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
        adm: 'João Silva',
        value: 22000,
    },
    // Portas, janelas e vidros
    {
        id: '010',
        date: '2024-04-05',
        invoiceNumber: 'NF-010',
        description: 'Portas e janelas de alumínio',
        supplier: 'Esquadrias Modernas',
        stage: 'Portas, janelas e vidros',
        class: 'Esquadrias',
        type: 'material',
        paymentMethod: 'card',
        adm: 'João Silva',
        value: 18000,
    },
    // Instalação hidráulica
    {
        id: '011',
        date: '2024-03-15',
        invoiceNumber: 'NF-011',
        description: 'Tubulação hidráulica',
        supplier: 'Hidráulica Norte',
        stage: 'Instalação hidráulica',
        class: 'Instalações',
        type: 'material',
        paymentMethod: 'pix',
        adm: 'Maria Santos',
        value: 15000,
    },
    // Instalação Elétrica
    {
        id: '012',
        date: '2024-03-15',
        invoiceNumber: 'NF-012',
        description: 'Instalação elétrica',
        supplier: 'Elétrica Moderna',
        stage: 'Instalação Elétrica',
        class: 'Instalações',
        type: 'services',
        paymentMethod: 'check',
        adm: 'Maria Santos',
        value: 12000,
    },
    // Serviços preliminares
    {
        id: '013',
        date: '2024-01-05',
        invoiceNumber: 'NF-013',
        description: 'Limpeza e preparação do canteiro',
        supplier: 'Serviços Gerais ABC',
        stage: 'Serviços preliminares',
        class: 'Preparação',
        type: 'services',
        paymentMethod: 'pix',
        adm: 'João Silva',
        value: 8000,
    },
    // Cobertura
    {
        id: '014',
        date: '2024-04-10',
        invoiceNumber: 'NF-014',
        description: 'Estrutura metálica para cobertura',
        supplier: 'Metalúrgica Sul',
        stage: 'Cobertura',
        class: 'Estrutura metálica',
        type: 'material',
        paymentMethod: 'boleto',
        adm: 'João Silva',
        value: 20000,
    },
    // Pintura interna e externa
    {
        id: '015',
        date: '2024-05-15',
        invoiceNumber: 'NF-015',
        description: 'Tinta acrílica premium',
        supplier: 'Tintas Premium',
        stage: 'Pintura interna e externa',
        class: 'Tintas',
        type: 'material',
        paymentMethod: 'card',
        adm: 'Maria Santos',
        value: 12000,
    },
    // Revestimento piso e parede
    {
        id: '016',
        date: '2024-04-20',
        invoiceNumber: 'NF-016',
        description: 'Cerâmica para piso e parede',
        supplier: 'Cerâmica Premium',
        stage: 'Revestimento piso e parede',
        class: 'Revestimentos',
        type: 'material',
        paymentMethod: 'pix',
        adm: 'João Silva',
        value: 32000,
    },
    // Paredes e reboco
    {
        id: '017',
        date: '2024-02-25',
        invoiceNumber: 'NF-017',
        description: 'Argamassa para reboco',
        supplier: 'Materiais Norte',
        stage: 'Paredes e reboco',
        class: 'Argamassa',
        type: 'material',
        paymentMethod: 'boleto',
        adm: 'João Silva',
        value: 25000,
    },
    // Bancadas, louças e metais
    {
        id: '018',
        date: '2024-05-10',
        invoiceNumber: 'NF-018',
        description: 'Bancadas de granito e louças',
        supplier: 'Mármores e Granitos',
        stage: 'Bancadas, louças e metais',
        class: 'Acabamentos',
        type: 'material',
        paymentMethod: 'card',
        adm: 'Maria Santos',
        value: 16000,
    },
    // Serviços complementares
    {
        id: '019',
        date: '2024-05-20',
        invoiceNumber: 'NF-019',
        description: 'Limpeza final da obra',
        supplier: 'Limpeza Profissional',
        stage: 'Serviços complementares',
        class: 'Limpeza',
        type: 'services',
        paymentMethod: 'pix',
        adm: 'Maria Santos',
        value: 14000,
    },
    // Instalações complementares
    {
        id: '020',
        date: '2024-04-25',
        invoiceNumber: 'NF-020',
        description: 'Sistema de ar condicionado',
        supplier: 'Climatização ABC',
        stage: 'Instalações complementares',
        class: 'Climatização',
        type: 'services',
        paymentMethod: 'boleto',
        adm: 'João Silva',
        value: 10000,
    },
    // Instalações
    {
        id: '021',
        date: '2024-03-25',
        invoiceNumber: 'NF-021',
        description: 'Instalações de gás',
        supplier: 'Gás Instalações',
        stage: 'Instalações',
        class: 'Gás',
        type: 'services',
        paymentMethod: 'check',
        adm: 'Maria Santos',
        value: 15000,
    },
    // Acabamento
    {
        id: '022',
        date: '2024-05-25',
        invoiceNumber: 'NF-022',
        description: 'Acabamentos finais',
        supplier: 'Acabamentos Premium',
        stage: 'Acabamento',
        class: 'Acabamentos',
        type: 'services',
        paymentMethod: 'pix',
        adm: 'João Silva',
        value: 18000,
    },
];

// Add mock data for administration expenses
const mockAdministrationExpenses = [
    {
        id: 'adm-1',
        year: 2024,
        month: 'Jan',
        monthNumber: 1,
        value: 15000,
        description: 'Administração geral',
    },
    {
        id: 'adm-2',
        year: 2024,
        month: 'Fev',
        monthNumber: 2,
        value: 18000,
        description: 'Administração geral',
    },
    {
        id: 'adm-3',
        year: 2024,
        month: 'Mar',
        monthNumber: 3,
        value: 15000,
        description: 'Administração geral',
    },
    {
        id: 'adm-4',
        year: 2024,
        month: 'Abr',
        monthNumber: 4,
        value: 22000,
        description: 'Administração geral',
    },
    {
        id: 'adm-5',
        year: 2024,
        month: 'Mai',
        monthNumber: 5,
        value: 19000,
        description: 'Administração geral',
    },
    {
        id: 'adm-6',
        year: 2024,
        month: 'Jun',
        monthNumber: 6,
        value: 16000,
        description: 'Administração geral',
    },
    {
        id: 'adm-7',
        year: 2024,
        month: 'Jul',
        monthNumber: 7,
        value: 21000,
        description: 'Administração geral',
    },
    {
        id: 'adm-8',
        year: 2024,
        month: 'Ago',
        monthNumber: 8,
        value: 17000,
        description: 'Administração geral',
    },
    {
        id: 'adm-9',
        year: 2024,
        month: 'Set',
        monthNumber: 9,
        value: 20000,
        description: 'Administração geral',
    },
    {
        id: 'adm-10',
        year: 2024,
        month: 'Out',
        monthNumber: 10,
        value: 18000,
        description: 'Administração geral',
    },
    {
        id: 'adm-11',
        year: 2024,
        month: 'Nov',
        monthNumber: 11,
        value: 23000,
        description: 'Administração geral',
    },
    {
        id: 'adm-12',
        year: 2024,
        month: 'Dez',
        monthNumber: 12,
        value: 19000,
        description: 'Administração geral',
    },
];

export const useCostAnalysisData = (): {
    data: CostAnalysisData;
    chartFilters: ChartFilters;
    setChartFilters: (filters: ChartFilters) => void;
    administrationYear: number;
    setAdministrationYear: (year: number) => void;
} => {
    const [chartFilters, setChartFilters] = useState<ChartFilters>({
        period: 'total',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });

    // Add state for administration year filter
    const [administrationYear, setAdministrationYear] = useState(
        new Date().getFullYear() - 1
    );

    // Update the return object to include administration data
    const costAnalysisData = useMemo(() => {
        // Filter entries based on chart filters
        const filteredEntries = filterEntriesByPeriod(
            mockExpenseEntries,
            chartFilters
        );

        const costDistribution = generateCostDistribution(filteredEntries);
        const expenseStages = generateExpenseStages(filteredEntries);

        // Filter administration expenses by selected year
        const filteredAdministrationExpenses =
            mockAdministrationExpenses.filter(
                (expense) => expense.year === administrationYear
            );

        const totalCostDistribution = costDistribution.reduce(
            (sum, item) => sum + item.value,
            0
        );
        const totalExpenseStages = expenseStages.reduce(
            (sum, item) => sum + item.value,
            0
        );
        const totalAdministrationExpenses =
            filteredAdministrationExpenses.reduce(
                (sum, item) => sum + item.value,
                0
            );

        return {
            costDistribution,
            expenseStages,
            administrationExpenses: filteredAdministrationExpenses,
            expenseEntries: mockExpenseEntries, // Always return all entries for table
            totalCostDistribution,
            totalExpenseStages,
            totalAdministrationExpenses,
        };
    }, [chartFilters, administrationYear]);

    // Update the return statement
    return {
        data: costAnalysisData,
        chartFilters,
        setChartFilters,
        administrationYear,
        setAdministrationYear,
    };
};
