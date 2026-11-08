import { useState, useEffect, useRef } from 'react'
import useReveal from './useReveal'
import * as I from './icons'
import { profile, projects, stack, experience, setup, cert, gmail } from './data'
import gsap from 'gsap'
import { Menu, Toaster, toast } from './ui'
import { ReactButton, ReactionDefs } from './reactions'

import { openLightbox, PhotoGrid, Lightbox, Placeholder, Media } from './photos'
const VOXPOP = 'https://drive.google.com/drive/folders/1bm8Vd7Vs6M1Ly5LtBYJHR4ogylO8cDbY'
const MIDTERM = [
  { src: '/mml/midterm-1.png', label: 'SPARC Agana Infographics' },
  { src: '/mml/midterm-2.jpg', label: 'King in the making' },
  { src: '/mml/king-in-the-making.mp4', video: true, label: 'King in the Making Video' },
  { label: 'MML VOX POP Project', href: VOXPOP },
]
const FINALS = [
  { src: '/mml/finals-1.mp4', video: true, label: 'Desktop 2026.11.08 - 16.15.32.01' },
  { src: '/mml/stop-motion.mp4', video: true, label: 'Stop Motion Video' },
]
const MML_MEDIA = { Midterm: MIDTERM, Finals: FINALS }
const mmlPhotos = (t) => Array.from({ length: t === 'Midterm' ? MIDTERM.length : 11 }, (_, k) => (
  MML_MEDIA[t]?.[k] ?? { label: `${t} · Photo ${k + 1}` }
))
const projectPhotos =projects.map((p) => ({ src: p.img, label: p.title }))

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, vis] = useReveal()
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${vis ? 'in' : ''} ${className}`}>
      {children}
    </div>
  )
}

const Btn = ({ children, blue, ...p }) => (
  <a {...p} className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-md font-semibold text-[15px] cursor-pointer ${blue ? 'bg-fb-blue text-white hover:brightness-95' : 'bg-fb-btn text-fb-text hover:brightness-95'}`}>{children}</a>
)

const profileMenu = (setTab) => [
  { icon: '🔗', label: 'Copy profile link', onClick: () => { navigator.clipboard?.writeText(location.href); toast('Profile link copied') } },
  { icon: '📄', label: 'Download resume', href: '/files/resume.pdf' },
  { icon: '✉️', label: 'Email me', href: gmail() },
  { icon: '🐙', label: 'View GitHub', href: profile.socials[0].href },
  { divider: true },
  { icon: '📞', label: 'Contacts tab', onClick: () => setTab('Contacts') },
]

