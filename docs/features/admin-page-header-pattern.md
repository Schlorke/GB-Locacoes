# 📋 AdminPageHeader - Padrão e Erros Comuns

> **Documentação completa sobre o componente AdminPageHeader: padrão correto,
> erros comuns e checklist obrigatório**

## 🎯 Visão Geral

O componente `AdminPageHeader` é o padrão **OBRIGATÓRIO** para todos os headers
de páginas administrativas. Ele garante consistência visual, animações e
funcionalidades em todas as páginas admin.

**Localização**: `components/admin/admin-page-header.tsx`

---

## ✅ Padrão Correto

### **Estrutura Obrigatória**

```tsx
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { Package } from "lucide-react"

// Uso correto
;<AdminPageHeader
  title="Gerenciar Locações"
  subtitle="Visualize e gerencie todas as locações de equipamentos"
  icon={<Package className="w-8 h-8" />}
  infoBadge={{
    icon: <Package className="w-5 h-5 text-orange-50" />,
    text: `${filteredItems.length} locações encontradas`
  }}
  className="mb-8"
/>
```

### **Props Disponíveis**

| Prop        | Tipo        | Obrigatório | Descrição                           |
| ----------- | ----------- | ----------- | ----------------------------------- |
| `title`     | `string`    | ✅ Sim      | Título principal da página          |
| `subtitle`  | `string`    | ❌ Opcional | Subtítulo explicativo               |
| `icon`      | `ReactNode` | ❌ Opcional | Ícone principal (tamanho `w-8 h-8`) |
| `infoBadge` | `object`    | ❌ Opcional | Badge de informação contextual      |
| `className` | `string`    | ❌ Opcional | Classes CSS adicionais              |

### **Estrutura do infoBadge**

```tsx
infoBadge={{
  icon: <IconComponent className="w-5 h-5 text-orange-50" />,
  text: "Texto informativo aqui"
}}
```

**Regras do infoBadge:**

- ✅ Ícone deve ter `w-5 h-5 text-orange-50`
- ✅ Texto deve ser dinâmico (contadores, estatísticas)
- ✅ Usar dados filtrados quando disponível: `filteredItems.length`
- ✅ Fallback para dados totais: `items.length`

---

## 🚨 Erros Comuns e Como Evitar

### **❌ ERRO 1: Criar Header Customizado em vez de Usar AdminPageHeader**

**O QUE ACONTECEU:**

- Páginas criavam headers customizados com `motion.div` e estrutura manual
- Cada página tinha código duplicado e inconsistente
- Difícil manter consistência visual

**EXEMPLO ERRADO:**

```tsx
// ❌ NUNCA FAÇA ISSO
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-8"
>
  <div className="relative overflow-hidden bg-gradient-to-br from-orange-500...">
    {/* Código duplicado */}
  </div>
</motion.div>
```

**✅ SOLUÇÃO CORRETA:**

```tsx
// ✅ SEMPRE USE O COMPONENTE
<AdminPageHeader
  title="Título"
  subtitle="Subtítulo"
  icon={<Icon className="w-8 h-8" />}
  className="mb-8"
/>
```

**LIÇÃO APRENDIDA:**

- ✅ **SEMPRE** use `AdminPageHeader` para headers admin
- ❌ **NUNCA** crie headers customizados
- ✅ **SEMPRE** reutilize componentes existentes

---

### **❌ ERRO 2: Esquecer a Animação do Framer Motion**

**O QUE ACONTECEU:**

- Componente `AdminPageHeader` foi criado sem animação
- Headers apareciam sem transição suave
- Experiência visual inconsistente com outras páginas

**EXEMPLO ERRADO:**

```tsx
// ❌ Componente sem animação
export function AdminPageHeader({ ... }) {
  return (
    <div className="..."> {/* Sem motion.div */}
      {/* Conteúdo */}
    </div>
  )
}
```

**✅ SOLUÇÃO CORRETA:**

