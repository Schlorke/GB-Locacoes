'use client';

import type * as React from 'react';
import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { toast } from '@/hooks/use-toast';
import { Upload, Link } from 'lucide-react';
import { CloseButton } from './close-button';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (_images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');

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
    <div className="space-y-4">
      {/* Upload de arquivos */}
      <div>
        <Label htmlFor="file-upload" className="block text-sm font-medium mb-2">
          Upload de Imagens
        </Label>
        <div className="flex items-center gap-2">
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
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Enviando...' : 'Escolher Arquivos'}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          JPG, PNG ou WebP. Máximo 5MB por arquivo.
        </p>
      </div>

      {/* URL de imagem */}
      <div>
        <Label htmlFor="url-input" className="block text-sm font-medium mb-2">
          Ou adicionar por URL
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="url-input"
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            disabled={images.length >= maxImages}
            className="flex-1 focus:border-blue-500"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleUrlAdd}
            disabled={!urlInput.trim() || images.length >= maxImages}
          >
            <Link className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>

      {/* Preview das imagens */}
      {images.length > 0 && (
        <div className="space-y-2">
          <Label className="block text-sm font-medium">
            Imagens ({images.length}/{maxImages})
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden border">
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
                <CloseButton
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white hover:bg-red-600"
                  onClick={() => removeImage(index)}
                  size="sm"
                />
                {index === 0 && (
                  <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                    Principal
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
