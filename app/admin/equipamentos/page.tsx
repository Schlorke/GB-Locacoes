'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  DollarSign,
  Edit,
  Eye,
  Loader2,
  Package,
  Plus,
  Search,
  Trash2,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface Equipment {
  id: string;
  name: string;
  description?: string;
  pricePerDay: number;
  isAvailable: boolean;
  category?: {
    id: string;
    name: string;
    bgColor?: string;
    fontColor?: string;
  };
  images: string[];
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  bgColor?: string;
  fontColor?: string;
}

export default function AdminEquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const fetchEquipments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/equipments');
      if (response.ok) {
        const data = await response.json();
        const equipmentsData = Array.isArray(data) ? data : data.equipments;
        setEquipments(equipmentsData);
      } else {
        toast({
          title: 'Erro',
          description: 'Erro ao carregar equipamentos',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching equipments:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar equipamentos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const filterEquipments = useCallback(() => {
    const filtered = equipments.filter((equipment) => {
      const matchesSearch =
        equipment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || equipment.category?.id === selectedCategory;

      const matchesAvailability =
        availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && equipment.isAvailable) ||
        (availabilityFilter === 'unavailable' && !equipment.isAvailable);

      return matchesSearch && matchesCategory && matchesAvailability;
    });

    setFilteredEquipments(filtered);
  }, [equipments, searchTerm, selectedCategory, availabilityFilter]);

  useEffect(() => {
    fetchEquipments();
    fetchCategories();
  }, [fetchEquipments, fetchCategories]);

  useEffect(() => {
    filterEquipments();
  }, [filterEquipments]);

  const deleteEquipment = async (equipmentId: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/equipments/${equipmentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast({
          title: 'Sucesso',
          description: 'Equipamento excluído com sucesso',
        });
        fetchEquipments();
      } else {
        const errorData = await response.json();
        toast({
          title: 'Erro',
          description: errorData.error || 'Erro ao excluir equipamento',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao excluir equipamento',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading && equipments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando equipamentos...</span>
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
            <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
              Gerenciar Equipamentos
            </h1>
            <p className="text-orange-50 mb-4 font-medium">
              Controle todo o catálogo de equipamentos para locação
            </p>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
              <Package className="w-5 h-5 text-orange-50" />
              <span className="font-semibold text-white">
                {Array.isArray(filteredEquipments) ? filteredEquipments.length : 0} equipamentos
                encontrados
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filtros e Ações */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
          {/* Clean depth layers for filter card */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

          <CardContent className="relative z-10 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar equipamentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="unavailable">Indisponível</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                asChild
                className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                <Link href="/admin/equipamentos/novo">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Equipamento
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grid de Equipamentos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {loading && equipments.length > 0 && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Atualizando equipamentos...</span>
          </div>
        )}

        {!loading && filteredEquipments.length === 0 && equipments.length === 0 ? (
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <CardContent className="relative z-10 flex flex-col items-center justify-center py-16">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum equipamento cadastrado
              </h3>
              <p className="text-gray-500 mb-6 text-center">
                Comece adicionando o primeiro equipamento ao catálogo
              </p>
              <Button
                asChild
                className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                <Link href="/admin/equipamentos/novo">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Equipamento
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : !loading && filteredEquipments.length === 0 ? (
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <CardContent className="relative z-10 flex flex-col items-center justify-center py-16">
              <div className="bg-orange-100 rounded-full p-4 mb-4">
                <AlertCircle className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum equipamento encontrado
              </h3>
              <p className="text-gray-500 text-center">
                Tente ajustar os filtros para encontrar os equipamentos desejados
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredEquipments.map((equipment, index) => (
                <motion.div
                  key={equipment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full">
                    {/* Clean depth layers for equipment card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

                    <CardHeader className="relative z-10 pb-3">
                      <div className="flex flex-col">
                        {/* Imagem do equipamento */}
                        <div className="w-full h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                          {equipment.images && equipment.images.length > 0 ? (
                            <Image
                              src={equipment.images[0]}
                              alt={equipment.name}
                              width={300}
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-16 h-16 text-gray-300" />
                            </div>
                          )}
                        </div>

                        <div className="text-left w-full">
                          <h3 className="font-semibold text-lg text-gray-900 truncate">
                            {equipment.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {equipment.description || 'Sem descrição'}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10 pt-0 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Categoria */}
                        {equipment.category && (
                          <div className="flex items-center gap-2">
                            <Badge
                              className="text-xs"
                              style={{
                                backgroundColor: equipment.category.bgColor || '#e0e0e0',
                                color: equipment.category.fontColor || '#000000',
                              }}
                            >
                              {equipment.category.name}
                            </Badge>
                          </div>
                        )}

                        {/* Preço */}
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="font-bold text-green-600">
                            {formatPrice(equipment.pricePerDay)}/dia
                          </span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 text-sm">
                          {equipment.isAvailable ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-green-600 font-medium">Disponível</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                              <span className="text-red-600 font-medium">Indisponível</span>
                            </>
                          )}
                        </div>

                        {/* Data de criação */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">
                            Criado em {formatDate(equipment.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Botões de ação */}
                      <div className="flex items-center justify-end gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" asChild className="flex-shrink-0">
                          <Link href={`/admin/equipamentos/${equipment.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="flex-shrink-0">
                          <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteEquipment(equipment.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
