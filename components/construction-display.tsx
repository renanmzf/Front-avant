'use client';

import { Badge } from '@/components/ui/badge';
import { ContractorDisplay } from './contractor-display';
import { ClientDisplay } from './client-display';
import { WorkDetailsDisplay } from './work-details-display';
import { TechnicalTeamDisplay } from './technical-team-display';
import { mockConstructionData } from '../data/mock-construction-data';

export default function ConstructionDisplay() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Dados Gerais da Obra
                        </h1>
                        <p className="text-gray-600">
                            Informações básicas do projeto de construção
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="text-sm">
                            Contrato: {mockConstructionData.contractNumber}
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                            Status: Em Andamento
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <ContractorDisplay data={mockConstructionData} />
                <ClientDisplay data={mockConstructionData} />
                <WorkDetailsDisplay data={mockConstructionData} />
                <TechnicalTeamDisplay data={mockConstructionData} />
            </div>
        </div>
    );
}
