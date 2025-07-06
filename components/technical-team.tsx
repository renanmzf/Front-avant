"use client"

import { ProfessionalCard } from "./professional-card"
import { TechnicalTeamSummary } from "./technical-team-summary"
import type { TechnicalTeamProps } from "../types/technical-team"

export const TechnicalTeam = ({ professionals, className = "" }: TechnicalTeamProps) => {
  const activeProfessionals = professionals.filter((p) => p.status === "active")

  return (
    <div className={`space-y-6 ${className}`}>
      <TechnicalTeamSummary professionals={activeProfessionals} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeProfessionals.map((professional) => (
          <ProfessionalCard key={professional.id} professional={professional} />
        ))}
      </div>

      {activeProfessionals.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum profissional cadastrado</h3>
          <p className="text-gray-600">Adicione profissionais à equipe técnica para começar.</p>
        </div>
      )}
    </div>
  )
}
