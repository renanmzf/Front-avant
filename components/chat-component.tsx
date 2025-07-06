"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, User, Shield } from "lucide-react"
import { NotificationBadge } from "@/components/ui/notification-badge"

interface Message {
  id: string
  content: string
  sender: string
  senderType: "client" | "admin" | "prestador"
  timestamp: Date
  projectId: string
  read: boolean
}

interface ChatComponentProps {
  userType: "client" | "admin" | "prestador"
  userId: string
  projectId: string
}

export function ChatComponent({ userType, userId, projectId }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Como está o andamento da obra?",
      sender: "João Silva",
      senderType: "client",
      timestamp: new Date("2024-03-01T10:30:00"),
      projectId: "1",
      read: true,
    },
    {
      id: "2",
      content: "Bom dia! A obra está progredindo bem. Hoje concluímos a estrutura do térreo.",
      sender: "Administrador",
      senderType: "admin",
      timestamp: new Date("2024-03-01T10:45:00"),
      projectId: "1",
      read: true,
    },
    {
      id: "3",
      content: "Ótimo! Quando começam as instalações elétricas?",
      sender: "João Silva",
      senderType: "client",
      timestamp: new Date("2024-03-01T11:00:00"),
      projectId: "1",
      read: userType === "admin" ? false : true,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    // Contar mensagens não lidas
    const unread = messages.filter((msg) => !msg.read && msg.senderType !== userType).length
    setUnreadCount(unread)
  }, [messages, userType])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: userType === "admin" ? "Administrador" : userType === "client" ? "Cliente" : "Prestador",
      senderType: userType,
      timestamp: new Date(),
      projectId,
      read: true,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simular resposta automática (apenas para demonstração)
    if (userType !== "admin") {
      setTimeout(() => {
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          content: "Mensagem recebida! Entraremos em contato em breve.",
          sender: "Administrador",
          senderType: "admin",
          timestamp: new Date(),
          projectId,
          read: false,
        }
        setMessages((prev) => [...prev, autoReply])
      }, 2000)
    }
  }

  const markAsRead = () => {
    setMessages((prev) => prev.map((msg) => ({ ...msg, read: true })))
    setUnreadCount(0)
  }

  const getSenderIcon = (senderType: string) => {
    switch (senderType) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "client":
        return <User className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <div className="relative">
              <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
              <NotificationBadge count={unreadCount} />
            </div>
            Chat do Projeto
          </CardTitle>
          {unreadCount > 0 && (
            <Button size="sm" variant="outline" onClick={markAsRead}>
              Marcar como lida
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages
            .filter((msg) => msg.projectId === projectId)
            .map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderType === userType ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderType === userType ? "bg-blue-600 text-white" : "bg-white border"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {getSenderIcon(message.senderType)}
                    <span className="text-xs font-medium">{message.sender}</span>
                    {!message.read && message.senderType !== userType && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.senderType === userType ? "text-blue-200" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
