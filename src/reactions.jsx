import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Shared gradients, rendered once in the page.
export function ReactionDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <radialGradient id="rx-face" cx="50%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffe97a" /><stop offset=".6" stopColor="#fdc933" /><stop offset="1" stopColor="#f5a31a" />
        </radialGradient>
        <linearGradient id="rx-like" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4cc2ff" /><stop offset="1" stopColor="#0866ff" />
        </linearGradient>
        <linearGradient id="rx-love" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6680" /><stop offset="1" stopColor="#e8203f" />
        </linearGradient>
        <linearGradient id="rx-angry" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f9a03a" /><stop offset=".5" stopColor="#ee6a1e" /><stop offset="1" stopColor="#d9391a" />
        </linearGradient>
        <linearGradient id="rx-tear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fe5ff" /><stop offset="1" stopColor="#2aa7f0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const dark = '#4a2f10'
const Face = ({ fill = 'url(#rx-face)', children }) => (
  <>
    <circle cx="20" cy="20" r="19" fill={fill} />
    {children}
  </>
)

const ICONS = {
  Like: () => (
    <Face fill="url(#rx-like)">
      <g className="rx-inner" style={{ transformOrigin: '14px 26px' }}>
        <path fill="#fff" d="M12 17.5h-3.2a1 1 0 0 0-1 1V28a1 1 0 0 0 1 1H12zM14 17.7l3.4-7.3c.3-.7 1-1 1.7-.8 1.2.4 1.9 1.6 1.5 2.8l-1 3.1h6.6c1.3 0 2.2 1.2 1.9 2.4l-1.8 7.6c-.3 1.1-1.2 1.8-2.3 1.8H14z" />
      </g>
    </Face>
  ),
  Love: () => (
    <Face fill="url(#rx-love)">
      <path className="rx-inner" style={{ transformOrigin: '20px 21px' }} fill="#fff" d="M20 29.5s-9-5.6-9-12.2a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.6-9 12.2-9 12.2z" />
    </Face>
  ),
  Care: () => (
    <Face>
      <path d="M10.5 18.5q2.5-2.6 5 0M24.5 18.5q2.5-2.6 5 0" stroke={dark} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M14 24q6 5 12 0" stroke={dark} strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="10" cy="23" rx="2.6" ry="1.7" fill="#ff8a8a" opacity=".7" /><ellipse cx="30" cy="23" rx="2.6" ry="1.7" fill="#ff8a8a" opacity=".7" />
      <path className="rx-inner" style={{ transformOrigin: '12px 31px' }} fill="url(#rx-love)" stroke="#fff" strokeWidth="1" d="M12 36s-6.5-4-6.5-8.6a3.6 3.6 0 0 1 6.5-2.1 3.6 3.6 0 0 1 6.5 2.1C18.5 32 12 36 12 36z" />
    </Face>
  ),
  Haha: () => (
    <Face>
      <path d="M9.5 16q3-3.6 6 0M24.5 16q3-3.6 6 0" stroke={dark} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M9 22h22c0 7-4.5 11-11 11S9 29 9 22z" fill="#6b2a0e" />
      <path d="M14 29.5q6-4 12 0c-1.5 2.4-3.6 3.5-6 3.5s-4.5-1.1-6-3.5z" fill="#ff6f7f" />
      <path d="M9 22h22" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".0" />
    </Face>
  ),
  Wow: () => (
    <Face>
      <path d="M9 12q4-3.5 8 0M23 12q4-3.5 8 0" stroke={dark} strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="13.5" cy="19" rx="2.6" ry="3.6" fill={dark} /><ellipse cx="26.5" cy="19" rx="2.6" ry="3.6" fill={dark} />
      <ellipse className="rx-inner" style={{ transformOrigin: '20px 29px' }} cx="20" cy="29" rx="4.6" ry="6" fill="#6b2a0e" />
    </Face>
  ),
  Sad: () => (
    <Face>
      <path d="M8.5 15.5q4-1 7.5 1.5M31.5 15.5q-4-1-7.5 1.5" stroke={dark} strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="13" cy="21" rx="2.2" ry="2.8" fill={dark} /><ellipse cx="27" cy="21" rx="2.2" ry="2.8" fill={dark} />
      <path d="M14 31q6-5 12 0" stroke={dark} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path className="rx-inner" style={{ transformOrigin: '29px 25px' }} d="M29.5 24c2.4 3.2 3 5.3 3 6.8a3 3 0 0 1-6 0c0-1.500.6-3.600 3-6.800z" fill="url(#rx-tear)" />
    </Face>
  ),
  Angry: () => (
    <Face fill="url(#rx-angry)">
      <path d="M8.5 14.5l8 3.5M31.5 14.5l-8 3.5" stroke="#3a1608" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="13.5" cy="22" rx="2.2" ry="2.6" fill="#3a1608" /><ellipse cx="26.5" cy="22" rx="2.2" ry="2.6" fill="#3a1608" />
      <path d="M13.5 31.5q6.500-4.500 13 0" stroke="#3a1608" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </Face>
  ),
}

export const REACTIONS = [
  { k: 'Like', c: '#0866ff' }, { k: 'Love', c: '#f33e58' }, { k: 'Care', c: '#f7b125' },
  { k: 'Haha', c: '#f7b125' }, { k: 'Wow', c: '#f7b125' }, { k: 'Sad', c: '#f7b125' }, { k: 'Angry', c: '#e9710f' },
]

export const ReactionIcon = ({ name, size = 40 }) => {
  const Ic = ICONS[name]
  return <svg viewBox="0 0 40 40" width={size} height={size} className="rx-icon block overflow-visible"><Ic /></svg>
}

