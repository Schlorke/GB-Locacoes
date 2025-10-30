import ContactSection from '@/components/contact-section'
import Hero from '@/components/hero'
import HomePageClient from '@/components/home-page-client'
import WhyChooseUs from '@/components/why-choose-us'
import { StructuredData } from '@/components/structured-data'
import { getLocalBusinessData } from '@/lib/structured-data-utils'

export const metadata = {
  title: 'GB Locações - Locação de Equipamentos para Construção Civil',
  description:
    'Há 10 anos oferecendo soluções em locação de equipamentos para construção civil. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos especializados para obras e serviços em altura.',
  keywords:
    'locação equipamentos construção, andaimes suspensos, cadeira elétrica, equipamentos altura, gb locações, construção civil',
  openGraph: {
    title: 'GB Locações - Locação de Equipamentos para Construção Civil',
    description:
      'Há 10 anos oferecendo soluções em locação de equipamentos para construção civil com segurança, qualidade e manutenção constante.',
    type: 'website',
  },
}

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
