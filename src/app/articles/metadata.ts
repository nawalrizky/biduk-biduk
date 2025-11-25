import { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Artikel Wisata Biduk-Biduk | Panduan Lengkap Destinasi Berau',
  description: 'Baca artikel menarik tentang destinasi wisata, tips perjalanan, dan panduan lengkap untuk menjelajahi Biduk-Biduk dan sekitarnya di Berau, Kalimantan Timur.',
  path: '/articles',
  tags: [
    'artikel wisata',
    'blog wisata Berau',
    'tips traveling',
    'panduan wisata Biduk-Biduk',
    'informasi destinasi',
    'travel guide Indonesia'
  ]
})
