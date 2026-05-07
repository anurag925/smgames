'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  TypographyShowcase,
  ButtonsShowcase,
  BadgesShowcase,
  AvatarsShowcase,
  FormsShowcase,
  ProgressShowcase,
  CardsShowcase,
  GamifiedShowcase,
  AlertsShowcase,
  NavigationShowcase
} from '@/components'

type Section = {
  id: string
  title: string
  icon: React.ReactNode
  description: string
}

export default function UIShowcasePage() {
  const [activeSection, setActiveSection] = useState('typography')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sections: Section[] = [
    {
      id: 'typography',
      title: 'Typography',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
        </svg>
      ),
      description: 'Text styles from H1 to muted body text with gradient effects'
    },
    {
      id: 'buttons',
      title: 'Buttons',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="8" rx="4"/>
        </svg>
      ),
      description: '15 button variants including primary, loading, and icon buttons'
    },
    {
      id: 'badges',
      title: 'Badges & Tags',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
          <path d="M7 7h.01"/>
        </svg>
      ),
      description: '10 badge styles from solid to rank crowns'
    },
    {
      id: 'avatars',
      title: 'Avatars',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      description: '9 avatar variants with sizes, rings, and groups'
    },
    {
      id: 'forms',
      title: 'Forms & Inputs',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/>
        </svg>
      ),
      description: '12 form components including inputs, selects, and controls'
    },
    {
      id: 'progress',
      title: 'Progress & Loaders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
        </svg>
      ),
      description: '7 progress indicators and loading animations'
    },
    {
      id: 'cards',
      title: 'Cards & Panels',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
        </svg>
      ),
      description: '6 card variants from basic to quest panels'
    },
    {
      id: 'gamified',
      title: 'Gamified Elements',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/>
          <line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/>
          <line x1="19" y1="21" x2="21" y2="19"/>
          <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/>
        </svg>
      ),
      description: '8 gamified UI elements for game interfaces'
    },
    {
      id: 'alerts',
      title: 'Alerts & Feedback',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
      description: '4 alert types for user feedback'
    },
    {
      id: 'navigation',
      title: 'Navigation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      ),
      description: '5 navigation components including tabs, breadcrumbs, and dropdowns'
    },
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'typography':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">Typography</h2>
                <p className="text-slate-400 mt-2">Text styles for headings, body text, and special effects</p>
              </div>
              <Link href="/ui-showcase/docs/typography" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                View Docs
              </Link>
            </div>
            <TypographyShowcase />

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Available Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {['H1', 'H2', 'H3', 'H4', 'GradientText', 'BodyText', 'MutedText'].map((comp) => (
                  <div key={comp} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <code className="text-indigo-400">{comp}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'buttons':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">Buttons</h2>
                <p className="text-slate-400 mt-2">15 button variants for every use case</p>
              </div>
              <Link href="/ui-showcase/docs/buttons" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                View Docs
              </Link>
            </div>
            <ButtonsShowcase />

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Variants</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['primary', 'secondary', 'accent', 'outline', 'danger', 'success', 'disabled', 'loading', 'icon', 'gradient', 'hero'].map((variant) => (
                  <div key={variant} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                    <code className="text-indigo-400">{variant}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'badges':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">Badges & Tags</h2>
                <p className="text-slate-400 mt-2">10 badge and tag styles for labels and indicators</p>
              </div>
              <Link href="/ui-showcase/docs/badges" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                View Docs
              </Link>
            </div>
            <BadgesShowcase />

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Components</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['SolidBadge', 'SubtleBadge', 'TrendingBadge', 'RatingBadge', 'FilterTagActive', 'FilterTagInactive', 'DotIndicator', 'CounterPill', 'LevelBox', 'RankCrown'].map((comp) => (
                  <div key={comp} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <code className="text-indigo-400">{comp}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'avatars':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">Avatars</h2>
                <p className="text-slate-400 mt-2">9 avatar variants with sizes, status indicators, and groups</p>
              </div>
              <Link href="/ui-showcase/docs/avatars" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                View Docs
              </Link>
            </div>
            <AvatarsShowcase />

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Components</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Avatar', 'AvatarWithNotification', 'AvatarPremiumRing', 'AvatarWithLevel', 'AvatarGroup'].map((comp) => (
                  <div key={comp} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <code className="text-indigo-400">{comp}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'forms':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">Forms & Inputs</h2>
                <p className="text-slate-400 mt-2">12 form components for user input</p>
              </div>
              <Link href="/ui-showcase/docs/forms" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                View Docs
              </Link>
            </div>
            <FormsShowcase />

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Components</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Input', 'StandardInput', 'SearchInput', 'InputError', 'InputSuccess', 'SelectDropdown', 'Textarea', 'Checkbox', 'RadioGroup', 'ToggleSwitch', 'RangeSlider'].map((comp) => (
                  <div key={comp} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <code className="text-indigo-400">{comp}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'progress':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">Progress & Loaders</h2>
                <p className="text-slate-400 mt-2">7 progress indicators and loading animations</p>
              </div>
              <Link href="/ui-showcase/docs/progress" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                View Docs
              </Link>
            </div>
            <ProgressShowcase />

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Components</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['StandardProgressBar', 'QuestGradientBar', 'HealthBar', 'StepsIndicator', 'Spinner', 'ArcadeDots', 'SkeletonPulse'].map((comp) => (
                  <div key={comp} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <code className="text-indigo-400">{comp}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'cards':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">Cards & Panels</h2>
                <p className="text-slate-400 mt-2">6 card variants for content containers</p>
              </div>
              <Link href="/ui-showcase/docs/cards" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                View Docs
              </Link>
            </div>
            <CardsShowcase />

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Components</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['BasicCard', 'GlowingGameCard', 'StatCard', 'QuestPanel', 'MagicPromoCard'].map((comp) => (
                  <div key={comp} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <code className="text-indigo-400">{comp}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'gamified':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">Gamified Elements</h2>
                <p className="text-slate-400 mt-2">8 gamified UI elements for game interfaces</p>
              </div>
              <Link href="/ui-showcase/docs/gamified" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                View Docs
              </Link>
            </div>
            <GamifiedShowcase />

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Components</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['LeaderboardRowTop', 'LeaderboardRowStandard', 'CoinBalance', 'AchievementToast', 'PlayerProfile'].map((comp) => (
                  <div key={comp} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <code className="text-indigo-400">{comp}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'alerts':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">Alerts & Feedback</h2>
                <p className="text-slate-400 mt-2">4 alert types for user feedback and notifications</p>
              </div>
              <Link href="/ui-showcase/docs/alerts" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                View Docs
              </Link>
            </div>
            <AlertsShowcase />

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Components</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['InfoBanner', 'WarningToast', 'SuccessAlert', 'ErrorAlert'].map((comp) => (
                  <div key={comp} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <code className="text-indigo-400">{comp}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'navigation':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">Navigation</h2>
                <p className="text-slate-400 mt-2">5 navigation components for app structure</p>
              </div>
              <Link href="/ui-showcase/docs/navigation" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                View Docs
              </Link>
            </div>
            <NavigationShowcase />

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Components</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['PillTabs', 'Breadcrumbs', 'Pagination', 'ProfileDropdown', 'Tooltip'].map((comp) => (
                  <div key={comp} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <code className="text-indigo-400">{comp}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-slate-800 rounded-lg md:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {sidebarOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </>
          ) : (
            <>
              <line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>
            </>
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/>
                </svg>
              </div>
              <div className="absolute inset-0 bg-indigo-500 blur-md opacity-40 rounded-xl"></div>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">UI</span>
                <span className="text-white">LIB</span>
              </span>
              <p className="text-xs text-slate-500 font-mono mt-1">Component Library</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id)
                setSidebarOpen(false)
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all
                ${activeSection === section.id
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }
              `}
            >
              <span className={activeSection === section.id ? 'text-indigo-400' : 'text-slate-500'}>
                {section.icon}
              </span>
              <span className="font-medium">{section.title}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-slate-400">70+ Components</span>
            </div>
            <p className="text-xs text-slate-500">Dark mode optimized, gamified UI components</p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8 pb-32">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/30">
                v1.0.0
              </div>
              <div className="px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-bold rounded-full border border-pink-500/30">
                70+ Components
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Design System
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              A comprehensive collection of dark-mode optimized, gamified UI components
              for building arcade-style applications. Each component is built with Tailwind CSS
              and ready to use in your Next.js projects.
            </p>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Typography', count: '7', color: 'from-indigo-500 to-purple-500' },
              { label: 'Buttons', count: '15', color: 'from-pink-500 to-rose-500' },
              { label: 'Badges', count: '10', color: 'from-emerald-500 to-teal-500' },
              { label: 'Forms', count: '12', color: 'from-cyan-500 to-blue-500' },
              { label: 'Progress', count: '7', color: 'from-yellow-500 to-orange-500' },
              { label: 'Cards', count: '6', color: 'from-blue-500 to-indigo-500' },
              { label: 'Gamified', count: '8', color: 'from-red-500 to-pink-500' },
              { label: 'Navigation', count: '5', color: 'from-teal-500 to-emerald-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.count}
                </div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Active Section Content */}
          {renderSection()}
        </div>
      </main>
    </div>
  )
}
