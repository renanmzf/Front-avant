"use client"

import { ChevronRight, FileText, User, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "../utils/contracts-utils"
import type { Project } from "../types/contracts"

interface ProjectCardProps {
  project: Project
  colorClass: string
  onClick: () => void
}

export const ProjectCard = ({ project, colorClass, onClick }: ProjectCardProps) => {
  return (
    <Card className={`cursor-pointer hover:shadow-md transition-all duration-200 ${colorClass}`} onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User className="h-4 w-4" />
                Cliente: {project.clientName}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-orange-500 text-white hover:bg-orange-600">
              {project.contractCount} contrato{project.contractCount !== 1 ? "s" : ""}
            </Badge>
            <div className="flex items-center gap-1 text-lg font-semibold text-gray-900">
              <DollarSign className="h-5 w-5" />
              {formatCurrency(project.totalValue)}
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
