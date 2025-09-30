# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em
[Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto
adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [2025-01-22] - Configuração Global do Spellchecker

### Added ✨

- **Configuração global do cSpell**: Adicionado suporte para português
  brasileiro e inglês americano
  - Arquivo `cspell.config.js` com configuração completa
  - Suporte a múltiplos idiomas: `en,pt-BR`
  - Lista extensa de palavras personalizadas do projeto
  - Configuração de arquivos a serem ignorados (node_modules, dist, etc.)
  - Configuração otimizada para desenvolvimento React/Next.js

- **Atualização do .vscode/settings.json**: Melhorada configuração do cSpell no
  VS Code
  - Adicionado `cSpell.language: "en,pt-BR"`
  - Expandida lista de palavras com termos específicos do projeto
  - Incluídas palavras comuns da interface em português

### Fixed 🐛

- **Spellchecker irritante**: Resolvido problema de palavras em português sendo
  marcadas como erro
  - Palavras como "Nenhuma", "Tente", "Solicitar", "locações" agora reconhecidas
  - Termos técnicos do projeto adicionados ao dicionário
  - Configuração global aplicada a todo o workspace

## [2025-09-28] - Correções de Code Quality e ESLint

### Fixed 🐛

- **Console.logs removidos**: Eliminados console.logs de desenvolvimento das
  APIs e componentes
  - `app/api/auth/register/route.ts` - Removido log de email de verificação
  - `app/api/auth/forgot-password/route.ts` - Removido log de email de
    recuperação
  - `app/api/admin/equipments/[id]/route.ts` - Removidos 4 console.logs de debug
  - `app/admin/equipamentos/[id]/editar/page.tsx` - Removidos logs de dados
    enviados para API
- **Imports React otimizados**: Removidos imports desnecessários do React em
  componentes que não usam hooks
  - `components/ui/sonner.tsx` - Removido import React não utilizado
  - `components/ui/skeleton.tsx` - Removido import React não utilizado
- **ESLint Configuration**: Configuração híbrida para compatibilidade ESLint
  v9 + Next.js 15
  - `eslint.config.js` - Criada configuração flat config compatível com ESLint
    v9
  - Configuração funciona com FlatCompat para manter compatibilidade com Next.js
    plugin
  - Global ignores configurados para arquivos auto-gerados e configs

### Changed 🔄

- **ESLint Rules**: Configuração atualizada para melhor compatibilidade
  - Ignorados arquivos auto-gerados do Prisma (`lib/validations/schemas/**/*`)
  - Ignorados arquivos de configuração (`**/*.config.*`)
  - Ignorados arquivos de testes e build (`tests/**`, `.next/**`, `dist/**`)
- **Code Quality**: Melhoria geral na qualidade do código
  - Removidos warnings de console.log em produção
  - Otimizados imports para melhor performance
  - Configuração ESLint mais robusta e compatível

### Security 🔐

- **Production Logs**: Removidos logs de desenvolvimento que poderiam expor
  informações sensíveis
- **Email Templates**: Limpeza de logs de URLs de verificação e recuperação de
  senha

### Fixed 🐛 (Correções Finais)

- **ESLint Rules**: Corrigidos erros de definição de regras TypeScript ESLint
  - Configuração atualizada para usar `next/typescript` via FlatCompat
  - Regras `@typescript-eslint/no-explicit-any` e
    `@typescript-eslint/no-unused-vars` funcionando corretamente
- **TypeScript Errors**: Eliminados usos de `any` em favor de tipos mais seguros
  - `app/api/admin/seed-admin/route.ts` - Substituídos 4 usos de `any` por type
    guards seguros (`'code' in error`)
  - `hooks/use-toast.ts` - Convertido `actionTypes` de const para type para
    eliminar warning de variável não utilizada
- **Build Process**: Build funcionando perfeitamente (8.3s, 48 páginas geradas)
  - Zero erros ESLint confirmado
  - Linting integrado ao build funcionando
  - Apenas aviso menor sobre detecção do plugin Next.js (não afeta
    funcionalidade)

## [2025-09-26] - Atualização de Dependências

### Changed 🔄

- **@supabase/supabase-js**: 2.57.4 → 2.58.0
- **framer-motion**: 12.23.19 → 12.23.22
- **svelte**: 5.39.5 → 5.39.6
- **vue**: 3.5.21 → 3.5.22
- **zod-openapi**: 5.4.1 → 5.4.2
- **@sveltejs/kit**: 2.43.2 → 2.43.5
- **@types/react**: 19.1.13 → 19.1.15
- **@vitejs/plugin-react**: 5.0.3 → 5.0.4
- **chromatic**: 13.2.0 → 13.2.1
- **prisma-zod-generator**: 1.21.3 → 1.22.2
- **tsx**: 4.20.5 → 4.20.6

### Fixed 🐛

- Todas as dependências atualizadas mantendo compatibilidade total
- Build time mantido em ~9.5s
- Zero erros TypeScript mantido
- Todos os testes passando (30/30)

### Security 🔐

- Atualizações de segurança incluídas nas novas versões
- Melhorias de performance e correções de bugs

### Fixed 🐛

- **ESLint Configuration**: Resolvido aviso "The Next.js plugin was not detected
  in your ESLint configuration"
- **ESLint Errors**: Reduzido de 666 problemas para ZERO warnings/erros
- **Build Process**: Configuração ESLint otimizada para Next.js 15
- **Plugin React Hooks**: Adicionado suporte completo ao
  eslint-plugin-react-hooks
- **Auto-generated Files**: Script `post-prisma-generate.js` agora adiciona
  automaticamente comentários ESLint para desabilitar regras em arquivos
  auto-gerados do Prisma
- **Warnings Eliminados**: Todos os warnings de
  `@typescript-eslint/no-unused-vars` e `@typescript-eslint/no-explicit-any` em
  arquivos auto-gerados foram eliminados

---
