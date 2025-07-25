'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Grid3X3,
  List,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  SortAsc,
  SortDesc,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';

interface Equipment {
  id: string;
  name: string;
  description: string;
  category: string;
  dailyPrice: number;
  weeklyPrice?: number;
  monthlyPrice?: number;
  status: 'available' | 'rented' | 'maintenance';
  imageUrl?: string;
  images?: string[];
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

function AdminEquipmentsPage() {
  const searchParams = useSearchParams();
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Fetch equipments
  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/equipments');
      if (response.ok) {
        const data = await response.json();
        setEquipments(data.equipments || data || []);
      } else {
        toast.error('Erro ao carregar equipamentos');
      }
    } catch (error) {
      console.error('Error fetching equipments:', error);
      toast.error('Erro ao carregar equipamentos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este equipamento?')) return;

    try {
      const response = await fetch(`/api/admin/equipments/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEquipments((prev) => prev.filter((eq) => eq.id !== id));
        toast.success('Equipamento excluído com sucesso');
      } else {
        toast.error('Erro ao excluir equipamento');
      }
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast.error('Erro ao excluir equipamento');
    }
  };

  // Filter and sort equipments
  const filteredAndSortedEquipments = equipments
    .filter((equipment) => {
      const matchesSearch =
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || equipment.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || equipment.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.dailyPrice - b.dailyPrice;
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rented':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'maintenance':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      available: 'bg-green-100 text-green-800 border-green-200',
      rented: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      maintenance: 'bg-red-100 text-red-800 border-red-200',
    };

    const labels = {
      available: 'Disponível',
      rented: 'Alugado',
      maintenance: 'Manutenção',
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        <span className="flex items-center gap-1">
          {getStatusIcon(status)}
          {labels[status as keyof typeof labels]}
        </span>
      </Badge>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-10 w-40" />
            </div>
            <Card className="backdrop-blur-sm bg-white/80">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="backdrop-blur-sm bg-white/80">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="aspect-video w-full mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-6 w-1/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Equipamentos</h1>
              <p className="text-gray-600">
                Gerencie o catálogo de equipamentos disponíveis para locação (
                {filteredAndSortedEquipments.length} equipamentos)
              </p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/admin/equipamentos/novo">
                <Plus className="h-4 w-4 mr-2" />
                Novo Equipamento
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar equipamentos por nome ou descrição..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40 bg-white/50">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas Categorias</SelectItem>
                      <SelectItem value="escavadeiras">Escavadeiras</SelectItem>
                      <SelectItem value="tratores">Tratores</SelectItem>
                      <SelectItem value="compactadores">Compactadores</SelectItem>
                      <SelectItem value="guindastes">Guindastes</SelectItem>
                      <SelectItem value="betoneiras">Betoneiras</SelectItem>
                      <SelectItem value="andaimes">Andaimes</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 bg-white/50">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos Status</SelectItem>
                      <SelectItem value="available">Disponível</SelectItem>
                      <SelectItem value="rented">Alugado</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={sortBy}
                    onValueChange={(value: 'name' | 'price' | 'date') => setSortBy(value)}
                  >
                    <SelectTrigger className="w-32 bg-white/50">
                      <SelectValue placeholder="Ordenar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nome</SelectItem>
                      <SelectItem value="price">Preço</SelectItem>
                      <SelectItem value="date">Data</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="bg-white/50"
                  >
                    {sortOrder === 'asc' ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>

                  {/* View Mode Toggle */}
                  <div className="flex border rounded-lg bg-white/50">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Equipment Grid/List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {filteredAndSortedEquipments.length === 0 ? (
            <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
              <CardContent className="p-12 text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum equipamento encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca para encontrar equipamentos.'
                    : 'Comece adicionando seu primeiro equipamento ao catálogo.'}
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/admin/equipamentos/novo">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeiro Equipamento
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div
                  key="grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredAndSortedEquipments.map((equipment) => (
                    <motion.div key={equipment.id} variants={itemVariants}>
                      <Card className="group hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/80 border-white/20 overflow-hidden h-full">
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                          {equipment.imageUrl ||
                          (equipment.images && equipment.images.length > 0) ? (
                            <Image
                              src={
                                equipment.imageUrl || equipment.images?.[0] || '/placeholder.svg'
                              }
                              alt={equipment.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Package className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3">
                            {getStatusBadge(equipment.status)}
                          </div>
                          <div className="absolute top-3 left-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="bg-white/90 hover:bg-white"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/equipamentos/${equipment.id}`}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Visualizar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(equipment.id)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <CardContent className="p-4 flex-1 flex flex-col">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                              {equipment.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {equipment.description}
                            </p>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-2xl font-bold text-green-600">
                                  {formatPrice(equipment.dailyPrice)}
                                </span>
                                <span className="text-gray-500 text-sm">/dia</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {equipment.category}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500">
                              Criado em {formatDate(equipment.createdAt)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-4"
                >
                  {filteredAndSortedEquipments.map((equipment) => (
                    <motion.div key={equipment.id} variants={itemVariants}>
                      <Card className="group hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/80 border-white/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                              {equipment.imageUrl ||
                              (equipment.images && equipment.images.length > 0) ? (
                                <Image
                                  src={
                                    equipment.imageUrl ||
                                    equipment.images?.[0] ||
                                    '/placeholder.svg'
                                  }
                                  alt={equipment.name}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <Package className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                  {equipment.name}
                                </h3>
                                {getStatusBadge(equipment.status)}
                              </div>
                              <p className="text-gray-600 text-sm truncate mb-2">
                                {equipment.description}
                              </p>
                              <div className="flex items-center gap-4">
                                <span className="text-xl font-bold text-green-600">
                                  {formatPrice(equipment.dailyPrice)}/dia
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {equipment.category}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  Criado em {formatDate(equipment.createdAt)}
                                </span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/equipamentos/${equipment.id}`}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Visualizar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(equipment.id)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminEquipmentsPageWrapper() {
  return (
    <Suspense fallback={null}>
      <AdminEquipmentsPage />
    </Suspense>
  );
}
