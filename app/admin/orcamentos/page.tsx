'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Filter,
  Hash,
  Mail,
  MessageSquare,
  Package,
  Phone,
  Search,
  User,
  XCircle,
} from 'lucide-react';
import { Suspense, useCallback, useEffect, useState } from 'react';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  equipments: Array<{
    id: string;
    name: string;
    quantity: number;
    dailyPrice: number;
  }>;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  pending: {
    label: 'Pendente',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    gradient: 'from-yellow-400 to-orange-500',
  },
  approved: {
    label: 'Aprovado',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    gradient: 'from-green-400 to-emerald-500',
  },
  rejected: {
    label: 'Rejeitado',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
    gradient: 'from-red-400 to-rose-500',
  },
};

function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/quotes');
      const data = await response.json();

      // Verificação defensiva para garantir que data é um array
      const quotesArray = Array.isArray(data) ? data : data?.quotes || [];

      setQuotes(quotesArray);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar orçamentos. Tente novamente.',
        variant: 'destructive',
      });
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const filterQuotes = useCallback(() => {
    if (!Array.isArray(quotes)) {
      setFilteredQuotes([]);
      return;
    }

    const filtered = quotes.filter((quote) => {
      const matchesSearch =
        quote.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.phone?.includes(searchTerm);

      const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    setFilteredQuotes(filtered);
  }, [quotes, searchTerm, statusFilter]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  useEffect(() => {
    filterQuotes();
  }, [quotes, searchTerm, statusFilter, filterQuotes]);

  const updateQuoteStatus = async (quoteId: string, newStatus: 'approved' | 'rejected') => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar status');
      }

      await fetchQuotes();
      setSelectedQuote(null);

      toast({
        title: 'Sucesso',
        description: `Orçamento ${newStatus === 'approved' ? 'aprovado' : 'rejeitado'} com sucesso!`,
      });
    } catch (error) {
      console.error('Error updating quote:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar status do orçamento.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: Quote['status']) => {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`${config.color} flex items-center gap-1.5 font-medium`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            {/* Clean depth layers without decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                Gerenciar Orçamentos
              </h1>
              <p className="text-orange-50 mb-4 font-medium">
                Visualize, analise e gerencie todos os orçamentos solicitados
              </p>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <FileText className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  {Array.isArray(filteredQuotes) ? filteredQuotes.length : 0} orçamentos encontrados
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
          className="mb-6"
        >
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
            {/* Clean depth layers for filter card */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

            <CardContent className="relative z-10 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por nome, email, empresa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48 border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="approved">Aprovados</SelectItem>
                      <SelectItem value="rejected">Rejeitados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabela de Orçamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
            {/* Clean depth layers for table card */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

            <CardContent className="relative z-10 p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left p-4 font-semibold text-gray-700">Cliente</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Equipamentos</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Período</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Valor Total</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {Array.isArray(filteredQuotes) &&
                        filteredQuotes.map((quote, index) => (
                          <motion.tr
                            key={quote.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                                  {quote.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{quote.name}</div>
                                  <div className="text-sm text-gray-500">{quote.email}</div>
                                  {quote.company && (
                                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                      <Building className="w-3 h-3" />
                                      {quote.company}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium">
                                  {Array.isArray(quote.equipments) ? quote.equipments.length : 0}{' '}
                                  equipamentos
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(quote.startDate)}
                                </div>
                                <div className="text-gray-500 ml-4">
                                  até {formatDate(quote.endDate)}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-lg text-green-600">
                                {formatCurrency(quote.totalPrice || 0)}
                              </span>
                            </td>
                            <td className="p-4">{getStatusBadge(quote.status)}</td>
                            <td className="p-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedQuote(quote)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Detalhes
                              </Button>
                            </td>
                          </motion.tr>
                        ))}
                    </AnimatePresence>
                  </tbody>
                </table>

                {(!Array.isArray(filteredQuotes) || filteredQuotes.length === 0) && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <FileText className="w-12 h-12 mx-auto mb-3" />
                      <p className="text-lg font-medium">Nenhum orçamento encontrado</p>
                      <p className="text-sm">
                        Tente ajustar os filtros ou aguarde novos orçamentos
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Modal de Detalhes */}
        <Dialog open={!!selectedQuote} onOpenChange={() => setSelectedQuote(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {selectedQuote?.name?.charAt(0).toUpperCase()}
                </div>
                Detalhes do Orçamento - {selectedQuote?.name}
              </DialogTitle>
            </DialogHeader>

            {selectedQuote && (
              <div className="space-y-6">
                {/* Informações do Cliente */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="w-5 h-5 text-blue-600" />
                      Informações do Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium">{selectedQuote.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Telefone</div>
                        <div className="font-medium">{selectedQuote.phone}</div>
                      </div>
                    </div>
                    {selectedQuote.company && (
                      <div className="flex items-center gap-3">
                        <Building className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Empresa</div>
                          <div className="font-medium">{selectedQuote.company}</div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">ID do Orçamento</div>
                        <div className="font-medium font-mono text-xs">{selectedQuote.id}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Período e Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Calendar className="w-5 h-5 text-green-600" />
                        Período da Locação
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Início:</span>
                          <span className="ml-2 font-medium">
                            {formatDate(selectedQuote.startDate)}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Fim:</span>
                          <span className="ml-2 font-medium">
                            {formatDate(selectedQuote.endDate)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Briefcase className="w-5 h-5 text-purple-600" />
                        Status Atual
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        {getStatusBadge(selectedQuote.status)}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(selectedQuote.totalPrice || 0)}
                          </div>
                          <div className="text-sm text-gray-500">Valor Total</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Equipamentos */}
                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Package className="w-5 h-5 text-orange-600" />
                      Equipamentos Solicitados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Array.isArray(selectedQuote.equipments) &&
                        selectedQuote.equipments.map((equipment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <div className="font-medium">{equipment.name}</div>
                              <div className="text-sm text-gray-500">
                                Quantidade: {equipment.quantity} •{' '}
                                {formatCurrency(equipment.dailyPrice)}/dia
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-green-600">
                                {formatCurrency(equipment.quantity * equipment.dailyPrice)}
                              </div>
                              <div className="text-xs text-gray-500">subtotal/dia</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Mensagem */}
                {selectedQuote.message && (
                  <Card className="border-l-4 border-l-indigo-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <MessageSquare className="w-5 h-5 text-indigo-600" />
                        Mensagem do Cliente
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={selectedQuote.message}
                        readOnly
                        className="min-h-[100px] resize-none border-gray-200"
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Ações Administrativas */}
                {selectedQuote.status === 'pending' && (
                  <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Briefcase className="w-5 h-5 text-yellow-600" />
                        Ações Administrativas
                      </CardTitle>
                      <CardDescription>Aprove ou rejeite este orçamento</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => updateQuoteStatus(selectedQuote.id, 'approved')}
                          disabled={isUpdating}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {isUpdating ? 'Aprovando...' : 'Aprovar Orçamento'}
                        </Button>
                        <Button
                          onClick={() => updateQuoteStatus(selectedQuote.id, 'rejected')}
                          disabled={isUpdating}
                          variant="outline"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-500 hover:text-red-800"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          {isUpdating ? 'Rejeitando...' : 'Rejeitar Orçamento'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function AdminQuotesPageWrapper() {
  return (
    <Suspense fallback={null}>
      <AdminQuotesPage />
    </Suspense>
  );
}
