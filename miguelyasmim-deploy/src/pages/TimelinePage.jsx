import { useEffect, useRef } from 'react'

const events = [
  { eyebrow: '10 de Julho de 2025', title: 'Ficamos Juntos', desc: 'O dia que o universo conspirou e dois corações decidiram caminhar na mesma direção. Nada mais foi igual depois disso.' },
  { eyebrow: 'Primeiros momentos', title: 'Café e Risadas', desc: 'Conversas que duraram horas, sorrisos bobos e a certeza de que algo muito especial estava começando a florescer entre nós.' },
  { eyebrow: 'Carnaval', title: 'Nosso Primeiro Beijo', desc: 'A festa que guardou um dos momentos mais especiais da nossa história. Um momento que ficará para sempre gravado no coração.' },
  { eyebrow: 'Nossa primeira viagem', title: 'Explorando o Mundo Juntos', desc: 'Descobrimos que viajar ao lado da pessoa certa transforma qualquer lugar num paraíso. O começo de muitas aventuras.' },
  { eyebrow: 'Para sempre', title: 'Hoje & Sempre', desc: 'A cada dia que passa, nosso amor fica mais bonito, mais forte e mais nosso. O melhor ainda está por vir.' },
]

function TlItem({ ev, i }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="tl-item" style={{ transitionDelay: `${i * 80}ms` }}>
      <div className="tl-dot" />
      <div className="tl-spacer" />
      <div className="tl-card">
        <span className="tl-eyebrow">{ev.eyebrow}</span>
        <h3>{ev.title}</h3>
        <p>{ev.desc}</p>
      </div>
    </div>
  )
}

export default function TimelinePage() {
  return (
    <div className="page">
      <main className="page-main">
        <div className="section-wrap">
          <div className="section-head">
            <h1>Nossa Linha do Tempo</h1>
            <p>Os momentos que construíram nossa história, passo a passo.</p>
          </div>
          <div className="timeline">
            <div className="timeline-line" />
            {events.map((ev, i) => <TlItem key={i} ev={ev} i={i} />)}
          </div>
        </div>
      </main>
      <footer>
        <p>Miguel ♡ Yasmim</p>
        <small>feito com amor ✦ para sempre</small>
      </footer>
    </div>
  )
}
