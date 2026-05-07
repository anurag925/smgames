import React from 'react'

// Info Banner (68)
export function InfoBanner({
  title = 'Server Maintenance',
  message = 'Servers will go offline at 02:00 AM UTC for approximately 2 hours to deploy patch v1.2.',
  className = ''
}: {
  title?: string
  message?: string
  className?: string
}) {
  return (
    <div className={`p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-start gap-3 ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mt-0.5 shrink-0">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
      <div>
        <h4 className="text-sm font-bold text-blue-100 mb-1">{title}</h4>
        <p className="text-xs text-blue-200/70">{message}</p>
      </div>
      <button className="ml-auto text-blue-400 hover:text-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  )
}

// Warning Toast (69)
export function WarningToast({
  title = 'Connection Unstable',
  message = 'Your ping to the server is high (145ms). You may experience lag during gameplay.',
  className = ''
}: {
  title?: string
  message?: string
  className?: string
}) {
  return (
    <div className={`p-4 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-start gap-3 ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 mt-0.5 shrink-0">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <div>
        <h4 className="text-sm font-bold text-orange-100 mb-1">{title}</h4>
        <p className="text-xs text-orange-200/70">{message}</p>
      </div>
    </div>
  )
}

// Success Alert (70)
export function SuccessAlert({
  message = 'Game saved successfully to cloud slot 1.',
  className = ''
}: {
  message?: string
  className?: string
}) {
  return (
    <div className={`p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 shrink-0">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <span className="text-sm font-bold text-emerald-100">{message}</span>
    </div>
  )
}

// Error Alert (71)
export function ErrorAlert({
  title = 'Matchmaking Failed',
  message = 'Could not connect to the matchmaking service. Error Code: 0x80040154.',
  buttonText = 'Retry Connection',
  className = ''
}: {
  title?: string
  message?: string
  buttonText?: string
  className?: string
}) {
  return (
    <div className={`p-4 rounded-lg bg-red-500/10 border border-red-500/50 flex items-start gap-3 relative overflow-hidden ${className}`}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mt-0.5 shrink-0">
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        <h4 className="text-sm font-bold text-red-100 mb-1">{title}</h4>
        <p className="text-xs text-red-200/70">{message}</p>
        <button className="mt-2 text-xs font-bold text-red-400 bg-red-500/20 px-3 py-1 rounded hover:bg-red-500/30 transition-colors">{buttonText}</button>
      </div>
    </div>
  )
}

// Alerts Showcase
export function AlertsShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 68. Info Alert */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">68. Info Banner</span>
        <InfoBanner />
      </div>

      {/* 69. Warning Alert */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">69. Warning Toast</span>
        <WarningToast />
      </div>

      {/* 70. Success Alert */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">70. Success Message</span>
        <SuccessAlert />
      </div>

      {/* 71. Error Alert */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">71. Error State / Ban Message</span>
        <ErrorAlert />
      </div>
    </div>
  )
}
