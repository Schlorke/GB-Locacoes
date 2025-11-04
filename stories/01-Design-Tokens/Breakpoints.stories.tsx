import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Design Tokens/Breakpoints',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sistema de breakpoints responsivos baseado em Tailwind CSS. Abordagem mobile-first para criar interfaces adaptáveis a qualquer tamanho de tela.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Breakpoint Info Component
const BreakpointInfo = ({
  name,
  size,
  prefix,
  description,
  useCases,
}: {
  name: string
  size: string
  prefix: string
  description: string
  useCases: string[]
}) => (
  <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-2xl font-mono text-orange-600">{size}</span>
          <code className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded">
            {prefix}
          </code>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-500">Prefixo</div>
        <code className="text-lg font-mono font-semibold">{prefix}</code>
      </div>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div>
      <div className="text-sm font-semibold text-gray-700 mb-2">
        Casos de Uso:
      </div>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
        {useCases.map((useCase, index) => (
          <li key={index}>{useCase}</li>
        ))}
      </ul>
    </div>
  </div>
)

export const AllBreakpoints: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Sistema de Breakpoints</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Breakpoints responsivos baseados em Tailwind CSS. Use abordagem
            mobile-first: estilos base para mobile, depois adicione breakpoints
            para telas maiores.
          </p>
        </div>

        {/* Breakpoints Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Breakpoints Disponíveis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <BreakpointInfo
              name="Base (Mobile)"
              size="< 640px"
              prefix="(sem prefixo)"
              description="Estilo padrão aplicado a todos os tamanhos. Comece sempre daqui."
              useCases={[
                'Smartphones em modo retrato',
                'Estilos base mobile-first',
                'Layout em coluna única',
              ]}
            />
            <BreakpointInfo
              name="Small"
              size="≥ 640px"
              prefix="sm:"
              description="Tablets pequenos e smartphones grandes em modo paisagem."
              useCases={[
                'Tablets pequenos (iPad Mini)',
                'Smartphones grandes em paisagem',
                'Ajustes iniciais de layout',
              ]}
            />
            <BreakpointInfo
              name="Medium"
              size="≥ 768px"
              prefix="md:"
              description="Tablets em modo retrato e laptops pequenos."
              useCases={[
                'iPad em modo retrato',
                'Tablets Android',
                'Transição para layouts de duas colunas',
              ]}
            />
            <BreakpointInfo
              name="Large"
              size="≥ 1024px"
              prefix="lg:"
              description="Laptops e tablets em modo paisagem."
              useCases={[
                'Laptops padrão (13-15")',
                'iPad em modo paisagem',
                'Layouts de múltiplas colunas',
              ]}
            />
            <BreakpointInfo
              name="Extra Large"
              size="≥ 1280px"
              prefix="xl:"
              description="Desktops e monitores grandes."
              useCases={[
                'Monitores desktop padrão',
                'Laptops grandes (17")',
                'Layouts expandidos',
              ]}
            />
            <BreakpointInfo
              name="2X Extra Large"
              size="≥ 1536px"
              prefix="2xl:"
              description="Monitores muito grandes e telas 4K."
              useCases={[
                'Monitores 4K',
                'Telas ultrawide',
                'Layouts com espaçamento máximo',
              ]}
            />
          </div>
        </div>

        {/* Visual Demonstration */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Demonstração Visual</h2>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-700 mb-2">
                Redimensione a janela para ver as mudanças:
              </div>
            </div>
            <div className="space-y-4">
              {/* Background Color Changes */}
              <div className="p-6 rounded-lg bg-red-100 sm:bg-orange-100 md:bg-yellow-100 lg:bg-green-100 xl:bg-blue-100 2xl:bg-purple-100">
                <div className="text-sm font-mono">
                  <span className="block sm:hidden">
                    Base (Mobile): bg-red-100
                  </span>
                  <span className="hidden sm:block md:hidden">
                    Small (≥640px): bg-orange-100
                  </span>
                  <span className="hidden md:block lg:hidden">
                    Medium (≥768px): bg-yellow-100
                  </span>
                  <span className="hidden lg:block xl:hidden">
                    Large (≥1024px): bg-green-100
                  </span>
                  <span className="hidden xl:block 2xl:hidden">
                    Extra Large (≥1280px): bg-blue-100
                  </span>
                  <span className="hidden 2xl:block">
                    2XL (≥1536px): bg-purple-100
                  </span>
                </div>
              </div>

              {/* Grid Layout Changes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-orange-500 text-white p-4 rounded-lg text-center font-semibold"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <code className="text-xs bg-gray-900 text-green-400 p-3 rounded block">
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                xl:grid-cols-5 2xl:grid-cols-6
              </code>

              {/* Text Size Changes */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">
                  Texto Responsivo
                </p>
                <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded mt-2 inline-block">
                  text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                  2xl:text-4xl
                </code>
              </div>

              {/* Padding Changes */}
              <div className="bg-orange-500/20 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20 rounded-lg">
                <div className="bg-white p-4 rounded">
                  <p className="text-sm">Padding aumenta com o breakpoint</p>
                  <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded mt-2 inline-block">
                    p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Responsive Patterns */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Padrões Responsivos Comuns
          </h2>

          <div className="space-y-6">
            {/* Container Width */}
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-3">
                Largura de Container
              </h3>
              <div className="bg-gray-50 p-4 rounded">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-orange-500/20 py-8 rounded">
                  <p className="text-sm text-center">
                    Container com largura máxima e padding responsivo
                  </p>
                </div>
              </div>
              <code className="text-sm bg-gray-900 text-green-400 p-3 rounded mt-3 block">
                max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
              </code>
            </div>

            {/* Hidden/Visible */}
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-3">
                Mostrar/Ocultar por Breakpoint
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-100 rounded block md:hidden">
                  <p className="text-sm font-semibold">
                    Visível apenas em Mobile (block md:hidden)
                  </p>
                </div>
                <div className="p-4 bg-green-100 rounded hidden md:block lg:hidden">
                  <p className="text-sm font-semibold">
                    Visível apenas em Tablet (hidden md:block lg:hidden)
                  </p>
                </div>
                <div className="p-4 bg-blue-100 rounded hidden lg:block">
                  <p className="text-sm font-semibold">
                    Visível apenas em Desktop (hidden lg:block)
                  </p>
                </div>
              </div>
            </div>

            {/* Flex Direction */}
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-3">Direção do Flex</h3>
              <div className="flex flex-col md:flex-row gap-4 bg-gray-50 p-4 rounded">
                <div className="flex-1 bg-orange-500 text-white p-4 rounded text-center">
                  Item 1
                </div>
                <div className="flex-1 bg-orange-500 text-white p-4 rounded text-center">
                  Item 2
                </div>
                <div className="flex-1 bg-orange-500 text-white p-4 rounded text-center">
                  Item 3
                </div>
              </div>
              <code className="text-sm bg-gray-900 text-green-400 p-3 rounded mt-3 block">
                flex flex-col md:flex-row
              </code>
              <p className="text-sm text-gray-600 mt-2">
                Coluna em mobile, linha em tablet e maior
              </p>
            </div>

            {/* Grid Columns */}
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-3">
                Grid Responsivo de Produtos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div
                    key={item}
                    className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 rounded-lg text-center font-semibold h-32 flex items-center justify-center"
                  >
                    Produto {item}
                  </div>
                ))}
              </div>
              <code className="text-sm bg-gray-900 text-green-400 p-3 rounded mt-3 block">
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
              </code>
              <p className="text-sm text-gray-600 mt-2">
                1 coluna (mobile) → 2 colunas (tablet) → 3 colunas (laptop) → 4
                colunas (desktop)
              </p>
            </div>
          </div>
        </div>

        {/* Testing Your Layout */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Testando Responsividade</h2>
          <div className="p-8 bg-white rounded-xl shadow-md">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  🔧 Ferramentas de Desenvolvimento
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>
                    Chrome DevTools: F12 → Toggle device toolbar (Ctrl+Shift+M)
                  </li>
                  <li>Firefox: F12 → Responsive Design Mode (Ctrl+Shift+M)</li>
                  <li>
                    Storybook: Use o addon Viewport para testar breakpoints
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">
                  📱 Dispositivos Comuns para Testar
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <h4 className="font-medium mb-2">Mobile</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• iPhone 12/13/14: 390x844</li>
                      <li>• Samsung Galaxy S21: 360x800</li>
                      <li>• iPhone SE: 375x667</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tablet</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• iPad: 768x1024</li>
                      <li>• iPad Pro: 1024x1366</li>
                      <li>• Samsung Tab: 800x1280</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Desktop</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Laptop: 1366x768</li>
                      <li>• Desktop HD: 1920x1080</li>
                      <li>• 4K: 3840x2160</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">📝 Diretrizes de Uso</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                ✅ Mobile-First Sempre
              </h3>
              <p className="text-gray-700 mb-2">
                Sempre comece com estilos para mobile e adicione breakpoints
                maiores:
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                {`{/* ✅ CORRETO */}
<div className="text-base md:text-lg lg:text-xl">
  Texto responsivo
</div>

{/* ❌ EVITE (Desktop-first) */}
<div className="text-xl lg:text-lg md:text-base">
  Confuso e difícil de manter
</div>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                🎯 Use Breakpoints Estrategicamente
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Não adicione breakpoints desnecessários</li>
                <li>Foque em 2-3 breakpoints principais (base, md, lg)</li>
                <li>Adicione xl e 2xl apenas quando necessário</li>
                <li>Mantenha código simples e legível</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                📱 Padrões Obrigatórios do Projeto
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded">
                  <strong>Containers:</strong>
                  <code className="text-sm bg-gray-900 text-green-400 px-2 py-1 rounded ml-2">
                    px-4 sm:px-6 lg:px-8
                  </code>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <strong>Seções:</strong>
                  <code className="text-sm bg-gray-900 text-green-400 px-2 py-1 rounded ml-2">
                    py-12 md:py-16 lg:py-20
                  </code>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <strong>Grids de Cards:</strong>
                  <code className="text-sm bg-gray-900 text-green-400 px-2 py-1 rounded ml-2">
                    grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                  </code>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <strong>Gaps:</strong>
                  <code className="text-sm bg-gray-900 text-green-400 px-2 py-1 rounded ml-2">
                    gap-6 md:gap-8 lg:gap-12
                  </code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                ♿ Acessibilidade Responsiva
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Áreas de toque mínimas: 44x44px em mobile</li>
                <li>Texto legível: mínimo 16px em mobile</li>
                <li>Espaçamento adequado entre elementos interativos</li>
                <li>Teste navegação por teclado em todos os breakpoints</li>
                <li>Certifique-se que modais funcionam em mobile</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">🚀 Performance</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Imagens responsivas: use srcset e sizes</li>
                <li>Lazy loading para imagens abaixo da fold</li>
                <li>Evite carregar recursos desnecessários em mobile</li>
                <li>Teste performance em dispositivos reais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const BreakpointList: Story = {
  render: () => (
    <div className="p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Breakpoints Disponíveis</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <BreakpointInfo
            name="Base"
            size="< 640px"
            prefix="(sem prefixo)"
            description="Mobile padrão"
            useCases={['Smartphones', 'Layout mobile-first']}
          />
          <BreakpointInfo
            name="Small"
            size="≥ 640px"
            prefix="sm:"
            description="Tablets pequenos"
            useCases={['Smartphones grandes', 'Tablets pequenos']}
          />
          <BreakpointInfo
            name="Medium"
            size="≥ 768px"
            prefix="md:"
            description="Tablets"
            useCases={['iPad', 'Tablets Android']}
          />
          <BreakpointInfo
            name="Large"
            size="≥ 1024px"
            prefix="lg:"
            description="Laptops"
            useCases={['Laptops', 'Tablets em paisagem']}
          />
          <BreakpointInfo
            name="Extra Large"
            size="≥ 1280px"
            prefix="xl:"
            description="Desktops"
            useCases={['Monitores desktop', 'Laptops grandes']}
          />
          <BreakpointInfo
            name="2XL"
            size="≥ 1536px"
            prefix="2xl:"
            description="Telas grandes"
            useCases={['4K', 'Ultrawide']}
          />
        </div>
      </div>
    </div>
  ),
}

export const ResponsiveGrid: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Grid Responsivo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <div
            key={item}
            className="bg-orange-500 text-white p-4 rounded-lg text-center font-semibold"
          >
            {item}
          </div>
        ))}
      </div>
      <code className="text-sm bg-gray-900 text-green-400 p-3 rounded mt-4 block">
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        2xl:grid-cols-6
      </code>
    </div>
  ),
}

export const ResponsiveText: Story = {
  render: () => (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tipografia Responsiva</h2>
      <div className="space-y-6">
        <div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">
            Texto que cresce com breakpoints
          </p>
          <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">
            text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
          </code>
        </div>
        <div>
          <p className="text-sm md:text-base lg:text-lg text-gray-600">
            Texto de corpo responsivo para melhor legibilidade
          </p>
          <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">
            text-sm md:text-base lg:text-lg
          </code>
        </div>
      </div>
    </div>
  ),
}
