"use client"

import type React from "react"

import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FormSection } from "./form-section"
import { formatFileSize } from "../utils/form-utils"
import type { LogoUploadProps } from "../types/construction-form"

export const LogoUpload = ({ logo, onLogoChange }: LogoUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onLogoChange(file)
  }

  const clearLogo = () => {
    onLogoChange(null)
  }

  return (
    <FormSection
      title="Logo da Empresa"
      description="Faça upload do logo da empresa prestadora de serviço"
      icon={Upload}
    >
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="logo-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
            </p>
            <p className="text-xs text-gray-500">PNG, JPG ou JPEG (MAX. 5MB)</p>
          </div>
          <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      {logo && (
        <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {logo.name}
            </Badge>
            <span className="text-xs text-gray-500">({formatFileSize(logo.size)})</span>
          </div>
          <Button variant="ghost" size="sm" onClick={clearLogo}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </FormSection>
  )
}
