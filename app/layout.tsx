import type React from 'react';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next'; // ✅ Importado aqui
import ClientLayout from './ClientLayout';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://gblocacoes.com.br'),
  title: {
    default: 'GB Locações - Especializada em Locação de Equipamentos para Construção Civil',
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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
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
    url: 'https://gblocacoes.com.br',
    siteName: 'GB Locações',
    title: 'GB Locações - Especializada em Locação de Equipamentos para Construção Civil',
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
    title: 'GB Locações - Especializada em Locação de Equipamentos para Construção Civil',
    description:
      'Há 10 anos oferecendo soluções em locação de equipamentos para construção civil com segurança, qualidade e manutenção constante.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  generator: 'v0.dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      {children}
      <SpeedInsights /> {/* ✅ Aqui dentro do ClientLayout, depois dos children */}
    </ClientLayout>
  );
}
