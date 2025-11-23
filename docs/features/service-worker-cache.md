# 🔧 Service Worker - Cache Inteligente para Drei Assets

## 📋 Visão Geral

Sistema de cache inteligente usando Service Worker para resolver o problema de
rate limiting (429) do GitHub ao carregar recursos do drei-assets.

## 🎯 Problema Resolvido

- **Antes**: Requisições diretas ao GitHub → Rate limiting (429) → Aplicação
  quebrava
- **Depois**: Cache inteligente no navegador → Zero requisições após primeira
  vez → Aplicação sempre funciona

## 🏗️ Arquitetura

### Componentes

```
public/sw.js                          # Service Worker principal
lib/sw-register.ts                    # Funções de registro e gerenciamento
components/service-worker-register.tsx # Componente React para registro
app/ClientLayout.tsx                  # Integração no layout
app/api/drei-proxy/[...path]/route.ts # Fallback proxy (já existente)
```

### Fluxo de Funcionamento

```
1. Usuário acessa a página
   ↓
2. Service Worker é registrado automaticamente
   ↓
3. drei tenta buscar HDR do GitHub
   ↓
4. Service Worker intercepta a requisição
   ↓
5. Verifica cache local primeiro
   ├─ Se tem cache: ✅ Retorna imediatamente (instantâneo)
   └─ Se não tem cache:
      ├─ Tenta buscar do GitHub
      ├─ Se sucesso: Cacheia e retorna
      └─ Se falhar (429): Usa proxy local como fallback
```

## 📊 Estratégia de Cache

### Cache First, Network Fallback

- **Ideal para**: Recursos estáticos que raramente mudam (HDRs)
- **Vantagem**: Performance máxima após primeiro acesso
- **Desvantagem**: Requer limpeza manual para forçar atualização

## 🚀 Uso

### Registro Automático

O Service Worker é registrado automaticamente quando a aplicação carrega. Não
requer configuração manual.

### Funções Disponíveis

```typescript
import {
  registerServiceWorker,
  unregisterServiceWorker,
  clearServiceWorkerCache,
  getCacheSize,
  isServiceWorkerActive
} from "@/lib/sw-register"

// Registrar (já feito automaticamente)
await registerServiceWorker()

// Desregistrar (útil para debug)
await unregisterServiceWorker()

// Limpar cache (força nova busca)
await clearServiceWorkerCache()

// Verificar tamanho do cache
const size = await getCacheSize()
console.log(`Cache contém ${size} recursos`)

// Verificar se está ativo
const active = await isServiceWorkerActive()
console.log(`Service Worker ativo: ${active}`)
```

## 📈 Performance

### Primeira Vez (Cold Start)

- Registro do SW: ~50-100ms (assíncrono, não bloqueia)
- Busca HDR: Tempo normal (vai ao GitHub ou proxy)
- Total: Imperceptível

### Próximas Vezes (Cache Hit)

- Registro do SW: Já está ativo
- Busca HDR: Instantâneo (cache local)
- Total: 0ms de requisições de rede ✅

### Comparação

| Cenário     | Sem SW     | Com SW (1ª vez) | Com SW (cache) |
| ----------- | ---------- | --------------- | -------------- |
| Tempo       | 2-5s       | 2-5s + 50ms     | ~0ms           |
| Requisições | Toda vez   | 1 vez           | 0              |
| Rate Limit  | Alto risco | Baixo risco     | Sem risco      |

## 🔍 Debug

### Console Logs

O Service Worker imprime logs úteis no console:

```
[SW] Service Worker registrado com sucesso
[SW] Interceptando requisição: https://raw.githubusercontent.com/...
[SW] ✅ Servindo do cache: forest_slope_1k.hdr
[SW] ⚠️ Cache miss, buscando da rede: studio_small_03_1k.hdr
[SW] 💾 Cache atualizado: studio_small_03_1k.hdr
[SW] 🔄 Tentando proxy local devido a erro 429
```

### Chrome DevTools

1. Abra DevTools (F12)
2. Vá para **Application** → **Service Workers**
3. Verifique status: "activated and is running"
4. Vá para **Cache Storage** → **gb-locacoes-drei-assets-v1**
5. Veja todos os recursos cacheados

### Limpeza Manual

```javascript
// No console do navegador:
await clearServiceWorkerCache()
location.reload()
```

## 🔄 Atualização

### Versionamento

O cache usa versão (`CACHE_NAME = 'gb-locacoes-drei-assets-v1'`).

Para forçar atualização em todos os usuários:

1. Altere a versão em `public/sw.js`:
   ```javascript
   const CACHE_NAME = "gb-locacoes-drei-assets-v2"
   ```
2. Faça deploy
3. Navegadores detectarão automaticamente e atualizarão

### Comportamento

- **Desenvolvimento**: Atualiza automaticamente
- **Produção**: Atualiza ao recarregar página

## 🛡️ Segurança

### Requisitos

- ✅ HTTPS obrigatório (Vercel já fornece)
- ✅ Same-origin ou CORS configurado
- ✅ Sem avisos de segurança
- ✅ Tecnologia padrão e amplamente suportada

### Compatibilidade

| Navegador | Suporte                       |
| --------- | ----------------------------- |
| Chrome    | ✅ Sim                        |
| Firefox   | ✅ Sim                        |
| Safari    | ✅ Sim                        |
| Edge      | ✅ Sim                        |
| Opera     | ✅ Sim                        |
| IE 11     | ❌ Não (graceful degradation) |

## 🎯 Resolução do Problema

### Antes (com rate limiting)

```
Usuário 1: GitHub → 200 OK
Usuário 2: GitHub → 200 OK
Usuário 3: GitHub → 200 OK
...
Usuário 50: GitHub → 429 TOO MANY REQUESTS ❌ (quebra)
```

### Depois (com Service Worker)

```
Usuário 1: GitHub → Cache → 200 OK ✅
Usuário 1 (próximas): Cache → 200 OK ✅ (instantâneo)
Usuário 2: GitHub → Cache → 200 OK ✅
Usuário 2 (próximas): Cache → 200 OK ✅ (instantâneo)
...
Todos os usuários: Cache local ✅ (zero requisições ao GitHub)
```

## 📝 Notas Importantes

1. **Cache Persistente**: O cache persiste entre sessões até ser limpo
   manualmente ou o navegador decidir limpar.

2. **Fallback para Proxy**: Se o GitHub retornar 429, o Service Worker
   automaticamente tenta usar o proxy local.

3. **Sem Impacto Visual**: O usuário não percebe o Service Worker funcionando.
   Tudo é transparente.

4. **Manutenção Zero**: Após a implementação, funciona automaticamente sem
   necessidade de manutenção.

5. **Graceful Degradation**: Se o navegador não suportar Service Worker, a
   aplicação continua funcionando normalmente (sem cache).

## 🔗 Recursos Adicionais

- [MDN: Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Google: Service Worker Lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
- [Can I Use: Service Workers](https://caniuse.com/serviceworkers)

## 📅 Histórico

- **v1.0.0** (Nov 2025): Implementação inicial com cache inteligente e fallback
  para proxy

---

**Implementado por**: GB-Locações Team **Data**: Novembro 2025 **Status**: ✅
Ativo e Funcionando
