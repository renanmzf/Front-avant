"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  User,
  Phone,
  Mail,
  FileText,
  ChevronDown,
  ChevronUp,
  HardHat,
  Zap,
  Droplets,
  Home,
  Calendar,
  MapPin,
  Ruler,
  DollarSign,
} from "lucide-react"

interface WorkDataSectionProps {
  projectId: string
  userType: "client" | "admin" | "contractor"
}

export default function WorkDataSection({ projectId, userType }: WorkDataSectionProps) {
  const [expandedResponsible, setExpandedResponsible] = useState<string | null>(null)

  // Informações gerais do projeto
  const projectInfo = {
    name: "Residência Familiar - Alphaville",
    area: 180, // m²
    address: "Rua das Flores, 123 - Alphaville, Barueri/SP",
    startDate: "2024-01-15",
    endDate: "2024-08-30",
    workType: "Residência Unifamiliar",
    owner: "João Silva",
    totalCost: 350000,
    status: "Em Andamento",
    progress: 65,
    alvaraNumber: "ALV-2024-001234",
    alvaraExpiry: "2025-01-15",
    alvaraStatus: "Válido",
  }

  // Responsáveis técnicos
  const technicalResponsibles = {
    obra: {
      id: "obra",
      title: "Responsável pela Obra",
      icon: HardHat,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      name: "Eng. Carlos Roberto Silva",
      registration: "CREA-SP 123456789",
      email: "carlos.eng@avantgarde.com.br",
      phone: "(11) 99999-1234",
      specialty: "Engenharia Civil - Execução de Obras",
      experience: "15 anos",
      status: "Ativo",
    },
    arquitetura: {
      id: "arquitetura",
      title: "Responsável pelo Projeto de Arquitetura",
      icon: Home,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      name: "Arq. Maria Fernanda Costa",
      registration: "CAU-SP 987654321",
      email: "maria.arq@avantgarde.com.br",
      phone: "(11) 99999-5678",
      specialty: "Arquitetura Residencial",
      experience: "12 anos",
      status: "Ativo",
    },
    estrutural: {
      id: "estrutural",
      title: "Responsável pelo Projeto Estrutural",
      icon: Building2,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      name: "Eng. Pedro Henrique Santos",
      registration: "CREA-SP 456789123",
      email: "pedro.estrutural@avantgarde.com.br",
      phone: "(11) 99999-9012",
      specialty: "Engenharia Estrutural - Concreto Armado",
      experience: "18 anos",
      status: "Ativo",
    },
    eletrico: {
      id: "eletrico",
      title: "Responsável pelo Projeto Elétrico",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      name: "Eng. Ana Paula Oliveira",
      registration: "CREA-SP 789123456",
      email: "ana.eletrica@avantgarde.com.br",
      phone: "(11) 99999-3456",
      specialty: "Engenharia Elétrica - Instalações Prediais",
      experience: "10 anos",
      status: "Ativo",
    },
    hidraulico: {
      id: "hidraulico",
      title: "Responsável pelo Projeto Hidráulico",
      icon: Droplets,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      name: "Eng. Roberto Lima Filho",
      registration: "CREA-SP 321654987",
      email: "roberto.hidraulico@avantgarde.com.br",
      phone: "(11) 99999-7890",
      specialty: "Engenharia Hidráulica - Sistemas Prediais",
      experience: "14 anos",
      status: "Ativo",
    },
  }

  const toggleExpanded = (responsibleId: string) => {
    setExpandedResponsible(expandedResponsible === responsibleId ? null : responsibleId)
  }

  const isAlvaraValid = new Date(projectInfo.alvaraExpiry) > new Date()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dados da Obra</h1>

      {/* Informações Gerais do Projeto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="h-5 w-5 mr-2 text-blue-600" />
            Informações Gerais do Projeto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Nome do Projeto</p>
              <p className="font-medium">{projectInfo.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Proprietário</p>
              <p className="font-medium">{projectInfo.owner}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Tipo de Obra</p>
              <p className="font-medium">{projectInfo.workType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Área Total</p>
              <p className="font-medium flex items-center">
                <Ruler className="h-4 w-4 mr-1 text-gray-500" />
                {projectInfo.area} m²
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Endereço</p>
              <p className="font-medium flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                {projectInfo.address}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Data de Início</p>
              <p className="font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                {new Date(projectInfo.startDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Previsão de Término</p>
              <p className="font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                {new Date(projectInfo.endDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Custo Total</p>
              <p className="font-medium text-blue-600 flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                R$ {projectInfo.totalCost.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Status</p>
              <Badge variant="default">{projectInfo.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alvará de Construção */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-green-600" />
            Alvará de Construção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Número do Alvará</p>
              <p className="font-medium font-mono">{projectInfo.alvaraNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Data de Validade</p>
              <p className="font-medium">{new Date(projectInfo.alvaraExpiry).toLocaleDateString("pt-BR")}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Status</p>
              <Badge variant={isAlvaraValid ? "default" : "destructive"}>{isAlvaraValid ? "Válido" : "Vencido"}</Badge>
            </div>
          </div>
          {!isAlvaraValid && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                ⚠️ Atenção: O alvará de construção está vencido. É necessário renovar para continuar a obra.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Responsáveis Técnicos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2 text-purple-600" />
            Responsáveis Técnicos
          </CardTitle>
          <CardDescription>Clique em cada responsável para ver as informações detalhadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.values(technicalResponsibles).map((responsible) => {
              const Icon = responsible.icon
              const isExpanded = expandedResponsible === responsible.id

              return (
                <div key={responsible.id} className="border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    className="w-full p-4 h-auto justify-between hover:bg-gray-50"
                    onClick={() => toggleExpanded(responsible.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${responsible.bgColor}`}>
                        <Icon className={`h-5 w-5 ${responsible.color}`} />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{responsible.title}</p>
                        <p className="text-sm text-gray-600">{responsible.name}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>

                  {isExpanded && (
                    <div className="px-4 pb-4 bg-gray-50">
                      <Separator className="mb-4" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">Nome Completo</p>
                              <p className="font-medium">{responsible.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">Registro Profissional</p>
                              <p className="font-medium font-mono">{responsible.registration}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">Especialidade</p>
                              <p className="font-medium">{responsible.specialty}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">E-mail</p>
                              <p className="font-medium">{responsible.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">Telefone</p>
                              <p className="font-medium">{responsible.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">Experiência</p>
                              <p className="font-medium">{responsible.experience}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Badge variant="default">{responsible.status}</Badge>
                        {userType === "admin" && (
                          <Button size="sm" variant="outline">
                            Editar Informações
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resumo Técnico */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Técnico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Responsáveis Cadastrados</p>
              <p className="text-2xl font-bold text-blue-600">{Object.keys(technicalResponsibles).length}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Registros Ativos</p>
              <p className="text-2xl font-bold text-green-600">
                {Object.values(technicalResponsibles).filter((r) => r.status === "Ativo").length}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Alvará</p>
              <p className={`text-2xl font-bold ${isAlvaraValid ? "text-green-600" : "text-red-600"}`}>
                {isAlvaraValid ? "Válido" : "Vencido"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
