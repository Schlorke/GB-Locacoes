'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import ScrollRevealInit from '@/components/scroll-reveal-init'
import { ServiceWorkerRegister } from '@/components/service-worker-register'
import { Toaster } from '@/components/ui/sonner-toaster'
import WhatsAppFAB from '@/components/whatsapp-fab'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin') || false

  // Suprimir warning de depreciação do Zustand vindo de dependências externas
  // (Vercel Analytics/Speed Insights ainda usam sintaxe antiga internamente)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return // Early return para SSR - não fazer nada no servidor
    }

    // Interceptar console.warn de forma mais robusta
    const originalWarn = console.warn
    const originalError = console.error
    const originalLog = console.log

    const shouldSuppress = (...args: unknown[]): boolean => {
      // Converte todos os argumentos para string e junta
      const fullMessage = args
        .map((arg) => {
          if (typeof arg === 'string') return arg
          if (typeof arg === 'object' && arg !== null) {
            try {
              return JSON.stringify(arg)
            } catch {
              return String(arg)
            }
          }
          return String(arg)
        })
        .join(' ')
        .toLowerCase()

      // Verifica múltiplos padrões para capturar todas as variações
      const patterns = [
        '[deprecated]',
        'deprecated',
        'default export',
        'default export is deprecated',
        'import { create }',
        'zustand',
      ]

      // Deve conter pelo menos 3 dos padrões para ser o warning do Zustand
      const matches = patterns.filter((pattern) =>
        fullMessage.includes(pattern)
      ).length

      return matches >= 3 && fullMessage.includes('zustand')
    }

    console.warn = (...args: unknown[]) => {
      if (shouldSuppress(...args)) {
        return // Não exibir este warning
      }
      originalWarn.apply(console, args)
    }

    // Também verificar console.error caso o warning seja emitido como erro
    console.error = (...args: unknown[]) => {
      if (shouldSuppress(...args)) {
        return // Não exibir este warning
      }
      originalError.apply(console, args)
    }

    // Alguns warnings podem vir como console.log
    console.log = (...args: unknown[]) => {
      if (shouldSuppress(...args)) {
        return // Não exibir este warning
      }
      originalLog.apply(console, args)
    }

    return () => {
      console.warn = originalWarn
      console.error = originalError
      console.log = originalLog
    }
  }, [])

  return (
    <div data-scroll-behavior="smooth" suppressHydrationWarning>
      {!isAdminRoute && <Header />}
      <div
        className={`overflow-x-hidden min-h-screen ${
          !isAdminRoute ? 'pt-[104px]' : ''
        }`}
      >
        {children}
      </div>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFAB />}
      <ScrollRevealInit />
      <ServiceWorkerRegister />
      <Toaster />
    </div>
  )
}
