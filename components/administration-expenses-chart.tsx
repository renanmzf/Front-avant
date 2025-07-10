"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "../utils/cost-analysis-utils"
import type { AdministrationExpense } from "../types/cost-analysis"

interface AdministrationExpensesChartProps {
  data: AdministrationExpense[]
  total: number
  selectedYear: number
  onYearChange: (year: number) => void
  className?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    payload: AdministrationExpense
  }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">
          {label} {data.year}
        </p>
        <p className="font-semibold text-blue-600">{formatCurrency(data.value)}</p>
        {data.description && <p className="text-sm text-gray-600 mt-1">{data.description}</p>}
      </div>
    )
  }
  return null
}

export const AdministrationExpensesChart = ({
  data,
  total,
  selectedYear,
  onYearChange,
  className = "",
}: AdministrationExpensesChartProps) => {
  const currentYear = new Date().getFullYear()
  const availableYears = Array.from({ length: 5 }, (_, i) => currentYear - i)

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Gasto com Administração</CardTitle>
            <CardDescription>Custos administrativos mensais por ano</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filtro de anos ativos:</label>
            <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(Number.parseInt(value))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</div>
          <div className="text-sm text-gray-600">Total de gastos administrativos em {selectedYear}</div>
        </div>
      </CardContent>
    </Card>
  )
}
