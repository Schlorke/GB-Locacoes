import React from 'react'
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
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de card reutilizável com header, content, footer e outros subcomponentes. Baseado no ShadCN UI.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Card> = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
        <CardDescription>
          Descrição do card com informações adicionais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Conteúdo principal do card. Aqui você pode adicionar qualquer
          conteúdo.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Ação</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: StoryObj<typeof Card> = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="p-6">
        <p>Card simples apenas com conteúdo</p>
      </CardContent>
    </Card>
  ),
}

export const WithHeader: StoryObj<typeof Card> = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card com Header</CardTitle>
        <CardDescription>Descrição detalhada do conteúdo</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Conteúdo do card com header e descrição.</p>
      </CardContent>
    </Card>
  ),
}

export const ProductCard: StoryObj<typeof Card> = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
          <span className="text-muted-foreground">Imagem do Produto</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">Nome do Produto</CardTitle>
        <CardDescription className="mt-2">
          Descrição do produto que explica suas características e benefícios.
        </CardDescription>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold">R$ 299,90</span>
          <Badge variant="secondary">Em Estoque</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Adicionar ao Carrinho</Button>
      </CardFooter>
    </Card>
  ),
}

export const StatsCard: StoryObj<typeof Card> = {
  render: () => (
    <Card className="w-[200px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2,350</div>
        <p className="text-xs text-muted-foreground">+180.1% do mês passado</p>
      </CardContent>
    </Card>
  ),
}
