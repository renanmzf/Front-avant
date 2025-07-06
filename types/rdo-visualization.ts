export interface RDO {
    id: string;
    number: string;
    date: string;
    description: string;
    climate: string;
    teamSize: number;
    pdfUrl?: string;
}

export interface WorkShift {
    period: 'Manhã' | 'Tarde' | 'Noite';
    entry: string;
    exit: string;
    workedHours: string;
    weather: 'Claro' | 'Parcialmente nublado' | 'Chuvoso' | 'Nublado';
    conditions: 'Praticável' | 'Impraticável' | 'Parcial';
    efficiency: string;
}

export interface WorkerCategory {
    type: string;
    direct: number;
    indirect: number;
}

export interface Equipment {
    name: string;
    quantity: number;
}

export interface Activity {
    description: string;
    status: 'Em andamento' | 'Concluído' | 'Pausado' | 'Não iniciado';
}

export interface DetailedRDO extends RDO {
    companyName: string;
    companyCode: string;
    contractNumber: string;
    workLocation: string;
    client: string;
    workStart: string;
    workEnd: string;
    decoratedDeadline: string;
    reportDate: string;
    weekDay: string;
    shifts: WorkShift[];
    workers: WorkerCategory[];
    equipment: Equipment[];
    activities: Activity[];
    occurrences: string;
    fiscalVisit: boolean;
    generalComments: string;
    responsibleEngineer: {
        name: string;
        registration: string;
    };
    fiscalEngineer: {
        name: string;
        registration: string;
    };
}

export interface RDOVisualizationProps {
    rdos: RDO[];
    className?: string;
}

export interface BulkDownloadOptions {
    downloadAll: boolean;
    selectedIds: string[];
}
