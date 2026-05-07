import Link from 'next/link'
import { TypographyShowcase } from '@/components'

export default function TypographyDocs() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Typography</h1>
            <p className="text-slate-400">7 components</p>
          </div>
        </div>
        <p className="text-slate-400">
          Typography components for headings, body text, and special text effects like animated gradients.
        </p>
      </div>

      {/* Preview */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <TypographyShowcase />
        </div>
      </section>

      {/* Component Details */}
      <section className="space-y-8">
        <h2 className="text-xl font-bold text-white">Components</h2>

        {/* H1 */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">H1</h3>
              <p className="text-sm text-slate-400">Large heading for page titles</p>
            </div>
            <code className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-indigo-400">Typography.tsx</code>
          </div>
          <div className="bg-slate-950 rounded-lg p-4 mb-4">
            <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">{`import { H1 } from '@/components'

<H1>Level Up</H1>`}</pre>
          </div>
          <div className="border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500 mb-2">Preview</p>
            <H1>Level Up</H1>
          </div>
        </div>

        {/* H2 */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">H2</h3>
              <p className="text-sm text-slate-400">Medium heading for section titles</p>
            </div>
            <code className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-indigo-400">Typography.tsx</code>
          </div>
          <div className="bg-slate-950 rounded-lg p-4 mb-4">
            <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">{`import { H2 } from '@/components'

<H2>Select Character</H2>`}</pre>
          </div>
          <div className="border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500 mb-2">Preview</p>
            <H2>Select Character</H2>
          </div>
        </div>

        {/* H3 */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">H3</h3>
              <p className="text-sm text-slate-400">Subheading for card titles</p>
            </div>
            <code className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-indigo-400">Typography.tsx</code>
          </div>
          <div className="bg-slate-950 rounded-lg p-4 mb-4">
            <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">{`import { H3 } from '@/components'

<H3>Daily Quests</H3>`}</pre>
          </div>
          <div className="border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500 mb-2">Preview</p>
            <H3>Daily Quests</H3>
          </div>
        </div>

        {/* H4 */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">H4</h3>
              <p className="text-sm text-slate-400">Small uppercase heading for labels</p>
            </div>
            <code className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-indigo-400">Typography.tsx</code>
          </div>
          <div className="bg-slate-950 rounded-lg p-4 mb-4">
            <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">{`import { H4 } from '@/components'

<H4>Leaderboard</H4>`}</pre>
          </div>
          <div className="border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500 mb-2">Preview</p>
            <H4>Leaderboard</H4>
          </div>
        </div>

        {/* GradientText */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">GradientText</h3>
              <p className="text-sm text-slate-400">Animated gradient text effect</p>
            </div>
            <code className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-indigo-400">Typography.tsx</code>
          </div>
          <div className="bg-slate-950 rounded-lg p-4 mb-4">
            <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">{`import { GradientText } from '@/components'

<GradientText>Legendary Loot</GradientText>`}</pre>
          </div>
          <div className="border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500 mb-2">Preview</p>
            <GradientText>Legendary Loot</GradientText>
          </div>
        </div>

        {/* BodyText */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">BodyText</h3>
              <p className="text-sm text-slate-400">Standard body text with leading</p>
            </div>
            <code className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-indigo-400">Typography.tsx</code>
          </div>
          <div className="bg-slate-950 rounded-lg p-4 mb-4">
            <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">{`import { BodyText } from '@/components'

<BodyText>Your content here</BodyText>`}</pre>
          </div>
          <div className="border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500 mb-2">Preview</p>
            <BodyText>Welcome to the arcade. Prepare yourself for the ultimate challenge.</BodyText>
          </div>
        </div>

        {/* MutedText */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">MutedText</h3>
              <p className="text-sm text-slate-400">Small muted text for secondary info</p>
            </div>
            <code className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-indigo-400">Typography.tsx</code>
          </div>
          <div className="bg-slate-950 rounded-lg p-4 mb-4">
            <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">{`import { MutedText } from '@/components'

<MutedText>Press start to begin</MutedText>`}</pre>
          </div>
          <div className="border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500 mb-2">Preview</p>
            <MutedText>Press start to begin. Terms and conditions apply.</MutedText>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="flex items-center justify-between border-t border-slate-800 pt-8">
        <div />
        <Link
          href="/ui-showcase/docs/buttons"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          Next: Buttons
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </section>
    </div>
  )
}

// Import the actual components
import { H1, H2, H3, H4, GradientText, BodyText, MutedText } from '@/components'
