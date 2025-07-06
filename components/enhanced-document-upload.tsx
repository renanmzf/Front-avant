"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Folder, FolderPlus, Eye, Download, Trash2 } from "lucide-react"

import { usePathname } from 'next/navigation';

interface Document {
  id: string
  fileName: string
  category: string
  subfolder: string
  uploadDate: string
  size: string
  type: string
  url: string
  projectId: string
}

interface Category {
  id: string
  name: string
  subfolders: string[]
}

interface EnhancedDocumentUploadProps {
  projectId: string
  projectName: string
}

export function EnhancedDocumentUpload({ projectId, projectName }: EnhancedDocumentUploadProps) {
  const pathname = usePathname();
  
  const showCard = !pathname.startsWith('/cliente');

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      fileName: "Contrato_Cliente.pdf",
      category: "Contratos",
      subfolder: "Cliente",
      uploadDate: "2024-01-15T10:00:00",
      size: "2.3 MB",
      type: "PDF",
      url: "/placeholder.pdf",
      projectId: "1",
    },
    {
      id: "2",
      fileName: "Projeto_Arquitetonico.pdf",
      category: "Projetos",
      subfolder: "Arquitetônico",
      uploadDate: "2024-01-20T14:30:00",
      size: "5.1 MB",
      type: "PDF",
      url: "/placeholder.pdf",
      projectId: "1",
    },
  ])

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "contratos",
      name: "Contratos",
      subfolders: ["Cliente", "Prestador", "Fornecedor"],
    },
    {
      id: "projetos",
      name: "Projetos",
      subfolders: ["Arquitetônico", "Estrutural", "Elétrico", "Hidráulico"],
    },
    {
      id: "licencas",
      name: "Licenças",
      subfolders: ["Prefeitura", "Ambiental", "Bombeiros"],
    },
    {
      id: "financeiro",
      name: "Financeiro",
      subfolders: ["Notas Fiscais", "Recibos", "Orçamentos"],
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubfolder, setSelectedSubfolder] = useState("")
  const [newSubfolderName, setNewSubfolderName] = useState("")
  const [showNewSubfolder, setShowNewSubfolder] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  // Filtrar documentos por projeto
  const projectDocuments = documents.filter((doc) => doc.projectId === projectId)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0] && selectedCategory && selectedSubfolder) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [selectedCategory, selectedSubfolder],
  )

  const handleFiles = (files: FileList) => {
    if (!selectedCategory || !selectedSubfolder) {
      alert("Selecione uma categoria e subpasta antes de fazer upload")
      return
    }

    Array.from(files).forEach((file) => {
      const fileType = file.name.split(".").pop()?.toUpperCase() || "UNKNOWN"
      const newDocument: Document = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        category: categories.find((c) => c.id === selectedCategory)?.name || selectedCategory,
        subfolder: selectedSubfolder,
        uploadDate: new Date().toISOString(),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: fileType,
        url: URL.createObjectURL(file),
        projectId,
      }
      setDocuments((prev) => [...prev, newDocument])
    })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const addNewSubfolder = () => {
    if (newSubfolderName && selectedCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategory ? { ...cat, subfolders: [...cat.subfolders, newSubfolderName] } : cat,
        ),
      )
      setSelectedSubfolder(newSubfolderName)
      setNewSubfolderName("")
      setShowNewSubfolder(false)
    }
  }

  const deleteDocument = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este documento?")) {
      setDocuments(documents.filter((doc) => doc.id !== id))
    }
  }

  const downloadDocument = (doc: Document) => {
    const link = document.createElement("a")
    link.href = doc.url
    link.download = doc.fileName
    link.click()
  }

  const viewDocument = (doc: Document) => {
    window.open(doc.url, "_blank")
  }

  // Agrupar documentos por categoria e subpasta
  const documentsByCategory = projectDocuments.reduce(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = {}
      }
      if (!acc[doc.category][doc.subfolder]) {
        acc[doc.category][doc.subfolder] = []
      }
      acc[doc.category][doc.subfolder].push(doc)
      return acc
    },
    {} as Record<string, Record<string, Document[]>>,
  )

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory)

  return (
    <div className="space-y-6">
      {showCard && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Upload de Documentos - {projectName}
          </CardTitle>
          <CardDescription>Organize documentos por categoria e subpastas personalizadas</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Seleção de Categoria e Subpasta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Subpasta</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowNewSubfolder(true)}
                  disabled={!selectedCategory}
                >
                  <FolderPlus className="h-3 w-3 mr-1" />
                  Nova
                </Button>
              </div>
              {showNewSubfolder ? (
                <div className="flex space-x-2">
                  <Input
                    value={newSubfolderName}
                    onChange={(e) => setNewSubfolderName(e.target.value)}
                    placeholder="Nome da subpasta"
                  />
                  <Button size="sm" onClick={addNewSubfolder}>
                    Criar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowNewSubfolder(false)}>
                    Cancelar
                  </Button>
                </div>
              ) : (
                <Select value={selectedSubfolder} onValueChange={setSelectedSubfolder}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a subpasta" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategoryData?.subfolders.map((subfolder) => (
                      <SelectItem key={subfolder} value={subfolder}>
                        {subfolder}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Área de Upload */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } ${!selectedCategory || !selectedSubfolder ? "opacity-50" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Adicione documentos</h3>
            <p className="text-gray-600 mb-4">Arraste os arquivos aqui ou clique para selecionar</p>
            {selectedCategory && selectedSubfolder ? (
              <Badge variant="outline" className="mb-4">
                {categories.find((c) => c.id === selectedCategory)?.name} → {selectedSubfolder}
              </Badge>
            ) : (
              <p className="text-red-500 text-sm mb-4">Selecione uma categoria e subpasta primeiro</p>
            )}
            <Input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="document-upload"
              disabled={!selectedCategory || !selectedSubfolder}
            />
            <Label htmlFor="document-upload">
              <Button variant="outline" className="cursor-pointer" disabled={!selectedCategory || !selectedSubfolder}>
                <Upload className="h-4 w-4 mr-2" />
                Selecionar Arquivos
              </Button>
            </Label>
            <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX, XLS, XLSX, JPG, PNG até 10MB cada</p>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Documentos Organizados */}
      <div className="space-y-6">
        {Object.entries(documentsByCategory).map(([categoryName, subfolders]) => (
          <Card key={categoryName}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Folder className="h-5 w-5 mr-2 text-blue-600" />
                {categoryName}
                <Badge variant="outline" className="ml-2">
                  {Object.values(subfolders).flat().length} documentos
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(subfolders).map(([subfolderName, docs]) => (
                  <div key={subfolderName} className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Folder className="h-4 w-4 mr-2 text-gray-600" />
                      <h4 className="font-medium">{subfolderName}</h4>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {docs.length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {docs.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                          <div className="flex items-center flex-1 min-w-0">
                            <FileText
                              className={`h-5 w-5 mr-2 flex-shrink-0 ${
                                doc.type === "PDF"
                                  ? "text-red-600"
                                  : doc.type === "DOC" || doc.type === "DOCX"
                                    ? "text-blue-600"
                                    : doc.type === "XLS" || doc.type === "XLSX"
                                      ? "text-green-600"
                                      : "text-gray-600"
                              }`}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate" title={doc.fileName}>
                                {doc.fileName}
                              </p>
                              <p className="text-xs text-gray-600">
                                {doc.type} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-1 ml-2">
                            <Button size="sm" variant="outline" onClick={() => viewDocument(doc)}>
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => downloadDocument(doc)}>
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => deleteDocument(doc.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projectDocuments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum documento foi adicionado ainda</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
