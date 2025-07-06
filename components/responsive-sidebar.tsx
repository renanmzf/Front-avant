"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  DollarSign,
  FileText,
  Users,
  Building2,
  ImageIcon,
  MessageSquare,
  Calendar,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  Home,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: string
  active?: boolean
}

interface ResponsiveSidebarProps {
  userType: "admin" | "client" | "prestador"
  activeTab: string
  onTabChange: (tab: string) => void
  onExit: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
}

export function ResponsiveSidebar({
  userType,
  activeTab,
  onTabChange,
  onExit,
  isCollapsed = false,
  onToggleCollapse,
  className = "",
}: ResponsiveSidebarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getMenuItems = (): SidebarItem[] => {
    const commonItems: SidebarItem[] = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home className="h-5 w-5" />,
      },
    ]

    if (userType === "admin") {
      return [
        ...commonItems,
        {
          id: "financeiro",
          label: "Financeiro",
          icon: <DollarSign className="h-5 w-5" />,
        },
        {
          id: "contracts",
          label: "Contratos",
          icon: <Building2 className="h-5 w-5" />,
        },
        {
          id: "users",
          label: "Usuários",
          icon: <Users className="h-5 w-5" />,
        },
        {
          id: "expenses",
          label: "Lançamentos",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          id: "photos",
          label: "Fotos",
          icon: <ImageIcon className="h-5 w-5" />,
        },
        {
          id: "documents",
          label: "Documentos",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          id: "rdo",
          label: "RDO",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          id: "chat",
          label: "Chat",
          icon: <MessageSquare className="h-5 w-5" />,
          badge: "3",
        },
        {
          id: "reports",
          label: "Relatórios",
          icon: <BarChart3 className="h-5 w-5" />,
        },
        {
          id: "meeting-minutes",
          label: "Atas",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          id: "history",
          label: "Histórico",
          icon: <Activity className="h-5 w-5" />,
        },
      ]
    }

    if (userType === "client") {
      return [
        ...commonItems,
        {
          id: "financeiro",
          label: "Financeiro",
          icon: <DollarSign className="h-5 w-5" />,
        },
        {
          id: "photos",
          label: "Fotos",
          icon: <ImageIcon className="h-5 w-5" />,
        },
        {
          id: "documents",
          label: "Documentos",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          id: "chat",
          label: "Chat",
          icon: <MessageSquare className="h-5 w-5" />,
          badge: "1",
        },
        {
          id: "meeting-minutes",
          label: "Atas",
          icon: <FileText className="h-5 w-5" />,
        },
      ]
    }

    if (userType === "prestador") {
      return [
        ...commonItems,
        {
          id: "contracts",
          label: "Contratos",
          icon: <Building2 className="h-5 w-5" />,
        },
        {
          id: "measurements",
          label: "Medições",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          id: "photos",
          label: "Fotos",
          icon: <ImageIcon className="h-5 w-5" />,
        },
        {
          id: "documents",
          label: "Documentos",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          id: "chat",
          label: "Chat",
          icon: <MessageSquare className="h-5 w-5" />,
        },
      ]
    }

    return commonItems
  }

  const menuItems = getMenuItems()

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {menuItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg transition-colors relative",
                activeTab === item.id
                  ? "text-gray-900 bg-gray-100"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
              )}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{isCollapsed ? "" : item.label}</span>
              {item.badge && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}

          {/* More menu for additional items */}
          {menuItems.length > 5 && (
            <button
              onClick={() => {
                /* Open more menu */
              }}
              className="flex flex-col items-center p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Menu className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">Mais</span>
            </button>
          )}
        </div>
      </div>
    )
  }

  // Desktop Sidebar
  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Avant Garde</h2>
              <p className="text-sm text-gray-600 capitalize">{userType}</p>
            </div>
          )}

          {onToggleCollapse && (
            <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="p-2">
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors relative",
                activeTab === item.id
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="ml-3 flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}

              {isCollapsed && item.badge && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Separator className="mb-4" />

        <div className="space-y-2">
          <button
            className={cn(
              "w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50",
            )}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Configurações</span>}
          </button>

          <button
            onClick={onExit}
            className={cn(
              "w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors text-red-600 hover:text-red-700 hover:bg-red-50",
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Sair</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
