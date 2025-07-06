"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Users,
  Building2,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MeetingPoint {
  id: string
  description: string
  status: "open" | "in_progress" | "resolved"
  responsiblePerson: string
  responsibleAvatar?: string
  deadline?: string
  photoThumbnail?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface MeetingMinute {
  id: string
  title: string
  date: string
  projectId: string
  projectName: string
  meetingType: "client" | "provider" | "internal" | "general"
  participants: string[]
  points: MeetingPoint[]
  publicToClient: boolean
  publicToProvider: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
  location?: string
  duration?: string
  nextMeetingDate?: string
}

interface MeetingMinutesListProps {
  userType: "admin" | "client" | "provider"
  userId: string
  projectId?: string
  providerId?: string
}

export function MeetingMinutesList({ userType, userId, projectId, providerId }: MeetingMinutesListProps) {
  const [meetings, setMeetings] = useState<MeetingMinute[]>([])
  const [loading, setLoading] = useState(true)
  const [filterProject, setFilterProject] = useState<string>(projectId || "all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")

  // Mock data - in real app, this would come from API
  const mockMeetings: MeetingMinute[] = [
    {
      id: "1",
      title: "Reunião de Acompanhamento - Semana 12",
      date: "2024-03-15",
      projectId: "1",
      projectName: "Residência Alphaville",
      meetingType: "client",
      participants: ["João Silva (Cliente)", "Eng. Carlos Silva", "Arq. Maria Santos"],
      publicToClient: true,
      publicToProvider: false,
      createdBy: "admin",
      createdAt: "2024-03-15T14:30:00Z",
      updatedAt: "2024-03-15T16:45:00Z",
      location: "Escritório Avant Garde",
      duration: "2h 15min",
      nextMeetingDate: "2024-03-22",
      points: [
        {
          id: "p1",
          description: "Definir acabamento dos banheiros - escolher entre porcelanato ou cerâmica",
          status: "open",
          responsiblePerson: "João Silva (Cliente)",
          responsibleAvatar: "/placeholder.svg?height=32&width=32",
          deadline: "2024-03-20",
          photoThumbnail: "/placeholder.svg?height=60&width=80&text=Banheiro",
          notes: "Cliente solicitou mais opções de acabamento",
          createdAt: "2024-03-15T14:30:00Z",
          updatedAt: "2024-03-15T14:30:00Z",
        },
        {
          id: "p2",
          description: "Aprovação do projeto elétrico revisado conforme normas ABNT",
          status: "resolved",
          responsiblePerson: "Eng. Ana Costa",
          responsibleAvatar: "/placeholder.svg?height=32&width=32",
          notes: "Projeto aprovado pelo cliente e CREA",
          createdAt: "2024-03-15T14:30:00Z",
          updatedAt: "2024-03-16T10:00:00Z",
        },
        {
          id: "p3",
          description: "Cronograma de entrega dos materiais para próxima fase",
          status: "in_progress",
          responsiblePerson: "João Silva Construções",
          responsibleAvatar: "/placeholder.svg?height=32&width=32",
          deadline: "2024-03-18",
          notes: "Fornecedor confirmou entrega parcial",
          createdAt: "2024-03-15T14:30:00Z",
          updatedAt: "2024-03-17T09:30:00Z",
        },
      ],
    },
    {
      id: "2",
      title: "Reunião Técnica - Estrutura e Fundação",
      date: "2024-03-10",
      projectId: "1",
      projectName: "Residência Alphaville",
      meetingType: "provider",
      participants: ["Eng. Carlos Silva", "João Silva Construções", "Eng. João Oliveira"],
      publicToClient: false,
      publicToProvider: true,
      createdBy: "admin",
      createdAt: "2024-03-10T10:00:00Z",
      updatedAt: "2024-03-10T12:30:00Z",
      location: "Canteiro de Obras",
      duration: "1h 30min",
      points: [
        {
          id: "p4",
          description: "Revisão do projeto estrutural - ajustes nas vigas",
          status: "resolved",
          responsiblePerson: "Eng. João Oliveira",
          responsibleAvatar: "/placeholder.svg?height=32&width=32",
          photoThumbnail: "/placeholder.svg?height=60&width=80&text=Estrutura",
          notes: "Ajustes realizados conforme calculado",
          createdAt: "2024-03-10T10:00:00Z",
          updatedAt: "2024-03-11T14:00:00Z",
        },
        {
          id: "p5",
          description: "Cronograma de concretagem da laje superior",
          status: "in_progress",
          responsiblePerson: "João Silva Construções",
          responsibleAvatar: "/placeholder.svg?height=32&width=32",
          deadline: "2024-03-12",
          notes: "Aguardando condições climáticas favoráveis",
          createdAt: "2024-03-10T10:00:00Z",
          updatedAt: "2024-03-11T08:00:00Z",
        },
      ],
    },
    {
      id: "3",
      title: "Reunião Geral - Alinhamento de Projeto",
      date: "2024-03-08",
      projectId: "2",
      projectName: "Reforma Centro",
      meetingType: "general",
      participants: ["Maria Santos (Cliente)", "Eng. Carlos Silva", "Equipe Técnica"],
      publicToClient: true,
      publicToProvider: true,
      createdBy: "admin",
      createdAt: "2024-03-08T16:00:00Z",
      updatedAt: "2024-03-08T17:30:00Z",
      location: "Escritório Cliente",
      duration: "1h 30min",
      points: [
        {
          id: "p6",
          description: "Escolha das cores para pintura dos ambientes",
          status: "resolved",
          responsiblePerson: "Maria Santos (Cliente)",
          responsibleAvatar: "/placeholder.svg?height=32&width=32",
          photoThumbnail: "/placeholder.svg?height=60&width=80&text=Cores",
          notes: "Cliente escolheu paleta de cores neutras",
          createdAt: "2024-03-08T16:00:00Z",
          updatedAt: "2024-03-09T10:00:00Z",
        },
        {
          id: "p7",
          description: "Definição do layout da cozinha",
          status: "open",
          responsiblePerson: "Arq. Maria Santos",
          responsibleAvatar: "/placeholder.svg?height=32&width=32",
          deadline: "2024-03-15",
          notes: "Aguardando medições finais",
          createdAt: "2024-03-08T16:00:00Z",
          updatedAt: "2024-03-08T16:00:00Z",
        },
      ],
    },
  ]

  const projects = [
    { id: "1", name: "Residência Alphaville" },
    { id: "2", name: "Reforma Centro" },
    { id: "3", name: "Edifício Comercial" },
  ]

  useEffect(() => {
    // Simulate API call
    const fetchMeetings = async () => {
      setLoading(true)
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Filter meetings based on user type and visibility
        let filteredMeetings = mockMeetings.filter((meeting) => {
          if (userType === "admin") return true
          if (userType === "client") return meeting.publicToClient
          if (userType === "provider") return meeting.publicToProvider
          return false
        })

        // Filter by project if specified
        if (projectId) {
          filteredMeetings = filteredMeetings.filter((meeting) => meeting.projectId === projectId)
        }

        // Filter by provider if specified
        if (providerId && userType === "provider") {
          // In real app, you'd filter by provider involvement
          filteredMeetings = filteredMeetings.filter((meeting) => meeting.meetingType === "provider")
        }

        setMeetings(filteredMeetings)
      } catch (error) {
        console.error("Error fetching meetings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMeetings()
  }, [userType, projectId, providerId])

  // Apply additional filters
  const filteredMeetings = meetings.filter((meeting) => {
    if (filterProject !== "all" && meeting.projectId !== filterProject) return false
    if (filterType !== "all" && meeting.meetingType !== filterType) return false
    if (filterStatus !== "all") {
      const hasStatusPoints = meeting.points.some((point) => point.status === filterStatus)
      if (!hasStatusPoints) return false
    }
    return true
  })

  const handlePointStatusChange = async (meetingId: string, pointId: string, newStatus: "resolved" | "open") => {
    if (userType !== "admin") return

    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) =>
        meeting.id === meetingId
          ? {
              ...meeting,
              points: meeting.points.map((point) =>
                point.id === pointId ? { ...point, status: newStatus, updatedAt: new Date().toISOString() } : point,
              ),
              updatedAt: new Date().toISOString(),
            }
          : meeting,
      ),
    )

    // In real app, make API call to update status
    console.log(`Updated point ${pointId} in meeting ${meetingId} to ${newStatus}`)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "open":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
            Resolvido
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">
            Em Andamento
          </Badge>
        )
      case "open":
        return (
          <Badge variant="default" className="bg-orange-100 text-orange-800 border-orange-200">
            Aberto
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case "client":
        return <User className="h-4 w-4 text-blue-600" />
      case "provider":
        return <Building2 className="h-4 w-4 text-green-600" />
      case "internal":
        return <Users className="h-4 w-4 text-purple-600" />
      case "general":
        return <Users className="h-4 w-4 text-gray-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  const getMeetingTypeBadge = (type: string) => {
    switch (type) {
      case "client":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Cliente</Badge>
      case "provider":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Prestador</Badge>
      case "internal":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Interna</Badge>
      case "general":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Geral</Badge>
      default:
        return <Badge variant="outline">Outro</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isOverdue = (deadline?: string) => {
    if (!deadline) return false
    return new Date(deadline) < new Date()
  }

  const getPointsStats = (points: MeetingPoint[]) => {
    const total = points.length
    const resolved = points.filter((p) => p.status === "resolved").length
    const inProgress = points.filter((p) => p.status === "in_progress").length
    const open = points.filter((p) => p.status === "open").length
    return { total, resolved, inProgress, open }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <RefreshCw className="h-8 w-8 text-gray-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Carregando atas de reunião...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Atas de Reunião</h2>
          <p className="text-gray-600">
            {filteredMeetings.length} de {meetings.length} reuniões
            {userType !== "admin" && (
              <span className="text-sm text-gray-500 ml-2">
                (visíveis para {userType === "client" ? "cliente" : "prestador"})
              </span>
            )}
          </p>
        </div>

        {/* Filters */}
        {userType === "admin" && (
          <div className="flex flex-wrap gap-2">
            <Select value={filterProject} onValueChange={setFilterProject}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
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

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="client">Cliente</SelectItem>
                <SelectItem value="provider">Prestador</SelectItem>
                <SelectItem value="internal">Interna</SelectItem>
                <SelectItem value="general">Geral</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="open">Aberto</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="resolved">Resolvido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Meeting Minutes List */}
      {filteredMeetings.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma ata encontrada</h3>
            <p className="text-gray-600">
              {meetings.length === 0
                ? "Ainda não há atas de reunião cadastradas."
                : "Nenhuma ata corresponde aos filtros selecionados."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {filteredMeetings.map((meeting) => {
            const stats = getPointsStats(meeting.points)
            return (
              <AccordionItem key={meeting.id} value={meeting.id} className="border-0">
                <Card>
                  <AccordionTrigger className="hover:no-underline p-0">
                    <CardHeader className="w-full">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">{getMeetingTypeIcon(meeting.meetingType)}</div>
                          <div className="text-left">
                            <CardTitle className="text-lg">{meeting.title}</CardTitle>
                            <CardDescription className="flex items-center space-x-4 mt-1">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(meeting.date)}
                              </span>
                              <span className="flex items-center">
                                <Building2 className="h-4 w-4 mr-1" />
                                {meeting.projectName}
                              </span>
                              {meeting.location && <span className="text-sm text-gray-500">{meeting.location}</span>}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getMeetingTypeBadge(meeting.meetingType)}
                          <div className="text-right text-sm text-gray-600">
                            <div>{stats.total} pontos</div>
                            <div className="flex space-x-1">
                              <span className="text-green-600">{stats.resolved}</span>
                              <span className="text-blue-600">{stats.inProgress}</span>
                              <span className="text-orange-600">{stats.open}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </AccordionTrigger>

                  <AccordionContent>
                    <CardContent className="pt-0">
                      {/* Meeting Details */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Participantes:</span>
                            <div className="mt-1">
                              {meeting.participants.map((participant, index) => (
                                <Badge key={index} variant="outline" className="mr-1 mb-1">
                                  {participant}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {meeting.duration && (
                            <div>
                              <span className="font-medium text-gray-700">Duração:</span>
                              <p className="text-gray-600">{meeting.duration}</p>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-gray-700">Criado em:</span>
                            <p className="text-gray-600">{formatDateTime(meeting.createdAt)}</p>
                          </div>
                          {meeting.nextMeetingDate && (
                            <div>
                              <span className="font-medium text-gray-700">Próxima reunião:</span>
                              <p className="text-gray-600">{formatDate(meeting.nextMeetingDate)}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Meeting Points */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Pontos da Reunião ({meeting.points.length})
                        </h4>

                        {meeting.points.map((point, index) => (
                          <div key={point.id} className="border rounded-lg p-4 bg-white">
                            <div className="flex items-start space-x-3">
                              {/* Status Icon and Checkbox */}
                              <div className="flex items-center space-x-2 mt-1">
                                {userType === "admin" ? (
                                  <Checkbox
                                    checked={point.status === "resolved"}
                                    onCheckedChange={(checked) =>
                                      handlePointStatusChange(meeting.id, point.id, checked ? "resolved" : "open")
                                    }
                                  />
                                ) : (
                                  getStatusIcon(point.status)
                                )}
                              </div>

                              {/* Photo Thumbnail */}
                              {point.photoThumbnail && (
                                <div className="flex-shrink-0">
                                  <div className="relative group cursor-pointer">
                                    <img
                                      src={point.photoThumbnail || "/placeholder.svg"}
                                      alt="Thumbnail"
                                      className="w-16 h-12 object-cover rounded border"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center">
                                      <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100" />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Point Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <p
                                    className={`text-sm ${
                                      point.status === "resolved" ? "line-through text-gray-500" : "text-gray-900"
                                    }`}
                                  >
                                    {point.description}
                                  </p>
                                  {getStatusBadge(point.status)}
                                </div>

                                {/* Responsible Person */}
                                <div className="flex items-center space-x-2 mb-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={point.responsibleAvatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">
                                      {point.responsiblePerson.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-600">{point.responsiblePerson}</span>
                                </div>

                                {/* Deadline */}
                                {point.deadline && (
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span
                                      className={`text-sm ${
                                        isOverdue(point.deadline) ? "text-red-600 font-medium" : "text-gray-600"
                                      }`}
                                    >
                                      Prazo: {formatDate(point.deadline)}
                                      {isOverdue(point.deadline) && " (Atrasado)"}
                                    </span>
                                  </div>
                                )}

                                {/* Notes */}
                                {point.notes && (
                                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">{point.notes}</div>
                                )}

                                {/* Timestamps */}
                                <div className="mt-2 text-xs text-gray-500">
                                  Criado: {formatDateTime(point.createdAt)}
                                  {point.updatedAt !== point.createdAt && (
                                    <span className="ml-2">• Atualizado: {formatDateTime(point.updatedAt)}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {meeting.points.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <FileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                            <p>Nenhum ponto registrado nesta reunião</p>
                          </div>
                        )}
                      </div>

                      {/* Meeting Summary */}
                      <Separator className="my-6" />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex space-x-4">
                          <span>
                            {stats.resolved} de {stats.total} pontos resolvidos
                          </span>
                          <span>Atualizado: {formatDateTime(meeting.updatedAt)}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                          {userType === "admin" && (
                            <Button size="sm" variant="outline">
                              Editar
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            )
          })}
        </Accordion>
      )}
    </div>
  )
}
