import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ParticlesCanvas from './components/ParticlesCanvas.jsx'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import TimelinePage from './pages/TimelinePage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import CartaPage from './pages/CartaPage.jsx'

// Inject page transition DOM overlay once
function injectPT() {
  if (document.getElementById('__pt')) return
  const el = document.createElement('div'); el.id = '__pt'
  el.innerHTML = '<div id="__pt-t"></div><div id="__pt-b"></div><div id="__pt-line"></div><div id="__pt-logo">M ♡ Y</div>'
  document.body.appendChild(el)
}

export default function App() {
  const nav = useNavigate()

  useEffect(() => {
    injectPT()
    // expose navigate for Header (DOM-level transition)
    window.__navigate = nav
  }, [nav])

  return (
    <>
      <ParticlesCanvas />
      <Header />
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/galeria"  element={<GalleryPage />} />
        <Route path="/carta"    element={<CartaPage />} />
      </Routes>
    </>
  )
}
