"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, FileText, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CONTRACT_TYPES } from "../constants/contract-management"
import { formatCurrency, validateContractForm } from "../utils/contract-management-utils"
import type { ContractFormData, Project } from "../types/contract-management"

interface ContractFormProps {
  project: Project
  onSubmit: (data: ContractFormData) => Promise<{ success: boolean; message: string }>
  className?: string
}

export const ContractForm = ({ project, onSubmit, className = "" }: ContractFormProps) => {
  const [formData, setFormData] = useState<ContractFormData>({
    title: "",
    description: "",
    type: "empreitada",
    value: 0,
    startDate: "",
    endDate: "",
    paymentTerms: [
      { description: "Entrada", percentage: 30, amount: 0, dueDate: "" },
      { description: "Parcela intermediária", percentage: 40, amount: 0, dueDate: "" },
      { description: "Finalização", percentage: 30, amount: 0, dueDate: "" },
    ],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const updateFormData = (field: keyof ContractFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors([]) // Clear errors when user starts typing
  }

  const updatePaymentTerm = (index: number, field: string, value: any) => {
    const updatedTerms = [...formData.paymentTerms]
    updatedTerms[index] = { ...updatedTerms[index], [field]: value }

    // Auto-calculate amount based on percentage
    if (field === "percentage" && formData.value > 0) {
      updatedTerms[index].amount = (formData.value * value) / 100
    }

    setFormData((prev) => ({ ...prev, paymentTerms: updatedTerms }))
  }

  const addPaymentTerm = () => {
    setFormData((prev) => ({
      ...prev,
      paymentTerms: [...prev.paymentTerms, { description: "", percentage: 0, amount: 0, dueDate: "" }],
    }))
  }

  const removePaymentTerm = (index: number) => {
    if (formData.paymentTerms.length > 1) {
      setFormData((prev) => ({
        ...prev,
        paymentTerms: prev.paymentTerms.filter((_, i) => i !== index),
      }))
    }
  }

  const handleValueChange = (value: number) => {
    updateFormData("value", value)

    // Recalculate payment term amounts
    const updatedTerms = formData.paymentTerms.map((term) => ({
      ...term,
      amount: (value * term.percentage) / 100,
    }))

    setFormData((prev) => ({ ...prev, paymentTerms: updatedTerms }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateContractForm(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const result = await onSubmit(formData)
      if (result.success) {
        alert(result.message)
        // Reset form
        setFormData({
          title: "",
          description: "",
          type: "empreitada",
          value: 0,
          startDate: "",
          endDate: "",
          paymentTerms: [
            { description: "Entrada", percentage: 30, amount: 0, dueDate: "" },
            { description: "Parcela intermediária", percentage: 40, amount: 0, dueDate: "" },
            { description: "Finalização", percentage: 30, amount: 0, dueDate: "" },
          ],
        })
      } else {
        setErrors([result.message])
      }
    } catch (error) {
      setErrors(["Erro inesperado ao criar contrato"])
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPercentage = formData.paymentTerms.reduce((sum, term) => sum + term.percentage, 0)
  const totalAmount = formData.paymentTerms.reduce((sum, term) => sum + term.amount, 0)

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Criar Novo Contrato
        </CardTitle>
        <div className="text-sm text-gray-600">
          Projeto: <span className="font-medium">{project.name}</span>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Errors */}
          {errors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Contrato</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="Ex: Construção de residência unifamiliar"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Contrato</Label>
              <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONTRACT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{type.label}</span>
                        <span className="text-xs text-gray-500">{type.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              placeholder="Descreva detalhadamente o escopo do contrato..."
              rows={3}
            />
          </div>

          {/* Value and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Valor Total</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => handleValueChange(Number(e.target.value))}
                  placeholder="0"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateFormData("startDate", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Término</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateFormData("endDate", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Termos de Pagamento</Label>
              <Button type="button" variant="outline" size="sm" onClick={addPaymentTerm}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Parcela
              </Button>
            </div>

            <div className="space-y-3">
              {formData.paymentTerms.map((term, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Descrição</Label>
                      <Input
                        value={term.description}
                        onChange={(e) => updatePaymentTerm(index, "description", e.target.value)}
                        placeholder="Ex: Entrada"
                        size="sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Percentual (%)</Label>
                      <Input
                        type="number"
                        value={term.percentage}
                        onChange={(e) => updatePaymentTerm(index, "percentage", Number(e.target.value))}
                        placeholder="0"
                        size="sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Valor</Label>
                      <Input
                        type="number"
                        value={term.amount}
                        onChange={(e) => updatePaymentTerm(index, "amount", Number(e.target.value))}
                        placeholder="0"
                        size="sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Vencimento</Label>
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          value={term.dueDate}
                          onChange={(e) => updatePaymentTerm(index, "dueDate", e.target.value)}
                          size="sm"
                        />
                        {formData.paymentTerms.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removePaymentTerm(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex gap-4">
                <Badge variant={totalPercentage === 100 ? "default" : "destructive"}>Total: {totalPercentage}%</Badge>
                <span className="text-sm font-medium text-blue-800">{formatCurrency(totalAmount)}</span>
              </div>
              {totalPercentage !== 100 && <span className="text-xs text-red-600">Os percentuais devem somar 100%</span>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || totalPercentage !== 100} className="min-w-[200px]">
              {isSubmitting ? "Criando Contrato..." : "Criar Contrato"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
