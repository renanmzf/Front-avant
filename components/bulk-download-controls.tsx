"use client"

import { Download, FileText, CheckSquare, Square, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { RDO } from "../types/rdo-visualization"

interface BulkDownloadControlsProps {
  rdos: RDO[]
  selectedRDOs: RDO[]
  isAllSelected: boolean
  isPartiallySelected: boolean
  onToggleSelectAll: () => void
  onDownloadAll: () => void
  onDownloadSelected: () => void
  className?: string
}

export const BulkDownloadControls = ({
  rdos,
  selectedRDOs,
  isAllSelected,
  isPartiallySelected,
  onToggleSelectAll,
  onDownloadAll,
  onDownloadSelected,
  className = "",
}: BulkDownloadControlsProps) => {
  const getSelectIcon = () => {
    if (isAllSelected) return CheckSquare
    if (isPartiallySelected) return Minus
    return Square
  }

  const SelectIcon = getSelectIcon()

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border ${className}`}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleSelectAll}
          className="flex items-center gap-2 bg-transparent"
        >
          <SelectIcon className="h-4 w-4" />
          {isAllSelected ? "Desmarcar Todos" : "Selecionar Todos"}
        </Button>

        {selectedRDOs.length > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {selectedRDOs.length} selecionado{selectedRDOs.length !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onDownloadAll} className="flex items-center gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Baixar Todos ({rdos.length})
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={onDownloadSelected}
          disabled={selectedRDOs.length === 0}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          Baixar Selecionados ({selectedRDOs.length})
        </Button>
      </div>
    </div>
  )
}
