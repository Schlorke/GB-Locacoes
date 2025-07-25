'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, Edit, Eye, Package, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

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

interface EquipamentosClientProps {
  equipments: Equipment[];
}

export default function EquipamentosClient({ equipments }: EquipamentosClientProps) {
  const [searchTerm, _setSearchTerm] = useState('');
  const [categoryFilter, _setCategoryFilter] = useState('all');
  const [statusFilter, _setStatusFilter] = useState('all');
  const [sortBy, _setSortBy] = useState<'name' | 'price' | 'date'>('name');
  const [sortOrder, _setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [_viewMode, _setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedEquipments = useMemo(() => {
    let filtered = equipments.filter((e) => {
      const matchesSearch =
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
    filtered = filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.dailyPrice - b.dailyPrice : b.dailyPrice - a.dailyPrice;
      }
      return 0;
    });
    return filtered;
  }, [equipments, searchTerm, categoryFilter, statusFilter, sortBy, sortOrder]);

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

  const _getStatusBadge = (status: string) => {
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

  const _formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const _formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Animation variants
  const _containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const _itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Renderização dos equipamentos
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='#000000' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 max-w-md"
        >
          <Input
            placeholder="Buscar equipamentos..."
            value={searchTerm}
            onChange={(e) => _setSearchTerm(e.target.value)}
            className="bg-white"
          />
        </motion.div>

        <motion.div
          variants={_containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAndSortedEquipments.length > 0 ? (
            filteredAndSortedEquipments.map((equipment) => (
              <motion.div key={equipment.id} variants={_itemVariants}>
                <Card className="overflow-hidden shadow-lg">
                  <CardHeader className="p-0 relative h-40 bg-gray-100">
                    <Image
                      src={equipment.imageUrl || '/placeholder.svg?height=200&width=300'}
                      alt={equipment.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">{_getStatusBadge(equipment.status)}</div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    <CardTitle className="text-lg font-semibold line-clamp-1">
                      {equipment.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {equipment.description}
                    </p>
                    <div className="text-sm text-gray-500">{equipment.category}</div>
                    <div className="font-semibold text-primary">
                      {formatCurrency(equipment.dailyPrice)}{' '}
                      <span className="text-xs font-normal text-gray-500">/dia</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                    <Button asChild variant="outline" size="icon" className="bg-transparent">
                      <Link href={`/admin/equipamentos/${equipment.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon" className="bg-transparent">
                      <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              Nenhum equipamento encontrado.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
