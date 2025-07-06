"use client"

import { Eye, Download, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getClimateIcon } from "../utils/rdo-utils"
import type { RDO } from "../types/rdo-visualization"

interface RDOItemProps {
  rdo: RDO
  isSelected: boolean
  onToggleSelection: (rdoId: string) => void
  onView: (rdo: RDO) => void
  onDownload: (rdo: RDO) => void
  className?: string
}

export const RDOItem = ({ rdo, isSelected, onToggleSelection, onView, onDownload, className = "" }: RDOItemProps) => {
  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""} ${className}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Checkbox checked={isSelected} onCheckedChange={() => onToggleSelection(rdo.id)} className="flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">RDO #{rdo.number}</h3>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {rdo.date}
              </Badge>
            </div>

            <p className="text-gray-800 mb-3 line-clamp-2">{rdo.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span>{getClimateIcon(rdo.climate)}</span>
                <span>Clima: {rdo.climate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>
                  Equipe: {rdo.teamSize} pessoa{rdo.teamSize !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={() => onView(rdo)} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Visualizar
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDownload(rdo)} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
