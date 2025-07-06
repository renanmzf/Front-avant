"use client"

import { Activity, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ACTIVITY_STATUS_OPTIONS } from "../constants/report-options"
import type { UseFormReturn } from "react-hook-form"
import type { DailyReportData } from "../types/daily-report"

interface ActivitiesSectionProps {
  form: UseFormReturn<DailyReportData>
  onAddActivity: () => void
  onRemoveActivity: (id: string) => void
}

export const ActivitiesSection = ({ form, onAddActivity, onRemoveActivity }: ActivitiesSectionProps) => {
  const activities = form.watch("activities")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2 justify-center">
          <Activity className="h-5 w-5" />
          ATIVIDADES
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
            <FormField
              control={form.control}
              name={`activities.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atividade {index + 1}</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição da atividade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name={`activities.${index}.status`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ACTIVITY_STATUS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRemoveActivity(activity.id)}
                className="mt-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={onAddActivity} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Atividade
        </Button>
      </CardContent>
    </Card>
  )
}
