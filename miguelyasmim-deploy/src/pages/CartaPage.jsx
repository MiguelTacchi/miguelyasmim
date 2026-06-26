import { useEffect, useRef } from 'react'

export default function CartaPage() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="page">
      <main className="page-main">
        <div className="section-wrap">
          <div className="section-head">
            <h1>Carta Para o Amor da minha Vida</h1>
            <p>10/07/2026</p>
          </div>
          <div ref={ref} className="letter-card">
            <div className="letter-badge">♡</div>
            <span className="letter-greeting">Meu amor,</span>
            <div className="letter-body">
              <p>
                 Apenas usando palavras não é o suficiente para descrever o tamanho do meu
    sentimento por você. É um misto de alegria, paz, carinho e amor que cresce
    a cada dia. Você se tornou alguém essencial na minha vida, alguém que
    transforma momentos simples em lembranças especiais e faz meus dias terem
    mais sentido.
              </p>
              <p>
               Em cada sorriso seu eu encontro felicidade, em cada abraço eu encontro
    conforto, e em você eu encontro a paz que eu sempre procurei. Em um ano
    juntos, percebi que amar você é uma das melhores coisas que já me aconteceu.
    Obrigado por estar comigo em cada momento, pelas risadas, pelo apoio e por
    me fazer sentir tão feliz.
              </p>
              <p>
                Esse um ano me mostrou que amar alguém vai muito além de gostar; é escolher
    a mesma pessoa todos os dias, admirar cada detalhe, apoiar nos momentos
    difíceis e celebrar cada momento bom juntos. Obrigado por ser minha
    companheira, minha melhor amiga e a pessoa que faz meu coração ficar leve.
              </p>
              <p>Eu te amo do tamanho do universo. ♡</p>
            </div>
            <div className="letter-sig">Miguel</div>
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
