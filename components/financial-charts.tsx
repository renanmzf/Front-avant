"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3 } from "lucide-react"
import { useState } from "react"

interface FinancialChartsProps {
  projectId: string
}

export function FinancialCharts({ projectId }: FinancialChartsProps) {
  const [selectedView, setSelectedView] = useState<string>("total")

  // Dados simulados - em produção viriam do backend
  const monthlyExpenses = {
    total: [
      { month: "Janeiro", expenses: 25600, adminTax: 2560 },
      { month: "Fevereiro", expenses: 18800, adminTax: 1880 },
      { month: "Março", expenses: 22350, adminTax: 2235 },
      { month: "Abril", expenses: 19200, adminTax: 1920 },
      { month: "Maio", expenses: 16500, adminTax: 1650 },
      { month: "Junho", expenses: 14200, adminTax: 1420 },
    ],
    project1: [
      { month: "Janeiro", expenses: 15600, adminTax: 1560 },
      { month: "Fevereiro", expenses: 12800, adminTax: 1280 },
      { month: "Março", expenses: 18350, adminTax: 1835 },
      { month: "Abril", expenses: 14200, adminTax: 1420 },
      { month: "Maio", expenses: 11500, adminTax: 1150 },
      { month: "Junho", expenses: 9200, adminTax: 920 },
    ],
    project2: [
      { month: "Janeiro", expenses: 6600, adminTax: 660 },
      { month: "Fevereiro", expenses: 4800, adminTax: 480 },
      { month: "Março", expenses: 1350, adminTax: 135 },
      { month: "Abril", expenses: 3200, adminTax: 320 },
      { month: "Maio", expenses: 2800, adminTax: 280 },
      { month: "Junho", expenses: 2100, adminTax: 210 },
    ],
    project3: [
      { month: "Janeiro", expenses: 3400, adminTax: 340 },
      { month: "Fevereiro", expenses: 1200, adminTax: 120 },
      { month: "Março", expenses: 2650, adminTax: 265 },
      { month: "Abril", expenses: 1800, adminTax: 180 },
      { month: "Maio", expenses: 2200, adminTax: 220 },
      { month: "Junho", expenses: 2900, adminTax: 290 },
    ],
  }

  // Dados para gráfico de gastos por fase (barras)
  const expensesByPhase = [
    { phase: "Fundação", jan: 8000, fev: 2000, mar: 1000, abr: 500, mai: 0, jun: 0 },
    { phase: "Estrutura", jan: 5000, fev: 12000, mar: 8000, abr: 6000, mai: 3000, jun: 1000 },
    { phase: "Alvenaria", jan: 2000, fev: 3000, mar: 7000, abr: 8000, mai: 5000, jun: 2000 },
    { phase: "Cobertura", jan: 0, fev: 0, mar: 1000, abr: 3000, mai: 4000, jun: 6000 },
    { phase: "Instalações", jan: 0, fev: 0, mar: 0, abr: 1000, mai: 3000, jun: 4000 },
    { phase: "Acabamento", jan: 0, fev: 0, mar: 0, abr: 0, mai: 1000, jun: 2000 },
  ]

  const currentData =
    selectedView === "total"
      ? monthlyExpenses.total
      : selectedView === "project1"
        ? monthlyExpenses.project1
        : selectedView === "project2"
          ? monthlyExpenses.project2
          : monthlyExpenses.project3

  const hasData = currentData.length > 0

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Evolução de Custos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Evolução de Custos
            </CardTitle>
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="total">Somatório Total</SelectItem>
                <SelectItem value="project1">Residência Alphaville</SelectItem>
                <SelectItem value="project2">Reforma Centro</SelectItem>
                <SelectItem value="project3">Edifício Comercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {hasData ? (
            <>
              <div className="h-64 flex items-end justify-center space-x-4 bg-gray-50 rounded p-4 mb-4">
                {currentData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className="flex flex-col items-center space-y-1">
                      {/* Barra de Taxa Admin */}
                      <div
                        className="w-12 bg-orange-400 rounded-t"
                        style={{ height: `${Math.max((data.adminTax / 1000) * 20, 2)}px` }}
                      ></div>
                      {/* Barra de Gastos */}
                      <div
                        className="w-12 bg-blue-600 rounded-b"
                        style={{ height: `${Math.max((data.expenses / 1000) * 8, 10)}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{data.month.slice(0, 3)}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                {currentData.slice(0, 3).map((data, index) => (
                  <div key={index}>
                    <p className="text-gray-600">{data.month}</p>
                    <p className="font-semibold text-blue-600">R$ {data.expenses.toLocaleString("pt-BR")}</p>
                    <p className="text-xs text-orange-600">Taxa: R$ {data.adminTax}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded mr-1"></div>
                  <span>Gastos</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-400 rounded mr-1"></div>
                  <span>Taxa Admin</span>
                </div>
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Sem dados disponíveis</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gastos por Fase da Obra - Gráfico de Barras */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
            Gastos por Fase da Obra
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded p-4 mb-4">
            <div className="h-full flex items-end justify-between space-x-2">
              {expensesByPhase.map((phase, index) => {
                const totalPhase = phase.jan + phase.fev + phase.mar + phase.abr + phase.mai + phase.jun
                const maxValue = Math.max(...expensesByPhase.map((p) => p.jan + p.fev + p.mar + p.abr + p.mai + p.jun))
                const height = (totalPhase / maxValue) * 100

                return (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                      style={{ height: `${Math.max(height, 5)}%` }}
                      title={`${phase.phase}: R$ ${totalPhase.toLocaleString("pt-BR")}`}
                    ></div>
                    <span className="text-xs text-gray-600 text-center leading-tight">{phase.phase}</span>
                    <span className="text-xs font-medium text-blue-600">R$ {(totalPhase / 1000).toFixed(0)}k</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Resumo das fases */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {expensesByPhase.map((phase, index) => {
              const total = phase.jan + phase.fev + phase.mar + phase.abr + phase.mai + phase.jun
              return (
                <div key={index} className="flex justify-between p-2 bg-white rounded border">
                  <span className="text-gray-600">{phase.phase}</span>
                  <span className="font-medium text-blue-600">R$ {total.toLocaleString("pt-BR")}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
