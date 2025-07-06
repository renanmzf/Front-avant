"use client"

import { Building } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "../types/contract-management"

interface ProjectSelectorProps {
  projects: Project[]
  selectedProjectId: string
  onProjectSelect: (projectId: string) => void
  className?: string
}

export const ProjectSelector = ({
  projects,
  selectedProjectId,
  onProjectSelect,
  className = "",
}: ProjectSelectorProps) => {
  const selectedProject = projects.find((p) => p.id === selectedProjectId)

  return (
    <Card className={`${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Building className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Selecionar Projeto</h3>
        </div>

        <div className="space-y-4">
          <Select value={selectedProjectId} onValueChange={onProjectSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um projeto para criar contratos" />
            </SelectTrigger>
            <SelectContent>
              {projects.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p>Nenhum projeto disponível</p>
                  <p className="text-xs mt-1">Crie um projeto primeiro para poder criar contratos</p>
                </div>
              ) : (
                projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-xs text-gray-500">
                        {project.owner} • {project.workType}
                      </span>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {selectedProject && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">{selectedProject.name}</h4>
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  {selectedProject.workType}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-blue-800">
                <p>
                  <span className="font-medium">Proprietário:</span> {selectedProject.owner}
                </p>
                <p>
                  <span className="font-medium">Cliente:</span> {selectedProject.client.name}
                </p>
                <p>
                  <span className="font-medium">Prestador:</span> {selectedProject.serviceProvider.name}
                </p>
                <p>
                  <span className="font-medium">Endereço:</span> {selectedProject.address}
                </p>
              </div>
            </div>
          )}

          {projects.length === 0 && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                <span className="font-medium">Atenção:</span> Você precisa criar pelo menos um projeto antes de poder
                criar contratos.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
