"use client"

import { Button } from "@/components/ui/button"
import type { TabType } from "../types/cost-analysis"

interface TabNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  className?: string
}

export const TabNavigation = ({ activeTab, onTabChange, className = "" }: TabNavigationProps) => {
  const tabs = [
    { id: "cost-distribution" as TabType, label: "Distribuição por Tipo de Custo" },
    { id: "stage-expenses" as TabType, label: "Gastos por Etapa" },
  ]

  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "outline"}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 justify-center ${
            activeTab === tab.id
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}
