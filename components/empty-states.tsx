"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ImageIcon, DollarSign, Users, Calendar, Building2, Search, AlertCircle } from "lucide-react"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "secondary"
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <Card className={className}>
      <CardContent className="p-8 text-center">
        <div className="mx-auto mb-4 text-gray-400">{icon}</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 max-w-md mx-auto">{description}</p>
        {action && (
          <Button onClick={action.onClick} variant={action.variant || "default"} className="mx-auto">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function PaymentsEmptyState({ onAddPayment }: { onAddPayment?: () => void }) {
  return (
    <EmptyState
      icon={<DollarSign className="h-12 w-12" />}
      title="Nenhum pagamento encontrado"
      description="Ainda não há pagamentos registrados para este projeto. Comece adicionando o primeiro pagamento."
      action={
        onAddPayment
          ? {
              label: "Adicionar Pagamento",
              onClick: onAddPayment,
            }
          : undefined
      }
    />
  )
}

export function PhotosEmptyState({ onUploadPhoto }: { onUploadPhoto?: () => void }) {
  return (
    <EmptyState
      icon={<ImageIcon className="h-12 w-12" />}
      title="Nenhuma foto encontrada"
      description="Ainda não há fotos neste projeto. Faça upload das primeiras fotos para documentar o progresso da obra."
      action={
        onUploadPhoto
          ? {
              label: "Fazer Upload",
              onClick: onUploadPhoto,
            }
          : undefined
      }
    />
  )
}

export function MeetingMinutesEmptyState({ onCreateMeeting }: { onCreateMeeting?: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="h-12 w-12" />}
      title="Nenhuma ata de reunião"
      description="Ainda não há atas de reunião cadastradas. Crie a primeira ata para documentar as decisões do projeto."
      action={
        onCreateMeeting
          ? {
              label: "Nova Ata de Reunião",
              onClick: onCreateMeeting,
            }
          : undefined
      }
    />
  )
}

export function ContractsEmptyState({ onCreateContract }: { onCreateContract?: () => void }) {
  return (
    <EmptyState
      icon={<Building2 className="h-12 w-12" />}
      title="Nenhum contrato encontrado"
      description="Ainda não há contratos cadastrados. Adicione o primeiro contrato para começar a gerenciar os prestadores de serviço."
      action={
        onCreateContract
          ? {
              label: "Novo Contrato",
              onClick: onCreateContract,
            }
          : undefined
      }
    />
  )
}

export function MeasurementsEmptyState({ onAddMeasurement }: { onAddMeasurement?: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="h-12 w-12" />}
      title="Nenhuma medição encontrada"
      description="Ainda não há medições registradas para este contrato. Adicione a primeira medição para acompanhar o progresso dos serviços."
      action={
        onAddMeasurement
          ? {
              label: "Nova Medição",
              onClick: onAddMeasurement,
            }
          : undefined
      }
    />
  )
}

export function UsersEmptyState({ onCreateUser }: { onCreateUser?: () => void }) {
  return (
    <EmptyState
      icon={<Users className="h-12 w-12" />}
      title="Nenhum usuário encontrado"
      description="Ainda não há usuários cadastrados no sistema. Adicione o primeiro usuário para começar a gerenciar acessos."
      action={
        onCreateUser
          ? {
              label: "Criar Usuário",
              onClick: onCreateUser,
            }
          : undefined
      }
    />
  )
}

export function ProjectsEmptyState({ onCreateProject }: { onCreateProject?: () => void }) {
  return (
    <EmptyState
      icon={<Building2 className="h-12 w-12" />}
      title="Nenhum projeto encontrado"
      description="Ainda não há projetos cadastrados. Crie o primeiro projeto para começar a gerenciar suas obras."
      action={
        onCreateProject
          ? {
              label: "Novo Projeto",
              onClick: onCreateProject,
            }
          : undefined
      }
    />
  )
}

export function DocumentsEmptyState({ onUploadDocument }: { onUploadDocument?: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="h-12 w-12" />}
      title="Nenhum documento encontrado"
      description="Ainda não há documentos neste projeto. Faça upload dos primeiros documentos para organizar a documentação da obra."
      action={
        onUploadDocument
          ? {
              label: "Fazer Upload",
              onClick: onUploadDocument,
            }
          : undefined
      }
    />
  )
}

export function SearchEmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <EmptyState
      icon={<Search className="h-12 w-12" />}
      title="Nenhum resultado encontrado"
      description={`Não encontramos resultados para "${searchTerm}". Tente ajustar os filtros ou usar termos diferentes.`}
    />
  )
}

export function FilterEmptyState({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      icon={<AlertCircle className="h-12 w-12" />}
      title="Nenhum item corresponde aos filtros"
      description="Não há itens que correspondam aos filtros selecionados. Tente ajustar ou limpar os filtros para ver mais resultados."
      action={
        onClearFilters
          ? {
              label: "Limpar Filtros",
              onClick: onClearFilters,
              variant: "outline",
            }
          : undefined
      }
    />
  )
}

export function ErrorEmptyState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      icon={<AlertCircle className="h-12 w-12" />}
      title="Erro ao carregar dados"
      description="Ocorreu um erro ao carregar os dados. Verifique sua conexão e tente novamente."
      action={
        onRetry
          ? {
              label: "Tentar Novamente",
              onClick: onRetry,
              variant: "outline",
            }
          : undefined
      }
    />
  )
}

export function HistoryLogsEmptyState() {
  return (
    <EmptyState
      icon={<Calendar className="h-12 w-12" />}
      title="Nenhuma atividade registrada"
      description="Ainda não há atividades registradas no sistema. As ações dos usuários aparecerão aqui conforme forem realizadas."
    />
  )
}
