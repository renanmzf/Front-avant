"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Save,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Camera,
  FileText,
  Users,
  CheckCircle,
  Clock,
  X,
  Building2,
} from "lucide-react"

interface MeetingPoint {
  id: string
  description: string
  status: "open" | "resolved"
  assignedTo?: string
  dueDate?: string
}

interface MeetingMinute {
  id: string
  title: string
  date: string
  type: "client" | "provider"
  projectId: string
  projectName: string
  participants: string[]
  points: MeetingPoint[]
  photos: string[]
  createdBy: string
  createdAt: string
  providerId?: string
  providerName?: string
}

interface MeetingMinutesProps {
  userType: "admin" | "client" | "prestador"
  userId: string
  projectId?: string
  providerId?: string
}

export function MeetingMinutes({ userType, userId, projectId, providerId }: MeetingMinutesProps) {
  const [meetings, setMeetings] = useState<MeetingMinute[]>([
    {
      id: "1",
      title: "Reunião de Acompanhamento - Semana 12",
      date: "2024-03-15",
      type: "client",
      projectId: "1",
      projectName: "Residência Alphaville",
      participants: ["João Silva (Cliente)", "Eng. Carlos Silva", "Arq. Maria Santos"],
      points: [
        {
          id: "1",
          description: "Definir acabamento dos banheiros",
          status: "open",
          assignedTo: "Cliente",
          dueDate: "2024-03-20",
        },
        {
          id: "2",
          description: "Aprovação do projeto elétrico revisado",
          status: "resolved",
          assignedTo: "Eng. Ana Costa",
        },
        {
          id: "3",
          description: "Cronograma de entrega dos materiais",
          status: "open",
          assignedTo: "João Silva Construções",
          dueDate: "2024-03-18",
        },
      ],
      photos: [
        "/placeholder.svg?height=200&width=300&text=Foto+1",
        "/placeholder.svg?height=200&width=300&text=Foto+2",
      ],
      createdBy: "admin",
      createdAt: "2024-03-15T14:30:00Z",
    },
    {
      id: "2",
      title: "Reunião Técnica - Estrutura",
      date: "2024-03-10",
      type: "provider",
      projectId: "1",
      projectName: "Residência Alphaville",
      participants: ["Eng. Carlos Silva", "João Silva Construções", "Eng. João Oliveira"],
      points: [
        {
          id: "4",
          description: "Revisão do projeto estrutural",
          status: "resolved",
          assignedTo: "Eng. João Oliveira",
        },
        {
          id: "5",
          description: "Cronograma de concretagem",
          status: "open",
          assignedTo: "João Silva Construções",
          dueDate: "2024-03-12",
        },
      ],
      photos: [],
      createdBy: "admin",
      createdAt: "2024-03-10T10:00:00Z",
      providerId: "2",
      providerName: "João Silva Construções",
    },
    {
      id: "3",
      title: "Reunião de Definições - Reforma Centro",
      date: "2024-03-08",
      type: "client",
      projectId: "2",
      projectName: "Reforma Centro",
      participants: ["Maria Santos (Cliente)", "Eng. Carlos Silva"],
      points: [
        {
          id: "6",
          description: "Escolha das cores para pintura",
          status: "resolved",
          assignedTo: "Maria Santos",
        },
      ],
      photos: [],
      createdBy: "admin",
      createdAt: "2024-03-08T16:00:00Z",
    },
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [editingMeeting, setEditingMeeting] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string>(projectId || "all")
  const [newMeeting, setNewMeeting] = useState<Partial<MeetingMinute>>({
    title: "",
    date: new Date().toISOString().split("T")[0],
    type: "client",
    projectId: projectId || "",
    participants: [],
    points: [],
    photos: [],
  })
  const [newPoint, setNewPoint] = useState("")
  const [newParticipant, setNewParticipant] = useState("")

  // Projetos disponíveis
  const projects = [
    { id: "1", name: "Residência Alphaville", color: "bg-blue-100 border-blue-300" },
    { id: "2", name: "Reforma Centro", color: "bg-green-100 border-green-300" },
    { id: "3", name: "Edifício Comercial", color: "bg-purple-100 border-purple-300" },
  ]

  // Filtrar reuniões baseado no tipo de usuário e projeto selecionado
  const filteredMeetings = meetings.filter((meeting) => {
    // Filtro por tipo de usuário
    if (userType === "client") {
      if (meeting.type !== "client" || (projectId && meeting.projectId !== projectId)) return false
    }
    if (userType === "prestador") {
      if (meeting.type !== "provider" || (providerId && meeting.providerId !== providerId)) return false
    }

    // Filtro por projeto selecionado
    if (selectedProject !== "all" && meeting.projectId !== selectedProject) return false

    return true
  })

  // Agrupar reuniões por projeto
  const meetingsByProject = filteredMeetings.reduce(
    (acc, meeting) => {
      if (!acc[meeting.projectId]) {
        acc[meeting.projectId] = []
      }
      acc[meeting.projectId].push(meeting)
      return acc
    },
    {} as Record<string, MeetingMinute[]>,
  )

  const addPoint = () => {
    if (newPoint.trim()) {
      const point: MeetingPoint = {
        id: Date.now().toString(),
        description: newPoint,
        status: "open",
      }
      setNewMeeting({
        ...newMeeting,
        points: [...(newMeeting.points || []), point],
      })
      setNewPoint("")
    }
  }

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setNewMeeting({
        ...newMeeting,
        participants: [...(newMeeting.participants || []), newParticipant],
      })
      setNewParticipant("")
    }
  }

  const removePoint = (pointId: string) => {
    setNewMeeting({
      ...newMeeting,
      points: newMeeting.points?.filter((p) => p.id !== pointId) || [],
    })
  }

  const removeParticipant = (index: number) => {
    const participants = [...(newMeeting.participants || [])]
    participants.splice(index, 1)
    setNewMeeting({
      ...newMeeting,
      participants,
    })
  }

  const togglePointStatus = (meetingId: string, pointId: string) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === meetingId
          ? {
              ...meeting,
              points: meeting.points.map((point) =>
                point.id === pointId ? { ...point, status: point.status === "open" ? "resolved" : "open" } : point,
              ),
            }
          : meeting,
      ),
    )
  }

  const saveMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.projectId) {
      const selectedProjectData = projects.find((p) => p.id === newMeeting.projectId)
      const meeting: MeetingMinute = {
        id: Date.now().toString(),
        title: newMeeting.title,
        date: newMeeting.date,
        type: newMeeting.type || "client",
        projectId: newMeeting.projectId,
        projectName: selectedProjectData?.name || "Projeto",
        participants: newMeeting.participants || [],
        points: newMeeting.points || [],
        photos: newMeeting.photos || [],
        createdBy: userId,
        createdAt: new Date().toISOString(),
        ...(newMeeting.type === "provider" && { providerId, providerName: "João Silva Construções" }),
      }

      setMeetings([meeting, ...meetings])
      setNewMeeting({
        title: "",
        date: new Date().toISOString().split("T")[0],
        type: "client",
        projectId: projectId || "",
        participants: [],
        points: [],
        photos: [],
      })
      setIsCreating(false)
    }
  }

  const downloadMinutes = (meetingId: string) => {
    console.log("Baixando ata:", meetingId)
    // Implementar download da ata em PDF
  }

  const uploadPhoto = () => {
    console.log("Upload de foto")
    // Implementar upload de foto
  }

  const getProjectColor = (projectId: string) => {
    return projects.find((p) => p.id === projectId)?.color || "bg-gray-100 border-gray-300"
  }

  if (userType !== "admin" && filteredMeetings.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma ata de reunião</h3>
          <p className="text-gray-600">Ainda não há atas de reunião disponíveis para visualização.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header com filtros */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Atas de Reunião</h2>
          <p className="text-gray-600">Gerencie e acompanhe as reuniões dos projetos</p>
        </div>
        <div className="flex items-center space-x-4">
          {userType === "admin" && (
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Projetos</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {userType === "admin" && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Ata
            </Button>
          )}
        </div>
      </div>

      {/* Formulário de criação */}
      {isCreating && userType === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Nova Ata de Reunião
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Título da Reunião</Label>
                <Input
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                  placeholder="Ex: Reunião de Acompanhamento - Semana 12"
                />
              </div>
              <div className="space-y-2">
                <Label>Data</Label>
                <Input
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Reunião</Label>
                <Select
                  value={newMeeting.type}
                  onValueChange={(value: "client" | "provider") => setNewMeeting({ ...newMeeting, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Reunião com Cliente</SelectItem>
                    <SelectItem value="provider">Reunião com Prestador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Projeto</Label>
                <Select
                  value={newMeeting.projectId}
                  onValueChange={(value) => setNewMeeting({ ...newMeeting, projectId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Participantes */}
            <div className="space-y-3">
              <Label>Participantes</Label>
              <div className="flex space-x-2">
                <Input
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  placeholder="Nome do participante"
                  onKeyPress={(e) => e.key === "Enter" && addParticipant()}
                />
                <Button type="button" onClick={addParticipant}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newMeeting.participants?.map((participant, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{participant}</span>
                    <button onClick={() => removeParticipant(index)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pontos da reunião */}
            <div className="space-y-3">
              <Label>Pontos da Reunião</Label>
              <div className="flex space-x-2">
                <Input
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  placeholder="Descreva um ponto da reunião"
                  onKeyPress={(e) => e.key === "Enter" && addPoint()}
                />
                <Button type="button" onClick={addPoint}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {newMeeting.points?.map((point) => (
                  <div key={point.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span>{point.description}</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => removePoint(point.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload de fotos */}
            <div className="space-y-3">
              <Label>Fotos da Reunião</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Arraste fotos aqui ou clique para selecionar</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={uploadPhoto}>
                  <Upload className="h-4 w-4 mr-2" />
                  Selecionar Fotos
                </Button>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={saveMeeting}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Ata
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de atas organizadas por projeto */}
      <div className="space-y-6">
        {Object.entries(meetingsByProject).map(([projectId, projectMeetings]) => {
          const project = projects.find((p) => p.id === projectId)
          return (
            <Card key={projectId} className={`border-2 ${getProjectColor(projectId)}`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                  {project?.name || "Projeto Desconhecido"}
                  <Badge variant="outline" className="ml-2">
                    {projectMeetings.length} reuniões
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectMeetings.map((meeting) => (
                    <Card key={meeting.id} className="bg-white">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <span>{meeting.title}</span>
                              <Badge variant={meeting.type === "client" ? "default" : "secondary"}>
                                {meeting.type === "client" ? "Cliente" : "Prestador"}
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              {new Date(meeting.date).toLocaleDateString("pt-BR")}
                              {meeting.providerName && ` • ${meeting.providerName}`}
                            </CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            {userType === "admin" && (
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Editar
                              </Button>
                            )}
                            <Button size="sm" variant="outline" onClick={() => downloadMinutes(meeting.id)}>
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Participantes */}
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Participantes
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {meeting.participants.map((participant, index) => (
                              <Badge key={index} variant="outline">
                                {participant}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Pontos da reunião */}
                        <div>
                          <h4 className="font-medium mb-3">Pontos Discutidos</h4>
                          <div className="space-y-2">
                            {meeting.points.map((point) => (
                              <div key={point.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                                <div className="flex items-center space-x-2 mt-0.5">
                                  {userType === "admin" ? (
                                    <Checkbox
                                      checked={point.status === "resolved"}
                                      onCheckedChange={() => togglePointStatus(meeting.id, point.id)}
                                    />
                                  ) : point.status === "resolved" ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Clock className="h-4 w-4 text-orange-500" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className={`${point.status === "resolved" ? "line-through text-gray-500" : ""}`}>
                                    {point.description}
                                  </p>
                                  {point.assignedTo && (
                                    <p className="text-sm text-gray-600 mt-1">Responsável: {point.assignedTo}</p>
                                  )}
                                  {point.dueDate && (
                                    <p className="text-sm text-gray-600">
                                      Prazo: {new Date(point.dueDate).toLocaleDateString("pt-BR")}
                                    </p>
                                  )}
                                </div>
                                <Badge variant={point.status === "resolved" ? "default" : "secondary"}>
                                  {point.status === "resolved" ? "Resolvido" : "Pendente"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Fotos */}
                        {meeting.photos.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3 flex items-center">
                              <Camera className="h-4 w-4 mr-2" />
                              Fotos da Reunião
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {meeting.photos.map((photo, index) => (
                                <div key={index} className="relative group cursor-pointer">
                                  <img
                                    src={photo || "/placeholder.svg"}
                                    alt={`Foto ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg border"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                                    <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Resumo de status */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex space-x-4 text-sm text-gray-600">
                            <span>
                              {meeting.points.filter((p) => p.status === "resolved").length} de {meeting.points.length}{" "}
                              pontos resolvidos
                            </span>
                            <span>Criado em {new Date(meeting.createdAt).toLocaleDateString("pt-BR")}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant="outline">
                              {meeting.points.filter((p) => p.status === "open").length} pendentes
                            </Badge>
                            <Badge variant="default">
                              {meeting.points.filter((p) => p.status === "resolved").length} resolvidos
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {Object.keys(meetingsByProject).length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma ata de reunião</h3>
            <p className="text-gray-600">
              {selectedProject === "all"
                ? "Ainda não há atas de reunião cadastradas."
                : "Não há atas de reunião para o projeto selecionado."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
