"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Activity,
  Search,
  Filter,
  X,
  Calendar,
  User,
  FileText,
  DollarSign,
  ImageIcon,
  Building2,
  Users,
  Settings,
} from "lucide-react"
import { TableSkeleton } from "@/components/skeleton-loaders"
import { HistoryLogsEmptyState, FilterEmptyState } from "@/components/empty-states"
import { ExportButtonsSimple } from "@/components/export-buttons"

interface HistoryLogEntry {
  id: string
  timestamp: string
  userId: string
  userName: string
  userRole: string
  userAvatar?: string
  action: string
  description: string
  tableName: string
  recordId?: string
  projectId?: string
  projectName?: string
  ipAddress?: string
  userAgent?: string
}

interface HistoryLogProps {
  projectId?: string
  userId?: string
  className?: string
}

const actionIcons: Record<string, React.ReactNode> = {
  create: <FileText className="h-4 w-4 text-green-600" />,
  update: <Settings className="h-4 w-4 text-blue-600" />,
  delete: <X className="h-4 w-4 text-red-600" />,
  upload: <ImageIcon className="h-4 w-4 text-purple-600" />,
  payment: <DollarSign className="h-4 w-4 text-green-600" />,
  contract: <Building2 className="h-4 w-4 text-blue-600" />,
  user: <Users className="h-4 w-4 text-orange-600" />,
  login: <User className="h-4 w-4 text-gray-600" />,
  logout: <User className="h-4 w-4 text-gray-400" />,
}

const actionColors: Record<string, string> = {
  create: "bg-green-100 text-green-800 border-green-200",
  update: "bg-blue-100 text-blue-800 border-blue-200",
  delete: "bg-red-100 text-red-800 border-red-200",
  upload: "bg-purple-100 text-purple-800 border-purple-200",
  payment: "bg-green-100 text-green-800 border-green-200",
  contract: "bg-blue-100 text-blue-800 border-blue-200",
  user: "bg-orange-100 text-orange-800 border-orange-200",
  login: "bg-gray-100 text-gray-800 border-gray-200",
  logout: "bg-gray-100 text-gray-600 border-gray-200",
}

