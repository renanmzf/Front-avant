"use client"

import { Plus, Eye, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { STAGE_STATUS_OPTIONS } from "../constants/planning-constants"
import type { ProjectStage } from "../types/planning"
import { usePathname } from "next/navigation"

interface StagesPlanningTableProps {
  stages: ProjectStage[]
  onAddExecution: (stageId: string) => void
  onViewDetails: (stageId: string) => void
}

export const StagesPlanningTable = ({ stages, onAddExecution, onViewDetails }: StagesPlanningTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const pathname = usePathname();
      
  const showCard = !pathname.startsWith('/cliente');

  const getStatusConfig = (status: string) => {
    return STAGE_STATUS_OPTIONS.find((s) => s.value === status) || STAGE_STATUS_OPTIONS[0]
  }

  const getDifferenceDisplay = (difference: number) => {
    const isPositive = difference > 0
    const isNegative = difference < 0
    const isZero = difference === 0

    return {
      icon: isPositive ? (
        <TrendingUp className="h-4 w-4 text-red-600" />
      ) : isNegative ? (
        <TrendingDown className="h-4 w-4 text-green-600" />
      ) : (
        <Minus className="h-4 w-4 text-gray-600" />
      ),
      color: isPositive ? "text-red-600" : isNegative ? "text-green-600" : "text-gray-600",
      text: isPositive ? "Estouro" : isNegative ? "Economia" : "Exato",
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="bg-blue-600 text-white py-3 px-4 rounded text-center">
          PLANEJAMENTO - ETAPAS DO PROJETO
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">ETAPA</TableHead>
                <TableHead className="font-semibold">STATUS</TableHead>
                <TableHead className="font-semibold text-right">PLANEJADO</TableHead>
                <TableHead className="font-semibold text-right">EXECUTADO</TableHead>
                <TableHead className="font-semibold text-right">DIFERENÇA</TableHead>
                <TableHead className="font-semibold text-center">AÇÕES</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stages.map((stage) => {
                const statusConfig = getStatusConfig(stage.status)
                const differenceDisplay = getDifferenceDisplay(stage.difference)

                return (
                  <TableRow key={stage.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{stage.name}</div>
                        <div className="text-sm text-gray-600">{stage.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-semibold text-blue-600">{formatCurrency(stage.plannedValue)}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-semibold text-green-600">{formatCurrency(stage.executedValue)}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {differenceDisplay.icon}
                        <div className="flex flex-col items-end">
                          <span className={`font-semibold ${differenceDisplay.color}`}>
                            {formatCurrency(Math.abs(stage.difference))}
                          </span>
                          <span className={`text-xs ${differenceDisplay.color}`}>{differenceDisplay.text}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        {showCard && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAddExecution(stage.id)}
                          className="bg-transparent"
                          title="Adicionar Lançamento"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewDetails(stage.id)}
                          className="bg-transparent"
                          title="Ver Detalhes"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Summary Row */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-medium text-blue-900">Total Planejado</div>
              <div className="text-lg font-bold text-blue-600">
                {formatCurrency(stages.reduce((sum, stage) => sum + stage.plannedValue, 0))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-green-900">Total Executado</div>
              <div className="text-lg font-bold text-green-600">
                {formatCurrency(stages.reduce((sum, stage) => sum + stage.executedValue, 0))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-purple-900">Diferença Total</div>
              <div className="text-lg font-bold text-purple-600">
                {formatCurrency(
                  Math.abs(
                    stages.reduce((sum, stage) => sum + stage.plannedValue, 0) -
                      stages.reduce((sum, stage) => sum + stage.executedValue, 0),
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
