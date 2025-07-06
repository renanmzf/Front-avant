"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  X,
  MessageSquare,
  FileText,
  DollarSign,
  Calendar,
  Users,
  Eye,
  BookMarkedIcon as MarkAsRead,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Notification {
  id: string
  type: "chat" | "rdo" | "financial" | "meeting" | "document" | "photo"
  title: string
  description: string
  timestamp: string
  read: boolean
  projectId: string
  projectName: string
  redirectTo: string
  metadata?: {
    senderId?: string
    senderName?: string
    senderAvatar?: string
    amount?: number
    rdoNumber?: number
    meetingId?: string
    documentName?: string
    photoCount?: number
  }
}

interface NotificationBellProps {
  userType: "admin" | "client" | "provider"
  userId: string
  className?: string
}

export function NotificationBell({ userType, userId, className = "" }: NotificationBellProps) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  // Mock notifications data - in real app, this would come from API
  const mockNotifications: Notification[] = [
    {
      id: "1",
      type: "chat",
      title: "Nova mensagem recebida",
      description: "João Silva enviou uma mensagem sobre o cronograma da obra",
      timestamp: "2024-03-20T10:30:00Z",
      read: false,
      projectId: "1",
      projectName: "Residência Alphaville",
      redirectTo: "/admin?tab=chat&project=1",
      metadata: {
        senderId: "client1",
        senderName: "João Silva",
        senderAvatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "2",
      type: "rdo",
      title: "Novo RDO publicado",
      description: "RDO #171 foi criado para Residência Alphaville",
      timestamp: "2024-03-20T08:15:00Z",
      read: false,
      projectId: "1",
      projectName: "Residência Alphaville",
      redirectTo: "/admin?tab=rdo&project=1",
      metadata: {
        rdoNumber: 171,
        senderName: "Eng. Carlos Silva",
      },
    },
    {
      id: "3",
      type: "financial",
      title: "Novo lançamento financeiro",
      description: "Pagamento de R$ 8.500 foi registrado para materiais",
      timestamp: "2024-03-20T07:45:00Z",
      read: false,
      projectId: "1",
      projectName: "Residência Alphaville",
      redirectTo: "/admin?tab=expenses&project=1",
      metadata: {
        amount: 8500,
        senderName: "Administrador",
      },
    },
    {
      id: "4",
      type: "meeting",
      title: "Nova ata de reunião",
      description: "Ata da reunião de acompanhamento foi publicada",
      timestamp: "2024-03-19T16:20:00Z",
      read: false,
      projectId: "1",
      projectName: "Residência Alphaville",
      redirectTo: "/admin?tab=meeting-minutes&project=1",
      metadata: {
        meetingId: "meeting-4",
        senderName: "Eng. Carlos Silva",
      },
    },
    {
      id: "5",
      type: "chat",
      title: "Mensagem de Maria Santos",
      description: "Cliente enviou dúvidas sobre o acabamento",
      timestamp: "2024-03-19T14:10:00Z",
      read: true,
      projectId: "2",
      projectName: "Reforma Centro",
      redirectTo: "/admin?tab=chat&project=2",
      metadata: {
        senderId: "client2",
        senderName: "Maria Santos",
        senderAvatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "6",
      type: "financial",
      title: "Pagamento processado",
      description: "Pagamento de R$ 15.000 foi aprovado",
      timestamp: "2024-03-19T11:30:00Z",
      read: true,
      projectId: "2",
      projectName: "Reforma Centro",
      redirectTo: "/admin?tab=financeiro&project=2",
      metadata: {
        amount: 15000,
        senderName: "Sistema",
      },
    },
    {
      id: "7",
      type: "document",
      title: "Novo documento enviado",
      description: "Contrato atualizado foi adicionado ao projeto",
      timestamp: "2024-03-18T15:45:00Z",
      read: true,
      projectId: "1",
      projectName: "Residência Alphaville",
      redirectTo: "/admin?tab=documents&project=1",
      metadata: {
        documentName: "Contrato_Atualizado_v2.pdf",
        senderName: "João Silva",
      },
    },
    {
      id: "8",
      type: "photo",
      title: "Novas fotos adicionadas",
      description: "12 fotos do progresso da estrutura foram enviadas",
      timestamp: "2024-03-18T13:20:00Z",
      read: true,
      projectId: "1",
      projectName: "Residência Alphaville",
      redirectTo: "/admin?tab=photos&project=1",
      metadata: {
        photoCount: 12,
        senderName: "João Silva Construções",
      },
    },
  ]

  useEffect(() => {
    // Simulate API call to fetch notifications
    const fetchNotifications = async () => {
      setLoading(true)
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Filter notifications based on user type and permissions
        let filteredNotifications = mockNotifications

        // In real app, you would filter based on user permissions and projects
        if (userType === "client") {
          // Clients see notifications for their projects only
          filteredNotifications = mockNotifications.filter(
            (n) => n.type !== "rdo" || n.projectId === "1", // Example: client only sees RDOs for their project
          )
        } else if (userType === "provider") {
          // Providers see notifications related to their contracts
          filteredNotifications = mockNotifications.filter(
            (n) => n.type === "chat" || n.type === "meeting" || n.type === "document",
          )
        }

        // Sort by timestamp (newest first)
        filteredNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

        setNotifications(filteredNotifications)
      } catch (error) {
        console.error("Error fetching notifications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()

    // Set up polling for new notifications (every 30 seconds)
    const interval = setInterval(fetchNotifications, 30000)

    return () => clearInterval(interval)
  }, [userType, userId])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    setIsOpen(false)

    // Navigate to the appropriate page based on user type and notification
    let targetPath = notification.redirectTo

    // Adjust path based on user type
    if (userType === "client") {
      targetPath = targetPath.replace("/admin", "/cliente")
    } else if (userType === "provider") {
      targetPath = targetPath.replace("/admin", "/prestador")
    }

    router.push(targetPath)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "rdo":
        return <Calendar className="h-4 w-4 text-green-600" />
      case "financial":
        return <DollarSign className="h-4 w-4 text-orange-600" />
      case "meeting":
        return <Users className="h-4 w-4 text-purple-600" />
      case "document":
        return <FileText className="h-4 w-4 text-indigo-600" />
      case "photo":
        return <Eye className="h-4 w-4 text-pink-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case "chat":
        return "Mensagem"
      case "rdo":
        return "RDO"
      case "financial":
        return "Financeiro"
      case "meeting":
        return "Reunião"
      case "document":
        return "Documento"
      case "photo":
        return "Fotos"
      default:
        return "Notificação"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const now = new Date()
    const notificationTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Agora"
    if (diffInMinutes < 60) return `${diffInMinutes}min atrás`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h atrás`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d atrás`

    return notificationTime.toLocaleDateString("pt-BR")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  if (unreadCount === 0) {
    return null // Don't show bell if no unread notifications
  }

  return (
    <div className={`relative ${className}`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600">
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-96 p-0 max-h-[80vh]">
          {/* Header */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notificações</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button size="sm" variant="ghost" onClick={markAllAsRead} className="text-xs">
                    <MarkAsRead className="h-3 w-3 mr-1" />
                    Marcar todas como lidas
                  </Button>
                )}
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} não lidas
                </Badge>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <ScrollArea className="max-h-96">
            {loading ? (
              <div className="p-8 text-center">
                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2 animate-pulse" />
                <p className="text-sm text-gray-500">Carregando notificações...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Nenhuma notificação</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                      {/* Avatar (for chat notifications) */}
                      {notification.type === "chat" && notification.metadata?.senderAvatar && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={notification.metadata.senderAvatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {notification.metadata.senderName?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{notification.description}</p>

                            {/* Metadata */}
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {getNotificationTypeLabel(notification.type)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {notification.projectName}
                              </Badge>
                              {notification.metadata?.amount && (
                                <Badge variant="outline" className="text-xs text-green-700">
                                  {formatCurrency(notification.metadata.amount)}
                                </Badge>
                              )}
                              {notification.metadata?.rdoNumber && (
                                <Badge variant="outline" className="text-xs">
                                  RDO #{notification.metadata.rdoNumber}
                                </Badge>
                              )}
                              {notification.metadata?.photoCount && (
                                <Badge variant="outline" className="text-xs">
                                  {notification.metadata.photoCount} fotos
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                              {notification.metadata?.senderName && (
                                <span className="text-xs text-gray-500">por {notification.metadata.senderName}</span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markAsRead(notification.id)
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <MarkAsRead className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          {notifications.length > 0 && (
            <>
              <Separator />
              <div className="p-3 bg-gray-50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    setIsOpen(false)
                    router.push(`/${userType}/notifications`)
                  }}
                >
                  Ver todas as notificações
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
