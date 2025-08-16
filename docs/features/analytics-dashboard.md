# 📊 Dashboard de Analytics - GB Locações

> **Status**: ✅ **IMPLEMENTADO E FUNCIONAL** (Janeiro 2025)  
> **Rota**: `/admin/analytics`  
> **Arquivo Principal**: `app/admin/analytics/page.tsx`

## 📋 **Visão Geral**

O Dashboard de Analytics é uma interface administrativa avançada que fornece
insights em tempo real sobre o desempenho da API, métricas de uso, monitoramento
de segurança e análise de comportamento do sistema. Foi desenvolvido seguindo a
identidade visual do projeto GB-Locações com foco em UX profissional.

## 🎯 **Funcionalidades Principais**

### **📈 Métricas em Tempo Real**

- **Overview Geral**: Total de requisições, tempo médio de resposta, taxa de
  erro, usuários ativos
- **Métricas Coloridas**: Indicadores visuais dinâmicos baseados em performance
- **Auto-refresh**: Atualização automática configurável (5s, 10s, 30s, manual)
- **Filtros Temporais**: Últimas 24h, 7 dias, 30 dias

### **🔍 Monitoramento Avançado**

- **Top Endpoints**: Rankings por número de requisições com detalhes de
  performance
- **Erros Recentes**: Monitoramento de falhas com timestamps e frequência
- **Atividade por Horário**: Gráfico de barras interativo mostrando distribuição
  temporal
- **Detecção de Anomalias**: Alertas automáticos para comportamentos suspeitos

### **🛡️ Segurança e Observabilidade**

- **Security Events**: Integração com sistema de monitoramento de segurança
- **Performance Tracking**: Rastreamento de response time e throughput
- **User Activity**: Distinção entre usuários autenticados, anônimos e admin
- **API Health**: Status geral da saúde da API

## 🎨 **Design e UX**

### **Identidade Visual**

