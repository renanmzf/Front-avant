"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Eye, Download, Upload } from "lucide-react"

interface Photo {
  id: string
  url: string
  description: string
  date: string
  projectId: string
}

interface PhotoGalleryProps {
  projectId: string
  userType: "client" | "admin" | "prestador"
}

export function PhotoGallery({ projectId, userType }: PhotoGalleryProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Fotos organizadas apenas por data
  const photosByDate = {
    "2024-03-01": [
      {
        id: "1",
        url: "/placeholder.svg?height=400&width=600&text=Progresso+01/03",
        description: "Vista geral da obra",
        date: "2024-03-01",
        projectId: "1",
      },
      {
        id: "2",
        url: "/placeholder.svg?height=400&width=600&text=Detalhes+01/03",
        description: "Detalhes da estrutura",
        date: "2024-03-01",
        projectId: "1",
      },
      {
        id: "3",
        url: "/placeholder.svg?height=400&width=600&text=Acabamento+01/03",
        description: "Progresso do acabamento",
        date: "2024-03-01",
        projectId: "1",
      },
    ],
    "2024-02-28": [
      {
        id: "4",
        url: "/placeholder.svg?height=400&width=600&text=Progresso+28/02",
        description: "Estrutura em andamento",
        date: "2024-02-28",
        projectId: "1",
      },
      {
        id: "5",
        url: "/placeholder.svg?height=400&width=600&text=Fundação+28/02",
        description: "Fundação concluída",
        date: "2024-02-28",
        projectId: "1",
      },
    ],
    "2024-02-15": [
      {
        id: "6",
        url: "/placeholder.svg?height=400&width=600&text=Início+15/02",
        description: "Início da construção",
        date: "2024-02-15",
        projectId: "1",
      },
    ],
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setCurrentPhotoIndex(0)
  }

  const nextPhoto = () => {
    if (selectedDate) {
      const photos = photosByDate[selectedDate as keyof typeof photosByDate] || []
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }
  }

  const prevPhoto = () => {
    if (selectedDate) {
      const photos = photosByDate[selectedDate as keyof typeof photosByDate] || []
      setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
    }
  }

  const handleUpload = () => {
    // Implementar upload de fotos
    console.log("Upload de fotos")
  }

  const handleDownload = (photoId: string) => {
    // Implementar download de foto
    console.log("Download da foto:", photoId)
  }

  if (selectedDate) {
    const photos = photosByDate[selectedDate as keyof typeof photosByDate] || []
    const currentPhoto = photos[currentPhotoIndex]

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedDate(null)}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Voltar às datas
          </Button>
          <h2 className="text-xl font-semibold">Fotos de {new Date(selectedDate).toLocaleDateString("pt-BR")}</h2>
          <Badge variant="outline">{photos.length} fotos</Badge>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={currentPhoto?.url || "/placeholder.svg"}
                  alt={currentPhoto?.description}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Controles do carrossel */}
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="sm" onClick={prevPhoto} disabled={photos.length <= 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="text-center">
                  <p className="font-medium">{currentPhoto?.description}</p>
                  <p className="text-sm text-gray-600">
                    Foto {currentPhotoIndex + 1} de {photos.length}
                  </p>
                </div>

                <Button variant="outline" size="sm" onClick={nextPhoto} disabled={photos.length <= 1}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Indicadores */}
              <div className="flex justify-center space-x-2 mb-4">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentPhotoIndex ? "bg-blue-600" : "bg-gray-300"}`}
                    onClick={() => setCurrentPhotoIndex(index)}
                  />
                ))}
              </div>

              {/* Ações */}
              <div className="flex justify-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleDownload(currentPhoto?.id || "")}>
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
                {userType === "admin" && (
                  <Button size="sm" variant="outline" onClick={handleUpload}>
                    <Upload className="h-4 w-4 mr-1" />
                    Adicionar Fotos
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Miniaturas */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 ${
                index === currentPhotoIndex ? "border-blue-600" : "border-gray-200"
              }`}
            >
              <img
                src={photo.url || "/placeholder.svg"}
                alt={photo.description}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Galeria de Fotos por Data</h2>
        {userType === "admin" && (
          <Button onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Adicionar Fotos
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(photosByDate).map(([date, photos]) => (
          <Card
            key={date}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleDateSelect(date)}
          >
            <div className="aspect-video bg-gray-100">
              <img
                src={photos[0]?.url || "/placeholder.svg"}
                alt={`Fotos de ${date}`}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{new Date(date).toLocaleDateString("pt-BR")}</h4>
                <Badge variant="outline">{photos.length} fotos</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">{photos[0]?.description}</p>
              <Button size="sm" variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-1" />
                Ver Fotos
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
