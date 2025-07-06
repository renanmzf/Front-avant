"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface MeasurementBulletinProps {
  measurementId: string
  contractorName: string
  contractorCnpj: string
  clientName: string
  clientCnpj: string
  workName: string
  measurementNumber: number
  bulletinDate: string
  measurementDate: string
  period: string
  expectedPaymentDate: string
  services: Array<{
    id: string
    specification: string
    description: string
    unit: string
    unitValue: number
    previousAccumulated: number
    executedInPeriod: number
    totalAccumulated: number
  }>
  supervisor: string
  engineer: string
  servicesPerformed: string
  deductions: number
  netAmount: number
  netAmountInWords: string
}

export function MeasurementBulletin({
  measurementId,
  contractorName,
  contractorCnpj,
  clientName,
  clientCnpj,
  workName,
  measurementNumber,
  bulletinDate,
  measurementDate,
  period,
  expectedPaymentDate,
  services,
  supervisor,
  engineer,
  servicesPerformed,
  deductions,
  netAmount,
  netAmountInWords,
}: MeasurementBulletinProps) {
  const handleDownloadPDF = () => {
    // Simular geração do PDF do boletim
    console.log("Gerando PDF do boletim de medição:", measurementId)
    const link = document.createElement("a")
    link.href = `/placeholder.pdf?name=boletim_medicao_${measurementNumber}.pdf`
    link.download = `boletim_medicao_${measurementNumber}.pdf`
    link.click()
  }

  const totalPreviousAccumulated = services.reduce((sum, service) => sum + service.previousAccumulated, 0)
  const totalExecutedInPeriod = services.reduce((sum, service) => sum + service.executedInPeriod, 0)
  const totalAccumulated = services.reduce((sum, service) => sum + service.totalAccumulated, 0)

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center border-b">
        <CardTitle className="text-xl font-bold">BOLETIM DE MEDIÇÃO DE OBRA</CardTitle>
        <div className="flex justify-end mt-4">
          <Button onClick={handleDownloadPDF} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Header Information */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Contratante:</span>
              <div>{clientName}</div>
              <div className="text-sm text-gray-600">CNPJ/CPF: {clientCnpj}</div>
            </div>
            <div>
              <span className="font-semibold">Contratado:</span>
              <div>{contractorName}</div>
              <div className="text-sm text-gray-600">CNPJ/CPF: {contractorCnpj}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Obra:</span>
              <div>{workName}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Medição nº:</span>
                <div>{measurementNumber}</div>
              </div>
              <div>
                <span className="font-semibold">Data do boletim:</span>
                <div>{new Date(bulletinDate).toLocaleDateString("pt-BR")}</div>
              </div>
              <div>
                <span className="font-semibold">Data da medição:</span>
                <div>{new Date(measurementDate).toLocaleDateString("pt-BR")}</div>
              </div>
              <div>
                <span className="font-semibold">Período:</span>
                <div>{period}</div>
              </div>
            </div>
            <div>
              <span className="font-semibold">Data prevista pgtº:</span>
              <div>{new Date(expectedPaymentDate).toLocaleDateString("pt-BR")}</div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2 text-left">ITEM</th>
                <th className="border border-gray-300 p-2 text-left">ESPECIFICAÇÃO</th>
                <th className="border border-gray-300 p-2 text-center">UN.</th>
                <th className="border border-gray-300 p-2 text-center">UNITÁRIO</th>
                <th className="border border-gray-300 p-2 text-center" colSpan={3}>
                  VALORES (R$)
                </th>
              </tr>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-1"></th>
                <th className="border border-gray-300 p-1"></th>
                <th className="border border-gray-300 p-1"></th>
                <th className="border border-gray-300 p-1"></th>
                <th className="border border-gray-300 p-1 text-center text-xs">ACUMULADO ANT.</th>
                <th className="border border-gray-300 p-1 text-center text-xs">EXECUTADO NO PERÍODO</th>
                <th className="border border-gray-300 p-1 text-center text-xs">ACUMUL. TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id}>
                  <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="font-medium">{service.specification}</div>
                    <div className="text-xs text-gray-600 mt-1">{service.description}</div>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">{service.unit}</td>
                  <td className="border border-gray-300 p-2 text-right">
                    {service.unitValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    {service.previousAccumulated.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    {service.executedInPeriod.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    {service.totalAccumulated.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="border border-gray-300 p-2" colSpan={4}>
                  TOTAIS BOLETIM
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {totalPreviousAccumulated.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {totalExecutedInPeriod.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {totalAccumulated.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Services Performed */}
        <div>
          <div className="font-semibold mb-2">Serviços realizados:</div>
          <div className="text-sm bg-gray-50 p-3 rounded border">{servicesPerformed}</div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Deduções:</span>
              <span>
                {deductions.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Líquido a receber:</span>
              <span>
                {netAmount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>
        </div>

        <div>
          <span className="font-semibold">Valor líquido a receber (por extenso):</span>
          <div className="mt-1 p-2 border rounded bg-gray-50">{netAmountInWords}</div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t">
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 mt-12">
              <div className="font-semibold">CONTRATADO</div>
              <div className="text-sm">{contractorName}</div>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 mt-12">
              <div className="font-semibold">SUPERVISOR</div>
              <div className="text-sm">{supervisor}</div>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 mt-12">
              <div className="font-semibold">CONTRATANTE</div>
              <div className="text-sm">{engineer}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
