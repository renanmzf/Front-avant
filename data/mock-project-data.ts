import type { Client, Contractor, Contract } from '../types/new-project';

export const mockClients: Client[] = [
    {
        id: '1',
        name: 'João Silva Santos',
        cpfCnpj: '123.456.789-00',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-1111',
    },
    {
        id: '2',
        name: 'Maria Santos Oliveira',
        cpfCnpj: '987.654.321-00',
        email: 'maria.santos@email.com',
        phone: '(11) 99999-2222',
    },
    {
        id: '3',
        name: 'Empresa ABC Ltda',
        cpfCnpj: '12.345.678/0001-90',
        email: 'contato@empresaabc.com.br',
        phone: '(11) 99999-3333',
    },
    {
        id: '4',
        name: 'Pedro Costa Lima',
        cpfCnpj: '456.789.123-00',
        email: 'pedro.costa@email.com',
        phone: '(11) 99999-4444',
    },
];

export const mockContractors: Contractor[] = [
    {
        id: '1',
        name: 'Construtora Silva & Associados Ltda',
        cpfCnpj: '12.345.678/0001-90',
        email: 'contato@silvaassociados.com.br',
        phone: '(11) 99999-8888',
    },
    {
        id: '2',
        name: 'Engenharia Costa & Filhos',
        cpfCnpj: '98.765.432/0001-10',
        email: 'contato@costafilhos.com.br',
        phone: '(11) 99999-7777',
    },
    {
        id: '3',
        name: 'Construtora Moderna S.A.',
        cpfCnpj: '11.222.333/0001-44',
        email: 'contato@moderna.com.br',
        phone: '(11) 99999-6666',
    },
];

export const mockContracts: Contract[] = [
    {
        id: '1',
        number: 'CONT-2024-001',
        clientId: '1',
        contractorId: '1',
        value: 250000,
        description: 'Construção de residência unifamiliar',
    },
    {
        id: '2',
        number: 'CONT-2024-002',
        clientId: '2',
        contractorId: '1',
        value: 70000,
        description: 'Reforma de apartamento',
    },
    {
        id: '3',
        number: 'CONT-2024-003',
        clientId: '3',
        contractorId: '2',
        value: 350000,
        description: 'Construção de edifício comercial',
    },
    {
        id: '4',
        number: 'CONT-2024-004',
        clientId: '1',
        contractorId: '1',
        value: 120000,
        description: 'Construção de piscina e área gourmet',
    },
    {
        id: '5',
        number: 'CONT-2024-005',
        clientId: '4',
        contractorId: '3',
        value: 180000,
        description: 'Reforma completa de casa',
    },
];
