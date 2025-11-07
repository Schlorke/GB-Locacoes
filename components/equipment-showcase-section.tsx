'use client'

import {
  CategoryShowcase,
  type CategoryItem,
  type TabConfig,
} from '@/components/category-showcase'
import { LayoutGroup, motion } from 'framer-motion'

import { EquipmentInfiniteScroll } from '@/components/equipment-infinite-scroll'
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
import RotatingText from '@/components/rotating-text'

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
          {/* Sticky removido: causava bug de scroll vertical no iOS Safari */}
          <div className="order-2 lg:order-1">
            <EquipmentInfiniteScroll />
          </div>

          {/* Coluna Direita (Desktop) / Topo (Mobile): Tabs */}
          <div className="order-1 lg:order-2 relative z-20">
            {/* Header com título */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                <LayoutGroup>
                  <motion.span className="flex flex-col gap-1" layout>
                    <motion.span
                      layout
                      transition={{
                        type: 'spring',
                        damping: 30,
                        stiffness: 400,
                      }}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <motion.span
                        layout
                        transition={{
                          type: 'spring',
                          damping: 30,
                          stiffness: 400,
                        }}
                        className="leading-tight"
                      >
                        Tecnologia
                      </motion.span>
                      <RotatingText
                        texts={['sob medida', 'certa', 'eficiente']}
                        mainClassName="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-orange-500/70 px-2 py-1 text-white md:px-3 md:py-1.5"
                        splitLevelClassName="inline-flex items-center"
                        elementLevelClassName="inline-block"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-120%', opacity: 0 }}
                        staggerDuration={0.05}
                        staggerFrom="last"
                        rotationInterval={3200}
                        transition={{
                          type: 'spring',
                          damping: 30,
                          stiffness: 400,
                        }}
                        aria-label="Palavras que descrevem a tecnologia da GB Locações"
                      />
                    </motion.span>
                    <span className="block leading-tight text-slate-900">
                      para cada fase da sua obra
                    </span>
                  </motion.span>
                </LayoutGroup>
              </h2>
              <p className="text-slate-600 text-base">
                Escolha por categoria para encontrar o equipamento ideal
              </p>
            </div>

            {/* Componente CategoryShowcase */}
            <CategoryShowcase
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
