"use client"

import { ProviderContractsView } from "@/components/provider-contracts-view"

export default function ProviderContractsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contratos do Prestador</h1>
          <p className="text-gray-600">
            Demonstração da visualização expandível de contratos para prestadores de serviço
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admin View */}
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Visão do Administrador</h2>
              <p className="text-sm text-blue-700">
                Como administrador, você pode adicionar novas medições e gerenciar todos os contratos.
              </p>
            </div>
            <ProviderContractsView userType="admin" providerId="provider1" />
          </div>

          {/* Provider View */}
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">Visão do Prestador</h2>
              <p className="text-sm text-green-700">
                Como prestador, você pode visualizar seus contratos e medições, mas não pode adicionar novas medições.
              </p>
            </div>
            <ProviderContractsView userType="provider" providerId="provider1" />
          </div>
        </div>
      </div>
    </div>
  )
}
