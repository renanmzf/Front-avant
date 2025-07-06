'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from '../schemas/user-management-schema';
import { mockUsers, mockProjects } from '../data/mock-user-data';
import type { CreateUserData, User } from '../types/user-management';

const defaultValues: CreateUserData = {
    fullName: '',
    email: '',
    cpfCnpj: '',
    userType: 'CLIENTE',
    projectIds: [],
    canViewRDO: false,
    phone: '',
};

export const useUserManagement = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const form = useForm<CreateUserData>({
        resolver: zodResolver(createUserSchema),
        defaultValues,
    });

    const createUser = async (data: CreateUserData) => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const newUser: User = {
                id: Date.now().toString(),
                ...data,
                status: 'ATIVO',
                createdAt: new Date(),
            };

            setUsers((prev) => [newUser, ...prev]);
            form.reset();
            return { success: true, message: 'Usuário criado com sucesso!' };
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Erro ao criar usuário');
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteUser = async (id: string) => {
        setIsDeleting(id);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setUsers((prev) => prev.filter((user) => user.id !== id));
            return { success: true, message: 'Usuário excluído com sucesso!' };
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Erro ao excluir usuário');
        } finally {
            setIsDeleting(null);
        }
    };

    const toggleUserStatus = async (id: string) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === id
                        ? {
                              ...user,
                              status:
                                  user.status === 'ATIVO' ? 'INATIVO' : 'ATIVO',
                          }
                        : user
                )
            );
            return { success: true, message: 'Status alterado com sucesso!' };
        } catch (error) {
            console.error('Error toggling user status:', error);
            throw new Error('Erro ao alterar status');
        }
    };

    return {
        form,
        users,
        projects: mockProjects,
        isSubmitting,
        isDeleting,
        createUser,
        deleteUser,
        toggleUserStatus,
    };
};
