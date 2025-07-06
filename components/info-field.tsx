import type { InfoFieldProps } from "../types/construction-display"

export const InfoField = ({ label, value, icon: Icon }: InfoFieldProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md border">{value || "Não informado"}</div>
    </div>
  )
}
