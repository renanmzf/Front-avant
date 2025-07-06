import { FinancialDataTable } from "@/components/financial-data-table"

export default function FinancialTablePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tabela de Dados Financeiros</h1>
        <p className="text-gray-600 mt-2">
          Visualize e filtre dados financeiros com funcionalidades avançadas de busca e ordenação.
        </p>
      </div>
      <FinancialDataTable />
    </div>
  )
}
