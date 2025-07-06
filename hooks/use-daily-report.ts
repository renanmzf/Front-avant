'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dailyReportSchema } from '../schemas/daily-report-schema';
import type { DailyReportData } from '../types/daily-report';

const STORAGE_KEY = 'daily-report-template';

const getDefaultValues = (): DailyReportData => ({
    reportNumber: '',
    reportDate: '',
    deadlineProgress: '',
    isUsefulWorkDay: '', // Changed from true to empty string
    fiscalVisitApproval: false,
    shiftSelection: {
        morning: false,
        afternoon: false,
        night: false,
    },
    morningShift: {
        entrada: '',
        saida: '',
        tempo: '',
        status: '',
        eficiencia: '',
    },
    afternoonShift: {
        entrada: '',
        saida: '',
        tempo: '',
        status: '',
        eficiencia: '',
    },
    nightShift: {
        entrada: '',
        saida: '',
        tempo: '',
        status: '',
        eficiencia: '',
    },
    workforce: {
        gerenteContratos: 0,
        engenheiroResidente: 0,
        engenheiroSeguranca: 0,
        auxiliarPlanejamento: 0,
        tecnicoPlanejamentoMedicao: 0,
        tecnicoEdificacoes: 0,
        tecnicoSeguranca: 0,
        estagiarios: 0,
        encarregadoGeral: 0,
        encarregadoForma: 0,
        encarregadoArmacao: 0,
        chefeEscritorioObra: 0,
        auxiliarAdministrativo: 0,
        ferramenteiro: 0,
        eletricistaManutencao: 0,
        topografo: 0,
        auxiliarTopografia: 0,
        serventeLimpeza: 0,
        peitor: 0,
        almoxarife: 0,
        motorista: 0,
        vigia: 0,
    },
    equipment: {
        automovel: 0,
        retroescavadeira: 0,
        caminhaoBasculante: 0,
        betoneiraEletrica: 0,
        serraCircularBancada: 0,
        maquinaPolicorte: 0,
        vibradoresImersao: 0,
        compactadorPlacaVibratoria: 0,
        escavadeira: 0,
        maquinaMakita: 0,
        onibusPassageiro: 0,
        acabadoraPiso: 0,
        caminhaoComboio: 0,
        motoniveladora: 0,
        bombaLanca: 0,
        aparelhoTopografia: 0,
        caminhaoMunck: 0,
        marteleteEletrico: 0,
        transformadorEnergia: 0,
        caminhaoPipa: 0,
        furadeiraImpacto: 0,
        bombaSubmersivel2: 0,
    },
    activities: [],
    occurrences: [],
    generalComments: '',
});

export const useDailyReport = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [savedTemplate, setSavedTemplate] = useState<DailyReportData | null>(
        null
    );

    const form = useForm<DailyReportData>({
        resolver: zodResolver(dailyReportSchema),
        defaultValues: getDefaultValues(),
    });

    // Load saved template on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const template = JSON.parse(saved);
                setSavedTemplate(template);
                // Load template but clear date and report number for new report
                form.reset({
                    ...template,
                    reportNumber: '',
                    reportDate: '',
                    activities: [],
                    occurrences: [],
                    generalComments: '',
                });
            } catch (error) {
                console.error('Error loading template:', error);
            }
        }
    }, [form]);

    const saveAsTemplate = () => {
        const currentData = form.getValues();
        // Save current form data as template (excluding date-specific fields)
        const template = {
            ...currentData,
            reportNumber: '',
            reportDate: '',
            activities: [],
            occurrences: [],
            generalComments: '',
            // Keep shift selection in template
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(template));
        setSavedTemplate(template);
        alert(
            'Template salvo com sucesso! Os dados serão mantidos para próximos relatórios.'
        );
    };

    const clearTemplate = () => {
        localStorage.removeItem(STORAGE_KEY);
        setSavedTemplate(null);
        form.reset(getDefaultValues());
        alert('Template limpo com sucesso!');
    };

    const onSubmit = async (data: DailyReportData) => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Daily report data:', data);

            // Save current data as template for next report
            const template = {
                ...data,
                reportNumber: '',
                reportDate: '',
                activities: [],
                occurrences: [],
                generalComments: '',
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(template));

            // Reset only the fields that should be cleared for next report
            const nextReportData = {
                ...data,
                reportNumber: '',
                reportDate: '',
                activities: [],
                occurrences: [],
                generalComments: '',
            };
            form.reset(nextReportData);

            return {
                success: true,
                message:
                    'Relatório salvo com sucesso! Formulário pronto para próximo relatório.',
            };
        } catch (error) {
            console.error('Error submitting report:', error);
            throw new Error('Erro ao salvar relatório');
        } finally {
            setIsSubmitting(false);
        }
    };

    const addActivity = () => {
        const activities = form.getValues('activities');
        const newActivity = {
            id: Date.now().toString(),
            description: '',
            status: '',
        };
        form.setValue('activities', [...activities, newActivity]);
    };

    const removeActivity = (id: string) => {
        const activities = form.getValues('activities');
        form.setValue(
            'activities',
            activities.filter((activity) => activity.id !== id)
        );
    };

    const addOccurrence = () => {
        const occurrences = form.getValues('occurrences');
        const newOccurrence = {
            id: Date.now().toString(),
            description: '',
        };
        form.setValue('occurrences', [...occurrences, newOccurrence]);
    };

    const removeOccurrence = (id: string) => {
        const occurrences = form.getValues('occurrences');
        form.setValue(
            'occurrences',
            occurrences.filter((occurrence) => occurrence.id !== id)
        );
    };

    return {
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
    };
};
