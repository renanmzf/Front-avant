'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    createStageSchema,
    createExecutionSchema,
} from '../schemas/planning-schemas';
import {
    mockPlanningData,
    mockExecutionEntries,
} from '../data/planning-mock-data';
import type {
    PlanningData,
    CreateStageData,
    CreateExecutionData,
    ExecutionEntry,
    ProjectStage,
} from '../types/planning';

export const usePlanningManagement = () => {
    const [planningData, setPlanningData] =
        useState<PlanningData>(mockPlanningData);
    const [executionEntries, setExecutionEntries] =
        useState<ExecutionEntry[]>(mockExecutionEntries);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCreateStage, setShowCreateStage] = useState(false);
    const [showCreateExecution, setShowCreateExecution] = useState(false);

    const stageForm = useForm<CreateStageData>({
        resolver: zodResolver(createStageSchema),
        defaultValues: {
            name: '',
            description: '',
            plannedValue: 0,
        },
    });

    const executionForm = useForm<CreateExecutionData>({
        resolver: zodResolver(createExecutionSchema),
        defaultValues: {
            stageId: '',
            description: '',
            value: 0,
            date: '',
            category: 'MATERIAL',
        },
    });

    const calculateStageExecutedValue = (stageId: string): number => {
        return executionEntries
            .filter((entry) => entry.stageId === stageId)
            .reduce((total, entry) => total + entry.value, 0);
    };

    const updateStageCalculations = (
        stages: ProjectStage[]
    ): ProjectStage[] => {
        return stages.map((stage) => {
            const executedValue = calculateStageExecutedValue(stage.id);
            const difference = stage.plannedValue - executedValue;

            let status = stage.status;
            if (executedValue === 0) {
                status = 'NAO_INICIADO';
            } else if (executedValue >= stage.plannedValue) {
                status = 'CONCLUIDO';
            } else {
                status = 'EM_ANDAMENTO';
            }

            return {
                ...stage,
                executedValue,
                difference,
                status,
                updatedAt: new Date(),
            };
        });
    };

    const createStage = async (data: CreateStageData) => {
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const newStage: ProjectStage = {
                id: Date.now().toString(),
                ...data,
                executedValue: 0,
                difference: -data.plannedValue,
                status: 'NAO_INICIADO',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            setPlanningData((prev) => {
                const updatedStages = [...prev.stages, newStage];
                const totalPlanned = updatedStages.reduce(
                    (sum, stage) => sum + stage.plannedValue,
                    0
                );
                const totalExecuted = updatedStages.reduce(
                    (sum, stage) => sum + stage.executedValue,
                    0
                );

                return {
                    ...prev,
                    stages: updatedStages,
                    totalPlanned,
                    totalExecuted,
                    totalDifference: totalPlanned - totalExecuted,
                };
            });

            stageForm.reset();
            setShowCreateStage(false);
            return { success: true, message: 'Etapa criada com sucesso!' };
        } catch (error) {
            throw new Error('Erro ao criar etapa');
        } finally {
            setIsSubmitting(false);
        }
    };

    const createExecution = async (data: CreateExecutionData) => {
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const newExecution: ExecutionEntry = {
                id: Date.now().toString(),
                ...data,
                createdAt: new Date(),
            };

            setExecutionEntries((prev) => [...prev, newExecution]);

            // Update planning data with recalculated values
            setPlanningData((prev) => {
                const updatedStages = updateStageCalculations(prev.stages);
                const totalPlanned = updatedStages.reduce(
                    (sum, stage) => sum + stage.plannedValue,
                    0
                );
                const totalExecuted = updatedStages.reduce(
                    (sum, stage) => sum + stage.executedValue,
                    0
                );

                return {
                    ...prev,
                    stages: updatedStages,
                    totalPlanned,
                    totalExecuted,
                    totalDifference: totalPlanned - totalExecuted,
                };
            });

            executionForm.reset();
            setShowCreateExecution(false);
            return {
                success: true,
                message: 'Lançamento adicionado com sucesso!',
            };
        } catch (error) {
            throw new Error('Erro ao adicionar lançamento');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStageExecutions = (stageId: string) => {
        return executionEntries.filter((entry) => entry.stageId === stageId);
    };

    return {
        planningData,
        executionEntries,
        stageForm,
        executionForm,
        isSubmitting,
        showCreateStage,
        showCreateExecution,
        setShowCreateStage,
        setShowCreateExecution,
        createStage,
        createExecution,
        getStageExecutions,
    };
};
