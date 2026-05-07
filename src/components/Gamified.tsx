import React from 'react'

// Leaderboard Row #1 (63)
export function LeaderboardRowTop({
  rank = 1,
  name = 'CyberNinja',
  level = '99 Assassin',
  score = '142,500',
  avatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=King&backgroundColor=1e293b',
  className = ''
}: {
  rank?: number
  name?: string
  level?: string
  score?: string
  avatar?: string
  className?: string
}) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl bg-slate-800/50 border border-yellow-500/20 hover:bg-slate-800 transition-colors relative overflow-hidden ${className}`}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
      <div className="w-8 text-center font-black text-xl text-yellow-400">#{rank}</div>
      <img src={avatar} alt="" className="w-10 h-10 rounded-full border-2 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)] bg-slate-900" />
      <div className="flex-1">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          {name}
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <div className="text-xs text-slate-400 font-mono">Lvl {level}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-mono font-black text-yellow-400">{score}</div>
        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Score</div>
      </div>
    </div>
  )
}

// Standard Leaderboard Row (64)
export function LeaderboardRowStandard({
  rank = 4,
  name = 'NoobMaster69',
  score = '89,200',
  avatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player4&backgroundColor=1e293b',
  className = ''
}: {
  rank?: number
  name?: string
  score?: string
  avatar?: string
  className?: string
}) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/80 transition-colors ${className}`}>
      <div className="w-8 text-center font-bold text-slate-500">#{rank}</div>
      <img src={avatar} alt="" className="w-10 h-10 rounded-full bg-slate-800" />
      <div className="flex-1">
        <div className="text-sm font-bold text-slate-200">{name}</div>
      </div>
      <div className="text-sm font-mono font-bold text-indigo-400">{score}</div>
    </div>
  )
}

// Coin Balance Display (65)
export function CoinBalance({
  balance = '1,240',
  className = ''
}: {
  balance?: string
  className?: string
}) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg shadow-inner ${className}`}>
      <div className="p-1.5 bg-yellow-500/20 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <circle cx="8" cy="8" r="6"/>
          <path d="M18.09 10.37A6 6 0 1 1 10.34 18"/>
          <path d="M7 6h1v4"/>
          <path d="m16.71 13.88.7.71-2.82 2.82"/>
        </svg>
      </div>
      <div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mb-0.5">Balance</div>
        <div className="text-lg font-black text-yellow-400 font-mono leading-none">
          {balance}
          <span className="text-xs text-yellow-600">C</span>
        </div>
      </div>
      <button className="ml-4 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
  )
}

// Achievement Unlock Toast (66)
export function AchievementToast({
  title = 'First Blood',
  description = 'Win your first multiplayer arcade match.',
  className = ''
}: {
  title?: string
  description?: string
  className?: string
}) {
  return (
    <div className={`bg-gradient-to-r from-emerald-900/40 to-slate-900 border border-emerald-500/30 rounded-xl p-4 flex gap-4 items-center shadow-lg relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTYsMTg1LDEyOSwwLjEpIi8+PC9zdmc+')]"></div>
      <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center relative z-10 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M4 22h16"/>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
        </svg>
      </div>
      <div className="relative z-10">
        <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-0.5 animate-pulse">Achievement Unlocked!</div>
        <div className="text-sm font-bold text-white">{title}</div>
        <div className="text-xs text-emerald-200/70 mt-1">{description}</div>
      </div>
    </div>
  )
}

// Player Mini-Profile & XP (67)
export function PlayerProfile({
  name = 'PlayerOne',
  level = 14,
  xpToNext = '1.2k',
  progress = 75,
  avatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=P1&backgroundColor=1e293b',
  className = ''
}: {
  name?: string
  level?: number
  xpToNext?: string
  progress?: number
  avatar?: string
  className?: string
}) {
  return (
    <div className={`bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-4 ${className}`}>
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-slate-800 p-0.5 border-2 border-indigo-500">
          <img src={avatar} className="w-full h-full rounded-full" alt="" />
        </div>
        <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-[10px] font-black px-1.5 py-0.5 rounded border border-slate-900 text-white">{level}</span>
      </div>
      <div className="flex-1">
        <div className="font-bold text-white mb-1 flex justify-between">
          <span>{name}</span>
          <span className="text-xs text-indigo-400 font-mono">{xpToNext} XP to next lvl</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
          <div className="bg-indigo-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

// Gamified Showcase
export function GamifiedShowcase() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {/* 63. Leaderboard Row (#1 Player) */}
        <div>
          <span className="text-xs text-slate-500 font-mono mb-2 block">63. Leaderboard Row (#1 Player)</span>
          <LeaderboardRowTop />
        </div>

        {/* 64. Leaderboard Row Standard */}
        <div>
          <span className="text-xs text-slate-500 font-mono mb-2 block">64. Leaderboard Row (Standard)</span>
          <LeaderboardRowStandard />
        </div>

        {/* 65. Coin Display */}
        <div>
          <span className="text-xs text-slate-500 font-mono mb-2 block">65. Coin Balance Display</span>
          <CoinBalance />
        </div>
      </div>

      <div className="space-y-6">
        {/* 66. Achievement Unlock */}
        <div>
          <span className="text-xs text-slate-500 font-mono mb-2 block">66. Achievement Unlocked Toast</span>
          <AchievementToast />
        </div>

        {/* 67. Player Level Profile Block */}
        <div>
          <span className="text-xs text-slate-500 font-mono mb-2 block">67. Player Mini-Profile & XP</span>
          <PlayerProfile />
        </div>
      </div>
    </div>
  )
}
