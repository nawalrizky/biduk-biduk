import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  locale?: string
}

export function generateSEOMetadata({
  title,
  description,
  path = '',
  image = '/images/home/hero/bg.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  tags = [],
  locale = 'id_ID'
}: SEOProps): Metadata {
  const baseUrl = 'https://bidukbiduk.com'
  const url = `${baseUrl}${path}`
  
  return {
    title,
    description,
    keywords: tags,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Biduk-Biduk Tourism',
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale,
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
      creator: '@bidukbiduk',
    },
    alternates: {
      canonical: url,
      languages: {
        'id': `${baseUrl}${path}?lang=id`,
        'en': `${baseUrl}${path}?lang=en`,
        'ar': `${baseUrl}${path}?lang=ar`,
        'zh': `${baseUrl}${path}?lang=zh`,
        'fr': `${baseUrl}${path}?lang=fr`,
        'es': `${baseUrl}${path}?lang=es`,
        'x-default': `${baseUrl}${path}`,
      },
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName = 'Biduk-Biduk Tourism',
  url
}: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  authorName?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: 'https://bidukbiduk.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Biduk-Biduk Tourism',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bidukbiduk.com/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }
}

export function generateTouristAttractionSchema({
  name,
  description,
  image,
  address,
  latitude,
  longitude,
  url
}: {
  name: string
  description: string
  image: string
  address: string
  latitude: string
  longitude: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name,
    description,
    image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Biduk-Biduk',
      addressRegion: 'Berau, Kalimantan Timur',
      addressCountry: 'ID',
      streetAddress: address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude
    },
    url,
    touristType: ['Nature Lovers', 'Adventure Seekers', 'Beach Enthusiasts'],
    isAccessibleForFree: false,
    publicAccess: true
  }
}

export function generateHotelSchema({
  name,
  description,
  image,
  address,
  telephone,
  priceRange,
  starRating,
  url
}: {
  name: string
  description: string
  image: string
  address: string
  telephone?: string
  priceRange: string
  starRating?: number
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name,
    description,
    image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Biduk-Biduk',
      addressRegion: 'Berau, Kalimantan Timur',
      addressCountry: 'ID',
      streetAddress: address
    },
    ...(telephone && { telephone }),
    priceRange,
    ...(starRating && {
      starRating: {
        '@type': 'Rating',
        ratingValue: starRating,
        bestRating: 5
      }
    }),
    url
  }
}

export function generateTourPackageSchema({
  name,
  description,
  image,
  price,
  priceCurrency = 'IDR',
  validFrom,
  validThrough,
  url,
  itinerary
}: {
  name: string
  description: string
  image: string
  price: number
  priceCurrency?: string
  validFrom: string
  validThrough: string
  url: string
  itinerary?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: 'Biduk-Biduk Tourism'
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency,
      price,
      priceValidUntil: validThrough,
      availability: 'https://schema.org/InStock',
      validFrom
    },
    category: 'Tourism Package',
    ...(itinerary && { itinerary })
  }
}
