# 🤖 AI Agents General Instructions - GB Locações

> **Target**: All AI assistants (Claude, GPT, AgentsMT, etc.)  
> **Project**: GB Locações - Equipment Rental Platform  
> **Updated**: January 2025

## 🛡️ **CRITICAL ANTI-HALLUCINATION PROTOCOL**

### **⚠️ MANDATORY: Read These Files FIRST**

1. `AGENTS.md` - Main project context and rules
2. `docs/internal/seo-optimization-implementation.md` - Technical implementation
   details
3. This file - AI-specific guidelines

### **🚨 BEFORE CREATING ANY CODE, ASK:**

```
1. "Does this component/functionality already exist?"
2. "Can I modify/extend an existing component instead?"
3. "Am I about to duplicate work that's already been done?"
```

### **📋 COMPONENT INVENTORY (DO NOT RECREATE)**

| **Need**             | **Existing Component**        | **Location**                     | **Usage**                                   |
| -------------------- | ----------------------------- | -------------------------------- | ------------------------------------------- |
| **Forms/Orçamentos** | `QuoteForm`                   | `components/quote-form.tsx`      | `<QuoteForm variant="modal" />`             |
| **Buttons/CTAs**     | `CTAButton`, `QuoteCTA`, etc. | `components/ui/cta-button.tsx`   | `<QuoteCTA href="/orcamento" />`            |
| **Product Cards**    | `EquipmentCard`               | `components/equipment-card.tsx`  | `<EquipmentCard variant="featured" />`      |
| **Navigation**       | `Breadcrumb`                  | `components/ui/breadcrumb.tsx`   | `<EquipmentBreadcrumb currentPage="..." />` |
| **SEO Data**         | `StructuredData`              | `components/structured-data.tsx` | `<StructuredData localBusiness={...} />`    |
| **Metadata**         | `generateMetadata()`          | `app/equipamentos/[id]/page.tsx` | Pattern established                         |
| **Sitemap**          | Auto-generated                | `app/sitemap.ts`                 | Includes all equipment URLs                 |
| **Robots**           | Optimized                     | `public/robots.txt`              | Already configured                          |

## 🎯 **PROJECT CONTEXT SUMMARY**

### **Business Domain**

- **Company**: GB Locações (construction equipment rental)
- **Location**: Porto Alegre, Brazil
- **Market**: Construction equipment (scaffolding, mixers, compressors)
- **Language**: Portuguese (pt-BR)

### **Technical Stack**

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.9 (strict mode)
- **UI**: React 19 + Tailwind CSS 3.4.17
- **Database**: PostgreSQL + Prisma (versão estável)
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Package Manager**: npm (NOT pnpm)

### **Brand Guidelines**

