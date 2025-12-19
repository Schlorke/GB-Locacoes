# Troubleshooting - Referência Rápida

> **Propósito**: Este documento lista os problemas mais comuns e suas soluções
> rápidas. Para problemas detalhados e histórico completo, consulte
> `docs/issues/known-issues.md`.

---

## Problemas de Build e Dependências

### "Invalid url postgresql://...": Currently, only Data Proxy supported (P6001)

**Causa**: Variável `PRISMA_GENERATE_DATAPROXY="false"` presente no ambiente
força `engine=none`. Em JavaScript, `Boolean("false") === true`, então mesmo
`="false"` ativa Data Proxy mode.

**Solução**: **REMOVER COMPLETAMENTE** a variável do `.env` - não apenas
defini-la como "false".

**Verificação**: `npx prisma generate` deve mostrar `engine=binary`, não
`engine=none`.

**Detalhes**: Consulte `docs/internal/prisma-6-15-engine-none-analysis.md`.

---

### "Module not found: Can't resolve '@/lib/validations'"

**Causa**: Prisma generate deletou o arquivo `lib/validations/index.ts`.

**Solução**: Execute `node scripts/post-prisma-generate.js` ou
`pnpm db:generate`.

**Prevenção**: Script automático configurado em `package.json`.

---

### "TypeScript errors em massa (42+ erros)"

**Causa**: Tipos `unknown`, `any`, navegação insegura em objetos.

**Solução**: Use interfaces específicas, safe navigation (`?.`), type guards.

**Exemplo**: `req.headers?.['content-length']` em vez de
`req.headers['content-length']`.

---

### "ESLint overwhelming errors (31k+ problemas)"

**Causa**: Arquivos auto-gerados do Prisma incluídos no linting.

**Solução**: Adicionar patterns em `eslint.config.js` ignores.

**Status**: Já resolvido - configuração atualizada exclui
`lib/validations/schemas/**`.

---

### "Build failing com 'Did not initialize yet'"

**Causa**: PNPM + Next.js 16 + Prisma incompatibilidade.

**Solução**: Use NPM para melhor compatibilidade.

---

### "Swagger UI React errors com React 19"

**Causa**: swagger-ui-react não compatível com React 19.

**Solução**: Implementação custom em `app/api-docs/page.tsx`.

---

## Problemas de UI/UX

### "Autocomplete dropdown atrás de outras seções"

**Causa**: Z-index insuficiente ou stacking context incorreto.

**Solução**: Container com `z-[var(--layer-dropdown)]`, dropdown com
`z-[var(--layer-popover)]`, remover `overflow-hidden`.

**Prevenção**: Sempre criar novo stacking context com `relative`.

**Detalhes**: Consulte `docs/features/autocomplete-search.md`.

---

### "Input não atualiza após seleção no autocomplete"

**Causa**: React batching e timing de eventos com blur.

**Solução**: `useCallback` com `setTimeout`, mudar para `onMouseDown`.

**Força update**: `inputRef.current.value = equipment.name` quando necessário.

**Detalhes**: Consulte `docs/features/autocomplete-search.md`.

---

### "Erro pricePerDay.toFixed is not a function"

**Causa**: Prisma retorna Decimal como string/objeto.

**Solução**: `Number(equipment.pricePerDay).toFixed(2)`.

**Prevenção**: Sempre converter Decimal para Number antes de métodos numéricos.

---

## Problemas de Animação

### "Dessincronização de Animações Hero (Flash de imagem)"

**Causa**: Flash de imagem aparecia antes do conteúdo após reset de cache.

**Solução**: Evento customizado `scrollRevealReady` para sincronizar Framer
Motion com scroll-reveal-init.

**Detalhes**: Consulte `docs/issues/known-issues.md`.

---

## Compatibilidades Críticas

| Dependência  | Versão Estável | Notas                                                         |
| :----------- | :------------- | :------------------------------------------------------------ |
| Prisma       | 7.1.0          | Usar com adapter-pg                                           |
| Tailwind CSS | 3.4.17         | NÃO atualizar para 4.x (incompatível com Next 16 + Turbopack) |
| Next.js      | 16.0.3         | App Router                                                    |
| React        | 19.1.1         | Verificar compatibilidade de libs                             |

---

## Comandos Úteis

```bash
# Verificar datas reais de commits
git log --pretty=format:"%h %ad %s" --date=short -10

# Regenerar cliente Prisma
pnpm db:generate

# Verificar tipos
pnpm type-check

# Lint com auto-fix
pnpm lint:fix
```

---

_Para problemas não listados aqui, consulte `docs/issues/known-issues.md`._
