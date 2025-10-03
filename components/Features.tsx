'use client'

import { BarChart3, Users, Zap, Shield, Smartphone, Globe } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Get detailed insights into your social media performance with our comprehensive analytics dashboard.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team using our collaborative tools and approval workflows.'
  },
  {
    icon: Zap,
    title: 'Smart Automation',
    description: 'Automate your social media posting and engagement with our AI-powered scheduling tools.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with advanced encryption and compliance features for your peace of mind.'
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Manage your social media on the go with our intuitive mobile app for iOS and Android.'
  },
  {
    icon: Globe,
    title: 'Multi-Platform',
    description: 'Connect and manage all your social media accounts from one unified dashboard.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zenithly provides all the tools you need to manage, analyze, and grow your social media presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <feature.icon size={24} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
