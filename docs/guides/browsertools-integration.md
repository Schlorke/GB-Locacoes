# 🔧 AgentDesk BrowserTools Integration Guide

> **Documentação completa** para integração e uso do AgentDesk BrowserTools no
> projeto GB-Locações

## 📋 Visão Geral

O **AgentDesk BrowserTools** é uma ferramenta MCP (Model Context Protocol) que
integra o Cursor com o navegador, permitindo monitoramento em tempo real,
auditorias automáticas e análise profunda da aplicação web.

### **⚠️ PRÉ-REQUISITO CRÍTICO**

**IMPORTANTE**: O BrowserTools **NÃO FUNCIONA** sem o servidor rodando. Sempre
execute este comando antes de usar:

```bash
npx @agentdeskai/browser-tools-server@1.2.0
```

- **Porta**: 3025 (certifique-se que está disponível)
- **Status**: Deve ficar rodando durante toda a sessão de desenvolvimento
- **Dependência**: Extensão do Chrome + MCP configurado + Servidor rodando

### **🚀 COMANDOS INTEGRADOS (RECOMENDADO)**

Para facilitar o desenvolvimento, criamos comandos que rodam automaticamente o
BrowserTools junto com o Next.js:

```bash
# RECOMENDADO: Next.js + BrowserTools
pnpm dev:browsertools

# COMPLETO: Next.js + BrowserTools + Storybook
pnpm dev:with-browsertools

# APENAS Next.js (sem BrowserTools)
pnpm dev

# APENAS servidor BrowserTools
pnpm browsertools
```

**Vantagens dos comandos integrados:**

- ✅ Inicia automaticamente o servidor BrowserTools
- ✅ Interface colorida e organizada
- ✅ Para todos os serviços com Ctrl+C
- ✅ Logs separados e identificáveis

### **🎯 Benefícios**

- **Produtividade**: Comandos em linguagem natural para interação com o browser
- **Qualidade**: Auditorias automáticas de SEO, Performance e Acessibilidade
- **Debug**: Análise profunda de elementos DOM e erros JavaScript
- **Visual**: Screenshots automáticos com colagem direta no Cursor
- **Monitoramento**: Console logs e requisições de rede em tempo real

## 🚀 Comandos Disponíveis

### **📸 Visual & Screenshots**

#### `mcp_browser-tools_takeScreenshot`

- **Função**: Captura screenshot da página atual
- **Uso**: `"Tire uma screenshot da página"`
- **Retorno**: Imagem capturada automaticamente colada no Cursor

#### `mcp_browser-tools_getSelectedElement`

- **Função**: Analisa elemento selecionado no DevTools
- **Uso**: `"Analise o elemento selecionado"`
- **Retorno**: Informações detalhadas do elemento (tag, classes, dimensões,
  etc.)

### **🔍 Auditorias & Análises**

#### `mcp_browser-tools_runSEOAudit`

- **Função**: Executa auditoria SEO completa via Lighthouse
- **Uso**: `"Execute auditoria de SEO"`
- **Retorno**: Relatório detalhado de otimizações SEO

#### `mcp_browser-tools_runPerformanceAudit`

- **Função**: Analisa performance da aplicação
- **Uso**: `"Execute auditoria de performance"`
- **Retorno**: Métricas de Core Web Vitals e sugestões de otimização

#### `mcp_browser-tools_runAccessibilityAudit`

- **Função**: Verifica conformidade de acessibilidade WCAG 2.1 AA
- **Uso**: `"Execute auditoria de acessibilidade"`
- **Retorno**: Relatório de problemas de acessibilidade e soluções

#### `mcp_browser-tools_runBestPracticesAudit`

- **Função**: Verifica boas práticas web
- **Uso**: `"Execute auditoria de boas práticas"`
- **Retorno**: Sugestões de melhoria para qualidade geral

### **🐛 Debug & Monitoring**

#### `mcp_browser-tools_getConsoleLogs`

- **Função**: Captura logs do console do navegador
- **Uso**: `"Mostre os logs do console"`
- **Retorno**: Lista de todos os logs registrados

#### `mcp_browser-tools_getConsoleErrors`

- **Função**: Identifica erros JavaScript
- **Uso**: `"Verifique erros no console"`
- **Retorno**: Lista de erros e warnings JavaScript

#### `mcp_browser-tools_getNetworkLogs`

- **Função**: Monitora requisições de rede
- **Uso**: `"Mostre as requisições de rede"`
- **Retorno**: Log de todas as requisições HTTP

#### `mcp_browser-tools_getNetworkErrors`

- **Função**: Identifica erros de rede
- **Uso**: `"Verifique erros de rede"`
- **Retorno**: Requisições com status de erro (4xx, 5xx)

#### `mcp_browser-tools_runDebuggerMode`

- **Função**: Ativa modo debug avançado
- **Uso**: `"Entre no modo debugger"`
- **Retorno**: Análise profunda de problemas da aplicação

### **📊 Modos Avançados**

#### `mcp_browser-tools_runAuditMode`

- **Função**: Executa análise completa da aplicação
- **Uso**: `"Execute modo de auditoria completo"`
- **Retorno**: Relatório abrangente de todas as auditorias

