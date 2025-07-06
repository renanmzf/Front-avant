import * as z from 'zod';

export const createStageSchema = z.object({
    name: z.string().min(2, 'Nome da etapa é obrigatório'),
    description: z.string().min(5, 'Descrição é obrigatória'),
    plannedValue: z
        .number()
        .min(0.01, 'Valor planejado deve ser maior que zero'),
});

export const createExecutionSchema = z.object({
    stageId: z.string().min(1, 'Etapa é obrigatória'),
    description: z.string().min(2, 'Descrição é obrigatória'),
    value: z.number().min(0.01, 'Valor deve ser maior que zero'),
    date: z.string().min(1, 'Data é obrigatória'),
    category: z.enum(
        [
            'MATERIAL',
            'MAO_DE_OBRA',
            'EQUIPAMENTO',
            'SERVICO_TERCEIRO',
            'OUTROS',
        ],
        {
            required_error: 'Categoria é obrigatória',
        }
    ),
});
