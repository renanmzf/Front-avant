export interface User {
    id: string;
    fullName: string;
    email: string;
    cpfCnpj: string;
    userType: UserType;
    projectIds: string[];
    canViewRDO: boolean;
    status: UserStatus;
    createdAt: Date;
    phone?: string;
}

export type UserType = 'CLIENTE' | 'PRESTADOR' | 'ADMINISTRADOR';
export type UserStatus = 'ATIVO' | 'INATIVO' | 'PENDENTE';

export interface Project {
    id: string;
    name: string;
    owner: string;
    workType: string;
}

export interface CreateUserData {
    fullName: string;
    email: string;
    cpfCnpj: string;
    userType: UserType;
    projectIds: string[];
    canViewRDO: boolean;
    phone?: string;
}

export interface UserManagementProps {
    onCreateUser: (data: CreateUserData) => Promise<void>;
    onEditUser: (id: string, data: Partial<User>) => Promise<void>;
    onDeleteUser: (id: string) => Promise<void>;
    onToggleUserStatus: (id: string) => Promise<void>;
}
