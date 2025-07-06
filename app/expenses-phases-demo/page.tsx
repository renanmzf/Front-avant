"use client"

import { ExpensesByPhases } from "@/components/expenses-by-phases"

export default function ExpensesPhasesDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lançamentos por Etapas</h1>
          <p className="text-gray-600 mt-2">Análise detalhada dos gastos organizados por fases da construção</p>
        </div>

        <ExpensesByPhases projectId="1" projectName="Residência Alphaville" />
      </div>
    </div>
  )
}
