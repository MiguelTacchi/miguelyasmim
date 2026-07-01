import { useEffect, useRef } from 'react'

const events = [
  { eyebrow: '23/08/2024', title: 'Sua Despedida', desc: 'Fui completamente de penetra na sua festa de despedida. Lembro que o Caio me disse que você queria ficar comigo — no início, não acreditei que uma menina tão linda ia querer ficar com alguém que mal conhecia. A noite rolou, a gente se beijou, e eu achei que ia ser só um ficada. Quem diria que ele faria eu conhecer o meu grande amor.' },
  { eyebrow: '25/08/2024', title: 'Pesca e encontros', desc: 'A gente foi pescar com a galera e foram muitos momentos bons. Fui me aproximando de você e, a cada hora que passava, me apaixonando mais pelo seu jeito. Foi uma semana agitada, marcando encontros para aproveitar cada minuto antes da sua viagem.' },
  { eyebrow: '30/08/2024', title: 'Viagem', desc: 'Apareci de surpresa no aeroporto — minha ficha de que ia ficar um tempão sem te ver ainda não tinha caído. Queria só te surpreender com um bichinho de pelúcia e uns chocolates. Lembro do seu pai cheio de ciúmes, da sua mãe desconfiada e de todo mundo surpreso ao nos ver juntos. E de quando a gente prometeu se esperar até a sua volta. Foi um dia difícil e com muita saudade daqui para frente.' },
  { eyebrow: '25/06/2025', title: 'Sua Volta', desc: 'Esse foi o dia em que te tive de volta. Estava morrendo de saudade e doido para te ver. Senti um misto de emoções: ansiedade, coração acelerado e muita vergonha. Nem os seus amigos — boa parte dos que estavam na despedida — acreditaram quando me viram lá. Foi um dia especial: provei para a sua família, seus amigos e para você que queria algo além de amizade. Foi o dia em que a gente conversou de verdade sobre o que sentia e o que queria um do outro dali para frente.' },
  { eyebrow: '06/07/2025', title: 'Primeiro Te Amo', desc: 'A gente se encontrou na Lagoa e eu estava muito feliz de te ver. Te apresentei como minha namorada para todos os meus amigos e para os familiares do Rick, já que era o aniversário da mãe dele. Depois de muita brincadeira, conversa e risadas, a gente foi para o carro — e foi durante o caminho que nos abraçamos e eu disse pela primeira vez que te amava. Você logo respondeu que me amava também. Sua presença fez toda a diferença naquele dia. No fim da noite, a gente ficou deitado na grama com o Henrique, morrendo de rir, e depois, enquanto todo mundo se entupia de bebida na chuva, a gente ficava de chameguinho na rede da varanda.' },
  { eyebrow: '10/07/2025', title: 'Pedido de Namoro', desc: 'Fiquei um tempão pensando em como te pedir em namoro. Decidi que queria um lugar lindo, com pôr do sol à beira-mar, então escolhi a tapiocaria da BM. No dia 07/07, comprei o anel e já estava extremamente ansioso para ser seu namorado. Lembro do nervosismo de esconder o anel, da emoção de tentar achar o momento certo — mas acabou saindo do jeito mais inesperado: coloquei o anel na mesa e disse que tinha achado no chão, de tão nervoso que estava. Logo em seguida, recebi o seu "sim". Esse foi o dia da melhor escolha que já fiz na minha vida.' },
  { eyebrow: '12/06/2026', title: 'Primeiro Dia dos Namorados', desc: 'Nosso primeiro Dia dos Namorados juntos. Fiz uma surpresa no porta-malas para você, nos presenteamos e jantamos juntos no Zio da BS, foi um dia de muito amor e tempo de qualidade. Esse foi o primeiro de muitos outros que ainda estão por vir. Sempre vou me dedicar ao máximo para te proporcionar tudo o que você merece.' },
  { eyebrow: '10/07/2026', title: '1 Ano Juntos', desc: '1 ano de amor, 1 ano de alegria, 1 ano de memórias que nunca vou esquecer. É um privilégio colecionar os melhores momentos ao seu side. Eu te amo mais do que tudo no mundo, meu amor.' },
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
