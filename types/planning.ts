export interface ProjectStage {
    id: string;
    name: string;
    description: string;
    plannedValue: number;
    executedValue: number;
    difference: number;
    status: StageStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type StageStatus =
    | 'NAO_INICIADO'
    | 'EM_ANDAMENTO'
    | 'CONCLUIDO'
    | 'ATRASADO';

export interface ExecutionEntry {
    id: string;
    stageId: string;
    description: string;
    value: number;
    date: string;
    category: string;
    createdAt: Date;
}

export interface PlanningData {
    projectId: string;
    projectName: string;
    totalPlanned: number;
    totalExecuted: number;
    totalDifference: number;
    stages: ProjectStage[];
}

export interface CreateStageData {
    name: string;
    description: string;
    plannedValue: number;
}

export interface CreateExecutionData {
    stageId: string;
    description: string;
    value: number;
    date: string;
    category: string;
}
