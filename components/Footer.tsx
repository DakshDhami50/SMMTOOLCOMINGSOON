import { Sparkles, Twitter, Linkedin, Github, Mail } from 'lucide-react'
import FadeContent from './FadeContent'

export default function Footer() {
  return (
    <footer className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <FadeContent delay={200}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center glow">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold gradient-text">Zenithly</h3>
              </div>
            </FadeContent>

            <FadeContent delay={400}>
              <p className="text-gray-300 mb-8 max-w-lg leading-relaxed text-lg">
                The ultimate social media management platform. Coming soon to revolutionize how you manage your social presence.
              </p>
            </FadeContent>

            <FadeContent delay={600}>
              <div className="flex space-x-6">
                <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-500/20 transition-all duration-300 group">
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-500/20 transition-all duration-300 group">
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-500/20 transition-all duration-300 group">
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-500/20 transition-all duration-300 group">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </FadeContent>
          </div>

          {/* Quick Links */}
          <FadeContent delay={800}>
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Product</h4>
              <ul className="space-y-4">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Features
                </a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Pricing
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  API
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Integrations
                </a></li>
              </ul>
            </div>
          </FadeContent>

          {/* Support */}
          <FadeContent delay={1000}>
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Help Center
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Contact Us
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Status
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Community
                </a></li>
              </ul>
            </div>
          </FadeContent>
        </div>

        <FadeContent delay={1200}>
          <div className="border-t border-white/10 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 Zenithly. All rights reserved.
              </p>
              <div className="flex space-x-8">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </footer>
  )
}
