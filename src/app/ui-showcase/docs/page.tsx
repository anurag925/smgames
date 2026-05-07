import Link from 'next/link'

export default function DocsOverview() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div>
        <h1 className="text-4xl font-black text-white mb-4">Documentation</h1>
        <p className="text-slate-400 text-lg">
          Complete guide to using UILIB components in your Next.js projects.
        </p>
      </div>

      {/* Quick Start */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
        <div className="space-y-4">
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
            <p className="text-sm text-slate-400 mb-2">1. Import components from the library</p>
            <pre className="text-sm text-emerald-400 font-mono">
{`import { Button, Badge, Avatar } from '@/components'`}
            </pre>
          </div>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
            <p className="text-sm text-slate-400 mb-2">2. Use them in your components</p>
            <pre className="text-sm text-emerald-400 font-mono">
{`<Button variant="primary">Play Now</Button>
<Badge variant="solid">New</Badge>
<Avatar src="/avatar.png" size="lg" />`}
            </pre>
          </div>
        </div>
      </section>

      {/* Component Categories */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Component Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Typography',
              count: '7',
              desc: 'Headings, body text, gradient text',
              href: '/ui-showcase/docs/typography',
              color: 'from-indigo-500 to-purple-500'
            },
            {
              title: 'Buttons',
              count: '15',
              desc: 'All button variants and sizes',
              href: '/ui-showcase/docs/buttons',
              color: 'from-pink-500 to-rose-500'
            },
            {
              title: 'Badges & Tags',
              count: '10',
              desc: 'Labels, indicators, and badges',
              href: '/ui-showcase/docs/badges',
              color: 'from-emerald-500 to-teal-500'
            },
            {
              title: 'Avatars',
              count: '9',
              desc: 'Profile pictures and groups',
              href: '/ui-showcase/docs/avatars',
              color: 'from-purple-500 to-pink-500'
            },
            {
              title: 'Forms & Inputs',
              count: '12',
              desc: 'Inputs, selects, and controls',
              href: '/ui-showcase/docs/forms',
              color: 'from-cyan-500 to-blue-500'
            },
            {
              title: 'Progress & Loaders',
              count: '7',
              desc: 'Progress bars and animations',
              href: '/ui-showcase/docs/progress',
              color: 'from-yellow-500 to-orange-500'
            },
            {
              title: 'Cards & Panels',
              count: '6',
              desc: 'Content containers and cards',
              href: '/ui-showcase/docs/cards',
              color: 'from-blue-500 to-indigo-500'
            },
            {
              title: 'Gamified Elements',
              count: '8',
              desc: 'Leaderboards, achievements, profiles',
              href: '/ui-showcase/docs/gamified',
              color: 'from-red-500 to-pink-500'
            },
            {
              title: 'Alerts & Feedback',
              count: '4',
              desc: 'Banners, toasts, and alerts',
              href: '/ui-showcase/docs/alerts',
              color: 'from-orange-500 to-yellow-500'
            },
            {
              title: 'Navigation',
              count: '5',
              desc: 'Tabs, breadcrumbs, pagination',
              href: '/ui-showcase/docs/navigation',
              color: 'from-teal-500 to-emerald-500'
            },
          ].map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{cat.title}</h3>
                <span className={`text-2xl font-black bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                  {cat.count}
                </span>
              </div>
              <p className="text-sm text-slate-400">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Design Principles */}
      <section className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Design Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">Dark Mode First</h3>
            <p className="text-sm text-slate-400">All components are designed for dark mode interfaces with proper contrast and readability.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">Gamified Aesthetics</h3>
            <p className="text-sm text-slate-400">Components include game-inspired elements like glow effects, progress indicators, and achievement styles.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3 className="text-white font-bold mb-2">Tailwind Powered</h3>
            <p className="text-sm text-slate-400">All styles use Tailwind CSS utilities for easy customization and consistent spacing.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
