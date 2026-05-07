import React from 'react'

interface ProgressBarProps {
  value: number
  max?: number
  variant?: 'default' | 'gradient' | 'health'
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  className = ''
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const variantClasses = {
    default: 'bg-indigo-500',
    gradient: 'bg-gradient-to-r from-pink-500 to-indigo-500',
    health: 'bg-green-500'
  }

  return (
    <div className={`w-full bg-slate-800 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className={`${variantClasses[variant]} h-2 rounded-full`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

// Standard Progress Bar (51)
export function StandardProgressBar({
  label = 'Downloading Assets...',
  value = 45,
  className = ''
}: {
  label?: string
  value?: number
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-300 font-medium">{label}</span>
        <span className="text-indigo-400 font-bold">{value}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

// Quest Gradient Bar (52)
export function QuestGradientBar({
  label = 'Defeat 10 Bosses',
  current = 6,
  total = 10,
  className = ''
}: {
  label?: string
  current?: number
  total?: number
  className?: string
}) {
  const percentage = (current / total) * 100

  return (
    <div className={className}>
      <div className="flex justify-between items-center text-xs mb-1">
        <span className="text-slate-300 font-bold">{label}</span>
        <span className="text-slate-500 font-medium">{current} / {total}</span>
      </div>
      <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-3 overflow-hidden p-0.5">
        <div
          className="bg-gradient-to-r from-pink-500 to-indigo-500 h-full rounded-full relative"
          style={{ width: `${percentage}%` }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)'
            }}
          />
        </div>
      </div>
    </div>
  )
}

// Health Bar (53)
export function HealthBar({
  green = 30,
  yellow = 20,
  red = 50,
  className = ''
}: {
  green?: number
  yellow?: number
  red?: number
  className?: string
}) {
  return (
    <div className={`w-full bg-slate-950 border-2 border-slate-800 rounded-sm h-4 flex overflow-hidden ${className}`}>
      <div className="bg-green-500 h-full" style={{ width: `${green}%` }}></div>
      <div className="bg-yellow-400 h-full" style={{ width: `${yellow}%` }}></div>
      <div className="bg-red-500 h-full opacity-30" style={{ width: `${red}%` }}></div>
    </div>
  )
}

// Steps Indicator (54)
export function StepsIndicator({
  steps = 5,
  currentStep = 2,
  className = ''
}: {
  steps?: number
  currentStep?: number
  className?: string
}) {
  return (
    <div className={`flex gap-1 h-3 mt-4 ${className}`}>
      {Array.from({ length: steps }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm relative overflow-hidden ${i < currentStep ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-slate-800'}`}
        >
          {i === currentStep - 1 && (
            <div className="absolute inset-0 bg-indigo-500 w-1/2 rounded-l-sm" />
          )}
        </div>
      ))}
    </div>
  )
}

// Spinner (55)
export function Spinner({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-8 h-8 text-indigo-400 animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

// Arcade Dots (56)
export function ArcadeDots({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-2 justify-center items-center h-8 ${className}`}>
      <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  )
}

// Skeleton Pulse (57)
export function SkeletonPulse({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 w-full ${className}`}>
      <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse shrink-0"></div>
      <div className="flex-1 space-y-2">
        <div className="h-2.5 bg-slate-800 rounded animate-pulse w-3/4"></div>
        <div className="h-2.5 bg-slate-800 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  )
}

// Progress & Loaders Showcase
export function ProgressShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50">
      {/* 51. Basic Progress Bar */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">51. Standard Progress Bar</span>
        <StandardProgressBar />
      </div>

      {/* 52. Quest Gradient Bar */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">52. Quest Progress (Gradient + Pattern)</span>
        <QuestGradientBar />
      </div>

      {/* 53. Health Bar */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">53. Health/Damage Bar</span>
        <HealthBar />
      </div>

      {/* 54. Steps Indicator */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">54. Steps / Matches Progress</span>
        <StepsIndicator />
      </div>

      {/* 55-57 Loaders */}
      <div className="col-span-1 md:col-span-2 flex items-center justify-around border-t border-slate-800 pt-6 mt-2">
        <div className="text-center">
          <span className="text-xs text-slate-500 font-mono mb-4 block">55. Spinner</span>
          <Spinner />
        </div>
        <div className="text-center">
          <span className="text-xs text-slate-500 font-mono mb-4 block">56. Arcade Dots</span>
          <ArcadeDots />
        </div>
        <div className="text-center w-48">
          <span className="text-xs text-slate-500 font-mono mb-4 block">57. Skeleton Pulse</span>
          <SkeletonPulse />
        </div>
      </div>
    </div>
  )
}
