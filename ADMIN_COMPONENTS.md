# 🧩 Componentes Reutilizáveis - Admin Dashboard

Este arquivo contém exemplos práticos de componentes que podem ser extraídos e reutilizados em todo o sistema admin.

## 1. AdminPageHeader

```tsx
// components/admin/admin-page-header-full.tsx
interface AdminPageHeaderFullProps {
  title: string;
  subtitle: string;
  backHref?: string;
  icon: React.ReactNode;
  badge?: {
    icon: React.ReactNode;
    text: string;
  };
}

export function AdminPageHeaderFull({
  title,
  subtitle,
  backHref,
  icon,
  badge,
}: AdminPageHeaderFullProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            {backHref && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white"
              >
                <Link href={backHref}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">{title}</h1>
              <p className="text-orange-50 font-medium">{subtitle}</p>
            </div>
          </div>
          {badge && (
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
              {badge.icon}
              <span className="font-semibold text-white">{badge.text}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

## 2. AdminCard

```tsx
// components/admin/admin-card.tsx
interface AdminCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  delay?: number;
}

export function AdminCard({ title, description, children, delay = 0.1 }: AdminCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

        <CardHeader className="relative z-10">
          <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </CardHeader>

        <CardContent className="relative z-10 space-y-8">{children}</CardContent>
      </Card>
    </motion.div>
  );
}
```

## 3. FormSection

```tsx
// components/admin/form-section.tsx
interface FormSectionProps {
  title: string;
  number: number;
  optional?: boolean;
  children: React.ReactNode;
  colorScheme?: 'blue' | 'purple' | 'green' | 'orange';
}

const colorSchemes = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
};

export function FormSection({
  title,
  number,
  optional = false,
  children,
  colorScheme = 'blue',
}: FormSectionProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <div className={`w-6 h-6 ${colors.bg} rounded-full flex items-center justify-center`}>
          <span className={`text-xs font-medium ${colors.text}`}>{number}</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {optional && <span className="text-sm text-gray-500">(Opcional)</span>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
```

## 4. FormField

```tsx
// components/admin/form-field.tsx
interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  description?: string;
}

export function FormField({ label, required = false, children, description }: FormFieldProps) {
  return (
    <div>
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      <div className="mt-1">{children}</div>
    </div>
  );
}
```

## 5. ActionButtons

```tsx
// components/admin/action-buttons.tsx
interface ActionButtonsProps {
  cancelHref: string;
  cancelText?: string;
  submitText?: string;
  loadingText?: string;
  isLoading?: boolean;
  onSubmit?: () => void;
}

export function ActionButtons({
  cancelHref,
  cancelText = 'Cancelar',
  submitText = 'Salvar',
  loadingText = 'Salvando...',
  isLoading = false,
  onSubmit,
}: ActionButtonsProps) {
  return (
    <div className="flex justify-end pt-6 mt-8 border-t border-gray-100">
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button variant="outline" type="button" asChild className="w-full sm:w-auto bg-transparent">
          <Link href={cancelHref}>{cancelText}</Link>
        </Button>
        <Button type="submit" disabled={isLoading} onClick={onSubmit} className="w-full sm:w-auto">
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? loadingText : submitText}
        </Button>
      </div>
    </div>
  );
}
```

## 6. EditableList

```tsx
// components/admin/editable-list.tsx
interface EditableListItem {
  id: string;
  title: string;
  description?: string;
}

interface EditableListProps {
  items: EditableListItem[];
  onRemove: (id: string) => void;
  emptyMessage?: string;
}

export function EditableList({
  items,
  onRemove,
  emptyMessage = 'Nenhum item adicionado',
}: EditableListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm">{item.title}</div>
            {item.description && (
              <div className="text-sm mt-1 text-gray-600">{item.description}</div>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item.id)}
            className="flex-shrink-0 ml-2"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );
}
```

## 7. LoadingPage

```tsx
// components/admin/loading-page.tsx
interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message = 'Carregando...' }: LoadingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-lg text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
```

## 8. EmptyState

```tsx
// components/admin/empty-state.tsx
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <div className="w-12 h-12 mx-auto mb-3">{icon}</div>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      {action && (
        <Button
          onClick={action.onClick}
          asChild={!!action.href}
          className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300"
        >
          {action.href ? (
            <Link href={action.href}>
              <Plus className="w-4 h-4 mr-2" />
              {action.text}
            </Link>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              {action.text}
            </>
          )}
        </Button>
      )}
    </div>
  );
}
```

## 9. StatusBadge

```tsx
// components/admin/status-badge.tsx
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'error' | 'success';
  text?: string;
}

const statusConfig = {
  active: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    defaultText: 'Ativo',
  },
  inactive: {
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: XCircle,
    defaultText: 'Inativo',
  },
  pending: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    defaultText: 'Pendente',
  },
  error: {
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: AlertCircle,
    defaultText: 'Erro',
  },
  success: {
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: CheckCircle,
    defaultText: 'Sucesso',
  },
};

export function StatusBadge({ status, text }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const displayText = text || config.defaultText;

  return (
    <Badge variant="outline" className={`${config.color} flex items-center gap-1.5 font-medium`}>
      <Icon className="w-3.5 h-3.5" />
      {displayText}
    </Badge>
  );
}
```

## 10. DetailModal

```tsx
// components/admin/detail-modal.tsx
interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  avatar?: string;
  children: React.ReactNode;
}

export function DetailModal({
  isOpen,
  onClose,
  title,
  subtitle,
  avatar,
  children,
}: DetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            {avatar && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                {avatar}
              </div>
            )}
            <div>
              <div>{title}</div>
              {subtitle && <div className="text-sm text-gray-500 font-normal">{subtitle}</div>}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
```

## Como Usar os Componentes

### Exemplo: Página de Formulário Completa

```tsx
export default function NovaCategoria() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        <AdminPageHeaderFull
          title="Nova Categoria"
          subtitle="Adicione uma nova categoria de equipamentos"
          backHref="/admin/categorias"
          icon={<Tag className="w-6 h-6 text-orange-200" />}
          badge={{
            icon: <Package className="w-5 h-5 text-orange-50" />,
            text: 'Preencha os dados da categoria',
          }}
        />

        <form onSubmit={handleSubmit}>
          <AdminCard title="Dados da Categoria" description="Informações básicas da categoria">
            <FormSection title="Informações Básicas" number={1}>
              <FormField label="Nome da Categoria" required>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Ferramentas Elétricas"
                  className="focus:border-blue-500"
                />
              </FormField>

              <FormField
                label="Descrição"
                description="Descreva o tipo de equipamentos desta categoria"
              >
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Descreva a categoria..."
                  className="focus:border-blue-500"
                />
              </FormField>
            </FormSection>

            <ActionButtons
              cancelHref="/admin/categorias"
              isLoading={isLoading}
              submitText="Criar Categoria"
              loadingText="Criando..."
            />
          </AdminCard>
        </form>
      </div>
    </div>
  );
}
```
