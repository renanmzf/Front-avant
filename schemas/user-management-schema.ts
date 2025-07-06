import * as z from 'zod';

export const createUserSchema = z.object({
    fullName: z.string().min(2, 'Nome completo é obrigatório'),
    email: z.string().email('E-mail inválido'),
    cpfCnpj: z.string().min(11, 'CPF/CNPJ é obrigatório'),
    userType: z.enum(['CLIENTE', 'PRESTADOR', 'ADMINISTRADOR'], {
        required_error: 'Tipo de usuário é obrigatório',
    }),
    projectIds: z
        .array(z.string())
        .min(1, 'Pelo menos um projeto deve ser selecionado'),
    canViewRDO: z.boolean(),
    phone: z.string().optional(),
});
