'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newProjectSchema } from '../schemas/new-project-schema';
import {
    mockClients,
    mockContractors,
    mockContracts,
} from '../data/mock-project-data';
import type { NewProjectData } from '../types/new-project';

const defaultValues: NewProjectData = {
    owner: '',
    address: '',
    openingDate: '',
    workType: 'RESIDENCIAL_UNIFAMILIAR',
    clientId: '',
    contractorId: '',
    contractIds: [],
};

export const useNewProject = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<NewProjectData>({
        resolver: zodResolver(newProjectSchema),
        defaultValues,
    });

    const selectedClientId = form.watch('clientId');
    const selectedContractorId = form.watch('contractorId');

    // Filter contracts based on selected client and contractor
    const availableContracts = useMemo(() => {
        return mockContracts.filter(
            (contract) =>
                (!selectedClientId || contract.clientId === selectedClientId) &&
                (!selectedContractorId ||
                    contract.contractorId === selectedContractorId)
        );
    }, [selectedClientId, selectedContractorId]);

    const onSubmit = async (data: NewProjectData) => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('New project data:', data);
            return { success: true, message: 'Projeto criado com sucesso!' };
        } catch (error) {
            console.error('Error creating project:', error);
            throw new Error('Erro ao criar projeto');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        isSubmitting,
        onSubmit,
        clients: mockClients,
        contractors: mockContractors,
        availableContracts,
    };
};
