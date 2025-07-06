"use client"

import React, { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  FileText,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  CreditCard,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "../utils/contract-management-utils"
import { PAYMENT_METHOD_LABELS, CONTRACT_TYPE_LABELS } from "../constants/contract-table-data"
import type { ContractTableData } from "../types/contract-management"

interface ContractSummaryTableProps {
  data: ContractTableData
  className?: string
}

// Add the contract type badge function
const getContractTypeColor = (type: string) => {
  const colors = {
    medicao: "bg-blue-100 text-blue-800",
    empreitada: "bg-green-100 text-green-800",
    projeto: "bg-purple-100 text-purple-800",
  }
  return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
}

export const ContractSummaryTable = ({ data, className = "" }: ContractSummaryTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (summaryId: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(summaryId)) {
      newExpanded.delete(summaryId)
    } else {
      newExpanded.add(summaryId)
    }
    setExpandedRows(newExpanded)
  }

  const getAmountColor = (amount: number) => {
    if (amount > 0) return "text-emerald-600"
    if (amount < 0) return "text-red-500"
    return "text-gray-600"
  }

  const getAmountBadgeColor = (amount: number) => {
    if (amount > 0) return "bg-emerald-50 text-emerald-700 border-emerald-200"
    if (amount < 0) return "bg-red-50 text-red-700 border-red-200"
    return "bg-gray-50 text-gray-700 border-gray-200"
  }

  const getPaymentMethodColor = (method: string) => {
    const colors = {
      pix: "bg-purple-100 text-purple-800",
      dinheiro: "bg-green-100 text-green-800",
      cheque: "bg-blue-100 text-blue-800",
      transferencia: "bg-indigo-100 text-indigo-800",
      cartao: "bg-orange-100 text-orange-800",
    }
    return colors[method as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const PaymentDetailsSection = ({
    payments,
    title,
    type,
    icon: Icon,
  }: {
    payments: any[]
    title: string
    type: "client" | "supplier"
    icon: any
  }) => (
    <div className="mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${type === "client" ? "bg-blue-100" : "bg-orange-100"}`}>
          <Icon className={`h-5 w-5 ${type === "client" ? "text-blue-600" : "text-orange-600"}`} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">
            {type === "client" ? "Recebimentos do Cliente" : "Pagamentos ao Fornecedor"}
          </p>
        </div>
        <div className="ml-auto">
          <Badge
            variant="outline"
            className={type === "client" ? "border-blue-200 text-blue-700" : "border-orange-200 text-orange-700"}
          >
            {payments.length} pagamento{payments.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="lg:col-span-1 space-y-3">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(payments.reduce((sum: number, p: any) => sum + p.value, 0))}
                  </p>
                </div>
                <div className={`p-2 rounded-full ${type === "client" ? "bg-blue-100" : "bg-orange-100"}`}>
                  <CreditCard className={`h-5 w-5 ${type === "client" ? "text-blue-600" : "text-orange-600"}`} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">Média por Pagamento</p>
                  <p className="text-lg font-bold text-emerald-800">
                    {formatCurrency(
                      payments.length > 0
                        ? payments.reduce((sum: number, p: any) => sum + p.value, 0) / payments.length
                        : 0,
                    )}
                  </p>
                </div>
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payments Table */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-hidden rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-0">
                      <TableHead className="font-semibold text-gray-700 border-0">#</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-0">Data</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-0">Valor</TableHead>
                      <TableHead className="font-semibold text-gray-700 border-0">Método</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment, index) => (
                      <TableRow key={payment.id} className="hover:bg-gray-50/50 border-gray-100">
                        <TableCell className="font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                              {payment.number}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{payment.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-gray-900">{formatCurrency(payment.value)}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPaymentMethodColor(payment.paymentMethod)} border-0`}>
                            {PAYMENT_METHOD_LABELS[payment.paymentMethod]}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <Card className={`border-0 shadow-lg ${className}`}>
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Resumo de Contratos</h2>
            <p className="text-blue-100 text-sm font-normal">Visão geral de todos os contratos e pagamentos</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {/* Summary Stats */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.totalContractValue)}</p>
              <p className="text-sm text-gray-600">Valor Total dos Contratos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{formatCurrency(data.totalPaidAmount)}</p>
              <p className="text-sm text-gray-600">Total Pago</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${getAmountColor(data.totalRemainingAmount)}`}>
                {data.totalRemainingAmount < 0 ? "-" : ""}
                {formatCurrency(Math.abs(data.totalRemainingAmount))}
              </p>
              <p className="text-sm text-gray-600">Saldo Restante</p>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-100 to-gray-50 border-0">
                <TableHead className="w-12 border-0"></TableHead>
                <TableHead className="font-semibold text-gray-700 border-0">Contrato</TableHead>
                <TableHead className="font-semibold text-gray-700 border-0">Fornecedor</TableHead>
                <TableHead className="font-semibold text-gray-700 border-0">Tipo</TableHead>
                <TableHead className="font-semibold text-gray-700 border-0">Valor do Contrato</TableHead>
                <TableHead className="font-semibold text-gray-700 border-0">Valor Pago</TableHead>
                <TableHead className="font-semibold text-gray-700 border-0">Saldo</TableHead>
                <TableHead className="font-semibold text-gray-700 border-0">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.summaries.map((summary, index) => (
                <React.Fragment key={summary.id}>
                  <TableRow
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors border-gray-100"
                    onClick={() => toggleRow(summary.id)}
                  >
                    <TableCell className="border-0">
                      <Button variant="ghost" size="sm" className="p-0 h-8 w-8 hover:bg-blue-100">
                        {expandedRows.has(summary.id) ? (
                          <ChevronDown className="h-4 w-4 text-blue-600" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">#{summary.number}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Contrato #{summary.number}</p>
                          <p className="text-sm text-gray-500">
                            {summary.clientPayments.length + summary.supplierPayments.length} pagamentos
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="border-0">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{summary.supplierName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="border-0">
                      <Badge className={`${getContractTypeColor(summary.contractType)} border-0 font-medium`}>
                        {CONTRACT_TYPE_LABELS[summary.contractType]}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-0">
                      <span className="font-semibold text-gray-900">{formatCurrency(summary.contractValue)}</span>
                    </TableCell>
                    <TableCell className="border-0">
                      <span className="font-semibold text-emerald-600">{formatCurrency(summary.paidAmount)}</span>
                    </TableCell>
                    <TableCell className="border-0">
                      <Badge
                        variant="outline"
                        className={`${getAmountBadgeColor(summary.remainingAmount)} font-medium`}
                      >
                        {summary.remainingAmount < 0 ? "-" : ""}
                        {formatCurrency(Math.abs(summary.remainingAmount))}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-0">
                      <div className="flex items-center gap-2">
                        {summary.remainingAmount > 0 ? (
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <Badge
                          variant="outline"
                          className={
                            summary.remainingAmount > 0
                              ? "border-emerald-200 text-emerald-700"
                              : "border-red-200 text-red-700"
                          }
                        >
                          {summary.remainingAmount > 0 ? "Em Andamento" : "Finalizado"}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>

                  {expandedRows.has(summary.id) && (
                    <TableRow key={`${summary.id}-expanded`}>
                      <TableCell colSpan={7} className="p-0 border-0">
                        <div className="bg-gradient-to-br from-gray-50 to-white p-6 border-t border-gray-100">
                          {/* Client Payments */}
                          {summary.clientPayments.length > 0 && (
                            <PaymentDetailsSection
                              payments={summary.clientPayments}
                              title="Recebimentos do Cliente"
                              type="client"
                              icon={TrendingUp}
                            />
                          )}

                          {/* Supplier Payments */}
                          {summary.supplierPayments.length > 0 && (
                            <PaymentDetailsSection
                              payments={summary.supplierPayments}
                              title="Pagamentos ao Fornecedor"
                              type="supplier"
                              icon={TrendingDown}
                            />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>

        {data.summaries.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum contrato encontrado</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Crie seus primeiros contratos para visualizar o resumo financeiro completo aqui.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
