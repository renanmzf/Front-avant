'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { constructionFormSchema } from '../schemas/construction-form-schema';
import type { FormData } from '../types/construction-form';

const defaultValues: FormData = {
    contractorName: '',
    contractorCpfCnpj: '',
    contractorPhone: '',
    contractorAddress: '',
    contractorEmail: '',
    technicalResponsible: '',
    technicalDoc: '',
    technicalNumber: '',
    clientName: '',
    clientCpfCnpj: '',
    contractNumber: '',
    workDescription: '',
    workLocation: '',
    workStartDate: '',
    workDeadlineDays: '',
    workEndDate: '',
    workResponsible: '',
    workResponsibleDoc: '',
    workResponsibleNumber: '',
};

export const useConstructionForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(constructionFormSchema),
        defaultValues,
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Form data:', data);
            return {
                success: true,
                message: 'Formulário enviado com sucesso!',
            };
        } catch (error) {
            console.error('Error submitting form:', error);
            throw new Error('Erro ao enviar formulário');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        isSubmitting,
        onSubmit,
    };
};
