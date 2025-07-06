"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, Calendar, BarChart3, DollarSign } from "lucide-react"

interface EnhancedFinancialChartsProps {
  projectId?: string
}

export function EnhancedFinancialCharts({ projectId }: EnhancedFinancialChartsProps) {
  const [selectedYear, setSelectedYear] = useState<string>("2024")
  const [selectedView, setSelectedView] = useState<string>("all")

  // Dados de fluxo de caixa mensal
  const cashFlowData = {
    "2024": [
      { month: "Jan", receita: 45000, gastos: 32000, saldo: 13000, saldoAcumulado: 13000 },
      { month: "Fev", receita: 52000, gastos: 38000, saldo: 14000, saldoAcumulado: 27000 },
      { month: "Mar", receita: 48000, gastos: 35000, saldo: 13000, saldoAcumulado: 40000 },
      { month: "Abr", receita: 55000, gastos: 42000, saldo: 13000, saldoAcumulado: 53000 },
      { month: "Mai", receita: 58000, gastos: 45000, saldo: 13000, saldoAcumulado: 66000 },
      { month: "Jun", receita: 62000, gastos: 48000, saldo: 14000, saldoAcumulado: 80000 },
      { month: "Jul", receita: 59000, gastos: 46000, saldo: 13000, saldoAcumulado: 93000 },
      { month: "Ago", receita: 61000, gastos: 47000, saldo: 14000, saldoAcumulado: 107000 },
      { month: "Set", receita: 64000, gastos: 49000, saldo: 15000, saldoAcumulado: 122000 },
      { month: "Out", receita: 67000, gastos: 52000, saldo: 15000, saldoAcumulado: 137000 },
      { month: "Nov", receita: 70000, gastos: 54000, saldo: 16000, saldoAcumulado: 153000 },
      { month: "Dez", receita: 73000, gastos: 57000, saldo: 16000, saldoAcumulado: 169000 },
    ],
    "2023": [
      { month: "Jan", receita: 35000, gastos: 28000, saldo: 7000, saldoAcumulado: 7000 },
      { month: "Fev", receita: 38000, gastos: 30000, saldo: 8000, saldoAcumulado: 15000 },
      { month: "Mar", receita: 42000, gastos: 32000, saldo: 10000, saldoAcumulado: 25000 },
      { month: "Abr", receita: 45000, gastos: 35000, saldo: 10000, saldoAcumulado: 35000 },
      { month: "Mai", receita: 48000, gastos: 37000, saldo: 11000, saldoAcumulado: 46000 },
      { month: "Jun", receita: 50000, gastos: 39000, saldo: 11000, saldoAcumulado: 57000 },
      { month: "Jul", receita: 52000, gastos: 40000, saldo: 12000, saldoAcumulado: 69000 },
      { month: "Ago", receita: 54000, gastos: 42000, saldo: 12000, saldoAcumulado: 81000 },
      { month: "Set", receita: 56000, gastos: 43000, saldo: 13000, saldoAcumulado: 94000 },
      { month: "Out", receita: 58000, gastos: 45000, saldo: 13000, saldoAcumulado: 107000 },
      { month: "Nov", receita: 60000, gastos: 46000, saldo: 14000, saldoAcumulado: 121000 },
      { month: "Dez", receita: 62000, gastos: 48000, saldo: 14000, saldoAcumulado: 135000 },
    ],
  }

  // Dados por projeto
  const projectData = {
    project1: {
      name: "Residência Alphaville",
      data: cashFlowData["2024"].map((item) => ({
        ...item,
        receita: item.receita * 0.6,
        gastos: item.gastos * 0.6,
        saldo: item.saldo * 0.6,
        saldoAcumulado: item.saldoAcumulado * 0.6,
      })),
    },
    project2: {
      name: "Reforma Centro",
      data: cashFlowData["2024"].map((item) => ({
        ...item,
        receita: item.receita * 0.25,
        gastos: item.gastos * 0.25,
        saldo: item.saldo * 0.25,
        saldoAcumulado: item.saldoAcumulado * 0.25,
      })),
    },
    project3: {
      name: "Edifício Comercial",
      data: cashFlowData["2024"].map((item) => ({
        ...item,
        receita: item.receita * 0.15,
        gastos: item.gastos * 0.15,
        saldo: item.saldo * 0.15,
        saldoAcumulado: item.saldoAcumulado * 0.15,
      })),
    },
  }

  const getCurrentData = () => {
    if (selectedView === "all") {
      return cashFlowData[selectedYear as keyof typeof cashFlowData] || cashFlowData["2024"]
    }
    return projectData[selectedView as keyof typeof projectData]?.data || cashFlowData["2024"]
  }

  const currentData = getCurrentData()

  // Calcular totais
  const totalReceita = currentData.reduce((sum, item) => sum + item.receita, 0)
  const totalGastos = currentData.reduce((sum, item) => sum + item.gastos, 0)
  const totalSaldo = totalReceita - totalGastos
  const saldoFinal = currentData[currentData.length - 1]?.saldoAcumulado || 0

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select value={selectedView} onValueChange={setSelectedView}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Projetos</SelectItem>
            <SelectItem value="project1">Residência Alphaville</SelectItem>
            <SelectItem value="project2">Reforma Centro</SelectItem>
            <SelectItem value="project3">Edifício Comercial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Receita Total</p>
                <p className="text-2xl font-bold text-blue-800">R$ {totalReceita.toLocaleString("pt-BR")}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Gastos Totais</p>
                <p className="text-2xl font-bold text-red-800">R$ {totalGastos.toLocaleString("pt-BR")}</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Saldo Período</p>
                <p className="text-2xl font-bold text-green-800">R$ {totalSaldo.toLocaleString("pt-BR")}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Saldo Acumulado</p>
                <p className="text-2xl font-bold text-purple-800">R$ {saldoFinal.toLocaleString("pt-BR")}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Fluxo de Caixa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Fluxo de Caixa - {selectedYear}
          </CardTitle>
          <CardDescription>
            Receitas, gastos e saldo mensal
            {selectedView !== "all" && ` - ${projectData[selectedView as keyof typeof projectData]?.name}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} stroke="#666" />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `R$ ${value.toLocaleString("pt-BR")}`,
                    name === "receita" ? "Receita" : name === "gastos" ? "Gastos" : "Saldo",
                  ]}
                  labelFormatter={(label) => `Mês: ${label}`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="receita" fill="#10b981" name="Receita" radius={[2, 2, 0, 0]} />
                <Bar dataKey="gastos" fill="#ef4444" name="Gastos" radius={[2, 2, 0, 0]} />
                <Bar dataKey="saldo" fill="#3b82f6" name="Saldo" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Saldo Acumulado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
            Evolução do Saldo Acumulado
          </CardTitle>
          <CardDescription>Crescimento do saldo ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} stroke="#666" />
                <Tooltip
                  formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Saldo Acumulado"]}
                  labelFormatter={(label) => `Mês: ${label}`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="saldoAcumulado"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#8b5cf6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Resumo por Projeto (apenas quando visualizando todos) */}
      {selectedView === "all" && (
        <Card>
          <CardHeader>
            <CardTitle>Resumo por Projeto - {selectedYear}</CardTitle>
            <CardDescription>Distribuição de receitas e gastos por projeto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(projectData).map(([key, project]) => {
                const projectTotal = project.data.reduce((sum, item) => sum + item.receita, 0)
                const projectGastos = project.data.reduce((sum, item) => sum + item.gastos, 0)
                const projectSaldo = projectTotal - projectGastos
                const percentage = ((projectTotal / totalReceita) * 100).toFixed(1)

                return (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>Receita: R$ {projectTotal.toLocaleString("pt-BR")}</span>
                        <span>Gastos: R$ {projectGastos.toLocaleString("pt-BR")}</span>
                        <span>Saldo: R$ {projectSaldo.toLocaleString("pt-BR")}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{percentage}% do total</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
