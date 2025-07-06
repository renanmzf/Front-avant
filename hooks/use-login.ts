'use client';

import { useState } from 'react';
import { validateLoginForm, simulateLogin } from '../utils/login-validation';
import type { LoginFormData, LoginFormErrors } from '../types/login';

export const useLogin = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const updateField = (field: keyof LoginFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Clear field error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (
        onSuccess?: (
            data: LoginFormData,
            redirectPath: string,
            userRole: string
        ) => void
    ) => {
        // Validate form
        const validationErrors = validateLoginForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const result = await simulateLogin(formData);

            if (result.success && result.redirectPath && result.userRole) {
                onSuccess?.(formData, result.redirectPath, result.userRole);
                // alert(result.message);
            } else {
                setErrors({ general: result.message });
            }
        } catch (error) {
            setErrors({ general: 'Erro interno. Tente novamente.' });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        showPassword,
        updateField,
        togglePasswordVisibility,
        handleSubmit,
    };
};
