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
  strokeColor = '#ff0000',
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

    // Set canvas size
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set text properties
    const fontSize = Math.max(minFontSize, dimensions.width / 10)
    ctx.font = `${italic ? 'italic ' : ''}${weight ? 'bold ' : ''}${fontSize}px Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Calculate text metrics
    const textMetrics = ctx.measureText(text)
    const textWidth = textMetrics.width
    const textHeight = fontSize

    // Position text in center
    const x = canvas.width / 2
    const y = canvas.height / 2

    // Draw stroke if enabled
    if (stroke) {
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 2
      ctx.strokeText(text, x, y)
    }

    // Draw main text
    ctx.fillStyle = textColor
    ctx.fillText(text, x, y)

    // Add width variation if enabled
    if (width) {
      ctx.font = `${italic ? 'italic ' : ''}${weight ? 'bold ' : ''}${fontSize * 1.2}px Arial, sans-serif`
      ctx.fillStyle = textColor + '40' // Add alpha
      ctx.fillText(text, x, y)
    }

  }, [text, textColor, strokeColor, minFontSize, dimensions, stroke, weight, italic, width])

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
