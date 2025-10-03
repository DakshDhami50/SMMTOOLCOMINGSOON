'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Sparkles, Zap, Shield } from 'lucide-react'
import TextPressure from './TextPressure'
import FadeContent from './FadeContent'
import GradualBlur from './GradualBlur'

export default function Hero() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const toggleWaitlist = () => setIsWaitlistOpen(!isWaitlistOpen)

  return (
    <>
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <FadeContent delay={200}>
              <div className="mb-8">
                <TextPressure
                  text="Zenithly"
                  flex={true}
                  alpha={false}
                  stroke={true}
                  width={false}
                  weight={true}
                  italic={false}
                  textColor="#ffffff"
                  strokeColor="#6366f1"
                  minFontSize={64}
                  className="h-32"
                />
              </div>
            </FadeContent>

            <FadeContent delay={400}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                The Future of
                <span className="gradient-text block mt-2">
                  Social Media Management
                </span>
              </h1>
            </FadeContent>

            <FadeContent delay={600}>
              <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Zenithly is coming soon! Join thousands of businesses already on our waitlist 
                to be the first to experience the most powerful social media management platform.
              </p>
            </FadeContent>
            
            <FadeContent delay={800}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <button
                  onClick={toggleWaitlist}
                  className="btn-modern glow-hover px-10 py-4 text-lg font-semibold flex items-center gap-3 group"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Join Waitlist
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="glass border border-white/20 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-3 group">
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Learn More
                </button>
              </div>
            </FadeContent>

            <FadeContent delay={1000}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 group">
                  <div className="flex items-center justify-center gap-3 text-gray-300 group-hover:text-white">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-400" />
                    </div>
                    <span className="font-medium">Free Forever Plan</span>
                  </div>
                </div>
                <div className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 group">
                  <div className="flex items-center justify-center gap-3 text-gray-300 group-hover:text-white">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Shield size={20} className="text-blue-400" />
                    </div>
                    <span className="font-medium">No Credit Card Required</span>
                  </div>
                </div>
                <div className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 group">
                  <div className="flex items-center justify-center gap-3 text-gray-300 group-hover:text-white">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Zap size={20} className="text-purple-400" />
                    </div>
                    <span className="font-medium">Early Access</span>
                  </div>
                </div>
              </div>
            </FadeContent>
          </div>
        </div>

        {/* Gradual Blur Effect */}
        <GradualBlur
          position="bottom"
          height="8rem"
          strength={2}
          divCount={8}
          curve="ease-out"
          opacity={0.9}
          className="pointer-events-none"
        />
      </section>

      {/* Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <FadeContent className="glass-dark rounded-2xl max-w-md w-full p-8 border border-white/20 glow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Join Our Waitlist</h2>
              <p className="text-gray-300">
                Be the first to know when Zenithly launches and get early access to our platform.
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your company name"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={toggleWaitlist}
                  className="flex-1 px-6 py-3 border border-white/20 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 btn-modern glow-hover"
                >
                  Join Waitlist
                </button>
              </div>
            </form>
          </FadeContent>
        </div>
      )}
    </>
  )
}
