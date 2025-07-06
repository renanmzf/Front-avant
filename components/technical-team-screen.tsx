'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { TechnicalTeam } from './technical-team';
import { MOCK_TECHNICAL_TEAM } from '../constants/technical-team';

export default function TechnicalTeamScreen() {
    return (
        <div className="container mx-auto py-8 ">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        Equipe Técnica
                    </CardTitle>
                    <CardDescription>
                        O quadro da equipe técnica
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TechnicalTeam professionals={MOCK_TECHNICAL_TEAM} />
                </CardContent>
            </Card>
        </div>
    );
}
