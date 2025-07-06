export type ContractType = "project" | "labor_supply" | "construction_administration"

export type ContractStatus = "active" | "completed" | "pending" | "cancelled" | "in_progress"

export type PaymentStatus = "paid" | "pending" | "overdue" | "cancelled"

export interface Payment {
  id: string
  amount: number
  dueDate: string
  paidDate?: string
  status: PaymentStatus
  description: string
  receiptUrl?: string
}

export interface Contract {
  id: string
  title: string
  type: ContractType
  status: ContractStatus
  clientName: string
  clientId: string
  totalValue: number
  signatureDate: string
  startDate: string
  endDate?: string
  scope: string
  contractUrl?: string
  signedContractUrl?: string
  payments: Payment[]
  serviceProviderId?: string // For construction administration
  serviceProviderName?: string
}

export interface Project {
  id: string
  name: string
  clientName: string
  clientId: string
  contracts: Contract[]
  totalValue: number
  contractCount: number
}

export interface ContractDetailsProps {
  contract: Contract
  onClose: () => void
}

export interface PaymentTableProps {
  payments: Payment[]
  onDownloadReceipt: (paymentId: string) => void
}

export interface ContractSummaryProps {
  contract: Contract
  onDownloadContract: () => void
  onDownloadSignedContract: () => void
}
