export interface DailyReportData {
    // Header section
    reportNumber: string;
    reportDate: string;
    deadlineProgress: string;
    isUsefulWorkDay: string; // Changed from boolean to string
    fiscalVisitApproval: boolean;

    // Shift selection
    shiftSelection: ShiftSelection;

    // Work shifts
    morningShift: WorkShift;
    afternoonShift: WorkShift;
    nightShift: WorkShift;

    // Workforce
    workforce: WorkforceData;

    // Equipment
    equipment: EquipmentData;

    // Activities
    activities: Activity[];

    // Occurrences and observations
    occurrences: Occurrence[];

    // General comments
    generalComments: string;
}

export interface ShiftSelection {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
}

export interface WorkShift {
    entrada: string;
    saida: string;
    tempo: string;
    status: string;
    eficiencia: string;
}

export interface WorkforceData {
    gerenteContratos: number;
    engenheiroResidente: number;
    engenheiroSeguranca: number;
    auxiliarPlanejamento: number;
    tecnicoPlanejamentoMedicao: number;
    tecnicoEdificacoes: number;
    tecnicoSeguranca: number;
    estagiarios: number;
    encarregadoGeral: number;
    encarregadoForma: number;
    encarregadoArmacao: number;
    chefeEscritorioObra: number;
    auxiliarAdministrativo: number;
    ferramenteiro: number;
    eletricistaManutencao: number;
    topografo: number;
    auxiliarTopografia: number;
    serventeLimpeza: number;
    peitor: number;
    almoxarife: number;
    motorista: number;
    vigia: number;
}

export interface EquipmentData {
    automovel: number;
    retroescavadeira: number;
    caminhaoBasculante: number;
    betoneiraEletrica: number;
    serraCircularBancada: number;
    maquinaPolicorte: number;
    vibradoresImersao: number;
    compactadorPlacaVibratoria: number;
    escavadeira: number;
    maquinaMakita: number;
    onibusPassageiro: number;
    acabadoraPiso: number;
    caminhaoComboio: number;
    motoniveladora: number;
    bombaLanca: number;
    aparelhoTopografia: number;
    caminhaoMunck: number;
    marteleteEletrico: number;
    transformadorEnergia: number;
    caminhaoPipa: number;
    furadeiraImpacto: number;
    bombaSubmersivel2: number;
}

export interface Activity {
    id: string;
    description: string;
    status: string;
}

export interface Occurrence {
    id: string;
    description: string;
}
