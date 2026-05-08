"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Gamepad2,
  Trophy,
  Flame,
  Zap,
  Star,
  Coins,
  Menu,
  Play,
  Swords,
  Puzzle,
  Rocket,
  Crosshair,
  Crown,
} from "lucide-react";

import {
  Button,
  GlowingGameCard,
  StatCard,
  QuestPanel,
  MagicPromoCard,
  BasicCard,
  PillTabs,
  Badge,
  SolidBadge,
  SubtleBadge,
  TrendingBadge,
  RatingBadge,
  DotIndicator,
  CoinBalance,
  LeaderboardRowTop,
  LeaderboardRowStandard,
  PlayerProfile,
  AvatarPremiumRing,
  ProgressBar,
  StandardProgressBar,
  H1,
  H2,
  H3,
  H4,
  GradientText,
  BodyText,
  MutedText,
} from "../components";

export default function Home() {
  const featuredGames = [
    {
      id: 1,
      title: "Guess the Number",
      category: "Puzzle",
      players: "2",
      rating: "4.8",
      color: "from-emerald-400 to-teal-600",
      icon: Puzzle,
      trending: false,
      href: "/games/guess-the-number",
      mode: "Online",
    },
    {
      id: 2,
      title: "Undercover",
      category: "Party",
      players: "4-10",
      rating: "4.9",
      color: "from-pink-500 to-indigo-600",
      icon: Crown,
      trending: true,
      href: "/games/undercover",
      mode: "Offline",
    },
  ];

  const dailyQuests = [
    { id: 1, title: "Play 3 Arcade Games", reward: 50, progress: 1, total: 3 },
    {
      id: 2,
      title: "Score 1000 in Neon Rider",
      reward: 150,
      progress: 450,
      total: 1000,
    },
  ];

  const topPlayers = [
    { rank: 1, name: "CyberNinja", score: "142,500", avatar: "King" },
    { rank: 2, name: "PixelQueen", score: "138,200", avatar: "Aneka" },
    { rank: 3, name: "RetroBot_99", score: "115,400", avatar: "Bottts" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-slate-950/80 border-b border-indigo-500/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <Gamepad2 className="w-8 h-8 text-indigo-400 group-hover:text-pink-400 transition-colors" />
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 group-hover:bg-pink-500 transition-colors rounded-full"></div>
            </div>
            <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
              MICRO<span className="text-white">CADE</span>
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search 100+ games..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
            />
            <div className="absolute right-2 px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-400 font-mono border border-slate-700">
              /
            </div>
          </div>

          {/* User Stats */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full cursor-pointer hover:bg-yellow-500/20 transition-colors">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-400">1,240</span>
            </div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                  PlayerOne
                </div>
                <div className="text-xs text-indigo-400 font-semibold flex items-center justify-end gap-1">
                  Level 14
                </div>
              </div>
              <AvatarPremiumRing src="https://api.dicebear.com/7.x/avataaars/svg?seed=PlayerOne&backgroundColor=1e293b" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full overflow-hidden bg-slate-950 pt-16 pb-20 px-4">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              <span>New games added daily!</span>
            </div>
            <H1 className="mb-6">
              Play <GradientText>Instantly.</GradientText>
              <br />
              No Downloads.
            </H1>
            <BodyText className="text-lg mb-8 max-w-xl mx-auto md:mx-0">
              Jump into 100+ bite-sized games. Complete quests, climb the
              leaderboards, and earn coins to unlock exclusive avatars and
              profile themes.
            </BodyText>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Button
                variant="hero"
                icon={<Play className="w-5 h-5 fill-current" />}
              >
                Start Playing Now
              </Button>
              <Button
                variant="secondary"
                icon={<Trophy className="w-5 h-5 text-yellow-400" />}
                className="whitespace-nowrap"
              >
                View Leaderboards
              </Button>
            </div>
          </div>

          {/* Right Content - Game Cards */}
          <div className="flex-1 relative w-full max-w-lg mx-auto aspect-square hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main Card */}
              <div className="relative z-20 w-64 aspect-[3/4] rounded-2xl bg-gradient-to-b from-indigo-500 to-purple-800 shadow-[0_0_50px_rgba(99,102,241,0.4)] animate-[float_6s_ease-in-out_infinite]">
                <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden relative group cursor-pointer flex flex-col items-center justify-center">
                  <div className="absolute bottom-0 left-0 w-full p-5 z-20">
                    <SolidBadge>Featured</SolidBadge>
                    <H3 className="text-2xl font-black text-white mt-2 mb-1">
                      Neon Rider
                    </H3>
                    <p className="text-indigo-300 text-sm">Arcade Racing</p>
                  </div>
                </div>
              </div>

              {/* Background Cards */}
              <div className="absolute top-10 -left-12 z-10 w-48 aspect-square rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-[2px] shadow-xl animate-[float_5s_ease-in-out_infinite_reverse] opacity-80">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center flex-col gap-2">
                  <Puzzle className="w-12 h-12 text-pink-400" />
                  <span className="text-white font-bold">Puzzle Pro</span>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-8 z-30 w-56 aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 p-[2px] shadow-2xl animate-[float_7s_ease-in-out_infinite_1s]">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center flex-col gap-2">
                  <Swords className="w-12 h-12 text-emerald-400" />
                  <span className="text-white font-bold">Arena Clash</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8 relative z-20">
        {/* Game Library */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <H2 className="flex items-center gap-2">
              <Gamepad2 className="text-indigo-500" />
              Game Library
            </H2>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredGames.map((game) => (
              <Link key={game.id} href={game.href} className="group cursor-pointer">
                <div
                  className={`relative w-full aspect-square rounded-2xl p-1 bg-gradient-to-br ${game.color} transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]`}
                >
                  <div className="w-full h-full bg-slate-900 rounded-xl relative overflow-hidden">
                    {/* Top badges */}
                    <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start z-20">
                      {game.trending && <TrendingBadge />}
                      <RatingBadge rating={game.rating} />
                    </div>

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-500 ease-out z-0">
                      <game.icon className="w-24 h-24 text-white drop-shadow-2xl" />
                    </div>

                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 backdrop-blur-[2px]">
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${game.color} p-0.5 shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-300 delay-75`}
                      >
                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white fill-current ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20">
                      <H3 className="text-lg font-black text-white truncate drop-shadow-md">
                        {game.title}
                      </H3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-medium text-slate-400">
                          {game.category}
                        </span>
                        <DotIndicator label={`${game.players} Players`} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          {/* Daily Quests */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <H3 className="text-lg font-black text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-pink-500 fill-pink-500" />
                Daily Quests
              </H3>
              <span className="text-xs font-bold text-slate-500">
                Resets in 4h
              </span>
            </div>

            <div className="space-y-4 relative z-10">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-bold text-slate-200 leading-tight">
                      {quest.title}
                    </p>
                    <div className="flex items-center gap-1 bg-yellow-500/10 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-400 shrink-0">
                      <Coins className="w-3 h-3" />+{quest.reward}
                    </div>
                  </div>
                  <StandardProgressBar
                    value={Math.round((quest.progress / quest.total) * 100)}
                    label=""
                  />
                  <div className="text-[10px] text-right text-slate-500 font-medium mt-1">
                    {quest.progress} / {quest.total}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <H3 className="text-lg font-black text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                Top Players
              </H3>
            </div>
            <div className="flex flex-col gap-3">
              {topPlayers.map((user, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-6 text-center font-black ${i === 0 ? "text-yellow-400" : i === 1 ? "text-slate-300" : "text-amber-600"}`}
                  >
                    #{user.rank}
                  </div>
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}&backgroundColor=1e293b`}
                    alt=""
                    className="w-8 h-8 rounded-full bg-slate-800"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-200">
                      {user.name}
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-indigo-400">
                    {user.score}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
              View Full Leaderboard
            </button>
          </div>

          {/* Quick Play Promo */}
          <MagicPromoCard
            title="Feeling Lucky?"
            description="Play a random game"
            buttonText="Randomize"
          />
        </aside>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <Gamepad2 className="w-6 h-6 text-white" />
            <span className="text-xl font-black tracking-wider text-white">
              MICRO<span className="text-slate-500">CADE</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            The ultimate destination for quick, browser-based gaming. Play
            anywhere, anytime, completely free.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Developers
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Discord
            </a>
            <Link href="/ui-showcase" className="hover:text-white transition-colors">
              UI Showcase
            </Link>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
