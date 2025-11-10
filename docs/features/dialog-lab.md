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

| Seção                      | Descrição                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `EquipmentDialogDemo`      | Demonstração principal com conteúdo rico: badges, resumo de locação, formulário rápido e CTA.                                   |
| `ScrollContent`            | Conteúdo interno envolto por `ScrollArea`, respeitando `max-h-[60vh]` e mantendo o ritmo vertical padrão (`px-6/py-6 sm:px-8`). |
| `NestedDialogDemo`         | Fluxo com dialogs aninhadas demonstrando `data-[nested-dialog-open]` e transições independentes.                                |
| `components/ui/dialog.tsx` | Wrapper universal para o Dialog do Base UI, com backdrop/popup padronizados e subcomponentes de layout.                         |

## 🧱 Componente Universal `Dialog`

- **Localização:** `components/ui/dialog.tsx`
- **Propósito:** centralizar as classes e animações oficiais, evitando
  duplicação de constantes (`BACKDROP_CLASSES`, `POPUP_CLASSES`, etc.).
- **Subcomponentes incluídos:** `Root`, `Trigger`, `Portal`, `Backdrop`,
  `Popup`, `Content`, `Header`, `HeaderIcon`, `CloseButton`, `Body`,
  `BodyViewport`, `BodyContent`, `Footer`, `Title`, `Description` e `Close`.
- **Variantes do popup:**
  - `default` – altura controlada (`80vh`), usada em fluxos administrativos
    completos.
  - `compact` – `w-96` com padding interno, ideal para dialogs aninhadas ou
    confirmações.
  - `unstyled` – não aplica estilos, permitindo layout totalmente customizado.
- **Estilos exportados:** `dialogStyles` expõe as classes base para ajustes
  avançados sem duplicar strings.

### Exemplo mínimo

```tsx
import { Dialog } from "@/components/ui/dialog"
;<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger asChild>…</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.HeaderIcon>…</Dialog.HeaderIcon>
          <Dialog.Title>Título</Dialog.Title>
          <Dialog.CloseButton aria-label="Fechar" />
        </Dialog.Header>
        <Dialog.Body>
          <Dialog.BodyViewport>
            <Dialog.BodyContent>{/* Conteúdo scrollável */}</Dialog.BodyContent>
          </Dialog.BodyViewport>
        </Dialog.Body>
        <Dialog.Footer>{/* Ações */}</Dialog.Footer>
      </Dialog.Content>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

### Fluxo de Estados

```tsx
const [open, setOpen] = useState(false)

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger asChild>…</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Content>
        {/* Header, conteúdo e footer modulares */}
      </Dialog.Content>
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

- **Camadas**: `z-[var(--layer-dialog-backdrop)]` para o backdrop e
  `z-[var(--layer-dialog)]` para o popup; não use números mágicos.
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

- **Localização**: `app/playground/category-dialog.tsx` (componentes
  `CategoryDialog`, `DesignDialog` e helpers) consumidos por
  `app/playground/page.tsx`.
- **Nested dialog**: o botão “Editar” dentro do preview da categoria abre uma
  segunda dialog reaproveitando `Dialog.Backdrop` e
  `Dialog.Popup variant="compact"` para manter as animações e escalas oficiais
  de dialogs encadeadas.
- **Campos disponíveis**:
  - Cores do badge (fundo, texto, ícone) iguais ao design system legado.
  - Grade completa de ícones (`ALL_AVAILABLE_ICONS` – Lucide + custom) com busca
    normalizada, mantendo fallback automático para `Tag`.
  - Configuração do ícone do cartão principal via:
    - Upload de SVG (até 64kb) com sanitização automática;
    - URL externa `https://… .svg` validada antes de aplicar.
- Tooltip contextual ao lado de “Ícone” com ícone `Lightbulb`, explicando o
  fallback padrão e respeitando o token `--layer-tooltip`.
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

- `app/playground/page.tsx` – laboratório principal com todos os exemplos, agora
  consumindo o wrapper `components/ui/dialog`.
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
“Customizar”), utilize diretamente o wrapper universal:

```tsx
import { Dialog } from '@/components/ui/dialog'

<Dialog.Root open={parentOpen} onOpenChange={setParentOpen}>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup data-nested-parent={childOpen ? '' : undefined}>
      <Dialog.Content>{/* Conteúdo principal */}</Dialog.Content>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>

<Dialog.Root open={childOpen} onOpenChange={setChildOpen}>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup variant="compact">
      {/* Dialog secundária */}
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

- **Comportamento:** o Base UI injeta atributos (`data-nested`,
  `data-nested-dialog-open`) e a variável `--nested-dialogs`. As variantes do
  popup já aplicam deslocamento e escala automáticos.
- **Implementação:** defina `variant="compact"` para a dialog filha e habilite
  `data-nested-parent` no popup pai enquanto ela estiver aberta para reproduzir
  o recuo visual.
- **Controle global:** mantenha o bloqueio de scroll (`overflow-hidden` em
  `html` e `body`) enquanto qualquer dialog estiver aberta, como demonstrado em
  `app/playground/page.tsx`.
