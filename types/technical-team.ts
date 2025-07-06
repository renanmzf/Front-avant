export interface TechnicalProfessional {
  id: string
  name: string
  role: string
  phone: string
  registryType: "CAU" | "CREA" | "CFT" | "CRQ" | "OUTROS"
  registryNumber: string
  qualification: string
  service: string
  email?: string
  status: "active" | "inactive"
}

export interface TechnicalTeamProps {
  professionals: TechnicalProfessional[]
  className?: string
}
