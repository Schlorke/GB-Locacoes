'use client'

interface LocalBusinessData {
  name: string
  description: string
  url: string
  telephone: string
  taxID?: string
  areaServed?: string
  email: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  openingHours: string[]
  contactPoints?: Array<{
    contactType?: string
    telephone: string
    areaServed?: string
    availableLanguage?: string
  }>
  sameAs: string[]
}

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

// Default data for GB Locações
export const DEFAULT_LOCAL_BUSINESS: LocalBusinessData = {
  name: 'GB Locações',
  description:
    'Especializada em locação de equipamentos para construção civil em Porto Alegre há mais de 10 anos. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos para altura.',
  url: 'https://locacoesgb.com.br',
  telephone: '+55 51 2313-6262',
  taxID: '34.780.330/0001-69',
  areaServed: 'Porto Alegre e região metropolitana',
  email: 'contato@locacoesgb.com.br',
  address: {
    streetAddress: 'Travessa Doutor Heinzelmann, 365',
    addressLocality: 'Porto Alegre',
    addressRegion: 'RS',
    postalCode: '90240-100',
    addressCountry: 'BR',
  },
  geo: {
    latitude: -29.993933,
    longitude: -51.198314,
  },
  openingHours: ['Mo-Fr 08:00-18:00', 'Sa 08:00-12:00'],
  contactPoints: [
    {
      contactType: 'Serviço ao cliente',
      telephone: '+55 51 2313-6262',
      areaServed: 'Porto Alegre e região metropolitana',
      availableLanguage: 'Português',
    },
    {
      contactType: 'Atendimento via WhatsApp',
      telephone: '+55 51 99820-5163',
      areaServed: 'Porto Alegre e região metropolitana',
      availableLanguage: 'Português',
    },
  ],
  sameAs: [
    'https://www.facebook.com/locacoesgb',
    'https://www.instagram.com/locacoesgb',
    'https://api.whatsapp.com/send?phone=5551998205163',
  ],
}
