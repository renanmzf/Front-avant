"use client"

import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ContractSummary } from "./contract-summary"
import { PaymentTable } from "./payment-table"
import type { ContractDetailsProps } from "../types/contracts"

export const ContractDetailsModal = ({ contract, onClose }: ContractDetailsProps) => {
  const handleDownloadContract = () => {
    if (contract.contractUrl) {
      // Simulate download
      console.log("Downloading contract:", contract.contractUrl)
      alert("Download do contrato iniciado!")
    }
  }

  const handleDownloadSignedContract = () => {
    if (contract.signedContractUrl) {
      // Simulate download
      console.log("Downloading signed contract:", contract.signedContractUrl)
      alert("Download do contrato assinado iniciado!")
    }
  }

  const handleDownloadReceipt = (paymentId: string) => {
    const payment = contract.payments.find((p:any) => p.id === paymentId)
    if (payment?.receiptUrl) {
      // Simulate download
      console.log("Downloading receipt:", payment.receiptUrl)
      alert("Download do recibo iniciado!")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Contrato - {contract.title}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <ContractSummary
            contract={contract}
            onDownloadContract={handleDownloadContract}
            onDownloadSignedContract={handleDownloadSignedContract}
          />

          <PaymentTable payments={contract.payments} onDownloadReceipt={handleDownloadReceipt} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
