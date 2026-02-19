import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Hubungi Kami | Biduk-Biduk Tourism',
    description: 'Hubungi tim Biduk-Biduk Tourism untuk informasi lebih lanjut mengenai wisata, paket tour, dan penginapan di Berau, Kalimantan Timur.',
    robots: {
        index: false,
        follow: true,
    },
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
