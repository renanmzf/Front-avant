export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginProps {
    onLogin?: (
        data: LoginFormData,
        redirectPath: string,
        userRole: string
    ) => void;
    className?: string;
}

export interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;
}
