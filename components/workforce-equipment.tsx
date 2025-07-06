"use client"

import { Users, Wrench } from "lucide-react"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WORKFORCE_FIELDS, EQUIPMENT_FIELDS } from "../constants/report-options"
import type { UseFormReturn } from "react-hook-form"
import type { DailyReportData } from "../types/daily-report"

interface WorkforceEquipmentProps {
  form: UseFormReturn<DailyReportData>
}

export const WorkforceEquipment = ({ form }: WorkforceEquipmentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Workforce */}
      <Card>
        <CardHeader>
          <CardTitle className="bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2 justify-center">
            <Users className="h-5 w-5" />
            MÃO DE OBRA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {WORKFORCE_FIELDS.map((field) => (
              <FormField
                key={field.key}
                control={form.control}
                name={`workforce.${field.key}` as any}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...formField}
                        onChange={(e) => formField.onChange(Number(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Equipment */}
      <Card>
        <CardHeader>
          <CardTitle className="bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2 justify-center">
            <Wrench className="h-5 w-5" />
            EQUIPAMENTOS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EQUIPMENT_FIELDS.map((field) => (
              <FormField
                key={field.key}
                control={form.control}
                name={`equipment.${field.key}` as any}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...formField}
                        onChange={(e) => formField.onChange(Number(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
