'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function Hero() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const toggleWaitlist = () => setIsWaitlistOpen(!isWaitlistOpen)

  return (
    <>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              The Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {' '}Social Media Management
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Zenithly is coming soon! Join thousands of businesses already on our waitlist 
              to be the first to experience the most powerful social media management platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={toggleWaitlist}
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                Join Waitlist
                <ArrowRight size={20} />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <CheckCircle size={20} className="text-green-500" />
                <span>Free Forever Plan</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <CheckCircle size={20} className="text-green-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <CheckCircle size={20} className="text-green-500" />
                <span>Early Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
