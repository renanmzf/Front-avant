"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Camera, Download, Eye, Calendar, ImageIcon } from "lucide-react"

interface PhotoGalleryContinuousProps {
  projectId: string
  userType: "client" | "admin" | "contractor"
}

export default function PhotoGalleryContinuous({ projectId, userType }: PhotoGalleryContinuousProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)

  // Fotos organizadas por data
  const photosByDate = {
    "2024-03-15": [
      {
        id: 1,
        url: "/placeholder.svg?height=300&width=400&text=Alvenaria+Progresso+1",
        description: "Progresso da alvenaria - parede externa",
        time: "14:30",
        phase: "Alvenaria",
      },
      {
        id: 2,
        url: "/placeholder.svg?height=300&width=400&text=Alvenaria+Progresso+2",
        description: "Alvenaria interna - sala",
        time: "15:45",
        phase: "Alvenaria",
      },
      {
        id: 3,
        url: "/placeholder.svg?height=300&width=400&text=Instalações+Elétricas",
        description: "Instalações elétricas - quadro principal",
        time: "16:20",
        phase: "Instalações",
      },
    ],
    "2024-03-14": [
      {
        id: 4,
        url: "/placeholder.svg?height=300&width=400&text=Estrutura+Concluída",
        description: "Estrutura de concreto finalizada",
        time: "09:15",
        phase: "Estrutura",
      },
      {
        id: 5,
        url: "/placeholder.svg?height=300&width=400&text=Laje+Concretada",
        description: "Concretagem da laje superior",
        time: "11:30",
        phase: "Estrutura",
      },
    ],
    "2024-03-13": [
      {
        id: 6,
        url: "/placeholder.svg?height=300&width=400&text=Fundação+Finalizada",
        description: "Fundação completamente finalizada",
        time: "08:45",
        phase: "Fundação",
      },
      {
        id: 7,
        url: "/placeholder.svg?height=300&width=400&text=Armação+Pilares",
        description: "Armação dos pilares em andamento",
        time: "10:20",
        phase: "Estrutura",
      },
      {
        id: 8,
        url: "/placeholder.svg?height=300&width=400&text=Preparação+Laje",
        description: "Preparação para concretagem da laje",
        time: "14:15",
        phase: "Estrutura",
      },
    ],
  }

  const allPhotos = Object.values(photosByDate).flat()
  const totalPhotos = allPhotos.length

  const phaseColors = {
    Fundação: "bg-purple-100 text-purple-800",
    Estrutura: "bg-blue-100 text-blue-800",
    Alvenaria: "bg-green-100 text-green-800",
    Cobertura: "bg-yellow-100 text-yellow-800",
    Instalações: "bg-red-100 text-red-800",
    Acabamento: "bg-cyan-100 text-cyan-800",
  }

  const handleDownloadPhoto = (photo: any) => {
    console.log("Baixando foto:", photo.description)
    const link = document.createElement("a")
    link.href = photo.url
    link.download = `foto_${photo.id}_${photo.description.replace(/\s+/g, "_")}.jpg`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Galeria de Fotos</h1>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <ImageIcon className="h-4 w-4" />
            <span>{totalPhotos} fotos</span>
          </Badge>
        </div>
      </div>

      {/* Estatísticas da Galeria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="h-5 w-5 mr-2 text-blue-600" />
            Estatísticas da Galeria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total de Fotos</p>
              <p className="text-2xl font-bold text-blue-600">{totalPhotos}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Dias Registrados</p>
              <p className="text-2xl font-bold text-green-600">{Object.keys(photosByDate).length}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Última Atualização</p>
              <p className="text-sm font-bold text-purple-600">
                {new Date(Math.max(...Object.keys(photosByDate).map((d) => new Date(d).getTime()))).toLocaleDateString(
                  "pt-BR",
                )}
              </p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">Fases Documentadas</p>
              <p className="text-2xl font-bold text-orange-600">{new Set(allPhotos.map((p) => p.phase)).size}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Galeria Contínua por Data */}
      <div className="space-y-8">
        {Object.entries(photosByDate)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .map(([date, photos]) => (
            <div key={date} className="space-y-4">
              {/* Cabeçalho da Data */}
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {new Date(date).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
                <Badge variant="outline">{photos.length} fotos</Badge>
              </div>

              {/* Grid de Fotos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100 relative group">
                      <img
                        src={photo.url || "/placeholder.svg"}
                        alt={photo.description}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setSelectedPhoto(photo)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedPhoto(photo)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownloadPhoto(photo)
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={phaseColors[photo.phase as keyof typeof phaseColors] || "bg-gray-100"}>
                          {photo.phase}
                        </Badge>
                        <span className="text-xs text-gray-500">{photo.time}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{photo.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Modal de Visualização */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedPhoto?.description}</span>
              <div className="flex items-center space-x-2">
                <Badge className={phaseColors[selectedPhoto?.phase as keyof typeof phaseColors] || "bg-gray-100"}>
                  {selectedPhoto?.phase}
                </Badge>
                <Button size="sm" variant="outline" onClick={() => handleDownloadPhoto(selectedPhoto)}>
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          {selectedPhoto && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedPhoto.url || "/placeholder.svg"}
                  alt={selectedPhoto.description}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Horário: {selectedPhoto.time}</span>
                <span>Fase: {selectedPhoto.phase}</span>
                <span>ID: #{selectedPhoto.id}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
