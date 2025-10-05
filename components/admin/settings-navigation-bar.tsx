'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Building, Globe, Images, Search, Settings, Share2 } from 'lucide-react'
import React, { useState } from 'react'

interface SettingsNavigationBarProps {
  onSectionSelect: (_section: string) => void
  activeSection?: string
  className?: string
}

interface SettingsSection {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const settingsSections: SettingsSection[] = [
  {
    id: 'company',
    label: 'Informações da Empresa',
    icon: Building,
    description: 'Nome, logo, contato e dados gerais',
  },
  {
    id: 'hero',
    label: 'Carrossel Principal',
    icon: Images,
    description: 'Imagens e textos da página inicial',
  },
  {
    id: 'social',
    label: 'Redes Sociais',
    icon: Share2,
    description: 'Links para Instagram, Facebook, etc.',
  },
  {
    id: 'seo',
    label: 'SEO & Meta Tags',
    icon: Search,
    description: 'Otimização para mecanismos de busca',
  },
  {
    id: 'system',
    label: 'Configurações do Sistema',
    icon: Settings,
    description: 'Configurações técnicas e avançadas',
  },
  {
    id: 'custom',
    label: 'Configurações Personalizadas',
    icon: Globe,
    description: 'Configurações específicas do projeto',
  },
]

export function SettingsNavigationBar({
  onSectionSelect,
  activeSection,
  className,
}: SettingsNavigationBarProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  return (
    <Card
      className={cn(
        'relative overflow-visible border-0 shadow-xl bg-white backdrop-blur-sm transition-all duration-300',
        className
      )}
    >
      {/* Clean depth layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

      <CardContent className="relative z-10 p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Título da barra */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Configurações do Sistema
              </h2>
              <p className="text-sm text-gray-600">
                Clique em uma configuração para editá-la
              </p>
            </div>
          </div>

          {/* Grid de botões de configuração */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {settingsSections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              const isHovered = hoveredSection === section.id

              return (
                <button
                  key={section.id}
                  onClick={() => onSectionSelect(section.id)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={cn(
                    // Base styles similar to reset button
                    'flex flex-col items-center justify-center gap-2 p-4 rounded-lg border transition-all duration-300',
                    'bg-transparent hover:bg-background hover:scale-105 hover:shadow-sm',
                    'focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0',
                    // Shadow like inputs
                    'border-gray-200 hover:border-gray-300',
                    // Active state
                    isActive && 'border-blue-500 bg-blue-50/50 shadow-md'
                  )}
                  style={{
                    boxShadow: isActive
                      ? '0 4px 6px -1px rgba(59, 130, 246, 0.15), 0 2px 4px -1px rgba(59, 130, 246, 0.1)'
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                  title={section.description}
                  aria-label={`Configurar ${section.label}`}
                >
                  {/* Ícone com hover laranja */}
                  <Icon
                    className={cn(
                      'w-5 h-5 transition-all duration-300',
                      isActive
                        ? 'text-blue-600'
                        : isHovered
                          ? 'text-orange-500'
                          : 'text-gray-600'
                    )}
                  />

                  {/* Texto com hover laranja */}
                  <span
                    className={cn(
                      'text-xs font-medium text-center leading-tight transition-all duration-300',
                      isActive
                        ? 'text-blue-700'
                        : isHovered
                          ? 'text-orange-500'
                          : 'text-gray-700'
                    )}
                  >
                    {section.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
