import type { ContractType, ContractStatus, PaymentStatus } from "../types/contracts"

export const CONTRACT_TYPES: Record<ContractType, string> = {
  project: "Projeto",
  labor_supply: "Fornecimento de Mão de Obra",
  construction_administration: "Administração de Obra",
}

export const CONTRACT_STATUS: Record<ContractStatus, { label: string; color: string }> = {
  active: { label: "Ativo", color: "bg-green-100 text-green-800" },
  completed: { label: "Concluído", color: "bg-blue-100 text-blue-800" },
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800" },
  in_progress: { label: "Em Andamento", color: "bg-purple-100 text-purple-800" },
}

export const PAYMENT_STATUS: Record<PaymentStatus, { label: string; color: string }> = {
  paid: { label: "Pago", color: "bg-green-100 text-green-800" },
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
  overdue: { label: "Vencido", color: "bg-red-100 text-red-800" },
  cancelled: { label: "Cancelado", color: "bg-gray-100 text-gray-800" },
}

export const PROJECT_CARD_COLORS = [
  "bg-blue-50 border-blue-200",
  "bg-green-50 border-green-200",
  "bg-purple-50 border-purple-200",
  "bg-orange-50 border-orange-200",
  "bg-pink-50 border-pink-200",
  "bg-indigo-50 border-indigo-200",
]
