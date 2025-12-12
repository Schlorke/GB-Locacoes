# 🔔 Sistema de Toast Notifications - GB Locações

> Sistema completo de notificações usando **Sonner** com identidade visual GB
> Locações

## 🎯 Visão Geral

O projeto utiliza **Sonner** (biblioteca moderna e performática) para exibir
notificações toast com 5 variantes personalizadas seguindo a identidade visual
do projeto.

---

## 🎨 Variantes Disponíveis

### 1. **Success** (Verde) ✓

- **Uso**: Operações bem-sucedidas
- **Cor**: Verde (#16a34a)
- **Exemplo**: "Perfil atualizado com sucesso!"

### 2. **Error** (Vermelho) ✕

- **Uso**: Erros críticos
- **Cor**: Vermelho (#dc2626)
- **Exemplo**: "Não foi possível salvar as alterações"

### 3. **Warning** (Laranja) ⚠

- **Uso**: Avisos importantes
- **Cor**: Laranja **#ea580c** (cor oficial GB Locações)
- **Exemplo**: "Por favor, preencha todos os campos"

### 4. **Info** (Azul) ⓘ

- **Uso**: Informações gerais
- **Cor**: Azul (#2563eb)
- **Exemplo**: "Novo recurso disponível!"

### 5. **Default** (Neutro)

- **Uso**: Mensagens neutras
- **Cor**: Cinza
- **Exemplo**: "Mensagem genérica"

---

## 📦 Como Usar

### **Opção 1: Com Hook (Recomendado)**

```tsx
"use client"

import { useToastSonner } from "@/hooks/use-toast-sonner"
import { Button } from "@/components/ui/button"

export default function MyPage() {
  const { success, error, warning, info, toast } = useToastSonner()

  const handleSave = async () => {
    try {
      await saveData()
      success("Salvo!", "Dados salvos com sucesso.")
    } catch {
      error("Erro!", "Não foi possível salvar.")
    }
  }

  return <Button onClick={handleSave}>Salvar</Button>
}
```

### **Opção 2: Funções Diretas**

```tsx
import { success, error, warning, info } from "@/hooks/use-toast-sonner"

// Usar diretamente sem hook
success("Sucesso!", "Operação concluída")
error("Erro!", "Algo deu errado")
warning("Atenção!", "Cuidado com esta ação")
info("Info", "Informação útil")
```

---

## 💡 Exemplos Práticos

### **Exemplo 1: Salvar Perfil**

```tsx
const handleUpdateProfile = async () => {
  try {
    await updateProfile(formData)
    success("Perfil Atualizado!", "Suas informações foram salvas.")
  } catch {
    error("Erro ao Atualizar", "Não foi possível salvar as alterações.")
  }
}
```

### **Exemplo 2: Adicionar Endereço**

```tsx
const handleAddAddress = async () => {
  try {
    await addAddress(newAddress)
    success("Endereço Adicionado!", "Novo endereço salvo com sucesso.")
  } catch {
    error("Erro ao Adicionar", "Não foi possível salvar o endereço.")
  }
}
```

### **Exemplo 3: Validação de Formulário**

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  if (!formData.email) {
    warning("Campo Obrigatório", "Por favor, preencha o e-mail.")
    return
  }

  if (!isValidEmail(formData.email)) {
    error("E-mail Inválido", "Por favor, insira um e-mail válido.")
    return
  }

  submitForm()
}
```

### **Exemplo 4: Nova Feature**

```tsx
useEffect(() => {
  // Mostrar info sobre nova feature
  info("Novo Recurso!", "Agora você pode personalizar seu perfil.")
}, [])
```

---

## 🎨 Características Visuais

### **Design:**

- ✅ Gradientes suaves para cada variante
- ✅ Glassmorphism (backdrop-blur)
- ✅ Sombras em 2 níveis (base e hover)
- ✅ Border radius 0.5rem
- ✅ Ícones automáticos (20x20px)

### **Comportamento:**

- ✅ **Auto-dismiss**: 4 segundos
- ✅ **Limite**: 3 toasts simultâneos
- ✅ **Swipe**: Arrastar para fechar
- ✅ **Close button**: Sempre visível
- ✅ **Animações**: Entrada suave (slide-in)

### **Responsividade:**

- ✅ **Desktop** (≥640px): Top-right
- ✅ **Mobile** (<640px): Top-center
- ✅ **Max-width**: 420px

---

## 🔧 Configuração

### **Arquivo Principal:**

`components/ui/sonner-toaster.tsx`

### **Hook Wrapper:**

`hooks/use-toast-sonner.ts`

### **Integração:**

`app/ClientLayout.tsx` (componente `<Toaster />`)

### **Posicionamento (Público vs Admin)**

O projeto usa **offsets diferentes** para não quebrar UX:

- **Páginas públicas**: toast aparece **abaixo do header público** (offset
  maior)
- **Admin**: toast fica **mais acima no desktop** (admin não tem header fixa), e
  **abaixo do header do admin no mobile**

Isso é controlado em `components/ui/sonner-toaster.tsx` via CSS global:

- Default (público): `[data-sonner-toaster] { top: 120px }`
- Admin (override): `body.admin-body-layout [data-sonner-toaster] { top: 16px }`
- Admin mobile: `@media (max-width: 767px) { top: 80px }`

---

## ✅ Quando Usar Toast

### **Use Toast Para:**

- ✓ Confirmar operações assíncronas (salvar, criar, atualizar, deletar)
- ✓ Notificar sobre erros não-críticos
- ✓ Fornecer feedback de ações bem-sucedidas
- ✓ Alertar sobre situações que requerem atenção

### **NÃO Use Toast Para:**

- ✗ Validações em tempo real (use feedback inline)
- ✗ Erros críticos que requerem ação imediata (use Dialog/Modal)
- ✗ Informações que o usuário precisa ler com atenção (use Alert)
- ✗ Ações que redirecionam o usuário (navegação já é feedback)

---

## 📝 Boas Práticas

### **Mensagens Efetivas:**

- **Título**: Curto e descritivo (2-4 palavras)
- **Descrição**: Contexto adicional (opcional, mas recomendado)
- **Tom**: Claro, direto e amigável

### **Exemplos de Boas Mensagens:**

✅ **BOM:**

```tsx
success("Salvo!", "Alterações salvas com sucesso.")
error("Erro ao Salvar", "Tente novamente em alguns instantes.")
warning("Atenção", "Esta ação não pode ser desfeita.")
```

❌ **RUIM:**

```tsx
success("OK") // Muito vago
error("Error: XYZ123ABC") // Código técnico para usuário
warning("Você não pode fazer isso agora porque...") // Muito longo
```

---

## 🧪 Página de Testes

Acesse a página de testes para validar todas as variantes:

```
http://localhost:3000/admin/teste-toast
```

A página inclui:

- ✅ Todos os 5 tipos de toast
- ✅ Exemplos práticos de uso
- ✅ Teste de limite (3 simultâneos)
- ✅ Teste de auto-dismiss
- ✅ Especificações completas

---

## 🎯 API Completa

### **Funções Disponíveis:**

```typescript
const { success, error, warning, info, toast, dismiss } = useToastSonner()

// Success
success(title: string, description?: string)

// Error
error(title: string, description?: string)

// Warning
warning(title: string, description?: string)

// Info
info(title: string, description?: string)

// Default/Custom
toast(title: string, description?: string)

// Dismiss específico ou todos
dismiss(toastId?: string | number)
```

### **Opções Avançadas:**

```typescript
import { toast } from "sonner"

toast.success("Título", {
  description: "Descrição",
  duration: 5000, // Custom duration
  action: {
    label: "Desfazer",
    onClick: () => console.log("Desfazer clicado")
  }
})
```

---

## 🚀 Performance

- **Lightweight**: Sonner é extremamente leve (~3KB gzipped)
- **Performático**: Otimizado para renderização
- **Acessível**: ARIA labels automáticos
- **Responsivo**: Adapta-se perfeitamente a mobile/desktop

---

## 📋 Checklist de Implementação

- [x] Sonner instalado (v2.0.7)
- [x] SonnerToaster criado com configurações
- [x] Hook useToastSonner criado
- [x] Integrado no ClientLayout
- [x] Estilos customizados no globals.css
- [x] 5 variantes funcionais
- [x] Página de testes criada
- [x] Documentação completa
- [x] Zero erros de lint

---

## 🎨 Identidade Visual

Todas as cores seguem a paleta oficial do projeto GB Locações:

- **Success**: Verde (#16a34a)
- **Error**: Vermelho (#dc2626)
- **Warning**: Laranja **#ea580c** ← Cor primária do projeto
- **Info**: Azul (#2563eb)
- **Default**: Neutro (cinza)

---

**Sistema de Toast 100% funcional e pronto para uso em produção!** 🎉

---

_Última atualização: Janeiro 2025_ _Tecnologia: Sonner v2.0.7_
