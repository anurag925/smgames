import React from 'react'

// 1. Typography Components

interface HeadingProps {
  children: React.ReactNode
  className?: string
}

export function H1({ children, className = '' }: HeadingProps) {
  return (
    <h1 className={`text-5xl font-black text-white tracking-tight ${className}`}>
      {children}
    </h1>
  )
}

export function H2({ children, className = '' }: HeadingProps) {
  return (
    <h2 className={`text-3xl font-bold text-white tracking-tight ${className}`}>
      {children}
    </h2>
  )
}

export function H3({ children, className = '' }: HeadingProps) {
  return (
    <h3 className={`text-xl font-bold text-slate-100 ${className}`}>
      {children}
    </h3>
  )
}

export function H4({ children, className = '' }: HeadingProps) {
  return (
    <h4 className={`text-sm font-bold text-slate-300 uppercase tracking-wider ${className}`}>
      {children}
    </h4>
  )
}

export function GradientText({ children, className = '' }: HeadingProps) {
  return (
    <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x ${className}`}>
      {children}
    </div>
  )
}

export function BodyText({ children, className = '' }: HeadingProps) {
  return (
    <p className={`text-slate-300 leading-relaxed ${className}`}>
      {children}
    </p>
  )
}

export function MutedText({ children, className = '' }: HeadingProps) {
  return (
    <p className={`text-sm text-slate-500 ${className}`}>
      {children}
    </p>
  )
}

export function TypographyShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50">
      <div className="space-y-6">
        <div>
          <span className="text-xs text-slate-500 font-mono mb-1 block">1. Heading 1</span>
          <H1>Level Up</H1>
        </div>
        <div>
          <span className="text-xs text-slate-500 font-mono mb-1 block">2. Heading 2</span>
          <H2>Select Character</H2>
        </div>
        <div>
          <span className="text-xs text-slate-500 font-mono mb-1 block">3. Heading 3</span>
          <H3>Daily Quests</H3>
        </div>
        <div>
          <span className="text-xs text-slate-500 font-mono mb-1 block">4. Heading 4</span>
          <H4>Leaderboard</H4>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <span className="text-xs text-slate-500 font-mono mb-1 block">5. Animated Gradient Text</span>
          <GradientText>Legendary Loot</GradientText>
        </div>
        <div>
          <span className="text-xs text-slate-500 font-mono mb-1 block">6. Body Text</span>
          <BodyText>Welcome to the arcade. Prepare yourself for the ultimate challenge. Do you have what it takes to reach the top of the leaderboards?</BodyText>
        </div>
        <div>
          <span className="text-xs text-slate-500 font-mono mb-1 block">7. Muted / Small Text</span>
          <MutedText>Press start to begin. Terms and conditions apply.</MutedText>
        </div>
      </div>
    </div>
  )
}
