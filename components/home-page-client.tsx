'use client'

import dynamic from 'next/dynamic'

const Categories = dynamic(() => import('./categories'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
})

const FeaturedMaterials = dynamic(() => import('./featured-materials'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
})

export default function HomePageClient() {
  return (
    <>
      <Categories />
      <FeaturedMaterials />
    </>
  )
}
