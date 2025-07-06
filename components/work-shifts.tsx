"use client"

import type React from "react"

import { Sun, Sunset, Moon } from "lucide-react"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { STATUS_OPTIONS, TEMPO_OPTIONS, EFFICIENCY_OPTIONS } from "../constants/report-options"
import type { UseFormReturn } from "react-hook-form"
import type { DailyReportData } from "../types/daily-report"

interface WorkShiftsProps {
  form: UseFormReturn<DailyReportData>
}

export const WorkShifts = ({ form }: WorkShiftsProps) => {
  const shiftSelection = form.watch("shiftSelection")

  const renderShiftSection = (
    title: string,
    icon: React.ReactNode,
    fieldPrefix: "morningShift" | "afternoonShift" | "nightShift",
    bgColor: string,
    selectionKey: "morning" | "afternoon" | "night",
  ) => {
    const isSelected = shiftSelection[selectionKey]

    return (
      <div className="space-y-4">
        {/* Shift Header with Selection */}
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name={`shiftSelection.${selectionKey}`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className={`${bgColor} text-white py-2 px-4 rounded flex items-center gap-2`}>
                  {icon}
                  <span className="font-semibold">{title}</span>
                </div>
              </FormItem>
            )}
          />
          {isSelected && (
            <Badge variant="secondary" className="text-xs">
              Período Ativo
            </Badge>
          )}
        </div>

        {/* Shift Fields - Only show when selected */}
        {isSelected && (
          <div className="grid grid-cols-5 gap-3 p-4 bg-gray-50 rounded-lg border-l-4 border-l-blue-500">
            <FormField
              control={form.control}
              name={`${fieldPrefix}.entrada`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">ENTRADA</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`${fieldPrefix}.saida`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">SAÍDA</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`${fieldPrefix}.tempo`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">TEMPO</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TEMPO_OPTIONS.map((option) => (
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

            <FormField
              control={form.control}
              name={`${fieldPrefix}.status`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">STATUS</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
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

            <FormField
              control={form.control}
              name={`${fieldPrefix}.eficiencia`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">EFICIÊNCIA</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="%" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EFFICIENCY_OPTIONS.map((option) => (
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
          </div>
        )}
      </div>
    )
  }

  const activeShiftsCount = Object.values(shiftSelection).filter(Boolean).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Turnos de Trabalho</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {activeShiftsCount} período{activeShiftsCount !== 1 ? "s" : ""} ativo{activeShiftsCount !== 1 ? "s" : ""}
            </Badge>
          </div>
        </CardTitle>
        <p className="text-sm text-gray-600">Selecione os períodos que tiveram trabalho e preencha os dados</p>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {renderShiftSection("MANHÃ", <Sun className="h-5 w-5" />, "morningShift", "bg-blue-600", "morning")}
        {renderShiftSection("TARDE", <Sunset className="h-5 w-5" />, "afternoonShift", "bg-blue-600", "afternoon")}
        {renderShiftSection("NOITE", <Moon className="h-5 w-5" />, "nightShift", "bg-blue-600", "night")}

        {activeShiftsCount === 0 && (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <Sun className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="font-medium">Nenhum período selecionado</p>
            <p className="text-sm">Marque os checkboxes acima para ativar os períodos de trabalho</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
