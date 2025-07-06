"use client"

import { UserPlus, User, Mail, Hash, Building2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { USER_TYPES } from "../constants/user-options"
import type { UseFormReturn } from "react-hook-form"
import type { CreateUserData, Project } from "../types/user-management"

interface CreateUserFormProps {
  form: UseFormReturn<CreateUserData>
  projects: Project[]
  isSubmitting: boolean
  onSubmit: (data: CreateUserData) => Promise<{ success: boolean; message: string }>
}

export const CreateUserForm = ({ form, projects, isSubmitting, onSubmit }: CreateUserFormProps) => {
  const handleFormSubmit = async (data: CreateUserData) => {
    try {
      const result = await onSubmit(data)
      if (result.success) {
        alert(result.message)
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao criar usuário")
    }
  }

  const selectedUserType = form.watch("userType")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Criar Novo Usuário
        </CardTitle>
        <CardDescription>Adicione clientes, prestadores ou administradores</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nome Completo
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do usuário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpfCnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      CPF/CNPJ
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* User Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Usuário</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {USER_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{type.label}</span>
                              <span className="text-xs text-gray-500">{type.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="canViewRDO"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Pode visualizar RDO?
                    </FormLabel>
                    <Select onValueChange={(value) => field.onChange(value === "true")} value={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Sim</SelectItem>
                        <SelectItem value="false">Não</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">RDO = Relatório Diário de Obra</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Project Selection */}
            <FormField
              control={form.control}
              name="projectIds"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Projetos
                  </FormLabel>
                  <FormDescription>Selecione os projetos que este usuário terá acesso</FormDescription>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {projects.map((project) => (
                      <FormField
                        key={project.id}
                        control={form.control}
                        name="projectIds"
                        render={({ field }) => {
                          return (
                            <FormItem key={project.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(project.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, project.id])
                                      : field.onChange(field.value?.filter((value) => value !== project.id))
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-sm">{project.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {project.workType}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600">Proprietário: {project.owner}</p>
                              </div>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
                {isSubmitting ? "Criando..." : "Criar Usuário"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
