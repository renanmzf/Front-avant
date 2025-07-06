export const USER_TYPES = [
  { value: "CLIENTE", label: "Cliente", description: "Proprietário ou contratante da obra" },
  { value: "PRESTADOR", label: "Prestador", description: "Empresa ou profissional que executa a obra" },
  { value: "ADMINISTRADOR", label: "Administrador", description: "Usuário com acesso total ao sistema" },
] as const

export const USER_STATUS = [
  { value: "ATIVO", label: "Ativo", color: "bg-green-100 text-green-800" },
  { value: "INATIVO", label: "Inativo", color: "bg-red-100 text-red-800" },
  { value: "PENDENTE", label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
] as const

export const RDO_ACCESS_OPTIONS = [
  { value: true, label: "Sim" },
  { value: false, label: "Não" },
] as const
