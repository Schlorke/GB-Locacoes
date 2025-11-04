import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Design Tokens/Shadows',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sistema de sombras e elevações para criar hierarquia visual e profundidade. Use estes valores predefinidos para manter consistência.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Shadow Card Component
const ShadowCard = ({
  name,
  description,
  shadowValue,
  usage,
}: {
  name: string
  description: string
  shadowValue: string
  usage: string
}) => (
  <div className="p-6">
    <div
      className="bg-white rounded-xl p-8 min-h-[200px] flex flex-col items-center justify-center transition-all hover:scale-105"
      style={{ boxShadow: shadowValue }}
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-2 rounded">
          {usage}
        </div>
      </div>
    </div>
    <div className="mt-4 p-3 bg-gray-50 rounded text-xs font-mono text-gray-600 overflow-x-auto">
      {shadowValue}
    </div>
  </div>
)

export const AllShadows: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Sistema de Sombras</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Sistema de elevação e profundidade visual usando sombras. Cada
            sombra tem um propósito específico e deve ser usada no contexto
            apropriado.
          </p>
        </div>

        {/* Main Shadows */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Sombras Principais</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ShadowCard
              name="Card"
              description="Sombra padrão para cards e elementos em destaque"
              shadowValue="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              usage="shadow-card"
            />
            <ShadowCard
              name="Modal"
              description="Sombra intensa para modais e overlays"
              shadowValue="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              usage="shadow-modal"
            />
            <ShadowCard
              name="Button"
              description="Sombra sutil para botões e elementos interativos"
              shadowValue="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              usage="shadow-button"
            />
            <ShadowCard
              name="Overlay"
              description="Sombra para dropdowns e popovers"
              shadowValue="4px 8px 18px 2px rgba(0,0,0,0.18)"
              usage="shadow-overlay"
            />
          </div>
        </div>

        {/* Tailwind Shadows */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Sombras Tailwind (Alternativas)
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Shadow SM */}
            <div className="p-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Shadow SM</h3>
                <p className="text-sm text-gray-600 mb-3">Sombra muito sutil</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  shadow-sm
                </code>
              </div>
            </div>

            {/* Shadow Base */}
            <div className="p-6">
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="font-semibold mb-2">Shadow</h3>
                <p className="text-sm text-gray-600 mb-3">Sombra padrão</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  shadow
                </code>
              </div>
            </div>

            {/* Shadow MD */}
            <div className="p-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-semibold mb-2">Shadow MD</h3>
                <p className="text-sm text-gray-600 mb-3">Sombra média</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  shadow-md
                </code>
              </div>
            </div>

            {/* Shadow LG */}
            <div className="p-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-2">Shadow LG</h3>
                <p className="text-sm text-gray-600 mb-3">Sombra grande</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  shadow-lg
                </code>
              </div>
            </div>

            {/* Shadow XL */}
            <div className="p-6">
              <div className="bg-white rounded-lg p-6 shadow-xl">
                <h3 className="font-semibold mb-2">Shadow XL</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Sombra extra grande
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  shadow-xl
                </code>
              </div>
            </div>

            {/* Shadow 2XL */}
            <div className="p-6">
              <div className="bg-white rounded-lg p-6 shadow-2xl">
                <h3 className="font-semibold mb-2">Shadow 2XL</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Sombra muito grande
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  shadow-2xl
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Elevation Layers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Camadas de Elevação</h2>
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Layer 1 - Base */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-sm p-12 w-[500px] h-[350px] flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-500">
                  Layer 1: Base (shadow-sm)
                </span>
              </div>
            </div>

            {/* Layer 2 - Card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-md p-10 w-[450px] h-[300px] flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">
                  Layer 2: Card (shadow-md)
                </span>
              </div>
            </div>

            {/* Layer 3 - Elevated */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 w-[400px] h-[250px] flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">
                  Layer 3: Elevated (shadow-lg)
                </span>
              </div>
            </div>

            {/* Layer 4 - Modal */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-[350px] h-[200px] flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-800">
                  Layer 4: Modal (shadow-2xl)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Exemplos Interativos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Hover Elevation */}
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Elevação no Hover</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                  <p className="text-sm">
                    Hover para ver sombra aumentar (shadow-sm → shadow-lg)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow hover:shadow-xl transition-shadow cursor-pointer">
                  <p className="text-sm">
                    Hover para ver sombra aumentar (shadow → shadow-xl)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-2xl transition-shadow cursor-pointer">
                  <p className="text-sm">
                    Hover para ver sombra aumentar (shadow-md → shadow-2xl)
                  </p>
                </div>
              </div>
              <code className="text-xs bg-gray-900 text-green-400 p-3 rounded mt-4 block">
                hover:shadow-lg transition-shadow
              </code>
            </div>

            {/* Button States */}
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Sombras em Botões</h3>
              <div className="space-y-4">
                <button className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg shadow-sm hover:shadow-lg transition-all hover:scale-105">
                  Botão com Elevação Sutil
                </button>
                <button className="w-full px-6 py-3 bg-slate-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105">
                  Botão com Elevação Média
                </button>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                  Botão com Elevação Alta
                </button>
              </div>
              <code className="text-xs bg-gray-900 text-green-400 p-3 rounded mt-4 block">
                shadow-md hover:shadow-xl hover:scale-105
              </code>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Casos de Uso</h2>
          <div className="space-y-6">
            {/* Product Card */}
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Card de Produto</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 max-w-sm">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Betoneira 400L</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Ideal para obras de médio porte
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-orange-600">
                      R$ 180
                    </span>
                    <span className="text-sm text-gray-500">/dia</span>
                  </div>
                </div>
              </div>
              <code className="text-xs bg-gray-900 text-green-400 p-3 rounded mt-4 block">
                shadow-md hover:shadow-xl transition-all
              </code>
            </div>

            {/* Modal/Dialog */}
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Modal/Dialog</h3>
              <div className="bg-gray-900/50 p-12 rounded-lg flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md">
                  <h4 className="text-2xl font-bold mb-4">Confirmar Ação</h4>
                  <p className="text-gray-600 mb-6">
                    Tem certeza que deseja prosseguir com esta ação?
                  </p>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                      Cancelar
                    </button>
                    <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
              <code className="text-xs bg-gray-900 text-green-400 p-3 rounded mt-4 block">
                shadow-2xl (para modais sobre overlay escuro)
              </code>
            </div>

            {/* Dropdown/Popover */}
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Dropdown/Popover</h3>
              <div className="bg-gray-50 p-6 rounded-lg flex justify-center">
                <div className="relative">
                  <button className="px-4 py-2 bg-white border rounded-lg shadow-sm">
                    Abrir Menu
                  </button>
                  <div
                    className="absolute top-full mt-2 right-0 bg-white rounded-lg p-2 w-48"
                    style={{
                      boxShadow: '4px 8px 18px 2px rgba(0,0,0,0.18)',
                    }}
                  >
                    <div className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">
                      Opção 1
                    </div>
                    <div className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">
                      Opção 2
                    </div>
                    <div className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">
                      Opção 3
                    </div>
                  </div>
                </div>
              </div>
              <code className="text-xs bg-gray-900 text-green-400 p-3 rounded mt-4 block">
                shadow-overlay ou shadow-lg
              </code>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">📝 Diretrizes de Uso</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                ✅ Quando usar sombras
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Para criar hierarquia visual entre elementos</li>
                <li>Para destacar elementos interativos (cards, botões)</li>
                <li>
                  Para separar overlays do conteúdo base (modais, dropdowns)
                </li>
                <li>Para indicar estados hover e interação</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">❌ Evite</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Sombras muito intensas em elementos comuns</li>
                <li>Múltiplas camadas de sombra na mesma hierarquia</li>
                <li>Sombras em texto (use cor de fundo ao invés)</li>
                <li>Valores de sombra customizados fora do design system</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                🎯 Hierarquia de Elevação
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div>
                  <h4 className="font-medium mb-2">Baixa Elevação</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Background/Base: sem sombra</li>
                    <li>• Cards simples: shadow-sm</li>
                    <li>• Elementos sutis: shadow</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Alta Elevação</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Cards em destaque: shadow-md / shadow-lg</li>
                    <li>• Dropdowns: shadow-lg / shadow-xl</li>
                    <li>• Modais: shadow-2xl</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                🎨 Animações com Sombras
              </h3>
              <p className="text-gray-700 mb-2">
                Use sempre{' '}
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  transition-shadow
                </code>{' '}
                ou{' '}
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  transition-all
                </code>{' '}
                para animar sombras:
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                {`<div className="shadow-md hover:shadow-xl transition-shadow">
  Card com elevação animada
</div>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">♿ Acessibilidade</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Sombras não devem ser o único indicador de estado</li>
                <li>Combine sombras com mudanças de cor ou borda</li>
                <li>Garanta contraste adequado entre sombra e fundo</li>
                <li>Use sombras para reforçar hierarquia, não criá-la</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const MainShadows: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Sombras Principais</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ShadowCard
            name="Card"
            description="Para cards e elementos em destaque"
            shadowValue="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            usage="shadow-card"
          />
          <ShadowCard
            name="Modal"
            description="Para modais e overlays"
            shadowValue="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            usage="shadow-modal"
          />
          <ShadowCard
            name="Button"
            description="Para botões e interativos"
            shadowValue="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            usage="shadow-button"
          />
          <ShadowCard
            name="Overlay"
            description="Para dropdowns e popovers"
            shadowValue="4px 8px 18px 2px rgba(0,0,0,0.18)"
            usage="shadow-overlay"
          />
        </div>
      </div>
    </div>
  ),
}

export const TailwindShadows: Story = {
  render: () => (
    <div className="p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Sombras Tailwind</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Shadow SM</h3>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              shadow-sm
            </code>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold mb-2">Shadow</h3>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              shadow
            </code>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-semibold mb-2">Shadow MD</h3>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              shadow-md
            </code>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold mb-2">Shadow LG</h3>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              shadow-lg
            </code>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <h3 className="font-semibold mb-2">Shadow XL</h3>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              shadow-xl
            </code>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-2xl">
            <h3 className="font-semibold mb-2">Shadow 2XL</h3>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              shadow-2xl
            </code>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const InteractiveExamples: Story = {
  render: () => (
    <div className="p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold mb-6">Exemplos Interativos</h2>

        {/* Hover Cards */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Hover para ver elevação</h3>
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <p className="text-sm">shadow-sm → shadow-lg no hover</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-xl transition-shadow cursor-pointer">
            <p className="text-sm">shadow → shadow-xl no hover</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-2xl transition-shadow cursor-pointer">
            <p className="text-sm">shadow-md → shadow-2xl no hover</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Botões com Elevação</h3>
          <button className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105">
            Botão com Elevação
          </button>
        </div>
      </div>
    </div>
  ),
}
