import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const START_DATE = new Date('2025-07-10T18:00:00')

function useCounter() {
  const [diff, setDiff] = useState(0)
  useEffect(() => {
    const tick = () => setDiff(Math.max(0, new Date() - START_DATE))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  const d = Math.floor(diff / 864e5)
  const h = Math.floor((diff % 864e5) / 36e5)
  const m = Math.floor((diff % 36e5) / 6e4)
  const s = Math.floor((diff % 6e4) / 1e3)
  return [d, h, m, s]
}

export default function Hero() {
  const [days, hours, mins, secs] = useCounter()

  return (
    <section id="inicio">
      <div className="hero-bg-gradient" />

      <p className="hero-eyebrow">
        Nossa história de amor no nosso primeiro ano juntos
      </p>

      <h1 className="hero-title">
        Miguel{' '}
        <span
          className="hero-heart"
          style={{
            WebkitTextFillColor: 'initial',
            backgroundClip: 'unset',
            WebkitBackgroundClip: 'unset',
            color: 'var(--rose-deep)',
            filter: 'drop-shadow(0 0 25px rgba(232,116,154,0.8))',
          }}
        >
          ♥
        </span>{' '}
        Yasmim
      </h1>

      <p className="hero-subtitle">
        Esse é o tempo desde a melhor escolha que fiz na minha vida, nosso dia{' '}
        <em>10/07/2025</em>
      </p>

      <div className="counter-box">
        {[
          [days, 'Dias'],
          [hours, 'Horas'],
          [mins, 'Minutos'],
          [secs, 'Segundos'],
        ].map(([val, label], i) => (
          <motion.div
            key={label}
            className="counter-item"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 + i * 0.1, duration: 0.6, ease: [0.22,1,0.36,1] }}
          >
            <span className="counter-num">{String(val).padStart(2, '0')}</span>
            <span className="counter-label">{label}</span>
          </motion.div>
        ))}
      </div>

      <a href="#timeline" className="hero-btn">
        ✦ Conhecer nossa história ✦
      </a>
    </section>
  )
}