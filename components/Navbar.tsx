'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleWaitlist = () => setIsWaitlistOpen(!isWaitlistOpen)

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">Zenithly</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                  Pricing
                </a>
                <button
                  onClick={toggleWaitlist}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                <a href="#features" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium">
                  Features
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 text-base font-medium">
                  Pricing
                </a>
                <button
                  onClick={toggleWaitlist}
                  className="w-full text-left bg-indigo-600 text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-indigo-700 transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Waitlist</h2>
            <p className="text-gray-600 mb-6">
              Be the first to know when Zenithly launches and get early access to our platform.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your company name"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={toggleWaitlist}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
