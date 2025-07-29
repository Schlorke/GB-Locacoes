'use client';

import { toast } from '@/hooks/use-toast';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Link, Upload } from 'lucide-react';
import type * as React from 'react';
import { useState } from 'react';
import { Button } from './button';
import { CloseButton } from './close-button';
import { Input } from './input';
import { Label } from './label';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (_images: string[]) => void;
  maxImages?: number;
}

interface SortableImageProps {
  id: string;
  url: string;
  index: number;
  onRemove: () => void;
  isPrincipal: boolean;
  isDragActive: boolean;
}

function DropIndicator() {
  return (
    <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500 border-dashed rounded-lg flex items-center justify-center z-30 animate-pulse">
      <div className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg">
        Solte aqui para reordenar
      </div>
    </div>
  );
}

function SortableImage({
  id,
  url,
  index,
  onRemove,
  isPrincipal,
  isDragActive: _isDragActive,
}: SortableImageProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
    scale: isDragging ? '1.05' : '1',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Main Container */}
      <div
        className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${isDragging ? 'shadow-xl border-blue-500' : ''}`}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className={`absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-black/20 backdrop-blur-sm rounded p-1 ${isDragging ? 'opacity-100' : ''}`}
        >
          <GripVertical className="h-4 w-4 text-white" />
        </div>

        {/* Image Container */}
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img
            src={url || '/placeholder.svg'}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg?height=120&width=200';
            }}
          />
        </div>

        {/* Principal Badge */}
        {isPrincipal && (
          <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
            Principal
          </div>
        )}

        {/* Order Number */}
        <div className="absolute top-2 right-2 bg-gray-900/70 text-white text-xs px-2 py-1 rounded-md font-medium z-10">
          #{index + 1}
        </div>

        {/* Drop Indicator - shown when dragging over this item */}
        {_isDragActive && isOver && !isDragging && <DropIndicator />}
      </div>

      {/* Remove Button - Outside the overflow-hidden container */}
      <CloseButton
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white hover:bg-red-600 z-20"
        onClick={onRemove}
        size="sm"
      />
    </div>
  );
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((_url, index) => `image-${index}` === active.id);
      const newIndex = images.findIndex((_url, index) => `image-${index}` === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onImagesChange(arrayMove(images, oldIndex, newIndex));
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: 'Limite excedido',
        description: `Máximo de ${maxImages} imagens permitidas`,
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);
        } else {
          const error = await response.json();
          throw new Error(error.error || 'Erro no upload');
        }
      }

      onImagesChange([...images, ...uploadedUrls]);
      toast({
        title: 'Upload concluído',
        description: `${uploadedUrls.length} imagem(ns) enviada(s) com sucesso`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Erro no upload',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;

    if (images.length >= maxImages) {
      toast({
        title: 'Limite excedido',
        description: `Máximo de ${maxImages} imagens permitidas`,
        variant: 'destructive',
      });
      return;
    }

    // Validação básica de URL
    try {
      new URL(urlInput);
      onImagesChange([...images, urlInput.trim()]);
      setUrlInput('');
    } catch {
      toast({
        title: 'URL inválida',
        description: 'Por favor, insira uma URL válida',
        variant: 'destructive',
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div
      className="space-y-4 rounded-lg p-5 border shadow-sm min-h-[200px]"
      style={{
        backgroundColor: 'hsl(210, 40%, 96%)',
        borderColor: '#e2e8f0',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }}
    >
      {/* Upload de arquivos */}
      <div>
        <Label htmlFor="file-upload" className="block text-sm font-medium mb-2">
          Upload de Imagens
        </Label>
        <div className="flex items-start">
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={isUploading || images.length >= maxImages}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isUploading || images.length >= maxImages}
            className="w-fit px-4 hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
          >
            <Upload className="h-4 w-4 mr-2 group-hover:text-orange-500 transition-colors duration-200" />
            <span className="group-hover:text-orange-500 transition-colors duration-200">
              {isUploading ? 'Enviando...' : 'Escolher Arquivos'}
            </span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3" style={{ lineHeight: '0.5rem' }}>
          JPG, PNG ou WebP. Máximo 5MB por arquivo.
        </p>
      </div>

      {/* URL de imagem */}
      <div>
        <Label htmlFor="url-input" className="block text-sm font-medium mb-2">
          Ou adicionar por URL
        </Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleUrlAdd}
            disabled={!urlInput.trim() || images.length >= maxImages}
            className="w-fit px-4 hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
          >
            <Link className="h-4 w-4 mr-2 group-hover:text-orange-500 transition-colors duration-200" />
            <span className="group-hover:text-orange-500 transition-colors duration-200">
              Adicionar
            </span>
          </Button>
          <Input
            id="url-input"
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            disabled={images.length >= maxImages}
            className="flex-1 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Preview das imagens com drag and drop */}
      {images.length > 0 && (
        <div className="space-y-2">
          <Label className="block text-sm font-medium">
            Imagens ({images.length}/{maxImages})
          </Label>
          <p className="text-xs text-muted-foreground">
            Arraste as imagens para reordenar. A primeira imagem será a principal.
          </p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((_, index) => `image-${index}`)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((url, index) => (
                  <SortableImage
                    key={`image-${index}`}
                    id={`image-${index}`}
                    url={url}
                    index={index}
                    onRemove={() => removeImage(index)}
                    isPrincipal={index === 0}
                    isDragActive={activeId !== null}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
