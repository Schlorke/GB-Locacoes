'use client'

import type { LocalBusinessData } from '@/lib/structured-data-utils'

interface ProductData {
  name: string
  description: string
  image: string[]
  brand: string
  sku?: string
  offers: {
    price: number
    priceCurrency: string
    availability: string
    url: string
  }
  category: string
  manufacturer: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface StructuredDataProps {
  localBusiness?: LocalBusinessData
  product?: ProductData
  breadcrumbs?: BreadcrumbItem[]
}

export function StructuredData({
  localBusiness,
  product,
  breadcrumbs,
}: StructuredDataProps) {
  const schemas = []

  // Local Business Schema
  if (localBusiness) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://locacoesgb.com.br/#business',
      name: localBusiness.name,
      description: localBusiness.description,
      url: localBusiness.url,
      telephone: localBusiness.telephone,
      email: localBusiness.email,
      ...(localBusiness.taxID ? { taxID: localBusiness.taxID } : {}),
      ...(localBusiness.areaServed
        ? { areaServed: localBusiness.areaServed }
        : {}),
      address: {
        '@type': 'PostalAddress',
        streetAddress: localBusiness.address.streetAddress,
        addressLocality: localBusiness.address.addressLocality,
        addressRegion: localBusiness.address.addressRegion,
        postalCode: localBusiness.address.postalCode,
        addressCountry: localBusiness.address.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: localBusiness.geo.latitude,
        longitude: localBusiness.geo.longitude,
      },
      openingHours: localBusiness.openingHours,
      ...(localBusiness.contactPoints && localBusiness.contactPoints.length > 0
        ? {
            contactPoint: localBusiness.contactPoints.map((contactPoint) => ({
              '@type': 'ContactPoint',
              telephone: contactPoint.telephone,
              ...(contactPoint.contactType
                ? { contactType: contactPoint.contactType }
                : {}),
              ...(contactPoint.areaServed
                ? { areaServed: contactPoint.areaServed }
                : {}),
              ...(contactPoint.availableLanguage
                ? { availableLanguage: contactPoint.availableLanguage }
                : {}),
            })),
          }
        : {}),
      sameAs: localBusiness.sameAs,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Equipamentos para Locação',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'Andaimes Suspensos',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Equipamentos para Altura',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Betoneiras',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Compressores',
          },
        ],
      },
    })
  }

  // Product Schema
  if (product) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      sku: product.sku,
      category: product.category,
      manufacturer: {
        '@type': 'Organization',
        name: product.manufacturer,
      },
      offers: {
        '@type': 'Offer',
        price: product.offers.price,
        priceCurrency: product.offers.priceCurrency,
        availability: product.offers.availability,
        url: product.offers.url,
        seller: {
          '@type': 'Organization',
          name: 'GB Locações',
          url: 'https://locacoesgb.com.br',
        },
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0], // 1 ano
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '124',
        bestRating: '5',
        worstRating: '1',
      },
    })
  }

  // Breadcrumb Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    })
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
        />
      ))}
    </>
  )
}

// Re-export para compatibilidade com código existente
export {
  DEFAULT_LOCAL_BUSINESS,
  getLocalBusinessData,
} from '@/lib/structured-data-utils'
