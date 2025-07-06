"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, Calendar, BarChart3 } from "lucide-react"

interface LineChartsProps {
  projectId: string
}

export default function LineCharts({ projectId }: LineChartsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all")

  // Dados de gastos por fase da obra
  const expensesByPhaseData = {
    all: [
      {
        month: "Jan/24",
        Fundação: 12000,
        Estrutura: 8000,
        Alvenaria: 0,
        Cobertura: 0,
        Instalações: 0,
        Acabamento: 0,
      },
      {
        month: "Fev/24",
        Fundação: 8000,
        Estrutura: 15000,
        Alvenaria: 5000,
        Cobertura: 0,
        Instalações: 0,
        Acabamento: 0,
      },
      {
        month: "Mar/24",
        Fundação: 2000,
        Estrutura: 18000,
        Alvenaria: 12000,
        Cobertura: 3000,
        Instalações: 0,
        Acabamento: 0,
      },
      {
        month: "Abr/24",
        Fundação: 0,
        Estrutura: 10000,
        Alvenaria: 15000,
        Cobertura: 8000,
        Instalações: 2000,
        Acabamento: 0,
      },
      {
        month: "Mai/24",
        Fundação: 0,
        Estrutura: 5000,
        Alvenaria: 8000,
        Cobertura: 12000,
        Instalações: 8000,
        Acabamento: 1000,
      },
      {
        month: "Jun/24",
        Fundação: 0,
        Estrutura: 0,
        Alvenaria: 3000,
        Cobertura: 15000,
        Instalações: 12000,
        Acabamento: 5000,
      },
    ],
    "2024-03": [
      {
        week: "Sem 1",
        Fundação: 500,
        Estrutura: 4500,
        Alvenaria: 3000,
        Cobertura: 800,
        Instalações: 0,
        Acabamento: 0,
      },
      {
        week: "Sem 2",
        Fundação: 800,
        Estrutura: 6000,
        Alvenaria: 4000,
        Cobertura: 1200,
        Instalações: 0,
        Acabamento: 0,
      },
      {
        week: "Sem 3",
        Fundação: 400,
        Estrutura: 4000,
        Alvenaria: 3500,
        Cobertura: 600,
        Instalações: 0,
        Acabamento: 0,
      },
      {
        week: "Sem 4",
        Fundação: 300,
        Estrutura: 3500,
        Alvenaria: 1500,
        Cobertura: 400,
        Instalações: 0,
        Acabamento: 0,
      },
    ],
  }

  // Dados de evolução de custos (planejado vs realizado)
  const costEvolutionData = [
    {
      month: "Jan/24",
      planejado: 25000,
      realizado: 20000,
    },
    {
      month: "Fev/24",
      planejado: 50000,
      realizado: 48000,
    },
    {
      month: "Mar/24",
      planejado: 80000,
      realizado: 83000,
    },
    {
      month: "Abr/24",
      planejado: 115000,
      realizado: 118000,
    },
    {
      month: "Mai/24",
      planejado: 150000,
      realizado: 152000,
    },
    {
      month: "Jun/24",
      planejado: 185000,
      realizado: 187000,
    },
  ]

  const currentData = expensesByPhaseData[selectedPeriod as keyof typeof expensesByPhaseData] || expensesByPhaseData.all

  const totalExpenses = currentData.reduce((acc, item) => {
    const monthTotal = Object.entries(item)
      .filter(([key]) => key !== "month" && key !== "week")
      .reduce((sum, [, value]) => sum + (value as number), 0)
    return acc + monthTotal
  }, 0)

  const phaseColors = {
    Fundação: "#8b5cf6",
    Estrutura: "#3b82f6",
    Alvenaria: "#10b981",
    Cobertura: "#f59e0b",
    Instalações: "#ef4444",
    Acabamento: "#06b6d4",
  }

  return (
    <div className="space-y-6">
      {/* Gastos por Fase da Obra */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Gastos por Fase da Obra
              </CardTitle>
              <CardDescription>Distribuição dos custos por etapa da construção</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo o Período</SelectItem>
                  <SelectItem value="2024-03">Março 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total de Gastos no Período</p>
              <p className="text-lg font-bold text-blue-600">R$ {totalExpenses.toLocaleString("pt-BR")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(phaseColors).map(([phase, color]) => (
                <Badge key={phase} variant="outline" className="text-xs" style={{ borderColor: color, color }}>
                  {phase}
                </Badge>
              ))}
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={selectedPeriod === "all" ? "month" : "week"} />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: number, name: string) => [`R$ ${value.toLocaleString("pt-BR")}`, name]}
                  labelFormatter={(label) => `Período: ${label}`}
                />
                <Legend />
                {Object.entries(phaseColors).map(([phase, color]) => (
                  <Line
                    key={phase}
                    type="monotone"
                    dataKey={phase}
                    stroke={color}
                    strokeWidth={2}
                    dot={{ fill: color, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Evolução de Custos - Planejado vs Realizado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Evolução de Custos - Planejado vs Realizado
          </CardTitle>
          <CardDescription>Comparativo entre custos planejados e realizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Planejado Total</p>
                <p className="text-lg font-bold text-blue-600">
                  R$ {costEvolutionData[costEvolutionData.length - 1].planejado.toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Realizado Total</p>
                <p className="text-lg font-bold text-green-600">
                  R$ {costEvolutionData[costEvolutionData.length - 1].realizado.toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Variação</p>
                <p
                  className={`text-lg font-bold ${
                    costEvolutionData[costEvolutionData.length - 1].realizado >
                    costEvolutionData[costEvolutionData.length - 1].planejado
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {(
                    ((costEvolutionData[costEvolutionData.length - 1].realizado -
                      costEvolutionData[costEvolutionData.length - 1].planejado) /
                      costEvolutionData[costEvolutionData.length - 1].planejado) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costEvolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `R$ ${value.toLocaleString("pt-BR")}`,
                    name === "planejado" ? "Planejado" : "Realizado",
                  ]}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="planejado"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  name="Planejado"
                />
                <Line
                  type="monotone"
                  dataKey="realizado"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Realizado"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
