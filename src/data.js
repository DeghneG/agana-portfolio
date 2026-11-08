export const profile = {
  name: 'Deghne Gabriel',
  full: 'Deghne Gabriel Agana',
  title: 'Front-end Developer',
  location: 'Iloilo City, Philippines',
  school: 'University of San Agustin',
  birthday: 'July 10, 2006',
  email: 'deghneagana@gmail.com',
  bio: "I'm Deghne Gabriel Agana, a third-year IT student at the University of San Agustin who builds front-end.",
  tagline: 'Designing interfaces that move. Design got me in. Animation keeps me here.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/DeghneG' },
    { label: 'Facebook', href: 'https://www.facebook.com/deghne.agana/' },
    { label: 'Instagram', href: 'https://www.instagram.com/deghne.gbrl/' },
    { label: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=deghneagana@gmail.com' },
  ],
}
export const projects = [
  { title: 'ITSA Website', cat: 'Web Dev', year: 2026, img: '/projects/itsa.png', href: 'https://itsa-website-psi.vercel.app', repo: 'https://github.com/JustineSalinas/ITSA-Website' },
  { title: 'Pray For Us', cat: 'E-Commerce', year: 2026, img: '/projects/pray-for-us.png', href: 'https://prayforus.vercel.app', repo: 'https://github.com/DeghneG/Pray-For-Us' },
  { title: 'Urban City Cuts', cat: 'Web Dev', year: 2026, img: '/projects/urban-city-cuts.png', href: 'https://urbancitycuts.vercel.app', repo: 'https://github.com/DeghneG/Urban-City-Cuts' },
  { title: 'FragranceVault', cat: 'Personal Project', year: 2026, img: '/projects/gabfrag-vault.png', href: 'https://fragrance-vault-delta.vercel.app', repo: 'https://github.com/DeghneG/FragranceVault' },
  { title: 'The Quest Log of Gab', cat: 'Personal Project', year: 2026, img: '/projects/quest-log.png', href: 'https://quest-log-theta.vercel.app', repo: 'https://github.com/DeghneG/QuestLog' },
]
export const stack = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Three.js', 'Framer Motion'],
  Backend: ['Node.js', 'Python', 'Supabase', 'WordPress'],
  Tools: ['GitHub', 'Vercel', 'Canva'],
  'AI tools': ['Claude', 'ChatGPT', 'Gemini'],
}
export const experience = [
  { t: 'BS Information Technology (3rd Year)', w: 'University of San Agustin Main, Iloilo City', y: '2024 to Present' },
  { t: 'Senior High School (Grades 11–12)', w: 'University of San Agustin Main, Iloilo City', y: '2022 to 2024' },
  { t: 'Junior High School (Grades 7–10)', w: 'BED University of San Agustin, Iloilo City', y: '2018 to 2022' },
]
export const setup = [
  ['CPU', 'AMD Ryzen 5 5600G (6 cores, 12 threads, up to 4.4 GHz boost)'],
  ['GPU', 'Palit RTX 5060 Infinity 3 (8GB VRAM, DLSS 4, triple fan)'],
  ['RAM', 'Kingston FURY Beast (32GB total, high-performance DDR4)'],
  ['Monitors', 'AOC 27G11ZE2 (27", 240Hz) and AOC 24G42E (24", 180Hz)'],
  ['Keyboard', 'ASUS TUF Gaming K3 (mechanical switches, detachable wrist rest)'],
  ['Mouse', 'Razer DeathAdder V3 HyperSpeed (Focus X 26K sensor, 55g)'],
  ['Headphones', 'HyperX Cloud III (53mm angled drivers, DTS Headphone:X)'],
  ['Mousepad', 'Pulsar ParaControl XL (460 × 410 × 4 mm, textured surface)'],
]
export const cert = { t: 'AI Prompts Fundamentals', by: 'Coddy', no: '001', y: 2026, href: 'https://gab-io.vercel.app/certificates/ai-prompts-fundamentals.pdf' }

export const gmail = (subject = 'Hiring inquiry', body = 'Hi Deghne,\n\nI would like to work with you on...\n') =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
