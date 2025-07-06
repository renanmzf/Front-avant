"use client"

import { Users, Award, Phone, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { TechnicalProfessional } from "../types/technical-team"

interface TechnicalTeamSummaryProps {
  professionals: TechnicalProfessional[]
  className?: string
}

export const TechnicalTeamSummary = ({ professionals, className = "" }: TechnicalTeamSummaryProps) => {
  const activeProfessionals = professionals.filter((p) => p.status === "active")
  const registryTypes = [...new Set(professionals.map((p) => p.registryType))]
  const totalServices = professionals.length

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ${className}`}>
      <Card>
        <CardContent className="p-4 text-center">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{activeProfessionals.length}</div>
          <div className="text-sm text-gray-600">Profissionais Ativos</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{registryTypes.length}</div>
          <div className="text-sm text-gray-600">Tipos de Registro</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Briefcase className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalServices}</div>
          <div className="text-sm text-gray-600">Serviços Cobertos</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Phone className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">100%</div>
          <div className="text-sm text-gray-600">Disponibilidade</div>
        </CardContent>
      </Card>
    </div>
  )
}
