import SessionProviderWrapper from '@/components/session-provider-wrapper'
import { prisma } from '@/lib/prisma'
import { Analytics } from '@vercel/analytics/next' // ✅ Vercel Analytics
import { SpeedInsights } from '@vercel/speed-insights/next' // ✅ Importado aqui
import type { Metadata } from 'next'
import { Inter, Jost } from 'next/font/google'
import Script from 'next/script'
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
  // Valores padrão caso não existam no banco ou durante CI build
  const defaultAboutUs =
    'Há 10 anos oferecendo soluções em locação de equipamentos para obras e serviços em altura. Segurança, qualidade e manutenção constante.'
  const defaultTitle =
    'GB Locações - Especializada em Locação de Equipamentos para Construção Civil'

  let settings = null
  try {
    // Buscar configurações do banco (pode falhar no CI)
    settings = await prisma.setting.findFirst({
      select: {
        aboutUsText: true,
        seoTitle: true,
        seoDescription: true,
      },
    })
  } catch (_error) {
    // Ignorar erro durante build no CI
    console.log('Using default metadata (database not available)')
  }

  const description = settings?.aboutUsText || defaultAboutUs
  const title = settings?.seoTitle || defaultTitle

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
          url: 'https://locacoesgb.com.br/gb-locacoes-og.png',
          width: 1200,
          height: 630,
          alt: 'GB Locações - Locação de Equipamentos para Construção Civil',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [
        {
          url: 'https://locacoesgb.com.br/gb-locacoes-og.png',
          alt: 'GB Locações - Locação de Equipamentos para Construção Civil',
        },
      ],
      creator: '@locacoesgb',
      site: '@locacoesgb',
    },
    verification: {
      google: 'google-site-verification-code',
    },
    generator: 'v0.dev',
    other: {
      'theme-color': '#334155', // Cor do status bar para iOS/Android
      'apple-mobile-web-app-status-bar-style': 'light-content',
      // Meta tags específicas do LinkedIn para garantir compatibilidade
      'og:image:secure_url': 'https://locacoesgb.com.br/gb-locacoes-og.png',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/png',
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
      <head>
        {/* Suprimir warning de depreciação do Zustand vindo de dependências da Vercel */}
        <Script id="suppress-zustand-warning" strategy="beforeInteractive">
          {`
            (function() {
              if (typeof window === 'undefined') return;
              if (window.__gbSuppressZustandWarning__) return;

              window.__gbSuppressZustandWarning__ = true;

              const shouldSuppress = function(...args) {
                // Converte todos os argumentos para string e junta
                const fullMessage = args
                  .map(arg => {
                    if (typeof arg === 'string') return arg;
                    if (typeof arg === 'object' && arg !== null) {
                      try {
                        return JSON.stringify(arg);
                      } catch {
                        return String(arg);
                      }
                    }
                    return String(arg);
                  })
                  .join(' ')
                  .toLowerCase();

                // Verifica múltiplos padrões para capturar todas as variações
                const patterns = [
                  '[deprecated]',
                  'deprecated',
                  'default export',
                  'default export is deprecated',
                  'import { create }',
                  'zustand'
                ];

                // Deve conter pelo menos 3 dos padrões para ser o warning do Zustand
                const matches = patterns.filter(pattern =>
                  fullMessage.includes(pattern)
                ).length;

                return matches >= 3 && fullMessage.includes('zustand');
              };

              const originalWarn = console.warn;
              const originalError = console.error;
              const originalLog = console.log;

              console.warn = function(...args) {
                if (shouldSuppress(...args)) {
                  return; // Suprimir warning do Zustand
                }
                originalWarn.apply(console, args);
              };

              console.error = function(...args) {
                if (shouldSuppress(...args)) {
                  return; // Suprimir warning do Zustand
                }
                originalError.apply(console, args);
              };

              // Alguns warnings podem vir como console.log
              console.log = function(...args) {
                if (shouldSuppress(...args)) {
                  return; // Suprimir warning do Zustand
                }
                originalLog.apply(console, args);
              };
            })();
          `}
        </Script>
      </head>
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
