# Funções Play no Storybook - GB Locações

## O que são Play Functions?

As funções `play` são pequenos trechos de código que são executados após a renderização da story. Elas permitem interagir com seus componentes e testar cenários que normalmente requerem intervenção do usuário.

## Como usar

### Estrutura básica

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InteractiveButton: Story = {
  args: {
    children: 'Clique em mim!',
  },
  play: async ({ canvas, userEvent }) => {
    // Aguarda a renderização
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Encontra o botão
    const button = canvas.getByRole('button', { name: /clique em mim!/i });

    // Simula interações
    await userEvent.hover(button);
    await userEvent.click(button);
  },
};
```

### Parâmetros disponíveis

- **`canvas`**: Objeto que permite consultar o DOM da story renderizada
- **`userEvent`**: Biblioteca para simular interações do usuário
- **`context`**: Contexto da story (para combinar play functions)

## Exemplos práticos

### 1. Interação com formulários

```tsx
export const FormInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    // Preenche campos
    const nameInput = canvas.getByLabelText('Nome Completo *', {
      selector: 'input',
    });
    await userEvent.type(nameInput, 'João Silva', { delay: 50 });

    const emailInput = canvas.getByLabelText('E-mail *', {
      selector: 'input',
    });
    await userEvent.type(emailInput, 'joao@exemplo.com', { delay: 50 });

    // Clica no botão de enviar
    const submitButton = canvas.getByRole('button', { name: /enviar/i });
    await userEvent.click(submitButton);
  },
};
```

### 2. Validação de formulários

```tsx
export const FormValidation: Story = {
  play: async ({ canvas, userEvent }) => {
    // Tenta enviar sem preencher campos obrigatórios
    const submitButton = canvas.getByRole('button', { name: /enviar/i });
    await userEvent.click(submitButton);

    // Aguarda para ver os erros
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Preenche apenas um campo
    const nameInput = canvas.getByLabelText('Nome *');
    await userEvent.type(nameInput, 'João Teste', { delay: 50 });

    // Tenta enviar novamente
    await userEvent.click(submitButton);
  },
};
```

### 3. Múltiplas interações

```tsx
export const MultipleInteractions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="default">Primário</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    // Clica em cada botão em sequência
    const primaryButton = canvas.getByRole('button', { name: /primário/i });
    await userEvent.click(primaryButton);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const secondaryButton = canvas.getByRole('button', { name: /secundário/i });
    await userEvent.click(secondaryButton);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const outlineButton = canvas.getByRole('button', { name: /outline/i });
    await userEvent.click(outlineButton);
  },
};
```

## Métodos do userEvent

### Interações básicas

- `click(element)`: Clica em um elemento
- `dblClick(element)`: Duplo clique
- `hover(element)`: Simula hover
- `unhover(element)`: Remove hover

### Interações com formulários

- `type(element, text, options)`: Digita texto
- `clear(element)`: Limpa o campo
- `selectOptions(element, value)`: Seleciona opção em select
- `tab()`: Navega com Tab
- `keyboard(text)`: Simula pressionar teclas

### Opções de delay

```tsx
await userEvent.type(input, 'texto', { delay: 50 }); // 50ms entre cada caractere
```

## Consultando elementos

### Métodos do canvas

- `getByRole(role, options)`: Por papel (button, input, etc.)
- `getByLabelText(text, options)`: Por label
- `getByPlaceholderText(text)`: Por placeholder
- `getByDisplayValue(value)`: Por valor exibido
- `getByTestId(id)`: Por data-testid

### Exemplos de consultas

```tsx
// Por role
const button = canvas.getByRole('button', { name: /enviar/i });

// Por label
const input = canvas.getByLabelText('Nome Completo *', {
  selector: 'input',
});

// Por placeholder
const searchInput = canvas.getByPlaceholderText('Pesquisar...');

// Por valor
const filledInput = canvas.getByDisplayValue('João Silva');
```

## Combinando Play Functions

Você pode combinar play functions de outras stories:

```tsx
export const CombinedStory: Story = {
  play: async ({ context, canvas, userEvent }) => {
    // Executa a play function de outra story
    await FirstStory.play(context);
    await SecondStory.play(context);

    // Adiciona interações específicas
    await userEvent.click(canvas.getByRole('button'));
  },
};
```

## Boas práticas

### 1. Aguarde a renderização

```tsx
play: async ({ canvas, userEvent }) => {
  // Sempre aguarde um pouco para garantir que o componente foi renderizado
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Suas interações aqui...
};
```

### 2. Use delays apropriados

```tsx
// Para digitação natural
await userEvent.type(input, 'texto', { delay: 50 });

// Para digitação rápida
await userEvent.type(input, 'texto', { delay: 10 });
```

### 3. Aguarde entre interações

```tsx
await userEvent.click(button1);
await new Promise((resolve) => setTimeout(resolve, 200));
await userEvent.click(button2);
```

### 4. Trate elementos desabilitados

```tsx
// Teste se elementos desabilitados não respondem
const disabledButton = canvas.getByRole('button', { name: /desabilitado/i });
await userEvent.click(disabledButton); // Não deve fazer nada
```

## Exemplos no projeto

### ContactForm

- `WithPlayFunction`: Preenchimento completo do formulário
- `FormValidation`: Teste de validação
- `QuickFill`: Preenchimento rápido

### Button

- `InteractiveButton`: Hover e clique
- `MultipleButtons`: Sequência de cliques
- `DisabledButtonInteraction`: Teste de botão desabilitado

### Input

- `InteractiveInput`: Foco, digitação e blur
- `EmailValidation`: Validação de email
- `MultipleInputs`: Preenchimento de múltiplos campos

## Recursos úteis

- [Documentação oficial do Storybook](https://storybook.js.org/docs/writing-stories/play-function)
- [Testing Library queries](https://testing-library.com/docs/queries/about)
- [userEvent API](https://testing-library.com/docs/user-event/intro)

## Troubleshooting

### Problema: Elemento não encontrado

```tsx
// ❌ Errado
const button = canvas.getByRole('button');

// ✅ Correto - seja mais específico
const button = canvas.getByRole('button', { name: /enviar/i });
```

### Problema: Interação muito rápida

```tsx
// ❌ Errado
await userEvent.click(button1);
await userEvent.click(button2);

// ✅ Correto - aguarde entre interações
await userEvent.click(button1);
await new Promise((resolve) => setTimeout(resolve, 200));
await userEvent.click(button2);
```

### Problema: Componente não renderizado

```tsx
// ✅ Sempre aguarde a renderização
play: async ({ canvas, userEvent }) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  // Suas interações aqui...
};
```
