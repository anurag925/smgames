"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Users, BookOpen, Play } from "lucide-react";

export default function UndercoverLanding() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Games</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Glow backdrop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        {/* Title */}
        <div className="relative z-10 text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <EyeOff className="text-pink-500" size={36} />
            <Eye className="text-indigo-500" size={36} />
          </div>
          <h1 className="text-6xl sm:text-7xl font-black text-white tracking-tight mb-3">
            UNDER
            <span className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
              COVER
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xs mx-auto">
            Find the impostor among you. Trust no one.
          </p>
        </div>

        {/* Role Preview Cards */}
        <div className="relative z-10 flex gap-3 mb-12">
          <div className="bg-indigo-500/20 border border-indigo-500/30 rounded-xl px-4 py-3 text-center">
            <Users size={20} className="text-indigo-400 mx-auto mb-1" />
            <span className="text-xs text-indigo-300 font-medium">Civilian</span>
          </div>
          <div className="bg-pink-500/20 border border-pink-500/30 rounded-xl px-4 py-3 text-center">
            <EyeOff size={20} className="text-pink-400 mx-auto mb-1" />
            <span className="text-xs text-pink-300 font-medium">Undercover</span>
          </div>
          <div className="bg-slate-500/20 border border-slate-500/30 rounded-xl px-4 py-3 text-center">
            <Eye size={20} className="text-slate-300 mx-auto mb-1" />
            <span className="text-xs text-slate-300 font-medium">Mr. White</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 flex flex-col gap-4 w-full max-w-xs">
          <Link
            href="/games/undercover/setup"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold text-lg py-4 px-8 rounded-full shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all hover:-translate-y-0.5"
          >
            <Play size={22} />
            Play Game
          </Link>
          <Link
            href="/games/undercover/rules"
            className="flex items-center justify-center gap-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold text-lg py-4 px-8 rounded-full transition-all hover:-translate-y-0.5"
          >
            <BookOpen size={22} />
            How to Play
          </Link>
        </div>

        {/* Footer info */}
        <div className="relative z-10 mt-12 text-center">
          <p className="text-slate-500 text-sm">4–10 Players • Pass the Device • Offline</p>
        </div>
      </div>
    </div>
  );
}
