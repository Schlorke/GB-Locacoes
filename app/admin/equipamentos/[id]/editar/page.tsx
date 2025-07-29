'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyInput } from '@/components/ui/currency-input';
import { CustomSelect, CustomSelectItem } from '@/components/ui/custom-select';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Package, PlusCircle, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface _Equipment {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  categoryId: string;
  images: string[];
  isAvailable: boolean;
  specifications?: Record<string, string>;
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

export default function EditarEquipamento() {
  const params = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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
    if (!params.id) return;

    const fetchEquipment = async (id: string) => {
      try {
        const response = await fetch(`/api/admin/equipments/${id}`);
        if (response.ok) {
          const equipment = await response.json();
          setFormData({
            name: equipment.name || '',
            description: equipment.description || '',
            pricePerDay: equipment.pricePerDay || 0,
            categoryId: equipment.categoryId || '',
            images: equipment.images || [],
            isAvailable: equipment.available ?? true,
          });
        }
      } catch (error) {
        console.error('Erro ao buscar equipamento:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipment(params.id as string);
    fetchCategories();
  }, [params.id]);

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

    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/equipments/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Sucesso!',
          description: 'Equipamento atualizado com sucesso.',
        });
        router.push('/admin/equipamentos');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar equipamento');
      }
    } catch (error) {
      console.error('Erro ao atualizar equipamento:', error);
      toast({
        title: 'Erro',
        description:
          error instanceof Error ? error.message : 'Ocorreu um erro ao atualizar o equipamento.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Carregando equipamento...</p>
        </div>
      </div>
    );
  }

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
                  Editar Equipamento
                </h1>
                <p className="text-orange-50 font-medium">Atualize as informações do equipamento</p>
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
                Dados do Equipamento
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Atualize as informações necessárias do equipamento
              </p>
            </CardHeader>
            <CardContent className="relative z-10 space-y-8">
              {/* Layout Principal: Informações Básicas + Especificações (Esquerda) + Imagens (Direita) */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Coluna Esquerda: Informações Básicas + Especificações Técnicas */}
                <div className="space-y-8">
                  {/* Seção: Informações Básicas */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">1</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Informações Básicas</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium">
                          Nome do Equipamento *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder="Ex: Betoneira 400L"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category" className="text-sm font-medium">
                          Categoria *
                        </Label>
                        <CustomSelect
                          value={formData.categoryId}
                          onValueChange={(value: string) =>
                            setFormData((prev) => ({ ...prev, categoryId: value }))
                          }
                          placeholder="Selecione uma categoria"
                        >
                          {categories.map((category) => (
                            <CustomSelectItem key={category.id} value={category.id}>
                              {category.name}
                            </CustomSelectItem>
                          ))}
                        </CustomSelect>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-sm font-medium">
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
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="pricePerDay" className="text-sm font-medium">
                          Preço por Dia (R$) *
                        </Label>
                        <CurrencyInput
                          id="pricePerDay"
                          value={formData.pricePerDay}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, pricePerDay: value || 0 }))
                          }
                          required
                          className="mt-1"
                        />
                      </div>

                      <div className="flex items-center space-x-3 pt-2">
                        <Switch
                          id="isAvailable"
                          checked={formData.isAvailable}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, isAvailable: checked }))
                          }
                          className="data-[state=checked]:bg-slate-700 data-[state=unchecked]:bg-input hover:data-[state=checked]:bg-slate-600 transition-colors duration-200"
                        />
                        <Label htmlFor="isAvailable" className="cursor-pointer text-sm">
                          Equipamento disponível para locação
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Seção: Especificações Técnicas */}
                  <div className="space-y-6 border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-600">3</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Especificações Técnicas</h3>
                      <span className="text-sm text-gray-500">(Opcional)</span>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(formData.specifications || {}).length > 0 && (
                        <div className="space-y-3">
                          {Object.entries(formData.specifications || {}).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between p-3 border rounded-md"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-sm">{key}</div>
                                <div className="text-sm mt-1">{String(value)}</div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveSpecification(key)}
                                className="flex-shrink-0 ml-2"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <Label htmlFor="specKey" className="text-sm font-medium">
                                Nome da Especificação
                              </Label>
                              <Input
                                id="specKey"
                                value={specKey}
                                onChange={(e) => setSpecKey(e.target.value)}
                                placeholder="Ex: Peso"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="specValue" className="text-sm font-medium">
                                Valor
                              </Label>
                              <Input
                                id="specValue"
                                value={specValue}
                                onChange={(e) => setSpecValue(e.target.value)}
                                placeholder="Ex: 150kg"
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddSpecification}
                            className="w-fit px-4 bg-transparent border-gray-200 hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
                          >
                            <PlusCircle className="h-4 w-4 mr-2 group-hover:text-orange-500 transition-colors duration-200" />
                            <span className="group-hover:text-orange-500 transition-colors duration-200">
                              Adicionar Especificação
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna Direita: Imagens do Equipamento (Ocupando toda a altura) */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-green-600">2</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Imagens do Equipamento</h3>
                  </div>

                  <div className="min-h-[500px]">
                    <ImageUpload
                      images={formData.images}
                      onImagesChange={(images) => setFormData((prev) => ({ ...prev, images }))}
                      maxImages={5}
                    />
                  </div>
                </div>
              </div>

              {/* Botões de Ação - Posicionados no canto inferior direito */}
              <div className="flex justify-end pt-6 mt-8 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    type="button"
                    asChild
                    className="w-full sm:w-auto bg-transparent"
                  >
                    <Link href={`/admin/equipamentos/${params.id}`}>Cancelar</Link>
                  </Button>
                  <Button type="submit" disabled={isSaving} className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </form>
    </div>
  );
}
