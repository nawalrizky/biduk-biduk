import { Metadata } from 'next'
import { metadata as baseMetadata } from './metadata'

export const metadata: Metadata = {
    ...baseMetadata,
    robots: {
        index: false,
        follow: true,
    },
}

export default function HotelsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
