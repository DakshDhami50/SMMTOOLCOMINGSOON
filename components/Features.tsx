'use client'

import { BarChart3, Users, Zap, Shield, Smartphone, Globe } from 'lucide-react'
import FadeContent from './FadeContent'

const features = [
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Get detailed insights into your social media performance with comprehensive analytics.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team using collaborative tools and approval workflows.'
  },
  {
    icon: Zap,
    title: 'Smart Automation',
    description: 'Automate your social media posting and engagement with AI-powered scheduling.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with advanced encryption and compliance features.'
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Manage your social media on the go with our intuitive mobile app.'
  },
  {
    icon: Globe,
    title: 'Multi-Platform',
    description: 'Connect and manage all your social media accounts from one dashboard.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <FadeContent delay={200}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Everything You Need
            </h2>
          </FadeContent>
          <FadeContent delay={400}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to simplify your social media management.
            </p>
          </FadeContent>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeContent key={index} delay={200 + (index * 100)}>
              <div className="bg-black border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeContent>
          ))}
        </div>

        <FadeContent delay={800} className="text-center mt-16">
          <div className="bg-black border border-white/10 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already on our waitlist and be the first to experience the future of social media management.
            </p>
            <button className="bg-white text-black px-10 py-4 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300">
              Join Waitlist Now
            </button>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}