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
import {
  TabbedCategoryGrid,
  type CategoryItem,
  type TabConfig,
} from '@/components/tabbed-category-grid'
import { motion } from 'framer-motion'

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

export default function PlaygroundPage() {
  const handleCategoryClick = (category: CategoryItem) => {
    console.log('Categoria clicada:', category)
    // Aqui você pode adicionar navegação, modal, etc.
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header com título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Equipamentos e ferramentas para locação
          </h1>
          <p className="text-slate-600 text-base">
            Escolha por categoria para encontrar o equipamento ideal
          </p>
        </motion.div>

        {/* Componente TabbedCategoryGrid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TabbedCategoryGrid
            tabs={tabsConfig}
            defaultTab="mais-alugados"
            onCategoryClickAction={handleCategoryClick}
            gridCols={{
              base: 2,
              sm: 3,
              md: 4,
              lg: 5,
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
