import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AlertCircle, Info, Trash2 } from 'lucide-react'

const meta = {
  title: 'Public/Organisms/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de modal/dialog acessível baseado em Radix UI. Para exibir conteúdo sobreposto que requer atenção do usuário.',
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Título do Dialog</DialogTitle>
          <DialogDescription>
            Descrição explicando o propósito deste dialog.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">Conteúdo do dialog aqui.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Playground
export const Playground: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description goes here.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Content</p>
        </div>
        <DialogFooter>
          <Button>Action</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Simple Dialog
export const Simple: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Info</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informação Importante</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Esta é uma mensagem informativa simples para o usuário.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  ),
}

// Confirmation Dialog
export const ConfirmationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Deletar Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Confirmar Exclusão
          </DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Tem certeza que deseja continuar?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Você está prestes a deletar permanentemente este item.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Form Dialog
export const FormDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Novo Cadastro</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Equipamento</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo equipamento.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Nome do equipamento" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input id="category" placeholder="Categoria" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Preço/dia</Label>
            <Input id="price" type="number" placeholder="0.00" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Info Dialog
export const InfoDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Info className="mr-2 h-4 w-4" />
          Mais Informações
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sobre este Equipamento</DialogTitle>
          <DialogDescription>
            Especificações técnicas detalhadas
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-1">Capacidade</h4>
            <p className="text-sm text-gray-600">400 litros</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Peso</h4>
            <p className="text-sm text-gray-600">180kg</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Dimensões</h4>
            <p className="text-sm text-gray-600">120cm x 80cm x 140cm</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Voltagem</h4>
            <p className="text-sm text-gray-600">220V</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Entendi</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Alert Dialog (Warning)
export const AlertDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Importante</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-yellow-900 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Atenção Necessária
          </DialogTitle>
          <DialogDescription>
            Esta ação requer sua confirmação antes de prosseguir.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 px-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-900">
            Ao continuar, você concorda em assumir responsabilidade pelo
            equipamento alugado.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Voltar</Button>
          </DialogClose>
          <Button>Concordo e Continuo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Custom Size
export const CustomSize: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Dialog Grande</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Dialog com Tamanho Customizado</DialogTitle>
          <DialogDescription>Este dialog usa max-w-3xl</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Conteúdo que precisa de mais espaço horizontal.
          </p>
        </div>
        <DialogFooter>
          <Button>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// All Examples
export const AllExamples: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Básico</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Básico</DialogTitle>
            <DialogDescription>Descrição do dialog</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">Conteúdo aqui</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Confirmação</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Ação</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja continuar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Não</Button>
            </DialogClose>
            <Button variant="destructive">Sim, deletar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Com Formulário</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>Atualize suas informações</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dialog-name">Nome</Label>
              <Input id="dialog-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dialog-email">Email</Label>
              <Input id="dialog-email" type="email" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
}
