"use client"

import { Users, Edit, Trash2, ToggleLeft, ToggleRight, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { USER_STATUS } from "../constants/user-options"
import type { User, Project } from "../types/user-management"

interface UsersListProps {
  users: User[]
  projects: Project[]
  isDeleting: string | null
  onDeleteUser: (id: string) => Promise<{ success: boolean; message: string }>
  onToggleStatus: (id: string) => Promise<{ success: boolean; message: string }>
}

export const UsersList = ({ users, projects, isDeleting, onDeleteUser, onToggleStatus }: UsersListProps) => {
  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const result = await onDeleteUser(id)
        if (result.success) {
          alert(result.message)
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : "Erro ao excluir usuário")
      }
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      const result = await onToggleStatus(id)
      if (result.success) {
        alert(result.message)
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao alterar status")
    }
  }

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "CLIENTE":
        return "bg-green-100 text-green-800"
      case "PRESTADOR":
        return "bg-orange-100 text-orange-800"
      case "ADMINISTRADOR":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusConfig = (status: string) => {
    return USER_STATUS.find((s) => s.value === status) || USER_STATUS[0]
  }

  const getUserProjects = (projectIds: string[]) => {
    return projects.filter((project) => projectIds.includes(project.id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Usuários Cadastrados
        </CardTitle>
        <CardDescription>Gerencie todos os usuários do sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p>Nenhum usuário cadastrado</p>
              <p className="text-sm">Crie o primeiro usuário usando o formulário acima</p>
            </div>
          ) : (
            users.map((user) => {
              const statusConfig = getStatusConfig(user.status)
              const userProjects = getUserProjects(user.projectIds)

              return (
                <Card key={user.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* User Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-lg">{user.fullName}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="h-3 w-3" />
                              {user.email}
                              {user.phone && (
                                <>
                                  <span>•</span>
                                  <Phone className="h-3 w-3" />
                                  {user.phone}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            Criado em {format(user.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                          <Badge className={`text-xs ${getUserTypeColor(user.userType)}`}>{user.userType}</Badge>
                          <Badge className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</Badge>
                          {user.canViewRDO && (
                            <Badge variant="outline" className="text-xs">
                              Acesso RDO
                            </Badge>
                          )}
                          <Badge variant="secondary" className="text-xs">
                            CPF/CNPJ: {user.cpfCnpj}
                          </Badge>
                        </div>

                        {/* Projects */}
                        {userProjects.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-xs font-medium text-gray-700">Projetos:</span>
                            <div className="flex flex-wrap gap-1">
                              {userProjects.map((project) => (
                                <Badge key={project.id} variant="outline" className="text-xs">
                                  {project.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(user.id)}
                          className="flex items-center gap-1"
                        >
                          {user.status === "ATIVO" ? (
                            <ToggleRight className="h-4 w-4" />
                          ) : (
                            <ToggleLeft className="h-4 w-4" />
                          )}
                          {user.status === "ATIVO" ? "Desativar" : "Ativar"}
                        </Button>

                        <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                          <Edit className="h-4 w-4" />
                          Editar
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting === user.id}
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          {isDeleting === user.id ? "Excluindo..." : "Excluir"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Summary */}
        {users.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Total de Usuários</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {users.length} usuários
              </Badge>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {["CLIENTE", "PRESTADOR", "ADMINISTRADOR"].map((type) => {
                const count = users.filter((user) => user.userType === type).length
                if (count === 0) return null
                return (
                  <Badge key={type} className={`text-xs ${getUserTypeColor(type)}`}>
                    {type}: {count}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
