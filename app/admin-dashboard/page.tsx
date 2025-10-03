'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Users, Mail, TrendingUp, Settings, LogOut, Eye, EyeOff } from 'lucide-react'
import FadeContent from '@/components/FadeContent'
import TextPressure from '@/components/TextPressure'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [stats, setStats] = useState({
    totalUsers: 1247,
    waitlistSignups: 89,
    pageViews: 15420,
    conversionRate: 12.5
  })

  const ADMIN_PASSWORD = 'zenithly_admin_2024'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert('Invalid password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen animated-gradient flex items-center justify-center px-4">
        <FadeContent className="glass-dark rounded-2xl p-8 border border-white/20 glow max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 glow">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Admin Access</h2>
            <p className="text-gray-300">Enter password to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 pr-12"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full btn-modern glow-hover"
            >
              Access Dashboard
            </button>
          </form>
        </FadeContent>
      </div>
    )
  }

  return (
    <div className="min-h-screen animated-gradient">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10" style={{
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center glow">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <FadeContent delay={200}>
            <div className="mb-8">
              <TextPressure
                text="Dashboard"
                flex={true}
                alpha={false}
                stroke={true}
                width={false}
                weight={true}
                italic={false}
                textColor="#ffffff"
                strokeColor="#ef4444"
                minFontSize={48}
                className="h-20"
              />
            </div>
          </FadeContent>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <FadeContent delay={400}>
              <div className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-red-500/50 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Total Users</p>
                    <p className="text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>
            </FadeContent>

            <FadeContent delay={500}>
              <div className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Waitlist Signups</p>
                    <p className="text-3xl font-bold text-white">{stats.waitlistSignups}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>
            </FadeContent>

            <FadeContent delay={600}>
              <div className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Page Views</p>
                    <p className="text-3xl font-bold text-white">{stats.pageViews.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </div>
            </FadeContent>

            <FadeContent delay={700}>
              <div className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Conversion Rate</p>
                    <p className="text-3xl font-bold text-white">{stats.conversionRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </div>
            </FadeContent>
          </div>

          {/* Charts Section */}
          <FadeContent delay={800}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-dark rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Analytics Overview</h3>
                <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <div className="glass-dark rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">New waitlist signup</span>
                    <span className="text-gray-500 text-sm ml-auto">2m ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Page view spike</span>
                    <span className="text-gray-500 text-sm ml-auto">15m ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Feature request</span>
                    <span className="text-gray-500 text-sm ml-auto">1h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeContent>
        </div>
      </main>
    </div>
  )
}
