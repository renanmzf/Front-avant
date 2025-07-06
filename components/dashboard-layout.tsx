"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Home,
  Camera,
  DollarSign,
  FileText,
  Users,
  MessageSquare,
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight,
  Filter,
  Send,
  TrendingUp,
  Building2,
  ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

interface KPI {
  id: string
  title: string
  value: string | number
  change?: string
  trend?: "up" | "down" | "neutral"
  icon: React.ReactNode
  color: string
}

interface ChartData {
  name: string
  value: number
  [key: string]: any
}

interface TableRowData {
  id: string
  nf: string
  description: string
  supplier: string
  date: string
  phase: string
  type: string
  cost: number
}

interface Photo {
  id: string
  url: string
  date: string
  description?: string
}

interface ChatMessage {
  id: string
  user: User
  message: string
  timestamp: string
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "info" | "warning" | "success" | "error"
}

interface DashboardLayoutProps {
  user: User
  kpis: KPI[]
  costsByPhase: ChartData[]
  cashFlowData: ChartData[]
  tableData: TableRowData[]
  photos: Photo[]
  chatMessages: ChatMessage[]
  notifications: Notification[]
  onNavigate?: (section: string) => void
  onSendMessage?: (message: string) => void
  onMarkNotificationRead?: (id: string) => void
  className?: string
}

