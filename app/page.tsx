import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import GradualBlur from '@/components/GradualBlur'

export const metadata: Metadata = {
  title: 'Zenithly - Social Media Management Platform',
  description: 'The ultimate social media management platform coming soon. Join our waitlist to be the first to experience the future of social media management.',
}

export default function Home() {
  return (
    <main className="min-h-screen animated-gradient relative overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
      
      {/* Add subtle blur effects */}
      <GradualBlur
        target="parent"
        position="top"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
        className="pointer-events-none"
      />
    </main>
  )
}
