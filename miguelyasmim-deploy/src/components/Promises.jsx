import { motion } from 'framer-motion'
import { Reveal, useReveal } from './Reveal.jsx'

const promises = [
  { icon: '🌹', text: 'Sempre te fazer sorrir, mesmo nos dias mais difíceis' },
  { icon: '🛡️', text: 'Ser seu porto seguro em qualquer tempestade da vida' },
  { icon: '✈️', text: 'Explorar o mundo ao seu lado, uma aventura de cada vez' },
  { icon: '🌙', text: 'Jamais deixar você dormir sem saber o quanto te amo' },
  { icon: '💫', text: 'Crescer com você e apoiar todos os seus sonhos' },
  { icon: '♾️', text: 'Amar você hoje, amanhã e em todas as vidas que vierem' },
]

function PromiseCard({ icon, text, i }) {
  const [ref, visible] = useReveal()
  return (
    <motion.div
      ref={ref}
      className="promise-card"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.04 }}
    >
      <span className="promise-icon">{icon}</span>
      <p className="promise-text">{text}</p>
    </motion.div>
  )
}

export default function Promises() {
  return (
    <section id="promessas">
      <Reveal className="section-header">
        <span className="section-tag">do meu coração</span>
        <h2 className="section-title">Promessas</h2>
        <div className="section-divider animate" />
      </Reveal>
      <div className="promises-grid">
        {promises.map((p, i) => (
          <PromiseCard key={i} {...p} i={i} />
        ))}
      </div>
    </section>
  )
}
