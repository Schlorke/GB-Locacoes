import ContactSection from '@/components/contact-section'
import Hero from '@/components/hero'
import HomePageClient from '@/components/home-page-client'
import { StructuredData } from '@/components/structured-data'
import WhyChooseUs from '@/components/why-choose-us'
import { getLocalBusinessData } from '@/lib/structured-data-utils'

// Metadata removido daqui - usando metadata dinâmico do layout.tsx
// O layout.tsx já busca do banco de dados e gera metadata completo

async function getPrisma() {
  const { prisma } = await import('@/lib/prisma')
  return prisma
}

type WaveAnimationSetting = 'none' | 'static' | 'animated'

type HeroInitialSettings = {
  heroCarousel: Array<{ imageUrl: string }>
  waveAnimation: WaveAnimationSetting
}

function parseHeroCarousel(value: unknown): Array<{ imageUrl: string }> {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null
      }

      const imageUrl = (item as { imageUrl?: unknown }).imageUrl

      if (typeof imageUrl !== 'string') {
        return null
      }

      const trimmed = imageUrl.trim()

      if (!trimmed) {
        return null
      }

      return { imageUrl: trimmed }
    })
    .filter((item): item is { imageUrl: string } => item !== null)
}

function normalizeWaveAnimation(value: unknown): WaveAnimationSetting {
  if (value === 'none' || value === 'static' || value === 'animated') {
    return value
  }

  return 'animated'
}

function buildHeroInitialSettings(data: {
  heroCarousel?: unknown
  waveAnimation?: unknown
}): HeroInitialSettings {
  return {
    heroCarousel: parseHeroCarousel(data.heroCarousel),
    waveAnimation: normalizeWaveAnimation(data.waveAnimation),
  }
}

export default async function HomePage() {
  const prisma = await getPrisma()

  let publicSettings = null
  try {
    publicSettings = await prisma.setting.findFirst({
      select: {
        companyPhone: true,
        whatsappNumber: true,
        contactEmail: true,
        companyAddress: true,
        heroCarousel: true,
        waveAnimation: true,
        aboutUsText: true,
      },
    })
  } catch (_error) {
    // Ignorar erro durante build no CI
    console.log('Using default settings (database not available)')
  }

  const localBusinessData = getLocalBusinessData(publicSettings || undefined)
  const heroInitialSettings = buildHeroInitialSettings({
    heroCarousel: publicSettings?.heroCarousel,
    waveAnimation: publicSettings?.waveAnimation,
  })

  return (
    <>
      <StructuredData localBusiness={localBusinessData} />
      <main>
        <Hero initialSettings={heroInitialSettings} />
        <HomePageClient />
        <WhyChooseUs />
        <ContactSection />
      </main>
    </>
  )
}
