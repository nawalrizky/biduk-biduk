import { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Amenitas di Biduk-Biduk | Hotel, Resto, Cafe & Fasilitas di Berau',
  description: 'Temukan amenitas terbaik di Biduk-Biduk, Berau. Hotel, resto, cafe, dan berbagai fasilitas lengkap untuk liburan Anda di Kalimantan Timur.',
  path: '/hotels',
  tags: [
    'amenitas Biduk-Biduk',
    'hotel Berau',
    'resto Biduk-Biduk',
    'cafe Berau',
    'fasilitas Kalimantan Timur',
    'akomodasi Berau',
    'resort Biduk-Biduk'
  ]
})
