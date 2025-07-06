"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { BarChart3, DollarSign, TrendingUp, Calendar, Edit, Building2, UserPlus, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { EnhancedFinancialCharts } from "@/components/enhanced-financial-charts"
import { EnhancedPhotoUpload } from "@/components/enhanced-photo-upload"
import { EnhancedDocumentUpload } from "@/components/enhanced-document-upload"
import { MeetingMinutes } from "@/components/meeting-minutes"
import { ChatComponent } from "@/components/chat-component"
import { ContractsFinancialManagement } from "@/components/contracts-financial-management"
import { ExpensesByPhases } from "@/components/expenses-by-phases"
import NewProjectForm from "@/components/new-project-form"
import UserManagement from "@/components/user-management"
import DailyReportForm from "@/components/daily-report-form"

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedProject, setSelectedProject] = useState<string>("1")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProjectForTabs, setSelectedProjectForTabs] = useState<string>("1")
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const lastProject = localStorage.getItem("lastAccessedProject")
    if (lastProject) {
      setSelectedProject(lastProject)
    }
  }, [])

  const works = [
    {
      id: "1",
      name: "Residência Alphaville",
      client: "João Silva",
      status: "Em Andamento",
      progress: 65,
      totalSpent: 45000,
      contractType: "Projeto + Administração de Obra",
      startDate: "2024-01-15",
      endDate: "2024-08-30",
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "2",
      name: "Reforma Centro",
      client: "Maria Santos",
      status: "Planejamento",
      progress: 15,
      totalSpent: 8000,
      contractType: "Obra",
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      color: "bg-green-50 border-green-200",
    },
    {
      id: "3",
      name: "Edifício Comercial",
      client: "Empresa ABC",
      status: "Em Andamento",
      progress: 40,
      totalSpent: 120000,
      contractType: "Ambos",
      startDate: "2023-12-01",
      endDate: "2024-12-31",
      color: "bg-purple-50 border-purple-200",
    },
  ]

  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@silva.com.br",
      type: "Cliente",
      cpfCnpj: "123.456.789-00",
      contractType: "Projeto + Administração de Obra",
      projects: ["1"],
      status: "Ativo",
      canViewRDO: true,
    },
    {
      id: 2,
      name: "João Silva Construções",
      email: "contato@joaosilva.com.br",
      type: "Prestador",
      cpfCnpj: "12.345.678/0001-90",
      projects: ["1"],
      contracts: ["Estrutura e Fundação"],
      status: "Ativo",
      canViewRDO: false,
    },
    {
      id: 3,
      name: "Maria Santos",
      email: "maria@santos.com.br",
      type: "Cliente",
      cpfCnpj: "987.654.321-00",
      contractType: "Obra",
      projects: ["2"],
      status: "Ativo",
      canViewRDO: true,
    },
  ]

  const rdoData = {
    id: 169,
    date: "2025-04-28",
    dayOfWeek: "segunda-feira",
    project: "Residência unifamiliar com garagem para dois carros",
    location: "Rua Piacenza, nro 272, Quadra K Lote 11, Residencial San Vitale, Bragança Paulista - SP",
    client: "ANDRESSA MENDES GONÇALVES DIAS",
    contract: "11/11/2024",
    startDate: "10/11/2025",
    endDate: "",
    elapsedDays: "169 / 365",
    weather: {
      morning: "Nublado",
      afternoon: "Claro",
      night: "",
    },
    workforce: {
      direct: {
        helper: 4,
        painter: 0,
        mason: 1,
        servant: 0,
        electrician: 0,
        plumber: 0,
        carpenter: 0,
        blacksmith: 0,
        driver: 0,
        surveyor: 0,
      },
      indirect: {
        engineer: 1,
        technicalResp: 1,
        admin: 0,
        storekeeper: 0,
        intern: 0,
        auxiliary: 0,
        surveyorTech: 0,
        technician: 0,
        architect: 0,
      },
    },
    equipment: {
      excavator: 0,
      bobcat: 0,
      template: 0,
      compactor: 0,
      bucket: 0,
      breaker: 0,
      scaffolding: 1,
      metalShore: 1,
      container: 0,
      vibrator: 0,
      drill: 0,
      perforator: 0,
      concretePump: 0,
      concreteTruck: 0,
      dumpTruck: 0,
      mixer: 0,
    },
    activities: [
      { description: "Execução de superestrutura", status: "Em andamento" },
      { description: "Execução de alvenaria", status: "Em andamento" },
      { description: "Execução de formas e cimbramento de vigas do pavimento superior", status: "Em andamento" },
      { description: "Montagem de lajes pré-fabricadas", status: "Em andamento" },
    ],
    shifts: [
      { period: "Manhã", entry: "07:30", exit: "12:00", hours: "04:30", weather: "Nublado", efficiency: "100%" },
      { period: "Tarde", entry: "13:00", exit: "17:00", hours: "04:00", weather: "Claro", efficiency: "100%" },
    ],
    totalHours: "08:30",
    inspectorVisit: true,
    observations: "",
    generalComments: "",
    responsibleEngineer: "Renan Mazuchelli Fernandes",
    technicalResp: "Eleandro Fernando de Campos",
    cau: "A1746081",
    cpf: "296.357.708-71",
  }

  const handleCreateUser = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Usuário criado com sucesso")
      alert("Usuário criado com sucesso!")
    } catch (error) {
      console.error("Erro ao criar usuário:", error)
      alert("Erro ao criar usuário")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveRDO = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("RDO salvo com sucesso")
      alert("RDO salvo com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar RDO:", error)
      alert("Erro ao salvar RDO")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditItem = (id: string, type: string) => {
    console.log(`Editando ${type} com ID:`, id)
    alert(`Função de edição para ${type} será implementada`)
  }

  const handleDeleteItem = (id: string, type: string) => {
    if (confirm(`Tem certeza que deseja excluir este ${type}?`)) {
      console.log(`Excluindo ${type} com ID:`, id)
      alert(`${type} excluído com sucesso`)
    }
  }

  const renderProjectSelector = () => (
    <div className="mb-6 flex items-center space-x-4">
      <Label className="text-sm font-medium">Projeto:</Label>
      <Select value={selectedProjectForTabs} onValueChange={setSelectedProjectForTabs}>
        <SelectTrigger className="w-64">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {works.map((work) => (
            <SelectItem key={work.id} value={work.id}>
              {work.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar Recolhível */}
        <CollapsibleSidebar
          userType="admin"
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onExit={() => router.push("/")}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Main Content com margem dinâmica */}
        <div className="flex-1 p-6 transition-all duration-300" style={{ marginLeft: isCollapsed ? "4rem" : "16rem" }}>
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Geral</h1>

              {/* Summary Cards com cores pastéis */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">Projetos Ativos</p>
                        <p className="text-2xl font-bold text-blue-800">{works.length}</p>
                      </div>
                      <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">Receita Total</p>
                        <p className="text-2xl font-bold text-green-800">R$ 235.000</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-700">Gasto Total</p>
                        <p className="text-2xl font-bold text-red-800">R$ 173.000</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700">Taxa Admin Total</p>
                        <p className="text-2xl font-bold text-purple-800">R$ 6.800</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gráficos Financeiros Aprimorados */}
              <EnhancedFinancialCharts projectId={selectedProject} />

              {/* Projects Overview com cores */}
              <Card>
                <CardHeader>
                  <CardTitle>Projetos em Andamento</CardTitle>
                  <CardDescription>Selecione um projeto para gerenciar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {works.map((work) => (
                      <Card key={work.id} className={`border-2 ${work.color}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{work.name}</h4>
                              <p className="text-sm text-gray-600">Cliente: {work.client}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant={work.status === "Em Andamento" ? "default" : "secondary"}>
                                  {work.status}
                                </Badge>
                                <Badge variant="outline">{work.contractType}</Badge>
                                <span className="text-sm text-gray-500">{work.progress}% concluído</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => setSelectedProject(work.id)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Gerenciar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}


          {activeTab === "project" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Criar Projeto</h1>
              <NewProjectForm/>
              
            </div>
          )}

         

          {activeTab === "contracts" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Gestão de Contratos</h1>
              <ContractsFinancialManagement userType="admin" />
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Cadastros</h1>

              <UserManagement />

            </div>
            )}

          {activeTab === "expenses" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Lançamentos por Etapas</h1>
              {renderProjectSelector()}
              <ExpensesByPhases
                projectId={selectedProjectForTabs}
                projectName={works.find((w) => w.id === selectedProjectForTabs)?.name || "Projeto"}
              />
            </div>
          )}

          {activeTab === "photos" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Galeria de Fotos</h1>
              {renderProjectSelector()}
              <EnhancedPhotoUpload
                projectId={selectedProjectForTabs}
                projectName={works.find((w) => w.id === selectedProjectForTabs)?.name || "Projeto"}
              />
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Documentos</h1>
              {renderProjectSelector()}
              <EnhancedDocumentUpload
                projectId={selectedProjectForTabs}
                projectName={works.find((w) => w.id === selectedProjectForTabs)?.name || "Projeto"}
              />
            </div>
          )}

          {activeTab === "rdo" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Relatório Diário de Obra (RDO)</h1>
              {renderProjectSelector()}
              <DailyReportForm />
              
            </div>
          )}

          {activeTab === "chat" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Chat com Cliente</h1>
              {renderProjectSelector()}
              <ChatComponent userType="admin" userId="admin1" projectId={selectedProjectForTabs} />
            </div>
          )}

          {activeTab === "meeting-minutes" && (
            <div className="space-y-6">
              <MeetingMinutes userType="admin" userId="admin1" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
