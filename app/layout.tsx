import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zenithly - Social Media Management Platform | Run Your Agency in One Place',
  description: 'Centralize assets, onboard clients with AI summaries, manage content calendars, and deliver reports. The ultimate social media management platform for agencies.',
  keywords: 'social media management, agency tools, content calendar, client onboarding, social media reports, AI summaries, brand management, social media agency',
  authors: [{ name: 'Zenithly Team' }],
  creator: 'Zenithly',
  publisher: 'Zenithly',
  robots: 'index, follow',
  openGraph: {
    title: 'Zenithly - Social Media Management Platform',
    description: 'Run your social media agency in one place. Centralize assets, onboard clients, manage content, and deliver reports.',
    type: 'website',
    locale: 'en_US',
    url: 'https://zenithly.com',
    siteName: 'Zenithly',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenithly - Social Media Management Platform',
    description: 'Run your social media agency in one place. Centralize assets, onboard clients, manage content, and deliver reports.',
    creator: '@zenithlyin',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6366f1',
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
