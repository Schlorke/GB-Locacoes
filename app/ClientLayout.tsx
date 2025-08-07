'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import ScrollRevealInit from '@/components/scroll-reveal-init'
import WhatsAppFAB from '@/components/whatsapp-fab'
import { Inter, Jost } from 'next/font/google'
import { usePathname } from 'next/navigation'
import React from 'react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: false,
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin') || false

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jost.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#334155" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        {!isAdminRoute && <Header />}
        <div
          className={`overflow-x-hidden min-h-screen ${!isAdminRoute ? 'pt-[100px] md:pt-[96px]' : ''}`}
        >
          {children}
        </div>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <WhatsAppFAB />}
        <ScrollRevealInit />
      </body>
    </html>
  )
}
