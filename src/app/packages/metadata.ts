import { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Paket Wisata Biduk-Biduk | Tour Package Berau Kalimantan Timur',
  description: 'Pilih paket wisata terbaik untuk menjelajahi Biduk-Biduk dan Berau. Paket tour lengkap dengan harga terjangkau, termasuk akomodasi, transportasi, dan pemandu wisata.',
  path: '/packages',
  tags: [
    'paket wisata Biduk-Biduk',
    'tour package Berau',
    'paket liburan Kalimantan Timur',
    'wisata Labuan Cermin',
    'paket tour murah',
    'travel package Indonesia',
    'tour guide Berau'
  ]
})
