import type { ConstructionData } from '../types/construction-display';

export const mockConstructionData: ConstructionData = {
    // Contractor section
    contractorName: 'Construtora Silva & Associados Ltda',
    contractorCpfCnpj: '12.345.678/0001-90',
    contractorPhone: '(11) 99999-8888',
    contractorAddress:
        'Rua das Construções, 123, Vila Industrial, São Paulo - SP',
    contractorEmail: 'contato@silvaassociados.com.br',
    technicalResponsible: 'Eng. Carlos Roberto Silva',
    technicalDoc: 'CREA',
    technicalNumber: 'SP-123456/D',

    // Client section
    clientName: 'João Silva Santos',
    clientCpfCnpj: '123.456.789-00',
    contractNumber: 'CONT-2024-001',

    // Work details
    workDescription:
        'Construção de residência unifamiliar de alto padrão com 3 suítes, piscina, área gourmet e garagem para 4 veículos. Projeto inclui acabamentos de primeira linha, sistema de automação residencial e paisagismo completo.',
    workLocation: 'Rua das Palmeiras, 456, Alphaville, Barueri - SP',
    workStartDate: '2024-03-01',
    workDeadlineDays: '365',
    workEndDate: '2025-02-28',
    workResponsible: 'Eng. Ana Paula Oliveira',
    workResponsibleDoc: 'CREA',
    workResponsibleNumber: 'SP-789012/D',

    // Technical team
    technicalTeam: [
        {
            id: '1',
            name: 'Eng. Carlos Roberto Silva',
            registryType: 'CREA',
            registryNumber: 'SP-123456/D',
            qualification: 'Engenheiro Civil',
            service: 'Responsável Técnico Geral',
            phone: '(11) 99999-1111',
            email: 'carlos.silva@silvaassociados.com.br',
        },
        {
            id: '2',
            name: 'Arq. Ana Paula Oliveira',
            registryType: 'CAU',
            registryNumber: 'SP-A78901',
            qualification: 'Arquiteta e Urbanista',
            service: 'Projeto Arquitetônico e Fiscalização',
            phone: '(11) 99999-2222',
            email: 'ana.oliveira@silvaassociados.com.br',
        },
        {
            id: '3',
            name: 'Eng. Roberto Santos',
            registryType: 'CREA',
            registryNumber: 'SP-234567/D',
            qualification: 'Engenheiro Eletricista',
            service: 'Instalações Elétricas e Automação',
            phone: '(11) 99999-3333',
            email: 'roberto.santos@silvaassociados.com.br',
        },
        {
            id: '4',
            name: 'Eng. Maria Fernanda Costa',
            registryType: 'CREA',
            registryNumber: 'SP-345678/D',
            qualification: 'Engenheira Hidráulica',
            service: 'Instalações Hidrossanitárias',
            phone: '(11) 99999-4444',
            email: 'maria.costa@silvaassociados.com.br',
        },
        {
            id: '5',
            name: 'Téc. João Pereira',
            registryType: 'CFT',
            registryNumber: 'SP-T12345',
            qualification: 'Técnico em Edificações',
            service: 'Acompanhamento de Obra',
            phone: '(11) 99999-5555',
        },
    ],
};
