import type { DetailedRDO } from '../types/rdo-visualization';

const createDetailedRDO = (
    baseRdo: any,
    overrides: Partial<DetailedRDO> = {}
): DetailedRDO => ({
    ...baseRdo,
    companyName: 'CONSTRUTORA AVANT GARDE',
    companyCode: '427.853.308-03',
    contractNumber: 'Torre 1 Sala 420 - Rua Bragança Paulista - SP',
    workLocation:
        'Rua Piacenza, nº 272, Quadra C Lote 11, Residencial San Vitale, Bragança Paulista - SP',
    client: 'ANDRESSA MENDES GONÇALVES DIAS',
    workStart: '11/11/2024',
    workEnd: '10/11/2025',
    decoratedDeadline: '50 / 365',
    reportDate: '30/12/2024',
    weekDay: 'segunda-feira',
    shifts: [
        {
            period: 'Manhã',
            entry: '07:30',
            exit: '12:00',
            workedHours: '04:30',
            weather: 'Claro',
            conditions: 'Praticável',
            efficiency: '100%',
        },
        {
            period: 'Tarde',
            entry: '13:00',
            exit: '16:40',
            workedHours: '03:40',
            weather: 'Claro',
            conditions: 'Praticável',
            efficiency: '100%',
        },
        {
            period: 'Noite',
            entry: '',
            exit: '',
            workedHours: '00:00',
            weather: 'Claro',
            conditions: 'Praticável',
            efficiency: '',
        },
    ],
    workers: [
        { type: 'Ajudante', direct: 2, indirect: 0 },
        { type: 'Pintor', direct: 2, indirect: 0 },
        { type: 'Pedreiro', direct: 0, indirect: 0 },
        { type: 'Servente', direct: 0, indirect: 0 },
        { type: 'Eletricista', direct: 0, indirect: 0 },
        { type: 'Encanador', direct: 0, indirect: 0 },
        { type: 'Carpinteiro', direct: 0, indirect: 0 },
        { type: 'Ferreiro', direct: 0, indirect: 0 },
        { type: 'Motorista', direct: 0, indirect: 0 },
        { type: 'Topógrafo', direct: 0, indirect: 0 },
        { type: 'Engenheiro', direct: 0, indirect: 0 },
        { type: 'Resp. Tec.', direct: 1, indirect: 0 },
        { type: 'Adm.', direct: 1, indirect: 0 },
        { type: 'Encarregado', direct: 0, indirect: 0 },
        { type: 'Almoxarife', direct: 0, indirect: 0 },
        { type: 'Estagiário', direct: 0, indirect: 0 },
        { type: 'Auxiliar', direct: 0, indirect: 0 },
        { type: 'Topógrafo', direct: 0, indirect: 0 },
        { type: 'Técnico', direct: 0, indirect: 0 },
        { type: 'Arquiteto', direct: 0, indirect: 0 },
    ],
    equipment: [
        { name: 'Retroescavadeira', quantity: 0 },
        { name: 'Bobcat', quantity: 0 },
        { name: 'Escantilhão', quantity: 0 },
        { name: 'Compactador', quantity: 0 },
        { name: 'Caçamba', quantity: 0 },
        { name: 'Rompedor', quantity: 0 },
        { name: 'Andaime', quantity: 0 },
        { name: 'Escora Met.', quantity: 0 },
        { name: 'Container', quantity: 0 },
        { name: 'Vibrador', quantity: 0 },
        { name: 'Furadeira', quantity: 0 },
        { name: 'Perfuratriz', quantity: 0 },
        { name: 'Bomba Concreto', quantity: 0 },
        { name: 'Camin. Betoneira', quantity: 0 },
        { name: 'Camin. Basculante', quantity: 0 },
        { name: 'Betoneira', quantity: 0 },
    ],
    activities: [
        {
            description: 'Abertura de valas de blocos e baldrames',
            status: 'Em andamento',
        },
    ],
    occurrences: '',
    fiscalVisit: true,
    generalComments:
        'Dia útil - Chegou a ferragem dos pilares da garagem, para início da execução do muro de arrimo.',
    responsibleEngineer: {
        name: 'Renan Mazuchelli Fernandes',
        registration: 'CAU A1746081',
    },
    fiscalEngineer: {
        name: 'Eleandro Fernando de Campos',
        registration: 'CPF 296.357.708-71',
    },
    ...overrides,
});

export const DETAILED_MOCK_RDOS: DetailedRDO[] = [
    createDetailedRDO(
        {
            id: 'rdo-169',
            number: '169',
            date: '29/02/2024',
            description: 'Execução de superestrutura, alvenaria',
            climate: 'Nublado/Claro',
            teamSize: 6,
            pdfUrl: '/pdfs/rdo-169.pdf',
        },
        {
            activities: [
                {
                    description: 'Execução de superestrutura',
                    status: 'Em andamento',
                },
                { description: 'Alvenaria de vedação', status: 'Em andamento' },
            ],
            workers: [
                { type: 'Ajudante', direct: 2, indirect: 0 },
                { type: 'Pedreiro', direct: 3, indirect: 0 },
                { type: 'Servente', direct: 1, indirect: 0 },
            ],
        }
    ),
    createDetailedRDO(
        {
            id: 'rdo-168',
            number: '168',
            date: '28/02/2024',
            description: 'Montagem de lajes pré-fabricadas',
            climate: 'Ensolarado',
            teamSize: 5,
            pdfUrl: '/pdfs/rdo-168.pdf',
        },
        {
            activities: [
                {
                    description: 'Montagem de lajes pré-fabricadas',
                    status: 'Concluído',
                },
            ],
            workers: [
                { type: 'Ajudante', direct: 2, indirect: 0 },
                { type: 'Pedreiro', direct: 2, indirect: 0 },
                { type: 'Motorista', direct: 1, indirect: 0 },
            ],
            equipment: [
                { name: 'Retroescavadeira', quantity: 1 },
                { name: 'Caçamba', quantity: 1 },
            ],
        }
    ),
    createDetailedRDO(
        {
            id: 'rdo-167',
            number: '167',
            date: '27/02/2024',
            description: 'Concretagem da estrutura',
            climate: 'Parcialmente nublado',
            teamSize: 8,
            pdfUrl: '/pdfs/rdo-167.pdf',
        },
        {
            activities: [
                {
                    description: 'Concretagem da estrutura principal',
                    status: 'Concluído',
                },
            ],
            workers: [
                { type: 'Ajudante', direct: 3, indirect: 0 },
                { type: 'Pedreiro', direct: 3, indirect: 0 },
                { type: 'Servente', direct: 2, indirect: 0 },
            ],
            equipment: [
                { name: 'Bomba Concreto', quantity: 1 },
                { name: 'Camin. Betoneira', quantity: 2 },
                { name: 'Vibrador', quantity: 2 },
            ],
        }
    ),
];
