'use client'

import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-modern glow-hover px-8 py-3 text-lg font-semibold flex items-center gap-2 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="glass border border-white/20 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
