'use client'

import FadeContent from './FadeContent'

export default function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <FadeContent delay={200}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Z</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Zenithly</h3>
              </div>
            </FadeContent>

            <FadeContent delay={400}>
              <p className="text-gray-300 mb-8 max-w-lg leading-relaxed">
                The ultimate social media management platform. Coming soon to revolutionize how you manage your social presence.
              </p>
            </FadeContent>
          </div>

          {/* Quick Links */}
          <FadeContent delay={600}>
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Product</h4>
              <ul className="space-y-4">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Integrations</a></li>
              </ul>
            </div>
          </FadeContent>

          {/* Company */}
          <FadeContent delay={800}>
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
          </FadeContent>
        </div>

        <FadeContent delay={1000}>
          <div className="border-t border-white/10 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Zenithly. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </footer>
  )
}