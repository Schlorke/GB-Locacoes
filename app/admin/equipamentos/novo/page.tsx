'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyInput } from '@/components/ui/currency-input';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, PlusCircle, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type * as React from 'react';
import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface FormData {
  name: string;
  description: string;
  pricePerDay: number;
  categoryId: string;
  images: string[];
  isAvailable: boolean;
  specifications?: Record<string, string>;
}

export default function NovoEquipamento() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    pricePerDay: 0,
    categoryId: '',
    images: [],
    isAvailable: true,
    specifications: {},
  });
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar categorias.',
        variant: 'destructive',
      });
    }
  };

  const handleAddSpecification = () => {
    if (specKey && specValue) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: specValue,
        },
      }));
      setSpecKey('');
      setSpecValue('');
    } else {
      toast({
        title: 'Atenção',
        description: 'Preencha a chave e o valor da especificação.',
        variant: 'default',
      });
    }
  };

  const handleRemoveSpecification = (keyToRemove: string) => {
    setFormData((prev) => {
      const newSpecifications = { ...prev.specifications };
      delete newSpecifications[keyToRemove];
      return { ...prev, specifications: newSpecifications };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.categoryId ||
      formData.pricePerDay <= 0
    ) {
      toast({
        title: 'Erro de Validação',
        description: 'Preencha todos os campos obrigatórios (*). O preço deve ser maior que zero.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.images.length === 0) {
      toast({
        title: 'Erro de Validação',
        description: 'Adicione pelo menos uma imagem do equipamento.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/equipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Sucesso!',
          description: 'Equipamento criado com sucesso.',
        });
        router.push('/admin/equipamentos');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar equipamento');
      }
    } catch (error) {
      console.error('Erro ao criar equipamento:', error);
      toast({
        title: 'Erro',
        description:
          error instanceof Error ? error.message : 'Ocorreu um erro ao criar o equipamento.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header com gradiente */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
          {/* Clean depth layers without decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white"
              >
                <Link href="/admin/equipamentos">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Voltar</span>
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                  Novo Equipamento
                </h1>
                <p className="text-orange-50 font-medium">
                  Adicione um novo equipamento ao catálogo de locação
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
              <Package className="w-5 h-5 text-orange-50" />
              <span className="font-semibold text-white">Preencha os dados do equipamento</span>
            </div>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nome do Equipamento *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Betoneira 400L"
                    required
                    className="mt-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Categoria *
                  </Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, categoryId: value }))
                    }
                    required
                  >
                    <SelectTrigger className="mt-2 border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Selecione uma categoria" />
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
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Descrição *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Descreva as características e usos do equipamento..."
                  rows={4}
                  required
                  className="mt-2 border-gray-200 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="pricePerDay" className="text-sm font-medium text-gray-700">
                    Preço por Dia (R$) *
                  </Label>
                  <CurrencyInput
                    id="pricePerDay"
                    value={formData.pricePerDay}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, pricePerDay: value || 0 }))
                    }
                    required
                    className="mt-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-3 pt-8">
                  <Switch
                    id="isAvailable"
                    checked={formData.isAvailable}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isAvailable: checked }))
                    }
                  />
                  <Label htmlFor="isAvailable" className="cursor-pointer text-sm text-gray-700">
                    Equipamento disponível para locação
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* Imagens do Equipamento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Imagens do Equipamento
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <ImageUpload
                images={formData.images}
                onImagesChange={(images) => setFormData((prev) => ({ ...prev, images }))}
                maxImages={5}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Especificações Técnicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Especificações Técnicas (Opcional)
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              {Object.entries(formData.specifications || {}).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50/50"
                >
                  <div>
                    <span className="font-medium text-gray-900">{key}:</span>{' '}
                    <span className="text-gray-700">{String(value)}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSpecification(key)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex flex-col md:flex-row items-end gap-3">
                <div className="flex-1 w-full">
                  <Label htmlFor="specKey" className="text-sm font-medium text-gray-700">
                    Nome da Especificação
                  </Label>
                  <Input
                    id="specKey"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                    placeholder="Ex: Peso"
                    className="mt-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="flex-1 w-full">
                  <Label htmlFor="specValue" className="text-sm font-medium text-gray-700">
                    Valor
                  </Label>
                  <Input
                    id="specValue"
                    value={specValue}
                    onChange={(e) => setSpecValue(e.target.value)}
                    placeholder="Ex: 150kg"
                    className="mt-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddSpecification}
                  className="w-full md:w-auto border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Botões de Ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-end gap-3 pt-4"
        >
          <Button
            variant="outline"
            type="button"
            asChild
            className="w-full sm:w-auto border-gray-200 hover:bg-gray-50"
          >
            <Link href="/admin/equipamentos">Cancelar</Link>
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salvar Equipamento'}
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
