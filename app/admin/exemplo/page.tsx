'use client';

import { AdminCard } from '@/components/admin/admin-card';
import { AdminFilterCard } from '@/components/admin/admin-filter-card';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Plus, Settings, Users } from 'lucide-react';
import { useState } from 'react';

// Dados de exemplo
const mockData = [
  { id: '1', name: 'Betoneira 400L', category: 'Construção', status: 'available' },
  { id: '2', name: 'Andaime Metálico', category: 'Acesso', status: 'unavailable' },
  { id: '3', name: 'Compressor 20HP', category: 'Pneumático', status: 'available' },
];

const categories = [
  { id: 'construcao', name: 'Construção' },
  { id: 'acesso', name: 'Acesso' },
  { id: 'pneumatico', name: 'Pneumático' },
];

export default function AdminExamplePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredData = mockData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header usando o novo componente */}
        <div className="mb-8">
          <AdminPageHeader
            title="Exemplo de Componentes Admin"
            subtitle="Demonstração dos novos componentes padronizados"
            icon={<Settings className="w-6 h-6 text-orange-200" />}
          />
        </div>

        {/* Filtros usando o novo componente */}
        <div className="mb-6">
          <AdminFilterCard
            searchPlaceholder="Buscar items..."
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            filters={[
              {
                label: 'Categoria',
                value: selectedCategory,
                onValueChange: setSelectedCategory,
                placeholder: 'Selecione categoria',
                options: [
                  { value: 'all', label: 'Todas as categorias' },
                  ...categories.map((cat) => ({
                    value: cat.name,
                    label: cat.name,
                  })),
                ],
              },
              {
                label: 'Status',
                value: statusFilter,
                onValueChange: setStatusFilter,
                placeholder: 'Selecione status',
                options: [
                  { value: 'all', label: 'Todos os status' },
                  { value: 'available', label: 'Disponível' },
                  { value: 'unavailable', label: 'Indisponível' },
                ],
              },
            ]}
            actionButtons={
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:shadow-lg shadow-md transition-all duration-300"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Ação 1
                </Button>
                <Button
                  size="sm"
                  className="bg-slate-700 hover:bg-slate-600 hover:shadow-lg shadow-md transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Item
                </Button>
              </div>
            }
          />
        </div>

        {/* Cards usando o novo componente */}
        <div className="space-y-6">
          {/* Exemplo de Card com título */}
          <AdminCard
            title="Card com Título"
            subtitle="Este é um exemplo de card com título e subtítulo"
            icon={<Package className="w-5 h-5 text-orange-600" />}
          >
            <p className="text-gray-600">
              Este é o conteúdo do card. O componente AdminCard permite criar cards padronizados com
              diferentes variantes e estilos consistentes.
            </p>
          </AdminCard>

          {/* Grid de resultados */}
          <AdminCard
            title="Resultados Filtrados"
            icon={<Package className="w-5 h-5 text-orange-600" />}
          >
            {filteredData.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum item encontrado</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((item) => (
                  <AdminCard key={item.id} variant="elevated" className="h-full">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <Badge variant={item.status === 'available' ? 'default' : 'destructive'}>
                        {item.status === 'available' ? 'Disponível' : 'Indisponível'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Categoria: {item.category}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 hover:shadow-lg shadow-md transition-all duration-300"
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 hover:shadow-lg shadow-md transition-all duration-300"
                      >
                        Ver
                      </Button>
                    </div>
                  </AdminCard>
                ))}
              </div>
            )}
          </AdminCard>

          {/* Exemplo de Card com variante glass */}
          <AdminCard
            title="Card com Efeito Glass"
            subtitle="Este card usa a variante 'glass' para um efeito mais transparente"
            variant="glass"
            icon={<Settings className="w-5 h-5 text-white" />}
          >
            <p className="text-white/90">
              A variante glass é ideal para overlays ou quando você quer um efeito mais sutil e
              transparente no design.
            </p>
          </AdminCard>

          {/* Exemplo de Card sem título */}
          <AdminCard>
            <div className="text-center">
              <Package className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Card sem Título</h3>
              <p className="text-gray-600">
                Este é um exemplo de AdminCard sem título no header. Útil quando você quer total
                controle sobre o conteúdo.
              </p>
            </div>
          </AdminCard>
        </div>

        {/* Informações sobre os componentes */}
        <div className="mt-8">
          <AdminCard
            title="Sobre os Componentes"
            subtitle="Documentação rápida dos novos componentes criados"
            icon={<Settings className="w-5 h-5 text-orange-600" />}
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">AdminPageHeader</h4>
                <p className="text-gray-600 text-sm">
                  Header padronizado para páginas admin com título, subtítulo e ícone opcional.
                  Inclui gradiente laranja e efeitos visuais consistentes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">AdminFilterCard</h4>
                <p className="text-gray-600 text-sm">
                  Card de filtros com busca, seletores múltiplos e botões de ação. Inclui ícone de
                  filtro que muda de cor quando filtros estão ativos e botão de reset com animação
                  de rotação.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">AdminCard</h4>
                <p className="text-gray-600 text-sm">
                  Card padronizado com três variantes: default, elevated e glass. Suporte a título,
                  subtítulo, ícone e diferentes estilos visuais.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Estilos CSS Padronizados</h4>
                <p className="text-gray-600 text-sm">
                  Classes CSS globais para elementos de filtro (.admin-filter-element) e botões
                  (.admin-button) com efeitos hover e transições consistentes.
                </p>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
