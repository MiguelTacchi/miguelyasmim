import { Reveal } from './Reveal.jsx'

const events = [
  { date: '10/07/2025', icon: '✨', title: 'Ficamos juntos', desc: 'O dia em que o universo conspirou e dois corações decidiram caminhar na mesma direção.' },
  { date: 'Memória', icon: '🌸', title: 'Primeira viagem', desc: 'Exploramos o mundo juntos pela primeira vez e criamos lembranças para sempre.' },
  { date: 'Carnaval', icon: '🎉', title: 'Primeiro beijo', desc: 'A festa que guardou um dos momentos mais especiais da nossa história.' },
  { date: 'Para sempre', icon: '🌙', title: 'Hoje & sempre', desc: 'A cada dia que passa, nosso amor fica mais bonito, mais forte e mais nosso.' },
]

export default function Timeline() {
  return (
    <section id="timeline">
      <Reveal className="section-header">
        <span className="section-tag">nossa jornada</span>
        <h2 className="section-title">Linha do Tempo</h2>
        <div className="section-divider animate" />
      </Reveal>

      <div className="timeline-container">
        <div className="timeline-line" />
        {events.map((ev, i) => (
          <Reveal key={i} delay={i * 100} className={`timeline-item${i % 2 === 1 ? '' : ''}`}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <span className="timeline-date">{ev.date}</span>
              <h3 className="timeline-event">{ev.icon} {ev.title}</h3>
              <p className="timeline-desc">{ev.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
