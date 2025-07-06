"use client"

import { FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BulkDownloadControls } from "./bulk-download-controls"
import { RDOItem } from "./rdo-item"
import { useRDOSelection } from "../hooks/use-rdo-selection"
import { downloadPDF, downloadMultiplePDFs } from "../utils/rdo-utils"
import type { RDOVisualizationProps } from "../types/rdo-visualization"
import { RDODetailModal } from "./rdo-detail-modal"
import { DETAILED_MOCK_RDOS } from "../constants/detailed-rdo-data"
import type { DetailedRDO } from "../types/rdo-visualization"
import { useState } from "react"
import { generateDetailedRDO } from "../utils/rdo-utils"

export const RDOVisualization = ({ rdos, className = "" }: RDOVisualizationProps) => {
  const { selectedIds, selectedRDOs, isAllSelected, isPartiallySelected, toggleSelection, toggleSelectAll } =
    useRDOSelection(rdos)

  const [selectedRDO, setSelectedRDO] = useState<DetailedRDO | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDownloadAll = () => {
    downloadMultiplePDFs(rdos)
  }

  const handleDownloadSelected = () => {
    if (selectedRDOs.length > 0) {
      downloadMultiplePDFs(selectedRDOs)
    }
  }

  const handleView = (rdo: any) => {
    // Primeiro tenta encontrar nos dados detalhados existentes
    let detailedRDO = DETAILED_MOCK_RDOS.find((detailed) => detailed.id === rdo.id)

    // Se não encontrar, gera dinamicamente
    if (!detailedRDO) {
      detailedRDO = generateDetailedRDO(rdo)
    }

    setSelectedRDO(detailedRDO)
    setIsModalOpen(true)
  }

  const handleDownload = (rdo: any) => {
    downloadPDF(rdo)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRDO(null)
  }

  const handleModalDownload = (rdo: DetailedRDO) => {
    downloadPDF(rdo)
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <FileText className="h-6 w-6" />
          Visualização dos RDOs
        </CardTitle>
        <CardDescription className="text-gray-600">Acompanhe o progresso diário da sua obra</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <BulkDownloadControls
          rdos={rdos}
          selectedRDOs={selectedRDOs}
          isAllSelected={isAllSelected}
          isPartiallySelected={isPartiallySelected}
          onToggleSelectAll={toggleSelectAll}
          onDownloadAll={handleDownloadAll}
          onDownloadSelected={handleDownloadSelected}
        />

        <div className="space-y-3">
          {rdos.map((rdo) => (
            <RDOItem
              key={rdo.id}
              rdo={rdo}
              isSelected={selectedIds.includes(rdo.id)}
              onToggleSelection={toggleSelection}
              onView={handleView}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {rdos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum RDO encontrado</h3>
            <p className="text-gray-600">Não há relatórios diários disponíveis no momento.</p>
          </div>
        )}

        <div className="text-sm text-gray-600 border-t pt-4">
          Total de RDOs: {rdos.length} • Selecionados: {selectedRDOs.length}
        </div>
      </CardContent>

      <RDODetailModal
        rdo={selectedRDO}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDownload={handleModalDownload}
      />
    </Card>
  )
}
