'use client';

import { CreateUserForm } from './create-user-form';
import { UsersList } from './users-list';
import { useUserManagement } from '../hooks/use-user-management';

export default function UserManagement() {
    const {
        form,
        users,
        projects,
        isSubmitting,
        isDeleting,
        createUser,
        deleteUser,
        toggleUserStatus,
    } = useUserManagement();

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Gerenciar Usuários
                </h1>
                <p className="text-gray-600">
                    Cadastre e gerencie clientes, prestadores e administradores
                    do sistema
                </p>
            </div>

            <div className="space-y-8">
                <CreateUserForm
                    form={form}
                    projects={projects}
                    isSubmitting={isSubmitting}
                    onSubmit={createUser}
                />

                <UsersList
                    users={users}
                    projects={projects}
                    isDeleting={isDeleting}
                    onDeleteUser={deleteUser}
                    onToggleStatus={toggleUserStatus}
                />
            </div>
        </div>
    );
}