- **Primary Color**: Orange-600 (#ea580c)
- **Font**: Inter (body) + Jost (headings)
- **Tone**: Professional, friendly, Brazilian Portuguese
- **Design**: Modern, responsive, accessibility-first

## 🏗️ **ARCHITECTURAL PATTERNS**

### **Component Structure**

```
components/
├── ui/                 # Base reusable components (Radix UI based)
├── [feature]/          # Feature-specific components
└── [component].tsx     # Main business components

app/
├── [route]/           # App Router pages
├── api/               # API routes
├── globals.css        # Global styles
└── layout.tsx         # Root layout
```

### **File Naming Conventions**

- **Components**: PascalCase (`EquipmentCard.tsx`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`)
- **Hooks**: camelCase with `use` prefix (`useEquipmentData.ts`)
- **Utils**: camelCase (`formatCurrency.ts`)
- **Types**: camelCase (`equipment.types.ts`)

### **Import/Export Patterns**

```tsx
// ✅ Default export for main component
export default function ComponentName() {}

// ✅ Named exports for utilities/variants
export const UtilityComponent = () => {}
export const CONSTANT_VALUE = "value"

// ✅ Import patterns
import ComponentName from "@/components/component-name"
import { namedExport } from "@/components/component-name"
```

## 📝 **CODE STANDARDS**

### **TypeScript Rules**

```tsx
// ✅ ALWAYS: Strict typing
interface ComponentProps {
  required: string
  optional?: number
}

// ❌ NEVER: any types
// prop: any

// ✅ PREFER: @ts-expect-error with description over @ts-ignore
// @ts-expect-error - External library without proper types
```

### **React Patterns**

```tsx
// ✅ PREFER: Functional components
export default function Component({ prop }: Props) {
  return <div>{prop}</div>
}

// ✅ PREFER: Custom hooks for logic
const useComponentData = () => {
  // Logic here
  return { data, loading, error }
}
```

### **Styling Standards**

```tsx
// ✅ PREFER: Tailwind utility classes
className="bg-orange-600 hover:bg-orange-700 text-white"

// ✅ PREFER: cn() helper for conditional classes
className={cn(
  "base-classes",
  condition && "conditional-classes",
  variant === 'primary' && "primary-classes"
)}

// ❌ AVOID: Custom CSS modules or styled-components
```

### **Animation Standards**

```tsx
// ✅ PREFER: Framer Motion with standard transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

## 🎨 **UI/UX PATTERNS**

### **Design System Usage**

```tsx
// ✅ ALWAYS use design system components first
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// ✅ Brand colors only
text - orange - 600 // Primary
bg - orange - 50 // Light background
border - orange - 200 // Subtle borders
```

### **Responsive Design**

```tsx
// ✅ ALWAYS mobile-first
className = "text-sm md:text-base lg:text-lg"
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className = "p-4 md:p-6 lg:p-8"
```

### **Accessibility Standards**

```tsx
// ✅ ALWAYS include ARIA labels
<button aria-label="Solicitar orçamento para equipamento">

// ✅ ALWAYS meaningful alt texts
<img alt="Betoneira 400L para locação - GB Locações" />

// ✅ ALWAYS semantic HTML
<main>
  <section>
    <h1>Page Title</h1>
```

## 📊 **DATA HANDLING PATTERNS**

### **Prisma Integration**

```tsx
// ✅ ALWAYS: Server-side Prisma import
async function getPrisma() {
  const { prisma } = await import("@/lib/prisma")
  return prisma
}

// ✅ ALWAYS: Convert Decimal to number
const price = Number(equipment.pricePerDay)
```

### **Form Validation**

```tsx
// ✅ ALWAYS: Zod schemas
const FormSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido")
})

// ✅ ALWAYS: React Hook Form integration
const form = useForm({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    /* ... */
  }
})
```

### **Error Handling**

```tsx
// ✅ ALWAYS: User-friendly error messages
try {
  await action()
  toast({ title: "Sucesso!", description: "Operação realizada!" })
} catch (error) {
  console.error("Erro:", error)
  toast({
    title: "Erro",
    description: "Tente novamente em alguns instantes.",
    variant: "destructive"
  })
}
```

## 🔍 **SEO & PERFORMANCE PATTERNS**

### **Metadata Generation**

```tsx
// ✅ ALWAYS: generateMetadata for pages
export async function generateMetadata({ params }): Promise<Metadata> {
  // Get data
  const data = await getData(params)

  return {
    title: `${data.name} | GB Locações`,
    description: "SEO description up to 160 chars...",
    openGraph: {
      title: data.name,
      description: "OG description",
      url: `https://locacoesgb.com.br/${params.slug}`,
      images: [{ url: data.image, width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: data.name,
      description: "Twitter description"
    }
  }
}
```

### **Performance Optimization**

```tsx
// ✅ ALWAYS: Image optimization
<Image
  src={imageUrl}
  alt="Descriptive alt text"
  width={300}
  height={200}
  priority={index < 3} // For above-fold images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// ✅ ALWAYS: Lazy loading for lists
import { lazy, Suspense } from 'react'
const LazyComponent = lazy(() => import('./Component'))

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

## 🌐 **LOCALIZATION PATTERNS**

### **Portuguese Content**

```tsx
// ✅ ALWAYS: Brazilian Portuguese
"Solicitar Orçamento" // Not "Pedir Cotação"
"Entrar em Contato" // Not "Fale Conosco"
"Equipamentos" // Not "Materiais"
"Disponível" // Not "Disponivel" (accent required)
"Indisponível" // Not "Não Disponível"
```

### **Date/Number Formatting**

```tsx
// ✅ ALWAYS: Brazilian format
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value)

const formatDate = (date: Date) => new Intl.DateTimeFormat("pt-BR").format(date)
```

## 🚫 **FORBIDDEN ACTIONS**

### **Never Create New:**

1. Form components (use `QuoteForm`)
2. Button/CTA components (use `CTAButton` system)
3. Product card components (use `EquipmentCard`)
4. Breadcrumb components (use `Breadcrumb`)
5. SEO/Schema.org implementations (use `StructuredData`)

### **Never Modify:**

1. Prisma version (keep stable)
2. Tailwind version (user preference)
3. `scripts/post-prisma-generate.js` (critical)
4. Build scripts in `package.json`
5. Core dependencies without consultation

### **Never Use:**

1. `any` TypeScript types
2. `@ts-ignore` (use `@ts-expect-error` with description)
3. PNPM commands (use npm only)
4. Custom CSS modules (use Tailwind)
5. Colors outside brand palette

## ✅ **SUCCESS CRITERIA**

### **Code Quality**

- [ ] TypeScript strict mode compliance
- [ ] Zero ESLint warnings
- [ ] Responsive design (mobile-first)
- [ ] Accessibility compliance
- [ ] Performance optimized

### **Business Requirements**

- [ ] Portuguese language
- [ ] Brand colors (orange theme)
- [ ] SEO optimized (metadata + structured data)
- [ ] Analytics tracking (CTAs)
- [ ] Error handling with user feedback

### **Integration**

- [ ] Works with existing components
- [ ] Follows established patterns
- [ ] No breaking changes
- [ ] Documented in CHANGELOG.md
- [ ] Tested responsively

## 🔄 **WORKFLOW PROCESS**

### **Before Coding:**

1. Read `AGENTS.md` for context
2. Check component inventory above
3. Verify no similar component exists
4. Plan integration with existing code

### **During Coding:**

1. Follow TypeScript strict mode
2. Use existing design system
3. Add proper error handling
4. Include analytics tracking
5. Test responsive design

### **After Coding:**

1. Update `CHANGELOG.md`
2. Check for breaking changes
3. Verify accessibility
4. Test component integration

## 📚 **LEARNING RESOURCES**

### **Project-Specific Docs**

- `AGENTS.md` - Main instructions
- `docs/internal/seo-optimization-implementation.md` - Technical details
- `docs/features/` - Feature-specific documentation
- `CHANGELOG.md` - Recent changes

### **External Resources**

- Next.js 15 App Router documentation
- Tailwind CSS utility classes
- Framer Motion animations
- Radix UI components
- Zod validation schemas

---

## 🎯 **REMEMBER: REUSE > RECREATE**

The most important principle: **Always check if functionality exists before
creating new components**. This project has invested significant effort in
creating reusable, well-tested components. Your job is to leverage them
effectively, not to reinvent them.

**When in doubt, ask**: "How can I solve this with existing components?"

---

_Last updated: January 2025_  
_Compatible with: Next.js 15, TypeScript 5.9, React 19_
