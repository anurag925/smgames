import React from 'react'

interface InputProps {
  type?: 'text' | 'email' | 'search' | 'password'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  success?: boolean
  className?: string
}

export function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = false,
  success = false,
  className = ''
}: InputProps) {
  const baseClasses = 'w-full bg-slate-950 border rounded-lg py-2.5 px-4 text-sm text-slate-200 focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600'

  const stateClasses = error
    ? 'border-red-500 bg-red-950/20 text-red-200 focus:border-red-500 focus:ring-red-500'
    : success
    ? 'border-emerald-500/50 bg-emerald-950/10 text-emerald-300 focus:border-emerald-500'
    : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${stateClasses} ${className}`}
    />
  )
}

// Standard Input (41)
export function StandardInput({
  label = 'Username',
  placeholder = 'Enter player tag...',
  className = ''
}: {
  label?: string
  placeholder?: string
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <Input placeholder={placeholder} />
    </div>
  )
}

// Search Input (42)
export function SearchInput({
  placeholder = 'Search 100+ games...',
  className = ''
}: {
  placeholder?: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-slate-900 border border-slate-700 rounded-full py-2.5 pl-10 pr-12 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-400 font-mono border border-slate-700 pointer-events-none">
        /
      </div>
    </div>
  )
}

// Input Error State (43)
export function InputError({
  label = 'Email Address',
  value = 'invalid-email',
  errorMessage = 'Valid email required to link account.',
  className = ''
}: {
  label?: string
  value?: string
  errorMessage?: string
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-red-400 mb-1">{label}</label>
      <input
        type="email"
        value={value}
        className="w-full bg-red-950/20 border border-red-500 rounded-lg py-2.5 px-4 text-sm text-red-200 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
      />
      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {errorMessage}
      </p>
    </div>
  )
}

// Input Success State (44)
export function InputSuccess({
  label = 'Secret Code',
  value = 'IDDQD',
  successMessage = 'Cheat activated!',
  className = ''
}: {
  label?: string
  value?: string
  successMessage?: string
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-emerald-400 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          className="w-full bg-emerald-950/10 border border-emerald-500/50 rounded-lg py-2.5 px-4 pr-10 text-sm text-emerald-300 focus:outline-none"
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <p className="mt-1 text-xs text-emerald-500">{successMessage}</p>
    </div>
  )
}

// Select Dropdown (45)
export function SelectDropdown({
  label = 'Region',
  options = ['US East (Ping: 24ms)', 'EU West (Ping: 89ms)', 'Asia (Ping: 150ms)'],
  className = ''
}: {
  label?: string
  options?: string[]
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <div className="relative">
        <select className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-4 text-sm text-slate-200 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          {options.map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  )
}

// Textarea (46)
export function Textarea({
  label = 'Bio / Loadout',
  placeholder = 'Tell the lobby about yourself...',
  rows = 3,
  className = ''
}: {
  label?: string
  placeholder?: string
  rows?: number
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 resize-none"
      />
    </div>
  )
}

// Custom Checkbox (47)
export function Checkbox({
  label = 'Remember Me',
  checked = true,
  className = ''
}: {
  label?: string
  checked?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center w-5 h-5 rounded bg-slate-900 border border-slate-600 group-hover:border-indigo-500 transition-colors overflow-hidden">
          <input type="checkbox" className="peer sr-only" defaultChecked={checked} />
          <div className={`absolute inset-0 bg-indigo-500 opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center ${checked ? 'opacity-100' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>
        <span className="text-sm text-slate-300 select-none">{label}</span>
      </label>
    </div>
  )
}

// Custom Radio (48)
export function RadioGroup({
  options = [
    { label: 'Hardcore', checked: true },
    { label: 'Casual', checked: false }
  ],
  className = ''
}: {
  options?: { label: string; checked: boolean }[]
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {options.map((opt, i) => (
        <label key={i} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center group-hover:border-pink-500">
            <input type="radio" name="difficulty" className="peer sr-only" defaultChecked={opt.checked} />
            <div className={`w-2.5 h-2.5 rounded-full bg-pink-500 scale-0 peer-checked:scale-100 transition-transform ${opt.checked ? 'scale-100' : ''}`}></div>
          </div>
          <span className="text-sm text-slate-300">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

// Toggle Switch (49)
export function ToggleSwitch({
  label = 'Sound FX',
  checked = true,
  className = ''
}: {
  label?: string
  checked?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" defaultChecked={checked} />
        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>
        <span className="ml-3 text-sm font-medium text-slate-300">{label}</span>
      </label>
    </div>
  )
}

// Range Slider (50)
export function RangeSlider({
  label = 'Master Volume',
  value = 80,
  className = ''
}: {
  label?: string
  value?: number
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-slate-400 mb-1 flex justify-between">
        <span>{label}</span>
        <span className="text-indigo-400">{value}%</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
      />
    </div>
  )
}

// Forms Showcase
export function FormsShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50">
      {/* 41. Default Input */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">41. Standard Input</span>
        <StandardInput />
      </div>

      {/* 42. Search Input */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">42. Search Input (Pill)</span>
        <SearchInput />
      </div>

      {/* 43. Input with Error */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">43. Input Error State</span>
        <InputError />
      </div>

      {/* 44. Input Success */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">44. Input Success State</span>
        <InputSuccess />
      </div>

      {/* 45. Select Dropdown */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">45. Select Dropdown</span>
        <SelectDropdown />
      </div>

      {/* 46. Textarea */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">46. Textarea</span>
        <Textarea />
      </div>

      {/* 47-50 Controls grouped */}
      <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-slate-800">
        {/* 47. Checkbox */}
        <div>
          <span className="text-xs text-slate-500 font-mono mb-3 block">47. Custom Checkbox</span>
          <Checkbox />
        </div>

        {/* 48. Radio */}
        <div>
          <span className="text-xs text-slate-500 font-mono mb-3 block">48. Custom Radio</span>
          <RadioGroup />
        </div>

        {/* 49. Toggle Switch */}
        <div>
          <span className="text-xs text-slate-500 font-mono mb-3 block">49. Toggle Switch</span>
          <ToggleSwitch />
        </div>

        {/* 50. Range Slider */}
        <div>
          <span className="text-xs text-slate-500 font-mono mb-3 block">50. Range Slider</span>
          <RangeSlider />
        </div>
      </div>
    </div>
  )
}
