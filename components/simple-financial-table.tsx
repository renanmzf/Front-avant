"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"

interface SimpleFinancialTableProps {
  projectId?: string
}

export function SimpleFinancialTable({ projectId }: SimpleFinancialTableProps) {
  // Dados baseados na imagem fornecida
  const suppliers = [
    {
      id: 1,
      name: "ANDRESSA",
      contract: 440000.0,
      paid: 196400.0,
      remaining: 243600.0,
      status: "active",
    },
    {
      id: 2,
      name: "TONINHO",
      contract: 128000.0,
      paid: 102900.0,
      remaining: -25100.0, // Valor negativo (pago a mais)
      status: "overpaid",
    },
    {
      id: 3,
      name: "FELIPE",
      contract: 32780.24,
      paid: 6400.0,
      remaining: -26380.24, // Valor negativo
      status: "overpaid",
    },
    {
      id: 4,
      name: "RICARDO",
      contract: 15500.0,
      paid: 400.0,
      remaining: -15100.0, // Valor negativo
      status: "overpaid",
    },
    {
      id: 5,
      name: "OUTROS",
      contract: 71590.0,
      paid: 0.0,
      remaining: -71590.0, // Valor negativo
      status: "overpaid",
    },
    {
      id: 6,
      name: "NILSON",
      contract: 2200.0,
      paid: 0.0,
      remaining: -2200.0, // Valor negativo
      status: "overpaid",
    },
    {
      id: 7,
      name: "SHEILA",
      contract: 4300.0,
      paid: 2150.0,
      remaining: -2150.0, // Valor negativo
      status: "overpaid",
    },
    {
      id: 8,
      name: "ELEANDRO",
      contract: 20000.0,
      paid: 4700.0,
      remaining: -15300.0, // Valor negativo
      status: "overpaid",
    },
    {
      id: 9,
      name: "CABELLO",
      contract: 2500.0,
      paid: 2500.0,
      remaining: 0.0,
      status: "completed",
    },
    {
      id: 10,
      name: "AILTON",
      contract: 50000.0,
      paid: 400.0,
      remaining: -49600.0, // Valor negativo
      status: "overpaid",
    },
  ]

  // Calcular totais
  const totals = suppliers.reduce(
    (acc, supplier) => ({
      contract: acc.contract + supplier.contract,
      paid: acc.paid + supplier.paid,
      remaining: acc.remaining + supplier.remaining,
    }),
    { contract: 0, paid: 0, remaining: 0 },
  )

  const formatCurrency = (value: number) => {
    const formatted = Math.abs(value).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return value < 0 ? `-R$ ${formatted}` : `R$ ${formatted}`
  }

  const getCellStyle = (value: number) => {
    if (value < 0) {
      return "text-red-600 font-medium"
    }
    return "text-gray-900"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Resumo Financeiro por Fornecedor</span>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              Visualizar
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </div>
        </CardTitle>
        <CardDescription>Contratos, pagamentos e saldos por fornecedor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-3 py-2 text-center font-bold">#</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-bold">FORNECEDOR</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-bold">CONTRATO</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-bold">PAGO</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-bold">RESTA</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center font-medium">{index + 1}</td>
                  <td className="border border-gray-300 px-3 py-2 font-medium">{supplier.name}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{formatCurrency(supplier.contract)}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{formatCurrency(supplier.paid)}</td>
                  <td className={`border border-gray-300 px-3 py-2 text-right ${getCellStyle(supplier.remaining)}`}>
                    {formatCurrency(supplier.remaining)}
                  </td>
                </tr>
              ))}
              {/* Linha de totais */}
              <tr className="bg-gray-100 font-bold">
                <td className="border border-gray-300 px-3 py-2 text-center" colSpan={2}>
                  TOTAIS
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right text-blue-600">
                  {formatCurrency(totals.contract)}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right text-green-600">
                  {formatCurrency(totals.paid)}
                </td>
                <td className={`border border-gray-300 px-3 py-2 text-right ${getCellStyle(totals.remaining)}`}>
                  {formatCurrency(totals.remaining)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Resumo com badges */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border">
            <p className="text-sm text-blue-700 font-medium">Total Contratado</p>
            <p className="text-xl font-bold text-blue-800">{formatCurrency(totals.contract)}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border">
            <p className="text-sm text-green-700 font-medium">Total Pago</p>
            <p className="text-xl font-bold text-green-800">{formatCurrency(totals.paid)}</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border">
            <p className="text-sm text-red-700 font-medium">Saldo</p>
            <p className={`text-xl font-bold ${getCellStyle(totals.remaining)}`}>{formatCurrency(totals.remaining)}</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border">
            <p className="text-sm text-purple-700 font-medium">Fornecedores</p>
            <p className="text-xl font-bold text-purple-800">{suppliers.length}</p>
          </div>
        </div>

        {/* Legenda */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="destructive">Valores em vermelho: Pagos a mais que o contratado</Badge>
          <Badge variant="default">Valores em preto: Dentro do esperado</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
