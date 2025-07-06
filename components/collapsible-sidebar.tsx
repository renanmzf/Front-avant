"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  BarChart3,
  FileText,
  Camera,
  DollarSign,
  Calendar,
  MessageSquare,
  Upload,
  ArrowLeft,
  Menu,
  GanttChart,
  ChevronLeft,
  Hammer,
  UserPlus,
} from "lucide-react"
import { EnhancedNotificationBell } from "@/components/ui/enhanced-notification-bell"

interface CollapsibleSidebarProps {
  userType: "admin" | "client" | "contractor"
  activeTab: string
  onTabChange: (tab: string) => void
  onExit: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function CollapsibleSidebar({
  userType,
  activeTab,
  onTabChange,
  onExit,
  isCollapsed,
  onToggleCollapse,
}: CollapsibleSidebarProps) {
  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard Geral", icon: BarChart3 },
    { id: "users", label: "Cadastros", icon: UserPlus },
    { id: "project", label: "Criar projeto", icon: Hammer  },
    { id: "contracts", label: "Contratos", icon: FileText },
    { id: "expenses", label: "Lançamentos", icon: DollarSign },
    { id: "documents", label: "Documentos", icon: Upload },
    { id: "photos", label: "Fotos", icon: Camera },
    { id: "rdo", label: "RDO", icon: Calendar },
    { id: "chat", label: "Chat Cliente", icon: MessageSquare, hasNotification: false },
    { id: "meeting-minutes", label: "Atas de Reunião", icon: FileText },
  ]

  const clientMenuItems = [
    { id: "projetos", label: "Dashboard", icon: Building2 },
    { id: "financeiro", label: "Resumo Financeiro", icon: DollarSign },
    { id: "planning", label: "Planejamento", icon: GanttChart   },
    { id: "rdo", label: "RDOs", icon: Calendar },
    { id: "fotos", label: "Galeria de Fotos", icon: Camera },
    { id: "dados-obra", label: "Dados da Obra", icon: Building2 },
    { id: "documents", label: "Documentos", icon: FileText },
    { id: "contratos", label: "Contratos", icon: FileText },
    { id: "atas", label: "Atas de Reunião", icon: FileText },
    { id: "chat", label: "Fale Conosco", icon: MessageSquare },
  ]

  const menuItems = userType === "admin" ? adminMenuItems : clientMenuItems

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} bg-white shadow-lg h-screen fixed left-0 top-0 transition-all duration-300 z-50`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <div className="flex items-center">
              <img src="/placeholder.svg?height=32&width=32" alt="Avant Garde Logo" className="h-8 w-8 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Avant Garde</h1>
                <p className="text-sm text-gray-600 capitalize">{userType === "admin" ? "Administrador" : "Cliente"}</p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            {!isCollapsed && <EnhancedNotificationBell userType="client" />}
            <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="p-2">
              {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`${isCollapsed ? "w-12 h-12 p-0" : "w-full"} justify-start relative`}
                onClick={() => onTabChange(item.id)}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-2"}`} />
                {!isCollapsed && item.label}
                {!isCollapsed && item.hasNotification && userType === "admin" && (
                  <EnhancedNotificationBell userType="admin" />
                )}
              </Button>
            )
          })}
        </nav>

        <Separator className="my-6" />

        {/* Exit Button */}
        <Button
          variant="ghost"
          className={`${isCollapsed ? "w-12 h-12 p-0" : "w-full"} justify-start`}
          onClick={onExit}
          title={isCollapsed ? "Sair" : undefined}
        >
          <ArrowLeft className={`h-4 w-4 ${isCollapsed ? "" : "mr-2"}`} />
          {!isCollapsed && "Sair"}
        </Button>
      </div>
    </div>
  )
}
