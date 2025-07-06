'use client';

import { useMemo } from 'react';
import {
    groupRevenuesByMonth,
    calculateTotalRevenue,
    getActivePeriod,
} from '../utils/revenue-chart-utils';
import type { RevenueData, ContractRevenue } from '../types/revenue-chart';

// Mock data based on construction contracts
const mockContractRevenues: ContractRevenue[] = [
    // Janeiro
    {
        contractId: 'contract-1',
        contractTitle: 'Projeto Arquitetônico - Residência Alphaville',
        clientName: 'João Silva',
        amount: 25000,
        paymentDate: '2024-01-30',
    },
    // Fevereiro
    {
        contractId: 'contract-1',
        contractTitle: 'Projeto Arquitetônico - Residência Alphaville',
        clientName: 'João Silva',
        amount: 25000,
        paymentDate: '2024-02-28',
    },
    // Março
    {
        contractId: 'contract-3',
        contractTitle: 'Fornecimento de Mão de Obra - Reforma Centro',
        clientName: 'Maria Santos',
        amount: 35000,
        paymentDate: '2024-03-10',
    },
    // Abril
    {
        contractId: 'contract-2',
        contractTitle: 'Execução da Obra - Residência Alphaville',
        clientName: 'João Silva',
        amount: 36000,
        paymentDate: '2024-04-10',
    },
    // Maio
    {
        contractId: 'contract-2',
        contractTitle: 'Execução da Obra - Residência Alphaville',
        clientName: 'João Silva',
        amount: 36000,
        paymentDate: '2024-05-12',
    },
    {
        contractId: 'contract-5',
        contractTitle: 'Consultoria Técnica - Edifício Comercial',
        clientName: 'Empresa ABC',
        amount: 15000,
        paymentDate: '2024-05-20',
    },
    // Junho
    {
        contractId: 'contract-4',
        contractTitle: 'Projeto Estrutural - Edifício Comercial',
        clientName: 'Empresa ABC',
        amount: 45000,
        paymentDate: '2024-06-15',
    },
    // Julho
    {
        contractId: 'contract-6',
        contractTitle: 'Administração de Obra - Condomínio',
        clientName: 'Construtora XYZ',
        amount: 28000,
        paymentDate: '2024-07-05',
    },
    // Agosto
    {
        contractId: 'contract-2',
        contractTitle: 'Execução da Obra - Residência Alphaville',
        clientName: 'João Silva',
        amount: 36000,
        paymentDate: '2024-08-10',
    },
    {
        contractId: 'contract-7',
        contractTitle: 'Projeto Hidráulico - Shopping Center',
        clientName: 'Investimentos ABC',
        amount: 22000,
        paymentDate: '2024-08-25',
    },
    // Setembro
    {
        contractId: 'contract-4',
        contractTitle: 'Projeto Estrutural - Edifício Comercial',
        clientName: 'Empresa ABC',
        amount: 45000,
        paymentDate: '2024-09-10',
    },
    // Outubro
    {
        contractId: 'contract-8',
        contractTitle: 'Consultoria em Sustentabilidade',
        clientName: 'EcoBuilding Ltda',
        amount: 18000,
        paymentDate: '2024-10-15',
    },
    {
        contractId: 'contract-6',
        contractTitle: 'Administração de Obra - Condomínio',
        clientName: 'Construtora XYZ',
        amount: 28000,
        paymentDate: '2024-10-30',
    },
    // Novembro
    {
        contractId: 'contract-9',
        contractTitle: 'Projeto Paisagístico - Resort',
        clientName: 'Turismo & Cia',
        amount: 32000,
        paymentDate: '2024-11-12',
    },
    // Dezembro
    {
        contractId: 'contract-2',
        contractTitle: 'Execução da Obra - Residência Alphaville',
        clientName: 'João Silva',
        amount: 36000,
        paymentDate: '2024-12-05',
    },
    {
        contractId: 'contract-10',
        contractTitle: 'Auditoria Técnica - Hospital',
        clientName: 'Saúde & Vida',
        amount: 25000,
        paymentDate: '2024-12-20',
    },
];

export const useRevenueData = (year = 2024): RevenueData => {
    const revenueData = useMemo(() => {
        const monthlyRevenues = groupRevenuesByMonth(
            mockContractRevenues,
            year
        );
        const totalRevenue = calculateTotalRevenue(monthlyRevenues);
        const activePeriod = getActivePeriod(mockContractRevenues);

        return {
            monthlyRevenues,
            totalRevenue,
            activePeriod,
            year,
        };
    }, [year]);

    return revenueData;
};
