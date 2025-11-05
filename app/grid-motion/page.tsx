'use client'

import GridMotion from '@/components/ui/grid-motion'
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

export default function GridMotionPage() {
  // Items customizados com ícones SVG do projeto
  const items = [
    <div key="icon-1" className="flex flex-col items-center gap-2">
      <AndaimeSuspenso size={48} color="#ea580c" />
      <span className="text-xs">Andaimes</span>
    </div>,
    'Acesso e Elevação',
    <div key="icon-2" className="flex flex-col items-center gap-2">
      <Betoneira size={48} color="#f97316" />
      <span className="text-xs">Concretagem</span>
    </div>,
    'Ferramentas',
    <div key="icon-3" className="flex flex-col items-center gap-2">
      <Compressor size={48} color="#fb923c" />
      <span className="text-xs">Compressores</span>
    </div>,
    'Equipamentos',
    <div key="icon-4" className="flex flex-col items-center gap-2">
      <Rompedor size={48} color="#fdba74" />
      <span className="text-xs">Demolição</span>
    </div>,
    'Construção Civil',
    <div key="icon-5" className="flex flex-col items-center gap-2">
      <Lavagem size={48} color="#ea580c" />
      <span className="text-xs">Limpeza</span>
    </div>,
    'GB Locações',
    <div key="icon-6" className="flex flex-col items-center gap-2">
      <Terraplenagem size={48} color="#f97316" />
      <span className="text-xs">Terraplenagem</span>
    </div>,
    'Obra',
    <div key="icon-7" className="flex flex-col items-center gap-2">
      <TrabalhoEmAltura size={48} color="#fb923c" />
      <span className="text-xs">Altura</span>
    </div>,
    'Segurança',
    <div key="icon-8" className="flex flex-col items-center gap-2">
      <Transporte size={48} color="#fdba74" />
      <span className="text-xs">Transporte</span>
    </div>,
    'Logística',
    <div key="icon-9" className="flex flex-col items-center gap-2">
      <CadeiraEletrica size={48} color="#ea580c" />
      <span className="text-xs">Elétrica</span>
    </div>,
    'Modernidade',
    <div key="icon-10" className="flex flex-col items-center gap-2">
      <AndaimeTubular size={48} color="#f97316" />
      <span className="text-xs">Tubular</span>
    </div>,
    'Estrutura',
    // Completar até 28 items
    'Qualidade',
    'Excelência',
    'Inovação',
    'Tecnologia',
    'Eficiência',
    'Confiança',
    'Parceria',
    'Sucesso',
  ]

  return (
    <div className="h-screen w-full">
      <GridMotion items={items} gradientColor="#1e293b" />

      {/* Overlay com informações */}
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
        <div className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md">
          <h1 className="mb-2 text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            GB Locações
          </h1>
          <p className="text-lg text-white/90 drop-shadow-lg md:text-xl">
            Mova o mouse para ver a mágica acontecer
          </p>
        </div>
      </div>
    </div>
  )
}
