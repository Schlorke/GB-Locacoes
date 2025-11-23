/**
 * Service Worker para GB-Locações
 *
 * Objetivo: Cachear recursos do drei-assets (HDRs) para evitar rate limiting (429) do GitHub
 *
 * Estratégia:
 * 1. Intercepta requisições ao raw.githubusercontent.com/pmndrs/drei-assets
 * 2. Verifica cache local primeiro
 * 3. Se não tiver cache, busca da rede e cacheia
 * 4. Cache persiste entre sessões
 *
 * @version 1.0.0
 * @author GB-Locações
 */

// Nome do cache - versionar para forçar atualização quando necessário
const CACHE_NAME = 'gb-locacoes-drei-assets-v1'

// Padrão de URLs para interceptar
const DREI_ASSETS_PATTERN = /raw\.githubusercontent\.com\/pmndrs\/drei-assets/

// Estratégia de cache: Cache First, Network Fallback
// Ideal para recursos estáticos que raramente mudam (HDRs)

/**
 * Evento de instalação do Service Worker
 * Executado na primeira vez e quando há uma nova versão
 */
self.addEventListener('install', (_event) => {
  console.log('[SW] Service Worker instalado')

  // Força o Service Worker a se tornar ativo imediatamente
  self.skipWaiting()
})

/**
 * Evento de ativação do Service Worker
 * Executado após a instalação
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker ativado')

  // Limpa caches antigos
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Remove caches que não são a versão atual
            return (
              cacheName.startsWith('gb-locacoes-drei-assets-') &&
              cacheName !== CACHE_NAME
            )
          })
          .map((cacheName) => {
            console.log('[SW] Removendo cache antigo:', cacheName)
            return caches.delete(cacheName)
          })
      )
    })
  )

  // Assume controle de todas as páginas imediatamente
  return self.clients.claim()
})

/**
 * Evento de fetch - intercepta todas as requisições
 * Aqui implementamos a estratégia de cache
 */
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = request.url

  // Verifica se é uma requisição para o drei-assets
  if (!DREI_ASSETS_PATTERN.test(url)) {
    // Não é drei-assets, deixa passar normalmente
    return
  }

  console.log('[SW] Interceptando requisição:', url)

  // Estratégia: Cache First, Network Fallback
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        // 1. Tenta buscar do cache primeiro
        const cachedResponse = await cache.match(request)

        if (cachedResponse) {
          console.log('[SW] ✅ Servindo do cache:', url)
          return cachedResponse
        }

        console.log('[SW] ⚠️ Cache miss, buscando da rede:', url)

        // 2. Se não tem no cache, busca da rede
        const networkResponse = await fetch(request, {
          // Adiciona headers para melhor compatibilidade
          headers: {
            'User-Agent': 'GB-Locacoes/1.0',
          },
        })

        // Verifica se a resposta é válida
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type === 'error'
        ) {
          console.error(
            '[SW] ❌ Resposta inválida da rede:',
            networkResponse.status
          )

          // Se tiver erro 429, tenta usar o proxy local
          if (networkResponse && networkResponse.status === 429) {
            console.log('[SW] 🔄 Tentando proxy local devido a erro 429')
            return tryProxyFallback(url, cache)
          }

          return networkResponse
        }

        // 3. Clona a resposta (necessário porque a resposta só pode ser consumida uma vez)
        const responseToCache = networkResponse.clone()

        // 4. Armazena no cache para próximas requisições
        cache
          .put(request, responseToCache)
          .then(() => {
            console.log('[SW] 💾 Cache atualizado:', url)
          })
          .catch((error) => {
            console.error('[SW] ⚠️ Erro ao cachear:', error)
          })

        // 5. Retorna a resposta da rede
        console.log('[SW] ✅ Servindo da rede:', url)
        return networkResponse
      } catch (error) {
        console.error('[SW] ❌ Erro no fetch:', error)

        // Tenta usar o proxy local como fallback
        return tryProxyFallback(url, cache)
      }
    })
  )
})

/**
 * Tenta usar o proxy local como fallback quando o GitHub falha
 * @param {string} originalUrl - URL original do GitHub
 * @param {Cache} cache - Instância do cache
 * @returns {Promise<Response>} - Resposta do proxy ou erro
 */
async function tryProxyFallback(originalUrl, cache) {
  try {
    // Extrai o caminho do recurso da URL do GitHub
    const match = originalUrl.match(/drei-assets\/[a-f0-9]+\/(.+)$/)

    if (!match) {
      throw new Error('Não foi possível extrair o caminho do recurso')
    }

    const resourcePath = match[1]
    const proxyUrl = `${self.location.origin}/api/drei-proxy/${resourcePath}`

    console.log('[SW] 🔄 Tentando proxy:', proxyUrl)

    const proxyResponse = await fetch(proxyUrl)

    if (proxyResponse.ok) {
      console.log('[SW] ✅ Proxy funcionou!')

      // Cacheia a resposta do proxy também
      const responseToCache = proxyResponse.clone()
      cache.put(originalUrl, responseToCache).catch((error) => {
        console.error('[SW] ⚠️ Erro ao cachear resposta do proxy:', error)
      })

      return proxyResponse
    }

    throw new Error(`Proxy retornou status ${proxyResponse.status}`)
  } catch (error) {
    console.error('[SW] ❌ Proxy fallback falhou:', error)

    // Retorna uma resposta de erro
    return new Response('Failed to load resource', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}

/**
 * Evento de mensagem - permite comunicação com a página
 * Útil para invalidar cache ou obter estatísticas
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        console.log('[SW] Cache limpo manualmente')
        event.ports[0].postMessage({ success: true })
      })
    )
  }

  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        const keys = await cache.keys()
        event.ports[0].postMessage({ size: keys.length })
      })
    )
  }
})
