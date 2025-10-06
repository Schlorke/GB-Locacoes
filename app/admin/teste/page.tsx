'use client'

import { AdminCard } from '@/components/admin/admin-card'
import { AdminFilterCard } from '@/components/admin/admin-filter-card'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Filter, Package, Plus, Settings } from 'lucide-react'
import { useState } from 'react'

const mockData = [
  { id: '1', name: 'Item A', category: 'cat1', status: 'available' },
  { id: '2', name: 'Item B', category: 'cat2', status: 'unavailable' },
  { id: '3', name: 'Item C', category: 'cat1', status: 'available' },
]

export default function TestePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredData = mockData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto">
        {/* Header usando AdminPageHeader */}
        <div className="mb-8">
          <AdminPageHeader
            title="Teste dos Componentes Corrigidos"
            subtitle="Demonstração do CustomSelect funcionando corretamente com botão reset fixo"
            icon={<Settings className="w-6 h-6 text-orange-200" />}
          />
        </div>

        {/* Demonstração do problema resolvido */}
        <div className="mb-6">
          <AdminCard
            title="✅ Problemas Resolvidos"
            subtitle="Todos os dropdowns agora funcionam corretamente"
            icon={<Package className="w-5 h-5 text-green-600" />}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <span className="font-semibold">✓</span>
                <span>
                  Todos os dropdowns usam CustomSelect (funciona corretamente)
                </span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <span className="font-semibold">✓</span>
                <span>
                  Dropdowns aparecem ABAIXO do elemento pai (não no centro da
                  tela)
                </span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <span className="font-semibold">✓</span>
                <span>Botão reset é FIXO e sempre visível (não some mais)</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <span className="font-semibold">✓</span>
                <span>
                  Animação anti-horária no botão reset funciona perfeitamente
                </span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <span className="font-semibold">✓</span>
                <span>
                  Ícone de filtro muda de cor quando filtros estão ativos
                </span>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Filtros com o novo AdminFilterCard */}
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
                placeholder: 'Todas as categorias',
                options: [
                  { value: 'all', label: 'Todas as categorias' },
                  { value: 'cat1', label: 'Categoria 1' },
                  { value: 'cat2', label: 'Categoria 2' },
                ],
              },
              {
                label: 'Status',
                value: statusFilter,
                onValueChange: setStatusFilter,
                placeholder: 'Todos os status',
                options: [
                  { value: 'all', label: 'Todos os status' },
                  { value: 'available', label: 'Disponível' },
                  { value: 'unavailable', label: 'Indisponível' },
                ],
              },
            ]}
            actionButtons={
              <Button className="bg-slate-700 hover:bg-slate-600 hover:shadow-lg shadow-md transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                Novo Item
              </Button>
            }
          />
        </div>

        {/* Instruções para teste */}
        <div className="mb-6">
          <AdminCard
            title="🧪 Como Testar"
            subtitle="Faça estes testes para ver que tudo funciona corretamente"
            icon={<Filter className="w-5 h-5 text-blue-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Teste dos Dropdowns:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • Clique no dropdown da esquerda - deve abrir ABAIXO dele
                  </li>
                  <li>
                    • Clique no dropdown da direita - deve abrir ABAIXO dele
                  </li>
                  <li>• Não deve mais aparecer modal no centro da tela</li>
                  <li>• Largura deve respeitar o elemento pai</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Teste do Reset:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Selecione qualquer filtro para ativar</li>
                  <li>• O ícone do filtro deve ficar laranja</li>
                  <li>• O botão reset está sempre visível (não some)</li>
                  <li>• Clique no reset - animação anti-horária</li>
                </ul>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Resultados filtrados */}
        <AdminCard
          title="Resultados"
          icon={<Package className="w-5 h-5 text-orange-600" />}
        >
          {filteredData.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                Nenhum item encontrado com os filtros ativos
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredData.map((item) => (
                <AdminCard key={item.id} variant="elevated" className="h-full">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <Badge
                      variant={
                        item.status === 'available' ? 'default' : 'destructive'
                      }
                    >
                      {item.status === 'available'
                        ? 'Disponível'
                        : 'Indisponível'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Categoria: {item.category}
                  </p>
                </AdminCard>
              ))}
            </div>
          )}
        </AdminCard>

        {/* Páginas corrigidas */}
        <div className="mt-8">
          <AdminCard
            title="📄 Páginas Corrigidas"
            subtitle="Todas essas páginas agora usam CustomSelect e funcionam corretamente"
            icon={<Settings className="w-5 h-5 text-orange-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">
                  Admin - Equipamentos
                </h4>
                <p className="text-sm text-green-600">
                  ✓ CustomSelect implementado
                  <br />
                  ✓ Botão reset fixo
                  <br />✓ Filtros funcionando
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">
                  Admin - Orçamentos
                </h4>
                <p className="text-sm text-green-600">
                  ✓ CustomSelect implementado
                  <br />✓ Dropdown posicionamento correto
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">
                  Público - Equipamentos
                </h4>
                <p className="text-sm text-green-600">
                  ✓ CustomSelect implementado
                  <br />✓ Filtros funcionando
                </p>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  )
}
