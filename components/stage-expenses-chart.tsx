"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartFilters } from "./chart-filters"
import { formatCurrency } from "../utils/cost-analysis-utils"
import { CHART_CONFIG } from "../constants/cost-analysis"
import type { ExpenseStage } from "../types/cost-analysis"

interface StageExpensesChartProps {
  data: ExpenseStage[]
  total: number
  filters: any
  onFiltersChange: (filters: any) => void
  className?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: ExpenseStage
  }>
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg max-w-xs">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="font-semibold" style={{ color: data.color }}>
          {formatCurrency(data.value)} ({data.percentage}%)
        </p>
      </div>
    )
  }
  return null
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
  if (percentage < 5) return null

  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
      fontWeight="600"
    >
      {`${percentage}%`}
    </text>
  )
}

export const StageExpensesChart = ({
  data,
  total,
  filters,
  onFiltersChange,
  className = "",
}: StageExpensesChartProps) => {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Gastos por Etapa</CardTitle>
            <CardDescription>Distribuição dos gastos por etapa da construção</CardDescription>
          </div>
          <ChartFilters filters={filters} onFiltersChange={onFiltersChange} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomLabel}
                    outerRadius={CHART_CONFIG.pieOuterRadius}
                    innerRadius={CHART_CONFIG.pieInnerRadius}
                    paddingAngle={1}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center mt-4">
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</div>
              <div className="text-sm text-gray-600">Total de gastos</div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Detalhamento por Etapa</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {data.map((stage) => (
                <div key={stage.id} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: stage.color }} />
                    <span className="text-sm font-medium text-gray-700 truncate">{stage.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-900">{formatCurrency(stage.value)}</span>
                    <span className="text-gray-500">({stage.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
