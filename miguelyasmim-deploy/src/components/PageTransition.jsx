import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function PageTransition() {
  const [transitioning, setTransitioning] = useState(false)

  return (
    <>
      <style>{`
        a[href^="#"] { position: relative; }
      `}</style>
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="transition"
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              pointerEvents: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(135deg,#0f0309,#1a0510)', transformOrigin: 'right center' }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }} />
            <motion.div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'linear-gradient(225deg,#0f0309,#1a0510)', transformOrigin: 'left center' }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }} />
            <motion.div style={{ position: 'relative', zIndex: 1, fontSize: '4rem', filter: 'drop-shadow(0 0 30px rgba(232,116,154,0.9))' }}
              initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1.2, rotate: 0 }} exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}>
              ♥
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function usePageTransition() {
  const [transitioning, setTransitioning] = useState(false)

  const navigate = useCallback((href) => {
    setTransitioning(true)
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'instant' })
      setTransitioning(false)
    }, 500)
  }, [])

  return { transitioning, navigate }
}
