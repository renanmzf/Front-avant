"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomTooltip } from "./custom-tooltip"
import { RevenueSummary } from "./revenue-summary"
import { CHART_CONFIG } from "../constants/revenue-chart"
import type { RevenueChartProps } from "../types/revenue-chart"

export const RevenueBarChart = ({ data, className = "" }: RevenueChartProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Recebimentos Mensais - {data.year}</CardTitle>
          <CardDescription>Acompanhe os recebimentos mensais por contrato ao longo do ano</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyRevenues} margin={CHART_CONFIG.margin} barCategoryGap="20%">
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
                  dataKey="totalAmount"
                  fill={CHART_CONFIG.barColor}
                  radius={[CHART_CONFIG.barRadius, CHART_CONFIG.barRadius, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <RevenueSummary data={data} />
    </div>
  )
}
