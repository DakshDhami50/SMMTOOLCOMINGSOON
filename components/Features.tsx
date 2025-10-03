'use client'

import { BarChart3, Users, Zap, Shield, Smartphone, Globe, Sparkles } from 'lucide-react'
import FadeContent from './FadeContent'
import TextPressure from './TextPressure'

const features = [
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Get detailed insights into your social media performance with our comprehensive analytics dashboard.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team using our collaborative tools and approval workflows.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-400'
  },
  {
    icon: Zap,
    title: 'Smart Automation',
    description: 'Automate your social media posting and engagement with our AI-powered scheduling tools.',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    iconColor: 'text-yellow-400'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with advanced encryption and compliance features for your peace of mind.',
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500/10',
    iconColor: 'text-red-400'
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Manage your social media on the go with our intuitive mobile app for iOS and Android.',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-400'
  },
  {
    icon: Globe,
    title: 'Multi-Platform',
    description: 'Connect and manage all your social media accounts from one unified dashboard.',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Minimal Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-blue-500/2 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <FadeContent delay={200}>
            <div className="mb-8">
              <TextPressure
                text="Features"
                flex={true}
                alpha={false}
                stroke={true}
                width={false}
                weight={true}
                italic={false}
                textColor="#ffffff"
                strokeColor="#8b5cf6"
                minFontSize={48}
                className="h-20"
              />
            </div>
          </FadeContent>

          <FadeContent delay={400}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="gradient-text block mt-2">Succeed</span>
            </h2>
          </FadeContent>

          <FadeContent delay={600}>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Zenithly provides all the tools you need to manage, analyze, and grow your social media presence.
            </p>
          </FadeContent>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeContent key={index} delay={200 + (index * 100)}>
              <div className="glass-dark rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 group hover:transform hover:scale-105 glow-hover">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 glow`}>
                    <feature.icon size={32} className={feature.iconColor} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover effect gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              </div>
            </FadeContent>
          ))}
        </div>

        {/* Call to action */}
        <FadeContent delay={1000} className="text-center mt-20">
          <div className="glass-dark rounded-2xl p-12 border border-white/10 glow">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center glow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Social Media?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already on our waitlist and be the first to experience the future of social media management.
            </p>
            <button className="btn-modern glow-hover px-10 py-4 text-lg font-semibold">
              Join Waitlist Now
            </button>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}
