"use client"

import { Phone, Mail, User, Award, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getRoleIcon, getRegistryColor, contactProfessional, emailProfessional } from "../utils/technical-team-utils"
import type { TechnicalProfessional } from "../types/technical-team"

interface ProfessionalCardProps {
  professional: TechnicalProfessional
  className?: string
}

export const ProfessionalCard = ({ professional, className = "" }: ProfessionalCardProps) => {
  return (
    <Card className={`hover:shadow-md transition-shadow duration-200 ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header with name and role */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{getRoleIcon(professional.role)}</div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{professional.name}</h3>
                <p className="text-blue-600 font-medium">{professional.role}</p>
              </div>
            </div>
            <Badge className={`${getRegistryColor(professional.registryType)} border-0`} variant="secondary">
              {professional.registryType}
            </Badge>
          </div>

          {/* Professional details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Registro:</span>
              <span className="font-medium">{professional.registryNumber}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Habilitação:</span>
              <span className="font-medium">{professional.qualification}</span>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-gray-500 mt-0.5" />
              <div>
                <span className="text-gray-600">Serviço:</span>
                <p className="font-medium text-gray-900 mt-1">{professional.service}</p>
              </div>
            </div>
          </div>

          {/* Contact actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => contactProfessional(professional.phone)}
              className="flex items-center gap-2 flex-1"
            >
              <Phone className="h-4 w-4" />
              {professional.phone}
            </Button>

            {professional.email && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => emailProfessional(professional.email!)}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
