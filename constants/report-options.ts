export const STATUS_OPTIONS = [
    { value: 'praticavel', label: 'Praticável' },
    { value: 'impraticavel', label: 'Impraticável' },
    { value: 'parcial', label: 'Parcial' },
] as const;

export const TEMPO_OPTIONS = [
    { value: 'claro', label: 'Claro' },
    { value: 'nublado', label: 'Nublado' },
    { value: 'chuvoso', label: 'Chuvoso' },
    { value: 'garoa', label: 'Garoa' },
] as const;

export const ACTIVITY_STATUS_OPTIONS = [
    { value: 'em_andamento', label: 'Em andamento' },
    { value: 'finalizada', label: 'Finalizada' },
    { value: 'nao_iniciada', label: 'Não iniciada' },
    { value: 'dependencia', label: 'Dependência' },
] as const;

export const USEFUL_DAY_OPTIONS = [
    { value: 'sim', label: 'Sim' },
    { value: 'nao', label: 'Não' },
    { value: 'descanso_domingo', label: 'Descanso semanal - Domingo' },
    { value: 'descanso_sabado', label: 'Descanso semanal - Sábado' },
    { value: 'equipe_dispensada', label: 'Equipe dispensada' },
    { value: 'falta_suprimentos', label: 'Falta de suprimentos' },
    { value: 'feriado_estadual', label: 'Feriado estadual' },
    { value: 'feriado_municipal', label: 'Feriado municipal' },
    { value: 'feriado_nacional', label: 'Feriado nacional' },
] as const;

export const EFFICIENCY_OPTIONS = [
    { value: '0', label: '0%' },
    { value: '10', label: '10%' },
    { value: '20', label: '20%' },
    { value: '30', label: '30%' },
    { value: '40', label: '40%' },
    { value: '50', label: '50%' },
    { value: '60', label: '60%' },
    { value: '70', label: '70%' },
    { value: '80', label: '80%' },
    { value: '90', label: '90%' },
    { value: '100', label: '100%' },
] as const;

export const WORKFORCE_FIELDS = [
    { key: 'gerenteContratos', label: 'Gerente Contratos' },
    { key: 'engenheiroResidente', label: 'Engenheiro Residente' },
    { key: 'engenheiroSeguranca', label: 'Engenheiro de Segurança' },
    { key: 'auxiliarPlanejamento', label: 'Auxiliar de Planejamento' },
    {
        key: 'tecnicoPlanejamentoMedicao',
        label: 'Técnico de Planejamento/medição',
    },
    { key: 'tecnicoEdificacoes', label: 'Técnico de Edificações' },
    { key: 'tecnicoSeguranca', label: 'Técnico de Segurança' },
    { key: 'estagiarios', label: 'Estagiários' },
    { key: 'encarregadoGeral', label: 'Encarregado Geral' },
    { key: 'encarregadoForma', label: 'Encarregado de Forma' },
    { key: 'encarregadoArmacao', label: 'Encarregado de Armação' },
    { key: 'chefeEscritorioObra', label: 'Chefe Escritório de Obra' },
    { key: 'auxiliarAdministrativo', label: 'Auxiliar Administrativo' },
    { key: 'ferramenteiro', label: 'Ferramenteiro' },
    { key: 'eletricistaManutencao', label: 'Eletricista de Manutenção' },
    { key: 'topografo', label: 'Topógrafo' },
    { key: 'auxiliarTopografia', label: 'Auxiliar de Topografia' },
    { key: 'serventeLimpeza', label: 'Servente de Limpeza' },
    { key: 'peitor', label: 'Peitor' },
    { key: 'almoxarife', label: 'Almoxarife' },
    { key: 'motorista', label: 'Motorista' },
    { key: 'vigia', label: 'Vigia' },
] as const;

export const EQUIPMENT_FIELDS = [
    { key: 'automovel', label: 'Automóvel' },
    { key: 'retroescavadeira', label: 'Retroescavadeira' },
    { key: 'caminhaoBasculante', label: 'Caminhão Basculante' },
    { key: 'betoneiraEletrica', label: 'Betoneira Elétrica' },
    { key: 'serraCircularBancada', label: 'Serra circular de bancada' },
    { key: 'maquinaPolicorte', label: 'Máquina de policorte' },
    { key: 'vibradoresImersao', label: 'Vibradores de Imersão' },
    {
        key: 'compactadorPlacaVibratoria',
        label: 'Compactador de placa Vibratória',
    },
    { key: 'escavadeira', label: 'Escavadeira' },
    { key: 'maquinaMakita', label: 'Máquina Makita' },
    { key: 'onibusPassageiro', label: 'Ônibus de Passageiro' },
    { key: 'acabadoraPiso', label: 'Acabadora de Piso' },
    { key: 'caminhaoComboio', label: 'Caminhão comboio' },
    { key: 'motoniveladora', label: 'Motoniveladora' },
    { key: 'bombaLanca', label: 'Bomba Lança' },
    { key: 'aparelhoTopografia', label: 'Aparelho de Topografia' },
    { key: 'caminhaoMunck', label: 'Caminhão Munck' },
    { key: 'marteleteEletrico', label: 'Martelete elétrico' },
    { key: 'transformadorEnergia', label: 'Transformador de Energia' },
    { key: 'caminhaoPipa', label: 'Caminhão Pipa' },
    { key: 'furadeiraImpacto', label: 'Furadeira de impacto' },
    { key: 'bombaSubmersivel2', label: 'Bomba submersível de 2"' },
] as const;
