'use client';

import { KPICards } from './kpi-cards';
import { ProjectSelector } from './project-selector';
import { ContractForm } from './contract-form';
import { ContractsList } from './contracts-list';
import { useContractManagement } from '../hooks/use-contract-management';
import { ContractSummaryTable } from './contract-summary-table';

export default function ContractManagementScreen() {
    const {
        projects,
        selectedProject,
        selectedProjectId,
        setSelectedProjectId,
        contracts,
        kpiData,
        createContract,
        contractTableData,
    } = useContractManagement();

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* KPI Cards */}
            <KPICards data={kpiData} className="mb-8" />

            {/* Project Selection */}
            <ProjectSelector
                projects={projects}
                selectedProjectId={selectedProjectId}
                onProjectSelect={setSelectedProjectId}
                className="mb-8"
            />

            {/* Contract Creation and List */}
            {selectedProject && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <ContractForm
                        project={selectedProject}
                        onSubmit={createContract}
                    />
                    <ContractsList contracts={contracts} />
                </div>
            )}

            {!selectedProject && projects.length > 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">
                        Selecione um projeto para começar a criar contratos
                    </p>
                </div>
            )}

            {/* Contract Summary Table */}
            <ContractSummaryTable data={contractTableData} className="mt-8" />
        </div>
    );
}
