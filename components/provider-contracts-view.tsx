"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Download,
  Plus,
  Calendar,
  DollarSign,
  Ruler,
  CheckCircle,
  Clock,
  AlertCircle,
  Save,
} from "lucide-react"

interface MeasurementReport {
  id: string
  date: string
  description: string
  quantity: number
  unit: string
  unitValue: number
  totalValue: number
  status: "pending" | "approved" | "rejected"
  notes?: string
  approvedBy?: string
  approvedDate?: string
  reportFile?: string
}

interface Contract {
  id: string
  title: string
  projectName: string
  clientName: string
  totalValue: number
  paidValue: number
  balanceValue: number
  completedPercentage: number
  status: "active" | "completed" | "paused"
  contractType: "measurement" | "lump_sum"
  startDate: string
  endDate?: string
  services: string[]
  measurements: MeasurementReport[]
}

interface ProviderContractsViewProps {
  userType: "admin" | "provider"
  providerId?: string
}

export function ProviderContractsView({ userType, providerId }: ProviderContractsViewProps) {
  const [expandedContracts, setExpandedContracts] = useState<string[]>([])
  const [showAddMeasurement, setShowAddMeasurement] = useState<string | null>(null)
  const [newMeasurement, setNewMeasurement] = useState({
    description: "",
    quantity: 0,
    unit: "",
    unitValue: 0,
    notes: "",
  })

  // Mock data for service provider contracts
  const contracts: Contract[] = [
    {
      id: "c1",
      title: "Estrutura e Fundação - Residência Alphaville",
      projectName: "Residência Alphaville",
      clientName: "João Silva",
      totalValue: 85000,
      paidValue: 45000,
      balanceValue: 40000,
      completedPercentage: 65,
      status: "active",
      contractType: "measurement",
      startDate: "2024-01-15",
      services: ["Estrutura", "Fundação", "Alvenaria"],
      measurements: [
        {
          id: "m1",
          date: "2024-01-25",
          description: "Escavação para fundação",
          quantity: 120,
          unit: "m³",
          unitValue: 85,
          totalValue: 10200,
          status: "approved",
          approvedBy: "Eng. Carlos Silva",
          approvedDate: "2024-01-26",
          reportFile: "medicao_001.pdf",
        },
        {
          id: "m2",
          date: "2024-02-15",
          description: "Concreto para fundação",
          quantity: 45,
          unit: "m³",
          unitValue: 320,
          totalValue: 14400,
          status: "approved",
          approvedBy: "Eng. Carlos Silva",
          approvedDate: "2024-02-16",
          reportFile: "medicao_002.pdf",
        },
        {
          id: "m3",
          date: "2024-02-28",
          description: "Estrutura em concreto armado",
          quantity: 65,
          unit: "m³",
          unitValue: 450,
          totalValue: 29250,
          status: "approved",
          approvedBy: "Eng. Carlos Silva",
          approvedDate: "2024-03-01",
          reportFile: "medicao_003.pdf",
        },
        {
          id: "m4",
          date: "2024-03-15",
          description: "Alvenaria de vedação",
          quantity: 180,
          unit: "m²",
          unitValue: 65,
          totalValue: 11700,
          status: "pending",
          notes: "Aguardando aprovação da medição",
        },
        {
          id: "m5",
          date: "2024-03-20",
          description: "Laje pré-moldada",
          quantity: 85,
          unit: "m²",
          unitValue: 120,
          totalValue: 10200,
          status: "rejected",
          notes: "Quantidade divergente do projeto. Revisar medição.",
        },
      ],
    },
    {
      id: "c2",
      title: "Instalações Elétricas - Edifício Comercial",
      projectName: "Edifício Comercial",
      clientName: "Construtora ABC",
      totalValue: 35000,
      paidValue: 0,
      balanceValue: 35000,
      completedPercentage: 25,
      status: "active",
      contractType: "measurement",
      startDate: "2024-03-10",
      services: ["Instalações Elétricas"],
      measurements: [
        {
          id: "m6",
          date: "2024-03-25",
          description: "Pontos de luz - 1º pavimento",
          quantity: 45,
          unit: "ponto",
          unitValue: 85,
          totalValue: 3825,
          status: "pending",
          notes: "Primeira medição do contrato",
        },
        {
          id: "m7",
          date: "2024-04-05",
          description: "Tomadas - 1º pavimento",
          quantity: 32,
          unit: "ponto",
          unitValue: 65,
          totalValue: 2080,
          status: "pending",
        },
      ],
    },
    {
      id: "c3",
      title: "Pintura e Acabamento - Reforma Centro",
      projectName: "Reforma Centro",
      clientName: "Maria Santos",
      totalValue: 25000,
      paidValue: 25000,
      balanceValue: 0,
      completedPercentage: 100,
      status: "completed",
      contractType: "lump_sum",
      startDate: "2023-11-15",
      endDate: "2024-01-30",
      services: ["Pintura", "Acabamento"],
      measurements: [], // Empreitada global não tem medições
    },
  ]

  const toggleContract = (contractId: string) => {
    setExpandedContracts((prev) =>
      prev.includes(contractId) ? prev.filter((id) => id !== contractId) : [...prev, contractId],
    )
  }

  const handleDownloadReport = (reportFile: string) => {
    console.log("Baixando relatório:", reportFile)
    const link = document.createElement("a")
    link.href = `/placeholder.pdf?name=${reportFile}`
    link.download = reportFile
    link.click()
  }

  const handleAddMeasurement = (contractId: string) => {
    if (!newMeasurement.description || newMeasurement.quantity <= 0) return

    const measurement: MeasurementReport = {
      id: `m${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      description: newMeasurement.description,
      quantity: newMeasurement.quantity,
      unit: newMeasurement.unit,
      unitValue: newMeasurement.unitValue,
      totalValue: newMeasurement.quantity * newMeasurement.unitValue,
      status: "pending",
      notes: newMeasurement.notes,
    }

    console.log("Adicionando nova medição:", measurement)

    // Reset form
    setNewMeasurement({
      description: "",
      quantity: 0,
      unit: "",
      unitValue: 0,
      notes: "",
    })
    setShowAddMeasurement(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="default" className="bg-green-600">
            Aprovada
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-600">
            Pendente
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejeitada</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getContractStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Ativo</Badge>
      case "completed":
        return <Badge variant="secondary">Concluído</Badge>
      case "paused":
        return <Badge variant="outline">Pausado</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Meus Contratos</h2>
          <p className="text-gray-600">Gerencie seus contratos e medições</p>
        </div>
        <Badge variant="outline">{contracts.length} contratos</Badge>
      </div>

      <div className="space-y-4">
        {contracts.map((contract) => {
          const isExpanded = expandedContracts.includes(contract.id)
          const approvedMeasurements = contract.measurements.filter((m) => m.status === "approved")
          const pendingMeasurements = contract.measurements.filter((m) => m.status === "pending")
          const rejectedMeasurements = contract.measurements.filter((m) => m.status === "rejected")

          return (
            <Card key={contract.id} className="border-2 hover:shadow-lg transition-shadow">
              <Collapsible open={isExpanded} onOpenChange={() => toggleContract(contract.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-600" />
                        )}
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{contract.title}</CardTitle>
                          <CardDescription>
                            {contract.projectName} • Cliente: {contract.clientName}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getContractStatusBadge(contract.status)}
                        <Badge variant="outline">
                          {contract.contractType === "measurement" ? "Por Medição" : "Empreitada Global"}
                        </Badge>
                      </div>
                    </div>

                    {/* Contract Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Valor Total</p>
                        <p className="text-lg font-bold text-blue-600">
                          R$ {contract.totalValue.toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Pago</p>
                        <p className="text-lg font-bold text-green-600">
                          R$ {contract.paidValue.toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600">Saldo</p>
                        <p className="text-lg font-bold text-orange-600">
                          R$ {contract.balanceValue.toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Progresso</p>
                        <p className="text-lg font-bold text-purple-600">{contract.completedPercentage}%</p>
                        <Progress value={contract.completedPercentage} className="mt-2" />
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    {/* Contract Details */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Informações do Contrato</h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="font-medium">Início:</span>{" "}
                              {new Date(contract.startDate).toLocaleDateString("pt-BR")}
                            </p>
                            {contract.endDate && (
                              <p>
                                <span className="font-medium">Fim:</span>{" "}
                                {new Date(contract.endDate).toLocaleDateString("pt-BR")}
                              </p>
                            )}
                            <p>
                              <span className="font-medium">Serviços:</span> {contract.services.join(", ")}
                            </p>
                          </div>
                        </div>
                        {contract.contractType === "measurement" && (
                          <div>
                            <h4 className="font-medium mb-2">Resumo das Medições</h4>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="text-center p-2 bg-green-100 rounded">
                                <p className="font-medium text-green-800">{approvedMeasurements.length}</p>
                                <p className="text-green-600">Aprovadas</p>
                              </div>
                              <div className="text-center p-2 bg-yellow-100 rounded">
                                <p className="font-medium text-yellow-800">{pendingMeasurements.length}</p>
                                <p className="text-yellow-600">Pendentes</p>
                              </div>
                              <div className="text-center p-2 bg-red-100 rounded">
                                <p className="font-medium text-red-800">{rejectedMeasurements.length}</p>
                                <p className="text-red-600">Rejeitadas</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Measurement Reports */}
                    {contract.contractType === "measurement" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-lg flex items-center">
                            <Ruler className="h-5 w-5 mr-2 text-blue-600" />
                            Relatórios de Medição
                          </h4>
                          {userType === "admin" && contract.status === "active" && (
                            <Dialog
                              open={showAddMeasurement === contract.id}
                              onOpenChange={(open) => setShowAddMeasurement(open ? contract.id : null)}
                            >
                              <DialogTrigger asChild>
                                <Button size="sm">
                                  <Plus className="h-4 w-4 mr-2" />
                                  Nova Medição
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Nova Medição</DialogTitle>
                                  <DialogDescription>Adicione uma nova medição para este contrato.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="description">Descrição</Label>
                                    <Input
                                      id="description"
                                      value={newMeasurement.description}
                                      onChange={(e) =>
                                        setNewMeasurement({ ...newMeasurement, description: e.target.value })
                                      }
                                      placeholder="Ex: Alvenaria de vedação"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="quantity">Quantidade</Label>
                                      <Input
                                        id="quantity"
                                        type="number"
                                        value={newMeasurement.quantity}
                                        onChange={(e) =>
                                          setNewMeasurement({
                                            ...newMeasurement,
                                            quantity: Number.parseFloat(e.target.value) || 0,
                                          })
                                        }
                                        placeholder="0"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="unit">Unidade</Label>
                                      <Select
                                        value={newMeasurement.unit}
                                        onValueChange={(value) => setNewMeasurement({ ...newMeasurement, unit: value })}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="m²">m²</SelectItem>
                                          <SelectItem value="m³">m³</SelectItem>
                                          <SelectItem value="m">m</SelectItem>
                                          <SelectItem value="ponto">ponto</SelectItem>
                                          <SelectItem value="un">un</SelectItem>
                                          <SelectItem value="kg">kg</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="unitValue">Valor Unitário (R$)</Label>
                                    <Input
                                      id="unitValue"
                                      type="number"
                                      value={newMeasurement.unitValue}
                                      onChange={(e) =>
                                        setNewMeasurement({
                                          ...newMeasurement,
                                          unitValue: Number.parseFloat(e.target.value) || 0,
                                        })
                                      }
                                      placeholder="0.00"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="notes">Observações</Label>
                                    <Textarea
                                      id="notes"
                                      value={newMeasurement.notes}
                                      onChange={(e) => setNewMeasurement({ ...newMeasurement, notes: e.target.value })}
                                      placeholder="Observações sobre a medição..."
                                    />
                                  </div>
                                  {newMeasurement.quantity > 0 && newMeasurement.unitValue > 0 && (
                                    <div className="p-3 bg-blue-50 rounded">
                                      <p className="font-medium text-blue-800">
                                        Valor Total: R${" "}
                                        {(newMeasurement.quantity * newMeasurement.unitValue).toLocaleString("pt-BR")}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setShowAddMeasurement(null)}>
                                    Cancelar
                                  </Button>
                                  <Button onClick={() => handleAddMeasurement(contract.id)}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Salvar
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>

                        {contract.measurements.length > 0 ? (
                          <div className="space-y-3">
                            {contract.measurements.map((measurement) => (
                              <Card key={measurement.id} className="border border-gray-200">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                      {getStatusIcon(measurement.status)}
                                      <div>
                                        <h5 className="font-medium">{measurement.description}</h5>
                                        <p className="text-sm text-gray-600 flex items-center">
                                          <Calendar className="h-3 w-3 mr-1" />
                                          {new Date(measurement.date).toLocaleDateString("pt-BR")}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {getStatusBadge(measurement.status)}
                                      {measurement.reportFile && (
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleDownloadReport(measurement.reportFile!)}
                                        >
                                          <Download className="h-4 w-4 mr-1" />
                                          PDF
                                        </Button>
                                      )}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                      <p className="text-gray-600">Quantidade</p>
                                      <p className="font-medium flex items-center">
                                        <Ruler className="h-3 w-3 mr-1" />
                                        {measurement.quantity.toLocaleString("pt-BR")} {measurement.unit}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Valor Unitário</p>
                                      <p className="font-medium flex items-center">
                                        <DollarSign className="h-3 w-3 mr-1" />
                                        R$ {measurement.unitValue.toLocaleString("pt-BR")}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Valor Total</p>
                                      <p className="font-medium text-blue-600 flex items-center">
                                        <DollarSign className="h-3 w-3 mr-1" />
                                        R$ {measurement.totalValue.toLocaleString("pt-BR")}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Status</p>
                                      <p className="font-medium">
                                        {measurement.status === "approved"
                                          ? "Aprovada"
                                          : measurement.status === "pending"
                                            ? "Pendente"
                                            : "Rejeitada"}
                                      </p>
                                    </div>
                                  </div>

                                  {measurement.notes && (
                                    <div className="mt-3 p-3 bg-gray-50 rounded">
                                      <p className="text-sm text-gray-700">{measurement.notes}</p>
                                    </div>
                                  )}

                                  {measurement.approvedBy && measurement.approvedDate && (
                                    <div className="mt-3 text-sm text-gray-600">
                                      Aprovada por {measurement.approvedBy} em{" "}
                                      {new Date(measurement.approvedDate).toLocaleDateString("pt-BR")}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Ruler className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>Nenhuma medição registrada ainda</p>
                            {userType === "admin" && contract.status === "active" && (
                              <p className="text-sm mt-2">Clique em "Nova Medição" para adicionar a primeira medição</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Lump Sum Contract Message */}
                    {contract.contractType === "lump_sum" && (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Contrato por Empreitada Global</p>
                        <p className="text-sm mt-2">Este contrato não possui medições individuais</p>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        })}
      </div>

      {contracts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">Nenhum contrato encontrado</h3>
          <p>Você ainda não possui contratos ativos ou concluídos.</p>
        </div>
      )}
    </div>
  )
}
