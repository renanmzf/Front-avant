import { ClientDashboardSummary } from "@/components/client-dashboard-summary"

export default function ClientSummaryPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard do Cliente</h1>
        <p className="text-gray-600 mt-2">Acompanhe o progresso da sua obra em tempo real</p>
      </div>

      <ClientDashboardSummary projectId="project-001" projectName="Residência Alphaville" />
    </div>
  )
}
