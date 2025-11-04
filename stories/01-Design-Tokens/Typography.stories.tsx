import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Design Tokens/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sistema tipográfico completo do GB Locações com fontes, tamanhos, line-heights e letter-spacing. Todas as configurações são responsivas usando clamp().',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Typography Sample Component
const TypographySample = ({
  label,
  className,
  text,
  specs,
}: {
  label: string
  className: string
  text: string
  specs: string
}) => (
  <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-baseline justify-between mb-3">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <span className="text-xs font-mono text-gray-500">{specs}</span>
    </div>
    <div className={className}>{text}</div>
  </div>
)

export const AllTypography: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Sistema Tipográfico</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Hierarquia tipográfica completa com tamanhos responsivos usando
            clamp(). Todas as fontes se adaptam automaticamente ao tamanho da
            tela.
          </p>
        </div>

        {/* Font Families */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Famílias de Fontes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-3">Sans (Inter)</h3>
              <p className="font-sans text-gray-700 mb-2">
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="font-sans text-sm text-gray-500">
                Abcdefghijklmnopqrstuvwxyz
              </p>
              <p className="font-sans text-sm text-gray-500">
                0123456789 !@#$%^&*()
              </p>
              <code className="text-xs text-gray-600 mt-3 block">
                font-family: var(--font-inter), sans-serif
              </code>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-3">Heading (Jost)</h3>
              <p className="font-heading text-gray-700 mb-2">
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="font-heading text-sm text-gray-500">
                Abcdefghijklmnopqrstuvwxyz
              </p>
              <p className="font-heading text-sm text-gray-500">
                0123456789 !@#$%^&*()
              </p>
              <code className="text-xs text-gray-600 mt-3 block">
                font-family: var(--font-jost), sans-serif
              </code>
            </div>
          </div>
        </div>

        {/* Heading Hierarchy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hierarquia de Títulos</h2>
          <TypographySample
            label="H1"
            className="text-h1 font-bold font-heading"
            text="Título Principal"
            specs="clamp(2.5rem, 5vw, 3.5rem) | 40px-56px"
          />
          <TypographySample
            label="H2"
            className="text-h2 font-bold font-heading"
            text="Subtítulo Grande"
            specs="clamp(2rem, 4vw, 3rem) | 32px-48px"
          />
          <TypographySample
            label="H3"
            className="text-h3 font-semibold font-heading"
            text="Título de Seção"
            specs="clamp(1.5rem, 3vw, 2.25rem) | 24px-36px"
          />
          <TypographySample
            label="Base"
            className="text-base font-sans"
            text="Texto de corpo padrão para parágrafos e conteúdo geral"
            specs="clamp(1rem, 2vw, 1.125rem) | 16px-18px"
          />
          <TypographySample
            label="Small"
            className="text-small font-sans"
            text="Texto pequeno para legendas, disclaimers e texto secundário"
            specs="clamp(0.875rem, 1.5vw, 1rem) | 14px-16px"
          />
        </div>

        {/* Line Heights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Line Heights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Tight (1.2)
              </div>
              <p className="text-2xl leading-tight">
                Para títulos grandes onde espaçamento compacto é desejado.
                Geralmente usado em H1 e H2.
              </p>
              <code className="text-xs text-gray-600 mt-3 block">
                line-height: 1.2
              </code>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Normal (1.3)
              </div>
              <p className="text-2xl leading-normal">
                Para subtítulos e títulos médios. Proporciona boa legibilidade
                mantendo densidade.
              </p>
              <code className="text-xs text-gray-600 mt-3 block">
                line-height: 1.3
              </code>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Relaxed (1.4)
              </div>
              <p className="text-lg leading-relaxed">
                Para títulos menores e texto que precisa de mais respiração.
                Equilibra densidade e legibilidade.
              </p>
              <code className="text-xs text-gray-600 mt-3 block">
                line-height: 1.4
              </code>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Loose (1.6)
              </div>
              <p className="text-base leading-loose">
                Para corpo de texto e parágrafos longos. Maximiza legibilidade e
                conforto de leitura em blocos de texto extensos.
              </p>
              <code className="text-xs text-gray-600 mt-3 block">
                line-height: 1.6
              </code>
            </div>
          </div>
        </div>

        {/* Letter Spacing */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Letter Spacing</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Tight (-0.015em)
              </div>
              <p className="text-3xl tracking-tight">
                ESPAÇAMENTO APERTADO PARA TÍTULOS
              </p>
              <code className="text-xs text-gray-600 mt-3 block">
                letter-spacing: -0.015em
              </code>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Normal (0em)
              </div>
              <p className="text-2xl tracking-normal">
                Espaçamento padrão para texto regular
              </p>
              <code className="text-xs text-gray-600 mt-3 block">
                letter-spacing: 0em
              </code>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                Wide (0.015em)
              </div>
              <p className="text-xl tracking-wide">
                E S P A Ç A M E N T O L A R G O P A R A Ê N F A S E
              </p>
              <code className="text-xs text-gray-600 mt-3 block">
                letter-spacing: 0.015em
              </code>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Exemplos de Uso</h2>
          <div className="space-y-6">
            {/* Example 1: Hero Section */}
            <div className="p-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl">
              <h1 className="text-h1 font-bold font-heading tracking-tight mb-4">
                Aluguel de Equipamentos
              </h1>
              <p className="text-xl leading-relaxed max-w-2xl">
                Encontre os melhores equipamentos para construção civil com
                entrega rápida e preços competitivos em Porto Alegre.
              </p>
            </div>

            {/* Example 2: Content Section */}
            <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-h2 font-bold font-heading mb-4">
                Por que escolher a GB Locações?
              </h2>
              <p className="text-base leading-loose text-gray-700 mb-4">
                Com mais de 10 anos de experiência no mercado, oferecemos uma
                ampla variedade de equipamentos de alta qualidade. Nossa equipe
                está sempre pronta para ajudar você a encontrar a solução
                perfeita para seu projeto.
              </p>
              <p className="text-small text-gray-500">
                * Equipamentos certificados e regularizados
              </p>
            </div>

            {/* Example 3: Card */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-h3 font-semibold font-heading mb-3">
                Betoneira 400L
              </h3>
              <p className="text-base text-gray-600 mb-4 leading-relaxed">
                Ideal para obras de médio porte, mistura concreto com eficiência
                e rapidez.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-orange-600">
                  R$ 180
                </span>
                <span className="text-small text-gray-500">/dia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">📝 Diretrizes de Uso</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">✅ Sempre use</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    text-h1
                  </code>
                  ,{' '}
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    text-h2
                  </code>
                  ,{' '}
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    text-h3
                  </code>{' '}
                  para títulos
                </li>
                <li>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    font-heading
                  </code>{' '}
                  para títulos e headings
                </li>
                <li>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    font-sans
                  </code>{' '}
                  para corpo de texto
                </li>
                <li>Line heights apropriados para cada contexto</li>
                <li>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    tracking-tight
                  </code>{' '}
                  em títulos grandes
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">❌ Evite</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tamanhos de fonte fixos sem clamp()</li>
                <li>
                  Misturar fontes fora do sistema (Inter e Jost são suficientes)
                </li>
                <li>Line-heights muito compactos em texto longo</li>
                <li>Letter-spacing exagerado em corpo de texto</li>
                <li>Mais de 3 níveis de hierarquia na mesma tela</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                📱 Responsividade Automática
              </h3>
              <p className="text-gray-700">
                Todos os tamanhos de fonte usam{' '}
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  clamp()
                </code>{' '}
                para se adaptar automaticamente:
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto mt-2">
                {`/* H1 - Se adapta de 40px (mobile) a 56px (desktop) */
font-size: clamp(2.5rem, 5vw, 3.5rem);

/* Base - Se adapta de 16px (mobile) a 18px (desktop) */
font-size: clamp(1rem, 2vw, 1.125rem);`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">♿ Acessibilidade</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Tamanho mínimo de texto: 16px para corpo</li>
                <li>Line-height mínimo: 1.5 para parágrafos (WCAG 2.1 AA)</li>
                <li>Contraste adequado com o fundo</li>
                <li>Hierarquia semântica com tags HTML corretas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const FontFamilies: Story = {
  render: () => (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Famílias de Fontes</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Sans (Inter)</h3>
          <p className="font-sans text-gray-700 text-xl mb-4">
            The quick brown fox jumps over the lazy dog
          </p>
          <div className="space-y-1 text-sm">
            <p className="font-sans font-light">Light 300</p>
            <p className="font-sans font-normal">Regular 400</p>
            <p className="font-sans font-medium">Medium 500</p>
            <p className="font-sans font-semibold">Semibold 600</p>
            <p className="font-sans font-bold">Bold 700</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Heading (Jost)</h3>
          <p className="font-heading text-gray-700 text-xl mb-4">
            The quick brown fox jumps over the lazy dog
          </p>
          <div className="space-y-1 text-sm">
            <p className="font-heading font-light">Light 300</p>
            <p className="font-heading font-normal">Regular 400</p>
            <p className="font-heading font-medium">Medium 500</p>
            <p className="font-heading font-semibold">Semibold 600</p>
            <p className="font-heading font-bold">Bold 700</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const HeadingHierarchy: Story = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-h1 font-bold font-heading">H1 - Título Principal</h1>
      <h2 className="text-h2 font-bold font-heading">H2 - Subtítulo Grande</h2>
      <h3 className="text-h3 font-semibold font-heading">
        H3 - Título de Seção
      </h3>
      <p className="text-base font-sans leading-loose">
        Base - Texto de corpo padrão para parágrafos e conteúdo geral. Este é o
        tamanho mais usado em toda a aplicação.
      </p>
      <p className="text-small font-sans text-gray-600">
        Small - Texto pequeno para legendas, disclaimers e texto secundário.
      </p>
    </div>
  ),
}

export const LineHeights: Story = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="font-semibold mb-3">Tight (1.2)</h3>
        <p className="text-2xl leading-tight">
          Para títulos grandes onde espaçamento compacto é desejado. Geralmente
          usado em H1 e H2.
        </p>
      </div>
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="font-semibold mb-3">Normal (1.3)</h3>
        <p className="text-2xl leading-normal">
          Para subtítulos e títulos médios. Proporciona boa legibilidade
          mantendo densidade.
        </p>
      </div>
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="font-semibold mb-3">Relaxed (1.4)</h3>
        <p className="text-lg leading-relaxed">
          Para títulos menores e texto que precisa de mais respiração. Equilibra
          densidade e legibilidade.
        </p>
      </div>
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="font-semibold mb-3">Loose (1.6)</h3>
        <p className="text-base leading-loose">
          Para corpo de texto e parágrafos longos. Maximiza legibilidade e
          conforto de leitura em blocos de texto extensos.
        </p>
      </div>
    </div>
  ),
}

export const LetterSpacing: Story = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="font-semibold mb-3 text-sm">Tight (-0.015em)</h3>
        <p className="text-3xl tracking-tight">
          ESPAÇAMENTO APERTADO PARA TÍTULOS
        </p>
      </div>
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="font-semibold mb-3 text-sm">Normal (0em)</h3>
        <p className="text-2xl tracking-normal">
          Espaçamento padrão para texto regular
        </p>
      </div>
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="font-semibold mb-3 text-sm">Wide (0.015em)</h3>
        <p className="text-xl tracking-wide">
          E S P A Ç A M E N T O L A R G O P A R A Ê N F A S E
        </p>
      </div>
    </div>
  ),
}
