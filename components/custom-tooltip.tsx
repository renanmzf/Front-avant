"use client"

import { formatCurrencyDetailed } from "../utils/revenue-chart-utils"
import type { CustomTooltipProps } from "../types/revenue-chart"

export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg max-w-sm">
        <p className="font-semibold text-gray-900 mb-2">{label} 2024</p>
        <p className="text-blue-600 font-bold text-lg mb-3">Total: {formatCurrencyDetailed(data.totalAmount)}</p>

        {data.contracts.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Contratos:</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {data.contracts.map((contract: any, index: number) => (
                <div key={index} className="text-xs text-gray-600 border-l-2 border-blue-200 pl-2">
                  <p className="font-medium">{contract.contractTitle}</p>
                  <p className="text-gray-500">{contract.clientName}</p>
                  <p className="font-semibold text-blue-600">{formatCurrencyDetailed(contract.amount)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}
