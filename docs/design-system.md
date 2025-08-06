# Design System – GB Locações

## 1. Foundations

### 1.1 Color Tokens

| Token                      | Light (HSL)         | Dark (HSL)          | Usage                   |
| -------------------------- | ------------------- | ------------------- | ----------------------- |
| background                 | `0 0% 100%`         | `222.2 84% 4.9%`    | Page background         |
| foreground                 | `222.2 84% 4.9%`    | `210 40% 98%`       | Primary text            |
| card                       | `0 0% 100%`         | `222.2 84% 4.9%`    | Card backgrounds        |
| card-foreground            | `222.2 84% 4.9%`    | `210 40% 98%`       | Card text               |
| popover                    | `0 0% 100%`         | `222.2 84% 4.9%`    | Popover surfaces        |
| popover-foreground         | `222.2 84% 4.9%`    | `210 40% 98%`       | Popover text            |
| primary                    | `222.2 47.4% 11.2%` | `210 40% 98%`       | Brand actions           |
| primary-foreground         | `210 40% 98%`       | `222.2 47.4% 11.2%` | Text on primary         |
| secondary                  | `210 40% 96%`       | `217.2 32.6% 17.5%` | Secondary actions       |
| secondary-foreground       | `222.2 47.4% 11.2%` | `210 40% 98%`       | Text on secondary       |
| accent                     | `210 40% 96%`       | `217.2 32.6% 17.5%` | Accents & hovers        |
| accent-foreground          | `222.2 47.4% 11.2%` | `210 40% 98%`       | Text on accent          |
| destructive                | `0 84.2% 60.2%`     | `0 62.8% 30.6%`     | Dangerous actions       |
| destructive-foreground     | `210 40% 98%`       | `210 40% 98%`       | Text on destructive     |
| muted                      | `210 40% 96%`       | `217.2 32.6% 17.5%` | Subtle backgrounds      |
| muted-foreground           | `215.4 16.3% 46.9%` | `215 20.2% 65.1%`   | Muted text              |
| border                     | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` | Borders                 |
| input                      | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` | Input borders           |
| ring                       | `0 0% 3.9%`         | `212.7 26.8% 83.9%` | Focus rings             |
| chart-1                    | `12 76% 61%`        | `220 70% 50%`       | Data viz                |
| chart-2                    | `173 58% 39%`       | `160 60% 45%`       | Data viz                |
| chart-3                    | `197 37% 24%`       | `30 80% 55%`        | Data viz                |
| chart-4                    | `43 74% 66%`        | `280 65% 60%`       | Data viz                |
| chart-5                    | `27 87% 67%`        | `340 75% 55%`       | Data viz                |
| sidebar-background         | `0 0% 98%`          | `240 5.9% 10%`      | Sidebar surfaces        |
| sidebar-foreground         | `240 5.3% 26.1%`    | `240 4.8% 95.9%`    | Sidebar text            |
| sidebar-primary            | `240 5.9% 10%`      | `224.3 76.3% 48%`   | Sidebar primary actions |
| sidebar-primary-foreground | `0 0% 98%`          | `0 0% 100%`         | Text on sidebar primary |
| sidebar-accent             | `240 4.8% 95.9%`    | `240 3.7% 15.9%`    | Sidebar accents         |
| sidebar-accent-foreground  | `240 5.9% 10%`      | `240 4.8% 95.9%`    | Text on sidebar accent  |
| sidebar-border             | `220 13% 91%`       | `240 3.7% 15.9%`    | Sidebar borders         |
| sidebar-ring               | `217.2 91.2% 59.8%` | `217.2 91.2% 59.8%` | Sidebar focus ring      |

### 1.2 Typography

- **Fonts:** Inter as base sans, Jost for headings.
- **Scale:** `h1` 2.5–3.5 rem, `h2` 2–3 rem, `h3` 1.5–2.25 rem, `base` 1–1.125 rem, `small` 0.875–1 rem.
- **Weights:** 700 for `h1`, 600 for `h2`/`h3`.

### 1.3 Spacing & Layout

