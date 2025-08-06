'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Loader2, RotateCcw, Save } from 'lucide-react'

interface SettingsBlockProps {
  title: string
  icon: LucideIcon
  description?: string
  form: React.ReactNode
  preview: React.ReactNode
  delay?: number
  onSave?: () => void | Promise<void>
  onReset?: () => void | Promise<void>
  isSaving?: boolean
  isResetting?: boolean
}

export function SettingsBlock({
  title,
  icon: Icon,
  description,
  form,
  preview,
  delay = 0,
  onSave,
  onReset,
  isSaving = false,
  isResetting = false,
}: SettingsBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

        <CardContent className="relative z-10 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-8 items-start">
            {/* Coluna Esquerda: Título + Form */}
            <div className="space-y-6">
              {/* Título e Descrição */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h3>
                </div>
                {description && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>

              {/* Formulário */}
              <div className="space-y-4">{form}</div>
            </div>

            {/* Coluna Direita: Preview ocupando toda altura */}
            <div className="relative min-h-full">
              <Card
                className="relative overflow-hidden shadow-xl backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgb(248, 250, 252)',
                  borderColor: 'rgb(224, 230, 235)',
                  borderWidth: '1.5px',
                }}
              >
                {/* Removendo gradientes para usar cor exata do equipamento */}

                <CardContent className="relative z-10 p-6" aria-live="polite">
                  {preview}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Botões de ação no canto inferior direito do bloco principal */}
          <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-200/60">
            {/* Botão Reset */}
            <Button
              type="button"
              variant="reset"
              size="default"
              onClick={onReset}
              disabled={isSaving || isResetting}
              title="Restaurar configurações padrão"
            >
              {isResetting ? (
                <Loader2 className="w-4 h-4 animate-spin -rotate-180 group-hover:text-orange-500 transition-colors duration-200" />
              ) : (
                <RotateCcw className="w-4 h-4 group-hover:text-orange-500 transition-colors duration-200" />
              )}
              <span className="group-hover:text-orange-500 transition-colors duration-200">
                {isResetting ? 'Resetando...' : 'Resetar'}
              </span>
            </Button>

            {/* Botão Salvar */}
            <Button
              type="button"
              variant="default"
              size="default"
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin group-hover:text-orange-500 transition-colors duration-200" />
              ) : (
                <Save className="w-4 h-4 group-hover:text-orange-500 transition-colors duration-200" />
              )}
              <span className="group-hover:text-orange-500 transition-colors duration-200">
                {isSaving ? 'Salvando...' : 'Salvar Alterações'}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
