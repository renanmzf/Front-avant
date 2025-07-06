"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DollarSign, TrendingUp, MessageSquare, Building2 } from "lucide-react"

export default function DashboardDemo() {
  // Mock data
  const user = {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Project Manager",
  }

  const kpis = [
    {
      id: "1",
      title: "Project Progress",
      value: "68%",
      change: "+5% from last week",
      trend: "up" as const,
      icon: <Building2 className="h-6 w-6 text-white" />,
      color: "bg-primary",
    },
    {
      id: "2",
      title: "Amount Paid",
      value: "$187,500",
      change: "+12% from last month",
      trend: "up" as const,
      icon: <DollarSign className="h-6 w-6 text-white" />,
      color: "bg-green-500",
    },
    {
      id: "3",
      title: "Balance Due",
      value: "$62,500",
      change: "-8% from last month",
      trend: "down" as const,
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: "bg-secondary",
    },
    {
      id: "4",
      title: "New Messages",
      value: "12",
      change: "3 unread",
      trend: "neutral" as const,
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      color: "bg-blue-500",
    },
  ]

  const costsByPhase = [
    { name: "Foundation", value: 45000 },
    { name: "Structure", value: 78000 },
    { name: "Roofing", value: 32000 },
    { name: "Electrical", value: 28000 },
    { name: "Plumbing", value: 22000 },
    { name: "Finishing", value: 55000 },
  ]

  const cashFlowData = [
    { name: "Jan", value: 25000 },
    { name: "Feb", value: 45000 },
    { name: "Mar", value: 38000 },
    { name: "Apr", value: 52000 },
    { name: "May", value: 48000 },
    { name: "Jun", value: 62000 },
  ]

  const tableData = [
    {
      id: "1",
      nf: "NF-001234",
      description: "Concrete Mix - 15m³",
      supplier: "Concrete Solutions",
      date: "2024-06-15",
      phase: "Foundation",
      type: "Material",
      cost: 4800,
    },
    {
      id: "2",
      nf: "NF-005678",
      description: "Steel Reinforcement",
      supplier: "Steel Works Inc",
      date: "2024-06-14",
      phase: "Structure",
      type: "Material",
      cost: 12500,
    },
    {
      id: "3",
      nf: "NF-009876",
      description: "Electrical Installation",
      supplier: "Electric Pro",
      date: "2024-06-13",
      phase: "Electrical",
      type: "Labor",
      cost: 8200,
    },
    {
      id: "4",
      nf: "NF-012345",
      description: "Plumbing Fixtures",
      supplier: "Plumb Perfect",
      date: "2024-06-12",
      phase: "Plumbing",
      type: "Material",
      cost: 3600,
    },
  ]

  const photos = [
    {
      id: "1",
      url: "/placeholder.svg?height=200&width=200&text=Foundation+Progress",
      date: "2024-06-15",
      description: "Foundation progress",
    },
    {
      id: "2",
      url: "/placeholder.svg?height=200&width=200&text=Steel+Structure",
      date: "2024-06-15",
      description: "Steel structure installation",
    },
    {
      id: "3",
      url: "/placeholder.svg?height=200&width=200&text=Electrical+Work",
      date: "2024-06-14",
      description: "Electrical work in progress",
    },
    {
      id: "4",
      url: "/placeholder.svg?height=200&width=200&text=Plumbing+Install",
      date: "2024-06-14",
      description: "Plumbing installation",
    },
    {
      id: "5",
      url: "/placeholder.svg?height=200&width=200&text=Roofing+Work",
      date: "2024-06-13",
      description: "Roofing work",
    },
    {
      id: "6",
      url: "/placeholder.svg?height=200&width=200&text=Interior+Progress",
      date: "2024-06-13",
      description: "Interior progress",
    },
  ]

  const chatMessages = [
    {
      id: "1",
      user: {
        id: "2",
        name: "Maria Santos",
        email: "maria@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Architect",
      },
      message: "The foundation work is progressing well. We should be ready for the next phase by Monday.",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      user: {
        id: "3",
        name: "Carlos Lima",
        email: "carlos@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Contractor",
      },
      message: "Great! I'll coordinate with the steel team to start early next week.",
      timestamp: "10:45 AM",
    },
    {
      id: "3",
      user: user,
      message: "Perfect. Let's schedule a site meeting for Tuesday morning to review the progress.",
      timestamp: "11:00 AM",
    },
  ]

  const notifications = [
    {
      id: "1",
      title: "New RDO Submitted",
      message: "Daily report #156 has been submitted for review",
      time: "5 minutes ago",
      read: false,
      type: "info" as const,
    },
    {
      id: "2",
      title: "Payment Processed",
      message: "Payment of $15,000 has been processed successfully",
      time: "2 hours ago",
      read: false,
      type: "success" as const,
    },
    {
      id: "3",
      title: "Meeting Reminder",
      message: "Site meeting scheduled for tomorrow at 9:00 AM",
      time: "1 day ago",
      read: true,
      type: "warning" as const,
    },
  ]

  return (
    <DashboardLayout
      user={user}
      kpis={kpis}
      costsByPhase={costsByPhase}
      cashFlowData={cashFlowData}
      tableData={tableData}
      photos={photos}
      chatMessages={chatMessages}
      notifications={notifications}
      onNavigate={(section) => console.log("Navigate to:", section)}
      onSendMessage={(message) => console.log("Send message:", message)}
      onMarkNotificationRead={(id) => console.log("Mark notification as read:", id)}
    />
  )
}
