import React from 'react'

// Basic Card (58)
export function BasicCard({
  title = 'Account Security',
  description = 'Enable Two-Factor Authentication to keep your inventory safe.',
  action = 'Enable 2FA →',
  icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  className = ''
}: {
  title?: string
  description?: string
  action?: string
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl p-5 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300">{action}</button>
    </div>
  )
}

// Glowing Game Card (59)
export function GlowingGameCard({
  title = 'Neon Rider',
  category = 'Arcade Racing',
  className = ''
}: {
  title?: string
  category?: string
  className?: string
}) {
  return (
    <div className={`group cursor-pointer ${className}`}>
      <div className="relative w-full aspect-square rounded-2xl p-1 bg-gradient-to-br from-pink-500 to-rose-600 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(244,63,94,0.6)]">
        <div className="w-full h-full bg-slate-900 rounded-xl relative overflow-hidden flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-50 group-hover:scale-110 transition-transform duration-500 ease-out z-0">
            <polygon points="13 2 3 14 12 14 11 22 3 10 13 2"/>
          </svg>
          <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 backdrop-blur-[2px]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 p-0.5 shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-300 delay-75">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white ml-1">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-950 to-transparent z-20">
            <h3 className="text-lg font-black text-white">{title}</h3>
            <p className="text-xs font-medium text-slate-400">{category}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat Card (60)
export function StatCard({
  label = 'Total Coins Earned',
  value = '24,590',
  trend = '+12%',
  icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
      <circle cx="8" cy="8" r="6"/>
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18"/>
      <path d="M7 6h1v4"/>
      <path d="m16.71 13.88.7.71-2.82 2.82"/>
    </svg>
  ),
  className = ''
}: {
  label?: string
  value?: string
  trend?: string
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden ${className}`}>
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">{icon}</div>
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
            <polyline points="16 7 22 7 22 13"/>
          </svg>
          {trend}
        </span>
      </div>
      <h4 className="text-slate-400 text-sm font-medium mb-1">{label}</h4>
      <div className="text-3xl font-black text-white font-mono tracking-tight">{value}</div>
    </div>
  )
}

// Quest Panel (61)
export function QuestPanel({
  title = 'Active Quest',
  resetLabel = 'Resets in 4h',
  questTitle = 'Score 1000 in Neon Rider',
  questDescription = 'Play the featured game and beat the high score.',
  reward = '+150',
  progress = 45,
  current = 450,
  total = 1000,
  className = ''
}: {
  title?: string
  resetLabel?: string
  questTitle?: string
  questDescription?: string
  reward?: string
  progress?: number
  current?: number
  total?: number
  className?: string
}) {
  return (
    <div className={`bg-slate-900/50 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group ${className}`}>
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {title}
        </h3>
        <span className="text-xs font-bold text-slate-500">{resetLabel}</span>
      </div>
      <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/50 relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm font-bold text-slate-200 mb-1">{questTitle}</p>
            <p className="text-xs text-slate-500">{questDescription}</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded text-xs font-bold text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6"/>
              <path d="M18.09 10.37A6 6 0 1 1 10.34 18"/>
            </svg>
            {reward}
          </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 mb-1 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-indigo-500 h-2 rounded-full relative" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-[10px] text-right text-slate-500 font-medium mt-1">{current} / {total} Pts</div>
      </div>
    </div>
  )
}

// Magic Promotional Card (62)
export function MagicPromoCard({
  title = 'Unlock Pro',
  description = 'Get double XP weekend passes and exclusive avatars.',
  buttonText = 'Upgrade Now',
  className = ''
}: {
  title?: string
  description?: string
  buttonText?: string
  className?: string
}) {
  return (
    <div className={`h-full rounded-2xl p-6 bg-gradient-to-br from-indigo-600 to-purple-800 text-center relative overflow-hidden group cursor-pointer border border-indigo-400/30 flex flex-col justify-center ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 mx-auto mb-3 group-hover:scale-125 transition-transform duration-300">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
        <path d="M3 5h4"/>
        <path d="M17 19h4"/>
      </svg>
      <h3 className="text-xl font-black text-white mb-1 relative z-10">{title}</h3>
      <p className="text-indigo-200 text-xs mb-4 relative z-10">{description}</p>
      <button className="px-6 py-2 bg-white text-indigo-900 font-black rounded-full w-full hover:bg-indigo-50 transition-colors shadow-lg relative z-10">{buttonText}</button>
    </div>
  )
}

// Cards Showcase
export function CardsShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 58. Basic Card */}
      <div className="col-span-1">
        <span className="text-xs text-slate-500 font-mono mb-2 block">58. Basic Card</span>
        <BasicCard />
      </div>

      {/* 59. Glowing Game Card */}
      <div className="col-span-1">
        <span className="text-xs text-slate-500 font-mono mb-2 block">59. Glowing Interactive Card</span>
        <GlowingGameCard />
      </div>

      {/* 60. Stat Card */}
      <div className="col-span-1">
        <span className="text-xs text-slate-500 font-mono mb-2 block">60. Stat/Metric Card</span>
        <StatCard />
      </div>

      {/* 61. Quest Widget Card */}
      <div className="col-span-1 md:col-span-3 lg:col-span-2">
        <span className="text-xs text-slate-500 font-mono mb-2 block">61. Quest Panel (From Canvas)</span>
        <QuestPanel />
      </div>

      {/* 62. Magic Promotional Card */}
      <div className="col-span-1 md:col-span-3 lg:col-span-1">
        <span className="text-xs text-slate-500 font-mono mb-2 block">62. Action / Promo Card</span>
        <MagicPromoCard />
      </div>
    </div>
  )
}
