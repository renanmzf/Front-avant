"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Building2,
  Download,
  Eye,
  MessageSquare,
  Receipt,
  DollarSign,
  FileText,
  Plus,
  Save,
  ChevronLeft,
  Ruler,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { ChatComponent } from "@/components/chat-component"
import RevenueChartScreen from "@/components/revenue-chart-screen"

interface Measurement {
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
}

interface Contract {
  id: string
  project: string
  projectId: string
  client: string
  contractType: "measurement" | "lump_sum"
  contractValue: number
  paidValue: number
  remainingValue: number
  status: "active" | "completed" | "suspended"
  signedDate: string
  startDate: string
  endDate?: string
  services: string[]
  description: string
  measurements?: Measurement[]
  paymentSchedule?: string
  unitPrice?: number
  estimatedQuantity?: number
}

export default function PrestadorPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedProject, setSelectedProject] = useState<string>("1")
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [showMeasurementForm, setShowMeasurementForm] = useState(false)
  const [newMeasurement, setNewMeasurement] = useState({
    description: "",
    quantity: 0,
    unit: "",
    unitValue: 0,
    notes: "",
  })

  // Dados do prestador logado
  const prestadorData = {
    id: 2,
    name: "João Silva Construções",
    email: "contato@joaosilva.com.br",
    cpfCnpj: "12.345.678/0001-90",
    projects: ["1"],
    contracts: ["Estrutura e Fundação"],
    canAddMeasurements: true, // Permissão do administrador
  }

  // Contratos detalhados com medições
  const myContracts: Contract[] = [
    {
      id: "1",
      project: "Residência Alphaville",
      projectId: "1",
      client: "João Silva",
      contractType: "measurement",
      contractValue: 0, // Calculado dinamicamente para contratos por medição
      paidValue: 45000,
      remainingValue: 0, // Calculado dinamicamente
      status: "active",
      signedDate: "2024-01-10",
      startDate: "2024-01-15",
      services: ["Estrutura", "Fundação", "Alvenaria"],
      description: "Execução de estrutura, fundação e alvenaria por medição",
      paymentSchedule: "Mensal mediante medição",
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
      id: "2",
      project: "Reforma Centro",
      projectId: "2",
      client: "Maria Santos",
      contractType: "lump_sum",
      contractValue: 25000,
      paidValue: 25000,
      remainingValue: 0,
      status: "completed",
      signedDate: "2023-11-01",
      startDate: "2023-11-15",
      endDate: "2024-01-30",
      services: ["Pintura", "Acabamento"],
      description: "Serviços de pintura e acabamento por empreitada global",
      paymentSchedule: "3 parcelas: 40% início, 40% meio, 20% final",
    },
    {
      id: "3",
      project: "Edifício Comercial",
      projectId: "3",
      client: "Construtora ABC",
      contractType: "measurement",
      contractValue: 0,
      paidValue: 0,
      remainingValue: 0,
      status: "active",
      signedDate: "2024-03-01",
      startDate: "2024-03-10",
      services: ["Instalações Elétricas"],
      description: "Instalações elétricas por medição",
      paymentSchedule: "Quinzenal mediante medição",
      measurements: [
        {
          id: "m6",
          date: "2024-03-25",
          description: "Pontos de luz",
          quantity: 45,
          unit: "ponto",
          unitValue: 85,
          totalValue: 3825,
          status: "pending",
        },
      ],
    },
  ]

  // Calcular valores dinâmicos para contratos por medição
  const getContractTotals = (contract: Contract) => {
    if (contract.contractType === "lump_sum") {
      return {
        totalValue: contract.contractValue,
        approvedValue: contract.paidValue,
        pendingValue: contract.remainingValue,
      }
    }

    const measurements = contract.measurements || []
    const approvedMeasurements = measurements.filter((m) => m.status === "approved")
    const pendingMeasurements = measurements.filter((m) => m.status === "pending")

    const approvedValue = approvedMeasurements.reduce((sum, m) => sum + m.totalValue, 0)
    const pendingValue = pendingMeasurements.reduce((sum, m) => sum + m.totalValue, 0)
    const totalValue = approvedValue + pendingValue

    return { totalValue, approvedValue, pendingValue }
  }

  // Recibos organizados por contrato
  const myPaymentsByContract = [
    {
      contractId: "1",
      contractName: "Residência Alphaville - Estrutura e Fundação",
      payments: [
        {
          id: 1,
          receiptNumber: "REC-001",
          amount: 15000,
          paymentDate: "2024-01-25",
          description: "Pagamento - Medição 1 (Escavação + Fundação)",
          receiptFile: "recibo_001.pdf",
          project: "Residência Alphaville",
          measurementIds: ["m1"],
        },
        {
          id: 2,
          receiptNumber: "REC-002",
          amount: 30000,
          paymentDate: "2024-02-28",
          description: "Pagamento - Medições 2 e 3",
          receiptFile: "recibo_002.pdf",
          project: "Residência Alphaville",
          measurementIds: ["m2", "m3"],
        },
      ],
    },
    {
      contractId: "2",
      contractName: "Reforma Centro - Pintura e Acabamento",
      payments: [
        {
          id: 3,
          receiptNumber: "REC-003",
          amount: 10000,
          paymentDate: "2023-12-15",
          description: "Pagamento - 1ª Parcela (40%)",
          receiptFile: "recibo_003.pdf",
          project: "Reforma Centro",
        },
        {
          id: 4,
          receiptNumber: "REC-004",
          amount: 10000,
          paymentDate: "2024-01-15",
          description: "Pagamento - 2ª Parcela (40%)",
          receiptFile: "recibo_004.pdf",
          project: "Reforma Centro",
        },
        {
          id: 5,
          receiptNumber: "REC-005",
          amount: 5000,
          paymentDate: "2024-01-30",
          description: "Pagamento Final - 3ª Parcela (20%)",
          receiptFile: "recibo_005.pdf",
          project: "Reforma Centro",
        },
      ],
    },
  ]

  const activeContracts = myContracts.filter((contract) => contract.status === "active")
  const completedContracts = myContracts.filter((contract) => contract.status === "completed")

  const handleDownloadReceipt = (receiptName: string) => {
    console.log("Baixando recibo:", receiptName)
    const link = document.createElement("a")
    link.href = `/placeholder.pdf?name=${receiptName}`
    link.download = receiptName
    link.click()
  }

  const handleViewDocument = (fileName: string) => {
    console.log("Visualizando documento:", fileName)
    window.open(`/placeholder.pdf?name=${fileName}`, "_blank")
  }

  const handleDownloadMeasurementReport = (measurementId: string) => {
    console.log("Baixando relatório de medição:", measurementId)
    const link = document.createElement("a")
    link.href = `/placeholder.pdf?name=medicao_${measurementId}.pdf`
    link.download = `medicao_${measurementId}.pdf`
    link.click()
  }

  const handleAddMeasurement = () => {
    if (!selectedContract || !newMeasurement.description || newMeasurement.quantity <= 0) return

    const measurement: Measurement = {
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

    // Atualizar o contrato com a nova medição
    const updatedContracts = myContracts.map((contract) =>
      contract.id === selectedContract.id
        ? { ...contract, measurements: [...(contract.measurements || []), measurement] }
        : contract,
    )

    // Atualizar o contrato selecionado
    const updatedContract = updatedContracts.find((c) => c.id === selectedContract.id)
    if (updatedContract) {
      setSelectedContract(updatedContract)
    }

    // Limpar formulário
    setNewMeasurement({
      description: "",
      quantity: 0,
      unit: "",
      unitValue: 0,
      notes: "",
    })
    setShowMeasurementForm(false)
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
        return <Badge variant="default">Aprovada</Badge>
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejeitada</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
          <div className="p-6">
            <div className="flex items-center mb-8">
              <img src="/placeholder.svg?height=32&width=32" alt="Avant Garde Logo" className="h-8 w-8 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Avant Garde</h1>
                <p className="text-sm text-gray-600">Prestador</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab("dashboard")
                  setSelectedContract(null)
                }}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "contratos" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab("contratos")
                  setSelectedContract(null)
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Meus Contratos
              </Button>
            
              <Button
                variant={activeTab === "chat" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab("chat")
                  setSelectedContract(null)
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Comunicação
              </Button>
            </nav>

            <Separator className="my-6" />

            <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-6">
          {/* Contract Details View */}
          {selectedContract && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => setSelectedContract(null)}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedContract.project}</h1>
                  <p className="text-gray-600">
                    {selectedContract.contractType === "measurement" ? "Contrato por Medição" : "Empreitada Global"}
                  </p>
                </div>
              </div>

              {/* Contract Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Contrato</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Cliente</p>
                      <p className="font-medium">{selectedContract.client}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Tipo de Contrato</p>
                      <Badge variant={selectedContract.contractType === "measurement" ? "default" : "secondary"}>
                        {selectedContract.contractType === "measurement" ? "Por Medição" : "Empreitada Global"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge variant={selectedContract.status === "active" ? "default" : "secondary"}>
                        {selectedContract.status === "active" ? "Ativo" : "Concluído"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Forma de Pagamento</p>
                      <p className="font-medium text-sm">{selectedContract.paymentSchedule}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(() => {
                      const totals = getContractTotals(selectedContract)
                      return (
                        <>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              {selectedContract.contractType === "measurement"
                                ? "Valor Executado"
                                : "Valor do Contrato"}
                            </p>
                            <p className="text-2xl font-bold text-blue-600">
                              R$ {totals.totalValue.toLocaleString("pt-BR")}
                            </p>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-gray-600">Valor Aprovado/Pago</p>
                            <p className="text-2xl font-bold text-green-600">
                              R$ {totals.approvedValue.toLocaleString("pt-BR")}
                            </p>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              {selectedContract.contractType === "measurement" ? "Pendente Aprovação" : "Saldo"}
                            </p>
                            <p className="text-2xl font-bold text-yellow-600">
                              R$ {totals.pendingValue.toLocaleString("pt-BR")}
                            </p>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </CardContent>
              </Card>

              {/* Measurements Section (only for measurement contracts) */}
              {selectedContract.contractType === "measurement" && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <Ruler className="h-5 w-5 mr-2 text-blue-600" />
                          Medições
                        </CardTitle>
                        <CardDescription>Histórico de medições do contrato</CardDescription>
                      </div>
                      {prestadorData.canAddMeasurements && selectedContract.status === "active" && (
                        <Button onClick={() => setShowMeasurementForm(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Nova Medição
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Add Measurement Form */}
                    {showMeasurementForm && (
                      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <h4 className="font-medium mb-4">Nova Medição</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Descrição</Label>
                            <Input
                              value={newMeasurement.description}
                              onChange={(e) => setNewMeasurement({ ...newMeasurement, description: e.target.value })}
                              placeholder="Ex: Alvenaria de vedação"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Unidade</Label>
                            <Input
                              value={newMeasurement.unit}
                              onChange={(e) => setNewMeasurement({ ...newMeasurement, unit: e.target.value })}
                              placeholder="Ex: m², m³, ponto"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Quantidade</Label>
                            <Input
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
                            <Label>Valor Unitário (R$)</Label>
                            <Input
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
                          <div className="space-y-2 md:col-span-2">
                            <Label>Observações</Label>
                            <Textarea
                              value={newMeasurement.notes}
                              onChange={(e) => setNewMeasurement({ ...newMeasurement, notes: e.target.value })}
                              placeholder="Observações sobre a medição..."
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button onClick={handleAddMeasurement}>
                            <Save className="h-4 w-4 mr-2" />
                            Salvar Medição
                          </Button>
                          <Button variant="outline" onClick={() => setShowMeasurementForm(false)}>
                            Cancelar
                          </Button>
                        </div>
                        {newMeasurement.quantity > 0 && newMeasurement.unitValue > 0 && (
                          <div className="mt-4 p-3 bg-blue-50 rounded">
                            <p className="font-medium text-blue-800">
                              Valor Total: R${" "}
                              {(newMeasurement.quantity * newMeasurement.unitValue).toLocaleString("pt-BR")}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Measurements List */}
                    <div className="space-y-4">
                      {selectedContract.measurements?.map((measurement) => (
                        <div key={measurement.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(measurement.status)}
                              <div>
                                <h4 className="font-medium">{measurement.description}</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(measurement.date).toLocaleDateString("pt-BR")}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(measurement.status)}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadMeasurementReport(measurement.id)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Quantidade</p>
                              <p className="font-medium">
                                {measurement.quantity.toLocaleString("pt-BR")} {measurement.unit}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Valor Unitário</p>
                              <p className="font-medium">R$ {measurement.unitValue.toLocaleString("pt-BR")}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Valor Total</p>
                              <p className="font-medium text-blue-600">
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

                          {measurement.approvedBy && (
                            <div className="mt-3 text-sm text-gray-600">
                              Aprovada por {measurement.approvedBy} em{" "}
                              {measurement.approvedDate &&
                                new Date(measurement.approvedDate).toLocaleDateString("pt-BR")}
                            </div>
                          )}
                        </div>
                      ))}

                      {(!selectedContract.measurements || selectedContract.measurements.length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                          <Ruler className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>Nenhuma medição registrada ainda</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Receipts for this contract */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Receipt className="h-5 w-5 mr-2 text-green-600" />
                    Recibos de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {myPaymentsByContract
                      .find((contract) => contract.contractId === selectedContract.id)
                      ?.payments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="font-medium">{payment.description}</h5>
                              <Badge variant="outline">{payment.receiptNumber}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              Data: {new Date(payment.paymentDate).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <p className="font-semibold text-green-600">
                                R$ {payment.amount.toLocaleString("pt-BR")}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDocument(payment.receiptFile)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadReceipt(payment.receiptFile)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Baixar
                              </Button>
                            </div>
                          </div>
                        </div>
                      )) || (
                      <div className="text-center py-8 text-gray-500">
                        <Receipt className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Nenhum pagamento registrado ainda</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Dashboard View */}
          {!selectedContract && activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{prestadorData.name}</h1>
                  <p className="text-gray-600">CNPJ: {prestadorData.cpfCnpj}</p>
                </div>
                <Badge variant="default">Prestador Ativo</Badge>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Contratos Ativos</p>
                        <p className="text-2xl font-bold text-gray-900">{activeContracts.length}</p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Contratos Finalizados</p>
                        <p className="text-2xl font-bold text-gray-900">{completedContracts.length}</p>
                      </div>
                      <FileText className="h-8 w-8 text-gray-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Valor Total Recebido</p>
                        <p className="text-2xl font-bold text-green-600">
                          R${" "}
                          {myContracts.reduce((sum, contract) => sum + contract.paidValue, 0).toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total de Medições</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {myContracts.reduce((sum, contract) => sum + (contract.measurements?.length || 0), 0)}
                        </p>
                      </div>
                      <Ruler className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Graph Payment */}
              <RevenueChartScreen/>


              {/* Contracts Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Meus Contratos</CardTitle>
                  <CardDescription>Clique em um contrato para ver detalhes e medições</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myContracts.map((contract) => {
                      const totals = getContractTotals(contract)
                      return (
                        <div
                          key={contract.id}
                          className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => setSelectedContract(contract)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-lg">{contract.project}</h4>
                                <Badge variant={contract.contractType === "measurement" ? "default" : "secondary"}>
                                  {contract.contractType === "measurement" ? "Por Medição" : "Empreitada Global"}
                                </Badge>
                                <Badge variant={contract.status === "active" ? "default" : "secondary"}>
                                  {contract.status === "active" ? "Ativo" : "Concluído"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">Cliente: {contract.client}</p>
                              <p className="text-sm text-gray-500">Serviços: {contract.services.join(", ")}</p>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                <span>Início: {new Date(contract.startDate).toLocaleDateString("pt-BR")}</span>
                                {contract.endDate && (
                                  <span>Fim: {new Date(contract.endDate).toLocaleDateString("pt-BR")}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 bg-blue-50 rounded">
                              <p className="text-sm text-gray-600">
                                {contract.contractType === "measurement" ? "Valor Executado" : "Valor do Contrato"}
                              </p>
                              <p className="text-lg font-bold text-blue-600">
                                R$ {totals.totalValue.toLocaleString("pt-BR")}
                              </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded">
                              <p className="text-sm text-gray-600">Valor Recebido</p>
                              <p className="text-lg font-bold text-green-600">
                                R$ {totals.approvedValue.toLocaleString("pt-BR")}
                              </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded">
                              <p className="text-sm text-gray-600">
                                {contract.contractType === "measurement" ? "Pendente" : "Saldo"}
                              </p>
                              <p className="text-lg font-bold text-orange-600">
                                R$ {totals.pendingValue.toLocaleString("pt-BR")}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Contracts List View */}
          {!selectedContract && activeTab === "contratos" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Meus Contratos</h1>

              {/* Active Contracts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Contratos Ativos
                  </CardTitle>
                  <CardDescription>Contratos em andamento - clique para ver detalhes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeContracts.map((contract) => {
                      const totals = getContractTotals(contract)
                      return (
                        <div
                          key={contract.id}
                          className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => setSelectedContract(contract)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-lg">{contract.project}</h4>
                                <Badge variant={contract.contractType === "measurement" ? "default" : "secondary"}>
                                  {contract.contractType === "measurement" ? "Por Medição" : "Empreitada Global"}
                                </Badge>
                                <Badge variant="default">Ativo</Badge>
                              </div>
                              <p className="text-sm text-gray-600">Cliente: {contract.client}</p>
                              <p className="text-sm text-gray-600">Serviços: {contract.services.join(", ")}</p>
                              <p className="text-sm text-gray-600">{contract.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span>Início: {new Date(contract.startDate).toLocaleDateString("pt-BR")}</span>
                                <span>Assinado: {new Date(contract.signedDate).toLocaleDateString("pt-BR")}</span>
                                {contract.contractType === "measurement" && contract.measurements && (
                                  <span>Medições: {contract.measurements.length}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 bg-blue-50 rounded">
                              <p className="text-sm text-gray-600">
                                {contract.contractType === "measurement" ? "Valor Executado" : "Valor do Contrato"}
                              </p>
                              <p className="text-lg font-bold text-blue-600">
                                R$ {totals.totalValue.toLocaleString("pt-BR")}
                              </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded">
                              <p className="text-sm text-gray-600">Valor Recebido</p>
                              <p className="text-lg font-bold text-green-600">
                                R$ {totals.approvedValue.toLocaleString("pt-BR")}
                              </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded">
                              <p className="text-sm text-gray-600">
                                {contract.contractType === "measurement" ? "Pendente" : "Saldo"}
                              </p>
                              <p className="text-lg font-bold text-orange-600">
                                R$ {totals.pendingValue.toLocaleString("pt-BR")}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Completed Contracts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-gray-600" />
                    Contratos Finalizados
                  </CardTitle>
                  <CardDescription>Contratos já concluídos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedContracts.map((contract) => {
                      const totals = getContractTotals(contract)
                      return (
                        <div
                          key={contract.id}
                          className="border rounded-lg p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => setSelectedContract(contract)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-lg">{contract.project}</h4>
                                <Badge variant={contract.contractType === "measurement" ? "default" : "secondary"}>
                                  {contract.contractType === "measurement" ? "Por Medição" : "Empreitada Global"}
                                </Badge>
                                <Badge variant="secondary">Concluído</Badge>
                              </div>
                              <p className="text-sm text-gray-600">Cliente: {contract.client}</p>
                              <p className="text-sm text-gray-600">Serviços: {contract.services.join(", ")}</p>
                              <p className="text-sm text-gray-600">{contract.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span>Início: {new Date(contract.startDate).toLocaleDateString("pt-BR")}</span>
                                <span>
                                  Fim:{" "}
                                  {contract.endDate ? new Date(contract.endDate).toLocaleDateString("pt-BR") : "N/A"}
                                </span>
                                <span>Assinado: {new Date(contract.signedDate).toLocaleDateString("pt-BR")}</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-blue-50 rounded">
                              <p className="text-sm text-gray-600">Valor do Contrato</p>
                              <p className="text-lg font-bold text-blue-600">
                                R$ {totals.totalValue.toLocaleString("pt-BR")}
                              </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded">
                              <p className="text-sm text-gray-600">Total Recebido</p>
                              <p className="text-lg font-bold text-green-600">
                                R$ {totals.approvedValue.toLocaleString("pt-BR")}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Payments View */}
         

          {/* Chat View */}
          {!selectedContract && activeTab === "chat" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Comunicação</h1>
              <ChatComponent userType="prestador" userId="prestador1" projectId={selectedProject} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
