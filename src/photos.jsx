import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import * as I from './icons'
import { ReactButton } from './reactions'
import { toast } from './ui'

export const openLightbox = (photos, index, post) =>
  window.dispatchEvent(new CustomEvent('lightbox', { detail: { photos, index, post } }))

const TONES = [
  ['#cfd8ea', '#a9b7d6'], ['#e6d3c8', '#cfae9c'], ['#cde3d6', '#9fc7b0'],
  ['#e5d6ee', '#c4a9d6'], ['#f0e2bd', '#e0c47f'], ['#d3e3ee', '#a2c4dc'],
]

export function Placeholder({ n = 0, label, size = 'md' }) {
  const [a, b] = TONES[n % TONES.length]
  return (
    <div className="w-full h-full grid place-items-center text-center" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
      <div className="flex flex-col items-center gap-1 text-black/45">
        <I.Photo size={size === 'lg' ? 72 : 36} className="opacity-60" />
        <span className={`font-semibold ${size === 'lg' ? 'text-lg' : 'text-[13px]'}`}>{label || `Photo ${n + 1}`}</span>
      </div>
    </div>
  )
}

// Image or video. Video items look like { src, video: true, label }.
export function Media({ ph, className = '', full = false }) {
  if (ph.video) {
    if (full) return <video key={ph.src} src={ph.src} controls autoPlay playsInline className={className} />
    return (
      <>
        <video src={`${ph.src}#t=0.5`} muted playsInline preload="metadata" className={className} />
        <span className="absolute inset-0 grid place-items-center pointer-events-none">
          <span className="w-12 h-12 rounded-full bg-black/55 text-white grid place-items-center text-xl pl-1">▶</span>
        </span>
      </>
    )
  }
  return <img src={ph.src} alt={ph.label || ''} loading={full ? undefined : 'lazy'} className={className} />
}

const Tile = ({ ph, n, onOpen, extra, className = '' }) => (
  <button onClick={() => onOpen(n)} aria-label={`Open photo ${n + 1}`} className={`relative overflow-hidden group cursor-pointer ${className}`}>
    {ph.src ? <Media ph={ph} className="absolute inset-0 w-full h-full object-cover" /> :<div className="absolute inset-0"><Placeholder n={n} label={ph.label} /></div>}
    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
    {extra > 0 && <span className="absolute inset-0 grid place-items-center bg-black/45 text-white text-[40px] font-semibold">+{extra}</span>}
  </button>
)

// Facebook-style photo collage: 1, 2, 3, 4 or 5+ tiles ("+N" on the last one)
export function PhotoGrid({ photos, post }) {
  const open = (i) => openLightbox(photos, i, post)
  const n = photos.length
  const shown = photos.slice(0, 5)
  const extra = n - 5
  const base = 'w-full border-y border-[#ced0d4] bg-[#ced0d4]'
  if (n === 1) {
    const ph = photos[0]
    return ph.src
      ? <button onClick={() => open(0)} className={`${base} block cursor-pointer relative`}><Media ph={ph} className="w-full" /></button>
      : <div className={`${base} aspect-[4/3]`}><Tile ph={ph} n={0} onOpen={open} className="w-full h-full" /></div>
  }
  if (n === 2) return <div className={`${base} grid grid-cols-2 gap-[2px] aspect-[2/1.3]`}>{shown.map((p, i) => <Tile key={i} ph={p} n={i} onOpen={open} />)}</div>
  if (n === 3) return (
    <div className={`${base} grid grid-cols-2 grid-rows-2 gap-[2px] aspect-[6/5]`}>
      {shown.map((p, i) => <Tile key={i} ph={p} n={i} onOpen={open} className={i === 0 ? 'col-span-2' : ''} />)}
    </div>
  )
  if (n === 4) return <div className={`${base} grid grid-cols-2 grid-rows-2 gap-[2px] aspect-square`}>{shown.map((p, i) => <Tile key={i} ph={p} n={i} onOpen={open} />)}</div>
  return (
    <div className={`${base} grid grid-cols-6 grid-rows-2 gap-[2px] aspect-[6/5]`}>
      {shown.map((p, i) => <Tile key={i} ph={p} n={i} onOpen={open} className={i < 2 ? 'col-span-3' : 'col-span-2'} extra={i === 4 ? extra : 0} />)}
    </div>
  )
}

