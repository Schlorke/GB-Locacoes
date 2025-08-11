# 🔱 Cursor IDE - Configuração de Debug com DevTools

## 📋 Visão Geral

Este documento explica como configurar o ambiente no Cursor IDE para permitir
inspeção de elementos e navegação direta para o código, usando o Microsoft Edge
DevTools embutido.

## 🚀 Configuração Automática

### 1. Extensões Necessárias

A extensão **Microsoft Edge Tools for VS Code**
(`ms-edgedevtools.vscode-edge-devtools`) já está configurada nas recomendações
do workspace.

### 2. Configurações de Debug

O arquivo `.vscode/launch.json` já está configurado com três opções:

- **Next.js** (porta 3000)
- **Vite** (porta 5173)
- **Storybook** (porta 6006)

## 🎯 Como Usar

### Passo 1: Iniciar o Servidor de Desenvolvimento

```bash
# Para Next.js (padrão)
pnpm dev

# Para Storybook
pnpm storybook
```

### Passo 2: Iniciar Sessão de Debug

1. Abrir a aba **Run and Debug** (`Ctrl+Shift+D`)
2. Selecionar a configuração desejada:
   - `Debug App + DevTools (Edge) — Next.js`
   - `Debug App + DevTools (Edge) — Vite`
   - `Debug App + DevTools (Edge) — Storybook`
3. Clicar no botão ▶️ **Start Debugging**

### Passo 3: Inspecionar Elementos

1. O navegador Edge será aberto automaticamente com DevTools
2. Ativar o seletor de elementos (`Ctrl+Shift+C`)
3. Clicar no elemento desejado na página
4. No painel **Elements**, clicar no link `arquivo:linha`
5. O Cursor abrirá automaticamente o arquivo na linha exata

## 🔧 Funcionalidades Disponíveis

### DevTools Completos

- **Elements**: Inspeção de DOM e navegação para código
- **Console**: Logs e debugging
- **Network**: Requisições e performance
- **Performance**: Análise de performance
- **Application**: Storage, cache, etc.

### Navegação Inteligente

- Clique no elemento → vai direto para o código
- Source maps configurados automaticamente
- Suporte a TypeScript e JSX
- Hot reload durante debug

## 🚨 Solução de Problemas

### Erro: "Cannot read properties of undefined (reading 'fsPath')"

**Causa**: Workspace não está aberto como confiável ou não é um workspace
válido.

**Solução**:

1. Fechar o Cursor
2. Abrir o projeto como workspace (não arquivo isolado)
3. Clicar em "Trust this workspace" se solicitado
4. Tentar novamente

### DevTools não abre

**Solução**:

1. Verificar se a extensão está instalada
2. Reiniciar o Cursor
3. Verificar se o servidor está rodando na porta correta

### Source maps não funcionam

**Solução**:

1. Verificar se `sourceMaps: true` está no launch.json
2. Verificar se o projeto está buildando com source maps
3. Para Next.js, verificar se não está em modo produção

## 🎨 Casos de Uso

### Desenvolvimento Frontend

- Inspecionar componentes React
- Debug de estilos CSS
- Análise de performance
- Teste de responsividade

### Debug de Componentes

- Localizar código de componentes específicos
- Verificar props e estado
- Analisar re-renders
- Debug de eventos

### Otimização

- Identificar componentes lentos
- Analisar bundle size
- Verificar lazy loading
- Monitorar Core Web Vitals

## 📱 Atalhos Úteis

- **F12**: Abrir DevTools
- **Ctrl+Shift+C**: Ativar seletor de elementos
- **Ctrl+Shift+I**: Inspecionar elemento
- **Ctrl+Shift+J**: Abrir Console
- **Ctrl+Shift+M**: Toggle device toolbar

## 🔄 Configurações Avançadas

### Personalizar Runtime Args

No `launch.json`, você pode adicionar argumentos personalizados:

```json
"runtimeArgs": [
  "--disable-web-security",
  "--disable-features=VizDisplayCompositor",
  "--auto-open-devtools-for-tabs"
]
```

### Configurar Portas Personalizadas

Se seu projeto usa portas diferentes, edite o `launch.json`:

```json
{
  "name": "Debug App + DevTools (Edge) — Custom Port",
  "url": "http://localhost:4000",
  "webRoot": "${workspaceFolder}"
}
```

## 📚 Recursos Adicionais

- [Microsoft Edge DevTools Documentation](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [Next.js Debugging](https://nextjs.org/docs/advanced-features/debugging)

---

**Nota**: Esta configuração funciona perfeitamente com projetos Next.js, React,
e qualquer aplicação web moderna. O DevTools embutido oferece a mesma
experiência que o navegador, mas com integração direta ao editor.
