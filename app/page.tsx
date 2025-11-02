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

export default async function HomePage() {
  const prisma = await getPrisma()
  const settings = await prisma.setting.findFirst({
    select: {
      companyPhone: true,
      whatsappNumber: true,
      contactEmail: true,
      companyAddress: true,
      aboutUsText: true,
    },
  })

  const localBusinessData = getLocalBusinessData(settings || undefined)

  return (
    <>
      <StructuredData localBusiness={localBusinessData} />
      <main>
        <Hero />
        <HomePageClient />
        <WhyChooseUs />
        <ContactSection />
      </main>
    </>
  )
}
