export interface NewProjectData {
    owner: string;
    address: string;
    openingDate: string;
    workType: WorkType;
    clientId: string;
    contractorId: string;
    contractIds: string[];
}

export type WorkType =
    | 'RESIDENCIAL_UNIFAMILIAR'
    | 'RESIDENCIAL_MULTIFAMILIAR'
    | 'COMERCIAL'
    | 'MISTO';

export interface Client {
    id: string;
    name: string;
    cpfCnpj: string;
    email: string;
    phone: string;
}

export interface Contractor {
    id: string;
    name: string;
    cpfCnpj: string;
    email: string;
    phone: string;
}

export interface Contract {
    id: string;
    number: string;
    clientId: string;
    contractorId: string;
    value: number;
    description: string;
}

export interface NewProjectFormProps {
    onSubmit: (data: NewProjectData) => Promise<void>;
    isSubmitting?: boolean;
}
