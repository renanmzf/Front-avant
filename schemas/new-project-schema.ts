import * as z from 'zod';

export const newProjectSchema = z.object({
    owner: z.string().min(2, 'Nome do proprietário é obrigatório'),
    address: z.string().min(10, 'Endereço completo é obrigatório'),
    openingDate: z.string().min(1, 'Data de abertura é obrigatória'),
    workType: z.enum(
        [
            'RESIDENCIAL_UNIFAMILIAR',
            'RESIDENCIAL_MULTIFAMILIAR',
            'COMERCIAL',
            'MISTO',
        ],
        {
            required_error: 'Tipo de obra é obrigatório',
        }
    ),
    clientId: z.string().min(1, 'Cliente é obrigatório'),
    contractorId: z.string().min(1, 'Prestador de serviço é obrigatório'),
    contractIds: z
        .array(z.string())
        .min(1, 'Pelo menos um contrato deve ser selecionado'),
});
