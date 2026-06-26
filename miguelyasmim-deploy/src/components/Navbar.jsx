import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#inicio',    label: 'Início' },
  { href: '#timeline',  label: 'Linha do Tempo' },
  { href: '#galeria',   label: 'Galeria' },
  { href: '#promessas', label: 'Promessas' },
  { href: '#carta',     label: 'Carta' },
]

// ── Transição profissional: injeção de CSS + manipulação DOM pura ──
// Não usa estado React → sem re-render → sem tela branca

function injectTransitionStyles() {
  if (document.getElementById('__tr-style')) return
  const s = document.createElement('style')
  s.id = '__tr-style'
  s.textContent = `
    #__tr {
      position: fixed; inset: 0; z-index: 9999;
      pointer-events: none;
      display: none;
    }
    /* Duas metades que entram do centro pra fora */
    #__tr-top, #__tr-bot {
      position: absolute; left: 0; width: 100%;
      height: 50%;
      background: #0a0208;
      will-change: transform;
    }
    #__tr-top { top: 0; transform: translateY(-101%); }
    #__tr-bot { bottom: 0; transform: translateY(101%); }

    /* Linha horizontal dourada/rose que varre o meio */
    #__tr-line {
      position: absolute; left: -100%; top: 50%;
      width: 100%; height: 1px;
      background: linear-gradient(90deg, transparent, #e8749a, #f0d9a8, #e8749a, transparent);
      transform: translateY(-50%);
      opacity: 0;
    }

    /* Logotipo central */
    #__tr-logo {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0.6);
      font-family: 'Sacramento', cursive;
      font-size: 3.5rem;
      color: #f4a7b9;
      text-shadow: 0 0 40px rgba(232,116,154,0.9);
      opacity: 0;
      white-space: nowrap;
      letter-spacing: 4px;
    }

    /* ── ENTER ── */
    #__tr.entering #__tr-top  { animation: trTopIn  0.55s cubic-bezier(0.76,0,0.24,1) forwards; }
    #__tr.entering #__tr-bot  { animation: trBotIn  0.55s cubic-bezier(0.76,0,0.24,1) forwards; }
    #__tr.entering #__tr-line { animation: trLineIn 0.55s ease 0.3s forwards; }
    #__tr.entering #__tr-logo { animation: trLogoIn 0.4s ease 0.45s forwards; }

    /* ── LEAVE ── */
    #__tr.leaving #__tr-top  { animation: trTopOut  0.55s cubic-bezier(0.76,0,0.24,1) forwards; }
    #__tr.leaving #__tr-bot  { animation: trBotOut  0.55s cubic-bezier(0.76,0,0.24,1) forwards; }
    #__tr.leaving #__tr-line { animation: trLineOut 0.3s ease forwards; }
    #__tr.leaving #__tr-logo { animation: trLogoOut 0.25s ease forwards; }

    @keyframes trTopIn  { from { transform: translateY(-101%); } to { transform: translateY(0); } }
    @keyframes trBotIn  { from { transform: translateY(101%);  } to { transform: translateY(0); } }
    @keyframes trTopOut { from { transform: translateY(0); } to { transform: translateY(-101%); } }
    @keyframes trBotOut { from { transform: translateY(0); } to { transform: translateY(101%);  } }

    @keyframes trLineIn {
      0%   { left: -100%; opacity: 1; }
      100% { left: 100%;  opacity: 1; }
    }
    @keyframes trLineOut { to { opacity: 0; } }

    @keyframes trLogoIn  {
      from { opacity: 0; transform: translate(-50%,-50%) scale(0.7); }
      to   { opacity: 1; transform: translate(-50%,-50%) scale(1);   }
    }
    @keyframes trLogoOut {
      from { opacity: 1; transform: translate(-50%,-50%) scale(1);   }
      to   { opacity: 0; transform: translate(-50%,-50%) scale(1.15);}
    }
  `
  document.head.appendChild(s)
}

function buildOverlay() {
  if (document.getElementById('__tr')) return
  const el = document.createElement('div'); el.id = '__tr'
  el.innerHTML = `
    <div id="__tr-top"></div>
    <div id="__tr-bot"></div>
    <div id="__tr-line"></div>
    <div id="__tr-logo">M ♡ Y</div>
  `
  document.body.appendChild(el)
}

let busy = false
function navigate(href) {
  if (busy) return
  busy = true
  injectTransitionStyles()
  buildOverlay()

  const overlay = document.getElementById('__tr')
  overlay.style.display = 'block'
  overlay.className = 'entering'

  // Após entrar → scroll → sair
  setTimeout(() => {
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'instant' })

    overlay.className = 'leaving'
    setTimeout(() => {
      overlay.style.display = 'none'
      overlay.className = ''
      busy = false
    }, 600)
  }, 700)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    injectTransitionStyles()
    buildOverlay()
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="nav"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ boxShadow: scrolled ? '0 2px 40px rgba(0,0,0,.5)' : 'none' }}
    >
      <span className="nav-logo">M & Y</span>
      {links.map(l => (
        <motion.a
          key={l.href}
          href={l.href}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={e => { e.preventDefault(); navigate(l.href) }}
        >
          {l.label}
        </motion.a>
      ))}
    </motion.nav>
  )
}
