import type { ContractSummary, ContractTableData } from "../types/contract-management"

export const PAYMENT_METHOD_LABELS = {
  pix: "PIX",
  dinheiro: "Dinheiro",
  cheque: "Cheque",
  transferencia: "Transferência",
  cartao: "Cartão",
} as const

// Add contract type to the ContractSummary interface and mock data

export const CONTRACT_TYPE_LABELS = {
  medicao: "Medição",
  empreitada: "Empreitada Global",
  projeto: "Projeto",
} as const

// Update MOCK_CONTRACT_SUMMARIES to include contractType
export const MOCK_CONTRACT_SUMMARIES: ContractSummary[] = [
  {
    id: "summary-1",
    number: 1,
    supplierName: "ANDRESSA",
    contractType: "empreitada",
    contractValue: 140000,
    paidAmount: 48000,
    remainingAmount: 92000,
    clientPayments: [
      { id: "cp-1", number: 1, date: "05/11/2024", value: 4000, paymentMethod: "pix" },
      { id: "cp-2", number: 8, date: "11/12/2024", value: 4000, paymentMethod: "pix" },
      { id: "cp-3", number: 11, date: "27/12/2024", value: 4000, paymentMethod: "pix" },
      { id: "cp-4", number: 13, date: "10/01/2025", value: 4000, paymentMethod: "pix" },
      { id: "cp-5", number: 18, date: "24/01/2025", value: 4000, paymentMethod: "pix" },
      { id: "cp-6", number: 26, date: "24/02/2025", value: 4000, paymentMethod: "pix" },
      { id: "cp-7", number: 37, date: "27/03/2025", value: 4000, paymentMethod: "pix" },
      { id: "cp-8", number: 38, date: "28/03/2025", value: 4000, paymentMethod: "pix" },
      { id: "cp-9", number: 49, date: "12/05/2025", value: 4000, paymentMethod: "pix" },
      { id: "cp-10", number: 50, date: "13/05/2025", value: 4000, paymentMethod: "pix" },
      { id: "cp-11", number: 54, date: "06/06/2025", value: 4000, paymentMethod: "pix" },
      { id: "cp-12", number: 56, date: "09/06/2025", value: 4000, paymentMethod: "pix" },
    ],
    supplierPayments: [
      { id: "sp-1", number: 5, date: "06/12/2024", value: 500, paymentMethod: "pix" },
      { id: "sp-2", number: 9, date: "16/12/2024", value: 1500, paymentMethod: "dinheiro" },
      { id: "sp-3", number: 21, date: "07/02/2025", value: 1000, paymentMethod: "pix" },
      { id: "sp-4", number: 24, date: "14/02/2025", value: 700, paymentMethod: "cheque" },
      { id: "sp-5", number: 28, date: "28/02/2025", value: 500, paymentMethod: "pix" },
      { id: "sp-6", number: 39, date: "28/03/2025", value: 500, paymentMethod: "pix" },
      { id: "sp-7", number: 61, date: "20/06/2025", value: 1500, paymentMethod: "pix" },
    ],
  },
  {
    id: "summary-2",
    number: 2,
    supplierName: "TONINHO",
    contractType: "medicao",
    contractValue: 65000,
    paidAmount: 31000,
    remainingAmount: -34000,
    clientPayments: [
      { id: "cp2-1", number: 2, date: "15/11/2024", value: 3250, paymentMethod: "pix" },
      { id: "cp2-2", number: 5, date: "20/11/2024", value: 3250, paymentMethod: "pix" },
      { id: "cp2-3", number: 12, date: "05/01/2025", value: 3250, paymentMethod: "transferencia" },
      { id: "cp2-4", number: 15, date: "15/01/2025", value: 3250, paymentMethod: "pix" },
    ],
    supplierPayments: [
      { id: "sp2-1", number: 3, date: "18/11/2024", value: 2000, paymentMethod: "dinheiro" },
      { id: "sp2-2", number: 7, date: "25/11/2024", value: 1500, paymentMethod: "pix" },
      { id: "sp2-3", number: 14, date: "10/01/2025", value: 2500, paymentMethod: "cheque" },
    ],
  },
  {
    id: "summary-3",
    number: 8,
    supplierName: "ELEANDRO",
    contractType: "projeto",
    contractValue: 20000,
    paidAmount: 6200,
    remainingAmount: -13800,
    clientPayments: [
      { id: "cp3-1", number: 4, date: "25/11/2024", value: 2000, paymentMethod: "pix" },
      { id: "cp3-2", number: 9, date: "30/12/2024", value: 2000, paymentMethod: "pix" },
      { id: "cp3-3", number: 16, date: "20/01/2025", value: 2200, paymentMethod: "transferencia" },
    ],
    supplierPayments: [
      { id: "sp3-1", number: 6, date: "28/11/2024", value: 800, paymentMethod: "pix" },
      { id: "sp3-2", number: 11, date: "02/01/2025", value: 1200, paymentMethod: "dinheiro" },
    ],
  },
  {
    id: "summary-4",
    number: 10,
    supplierName: "AILTON",
    contractType: "empreitada",
    contractValue: 50000,
    paidAmount: 1050,
    remainingAmount: -48950,
    clientPayments: [
      { id: "cp4-1", number: 7, date: "29/11/2024", value: 5000, paymentMethod: "pix" },
      { id: "cp4-2", number: 17, date: "22/01/2025", value: 5000, paymentMethod: "transferencia" },
    ],
    supplierPayments: [{ id: "sp4-1", number: 10, date: "01/01/2025", value: 1050, paymentMethod: "pix" }],
  },
]

export const MOCK_CONTRACT_TABLE_DATA: ContractTableData = {
  summaries: MOCK_CONTRACT_SUMMARIES,
  totalContractValue: MOCK_CONTRACT_SUMMARIES.reduce((sum, item) => sum + item.contractValue, 0),
  totalPaidAmount: MOCK_CONTRACT_SUMMARIES.reduce((sum, item) => sum + item.paidAmount, 0),
  totalRemainingAmount: MOCK_CONTRACT_SUMMARIES.reduce((sum, item) => sum + item.remainingAmount, 0),
}
