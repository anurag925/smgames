import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'danger' | 'success' | 'disabled' | 'loading' | 'icon' | 'gradient' | 'hero' | 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  loading = false,
  icon,
  onClick
}: ButtonProps) {
  const baseClasses = 'font-bold rounded-full transition-all flex items-center justify-center gap-2'

  const variantClasses = {
    primary: 'px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]',
    secondary: 'px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700',
    accent: 'px-6 py-2.5 bg-pink-500 hover:bg-pink-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]',
    outline: 'px-6 py-2.5 bg-transparent hover:bg-indigo-500/10 text-indigo-400 border border-indigo-500/50',
    danger: 'px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50',
    success: 'px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    disabled: 'px-6 py-2.5 bg-slate-800 text-slate-500 cursor-not-allowed opacity-50',
    loading: 'px-6 py-2.5 bg-indigo-500/50 text-white cursor-wait',
    icon: 'p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 hover:text-white',
    gradient: 'px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg hover:-translate-y-1',
    hero: 'px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] relative overflow-hidden group',
    xs: 'px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs border border-slate-700 text-white',
    sm: 'px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-sm border border-slate-700 text-white',
    md: 'px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white',
    lg: 'px-8 py-3 bg-slate-800 hover:bg-slate-700 text-lg border border-slate-700 text-white'
  }

  if (variant === 'loading') {
    return (
      <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} disabled>
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Loading
      </button>
    )
  }

  if (variant === 'hero') {
    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} w-full ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
        {icon && <span className="relative z-10">{icon}</span>}
        <span className="relative z-10 text-lg">{children}</span>
      </button>
    )
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled || variant === 'disabled'}
    >
      {icon && !loading && <span>{icon}</span>}
      {children}
    </button>
  )
}

// Icon Button helper
export function IconButton({
  icon,
  className = '',
  onClick,
  variant = 'icon'
}: {
  icon: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'icon' | 'outline' | 'primary'
}) {
  return (
    <button
      className={`p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-all border border-slate-700 hover:text-white ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

// Button Sizes Compound Component
export function ButtonSizes({ className = '' }: { className?: string }) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-full transition-all border border-slate-700">
        Tiny Btn
      </button>
      <button className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-full transition-all border border-slate-700">
        Small Btn
      </button>
      <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full transition-all border border-slate-700">
        Default Btn
      </button>
      <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white text-lg font-bold rounded-full transition-all border border-slate-700">
        Large Btn
      </button>
    </div>
  )
}

// All Buttons Showcase
export function ButtonsShowcase() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 items-center justify-items-start">
      {/* Primary */}
      <div className="w-full">
        <span className="text-xs text-slate-500 font-mono mb-2 block">8. Primary</span>
        <Button variant="primary" className="w-full">Play Now</Button>
      </div>

      {/* Secondary */}
      <div className="w-full">
        <span className="text-xs text-slate-500 font-mono mb-2 block">9. Secondary</span>
        <Button variant="secondary" className="w-full">Options</Button>
      </div>

      {/* Accent Glowing */}
      <div className="w-full">
        <span className="text-xs text-slate-500 font-mono mb-2 block">10. Accent Glowing</span>
        <Button variant="accent" className="w-full">Upgrade</Button>
      </div>

      {/* Outline/Ghost */}
      <div className="w-full">
        <span className="text-xs text-slate-500 font-mono mb-2 block">11. Outline</span>
        <Button variant="outline" className="w-full">View Stats</Button>
      </div>

      {/* Danger */}
      <div className="w-full">
        <span className="text-xs text-slate-500 font-mono mb-2 block">12. Danger</span>
        <Button variant="danger" className="w-full">Quit Game</Button>
      </div>

      {/* Success */}
      <div className="w-full">
        <span className="text-xs text-slate-500 font-mono mb-2 block">13. Success</span>
        <Button variant="success" className="w-full">Claim Reward</Button>
      </div>

      {/* Disabled */}
      <div className="w-full">
        <span className="text-xs text-slate-500 font-mono mb-2 block">14. Disabled</span>
        <Button variant="disabled" className="w-full">Locked</Button>
      </div>

      {/* Loading */}
      <div className="w-full">
        <span className="text-xs text-slate-500 font-mono mb-2 block">15. Loading</span>
        <Button variant="loading" className="w-full">Loading</Button>
      </div>

      {/* Icon Button */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">16. Icon Button</span>
        <IconButton icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        } />
      </div>

      {/* Gradient Floating */}
      <div className="col-span-2 md:col-span-1">
        <span className="text-xs text-slate-500 font-mono mb-2 block">17. Gradient Hover</span>
        <Button variant="gradient" className="w-full">Multiplayer</Button>
      </div>

      {/* Large Play Arcade Button */}
      <div className="col-span-2">
        <span className="text-xs text-slate-500 font-mono mb-2 block">18. Hero Play Button (Hover effect)</span>
        <Button variant="hero" className="w-full" icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        }>Start Arcade Mode</Button>
      </div>

      {/* 19-22 Sizes grouped */}
      <div className="col-span-2 md:col-span-4 mt-4 border-t border-slate-800/50 pt-6">
        <span className="text-xs text-slate-500 font-mono mb-4 block">19-22. Button Sizes (xs, sm, md, lg)</span>
        <ButtonSizes />
      </div>
    </div>
  )
}
