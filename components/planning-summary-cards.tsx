"use client"

import { TrendingUp, TrendingDown, Target, DollarSign, Calculator } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PlanningData } from "../types/planning"

interface PlanningSummaryCardsProps {
  data: PlanningData
}

export const PlanningSummaryCards = ({ data }: PlanningSummaryCardsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const isOverBudget = data.totalDifference > 0
  const executionPercentage = data.totalPlanned > 0 ? (data.totalExecuted / data.totalPlanned) * 100 : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Planejado */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">PLANEJADO</CardTitle>
          <Target className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(data.totalPlanned)}</div>
          <p className="text-xs text-muted-foreground mt-1">Valor total orçado</p>
        </CardContent>
      </Card>

      {/* Total Executado */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">EXECUTADO</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(data.totalExecuted)}</div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {executionPercentage.toFixed(1)}% do planejado
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Diferença */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">DIFERENÇA</CardTitle>
          <Calculator className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isOverBudget ? "text-red-600" : "text-green-600"}`}>
            {formatCurrency(Math.abs(data.totalDifference))}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {isOverBudget ? (
              <TrendingUp className="h-3 w-3 text-red-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-green-600" />
            )}
            <span className={`text-xs ${isOverBudget ? "text-red-600" : "text-green-600"}`}>
              {isOverBudget ? "Acima do orçamento" : "Dentro do orçamento"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Status Geral */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">STATUS GERAL</CardTitle>
          <Badge variant={isOverBudget ? "destructive" : "secondary"}>{isOverBudget ? "ATENÇÃO" : "OK"}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">
            {data.stages.filter((s) => s.status === "CONCLUIDO").length}/{data.stages.length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Etapas concluídas</p>
        </CardContent>
      </Card>
    </div>
  )
}
