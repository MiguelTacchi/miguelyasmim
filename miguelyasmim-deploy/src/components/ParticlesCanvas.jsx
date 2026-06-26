import { useEffect, useRef } from 'react'

export default function ParticlesCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    const stars = []
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    function init() {
      stars.length = 0
      for (let i = 0; i < 160; i++) stars.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.2, phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.006 + 0.002,
        gold: Math.random() > 0.78,
      })
    }
    let t = 0
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++
      stars.forEach(s => {
        const a = 0.1 + (Math.sin(t * s.speed + s.phase) + 1) * 0.3
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.gold ? `rgba(212,175,122,${a})` : `rgba(255,255,255,${a * 0.5})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    resize(); init(); draw()
    const onR = () => { resize(); init() }
    window.addEventListener('resize', onR)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onR) }
  }, [])
  return <canvas ref={ref} className="particles" />
}
