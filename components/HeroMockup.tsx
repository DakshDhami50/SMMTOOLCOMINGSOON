'use client'

export default function HeroMockup() {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Mockup container */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"></div>
            <span className="text-white font-semibold">Zenithly</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Run your social media agency in one place
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Centralize assets, onboard clients with simple questions and AI summaries, 
            manage your content calendar, gather approvals, and deliver monthly reports.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Get started
            </button>
            <button className="px-6 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Explore features
            </button>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-400 rounded"></div>
                </div>
                <h3 className="text-white font-semibold">Centralized Assets</h3>
              </div>
              <p className="text-gray-300 text-sm">Store brand kits, b-roll, briefs, and ready-to-post content.</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
                <h3 className="text-white font-semibold">Client Onboarding</h3>
              </div>
              <p className="text-gray-300 text-sm">Send a link with simple questions and receive an AI summary.</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-purple-400 rounded"></div>
                </div>
                <h3 className="text-white font-semibold">Reports & Timing</h3>
              </div>
              <p className="text-gray-300 text-sm">Monthly reports and best time to post analysis.</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-orange-400 rounded"></div>
                </div>
                <h3 className="text-white font-semibold">Content Calendar</h3>
              </div>
              <p className="text-gray-300 text-sm">Manage content, assign editors, track statuses.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10"></div>
    </div>
  )
}
