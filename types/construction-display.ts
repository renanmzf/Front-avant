import type React from 'react';
export interface ConstructionData {
    // Contractor section
    contractorName: string;
    contractorCpfCnpj: string;
    contractorPhone: string;
    contractorAddress: string;
    contractorEmail: string;
    technicalResponsible: string;
    technicalDoc: string;
    technicalNumber: string;

    // Client section
    clientName: string;
    clientCpfCnpj: string;
    contractNumber: string;

    // Work details
    workDescription: string;
    workLocation: string;
    workStartDate: string;
    workDeadlineDays: string;
    workEndDate: string;
    workResponsible: string;
    workResponsibleDoc: string;
    workResponsibleNumber: string;

    // Technical team
    technicalTeam: TechnicalTeamMember[];
}

export interface TechnicalTeamMember {
    id: string;
    name: string;
    registryType: 'CAU' | 'CREA' | 'CFT' | 'CRQ' | 'OUTROS';
    registryNumber: string;
    qualification: string;
    service: string;
    phone?: string;
    email?: string;
}

export interface DisplaySectionProps {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}

export interface InfoFieldProps {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface TechnicalTeamDisplayProps {
    data: ConstructionData;
}
