import { Reveal } from './Reveal.jsx'

export default function Letter() {
  return (
    <section id="carta">
      <Reveal className="section-header">
        <span className="section-tag">com todo meu amor</span>
        <h2 className="section-title">Carta para Yasmim</h2>
        <div className="section-divider animate" />
      </Reveal>

      <Reveal className="letter-wrapper" delay={100}>
        <div className="letter-paper">
          <div className="letter-wax">💗</div>
          <span className="letter-greeting">Meu amor,</span>
          <div className="letter-body">
            <p>
              Escrever tudo que sinto por você em palavras parece impossível, porque o que existe
              entre nós vai além de qualquer coisa que eu possa descrever. Mas quero tentar.
            </p>
            <p>
              Desde o dia em que você entrou na minha vida, tudo ficou mais bonito. Você trouxe
              cores que eu não sabia que existiam, risos que eu não sabia que podiam ser tão gostosos,
              e um amor que eu nunca tinha imaginado que era possível.
            </p>
            <p>
              Obrigado por ser exatamente quem você é. Por cada abraço, cada mensagem, cada olhar.
              Você é minha pessoa favorita nesse mundo.
            </p>
            <p>Te amo hoje, amanhã e sempre. ♡</p>
          </div>
          <div className="letter-signature">Miguel</div>
        </div>
      </Reveal>
    </section>
  )
}
