import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bidukbiduk.com'
  
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/place`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // TODO: Add dynamic routes from API
  // For now, we'll add placeholder dynamic routes
  // In production, fetch these from your backend
  const dynamicArticles = Array.from({ length: 10 }, (_, i) => ({
    url: `${baseUrl}/articles/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const dynamicHotels = Array.from({ length: 10 }, (_, i) => ({
    url: `${baseUrl}/hotels/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const dynamicPackages = Array.from({ length: 10 }, (_, i) => ({
    url: `${baseUrl}/packages/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const dynamicPlaces = Array.from({ length: 10 }, (_, i) => ({
    url: `${baseUrl}/place/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...dynamicArticles,
    ...dynamicHotels,
    ...dynamicPackages,
    ...dynamicPlaces,
  ]
}