```tsx
// ✅ Componente com animação
export function AdminPageHeader({ ... }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="..."
    >
      {/* Conteúdo */}
    </motion.div>
  )
}
```

**LIÇÃO APRENDIDA:**

- ✅ **SEMPRE** use `motion.div` com animação de entrada
- ✅ **SEMPRE** use `initial={{ opacity: 0, y: -20 }}` e
  `animate={{ opacity: 1, y: 0 }}`
- ❌ **NUNCA** remova animações do componente base

---

### **❌ ERRO 3: Gradientes de Profundidade Incorretos**

**O QUE ACONTECEU:**

- Gradientes simples (`from-transparent via-white/10 to-transparent`)
- Elementos decorativos desnecessários (círculos blur)
- Visual inconsistente com outras páginas

**EXEMPLO ERRADO:**

```tsx
// ❌ Gradientes incorretos
<div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
<div className="absolute top-2 right-2 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
```

**✅ SOLUÇÃO CORRETA:**

```tsx
// ✅ Gradientes corretos (padrão estabelecido)
<div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>
```

**LIÇÃO APRENDIDA:**

- ✅ **SEMPRE** use os gradientes de profundidade estabelecidos
- ❌ **NUNCA** adicione elementos decorativos (círculos blur)
- ✅ **SEMPRE** siga o padrão visual das outras páginas

---

### **❌ ERRO 4: Esquecer o infoBadge (Elemento de Informação)**

**O QUE ACONTECEU:**

- Headers sem informação contextual (contadores, estatísticas)
- Usuários não viam dados importantes no header
- Inconsistência entre páginas (algumas tinham, outras não)

**EXEMPLO ERRADO:**

```tsx
// ❌ Header sem infoBadge
<AdminPageHeader
  title="Gerenciar Locações"
  subtitle="Visualize e gerencie todas as locações"
  icon={<Package className="w-8 h-8" />}
  className="mb-8"
/>
```

**✅ SOLUÇÃO CORRETA:**

```tsx
// ✅ Header com infoBadge
<AdminPageHeader
  title="Gerenciar Locações"
  subtitle="Visualize e gerencie todas as locações"
  icon={<Package className="w-8 h-8" />}
  infoBadge={{
    icon: <Package className="w-5 h-5 text-orange-50" />,
    text: `${filteredRentals.length} locações encontradas`
  }}
  className="mb-8"
/>
```

**LIÇÃO APRENDIDA:**

- ✅ **SEMPRE** adicione `infoBadge` quando houver dados para mostrar
- ✅ **SEMPRE** use dados filtrados quando disponível
- ✅ **SEMPRE** mantenha consistência entre todas as páginas

---

### **❌ ERRO 5: Ícone do infoBadge Sem Classes Corretas**

**O QUE ACONTECEU:**

- Ícone do `infoBadge` sem `text-orange-50`
- Ícone sem wrapper com classe correta
- Visual inconsistente

**EXEMPLO ERRADO:**

```tsx
// ❌ Ícone sem classes corretas
infoBadge={{
  icon: <Package className="w-5 h-5" />, // Sem text-orange-50
  text: "..."
}}
```

**✅ SOLUÇÃO CORRETA:**

```tsx
// ✅ Ícone com classes corretas
infoBadge={{
  icon: <Package className="w-5 h-5 text-orange-50" />,
  text: "..."
}}
```

**LIÇÃO APRENDIDA:**

- ✅ **SEMPRE** use `w-5 h-5 text-orange-50` no ícone do infoBadge
- ✅ **SEMPRE** mantenha consistência visual
- ❌ **NUNCA** esqueça as classes de cor

---

## 📋 Checklist Obrigatório para Novos Headers

Antes de criar uma nova página admin, verifique:

### **✅ Estrutura Básica**

