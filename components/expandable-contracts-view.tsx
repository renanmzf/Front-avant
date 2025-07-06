"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, FileText, Users, Building2, Download, Eye } from "lucide-react"
import ContractsScreen from "./contracts-screen"

interface Contract {
  id: string
  type: "client" | "contractor"
  name: string
  value: number
  status: "active" | "completed" | "paused"
  description: string
  services: string[]
  parentId?: string
}

interface Project {
  id: string
  name: string
  client: string
  contracts: Contract[]
  color: string
}

interface ExpandableContractsViewProps {
  userType: "admin" | "client"
}

export function ExpandableContractsView({ userType }: ExpandableContractsViewProps) {
  const [expandedProjects, setExpandedProjects] = useState<string[]>(["1"])
  const [expandedContracts, setExpandedContracts] = useState<string[]>([])

  const projects: Project[] = [
    {
      id: "1",
      name: "Residência Alphaville",
      client: "João Silva",
      color: "bg-blue-50 border-blue-200",
      contracts: [
        {
          id: "c1",
          type: "client",
          name: "Contrato Principal - João Silva",
          value: 150000,
          status: "active",
          description: "Projeto arquitetônico e administração de obra",
          services: ["Projeto Arquitetônico", "Administração de Obra"],
        },
        {
          id: "c2",
          type: "contractor",
          name: "João Silva Construções",
          value: 85000,
          status: "active",
          description: "Execução de estrutura e fundação",
          services: ["Estrutura", "Fundação", "Alvenaria"],
          parentId: "c1",
        },
        {
          id: "c3",
          type: "contractor",
          name: "Elétrica Santos",
          value: 15000,
          status: "active",
          description: "Instalações elétricas completas",
          services: ["Instalações Elétricas"],
          parentId: "c1",
        },
      ],
    },
    {
      id: "2",
      name: "Reforma Centro",
      client: "Maria Santos",
      color: "bg-green-50 border-green-200",
      contracts: [
        {
          id: "c4",
          type: "client",
          name: "Contrato Principal - Maria Santos",
          value: 45000,
          status: "active",
          description: "Reforma comercial completa",
          services: ["Reforma", "Acabamento"],
        },
        {
          id: "c5",
          type: "contractor",
          name: "Pintura & Acabamentos",
          value: 25000,
          status: "completed",
          description: "Serviços de pintura e acabamento",
          services: ["Pintura", "Acabamento"],
          parentId: "c4",
        },
      ],
    },
    {
      id: "3",
      name: "Edifício Comercial",
      client: "Empresa ABC",
      color: "bg-purple-50 border-purple-200",
      contracts: [
        {
          id: "c6",
          type: "client",
          name: "Contrato Principal - Empresa ABC",
          value: 350000,
          status: "active",
          description: "Construção de edifício comercial",
          services: ["Projeto", "Execução", "Administração"],
        },
      ],
    },
  ]

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const toggleContract = (contractId: string) => {
    setExpandedContracts((prev) =>
      prev.includes(contractId) ? prev.filter((id) => id !== contractId) : [...prev, contractId],
    )
  }

  const getClientContracts = (projectContracts: Contract[]) => {
    return projectContracts.filter((contract) => contract.type === "client")
  }

  const getSubcontracts = (projectContracts: Contract[], parentId: string) => {
    return projectContracts.filter((contract) => contract.parentId === parentId)
  }

  const handleViewContract = (contractId: string) => {
    console.log("Visualizando contrato:", contractId)
  }

  const handleDownloadContract = (contractId: string) => {
    console.log("Baixando contrato:", contractId)
  }

  return (
   <ContractsScreen/>
  )
}