export function DashboardLayout({
  user,
  kpis,
  costsByPhase,
  cashFlowData,
  tableData,
  photos,
  chatMessages,
  notifications,
  onNavigate,
  onSendMessage,
  onMarkNotificationRead,
  className = "",
}: DashboardLayoutProps) {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [tableFilters, setTableFilters] = useState({
    nf: "",
    description: "",
    supplier: "",
    phase: "",
    type: "",
  })

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "photos", label: "Photos", icon: Camera },
    { id: "financials", label: "Financials", icon: DollarSign },
    { id: "rdos", label: "RDOs", icon: FileText },
    { id: "meetings", label: "Meeting Minutes", icon: Users },
    { id: "chat", label: "Chat", icon: MessageSquare },
  ]

  const handleNavigation = (section: string) => {
    setActiveSection(section)
    onNavigate?.(section)
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      onSendMessage?.(chatMessage)
      setChatMessage("")
    }
  }

  const filteredTableData = tableData.filter((row) => {
    return (
      row.nf.toLowerCase().includes(tableFilters.nf.toLowerCase()) &&
      row.description.toLowerCase().includes(tableFilters.description.toLowerCase()) &&
      row.supplier.toLowerCase().includes(tableFilters.supplier.toLowerCase()) &&
      (tableFilters.phase === "" || row.phase === tableFilters.phase) &&
      (tableFilters.type === "" || row.type === tableFilters.type)
    )
  })

  const unreadNotifications = notifications.filter((n) => !n.read)

  // Sidebar Component
  const Sidebar = () => (
    <motion.div
      initial={false}
      animate={{
        width: isMobile ? "100%" : sidebarCollapsed ? "80px" : "280px",
      }}
      className={cn(
        "fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 shadow-lg",
        isMobile && "hidden",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-construction-gray-800 dark:text-white">{user.name}</p>
                  <p className="text-sm text-construction-gray-600 dark:text-gray-400">{user.role}</p>
                </div>
              </motion.div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2">
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start rounded-2xl transition-all duration-200",
                        activeSection === item.id
                          ? "bg-primary text-white shadow-md"
                          : "hover:bg-construction-gray-50 dark:hover:bg-gray-800",
                        sidebarCollapsed && "justify-center px-2",
                      )}
                      onClick={() => handleNavigation(item.id)}
                    >
                      <Icon className="h-5 w-5" />
                      {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
                    </Button>
                  </TooltipTrigger>
                  {sidebarCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className={cn("flex items-center", sidebarCollapsed ? "justify-center" : "justify-between")}>
            {!sidebarCollapsed && (
              <span className="text-sm text-construction-gray-600 dark:text-gray-400">Dark Mode</span>
            )}
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>
      </div>
    </motion.div>
  )

  // Mobile Bottom Navigation
  const MobileNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navigationItems.slice(0, 5).map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn("flex flex-col items-center p-2 rounded-2xl", activeSection === item.id && "text-primary")}
              onClick={() => handleNavigation(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )

  // Header Component
  const Header = () => (
    <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        {isMobile && (
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-2xl font-bold text-construction-gray-800 dark:text-white capitalize">
          {activeSection === "dashboard" ? "Dashboard" : activeSection}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-secondary">
                  {unreadNotifications.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No notifications</div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="p-4 cursor-pointer"
                    onClick={() => onMarkNotificationRead?.(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={cn("w-2 h-2 rounded-full mt-2", notification.read ? "bg-gray-300" : "bg-secondary")}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  // KPI Cards Component
  const KPICards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi) => (
        <motion.div
          key={kpi.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-construction-gray-600 dark:text-gray-400">{kpi.title}</p>
                  <p className="text-2xl font-bold text-construction-gray-800 dark:text-white mt-1">{kpi.value}</p>
                  {kpi.change && (
                    <div className="flex items-center mt-2">
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : kpi.trend === "down" ? (
                        <TrendingUp className="h-4 w-4 text-red-500 mr-1 rotate-180" />
                      ) : (
                        <div className="h-4 w-4 mr-1" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          kpi.trend === "up"
                            ? "text-green-500"
                            : kpi.trend === "down"
                              ? "text-red-500"
                              : "text-gray-500",
                        )}
                      >
                        {kpi.change}
                      </span>
                    </div>
                  )}
                </div>
                <div className={cn("p-3 rounded-2xl", kpi.color)}>{kpi.icon}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  // Charts Component
  const Charts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Costs by Phase</CardTitle>
          <CardDescription>Construction phase breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costsByPhase}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="value" fill="#4A7C59" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Cash Flow</CardTitle>
          <CardDescription>Monthly cash flow trend</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Line type="monotone" dataKey="value" stroke="#E97451" strokeWidth={3} dot={{ fill: "#E97451" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )

  // Data Table Component
  const DataTable = () => (
    <Card className="rounded-2xl shadow-sm mb-8">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Financial Records</CardTitle>
            <CardDescription>Project expenses and payments</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <Input
            placeholder="Search NF..."
            value={tableFilters.nf}
            onChange={(e) => setTableFilters({ ...tableFilters, nf: e.target.value })}
          />
          <Input
            placeholder="Search description..."
            value={tableFilters.description}
            onChange={(e) => setTableFilters({ ...tableFilters, description: e.target.value })}
          />
          <Input
            placeholder="Search supplier..."
            value={tableFilters.supplier}
            onChange={(e) => setTableFilters({ ...tableFilters, supplier: e.target.value })}
          />
          <Select
            value={tableFilters.phase}
            onValueChange={(value) => setTableFilters({ ...tableFilters, phase: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Phases</SelectItem>
              <SelectItem value="Foundation">Foundation</SelectItem>
              <SelectItem value="Structure">Structure</SelectItem>
              <SelectItem value="Finishing">Finishing</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={tableFilters.type}
            onValueChange={(value) => setTableFilters({ ...tableFilters, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Material">Material</SelectItem>
              <SelectItem value="Labor">Labor</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-2xl border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-construction-gray-50 dark:bg-gray-800">
                  <TableHead>NF</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Phase</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center space-y-2">
                        <FileText className="h-8 w-8 text-gray-400" />
                        <p className="text-gray-500">No records found</p>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTableData.map((row) => (
                    <TableRow key={row.id} className="hover:bg-construction-gray-50 dark:hover:bg-gray-800">
                      <TableCell className="font-medium">{row.nf}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.supplier}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{row.phase}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{row.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">${row.cost.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Photo Gallery Component
  const PhotoGallery = () => {
    const photosByDate = photos.reduce(
      (acc, photo) => {
        const date = photo.date
        if (!acc[date]) acc[date] = []
        acc[date].push(photo)
        return acc
      },
      {} as Record<string, Photo[]>,
    )

    return (
      <div className="space-y-6">
        {Object.keys(photosByDate).length === 0 ? (
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-12 text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No photos yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Upload your first construction photos to get started</p>
              <Button className="mt-4">
                <Camera className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </CardContent>
          </Card>
        ) : (
          Object.entries(photosByDate).map(([date, datePhotos]) => (
            <div key={date}>
              <div className="flex items-center space-x-4 mb-4">
                <h3 className="text-lg font-semibold text-construction-gray-800 dark:text-white">{date}</h3>
                <Separator className="flex-1" />
                <Badge variant="outline">{datePhotos.length} photos</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {datePhotos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <img
                      src={photo.url || "/placeholder.svg"}
                      alt={photo.description}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    )
  }

  // Chat Component
  const Chat = () => (
    <Card className="rounded-2xl shadow-sm h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Project Chat</CardTitle>
        <CardDescription>Team communication</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No messages yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Start the conversation with your team</p>
            </div>
          ) : (
            chatMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary text-white text-xs">
                    {message.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-construction-gray-800 dark:text-white">
                      {message.user.name}
                    </span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-construction-gray-700 dark:text-gray-300">{message.message}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Type your message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 rounded-2xl"
            />
            <Button onClick={handleSendMessage} disabled={!chatMessage.trim()} className="rounded-2xl">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Main Content Renderer
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div>
            <KPICards />
            <Charts />
            <DataTable />
          </div>
        )
      case "photos":
        return <PhotoGallery />
      case "chat":
        return <Chat />
      case "financials":
        return <DataTable />
      default:
        return (
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-12 text-center">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">This section is under construction</p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <TooltipProvider>
      <div className={cn("min-h-screen bg-construction-gray-50 dark:bg-gray-900 transition-colors", className)}>
        <Sidebar />
        <MobileNavigation />

        <div className={cn("transition-all duration-300", isMobile ? "pb-20" : sidebarCollapsed ? "ml-20" : "ml-80")}>
          <Header />
          <main className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
