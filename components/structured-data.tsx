'use client'

interface LocalBusinessData {
  name: string
  description: string
  url: string
  telephone: string
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
  telephone: '+55 51 9999-9999', // Substitua pelo telefone real
  email: 'contato@locacoesgb.com.br',
  address: {
    streetAddress: 'Rua dos Equipamentos, 123', // Substitua pelo endereço real
    addressLocality: 'Porto Alegre',
    addressRegion: 'RS',
    postalCode: '90000-000', // Substitua pelo CEP real
    addressCountry: 'BR',
  },
  geo: {
    latitude: -30.0346, // Coordenadas aproximadas de Porto Alegre
    longitude: -51.2177,
  },
  openingHours: ['Mo-Fr 08:00-18:00', 'Sa 08:00-12:00'],
  sameAs: [
    'https://www.facebook.com/locacoesgb', // Substitua pelas redes sociais reais
    'https://www.instagram.com/locacoesgb',
    'https://api.whatsapp.com/send?phone=5551999999999', // Substitua pelo WhatsApp real
  ],
}
