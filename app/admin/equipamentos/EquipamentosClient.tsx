'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, Package, Plus } from 'lucide-react';
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

  // ...existing code...
  // Renderização igual ao seu JSX anterior, usando filteredAndSortedEquipments, searchTerm, etc.
  // Garanta que não há outline.
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
        {/* Filters and Controls, Equipment Grid/List... igual ao seu código atual */}
        {/* ...existing code... */}
      </div>
    </div>
  );
}
