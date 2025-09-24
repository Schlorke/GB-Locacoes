# 🎯 Cursor AI Instructions - GB Locações

> **Context**: Next.js 15 + TypeScript + Tailwind CSS project for equipment
> rental business  
> **Updated**: January 2025  
> **Critical**: Read this BEFORE any component creation

## 🛡️ **ANTI-HALLUCINATION PROTOCOL**

### **⚠️ BEFORE CREATING ANY COMPONENT, CHECK IF IT EXISTS:**

1. **Formulários/Forms** → Use `components/quote-form.tsx`
2. **Botões/Buttons** → Use `components/ui/cta-button.tsx`
3. **Cards de Produto** → Use `components/equipment-card.tsx`
4. **Navegação/Breadcrumbs** → Use `components/ui/breadcrumb.tsx`
5. **SEO/Structured Data** → Use `components/structured-data.tsx`

### **📚 REQUIRED READING:**

- `AGENTS.md` - Main project instructions
- `docs/internal/seo-optimization-implementation.md` - Technical implementation
  details

## 🧩 **AVAILABLE COMPONENTS (DO NOT RECREATE)**

### **QuoteForm** (`components/quote-form.tsx`)

```tsx
// ✅ USE THIS for any form needs
import QuoteForm from "@/components/quote-form"
;<QuoteForm
  prefilledEquipment={{ id: "eq123", name: "Equipment Name" }}
  variant="modal" // or "page" or "inline"
  onSuccess={(data) => handleSuccess(data)}
/>
```

**Features**: 3-step process, Zod validation, animations, loading states

### **CTAButton System** (`components/ui/cta-button.tsx`)

```tsx
// ✅ USE THESE for any buttons/CTAs
import { QuoteCTA, ContactCTA, PhoneCTA, WhatsAppCTA } from '@/components/ui/cta-button'

<QuoteCTA href="/orcamento" />
<ContactCTA href="/contato" />
<PhoneCTA phone="+5551999999999" />
<WhatsAppCTA phone="5551999999999" message="Custom message" />
```

**Features**: Analytics tracking, multiple variants, animations, accessibility

### **EquipmentCard** (`components/equipment-card.tsx`)

```tsx
// ✅ USE THIS for product cards
import { EquipmentCard } from "@/components/equipment-card"
;<EquipmentCard
  equipment={equipmentData}
  variant="featured" // or "default" or "compact"
  showRating={true}
  priority={true}
/>
```

**Features**: 3 variants, hover effects, ratings, badges, CTAs

### **Breadcrumb** (`components/ui/breadcrumb.tsx`)

```tsx
// ✅ USE THIS for navigation
import Breadcrumb, { EquipmentBreadcrumb } from "@/components/ui/breadcrumb"
;<EquipmentBreadcrumb
  currentPage="Equipment Name"
  categoryName="Category"
  categorySlug="category-slug"
/>
```

**Features**: Schema.org automatic, 3 visual variants, animations

### **StructuredData** (`components/structured-data.tsx`)

```tsx
// ✅ USE THIS for SEO structured data
import {
  StructuredData,
  DEFAULT_LOCAL_BUSINESS
} from "@/components/structured-data"
;<StructuredData
  localBusiness={DEFAULT_LOCAL_BUSINESS}
  product={{
    name: equipment.name,
    description: equipment.description
    // ... other product data
  }}
  breadcrumbs={breadcrumbItems}
/>
```

**Features**: LocalBusiness, Product, BreadcrumbList schemas

## 🎨 **DESIGN SYSTEM RULES**

### **Colors**

