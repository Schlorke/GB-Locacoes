'use client'

import { registerServiceWorker } from '@/lib/sw-register'
import { useEffect } from 'react'

/**
 * Componente para registrar o Service Worker
 * Deve ser incluído no layout principal
 *
 * Funciona apenas no client-side e não bloqueia a renderização
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    // Registra o Service Worker após a página carregar
    // Usa setTimeout para não bloquear a inicialização
    const timer = setTimeout(() => {
      registerServiceWorker()
        .then((registration) => {
          if (registration) {
            console.log('✅ Service Worker ativo e pronto')
          }
        })
        .catch((error) => {
          console.error('❌ Erro ao registrar Service Worker:', error)
        })
    }, 1000) // Aguarda 1 segundo após a página carregar

    return () => clearTimeout(timer)
  }, [])

  // Componente não renderiza nada na UI
  return null
}
