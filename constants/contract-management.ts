import type {
    Project,
    Client,
    ServiceProvider,
    KPIData,
} from '../types/contract-management';

export const WORK_TYPES = [
    'Residencial Unifamiliar',
    'Residencial Multifamiliar',
    'Comercial',
    'Industrial',
    'Reforma',
    'Infraestrutura',
] as const;

export const CONTRACT_TYPES = [
    {
        value: 'empreitada',
        label: 'Empreitada',
        description: 'Valor fixo por obra completa',
    },
    {
        value: 'medicao',
        label: 'Medição',
        description: 'Pagamento por medição de serviços',
    },
    {
        value: 'projeto',
        label: 'Projeto',
        description: 'Desenvolvimento de projetos técnicos',
    },
] as const;

// Mock data
export const MOCK_CLIENTS: Client[] = [
    {
        id: 'client-1',
        name: 'João Silva Santos',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-1111',
        document: '123.456.789-00',
    },
    {
        id: 'client-2',
        name: 'Maria Oliveira Costa',
        email: 'maria.oliveira@email.com',
        phone: '(11) 99999-2222',
        document: '987.654.321-00',
    },
    {
        id: 'client-3',
        name: 'Empresa ABC Ltda',
        email: 'contato@empresaabc.com.br',
        phone: '(11) 99999-3333',
        document: '12.345.678/0001-90',
    },
];

export const MOCK_SERVICE_PROVIDERS: ServiceProvider[] = [
    {
        id: 'provider-1',
        name: 'Construtora Silva & Cia',
        email: 'contato@silvaecia.com.br',
        phone: '(11) 99999-4444',
        document: '11.222.333/0001-44',
        specialty: 'Construção Civil',
    },
    {
        id: 'provider-2',
        name: 'Reformas Premium Ltda',
        email: 'contato@reformaspremium.com.br',
        phone: '(11) 99999-5555',
        document: '22.333.444/0001-55',
        specialty: 'Reformas e Acabamentos',
    },
    {
        id: 'provider-3',
        name: 'Projetos Arquitetônicos XYZ',
        email: 'projetos@arquiteturalxyz.com.br',
        phone: '(11) 99999-6666',
        document: '33.444.555/0001-66',
        specialty: 'Projetos e Consultoria',
    },
];

export const MOCK_PROJECTS: Project[] = [
    {
        id: 'project-1',
        name: 'Residência Alphaville',
        owner: 'João Silva Santos',
        address: 'Rua das Flores, 123, Alphaville, Barueri - SP',
        openingDate: '2024-01-15',
        workType: 'Residencial Unifamiliar',
        client: MOCK_CLIENTS[0],
        serviceProvider: MOCK_SERVICE_PROVIDERS[0],
        linkedContracts: [],
        createdAt: '2024-01-15',
    },
    {
        id: 'project-2',
        name: 'Reforma Apartamento Centro',
        owner: 'Maria Oliveira Costa',
        address: 'Av. Paulista, 1000, Apt 45, São Paulo - SP',
        openingDate: '2024-02-01',
        workType: 'Reforma',
        client: MOCK_CLIENTS[1],
        serviceProvider: MOCK_SERVICE_PROVIDERS[1],
        linkedContracts: [],
        createdAt: '2024-02-01',
    },
    {
        id: 'project-3',
        name: 'Edifício Comercial ABC',
        owner: 'Empresa ABC Ltda',
        address: 'Rua Comercial, 500, Vila Olímpia, São Paulo - SP',
        openingDate: '2024-03-01',
        workType: 'Comercial',
        client: MOCK_CLIENTS[2],
        serviceProvider: MOCK_SERVICE_PROVIDERS[0],
        linkedContracts: [],
        createdAt: '2024-03-01',
    },
];

export const MOCK_KPI_DATA: KPIData = {
    totalReceived: {
        value: 75000,
        expected: 150000,
        trend: 'up',
    },
    totalPaid: {
        value: 52500,
        committed: 100000,
        trend: 'down',
    },
    currentProfit: {
        value: 22500,
        isPositive: true,
    },
    expectedProfit: {
        value: 50000,
        margin: 33.3,
    },
};
