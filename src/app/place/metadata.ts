import { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Tempat Wisata Biduk-Biduk | Destinasi Menarik di Berau',
  description: 'Jelajahi tempat-tempat wisata menakjubkan di Biduk-Biduk, Berau. Dari pantai eksotis, danau jernih, hingga keindahan alam yang masih asli di Kalimantan Timur.',
  path: '/place',
  tags: [
    'tempat wisata Biduk-Biduk',
    'destinasi Berau',
    'wisata alam Kalimantan',
    'pantai Biduk-Biduk',
    'danau Berau',
    'objek wisata',
    'tourist attractions'
  ]
})
