"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, DollarSign, Calendar, Camera, Building, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface ClientDashboardSummaryProps {
  projectId: string
  projectName?: string
}

export function ClientDashboardSummary({
  projectId,
  projectName = "Residência Alphaville",
}: ClientDashboardSummaryProps) {
  // Mock data - in production this would come from props or API
  const projectData = {
    progress: 68,
    totalPaid: 187500,
    balanceDue: 62500,
    totalBudget: 250000,
    lastRdoDate: "2024-06-18",
    photosUploaded: 142,
    currentPhase: "Cobertura",
    nextMilestone: "Instalações Elétricas",
    estimatedCompletion: "2024-08-15",
  }

  // Progress vs Financials chart data
  const progressFinancialData = [
    { month: "Jan", progress: 15, financial: 12, planned: 15 },
    { month: "Fev", progress: 28, financial: 25, planned: 30 },
    { month: "Mar", progress: 42, financial: 38, planned: 45 },
    { month: "Abr", progress: 55, financial: 52, planned: 60 },
    { month: "Mai", progress: 68, financial: 65, planned: 75 },
    { month: "Jun", progress: 68, financial: 75, planned: 90 },
  ]

  const getProgressStatus = (progress: number) => {
    if (progress >= 75) return { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle }
    if (progress >= 50) return { color: "text-blue-600", bg: "bg-blue-50", icon: Clock }
    return { color: "text-orange-600", bg: "bg-orange-50", icon: AlertCircle }
  }

  const progressStatus = getProgressStatus(projectData.progress)
  const ProgressIcon = progressStatus.icon

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const daysSinceLastRdo = Math.floor(
    (new Date().getTime() - new Date(projectData.lastRdoDate).getTime()) / (1000 * 3600 * 24),
  )

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{projectName}</h2>
            <p className="text-blue-100">Fase atual: {projectData.currentPhase}</p>
            <p className="text-blue-100 text-sm">Próxima etapa: {projectData.nextMilestone}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{projectData.progress}%</div>
            <p className="text-blue-100 text-sm">Concluído</p>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={projectData.progress} className="h-2 bg-blue-500" />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Project Progress Card */}
        <Card className={`${progressStatus.bg} border-l-4 border-l-blue-500`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Progresso da Obra</p>
                <p className="text-2xl font-bold text-gray-900">{projectData.progress}%</p>
                <p className="text-xs text-gray-500 mt-1">Meta: 75% (Jun)</p>
              </div>
              <div className={`p-2 rounded-full ${progressStatus.bg}`}>
                <ProgressIcon className={`h-6 w-6 ${progressStatus.color}`} />
              </div>
            </div>
            <div className="mt-3">
              <Progress value={projectData.progress} className="h-1" />
            </div>
          </CardContent>
        </Card>

        {/* Total Paid Card */}
        <Card className="bg-green-50 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pago</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(projectData.totalPaid)}</p>
                <p className="text-xs text-green-600 mt-1">
                  {((projectData.totalPaid / projectData.totalBudget) * 100).toFixed(1)}% do orçamento
                </p>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Due Card */}
        <Card className="bg-orange-50 border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saldo a Pagar</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(projectData.balanceDue)}</p>
                <p className="text-xs text-orange-600 mt-1">
                  {((projectData.balanceDue / projectData.totalBudget) * 100).toFixed(1)}% restante
                </p>
              </div>
              <div className="p-2 rounded-full bg-orange-100">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last RDO Date Card */}
        <Card className="bg-purple-50 border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Último RDO</p>
                <p className="text-lg font-bold text-gray-900">{formatDate(projectData.lastRdoDate)}</p>
                <p className="text-xs text-purple-600 mt-1">
                  {daysSinceLastRdo === 0 ? "Hoje" : `${daysSinceLastRdo} dias atrás`}
                </p>
              </div>
              <div className="p-2 rounded-full bg-purple-100">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Photos Uploaded */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Camera className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Fotos Enviadas</p>
                <p className="text-xl font-bold text-gray-900">{projectData.photosUploaded}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Phase */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-green-100">
                <Building className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Fase Atual</p>
                <Badge variant="secondary" className="mt-1">
                  {projectData.currentPhase}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estimated Completion */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-orange-100">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Previsão de Entrega</p>
                <p className="text-sm font-bold text-gray-900">{formatDate(projectData.estimatedCompletion)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress vs Financials Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Progresso vs. Financeiro
          </CardTitle>
          <CardDescription>Comparativo entre evolução física da obra e desembolso financeiro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Progresso Físico</p>
              <p className="text-lg font-bold text-blue-600">{projectData.progress}%</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Progresso Financeiro</p>
              <p className="text-lg font-bold text-green-600">75%</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">Planejado</p>
              <p className="text-lg font-bold text-orange-600">90%</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Eficiência</p>
              <p className="text-lg font-bold text-purple-600">91%</p>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressFinancialData}>
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="financialGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value}%`,
                    name === "progress"
                      ? "Progresso Físico"
                      : name === "financial"
                        ? "Progresso Financeiro"
                        : "Planejado",
                  ]}
                  labelFormatter={(label) => `Mês: ${label}`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="planned"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="none"
                  name="planned"
                />
                <Area
                  type="monotone"
                  dataKey="progress"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#progressGradient)"
                  name="progress"
                />
                <Area
                  type="monotone"
                  dataKey="financial"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#financialGradient)"
                  name="financial"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span>Progresso Físico</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span>Progresso Financeiro</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-1 bg-orange-500 rounded mr-2"></div>
              <span>Planejado</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
