# 🐛 Problemas Conhecidos e Soluções - GB Locações

> **Documento de Referência**: Problemas técnicos já enfrentados e resolvidos no
> projeto. Consulte este arquivo antes de investigar bugs similares.

---

## 33. Linhas da timeline nao preenchiam a altura do bloco

### ? Problema RESOLVIDO

**Data da Ocorrencia**: 2025-12-20 **Severidade**: Baixa (UI) **Status**: ?
Resolvido

#### Descricao

Na visao Timeline (Equipamentos) do calendario avancado, quando havia poucos
recursos, as linhas ficavam com altura fixa (60px) e sobrava espaco vazio no
bloco. O objetivo era fazer as linhas ocuparem 100% da altura disponivel.

#### Sintomas

- Com poucos recursos, a area abaixo das linhas ficava vazia
- As linhas nao esticavam para preencher o container

#### Causa Raiz

- As swimlanes e a lista de recursos usavam `height` fixo com
  `TIMELINE_ROW_HEIGHT`
- O container nao distribuia o espaco livre entre as linhas

### ? Solucao Implementada

- Linhas passaram a ser distribuidas por CSS Grid com `minmax(60px, 1fr)`,
  permitindo expandir quando ha espaco livre
- Grid usa o mesmo template de linhas na lista e nas swimlanes para manter
  alinhamento e scroll quando necessario

#### Arquivos Modificados

1. `components/admin/advanced-calendar/timeline-view.tsx`

#### Como Validar

1. Abrir a visao "Equipamentos" do calendario avancado com poucos recursos
2. Confirmar que as linhas preenchem toda a altura do bloco, sem area vazia
3. Adicionar mais recursos e verificar que o scroll continua funcionando

#### Armadilhas a Evitar

- Voltar a usar `height` fixo nas linhas, impedindo o preenchimento do container
- Remover o template `minmax(60px, 1fr)` e perder a distribuicao de altura

## 32. Altura inconsistente no cabecalho da timeline (Equipamentos)

### ? Problema RESOLVIDO

**Data da Ocorrencia**: 2025-12-19 **Severidade**: Baixa (UI) **Status**: ?
Resolvido

#### Descricao

Na visao Timeline (Equipamentos) do calendario avancado, a linha do cabecalho de
dias tinha altura diferente das linhas de recursos, e a ultima linha parecia
mais alta por falta de separacao visual. Alem disso, havia uma linha residual
fina no fim da lista e um pequeno espaco no rodape (altura da barra horizontal).

#### Sintomas

- Cabecalho (SEG/TER/...) com altura diferente das linhas de recursos
- Ultima linha aparenta ficar maior por falta de borda inferior
- Linha residual fina no fim da lista
- Espaco pequeno (~7px) abaixo da ultima linha

#### Causa Raiz

- Cabecalho com altura fixa de 48px enquanto as linhas usam 60px
- Borda final sem controle consistente, causando percepcao de espaco extra ou
  linha residual no fim
- `overflow-x-auto` no grid reservava altura para scrollbar horizontal

### ? Solucao Implementada

- Padronizada a altura do cabecalho e das linhas com a mesma constante
- Borda inferior aplicada nas linhas com `last:border-b-0` para evitar linha
  residual no fim
- Grid da timeline agora usa `overflow-x-hidden` para evitar a reserva de altura
  no rodape

#### Arquivos Modificados

1. `components/admin/advanced-calendar/timeline-view.tsx`

#### Como Validar

1. Abrir a visao "Equipamentos" do calendario avancado
2. Confirmar que a linha do cabecalho tem a mesma altura das linhas
3. Verificar que a ultima linha nao aparenta altura extra e nao ha espaco no
   rodape

#### Armadilhas a Evitar

- Alterar altura do cabecalho sem ajustar a altura das linhas
- Remover `last:border-b-0` e reintroduzir a linha residual no fim
- Reintroduzir `overflow-x-auto` no grid e voltar o espaco extra no rodape

## 31. Equipamento bloqueado incorretamente por manutenção agendada

### ✅ Problema RESOLVIDO

**Data da Ocorrencia**: 2025-01-XX **Severidade**: 🔴 CRÍTICA (Bloqueava criação
de orçamentos) **Status**: ✅ Resolvido

#### Descricao

Ao tentar criar um orçamento, o sistema retornava erro "Equipamento
indisponível: Equipamento está em manutenção" mesmo quando a manutenção estava
agendada para uma data futura que não interferia com o período de locação
solicitado.

#### Sintomas

- ❌ Erro ao criar orçamento: "Equipamento indisponível: Equipamento está em
  manutenção"
- ❌ Equipamentos bloqueados mesmo quando manutenção não interfere com período
  de locação
- ❌ Manutenções agendadas para o futuro bloqueavam locações no presente

#### Causa Raiz

A função `isEquipmentInMaintenance` verificava apenas se havia manutenção com
status `SCHEDULED` ou `IN_PROGRESS`, sem considerar se a manutenção realmente
interferia com o período de locação solicitado. Isso fazia com que qualquer
manutenção agendada bloqueasse o equipamento completamente, mesmo para locações
que aconteciam antes da manutenção.

**Código Problemático:**

```typescript
// lib/maintenance-automation.ts - ANTES
export async function isEquipmentInMaintenance(
  equipmentId: string
): Promise<boolean> {
  const activeMaintenance = await prisma.maintenance.findFirst({
    where: {
      equipmentId,
      status: {
        in: ["SCHEDULED", "IN_PROGRESS"]
      }
    }
  })

  return !!activeMaintenance // ❌ Bloqueava sempre, sem verificar período
}
```

### ✅ Solucao Implementada

#### 1. Modificada função para aceitar período de locação

```typescript
// lib/maintenance-automation.ts - DEPOIS
export async function isEquipmentInMaintenance(
  equipmentId: string,
  rentalStartDate?: Date,
  rentalEndDate?: Date
): Promise<boolean> {
  // Se não há período especificado, verifica se há manutenção ativa
  if (!rentalStartDate || !rentalEndDate) {
    const activeMaintenance = await prisma.maintenance.findFirst({
      where: {
        equipmentId,
        status: {
          in: ["SCHEDULED", "IN_PROGRESS"]
        }
      }
    })
    return !!activeMaintenance
  }

  // Manutenções em progresso sempre bloqueiam
  const inProgressMaintenance = await prisma.maintenance.findFirst({
    where: {
      equipmentId,
      status: "IN_PROGRESS"
    }
  })

  if (inProgressMaintenance) {
    return true
  }

  // Manutenções agendadas só bloqueiam se interferem com o período
  const conflictingMaintenance = await prisma.maintenance.findFirst({
    where: {
      equipmentId,
      status: "SCHEDULED",
      scheduledAt: {
        gte: rentalStartDate,
        lte: rentalEndDate
      }
    }
  })

  return !!conflictingMaintenance
}
```

#### 2. Atualizada chamada em `equipment-availability.ts`

```typescript
// lib/equipment-availability.ts
const inMaintenance = await isEquipmentInMaintenance(
  equipmentId,
  startDate, // ✅ Passa período de locação
  endDate
)
```

#### Arquivos Modificados

1. `lib/maintenance-automation.ts` - Lógica de verificação de conflito
2. `lib/equipment-availability.ts` - Passa período para verificação

#### Como Funciona Agora

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Cliente solicita orçamento para período 10/01 - 20/01  │
│ 2. Sistema verifica manutenções                           │
│ 3. Se manutenção IN_PROGRESS → Bloqueia sempre            │
│ 4. Se manutenção SCHEDULED para 15/01 → Bloqueia (dentro) │
│ 5. Se manutenção SCHEDULED para 25/01 → NÃO bloqueia      │
│ 6. Orçamento criado com sucesso ✅                         │
└─────────────────────────────────────────────────────────────┘
```

#### Como Validar

```bash
# 1. Criar manutenção agendada para data futura
# 2. Tentar criar orçamento para período anterior
# 3. Deve funcionar normalmente (não bloquear)

# 4. Criar orçamento para período que inclui data da manutenção
# 5. Deve bloquear corretamente
```

#### Armadilhas a Evitar

- ❌ **NUNCA** bloquear equipamento apenas por ter manutenção agendada sem
  verificar período
- ❌ **NUNCA** ignorar o período de locação na verificação de disponibilidade
- ✅ **SEMPRE** verificar se a data da manutenção interfere com o período
  solicitado
- ✅ **SEMPRE** bloquear se manutenção está `IN_PROGRESS` (em andamento)

#### Lições Aprendidas

1. **Verificações de disponibilidade devem considerar período**: Não basta
   verificar se há manutenção, é preciso verificar se interfere
2. **Manutenções em progresso sempre bloqueiam**: Diferente de manutenções
   agendadas
3. **Manutenções agendadas são condicionais**: Só bloqueiam se interferem com o
   período
4. **Sempre passar contexto completo**: Funções de verificação devem receber
   todas as informações necessárias

---

## 30. Prisma 7.1.0 - Erro "datasource property url is no longer supported"

### ✅ Problema RESOLVIDO

**Data da Ocorrencia**: 2025-01-XX **Severidade**: 🔴 CRÍTICA (Build quebrado)
**Status**: ✅ Resolvido

#### Descricao

O build estava falhando com erro do Prisma 7.1.0:

```bash
Error: Prisma schema validation - (get-config wasm)
Error code: P1012
error: The datasource property `url` is no longer supported in schema files.
error: The datasource property `directUrl` is no longer supported in schema files.
```

#### Causa Raiz

No Prisma 7, as propriedades `url` e `directUrl` **não podem mais estar no
`schema.prisma`**. Elas devem estar **apenas no `prisma.config.ts`**.

**Código Problemático:**

```prisma
// prisma/schema.prisma - ❌ ERRADO no Prisma 7
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### ✅ Solucao Implementada

#### 1. Removido do schema.prisma

```prisma
// prisma/schema.prisma - ✅ CORRETO no Prisma 7
datasource db {
  provider = "postgresql"
}
```

#### 2. Configurado no prisma.config.ts

```typescript
// prisma.config.ts - ✅ CORRETO no Prisma 7
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL")
    // directUrl não é suportado no datasource do prisma.config.ts
    // DIRECT_URL é usado automaticamente via variável de ambiente para migrations
  }
})
```

**Nota Importante**: No Prisma 7.1.0, `directUrl` **não é suportado** no
`datasource` do `prisma.config.ts`. O Prisma usa automaticamente a variável de
ambiente `DIRECT_URL` quando necessário para migrations. O Prisma Client usa
apenas `DATABASE_URL` via adapter.

#### Arquivos Modificados

1. `prisma/schema.prisma` - Removidas propriedades `url` e `directUrl`
2. `prisma.config.ts` - Adicionado `directUrl` na configuração

#### Como Validar

```bash
# Verificar se Prisma generate funciona
pnpm db:generate
# Deve completar sem erros

# Verificar build completo
pnpm build
# Deve completar com sucesso
```

#### Armadilhas a Evitar

- **NUNCA** adicionar `url` ou `directUrl` no `schema.prisma` no Prisma 7
- **SEMPRE** configurar URLs no `prisma.config.ts`
- **SEMPRE** manter apenas `provider` no datasource do schema

#### Referências