- **Cores Primárias**: Laranja (#ea580c) como cor de destaque
- **Paleta Semântica**: Verde (sucesso), Amarelo (atenção), Vermelho (erro)
- **Tipografia**: Inter para texto, Jost para headings
- **Iconografia**: Lucide Icons com significado semântico

### **Componentes Utilizados**

- **Cards**: `@/components/ui/card` para containers de métricas
- **Badges**: `@/components/ui/badge` para indicadores de status
- **Botões**: `@/components/ui/button` com variantes consistentes
- **Filtros**: `@/components/admin/admin-filter-card` para seleção temporal
- **Alertas**: `@/components/ui/alert` para notificações importantes

### **Animações e Interatividade**

- **Framer Motion**: Animações suaves de entrada e hover
- **Loading States**: Skeletons durante carregamento
- **Error States**: Tratamento visual de erros com ilustrações
- **Hover Effects**: Feedback visual em todos elementos interativos
- **Tooltips**: Informações contextuais no gráfico de barras

## 🛠️ **Implementação Técnica**

### **Estrutura do Componente**

```typescript
"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

// Componentes UI
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

// Componentes Admin
import { AdminFilterCard } from "@/components/admin/admin-filter-card"

// Ícones
import {
  BarChart3,
  RefreshCw,
  Activity,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  Server,
  AlertTriangle,
  Globe,
  Hash,
  Shield,
  Zap
} from "lucide-react"
```

### **Estados e Gerenciamento**

```typescript
// Estados principais
const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

// Estados de configuração
const [selectedPeriod, setSelectedPeriod] = useState<string>("1d")
const [autoRefresh, setAutoRefresh] = useState(true)
const [showDetails, setShowDetails] = useState<string | null>(null)
```

### **Integração com APIs**

```typescript
// Endpoint principal
const fetchAnalytics = useCallback(async () => {
  try {
    setLoading(true)
    setError(null)

    const response = await fetch(
      `/api/admin/analytics?period=${selectedPeriod}`
    )

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: AnalyticsData = await response.json()
    setAnalytics(data)
    setLastUpdated(new Date())

    // Notificação de anomalias
    if (data.anomalies?.length > 0) {
      toast({
        title: "⚠️ Anomalias Detectadas",
        description: `${data.anomalies.length} anomalia(s) encontrada(s) na API`,
        variant: "destructive"
      })
    }
  } catch (err) {
    console.error("Erro ao buscar analytics:", err)
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido"
    setError(errorMessage)
    toast({
      title: "Erro ao carregar analytics",
      description: errorMessage,
      variant: "destructive"
    })
  } finally {
    setLoading(false)
  }
}, [selectedPeriod, toast])
```

## 📊 **Seções do Dashboard**

### **1. Header com Controles**

- **Título**: "Analytics Dashboard" com ícone BarChart3
- **Badges**: Última atualização e status do auto-refresh
- **Botão Refresh**: Atualização manual com loading spinner
- **Filtros**: Seleção de período temporal

### **2. Seção de Anomalias**

- **Conditional Rendering**: Aparece apenas quando há anomalias
- **Alert Component**: Estilo destrutivo com ícone AlertTriangle
- **Lista de Anomalias**: Badges de severidade com detalhes
- **Expansão**: Botão "Ver todas" para mostrar lista completa

### **3. Métricas Principais (Grid 4x1)**

- **Total de Requests**: Com ícone Activity
- **Tempo Médio**: Com cores dinâmicas baseadas na performance
- **Taxa de Erro**: Com ícones TrendingUp/Down baseados no valor
- **Usuários Ativos**: Distinguindo autenticados, anônimos e admin

### **4. Top Endpoints**

- **Lista Ranqueada**: Top 8 endpoints por número de requisições
- **Badges de Tipo**: PUBLIC vs ADMIN com cores diferentes
- **Métricas Detalhadas**: Requests, tempo médio, taxa de erro
- **Expansão**: Botão para ver lista completa

### **5. Erros Recentes**

- **Lista de Erros**: Últimos 6 erros com detalhes
- **Empty State**: Mensagem celebrativa quando não há erros
- **Timestamps**: Formatação localizada de datas
- **Expansão**: Botão para ver histórico completo

### **6. Gráfico de Atividade por Horário**

- **Grid 12x2**: 24 barras representando horas do dia
- **Cores Dinâmicas**: Gradiente laranja baseado na intensidade
- **Tooltips**: Informações detalhadas on hover
- **Estatísticas**: Pico máximo, média por hora, horas ativas

## 🔧 **Funções Utilitárias**

### **Formatação de Dados**

```typescript
const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

const formatPercent = (num: number): string => `${(num * 100).toFixed(1)}%`

const formatDuration = (ms: number): string => {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`
  return `${ms}ms`
}
```

### **Cores Dinâmicas**

```typescript
const getResponseTimeColor = (time: number): string => {
  if (time > 2000) return "text-red-600"
  if (time > 1000) return "text-yellow-600"
  return "text-green-600"
}

const getErrorRateColor = (rate: number): string => {
  if (rate > 0.1) return "text-red-600"
  if (rate > 0.05) return "text-yellow-600"
  return "text-green-600"
}

