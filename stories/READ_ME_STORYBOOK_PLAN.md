# Storybook Implementation Plan

## 1. Component Map

Below is an overview of all components under `components/` grouped by the proposed Storybook documentation hierarchy.  Dependencies indicate external hooks/providers required for isolation inside Storybook.  Complexity is estimated by the number of external dependencies and internal logic (Low/Medium/High).

### UI

| Component | Path | Dependencies | Complexity |
|-----------|------|--------------|------------|
| Accordion | components/ui/accordion.tsx | - | Low |
| AlertDialog | components/ui/alert-dialog.tsx | - | Low |
| Alert | components/ui/alert.tsx | - | Low |
| AspectRatio | components/ui/aspect-ratio.tsx | - | Low |
| Avatar | components/ui/avatar.tsx | - | Low |
| Badge | components/ui/badge.tsx | - | Low |
| Breadcrumb | components/ui/breadcrumb.tsx | - | Low |
| Button | components/ui/button.tsx | - | Low |
| Calendar | components/ui/calendar.tsx | - | Low |
| Card | components/ui/card.tsx | - | Low |
| Carousel | components/ui/carousel.tsx | - | Low |
| Chart | components/ui/chart.tsx | - | Low |
| Checkbox | components/ui/checkbox.tsx | - | Low |
| CloseButton | components/ui/close-button.tsx | - | Low |
| Collapsible | components/ui/collapsible.tsx | - | Low |
| Command | components/ui/command.tsx | - | Low |
| ContextMenu | components/ui/context-menu.tsx | - | Low |
| CurrencyInput | components/ui/currency-input.tsx | - | Low |
| CustomSelect | components/ui/custom-select.tsx | - | Low |
| Dialog | components/ui/dialog.tsx | - | Low |
| Drawer | components/ui/drawer.tsx | - | Low |
| DropdownMenu | components/ui/dropdown-menu.tsx | - | Low |
| EmojiPicker | components/ui/emoji-picker.tsx | - | Low |
| FilterIndicator | components/ui/filter-indicator.tsx | - | Low |
| FilterResetButton | components/ui/filter-reset-button.tsx | - | Low |
| FilterSelectGroup | components/ui/filter-select-group.tsx | - | Low |
| Form | components/ui/form.tsx | - | Low |
| HoverCard | components/ui/hover-card.tsx | - | Low |
| IconPicker | components/ui/icon-picker.tsx | - | Low |
| ImageUpload | components/ui/image-upload.tsx | next/image | Medium |
| InputOTP | components/ui/input-otp.tsx | - | Low |
| Input | components/ui/input.tsx | - | Low |
| Label | components/ui/label.tsx | - | Low |
| Menubar | components/ui/menubar.tsx | - | Low |
| ModernCategoryModal | components/ui/modern-category-modal.tsx | - | Low |
| NavigationMenu | components/ui/navigation-menu.tsx | - | Low |
| Pagination | components/ui/pagination.tsx | - | Low |
| Popover | components/ui/popover.tsx | - | Low |
| Progress | components/ui/progress.tsx | - | Low |
| RadioGroup | components/ui/radio-group.tsx | - | Low |
| Resizable | components/ui/resizable.tsx | - | Low |
| ScrollArea | components/ui/scroll-area.tsx | - | Low |
| Select | components/ui/select.tsx | - | Low |
| Separator | components/ui/separator.tsx | - | Low |
| Sheet | components/ui/sheet.tsx | - | Low |
| Sidebar | components/ui/sidebar.tsx | - | Low |
| Skeleton | components/ui/skeleton.tsx | - | Low |
| Slider | components/ui/slider.tsx | - | Low |
| SmartPagination | components/ui/smart-pagination.tsx | - | Low |
| Sonner | components/ui/sonner.tsx | - | Low |
| Switch | components/ui/switch.tsx | - | Low |
| Table | components/ui/table.tsx | - | Low |
| Tabs | components/ui/tabs.tsx | - | Low |
| Textarea | components/ui/textarea.tsx | - | Low |
| Toast | components/ui/toast.tsx | - | Low |
| Toaster | components/ui/toaster.tsx | - | Low |
| ToggleGroup | components/ui/toggle-group.tsx | - | Low |
| Toggle | components/ui/toggle.tsx | - | Low |
| Tooltip | components/ui/tooltip.tsx | - | Low |

### Layout

| Component | Path | Dependencies | Complexity |
|-----------|------|--------------|------------|
| Header | components/header.tsx | next/navigation (usePathname) | Medium |
| Footer | components/footer.tsx | - | Low |
| ThemeProvider | components/theme-provider.tsx | - | Low |
| Sidebar (Admin) | components/admin/admin-sidebar.tsx | next/navigation, next-auth, next/image | High |
| MobileSidebar (Admin) | components/admin/mobile-sidebar.tsx | next/navigation, next-auth, next/image | High |
| AdminHeader | components/admin/admin-header.tsx | next-auth | Medium |
| AdminMobileHeader | components/admin/admin-mobile-header.tsx | - | Medium |
| AdminPageHeader | components/admin/admin-page-header.tsx | - | Medium |
| SettingsNavigationBar | components/admin/settings-navigation-bar.tsx | - | Medium |
| SettingsBlock | components/admin/settings-block.tsx | - | Medium |
| SettingsPreviews | components/admin/settings-previews.tsx | next/image | Medium |
| HeroCarouselManager | components/admin/hero-carousel-manager.tsx | next/image | Medium |
| MiniCarousel | components/admin/mini-carousel.tsx | next/image | Medium |

