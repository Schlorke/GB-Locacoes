'use client';

import { AdminFilterCard } from '@/components/admin/admin-filter-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building,
  Container,
  Hammer,
  HardHat,
  Loader2,
  Package,
  Search,
  Shield,
  Star,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Icon mapping
const iconMap = {
  Package,
  Building,
  Container,
  Hammer,
  HardHat,
  Shield,
  Truck,
  Wrench,
  Zap,
};

interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
}

interface Equipment {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  images: string[];
  category: {
    id: string;
    name: string;
    color?: string;
    bgColor?: string;
    fontColor?: string;
    icon?: string;
    iconColor?: string;
  };
  isAvailable: boolean;
  reviews?: Review[];
}

interface Category {
  id: string;
  name: string;
  bgColor?: string;
  fontColor?: string;
  icon?: string;
  iconColor?: string;
}

export default function EquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Função para renderizar ícones dinamicamente
  const renderIcon = (iconName?: string, color?: string) => {
    if (!iconName) return null;

    try {
      const IconComponent = iconMap[iconName as keyof typeof iconMap];
      if (IconComponent && typeof IconComponent === 'function') {
        return <IconComponent size={14} color={color || 'currentColor'} className="mr-1.5" />;
      }
    } catch (_error) {
      // Fallback se o ícone não existir
      return <Package size={14} color={color || 'currentColor'} className="mr-1.5" />;
    }

    // Fallback se o ícone não for encontrado
    return <Package size={14} color={color || 'currentColor'} className="mr-1.5" />;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Garantir que equipments é sempre um array
    const safeEquipments = Array.isArray(equipments) ? equipments : [];
    let filtered = safeEquipments;

    if (searchTerm) {
      filtered = filtered.filter(
        (eq) =>
          eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          eq.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((eq) => eq.category.id === categoryFilter);
    }

    setFilteredEquipments(filtered);
  }, [searchTerm, categoryFilter, equipments]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [equipmentsRes, categoriesRes] = await Promise.all([
        fetch('/api/equipments'),
        fetch('/api/categories'),
      ]);

      if (!equipmentsRes.ok) {
        throw new Error(`Erro ao carregar equipamentos: ${equipmentsRes.status}`);
      }
      if (!categoriesRes.ok) {
        throw new Error(`Erro ao carregar categorias: ${categoriesRes.status}`);
      }

      const equipmentsData = await equipmentsRes.json();
      const categoriesData = await categoriesRes.json();

      const equipmentsList: Equipment[] = Array.isArray(equipmentsData) ? equipmentsData : [];
      const categoriesList: Category[] = Array.isArray(categoriesData) ? categoriesData : [];

      setEquipments(equipmentsList);
      setFilteredEquipments(equipmentsList);
      setCategories(categoriesList);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Carregando equipamentos...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-red-100 rounded-full p-4 mb-4 w-fit mx-auto">
            <Package className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Erro ao carregar equipamentos
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchData} className="hover:scale-105 transition-transform duration-200">
            Tentar Novamente
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header com gradiente */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            {/* Clean depth layers without decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                Catálogo de Equipamentos
              </h1>
              <p className="text-orange-50 mb-4 font-medium">
                Encontre o equipamento ideal para sua obra
              </p>
              <div className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit mx-auto">
                <Search className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  {Array.isArray(filteredEquipments) ? filteredEquipments.length : 0} equipamentos
                  encontrados
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <AdminFilterCard
            searchPlaceholder="Buscar equipamentos..."
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            filters={[
              {
                label: 'Categoria',
                value: categoryFilter,
                onValueChange: setCategoryFilter,
                placeholder: 'Categoria',
                options: [
                  { value: 'all', label: 'Todas as categorias' },
                  ...categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  })),
                ],
              },
            ]}
          />
        </motion.div>

        {/* Grid de Equipamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filteredEquipments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredEquipments.map((equipment, index) => {
                  const averageRating =
                    equipment.reviews && equipment.reviews.length > 0
                      ? equipment.reviews.reduce((acc, review) => acc + review.rating, 0) /
                        equipment.reviews.length
                      : 0;
                  const reviewCount = equipment.reviews ? equipment.reviews.length : 0;

                  return (
                    <motion.div
                      key={equipment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full hover:scale-[1.02] flex flex-col">
                        {/* Clean depth layers for equipment card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

                        <div className="relative h-48 bg-gray-200 z-0">
                          <Image
                            src={equipment.images?.[0] || '/placeholder.svg?height=200&width=300'}
                            alt={equipment.name}
                            fill
                            className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                          />
                          {!equipment.isAvailable && (
                            <div className="absolute top-3 right-3">
                              <Badge
                                variant="destructive"
                                className="bg-red-500/90 backdrop-blur-sm"
                              >
                                Indisponível
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardContent className="flex-1 p-4 relative z-0 flex flex-col">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                            {equipment.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {equipment.description}
                          </p>

                          <div className="flex items-center gap-2 mb-4">
                            {reviewCount > 0 ? (
                              <>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">
                                    {averageRating.toFixed(1)}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  ({reviewCount} {reviewCount === 1 ? 'avaliação' : 'avaliações'})
                                </span>
                              </>
                            ) : (
                              <span className="text-sm text-gray-500">Nenhuma avaliação</span>
                            )}
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-bold text-orange-600">
                                R$ {equipment.pricePerDay?.toFixed(2) || '0.00'}
                                <span className="text-sm font-normal text-gray-500">/dia</span>
                              </div>
                              <Badge
                                variant="secondary"
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors backdrop-blur-sm"
                                style={{
                                  backgroundColor: equipment.category?.bgColor || '#f3f4f6',
                                  color: equipment.category?.fontColor || '#374151',
                                  borderColor: 'transparent',
                                }}
                              >
                                {renderIcon(
                                  equipment.category?.icon,
                                  equipment.category?.iconColor || equipment.category?.fontColor,
                                )}
                                {equipment.category?.name || 'Sem categoria'}
                              </Badge>
                            </div>
                          </div>

                          <div className="mt-auto"></div>
                        </CardContent>

                        <CardFooter className="p-4 pt-0 relative z-0">
                          <div className="flex flex-col gap-2 w-full">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="w-full bg-transparent border-gray-200 hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
                            >
                              <Link href={`/equipamentos/${equipment.id}`}>
                                <span className="group-hover:text-orange-500 transition-colors duration-200">
                                  Ver Detalhes
                                </span>
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              disabled={!equipment.isAvailable}
                              asChild={equipment.isAvailable}
                              className="w-full hover:scale-105 transition-transform duration-200"
                            >
                              {equipment.isAvailable ? (
                                <Link href={`/orcamento?equipmentId=${equipment.id}`}>
                                  Solicitar Orçamento
                                </Link>
                              ) : (
                                <span>Indisponível</span>
                              )}
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <CardContent className="relative z-0 flex flex-col items-center justify-center py-16">
                <div className="bg-orange-100 rounded-full p-4 mb-4">
                  <Package className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum equipamento encontrado
                </h3>
                <p className="text-gray-500 text-center">
                  {equipments.length === 0
                    ? 'Nosso catálogo está sendo atualizado. Volte em breve!'
                    : 'Tente ajustar os filtros para encontrar outros equipamentos.'}
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
