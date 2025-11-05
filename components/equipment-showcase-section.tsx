'use client'

import {
  AndaimeSuspenso,
  AndaimeTubular,
  Betoneira,
  CadeiraEletrica,
  Compressor,
  Lavagem,
  Rompedor,
  Terraplenagem,
  TrabalhoEmAltura,
  Transporte,
} from '@/components/icons/custom'
import { EquipmentInfiniteScroll } from '@/components/equipment-infinite-scroll'
import {
  TabbedCategoryGrid,
  type CategoryItem,
  type TabConfig,
} from '@/components/tabbed-category-grid'

// Configuração das tabs e categorias
const tabsConfig: TabConfig[] = [
  {
    value: 'mais-alugados',
    label: 'Categorias',
    categories: [
      { id: '1', name: 'Acesso e elevação', icon: CadeiraEletrica },
      { id: '2', name: 'Andaimes', icon: AndaimeTubular },
      { id: '3', name: 'Compactação', icon: Compressor },
      { id: '4', name: 'Concretagem', icon: Betoneira },
      { id: '5', name: 'Ferramentas elétricas', icon: Rompedor },
      { id: '6', name: 'Furação e demolição', icon: Rompedor },
      { id: '7', name: 'Jardinagem', icon: Lavagem },
      { id: '8', name: 'Limpeza', icon: Lavagem },
      { id: '9', name: 'Motores', icon: Compressor },
      { id: '10', name: 'Outros', icon: Transporte },
    ],
  },
  {
    value: 'fases-obra',
    label: 'Fases da obra',
    categories: [
      { id: '11', name: 'Canteiro de obras', icon: AndaimeSuspenso },
      { id: '12', name: 'Cobertura', icon: AndaimeTubular },
      { id: '13', name: 'Fundação', icon: Terraplenagem },
      { id: '14', name: 'Estrutura', icon: AndaimeSuspenso },
      { id: '15', name: 'Instalações', icon: Compressor },
      { id: '16', name: 'Acabamento', icon: Rompedor },
      { id: '17', name: 'Pintura', icon: Lavagem },
      { id: '18', name: 'Limpeza final', icon: Lavagem },
      { id: '19', name: 'Paisagismo', icon: Lavagem },
      { id: '20', name: 'Outros', icon: Transporte },
    ],
  },
  {
    value: 'tipo-trabalho',
    label: 'Tipo de trabalho',
    categories: [
      { id: '21', name: 'Limpar', icon: Lavagem },
      { id: '22', name: 'Trabalho em altura', icon: TrabalhoEmAltura },
      { id: '23', name: 'Trabalho em jardins', icon: Lavagem },
      { id: '24', name: 'Cortar, furar ou demolir', icon: Rompedor },
      { id: '25', name: 'Concretar, argamassa', icon: Betoneira },
      { id: '26', name: 'Gerar energia elétrica', icon: Compressor },
      { id: '27', name: 'Escorar lajes ou vigas', icon: AndaimeSuspenso },
      { id: '28', name: 'Bombear água ou lama', icon: Lavagem },
      { id: '29', name: 'Aplainar ou lixar', icon: Rompedor },
      { id: '30', name: 'Compactar o solo', icon: Compressor },
    ],
  },
]

export default function EquipmentShowcaseSection() {
  const handleCategoryClick = (category: CategoryItem) => {
    // Navegar para página de equipamentos filtrados por categoria
    window.location.href = `/equipamentos?categoria=${category.id}`
  }

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout de duas colunas responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna Esquerda (Desktop) / Embaixo (Mobile): Scroll Infinito */}
          <div className="order-2 lg:order-1">
            <EquipmentInfiniteScroll className="lg:sticky lg:top-8" />
          </div>

          {/* Coluna Direita (Desktop) / Topo (Mobile): Tabs */}
          <div className="order-1 lg:order-2">
            {/* Header com título */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Equipamentos e ferramentas para locação
              </h2>
              <p className="text-slate-600 text-base">
                Escolha por categoria para encontrar o equipamento ideal
              </p>
            </div>

            {/* Componente TabbedCategoryGrid */}
            <TabbedCategoryGrid
              tabs={tabsConfig}
              defaultTab="mais-alugados"
              onCategoryClickAction={handleCategoryClick}
              gridCols={{
                base: 2,
                sm: 2,
                md: 3,
                lg: 4,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
