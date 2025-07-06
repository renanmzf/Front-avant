import * as z from 'zod';

const workShiftSchema = z.object({
    entrada: z.string().optional(),
    saida: z.string().optional(),
    tempo: z.string().optional(),
    status: z.string().optional(),
    eficiencia: z.string().optional(),
});

const workforceSchema = z.object({
    gerenteContratos: z.number().min(0).default(0),
    engenheiroResidente: z.number().min(0).default(0),
    engenheiroSeguranca: z.number().min(0).default(0),
    auxiliarPlanejamento: z.number().min(0).default(0),
    tecnicoPlanejamentoMedicao: z.number().min(0).default(0),
    tecnicoEdificacoes: z.number().min(0).default(0),
    tecnicoSeguranca: z.number().min(0).default(0),
    estagiarios: z.number().min(0).default(0),
    encarregadoGeral: z.number().min(0).default(0),
    encarregadoForma: z.number().min(0).default(0),
    encarregadoArmacao: z.number().min(0).default(0),
    chefeEscritorioObra: z.number().min(0).default(0),
    auxiliarAdministrativo: z.number().min(0).default(0),
    ferramenteiro: z.number().min(0).default(0),
    eletricistaManutencao: z.number().min(0).default(0),
    topografo: z.number().min(0).default(0),
    auxiliarTopografia: z.number().min(0).default(0),
    serventeLimpeza: z.number().min(0).default(0),
    peitor: z.number().min(0).default(0),
    almoxarife: z.number().min(0).default(0),
    motorista: z.number().min(0).default(0),
    vigia: z.number().min(0).default(0),
});

const equipmentSchema = z.object({
    automovel: z.number().min(0).default(0),
    retroescavadeira: z.number().min(0).default(0),
    caminhaoBasculante: z.number().min(0).default(0),
    betoneiraEletrica: z.number().min(0).default(0),
    serraCircularBancada: z.number().min(0).default(0),
    maquinaPolicorte: z.number().min(0).default(0),
    vibradoresImersao: z.number().min(0).default(0),
    compactadorPlacaVibratoria: z.number().min(0).default(0),
    escavadeira: z.number().min(0).default(0),
    maquinaMakita: z.number().min(0).default(0),
    onibusPassageiro: z.number().min(0).default(0),
    acabadoraPiso: z.number().min(0).default(0),
    caminhaoComboio: z.number().min(0).default(0),
    motoniveladora: z.number().min(0).default(0),
    bombaLanca: z.number().min(0).default(0),
    aparelhoTopografia: z.number().min(0).default(0),
    caminhaoMunck: z.number().min(0).default(0),
    marteleteEletrico: z.number().min(0).default(0),
    transformadorEnergia: z.number().min(0).default(0),
    caminhaoPipa: z.number().min(0).default(0),
    furadeiraImpacto: z.number().min(0).default(0),
    bombaSubmersivel2: z.number().min(0).default(0),
});

const shiftSelectionSchema = z.object({
    morning: z.boolean().default(false),
    afternoon: z.boolean().default(false),
    night: z.boolean().default(false),
});

export const dailyReportSchema = z.object({
    reportNumber: z.string().min(1, 'Número do relatório é obrigatório'),
    reportDate: z.string().min(1, 'Data do relatório é obrigatória'),
    deadlineProgress: z.string().min(1, 'Progresso do prazo é obrigatório'),
    isUsefulWorkDay: z.string().min(1, 'Seleção do tipo de dia é obrigatória'),
    fiscalVisitApproval: z.boolean(),
    shiftSelection: shiftSelectionSchema,
    morningShift: workShiftSchema,
    afternoonShift: workShiftSchema,
    nightShift: workShiftSchema,
    workforce: workforceSchema,
    equipment: equipmentSchema,
    activities: z.array(
        z.object({
            id: z.string(),
            description: z
                .string()
                .min(1, 'Descrição da atividade é obrigatória'),
            status: z.string().min(1, 'Status da atividade é obrigatório'),
        })
    ),
    occurrences: z.array(
        z.object({
            id: z.string(),
            description: z
                .string()
                .min(1, 'Descrição da ocorrência é obrigatória'),
        })
    ),
    generalComments: z.string().optional(),
});
