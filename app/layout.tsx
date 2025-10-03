import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../components/GradualBlur.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zenithly - Social Media Management Platform',
  description: 'The ultimate social media management platform coming soon. Join our waitlist to be the first to experience the future of social media management.',
  keywords: 'social media, management, platform, coming soon, waitlist',
  authors: [{ name: 'Zenithly Team' }],
  openGraph: {
    title: 'Zenithly - Social Media Management Platform',
    description: 'The ultimate social media management platform coming soon.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenithly - Social Media Management Platform',
    description: 'The ultimate social media management platform coming soon.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
