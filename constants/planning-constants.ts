export const STAGE_STATUS_OPTIONS = [
  { value: "NAO_INICIADO", label: "Não Iniciado", color: "bg-gray-100 text-gray-800" },
  { value: "EM_ANDAMENTO", label: "Em Andamento", color: "bg-blue-100 text-blue-800" },
  { value: "CONCLUIDO", label: "Concluído", color: "bg-green-100 text-green-800" },
  { value: "ATRASADO", label: "Atrasado", color: "bg-red-100 text-red-800" },
] as const

export const EXECUTION_CATEGORIES = [
  { value: "MATERIAL", label: "Material" },
  { value: "MAO_DE_OBRA", label: "Mão de Obra" },
  { value: "EQUIPAMENTO", label: "Equipamento" },
  { value: "SERVICO_TERCEIRO", label: "Serviço de Terceiros" },
  { value: "OUTROS", label: "Outros" },
] as const
