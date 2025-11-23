/**
 * Registro do Service Worker para GB-Locações
 *
 * Responsável por:
 * 1. Registrar o Service Worker
 * 2. Gerenciar atualizações
 * 3. Fornecer funções utilitárias para comunicação
 *
 * @version 1.0.0
 */

/**
 * Registra o Service Worker
 * Deve ser chamado no client-side apenas (useEffect, etc.)
 */
export async function registerServiceWorker() {
  // Verifica se o navegador suporta Service Worker
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('[SW] Service Worker não suportado neste navegador')
    return null
  }

  // Verifica se está em desenvolvimento
  const isDev = process.env.NODE_ENV === 'development'

  try {
    // Registra o Service Worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    })

    console.log('[SW] Service Worker registrado com sucesso')

    // Verifica se há atualização disponível
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing

      if (!newWorker) return

      newWorker.addEventListener('statechange', () => {
        if (
          newWorker.state === 'installed' &&
          navigator.serviceWorker.controller
        ) {
          // Nova versão disponível
          console.log('[SW] Nova versão disponível')

          if (isDev) {
            // Em desenvolvimento, atualiza automaticamente
            newWorker.postMessage({ type: 'SKIP_WAITING' })
          } else {
            // Em produção, pode notificar o usuário (opcional)
            console.log('[SW] Recarregue a página para obter a nova versão')
          }
        }
      })
    })

    // Escuta mensagens do Service Worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('[SW] Mensagem recebida:', event.data)
    })

    // Recarrega quando o novo Service Worker assume o controle
    let refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return
      refreshing = true
      console.log('[SW] Novo Service Worker assumiu o controle')

      if (!isDev) {
        // Em produção, pode recarregar automaticamente (opcional)
        // window.location.reload()
      }
    })

    return registration
  } catch (error) {
    console.error('[SW] Erro ao registrar Service Worker:', error)
    return null
  }
}

/**
 * Desregistra o Service Worker
 * Útil para debug ou quando não for mais necessário
 */
export async function unregisterServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration()

    if (registration) {
      const success = await registration.unregister()
      console.log('[SW] Service Worker desregistrado:', success)
      return success
    }

    return false
  } catch (error) {
    console.error('[SW] Erro ao desregistrar Service Worker:', error)
    return false
  }
}

/**
 * Limpa o cache do Service Worker
 * Força o Service Worker a buscar recursos novamente
 */
export async function clearServiceWorkerCache(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration()

    if (!registration || !registration.active) {
      console.log('[SW] Nenhum Service Worker ativo')
      return false
    }

    return new Promise((resolve) => {
      if (!registration.active) {
        resolve(false)
        return
      }

      const messageChannel = new MessageChannel()

      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.success || false)
      }

      registration.active.postMessage({ type: 'CLEAR_CACHE' }, [
        messageChannel.port2,
      ])
    })
  } catch (error) {
    console.error('[SW] Erro ao limpar cache:', error)
    return false
  }
}

/**
 * Obtém o tamanho do cache
 * Retorna o número de recursos cacheados
 */
export async function getCacheSize(): Promise<number> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return 0
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration()

    if (!registration || !registration.active) {
      return 0
    }

    return new Promise((resolve) => {
      if (!registration.active) {
        resolve(0)
        return
      }

      const messageChannel = new MessageChannel()

      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.size || 0)
      }

      registration.active.postMessage({ type: 'GET_CACHE_SIZE' }, [
        messageChannel.port2,
      ])
    })
  } catch (error) {
    console.error('[SW] Erro ao obter tamanho do cache:', error)
    return 0
  }
}

/**
 * Verifica se o Service Worker está ativo
 */
export async function isServiceWorkerActive(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration()
    return !!(registration && registration.active)
  } catch {
    return false
  }
}