### Forms

| Component | Path | Dependencies | Complexity |
|-----------|------|--------------|------------|
| ContactForm | components/contact-form.tsx | - | Medium |
| ImageUpload (UI) | components/ui/image-upload.tsx | next/image | Medium |
| Form utilities | components/ui/form.tsx, components/ui/input.tsx, components/ui/select.tsx, components/ui/textarea.tsx, components/ui/checkbox.tsx, components/ui/radio-group.tsx, components/ui/switch.tsx | - | Low |

### Feedback

| Component | Path | Dependencies | Complexity |
|-----------|------|--------------|------------|
| Toast/Toaster/Sonner | components/ui/toast.tsx, components/ui/toaster.tsx, components/ui/sonner.tsx | - | Low |
| Alert / AlertDialog | components/ui/alert.tsx, components/ui/alert-dialog.tsx | - | Low |
| Skeleton | components/ui/skeleton.tsx | - | Low |

### Data Display

| Component | Path | Dependencies | Complexity |
|-----------|------|--------------|------------|
| EquipmentCard | components/equipment-card.tsx | next/image | Medium |
| FeaturedMaterials | components/featured-materials.tsx | next/image | Medium |
| Categories | components/categories.tsx | - | Low |
| CategoriesWithAnimation | components/categories-with-animation.tsx | - | Low |
| WhyChooseUs | components/why-choose-us.tsx | - | Low |
| ImageCarouselZoom | components/image-carousel-zoom.tsx | next/image | Medium |
| Hero | components/hero.tsx | next/image | Medium |
| HomePageClient | components/home-page-client.tsx | - | High |
| ContactSection | components/contact-section.tsx | - | Medium |
| WhatsAppFab | components/whatsapp-fab.tsx | - | Low |
| MDX | components/mdx.tsx | - | Medium |
| ScrollRevealInit | components/scroll-reveal-init.tsx | next/navigation | Medium |

### Navigation

| Component | Path | Dependencies | Complexity |
|-----------|------|--------------|------------|
| Header | components/header.tsx | next/navigation | Medium |
| Breadcrumb | components/ui/breadcrumb.tsx | - | Low |
| NavigationMenu | components/ui/navigation-menu.tsx | - | Low |
| Pagination / SmartPagination | components/ui/pagination.tsx, components/ui/smart-pagination.tsx | - | Low |
| Sidebar (UI) | components/ui/sidebar.tsx | - | Low |
| Tabs | components/ui/tabs.tsx | - | Low |
| Admin-specific navigation components | see Layout table | varies | High |

### Composite

Components that compose multiple UI pieces or require significant mocking.

| Component | Path | Dependencies | Complexity |
|-----------|------|--------------|------------|
| HomePageClient | components/home-page-client.tsx | nested components | High |
| HeroCarouselManager | components/admin/hero-carousel-manager.tsx | next/image | Medium |
| MiniCarousel | components/admin/mini-carousel.tsx | next/image | Medium |

## 2. Isolation Risks

- **Auth**: Components under `components/admin/*` use `useSession`/`signOut` from NextAuth and require a `SessionProvider` with mock session data.
- **Router**: `components/header.tsx`, `components/scroll-reveal-init.tsx`, and admin sidebars rely on `usePathname` and must use `next-router-mock` or Storybook's Next.js router support.
- **Data Fetching**: No direct Prisma/Supabase calls in components, but composite components will fetch data through hooks or API routes. These should be intercepted with MSW handlers (`/api/**`).
- **next/image**: Many components import `next/image`; Storybook must configure the Next.js image loader or provide a mock.
- **Theme**: `ThemeProvider` is required globally to provide Tailwind/ShadCN themes.

## 3. Mocking Strategy

- **Auth**: Wrap stories with a `SessionProvider` decorator. Provide `authenticated` and `unauthenticated` mock sessions (roles `ADMIN` and `CLIENT`).
- **Router**: Use `next-router-mock` with decorator to control `pathname` and query parameters per story.
- **Data**: Use `msw` and `msw-storybook-addon` to mock API responses for equipment lists, hero carousel items, etc. Provide success, empty and error handlers.
- **Theme/Styles**: Global decorator importing `@/app/globals.css` and wrapping stories with `ThemeProvider` to maintain design tokens.
- **next/image**: Rely on `@storybook/nextjs` image support or provide a lightweight stub during tests.

## 4. Incremental Roadmap

1. **Phase 1** – Pure UI atoms (`components/ui/*`). Ensure docs & controls for buttons, inputs, etc.
2. **Phase 2** – Layout components (Header, Footer) with router and theme decorators.
3. **Phase 3** – Admin navigation and composite components requiring auth and router.
4. **Phase 4** – Data‑driven components (e.g., Equipment lists) with MSW handlers.
5. **Phase 5** – Full pages or complex composites (HomePageClient, dashboards) with combined mocks.

## 5. KPIs

- **Story coverage**: number of components with stories / total components per category.
- **Docs & Controls**: ≥80% of stories using `tags: ['autodocs']` and arg controls.
- **CI integration**: Chromatic build passing for each PR.
- **A11y checks**: 0 critical accessibility violations via `@storybook/addon-a11y`.
- **Issue tracking**: open/close rate for Storybook tasks in repository project board.

