"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, ArrowUp, ArrowDown, Filter, X, Search, FileText, Calendar, DollarSign } from "lucide-react"

interface FinancialRecord {
  id: string
  nf: string
  sequence: string
  description: string
  supplier: string
  date: string
  phase: string
  type: string
  cost: number
  adminFee: number
}

interface SortConfig {
  key: keyof FinancialRecord
  direction: "asc" | "desc"
}

interface Filters {
  nf: string
  description: string
  supplier: string
  phase: string
  type: string
  costMin: string
  costMax: string
}

const mockData: FinancialRecord[] = [
  {
    id: "1",
    nf: "NF-001234",
    sequence: "001",
    description: "Concreto Usinado - 15m³",
    supplier: "Concreteira São Paulo",
    date: "2024-01-25",
    phase: "Estrutura",
    type: "Material",
    cost: 4800,
    adminFee: 10,
  },
  {
    id: "2",
    nf: "NF-005678",
    sequence: "002",
    description: "Mão de obra - Pedreiro",
    supplier: "João Silva Construções",
    date: "2024-01-20",
    phase: "Alvenaria",
    type: "Serviço",
    cost: 1800,
    adminFee: 15,
  },
  {
    id: "3",
    nf: "NF-009876",
    sequence: "003",
    description: "Tijolos cerâmicos - 1000 unidades",
    supplier: "Cerâmica Moderna",
    date: "2024-01-18",
    phase: "Alvenaria",
    type: "Material",
    cost: 850,
    adminFee: 12,
  },
  {
    id: "4",
    nf: "NF-012345",
    sequence: "004",
    description: "Instalação elétrica - Sala",
    supplier: "Elétrica Total",
    date: "2024-01-15",
    phase: "Instalações",
    type: "Serviço",
    cost: 2200,
    adminFee: 8,
  },
  {
    id: "5",
    nf: "NF-067890",
    sequence: "005",
    description: "Cimento Portland - 50 sacos",
    supplier: "Materiais Construção",
    date: "2024-01-12",
    phase: "Fundação",
    type: "Material",
    cost: 1200,
    adminFee: 10,
  },
  {
    id: "6",
    nf: "NF-054321",
    sequence: "006",
    description: "Pintura externa - Fachada",
    supplier: "Pinturas & Acabamentos",
    date: "2024-01-10",
    phase: "Acabamento",
    type: "Serviço",
    cost: 3500,
    adminFee: 12,
  },
]

const phases = ["Fundação", "Estrutura", "Alvenaria", "Cobertura", "Instalações", "Acabamento"]
const types = ["Material", "Serviço", "Equipamento", "Outros"]

