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

    const shouldSuppress = (message: string): boolean => {
      const lowerMessage = message.toLowerCase()
      return (
        (lowerMessage.includes('[deprecated]') ||
          lowerMessage.includes('deprecated')) &&
        (lowerMessage.includes('default export') ||
          lowerMessage.includes('default export is deprecated')) &&
        lowerMessage.includes('zustand')
      )
    }

    console.warn = (...args: unknown[]) => {
      const message = String(args[0] || '')
      // Suprimir apenas o warning específico do Zustand
      if (shouldSuppress(message)) {
        return // Não exibir este warning
      }
      originalWarn.apply(console, args)
    }

    // Também verificar console.error caso o warning seja emitido como erro
    console.error = (...args: unknown[]) => {
      const message = String(args[0] || '')
      if (shouldSuppress(message)) {
        return // Não exibir este warning
      }
      originalError.apply(console, args)
    }

    return () => {
      console.warn = originalWarn
      console.error = originalError
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
