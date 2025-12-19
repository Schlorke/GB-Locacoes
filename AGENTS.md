# 🤖 AGENTS.md - Guia de Comportamento para a IA no Projeto GB-Locações

> **ARQUIVO CRÍTICO**: Este arquivo define as regras de comportamento, o fluxo
> de trabalho obrigatório e os ponteiros para a documentação essencial. A
> documentação detalhada de funcionalidades, troubleshooting e contexto de
> projeto reside na pasta `docs/`.

---

## 1. 🚨 A Regra Mais Importante: O Processo é Inegociável

**NÃO EXISTE EXCEÇÃO**: Qualquer alteração, não importa o quão pequena (1 linha
de código, ajuste de texto, bug "simples"), DEVE seguir o fluxo de trabalho
completo abaixo. Velocidade não justifica pular etapas.

> **Lição Aprendida (Dez 2025)**: Uma IA pulou a documentação porque a tarefa
> "era simples" (corrigir loading de 2 botões). Resultado: retrabalho e
> frustração do usuário.

---

## 2. 🧠 Fluxo de Trabalho Obrigatório

Este é o processo que você DEVE seguir para toda e qualquer tarefa.

### ANTES de Escrever Qualquer Código

```
1. ✅ Ler docs/issues/known-issues.md (OBRIGATÓRIO)
   └── Verificar se o problema já foi resolvido ou se há armadilhas a evitar.

2. ✅ Ler docs/features/[componente-ou-pagina].md (OBRIGATÓRIO)
   └── Se não existir, PERGUNTE ao usuário sobre o comportamento esperado.

3. ✅ Verificar componentes existentes em components/ui/ e components/
   └── Não crie algo novo se já existe um componente similar.
```

### DEPOIS de Escrever o Código

```
1. ✅ Documentar bug/solução em docs/issues/known-issues.md (se aplicável)
   └── Incluir: causa raiz, solução, arquivos modificados, como validar.

2. ✅ Criar/atualizar docs/features/[componente-ou-pagina].md (se aplicável)
   └── Seguir o template padrão da pasta docs/features/.

3. ✅ Atualizar CHANGELOG.md com a data REAL do commit
   └── Use `git log --pretty=format:"%h %ad %s" --date=short` para verificar.
```

---

## 3. 🛡️ Protocolo Anti-Alucinação

Estas são heurísticas de comportamento para evitar erros comuns.

### Regras de Ouro

1.  **A Fonte da Verdade é a Documentação**: Se você não tem certeza sobre algo,
    a resposta está na pasta `docs/`. Não assuma, verifique.
2.  **Faça APENAS o que o Usuário Pediu**: Não "melhore" ou "otimize" nada além
    do escopo da solicitação.
3.  **Não Modifique a Identidade Visual**: Nunca altere estilos, cores ou layout
    sem uma solicitação explícita.
4.  **Siga os Padrões Existentes**: O projeto tem padrões de código, arquitetura
    e design system. Siga-os.
5.  **Datas Reais**: Nunca invente datas para o `CHANGELOG.md`. Use `git log`.

### Erros Críticos Documentados (Nunca Repetir)

| Erro                               | O que aconteceu                                                                                                  | Lição                                                           |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| **Modificar Estilos Sem Pedido**   | Usuário pediu para corrigir lógica do RESET; IA também alterou estilos dos botões.                               | Corrija APENAS a funcionalidade. Estilos só se o usuário pedir. |
| **Assumir Comportamento do RESET** | Usuário disse "RESET não deve fazer nada para os botões de status"; IA adicionou `setStatusFilter(\'PENDING\')`. | "Não deve fazer nada" significa NADA. Não assuma.               |

---

## 4. 📁 Estrutura de Documentação

A documentação do projeto é organizada da seguinte forma. **Consulte sempre a
pasta `docs/` antes de implementar.**

