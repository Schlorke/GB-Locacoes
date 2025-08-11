# 🎬 Sistema de Scroll Reveal - Guia Rápido

## 🚀 Como Funciona

O sistema detecta automaticamente o tipo de navegação e ajusta o comportamento:

- **Primeira visita** → Animações suaves ✨
- **Navegação interna** → Elementos aparecem instantaneamente ⚡

## 📁 Arquivos Principais

| Arquivo                             | Função                         |
| ----------------------------------- | ------------------------------ |
| `components/scroll-reveal-init.tsx` | Sistema global de controle     |
| `components/featured-materials.tsx` | Exemplo de componente dinâmico |
| `components/header.tsx`             | Marcação de navegação interna  |
| `docs/scroll-reveal-system.md`      | Documentação técnica completa  |

## 🔧 Adicionando Novos Elementos

### 1. Elementos Estáticos (HTML sempre presente)

```tsx
// Adicione as classes CSS
<h2 className="section-title">Meu Título</h2>
<p className="section-subtitle">Minha descrição</p>
```

### 2. Elementos Dinâmicos (carregados assincronamente)

```tsx
// No seu componente
useEffect(() => {
  fetchData().finally(() => {
    // Disparar evento quando carregar
    const event = new CustomEvent("meuComponenteLoaded")
    window.dispatchEvent(event)
  })
}, [])
```

```tsx
// No scroll-reveal-init.tsx
window.addEventListener("meuComponenteLoaded", handleMeuComponente)
```

## 🎯 Classes Disponíveis

| Classe              | Animação               | Uso                 |
| ------------------- | ---------------------- | ------------------- |
| `.section-title`    | slideInUp (0.2s delay) | Títulos de seção    |
| `.section-subtitle` | slideInUp (0.4s delay) | Subtítulos de seção |
| `.category-card`    | slideInUp (escada)     | Cards de categoria  |
| `.material-card`    | slideInUp (escada)     | Cards de material   |
| `.benefit-card`     | slideInUp (escada)     | Cards de benefício  |
| `.hero-title`       | slideInLeft            | Título principal    |
| `.hero-subtitle`    | slideInLeft            | Subtítulo principal |

## 🐛 Debug

```javascript
// No console do browser
// Verificar tipo de navegação
sessionStorage.getItem("internalNavigation")
sessionStorage.getItem("hasVisitedSite")

// Verificar elementos detectados
document.querySelectorAll(".section-title, .section-subtitle")

// Verificar elementos ocultos
document.querySelectorAll('[style*="opacity: 0"]')
```

## ⚠️ Cuidados

- Sempre teste primeira visita vs navegação interna
- Elementos dinâmicos precisam disparar evento customizado
- Não remova as classes CSS dos elementos
- Cleanup adequado em useEffect é essencial

## 📖 Documentação Completa

Para detalhes técnicos, arquitetura e troubleshooting: 👉
**[docs/scroll-reveal-system.md](docs/scroll-reveal-system.md)**
