import { useEffect, useRef } from 'react'

const PETAL_COUNT = 38

// SVG paths for different petal shapes
const PETAL_SHAPES = [
  // Classic oval petal
  (ctx, size) => {
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.38, size * 0.65, 0, 0, Math.PI * 2)
    ctx.fill()
  },
  // Rounded teardrop petal
  (ctx, size) => {
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.65)
    ctx.bezierCurveTo(size * 0.4, -size * 0.3, size * 0.45, size * 0.3, 0, size * 0.65)
    ctx.bezierCurveTo(-size * 0.45, size * 0.3, -size * 0.4, -size * 0.3, 0, -size * 0.65)
    ctx.fill()
  },
  // Heart-shaped mini petal
  (ctx, size) => {
    const s = size * 0.45
    ctx.beginPath()
    ctx.moveTo(0, s * 0.5)
    ctx.bezierCurveTo(-s * 1.0, -s * 0.2, -s * 1.0, -s * 1.1, 0, -s * 0.6)
    ctx.bezierCurveTo(s * 1.0, -s * 1.1, s * 1.0, -s * 0.2, 0, s * 0.5)
    ctx.fill()
  },
]

const COLORS = [
  'rgba(255, 182, 193, alpha)', // light pink
  'rgba(255, 153, 180, alpha)', // hot pink light
  'rgba(244, 167, 185, alpha)', // rose
  'rgba(255, 192, 203, alpha)', // pink
  'rgba(232, 116, 154, alpha)', // deep rose
  'rgba(255, 218, 230, alpha)', // blush
  'rgba(249, 140, 170, alpha)', // salmon pink
]

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function createPetal(canvasWidth, canvasHeight, i) {
  const size = randomBetween(10, 28)
  return {
    x: randomBetween(-60, canvasWidth + 60),
    y: randomBetween(-canvasHeight * 0.5, -size), // start above viewport
    size,
    speedY: randomBetween(0.6, 2.0),
    speedX: randomBetween(-0.7, 0.7),
    rotationSpeed: randomBetween(-0.025, 0.025),
    rotation: randomBetween(0, Math.PI * 2),
    wobbleSpeed: randomBetween(0.008, 0.022),
    wobbleAmplitude: randomBetween(18, 55),
    wobbleOffset: randomBetween(0, Math.PI * 2),
    alpha: randomBetween(0.35, 0.82),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shapeIndex: Math.floor(Math.random() * PETAL_SHAPES.length),
    age: randomBetween(0, 1), // stagger initial positions
    canvasHeight,
    canvasWidth,
  }
}

function resetPetal(petal) {
  petal.x = randomBetween(-60, petal.canvasWidth + 60)
  petal.y = randomBetween(-80, -20)
  petal.speedY = randomBetween(0.6, 2.0)
  petal.speedX = randomBetween(-0.7, 0.7)
  petal.rotationSpeed = randomBetween(-0.025, 0.025)
  petal.size = randomBetween(10, 28)
  petal.wobbleSpeed = randomBetween(0.008, 0.022)
  petal.wobbleAmplitude = randomBetween(18, 55)
  petal.alpha = randomBetween(0.35, 0.82)
  petal.color = COLORS[Math.floor(Math.random() * COLORS.length)]
  petal.age = 0
}

export default function PetalRain() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const petalsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let t = 0

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      petalsRef.current.forEach(p => {
        p.canvasWidth = canvas.width
        p.canvasHeight = canvas.height
      })
    }

    resize()
    window.addEventListener('resize', resize)

    // Initialize petals spread across different heights (pre-distributed)
    petalsRef.current = Array.from({ length: PETAL_COUNT }, (_, i) => {
      const p = createPetal(canvas.width, canvas.height, i)
      // Spread initial y positions so they're not all at top
      p.y = randomBetween(-50, canvas.height + 50)
      return p
    })

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.016

      petalsRef.current.forEach(petal => {
        petal.age += 0.016
        petal.rotation += petal.rotationSpeed

        // Wobble side to side like a real falling petal
        const wobble = Math.sin(petal.age * petal.wobbleSpeed * 60 + petal.wobbleOffset) * petal.wobbleAmplitude * 0.016
        petal.x += petal.speedX + wobble
        petal.y += petal.speedY

        // Reset when off-screen
        if (petal.y > canvas.height + 60 ||
            petal.x < -100 || petal.x > canvas.width + 100) {
          resetPetal(petal)
        }

        // Draw
        ctx.save()
        ctx.translate(petal.x, petal.y)
        ctx.rotate(petal.rotation)

        // Slight 3D tilt effect using scale
        const tiltScale = 0.65 + 0.35 * Math.abs(Math.cos(petal.age * 1.5 + petal.wobbleOffset))
        ctx.scale(1, tiltScale)

        const color = petal.color.replace('alpha', petal.alpha.toFixed(2))
        ctx.fillStyle = color

        // Soft glow
        ctx.shadowColor = color.replace('alpha', '0.4')
        ctx.shadowBlur = 6

        PETAL_SHAPES[petal.shapeIndex](ctx, petal.size)

        // Highlight shimmer on petal
        ctx.fillStyle = `rgba(255,255,255,${petal.alpha * 0.25})`
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.ellipse(-petal.size * 0.12, -petal.size * 0.2, petal.size * 0.12, petal.size * 0.22, 0, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}
