"use client"

import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, formatPercentage } from "../utils/contract-management-utils"
import type { KPIData } from "../types/contract-management"

interface KPICardsProps {
  data: KPIData
  className?: string
}

export const KPICards = ({ data, className = "" }: KPICardsProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {/* Total Recebido */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Total Recebido</p>
              <p className="text-2xl font-bold text-green-800">{formatCurrency(data.totalReceived.value)}</p>
              <p className="text-xs text-green-600">de {formatCurrency(data.totalReceived.expected)} esperado</p>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Pago */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700">Total Pago</p>
              <p className="text-2xl font-bold text-red-800">{formatCurrency(data.totalPaid.value)}</p>
              <p className="text-xs text-red-600">de {formatCurrency(data.totalPaid.committed)} comprometido</p>
            </div>
            <div className="flex items-center">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lucro Atual */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Lucro Atual</p>
              <p className="text-2xl font-bold text-blue-800">{formatCurrency(data.currentProfit.value)}</p>
              <p className="text-xs text-blue-600">{data.currentProfit.isPositive ? "↗ Positivo" : "↘ Negativo"}</p>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lucro Esperado */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Lucro Esperado</p>
              <p className="text-2xl font-bold text-purple-800">{formatCurrency(data.expectedProfit.value)}</p>
              <p className="text-xs text-purple-600">Margem: {formatPercentage(data.expectedProfit.margin)}</p>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
