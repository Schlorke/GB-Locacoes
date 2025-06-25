import { Suspense } from "react"
import Hero from "@/components/hero"
import FeaturedMaterials from "@/components/featured-materials"
import Categories from "@/components/categories"
import WhyChooseUs from "@/components/why-choose-us"
import ContactSection from "@/components/contact-section"

export const metadata = {
  title: "GB Locações - Locação de Equipamentos para Construção Civil",
  description:
    "Há 10 anos oferecendo soluções em locação de equipamentos para construção civil. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos especializados para obras e serviços em altura.",
  keywords:
    "locação equipamentos construção, andaimes suspensos, cadeira elétrica, equipamentos altura, gb locações, construção civil",
  openGraph: {
    title: "GB Locações - Locação de Equipamentos para Construção Civil",
    description:
      "Há 10 anos oferecendo soluções em locação de equipamentos para construção civil com segurança, qualidade e manutenção constante.",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <FeaturedMaterials />
      </Suspense>
      <WhyChooseUs />
      <ContactSection />
    </main>
  )
}
