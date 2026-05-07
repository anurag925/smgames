import React from 'react'

// Badge Components

interface BadgeProps {
  children: React.ReactNode
  variant?: 'solid' | 'subtle' | 'trending' | 'rating' | 'filter-active' | 'filter-inactive' | 'level' | 'rank'
  className?: string
}

export function Badge({ children, variant = 'solid', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center gap-1'

  const variantClasses = {
    solid: 'px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-500 text-white uppercase tracking-wider',
    subtle: 'px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700',
    trending: 'px-2 py-1 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800 shadow-lg',
    rating: 'px-2 py-1 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800 shadow-lg',
    'filter-active': 'px-4 py-2 rounded-full font-bold text-sm bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]',
    'filter-inactive': 'px-4 py-2 rounded-full font-bold text-sm bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white',
    level: 'w-8 h-8 rounded bg-gradient-to-br from-indigo-600 to-purple-800 border border-indigo-400 flex items-center justify-center shadow-lg',
    rank: 'px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30'
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

// Solid Badge (23)
export function SolidBadge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-500 text-white uppercase tracking-wider ${className}`}>{children}</span>
}

// Subtle Badge (24)
export function SubtleBadge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 ${className}`}>{children}</span>
}

// Trending Badge (25)
export function TrendingBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`px-2 py-1 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800 flex items-center gap-1 shadow-lg w-fit ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
      </svg>
      <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">Hot</span>
    </div>
  )
}

// Rating Badge (26)
export function RatingBadge({ rating = '4.8', className = '' }: { rating?: string; className?: string }) {
  return (
    <div className={`px-2 py-1 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800 flex items-center gap-1 shadow-lg w-fit ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      <span className="text-[10px] font-bold text-slate-200">{rating}</span>
    </div>
  )
}

// Filter Tag Active (27)
export function FilterTagActive({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <circle cx="12" cy="12" r="10"/>
        <line x1="22" y1="12" x2="18" y2="12"/>
        <line x1="6" y1="12" x2="2" y2="12"/>
        <line x1="12" y1="6" x2="12" y2="2"/>
        <line x1="12" y1="22" x2="12" y2="18"/>
      </svg>
      {children}
    </button>
  )
}

// Filter Tag Inactive (28)
export function FilterTagInactive({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m3 16 15 1-12-9 3-3z"/>
        <path d="M14.5 12.5 18 9"/>
      </svg>
      {children}
    </button>
  )
}

// Dot Indicator (29)
export function DotIndicator({ label = '12k Players', className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium text-slate-400 ${className}`}>
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      {label}
    </div>
  )
}

// Counter Pill (30)
export function CounterPill({ count = 3, className = '' }: { count?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold text-white bg-pink-500 rounded-full ${className}`}>
      {count}
    </span>
  )
}

// Level Box (31)
export function LevelBox({ level = 42, className = '' }: { level?: number; className?: string }) {
  return (
    <div className={`w-8 h-8 rounded bg-gradient-to-br from-indigo-600 to-purple-800 border border-indigo-400 flex items-center justify-center shadow-lg ${className}`}>
      <span className="text-xs font-black text-white">{level}</span>
    </div>
  )
}

// Rank Crown (32)
export function RankCrown({ label = 'VIP', className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center gap-1.5 w-fit ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 fill-yellow-500">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
      </svg>
      <span className="text-xs font-black text-yellow-500 tracking-wide">{label}</span>
    </div>
  )
}

// Badges Showcase
export function BadgesShowcase() {
  return (
    <div className="flex flex-wrap gap-8 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50">
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">23. Solid</span>
        <SolidBadge>New</SolidBadge>
      </div>

      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">24. Subtle</span>
        <SubtleBadge>Arcade</SubtleBadge>
      </div>

      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">25. Trending / Hot</span>
        <TrendingBadge />
      </div>

      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">26. Rating</span>
        <RatingBadge />
      </div>

      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">27. Filter Active</span>
        <FilterTagActive>Shooter</FilterTagActive>
      </div>

      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">28. Filter Default</span>
        <FilterTagInactive>Space</FilterTagInactive>
      </div>

      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">29. Dot Indicator</span>
        <DotIndicator />
      </div>

      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">30. Counter Pill</span>
        <CounterPill />
      </div>

      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">31. Level Box</span>
        <LevelBox />
      </div>

      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">32. Rank Crown</span>
        <RankCrown />
      </div>
    </div>
  )
}
