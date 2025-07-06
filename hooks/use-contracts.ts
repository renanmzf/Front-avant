"use client"

import { useState, useMemo } from "react"
import type { Project, Contract } from "../types/contracts"

// Mock data
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Residência Alphaville",
    clientName: "João Silva",
    clientId: "client-1",
    contractCount: 3,
    totalValue: 250000,
    contracts: [
      {
        id: "contract-1",
        title: "Projeto Arquitetônico",
        type: "project",
        status: "completed",
        clientName: "João Silva",
        clientId: "client-1",
        totalValue: 50000,
        signatureDate: "2024-01-15",
        startDate: "2024-01-20",
        endDate: "2024-03-15",
        scope:
          "Desenvolvimento do projeto arquitetônico completo da residência, incluindo plantas baixas, cortes, fachadas e detalhamentos.",
        contractUrl: "/contracts/contract-1.pdf",
        signedContractUrl: "/contracts/contract-1-signed.pdf",
        payments: [
          {
            id: "payment-1",
            amount: 25000,
            dueDate: "2024-02-01",
            paidDate: "2024-01-30",
            status: "paid",
            description: "Primeira parcela - Projeto",
            receiptUrl: "/receipts/receipt-1.pdf",
          },
          {
            id: "payment-2",
            amount: 25000,
            dueDate: "2024-03-01",
            paidDate: "2024-02-28",
            status: "paid",
            description: "Segunda parcela - Projeto",
            receiptUrl: "/receipts/receipt-2.pdf",
          },
        ],
      },
      {
        id: "contract-2",
        title: "Execução da Obra",
        type: "construction_administration",
        status: "in_progress",
        clientName: "João Silva",
        clientId: "client-1",
        totalValue: 180000,
        signatureDate: "2024-03-20",
        startDate: "2024-04-01",
        scope:
          "Administração e execução completa da obra residencial, incluindo fundação, estrutura, alvenaria, instalações e acabamentos.",
        contractUrl: "/contracts/contract-2.pdf",
        signedContractUrl: "/contracts/contract-2-signed.pdf",
        serviceProviderId: "provider-1",
        serviceProviderName: "Construtora Silva & Cia",
        payments: [
          {
            id: "payment-3",
            amount: 36000,
            dueDate: "2024-04-15",
            paidDate: "2024-04-10",
            status: "paid",
            description: "Primeira parcela - Fundação",
            receiptUrl: "/receipts/receipt-3.pdf",
          },
          {
            id: "payment-4",
            amount: 36000,
            dueDate: "2024-05-15",
            paidDate: "2024-05-12",
            status: "paid",
            description: "Segunda parcela - Estrutura",
            receiptUrl: "/receipts/receipt-4.pdf",
          },
          {
            id: "payment-5",
            amount: 36000,
            dueDate: "2024-06-15",
            status: "pending",
            description: "Terceira parcela - Alvenaria",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Reforma Centro",
    clientName: "Maria Santos",
    clientId: "client-2",
    contractCount: 2,
    totalValue: 70000,
    contracts: [
      {
        id: "contract-3",
        title: "Fornecimento de Mão de Obra",
        type: "labor_supply",
        status: "active",
        clientName: "Maria Santos",
        clientId: "client-2",
        totalValue: 70000,
        signatureDate: "2024-02-10",
        startDate: "2024-02-15",
        scope:
          "Fornecimento de mão de obra especializada para reforma completa do apartamento, incluindo pedreiros, eletricistas e pintores.",
        contractUrl: "/contracts/contract-3.pdf",
        payments: [
          {
            id: "payment-6",
            amount: 35000,
            dueDate: "2024-03-15",
            paidDate: "2024-03-10",
            status: "paid",
            description: "Primeira parcela - Mão de obra",
            receiptUrl: "/receipts/receipt-6.pdf",
          },
          {
            id: "payment-7",
            amount: 35000,
            dueDate: "2024-04-15",
            status: "overdue",
            description: "Segunda parcela - Mão de obra",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Edifício Comercial",
    clientName: "Empresa ABC",
    clientId: "client-3",
    contractCount: 1,
    totalValue: 350000,
    contracts: [
      {
        id: "contract-4",
        title: "Projeto Completo",
        type: "project",
        status: "pending",
        clientName: "Empresa ABC",
        clientId: "client-3",
        totalValue: 350000,
        signatureDate: "2024-05-01",
        startDate: "2024-06-01",
        scope:
          "Desenvolvimento completo do projeto do edifício comercial, incluindo projeto arquitetônico, estrutural, instalações e aprovações.",
        contractUrl: "/contracts/contract-4.pdf",
        payments: [
          {
            id: "payment-8",
            amount: 175000,
            dueDate: "2024-07-01",
            status: "pending",
            description: "Primeira parcela - Projeto",
          },
          {
            id: "payment-9",
            amount: 175000,
            dueDate: "2024-09-01",
            status: "pending",
            description: "Segunda parcela - Projeto",
          },
        ],
      },
    ],
  },
]

export const useContracts = () => {
  const [projects] = useState<Project[]>(mockProjects)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)

  const totalProjects = projects.length
  const totalContracts = projects.reduce((sum, project) => sum + project.contractCount, 0)
  const totalValue = projects.reduce((sum, project) => sum + project.totalValue, 0)

  const contractsByStatus = useMemo(() => {
    const allContracts = projects.flatMap((project) => project.contracts)
    return allContracts.reduce(
      (acc, contract) => {
        acc[contract.status] = (acc[contract.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  }, [projects])

  const overduePayments = useMemo(() => {
    const allContracts = projects.flatMap((project) => project.contracts)
    const today = new Date()
    return allContracts.flatMap((contract) =>
      contract.payments.filter((payment) => {
        if (payment.status !== "pending") return false
        const dueDate = new Date(payment.dueDate)
        return dueDate < today
      }),
    )
  }, [projects])

  return {
    projects,
    selectedContract,
    setSelectedContract,
    totalProjects,
    totalContracts,
    totalValue,
    contractsByStatus,
    overduePayments,
  }
}
