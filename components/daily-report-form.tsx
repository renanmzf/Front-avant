'use client';

import { Save, RotateCcw, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { ReportHeader } from './report-header';
import { WorkShifts } from './work-shifts';
import { WorkforceEquipment } from './workforce-equipment';
import { ActivitiesSection } from './activities-section';
import { OccurrencesComments } from './occurrences-comments';
import { useDailyReport } from '../hooks/use-daily-report';

export default function DailyReportForm() {
    const {
        form,
        isSubmitting,
        savedTemplate,
        onSubmit,
        saveAsTemplate,
        clearTemplate,
        addActivity,
        removeActivity,
        addOccurrence,
        removeOccurrence,
    } = useDailyReport();

    const handleFormSubmit = async (data: any) => {
        try {
            const result = await onSubmit(data);
            if (result.success) {
                alert(result.message);
            }
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : 'Erro ao salvar relatório'
            );
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Relatório Diário de Obra
                        </h1>
                        <p className="text-gray-600">
                            Preencha as informações do dia de trabalho
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {savedTemplate && (
                            <Badge variant="secondary" className="text-sm">
                                Template Salvo
                            </Badge>
                        )}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={saveAsTemplate}
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Salvar como Template
                        </Button>
                        {savedTemplate && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={clearTemplate}
                            >
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Limpar Template
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    className="space-y-8"
                >
                    <ReportHeader form={form} />

                    <WorkShifts form={form} />

                    <WorkforceEquipment form={form} />

                    <ActivitiesSection
                        form={form}
                        onAddActivity={addActivity}
                        onRemoveActivity={removeActivity}
                    />

                    <OccurrencesComments
                        form={form}
                        onAddOccurrence={addOccurrence}
                        onRemoveOccurrence={removeOccurrence}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="min-w-[200px]"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {isSubmitting ? 'Salvando...' : 'Salvar Relatório'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
