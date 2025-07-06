"use client"

import type React from "react"

import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLogin } from "../hooks/use-login"
import type { LoginProps } from "../types/login"
import { UserRoleIndicator } from "./user-role-indicator"

export const LoginForm = ({ onLogin, className = "" }: LoginProps) => {
  const { formData, errors, isLoading, showPassword, updateField, togglePasswordVisibility, handleSubmit } = useLogin()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(onLogin)
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {/* General Error */}
      {errors.general && (
        <Alert variant="destructive">
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail
          </Label>
          {formData.email && <UserRoleIndicator email={formData.email} className="ml-2" />}
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`pl-10 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
            disabled={isLoading}
          />
        </div>
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Senha
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            className={`pl-10 pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2.5"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>

    </form>
  )
}
