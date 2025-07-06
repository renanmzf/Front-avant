"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

interface TrendIndicatorProps {
  percentage: number
  direction: "up" | "down"
  period: string
  className?: string
}

export const TrendIndicator = ({ percentage, direction, period, className = "" }: TrendIndicatorProps) => {
  const isUp = direction === "up"
  const Icon = isUp ? TrendingUp : TrendingDown
  const colorClass = isUp ? "text-green-600" : "text-red-600"

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon className={`h-4 w-4 ${colorClass}`} />
      <span className={`text-sm font-medium ${colorClass}`}>
        {isUp ? "Aumento" : "Redução"} de {percentage}% {period}
      </span>
    </div>
  )
}
