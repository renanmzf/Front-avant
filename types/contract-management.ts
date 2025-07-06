export interface Project {
  id: string
  name: string
  owner: string
  address: string
  openingDate: string
  workType: string
  client: Client
  serviceProvider: ServiceProvider
  linkedContracts: Contract[]
  createdAt: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  document: string
}

export interface ServiceProvider {
  id: string
  name: string
  email: string
  phone: string
  document: string
  specialty: string
}

export interface Contract {
  id: string
  number: string
  title: string
  description: string
  type: ContractType
  value: number
  status: ContractStatus
  projectId: string
  clientId: string
  serviceProviderId: string
  startDate: string
  endDate?: string
  paymentTerms: PaymentTerm[]
  createdAt: string
}

export type ContractType = "empreitada" | "medicao" | "projeto"

export type ContractStatus = "draft" | "active" | "completed" | "cancelled"

export interface PaymentTerm {
  id: string
  description: string
  percentage: number
  amount: number
  dueDate: string
  status: "pending" | "paid" | "overdue"
}

export interface ContractFormData {
  title: string
  description: string
  type: ContractType
  value: number
  startDate: string
  endDate: string
  paymentTerms: Omit<PaymentTerm, "id" | "status">[]
}

export interface KPIData {
  totalReceived: {
    value: number
    expected: number
    trend: "up" | "down"
  }
  totalPaid: {
    value: number
    committed: number
    trend: "up" | "down"
  }
  currentProfit: {
    value: number
    isPositive: boolean
  }
  expectedProfit: {
    value: number
    margin: number
  }
}

export interface ContractSummary {
  id: string
  number: number
  supplierName: string
  contractType: "medicao" | "empreitada" | "projeto"
  contractValue: number
  paidAmount: number
  remainingAmount: number
  clientPayments: PaymentEntry[]
  supplierPayments: PaymentEntry[]
}

export interface PaymentEntry {
  id: string
  number: number
  date: string
  value: number
  paymentMethod: PaymentMethod
  description?: string
}

export type PaymentMethod = "pix" | "dinheiro" | "cheque" | "transferencia" | "cartao"

export interface ContractTableData {
  summaries: ContractSummary[]
  totalContractValue: number
  totalPaidAmount: number
  totalRemainingAmount: number
}
