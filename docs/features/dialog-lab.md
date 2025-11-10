# 🧪 Dialog Lab (Base UI)

## 📋 Visão Geral

- Implementamos um laboratório dedicado para o novo componente de dialog baseado
  em [Base UI](https://base-ui.com/react/components/dialog#open-from-a-menu).
- O playground em `app/playground/page.tsx` concentra todas as experimentações
  atuais, permitindo validar animações, layout, acessibilidade e interações
  antes de reintegrar os fluxos administrativos.
- Removemos os modais legados do projeto (wrappers Radix customizados, modais de
  categorias e preview de equipamentos) para garantir que a migração aconteça
  sobre uma única base.
- A página `app/admin/categorias/page.tsx` está temporariamente em modo
  manutenção e `app/admin/equipamentos/page.tsx` opera com um overlay simples
  até que o novo dialog seja promovido para produção.

## 🎯 Objetivos

1. **Unificação** – substituir todos os modais antigos por uma única
   implementação composta (`Dialog.Root`, `Dialog.Backdrop`, `Dialog.Popup`,
   etc.).
2. **Consistência visual** – adotar tokens de espaço, tipografia e cores
   definidos em `docs/features/design-system.md`.
3. **Acessibilidade** – aproveitar o foco travado e os atributos ARIA
   automáticos do Base UI, incluindo suporte a dialogs aninhados.
4. **Reutilização** – estruturar header, área scrollável e footer como blocos
   independentes que podem ser compostos conforme o fluxo (preview, formulário,
   confirmação).

## 🏗️ Arquitetura do Playground

| Seção                 | Descrição                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `EquipmentDialogDemo` | Demonstração principal com conteúdo rico: badges, resumo de locação, formulário rápido e CTA.                                   |
| `ScrollContent`       | Conteúdo interno envolto por `ScrollArea`, respeitando `max-h-[60vh]` e mantendo o ritmo vertical padrão (`px-6/py-6 sm:px-8`). |
| `NestedDialogDemo`    | Fluxo com dialogs aninhadas demonstrando `data-[nested-dialog-open]` e transições independentes.                                |
| `backdropClassName`   | Overlay com blur, opacidade animada e fallback iOS (`supports-[-webkit-touch-callout:none]`).                                   |
| `popupBaseClassName`  | Container base compartilhado (radius 2xl, sombra profunda, `ring-1 ring-slate-200/70`).                                         |

### Fluxo de Estados

```tsx
const [open, setOpen] = useState(false)

<Dialog.Root open={open} onOpenChange={setOpen} dismissible modal>
  <Dialog.Trigger asChild>…</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop className={backdropClassName} />
    <Dialog.Popup className={`${popupBaseClassName} …`}>
      {/* Header, conteúdo e footer modulares */}
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

- `dismissible` e `modal` ficam ativos por padrão para preservar foco, scroll
  lock e click outside controlado.
- `Dialog.Close` é sempre renderizado como `Button` para manter rastreamento e
  estados visuais documentados no design system.
- Conteúdos longos utilizam `ScrollArea` com `maxHeight` calculado para
  preservar espaço para header/footer.

## 🎨 Estilos Principais

- **Backdrop**: `bg-slate-950/60 + backdrop-blur-sm` com animações
  `data-[starting-style]`/`data-[ending-style]`.
- **Popup**: `rounded-2xl`, sombra elevada
  (`shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)]`) e `ring-1` para reforçar
  legibilidade em temas claros.
- **Header**: `px-6 py-5 sm:px-8`, título `text-2xl` (ou `text-xl` em variantes
  menores) e badge primária.
- **Footer**: grade flexível (`flex flex-col gap-3 sm:flex-row`) garantindo que
  CTAs fiquem lado a lado em desktop e empilhados em mobile.
- **Conteúdo**: cartões internos com `border border-slate-200`, superfícies
  secundárias em `bg-slate-50/60` e destaque laranja para instruções
  (`bg-orange-50/80`).

## ♿ Acessibilidade

- Base UI gerencia `aria-hidden`, `aria-modal`, focus trap e stacking context
  automaticamente.
- Botões fecham dialog via `Dialog.Close asChild`, preservando rótulos
  (`aria-label`) e mantendo clique keyboard-friendly.
- Dialogs aninhadas utilizam `data-[nested-dialog-open]` para informar estados
  ao dialog pai, permitindo estilização condicional no futuro.
- O overlay manual implementado em `app/admin/equipamentos/page.tsx` permanecerá
  apenas até a migração para o componente Base UI (garantindo compatibilidade
  temporária).

## 🔬 Casos Cobertos

- **Preview rico**: substituição planejada para previews de equipamentos,
  categorias e orçamentos.
- **Fluxo aninhado**: confirmações e passos subsequentes (ex.: agendar retorno
  dentro de um fluxo de contato).
- **Formulários rápidos**: campo de nome, e-mail, telefone e textarea já
  testados com `Input` e `Textarea` do design system.
- **Dialogs encadeadas (Customize/Edit)**: padrão oficial para abrir uma segunda
  dialog a partir de ações como “Editar”, “Customizar” ou “Configurar”.

## 🧩 Configurador de Categoria (Playground Atualizado)

- **Localização**: `app/playground/page.tsx` (componentes `CategoryDialogDemo` +
  `DesignDialog`).
- **Nested dialog**: o botão “Editar” dentro do preview da categoria abre uma
  segunda dialog que segue as classes `BACKDROP_CLASSES` e
  `SIMPLE_POPUP_CLASSES` para animação de aninhamento correta.
- **Campos disponíveis**:
  - Cores do badge (fundo, texto, ícone) iguais ao design system legado.
  - Ícone padrão (Lucide) utilizado como fallback e no badge.
  - Configuração do ícone do cartão principal via:
    - Upload de SVG (até 64kb) com sanitização automática;
    - URL externa `https://… .svg` validada antes de aplicar.