// Facebook-style photo viewer: black stage + post details sidebar (no comments)
export function Lightbox() {
  const [st, setSt] = useState(null) // { photos, index, post }
  const [zoom, setZoom] = useState(1)
  const stage = useRef(null)
  const imgBox = useRef(null)
  const close = () => { setSt(null); setZoom(1) }
  const go = (d) => setSt((s) => (s ? { ...s, index: (s.index + d + s.photos.length) % s.photos.length } : s))

  useEffect(() => {
    const on = (e) => { setSt(e.detail); setZoom(1) }
    const key = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('lightbox', on)
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('lightbox', on); window.removeEventListener('keydown', key) }
  }, [])

  useEffect(() => {
    if (!st) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [!!st])

  useEffect(() => {
    if (st && imgBox.current) gsap.fromTo(imgBox.current, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' })
  }, [st && st.index, !!st])

  if (!st) return null
  const { photos, index, post = {} } = st
  const ph = photos[index]
  const copy = () => {
    const url = `${location.origin}/#${post.id || ''}`
    navigator.clipboard?.writeText(url).then(() => toast('Link copied to clipboard'), () => toast(url))
  }
  const viewPost = () => {
    close()
    if (post.id) setTimeout(() => document.getElementById(post.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }
  const circle = 'w-10 h-10 rounded-full grid place-items-center bg-[#3a3b3c]/80 text-white hover:bg-[#4e4f50] transition'
  return (
    <div className="fixed inset-0 z-50 flex bg-black">
      <div ref={stage} className="relative flex-1 min-w-0 flex items-center justify-center overflow-hidden" onClick={close}>
        <div className="absolute top-4 left-4 flex items-center gap-3 z-10" onClick={(e) => e.stopPropagation()}>
          <button onClick={close} aria-label="Close" className="w-10 h-10 rounded-full grid place-items-center bg-white/90 text-black text-2xl leading-none hover:bg-white">×</button>
          <span className="w-10 h-10 rounded-full bg-fb-blue text-white grid place-items-center text-[26px] font-bold leading-none pb-1">f</span>
        </div>
        <div className="absolute top-4 right-4 flex gap-3 z-10" onClick={(e) => e.stopPropagation()}>
          <button aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(3, +(z + 0.5).toFixed(1)))} className={circle}>＋</button>
          <button aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))} className={`${circle} ${zoom === 1 ? 'opacity-50' : ''}`}>－</button>
          <button aria-label="Fullscreen" onClick={() => (document.fullscreenElement ? document.exitFullscreen() : stage.current?.requestFullscreen?.())} className={circle}>⛶</button>
        </div>
        {photos.length > 1 && (
          <>
            <button aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1) }} className={`${circle} absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 text-3xl z-10`}>‹</button>
            <button aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1) }} className={`${circle} absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 text-3xl z-10`}>›</button>
          </>
        )}
        <div ref={imgBox} className="h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()} style={{ transform: `scale(${zoom})`, transition: 'transform .25s ease' }}>
          {ph.src
            ? <Media ph={ph} full className="max-h-full max-w-full object-contain" />
            : <div className="h-[88vh] aspect-[4/5] max-w-[90%]"><Placeholder n={index} label={ph.label} size="lg" /></div>}
        </div>
      </div>

      <aside className="hidden md:flex w-[360px] shrink-0 bg-white flex-col">
        <div className="px-4 py-3 flex items-center justify-between text-[13px] text-fb-sub border-b border-[#ced0d4]">
          <span className="flex items-center gap-2"><I.List size={16} /> This photo is from a post.</span>
          <button onClick={viewPost} className="font-semibold text-fb-text hover:underline">View post</button>
        </div>
        <div className="px-4 pt-4 flex items-start gap-2">
          <img src="/profile.jpg" alt="" className="w-10 h-10 rounded-full object-cover object-[center_15%]" />
          <div className="flex-1 leading-tight">
            <div className="font-semibold text-[15px]">{post.who || 'Deghne Gabriel'}</div>
            <div className="text-fb-sub text-[13px] flex items-center gap-1">{post.date} · <I.Globe size={12} /></div>
          </div>
        </div>
        <div className="px-4 pt-3 text-[15px]">
          <b>{ph.label || post.title}</b>
          <div className="text-fb-sub text-[13px] mt-1">
            {ph.label && ph.label !== post.title && post.title}
            {ph.label && ph.label !== post.title && photos.length > 1 && ' · '}
            {photos.length > 1 && `Photo ${index + 1} of ${photos.length}`}
          </div>
        </div>
        {ph.href && (
          <div className="px-4 pt-3">
            <a href={ph.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-fb-blue text-white font-semibold text-[15px] hover:brightness-95">Open in Google Drive ↗</a>
          </div>
        )}
        <div className="mx-4 mt-4 border-t border-[#ced0d4] grid grid-cols-2 py-1 text-fb-sub font-semibold text-[15px]">
          <ReactButton LikeIcon={I.Like} />
          <button onClick={copy} className="h-9 rounded-md hover:bg-fb-hover flex items-center justify-center gap-2"><I.Share size={20} />Share</button>
        </div>
      </aside>
    </div>
  )
}
