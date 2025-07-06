"use client"

import { FileText, Calendar, DollarSign, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "../utils/contract-management-utils"
import type { Contract } from "../types/contract-management"

interface ContractsListProps {
  contracts: Contract[]
  className?: string
}

export const ContractsList = ({ contracts, className = "" }: ContractsListProps) => {
  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      draft: "Rascunho",
      active: "Ativo",
      completed: "Concluído",
      cancelled: "Cancelado",
    }
    return labels[status as keyof typeof labels] || status
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      empreitada: "Empreitada",
      medicao: "Medição",
      projeto: "Projeto",
    }
    return labels[type as keyof typeof labels] || type
  }

  if (contracts.length === 0) {
    return (
      <Card className={`${className}`}>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum contrato criado</h3>
          <p className="text-gray-600">Selecione um projeto e crie seu primeiro contrato.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Contratos do Projeto ({contracts.length})
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{contract.title}</h4>
                    <Badge className={getStatusColor(contract.status)}>{getStatusLabel(contract.status)}</Badge>
                    <Badge variant="outline">{getTypeLabel(contract.type)}</Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{contract.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{contract.number}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{formatCurrency(contract.value)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(contract.startDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
