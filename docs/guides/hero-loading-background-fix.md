# 🐛 Hero Background Flash - Diagnóstico e Solução

## 📋 Visão Geral

- **Componente afetado:** `components/hero.tsx`
- **Severidade:** Alta — primeira impressão da homepage comprometida
- **Status:** ✅ Corrigido em 2025-11-03
- **Commits relacionados:** `a62869fc`, `dcf14f7e`, `ba84a51a`, `74b3da6a`,
  correção definitiva atual

## 🎯 Sintoma

Quando o carrossel do Hero não possui imagens configuradas (estado resetado ou
instalação nova), a página exibia:

1. **Primeiro paint:** fundo branco (`bg-slate-50`)
2. **Após ~100–300 ms:** transição para gradiente laranja

Resultado: flash visual branco → laranja perceptível para o usuário.

## 🔍 Causa Raiz

1. O hook `usePublicSettings` inicia com `isLoading = true` e
   `heroCarousel = []`.
2. O Hero utiliza `hasImages = carouselImages.length > 0` para definir o
   background.
3. Durante o loading o componente fazia
   `return <section className="bg-slate-50" />`.
4. Quando o fetch terminava e confirmava que não havia imagens, o background
   mudava para o gradiente laranja.

Essa sequência trazia uma race condition visual: não havia dados suficientes no
primeiro render para decidir corretamente qual cor usar.

## 🧰 Solução Implementada

### 1. Hidratação Inicial do Hook

- `usePublicSettings` agora aceita `initialData`.
- Quando valores iniciais são fornecidos, o hook inicia com `isLoading = false`.
- Se o fetch posterior retornar dados diferentes, o estado é sincronizado
  normalmente.

### 2. Passagem de Dados do Servidor

- `app/page.tsx` consulta o Prisma (`heroCarousel`, `waveAnimation`) e normaliza
  o JSON vindo do banco.
- Os valores são repassados para `<Hero initialSettings={...} />`.

### 3. Previsão de Fundo Durante o Loading

- `Hero` calcula `hasInitialImages` a partir das props pré-carregadas.
- Enquanto `isLoading` for `true`, a cor de fundo usa `hasInitialImages` como
  fallback seguro:
  - **Com imagens preexistentes:** fundo branco desde o SSR → imagens fazem
    fade-in.
  - **Sem imagens:** gradiente laranja consistente, sem flash.

## 🗂️ Arquivos Atualizados

- `hooks/use-public-settings.ts`
- `components/hero.tsx`
- `app/page.tsx`
- `CHANGELOG.md`

## ✅ Testes e Validação

- `npm run type-check`
- Teste manual:
  1. Resetar carrossel no admin → homepage continua laranja sem flashes.
  2. Configurar imagens → homepage permanece branca desde o first paint.
  3. Alternar rapidamente entre estados para garantir ausência de flicker.

## 🔄 Manutenção

- Sempre que o modelo de settings receber novos campos que impactem o Hero,
  lembrar de incluí-los na prop `initialSettings`.
- Ao tocar no hook `usePublicSettings`, garantir que o contrato de `initialData`
  permaneça compatível.
- Caso o fetch `/api/settings/public` passe a incluir dados assíncronos
  adicionais (ex: banners dinâmicos), revisar se o fallback inicial continua
  cobrindo todos os estados.

---

_Última atualização: 2025-11-03_
