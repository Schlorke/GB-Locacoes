'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import ScrollRevealInit from '@/components/scroll-reveal-init'
import { Toaster } from '@/components/ui/sonner-toaster'
import WhatsAppFAB from '@/components/whatsapp-fab'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin') || false

  return (
    <div data-scroll-behavior="smooth" suppressHydrationWarning>
      {!isAdminRoute && <Header />}
      <div
        className={`overflow-x-hidden min-h-screen ${!isAdminRoute ? 'pt-[100px] md:pt-[96px]' : ''}`}
        suppressHydrationWarning
      >
        {children}
      </div>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFAB />}
      <ScrollRevealInit />
      <Toaster />
    </div>
  )
}
