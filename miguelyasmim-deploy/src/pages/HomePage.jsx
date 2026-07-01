import { useEffect, useState } from 'react'

const START = new Date('2025-07-10T18:00:00')

function useCounter() {
  const [d, setD] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, Date.now() - START)
      setD({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
        s: Math.floor((diff % 6e4) / 1e3),
      })
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])
  return d
}

export default function HomePage() {
  const { d, h, m, s } = useCounter()
  const pad = n => String(n).padStart(2, '0')

  return (
    <div className="page">
      <div className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070')" }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">1 ano compartilhando os melhores momentos ao seu lado.</p>
          <h1 className="hero-title">Miguel<em>♡</em> Yasmim</h1>
          <p className="hero-sub">
             Nossa história começou no dia 10/07/2025 e esse é o tempo desde a melhor escolha que fiz na minha vida.
          </p>
          <div className="counter-wrap">
            <span className="counter-label-top">Tempo juntos</span>
            <div className="counter-grid">
              {[{ v: pad(d), u: 'Dias' }, { v: pad(h), u: 'Horas' }, { v: pad(m), u: 'Min' }, { v: pad(s), u: 'Seg' }].map(i => (
                <div className="counter-box" key={i.u}>
                  <span className="counter-num">{i.v}</span>
                  <span className="counter-unit">{i.u}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>Miguel ♡ Yasmim</p>
        <small>feito com amor ✦ para sempre</small>
      </footer>
    </div>
  )
}