- [ ] Importei `AdminPageHeader` de `@/components/admin/admin-page-header`
- [ ] Usei o componente em vez de criar header customizado
- [ ] Defini `title` (obrigatório)
- [ ] Defini `subtitle` (recomendado)
- [ ] Defini `icon` com tamanho `w-8 h-8` (recomendado)
- [ ] Adicionei `className="mb-8"` para espaçamento

### **✅ infoBadge (Quando Aplicável)**

- [ ] Adicionei `infoBadge` se houver dados para mostrar
- [ ] Ícone do infoBadge tem `w-5 h-5 text-orange-50`
- [ ] Texto do infoBadge é dinâmico (contadores, estatísticas)
- [ ] Uso dados filtrados quando disponível: `filteredItems.length`
- [ ] Tenho fallback para dados totais: `items.length`

### **✅ Consistência Visual**

- [ ] Header segue o mesmo padrão das outras páginas
- [ ] Animação está funcionando (Framer Motion)
- [ ] Gradientes de profundidade estão corretos
- [ ] Não há elementos decorativos desnecessários
- [ ] Visual está consistente com design system

---

## 🎨 Exemplos Práticos por Tipo de Página

### **Página com Lista/Grid (Orçamentos, Locações, etc.)**

```tsx
<AdminPageHeader
  title="Gerenciar Orçamentos"
  subtitle="Visualize, analise e gerencie todos os orçamentos solicitados"
  icon={<FileText className="w-8 h-8" />}
  infoBadge={{
    icon: <FileText className="w-5 h-5 text-orange-50" />,
    text: `${filteredQuotes.length} orçamentos encontrados`
  }}
  className="mb-8"
/>
```

### **Página com Dashboard/Métricas (Financeiro)**

```tsx
<AdminPageHeader
  title="Dashboard Financeiro"
  subtitle="Contas a receber e métricas financeiras"
  icon={<DollarSign className="w-8 h-8" />}
  infoBadge={{
    icon: <DollarSign className="w-5 h-5 text-orange-50" />,
    text: `${receivables.length} contas a receber`
  }}
  className="mb-8"
/>
```

### **Página com Calendário/Agenda (Manutenções, Logística)**

```tsx
<AdminPageHeader
  title="Gerenciar Manutenções"
  subtitle="Agenda e histórico de manutenções de equipamentos"
  icon={<Wrench className="w-8 h-8" />}
  infoBadge={{
    icon: <Wrench className="w-5 h-5 text-orange-50" />,
    text: `${filteredMaintenances.length} manutenções encontradas`
  }}
  className="mb-8"
/>
```

---

## 🔍 Verificação Final

Antes de considerar o header completo, verifique:

1. **Visual**: O header parece igual aos outros headers admin?
2. **Funcionalidade**: A animação está funcionando?
3. **Informação**: O `infoBadge` mostra dados corretos e atualiza com filtros?
4. **Responsividade**: O header funciona bem em mobile, tablet e desktop?
5. **Consistência**: Segue o mesmo padrão das outras páginas?

---

## 📚 Referências

- **Componente**: `components/admin/admin-page-header.tsx`
- **Documentação Admin**: `docs/features/admin-system.md`
- **Design System**: `docs/features/design-system.md`

---

## 🎯 Resumo das Regras de Ouro

1. ✅ **SEMPRE** use `AdminPageHeader` - nunca crie headers customizados
2. ✅ **SEMPRE** adicione animação com Framer Motion
3. ✅ **SEMPRE** use os gradientes de profundidade estabelecidos
4. ✅ **SEMPRE** adicione `infoBadge` quando houver dados para mostrar
5. ✅ **SEMPRE** mantenha consistência visual entre todas as páginas
6. ❌ **NUNCA** remova funcionalidades do componente base
7. ❌ **NUNCA** adicione elementos decorativos desnecessários
8. ❌ **NUNCA** esqueça as classes corretas nos ícones

---

**Última atualização**: Janeiro 2025 **Versão**: 1.0.0 **Status**: ✅ Ativo e
Mantido
