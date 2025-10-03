'use client'

import { useEffect, useRef, useState } from 'react'

interface TextPressureProps {
  text: string
  flex?: boolean
  alpha?: boolean
  stroke?: boolean
  width?: boolean
  weight?: boolean
  italic?: boolean
  textColor?: string
  strokeColor?: string
  minFontSize?: number
  className?: string
}

const TextPressure: React.FC<TextPressureProps> = ({
  text,
  flex = false,
  alpha = false,
  stroke = false,
  width = false,
  weight = false,
  italic = false,
  textColor = '#ffffff',
  strokeColor = '#6366f1',
  minFontSize = 36,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !dimensions.width || !dimensions.height) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size with high DPI support
    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Set text properties
    const fontSize = Math.max(minFontSize, Math.min(dimensions.width / 8, 120))
    const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    ctx.font = `${italic ? 'italic ' : ''}${weight ? 'bold ' : ''}${fontSize}px ${fontFamily}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Position text in center
    const x = dimensions.width / 2
    const y = dimensions.height / 2

    // Draw shadow/background text if stroke is enabled
    if (stroke) {
      ctx.fillStyle = strokeColor + '20'
      ctx.fillText(text, x + 2, y + 2)
      
      ctx.fillStyle = strokeColor + '40'
      ctx.fillText(text, x + 1, y + 1)
    }

    // Draw main text
    ctx.fillStyle = textColor
    ctx.fillText(text, x, y)

    // Add glow effect
    if (stroke) {
      ctx.shadowColor = strokeColor
      ctx.shadowBlur = 20
      ctx.fillStyle = textColor
      ctx.fillText(text, x, y)
      ctx.shadowBlur = 0
    }

  }, [text, textColor, strokeColor, minFontSize, dimensions, stroke, weight, italic])

  return (
    <div className={`${flex ? 'flex items-center justify-center' : ''} ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}

export default TextPressure
