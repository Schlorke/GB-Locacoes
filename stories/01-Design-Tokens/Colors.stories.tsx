import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Design Tokens/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sistema completo de cores do GB Locações. Todas as cores são definidas em design-tokens/base.json e devem ser usadas através de classes Tailwind CSS.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Color Swatch Component
const ColorSwatch = ({
  name,
  value,
  description,
}: {
  name: string
  value: string
  description: string
}) => (
  <div className="flex flex-col items-center gap-3">
    <div
      className="w-32 h-32 rounded-xl shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105"
      style={{ backgroundColor: value }}
    />
    <div className="text-center">
      <div className="font-semibold text-sm">{name}</div>
      <div className="font-mono text-xs text-gray-600">{value}</div>
      <div className="text-xs text-gray-500 mt-1 max-w-[150px]">
        {description}
      </div>
    </div>
  </div>
)

// Section Component
const ColorSection = ({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    {description && <p className="text-gray-600 mb-6">{description}</p>}
    <div className="flex flex-wrap gap-8">{children}</div>
  </div>
)

export const AllColors: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Sistema de Cores</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Paleta completa de cores do GB Locações. Use sempre estas cores
            através das classes Tailwind CSS para manter consistência visual em
            todo o projeto.
          </p>
        </div>

        {/* Primary Colors */}
        <ColorSection
          title="Cores Primárias"
          description="Cor principal da marca GB Locações - Orange"
        >
          <ColorSwatch
            name="Primary"
            value="#ea580c"
            description="Cor principal da marca - Orange 600"
          />
          <ColorSwatch
            name="Primary Light"
            value="#fed7aa"
            description="Variante clara - Orange 200"
          />
          <ColorSwatch
            name="Primary Dark"
            value="#f97316"
            description="Variante escura - Orange 500"
          />
        </ColorSection>

        {/* Secondary Colors */}
        <ColorSection
          title="Cores Secundárias"
          description="Cor secundária para contraste e hierarquia"
        >
          <ColorSwatch
            name="Secondary"
            value="#334155"
            description="Cor secundária - Slate 700"
          />
        </ColorSection>

        {/* Semantic Colors */}
        <ColorSection
          title="Cores Semânticas"
          description="Cores para feedback e estados da interface"
        >
          <ColorSwatch
            name="Success"
            value="#10b981"
            description="Sucesso e confirmação - Emerald 500"
          />
          <ColorSwatch
            name="Warning"
            value="#f59e0b"
            description="Avisos e atenção - Amber 500"
          />
          <ColorSwatch
            name="Error"
            value="#ef4444"
            description="Erros e ações destrutivas - Red 500"
          />
          <ColorSwatch
            name="Info"
            value="#3b82f6"
            description="Informação e neutralidade - Blue 500"
          />
        </ColorSection>

        {/* Background Colors */}
        <ColorSection
          title="Cores de Background"
          description="Backgrounds para diferentes contextos"
        >
          <ColorSwatch
            name="Background Primary"
            value="#f8fafc"
            description="Background principal - Slate 50"
          />
          <ColorSwatch
            name="Background Secondary"
            value="#dbeafe"
            description="Background secundário - Blue 50"
          />
          <ColorSwatch
            name="Background Card"
            value="rgba(255, 255, 255, 0.95)"
            description="Cards com transparência"
          />
        </ColorSection>

        {/* Text Colors */}
        <ColorSection
          title="Cores de Texto"
          description="Hierarquia de texto para legibilidade"
        >
          <ColorSwatch
            name="Text Primary"
            value="#111827"
            description="Texto principal - Gray 900"
          />
          <ColorSwatch
            name="Text Secondary"
            value="#6b7280"
            description="Texto secundário - Gray 500"
          />
          <ColorSwatch
            name="Text Muted"
            value="#9ca3af"
            description="Texto mudo - Gray 400"
          />
          <ColorSwatch
            name="Text White"
            value="#ffffff"
            description="Texto branco para fundos escuros"
          />
        </ColorSection>

        {/* Usage Guidelines */}
        <div className="mt-16 p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">📝 Diretrizes de Uso</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                ✅ Sempre use classes Tailwind
              </h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                {`<button className="bg-orange-600 hover:bg-orange-500">
  Botão Primário
</button>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                ❌ Nunca use cores hardcoded
              </h3>
              <pre className="bg-gray-900 text-red-400 p-4 rounded-lg overflow-x-auto">
                {`<button style={{ backgroundColor: '#ea580c' }}>
  NÃO FAÇA ISSO
</button>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                🎨 Referência Tailwind CSS
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-orange-600 text-white rounded-lg">
                  <code>bg-orange-600</code>
                  <div className="text-xs mt-1">Primary</div>
                </div>
                <div className="p-4 bg-slate-700 text-white rounded-lg">
                  <code>bg-slate-700</code>
                  <div className="text-xs mt-1">Secondary</div>
                </div>
                <div className="p-4 bg-emerald-500 text-white rounded-lg">
                  <code>bg-emerald-500</code>
                  <div className="text-xs mt-1">Success</div>
                </div>
                <div className="p-4 bg-amber-500 text-white rounded-lg">
                  <code>bg-amber-500</code>
                  <div className="text-xs mt-1">Warning</div>
                </div>
                <div className="p-4 bg-red-500 text-white rounded-lg">
                  <code>bg-red-500</code>
                  <div className="text-xs mt-1">Error</div>
                </div>
                <div className="p-4 bg-blue-500 text-white rounded-lg">
                  <code>bg-blue-500</code>
                  <div className="text-xs mt-1">Info</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                ♿ Contraste de Cores
              </h3>
              <p className="text-gray-600">
                Todas as combinações de cores seguem WCAG 2.1 AA para
                acessibilidade. Use sempre cores com contraste adequado:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Texto principal (#111827) em fundos claros</li>
                <li>Texto branco (#ffffff) em fundos escuros</li>
                <li>Contraste mínimo de 4.5:1 para texto normal</li>
                <li>Contraste mínimo de 3:1 para texto grande</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const PrimaryColors: Story = {
  render: () => (
    <div className="p-8">
      <ColorSection title="Cores Primárias">
        <ColorSwatch
          name="Primary"
          value="#ea580c"
          description="Cor principal da marca"
        />
        <ColorSwatch
          name="Primary Light"
          value="#fed7aa"
          description="Variante clara"
        />
        <ColorSwatch
          name="Primary Dark"
          value="#f97316"
          description="Variante escura"
        />
      </ColorSection>
    </div>
  ),
}

export const SemanticColors: Story = {
  render: () => (
    <div className="p-8">
      <ColorSection title="Cores Semânticas">
        <ColorSwatch
          name="Success"
          value="#10b981"
          description="Sucesso e confirmação"
        />
        <ColorSwatch
          name="Warning"
          value="#f59e0b"
          description="Avisos e atenção"
        />
        <ColorSwatch
          name="Error"
          value="#ef4444"
          description="Erros e destrutivo"
        />
        <ColorSwatch name="Info" value="#3b82f6" description="Informação" />
      </ColorSection>
    </div>
  ),
}

export const BackgroundColors: Story = {
  render: () => (
    <div className="p-8">
      <ColorSection title="Cores de Background">
        <ColorSwatch
          name="Background Primary"
          value="#f8fafc"
          description="Background principal"
        />
        <ColorSwatch
          name="Background Secondary"
          value="#dbeafe"
          description="Background secundário"
        />
        <ColorSwatch
          name="Background Card"
          value="rgba(255, 255, 255, 0.95)"
          description="Cards transparentes"
        />
      </ColorSection>
    </div>
  ),
}

export const TextColors: Story = {
  render: () => (
    <div className="p-8">
      <ColorSection title="Cores de Texto">
        <ColorSwatch
          name="Text Primary"
          value="#111827"
          description="Texto principal"
        />
        <ColorSwatch
          name="Text Secondary"
          value="#6b7280"
          description="Texto secundário"
        />
        <ColorSwatch
          name="Text Muted"
          value="#9ca3af"
          description="Texto mudo"
        />
        <ColorSwatch
          name="Text White"
          value="#ffffff"
          description="Texto branco"
        />
      </ColorSection>
    </div>
  ),
}
