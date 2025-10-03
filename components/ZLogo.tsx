'use client'

export default function ZLogo({ size = 40 }: { size?: number }) {
  return (
    <div 
      className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400 flex items-center justify-center shadow-lg"
      style={{ width: size, height: size }}
    >
      <span className="text-white font-black text-lg">Z</span>
    </div>
  )
}
