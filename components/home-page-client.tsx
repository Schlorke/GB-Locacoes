'use client'

import dynamic from 'next/dynamic'

const EquipmentShowcaseSection = dynamic(
  () => import('./equipment-showcase-section'),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  }
)

const FeaturedMaterials = dynamic(() => import('./featured-materials'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
})

export default function HomePageClient() {
  return (
    <>
      <EquipmentShowcaseSection />
      <FeaturedMaterials />
    </>
  )
}
