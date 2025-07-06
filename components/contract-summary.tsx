"use client"

import { Calendar, FileText, Download, Building, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "../utils/contracts-utils"
import { CONTRACT_TYPES, CONTRACT_STATUS } from "../constants/contracts"
import type { ContractSummaryProps } from "../types/contracts"

export const ContractSummary = ({ contract, onDownloadContract, onDownloadSignedContract }: ContractSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Resumo do Contrato
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Título</label>
              <p className="text-lg font-semibold">{contract.title}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Tipo de Contrato</label>
              <div className="flex items-center gap-2 mt-1">
                <Building className="h-4 w-4 text-blue-600" />
                <span>{CONTRACT_TYPES[contract.type]}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <div className="mt-1">
                <Badge className={CONTRACT_STATUS[contract.status].color}>
                  {CONTRACT_STATUS[contract.status].label}
                </Badge>
              </div>
            </div>

            {contract.serviceProviderName && (
              <div>
                <label className="text-sm font-medium text-gray-600">Prestador de Serviço</label>
                <div className="flex items-center gap-2 mt-1">
                  <User className="h-4 w-4 text-green-600" />
                  <span>{contract.serviceProviderName}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Data de Assinatura</label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>{formatDate(contract.signatureDate)}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Período</label>
              <p>
                {formatDate(contract.startDate)}
                {contract.endDate && ` - ${formatDate(contract.endDate)}`}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Downloads</label>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDownloadContract}
                  className="justify-start bg-transparent"
                  disabled={!contract.contractUrl}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Contrato Original
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDownloadSignedContract}
                  className="justify-start bg-transparent"
                  disabled={!contract.signedContractUrl}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Contrato Assinado
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Escopo do Trabalho</label>
          <p className="mt-2 text-gray-800 leading-relaxed">{contract.scope}</p>
        </div>
      </CardContent>
    </Card>
  )
}
