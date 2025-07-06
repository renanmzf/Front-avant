"use client"

import { useState } from "react"
import { MeetingMinutesList } from "@/components/meeting-minutes-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Users, Shield, Eye } from "lucide-react"

export default function MeetingMinutesDemo() {
  const [userType, setUserType] = useState<"admin" | "client" | "provider">("admin")
  const [selectedProject, setSelectedProject] = useState<string>("1")

  const userTypeDescriptions = {
    admin: "Vê todas as atas e pode marcar pontos como resolvidos",
    client: "Vê apenas atas marcadas como públicas para cliente",
    provider: "Vê apenas atas marcadas como públicas para prestador",
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Demo - Atas de Reunião</h1>
          <p className="text-gray-600">Demonstração do componente MeetingMinutesList com diferentes tipos de usuário</p>
        </div>

        {/* User Type Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Configuração de Demonstração
            </CardTitle>
            <CardDescription>Selecione o tipo de usuário para ver como as atas são exibidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Usuário</Label>
                <Select value={userType} onValueChange={(value: "admin" | "client" | "provider") => setUserType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-red-600" />
                        <span>Administrador</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="client">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span>Cliente</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="provider">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span>Prestador</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Projeto (opcional)</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Projetos</SelectItem>
                    <SelectItem value="1">Residência Alphaville</SelectItem>
                    <SelectItem value="2">Reforma Centro</SelectItem>
                    <SelectItem value="3">Edifício Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Visualizando como: {userType}</p>
                  <p className="text-sm text-blue-700">{userTypeDescriptions[userType]}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-green-600" />
                <h3 className="font-medium">Controle de Visibilidade</h3>
              </div>
              <p className="text-sm text-gray-600">
                Atas são filtradas automaticamente baseadas nas flags de visibilidade para cada tipo de usuário.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium">Interface Adaptativa</h3>
              </div>
              <p className="text-sm text-gray-600">
                Administradores podem marcar pontos como resolvidos, enquanto outros usuários têm visualização
                read-only.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="h-5 w-5 text-purple-600" />
                <h3 className="font-medium">Detalhes Completos</h3>
              </div>
              <p className="text-sm text-gray-600">
                Cada ponto inclui status, responsável, prazo, fotos e notas para acompanhamento completo.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Meeting Minutes Component */}
        <MeetingMinutesList
          userType={userType}
          userId={`${userType}1`}
          projectId={selectedProject || undefined}
          providerId={userType === "provider" ? "provider1" : undefined}
        />
      </div>
    </div>
  )
}
