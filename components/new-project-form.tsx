"use client"

import { Building2, MapPin, Calendar, FileText, Users, Briefcase, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useNewProject } from "../hooks/use-new-project"
import { WORK_TYPES, WORK_TYPE_DESCRIPTIONS } from "../constants/project-options"

export default function NewProjectForm() {
  const { form, isSubmitting, onSubmit, clients, contractors, availableContracts } = useNewProject()

  const handleFormSubmit = async (data: any) => {
    try {
      const result = await onSubmit(data)
      if (result.success) {
        alert(result.message)
        form.reset()
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao criar projeto")
    }
  }

  const selectedWorkType = form.watch("workType")

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Novo Projeto</h1>
        <p className="text-gray-600">Crie um novo projeto vinculando cliente, prestador e contratos</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações do Projeto
              </CardTitle>
              <CardDescription>Dados básicos do novo projeto de construção</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Proprietário
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do proprietário da obra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Data de Abertura
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Endereço
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Endereço completo da obra (rua, número, bairro, cidade, CEP)"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Tipo de Obra
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de obra" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {WORK_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedWorkType && (
                      <FormDescription className="text-sm text-gray-600">
                        {WORK_TYPE_DESCRIPTIONS[selectedWorkType]}
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Client and Contractor Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Vinculação de Partes
              </CardTitle>
              <CardDescription>Selecione o cliente e prestador de serviço para este projeto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o cliente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{client.name}</span>
                                <span className="text-xs text-gray-500">{client.cpfCnpj}</span>
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
                  name="contractorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prestador de Serviço</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o prestador" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contractors.map((contractor) => (
                            <SelectItem key={contractor.id} value={contractor.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{contractor.name}</span>
                                <span className="text-xs text-gray-500">{contractor.cpfCnpj}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contract Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Contratos Vinculados
              </CardTitle>
              <CardDescription>
                Selecione os contratos que farão parte deste projeto
                {availableContracts.length === 0 && " (Selecione cliente e prestador primeiro)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableContracts.length > 0 ? (
                <FormField
                  control={form.control}
                  name="contractIds"
                  render={() => (
                    <FormItem>
                      <div className="space-y-3">
                        {availableContracts.map((contract) => (
                          <FormField
                            key={contract.id}
                            control={form.control}
                            name="contractIds"
                            render={({ field }) => {
                              return (
                                <FormItem key={contract.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(contract.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, contract.id])
                                          : field.onChange(field.value?.filter((value) => value !== contract.id))
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none flex-1">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Hash className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">{contract.number}</span>
                                        <Badge variant="secondary" className="text-xs">
                                          R$ {contract.value.toLocaleString("pt-BR")}
                                        </Badge>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600">{contract.description}</p>
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
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p>Nenhum contrato disponível</p>
                  <p className="text-sm">Selecione um cliente e prestador para ver os contratos disponíveis</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[200px]">
              {isSubmitting ? "Criando Projeto..." : "Criar Projeto"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
