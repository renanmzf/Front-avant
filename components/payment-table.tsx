"use client"

import { Download, Calendar, DollarSign, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "../utils/contracts-utils"
import { PAYMENT_STATUS } from "../constants/contracts"
import type { PaymentTableProps } from "../types/contracts"

export const PaymentTable = ({ payments, onDownloadReceipt }: PaymentTableProps) => {
  const totalPaid = payments.filter((p:any) => p.status === "paid").reduce((sum:any, p:any) => sum + p.amount, 0)

  const totalPending = payments
    .filter((p:any) => p.status === "pending" || p.status === "overdue")
    .reduce((sum:any, p:any) => sum + p.amount, 0)

  const overdueCount = payments.filter((p:any) => p.status === "overdue").length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Pagamentos
        </CardTitle>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Pago: {formatCurrency(totalPaid)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Pendente: {formatCurrency(totalPending)}</span>
          </div>
          {overdueCount > 0 && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>
                {overdueCount} pagamento{overdueCount !== 1 ? "s" : ""} vencido{overdueCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Data Pagamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment:any) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.description}</TableCell>
                <TableCell>{formatCurrency(payment.amount)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {formatDate(payment.dueDate)}
                  </div>
                </TableCell>
                <TableCell>{payment.paidDate ? formatDate(payment.paidDate) : "-"}</TableCell>
                <TableCell>
                  <Badge className={PAYMENT_STATUS[payment.status].color}>{PAYMENT_STATUS[payment.status].label}</Badge>
                </TableCell>
                <TableCell>
                  {payment.receiptUrl && (
                    <Button variant="ghost" size="sm" onClick={() => onDownloadReceipt(payment.id)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
