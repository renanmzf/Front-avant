"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { BarChart3, PieChartIcon, Filter, Search, Download } from "lucide-react"

interface EnhancedFinancialDashboardProps {
  userType: "admin" | "client"
  projectId?: string
}

export function EnhancedFinancialDashboard({ userType, projectId }: EnhancedFinancialDashboardProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [chartType, setChartType] = useState<string>("cost_type")
  const [abcFilter, setAbcFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Dados para gráficos
  const costTypeData = [
    { name: "Material", value: 45000, color: "#3b82f6" },
    { name: "Mão de Obra", value: 35000, color: "#10b981" },
    { name: "Equipamento", value: 15000, color: "#f59e0b" },
    { name: "Serviços", value: 25000, color: "#ef4444" },
    { name: "Transporte", value: 8000, color: "#8b5cf6" },
  ]

  const costClassData = [
    { name: "Fundação", value: 28000, color: "#6366f1" },
    { name: "Estrutura", value: 42000, color: "#06b6d4" },
    { name: "Alvenaria", value: 25000, color: "#10b981" },
    { name: "Cobertura", value: 18000, color: "#f59e0b" },
    { name: "Instalações", value: 15000, color: "#ef4444" },
  ]

  const supplierData = [
    { name: "Concreteira SP", value: 35000, color: "#3b82f6" },
    { name: "João Silva Construções", value: 28000, color: "#10b981" },
    { name: "Materiais Santos", value: 22000, color: "#f59e0b" },
    { name: "Elétrica Costa", value: 18000, color: "#ef4444" },
    { name: "Outros", value: 25000, color: "#8b5cf6" },
  ]

  // Dados detalhados para tabela com curva ABC
  const detailedExpenses = [
    {
      id: 1,
      description: "Concreto Usinado - 15m³",
      supplier: "Concreteira SP",
      costType: "Material",
      costClass: "Estrutura",
      value: 15000,
      percentage: 11.7,
      abcClass: "A",
      paymentMethod: "Transferência",
    },
    {
      id: 2,
      description: "Mão de obra - Pedreiro",
      supplier: "João Silva Construções",
      costType: "Mão de Obra",
      costClass: "Alvenaria",
      value: 12000,
      percentage: 9.4,
      abcClass: "A",
      paymentMethod: "PIX",
    },
    {
      id: 3,
      description: "Tijolos cerâmicos",
      supplier: "Materiais Santos",
      costType: "Material",
      costClass: "Alvenaria",
      value: 8500,
      percentage: 6.6,
      abcClass: "B",
      paymentMethod: "Boleto",
    },
    {
      id: 4,
      description: "Instalação elétrica",
      supplier: "Elétrica Costa",
      costType: "Serviços",
      costClass: "Instalações",
      value: 7200,
      percentage: 5.6,
      abcClass: "B",
      paymentMethod: "Cartão",
    },
    {
      id: 5,
      description: "Cimento Portland",
      supplier: "Materiais Santos",
      costType: "Material",
      costClass: "Estrutura",
      value: 4800,
      percentage: 3.7,
      abcClass: "C",
      paymentMethod: "Dinheiro",
    },
  ]

  const getCurrentChartData = () => {
    switch (chartType) {
      case "cost_type":
        return costTypeData
      case "cost_class":
        return costClassData
      case "supplier":
        return supplierData
      default:
        return costTypeData
    }
  }

  const getFilteredExpenses = () => {
    let filtered = detailedExpenses

    if (abcFilter !== "all") {
      filtered = filtered.filter((expense) => expense.abcClass === abcFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (expense) =>
          expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }

  const chartData = getCurrentChartData()
  const filteredExpenses = getFilteredExpenses()

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#6366f1"]

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-blue-600" />
            Filtros de Análise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Gráfico</Label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cost_type">Valor por Tipo de Custo</SelectItem>
                  <SelectItem value="cost_class">Valor por Classe de Custo</SelectItem>
                  <SelectItem value="supplier">Valor por Fornecedor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Curva ABC</Label>
              <Select value={abcFilter} onValueChange={setAbcFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="A">Classe A (Alto valor)</SelectItem>
                  <SelectItem value="B">Classe B (Médio valor)</SelectItem>
                  <SelectItem value="C">Classe C (Baixo valor)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por descrição ou fornecedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ações</Label>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Pizza */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2 text-blue-600" />
              {chartType === "cost_type" && "Distribuição por Tipo de Custo"}
              {chartType === "cost_class" && "Distribuição por Classe de Custo"}
              {chartType === "supplier" && "Distribuição por Fornecedor"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Valor"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Barras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
              Valores Comparativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} stroke="#666" />
                  <Tooltip
                    formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Valor"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Detalhada */}
      <Card>
        <CardHeader>
          <CardTitle>Lançamentos Detalhados</CardTitle>
          <CardDescription>
            Visualização detalhada com classificação ABC e forma de pagamento
            {abcFilter !== "all" && ` - Filtrado por Classe ${abcFilter}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Descrição</th>
                  <th className="text-left py-3 px-2">Fornecedor</th>
                  <th className="text-left py-3 px-2">Tipo</th>
                  <th className="text-left py-3 px-2">Classe</th>
                  <th className="text-right py-3 px-2">Valor</th>
                  <th className="text-center py-3 px-2">ABC</th>
                  <th className="text-center py-3 px-2">Pagamento</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense, index) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-sm">{index + 1}</td>
                    <td className="py-3 px-2">{expense.description}</td>
                    <td className="py-3 px-2">{expense.supplier}</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline">{expense.costType}</Badge>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary">{expense.costClass}</Badge>
                    </td>
                    <td className="py-3 px-2 text-right font-medium">R$ {expense.value.toLocaleString("pt-BR")}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge
                        variant={
                          expense.abcClass === "A" ? "destructive" : expense.abcClass === "B" ? "default" : "secondary"
                        }
                      >
                        {expense.abcClass}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant="outline">{expense.paymentMethod}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredExpenses.length === 0 && (
            <div className="text-center py-8 text-gray-500">Nenhum lançamento encontrado com os filtros aplicados.</div>
          )}
        </CardContent>
      </Card>

      {/* Resumo ABC */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-red-700">Classe A (Alto Valor)</p>
              <p className="text-2xl font-bold text-red-800">
                {detailedExpenses.filter((e) => e.abcClass === "A").length} itens
              </p>
              <p className="text-sm text-red-600">
                R${" "}
                {detailedExpenses
                  .filter((e) => e.abcClass === "A")
                  .reduce((sum, e) => sum + e.value, 0)
                  .toLocaleString("pt-BR")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-700">Classe B (Médio Valor)</p>
              <p className="text-2xl font-bold text-blue-800">
                {detailedExpenses.filter((e) => e.abcClass === "B").length} itens
              </p>
              <p className="text-sm text-blue-600">
                R${" "}
                {detailedExpenses
                  .filter((e) => e.abcClass === "B")
                  .reduce((sum, e) => sum + e.value, 0)
                  .toLocaleString("pt-BR")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-green-700">Classe C (Baixo Valor)</p>
              <p className="text-2xl font-bold text-green-800">
                {detailedExpenses.filter((e) => e.abcClass === "C").length} itens
              </p>
              <p className="text-sm text-green-600">
                R${" "}
                {detailedExpenses
                  .filter((e) => e.abcClass === "C")
                  .reduce((sum, e) => sum + e.value, 0)
                  .toLocaleString("pt-BR")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
