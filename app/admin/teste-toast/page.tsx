'use client'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function TesteToastPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Teste de Toast Notifications
          </h1>
          <p className="text-slate-600">
            Sistema de notificações com 5 variantes seguindo a identidade visual
            do projeto GB Locações
          </p>
        </div>

        {/* Toast Variants */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Variantes Disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              onClick={() =>
                toast.success('Sucesso!', {
                  description: 'Operação concluída com sucesso.',
                })
              }
              className="bg-green-600 hover:bg-green-700"
            >
              ✓ Success Toast
            </Button>

            <Button
              onClick={() =>
                toast.error('Erro!', {
                  description: 'Algo deu errado. Tente novamente.',
                })
              }
              variant="destructive"
            >
              ✕ Error Toast
            </Button>

            <Button
              onClick={() =>
                toast.warning('Atenção!', {
                  description: 'Cuidado com esta ação importante.',
                })
              }
              className="bg-orange-600 hover:bg-orange-700"
            >
              ⚠ Warning Toast
            </Button>

            <Button
              onClick={() =>
                toast.info('Informação', {
                  description: 'Esta é uma informação útil para você.',
                })
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              ⓘ Info Toast
            </Button>

            <Button
              onClick={() =>
                toast('Default', { description: 'Toast padrão neutro' })
              }
              variant="outline"
            >
              Default Toast
            </Button>

            <Button
              onClick={() =>
                toast('Sem Ícone', {
                  description: 'Toast sem ícone',
                  icon: null,
                })
              }
              variant="secondary"
            >
              Sem Ícone
            </Button>
          </div>
        </div>

        {/* Exemplos Práticos */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Exemplos de Uso Prático
          </h2>
          <div className="space-y-3">
            <Button
              onClick={() =>
                toast.success('Perfil Atualizado!', {
                  description: 'Suas informações foram salvas.',
                })
              }
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Simular: Salvar Perfil
            </Button>

            <Button
              onClick={() =>
                toast.success('Endereço Adicionado!', {
                  description: 'Novo endereço salvo com sucesso.',
                })
              }
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Simular: Adicionar Endereço
            </Button>

            <Button
              onClick={() =>
                toast.error('Erro ao Atualizar', {
                  description: 'Não foi possível salvar as alterações.',
                })
              }
              variant="destructive"
              className="w-full"
            >
              Simular: Erro ao Salvar
            </Button>

            <Button
              onClick={() =>
                toast.warning('Campo Obrigatório', {
                  description: 'Por favor, preencha todos os campos.',
                })
              }
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Simular: Validação de Formulário
            </Button>

            <Button
              onClick={() =>
                toast.info('Novo Recurso', {
                  description: 'Agora você pode personalizar seu perfil!',
                })
              }
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Simular: Informação de Feature
            </Button>
          </div>
        </div>

        {/* Teste de Limite */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Teste de Limite (Máx 3 Simultâneos)
          </h2>
          <Button
            onClick={() => {
              toast.success('Toast 1', { description: 'Primeiro toast' })
              setTimeout(
                () =>
                  toast.success('Toast 2', { description: 'Segundo toast' }),
                100
              )
              setTimeout(
                () =>
                  toast.success('Toast 3', { description: 'Terceiro toast' }),
                200
              )
              setTimeout(
                () =>
                  toast.warning('Toast 4', {
                    description:
                      'Este deve substituir o primeiro (limite de 3)',
                  }),
                300
              )
              setTimeout(
                () =>
                  toast.info('Toast 5', {
                    description: 'Este deve substituir o segundo (limite de 3)',
                  }),
                400
              )
            }}
            className="w-full"
          >
            Disparar 5 Toasts (Teste de Limite)
          </Button>
        </div>

        {/* Teste de Auto-Dismiss */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Teste de Auto-Dismiss (4 segundos)
          </h2>
          <Button
            onClick={() =>
              toast.info('Auto-Dismiss', {
                description:
                  'Esta notificação desaparecerá em 4 segundos automaticamente.',
              })
            }
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Testar Auto-Dismiss
          </Button>
        </div>

        {/* Especificações */}
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 shadow-xl text-white">
          <h2 className="text-xl font-semibold mb-4">
            ✨ Especificações Implementadas
          </h2>
          <ul className="space-y-2 text-sm">
            <li>✓ 5 Variantes: Success, Error, Warning, Info, Default</li>
            <li>✓ Ícones automáticos com Lucide React</li>
            <li>✓ Auto-dismiss após 4 segundos</li>
            <li>✓ Limite de 3 toasts simultâneos</li>
            <li>✓ Glassmorphism (backdrop-blur)</li>
            <li>✓ Animações de entrada e saída</li>
            <li>✓ Posicionamento responsivo (top-right/top-center)</li>
            <li>✓ Swipe to dismiss</li>
            <li>✓ Botão de fechar sempre visível</li>
            <li>✓ Cores seguindo identidade visual GB Locações</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
