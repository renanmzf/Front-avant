"use client"

import { Plus, FileText, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormReturn } from "react-hook-form"
import type { CreateStageData } from "../types/planning"

interface CreateStageFormProps {
  form: UseFormReturn<CreateStageData>
  isSubmitting: boolean
  onSubmit: (data: CreateStageData) => Promise<{ success: boolean; message: string }>
  onCancel: () => void
}

export const CreateStageForm = ({ form, isSubmitting, onSubmit, onCancel }: CreateStageFormProps) => {
  const handleFormSubmit = async (data: CreateStageData) => {
    try {
      const result = await onSubmit(data)
      if (result.success) {
        alert(result.message)
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao criar etapa")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Nova Etapa
        </CardTitle>
        <CardDescription>
          Adicione uma nova etapa ao planejamento. O administrador informa o valor planejado para esta etapa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Nome da Etapa
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Fundação, Estrutura, Alvenaria..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva as atividades e serviços desta etapa..."
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
              name="plannedValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Valor Planejado (R$)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Criando..." : "Criar Etapa"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
