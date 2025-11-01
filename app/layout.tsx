import SessionProviderWrapper from '@/components/session-provider-wrapper'
import { prisma } from '@/lib/prisma'
import { Analytics } from '@vercel/analytics/next'; // ✅ Vercel Analytics
import { SpeedInsights } from '@vercel/speed-insights/next'; // ✅ Importado aqui
import type { Metadata } from 'next'
import { Inter, Jost } from 'next/font/google'
import React from 'react'
import ClientLayout from './ClientLayout'
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

// Gerar metadados dinâmicos a partir do banco de dados
export async function generateMetadata(): Promise<Metadata> {
  // Buscar configurações do banco
  const settings = await prisma.setting.findFirst({
    select: {
      aboutUsText: true,
      seoTitle: true,
      seoDescription: true,
    },
  })

  // Valores padrão caso não existam no banco
  const defaultAboutUs =
    'Há 10 anos oferecendo soluções em locação de equipamentos para construção civil. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos para serviços em altura. Atendimento especializado em Porto Alegre.'

  const description = settings?.aboutUsText || defaultAboutUs
  const title =
    settings?.seoTitle ||
    'GB Locações - Especializada em Locação de Equipamentos para Construção Civil'

  return {
    metadataBase: new URL('https://locacoesgb.com.br'),
    title: {
      default: title,
      template: '%s | GB Locações',
    },
    description: description,
    keywords: [
      'locação equipamentos construção',
      'andaimes suspensos',
      'cadeira elétrica',
      'equipamentos altura',
      'gb locações',
      'construção civil porto alegre',
      'locação equipamentos obras',
    ],
    authors: [{ name: 'GB Locações' }],
    creator: 'GB Locações',
    publisher: 'GB Locações',
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/favicon.ico',
      apple: '/favicon.svg',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: 'https://locacoesgb.com.br',
      siteName: 'GB Locações',
      title: title,
      description: description,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'GB Locações - Locação de Equipamentos para Construção Civil',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/og-image.jpg'],
    },
    verification: {
      google: 'google-site-verification-code',
    },
    generator: 'v0.dev',
    other: {
      'theme-color': '#334155', // Cor do status bar para iOS/Android
      'apple-mobile-web-app-status-bar-style': 'light-content',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background font-sans antialiased"
        suppressHydrationWarning
      >
        <SessionProviderWrapper>
          <ClientLayout>
            {children}
            <SpeedInsights />
            <Analytics />
          </ClientLayout>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
