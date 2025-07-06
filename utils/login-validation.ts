import type { LoginFormData, LoginFormErrors } from '../types/login';

export const validateEmail = (email: string): string | undefined => {
    if (!email) {
        return 'E-mail é obrigatório';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'E-mail inválido';
    }

    return undefined;
};

export const validatePassword = (password: string): string | undefined => {
    if (!password) {
        return 'Senha é obrigatória';
    }

    if (password.length < 6) {
        return 'Senha deve ter pelo menos 6 caracteres';
    }

    return undefined;
};

export const validateLoginForm = (data: LoginFormData): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    const emailError = validateEmail(data.email);
    if (emailError) {
        errors.email = emailError;
    }

    const passwordError = validatePassword(data.password);
    if (passwordError) {
        errors.password = passwordError;
    }

    return errors;
};

export const getUserRoleFromEmail = (
    email: string
): 'admin' | 'prestador' | 'cliente' => {
    const domain = email.split('@')[1]?.toLowerCase();

    if (domain === 'admin.com') {
        return 'admin';
    } else if (domain === 'prestador.com') {
        return 'prestador';
    } else {
        return 'cliente';
    }
};

export const getRedirectPath = (email: string): string => {
    const role = getUserRoleFromEmail(email);
    return `/${role}`;
};

export const simulateLogin = async (
    data: LoginFormData
): Promise<{
    success: boolean;
    message: string;
    redirectPath?: string;
    userRole?: string;
}> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Get user role from email
    const userRole = getUserRoleFromEmail(data.email);
    const redirectPath = getRedirectPath(data.email);

    // Mock authentication logic - accept any password for demo
    if (data.password.length >= 6) {
        return {
            success: true,
            message: `Login realizado com sucesso! Redirecionando para ${userRole}...`,
            redirectPath,
            userRole,
        };
    }

    return {
        success: false,
        message: 'Senha deve ter pelo menos 6 caracteres',
    };
};
