import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const links = [
  { to: '/',         label: 'Home' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/galeria',  label: 'Galeria' },
  { to: '/carta',    label: 'Carta' },
]

let busy = false
function navigate(to) {
  if (busy) return
  busy = true
  const pt = document.getElementById('__pt')
  pt.style.display = 'block'
  pt.className = 'entering'
  setTimeout(() => {
    window.__navigate && window.__navigate(to)
    pt.className = 'leaving'
    setTimeout(() => { pt.style.display = 'none'; pt.className = ''; busy = false }, 560)
  }, 680)
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <a className="logo" href="/" onClick={e => { e.preventDefault(); navigate('/') }}>
          M <span>&</span> Y
        </a>
        <nav>
          {links.map(l => (
            <a
              key={l.to}
              href={l.to}
              className={pathname === l.to ? 'active' : ''}
              onClick={e => { e.preventDefault(); navigate(l.to) }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-label="menu">
          {open ? '✕' : '☰'}
        </button>
      </div>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {links.map(l => (
          <a
            key={l.to}
            href={l.to}
            className={pathname === l.to ? 'active' : ''}
            onClick={e => { e.preventDefault(); setOpen(false); navigate(l.to) }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  )
}
