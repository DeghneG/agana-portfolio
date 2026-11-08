import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// ---- Toast (GSAP) ----
export const toast = (msg) => window.dispatchEvent(new CustomEvent('toast', { detail: msg }))

export function Toaster() {
  const [msg, setMsg] = useState(null)
  const ref = useRef(null)
  const timer = useRef()
  useEffect(() => {
    const on = (e) => {
      setMsg(e.detail)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        gsap.to(ref.current, { y: 20, opacity: 0, duration: 0.3, onComplete: () => setMsg(null) })
      }, 2200)
    }
    window.addEventListener('toast', on)
    return () => window.removeEventListener('toast', on)
  }, [])
  useEffect(() => {
    if (msg && ref.current) gsap.fromTo(ref.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.6)' })
  }, [msg])
  if (!msg) return null
  return (
    <div ref={ref} className="fixed bottom-6 left-6 z-[60] bg-[#242526] text-white px-4 py-3 rounded-lg shadow-lg text-[15px]">{msg}</div>
  )
}

// ---- Dropdown menu (GSAP) ----
export function Menu({ trigger, items, align = 'right', width = 260 }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  const panel = useRef(null)
  useEffect(() => {
    if (!open) return
    const off = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false) }
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', off)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', off); document.removeEventListener('keydown', esc) }
  }, [open])
  useEffect(() => {
    if (!open || !panel.current) return
    gsap.fromTo(panel.current, { opacity: 0, y: -8, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: 'power3.out' })
    gsap.fromTo(panel.current.querySelectorAll('[data-item]'), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.22, stagger: 0.03, delay: 0.05 })
  }, [open])
  return (
    <div ref={wrap} className="relative">
      {trigger(open, () => setOpen((o) => !o))}
      {open && (
        <div ref={panel} style={{ width }} className={`absolute z-40 mt-2 p-2 bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,.25)] ${align === 'right' ? 'right-0' : 'left-0'}`}>
          {items.map((it, i) =>
            it.divider ? <div key={i} className="my-1 border-t border-[#ced0d4]" /> :
            it.label && !it.onClick && !it.href ? <div key={i} className="px-2 pt-1 pb-1 text-[13px] font-semibold text-fb-sub uppercase tracking-wide">{it.label}</div> :
            (
              <a key={i} data-item href={it.href} target={it.href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                onClick={(e) => { if (it.onClick) { e.preventDefault(); it.onClick() } if (!it.keepOpen) setOpen(false) }}
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-fb-hover cursor-pointer text-[15px] font-medium">
                <span className="w-5 text-center">{it.check === undefined ? it.icon : (it.check ? '✓' : '')}</span>
                <span className="flex-1">{it.label}</span>
                {it.hint && <span className="text-fb-sub text-[13px]">{it.hint}</span>}
              </a>
            )
          )}
        </div>
      )}
    </div>
  )
}

