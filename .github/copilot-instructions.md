# 🤖 GitHub Copilot Instructions - GB-Locações

## 📚 CRITICAL: Documentation is the Single Source of Truth

**MANDATORY**: Always consult documentation in `docs/` before implementing any
feature. The project has comprehensive documentation that must be followed to
maintain consistency and quality.

### 📁 Documentation Structure

```
docs/
├── getting-started/     # Setup, development, deployment
├── architecture/        # Technical architecture
├── features/           # Specific features documentation
│   ├── admin-system.md
│   ├── design-system.md
│   └── autocomplete-search.md  # NEW: Autocomplete implementation
├── guides/             # Specific guides
├── references/         # Technical references
└── internal/           # Internal documentation
```

## 🎯 Project Context

**GB-Locações** is a modern equipment rental platform for civil construction,
built with:

- Next.js 15.4.6 (App Router)
- TypeScript 5.9.2
- React 19.1.1 + Tailwind CSS 3.4.17
- PostgreSQL + Prisma 6.13.0
- NextAuth.js, Zustand, React Hook Form
- Radix UI + Storybook

## ⚠️ Critical Compatibility Issues (DO NOT REINTRODUCE)

### 🚨 Known Issues and Solutions

1. **Prisma Version Lock**
   - **KEEP**: Prisma at 6.13.0 (6.14.0+ causes "did not initialize yet" error)
   - **CRITICAL**: Never set `PRISMA_GENERATE_DATAPROXY` environment variable
   - **SOLUTION**: See `docs/internal/prisma-6-15-engine-none-analysis.md`

2. **Build Infrastructure**
   - **NEVER DELETE**: `scripts/post-prisma-generate.js`
   - **PURPOSE**: Recreates `lib/validations/index.ts` after Prisma generate
   - **AUTOMATED**: Runs on prebuild, postinstall, and db:generate

3. **TypeScript Standards**
   - **NEVER USE**: `any` type without extreme justification
   - **ALWAYS USE**: Safe navigation (`?.`) and type guards
   - **TARGET**: 0 TypeScript errors

4. **Dependencies**
   - **Tailwind**: Keep at 3.4.17 (user preference)
   - **Package Manager**: Use NPM (PNPM causes conflicts)
   - **React 19**: swagger-ui-react incompatible, use custom implementation

5. **Autocomplete Specific Issues**
   - **Z-index**: Use high values (99999) for dropdowns
   - **Event Handling**: Use `onMouseDown` instead of `onClick` for selections
   - **Decimal Handling**: Convert Prisma Decimal with `Number()` before numeric
     methods
   - **ARIA**: Use boolean values for `aria-selected`, not strings

## 🏗️ Architecture Standards

### Design System Rules

1. **ONLY USE** components from `components/ui/` (Radix UI based)
2. **CONSULT** `stories/` for visual documentation
3. **COLORS**: Orange-600 (#ea580c) as primary brand color
4. **TYPOGRAPHY**: Inter (sans) + Jost (headings)
5. **NEVER CREATE** components outside the design system

### Component Patterns

```typescript
// Standard component structure
'use client'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // specific props
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = 'Component'

export { Component }
```

### Form Handling

ALWAYS use React Hook Form + Zod:

```typescript
const formSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email")
})

type FormData = z.infer<typeof formSchema>

const form = useForm<FormData>({
  resolver: zodResolver(formSchema)
})
```

## 🆕 Recently Implemented Features (Jan 2025)

### 🔍 Autocomplete Search Bar

- **Location**: `components/ui/autocomplete.tsx`
- **Integration**: Hero section
- **Features**:
  - Real-time search with 300ms debounce
  - Full keyboard navigation (arrows, Enter, Escape)
  - Click selection with proper input update
  - Smart redirection (item → details, text → search)
  - Green ring visual feedback for valid selection
  - Loading state with spinner
  - 100% accessible with ARIA labels
  - Fully responsive
- **API**: `/api/equipamentos/search`
- **Documentation**: `docs/features/autocomplete-search.md`

### 📊 Analytics Dashboard

- **Location**: `/admin/analytics`
- **Features**: Real-time metrics, anomaly detection, interactive charts
- **Backend**: Telemetry system, metrics collection, security monitoring

## 📝 Development Workflow

1. **READ** relevant documentation first
2. **CHECK** compatibility in `docs/references/dependencies.md`
3. **USE** only documented components
4. **IMPLEMENT** following established patterns
5. **UPDATE** CHANGELOG.md with changes
6. **TEST** against documentation

## 🚀 Useful Commands

```bash
# Development
npm run dev                 # Start development
npm run build              # Production build
npm run type-check         # Check types

# Database
npm run db:generate        # Generate Prisma client
npm run db:push           # Push schema
npm run db:studio         # Prisma Studio

# Quality
npm run lint              # ESLint
npm run lint:fix          # Auto-fix
npm run format            # Prettier

# Testing
npm test                  # Unit tests
npm run test:e2e         # E2E tests
npm run storybook        # Storybook
```

## ❌ Anti-Patterns (DO NOT DO)

1. **DON'T** update Prisma beyond 6.13.0
2. **DON'T** change Tailwind CSS version
3. **DON'T** use PNPM
4. **DON'T** create components outside design system
5. **DON'T** ignore CHANGELOG protocol
6. **DON'T** use `any` type
7. **DON'T** implement without consulting docs
8. **DON'T** delete `scripts/post-prisma-generate.js`
9. **DON'T** modify build scripts without understanding
10. **DON'T** set `PRISMA_GENERATE_DATAPROXY` environment variable

## 🚨 CRITICAL: CHANGELOG DATES - NEVER INVENT

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

## 🎯 Quality Targets

- TypeScript Errors: 0
- ESLint Problems: 0
- Build Success: 100%
- Test Coverage: Adequate
- Performance: Optimized
- Accessibility: WCAG 2.1 AA

## 📚 Key Documentation Links

- **Getting Started**: `docs/getting-started/installation.md`
- **Architecture**: `docs/architecture/overview.md`
- **Design System**: `docs/features/design-system.md`
- **Admin System**: `docs/features/admin-system.md`
- **Troubleshooting**: `docs/getting-started/troubleshooting.md`
- **Dependencies**: `docs/references/dependencies.md`

---

**REMEMBER**: This project has established patterns, professional documentation,
and specific compatibilities. NEVER hallucinate - always consult the
documentation first!

_Last updated: January 2025 | Version: 1.0_
