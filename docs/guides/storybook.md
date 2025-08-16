# 📚 Storybook GB-Locações

Documentação completa dos componentes do projeto GB-Locações usando Storybook.

## 🎯 **Status Atual**

- **Storybook**: ✅ Funcionando localmente
- **Chromatic**: ✅ Configurado para visual regression testing
- **Build**: ✅ Funcionando
- **Testes**: ✅ Integração com Vitest

## 🔗 **Links Importantes**

- **Chromatic Dashboard**:
  [Visual regression testing](https://www.chromatic.com/)
- **Storybook Local**: `http://localhost:6006`
- **Design System**:
  [`docs/features/design-system.md`](../features/design-system.md)

## 🚀 Início Rápido

```bash
# Instalar dependências
pnpm install

# Iniciar Storybook
pnpm storybook

# Build para produção
pnpm build-storybook

# Testes de acessibilidade
pnpm test-storybook
```

## 📁 Estrutura de Pastas

```
stories/
├── foundations/          # Design tokens e fundamentos
│   └── DesignTokens.stories.tsx
├── atoms/               # Componentes atômicos (UI)
│   ├── Button.stories.tsx
│   ├── Input.stories.tsx
│   ├── Badge.stories.tsx
│   └── ...
├── molecules/           # Componentes moleculares
├── organisms/           # Componentes organizacionais
│   ├── Header.stories.tsx
│   ├── Footer.stories.tsx
│   ├── EquipmentCard.stories.tsx
│   └── ...
├── admin/               # Componentes administrativos
│   ├── AdminFilterCard.stories.tsx
│   ├── AdminSidebar.stories.tsx
│   └── ...
└── templates/           # Templates de páginas
```

## 🎨 Categorias de Componentes

### Foundations

- **Design Tokens**: Cores, tipografia, espaçamentos, sombras
- **Paleta de Cores**: Cores primárias e de status
- **Tipografia**: Hierarquia de textos
- **Espaçamentos**: Sistema de espaçamento

### Atoms (Componentes UI)

- **Button**: Botões com múltiplas variantes
- **Input**: Campos de entrada
- **Badge**: Indicadores de status
- **Card**: Containers de conteúdo
- **Dialog**: Modais e overlays
- **Form**: Componentes de formulário
- **Navigation**: Menus e navegação

### Organisms

- **Header**: Cabeçalho principal
- **Footer**: Rodapé do site
- **EquipmentCard**: Card de equipamento
- **ContactForm**: Formulário de contato
- **Hero**: Seção hero da página inicial

### Admin

- **AdminFilterCard**: Filtros administrativos
- **AdminSidebar**: Sidebar do painel admin
- **AdminHeader**: Cabeçalho administrativo

## 🔧 Configuração

### Arquivos de Configuração

- `.storybook/main.ts`: Configuração principal
- `.storybook/preview.ts`: Configuração global e decorators
- `.storybook/vitest.setup.ts`: Setup para testes

### Addons Instalados

- `@storybook/addon-docs`: Documentação automática
- `@storybook/addon-a11y`: Testes de acessibilidade
- `@storybook/addon-vitest`: Integração com Vitest
- `@storybook/test-runner`: Testes automatizados

## 📝 Padrões de Stories

### Estrutura Básica

```tsx
import type { Meta, StoryObj } from "@storybook/react"
import { ComponentName } from "@/components/ui/component-name"

const meta: Meta<typeof ComponentName> = {
  title: "Category/ComponentName",
  component: ComponentName,
  argTypes: {
    // Controles para props
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Descrição do componente"
      }
    }
  },
  tags: ["autodocs"]
}

export default meta

export const Default: StoryObj<typeof ComponentName> = {
  args: {
    // Props padrão
  }
}
```

### Estados Obrigatórios

Cada componente deve ter stories para:

- ✅ Estado padrão
- ✅ Estados variantes
- ✅ Estado desabilitado
- ✅ Estado de erro
- ✅ Estado de loading
- ✅ Edge cases (texto longo, etc.)

## 🧪 Testes

### Testes de Acessibilidade

```bash
# Executar testes de acessibilidade
pnpm test-storybook --test-runner

# Verificar acessibilidade no Storybook
# Usar o addon a11y no painel lateral
```

### Testes Visuais

```bash
# Snapshots visuais
pnpm test-storybook --test-runner --reporter=html
```

## 🎯 Critérios de Qualidade

### ✅ Checklist de Stories

- [ ] Componente renderiza corretamente
- [ ] Todos os estados documentados
- [ ] Props documentadas com argTypes
- [ ] Exemplos de uso realistas
- [ ] Testes de acessibilidade passando
- [ ] Responsividade testada
- [ ] Documentação clara e completa

### 🚨 Problemas Comuns

1. **Import não encontrado**: Verificar path do componente
2. **Estilos não aplicados**: Verificar import do globals.css
3. **Props não funcionando**: Verificar argTypes
4. **Acessibilidade falhando**: Corrigir contrastes e semântica

## 🔄 Workflow de Desenvolvimento

### 1. Criar Novo Componente

```bash
# Gerar story automaticamente
node scripts/generate-stories.cjs
```

### 2. Desenvolver Story

1. Abrir Storybook: `pnpm storybook`
2. Navegar para o componente
3. Testar diferentes estados
4. Verificar acessibilidade
5. Documentar props e uso

### 3. Commit e Deploy

```bash
# Testar antes do commit
pnpm test-storybook

# Build para produção
pnpm build-storybook
```

## 📊 Métricas de Qualidade

- **Cobertura de Componentes**: 100% dos componentes documentados
- **Testes de Acessibilidade**: 0 violações críticas
- **Performance**: Build < 30s
- **Documentação**: 100% dos props documentados

## 🆘 Troubleshooting

### Storybook não inicia

```bash
# Limpar cache
rm -rf node_modules/.cache
pnpm storybook
```

### Componentes não aparecem

1. Verificar se o arquivo .stories.tsx existe
2. Verificar imports no main.ts
3. Verificar se o componente existe

### Estilos não aplicados

1. Verificar import do globals.css no preview.ts
2. Verificar configuração do Tailwind
3. Verificar se o ThemeProvider está configurado

## 🔍 **Chromatic - Visual Regression Testing**

### **Configuração Atual**

- **Status**: ✅ Configurado e funcionando
- **Token**: Configurado no package.json
- **CI/CD**: Integrado com GitHub Actions
- **Dashboard**: [Chromatic.com](https://www.chromatic.com/)

### **Scripts Disponíveis**

```bash
# Publicar no Chromatic
pnpm chromatic

# Teste sem falhar em mudanças
pnpm chromatic:test

# Aceitar mudanças automaticamente
pnpm chromatic:accept

# Integração CI/CD
pnpm ci:chromatic
```

### **Workflow de Visual Testing**

1. **Desenvolvimento**: `pnpm storybook` para desenvolvimento local
2. **Commit**: Push para branch (PR ou main)
3. **Chromatic**: Executa automaticamente via GitHub Actions
4. **Review**: Visualiza mudanças no dashboard Chromatic
5. **Aprovação**: Aceita ou rejeita mudanças visuais

### **Configuração CI/CD**

```yaml
# .github/workflows/chromatic.yml
- name: Publish to Chromatic
  uses: chromaui/action@latest
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
    storybookBuildDir: storybook-static
```

### **Benefícios**

- **🔍 Detecção Automática**: Mudanças visuais são detectadas automaticamente
- **📱 Multi-dispositivo**: Testa em diferentes resoluções
- **🎨 Design System**: Mantém consistência visual
- **🚀 CI/CD**: Integração automática com pipeline de desenvolvimento

## 📚 Recursos Adicionais

- [Documentação do Storybook](https://storybook.js.org/)
- [Guia de Acessibilidade](https://storybook.js.org/docs/essentials/accessibility/)
- [Testes Automatizados](https://storybook.js.org/docs/writing-tests/test-runner/)
- [Design System](https://storybook.js.org/docs/essentials/design-systems/)
- [Chromatic Documentation](https://www.chromatic.com/docs/)

---

**Última atualização**: 15/01/2025 **Versão do Storybook**: 9.1.1  
**Status**: ✅ Funcionando | **Chromatic**: ✅ Configurado