```
📁 docs/
├── 📄 README.md                  # Índice geral
├── 📁 getting-started/           # Setup, desenvolvimento, deploy
├── 📁 architecture/              # Arquitetura técnica e stack
├── 📁 features/                  # Documentação de funcionalidades (CONSULTAR SEMPRE)
├── 📁 guides/                    # Guias específicos (Storybook, acessibilidade, etc.)
├── 📁 references/                # Referências técnicas e dependências
├── 📁 issues/                    # Problemas conhecidos e soluções (CONSULTAR SEMPRE)
└── 📁 internal/                  # Documentação interna e dados da empresa
```

---

## 5. 🔗 Ponteiros Críticos: Sua Base de Conhecimento

Use esta tabela como seu guia de referência rápida. A resposta para a maioria
das suas perguntas está nestes documentos.

| Situação                   | Documento de Referência                          | Propósito                                 |
| :------------------------- | :----------------------------------------------- | :---------------------------------------- |
| **Qualquer bugfix**        | `docs/issues/known-issues.md`                    | Verificar se o bug já foi resolvido.      |
| **Modificar componente**   | `docs/features/[componente].md`                  | Entender a lógica e regras do componente. |
| **Usar Design System**     | `docs/features/design-system.md`                 | Cores, tipografia, componentes base.      |
| **Sistema de Orçamentos**  | `docs/features/quote-system.md`                  | Regras de negócio críticas.               |
| **Sistema Admin**          | `docs/features/admin-system.md`                  | Padrões para a área administrativa.       |
| **Dialogs e Modais**       | `docs/features/dialog-lab.md`                    | Padrão de implementação de dialogs.       |
| **Arquitetura Geral**      | `docs/architecture/overview.md`                  | Stack e estrutura do projeto.             |
| **Setup e Deploy**         | `docs/getting-started/`                          | Instalação e implantação.                 |
| **Compatibilidade**        | `docs/references/dependencies.md`                | Versões e problemas de dependências.      |
| **Dados da Empresa**       | `docs/internal/company/README.md`                | CNPJ, endereço, contatos oficiais.        |
| **Troubleshooting Rápido** | `docs/guides/troubleshooting-quick-reference.md` | Soluções rápidas para problemas comuns.   |

---

## 6. 🎨 Design System - Regras Rápidas

- **Componentes Base**: Use APENAS componentes de `components/ui/` (baseados em
  Radix UI).
- **Cor Primária**: Orange-600 (#ea580c).
- **Tipografia**: Inter (sans) + Jost (headings).
- **Responsividade**: Mobile-first. Use os padrões de espaçamento documentados
  em `docs/features/design-system.md`.
- **Z-Index**: Use os tokens `--layer-*` definidos em `app/globals.css`. Nunca
  invente valores numéricos.

---

## 7. 🏛️ Stack Tecnológico (Resumo)

| Tecnologia    | Versão/Detalhes                    |
| :------------ | :--------------------------------- |
| **Framework** | Next.js 16.0.3 (App Router)        |
| **Linguagem** | TypeScript 5.9.2                   |
| **UI**        | React 19.1.1 + Tailwind CSS 3.4.17 |
| **Database**  | PostgreSQL + Prisma 7.1.0          |
| **Auth**      | NextAuth.js 4.24.11                |
| **State**     | Zustand 5.0.7                      |
| **Testing**   | Vitest + Playwright                |

> **Atenção**: Consulte `docs/references/dependencies.md` antes de atualizar
> qualquer dependência. Há incompatibilidades conhecidas.

---

## 8. 🎯 Objetivo Final

Criar código que seja:

- **📖 Documentado**: Baseado na documentação oficial.
- **🎨 Consistente**: Seguindo o design system.
- **🔒 Seguro**: Com validações e autenticação adequadas.
- **⚡ Performático**: Otimizado para velocidade.
- **♿ Acessível**: Inclusivo para todos os usuários.
- **🧪 Testado**: Coberto por testes adequados.
- **📝 Rastreável**: Com mudanças documentadas no CHANGELOG.

---

_Última atualização: dezembro 2025 | Versão: 3.0 (Otimizada)_
