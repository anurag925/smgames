import React from 'react'

// Pill Tabs / Filters (72)
export function PillTabs({
  tabs = [
    { label: 'All Games', icon: 'gamepad', active: true },
    { label: 'Action', icon: 'swords', active: false },
    { label: 'Puzzle', icon: 'puzzle', active: false },
    { label: 'Premium', icon: 'lock', active: false, disabled: true }
  ],
  className = ''
}: {
  tabs?: { label: string; icon: string; active?: boolean; disabled?: boolean }[]
  className?: string
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {tabs.map((tab, i) => (
        <button
          key={i}
          disabled={tab.disabled}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-colors ${
            tab.active
              ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
              : tab.disabled
              ? 'bg-slate-900/80 text-slate-600 border border-slate-800 cursor-not-allowed'
              : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          {tab.icon === 'gamepad' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="12" x2="10" y2="12"/>
              <line x1="8" y1="10" x2="8" y2="14"/>
              <line x1="15" y1="13" x2="15.01" y2="13"/>
              <line x1="18" y1="11" x2="18.01" y2="11"/>
              <rect x="2" y="6" width="20" height="12" rx="2"/>
            </svg>
          )}
          {tab.icon === 'swords' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/>
              <line x1="13" y1="19" x2="19" y2="13"/>
              <line x1="16" y1="16" x2="20" y2="20"/>
              <line x1="19" y1="21" x2="21" y2="19"/>
              <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/>
              <line x1="5" y1="14" x2="9" y2="18"/>
              <line x1="7" y1="17" x2="4" y2="20"/>
              <line x1="3" y1="19" x2="5" y2="21"/>
            </svg>
          )}
          {tab.icon === 'puzzle' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.53 1.17.1 1.63l-.826.826c-.26.26-.615.31-.922.106l-1.417-1.417c-.17-.17-.185-.44-.036-.626l.826-.826c.46-.46.53-1.159.1-1.63l-1.568-1.568c-.23-.23-.556-.338-.878-.289l-1.823 1.823c-.262.262-.382.64-.314.978l.826 2.926c.115.412-.003.847-.314 1.158l-1.718 1.718c-.468.468-1.18.503-1.63.1l-.826-.826c-.204-.204-.255-.5-.154-.762l1.417-1.417c.186-.186.33-.44.39-.702l.826-2.926c.135-.49.003-1.009-.314-1.378z"/>
            </svg>
          )}
          {tab.icon === 'lock' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// Breadcrumbs (73)
export function Breadcrumbs({
  items = [
    { label: 'Library', href: '#', icon: 'home' },
    { label: 'Arcade', href: '#' },
    { label: 'Neon Rider', current: true }
  ],
  className = ''
}: {
  items?: { label: string; href?: string; icon?: string; current?: boolean }[]
  className?: string
}) {
  return (
    <nav className={`flex text-sm font-medium text-slate-400 ${className}`}>
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, i) => (
          <li key={i} className="inline-flex items-center">
            {i > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 mx-1">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="inline-flex items-center hover:text-white transition-colors"
              >
                {item.icon === 'home' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                )}
                {item.label}
              </a>
            ) : item.current ? (
              <span className="text-indigo-400 ml-1 md:ml-2">{item.label}</span>
            ) : (
              <span className="hover:text-white transition-colors ml-1 md:ml-2">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Pagination (74)
export function Pagination({
  currentPage = 2,
  totalPages = 12,
  className = ''
}: {
  currentPage?: number
  totalPages?: number
  className?: string
}) {
  return (
    <nav className={`flex items-center gap-1 ${className}`}>
      <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      {[1, 2, 3].map(page => (
        <button
          key={page}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors font-bold text-sm ${
            page === currentPage
              ? 'bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]'
              : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
          }`}
        >
          {page}
        </button>
      ))}
      <span className="w-8 h-8 flex items-center justify-center text-slate-500">...</span>
      <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors font-bold text-sm">
        {totalPages}
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </nav>
  )
}

// Profile Menu Dropdown (75)
export function ProfileDropdown({
  username = 'PlayerOne',
  email = 'user@microcade.io',
  className = ''
}: {
  username?: string
  email?: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden py-1">
        <div className="px-4 py-2 border-b border-slate-800 mb-1">
          <p className="text-sm font-bold text-white">{username}</p>
          <p className="text-xs text-slate-400 truncate">{email}</p>
        </div>
        <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Profile
        </a>
        <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Settings
        </a>
        <div className="border-t border-slate-800 my-1"></div>
        <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign out
        </a>
      </div>
    </div>
  )
}

// Tooltip (76)
export function Tooltip({
  text = 'Double XP Enabled!',
  className = ''
}: {
  text?: string
  className?: string
}) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded shadow-lg opacity-100 mb-2 whitespace-nowrap z-10 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-indigo-600">
        {text}
      </div>
      <button className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-all border border-slate-700 hover:text-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 3 10 13 2"/>
        </svg>
      </button>
    </div>
  )
}

// Navigation Showcase
export function NavigationShowcase() {
  return (
    <div className="grid grid-cols-1 gap-8">
      {/* 72. Horizontal Tabs */}
      <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50">
        <span className="text-xs text-slate-500 font-mono mb-4 block">72. Pill Tabs / Filters</span>
        <PillTabs />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 73. Breadcrumbs */}
        <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50">
          <span className="text-xs text-slate-500 font-mono mb-4 block">73. Breadcrumbs</span>
          <Breadcrumbs />
        </div>

        {/* 74. Pagination */}
        <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50">
          <span className="text-xs text-slate-500 font-mono mb-4 block">74. Pagination</span>
          <Pagination />
        </div>

        {/* 75. Profile Menu Dropdown */}
        <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 h-64 flex flex-col items-center">
          <span className="text-xs text-slate-500 font-mono mb-4 w-full text-left block">75. Profile Menu Dropdown</span>
          <ProfileDropdown />
        </div>

        {/* 76. Tooltip */}
        <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 flex flex-col items-center justify-center relative h-64">
          <span className="text-xs text-slate-500 font-mono mb-4 w-full text-left absolute top-8 left-8">76. Tooltip (Top)</span>
          <div className="mt-8">
            <Tooltip />
          </div>
        </div>
      </div>
    </div>
  )
}