- Tailwind default spacing scale (`0`–`96`).
- **Breakpoints:** `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.
- **Border radius:** base `--radius` 0.5rem → `lg`, `md`, `sm` via Tailwind config.
- **Shadows:** `shadow-md` for resting, `hover:shadow-lg` on hover; focus shadows add blue ring.
- **Transitions:** `transition-all` with `duration-200` or `duration-300`.
- **Z-index:** overlays use `z-50`; popovers/selects up to `z-[9999]`.

## 2. Components

Each component resides under `components/ui` and follows Tailwind utility classes with accessible focus styles.

### 2.1 Button

#### Variants

| Variant           | Class (summary)                                | Example                                          |
| ----------------- | ---------------------------------------------- | ------------------------------------------------ |
| default (primary) | `bg-slate-700 text-white`                      | `<Button>Save</Button>`                          |
| secondary         | `bg-secondary text-secondary-foreground`       | `<Button variant="secondary">Secondary</Button>` |
| destructive       | `bg-destructive text-destructive-foreground`   | `<Button variant="destructive">Delete</Button>`  |
| outline           | `border border-input bg-background`            | `<Button variant="outline">Outline</Button>`     |
| ghost             | `hover:bg-accent hover:text-accent-foreground` | `<Button variant="ghost">Ghost</Button>`         |
| link              | `text-primary underline-offset-4`              | `<Button variant="link">Link</Button>`           |
| reset             | `border shadow-md group`                       | `<Button variant="reset">Reset</Button>`         |

**Sizes:** `default`, `sm`, `lg`, `icon`.

**States:** default, `hover:scale-105`, disabled (`opacity-50`), focus (`focus:border-blue-500` via global style),
active, loading (use `<Spinner>` inside and `aria-busy`).

### 2.2 Input

Supports types `text`, `email`, `password`, `number`, `search`.

```tsx
import { Input } from '@/components/ui/input';
<Input type="email" placeholder="you@example.com" />;
```

Default styles include border, background, placeholder color and disabled state.

### 2.3 Select / Combobox / Autocomplete

Radix Select wrappers.

```tsx
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
<Select>
  <SelectTrigger className="w-[180px]">Choose…</SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>;
```

`SelectTrigger` carries default border, focus and disabled styles. `SelectContent` uses `z-[9999]` to overlay above dialogs.

### 2.4 Textarea

```tsx
import { Textarea } from '@/components/ui/textarea';
<Textarea placeholder="Your message" />;
```

Minimum height `80px`, full width, blue focus border.

### 2.5 Switch / Checkbox / Radio

```tsx
import { Switch } from '@/components/ui/switch';
<Switch />;

import { Checkbox } from '@/components/ui/checkbox';
<Checkbox />;

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
<RadioGroup defaultValue="a">
  <RadioGroupItem value="a" />
  <RadioGroupItem value="b" />
</RadioGroup>;
```

States: checked (`bg-primary`), unchecked (`bg-input`), disabled (`opacity-50`).

### 2.6 Modals / Dialogs / Sheets

```tsx
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>…</DialogContent>
</Dialog>;

import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
<Sheet>
  <SheetTrigger asChild>
    <Button>Menu</Button>
  </SheetTrigger>
  <SheetContent side="right">…</SheetContent>
</Sheet>;
```

Overlays use `bg-black/50` and `z-50`; content centers with rounded corners and close button.

### 2.7 Alerts

#### Toast

Use provider and viewport with `Toast` component.

```tsx
import { ToastProvider, ToastViewport, Toast } from '@/components/ui/toast';
<ToastProvider>
  <ToastViewport />
  <Toast>Saved</Toast>
</ToastProvider>;
```

Variants: `default`, `destructive`.

#### Banner/Callout

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
<Alert>
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>Something happened.</AlertDescription>
</Alert>;
```

Variants: `default`, `destructive`.

### 2.8 Badges / Chips

```tsx
import { Badge } from "@/components/ui/badge";
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Danger</Badge>
<Badge variant="outline">Outline</Badge>
```

### 2.9 Tables

Compose with `Table`, `TableHeader`, `TableRow`, `TableHead`, `TableCell`.
Rows highlight on hover and support selected state via `data-[state=selected]`.

### 2.10 Filtro – Reset e Indicador

```tsx
import { FilterResetButton } from '@/components/ui/filter-reset-button';
<FilterResetButton onClick={reset} />;

import { FilterIndicator } from '@/components/ui/filter-indicator';
<FilterIndicator isFiltered />;
```

`FilterResetButton` animates icon on click; `FilterIndicator` changes color when
filters are active.

## 3. Visual States

- **Default:** defined per component.
- **Hover:** subtle scale/ shadow increase on interactive elements.
- **Focus / Focus-visible:** blue border or outline (`focus:border-blue-500` or `focus:outline-blue-500 focus:outline-2`).
- **Active:** pressed styles via Tailwind active utilities when needed.
- **Disabled:** `opacity-50` and `pointer-events-none`.
- **Loading:** add spinner and `aria-busy="true"`.

## 4. Guidelines

- Import components from `@/components/ui`.
- Prefer Tailwind utility classes; avoid overriding existing design.
- Name components and variants in English, lowercase.
- For accessibility: provide `aria-label`, ensure contrast ≥4.5:1, use semantic HTML,
  manage focus order, and include `aria-live` for toasts.

## 5. Implementações Recentes

### 5.1 Correções de Acessibilidade e Consistência

- ✅ **Button variant `ghost`**: Corrigido para usar `hover:bg-accent hover:text-accent-foreground` em vez de
  cores cinza inconsistentes
- ✅ **FilterResetButton**: Adicionado `focus:ring-2 focus:ring-ring` para melhor
  acessibilidade visual

### 5.2 Padrões de Foco

Todos os componentes interativos seguem o padrão de foco consistente:

- `focus:outline-none` - Remove outline padrão do navegador
- `focus:ring-2 focus:ring-ring` - Adiciona anel de foco visível
- Usa a variável CSS `--ring` para consistência com o tema
