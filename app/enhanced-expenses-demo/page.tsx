"use client"

import { EnhancedExpensesManagement } from "@/components/enhanced-expenses-management"

export default function EnhancedExpensesDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Lançamentos Detalhados</h1>
          <p className="text-gray-600 mt-2">
            Gestão completa de despesas com estrutura hierárquica de etapas da construção civil
          </p>
        </div>

        <EnhancedExpensesManagement projectId="1" projectName="Residência Alphaville" userType="admin" />
      </div>
    </div>
  )
}
