'use client'

export default function ZLogo({ size = 40 }: { size?: number }) {
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Gradient background circle */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl"></div>
      
      {/* Z letter */}
      <div className="relative z-10">
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          className="text-white"
        >
          <path
            d="M4 4h16l-8 8 8 8H4l8-8-8-8z"
            fill="currentColor"
            className="drop-shadow-sm"
          />
        </svg>
      </div>
    </div>
  )
}
