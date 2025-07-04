'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Eye, Edit, Trash2, Package, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Equipment {
  id: string;
  name: string;
  description?: string;
  dailyPrice: number;
  weeklyPrice?: number;
  monthlyPrice?: number;
  available: boolean;
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  // const [isFilterOpen, setIsFilterOpen] = useState(false); // Removido - não utilizado

  useEffect(() => {
    fetchEquipments();
    fetchCategories();
  }, []);

  const fetchEquipments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/equipments');
      if (response.ok) {
        const data = await response.json();
        // The API returns an object with an `equipments` array and pagination
        // info. We only need the equipments list here.
        const equipmentsData = Array.isArray(data) ? data : data.equipments;
        setEquipments(equipmentsData);
      } else {
        toast.error('Erro ao carregar equipamentos');
      }
    } catch (error) {
      console.error('Error fetching equipments:', error);
      toast.error('Erro ao carregar equipamentos');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const deleteEquipment = async (equipmentId: string) => {
    if (
      !confirm('Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.')
    )
      return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/equipments/${equipmentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Equipamento excluído com sucesso');
        fetchEquipments();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Erro ao excluir equipamento');
      }
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast.error('Erro ao excluir equipamento');
    } finally {
      setIsDeleting(false);
    }
  };

  // Garantir que equipments é sempre um array antes de filtrar
  const safeEquipments = Array.isArray(equipments) ? equipments : [];
  const filteredEquipments = safeEquipments.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || equipment.category?.id === selectedCategory;
    const matchesAvailability =
      availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && equipment.available) ||
      (availabilityFilter === 'unavailable' && !equipment.available);

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  if (isLoading && equipments.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] sm:h-[60vh] lg:h-[calc(100vh-150px)]">
        <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">Equipamentos</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Gerencie o catálogo de equipamentos para locação.
          </p>
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Button
            asChild
            className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 h-10 px-4"
            size="sm"
          >
            <Link href="/admin/equipamentos/novo">
              <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Novo Equipamento</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Pesquisar equipamentos
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Pesquisar equipamentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
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
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Disponibilidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="available">Disponíveis</SelectItem>
                  <SelectItem value="unavailable">Indisponíveis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Package className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="truncate">Lista de Equipamentos</span>
            <Badge variant="secondary" className="ml-auto">
              {filteredEquipments.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {isLoading && equipments.length > 0 && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}
          {!isLoading && filteredEquipments.length === 0 && equipments.length === 0 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <Package className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-lg sm:text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                Nenhum equipamento encontrado.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
                Adicione seu primeiro equipamento para começar a gerenciar o catálogo.
              </p>
              <div className="flex justify-center">
                <Button
                  asChild
                  className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 h-10 px-4"
                  size="sm"
                >
                  <Link href="/admin/equipamentos/novo">
                    <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Adicionar Primeiro Equipamento</span>
                  </Link>
                </Button>
              </div>
            </div>
          ) : !isLoading && filteredEquipments.length === 0 ? (
            <div className="text-center py-8 px-4">
              <AlertCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-600 mb-2">
                Nenhum equipamento encontrado
              </p>
              <p className="text-sm text-gray-400">Tente ajustar os filtros de pesquisa</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px] sm:w-[250px]">Nome</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[120px]">Categoria</TableHead>
                    <TableHead className="hidden lg:table-cell w-[120px]">Preço Diário</TableHead>
                    <TableHead className="w-[100px] text-center">Status</TableHead>
                    <TableHead className="w-[120px] text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipments.map((equipment) => (
                    <TableRow key={equipment.id}>
                      <TableCell className="p-2 sm:p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {equipment.images.length > 0 ? (
                              <img
                                src={equipment.images[0] || '/placeholder.svg'}
                                alt={equipment.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">{equipment.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {equipment.description || 'Sem descrição'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell p-2 sm:p-4">
                        {equipment.category ? (
                          <Badge
                            className="text-xs"
                            style={{
                              backgroundColor: equipment.category.bgColor || '#e0e0e0',
                              color: equipment.category.fontColor || '#000000',
                            }}
                          >
                            {equipment.category.name}
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">Sem categoria</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell p-2 sm:p-4">
                        <span className="font-bold text-green-600 text-sm">
                          R$ {equipment.dailyPrice.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center p-2 sm:p-4">
                        <Badge
                          variant={equipment.available ? 'default' : 'secondary'}
                          className={`text-xs ${
                            equipment.available
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-red-100 text-red-800 border-red-200'
                          }`}
                        >
                          {equipment.available ? 'Disponível' : 'Indisponível'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right p-2 sm:p-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            aria-label="Visualizar"
                            className="h-8 w-8"
                          >
                            <Link href={`/admin/equipamentos/${equipment.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            aria-label="Editar"
                            className="h-8 w-8"
                          >
                            <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteEquipment(equipment.id)}
                            className="text-red-500 hover:text-red-600 h-8 w-8"
                            disabled={isDeleting}
                            aria-label="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
