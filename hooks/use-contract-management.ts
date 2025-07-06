'use client';

import { useState, useMemo } from 'react';
import { MOCK_PROJECTS, MOCK_KPI_DATA } from '../constants/contract-management';
import type {
    Project,
    Contract,
    ContractFormData,
    KPIData,
} from '../types/contract-management';
import { MOCK_CONTRACT_TABLE_DATA } from '../constants/contract-table-data';

export const useContractManagement = () => {
    const [projects] = useState<Project[]>(MOCK_PROJECTS);
    const [selectedProjectId, setSelectedProjectId] = useState<string>('');
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [kpiData] = useState<KPIData>(MOCK_KPI_DATA);

    const selectedProject = useMemo(() => {
        return (
            projects.find((project) => project.id === selectedProjectId) || null
        );
    }, [projects, selectedProjectId]);

    const projectContracts = useMemo(() => {
        return contracts.filter(
            (contract) => contract.projectId === selectedProjectId
        );
    }, [contracts, selectedProjectId]);

    const createContract = async (
        contractData: ContractFormData
    ): Promise<{ success: boolean; message: string }> => {
        try {
            if (!selectedProject) {
                throw new Error('Nenhum projeto selecionado');
            }

            const newContract: Contract = {
                id: `contract-${Date.now()}`,
                number: `CONT-${new Date().getFullYear()}-${String(
                    contracts.length + 1
                ).padStart(3, '0')}`,
                title: contractData.title,
                description: contractData.description,
                type: contractData.type,
                value: contractData.value,
                status: 'draft',
                projectId: selectedProject.id,
                clientId: selectedProject.client.id,
                serviceProviderId: selectedProject.serviceProvider.id,
                startDate: contractData.startDate,
                endDate: contractData.endDate,
                paymentTerms: contractData.paymentTerms.map((term, index) => ({
                    ...term,
                    id: `term-${Date.now()}-${index}`,
                    status: 'pending' as const,
                })),
                createdAt: new Date().toISOString(),
            };

            setContracts((prev) => [...prev, newContract]);

            return {
                success: true,
                message: `Contrato ${newContract.number} criado com sucesso!`,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Erro ao criar contrato',
            };
        }
    };

    return {
        projects,
        selectedProject,
        selectedProjectId,
        setSelectedProjectId,
        contracts: projectContracts,
        kpiData,
        createContract,
        contractTableData: MOCK_CONTRACT_TABLE_DATA,
    };
};