function Header({ tab, setTab }) {
  const tabs = ['All', 'Projects', 'Tech Stack', 'Experience', 'Set up', 'Contacts']
  return (
    <div className="bg-white shadow-[0_1px_2px_rgba(0,0,0,.2)]">
      <div className="max-w-[1250px] mx-auto">
        <div className="relative aspect-[1250/460] max-h-[460px] w-full overflow-hidden rounded-b-xl bg-[#a3d3b1]">
          <img src="/cover.jpg" alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
          <a href="https://gab-io.vercel.app" target="_blank" rel="noreferrer"
            className="absolute bottom-4 right-4 h-9 px-3 rounded-md bg-white text-fb-text font-semibold text-[15px] flex items-center gap-2 hover:bg-[#f2f2f2] shadow">
            <I.Globe size={18} />
            View personal portfolio
          </a>
        </div>
      </div>
      <div className="max-w-[1212px] mx-auto px-3 sm:px-0">
        <div className="pt-3 pb-4 flex flex-col sm:flex-row gap-5 sm:items-start">
          <div className="relative shrink-0 mt-1 sm:ml-[14px]">
            <div className="absolute -top-[52px] left-0 z-10 px-4 py-2.5 rounded-full bg-white shadow-[0_1px_6px_rgba(0,0,0,.25)] text-fb-sub text-[13px] whitespace-nowrap pointer-events-none select-none">
              View my Personal Portfolio
              <span className="absolute -bottom-2 left-[46px] w-3 h-3 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.2)]" />
              <span className="absolute -bottom-3.5 left-[52px] w-1.5 h-1.5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.2)]" />
            </div>
            <div className="w-[168px] h-[168px] rounded-full border-[3px] border-white shadow-[0_0_0_1px_#ddd] overflow-hidden bg-gray-200 mt-1">
              <img src="/profile.jpg" alt="Deghne Gabriel" className="w-full h-full object-cover object-[center_15%]" />
            </div>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row gap-3 justify-between sm:pt-4">
            <div>
              <h1 className="text-[32px] leading-[40px] font-extrabold">{profile.name}</h1>
              <div className="mt-1 text-[15px] font-semibold">726 friends</div>
              <div className="mt-1 text-[15px] font-semibold flex items-center gap-1.5 flex-wrap">
                <I.Pin size={14} /> Mandurriao <span>·</span> <I.School size={14} /> {profile.school}
              </div>
              <div className="text-fb-sub text-[15px] mt-0.5">{profile.title}</div>
            </div>
            <div className="flex gap-2 sm:pt-4">
              <Btn blue href={gmail()}><I.Plus size={16} /> Hire me</Btn>
              <Btn href="/files/resume.pdf" target="_blank">Resume</Btn>
              <Menu width={260} trigger={(_, toggle) => <Btn aria-label="More options" onClick={toggle}><I.Chevron size={16} /></Btn>} items={profileMenu(setTab)} />
            </div>
          </div>
        </div>
        <div className="border-t border-[#ced0d4] flex items-center justify-between">
          <div className="flex overflow-x-auto">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`relative px-4 h-[60px] font-semibold text-[15px] whitespace-nowrap ${tab === t ? 'text-fb-blue' : 'text-fb-sub hover:bg-fb-hover rounded-lg'}`}>
                {t}
                {tab === t && <span className="absolute bottom-0 inset-x-2 h-[3px] bg-fb-blue rounded-t" />}
              </button>
            ))}
          </div>
          <div className="hidden sm:block mr-1">
            <Menu width={260} trigger={(_, toggle) => <button aria-label="More options" onClick={toggle} className="grid place-items-center w-[52px] h-9 rounded-md bg-fb-btn hover:brightness-95"><I.Dots size={20} /></button>} items={profileMenu(setTab)} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Row = ({ icon: Ic, children }) => (
  <div className="flex items-center gap-3 py-2"><Ic size={24} className="shrink-0" /><span>{children}</span></div>
)