- [Prisma 7 Migration Guide](https://www.prisma.io/docs/orm/more/upgrade-guide/upgrading-versions/upgrading-to-prisma-7)
- [Prisma Config Documentation](https://www.prisma.io/docs/orm/reference/prisma-config-reference)

---

## 29. Deploy na Vercel falhando com "pnpm install" exited with 1

### ✅ Problema RESOLVIDO

**Data da Ocorrencia**: 2025-01-XX **Severidade**: 🔴 CRÍTICA (Bloqueava deploy)
**Status**: ✅ Resolvido

#### Descricao

O deploy na Vercel estava falhando durante a etapa de instalação de dependências
com o erro:

```bash
Error: Command "pnpm install" exited with 1
ELIFECYCLE Command failed with exit code 1.
```

O problema ocorria porque o script `postinstall` executava `prisma generate`
durante o `pnpm install`, mas na Vercel:

1. As variáveis de ambiente (como `DATABASE_URL`) podem não estar disponíveis
   durante o install
2. O Prisma precisa compilar binários nativos que podem falhar no ambiente de
   build
3. O script falhava e quebrava todo o processo de instalação

#### Causa Raiz

O `postinstall` estava configurado para executar `prisma generate`
incondicionalmente:

```json
{
  "scripts": {
    "postinstall": "prisma generate && node scripts/post-prisma-generate.js"
  }
}
```

Isso causava falha quando:

- `DATABASE_URL` não estava disponível durante o install
- O ambiente de build da Vercel não conseguia compilar os binários do Prisma
- O script não tinha tratamento de erros adequado

### ✅ Solucao Implementada

#### 1. Script Seguro de Postinstall

Criado `scripts/safe-postinstall.js` que:

- **Detecta ambiente CI/Vercel** e verifica se `DATABASE_URL` está disponível
- **Pula Prisma generate** se estiver em CI sem `DATABASE_URL` (o `prebuild`
  fará isso)
- **Não falha o build** se Prisma generate der erro (sai com código 0)
- **Mantém funcionalidade** em desenvolvimento local

#### 2. Package.json Atualizado

```json
{
  "scripts": {
    "postinstall": "node scripts/safe-postinstall.js || true",
    "prebuild": "prisma generate && node scripts/post-prisma-generate.js"
  }
}
```

#### Arquivos Modificados

1. `package.json` - Script `postinstall` atualizado para usar script seguro
2. `scripts/safe-postinstall.js` - Novo script com lógica robusta

#### Como Funciona

```
┌─────────────────────────────────────────────────────────────┐
│ 1. pnpm install na Vercel                                   │
│ 2. postinstall executa safe-postinstall.js                 │
│ 3. Script detecta: VERCEL=1 e DATABASE_URL não disponível  │
│ 4. Script pula Prisma generate (exit 0)                    │
│ 5. Install completa com sucesso ✅                          │
│ 6. Durante build: prebuild executa Prisma generate         │
│ 7. Build completa com sucesso ✅                            │
└─────────────────────────────────────────────────────────────┘
```

#### Como Validar

```bash
# Testar localmente (deve funcionar normalmente)
pnpm install
# Deve executar Prisma generate normalmente

# Simular ambiente Vercel
VERCEL=1 pnpm install
# Deve pular Prisma generate mas não falhar

# Verificar build
pnpm build
# Deve executar Prisma generate no prebuild e completar com sucesso
```

#### Armadilhas a Evitar

- **NUNCA** fazer `postinstall` falhar o build - sempre usar `|| true` ou script
  seguro
- **NUNCA** assumir que variáveis de ambiente estarão disponíveis durante
  install
- **SEMPRE** garantir que `prebuild` execute Prisma generate (já está
  configurado)
- **NAO** remover o `|| true` do postinstall sem testar em ambiente CI

#### Lições Aprendidas

1. **Postinstall não deve ser crítico** - Use para otimizações, não para
   dependências do build
2. **CI tem limitações** - Variáveis de ambiente podem não estar disponíveis
   durante install
3. **Prebuild é o lugar certo** - Para comandos críticos que precisam rodar
   antes do build
4. **Scripts devem ser resilientes** - Sempre tratar erros e não quebrar o
   processo pai

---

## 28. Build falhando com erro 3221226505 no postbuild (patch-prisma.js)

### ✅ Problema RESOLVIDO

**Data da Ocorrencia**: 2025-01-XX **Severidade**: Alta (Build quebrado)
**Status**: ✅ Resolvido

#### Descricao

O build do projeto estava falhando na etapa `postbuild` com o código de erro
`3221226505`:

```bash
> gb-locacoes@0.1.0 postbuild C:\Projetos\GB Locações
> node scripts/patch-prisma.js

ELIFECYCLE  Command failed with exit code 3221226505.
```

#### Causa Raiz

O código de erro `3221226505` no Windows indica um problema de execução ou
acesso de arquivos. O script `patch-prisma.js` estava usando `fs.cpSync()` que
pode falhar silenciosamente no Windows quando:

1. Há arquivos bloqueados ou em uso
2. Caminhos muito longos (problema comum no Windows)
3. Problemas de permissões
4. O método `fs.cpSync` não lida bem com erros individuais durante a cópia

#### Solucao Implementada

O script foi refatorado para:

1. **Encontrar o caminho correto do Prisma Client** - compatível com npm, yarn e
   pnpm
2. **Usar função `copyDirectory` customizada** - trata erros individuais de
   arquivos
3. **Melhor tratamento de erros** - não falha o build, apenas registra warnings
4. **Logging detalhado** - mostra caminhos sendo copiados para debug
5. **Verificacoes de seguranca** - verifica se diretorios existem antes de
   copiar

#### Arquivos Modificados

1. `scripts/patch-prisma.js` - Refatorado completamente com copia recursiva
   robusta

#### Como Validar

```bash
# Testar o script isoladamente (modo silencioso - apenas erros)
node scripts/patch-prisma.js
# Não deve mostrar nada se tudo estiver OK

# Testar em modo verbose para debug
PATCH_PRISMA_VERBOSE=true node scripts/patch-prisma.js
# Deve mostrar:
# [patch-prisma] Copying from: C:\Projetos\GB Locações\node_modules\.prisma\client
# [patch-prisma] Copying to: C:\Projetos\GB Locações\.next\server\.prisma\client
# [patch-prisma] ✅ Prisma engines copied to .next/server/

# Testar build completo
pnpm build

# Deve completar sem erros no postbuild (silencioso)
```

#### Modo Silencioso (Padrão)

Por padrão, o script roda em modo silencioso e só mostra:

- ⚠️ Warnings quando há problemas (arquivos não copiados, diretórios não
  encontrados)
- ❌ Erros quando algo falha

Para ver logs detalhados durante debug, use:

```bash
PATCH_PRISMA_VERBOSE=true pnpm build
```

#### Armadilhas a Evitar

- **NUNCA** usar `fs.cpSync` diretamente sem tratamento de erros individuais
- **SEMPRE** verificar se diretorios existem antes de copiar
- **SEMPRE** usar `process.exit(0)` no final para nao quebrar o build
- **NAO** assumir que o caminho do Prisma Client é sempre
  `node_modules/.prisma/client` (pnpm usa estrutura diferente)

---

## 27. Select de frete travava scroll e criava barra branca (Orcamento)

### ✅ Problema RESOLVIDO

**Data da Ocorrencia**: 2025-12-18 **Severidade**: Alta (UX crítico) **Status**:
✅ Resolvido

#### Descricao

Ao abrir o dropdown de opcoes de frete em `/orcamento`:

- **Barra branca invisivel** aparecia na lateral direita, empurrando todo o
  conteudo para a esquerda
- **Scroll vertical bloqueado** - impossivel rolar a pagina enquanto o select
  estava aberto
- **Deformacao visual** - pagina de orcamentos ficava desalinhada

#### Causa Raiz

O Radix Select com `modal={false}` ainda acionava o `RemoveScroll` que:

1. Adicionava `data-scroll-locked="1"` ao body
2. Criava um wrapper `[data-radix-scroll-lock-wrapper]` que gerava a barra
   branca
3. Aplicava `margin-right: 10px !important` via variavel CSS
   `--removed-body-scroll-bar-size`
4. Bloqueava interacoes com `pointer-events: none`

### ✅ Solucao Implementada

#### 1. CSS com alta especificidade (`app/globals.css`)

- Seletor `body.min-h-screen.bg-background[data-scroll-locked]` para maior
  especificidade
- Forca `--removed-body-scroll-bar-size: 0 !important` (variavel que controla o
  margin-right)
- Zera todos os margins e paddings com `!important`
- Define wrapper como `display: contents !important` para tornar transparente

#### 2. JavaScript com `setProperty` + `!important` (`components/ui/select.tsx`)

- Remove wrapper de scroll lock completamente (move filhos de volta ao body)
- Remove `data-scroll-locked` do body
- Usa `setProperty(prop, value, 'important')` para sobrescrever estilos inline
  do Radix
- Executa a cada 10ms enquanto o select esta aberto (necessario para
  sobrescrever continuamente)

#### Arquivos Modificados

1. `components/ui/select.tsx` - Logica de remocao de scroll lock (refatorado e
   limpo)
2. `app/globals.css` - Regras CSS preventivas (consolidadas)

#### Como Validar

1. `pnpm dev`
2. Acessar `/orcamento` e preencher CEP para mostrar opcoes de frete
3. Abrir o select de opcoes de frete
4. **Verificar**:
   - ✅ Nao aparece barra branca na lateral direita
   - ✅ Scroll vertical funciona normalmente
   - ✅ Conteudo nao desloca para a esquerda
   - ✅ DevTools mostra `margin-right: 0` no body (nao `10px`)

#### Armadilhas a Evitar

- **NUNCA** remover a variavel `--removed-body-scroll-bar-size: 0` do CSS - esta
  e a chave para impedir o margin-right
- **NUNCA** remover o intervalo de 10ms do JavaScript - necessario para
  sobrescrever o Radix continuamente
- **SEMPRE** usar `modal={false}` em selects publicos
- **NAO** remover o `setProperty` com `'important'` - CSS normal nao sobrescreve
  os estilos inline do Radix

---

## 26. Hover do botao "Ver Detalhes" sem escala (Admin Orcamentos)

### 🤔 Problema

**Data da Ocorrencia**: 2025-12-17 **Severidade**: Baixa (UX) **Status**: ✅
Resolvido

#### Descricao

- O botao "Ver Detalhes" na visao Tabela de `/admin/orcamentos` e nos cards
  admin nao aplicava escala suave no hover e mantinha fundo acinzentado.
- O efeito de `hover:scale-105` configurado no componente era sobrescrito,
  deixando a interacao sem feedback visual.

#### Causa Raiz

- Regras globais em `app/globals.css` para
  `.admin-action-button.view-button:hover` usavam `transform: none` e
  `background-color: rgb(241 245 249)` com `!important`, anulando as classes do
  Tailwind definidas no botao.

### ✅ Solucao Implementada

- Ajustado o hover global para usar fundo branco e permitir transform,
  garantindo que `hover:scale-105` e `transition-all` aplicados no componente
  funcionem com animacao suave.

#### Arquivos Modificados

1. `app/globals.css`

#### Como Validar

1. `pnpm dev`
2. Acessar `/admin/orcamentos` em modo **Tabela** e `/admin/categorias`.
3. Passar o mouse sobre qualquer botao "Ver Detalhes":
   - Fundo fica branco.
   - Escala 1.05 ocorre com transicao suave.

#### Armadilhas a Evitar

- Nao reintroduzir `transform: none` ou fundo cinza nas regras de hover dos
  botoes de acao.
- Evitar `!important` que sobrescreva utilitarios `hover:scale-*` ou
  `hover:bg-*` aplicados diretamente nos componentes.

## 25. Botões Aprovar/Rejeitar mostravam loading simultâneo (Admin Orçamentos)

### 🔴 Problema

**Data da Ocorrência**: 2025-12-17 **Severidade**: Baixa (UX confusa)
**Status**: ✅ Resolvido

#### Descrição

Na página `/admin/orcamentos`, ao clicar em "Rejeitar Orçamento" ou "Aprovar
Orçamento", **ambos os botões** exibiam estado de loading simultaneamente
("Rejeitando..." e "Aprovando..."), causando confusão visual para o usuário.

#### Causa Raiz

- Ambos os botões usavam o mesmo estado `isUpdating` para controlar o texto de
  loading
- Quando `isUpdating` era `true`, ambos os botões mudavam para o texto de
  loading, independente de qual botão foi clicado

#### Código Problemático

```tsx
// Ambos usavam isUpdating para exibir loading
{
  isUpdating ? "Rejeitando..." : "Rejeitar Orçamento"
}
{
  isUpdating ? "Aprovando..." : "Aprovar Orçamento"
}
```

### ✅ Solução Implementada

- Adicionado novo estado `updatingAction` para rastrear qual ação está em
  andamento (`'approved' | 'rejected' | null`)
- Cada botão agora verifica se sua ação específica está em andamento antes de
  mostrar loading
- `isUpdating` continua sendo usado para desabilitar ambos os botões durante a
  operação

#### Código Corrigido

```tsx
const [updatingAction, setUpdatingAction] = useState<
  "approved" | "rejected" | null
>(null)

// Na função updateQuoteStatus:
setUpdatingAction(newStatus)
// No finally:
setUpdatingAction(null)

// Nos botões:
{
  updatingAction === "rejected" ? "Rejeitando..." : "Rejeitar Orçamento"
}
{
  updatingAction === "approved" ? "Aprovando..." : "Aprovar Orçamento"
}
```

#### Arquivos Modificados

1. `app/admin/orcamentos/page.tsx` - Linhas 160-161, 335-337, 365-366, 2019-2035

#### Como Validar

1. `pnpm dev`
2. Acessar `/admin/orcamentos`
3. Abrir um orçamento pendente
4. Clicar em "Rejeitar Orçamento" → Apenas esse botão deve mostrar
   "Rejeitando..."
5. Clicar em "Aprovar Orçamento" → Apenas esse botão deve mostrar "Aprovando..."
6. Ambos os botões devem ficar desabilitados durante a operação

#### Armadilhas a Evitar

- ❌ **NUNCA** use um único estado booleano para controlar loading de múltiplas
  ações distintas
- ❌ **NUNCA** assuma que o usuário entenderá qual ação está em andamento se
  todos os botões mudarem

#### Lições Aprendidas

- ✅ Para múltiplos botões de ação, use um estado que identifique QUAL ação está
  em andamento
- ✅ Mantenha um estado separado para desabilitar botões (`isUpdating`) e outro
  para identificar a ação (`updatingAction`)
- ✅ O padrão `'action1' | 'action2' | null` é mais expressivo que múltiplos
  booleanos

---

## 24. Dialog de exclusão de orçamento travava página (Admin)

### ?? Problema

**Data da Ocorrência**: 2025-12-17 **Severidade**: Alta (bloqueava fluxo admin)
**Status**: ? Resolvido

#### Descrição

Ao clicar em **"Excluir Permanentemente"** dentro do modal de detalhes de
orçamentos rejeitados em `/admin/orcamentos`, a confirmação não aparecia e toda
a interface ficava travada (nenhum clique respondia).

#### Causa Raiz

- Modal pai usa Base UI (`Dialog` com `z-[var(--layer-dialog)] = 90`)
- A confirmação era um `AlertDialog` com `z-50` renderizado fora do
  `Dialog.BodyContent`, ficando **atrás** do modal pai
- O focus trap do `AlertDialog` bloqueava interações mesmo sem exibir conteúdo

### ? Solução Implementada

- Migração das confirmações (exclusão, ajuste de valor e multa) para dialogs
  aninhadas Base UI dentro do `Dialog.BodyContent`, com
  `data-nested-parent={nestedDialogOpen ? "" : undefined}`
- Estados sincronizados para fechar dialogs filhas ao fechar o modal pai,
  evitando overlays órfãos
- `AlertDialog` atualizado para usar tokens de camada
  (`--layer-dialog-backdrop`/`--layer-dialog`) e evitar novos conflitos de
  z-index

#### Arquivos Modificados

1. `app/admin/orcamentos/page.tsx`
2. `components/ui/alert-dialog.tsx`

#### Como Validar

1. `pnpm dev`
2. Acessar `/admin/orcamentos`, abrir um orçamento **rejeitado** e clicar em
   "Excluir Permanentemente"
3. A confirmação deve aparecer acima do modal, permitir cancelar/confirmar e a
   página volta a responder ao fechar

#### Armadilhas a Evitar

- NÃO usar `AlertDialog` fora do `Dialog.BodyContent` quando o modal pai for
  Base UI
- Respeitar tokens de camada (`--layer-dialog*`) para overlays/modais

---

## 23. Deploy na Vercel falhando - Limite de Cron Jobs Excedido

### 🎯 Problema

**Data da Ocorrência**: Janeiro 2025 **Severidade**: 🔴 CRÍTICA (Bloqueava
deploy) **Status**: ✅ Resolvido

#### Descrição

O projeto estava configurado com **7 cron jobs** no `vercel.json`, mas o plano
**Hobby da Vercel permite apenas 2 cron jobs**. Isso causava falha silenciosa no
deploy, impedindo que o projeto fosse publicado em produção.

**Problemas Identificados:**

1. ❌ 7 cron jobs configurados (limite Hobby: 2)
2. ❌ buildCommand incorreto (não usava script completo do package.json)

### ✅ Solução Implementada

1. **Redução para 2 cron jobs** (compatível com plano Hobby):
   - `late-fees` - Multas por atraso (diário)
   - `expire-quotes` - Expirar orçamentos (diário)

2. **5 cron jobs movidos para comentário** (para upgrade futuro):
   - `verify-boleto-payments`, `boleto-overdue-alerts`, `auto-convert-quotes`,
     `preventive-maintenance`, `send-notifications`

3. **Correção do buildCommand**:
   - Alterado de `prisma generate && next build` para `pnpm run build`

#### Arquivos Modificados

1. `vercel.json` - Redução de cron jobs e correção de buildCommand
2. `docs/getting-started/troubleshooting.md` - Documentação adicionada

#### Documentação Completa

📄 **Relatório Completo**:
[`docs/issues/vercel-deploy-cron-jobs-limit.md`](./vercel-deploy-cron-jobs-limit.md)

#### Como Validar

```bash
# Verificar número de cron jobs ativos
cat vercel.json | grep -c '"path"' | head -1
# Deve retornar: 2 (para plano Hobby)

# Verificar buildCommand
cat vercel.json | grep buildCommand
# Deve mostrar: "buildCommand": "pnpm run build"
```

---

## 22. Dropdowns de filtros de Manutenções ficam atrás do calendário (Admin)

### 🎯 Problema

**Data da Ocorrência**: 2025-12-15 **Severidade**: Baixa (UX) **Status**: ✅
Resolvido

#### Descrição

Nos filtros da página `/admin/maintenance`, os dropdowns de tipo/status ficavam
atrás do card do calendário, dificultando a seleção de opções.

### ✅ Solução Implementada

- `CustomSelect` passou a renderizar o dropdown via portal com posicionamento
  `fixed` e camada `z-[var(--layer-popover)]`, evitando clipping por
  `overflow-hidden` dos cards.
- Reposicionamento acompanha scroll/resize para manter alinhamento ao trigger.

#### Arquivos Modificados

1. `components/ui/custom-select.tsx`

#### Como Validar

1. `pnpm dev`
2. Acessar `http://localhost:3000/admin/maintenance`
3. Alternar filtros de status/tipo com a visão **Calendário** ativada; o menu
   deve aparecer acima do calendário, sem ser coberto.

## 21. Direção da animação invertida na tabela de Orçamentos (Admin)

### 🎯 Problema

**Data da Ocorrência**: 2025-12-12 **Severidade**: Baixa (UX) **Status**: ✅
Resolvido

#### Descrição

No modo **Tabela** em `/admin/orcamentos`, as linhas entravam da direita para a
esquerda ao aplicar filtros, contrariando o fluxo esperado (entrada da esquerda
para a direita). O efeito ficava mais evidente em sequências rápidas de filtros.

#### Causa Raiz

- O offset horizontal não estava explícito para forçar entrada pela esquerda; em
  re-renderizações rápidas o slide parecia vir da direita.
- Ausência de easing dedicado na transição de saída aumentava a percepção de
  inversão de direção.

### ✅ Solução Implementada

- Entrada das linhas agora fixa `x: -32` com `easeOut`, garantindo percepção da
  esquerda para a direita.
- Saída usa deslocamento discreto para a direita (`x: 18`) com `easeIn`,
  evitando leitura de movimento invertido ao limpar a lista.

#### Arquivos Modificados

1. `app/admin/orcamentos/page.tsx`

### 🎯 Resultado

- Linhas entram consistentemente da esquerda para a direita ao aplicar qualquer
  filtro.
- Saída suave para a direita evita sensação de inversão durante a transição.

#### Como Validar

1. `pnpm dev`
2. Acessar `http://localhost:3000/admin/orcamentos` e alternar para **Tabela**.
3. Alterar filtros (status, valor, período) em sequência; verificar que as
   linhas entram da esquerda para a direita e saem apenas com leve deslocamento
   à direita.

## 20. Animação “bruta”/flash ao filtrar linhas na tabela e cards do Kanban (Admin)

### 🎯 Problema

**Data da Ocorrência**: 2025-12-12 **Severidade**: Média (UX) **Status**: ✅
Resolvido

#### Descrição

Ao aplicar filtros na tela de **Orçamentos** (`/admin/orcamentos`) em ambos os
modos (**Tabela** e **Kanban**), os itens removidos começavam a animar
corretamente (saindo), porém:

- Alguns itens “não sumiam 100%” por um frame
- A lista nova aparecia “de uma vez” e **sem animação de entrada**
- Itens que permaneciam entre filtros não reanimavam, quebrando a expectativa de
  “entrar um por um”
- Itens saíam de baixo para cima (invertido) em vez de cima para baixo

#### Causa Raiz

- Tanto a tabela quanto o Kanban renderizavam diretamente
  `filteredQuotes`/`items` dentro de `AnimatePresence`. Em mudanças rápidas de
  estado (select → close), o React atualizava o array no mesmo ciclo em que
  ocorria o exit de itens anteriores.
- `AnimatePresence` no modo padrão permite **enter/exit simultâneos** e, como os
  itens “persistentes” mantinham `key`, eles não remontavam — portanto **não
  executavam `initial`** novamente.
- O stagger de saída usava “reverse stagger” (`total - 1 - idx`), fazendo o
  último item sair primeiro.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `app/admin/orcamentos/page.tsx` (modo Tabela)
2. `components/admin/kanban-pipeline.tsx` (modo Kanban)

#### Implementação

**Tabela:**

- Introduzida uma lista intermediária `tableQuotes` (estado) para renderização
  da tabela.
- Ao mudar os filtros:
  1. salvamos a lista “alvo” em `pendingTableQuotesRef`
  2. definimos `tableQuotes = []` para disparar o **exit** das linhas atuais
  3. no `onExitComplete`, montamos `tableQuotes = pending`
- Ajustado `AnimatePresence` para `mode="wait"` (garante que a entrada só ocorre
  após a saída terminar).
- Implementado stagger determinístico (entrada e saída) via `variants` +
  `custom` com `index`.
- Saída agora usa stagger normal (de cima para baixo): `delay: idx * 0.04`.

**Kanban:**

- Introduzido estado intermediário `displayedItems` por coluna (uma por status).
- Cada coluna controla sua própria saída/entrada independentemente.
- Refs `pendingItemsRef` armazenam itens pendentes por coluna.
- `AnimatePresence` com `mode="wait"` e `onExitComplete` por coluna.
- Stagger normal (de cima para baixo) tanto na entrada quanto na saída.

### 🎯 Resultado

- Itens saem **um a um de cima para baixo** ao filtrar (tanto na tabela quanto
  no Kanban).
- Itens entram **um a um de cima para baixo** após a saída terminar.
- Sem flash e sem “aparecer bruto” após selecionar filtros.
- Cada coluna do Kanban anima independentemente.

#### Como Validar

**Tabela:**

1. `pnpm dev`
2. Acesse `http://localhost:3000/admin/orcamentos`
3. Alterne para a aba **Tabela**
4. Aplique/alterne filtros (ex.: **Valor** “Acima de R$ 2.000”)
5. Confirme:
   - saída escalonada de cima para baixo
   - após terminar a saída, entrada escalonada de cima para baixo
   - nenhum frame com “lista inteira aparecendo sem animação”

**Kanban:**

1. Acesse a aba **Kanban** na mesma página
2. Aplique/alterne filtros
3. Confirme:
   - cards saem um a um de cima para baixo em cada coluna
   - após terminar a saída, novos cards entram um a um de cima para baixo
   - cada coluna anima independentemente

### ⚠️ Armadilhas a Evitar

- Renderizar `filteredQuotes`/`items` diretamente quando a UX exigir “exit
  completo → enter completo” com stagger.
- Depender de `delay` por `index` sem controlar o lifecycle (pode gerar
  concorrência de enter/exit em updates rápidos).
- Usar “reverse stagger” (`total - 1 - idx`) na saída quando a expectativa é
  sair de cima para baixo — sempre usar stagger normal (`idx * delay`).

---

## 19. Erro "params are being enumerated" no Cursor DevTools

### 🎯 Problema

**Data da Ocorrência**: Janeiro 2025 **Severidade**: Baixa (Apenas aviso do
DevTools) **Status**: ✅ Conhecido - Não afeta funcionalidade

#### Descrição

Ao usar a ferramenta "Select Element" do Cursor IDE para inspecionar componentes
React em páginas dinâmicas do Next.js 16, aparece o erro:

```
params are being enumerated. `params` is a Promise and must be unwrapped with `React.use()` before accessing its properties.
```

#### Sintomas

- ⚠️ Erro aparece no console quando o Cursor tenta inspecionar componentes
- ⚠️ Ocorre especificamente ao clicar em "Select Element" no webview do Cursor
- ✅ **NÃO afeta a funcionalidade da aplicação**
- ✅ O código está correto e funcionando normalmente

#### Causa Raiz

No Next.js 16, `params` em Server Components e API Routes é uma `Promise` que
precisa ser desembrulhada com `await` antes de usar. Quando o Cursor IDE tenta
inspecionar um componente React, ele tenta serializar as props fazendo
`Object.keys(params)`, o que causa o erro porque está tentando enumerar uma
Promise.

**Isso é um problema conhecido do Next.js 16 com ferramentas de
desenvolvimento** que tentam serializar props que são Promises.

#### Onde Ocorre

- Páginas dinâmicas: `app/equipamentos/[id]/page.tsx`
- API Routes dinâmicas: `app/api/**/[id]/route.ts`
- Qualquer componente que recebe `params: Promise<{ ... }>` como prop

### ✅ Solução

#### 1. Código Está Correto

O código já está implementado corretamente:

```typescript
// ✅ CORRETO - Server Component
interface Props {
  params: Promise<{ id: string }>
}

export default async function Page(props: Props) {
  const params = await props.params // ✅ Desembrulhando a Promise
  // ... usar params.id
}
```

```typescript
// ✅ CORRETO - API Route
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params // ✅ Desembrulhando a Promise
  // ... usar resolvedParams.id
}
```

#### 2. Ações Recomendadas

1. **Ignorar o erro**: Não afeta a funcionalidade da aplicação
2. **Aguardar atualização**: Cursor/React DevTools podem adicionar suporte para
   Promises em props no futuro
3. **Usar DevTools do navegador**: Para inspeção detalhada, use as ferramentas
   do navegador (F12) em vez do Cursor

#### 3. Verificação

Para confirmar que o código está correto, verifique:

- ✅ Todas as páginas dinâmicas fazem `await props.params` antes de usar
- ✅ Todas as API Routes dinâmicas fazem `await params` antes de usar
- ✅ Não há uso direto de `params.id` sem desembrulhar primeiro

### 📈 Resultado

- ✅ Aplicação funciona normalmente
- ⚠️ Erro aparece apenas no DevTools do Cursor (não afeta usuários)
- ✅ Código segue as melhores práticas do Next.js 16

#### Como Validar

1. A aplicação funciona normalmente em desenvolvimento e produção
2. Páginas dinâmicas carregam corretamente
3. API Routes respondem corretamente
4. O erro só aparece ao usar "Select Element" no Cursor

---

## 18. Speed Insights da Vercel não exibindo dados

### 🎯 Problema

**Data da Ocorrência**: Janeiro 2025 **Severidade**: Média (Monitoramento não
funcional) **Status**: 🔍 Investigando

#### Descrição

O Speed Insights da Vercel não está exibindo dados no dashboard, mostrando "No
data available. Make sure you are using the latest @vercel/speed-insights
package."

#### Sintomas

- ❌ Dashboard do Speed Insights mostra "No data available"
- ❌ Mensagem sugere verificar se está usando a versão mais recente
- ✅ Pacote está instalado (`@vercel/speed-insights@1.3.1`)
- ✅ Componente está importado e usado no layout (`app/layout.tsx`)

#### Causa Raiz Possível

1. **Speed Insights não habilitado no dashboard da Vercel**: O serviço precisa
   ser ativado manualmente no dashboard
2. **Versão desatualizada**: Pode haver versão mais recente disponível
3. **Bloqueadores de anúncios**: Extensões do navegador podem bloquear o script
4. **Deploy necessário**: Alterações podem precisar de novo deploy para produção
5. **Problemas conhecidos da Vercel**: Incidente em 07/12/2025 foi resolvido,
   mas pode haver resquícios

### ✅ Solução Implementada

#### 1. Verificação de Configuração

**Arquivo**: `app/layout.tsx`

```tsx
import { SpeedInsights } from "@vercel/speed-insights/next" // ✅ Importado corretamente

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <SpeedInsights /> {/* ✅ Componente adicionado */}
        <Analytics />
      </body>
    </html>
  )
}
```

**Status**: ✅ Configuração correta

#### 2. Verificação de Versão

```json
{
  "@vercel/speed-insights": "^1.3.1" // ✅ Versão atual
}
```

**Status**: ✅ Versão instalada

### 🔍 Checklist de Troubleshooting

#### 1. Verificar no Dashboard da Vercel

1. Acesse o dashboard da Vercel: https://vercel.com/dashboard
2. Selecione o projeto `gb-locacoes`
3. Vá em **Analytics** → **Speed Insights**
4. Verifique se o Speed Insights está **habilitado**
5. Se não estiver, clique em **"Enable Speed Insights"** ou **"Implementar"**

#### 2. Verificar no Código

```bash
# Verificar se o componente está no layout
grep -r "SpeedInsights" app/layout.tsx

# Deve retornar:
# import { SpeedInsights } from '@vercel/speed-insights/next'
# <SpeedInsights />
```

#### 3. Verificar no Navegador

1. Abra o DevTools (F12)
2. Vá na aba **Network**
3. Recarregue a página
4. Procure por requisições para `vitals.vercel-insights.com` ou
   `speed-insights.vercel.app`
5. Se não aparecer, o script pode estar sendo bloqueado

#### 4. Verificar Bloqueadores

- Desative temporariamente bloqueadores de anúncios (uBlock Origin, AdBlock,
  etc.)
- Teste em modo anônimo
- Verifique se há extensões bloqueando scripts de terceiros

#### 5. Fazer Novo Deploy

```bash
# Após verificar configuração, fazer deploy
git add .
git commit -m "fix: verificar configuração Speed Insights"
git push origin main
```

#### 6. Aguardar Coleta de Dados

- O Speed Insights precisa de **tráfego real** para coletar dados
- Pode levar algumas horas ou dias para aparecer dados
- Dados são coletados apenas em **produção** (não em desenvolvimento local)

### 🎯 Resultado Esperado

- ✅ Speed Insights habilitado no dashboard da Vercel
- ✅ Script carregando no navegador (verificar Network tab)
- ✅ Dados aparecendo após tráfego real em produção
- ✅ Métricas de performance sendo coletadas

### 📝 Lições Aprendidas

1. **Speed Insights precisa ser habilitado no dashboard** - não é automático
2. **Dados só aparecem em produção** - desenvolvimento local não coleta métricas
3. **Bloqueadores podem interferir** - testar sem extensões
4. **Pode levar tempo** - dados não aparecem imediatamente após deploy
5. **Vercel Agent pode ajudar** - usar "Implementar" no dashboard para
   configuração automática

### ⚠️ Armadilhas a Evitar

- ❌ **NÃO** assumir que está funcionando apenas porque o código está correto
- ❌ **NÃO** esperar dados em desenvolvimento local
- ❌ **NÃO** ignorar bloqueadores de anúncios como causa
- ✅ **SEMPRE** verificar se está habilitado no dashboard da Vercel
- ✅ **SEMPRE** fazer deploy após alterações

### 🔍 Como Validar

```bash
# 1. Verificar versão instalada
pnpm list @vercel/speed-insights

# 2. Verificar se está no código
grep -r "SpeedInsights" app/

# 3. Verificar no navegador (DevTools → Network)
# Procurar por: vitals.vercel-insights.com ou speed-insights.vercel.app
```

### 📚 Referências

- [Vercel Speed Insights Quickstart](https://vercel.com/docs/speed-insights/quickstart)
- [Vercel Speed Insights Package](https://vercel.com/docs/speed-insights/package)
- [Vercel Speed Insights Troubleshooting](https://vercel.com/docs/speed-insights/troubleshooting)
- [Vercel Agent Installation](https://vercel.com/changelog/vercel-agent-installation)
- [Vercel Speed Insights GitHub](https://github.com/vercel/speed-insights)

### 🔄 Status de Atualização

- **Última verificação**: 2025-12-19
- **Versão atual**: `@vercel/speed-insights@1.3.1`
- **Ação recomendada**:
  1. Verificar se está habilitado no dashboard da Vercel
  2. Fazer novo deploy se necessário
  3. Aguardar coleta de dados em produção
  4. Verificar Network tab no navegador para confirmar script carregando

---

## 17. Warning de Depreciação do Zustand (Vercel Analytics/Speed Insights)

### 🎯 Problema

**Data da Ocorrência**: Janeiro 2025 **Severidade**: Baixa (Warning de console)
**Status**: ✅ Mitigado (warning suprimido; aguardando atualização da Vercel)

#### Descrição

O console do navegador exibe múltiplos warnings:

```
[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`.
```

Este warning **NÃO vem do código do projeto**, mas sim de dependências externas
da Vercel (`@vercel/analytics` e `@vercel/speed-insights`) que ainda utilizam a
sintaxe antiga do Zustand internamente.

#### Sintomas

- ⚠️ Múltiplos warnings no console do navegador
- ⚠️ Warning aparece a cada carregamento da página
- ✅ **Não afeta funcionalidade** - é apenas um aviso de depreciação
- ✅ Código do projeto está correto (`stores/useCartStore.ts` usa
  `import { create }`)

#### Causa Raiz

- `@vercel/analytics@1.6.1` e `@vercel/speed-insights@1.3.1` (versões mais
  recentes) ainda utilizam internamente a sintaxe antiga do Zustand:

  ```javascript
  // Sintaxe antiga (usada internamente pela Vercel)
  import zustand from "zustand"

  // Sintaxe nova (usada no projeto)
  import { create } from "zustand"
  ```

- Zustand 5.x emite warnings quando detecta a sintaxe antiga
- O warning é emitido pelo código interno das dependências da Vercel, não pelo
  projeto

### ✅ Solução Implementada

#### 1. Verificação de Versões

As dependências já estão nas versões mais recentes disponíveis:

```json
{
  "@vercel/analytics": "^1.6.1", // ✅ Mais recente
  "@vercel/speed-insights": "^1.3.1" // ✅ Mais recente
}
```

#### 2. Supressão do Warning (Atualizado - 2025-01-XX)

Implementada solução em duas camadas para suprimir o warning de forma robusta:

**Arquivo 1**: `app/layout.tsx` - Script no `<head>` com
`strategy="beforeInteractive"` para rodar antes do script de instrumentação da
Vercel

```tsx
<Script id="suppress-zustand-warning" strategy="beforeInteractive">
  {`
    (function() {
      if (typeof window === 'undefined') return;
      if (window.__gbSuppressZustandWarning__) return;

      window.__gbSuppressZustandWarning__ = true;

      const shouldSuppress = function(...args) {
        // Converte todos os argumentos para string e junta
        const fullMessage = args
          .map(arg => {
            if (typeof arg === 'string') return arg;
            if (typeof arg === 'object' && arg !== null) {
              try {
                return JSON.stringify(arg);
              } catch {
                return String(arg);
              }
            }
            return String(arg);
          })
          .join(' ')
          .toLowerCase();

        // Verifica múltiplos padrões para capturar todas as variações
        const patterns = [
          '[deprecated]',
          'deprecated',
          'default export',
          'default export is deprecated',
          'import { create }',
          'zustand'
        ];

        // Deve conter pelo menos 3 dos padrões para ser o warning do Zustand
        const matches = patterns.filter(pattern =>
          fullMessage.includes(pattern)
        ).length;

        return matches >= 3 && fullMessage.includes('zustand');
      };

      const originalWarn = console.warn;
      const originalError = console.error;
      const originalLog = console.log;

      console.warn = function(...args) {
        if (shouldSuppress(...args)) {
          return; // Suprimir warning do Zustand
        }
        originalWarn.apply(console, args);
      };

      console.error = function(...args) {
        if (shouldSuppress(...args)) {
          return; // Suprimir warning do Zustand
        }
        originalError.apply(console, args);
      };

      // Alguns warnings podem vir como console.log
      console.log = function(...args) {
        if (shouldSuppress(...args)) {
          return; // Suprimir warning do Zustand
        }
        originalLog.apply(console, args);
      };
    })();
  `}
</Script>
```

- Executa antes do script `instrument.*` da Vercel, evitando que o warning
  apareça mesmo no carregamento inicial
- Flag `__gbSuppressZustandWarning__` impede reatribuir `console` em remounts
- **Melhorias (2025-01-XX)**:
  - Detecta mensagens em múltiplos formatos (string, objetos, arrays)
  - Intercepta também `console.log` (alguns warnings podem vir por esse canal)
  - Usa sistema de padrões múltiplos para maior precisão na detecção

**Arquivo 2**: `app/ClientLayout.tsx` - Interceptação no `useEffect` para
warnings assíncronos e como fallback no client

- Mantém cobertura para logs disparados após a hidratação do React
- Restaura `console.warn`/`console.error`/`console.log` no cleanup do efeito
- Usa a mesma lógica melhorada de detecção por padrões múltiplos

**Por que duas camadas?**

- `beforeInteractive` captura o warning logo no carregamento da Vercel
  Analytics/Speed Insights
- `useEffect` garante que warns/erros assíncronos também sejam suprimidos
- Não toca nas dependências da Vercel; apenas suprime o ruído de console até o
  upstream corrigir

### 🎯 Resultado

- ✅ Warning suprimido no console (opcional)
- ✅ Funcionalidade não afetada
- ✅ Código do projeto mantém sintaxe correta
- ⏳ Aguardando atualização da Vercel para resolução definitiva

### 📝 Lições Aprendidas

1. **Warnings de dependências externas** não podem ser corrigidos diretamente no
   projeto
2. **Verificar sempre** se o warning vem do próprio código ou de dependências
3. **Documentar warnings conhecidos** para evitar investigações desnecessárias
4. **Monitorar atualizações** das dependências para resolução futura

### ⚠️ Armadilhas a Evitar

- ❌ **NÃO** tentar corrigir o código interno das dependências da Vercel
- ❌ **NÃO** fazer downgrade das dependências (versões mais antigas podem ter
  outros problemas)
- ❌ **NÃO** ignorar completamente - documentar para referência futura
- ✅ **SEMPRE** verificar se o warning vem do próprio código antes de investigar

### 🔍 Como Validar

```bash
# 1. Verificar versões instaladas
pnpm list @vercel/analytics @vercel/speed-insights

# 2. Verificar se o código do projeto está correto
grep -r "import.*zustand" stores/

# Deve retornar:
# stores/useCartStore.ts:import { create } from 'zustand' ✅
```

### 📚 Referências

- [Zustand Migration Guide](https://github.com/pmndrs/zustand/blob/main/docs/migrations/migrating-to-v4.md)
- [Vercel Analytics GitHub](https://github.com/vercel/analytics)
- [Vercel Speed Insights GitHub](https://github.com/vercel/speed-insights)

### 🔄 Status de Atualização

- **Última verificação**: Janeiro 2025
- **Versões atuais**: `@vercel/analytics@1.6.1`, `@vercel/speed-insights@1.3.1`
- **Ação recomendada**: Monitorar atualizações futuras da Vercel

---

## 16. 🚨 CRÍTICO: Vulnerabilidade de Segurança CVE-2025-55182 e CVE-2025-66478

### 🔐 Vulnerabilidade de Segurança

**Data da Ocorrência**: 04/12/2025 **Severidade**: 🔴 CRÍTICA (CVSS Score: High)
**Status**: ✅ RESOLVIDO

#### Descrição

Vulnerabilidade crítica de segurança em React Server Components (CVE-2025-55182)
e Next.js (CVE-2025-66478) que poderia permitir **Remote Code Execution (RCE)**
sob certas condições através de requisições especialmente criadas.

**Versões Afetadas**:

- React: 19.0, 19.1.0, 19.1.1, 19.2.0
- Next.js: ≥14.3.0-canary.77, todas versões ≥15 e ≥16
- Pacotes específicos:
  - react-server-dom-parcel (19.0.0, 19.1.0, 19.1.1, 19.2.0)
  - react-server-dom-webpack (19.0.0, 19.1.0, 19.1.1, 19.2.0)
  - react-server-dom-turbopack (19.0.0, 19.1.0, 19.1.1, 19.2.0)

**Versões Corrigidas**:

- React: 19.0.1, 19.1.2, 19.2.1
- Next.js: 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7, 16.0.7

#### Causa Raiz

A implementação do React Server Components processava entrada não confiável de
forma inadequada, permitindo que um atacante executasse código remotamente
através de requisições maliciosas especialmente criadas. A vulnerabilidade
estava presente na serialização/deserialização de componentes do servidor.

### ✅ Solução Implementada

#### 1. Atualização Imediata de Dependências

```json
// package.json - Versões ANTERIORES (VULNERÁVEIS)
{
  "react": "19.2.0",        // ❌ VULNERÁVEL
  "react-dom": "19.2.0",    // ❌ VULNERÁVEL
  "next": "16.0.5"          // ❌ VULNERÁVEL
}

// package.json - Versões ATUALIZADAS (SEGURAS)
{
  "react": "19.2.1",        // ✅ SEGURO
  "react-dom": "19.2.1",    // ✅ SEGURO
  "next": "16.0.7"          // ✅ SEGURO
}
```

#### 2. Processo de Atualização

```bash
# 1. Atualizar package.json
pnpm install

# 2. Testar build
pnpm build

# 3. Verificar funcionamento
pnpm dev
```

#### 3. Proteção Adicional da Vercel

A Vercel criou regras específicas no WAF (Web Application Firewall) para
proteger automaticamente todos os projetos hospedados na plataforma, mesmo antes
da atualização. No entanto, **a atualização das dependências ainda é
obrigatória** para proteção completa.

### 🎯 Resultado

- ✅ React atualizado de 19.2.0 → 19.2.1
- ✅ Next.js atualizado de 16.0.5 → 16.0.7
- ✅ Build testado e funcionando corretamente
- ✅ Projeto protegido contra CVE-2025-55182 e CVE-2025-66478
- ✅ Vercel WAF fornece camada adicional de proteção

### 📚 Documentação e Referências

#### Avisos Oficiais de Segurança

- [React GHSA](https://github.com/facebook/react/security/advisories)
- [Next.js GHSA](https://github.com/vercel/next.js/security/advisories)
- [Vercel Blog Post](https://vercel.com/blog/security-update-react-server-components)

#### Arquivos Modificados

1. `package.json` - Versões do React e Next.js atualizadas
2. `pnpm-lock.yaml` - Lockfile atualizado (gerado automaticamente)
3. `CHANGELOG.md` - Documentação da correção de segurança
4. `docs/issues/known-issues.md` - Este documento

#### Como Validar

```bash
# 1. Verificar versões instaladas
pnpm list react react-dom next

# Deve retornar:
# react@19.2.1
# react-dom@19.2.1
# next@16.0.7

# 2. Testar build
pnpm build
# ✅ Build deve completar com sucesso

# 3. Testar aplicação
pnpm dev
# ✅ Aplicação deve funcionar normalmente
```

### 🛑 Armadilhas a Evitar

- ❌ **NUNCA** fazer downgrade para versões anteriores vulneráveis
- ❌ **NUNCA** ignorar avisos de segurança do GitHub/Vercel
- ❌ **NUNCA** assumir que apenas a proteção WAF é suficiente
- ⚠️ **SEMPRE** atualizar dependências quando houver vulnerabilidades críticas
- ⚠️ **SEMPRE** testar após atualizações de segurança
- ⚠️ **SEMPRE** documentar correções de segurança no CHANGELOG

### 🔍 Detecção e Monitoramento

#### Como Detectar se Você Está Vulnerável

1. **Verificação Manual**:

```bash
# Verificar versão do React
cat package.json | grep '"react"'

# Verificar versão do Next.js
cat package.json | grep '"next"'
```

2. **Ferramentas Automatizadas**:

- GitHub Dependabot (ativo neste projeto)
- Vercel Dashboard (avisos de segurança)
- `pnpm audit` para vulnerabilidades conhecidas

3. **Sinais de Alerta**:

- Banner laranja na Vercel Dashboard
- Email de segurança do GitHub/Vercel
- Dependabot Pull Request automático

### 🏆 Créditos

- **Descoberta**: Lachlan Davidson (pesquisador de segurança)
- **Correção**: Meta Security Team e React Core Team
- **Coordenação**: Vercel Security Team
- **Deploy de Proteção**: Vercel WAF implementou regras globalmente

### 📊 Timeline

- **Descoberta**: Lachlan Davidson identifica vulnerabilidade
- **Disclosure**: Reporte responsável para Meta/React Team
- **Patches Released**:
  - React 19.0.1, 19.1.2, 19.2.1
  - Next.js 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7, 16.0.7
- **Vercel WAF**: Regras de proteção deployadas globalmente
- **GB-Locações**: 04/12/2025 - Atualização aplicada e testada ✅

### ⚠️ Nota Importante

Esta vulnerabilidade afeta TODOS os projetos usando React 19 com Server
Components, incluindo:

- Next.js (todas versões recentes)
- Vite com React Server Components
- Parcel com React
- React Router com SSR
- RedwoodSDK
- Waku
- Qualquer framework que use `react-server-dom-*` packages

**Recomendação**: Se você mantém outros projetos React, verifique e atualize
IMEDIATAMENTE.

---

## 15. Salto do scroll ao sair do ScrollStack (Playground)

### 🐛 Problema

**Data da Ocorrência**: 2025-11-25 **Severidade**: Média (UX) **Status**: ✅
Resolvido

#### Descrição

Ao concluir a rolagem do componente `scroll-stack` em `/playground`, o scroll
principal da página dava um "estilingue": primeiro saltava para cima e logo em
seguida voltava ao ponto esperado, criando um bounce perceptível antes de seguir
para a próxima seção.

#### Causa Raiz

- O lock de scroll aplicava `position: fixed` + `top` no `body` para travar a
  página enquanto o stack rolava.
- Na liberação, o `body` retornava brevemente para o topo antes do
  `window.scrollTo` suave empurrar para o final da seção, gerando o salto
  visível.

### ✅ Solução Implementada

- Simplificamos o lock para usar apenas `overflow: hidden` e
  `overscroll-behavior: contain`, eliminando o uso de `position: fixed`/`top` no
  `body`.
- O release para o final da seção ocorre somente após o desbloqueio, evitando o
  deslocamento inicial que causava o bounce.

#### Arquivos Modificados

1. `components/ui/scroll-stack.tsx`

#### Como Validar

1. `pnpm dev`
2. Acesse `http://localhost:3000/playground`.
3. Role o `scroll-stack` até o final; o scroll deve seguir suave para a próxima
   seção, sem saltar para cima antes.
4. Role de volta para o topo da seção e repita para garantir que o bounce não
   reaparece.

### 🛑 Armadilhas a Evitar

- Reintroduzir `position: fixed`/`top` no lock do `body`.
- Disparar `window.scrollTo` antes de liberar o bloqueio do scroll global.

---

## 14. Hover do hero 3D sem transição suave após navegar e voltar

### 🧠 Problema

**Data da Ocorrência**: 2025-11-24 **Severidade**: Baixa (UX) **Status**: ✅
Resolvido

#### Descrição

Ao visitar a home pela primeira vez, o hover do bloco 3D funcionava. Depois de
navegar para outra página e voltar, o `hover:scale-105` começava a pulsar ou
parava de funcionar porque restavam estilos inline aplicados pelo
`showAllElementsImmediately`.

#### Causa Raiz

No fluxo de navegação interna, o scroll-reveal aplicava `transform` e
`transition: none` inline na `.hero-image` e não limpava o transform/animation,
o que resetava continuamente o scale de hover ou o bloqueava.

### ✅ Solução Implementada

- Helpers `clearInlineTransition`/`clearInlineMotion` passaram a limpar
  transform/animation da `.hero-image` também quando exibimos elementos sem
  animação, e só executam uma vez por elemento.
- Flags de limpeza (`data-inline-*`) são resetadas antes de cada rodada do
  scroll-reveal.

### 🎯 Resultado

- Hover scale do card 3D permanece suave após sair e voltar para a home.
- Sem pulsar/reiniciar o scale em navegações internas.

### ⚠️ Armadilhas a Evitar

- Reintroduzir `transform` inline na `.hero-image` sem limpar.
- Ignorar o reset das flags ao reprocessar elementos em navegação interna.

---

## 📋 Índice

1. [🚨 CRÍTICO: Vulnerabilidade de Segurança CVE-2025-55182 e CVE-2025-66478](#16--crítico-vulnerabilidade-de-segurança-cve-2025-55182-e-cve-2025-66478)
2. [Salto do scroll ao sair do ScrollStack (Playground)](#15-salto-do-scroll-ao-sair-do-scrollstack-playground)
3. [Hover do hero 3D sem transição suave após navegar e voltar](#14-hover-do-hero-3d-sem-transição-suave-após-navegar-e-voltar)
4. [Dessincronização de Animações Hero](#1-dessincronização-de-animações-hero)
5. [Scroll Vertical Travado no iOS Safari](#2-scroll-vertical-travado-no-ios-safari)
6. [Scroll Involuntário na Home](#3-scroll-involuntário-na-home)
7. [Flick no Category Showcase após swipe](#4-flick-no-category-showcase-após-swipe)
8. [Hover e sombras cortados no Category Showcase](#5-hover-e-sombras-cortados-no-category-showcase)
9. [Gradiente do Carrossel Sobreposto às Categorias](#6-gradiente-do-carrossel-sobreposto-às-categorias)
10. [Inputs do Dialog Lab cortados nas laterais](#7-inputs-do-dialog-lab-cortados-nas-laterais)
11. [Hydration mismatch no IconCustomization](#8-hydration-mismatch-no-iconcustomization)
12. [Como Usar Este Documento](#como-usar-este-documento)

---

## 1. Dessincronização de Animações Hero

### 🎯 Problema

**Data da Ocorrência**: Novembro 2025 **Severidade**: Alta (UX impactada)
**Status**: ✅ RESOLVIDO

#### Descrição

Ao carregar a página inicial (especialmente após reset de cache), a imagem de
fundo do Hero aparecia vários segundos **antes** do conteúdo (título, subtítulo,
botões, busca). Isso criava uma experiência ruim onde o usuário via apenas a
imagem sozinha por alguns segundos antes do resto aparecer.

#### Sintomas

- ✅ Primeira visita normal funcionava
- ❌ Reset de cache causava dessincronização
- ❌ Imagem aparecia 1-2 segundos antes do conteúdo
- ❌ Flash de imagem isolada prejudicava UX

#### Causa Raiz

**Problema de Timing de Hidratação:**

1. **Framer Motion** (flash da imagem) inicia imediatamente após hidratação do
   React
2. **Scroll Reveal Init** demora mais para inicializar (especialmente após reset
   de cache)
3. Não havia comunicação entre os dois sistemas
4. Flash disparava independentemente do scroll-reveal estar pronto

**Código Problemático:**

```tsx
// Hero.tsx - Flash disparava imediatamente após hidratação
const [isHydrated, setIsHydrated] = useState(false)

useEffect(() => {
  setIsHydrated(true) // ← Muito cedo!
}, [])

// Flash iniciava sem esperar scroll-reveal
<motion.div animate={isHydrated ? { opacity: 1 } : { opacity: 0 }}>
```

### ✅ Solução Implementada

**Sistema de Evento Customizado para Sincronização:**

#### Arquivos Modificados

1. `components/scroll-reveal-init.tsx`
2. `components/hero.tsx`

#### Implementação

**1. Scroll Reveal Dispara Evento (scroll-reveal-init.tsx)**

```tsx
const run = () => {
  // Disparar evento para avisar que scroll-reveal está pronto
  window.dispatchEvent(new Event("scrollRevealReady"))

  // ... resto do código de inicialização
}
```

**Localização**: Linha ~40 em `scroll-reveal-init.tsx`

**2. Hero Escuta e Aguarda Evento (hero.tsx)**

```tsx
const [isScrollRevealReady, setIsScrollRevealReady] = useState(false)

// Aguardar scroll-reveal-init estar pronto antes de iniciar animações do flash
useEffect(() => {
  const handleScrollRevealReady = () => {
    setIsScrollRevealReady(true)
  }

  window.addEventListener('scrollRevealReady', handleScrollRevealReady)

  return () => {
    window.removeEventListener('scrollRevealReady', handleScrollRevealReady)
  }
}, [])

// Flash só anima quando scroll-reveal estiver pronto
<motion.div
  animate={isScrollRevealReady ? { opacity: 1 } : { opacity: 0 }}
  transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
>
```

**Localização**: Linhas ~26-39 e ~135 em `hero.tsx`

#### Como Funciona

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Página carrega                                           │
│ 2. React hidrata                                            │
│ 3. Hero renderiza (flash invisível, aguardando)            │
│ 4. Scroll Reveal Init inicializa completamente             │
│ 5. Scroll Reveal dispara evento 'scrollRevealReady' ✨     │
│ 6. Hero recebe evento e libera animação do flash           │
│ 7. Título (delay 0.2s) + Flash (delay 0.2s) animam JUNTOS │
│ 8. Sincronização perfeita! 🎉                              │
└─────────────────────────────────────────────────────────────┘
```

### 🎯 Resultado

- ✅ Flash aguarda scroll-reveal estar 100% pronto
- ✅ Conteúdo já está animando quando imagem aparece
- ✅ Zero dessincronização mesmo após reset de cache
- ✅ Animação harmoniosa e profissional
- ✅ Funciona em todos os cenários (primeira visita, navegação, refresh)

### 📝 Lições Aprendidas

1. **Nunca confie apenas em hidratação do React** para sincronizar sistemas de
   animação
2. **Use eventos customizados** para comunicação entre componentes independentes
3. **Framer Motion é mais rápido** que sistemas de scroll reveal baseados em
   IntersectionObserver
4. **Sempre teste com reset de cache** para pegar problemas de timing
5. **Estado compartilhado via eventos** > Delays fixos estimados

### ⚠️ Armadilhas a Evitar

❌ **NÃO** use delays fixos grandes para "esperar" inicialização:

```tsx
// RUIM - delay fixo de 0.8s não garante sincronização
transition={{ delay: 0.8 }}
```

✅ **USE** comunicação via eventos:

```tsx
// BOM - aguarda sinal real de prontidão
animate={isScrollRevealReady ? { opacity: 1 } : { opacity: 0 }}
```

### 🔍 Como Diagnosticar Problema Similar

Se você encontrar animações dessincronizadas:

1. Verifique se há múltiplos sistemas de animação (Framer Motion + CSS +
   IntersectionObserver)
2. Teste com reset de cache completo (Ctrl+Shift+R)
3. Use `console.log` para verificar timing de inicialização
4. Considere evento customizado para sincronização

### 📚 Referências

- CHANGELOG.md: [2025-11-05] - Correção Animação Ondinha Hero e Sincronização
- Commit: [hash do commit]
- Arquivos: `components/hero.tsx`, `components/scroll-reveal-init.tsx`

---

## 2. Scroll Vertical Travado no iOS Safari

### 🎯 Problema

**Data da Ocorrência**: Novembro 2025 **Severidade**: Crítica (Funcionalidade
quebrada no iOS) **Status**: ✅ RESOLVIDO

#### Descrição

No iPhone/iPad (iOS Safari), ao tentar rolar a página verticalmente após a seção
"Nossos Equipamentos" (que contém scroll infinito horizontal com animações
GSAP), o scroll vertical ficava completamente travado. O usuário não conseguia
continuar scrollando para baixo para ver a seção "Categorias de Equipamentos" e
o restante do conteúdo da página.

#### Sintomas

- ❌ Scroll vertical travado/preso após seção de equipamentos no iOS
- ❌ Impossível acessar conteúdo abaixo da seção no iPhone
- ❌ Conteúdo aparecia "embaixo" da seção ao tentar scroll para cima
- ❌ Sensação de "chegou ao fim mas ainda tem mais conteúdo"
- ✅ Funcionava perfeitamente no desktop
- ✅ Funcionava perfeitamente no Android

#### Causa Raiz

**`position: sticky` no iOS Safari capturando eventos de touch:**

O componente `EquipmentInfiniteScroll` tinha `className="lg:sticky lg:top-8"`
aplicado, o que criava um elemento sticky no desktop. No iOS Safari,
`position: sticky` tem um bug conhecido onde captura eventos de touch/scroll,
especialmente quando combinado com:

1. **`overflow: hidden`** no mesmo contexto
2. **Animações horizontais** (GSAP movendo elementos com transform)
3. **Scroll containers** aninhados

**Código Problemático:**

```tsx
// equipment-showcase-section.tsx - Linha 87
<div className="order-2 lg:order-1">
  <EquipmentInfiniteScroll className="lg:sticky lg:top-8" />
  {/*                                   ^^^^^^^^^^^^^^^^^ CULPADO */}
</div>
```

**Como o bug ocorria:**

1. Usuário toca na tela para scrollar verticalmente
2. iOS Safari detecta o toque sobre o elemento sticky
3. Sticky tenta determinar: "scroll do elemento" ou "scroll da página"?
4. `overflow: hidden` + animações GSAP horizontais confundem o iOS
5. iOS "prende" o evento de scroll no elemento sticky
6. **Scroll vertical da página trava completamente**

### ✅ Solução Implementada

**Duas mudanças necessárias:**

#### Arquivos Modificados

1. `components/equipment-showcase-section.tsx` (linha 87)
2. `components/categories.tsx` (linha 158)

#### Implementação

**1. Remover `position: sticky` da seção de equipamentos:**

```tsx
// ANTES (com bug):
;<div className="order-2 lg:order-1">
  <EquipmentInfiniteScroll className="lg:sticky lg:top-8" />
</div>

// DEPOIS (corrigido):
{
  /* Sticky removido: causava bug de scroll vertical no iOS Safari */
}
;<div className="order-2 lg:order-1">
  <EquipmentInfiniteScroll />
</div>
```

**Localização**: Linhas 86-89 em `equipment-showcase-section.tsx`

**2. Adicionar `overflow-hidden` na seção de categorias:**

```tsx
// ANTES:
<section
  id="categorias"
  ref={sectionRef}
  className="bg-gray-50 py-12 md:py-16 lg:py-20"
>

// DEPOIS (corrigido):
<section
  id="categorias"
  ref={sectionRef}
  className="bg-gray-50 py-12 md:py-16 lg:py-20 overflow-hidden"
>
```

**Localização**: Linha 158 em `components/categories.tsx`

**Por que ambas as mudanças foram necessárias:**

- Remover sticky eliminou a captura de eventos
- Adicionar `overflow-hidden` na seção seguinte preveniu que o conteúdo
  "vazasse" e criasse scroll horizontal indesejado que interferia com o scroll
  vertical

### 🎯 Resultado

- ✅ Scroll vertical funciona perfeitamente no iOS Safari
- ✅ Todas as animações GSAP continuam funcionando
- ✅ Comportamento consistente entre iOS, Android e Desktop
- ✅ `overflow-hidden` na seção de categorias previne vazamento horizontal
- ⚠️ Trade-off: Elemento não fixa mais no desktop durante scroll (comportamento
  sticky removido)

### 📝 Lições Aprendidas

1. **iOS Safari tem bug grave com `position: sticky`** quando combinado com
   `overflow: hidden` e animações
2. **Sticky + scroll horizontal = problema no iOS** - evitar essa combinação
3. **Touch events no iOS são capturados por sticky** mesmo com `touch-action`
   configurado
4. **Remover sticky NÃO foi suficiente sozinho** - precisou adicionar
   `overflow-hidden` na seção seguinte
5. **`overflow-hidden` em sections adjacentes** ajuda a isolar contextos de
   scroll e prevenir interferências
6. **Bug conhecido do WebKit**:
   [WebKit Bug #179178](https://bugs.webkit.org/show_bug.cgi?id=179178)

### ⚠️ Armadilhas a Evitar

❌ **NÃO use `position: sticky` com:**

```tsx
// RUIM - combinação que quebra no iOS
<div className="sticky">
  <div className="overflow-hidden">{/* Animações horizontais GSAP */}</div>
</div>
```

✅ **Se precisar de sticky, isole completamente:**

```tsx
// BOM - sem overflow ou animações no contexto do sticky
<div className="sticky">
  <div>{/* Conteúdo estático simples */}</div>
</div>
```

❌ **NÃO tente corrigir com CSS:**

```css
/* INÚTIL - não resolve o problema do sticky no iOS */
.sticky-element {
  touch-action: pan-y !important;
  -webkit-overflow-scrolling: touch !important;
}
```

✅ **Solução real: remova o sticky:**

```tsx
// BOM - sem sticky = sem problemas
<div>
  <ComponenteComAnimacoes />
</div>
```

### 🔍 Como Diagnosticar Problema Similar

Se você encontrar scroll travado no iOS:

1. **Procure por `position: sticky`** nos componentes da área afetada
2. **Verifique se há `overflow: hidden`** no mesmo contexto
3. **Teste removendo temporariamente o sticky** - se resolver, esse é o problema
4. **Use DevTools do Safari iOS** para inspecionar eventos de touch
5. **Não perca tempo com `touch-action`** - não resolve bugs de sticky

### 🧪 Tentativas que NÃO Funcionaram

Durante a investigação, foram testadas (sem sucesso):

1. ❌ Adicionar `touch-action: pan-y pinch-zoom` em todos elementos
2. ❌ Adicionar `-webkit-overflow-scrolling: touch`
3. ❌ Mudar `overflow: hidden` para `overflow-x: hidden`
4. ❌ Usar `clip-path` em vez de `overflow`
5. ❌ Desabilitar animações GSAP no mobile
6. ❌ Adicionar `pointer-events: none`
7. ❌ Criar regras CSS globais específicas para iOS
8. ❌ Usar `isolation: isolate` para stacking context
9. ❌ Renderizar componente diferente no mobile
10. ❌ Adicionar propriedades no `body` e `html`

**Nenhuma dessas soluções funcionou. A única solução foi remover o
`position: sticky`.**

### 📚 Referências

- CHANGELOG.md: [2025-11-06] - Correção Bug de Scroll no iOS Safari
- WebKit Bug Report: https://bugs.webkit.org/show_bug.cgi?id=179178
- Stack Overflow: "iOS Safari sticky position scroll issues"
- MDN: Position Sticky - Known Issues
- Arquivos: `components/equipment-showcase-section.tsx`

---

## 3. Scroll Involuntário na Home

### 🎯 Problema

**Data da Ocorrência**: 2025-11-06 **Severidade**: Média (UX impactada)
**Status**: ✅ Resolvido

#### Descrição

Ao carregar ou recarregar a página inicial (Home), a viewport deslocava alguns
pixels para baixo sem nenhuma interação do usuário. O comportamento não era
reproduzido em outras rotas.

#### Sintomas

- ❌ Scroll vertical automático assim que a Home carregava
- ❌ Layout “pulava” para baixo antes de qualquer interação
- ✅ Outras páginas permaneciam estáticas
- ✅ Reproduzido em desktop e mobile

#### Causa Raiz

O componente `TabbedCategoryGrid` centralizava a tab ativa com
`scrollIntoView({ block: 'nearest', inline: 'center' })`. Apesar de indicar
somente alinhamento horizontal, alguns navegadores ajustavam também o eixo
vertical, provocando o scroll involuntário da página inicial (única rota que usa
o componente).

> **Atualização 2025-11-07**: O componente foi substituído por
> `CategoryShowcase`, que mantém a correção e elimina a dependência do wrapper
> de tabs anterior.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `components/tabbed-category-grid.tsx` (REMOVIDO)
2. `components/category-showcase.tsx`

#### Implementação

- Substituído `scrollIntoView` por lógica manual usando `element.scrollTo`
  limitada ao eixo horizontal.
- Checagem de overflow garante que o ajuste só ocorra quando realmente
  necessário (evita alterações em desktop).
- Guarda que verifica se a tab já está totalmente visível antes de ajustar o
  scroll, prevenindo movimentos desnecessários.
- Adicionada flag `hasMountedRef` para evitar animação na primeira renderização.

### 🎯 Resultado

- ✅ Home permanece fixa no topo após carregar.
- ✅ Centralização das tabs continua funcional em telas menores.
- ✅ Nenhum impacto em outras páginas ou animações.

### 📝 Lições Aprendidas

- `scrollIntoView` pode alterar o eixo vertical mesmo com `block: 'nearest'`.
- Para controlar apenas um eixo, prefira cálculos manuais com `scrollLeft` /
  `scrollTo`.

### ⚠️ Armadilhas a Evitar

- ❌ Não reutilizar `scrollIntoView` para centralizar tabs horizontais.
- ❌ Evitar animação de scroll no primeiro render (previne jank visual).
- ✅ Priorizar lógica customizada quando o deslocamento deve ser restrito a um
  único eixo.

---

## 4. Flick no Category Showcase após swipe

### 🎯 Problema

**Data da Ocorrência**: 2025-11-06 **Severidade**: Média (UX impactada)
**Status**: ✅ Resolvido

#### Descrição

No showcase de categorias (atualmente disponível em `/playground`, antigo
`/test-components`), ao concluir o gesto de swipe as novas categorias surgiam
imediatamente em estado final, sem as animações escalonadas previstas. O usuário
percebia um “piscar” rápido no instante em que soltava o dedo/mouse, porque o
grid da nova aba aparecia em opacidade plena antes que os fades individuais
começassem.

#### Como Reproduzir

1. Abrir `/playground` e iniciar um swipe horizontal nas tabs.
2. Soltar o dedo/mouse antes do overlay terminar de deslizar.
3. Observar o frame logo após o release: dois conjuntos de botões aparecem
   simultaneamente (grid novo e overlay antigo), causando flick perceptível.

#### Sintomas

- Conteúdo das tabs carregava instantaneamente assim que o swipe terminava.
- Os botões ainda executavam animações com delay após o flick, gerando efeito
  duplo (flash + fade).
- Problema ocorria apenas em navegação por swipe; clique nas tabs funcionava.

#### Causa Raiz

Durante a animação de swipe, o estado `displayedTabId` era atualizado no mesmo
frame em que o overlay concluía a transição. Isso fazia com que as animações dos
cards fossem disparadas enquanto o grid ainda estava oculto
(`swipePhase === "animating"`). Quando o container voltava para `opacity-100`,
os cards já haviam atingido `opacity: 1`, causando o flash sem fade.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `components/category-showcase.tsx`

#### Implementação

- Adicionada função `clearSwipeOverlay` e ajustado `commitTabChange` para
  diferenciar cliques de swipes.
- Para swipes, o update do grid (estado `displayedTabId` + `transitionKey`)
  agora acontece apenas no próximo `requestAnimationFrame`, garantindo que o
  container volte a ser visível no mesmo frame em que os cards são montados.
- O grid permanece oculto tanto em `"animating"` quanto em `"settling"`,
  evitando que o novo conteúdo apareça antes do overlay finalizar.
- A opacidade do grid deixa de utilizar transição durante o swipe, sumindo
  imediatamente e impedindo que o usuário veja o conteúdo “por trás” dos gaps do
  overlay.

### 🎯 Resultado

- Zero flick: o grid só reaparece quando o fade-in escalonado está pronto.
- Navegação por clique mantém comportamento original.
- Overlay cobre toda a transição, mantendo continuidade visual.

#### Como Validar

1. Abrir `/playground` e repetir os swipes rápidos em ambas direções.
2. Usar DevTools → “Slow 4x” opcionalmente para inspecionar frames: nenhum card
   deve aparecer antes do fade-in.
3. Confirmar que `swipePhase` retorna para `"idle"` enquanto o grid volta para
   `opacity-100` sem conteúdos duplicados.

### 📝 Lições Aprendidas

- Ao combinar overlay + grid animado, sincronize montagem dos itens com o frame
  em que o container volta a ser visível.
- Usar `requestAnimationFrame` é uma forma simples de alinhar estados visuais
  quando não há timeline compartilhada.

### ⚠️ Armadilhas a Evitar

- ❌ Não atualizar `displayedTabId` imediatamente em animações baseadas em
  overlay.
- ❌ Não limpar o overlay antes do grid estar pronto; isso expõe o frame sem
  animação.

---

## 5. Hover e sombras cortados no Category Showcase

### 🎯 Problema

**Data da Ocorrência**: 2025-11-06 **Severidade**: Baixa/Média (perda de
polimento visual) **Status**: ✅ Resolvido

#### Descrição

Os botões do showcase do CategoryShowcase eram renderizados dentro de um
container com `overflow-hidden`. Quando o usuário fazia hover (ou focus) os
cards cresciam `hover:-translate-y-1` e aplicavam sombra. Porém, as bordas do
container cortavam tanto o deslocamento quanto o blur, deixando o efeito com
aparência truncada — principalmente nas colunas externas.

#### Sintomas

- Hover/active não exibiam sombra completa nos cards laterais.
- Bordas superiores/inferiores também “cortavam” o movimento vertical dos
  botões.
- Mais perceptível em `Fases da obra`, quando os cartões têm sombra azul.

#### Causa Raiz

O wrapper que também controla o swipe overlay precisava de `overflow-hidden`
para evitar que o overlay animado escapasse visualmente. O grid principal,
entretanto, não precisava dessa restrição. Cada hover é executado dentro do grid
base, então bastava isolar o `overflow-hidden` apenas no overlay.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `components/category-showcase.tsx`

#### Implementação

- Removido `overflow-hidden` do wrapper do grid.
- Overlay passou a ficar dentro de um container absoluto (`pointer-events-none`)
  dedicado, com `overflow-hidden` apenas para ele.
- Componentes reais permanecem com `overflow-visible`, liberando animações de
  hover/sombra.

### 🎯 Resultado

- Sombras e deslocamentos funcionam totalmente, inclusive nas extremidades.
- Overlay continua limitado ao container durante o swipe, sem vazar para fora.

### 📝 Lições Aprendidas

- Ao precisar de `overflow-hidden` por causa de animações temporárias, isole a
  restrição no elemento animado em vez de aplicá-la ao container que contém o
  conteúdo interativo.

### ⚠️ Armadilhas a Evitar

- ❌ Aplicar `overflow-hidden` diretamente no grid principal; isso corta hovers.
- ✅ Manter overlays auxiliares em wrappers dedicados com clipping específico.

---

## 6. Gradiente do Carrossel Sobreposto às Categorias

### 🎯 Problema

**Data da Ocorrência**: 2025-11-07 **Severidade**: Média (impacto visual claro)
**Status**: ✅ Resolvido

#### Descrição

O gradiente de fade do `EquipmentInfiniteScroll` (coluna esquerda da seção
`EquipmentShowcaseSection`) avançava sobre o grid de categorias na coluna
direita. Os botões das tabs e das categorias ficavam visivelmente desbotados, já
que o overlay com `z-index: 10` era renderizado acima deles.

#### Sintomas

- ❌ Aba ativa e cards das categorias apareciam esbranquiçados na borda esquerda
  da coluna direita
- ❌ Hover/focus dos botões ficava encoberto pelo gradiente
- ✅ Overlay funcionava normalmente sobre os cards do carrossel

#### Causa Raiz

O wrapper do carrossel não criava um contexto próprio de empilhamento, então o
overlay com `z-10` competia diretamente com os elementos da coluna vizinha. Como
o grid de categorias não possuía `z-index` definido, o gradiente vencia a
disputa e ficava “por cima” dos botões, mesmo estando em outra coluna do grid.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `components/equipment-infinite-scroll.tsx`
2. `components/equipment-showcase-section.tsx`

#### Implementação

- Adicionado `z-0` ao container relativo do carrossel para criar stacking
  context isolado para os overlays do fade.
- Coluna das categorias passou a ser `relative z-20`, garantindo que tabs e
  cards fiquem sempre acima de elementos adjacentes.
- Mantido `pointer-events-none` nos overlays para preservar acessibilidade e
  interação do carrossel.

### 🎯 Resultado

- ✅ Gradiente permanece limitado ao carrossel, sem interferir no grid de
  categorias.
- ✅ Hover e foco dos botões voltam a ser exibidos com cores originais.
- ✅ Layout mantém o efeito de fade lateral desejado no carrossel.

### 📝 Lições Aprendidas

- Sempre que um overlay precisar de `z-index` elevado, isole o stacking context
  do componente para evitar interferência em colunas irmãs.
- Ajustar o `z-index` da coluna vizinha é uma solução rápida quando os elementos
  precisam permanecer acima visualmente.

### ⚠️ Armadilhas a Evitar

- ❌ Deixar overlays globais sem stacking context próprio em layouts de
  múltiplas colunas.
- ❌ Depender apenas de `pointer-events: none` quando o problema é ordem de
  empilhamento.

## 7. Inputs do Dialog Lab cortados nas laterais

### 🐛 Problema

**Data da Ocorrência**: 2025-11-09 **Severidade**: Média (UX interna)
**Status**: ✅ Resolvido

#### Descrição

As seções do fluxo "Criar/Editar Categoria" no Dialog Lab utilizam elementos
`<section>`, mas o estilo global definido em `app/globals.css` aplica
`overflow-x: hidden` para todas as seções do site. Dentro do dialog Base UI,
isso fazia os campos "Nome da Categoria" e "Descrição" perderem parte das bordas
e dos focus rings nas laterais, causando aparência de conteúdo cortado.

#### Sintomas

- Inputs e textarea aparentando estar "aparados" nas bordas laterais do popup.
- Estados de foco/hover não exibiam sombras completas em resoluções menores.

#### Causa Raiz

O CSS global (`section, .container { overflow-x: hidden; }`) é útil nas páginas
públicas para evitar scroll horizontal, mas dentro de uma modal esse overflow
impede que componentes com `box-shadow`/`outline` maiores que o container
renderizem totalmente.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `app/playground/page.tsx`

#### Implementação

- Criado helper `DIALOG_FORM_SECTION` adicionando `overflow-visible` às seções
  do formulário.
- A seção que envolve inputs e textarea passou a usar o helper, sobrescrevendo o
  estilo global e liberando os focus rings dos campos.

### 🧪 Resultado

- Inputs, textarea e contêineres internos exibem suas bordas completas, sem
  cortes laterais.
- O layout segue alinhado com o restante do dialog, inclusive em nested dialogs.

### 🧠 Lições Aprendidas

- Sempre revisar utilitários globais aplicados a tags semânticas antes de
  reutilizá-las em modais/overlays.
- Dialogs Base UI precisam declarar explicitamente `overflow-visible` quando
  dependem de sombras externas ou animações de scale.

### 🚫 Armadilhas a Evitar

- Criar novas seções em dialogs sem sobrescrever `overflow-x: hidden` do
  stylesheet global.
- Confiar apenas em remover `overflow-hidden` de ancestrais; elementos sem
  override continuam herdando o corte.

---

## 8. Hydration mismatch no IconCustomization

### 🐛 Problema

**Data da Ocorrência**: 2025-11-13 **Severidade**: Alta (quebra UX) **Status**:
✅ Resolvido

#### Descrição

Ao acessar `/playground/icon-customization`, o console do navegador exibia:

> `Hydration failed because the server rendered text didn't match the client.`

No HTML SSR, a primeira seção da biblioteca de ícones era "Construção &
Ferramentas" (`🛠️`), mas logo após a hidratação o cliente substituía a seção por
"Recentes" (`🕒`). O React detectava a divergência e forçava a re-renderização
do bloco, quebrando animações e causando flick na navegação.

#### Causa Raiz

- `useIconRecents` lia `localStorage` durante a renderização inicial.
- No SSR, a lista de recentes era vazia; no cliente, era preenchida
  imediatamente.
- A ordem das seções mudava entre SSR e CSR, disparando o erro de hidratação.

#### Solução Implementada

1. `useIconRecents` (e o novo `useEmojiRecents`) passaram a iniciar estado
   vazio.
2. Os dados persistidos são carregados somente após o `mount` (`useEffect`),
   garantindo HTML idêntico no SSR e no cliente.
3. A lista de recentes agora só é exibida quando existe histórico real.

#### Arquivos Modificados

- `hooks/use-icon-recents.ts`
- `hooks/use-emoji-recents.ts`
- `components/dialogs/icon-customization-data.ts`
- `app/playground/icon-customization/page.tsx`
- `components/dialogs/category-dialog.tsx`

#### Como Validar

```bash
pnpm dev
# Abrir http://localhost:3000/playground/icon-customization
# Verificar console: nenhum hydration mismatch deve aparecer
```

#### Lições Aprendidas

- Evite ler `localStorage` (ou `window`) durante o SSR.
- Sempre garanta que dados "recentes" tenham fallback determinístico no SSR.
- Prefira carregar preferências do usuário após o `mount` quando a UI depende de
  browser APIs.

---

## Como Usar Este Documento

### Para Desenvolvedores

1. **Antes de investigar um bug**, procure aqui se já foi resolvido
2. **Ao resolver um bug novo**, documente aqui seguindo o template
3. **Mantenha atualizado** com data, causa raiz e solução completa

### Para IAs (Cursor, GitHub Copilot, etc.)

1. **Consulte este arquivo** quando usuário reportar bug
2. **Busque por palavras-chave**: "animação", "dessincronização", "flash",
   "hero"
3. **Referência `AGENTS.md`** para lembrar de consultar este arquivo
4. **Sugira soluções já validadas** antes de criar novas abordagens

### Template para Novos Problemas

```markdown
## X. [Nome do Problema]

### 🎯 Problema

**Data da Ocorrência**: [Data] **Severidade**: [Baixa/Média/Alta/Crítica]
**Status**: [🔍 Investigando / ✅ Resolvido / 🚧 Parcial]

#### Descrição

[Descrição detalhada]

#### Sintomas

- Sintoma 1
- Sintoma 2

#### Causa Raiz

[Explicação técnica da causa]

### ✅ Solução Implementada

#### Arquivos Modificados

1. arquivo1.tsx
2. arquivo2.tsx

#### Implementação

[Código e explicação]

### 🎯 Resultado

[Resultados após implementação]

### 📝 Lições Aprendidas

[Insights importantes]

### ⚠️ Armadilhas a Evitar

[O que NÃO fazer]
```

---

**Última atualização**: 05/11/2025 **Mantido por**: Equipe de Desenvolvimento GB
Locações **Versão**: 1.0.0

## 7. Flick no preview do Category Showcase no Dialog Lab

### 🧠 Problema

**Data da Ocorrência**: 2025-11-09 **Severidade**: Média (demonstração
inconsistente) **Status**: ✅ Resolvido

#### Descrição

O preview exibido dentro do fluxo "Criar/Editar Categoria" (`app/playground`)
usava um componente ad-hoc (`MiniCategoryShowcase`). As animações de swipe/fade
eram implementadas de forma diferente do `CategoryShowcase` real, o que fazia o
bloco "piscar" (overlay encerrava e, logo em seguida, o card único ainda
executava um fade-out). O resultado não representava as animações da homepage e
induzia teste errado dentro do Dialog Lab.

#### Como Reproduzir

1. Abrir `/playground`.
2. Acionar o botão "Nova Categoria" ou "Editar Categoria".
3. Alternar entre as tabs do preview ou realizar um swipe rápido.
4. Observar o flash antes do novo card aparecer.

#### Sintomas

- Card do preview fica invisível por um frame entre cada troca.
- Swipe overlay não cobre toda a animação (overlay some antes do novo conteúdo).
- Tabs do dialog exibem comportamento diferente da home.

#### Causa Raiz

- O componente prévio recriava manualmente as animações, sem `displayedTabId` e
  sem distinguir cliques de swipes.
- A lógica de overlay era simplificada e o grid voltava a ficar visível antes do
  fade-in iniciar, causando o flick conhecido.
- Dataset reduzido (1 card) impedia validar o grid real.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `app/playground/page.tsx`
2. `docs/features/category-showcase-shell.md`

#### Implementação

- Substituído `MiniCategoryShowcase` pelo próprio `CategoryShowcase`, mantendo
  as animações oficiais e criando tabs com um único item (a própria categoria em
  edição) para que o bloco funcione como preview fiel do botão.
- Preview agora apenas injeta a cor/ícone selecionados (sem recriar animações
  duplicadas).
- Documentação do shell atualizada para registrar a mudança.

### 📈 Resultado

- Preview do dialog replica 100% das animações (fade + swipe + overlay).
- Nenhum "piscar" ao trocar tabs ou ao fazer swipe rápido.
- O botão exibido no dialog é exatamente o mesmo que aparece na home (mesmo
  ícone, cores e comportamento), atendendo ao objetivo de servir como preview
  único.

#### Como Validar

1. Abrir `/playground` e abrir qualquer dialog de categoria.
2. Alternar tabs rapidamente e realizar swipes em dispositivos touch / trackpad.
3. Confirmar que não há flash em branco entre overlay e novo grid.

### 🧠 Lições Aprendidas

- Pré-visualizações devem reutilizar exatamente o mesmo componente para evitar
  divergências difíceis de rastrear.
- Overlay + grid precisam compartilhar o mesmo lifecycle; duplicar animações
  aumenta o risco de perda de sincronismo.

### ⚠️ Armadilhas a Evitar

- ⚠️ Recriar versões "mini" de componentes complexos apenas para previews.
- ⚠️ Desacoplar dataset/testes do componente original sem documentar o motivo.

---

## 8. Loop de estado no Dialog Lab (Maximum update depth)

### 🎯 Problema

**Data da Ocorrência**: 2025-11-09 **Severidade**: Alta (bloqueia playground)
**Status**: ✅ Resolvido

#### Descrição

Ao abrir qualquer dialog dentro de `/playground` (especialmente o fluxo "Nova
Categoria"), o navegador exibia o erro `Maximum update depth exceeded` e o
componente travava antes de renderizar. A exceção acontecia logo após o
montagem, impedindo a validação dos nested dialogs documentados em
`docs/features/dialog-lab.md`.

#### Sintomas

- Erro imediato no console apontando para `CategoryDialogDemo` (linha 1173).
- Turbopack reiniciando constantemente enquanto `/playground` estava aberto.
- Scroll global permanecia travado por conta da tentativa de abrir a dialog.

#### Causa Raiz

- O callback `handleStateChange` definido em `PlaygroundPage` era recriado a
  cada renderização.
- Todos os dialogs chamavam `onStateChange` dentro de um `useEffect` com a
  dependência `[open, onStateChange]`.
- Como a referência mudava a cada render, os efeitos disparavam continuamente,
  cada um executando `setDialogStates`. Em Next.js 16 (React 19 + Strict + dev
  loops do Turbopack), essa sequência nunca estabilizava, resultando no limite
  de atualizações excedido.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `app/playground/page.tsx`

#### Implementação

- `handleStateChange` agora é memoizado via `useCallback`, garantindo que o
  valor só mude quando realmente dependente (`setDialogStates`) se alterar (o
  que não acontece).
- Os efeitos dos dialogs passaram a reagir apenas a mudanças reais do `open`,
  impedindo que `setDialogStates` seja chamado em loop.

### 📈 Resultado

- `/playground` abre sem erros em Next.js 16 + Turbopack.
- Nested dialogs (Category / Design / Notifications) podem ser abertos e
  fechados repetidamente sem travar o scroll global.

#### Como Validar

1. `pnpm dev`
2. Navegar até `http://localhost:3000/playground`.
3. Clicar em "Nova Categoria" e "Editar Categoria" várias vezes.
4. Confirmar que não há erros `Maximum update depth exceeded` no console.

### 🧠 Lições Aprendidas

- Callbacks passados para efeitos em cascata devem ser memoizados para evitar
  disparos desnecessários.
- Em ambientes com Strict Mode duplicado (React 19 + Turbopack), loops que antes
  estabilizavam podem falhar rapidamente.

### ⚠️ Armadilhas a Evitar

- Evitar passar funções inline para props consumidas em `useEffect`.
- Não sincronizar bloqueio de scroll baseado em efeitos que disparam em todo
  render sem uma guarda clara.

---

## 9. Backdrop incompleto e scroll liberado no Dialog Lab

### 🎯 Problema

**Data da Ocorrência**: 2025-11-17 **Severidade**: Média (Impacta playground)
**Status**: ✅ Resolvido

#### Descrição

Ao abrir a dialog "Nova Categoria" em `/playground`, o backdrop preto exibido
pela Base UI não cobria toda a viewport e a página continuava rolando ao fundo,
quebrando o padrão descrito em `docs/features/dialog-lab.md`.

#### Sintomas

- Header e footer permaneciam visíveis fora da área escurecida.
- O usuário conseguia usar a roda do mouse ou o touch para mover a página atrás
  da dialog aberta.
- No DevTools, `html` e `body` apareciam com `overflow-hidden`, mas nada mudava
  no layout.

#### Causa Raiz

- As classes padrão do backdrop incluíam
  `supports-[-webkit-touch-callout:none]:absolute`. Em navegadores iOS (que
  suportam a propriedade), isso substituía `position: fixed` por `absolute`,
  fazendo o overlay rolar junto com a página e expondo o fundo.
- `app/globals.css` define `html { overflow-y: auto !important; }` e
  `body.min-h-screen { overflow: visible !important; }`. A classe
  `.overflow-hidden` adicionada dinamicamente não tinha especificidade
  suficiente para vencer essas regras, mantendo o scroll global liberado.

### ✅ Solução Implementada

#### Arquivos Modificados

1. `components/ui/dialog.tsx`
2. `app/globals.css`

#### Implementação

- Removido o modificador `supports-[-webkit-touch-callout:none]:absolute` de
  `BACKDROP_BASE_CLASSES`, garantindo que o backdrop permaneça `fixed` mesmo no
  Safari/iOS.
- Adicionadas regras específicas `html.overflow-hidden` e `body.overflow-hidden`
  logo após o helper global, forçando `overflow: hidden !important` (além de
  `overscroll-behavior: contain`) sempre que a classe for aplicada.
- Mantidos os utilitários existentes de `min-h-screen`, apenas garantindo que a
  trava de scroll tenha prioridade maior do que os resets globais.

### 🎯 Resultado

- O backdrop cobre 100% da viewport independentemente do tamanho da página.
- Não é mais possível rolar o conteúdo de fundo enquanto qualquer dialog do
  playground estiver aberta; somente o conteúdo interno do modal pode scrollar.
- Comportamento consistente para dialogs aninhadas (`DesignDialog`,
  `IconCustomizationBlock`) e para o fluxo "Editar Categoria".

#### Como Validar

1. `pnpm dev`
2. Acessar `http://localhost:3000/playground`.
3. Abrir "Nova Categoria" ou "Editar Categoria".
4. Tentar rolar a página fora do modal — nada acontece; apenas o conteúdo do
   dialog responde ao scroll.

### 📝 Lições Aprendidas

- Regras globais com `!important` devem considerar a especificidade das classes
  utilitárias aplicadas dinamicamente.
- Bloquear o scroll global exige tratar explicitamente `html` e `body` quando
  esses elementos recebem helpers como `min-h-screen`.

### ⚠️ Armadilhas a Evitar

- Definir `overflow: visible !important` em helpers globais sem prever exceções
  para dialogs/modal.
- Confiar apenas na ordem de declaração dos seletores quando envolvem níveis de
  especificidade diferentes.
- Usar modificadores condicionais que alterem `position: fixed` do backdrop sem
  validar o comportamento em navegadores mobile.

## 10. Rotação do equipamento 3D travando durante a troca do carrossel principal

### 🎯 Problema

**Data da Ocorrência**: 2025-11-19 **Severidade**: Média (experiência visual)

#### Descrição

O `Equipment3DCarousel` exibido no hero estava travando a rotação automática
sempre que o carrossel principal de imagens trocava o slide. Durante a transição
do background, o componente 3D congelava por 1–2 segundos e só retomava o
movimento após a nova imagem estabilizar, transmitindo a sensação de gargalo.

#### Sintomas

- A rotação do objeto 3D pausa exatamente no momento em que o background troca.
- Ao trocar manualmente de modelo 3D, a animação volta, mas volta a travar no
  próximo ciclo do carrossel do hero.
- O comportamento independe do navegador e ocorre mesmo com FPS alto.

#### Causa Raiz

- `components/hero.tsx` armazenava `currentImage` no mesmo componente que
  renderiza o `Equipment3DCarousel`. A cada 5s todo o hero era re-renderizado,
  forçando o `Canvas` do `react-three/fiber` a resincronizar o loop enquanto o
  Framer Motion animava a troca de imagem.
- O array de modelos era recriado inline a cada render e o carrossel não era
  memoizado, o que disparava novos cálculos de bounds/lights em cada ciclo.

### ✅ Solução Implementada

1. Extraímos o carrossel de imagens/bolinhas para um componente dedicado
   (`HeroBackgroundCarousel`), isolando o estado de `currentImage` para que o
   hero e o `ModelViewer` não sejam re-renderizados a cada 5 segundos.
2. Promovemos os modelos padrões do hero para `HERO_EQUIPMENT_MODELS`, evitando
   criar novos objetos em toda renderização.
3. O `Equipment3DCarousel` passou a ser exportado memoizado (`React.memo`),
   garantindo que mudanças no hero não reflitam em re-renderizações do canvas.

### 📈 Resultado

- As transições do carrossel principal não afetam mais o loop de rotação.
- Os modelos 3D continuam suaves enquanto o background troca ou enquanto as dots
  são clicadas.
- Redução perceptível de jank na hero section.

### 🔍 Como Validar

1. `pnpm dev`
2. Acesse `http://localhost:3000/`.
3. Observe a rotação automática do equipamento por dois ciclos completos do
   carrossel principal; não deve haver travamentos.
4. Clique nas dots do carrossel e verifique que o `ModelViewer` mantém a rotação
   durante o fade.

### ⚠️ Armadilhas a Evitar

- Reintroduzir estado global do carrossel dentro do hero principal.
- Criar arrays inline ao passar `models` para o `Equipment3DCarousel`.
- Desabilitar o memo do carrossel, o que voltaria a sincronizar renders com o
  background.

## 11. Altura do componente 3D destoando no mobile

### 🎯 Problema

**Data da Ocorrência**: 2025-11-19 **Severidade**: Baixa (UX visual)

#### Descrição

Após substituir a imagem estática (`Image` 500x500 apontando para
`/equipment-static.jpg`) por um carrossel 3D, o bloco no hero ficou
excessivamente alto no mobile, lembrando um retângulo vertical desconfortável
comparado ao quadrado original.

#### Sintomas

- No desktop o layout permanecia correto, mas em telas < 640px o bloco passava
  de 430px de altura.
- A comparação com o ambiente de produção mostrava a imagem antiga ocupando
  ~311px de altura dentro do mockup.

#### Causa Raiz

- O `Equipment3DCarousel` recebe um `height={500}` fixo e não respeitava o
  contexto responsivo, mantendo 500px em qualquer breakpoint.

- ### ✅ Solução Implementada

- O contêiner do hero passou a usar classes responsivas
  `h-[320px] sm:h-[360px] md:h-[544px]` (com `lg`/`xl` herdando 544px),
  preservando o tamanho desktop e aproximando o mobile do quadrado anterior.
- O carrossel passa agora `height="100%"`, preenchendo apenas a altura do
  wrapper, permitindo futuros ajustes via CSS utilitário.

### 📈 Resultado

- Em telas pequenas o bloco ocupa ~320px (vizinho aos 311px da imagem antiga).
- A partir de 768px o bloco volta a 544px, espelhando o asset estático antigo.

### 🔍 Como Validar

1. `pnpm dev`
2. Ajuste o viewport do navegador para 360px ou use o emulador mobile.
3. Confirme que o bloco 3D continua centralizado mas agora quadrado e alinhado à
   altura original.

### ⚠️ Armadilhas a Evitar

- Reintroduzir alturas inline fixas em pixels sem breakpoints.
- Remover as classes responsivas do wrapper ao ajustar animações futuras.

## 12. Indicadores do carrossel do hero escondidos atrás da onda

### 🎯 Problema

**Data da Ocorrência**: 2025-11-19 **Severidade**: Baixa (navegação visual)

#### Descrição

Os dots do carrossel principal (`div.flex.justify-center.space-x-3`) foram
movidos para dentro do componente `HeroBackgroundCarousel`, deixando de fazer
parte da coluna do hero. Como a `div` do background não compartilha o mesmo
contexto que o card 3D, os indicadores passaram a ficar depois das ondas, dando
impressão de que estavam "perdidos" no final da página.

#### Sintomas

- Em desktop, os dots surgiam dentro da área branca das ondas.
- Em mobile, os dots ficavam praticamente invisíveis, prejudicando a navegação
  manual do carrossel.

#### Causa Raiz

- Os dots estavam ancorados em um container externo ao hero principal, herdando
  o posicionamento das ondas em vez do wrapper do carrossel 3D.

### ✅ Solução Implementada

- Extraímos os dots do `HeroBackgroundCarousel` e os inserimos novamente dentro
  da `div` principal do hero, mantendo `bottom-0 left-1/2 -translate-x-1/2`
  exatamente como na versão em produção (`components/hero.tsx`).
- O estado `currentImage` voltou a ser controlado pelo componente `Hero`,
  garantindo que background e indicadores compartilhem a mesma fonte da verdade.

### 📈 Resultado

- Os dots agora permanecem alinhados ao card 3D, sem fugir para a área das
  ondas.
- O comportamento é idêntico ao ambiente em produção, tanto em mobile quanto em
  desktop.

### 🔍 Como Validar

1. `pnpm dev`
2. Visite `/` e role até o hero.
3. Verifique que os dots estão visíveis logo abaixo do 3D carousel tanto em
   mobile quanto desktop (não ficam escondidos pela onda).

### ⚠️ Armadilhas a Evitar

- Recolocar os indicadores dentro de `HeroBackgroundCarousel` ou criar novos
  estados locais que desincronizem a navegação.

## 13. Modelos 3D não rotacionam em dispositivos touch

### 🎯 Problema

**Data da Ocorrência**: 2025-11-19 **Severidade**: Baixa (UX visual)

#### Descrição

No iPhone (Safari) e em outros dispositivos com tela touch, os modelos GLB não
executavam a rotação automática ao carregar o hero. A animação só acontecia em
desktops.

#### Sintomas

- Em celulares, o objeto 3D permanecia estático mesmo após aguardar alguns
  segundos.
- Ao abrir a mesma página no desktop, a rotação automática funcionava como
  esperado.

#### Causa Raiz

- `components/ui/model-viewer.tsx` desabilitava `OrbitControls.autoRotate`
  quando `ontouchstart` estava disponível (`isTouch ? false : autoRotate`) para
  evitar conflitos em devices móveis.
- Com isso, toda a camada de auto rotação era desligada em iOS/Android.

### ✅ Solução Implementada

- Removemos o guard `isTouch ? false : autoRotate`, permitindo que a rotação
  automática ocorra independentemente do tipo de dispositivo.

### 📈 Resultado

- Os modelos retomam a rotação suave tanto no Safari/iOS quanto em navegadores
  desktop.
- Usuários mobile voltam a perceber que o cartão é interativo sem depender de
  gestos.

### 🔍 Como Validar

1. `pnpm dev`
2. Abrir `http://localhost:3000` em um dispositivo touch (ou no emulador de
   iPhone/Safari).
3. Verificar que o modelo inicia a rotação automática após o carregamento.

### ⚠️ Armadilhas a Evitar

- Reintroduzir lógica condicional ligada a `ontouchstart`/`maxTouchPoints` sem
  oferecer fallback.
- Esquecer de ajustar `frameloop` caso futuras alterações dependam de estados
  específicos.

---
