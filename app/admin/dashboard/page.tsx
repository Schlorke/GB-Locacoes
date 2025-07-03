'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart3,
  Package,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  Loader2,
  AlertTriangle,
  DollarSign,
  Calendar,
  Building,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface DashboardStats {
  totalEquipments: number;
  availableEquipments: number;
  totalCategories: number;
  totalQuotes: number;
  pendingQuotes: number;
  approvedQuotes: number;
  rejectedQuotes: number;
  completedQuotes: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

interface RecentQuote {
  id: string;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  totalAmount?: number;
  status: string;
  createdAt: string;
  itemsCount: number;
}

const statusConfig = {
  pending: {
    label: 'Pendente',
    color:
      'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200',
    icon: Clock,
  },
  approved: {
    label: 'Aprovado',
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200',
    icon: CheckCircle,
  },
  rejected: {
    label: 'Rejeitado',
    color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200',
    icon: XCircle,
  },
  completed: {
    label: 'Concluído',
    color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200',
    icon: CheckCircle,
  },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, quotesResponse] = await Promise.all([
        fetch('/api/admin/dashboard/stats'),
        fetch('/api/admin/quotes?limit=5'),
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (quotesResponse.ok) {
        const quotesData = await quotesResponse.json();
        setRecentQuotes(quotesData.slice(0, 5));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      toast.error('Erro ao carregar dados do dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Visão geral do sistema de locação de equipamentos
          </p>
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Button asChild size="sm" className="h-10 px-4">
            <Link href="/admin/equipamentos/novo">
              <Plus className="h-4 w-4 mr-2" />
              <span>Novo Equipamento</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-blue-100 text-xs sm:text-sm truncate">Total de Equipamentos</p>
                <p className="text-xl sm:text-2xl font-bold">{stats?.totalEquipments || 0}</p>
                <p className="text-blue-200 text-xs mt-1 truncate">
                  {stats?.availableEquipments || 0} disponíveis
                </p>
              </div>
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-green-100 text-xs sm:text-sm truncate">Categorias</p>
                <p className="text-xl sm:text-2xl font-bold">{stats?.totalCategories || 0}</p>
                <p className="text-green-200 text-xs mt-1 truncate">Organizadas</p>
              </div>
              <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-green-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-purple-100 text-xs sm:text-sm truncate">Orçamentos</p>
                <p className="text-xl sm:text-2xl font-bold">{stats?.totalQuotes || 0}</p>
                <p className="text-purple-200 text-xs mt-1 truncate">
                  {stats?.pendingQuotes || 0} pendentes
                </p>
              </div>
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-orange-100 text-xs sm:text-sm truncate">Receita Mensal</p>
                <p className="text-xl sm:text-2xl font-bold">
                  R$ {((stats?.monthlyRevenue || 0) / 100).toFixed(0)}
                </p>
                <p className="text-orange-200 text-xs mt-1 truncate">Este mês</p>
              </div>
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-orange-200 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status dos Orçamentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground truncate">Pendentes</p>
                <p className="text-lg sm:text-xl font-bold text-yellow-600">
                  {stats?.pendingQuotes || 0}
                </p>
              </div>
              <Clock className="h-5 w-5 text-yellow-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground truncate">Aprovados</p>
                <p className="text-lg sm:text-xl font-bold text-green-600">
                  {stats?.approvedQuotes || 0}
                </p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground truncate">Rejeitados</p>
                <p className="text-lg sm:text-xl font-bold text-red-600">
                  {stats?.rejectedQuotes || 0}
                </p>
              </div>
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground truncate">Concluídos</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600">
                  {stats?.completedQuotes || 0}
                </p>
              </div>
              <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="truncate">Ações Rápidas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-center sm:items-stretch">
            <Button asChild variant="outline" className="h-auto p-4 w-auto max-w-xs bg-transparent">
              <Link href="/admin/equipamentos/novo" className="flex flex-col items-center gap-2">
                <Plus className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-center">Adicionar Equipamento</span>
                <span className="text-xs text-muted-foreground text-center">
                  Cadastrar novo equipamento no sistema
                </span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4 w-auto max-w-xs bg-transparent">
              <Link href="/admin/categorias" className="flex flex-col items-center gap-2">
                <BarChart3 className="h-6 w-6 text-green-600" />
                <span className="font-medium text-center">Gerenciar Categorias</span>
                <span className="text-xs text-muted-foreground text-center">
                  Organizar equipamentos por categoria
                </span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4 w-auto max-w-xs bg-transparent">
              <Link href="/admin/orcamentos" className="flex flex-col items-center gap-2">
                <FileText className="h-6 w-6 text-purple-600" />
                <span className="font-medium text-center">Ver Orçamentos</span>
                <span className="text-xs text-muted-foreground text-center">
                  Gerenciar solicitações de orçamento
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orçamentos Recentes */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="truncate">Orçamentos Recentes</span>
            </CardTitle>
            <Button asChild variant="outline" size="sm" className="h-10 px-4 bg-transparent">
              <Link href="/admin/orcamentos">
                <Eye className="h-4 w-4 mr-2" />
                Ver Todos
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentQuotes.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-600 mb-2">Nenhum orçamento recente</p>
              <p className="text-sm text-gray-400">Os orçamentos solicitados aparecerão aqui</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Cliente</TableHead>
                    <TableHead className="hidden sm:table-cell min-w-[150px]">Empresa</TableHead>
                    <TableHead className="hidden md:table-cell w-[100px] text-center">
                      Itens
                    </TableHead>
                    <TableHead className="hidden lg:table-cell w-[120px]">Valor</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="hidden sm:table-cell w-[100px]">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentQuotes.map((quote) => {
                    const StatusIcon =
                      statusConfig[quote.status as keyof typeof statusConfig]?.icon ||
                      AlertTriangle;

                    return (
                      <TableRow key={quote.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell className="p-2 sm:p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{quote.customerName}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {quote.customerEmail}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell p-2 sm:p-4">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm truncate">{quote.customerCompany || '-'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-center p-2 sm:p-4">
                          <span className="font-medium text-sm">{quote.itemsCount}</span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell p-2 sm:p-4">
                          <span className="font-bold text-green-600 text-sm">
                            {quote.totalAmount ? `R$ ${quote.totalAmount.toFixed(2)}` : '-'}
                          </span>
                        </TableCell>
                        <TableCell className="p-2 sm:p-4">
                          <Badge
                            className={`${statusConfig[quote.status as keyof typeof statusConfig]?.color} flex items-center gap-1 w-fit text-xs`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            <span className="hidden sm:inline">
                              {statusConfig[quote.status as keyof typeof statusConfig]?.label}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell p-2 sm:p-4">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(quote.createdAt).toLocaleDateString('pt-BR')}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
