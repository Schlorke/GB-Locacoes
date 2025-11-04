import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Calendar, MapPin, Package, Star, User } from 'lucide-react'

const meta = {
  title: 'Public/Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de card flexível e composável com subcomponentes para header, conteúdo e footer. Ideal para agrupar informações relacionadas.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Default Story (baseline)
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
}

// Playground Story
export const Playground: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Playground Card</CardTitle>
        <CardDescription>
          Experimente modificar este card para ver diferentes variações.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Este é o conteúdo principal do card. Você pode adicionar qualquer
          elemento aqui.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
}

// Simple Card (minimal)
export const Simple: Story = {
  render: () => (
    <Card className="w-80 p-6">
      <p>Card simples sem subcomponentes</p>
    </Card>
  ),
}

// With Header Only
export const WithHeaderOnly: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Apenas Header</CardTitle>
        <CardDescription>Card com apenas cabeçalho</CardDescription>
      </CardHeader>
    </Card>
  ),
}

// With Content Only
export const WithContentOnly: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent className="pt-6">
        <p>Card com apenas conteúdo, sem header ou footer.</p>
      </CardContent>
    </Card>
  ),
}

// Product Card
export const ProductCard: Story = {
  render: () => (
    <Card className="w-80 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600" />
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Betoneira 400L</CardTitle>
          <Badge>Disponível</Badge>
        </div>
        <CardDescription>Equipamento para construção</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>Capacidade: 400 litros</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Porto Alegre, RS</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-orange-600">R$ 180</div>
          <div className="text-xs text-gray-500">/dia</div>
        </div>
        <Button>Solicitar</Button>
      </CardFooter>
    </Card>
  ),
}

// User Profile Card
export const UserProfileCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
          JD
        </div>
        <CardTitle>João da Silva</CardTitle>
        <CardDescription>Cliente desde 2023</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-gray-500" />
            <span>joao@email.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>Porto Alegre, RS</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Membro desde Jan 2023</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          Ver Perfil
        </Button>
      </CardFooter>
    </Card>
  ),
}

// Stats Card
export const StatsCard: Story = {
  render: () => (
    <Card className="w-64">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Total de Aluguéis
        </CardTitle>
        <Package className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">1,234</div>
        <p className="text-xs text-green-600 mt-1">
          +12% em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  ),
}

// Review Card
export const ReviewCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
              M
            </div>
            <div>
              <CardTitle className="text-base">Maria Santos</CardTitle>
              <CardDescription>Há 2 dias</CardDescription>
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">
          Excelente serviço! Os equipamentos estavam em perfeito estado e a
          entrega foi pontual. Recomendo!
        </p>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Avaliação de Betoneira 400L
      </CardFooter>
    </Card>
  ),
}

// Notification Card
export const NotificationCard: Story = {
  render: () => (
    <Card className="w-96 border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="text-base">Nova Reserva Confirmada</CardTitle>
        <CardDescription>Há 5 minutos</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Sua reserva para <strong>Betoneira 400L</strong> foi confirmada para o
          dia 15/01/2025.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="ghost">
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  ),
}

// Pricing Card
export const PricingCard: Story = {
  render: () => (
    <Card className="w-80 text-center border-2 border-orange-500">
      <CardHeader>
        <CardDescription>Plano</CardDescription>
        <CardTitle className="text-3xl">Premium</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <span className="text-4xl font-bold">R$ 299</span>
          <span className="text-gray-600">/mês</span>
        </div>
        <ul className="space-y-2 text-sm text-left">
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
              ✓
            </div>
            <span>Até 10 aluguéis simultâneos</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
              ✓
            </div>
            <span>Entrega prioritária</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
              ✓
            </div>
            <span>Suporte 24/7</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
              ✓
            </div>
            <span>Desconto de 15%</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Assinar Agora</Button>
      </CardFooter>
    </Card>
  ),
}

// Hoverable Cards
export const HoverableCards: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Card className="w-64 hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>Hover Shadow</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Sombra aumenta no hover</p>
        </CardContent>
      </Card>

      <Card className="w-64 hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
        <CardHeader>
          <CardTitle>Hover Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Escala e sombra no hover</p>
        </CardContent>
      </Card>

      <Card className="w-64 hover:border-orange-500 transition-colors cursor-pointer">
        <CardHeader>
          <CardTitle>Hover Border</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Borda muda de cor no hover</p>
        </CardContent>
      </Card>
    </div>
  ),
}

// Grid of Cards
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card key={item} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Card {item}</CardTitle>
            <CardDescription>Descrição do card {item}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Conteúdo do card número {item}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Ver Mais
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Cards Básicos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Card Simples</CardTitle>
              <CardDescription>Com todos os subcomponentes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Conteúdo do card</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Ação</Button>
            </CardFooter>
          </Card>

          <Card className="w-full p-6">
            <p>Card sem subcomponentes</p>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Cards Especializados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Estatística
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
            </CardContent>
          </Card>

          <Card className="w-full border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="text-base">Notificação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Mensagem importante</p>
            </CardContent>
          </Card>

          <Card className="w-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">Interativo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Hover para ver efeito</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
}
