"use client"

import { useState } from "react"
import { Bell, X, MessageSquare, FileText, Camera, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface Notification {
  id: string
  type: "message" | "rdo" | "payment" | "financial" | "document" | "photo"
  title: string
  description: string
  time: string
  read: boolean
  icon: string
  redirectTo?: string
  projectId?: string
}

interface EnhancedNotificationBellProps {
  userType: "client" | "admin" | "prestador"
  onNavigate?: (path: string) => void
}

export function EnhancedNotificationBell({ userType, onNavigate }: EnhancedNotificationBellProps) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "Nova mensagem recebida",
      description: "João Silva enviou uma mensagem sobre o cronograma",
      time: "5 min atrás",
      read: false,
      icon: "💬",
      redirectTo: "/admin?tab=chat&project=1",
      projectId: "1",
    },
    {
      id: "2",
      type: "rdo",
      title: "Novo RDO publicado",
      description: "RDO #170 foi criado para Residência Alphaville",
      time: "2 horas atrás",
      read: false,
      icon: "📋",
      redirectTo: "/admin?tab=rdo&project=1",
      projectId: "1",
    },
    {
      id: "3",
      type: "payment",
      title: "Pagamento processado",
      description: "Pagamento de R$ 15.000 foi registrado",
      time: "1 dia atrás",
      read: false,
      icon: "💰",
      redirectTo: "/admin?tab=financeiro&project=1",
      projectId: "1",
    },
    {
      id: "4",
      type: "document",
      title: "Novo documento adicionado",
      description: "Contrato atualizado foi enviado",
      time: "2 dias atrás",
      read: true,
      icon: "📄",
      redirectTo: "/admin?tab=documents&project=1",
      projectId: "1",
    },
    {
      id: "5",
      type: "photo",
      title: "Novas fotos adicionadas",
      description: "5 fotos do progresso da obra foram enviadas",
      time: "3 dias atrás",
      read: true,
      icon: "📸",
      redirectTo: "/admin?tab=photos&project=1",
      projectId: "1",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)

    if (notification.redirectTo) {
      if (onNavigate) {
        onNavigate(notification.redirectTo)
      } else {
        // Parse the redirect URL to extract tab and project
        const url = new URL(notification.redirectTo, window.location.origin)
        const tab = url.searchParams.get("tab")
        const project = url.searchParams.get("project")

        // Navigate based on user type
        if (userType === "admin") {
          let adminPath = "/admin"
          if (tab) adminPath += `?tab=${tab}`
          if (project) adminPath += `${tab ? "&" : "?"}project=${project}`
          router.push(adminPath)
        } else if (userType === "client") {
          let clientPath = "/cliente"
          if (tab) clientPath += `?tab=${tab}`
          if (project) clientPath += `${tab ? "&" : "?"}project=${project}`
          router.push(clientPath)
        } else if (userType === "prestador") {
          router.push("/prestador")
        }
      }
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "rdo":
        return <Calendar className="h-4 w-4 text-green-600" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-orange-600" />
      case "document":
        return <FileText className="h-4 w-4 text-purple-600" />
      case "photo":
        return <Camera className="h-4 w-4 text-pink-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  if (unreadCount === 0) {
    return null // Não mostra o sino se não há notificações não lidas
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notificações</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-sm">{notification.title}</p>
                        {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      {notification.projectId && (
                        <Badge variant="outline" className="text-xs mt-1">
                          Projeto {notification.projectId}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeNotification(notification.id)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
