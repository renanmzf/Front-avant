"use client"

import { ContractsFinancialManagement } from "@/components/contracts-financial-management"

export default function ContractsDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Contratos</h1>
          <p className="text-gray-600 mt-2">
            Sistema completo de gestão financeira de contratos com clientes e fornecedores
          </p>
        </div>

        <ContractsFinancialManagement userType="admin" />
      </div>
    </div>
  )
}