- **Preview imediato**: o cartão grande e a badge são renderizados com o mesmo
  helper (`renderCategoryIcon`), garantindo que uploads/URLs apareçam no preview
  e nos cards simulados.
- **Fundo neutro**: o bloco “Preview do destaque” utiliza o mesmo gradiente
  suave (`bg-gradient-to-br from-slate-50 to-slate-100`) adotado no preview
  principal, com tipografia em tons `slate`, destacando o cartão escuro sem
  introduzir contrastes desnecessários. Em mobile, o cabeçalho centraliza,
  aumenta o espaçamento entre linhas e quebra “Aba atual” em duas linhas,
  enquanto em desktop mantém o alinhamento horizontal.
- **Ordem dos controles**: logo abaixo do preview, o primeiro card disponível é
  “Ícone personalizado para o cartão principal”, permitindo definir uploads/URLs
  antes de ajustar badge, ícone Lucide e demais cores. O cartão exibido dentro
  da dialog aninhada replica o mesmo tamanho e espaçamento do componente
  original utilizado nas tabs públicas.
- **Posicionamento nas tabs públicas**:
  - O preview principal (fora da dialog aninhada) continua sendo o ponto único
    de controle para alternar entre “Fases da obra” e “Tipo de trabalho”; a aba
    “Categorias” segue automática na aplicação real.
  - A dialog aninhada apenas reflete o estado atual selecionado, evitando
    controles duplicados e mantendo o foco na personalização de ícones e cores.
- **Persistência**: ao salvar, o estado retorna para o dialog principal já com o
  SVG customizado/URL, além da aba selecionada para o card.

## ♻️ Impacto nas Páginas

- `app/admin/categorias/page.tsx` agora exibe mensagem de manutenção até que a
  nova dialog seja integrada.
- `app/admin/equipamentos/page.tsx` utiliza overlay custom (sem Base UI) como
  solução temporária. O próximo passo é substituir este overlay pelo componente
  `Dialog` do playground.
- Todos os wrappers anteriores (`components/ui/dialog.tsx`,
  `view-category-modal`, `modern-category-modal`, `command`, `emoji-picker`,
  `icon-picker`, `popover`) foram removidos para evitar desvios.

## 🚧 Próximos Passos

1. Extrair o layout demonstrado em `EquipmentDialogDemo` para um componente
   reutilizável (`components/dialogs/base-dialog.tsx` – nome provisório).
2. Reintegrar previews de equipamentos, categorias e orçamentos usando o
   componente Base UI.
3. Aplicar o mesmo padrão nos fluxos administrativos (criação/edição) e em CTAs
   públicos que dependiam de Radix Dialog.
4. Documentar variantes (formulário curto, confirmação, wizard) diretamente no
   Storybook quando a API estiver fechada.

## 📂 Arquivos Relacionados

- `app/playground/page.tsx` – laboratório principal com todos os exemplos
  (incluindo classes reutilizáveis `BACKDROP_CLASSES` e `POPUP_CLASSES`).
- `app/playground/page.tsx` – contém o protótipo oficial do fluxo “Criar/Editar
  Categoria” reutilizando o padrão de dialogs encadeadas.
- `app/admin/equipamentos/page.tsx` – overlay temporário aguardando migração.
- `docs/features/admin-system.md` – seção de categorias atualizada com aviso de
  manutenção.
- `docs/internal/modal-scroll-errors-analysis.md` – histórico dos problemas
  resolvidos com modais antigos.

## 🔗 Referências

- Base UI – Dialog Component:
  https://base-ui.com/react/components/dialog#open-from-a-menu
- Diretrizes internas de design: `docs/features/design-system.md`
- Histórico de problemas com modais antigos:
  `docs/internal/modal-scroll-errors-analysis.md`

## 📘 Padrão de Dialogs Encadeadas

Para qualquer botão interno que deva abrir outra dialog (ex.: “Editar”,
“Customizar”), reutilize o padrão do playground:

```tsx
const BACKDROP_CLASSES =
  "fixed inset-0 z-[9998] min-h-dvh bg-black/60 transition-all duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute dark:bg-black/70"

const POPUP_CLASSES =
  "fixed top-[calc(50%+1.25rem*var(--nested-dialogs))] left-1/2 z-[9999] -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 scale-[calc(1-0.1*var(--nested-dialogs))] rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[nested-dialog-open]:after:absolute data-[nested-dialog-open]:after:inset-0 data-[nested-dialog-open]:after:rounded-[inherit] data-[nested-dialog-open]:after:bg-black/5"
```

- **Comportamento:** o Base UI injeta atributos (`data-nested`,
  `data-nested-dialog-open`) e a variável `--nested-dialogs`. As classes acima
  utilizam esses valores para reposicionar e escalar a nova dialog, aplicando
  overlay sutil sobre a anterior.
- **Implementação:** basta renderizar outro `<Dialog.Root>` dentro da dialog
  atual e aplicar os mesmos `BACKDROP_CLASSES` e `POPUP_CLASSES`. Todos os
  fluxos “editar/customizar” deverão seguir esse modelo.
- **Controle global:** mantenha o bloqueio de scroll (`overflow-hidden` em
  `html` e `body`) enquanto qualquer dialog estiver aberta, como demonstrado em
  `app/playground/page.tsx`.
