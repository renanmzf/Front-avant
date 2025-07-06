'use client';

import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { LoginForm } from './login-form';
import type { LoginFormData } from '../types/login';
import { useRouter } from 'next/navigation';

export const LoginScreen = () => {
    const router = useRouter();

    const handleLogin = (
        data: LoginFormData,
        redirectPath: string,
        userRole: string
    ) => {
        router.push(redirectPath);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center">
                    <div className="inline-block">
                        <Image
                            src="/images/1-logotipo-avant-garde.png"
                            alt="Avant Garde"
                            width={200}
                            height={100}
                            className=""
                            priority
                        />
                    </div>
                </div>

                {/* Login Card */}
                <Card className="shadow-lg border-0">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Bem-vindo
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Faça login para acessar sua conta
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-6">
                        <LoginForm onLogin={handleLogin} />
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        © 2024 Avant Garde. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
};
