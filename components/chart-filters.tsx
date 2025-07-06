"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FILTER_PERIODS, MONTHS } from "../constants/cost-analysis"
import type { ChartFilters as CostAnalysisFilters } from "../types/cost-analysis"
import type { FilterPeriod } from "../types/cost-analysis"

interface ChartFiltersProps {
  filters: CostAnalysisFilters
  onFiltersChange: (filters: CostAnalysisFilters) => void
  className?: string
}

export const ChartFilters = ({ filters, onFiltersChange, className = "" }: ChartFiltersProps) => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  const handlePeriodChange = (period: string) => {
    onFiltersChange({ ...filters, period: period as FilterPeriod })
  }

  const handleMonthChange = (month: string) => {
    onFiltersChange({ ...filters, month: Number.parseInt(month) })
  }

  const handleYearChange = (year: string) => {
    onFiltersChange({ ...filters, year: Number.parseInt(year) })
  }

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Período:</label>
        <Select value={filters.period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FILTER_PERIODS.map((period:any) => (
              <SelectItem key={period.value} value={period.value}>
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filters.period !== "total" && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Ano:</label>
          <Select value={filters.year.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {filters.period === "month" && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Mês:</label>
          <Select value={filters.month.toString()} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((month, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}
