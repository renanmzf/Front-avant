import { Users } from "lucide-react"
import { DisplaySection } from "./display-section"
import { InfoField } from "./info-field"
import type { ConstructionData } from "../types/construction-display"

interface ClientDisplayProps {
  data: ConstructionData
}

export const ClientDisplay = ({ data }: ClientDisplayProps) => {
  return (
    <DisplaySection
      title="Cliente (Contratante)"
      description="Informações do cliente que contratou o serviço"
      icon={Users}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <InfoField label="Nome/Razão Social" value={data.clientName} />
        </div>
        <InfoField label="CPF/CNPJ" value={data.clientCpfCnpj} />
      </div>

      <div className="mt-4">
        <InfoField label="Número do Contrato" value={data.contractNumber} />
      </div>
    </DisplaySection>
  )
}