export function HistoryLog({ projectId, userId, className = "" }: HistoryLogProps) {
  const [logs, setLogs] = useState<HistoryLogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Mock data - in real app, this would come from API
  const mockLogs: HistoryLogEntry[] = [
    {
      id: "1",
      timestamp: "2024-03-15T14:30:00Z",
      userId: "admin1",
      userName: "Carlos Silva",
      userRole: "admin",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "create",
      description: "Criou novo projeto 'Residência Alphaville'",
      tableName: "projects",
      recordId: "proj-001",
      projectId: "1",
      projectName: "Residência Alphaville",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0...",
    },
    {
      id: "2",
      timestamp: "2024-03-15T13:45:00Z",
      userId: "client1",
      userName: "João Silva",
      userRole: "client",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "upload",
      description: "Fez upload de 3 fotos do progresso da obra",
      tableName: "photos",
      projectId: "1",
      projectName: "Residência Alphaville",
      ipAddress: "192.168.1.101",
    },
    {
      id: "3",
      timestamp: "2024-03-15T12:20:00Z",
      userId: "provider1",
      userName: "Construções ABC",
      userRole: "service_provider",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "create",
      description: "Adicionou nova medição de estrutura - R$ 15.000",
      tableName: "measurements",
      recordId: "med-001",
      projectId: "1",
      projectName: "Residência Alphaville",
      ipAddress: "192.168.1.102",
    },
    {
      id: "4",
      timestamp: "2024-03-15T11:15:00Z",
      userId: "admin1",
      userName: "Carlos Silva",
      userRole: "admin",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "payment",
      description: "Aprovou pagamento de R$ 12.000 para Construções ABC",
      tableName: "payments",
      recordId: "pay-001",
      projectId: "1",
      projectName: "Residência Alphaville",
      ipAddress: "192.168.1.100",
    },
    {
      id: "5",
      timestamp: "2024-03-15T10:30:00Z",
      userId: "admin1",
      userName: "Carlos Silva",
      userRole: "admin",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "contract",
      description: "Criou contrato de estrutura e fundação",
      tableName: "contracts",
      recordId: "cont-001",
      projectId: "1",
      projectName: "Residência Alphaville",
      ipAddress: "192.168.1.100",
    },
    {
      id: "6",
      timestamp: "2024-03-15T09:45:00Z",
      userId: "client1",
      userName: "João Silva",
      userRole: "client",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "login",
      description: "Fez login no sistema",
      tableName: "users",
      ipAddress: "192.168.1.101",
    },
    {
      id: "7",
      timestamp: "2024-03-14T18:20:00Z",
      userId: "admin1",
      userName: "Carlos Silva",
      userRole: "admin",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "update",
      description: "Atualizou cronograma do projeto",
      tableName: "projects",
      recordId: "proj-001",
      projectId: "1",
      projectName: "Residência Alphaville",
      ipAddress: "192.168.1.100",
    },
    {
      id: "8",
      timestamp: "2024-03-14T16:30:00Z",
      userId: "provider1",
      userName: "Construções ABC",
      userRole: "service_provider",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "upload",
      description: "Enviou RDO do dia 14/03/2024",
      tableName: "documents",
      projectId: "1",
      projectName: "Residência Alphaville",
      ipAddress: "192.168.1.102",
    },
  ]

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        let filteredLogs = mockLogs

        // Filter by project if specified
        if (projectId) {
          filteredLogs = filteredLogs.filter((log) => log.projectId === projectId)
        }

        // Filter by user if specified
        if (userId) {
          filteredLogs = filteredLogs.filter((log) => log.userId === userId)
        }

        setLogs(filteredLogs)
      } catch (error) {
        console.error("Error fetching history logs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [projectId, userId])

  // Apply filters
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
          log.userName.toLowerCase().includes(searchLower) ||
          log.description.toLowerCase().includes(searchLower) ||
          log.action.toLowerCase().includes(searchLower) ||
          (log.projectName && log.projectName.toLowerCase().includes(searchLower))

        if (!matchesSearch) return false
      }

      // Action filter
      if (actionFilter !== "all" && log.action !== actionFilter) {
        return false
      }

      // User filter
      if (userFilter !== "all" && log.userId !== userFilter) {
        return false
      }

      // Date filter
      if (dateFilter !== "all") {
        const logDate = new Date(log.timestamp)
        const now = new Date()

        switch (dateFilter) {
          case "today":
            if (logDate.toDateString() !== now.toDateString()) return false
            break
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            if (logDate < weekAgo) return false
            break
          case "month":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            if (logDate < monthAgo) return false
            break
        }
      }

      return true
    })
  }, [logs, searchTerm, actionFilter, userFilter, dateFilter])

  const uniqueUsers = useMemo(() => {
    const users = logs.reduce(
      (acc, log) => {
        if (!acc.find((u) => u.id === log.userId)) {
          acc.push({
            id: log.userId,
            name: log.userName,
            role: log.userRole,
          })
        }
        return acc
      },
      [] as Array<{ id: string; name: string; role: string }>,
    )

    return users.sort((a, b) => a.name.localeCompare(b.name))
  }, [logs])

  const uniqueActions = useMemo(() => {
    const actions = [...new Set(logs.map((log) => log.action))]
    return actions.sort()
  }, [logs])

  const hasActiveFilters = searchTerm || actionFilter !== "all" || userFilter !== "all" || dateFilter !== "all"

  const clearFilters = () => {
    setSearchTerm("")
    setActionFilter("all")
    setUserFilter("all")
    setDateFilter("all")
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRoleBadge = (role: string) => {
    const roleLabels: Record<string, string> = {
      admin: "Admin",
      client: "Cliente",
      service_provider: "Prestador",
      minor_admin: "Admin Jr",
    }

    const roleColors: Record<string, string> = {
      admin: "bg-red-100 text-red-800 border-red-200",
      client: "bg-blue-100 text-blue-800 border-blue-200",
      service_provider: "bg-green-100 text-green-800 border-green-200",
      minor_admin: "bg-orange-100 text-orange-800 border-orange-200",
    }

    return (
      <Badge variant="outline" className={roleColors[role] || "bg-gray-100 text-gray-800 border-gray-200"}>
        {roleLabels[role] || role}
      </Badge>
    )
  }

  if (loading) {
    return <TableSkeleton rows={8} columns={5} />
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Histórico de Atividades
              </CardTitle>
              <CardDescription>
                Registro de todas as ações realizadas no sistema
                {projectId && " para este projeto"}
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <ExportButtonsSimple
                data={filteredLogs}
                filename={`historico-atividades-${new Date().toISOString().split("T")[0]}`}
              />

              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtros
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1">
                    {
                      [searchTerm, actionFilter !== "all", userFilter !== "all", dateFilter !== "all"].filter(Boolean)
                        .length
                    }
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar atividades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ação</label>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as ações" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as ações</SelectItem>
                    {uniqueActions.map((action) => (
                      <SelectItem key={action} value={action}>
                        <div className="flex items-center space-x-2">
                          {actionIcons[action]}
                          <span className="capitalize">{action}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Usuário</label>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os usuários" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os usuários</SelectItem>
                    {uniqueUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Período</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os períodos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os períodos</SelectItem>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Última semana</SelectItem>
                    <SelectItem value="month">Último mês</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        )}

        <CardContent>
          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-4 text-sm">
              <span>
                <strong>{filteredLogs.length}</strong> de <strong>{logs.length}</strong> atividades
              </span>
              {hasActiveFilters && <Badge variant="outline">Filtros ativos</Badge>}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Última atualização: {formatTimestamp(logs[0]?.timestamp || new Date().toISOString())}</span>
            </div>
          </div>

          {/* History Table */}
          {filteredLogs.length === 0 ? (
            hasActiveFilters ? (
              <FilterEmptyState onClearFilters={clearFilters} />
            ) : (
              <HistoryLogsEmptyState />
            )
          ) : (
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="min-w-[140px]">Data/Hora</TableHead>
                      <TableHead className="min-w-[200px]">Usuário</TableHead>
                      <TableHead className="min-w-[120px]">Ação</TableHead>
                      <TableHead className="min-w-[300px]">Descrição</TableHead>
                      <TableHead className="min-w-[150px]">Projeto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono text-sm">{formatTimestamp(log.timestamp)}</TableCell>

                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={log.userAvatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {log.userName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{log.userName}</div>
                              <div className="mt-1">{getRoleBadge(log.userRole)}</div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {actionIcons[log.action] || <Activity className="h-4 w-4 text-gray-400" />}
                            <Badge
                              variant="outline"
                              className={actionColors[log.action] || "bg-gray-100 text-gray-800 border-gray-200"}
                            >
                              {log.action}
                            </Badge>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="max-w-md">
                            <p className="text-sm">{log.description}</p>
                            {log.tableName && (
                              <p className="text-xs text-gray-500 mt-1">
                                Tabela: {log.tableName}
                                {log.recordId && ` • ID: ${log.recordId}`}
                              </p>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          {log.projectName ? (
                            <div className="text-sm">
                              <div className="font-medium">{log.projectName}</div>
                              <div className="text-xs text-gray-500">ID: {log.projectId}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Mobile Card View (hidden on larger screens) */}
          <div className="block lg:hidden mt-6">
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <Card key={log.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={log.userAvatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {log.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{log.userName}</div>
                          <div className="text-xs text-gray-500">{formatTimestamp(log.timestamp)}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {actionIcons[log.action]}
                        <Badge
                          variant="outline"
                          className={actionColors[log.action] || "bg-gray-100 text-gray-800 border-gray-200"}
                        >
                          {log.action}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm">{log.description}</p>
                      {log.projectName && <p className="text-xs text-gray-500 mt-1">Projeto: {log.projectName}</p>}
                    </div>

                    <div className="flex justify-between items-center">
                      {getRoleBadge(log.userRole)}
                      {log.tableName && <span className="text-xs text-gray-500">{log.tableName}</span>}
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
