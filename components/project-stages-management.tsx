"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Save, Target } from "lucide-react"

interface ProjectStage {
  id: string
  name: string
  budgeted: number
  actual: number
  enabled: boolean
  progress: number
}

interface ProjectStagesManagementProps {
  projectId: string
  contractId?: string
  userType: "admin" | "client"
}

export function ProjectStagesManagement({ projectId, contractId, userType }: ProjectStagesManagementProps) {
  const [stages, setStages] = useState<ProjectStage[]>([
    {
      id: "1",
      name: "Fundação",
      budgeted: 25000,
      actual: 28500,
      enabled: true,
      progress: 100,
    },
    {
      id: "2",
      name: "Estrutura",
      budgeted: 45000,
      actual: 42300,
      enabled: true,
      progress: 85,
    },
    {
      id: "3",
      name: "Alvenaria",
      budgeted: 30000,
      actual: 18200,
      enabled: true,
      progress: 60,
    },
    {
      id: "4",
      name: "Cobertura",
      budgeted: 20000,
      actual: 0,
      enabled: true,
      progress: 0,
    },
    {
      id: "5",
      name: "Instalações",
      budgeted: 35000,
      actual: 0,
      enabled: true,
      progress: 0,
    },
    {
      id: "6",
      name: "Acabamento",
      budgeted: 40000,
      actual: 0,
      enabled: false,
      progress: 0,
    },
  ])

  const [editingStage, setEditingStage] = useState<string | null>(null)
  const [newStage, setNewStage] = useState({ name: "", budgeted: 0 })
  const [showAddForm, setShowAddForm] = useState(false)

  const updateStage = (id: string, field: keyof ProjectStage, value: any) => {
    setStages(stages.map((stage) => (stage.id === id ? { ...stage, [field]: value } : stage)))
  }

  const addNewStage = () => {
    if (newStage.name && newStage.budgeted > 0) {
      const newId = (stages.length + 1).toString()
      setStages([
        ...stages,
        {
          id: newId,
          name: newStage.name,
          budgeted: newStage.budgeted,
          actual: 0,
          enabled: true,
          progress: 0,
        },
      ])
      setNewStage({ name: "", budgeted: 0 })
      setShowAddForm(false)
    }
  }

  const calculateTotals = () => {
    const enabledStages = stages.filter((stage) => stage.enabled)
    return {
      totalBudgeted: enabledStages.reduce((sum, stage) => sum + stage.budgeted, 0),
      totalActual: enabledStages.reduce((sum, stage) => sum + stage.actual, 0),
      variance: enabledStages.reduce((sum, stage) => sum + (stage.actual - stage.budgeted), 0),
      completedStages: enabledStages.filter((stage) => stage.progress === 100).length,
      totalStages: enabledStages.length,
    }
  }

  const totals = calculateTotals()
  const variancePercentage = totals.totalBudgeted > 0 ? (totals.variance / totals.totalBudgeted) * 100 : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              Gestão de Etapas - Orçado vs Realizado
            </div>
            {userType === "admin" && (
              <Button onClick={() => setShowAddForm(true)} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Nova Etapa
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Controle orçamentário por etapas da obra
            {contractId && ` - Contrato #${contractId}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Resumo Geral */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-blue-700">Total Orçado</p>
                  <p className="text-xl font-bold text-blue-800">R$ {totals.totalBudgeted.toLocaleString("pt-BR")}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-green-700">Total Realizado</p>
                  <p className="text-xl font-bold text-green-800">R$ {totals.totalActual.toLocaleString("pt-BR")}</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`bg-gradient-to-br ${
                totals.variance >= 0
                  ? "from-red-50 to-red-100 border-red-200"
                  : "from-green-50 to-green-100 border-green-200"
              }`}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <p className={`text-sm font-medium ${totals.variance >= 0 ? "text-red-700" : "text-green-700"}`}>
                    Variação
                  </p>
                  <p className={`text-xl font-bold ${totals.variance >= 0 ? "text-red-800" : "text-green-800"}`}>
                    {totals.variance >= 0 ? "+" : ""}R$ {totals.variance.toLocaleString("pt-BR")}
                  </p>
                  <p className={`text-xs ${totals.variance >= 0 ? "text-red-600" : "text-green-600"}`}>
                    {variancePercentage >= 0 ? "+" : ""}
                    {variancePercentage.toFixed(1)}%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-purple-700">Progresso</p>
                  <p className="text-xl font-bold text-purple-800">
                    {totals.completedStages}/{totals.totalStages}
                  </p>
                  <p className="text-xs text-purple-600">etapas concluídas</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Nova Etapa */}
          {showAddForm && userType === "admin" && (
            <Card className="mb-6 bg-gray-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Nome da Etapa</Label>
                    <Input
                      value={newStage.name}
                      onChange={(e) => setNewStage({ ...newStage, name: e.target.value })}
                      placeholder="Ex: Pintura"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Valor Orçado (R$)</Label>
                    <Input
                      type="number"
                      value={newStage.budgeted}
                      onChange={(e) => setNewStage({ ...newStage, budgeted: Number.parseFloat(e.target.value) || 0 })}
                      placeholder="0,00"
                    />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <div className="flex space-x-2">
                      <Button onClick={addNewStage} size="sm">
                        <Save className="h-4 w-4 mr-1" />
                        Salvar
                      </Button>
                      <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Etapas */}
          <div className="space-y-4">
            {stages.map((stage) => (
              <Card key={stage.id} className={`${stage.enabled ? "bg-white" : "bg-gray-50 opacity-75"}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-lg">{stage.name}</h4>
                      <Badge
                        variant={stage.progress === 100 ? "default" : stage.progress > 0 ? "secondary" : "outline"}
                      >
                        {stage.progress}% concluído
                      </Badge>
                      {userType === "admin" && (
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm">Ativo:</Label>
                          <Switch
                            checked={stage.enabled}
                            onCheckedChange={(checked) => updateStage(stage.id, "enabled", checked)}
                          />
                        </div>
                      )}
                    </div>
                    {userType === "admin" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingStage(editingStage === stage.id ? null : stage.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    )}
                  </div>

                  {stage.enabled && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label>Orçado</Label>
                          {editingStage === stage.id && userType === "admin" ? (
                            <Input
                              type="number"
                              value={stage.budgeted}
                              onChange={(e) =>
                                updateStage(stage.id, "budgeted", Number.parseFloat(e.target.value) || 0)
                              }
                            />
                          ) : (
                            <div className="p-2 bg-blue-50 rounded text-blue-800 font-medium">
                              R$ {stage.budgeted.toLocaleString("pt-BR")}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Realizado</Label>
                          <div className="p-2 bg-green-50 rounded text-green-800 font-medium">
                            R$ {stage.actual.toLocaleString("pt-BR")}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Variação</Label>
                          <div
                            className={`p-2 rounded font-medium ${
                              stage.actual - stage.budgeted >= 0
                                ? "bg-red-50 text-red-800"
                                : "bg-green-50 text-green-800"
                            }`}
                          >
                            {stage.actual - stage.budgeted >= 0 ? "+" : ""}R${" "}
                            {(stage.actual - stage.budgeted).toLocaleString("pt-BR")}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Progresso da Etapa</Label>
                          <span className="text-sm text-gray-600">{stage.progress}%</span>
                        </div>
                        <Progress value={stage.progress} className="h-2" />
                      </div>

                      {editingStage === stage.id && userType === "admin" && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Progresso (%)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={stage.progress}
                                onChange={(e) =>
                                  updateStage(stage.id, "progress", Number.parseInt(e.target.value) || 0)
                                }
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button onClick={() => setEditingStage(null)} size="sm">
                              <Save className="h-4 w-4 mr-1" />
                              Salvar Alterações
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
