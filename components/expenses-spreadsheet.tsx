"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, Trash2, Download, Upload, Building2, Eye } from "lucide-react"
import { SuppliersManagement } from "./suppliers-management"

interface Expense {
  id: string
  invoiceNumber: string // NF
  sequenceNumber: string // #
  description: string
  supplier: string
  supplierId?: string
  date: string
  class: string
  phase: string
  type: string
  value: number
  adminTax: number
  workId: string
  work: string
  invoiceFile?: string // Arquivo da NF
}

interface ExpensesSpreadsheetProps {
  projectId: string
  projectName: string
}

export function ExpensesSpreadsheet({ projectId, projectName }: ExpensesSpreadsheetProps) {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      invoiceNumber: "NF-001234",
      sequenceNumber: "001",
      description: "Concreto Usinado - 15m³",
      supplier: "Concreteira São Paulo",
      supplierId: "1",
      date: "2024-01-25",
      class: "Concreto",
      phase: "Estrutura",
      type: "Material",
      value: 4800,
      adminTax: 10,
      work: "Residência Alphaville",
      workId: "1",
      invoiceFile: "nf_001234.pdf",
    },
    {
      id: "2",
      invoiceNumber: "NF-005678",
      sequenceNumber: "002",
      description: "Mão de obra - Pedreiro",
      supplier: "João Silva Construções",
      supplierId: "2",
      date: "2024-01-20",
      class: "Mão de Obra",
      phase: "Alvenaria",
      type: "Serviço",
      value: 1800,
      adminTax: 15,
      work: "Residência Alphaville",
      workId: "1",
      invoiceFile: "nf_005678.pdf",
    },
  ])

  const [showSuppliers, setShowSuppliers] = useState(false)
  const [editingCell, setEditingCell] = useState<{ rowId: string; field: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingInvoice, setUploadingInvoice] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const classes = ["Material", "Mão de Obra", "Equipamento", "Serviço", "Transporte"]
  const phases = ["Fundação", "Estrutura", "Alvenaria", "Cobertura", "Instalações", "Acabamento"]
  const types = ["Material", "Serviço", "Equipamento", "Outros"]

  // Filtrar despesas por projeto
  const projectExpenses = expenses.filter((expense) => expense.workId === projectId)

  const addNewRow = () => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      invoiceNumber: "",
      sequenceNumber: String(projectExpenses.length + 1).padStart(3, "0"),
      description: "",
      supplier: "",
      date: new Date().toISOString().split("T")[0],
      class: "",
      phase: "",
      type: "",
      value: 0,
      adminTax: 10,
      workId: projectId,
      work: projectName,
    }
    setExpenses([...expenses, newExpense])
  }

  const deleteRow = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este lançamento?")) {
      setExpenses(expenses.filter((expense) => expense.id !== id))
    }
  }

  const updateExpense = (id: string, field: string, value: any) => {
    setExpenses(expenses.map((expense) => (expense.id === id ? { ...expense, [field]: value } : expense)))
  }

  const handleCellClick = (rowId: string, field: string) => {
    setEditingCell({ rowId, field })
  }

  const handleCellBlur = () => {
    setEditingCell(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent, rowId: string, field: string) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault()
      setEditingCell(null)
    }
  }

  const handleSupplierSelect = (supplier: any) => {
    if (editingCell) {
      updateExpense(editingCell.rowId, "supplier", supplier.name)
      updateExpense(editingCell.rowId, "supplierId", supplier.id)
      setEditingCell(null)
    }
    setShowSuppliers(false)
  }

  const handleInvoiceUpload = async (expenseId: string) => {
    setUploadingInvoice(expenseId)
    try {
      // Simular upload da NF
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const fileName = `nf_${Date.now()}.pdf`
      updateExpense(expenseId, "invoiceFile", fileName)
      alert("Nota fiscal enviada com sucesso!")
    } catch (error) {
      alert("Erro ao enviar nota fiscal")
    } finally {
      setUploadingInvoice(null)
    }
  }

  const handleDownloadInvoice = (fileName: string) => {
    console.log("Baixando NF:", fileName)
    const link = document.createElement("a")
    link.href = `/placeholder.pdf?name=${fileName}`
    link.download = fileName
    link.click()
  }

  const handleViewInvoice = (fileName: string) => {
    console.log("Visualizando NF:", fileName)
    window.open(`/placeholder.pdf?name=${fileName}`, "_blank")
  }

  const saveExpenses = async () => {
    setIsLoading(true)
    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Lançamentos salvos com sucesso!")
    } catch (error) {
      alert("Erro ao salvar lançamentos")
    } finally {
      setIsLoading(false)
    }
  }

  const exportToExcel = () => {
    // Simular exportação para Excel
    console.log("Exportando para Excel...")
    alert("Funcionalidade de exportação será implementada")
  }

  const importFromExcel = () => {
    // Simular importação do Excel
    console.log("Importando do Excel...")
    alert("Funcionalidade de importação será implementada")
  }

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editingCell])

  if (showSuppliers) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setShowSuppliers(false)}>
          ← Voltar aos Lançamentos
        </Button>
        <SuppliersManagement onSupplierSelect={handleSupplierSelect} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-orange-600" />
                Lançamentos - {projectName}
              </CardTitle>
              <CardDescription>Planilha de lançamentos estilo Excel com upload de NF</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowSuppliers(true)}>
                <Building2 className="h-4 w-4 mr-2" />
                Fornecedores
              </Button>
              <Button variant="outline" onClick={importFromExcel}>
                <Upload className="h-4 w-4 mr-2" />
                Importar
              </Button>
              <Button variant="outline" onClick={exportToExcel}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button onClick={addNewRow}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Linha
              </Button>
              <Button onClick={saveExpenses} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left font-medium">NF</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">#</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">Descrição</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">Fornecedor</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">Data</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">Classe</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">Fase</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">Tipo</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">Valor (R$)</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">Taxa Admin (%)</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">Arquivo NF</th>
                  <th className="border border-gray-300 p-2 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {projectExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-1">
                      {editingCell?.rowId === expense.id && editingCell?.field === "invoiceNumber" ? (
                        <Input
                          ref={inputRef}
                          value={expense.invoiceNumber}
                          onChange={(e) => updateExpense(expense.id, "invoiceNumber", e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={(e) => handleKeyDown(e, expense.id, "invoiceNumber")}
                          className="border-0 p-1 h-8"
                          placeholder="NF-123456"
                        />
                      ) : (
                        <div
                          className="p-1 cursor-pointer hover:bg-blue-50"
                          onClick={() => handleCellClick(expense.id, "invoiceNumber")}
                        >
                          {expense.invoiceNumber}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {editingCell?.rowId === expense.id && editingCell?.field === "sequenceNumber" ? (
                        <Input
                          ref={inputRef}
                          value={expense.sequenceNumber}
                          onChange={(e) => updateExpense(expense.id, "sequenceNumber", e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={(e) => handleKeyDown(e, expense.id, "sequenceNumber")}
                          className="border-0 p-1 h-8"
                        />
                      ) : (
                        <div
                          className="p-1 cursor-pointer hover:bg-blue-50"
                          onClick={() => handleCellClick(expense.id, "sequenceNumber")}
                        >
                          {expense.sequenceNumber}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {editingCell?.rowId === expense.id && editingCell?.field === "description" ? (
                        <Input
                          ref={inputRef}
                          value={expense.description}
                          onChange={(e) => updateExpense(expense.id, "description", e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={(e) => handleKeyDown(e, expense.id, "description")}
                          className="border-0 p-1 h-8"
                        />
                      ) : (
                        <div
                          className="p-1 cursor-pointer hover:bg-blue-50"
                          onClick={() => handleCellClick(expense.id, "description")}
                        >
                          {expense.description}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {editingCell?.rowId === expense.id && editingCell?.field === "supplier" ? (
                        <div className="flex space-x-1">
                          <Input
                            ref={inputRef}
                            value={expense.supplier}
                            onChange={(e) => updateExpense(expense.id, "supplier", e.target.value)}
                            onBlur={handleCellBlur}
                            onKeyDown={(e) => handleKeyDown(e, expense.id, "supplier")}
                            className="border-0 p-1 h-8 flex-1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowSuppliers(true)}
                            className="h-8 px-2"
                          >
                            ...
                          </Button>
                        </div>
                      ) : (
                        <div
                          className="p-1 cursor-pointer hover:bg-blue-50 flex items-center justify-between"
                          onClick={() => handleCellClick(expense.id, "supplier")}
                        >
                          <span>{expense.supplier}</span>
                          {expense.supplierId && (
                            <Badge variant="outline" className="text-xs">
                              Cadastrado
                            </Badge>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {editingCell?.rowId === expense.id && editingCell?.field === "date" ? (
                        <Input
                          ref={inputRef}
                          type="date"
                          value={expense.date}
                          onChange={(e) => updateExpense(expense.id, "date", e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={(e) => handleKeyDown(e, expense.id, "date")}
                          className="border-0 p-1 h-8"
                        />
                      ) : (
                        <div
                          className="p-1 cursor-pointer hover:bg-blue-50"
                          onClick={() => handleCellClick(expense.id, "date")}
                        >
                          {new Date(expense.date).toLocaleDateString("pt-BR")}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {editingCell?.rowId === expense.id && editingCell?.field === "class" ? (
                        <Select
                          value={expense.class}
                          onValueChange={(value) => {
                            updateExpense(expense.id, "class", value)
                            setEditingCell(null)
                          }}
                        >
                          <SelectTrigger className="border-0 p-1 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem key={cls} value={cls}>
                                {cls}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div
                          className="p-1 cursor-pointer hover:bg-blue-50"
                          onClick={() => handleCellClick(expense.id, "class")}
                        >
                          {expense.class}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {editingCell?.rowId === expense.id && editingCell?.field === "phase" ? (
                        <Select
                          value={expense.phase}
                          onValueChange={(value) => {
                            updateExpense(expense.id, "phase", value)
                            setEditingCell(null)
                          }}
                        >
                          <SelectTrigger className="border-0 p-1 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {phases.map((phase) => (
                              <SelectItem key={phase} value={phase}>
                                {phase}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div
                          className="p-1 cursor-pointer hover:bg-blue-50"
                          onClick={() => handleCellClick(expense.id, "phase")}
                        >
                          {expense.phase}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {editingCell?.rowId === expense.id && editingCell?.field === "type" ? (
                        <Select
                          value={expense.type}
                          onValueChange={(value) => {
                            updateExpense(expense.id, "type", value)
                            setEditingCell(null)
                          }}
                        >
                          <SelectTrigger className="border-0 p-1 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {types.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div
                          className="p-1 cursor-pointer hover:bg-blue-50"
                          onClick={() => handleCellClick(expense.id, "type")}
                        >
                          {expense.type}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {editingCell?.rowId === expense.id && editingCell?.field === "value" ? (
                        <Input
                          ref={inputRef}
                          type="number"
                          value={expense.value}
                          onChange={(e) => updateExpense(expense.id, "value", Number.parseFloat(e.target.value) || 0)}
                          onBlur={handleCellBlur}
                          onKeyDown={(e) => handleKeyDown(e, expense.id, "value")}
                          className="border-0 p-1 h-8"
                        />
                      ) : (
                        <div
                          className="p-1 cursor-pointer hover:bg-blue-50 text-right"
                          onClick={() => handleCellClick(expense.id, "value")}
                        >
                          {expense.value.toLocaleString("pt-BR")}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {editingCell?.rowId === expense.id && editingCell?.field === "adminTax" ? (
                        <Input
                          ref={inputRef}
                          type="number"
                          value={expense.adminTax}
                          onChange={(e) =>
                            updateExpense(expense.id, "adminTax", Number.parseFloat(e.target.value) || 0)
                          }
                          onBlur={handleCellBlur}
                          onKeyDown={(e) => handleKeyDown(e, expense.id, "adminTax")}
                          className="border-0 p-1 h-8"
                        />
                      ) : (
                        <div
                          className="p-1 cursor-pointer hover:bg-blue-50 text-right"
                          onClick={() => handleCellClick(expense.id, "adminTax")}
                        >
                          {expense.adminTax}%
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-1">
                      <div className="flex items-center space-x-1">
                        {expense.invoiceFile ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewInvoice(expense.invoiceFile!)}
                              className="h-8 px-2"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadInvoice(expense.invoiceFile!)}
                              className="h-8 px-2"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleInvoiceUpload(expense.id)}
                            disabled={uploadingInvoice === expense.id}
                            className="h-8 px-2"
                          >
                            {uploadingInvoice === expense.id ? (
                              "..."
                            ) : (
                              <>
                                <Upload className="h-3 w-3 mr-1" />
                                NF
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-300 p-1">
                      <Button size="sm" variant="outline" onClick={() => deleteRow(expense.id)} className="h-8 px-2">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumo */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Total de Lançamentos:</span>
                <span className="ml-2">{projectExpenses.length}</span>
              </div>
              <div>
                <span className="font-medium">Valor Total:</span>
                <span className="ml-2 text-blue-600">
                  R$ {projectExpenses.reduce((sum, exp) => sum + exp.value, 0).toLocaleString("pt-BR")}
                </span>
              </div>
              <div>
                <span className="font-medium">Taxa Admin Total:</span>
                <span className="ml-2 text-orange-600">
                  R${" "}
                  {projectExpenses
                    .reduce((sum, exp) => sum + (exp.value * exp.adminTax) / 100, 0)
                    .toLocaleString("pt-BR")}
                </span>
              </div>
              <div>
                <span className="font-medium">Valor + Taxa:</span>
                <span className="ml-2 text-green-600">
                  R${" "}
                  {projectExpenses
                    .reduce((sum, exp) => sum + exp.value + (exp.value * exp.adminTax) / 100, 0)
                    .toLocaleString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