const getSeverityColor = (severity: string): string => {
  switch (severity.toLowerCase()) {
    case "high":
      return "destructive"
    case "medium":
      return "outline"
    default:
      return "secondary"
  }
}
```

## 📱 **Responsividade**

### **Breakpoints Implementados**

- **Desktop (>1024px)**: Grid 4 colunas para métricas principais
- **Tablet (768-1024px)**: Grid 2 colunas
- **Mobile (<768px)**: Grid 1 coluna, stack vertical

### **Otimizações Mobile**

- **Texto Responsivo**: Tamanhos ajustáveis de fonte
- **Espaçamentos**: Padding reduzido em telas menores
- **Interação Touch**: Botões com tamanho adequado para toque
- **Scroll Otimizado**: Layout que funciona bem com scroll vertical

## 🧪 **Estados de Loading e Error**

### **Loading State**

```typescript
{loading && (
  <div className="space-y-6 p-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-3 w-32" />
          </Card>
        ))}
      </div>
    </div>
  </div>
)}
```

### **Error State**

```typescript
{error && (
  <div className="flex flex-col items-center justify-center min-h-96 p-6">
    <div className="text-center space-y-4">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <AlertTriangle className="h-8 w-8 text-red-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900">
        Erro ao carregar analytics
      </h2>
      <p className="text-gray-600 max-w-md">{error}</p>
    </div>
    <Button onClick={fetchAnalytics} disabled={loading}>
      <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
      Tentar Novamente
    </Button>
  </div>
)}
```

### **Empty State**

```typescript
{!analytics && !loading && !error && (
  <Alert className="m-6">
    <Database className="h-4 w-4" />
    <AlertDescription>
      Nenhum dado de analytics disponível no momento.
      Os dados aparecerão quando houver atividade na API.
    </AlertDescription>
  </Alert>
)}
```

## ⚡ **Performance e Otimizações**

### **Auto-refresh Inteligente**

```typescript
useEffect(() => {
  if (!autoRefresh) return

  const interval = setInterval(() => {
    fetchAnalytics()
  }, 30000) // 30 segundos

  return () => clearInterval(interval)
}, [fetchAnalytics, autoRefresh])
```

### **Memoização de Componentes**

- **useCallback**: Para função `fetchAnalytics`
- **useMemo**: Para computações caras (se necessário)
- **React.memo**: Para subcomponentes que não mudam frequentemente

### **Otimizações de Renderização**

- **Conditional Rendering**: Componentes renderizados apenas quando necessário
- **AnimatePresence**: Animações otimizadas com Framer Motion
- **Lazy Evaluation**: Cálculos pesados feitos apenas quando necessário

## 🔗 **Integração com Sistema**

### **Autenticação**

- **Middleware**: Verificação automática de role ADMIN
- **Proteção de Rota**: Redirecionamento para login se não autorizado
- **Session Management**: Integração com NextAuth.js

### **APIs Consumidas**

- **`/api/admin/analytics`**: Endpoint principal para métricas
- **`/api/admin/security`**: Dados de monitoramento de segurança
- **Query Parameters**: `?period=1d|7d|30d` para filtros temporais

### **Navegação**

- **Admin Sidebar**: Item "Analytics" com ícone BarChart3
- **Breadcrumbs**: Navegação contextual
- **Deep Linking**: URLs que refletem estado da aplicação

## 🐛 **Troubleshooting**

### **Problemas Comuns**

#### **Dados não carregam**

- **Verificar**: Autenticação de admin válida
- **Verificar**: API `/api/admin/analytics` respondendo
- **Verificar**: Logs do browser para erros JavaScript

#### **Gráficos não aparecem**

- **Verificar**: Dados válidos retornados pela API
- **Verificar**: Estrutura esperada do objeto `analytics`
- **Verificar**: Console para erros de renderização

#### **Performance lenta**

- **Verificar**: Tamanho dos dados retornados
- **Considerar**: Paginação para datasets grandes
- **Verificar**: Implementação de auto-refresh

### **Debugging**

```typescript
// Logs úteis para debug
console.log("Analytics data:", analytics)
console.log("Selected period:", selectedPeriod)
console.log("Auto-refresh status:", autoRefresh)
console.log("Last updated:", lastUpdated)
```

## 🔄 **Atualizações Futuras**

### **Melhorias Planejadas**

- **Export de Dados**: CSV/PDF dos relatórios
- **Alertas Customizados**: Configuração de thresholds
- **Comparações Temporais**: Período vs período anterior
- **Drill-down**: Detalhes específicos por endpoint
- **Dashboards Personalizados**: Widgets configuráveis

### **Otimizações Técnicas**

- **WebSocket**: Updates em tempo real
- **Server-Sent Events**: Para notificações push
- **Service Worker**: Cache inteligente de dados
- **Progressive Web App**: Funcionalidades offline

---

## 📚 **Referências**

- **Componentes**: `docs/features/design-system.md`
- **Admin System**: `docs/features/admin-system.md`
- **API Documentation**: `docs/architecture/api.md`
- **Telemetry System**: Código em `lib/telemetry.ts`
- **Metrics System**: Código em `lib/metrics.ts`

---

**📝 Última Atualização**: Janeiro 2025  
**👨‍💻 Implementado por**: Sistema de IA com base nas diretrizes do projeto  
**🎯 Status**: Produção - Totalmente funcional