function LeftCol({ setTab }) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-4 self-start">
      <Reveal>
        <div className="card p-3 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-fb-blue grid place-items-center text-white"><I.Shield size={22} /></span>
          <div className="leading-tight"><div className="font-semibold text-[17px]">You locked your profile</div><a className="text-fb-blue cursor-pointer" onClick={() => setTab('Experience')}>Learn more</a></div>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="card p-4">
          <h2 className="text-[20px] font-bold mb-2">Personal details</h2>
          <Row icon={I.Pin}>Lives in Mandurriao, Iloilo City, Philippines</Row>
          <Row icon={I.House}>From Iloilo City, Philippines</Row>
          <Row icon={I.Cake}>{profile.birthday}</Row>
          <Row icon={I.Briefcase}>{profile.title}</Row>
          <h2 className="text-[20px] font-bold mt-3 mb-2">Education</h2>
          <div className="flex items-center gap-3 py-2"><span className="w-10 h-10 rounded-full bg-[#d0d6ea] grid place-items-center text-white"><I.School size={22} /></span>{profile.school}</div>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="card p-4">
          <h2 className="text-[20px] font-bold mb-3">Highlights</h2>
          <div className="grid grid-cols-2 gap-2">
            {projects.slice(0, 2).map((p, i) => (
              <button key={p.title} onClick={() => openLightbox(projectPhotos, i, { id: `project-${i}`, title: p.title, date: `${p.year} · ${p.cat}` })} className="relative aspect-[9/16] rounded-lg overflow-hidden bg-black text-left cursor-pointer hover:brightness-90 transition">
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 p-2 text-white text-sm font-semibold bg-gradient-to-t from-black/70">{p.title}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={160}>
        <div className="card p-4">
          <h2 className="text-[20px] font-bold mb-2">Find me on</h2>
          <div className="flex flex-wrap gap-2">
            {profile.socials.map((s) => <Btn key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</Btn>)}
          </div>
        </div>
      </Reveal>
    </aside>
  )
}

const Avatar = ({ size = 40 }) => <img src="/profile.jpg" alt="" style={{ width: size, height: size }} className="rounded-full object-cover object-[center_15%]" />

function Composer({ setTab }) {
  const actions = [
    [I.Video, 'Live video', () => window.open(profile.socials[0].href, '_blank')],
    [I.Photo, 'Photo/video', () => setTab('Projects')],
    [I.Flag, 'Life update', () => setTab('Experience')],
  ]
  return (
    <Reveal>
      <div className="card px-4 pt-3 pb-1">
        <div className="flex items-center gap-2 pb-3 border-b border-[#ced0d4]">
          <Avatar />
          <a href={gmail()} className="flex-1 h-10 rounded-full bg-fb-bg hover:bg-[#e4e6e9] px-4 flex items-center text-fb-sub text-[17px]">What's on your mind?</a>
        </div>
        <div className="flex">
          {actions.map(([Ic, l, fn]) => (
            <button key={l} onClick={fn} className="flex-1 h-10 my-1 rounded-lg hover:bg-fb-hover flex items-center justify-center gap-2 text-fb-sub font-semibold text-[15px]"><Ic size={24} />{l}</button>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

const ago = (t) => {
  const s = Math.floor((Date.now() - t) / 1000)
  if (s < 60) return 'Just now'
  if (s < 3600) return `${Math.floor(s / 60)}m`
  if (s < 86400) return `${Math.floor(s / 3600)}h`
  return `${Math.floor(s / 86400)}d`
}

// Temporary comments, saved in this browser only (localStorage)
function useComments(id) {
  const key = `comments:${id}`
  const [list, setList] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || [] } catch { return [] }
  })
  const save = (next) => {
    setList(next)
    try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* storage unavailable */ }
  }
  return [list, save]
}

// Facebook's default avatar: grey-blue tile, white head and shoulders
const GuestAvatar = ({ size = 32 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="shrink-0 rounded-full block" aria-label="Guest">
    <defs>
      <linearGradient id="gavatar-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#eef0f3" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="#c9ccd1" />
    <ellipse cx="50" cy="43" rx="15.5" ry="18" fill="#fff" />
    <path d="M16 112V86c0-12 9-20 20-20h28c11 0 20 8 20 20v26z" fill="url(#gavatar-body)" />
  </svg>
)

function Comments({ list, save }) {
  if (!list.length) return null
  const toggleLike = (id) => save(list.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c)))
  const remove = (id) => save(list.filter((c) => c.id !== id))
  return (
    <div className="px-4 pt-2 flex flex-col gap-2">
      {list.map((c) => (
        <div key={c.id} className="flex gap-2 items-start">
          <GuestAvatar />
          <div className="min-w-0">
            <div className="inline-block max-w-full bg-fb-bg rounded-2xl px-3 py-2">
              <div className="font-semibold text-[13px] leading-tight">You</div>
              <div className="text-[15px] break-words whitespace-pre-wrap">{c.text}</div>
            </div>
            <div className="flex gap-3 px-3 mt-0.5 text-[12px] font-semibold text-fb-sub">
              <button onClick={() => toggleLike(c.id)} className={c.liked ? 'text-fb-blue' : 'hover:underline'}>{c.liked ? 'Liked' : 'Like'}</button>
              <button onClick={() => remove(c.id)} className="hover:underline">Delete</button>
              <span className="font-normal">{ago(c.at)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Post({ post, onHide }) {
  const [text, setText] = useState('')
  const [list, saveComments] = useComments(post.id)
  const input = useRef(null)
  const copyLink = () => {
    const url = `${location.origin}/#${post.id}`
    navigator.clipboard?.writeText(url).then(() => toast('Link copied to clipboard'), () => toast(url))
  }
  const send = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    saveComments([...list, { id: Date.now(), text: t, at: Date.now(), liked: false }])
    setText('')
  }
  return (
    <Reveal>
      <article id={post.id} className="card" data-post>
        <div className="flex items-start gap-2 p-3 pb-0">
          <Avatar />
          <div className="flex-1 leading-tight">
            <div className="font-semibold text-[15px]">{post.who || profile.name}</div>
            <div className="text-fb-sub text-[13px] flex items-center gap-1">{post.date} · <I.Globe size={12} /></div>
          </div>
          <Menu width={240} trigger={(_, toggle) => (
            <button onClick={toggle} aria-label="Post options" className="w-9 h-9 rounded-full hover:bg-fb-hover grid place-items-center text-fb-sub"><I.Dots size={20} /></button>
          )} items={[
            { icon: '🔗', label: 'Copy link', onClick: copyLink },
            ...(post.href ? [{ icon: '↗', label: 'Open link', href: post.href }] : []),
            ...(post.photos ? [{ icon: '🖼️', label: 'View photos', onClick: () => openLightbox(post.photos, 0, post) }] : []),
            { divider: true },
            { icon: '🙈', label: 'Hide post', hint: 'See fewer like this', onClick: () => onHide(post.id) },
          ]} />
        </div>
        <div className="px-4 pt-3 pb-2 text-[15px]">{post.body}</div>
        {post.photos && <PhotoGrid photos={post.photos} post={post} />}
        <div className="mx-4 mt-2 border-t border-[#ced0d4] grid grid-cols-3 py-1 text-fb-sub font-semibold text-[15px]">
          <ReactButton LikeIcon={I.Like} />
          <button onClick={() => input.current?.focus()} className="h-9 rounded-md hover:bg-fb-hover flex items-center justify-center gap-2"><I.Comment size={20} />Comment</button>
          <button onClick={copyLink} className="h-9 rounded-md hover:bg-fb-hover flex items-center justify-center gap-2"><I.Share size={20} />Share</button>
        </div>
        <Comments list={list} save={saveComments} />
        <form onSubmit={send} className="flex items-center gap-2 px-4 pb-3 pt-2">
          <GuestAvatar />
          <input ref={input} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment..." className="flex-1 h-9 rounded-full bg-fb-bg px-3 text-[15px] outline-none focus:ring-2 focus:ring-fb-blue/40" />
          {text.trim() && <button className="text-fb-blue font-semibold text-[15px]">Send</button>}
        </form>
      </article>
    </Reveal>
  )
}

const FILTERS = [
  ['all', 'All posts'],
  ['project', 'Projects'],
  ['cert', 'Certifications'],
  ['intro', 'Intro'],
]

function buildPosts() {
  return [
    { id: 'intro', type: 'intro', title: 'Intro', date: 'Nov 8', body: (<>
      <p className="text-[24px] leading-tight font-semibold mb-1">{profile.tagline.split('. ')[0]}.</p>
      <p>{profile.bio}</p>
      <p className="mt-2 text-fb-sub">Open to projects and collaborations. 📍 {profile.location}</p></>) },
    ...projects.map((p, i) => ({ id: `project-${i}`, type: 'project', cat: p.cat, title: p.title, date: `${p.year} · ${p.cat}`, photos: [{ src: p.img, label: p.title }], href: p.href,
      body: (<><b>{p.title}</b> <span className="text-fb-sub">— {p.cat}, {p.year}</span>
        {p.href && <><br /><a className="text-fb-blue hover:underline" href={p.href} target="_blank" rel="noreferrer">{p.href.replace('https://', '')}</a></>}
        {p.repo && <><br /><a className="text-fb-blue hover:underline" href={p.repo} target="_blank" rel="noreferrer">{p.repo.replace('https://', '')}</a></>}</>) })),
    ...['Prelim', 'Midterm', 'Finals'].map((t) => ({ id: `mml-${t.toLowerCase()}`, type: 'mml', title: t, date: `2026 · MML Project`, photos: mmlPhotos(t),
      body: (<><b>{t}</b> <span className="text-fb-sub">— MML Project, 2026</span>
        {t === 'Midterm' && <><br /><a className="text-fb-blue hover:underline" href={VOXPOP} target="_blank" rel="noreferrer">MML VOX POP Project (Google Drive)</a></>}</>) })),
    { id: 'cert', type: 'cert', title: cert.t, date: `${cert.y} · Certification`, href: cert.href, body: (<>🏆 Earned <b>{cert.t}</b> from {cert.by} (Certificate No. {cert.no}). <a className="text-fb-blue" href={cert.href} target="_blank" rel="noreferrer">View certificate</a></>) },
  ]
}

function Feed({ setTab }) {
  const [view, setView] = useState('list')
  const [filter, setFilter] = useState('all')
  const [order, setOrder] = useState('default')
  const [hidden, setHidden] = useState([])
  const all = buildPosts()
  const [group, setGroup] = useState(null)
  const inGroup = (p) => group === null || p.type === (group === 'personal' ? 'project' : 'mml')
  let posts = all.filter((p) => !hidden.includes(p.id) && inGroup(p) && (filter === 'all' || p.type === filter || (filter === 'project' && p.type === 'mml')))
  if (order === 'oldest') posts = [...posts].reverse()
  const hide = (id) => { setHidden((h) => [...h, id]); toast('Post hidden. Reset filters to bring it back.') }
  return (
    <div className="flex flex-col gap-4">
      <Composer setTab={setTab} />
      <Reveal>
        <div className="card">
          <div className="flex items-center justify-between p-3">
            <h2 className="text-[20px] font-bold px-1">Posts</h2>
            <div className="flex gap-2">
              <Menu width={250} trigger={(open, toggle) => (
                <Btn onClick={toggle}><I.Filters size={18} /> Filters{filter !== 'all' && <span className="w-2 h-2 rounded-full bg-fb-blue" />}</Btn>
              )} items={[
                { label: 'Show' },
                ...FILTERS.map(([k, l]) => ({ label: l, check: filter === k, onClick: () => setFilter(k) })),
                { divider: true },
                { label: 'Sort by' },
                { label: 'Newest first', check: order === 'default', onClick: () => setOrder('default') },
                { label: 'Oldest first', check: order === 'oldest', onClick: () => setOrder('oldest') },
                { divider: true },
                { icon: '↺', label: 'Reset filters', onClick: () => { setFilter('all'); setOrder('default'); setGroup(null); setHidden([]) } },
              ]} />
              <Menu width={270} trigger={(open, toggle) => (
                <Btn onClick={toggle}><I.Gear size={18} /> Manage posts</Btn>
              )} items={[
                { label: 'MML Projects', check: group === 'mml', hint: 'Prelim · Midterm · Finals', onClick: () => setGroup(group === 'mml' ? null : 'mml') },
                { label: 'Personal Projects', check: group === 'personal', hint: 'All 5 of my builds', onClick: () => setGroup(group === 'personal' ? null : 'personal') },
              ]} />
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-[#ced0d4]">
            {[['list', I.List, 'List view'], ['grid', I.Grid, 'Grid view']].map(([k, Ic, l]) => (
              <button key={k} onClick={() => setView(k)} className={`h-[52px] relative font-semibold flex items-center justify-center gap-2 ${view === k ? 'text-fb-blue' : 'text-fb-sub hover:bg-fb-hover'}`}>
                <Ic size={18} />{l}{view === k && <span className="absolute bottom-0 inset-x-0 h-[3px] bg-fb-blue" />}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
      {posts.length === 0 && <div className="card p-6 text-center text-fb-sub">No posts match. Try changing your filters.</div>}
      {view === 'grid' ? (
        <div className="card p-2 grid grid-cols-3 gap-1">
          {posts.filter((p) => p.photos).flatMap((p) => p.photos.slice(0, p.type === 'mml' ? 3 : 1).map((ph, k) => (
            <button key={p.id + k} onClick={() => openLightbox(p.photos, k, p)} className="relative aspect-square overflow-hidden rounded cursor-pointer hover:brightness-90 transition">
              {ph.src ? <Media ph={ph} className="absolute inset-0 w-full h-full object-cover" /> :<div className="absolute inset-0"><Placeholder n={k} label={ph.label} /></div>}
            </button>
          )))}
          {posts.every((p) => !p.photos) && posts.length > 0 && <div className="col-span-3 p-6 text-center text-fb-sub">No photos in this selection.</div>}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((p) => <Post key={p.id} post={p} onHide={hide} />)}
        </div>
      )}
    </div>
  )
}

const Panel = ({ title, children }) => (
  <Reveal><div className="card p-5"><h2 className="text-[20px] font-bold mb-3">{title}</h2>{children}</div></Reveal>
)

function About() {
  return (
    <div className="flex flex-col gap-4">
      <Panel title="About"><p className="text-[17px]">{profile.bio}</p><p className="text-fb-sub mt-2">{profile.tagline}</p></Panel>
      <Panel title="Work and education">
        {experience.map((e) => (
          <div key={e.t} className="flex gap-3 py-2"><span className="w-10 h-10 rounded-full bg-[#d0d6ea] grid place-items-center text-white shrink-0"><I.School size={22} /></span>
            <div className="leading-tight"><div className="font-semibold">{e.t}</div><div className="text-fb-sub text-[13px]">{e.w} · {e.y}</div></div></div>
        ))}
      </Panel>
      <Panel title="Certifications"><div className="font-semibold">{cert.t}</div><div className="text-fb-sub text-[13px]">{cert.by} · No. {cert.no} · {cert.y}</div></Panel>
      <Panel title="Contact info">
        <div className="space-y-1"><div>Email: <a className="text-fb-blue" href={gmail()}>{profile.email}</a></div>
          {profile.socials.slice(0, 3).map((s) => <div key={s.label}>{s.label}: <a className="text-fb-blue" href={s.href} target="_blank" rel="noreferrer">{s.href}</a></div>)}</div>
      </Panel>
    </div>
  )
}

function Friends() {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(stack).map(([k, v]) => (
        <Panel key={k} title={`${k} · ${v.length}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {v.map((s) => (
              <div key={s} className="border border-[#ced0d4] rounded-lg overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-[#e7f0ff] to-[#d8e4f8] grid place-items-center text-3xl font-extrabold text-fb-blue">{s[0]}</div>
                <div className="p-2 font-semibold text-[15px]">{s}</div>
              </div>
            ))}
          </div>
        </Panel>
      ))}
    </div>
  )
}

function Multimedia() {
  return (
    <Panel title="Multimedia Projects">
      {['Prelim', 'Midterm', 'Finals'].map((t) => {
        const photos = mmlPhotos(t)
        const post = { id: `mml-${t.toLowerCase()}`, title: `${t} · Multimedia Project`, date: '2026 · Multimedia Project' }
        return (
          <section key={t} className="mt-4 first:mt-0">
            <h3 className="text-[17px] font-semibold mb-2">{t}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {photos.slice(0, 8).map((ph, k) => (
                <button key={k} onClick={() => openLightbox(photos, k, post)} aria-label={`Open ${ph.label}`}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:brightness-90 transition">
                  <div className="absolute inset-0">{ph.src ? <Media ph={ph} className="w-full h-full object-cover object-top" /> :<Placeholder n={k} label={ph.label} />}</div>
                  {ph.src && <span className="absolute inset-x-0 bottom-0 p-1.5 text-white text-[12px] font-semibold leading-tight bg-gradient-to-t from-black/75 text-left">{ph.label}</span>}
                  {k === 7 && photos.length > 8 && <span className="absolute inset-0 grid place-items-center bg-black/45 text-white text-2xl font-semibold">+{photos.length - 8}</span>}
                </button>
              ))}
            </div>
          </section>
        )
      })}
    </Panel>
  )
}

function Photos() {
  return (
    <>
    <Panel title="Personal Projects">
      <div className="grid grid-cols-2 gap-2">{projects.map((p, i) => (
        <figure key={p.title} onClick={() => openLightbox(projectPhotos, i, { id: `project-${i}`, title: p.title, date: `${p.year} · ${p.cat}` })} className="relative overflow-hidden rounded-lg cursor-pointer hover:brightness-90 transition"><img src={p.img} alt={p.title} loading="lazy" className="w-full aspect-video object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 p-2 text-white text-sm font-semibold bg-gradient-to-t from-black/70">{p.title}</figcaption></figure>))}</div>
    </Panel>
    <div className="mt-4"><Multimedia /></div>
    </>
  )
}

function Reels() {
  return (
    <Panel title="Set up">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{setup.map(([k, v]) => (
        <div key={k} className="aspect-[9/16] rounded-lg p-3 flex flex-col justify-end text-white bg-gradient-to-b from-[#1c2b4a] to-[#0866ff]">
          <div className="text-lg font-bold">{k}</div><div className="text-[13px] opacity-90">{v}</div></div>))}</div>
    </Panel>
  )
}

function More() {
  return (
    <Panel title="Get in touch">
      <p className="mb-3">Open to projects and collaborations.</p>
      <div className="flex flex-wrap gap-2"><Btn blue href={gmail()}>Email me</Btn><Btn href="/files/resume.pdf" target="_blank">Download resume</Btn>
        {profile.socials.slice(0, 3).map((s) => <Btn key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</Btn>)}</div>
    </Panel>
  )
}

export default function App() {
  const [tab, setTab] = useState('All')
  const right = { All: <Feed setTab={setTab} />, Projects: <Photos />, 'Tech Stack': <Friends />, Experience: <About />, 'Set up': <Reels />, Contacts: <More /> }[tab]
  return (
    <div id="top">
      <Lightbox />
      <Toaster />
      <ReactionDefs />
      <Header tab={tab} setTab={setTab} />
      <main className="max-w-[1212px] mx-auto px-3 sm:px-0 py-4 grid grid-cols-1 lg:grid-cols-[490px_1fr] gap-4" key={tab}>
        <LeftCol setTab={setTab} />
        <section className="min-w-0">{right}</section>
      </main>
    </div>
  )
}
