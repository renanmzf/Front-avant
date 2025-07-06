"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ResponsiveSidebar } from "@/components/responsive-sidebar"
import { cn } from "@/lib/utils"

interface ResponsiveLayoutProps {
  userType: "admin" | "client" | "prestador"
  activeTab: string
  onTabChange: (tab: string) => void
  onExit: () => void
  children: React.ReactNode
  className?: string
}

export function ResponsiveLayout({
  userType,
  activeTab,
  onTabChange,
  onExit,
  children,
  className = "",
}: ResponsiveLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Auto-collapse on mobile
      if (mobile) {
        setIsCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveSidebar
        userType={userType}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onExit={onExit}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          isMobile
            ? "pb-20" // Add bottom padding for mobile navigation
            : isCollapsed
              ? "ml-16"
              : "ml-64",
          className,
        )}
      >
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  )
}
