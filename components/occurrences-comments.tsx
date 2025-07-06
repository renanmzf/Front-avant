"use client"

import { AlertTriangle, MessageSquare, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UseFormReturn } from "react-hook-form"
import type { DailyReportData } from "../types/daily-report"

interface OccurrencesCommentsProps {
  form: UseFormReturn<DailyReportData>
  onAddOccurrence: () => void
  onRemoveOccurrence: (id: string) => void
}

export const OccurrencesComments = ({ form, onAddOccurrence, onRemoveOccurrence }: OccurrencesCommentsProps) => {
  const occurrences = form.watch("occurrences")

  return (
    <div className="space-y-6">
      {/* Occurrences */}
      <Card>
        <CardHeader>
          <CardTitle className="bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2 justify-center">
            <AlertTriangle className="h-5 w-5" />
            OCORRÊNCIAS E OBSERVAÇÕES
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {occurrences.map((occurrence, index) => (
            <div key={occurrence.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`occurrences.${index}.description`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Ocorrência {index + 1}</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição da ocorrência" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRemoveOccurrence(occurrence.id)}
                className="mt-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={onAddOccurrence} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Ocorrência
          </Button>
        </CardContent>
      </Card>

      {/* General Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2 justify-center">
            <MessageSquare className="h-5 w-5" />
            COMENTÁRIOS GERAIS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="generalComments"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Comentários gerais sobre o dia de trabalho..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}
