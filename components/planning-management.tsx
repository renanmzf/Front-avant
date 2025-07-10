'use client';

import { Plus, BarChart3, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlanningSummaryCards } from './planning-summary-cards';
import { StagesPlanningTable } from './stages-planning-table';
import { CreateStageForm } from './create-stage-form';
import { CreateExecutionForm } from './create-execution-form';
import { usePlanningManagement } from '../hooks/use-planning-management';
import { usePathname } from 'next/navigation';

export default function PlanningManagement() {
    const {
        planningData,
        stageForm,
        executionForm,
        isSubmitting,
        showCreateStage,
        showCreateExecution,
        setShowCreateStage,
        setShowCreateExecution,
        createStage,
        createExecution,
    } = usePlanningManagement();

    const pathname = usePathname();
    
    const showCard = !pathname.startsWith('/cliente');

    const handleAddExecution = (stageId: string) => {
        executionForm.setValue('stageId', stageId);
        setShowCreateExecution(true);
    };

    const handleViewDetails = (stageId: string) => {
        // TODO: Implement stage details view
        console.log('Ver detalhes da etapa:', stageId);
        alert('Funcionalidade de detalhes será implementada em breve!');
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <BarChart3 className="h-8 w-8 text-blue-600" />
                            PLANEJAMENTO
                        </h1>
                        <p className="text-gray-600">
                            Controle de planejamento vs execução do projeto
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            📋 {planningData.projectName}
                        </p>
                    </div>
                    {showCard && (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                            onClick={() => setShowCreateStage(true)}
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Nova Etapa
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowCreateExecution(true)}
                            className="flex items-center gap-2 bg-transparent"
                        >
                            <Calculator className="h-4 w-4" />
                            Novo Lançamento
                        </Button>
                    </div>
                    )}
                </div>
            </div>

            <div className="space-y-8">
                {/* Summary Cards */}
                <PlanningSummaryCards data={planningData} />

                {/* Create Stage Form */}
                {showCreateStage && (
                    <CreateStageForm
                        form={stageForm}
                        isSubmitting={isSubmitting}
                        onSubmit={createStage}
                        onCancel={() => setShowCreateStage(false)}
                    />
                )}

                {/* Create Execution Form */}
                {showCreateExecution && (
                    <CreateExecutionForm
                        form={executionForm}
                        stages={planningData.stages}
                        isSubmitting={isSubmitting}
                        onSubmit={createExecution}
                        onCancel={() => setShowCreateExecution(false)}
                    />
                )}

                {/* Stages Table */}
                <StagesPlanningTable
                    stages={planningData.stages}
                    onAddExecution={handleAddExecution}
                    onViewDetails={handleViewDetails}
                />
            </div>
        </div>
    );
}
