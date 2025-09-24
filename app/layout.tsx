import { SpeedInsights } from '@vercel/speed-insights/next' // ✅ Importado aqui
import { Analytics } from '@vercel/analytics/next' // ✅ Vercel Analytics
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

export const metadata: Metadata = {
  metadataBase: new URL('https://locacoesgb.com.br'),
  title: {
    default:
      'GB Locações - Especializada em Locação de Equipamentos para Construção Civil',
    template: '%s | GB Locações',
  },
  description:
    'Há 10 anos oferecendo soluções em locação de equipamentos para construção civil. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos para serviços em altura. Atendimento especializado em Porto Alegre.',
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
    title:
      'GB Locações - Especializada em Locação de Equipamentos para Construção Civil',
    description:
      'Há 10 anos oferecendo soluções em locação de equipamentos para construção civil com segurança, qualidade e manutenção constante.',
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
    title:
      'GB Locações - Especializada em Locação de Equipamentos para Construção Civil',
    description:
      'Há 10 anos oferecendo soluções em locação de equipamentos para construção civil com segurança, qualidade e manutenção constante.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jost.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ClientLayout>
          {children}
          <SpeedInsights />
          <Analytics />
        </ClientLayout>
      </body>
    </html>
  )
}
