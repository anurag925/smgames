"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Minus,
  Users,
  EyeOff,
  Eye,
  Play,
  X,
  UserPlus,
} from "lucide-react";

const DEFAULT_NAMES = [
  "Player 1", "Player 2", "Player 3", "Player 4",
  "Player 5", "Player 6", "Player 7", "Player 8",
  "Player 9", "Player 10",
];

const ROLE_DEFAULTS: Record<number, { undercover: number; mrWhite: number }> = {
  4: { undercover: 1, mrWhite: 0 },
  5: { undercover: 1, mrWhite: 1 },
  6: { undercover: 1, mrWhite: 1 },
  7: { undercover: 1, mrWhite: 1 },
  8: { undercover: 2, mrWhite: 1 },
  9: { undercover: 2, mrWhite: 1 },
  10: { undercover: 2, mrWhite: 1 },
};

export default function UndercoverSetup() {
  const router = useRouter();
  const [playerCount, setPlayerCount] = useState(5);
  const [undercoverCount, setUndercoverCount] = useState(1);
  const [mrWhiteCount, setMrWhiteCount] = useState(1);
  const [playerNames, setPlayerNames] = useState<string[]>(
    DEFAULT_NAMES.slice(0, 5)
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const civilianCount = playerCount - undercoverCount - mrWhiteCount;
  const maxUndercover = Math.min(3, playerCount - mrWhiteCount - 2);
  const maxMrWhite = Math.min(1, playerCount - undercoverCount - 2);

  const updatePlayerCount = useCallback(
    (newCount: number) => {
      if (newCount < 4 || newCount > 10) return;
      setPlayerCount(newCount);
      const defaults = ROLE_DEFAULTS[newCount];
      setUndercoverCount(defaults.undercover);
      setMrWhiteCount(defaults.mrWhite);
      setPlayerNames((prev) => {
        if (newCount > prev.length) {
          return [
            ...prev,
            ...DEFAULT_NAMES.slice(prev.length, newCount),
          ];
        }
        return prev.slice(0, newCount);
      });
    },
    []
  );

  const updateName = (index: number, name: string) => {
    if (name.length > 10) return;
    setPlayerNames((prev) => {
      const next = [...prev];
      next[index] = name;
      return next;
    });
  };

  const handleStart = () => {
    const gameConfig = {
      playerCount,
      undercoverCount,
      mrWhiteCount,
      playerNames: playerNames.map((n) => n.trim() || DEFAULT_NAMES[playerNames.indexOf(n)]),
    };
    sessionStorage.setItem("undercover-config", JSON.stringify(gameConfig));
    router.push("/games/undercover/play");
  };

  const allNamesValid = playerNames.every((n) => n.trim().length > 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link
            href="/games/undercover"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={22} />
          </Link>
          <h1 className="text-lg font-bold">Game Setup</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Player Count */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-xl font-bold mb-4 text-center">
            Players: {playerCount}
          </h2>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => updatePlayerCount(playerCount - 1)}
              disabled={playerCount <= 4}
              className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            >
              <Minus size={20} />
            </button>
            <div className="flex-1 max-w-48">
              <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all"
                  style={{ width: `${((playerCount - 4) / 6) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 px-1">
                <span className="text-xs text-slate-500">4</span>
                <span className="text-xs text-slate-500">10</span>
              </div>
            </div>
            <button
              onClick={() => updatePlayerCount(playerCount + 1)}
              disabled={playerCount >= 10}
              className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </section>

        {/* Role Distribution */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Role Distribution
          </h2>
          <div className="space-y-3">
            {/* Civilians */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Users size={16} className="text-indigo-400" />
                </div>
                <span className="font-medium">Civilians</span>
              </div>
              <span className="bg-indigo-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                {civilianCount}
              </span>
            </div>

            {/* Undercover */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <EyeOff size={16} className="text-pink-400" />
                </div>
                <span className="font-medium">Undercover</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setUndercoverCount(Math.max(1, undercoverCount - 1))
                  }
                  disabled={undercoverCount <= 1}
                  className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center disabled:opacity-30 hover:bg-slate-700 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="bg-pink-500 text-white text-sm font-bold px-4 py-1.5 rounded-full min-w-[3rem] text-center">
                  {undercoverCount}
                </span>
                <button
                  onClick={() =>
                    setUndercoverCount(
                      Math.min(maxUndercover, undercoverCount + 1)
                    )
                  }
                  disabled={undercoverCount >= maxUndercover}
                  className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center disabled:opacity-30 hover:bg-slate-700 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Mr. White */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-500/20 flex items-center justify-center">
                  <Eye size={16} className="text-slate-300" />
                </div>
                <span className="font-medium">Mr. White</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMrWhiteCount(Math.max(0, mrWhiteCount - 1))}
                  disabled={mrWhiteCount <= 0}
                  className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center disabled:opacity-30 hover:bg-slate-700 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="bg-slate-600 text-white text-sm font-bold px-4 py-1.5 rounded-full min-w-[3rem] text-center">
                  {mrWhiteCount}
                </span>
                <button
                  onClick={() =>
                    setMrWhiteCount(Math.min(maxMrWhite, mrWhiteCount + 1))
                  }
                  disabled={mrWhiteCount >= maxMrWhite}
                  className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center disabled:opacity-30 hover:bg-slate-700 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Player Names */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Player Names
            </h2>
            <UserPlus size={18} className="text-slate-500" />
          </div>
          <div className="space-y-2">
            {playerNames.map((name, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">
                    {name.trim() ? name.trim()[0].toUpperCase() : (i + 1)}
                  </span>
                </div>
                {editingIndex === i ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updateName(i, e.target.value)}
                      onBlur={() => setEditingIndex(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setEditingIndex(null);
                      }}
                      autoFocus
                      maxLength={10}
                      className="flex-1 bg-slate-800 border border-indigo-500 rounded-lg px-3 py-2 text-sm text-white outline-none"
                    />
                    <span className="text-xs text-slate-500">
                      {name.length}/10
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingIndex(i)}
                    className="flex-1 text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-200 transition-colors"
                  >
                    {name || `Player ${i + 1}`}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Start Button */}
        <div className="pt-2 pb-8">
          <button
            onClick={handleStart}
            disabled={!allNamesValid || civilianCount < 2}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold text-lg py-4 px-8 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:shadow-none transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
          >
            <Play size={22} />
            Start Game
          </button>
          {civilianCount < 2 && (
            <p className="text-red-400 text-sm text-center mt-2">
              Need at least 2 civilians
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