- Primary: `orange-600` (#ea580c)
- Hover: `orange-700`
- Accent: `orange-500`

### **Typography**

- Body: Inter font
- Headings: Jost font

### **Animations**

- Library: Framer Motion
- Duration: 300ms standard
- Easing: Default ease

### **Responsive**

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## ⚙️ **TECHNICAL CONSTRAINTS**

### **Dependencies (DO NOT MODIFY)**

- Prisma: Versão estável (manter atual)
- Tailwind: `3.4.17` (User preference - do not update)
- Package Manager: `npm` (not pnpm - causes conflicts)

### **TypeScript Rules**

- Strict mode enabled
- NO `any` types (use specific types)
- Use `@ts-expect-error` with description instead of `@ts-ignore`

### **File Structure**

```
components/
├── ui/              # Base reusable components
├── [feature]/       # Feature-specific components
└── [component].tsx  # Main components

app/
├── [route]/         # App Router structure
└── layout.tsx       # Root layout
```

## 📖 **USAGE PATTERNS**

### **Creating New Pages**

```tsx
// ✅ ALWAYS include metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${pageTitle} | GB Locações`,
    description: 'Up to 160 characters...',
    openGraph: { /* ... */ },
    twitter: { /* ... */ }
  }
}

// ✅ ALWAYS add structured data
<StructuredData localBusiness={DEFAULT_LOCAL_BUSINESS} />

// ✅ ALWAYS add breadcrumb
<Breadcrumb items={breadcrumbItems} />
```

### **Working with Equipment Data**

```tsx
// ✅ Prisma Decimal handling
const price = Number(equipment.pricePerDay) // Convert Decimal to number

// ✅ Image handling
const imageUrl = equipment.images?.[0] || "/placeholder.jpg"

// ✅ Availability check
const isAvailable = equipment.available ?? equipment.isAvailable ?? true
```

## 🚫 **FORBIDDEN ACTIONS**

### **DO NOT CREATE:**

1. New form components (use `QuoteForm`)
2. New button components (use `CTAButton` system)
3. New card components (use `EquipmentCard`)
4. New breadcrumb components (use `Breadcrumb`)
5. Manual Schema.org implementations (use `StructuredData`)

### **🚨 CRITICAL: CHANGELOG DATES - NEVER INVENT**

**⚠️ FORBIDDEN**: Inventing dates for CHANGELOG.md entries

❌ **NEVER DO:**

- Add dates like "2024-12-20" without checking Git history
- Create CHANGELOG entries with placeholder dates
- Invent dates based on assumptions

✅ **ALWAYS DO:**

- Check real commit dates: `git log --oneline -5`
- Use actual commit dates for entries
- Verify with: `git log --pretty=format:"%h %ad %s" --date=short`
- Only add entries for actual changes

**Historical Error**: On 2025-09-22, fake dates were invented, causing loss of
real project history.

### **DO NOT MODIFY:**

1. `scripts/post-prisma-generate.js` (critical for build)
2. Prisma version (keep stable)
3. Tailwind version (user preference)
4. Package manager configs (npm only)

### **DO NOT USE:**

1. `any` TypeScript type
2. `@ts-ignore` (use `@ts-expect-error` with description)
3. Hardcoded colors outside design system
4. Custom CSS modules (use Tailwind)

## ✅ **QUICK CHECKLIST**

Before implementing anything:

- [ ] Checked if component already exists
- [ ] Read `AGENTS.md` for context
- [ ] Verified TypeScript types
- [ ] Followed design system colors
- [ ] Added proper SEO metadata
- [ ] Included structured data if applicable
- [ ] Added analytics tracking if CTA
- [ ] Tested responsiveness
- [ ] Updated `CHANGELOG.md`

## 🔧 **COMMON PATTERNS**

### **API Integration**

```tsx
// ✅ Standard pattern
const { data, error, loading } = useSWR("/api/endpoint", fetcher)

if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage />
```

### **Form Handling**

```tsx
// ✅ Use existing QuoteForm or follow this pattern
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    /* ... */
  }
})
```

### **Animation Pattern**

```tsx
// ✅ Standard Framer Motion pattern
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

## 📞 **SUPPORT & TROUBLESHOOTING**

### **Build Issues**

- Check Prisma version (keep stable)
- Run `node scripts/post-prisma-generate.js`
- Use `npm` instead of `pnpm`

### **TypeScript Errors**

- Avoid `any` types
- Use proper interfaces
- Check import/export consistency

### **Component Not Found**

- Verify import paths
- Check component exports (default vs named)
- Ensure component exists in documented location

---

**Remember**: This project has established patterns and components. Always check
existing solutions before creating new ones!

_Last updated: January 2025_
