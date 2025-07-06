'use client';

import type React from 'react';

import { useState, useCallback } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Calendar, Eye, Download, Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import PhotoSection from './section-photos';

interface Photo {
    id: string;
    fileName: string;
    extractedDate: string;
    uploadDate: string;
    size: string;
    url: string;
    projectId: string;
}

interface EnhancedPhotoUploadProps {
    projectId: string;
    projectName: string;
}

export function EnhancedPhotoUpload({
    projectId,
    projectName,
}: EnhancedPhotoUploadProps) {
    const [photos, setPhotos] = useState<Photo[]>([
        {
            id: '1',
            fileName: 'obra_2024-03-01_001.jpg',
            extractedDate: '2024-03-01',
            uploadDate: '2024-03-01T10:30:00',
            size: '2.3 MB',
            url: '/placeholder.svg?height=200&width=300&text=Obra+01/03',
            projectId: '1',
        },
        {
            id: '2',
            fileName: 'progresso_2024-02-28_estrutura.jpg',
            extractedDate: '2024-02-28',
            uploadDate: '2024-02-28T15:45:00',
            size: '1.8 MB',
            url: '/placeholder.svg?height=200&width=300&text=Estrutura+28/02',
            projectId: '1',
        },
    ]);

    const pathname = usePathname();

    const showCard = !pathname.startsWith('/cliente');

    const [dragActive, setDragActive] = useState(false);

    // Filtrar fotos por projeto
    const projectPhotos = photos.filter(
        (photo) => photo.projectId === projectId
    );

    // Extrair data do nome do arquivo
    const extractDateFromFileName = (fileName: string): string => {
        // Procurar por padrões de data no nome do arquivo
        const datePatterns = [
            /(\d{4}-\d{2}-\d{2})/, // YYYY-MM-DD
            /(\d{2}-\d{2}-\d{4})/, // DD-MM-YYYY
            /(\d{4}_\d{2}_\d{2})/, // YYYY_MM_DD
            /(\d{2}_\d{2}_\d{4})/, // DD_MM_YYYY
        ];

        for (const pattern of datePatterns) {
            const match = fileName.match(pattern);
            if (match) {
                let dateStr = match[1];
                // Converter para formato padrão YYYY-MM-DD
                if (dateStr.includes('_')) {
                    dateStr = dateStr.replace(/_/g, '-');
                }
                // Se estiver no formato DD-MM-YYYY, converter para YYYY-MM-DD
                if (dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) {
                    const parts = dateStr.split('-');
                    dateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
                }
                return dateStr;
            }
        }

        // Se não encontrar data no nome, usar data atual
        return new Date().toISOString().split('T')[0];
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    }, []);

    const handleFiles = (files: FileList) => {
        Array.from(files).forEach((file) => {
            if (file.type.startsWith('image/')) {
                const extractedDate = extractDateFromFileName(file.name);
                const newPhoto: Photo = {
                    id:
                        Date.now().toString() +
                        Math.random().toString(36).substr(2, 9),
                    fileName: file.name,
                    extractedDate,
                    uploadDate: new Date().toISOString(),
                    size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                    url: URL.createObjectURL(file),
                    projectId,
                };
                setPhotos((prev) => [...prev, newPhoto]);
            }
        });
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const deletePhoto = (id: string) => {
        if (confirm('Tem certeza que deseja excluir esta foto?')) {
            setPhotos(photos.filter((photo) => photo.id !== id));
        }
    };

    const downloadPhoto = (photo: Photo) => {
        const link = document.createElement('a');
        link.href = photo.url;
        link.download = photo.fileName;
        link.click();
    };

    // Agrupar fotos por data extraída
    const photosByDate = projectPhotos.reduce((acc, photo) => {
        const date = photo.extractedDate;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(photo);
        return acc;
    }, {} as Record<string, Photo[]>);

    return (
        <div className="space-y-6">
          {showCard && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Camera className="h-5 w-5 mr-2 text-purple-600" />
                        Upload de Fotos - {projectName}
                    </CardTitle>
                    <CardDescription>
                        As datas são extraídas automaticamente dos nomes dos
                        arquivos
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                            dragActive
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Adicione fotos da obra
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Arraste as fotos aqui ou clique para selecionar
                        </p>
                        <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileInput}
                            className="hidden"
                            id="photo-upload"
                        />
                        <Label htmlFor="photo-upload">
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Selecionar Fotos
                            </Button>
                        </Label>
                        <p className="text-xs text-gray-500 mt-2">
                            JPG, PNG até 5MB cada. A data será extraída do nome
                            do arquivo.
                        </p>
                        <div className="mt-4 text-xs text-gray-600">
                            <p className="font-medium">
                                Formatos de data suportados no nome:
                            </p>
                            <p>• YYYY-MM-DD (ex: obra_2024-03-01_001.jpg)</p>
                            <p>• DD-MM-YYYY (ex: foto_01-03-2024.jpg)</p>
                            <p>• YYYY_MM_DD (ex: progresso_2024_03_01.jpg)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          )}
            
            {/* Fotos Agrupadas por Data */}
            <PhotoSection/>
        </div>
    );
}
