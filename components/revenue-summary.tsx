"use client"

import { Calendar, DollarSign, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, formatPeriod } from "../utils/revenue-chart-utils"
import type { RevenueData } from "../types/revenue-chart"

interface RevenueSummaryProps {
  data: RevenueData
  className?: string
}

export const RevenueSummary = ({ data, className = "" }: RevenueSummaryProps) => {
  const averageMonthly = data.totalRevenue / 12

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Recebido</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(data.totalRevenue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Período Ativo</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatPeriod(data.activePeriod.startDate, data.activePeriod.endDate)}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Média Mensal</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(averageMonthly)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
