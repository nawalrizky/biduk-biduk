import { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Hotel di Biduk-Biduk | Penginapan Nyaman di Berau',
  description: 'Temukan hotel dan penginapan terbaik di Biduk-Biduk, Berau. Pilihan akomodasi nyaman dengan fasilitas lengkap untuk liburan Anda di Kalimantan Timur.',
  path: '/hotels',
  tags: [
    'hotel Biduk-Biduk',
    'penginapan Berau',
    'hotel Kalimantan Timur',
    'akomodasi Berau',
    'resort Biduk-Biduk',
    'homestay Berau',
    'booking hotel'
  ]
})
