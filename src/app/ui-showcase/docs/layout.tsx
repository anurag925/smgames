import Link from 'next/link'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/ui-showcase" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back to Showcase
            </Link>
            <span className="text-slate-700">/</span>
            <span className="text-white font-medium">Documentation</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/30">
              v1.0.0
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-1 sticky top-24">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Getting Started</p>
              <Link href="/ui-showcase/docs" className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all text-sm">
                Overview
              </Link>

              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 mt-6 px-3">Components</p>
              {[
                { href: '/ui-showcase/docs/typography', label: 'Typography' },
                { href: '/ui-showcase/docs/buttons', label: 'Buttons' },
                { href: '/ui-showcase/docs/badges', label: 'Badges & Tags' },
                { href: '/ui-showcase/docs/avatars', label: 'Avatars' },
                { href: '/ui-showcase/docs/forms', label: 'Forms & Inputs' },
                { href: '/ui-showcase/docs/progress', label: 'Progress & Loaders' },
                { href: '/ui-showcase/docs/cards', label: 'Cards & Panels' },
                { href: '/ui-showcase/docs/gamified', label: 'Gamified Elements' },
                { href: '/ui-showcase/docs/alerts', label: 'Alerts & Feedback' },
                { href: '/ui-showcase/docs/navigation', label: 'Navigation' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
