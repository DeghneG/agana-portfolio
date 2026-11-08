import { useEffect, useRef, useState } from 'react'

// Slowly reveals an element (fade + rise) when it scrolls into view.
export default function useReveal({ threshold = 0.12, once = true } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); if (once) io.disconnect() }
        else if (!once) setVisible(false)
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])
  return [ref, visible]
}
