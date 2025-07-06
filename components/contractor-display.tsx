import { Building2, Phone, Mail, User, Hash } from "lucide-react"
import { DisplaySection } from "./display-section"
import { InfoField } from "./info-field"
import type { ConstructionData } from "../types/construction-display"

interface ContractorDisplayProps {
  data: ConstructionData
}

export const ContractorDisplay = ({ data }: ContractorDisplayProps) => {
  return (
    <DisplaySection
      title="Prestador de Serviço (Contratada)"
      description="Informações da empresa ou profissional contratado"
      icon={Building2}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <InfoField label="Nome/Razão Social" value={data.contractorName} />
        </div>
        <InfoField label="CPF/CNPJ" value={data.contractorCpfCnpj} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <InfoField label="Telefone" value={data.contractorPhone} icon={Phone} />
        <InfoField label="E-mail" value={data.contractorEmail} icon={Mail} />
      </div>

      <div className="mt-4">
        <InfoField label="Endereço Resumido" value={data.contractorAddress} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <InfoField label="Responsável Técnico" value={data.technicalResponsible} icon={User} />
        <InfoField label="Documento" value={data.technicalDoc} />
        <InfoField label="Número/Identificação" value={data.technicalNumber} icon={Hash} />
      </div>
    </DisplaySection>
  )
}
