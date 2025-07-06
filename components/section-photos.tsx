"use client"

import { useState, useMemo } from "react"
import { Calendar, CalendarDays, Filter, X, Eye, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data for photos
const mockPhotos = [
  {
    id: 1,
    filename: "obra_2024-03-01_001.jpg",
    size: "2.3 MB",
    uploadDate: new Date("2024-02-29"),
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    filename: "progresso_2024-02-28_estrutura.jpg",
    size: "1.8 MB",
    uploadDate: new Date("2024-02-27"),
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    filename: "fundacao_2024-02-26_001.jpg",
    size: "3.1 MB",
    uploadDate: new Date("2024-02-26"),
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    filename: "terreno_2024-02-25_preparacao.jpg",
    size: "2.7 MB",
    uploadDate: new Date("2024-02-25"),
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    filename: "projeto_2024-02-24_inicio.jpg",
    size: "1.9 MB",
    uploadDate: new Date("2024-02-24"),
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    filename: "equipamentos_2024-02-23_chegada.jpg",
    size: "2.4 MB",
    uploadDate: new Date("2024-02-23"),
    url: "/placeholder.svg?height=200&width=300",
  },
]

export default function PhotoGallery() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter photos based on selected date range
  const filteredPhotos = useMemo(() => {
    if (!dateRange.from && !dateRange.to) {
      return mockPhotos
    }

    return mockPhotos.filter((photo) => {
      const photoDate = photo.uploadDate

      if (dateRange.from && dateRange.to) {
        return photoDate >= dateRange.from && photoDate <= dateRange.to
      } else if (dateRange.from) {
        return photoDate >= dateRange.from
      } else if (dateRange.to) {
        return photoDate <= dateRange.to
      }

      return true
    })
  }, [dateRange])

  // Group photos by date
  const photosByDate = useMemo(() => {
    const grouped = filteredPhotos.reduce(
      (acc, photo) => {
        const dateKey = format(photo.uploadDate, "dd/MM/yyyy")
        if (!acc[dateKey]) {
          acc[dateKey] = []
        }
        acc[dateKey].push(photo)
        return acc
      },
      {} as Record<string, typeof mockPhotos>,
    )

    // Sort dates in descending order
    const sortedEntries = Object.entries(grouped).sort(([dateA], [dateB]) => {
      const [dayA, monthA, yearA] = dateA.split("/").map(Number)
      const [dayB, monthB, yearB] = dateB.split("/").map(Number)
      const dateObjA = new Date(yearA, monthA - 1, dayA)
      const dateObjB = new Date(yearB, monthB - 1, dayB)
      return dateObjB.getTime() - dateObjA.getTime()
    })

    return sortedEntries
  }, [filteredPhotos])

  const clearFilters = () => {
    setDateRange({ from: undefined, to: undefined })
  }

  const hasActiveFilters = dateRange.from || dateRange.to

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <Card className="w-full">
        <CardHeader className="pb-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
            

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto justify-start text-left font-normal bg-transparent"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                          {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                      )
                    ) : (
                      <span>Filtrar por data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-from">Data inicial</Label>
                      <Input
                        id="date-from"
                        type="date"
                        value={dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : ""}
                        onChange={(e) => {
                          const date = e.target.value ? new Date(e.target.value) : undefined
                          setDateRange((prev) => ({ ...prev, from: date }))
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-to">Data final</Label>
                      <Input
                        id="date-to"
                        type="date"
                        value={dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : ""}
                        onChange={(e) => {
                          const date = e.target.value ? new Date(e.target.value) : undefined
                          setDateRange((prev) => ({ ...prev, to: date }))
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDateRange({ from: undefined, to: undefined })}
                        className="flex-1"
                      >
                        Limpar
                      </Button>
                      <Button size="sm" onClick={() => setIsFilterOpen(false)} className="flex-1">
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full sm:w-auto">
                  <X className="mr-2 h-4 w-4" />
                  Limpar filtros
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
                    : dateRange.from
                      ? `A partir de ${format(dateRange.from, "dd/MM/yyyy")}`
                      : dateRange.to
                        ? `Até ${format(dateRange.to, "dd/MM/yyyy")}`
                        : ""}
                </Badge>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              {filteredPhotos.length === 0
                ? "Nenhuma foto encontrada para o período selecionado"
                : `${filteredPhotos.length} foto${filteredPhotos.length !== 1 ? "s" : ""} encontrada${filteredPhotos.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Photo Gallery */}
          {photosByDate.length === 0 ? (
            <div className="text-center py-12">
              <CalendarDays className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma foto encontrada</h3>
              <p className="text-gray-600 mb-4">Tente ajustar os filtros de data para ver mais resultados.</p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  Limpar filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {photosByDate.map(([date, photos]) => (
                <div key={date} className="space-y-4">
                  {/* Date Header */}
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">{date}</h2>
                    <Badge variant="secondary" className="text-xs">
                      {photos.length} foto{photos.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>

                  {/* Photos Grid - Enhanced Responsiveness */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4">
                    {photos.map((photo) => (
                      <div key={photo.id} className="group relative">
                        <Card className="overflow-hidden hover:shadow-md transition-all duration-200">
                          <CardContent className="p-0">
                            <div className="aspect-square relative bg-gray-200">
                              <Image
                                src={photo.url || "/placeholder.svg"}
                                alt={photo.filename}
                                fill
                                className="object-cover"
                                sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16vw, 12vw"
                              />

                              {/* Action Buttons Overlay */}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                <div className="flex gap-1 sm:gap-2">
                                  <Button
                                    size="sm"
                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={() => {
                                      console.log("View photo:", photo.filename)
                                    }}
                                  >
                                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={() => {
                                      console.log("Download photo:", photo.filename)
                                    }}
                                  >
                                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={() => {
                                      console.log("Delete photo:", photo.filename)
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Photo Info - Outside the card, below the image */}
                        <div className="mt-2 space-y-1 px-1">
                          <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate" title={photo.filename}>
                            {photo.filename}
                          </h3>
                          <p className="text-xs text-gray-600">{photo.size}</p>
                          <p className="text-xs text-blue-600">
                            Upload: {format(photo.uploadDate, "dd/MM/yyyy", { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