#### `mcp_browser-tools_runNextJSAudit`

- **Função**: Auditoria específica para aplicações Next.js
- **Uso**: `"Execute auditoria Next.js"`
- **Retorno**: Análise otimizada para framework Next.js

## ⚡ Workflow Inteligente

### **🛠️ Durante Desenvolvimento**

```bash
# 0. INICIAR DESENVOLVIMENTO COM BROWSERTOOLS (RECOMENDADO)
pnpm dev:browsertools

# 1. Implementar funcionalidade
# 2. Capturar screenshot para documentar
"Tire uma screenshot da nova funcionalidade"

# 3. Verificar erros de console
"Verifique se há erros no console"

# 4. Testar responsividade
"Redimensione para mobile e tire screenshot"

# 5. Executar auditoria de performance
"Execute auditoria de performance"
```

**Alternativa (manual):**

```bash
# Se preferir rodar separadamente
npx @agentdeskai/browser-tools-server@1.2.0  # Terminal 1
pnpm dev                                     # Terminal 2
```

### **🚀 Antes do Deploy**

```bash
# 0. INICIAR DESENVOLVIMENTO COM BROWSERTOOLS
pnpm dev:browsertools

# 1. Auditoria completa
"Execute modo de auditoria completo"

# 2. Verificar SEO
"Execute auditoria de SEO"

# 3. Verificar acessibilidade
"Execute auditoria de acessibilidade"

# 4. Verificar boas práticas
"Execute auditoria de boas práticas"
```

### **🐛 Durante Debug**

```bash
# 0. INICIAR DESENVOLVIMENTO COM BROWSERTOOLS
pnpm dev:browsertools

# 1. Analisar elemento problemático
"Analise o elemento selecionado no DevTools"

# 2. Verificar erros
"Verifique logs de console e rede"

# 3. Modo debug avançado
"Entre no modo debugger para análise profunda"
```

## 📋 Checklist Obrigatório

Antes de qualquer commit, execute:

- [ ] **🚀 SERVIDOR INICIADO**: `pnpm dev:browsertools` (ou
      `npx @agentdeskai/browser-tools-server@1.2.0`)
- [ ] **Screenshot capturado** para documentar mudanças visuais
- [ ] **Console errors verificados** (deve estar limpo)
- [ ] **Performance audit executado** (score > 90)
- [ ] **SEO audit executado** (otimizações aplicadas)
- [ ] **Accessibility audit executado** (WCAG 2.1 AA)
- [ ] **Responsive design testado** via screenshots
- [ ] **Network errors verificados** (sem erros 4xx/5xx)

## 🎯 Casos de Uso Específicos

### **🎨 Validação de Design System**

```bash
# Verificar consistência visual
"Tire screenshot dos componentes principais"
"Execute auditoria de acessibilidade"
"Verifique contraste de cores"
```

### **📱 Teste de Responsividade**

```bash
# Testar diferentes breakpoints
"Redimensione para 320px e tire screenshot"
"Redimensione para 768px e tire screenshot"
"Redimensione para 1920px e tire screenshot"
```

### **⚡ Otimização de Performance**

```bash
# Análise completa de performance
"Execute auditoria de performance"
"Verifique requisições de rede"
"Analise bundle size"
```

### **🔍 Validação de SEO**

```bash
# Verificar otimizações SEO
"Execute auditoria de SEO"
"Verifique meta tags"
"Analise structured data"
```

## 🚨 Troubleshooting

### **Problemas Comuns**

#### **Screenshot não capturado**

- Verifique se a extensão do Chrome está ativa
- Confirme se o servidor BrowserTools está rodando na porta 3025

#### **Auditorias não executam**

- Verifique se a página está totalmente carregada
- Confirme se não há bloqueadores de popup ativos

#### **Elementos não selecionados**

- Certifique-se de que o DevTools está aberto
- Verifique se o elemento está realmente selecionado

### **Comandos de Diagnóstico**

```bash
# Verificar status da conexão
"Verifique logs do console"

# Testar captura básica
"Tire uma screenshot"

# Verificar erros de rede
"Verifique erros de rede"
```

## 📚 Recursos Adicionais

- **Documentação Oficial**:
  [browsertools.agentdesk.ai](https://browsertools.agentdesk.ai/)
- **Repositório GitHub**:
  [AgentDeskAI/browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp)
- **Instalação**:
  [Guia de Instalação](https://browsertools.agentdesk.ai/installation)

## 🎯 Objetivos de Qualidade

### **Métricas Alvo**

- **Performance Score**: > 90
- **SEO Score**: > 95
- **Accessibility Score**: > 95
- **Best Practices Score**: > 90
- **Console Errors**: 0
- **Network Errors**: 0

### **Padrões de Qualidade**

- **WCAG 2.1 AA Compliance**: Obrigatório
- **Core Web Vitals**: Otimizado
- **Mobile-First**: Validado
- **Cross-Browser**: Testado
- **Performance**: Monitorado

---

**🧠 Lembre-se**: O BrowserTools é uma ferramenta poderosa que deve ser usada
sistematicamente para garantir a mais alta qualidade da aplicação GB-Locações.
