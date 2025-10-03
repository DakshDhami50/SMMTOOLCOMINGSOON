'use client'

import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import FadeContent from './FadeContent'
import ZLogo from './ZLogo'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleWaitlist = () => setIsWaitlistOpen(!isWaitlistOpen)

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md smooth-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <FadeContent delay={200} className="flex-shrink-0">
              <div className="hover-scale">
                <ZLogo size={40} />
              </div>
            </FadeContent>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <FadeContent delay={400}>
                  <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/10 rounded-lg">
                    Features
                  </a>
                </FadeContent>
                <FadeContent delay={500}>
                  <a href="#pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/10 rounded-lg">
                    Pricing
                  </a>
                </FadeContent>
                <FadeContent delay={600}>
                  <button
                    onClick={toggleWaitlist}
                    className="btn-modern glow-hover"
                  >
                    Join Waitlist
                  </button>
                </FadeContent>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white focus:outline-none focus:text-white transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <FadeContent className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-dark border-t border-white/10">
                <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-white/10">
                  Features
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-white/10">
                  Pricing
                </a>
                <button
                  onClick={toggleWaitlist}
                  className="w-full text-left btn-modern mt-2"
                >
                  Join Waitlist
                </button>
              </div>
            </FadeContent>
          )}
        </div>
      </nav>

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
