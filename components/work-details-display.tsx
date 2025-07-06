import { FileText, MapPin, Calendar, User, Hash, Clock } from 'lucide-react';
import { DisplaySection } from './display-section';
import { InfoField } from './info-field';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { ConstructionData } from '../types/construction-display';

interface WorkDetailsDisplayProps {
    data: ConstructionData;
}

export const WorkDetailsDisplay = ({ data }: WorkDetailsDisplayProps) => {
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return format(date, 'dd/MM/yyyy', { locale: ptBR });
        } catch {
            return dateString;
        }
    };

    return (
        <DisplaySection
            title="Detalhes da Obra"
            description="Informações específicas sobre o projeto de construção"
            icon={FileText}
        >
            <div className="space-y-4">
                <InfoField
                    label="Descrição da Obra"
                    value={data.workDescription}
                />

                <InfoField
                    label="Local da Obra"
                    value={data.workLocation}
                    icon={MapPin}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoField
                        label="Início da Obra"
                        value={formatDate(data.workStartDate)}
                        icon={Calendar}
                    />
                    <InfoField
                        label="Prazo (dias)"
                        value={`${data.workDeadlineDays} dias`}
                        icon={Clock}
                    />
                    <InfoField
                        label="Término da Obra"
                        value={formatDate(data.workEndDate)}
                        icon={Calendar}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoField
                        label="Responsável Técnico/Fiscal"
                        value={data.workResponsible}
                        icon={User}
                    />
                    <InfoField
                        label="Documento"
                        value={data.workResponsibleDoc}
                    />
                    <InfoField
                        label="Número/Identificação"
                        value={data.workResponsibleNumber}
                        icon={Hash}
                    />
                </div>
            </div>
        </DisplaySection>
    );
};
