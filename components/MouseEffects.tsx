'use client'

import { useEffect, useState } from 'react'

export default function MouseEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Mouse trail */}
      <div
        className="mouse-trail"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Cursor glow effects */}
      <style jsx global>{`
        * {
          cursor: none;
        }
        
        body {
          cursor: none;
        }
        
        a, button, input, textarea, select {
          cursor: none;
        }
        
        .cursor-pointer {
          cursor: none;
        }
      `}</style>
    </>
  )
}
