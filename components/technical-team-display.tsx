import { Users, User, Hash, Briefcase, Phone, Mail, Award } from 'lucide-react';
import { DisplaySection } from './display-section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { TechnicalTeamDisplayProps } from '../types/construction-display';

export const TechnicalTeamDisplay = ({ data }: TechnicalTeamDisplayProps) => {
    const getRegistryColor = (registryType: string) => {
        switch (registryType) {
            case 'CREA':
                return 'bg-blue-100 text-blue-800';
            case 'CAU':
                return 'bg-green-100 text-green-800';
            case 'CFT':
                return 'bg-purple-100 text-purple-800';
            case 'CRQ':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <DisplaySection
            title="Quadro Equipe Técnica"
            description="Profissionais relacionados à obra com seus respectivos registros e habilitações"
            icon={Users}
        >
            <div className="space-y-4">
                {data.technicalTeam.map((member, index) => (
                    <Card
                        key={member.id}
                        className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
                    >
                        <CardContent className="p-4">
                            <div className="space-y-4">
                                {/* Nome e Registro */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm font-medium text-gray-700">
                                                Nome
                                            </span>
                                        </div>
                                        <div className="font-semibold text-gray-900">
                                            {member.name}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Hash className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm font-medium text-gray-700">
                                                Registro Técnico
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                className={`text-xs ${getRegistryColor(
                                                    member.registryType
                                                )}`}
                                            >
                                                {member.registryType}
                                            </Badge>
                                            <span className="text-sm text-gray-900">
                                                {member.registryNumber}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Habilitação e Serviço */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Award className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm font-medium text-gray-700">
                                                Habilitação
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md border">
                                            {member.qualification}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm font-medium text-gray-700">
                                                Serviço
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md border">
                                            {member.service}
                                        </div>
                                    </div>
                                </div>

                                {/* Contato */}
                                {(member.phone || member.email) && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm font-medium text-gray-700">
                                                Contato
                                            </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            {member.phone && (
                                                <div className="text-sm text-gray-600 flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-md">
                                                    <Phone className="h-3 w-3" />
                                                    {member.phone}
                                                </div>
                                            )}
                                            {member.email && (
                                                <div className="text-sm text-gray-600 flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-md">
                                                    <Mail className="h-3 w-3" />
                                                    {member.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">
                            Total de Profissionais
                        </span>
                    </div>
                    <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                    >
                        {data.technicalTeam.length} profissionais
                    </Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {Array.from(
                        new Set(
                            data.technicalTeam.map(
                                (member) => member.registryType
                            )
                        )
                    ).map((registryType) => {
                        const count = data.technicalTeam.filter(
                            (member) => member.registryType === registryType
                        ).length;
                        return (
                            <Badge
                                key={registryType}
                                className={`text-xs ${getRegistryColor(
                                    registryType
                                )}`}
                            >
                                {registryType}: {count}
                            </Badge>
                        );
                    })}
                </div>
            </div>
        </DisplaySection>
    );
};
