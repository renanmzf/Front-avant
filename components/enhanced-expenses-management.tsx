"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  FileText,
  BarChart3,
  LucidePieChart,
  TrendingUp,
} from "lucide-react"
import { constructionWBS } from "./construction-wbs-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts"

interface Expense {
  id: string
  date: string
  nf: string
  description: string
  supplier: string
  phase: string
  subPhase: string
  class: string
  type: string
  cost: number
  status: "pending" | "approved" | "rejected"
  attachments?: string[]
  notes?: string
}

interface EnhancedExpensesManagementProps {
  projectId: string
  projectName: string
  userType: "admin" | "client"
}

export function EnhancedExpensesManagement({ projectId, projectName, userType }: EnhancedExpensesManagementProps) {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      date: "2024-01-15",
      nf: "NF-001",
      description: "Concreto usinado FCK 25",
      supplier: "Concreteira São Paulo",
      phase: "Estrutura",
      subPhase: "Concreto",
      class: "Concreto",
      type: "Material",
      cost: 15000,
      status: "approved",
      notes: "Entrega programada para 16/01",
    },
    {
      id: "2",
      date: "2024-01-18",
      nf: "NF-002",
      description: "Ferragem CA-50 12mm",
      supplier: "Aços Bragança",
      phase: "Estrutura",
      subPhase: "Ferragem",
      class: "Aço",
      type: "Material",
      cost: 8500,
      status: "approved",
    },
    {
      id: "3",
      date: "2024-01-20",
      nf: "NF-003",
      description: "Pedreiro especializado",
      supplier: "João Silva Construções",
      phase: "Alvenarias e Reboco",
      subPhase: "Alvenaria estrutural",
      class: "Mão de obra especializada",
      type: "Mão de obra",
      cost: 3200,
      status: "pending",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPhase, setSelectedPhase] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date().toISOString().split("T")[0],
    status: "pending",
  })

  // Filter expenses based on search and filters
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch =
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.nf.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPhase = selectedPhase === "all" || expense.phase === selectedPhase
      const matchesType = selectedType === "all" || expense.type === selectedType
      const matchesStatus = selectedStatus === "all" || expense.status === selectedStatus

      return matchesSearch && matchesPhase && matchesType && matchesStatus
    })
  }, [expenses, searchTerm, selectedPhase, selectedType, selectedStatus])

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalCost = expenses.reduce((sum, expense) => sum + expense.cost, 0)
    const approvedCost = expenses.filter((e) => e.status === "approved").reduce((sum, expense) => sum + expense.cost, 0)
    const pendingCost = expenses.filter((e) => e.status === "pending").reduce((sum, expense) => sum + expense.cost, 0)

    const costsByPhase = constructionWBS.phases
      .map((phase) => ({
        name: phase.name,
        value: expenses.filter((e) => e.phase === phase.name).reduce((sum, expense) => sum + expense.cost, 0),
        color: phase.color,
      }))
      .filter((item) => item.value > 0)

    const costsByType = constructionWBS.types
      .map((type) => ({
        name: type,
        value: expenses.filter((e) => e.type === type).reduce((sum, expense) => sum + expense.cost, 0),
      }))
      .filter((item) => item.value > 0)

    return {
      totalCost,
      approvedCost,
      pendingCost,
      costsByPhase,
      costsByType,
      totalExpenses: expenses.length,
      pendingExpenses: expenses.filter((e) => e.status === "pending").length,
    }
  }, [expenses])

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.cost && newExpense.phase) {
      const expense: Expense = {
        id: Date.now().toString(),
        date: newExpense.date || new Date().toISOString().split("T")[0],
        nf: newExpense.nf || "",
        description: newExpense.description,
        supplier: newExpense.supplier || "",
        phase: newExpense.phase,
        subPhase: newExpense.subPhase || "",
        class: newExpense.class || "",
        type: newExpense.type || "Material",
        cost: newExpense.cost,
        status: (newExpense.status as "pending" | "approved" | "rejected") || "pending",
        notes: newExpense.notes,
      }

      setExpenses([...expenses, expense])
      setNewExpense({ date: new Date().toISOString().split("T")[0], status: "pending" })
      setIsAddingExpense(false)
    }
  }

  const getSubPhases = (phaseName: string) => {
    const phase = constructionWBS.phases.find((p) => p.name === phaseName)
    return phase?.subPhases || []
  }

  const COLORS = ["#4A7C59", "#E97451", "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00"]

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Gasto</p>
                <p className="text-2xl font-bold text-green-800">R$ {analytics.totalCost.toLocaleString("pt-BR")}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Aprovado</p>
                <p className="text-2xl font-bold text-blue-800">R$ {analytics.approvedCost.toLocaleString("pt-BR")}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Pendente</p>
                <p className="text-2xl font-bold text-orange-800">R$ {analytics.pendingCost.toLocaleString("pt-BR")}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Lançamentos</p>
                <p className="text-2xl font-bold text-purple-800">{analytics.totalExpenses}</p>
                <p className="text-xs text-purple-600">{analytics.pendingExpenses} pendentes</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
              Gastos por Etapa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.costsByPhase}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
                <YAxis />
                <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Valor"]} />
                <Bar dataKey="value" fill="#4A7C59" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LucidePieChart className="h-5 w-5 mr-2 text-orange-600" />
              Gastos por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={analytics.costsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.costsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Valor"]} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Lançamentos Detalhados - {projectName}
              </CardTitle>
              <CardDescription>Gestão completa de despesas por etapa da obra</CardDescription>
            </div>
            {userType === "admin" && (
              <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Lançamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Novo Lançamento</DialogTitle>
                    <DialogDescription>Adicione um novo lançamento de despesa ao projeto</DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Nota Fiscal</Label>
                      <Input
                        placeholder="NF-001"
                        value={newExpense.nf}
                        onChange={(e) => setNewExpense({ ...newExpense, nf: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Descrição *</Label>
                      <Input
                        placeholder="Descrição do item/serviço"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Fornecedor</Label>
                      <Input
                        placeholder="Nome do fornecedor"
                        value={newExpense.supplier}
                        onChange={(e) => setNewExpense({ ...newExpense, supplier: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Valor (R$) *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={newExpense.cost}
                        onChange={(e) => setNewExpense({ ...newExpense, cost: Number.parseFloat(e.target.value) || 0 })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Etapa *</Label>
                      <Select
                        value={newExpense.phase}
                        onValueChange={(value) => setNewExpense({ ...newExpense, phase: value, subPhase: "" })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a etapa" />
                        </SelectTrigger>
                        <SelectContent>
                          {constructionWBS.phases.map((phase) => (
                            <SelectItem key={phase.id} value={phase.name}>
                              {phase.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Sub-etapa</Label>
                      <Select
                        value={newExpense.subPhase}
                        onValueChange={(value) => setNewExpense({ ...newExpense, subPhase: value })}
                        disabled={!newExpense.phase}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a sub-etapa" />
                        </SelectTrigger>
                        <SelectContent>
                          {newExpense.phase &&
                            getSubPhases(newExpense.phase).map((subPhase) => (
                              <SelectItem key={subPhase} value={subPhase}>
                                {subPhase}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Classe</Label>
                      <Select
                        value={newExpense.class}
                        onValueChange={(value) => setNewExpense({ ...newExpense, class: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a classe" />
                        </SelectTrigger>
                        <SelectContent>
                          {constructionWBS.classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>
                              {cls}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <Select
                        value={newExpense.type}
                        onValueChange={(value) => setNewExpense({ ...newExpense, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {constructionWBS.types.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Observações</Label>
                      <Textarea
                        placeholder="Observações adicionais..."
                        value={newExpense.notes}
                        onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddingExpense(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddExpense}>Salvar Lançamento</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por descrição, fornecedor ou NF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedPhase} onValueChange={setSelectedPhase}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Todas as etapas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as etapas</SelectItem>
                {constructionWBS.phases.map((phase) => (
                  <SelectItem key={phase.id} value={phase.name}>
                    {phase.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                {constructionWBS.types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>NF</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Sub-etapa</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead>
                  {userType === "admin" && <TableHead>Ações</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{new Date(expense.date).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell className="font-mono text-sm">{expense.nf}</TableCell>
                    <TableCell className="max-w-xs truncate">{expense.description}</TableCell>
                    <TableCell>{expense.supplier}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {expense.phase}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-gray-600">{expense.subPhase}</TableCell>
                    <TableCell className="text-sm text-gray-600">{expense.class}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {expense.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">R$ {expense.cost.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          expense.status === "approved"
                            ? "default"
                            : expense.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {expense.status === "approved"
                          ? "Aprovado"
                          : expense.status === "pending"
                            ? "Pendente"
                            : "Rejeitado"}
                      </Badge>
                    </TableCell>
                    {userType === "admin" && (
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredExpenses.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum lançamento encontrado</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedPhase !== "all" || selectedType !== "all" || selectedStatus !== "all"
                  ? "Tente ajustar os filtros para encontrar lançamentos."
                  : "Comece adicionando o primeiro lançamento do projeto."}
              </p>
              {userType === "admin" && (
                <Button onClick={() => setIsAddingExpense(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Lançamento
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
