'use client';

import { Shield, User, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserRoleIndicatorProps {
    email: string;
    className?: string;
}

export const UserRoleIndicator = ({
    email,
    className = '',
}: UserRoleIndicatorProps) => {
    const getUserRole = (email: string) => {
        const domain = email.split('@')[1]?.toLowerCase();

        if (domain === 'admin.com') {
            return {
                role: 'admin',
                label: 'Administrador',
                icon: Shield,
                color: 'bg-red-100 text-red-800',
            };
        } else if (domain === 'prestador.com') {
            return {
                role: 'prestador',
                label: 'Prestador',
                icon: Building,
                color: 'bg-blue-100 text-blue-800',
            };
        } else {
            return {
                role: 'cliente',
                label: 'Cliente',
                icon: User,
                color: 'bg-green-100 text-green-800',
            };
        }
    };

    if (!email || !email.includes('@')) {
        return null;
    }

    const { label, icon: Icon, color } = getUserRole(email);

    return (
        <Badge
            className={`${color} flex items-center gap-1 ${className}`}
            variant="secondary"
        >
            <Icon className="h-3 w-3" />
            {label}
        </Badge>
    );
};
