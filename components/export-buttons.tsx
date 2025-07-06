"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText, Table } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Import libraries for PDF and CSV export
// Note: In a real implementation, you would install these packages:
// npm install jspdf jspdf-autotable papaparse
// npm install @types/papaparse

interface ExportButtonsProps {
  data: any[]
  filename: string
  columns?: { key: string; label: string }[]
  title?: string
  className?: string
}

export function ExportButtons({ data, filename, columns, title, className = "" }: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      // Dynamic import to avoid SSR issues
      const jsPDF = (await import("jspdf")).default
      const autoTable = (await import("jspdf-autotable")).default

      const doc = new jsPDF()

      // Add title
      if (title) {
        doc.setFontSize(16)
        doc.text(title, 14, 20)
      }

      // Prepare table data
      const tableColumns = columns || Object.keys(data[0] || {}).map((key) => ({ key, label: key }))
      const tableHeaders = tableColumns.map((col) => col.label)
      const tableRows = data.map((row) =>
        tableColumns.map((col) => {
          const value = row[col.key]
          if (typeof value === "number") {
            return value.toLocaleString("pt-BR")
          }
          if (value instanceof Date) {
            return value.toLocaleDateString("pt-BR")
          }
          return String(value || "")
        }),
      )

      // Add table
      autoTable(doc, {
        head: [tableHeaders],
        body: tableRows,
        startY: title ? 30 : 20,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [229, 231, 235], // Light gray
          textColor: [31, 41, 55], // Dark gray
        },
        alternateRowStyles: {
          fillColor: [249, 250, 251], // Very light gray
        },
      })

      // Save the PDF
      doc.save(`${filename}.pdf`)

      toast({
        title: "PDF exportado com sucesso",
        description: `O arquivo ${filename}.pdf foi baixado.`,
      })
    } catch (error) {
      console.error("Error exporting PDF:", error)
      toast({
        title: "Erro ao exportar PDF",
        description: "Ocorreu um erro ao gerar o arquivo PDF.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const exportToCSV = async () => {
    setIsExporting(true)
    try {
      // Dynamic import to avoid SSR issues
      const Papa = (await import("papaparse")).default

      // Prepare data for CSV
      const csvData = data.map((row) => {
        const processedRow: any = {}
        const tableColumns = columns || Object.keys(row).map((key) => ({ key, label: key }))

        tableColumns.forEach((col) => {
          const value = row[col.key]
          if (typeof value === "number") {
            processedRow[col.label] = value
          } else if (value instanceof Date) {
            processedRow[col.label] = value.toLocaleDateString("pt-BR")
          } else {
            processedRow[col.label] = String(value || "")
          }
        })

        return processedRow
      })

      // Convert to CSV
      const csv = Papa.unparse(csvData, {
        delimiter: ",",
        header: true,
      })

      // Create and download file
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `${filename}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "CSV exportado com sucesso",
        description: `O arquivo ${filename}.csv foi baixado.`,
      })
    } catch (error) {
      console.error("Error exporting CSV:", error)
      toast({
        title: "Erro ao exportar CSV",
        description: "Ocorreu um erro ao gerar o arquivo CSV.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  if (!data || data.length === 0) {
    return null
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={exportToPDF}
        disabled={isExporting}
        className="flex items-center space-x-1"
      >
        <FileText className="h-4 w-4" />
        <span>PDF</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={exportToCSV}
        disabled={isExporting}
        className="flex items-center space-x-1"
      >
        <Table className="h-4 w-4" />
        <span>CSV</span>
      </Button>
    </div>
  )
}

// Simplified version for when libraries are not available
export function ExportButtonsSimple({ data, filename, className = "" }: Omit<ExportButtonsProps, "columns" | "title">) {
  const { toast } = useToast()

  const exportToCSV = () => {
    if (!data || data.length === 0) return

    try {
      // Simple CSV export without external library
      const headers = Object.keys(data[0])
      const csvContent = [
        headers.join(","),
        ...data.map((row) =>
          headers
            .map((header) => {
              const value = row[header]
              if (typeof value === "string" && value.includes(",")) {
                return `"${value}"`
              }
              return value || ""
            })
            .join(","),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `${filename}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "CSV exportado com sucesso",
        description: `O arquivo ${filename}.csv foi baixado.`,
      })
    } catch (error) {
      console.error("Error exporting CSV:", error)
      toast({
        title: "Erro ao exportar CSV",
        description: "Ocorreu um erro ao gerar o arquivo CSV.",
        variant: "destructive",
      })
    }
  }

  const exportToPDF = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A exportação para PDF estará disponível em breve.",
    })
  }

  if (!data || data.length === 0) {
    return null
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button variant="outline" size="sm" onClick={exportToPDF} className="flex items-center space-x-1">
        <FileText className="h-4 w-4" />
        <span>PDF</span>
      </Button>

      <Button variant="outline" size="sm" onClick={exportToCSV} className="flex items-center space-x-1">
        <Download className="h-4 w-4" />
        <span>CSV</span>
      </Button>
    </div>
  )
}
