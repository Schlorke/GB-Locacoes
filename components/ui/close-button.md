# CloseButton - Componente Universal de Fechamento

Este é o componente universal de botão Close que deve ser usado em todo o projeto GB Locações.

## Características

- **Consistência visual**: Mantém o mesmo estilo em todo o projeto
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Acessível**: Inclui labels e suporte a screen readers
- **Customizável**: Permite diferentes variantes e tamanhos

## Props

\`\`\`typescript
interface CloseButtonProps {
onClick?: () => void; // Função chamada ao clicar
className?: string; // Classes CSS customizadas
size?: 'sm' | 'md' | 'lg'; // Tamanho do botão
variant?: 'default' | 'ghost' | 'outline'; // Variante visual
disabled?: boolean; // Estado desabilitado
'aria-label'?: string; // Label para acessibilidade
}
\`\`\`

## Variantes

### Default

- Fundo cinza claro com borda
- Hover laranja
- Ideal para modais e dialogs

### Ghost

- Transparente
- Hover com fundo sutil
- Ideal para áreas com fundo colorido

### Outline

- Apenas borda
- Fundo transparente
- Ideal para interfaces minimalistas

## Tamanhos

- **sm**: 24x24px com ícone 12x12px
- **md**: 32x32px com ícone 16x16px (padrão)
- **lg**: 40x40px com ícone 20x20px

## Exemplos de Uso

### Básico

\`\`\`tsx
import { CloseButton } from '@/components/ui/close-button';

<CloseButton onClick={() => setIsOpen(false)} />;
\`\`\`

### Com variante ghost

\`\`\`tsx
<CloseButton onClick={() => setIsOpen(false)} variant="ghost" size="sm" />
\`\`\`

### Com classes customizadas

\`\`\`tsx
<CloseButton
onClick={() => setIsOpen(false)}
className="absolute top-4 right-4 text-red-500"
variant="outline"
/>
\`\`\`

### Para uso com Radix UI

\`\`\`tsx
import \* as Dialog from '@radix-ui/react-dialog';

<Dialog.Close asChild>
<CloseButton />
</Dialog.Close>;
\`\`\`

## Componentes Já Atualizados

Os seguintes componentes já foram atualizados para usar o CloseButton:

- ✅ `Dialog` (`/components/ui/dialog.tsx`)
- ✅ `Sheet` (`/components/ui/sheet.tsx`) - Sidebar mobile
- ✅ `Toast` (`/components/ui/toast.tsx`)
- ✅ `ImageUpload` (`/components/ui/image-upload.tsx`)
- ✅ `WhatsAppFAB` (`/components/whatsapp-fab.tsx`)

## Implementação

O componente está localizado em:
`/components/ui/close-button.tsx`

E é automaticamente aplicado em todos os dialogs, sheets, toasts e outros componentes que precisam de botão de fechamento.

## Acessibilidade

- Inclui `aria-label` padrão ("Close")
- Suporte completo a navegação por teclado
- Screen reader friendly com `<span className="sr-only">`
- Focus states bem definidos

## Consistência Visual

O botão segue o design system do projeto:

- Cores baseadas em Slate
- Hover em laranja (#orange-500)
- Transições suaves
- Bordas arredondadas
- Sombras sutis