export function FinancialDataTable() {
  const [data] = useState<FinancialRecord[]>(mockData)
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [filters, setFilters] = useState<Filters>({
    nf: "",
    description: "",
    supplier: "",
    phase: "",
    type: "",
    costMin: "",
    costMax: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  // Sorting logic
  const sortedData = useMemo(() => {
    const sortableData = [...data]
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        return 0
      })
    }
    return sortableData
  }, [data, sortConfig])

  // Filtering logic
  const filteredData = useMemo(() => {
    return sortedData.filter((record) => {
      const matchesNF = record.nf.toLowerCase().includes(filters.nf.toLowerCase())
      const matchesDescription = record.description.toLowerCase().includes(filters.description.toLowerCase())
      const matchesSupplier = record.supplier.toLowerCase().includes(filters.supplier.toLowerCase())
      const matchesPhase = !filters.phase || record.phase === filters.phase
      const matchesType = !filters.type || record.type === filters.type

      const costMin = filters.costMin ? Number.parseFloat(filters.costMin) : 0
      const costMax = filters.costMax ? Number.parseFloat(filters.costMax) : Number.POSITIVE_INFINITY
      const matchesCost = record.cost >= costMin && record.cost <= costMax

      return matchesNF && matchesDescription && matchesSupplier && matchesPhase && matchesType && matchesCost
    })
  }, [sortedData, filters])

  const handleSort = (key: keyof FinancialRecord) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (columnName: keyof FinancialRecord) => {
    if (!sortConfig || sortConfig.key !== columnName) {
      return <ArrowUpDown className="h-4 w-4" />
    }
    return sortConfig.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      nf: "",
      description: "",
      supplier: "",
      phase: "",
      type: "",
      costMin: "",
      costMax: "",
    })
  }

  const hasActiveFilters = Object.values(filters).some((filter) => filter !== "")

  const totalCost = filteredData.reduce((sum, record) => sum + record.cost, 0)
  const totalAdminFee = filteredData.reduce((sum, record) => sum + (record.cost * record.adminFee) / 100, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Dados Financeiros
              </CardTitle>
              <CardDescription>Tabela responsiva com filtros e ordenação para dados financeiros</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtros
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1">
                    {Object.values(filters).filter((f) => f !== "").length}
                  </Badge>
                )}
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Filters Panel */}
        {showFilters && (
          <CardContent className="border-t bg-gray-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
              {/* Text Filters */}
              <div className="space-y-2">
                <label className="text-sm font-medium">NF</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar NF..."
                    value={filters.nf}
                    onChange={(e) => updateFilter("nf", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar descrição..."
                    value={filters.description}
                    onChange={(e) => updateFilter("description", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fornecedor</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar fornecedor..."
                    value={filters.supplier}
                    onChange={(e) => updateFilter("supplier", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Select Filters */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Fase</label>
                <Select value={filters.phase} onValueChange={(value) => updateFilter("phase", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as fases" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as fases</SelectItem>
                    {phases.map((phase) => (
                      <SelectItem key={phase} value={phase}>
                        {phase}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Numeric Range Filters */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Custo Mínimo</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.costMin}
                    onChange={(e) => updateFilter("costMin", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Custo Máximo</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="∞"
                    value={filters.costMax}
                    onChange={(e) => updateFilter("costMax", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        )}

        <CardContent>
          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-4 text-sm">
              <span>
                <strong>{filteredData.length}</strong> de <strong>{data.length}</strong> registros
              </span>
              {hasActiveFilters && <Badge variant="outline">Filtros ativos</Badge>}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-blue-600">
                <strong>Total: R$ {totalCost.toLocaleString("pt-BR")}</strong>
              </span>
              <span className="text-orange-600">
                <strong>Taxa Admin: R$ {totalAdminFee.toLocaleString("pt-BR")}</strong>
              </span>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="min-w-[120px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("nf")}
                        className="h-auto p-0 font-medium hover:bg-transparent"
                      >
                        NF
                        {getSortIcon("nf")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[80px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("sequence")}
                        className="h-auto p-0 font-medium hover:bg-transparent"
                      >
                        #{getSortIcon("sequence")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("description")}
                        className="h-auto p-0 font-medium hover:bg-transparent"
                      >
                        Descrição
                        {getSortIcon("description")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[150px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("supplier")}
                        className="h-auto p-0 font-medium hover:bg-transparent"
                      >
                        Fornecedor
                        {getSortIcon("supplier")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("date")}
                        className="h-auto p-0 font-medium hover:bg-transparent"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Data
                        {getSortIcon("date")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("phase")}
                        className="h-auto p-0 font-medium hover:bg-transparent"
                      >
                        Fase
                        {getSortIcon("phase")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[100px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("type")}
                        className="h-auto p-0 font-medium hover:bg-transparent"
                      >
                        Tipo
                        {getSortIcon("type")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[120px] text-right">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("cost")}
                        className="h-auto p-0 font-medium hover:bg-transparent"
                      >
                        Custo (R$)
                        {getSortIcon("cost")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[120px] text-right">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("adminFee")}
                        className="h-auto p-0 font-medium hover:bg-transparent"
                      >
                        Taxa Admin (%)
                        {getSortIcon("adminFee")}
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                        Nenhum registro encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((record) => (
                      <TableRow key={record.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{record.nf}</TableCell>
                        <TableCell>{record.sequence}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={record.description}>
                          {record.description}
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate" title={record.supplier}>
                          {record.supplier}
                        </TableCell>
                        <TableCell>{new Date(record.date).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {record.phase}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={record.type === "Material" ? "default" : "secondary"} className="text-xs">
                            {record.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{record.cost.toLocaleString("pt-BR")}</TableCell>
                        <TableCell className="text-right">{record.adminFee}%</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Mobile Card View (hidden on larger screens) */}
          <div className="block sm:hidden mt-6">
            <div className="space-y-4">
              {filteredData.map((record) => (
                <Card key={record.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{record.nf}</div>
                        <div className="text-sm text-gray-500">#{record.sequence}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">R$ {record.cost.toLocaleString("pt-BR")}</div>
                        <div className="text-sm text-gray-500">{record.adminFee}% taxa</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{record.description}</div>
                      <div className="text-sm text-gray-500">{record.supplier}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString("pt-BR")}</div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {record.phase}
                        </Badge>
                        <Badge variant={record.type === "Material" ? "default" : "secondary"} className="text-xs">
                          {record.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
