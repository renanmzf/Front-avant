"use client"

import { X, Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getClimateIcon } from "../utils/rdo-utils"
import type { DetailedRDO } from "../types/rdo-visualization"

interface RDODetailModalProps {
  rdo: DetailedRDO | null
  isOpen: boolean
  onClose: () => void
  onDownload: (rdo: DetailedRDO) => void
}

export const RDODetailModal = ({ rdo, isOpen, onClose, onDownload }: RDODetailModalProps) => {
  if (!rdo) return null

  const getWeatherIcon = (weather: string) => {
    return getClimateIcon(weather)
  }

  const getConditionsColor = (conditions: string) => {
    const colors = {
      Praticável: "bg-green-100 text-green-800",
      Impraticável: "bg-red-100 text-red-800",
      Parcial: "bg-yellow-100 text-yellow-800",
    }
    return colors[conditions as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status: string) => {
    const colors = {
      "Em andamento": "bg-blue-100 text-blue-800",
      Concluído: "bg-green-100 text-green-800",
      Pausado: "bg-yellow-100 text-yellow-800",
      "Não iniciado": "bg-gray-100 text-gray-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const totalDirectWorkers = rdo.workers.reduce((sum, worker) => sum + worker.direct, 0)
  const totalIndirectWorkers = rdo.workers.reduce((sum, worker) => sum + worker.indirect, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="sr-only">Relatório Diário de Obra (RDO) #{rdo.number}</DialogTitle>
          <DialogDescription className="sr-only">
            Detalhes completos do RDO #{rdo.number} de {rdo.reportDate} - {rdo.description}
          </DialogDescription>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-black text-white rounded flex items-center justify-center font-bold text-lg">
                  AG
                </div>
                <div>
                  <h2 className="text-xl font-bold">{rdo.companyName}</h2>
                  <p className="text-sm text-gray-600">{rdo.companyCode}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">RDO nº:</div>
                <div className="text-2xl font-bold">{rdo.number}</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Information */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">Relatório Diário de Obra (RDO)</h3>
            <p className="text-sm text-gray-600">
              Relatório nº {rdo.number} - {rdo.weekDay}, {rdo.reportDate}
            </p>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Informações da Obra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Obra:</span> {rdo.description}
                </div>
                <div>
                  <span className="font-medium">Local:</span> {rdo.workLocation}
                </div>
                <div>
                  <span className="font-medium">Cliente:</span> {rdo.client}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Cronograma</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Início da Obra:</span> {rdo.workStart}
                </div>
                <div>
                  <span className="font-medium">Término da Obra:</span> {rdo.workEnd}
                </div>
                <div>
                  <span className="font-medium">Prazo Decorido:</span> {rdo.decoratedDeadline}
                </div>
                <div>
                  <span className="font-medium">Data do Relatório:</span> {rdo.reportDate}
                </div>
                <div>
                  <span className="font-medium">Dia da semana:</span> {rdo.weekDay}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Work Shifts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Turnos de Trabalho</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Turno</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Saída</TableHead>
                    <TableHead>Horas Trabalhadas</TableHead>
                    <TableHead>Tempo</TableHead>
                    <TableHead>Condições gerais</TableHead>
                    <TableHead>Eficiência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rdo.shifts.map((shift, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{shift.period}</TableCell>
                      <TableCell>{shift.entry}</TableCell>
                      <TableCell>{shift.exit}</TableCell>
                      <TableCell>{shift.workedHours}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{getWeatherIcon(shift.weather)}</span>
                          <span>{shift.weather}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getConditionsColor(shift.conditions)}>{shift.conditions}</Badge>
                      </TableCell>
                      <TableCell>{shift.efficiency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Workers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mão de obra ({totalDirectWorkers + totalIndirectWorkers})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {rdo.workers.map((worker, index) => (
                  <div key={index} className="text-center border rounded p-2">
                    <div className="text-xs font-medium mb-1">{worker.type}</div>
                    <div className="text-sm">
                      <div>M.D.O. Direta: {worker.direct}</div>
                      <div>M.D.O. Indireta: {worker.indirect}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end gap-4 text-sm">
                <div className="text-center border rounded p-2">
                  <div className="font-medium">M.D.O. Direta</div>
                  <div className="text-lg font-bold">{totalDirectWorkers}</div>
                </div>
                <div className="text-center border rounded p-2">
                  <div className="font-medium">M.D.O. Indireta</div>
                  <div className="text-lg font-bold">{totalIndirectWorkers}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Máquinas e Equipamentos (0)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {rdo.equipment.map((equipment, index) => (
                  <div key={index} className="text-center border rounded p-2">
                    <div className="text-xs font-medium mb-1">{equipment.name}</div>
                    <div className="text-sm">{equipment.quantity}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Atividades / Tarefas ({rdo.activities.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Situação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rdo.activities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Occurrences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                Ocorrências / Observações (0)
                <div className="text-sm font-normal">
                  Fiscal visitou a obra? <span className="font-medium">{rdo.fiscalVisit ? "SIM" : "NÃO"}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[60px] border rounded p-3 bg-gray-50">
                {rdo.occurrences || "Nenhuma ocorrência registrada"}
              </div>
            </CardContent>
          </Card>

          {/* General Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comentários gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded p-3 bg-gray-50">{rdo.generalComments}</div>
            </CardContent>
          </Card>

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
            <div className="text-center">
              <div className="border-t border-gray-400 pt-2 mt-16">
                <div className="font-medium">{rdo.responsibleEngineer.name}</div>
                <div className="text-sm text-gray-600">{rdo.responsibleEngineer.registration}</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-400 pt-2 mt-16">
                <div className="font-medium">{rdo.fiscalEngineer.name}</div>
                <div className="text-sm text-gray-600">{rdo.fiscalEngineer.registration}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="border-t pt-4 flex justify-center">
          <Button onClick={() => onDownload(rdo)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4" />
            Baixar PDF do RDO #{rdo.number}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