// Facebook-like idle motion for each reaction when hovered
function wiggle(el, name) {
  const inner = el.querySelector('.rx-inner')
  gsap.killTweensOf([el, inner])
  const tl = gsap.timeline()
  if (name === 'Like') {
    tl.to(inner, { rotation: -22, duration: 0.18, ease: 'power2.out' }).to(inner, { rotation: 8, duration: 0.18 }).to(inner, { rotation: 0, duration: 0.25, ease: 'elastic.out(1,.5)' })
  } else if (name === 'Love' || name === 'Care') {
    tl.to(inner, { scale: 1.3, duration: 0.15 }).to(inner, { scale: 0.95, duration: 0.15 }).to(inner, { scale: 1.2, duration: 0.15 }).to(inner, { scale: 1, duration: 0.2 })
  } else if (name === 'Haha') {
    tl.to(el, { rotation: -10, duration: 0.1 }).to(el, { rotation: 10, duration: 0.1, repeat: 3, yoyo: true }).to(el, { rotation: 0, duration: 0.15 })
  } else if (name === 'Wow') {
    tl.to(inner, { scaleY: 1.3, scaleX: 1.15, duration: 0.18 }).to(inner, { scale: 1, duration: 0.3, ease: 'elastic.out(1,.4)' })
  } else if (name === 'Sad') {
    tl.fromTo(inner, { y: -4, opacity: 0 }, { y: 6, opacity: 1, duration: 0.5, ease: 'power1.in' }).to(inner, { y: 0, duration: 0.2 })
  } else {
    tl.to(el, { x: -2, duration: 0.05 }).to(el, { x: 2, duration: 0.05, repeat: 7, yoyo: true }).to(el, { x: 0, duration: 0.05 })
  }
}

// compact + value/onChange: text-style Like for comments, state owned by the caller
export function ReactButton({ LikeIcon, compact = false, value, onChange }) {
  const [own, setOwn] = useState(null)
  const sel = onChange ? value ?? null : own
  const setSel = onChange || setOwn
  const [show, setShow] = useState(false)
  const [hov, setHov] = useState(null)
  const bar = useRef(null)
  const btnIcon = useRef(null)
  const t = useRef()
  const openSoon = () => { clearTimeout(t.current); if (!show) t.current = setTimeout(() => setShow(true), 400) }
  const closeSoon = () => { clearTimeout(t.current); t.current = setTimeout(() => { setShow(false); setHov(null) }, 350) }

  // popup entrance: pill grows, icons bounce up one after another
  useEffect(() => {
    if (!show || !bar.current) return
    gsap.fromTo(bar.current, { opacity: 0, y: 18, scale: 0.7, transformOrigin: '10% 100%' }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: 'back.out(1.8)' })
    gsap.fromTo(bar.current.querySelectorAll('[data-rx]'), { y: 34, scale: 0.2, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5, stagger: 0.045, ease: 'back.out(2.4)', delay: 0.05 })
  }, [show])

  // magnify hovered icon, shrink the rest slightly
  useEffect(() => {
    if (!show || !bar.current) return
    bar.current.querySelectorAll('[data-rx]').forEach((el, i) => {
      gsap.to(el, { scale: hov === null ? 1 : i === hov ? 1.7 : 0.88, y: hov === i ? -18 : 0, duration: 0.22, ease: 'back.out(2)', overwrite: 'auto' })
    })
    if (hov !== null) wiggle(bar.current.querySelectorAll('[data-rx] .rx-icon')[hov], REACTIONS[hov].k)
  }, [hov, show])

  // selected reaction pops into the button
  useEffect(() => {
    if (sel && btnIcon.current) gsap.fromTo(btnIcon.current, { scale: 0.2, rotation: -25 }, { scale: 1, rotation: 0, duration: 0.55, ease: 'elastic.out(1.2,.45)' })
  }, [sel])

  const pick = (k) => {
    gsap.to(bar.current, { opacity: 0, y: 10, scale: 0.9, duration: 0.15, onComplete: () => { setShow(false); setHov(null) } })
    setSel(k)
  }
  const r = REACTIONS.find((x) => x.k === sel)
  return (
    <div className={compact ? 'relative inline-block' : 'relative'} onMouseEnter={openSoon} onMouseLeave={closeSoon}>
      {show && (
        <div ref={bar} onMouseEnter={() => clearTimeout(t.current)} onMouseLeave={() => setHov(null)}
          className={`absolute bottom-full left-0 ${compact ? 'mb-1' : 'mb-2'} flex items-end gap-1 px-2 py-1.5 rounded-full bg-white shadow-[0_2px_16px_rgba(0,0,0,.28)] z-30`}>
          {REACTIONS.map((x, i) => (
            <div key={x.k} data-rx className="relative" onMouseEnter={() => setHov(i)}>
              {hov === i && <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/80 text-white text-[12px] font-semibold whitespace-nowrap pointer-events-none">{x.k}</span>}
              <button aria-label={x.k} onClick={() => pick(x.k)} className="block w-10 h-10 p-0.5"><ReactionIcon name={x.k} size={36} /></button>
            </div>
          ))}
        </div>
      )}
      {compact ? (
        <button onClick={() => (sel ? setSel(null) : setSel('Like'))} style={r ? { color: r.c } : undefined} className="hover:underline">
          {r ? r.k : 'Like'}
        </button>
      ) : (
        <button onClick={() => (sel ? setSel(null) : setSel('Like'))} style={r ? { color: r.c } : undefined}
          className="w-full h-9 rounded-md hover:bg-fb-hover flex items-center justify-center gap-2">
          {r ? <span ref={btnIcon} className="inline-block"><ReactionIcon name={r.k} size={22} /></span> : <LikeIcon size={20} />}{r ? r.k : 'Like'}
        </button>
      )}
    </div>
  )
}
