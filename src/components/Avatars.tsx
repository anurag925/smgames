import React from 'react'

interface AvatarProps {
  src: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({ src, alt = '', size = 'md', className = '' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full bg-slate-800 border border-slate-700 ${className}`}
    />
  )
}

// Avatar with Notification (37)
export function AvatarWithNotification({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  return (
    <div className={`relative w-12 h-12 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full rounded-full bg-slate-800 border-2 border-slate-900"
      />
      <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-pink-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
    </div>
  )
}

// Avatar with Premium Ring (38)
export function AvatarPremiumRing({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  return (
    <div className={`w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-[2px] shadow-[0_0_15px_rgba(236,72,153,0.3)] ${className}`}>
      <div className="w-full h-full rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

// Avatar with Level Badge (39)
export function AvatarWithLevel({ src, alt = '', level = 4, className = '' }: { src: string; alt?: string; level?: number; className?: string }) {
  return (
    <div className={`relative w-12 h-12 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full rounded-full bg-slate-800 border border-slate-600"
      />
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-indigo-600 text-[10px] font-black px-1.5 py-0.5 rounded-sm border border-slate-950 shadow-sm z-10">
        LVL {level}
      </div>
    </div>
  )
}

// Avatar Group (40)
export function AvatarGroup({
  avatars = [],
  max = 4,
  className = ''
}: {
  avatars?: string[]
  max?: number
  className?: string
}) {
  const visibleAvatars = avatars.slice(0, max)
  const remaining = avatars.length - max

  return (
    <div className={`flex -space-x-4 ${className}`}>
      {visibleAvatars.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 z-30"
        />
      ))}
      {remaining > 0 && (
        <a
          className="flex items-center justify-center w-10 h-10 text-xs font-bold text-white bg-slate-800 border-2 border-slate-950 rounded-full hover:bg-slate-700 z-0"
          href="#"
        >
          +{remaining}
        </a>
      )}
    </div>
  )
}

// Avatar Sizes Showcase
export function AvatarsShowcase() {
  const avatarUrls = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=A&backgroundColor=1e293b',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=B&backgroundColor=1e293b',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=C&backgroundColor=1e293b',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=D&backgroundColor=1e293b',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=E&backgroundColor=1e293b',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=F&backgroundColor=1e293b',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=G&backgroundColor=1e293b',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=H&backgroundColor=1e293b',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=I&backgroundColor=1e293b',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=J&backgroundColor=1e293b',
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50">
      {/* 33-36 Sizes */}
      <div className="col-span-2 md:col-span-4 flex items-end gap-6">
        <div>
          <span className="text-xs text-slate-500 font-mono mb-2 block">33. Small (32px)</span>
          <Avatar src={avatarUrls[0]} size="sm" />
        </div>
        <div>
          <span className="text-xs text-slate-500 font-mono mb-2 block">34. Medium (40px)</span>
          <Avatar src={avatarUrls[1]} size="md" />
        </div>
        <div>
          <span className="text-xs text-slate-500 font-mono mb-2 block">35. Large (56px)</span>
          <Avatar src={avatarUrls[2]} size="lg" />
        </div>
        <div>
          <span className="text-xs text-slate-500 font-mono mb-2 block">36. X-Large (80px)</span>
          <Avatar src={avatarUrls[3]} size="xl" />
        </div>
      </div>

      {/* 37. With Notification */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">37. Status / Notification</span>
        <AvatarWithNotification src={avatarUrls[4]} />
      </div>

      {/* 38. Premium Ring */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">38. Premium Ring</span>
        <AvatarPremiumRing src={avatarUrls[5]} />
      </div>

      {/* 39. Avatar with Level */}
      <div>
        <span className="text-xs text-slate-500 font-mono mb-2 block">39. Avatar with Level</span>
        <AvatarWithLevel src={avatarUrls[6]} level={4} />
      </div>

      {/* 40. Avatar Group */}
      <div className="col-span-2 md:col-span-1">
        <span className="text-xs text-slate-500 font-mono mb-2 block">40. Avatar Group (Stack)</span>
        <AvatarGroup avatars={avatarUrls.slice(4)} max={3} />
      </div>
    </div>
  )
}
