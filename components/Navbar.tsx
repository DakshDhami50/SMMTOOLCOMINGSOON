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
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <FadeContent delay={200} className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <ZLogo size={40} />
                <span className="text-2xl font-bold text-white">Zenithly</span>
              </div>
            </FadeContent>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <FadeContent delay={400}>
                  <a href="#features" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-300">
                    Features
                  </a>
                </FadeContent>
                <FadeContent delay={500}>
                  <a href="#pricing" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-all duration-300">
                    Pricing
                  </a>
                </FadeContent>
                <FadeContent delay={600}>
                  <button
                    onClick={toggleWaitlist}
                    className="bg-white text-black px-6 py-3 text-sm font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                  >
                    Join Waitlist
                  </button>
                </FadeContent>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-white hover:text-gray-300 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-white hover:text-gray-300 py-2 text-lg font-medium">
                Features
              </a>
              <a href="#pricing" className="block text-white hover:text-gray-300 py-2 text-lg font-medium">
                Pricing
              </a>
              <button
                onClick={toggleWaitlist}
                className="w-full bg-white text-black px-6 py-3 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <FadeContent className="bg-black border border-white/20 rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Join Our Waitlist</h2>
              <p className="text-gray-300">
                Be the first to know when Zenithly launches.
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                  placeholder="Enter your company name"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={toggleWaitlist}
                  className="flex-1 px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold"
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