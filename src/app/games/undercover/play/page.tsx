"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  EyeOff,
  Eye,
  MessageCircle,
  Vote,
  Skull,
  Trophy,
  RotateCcw,
  Home,
  ChevronRight,
  HelpCircle,
  Check,
  X,
} from "lucide-react";
import { getRandomWordPair, type WordPair } from "../data/word-pairs";
import { H1, H2, H3, H4, BodyText, MutedText, Button, SolidBadge, Input, Spinner } from "../../../../components";

// Types
interface Player {
  id: number;
  name: string;
  role: "civilian" | "undercover" | "mr-white";
  word: string | null;
  isAlive: boolean;
  hasPickedCard: boolean;
}

type Phase =
  | "card-pick"
  | "discussion"
  | "voting"
  | "elimination"
  | "mr-white-guess"
  | "game-over";

interface GameConfig {
  playerCount: number;
  undercoverCount: number;
  mrWhiteCount: number;
  playerNames: string[];
}

// Shuffle helper
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Initialize game state from config
function initGame(config: GameConfig): {
  players: Player[];
  wordPair: WordPair;
  cardSlots: number[];
  roleAssignments: Player["role"][];
} {
  const wordPair = getRandomWordPair();
  const roles: Player["role"][] = [];

  for (let i = 0; i < config.undercoverCount; i++) roles.push("undercover");
  for (let i = 0; i < config.mrWhiteCount; i++) roles.push("mr-white");
  while (roles.length < config.playerCount) roles.push("civilian");

  // Shuffle roles — these will be assigned when players pick cards
  const shuffledRoles = shuffle(roles);

  // Players start with no role assigned (will be assigned during card pick)
  const players: Player[] = config.playerNames.map((name, i) => ({
    id: i,
    name,
    role: "civilian" as Player["role"], // placeholder, assigned on card pick
    word: null,
    isAlive: true,
    hasPickedCard: false,
  }));

  // Card slots for the grid — each slot holds a role index
  const cardSlots = Array.from({ length: config.playerCount }, (_, i) => i);

  return { players, wordPair, cardSlots, roleAssignments: shuffledRoles };
}

// Check win conditions
function checkWinner(
  players: Player[]
): "civilians" | "undercover" | null {
  const alive = players.filter((p) => p.isAlive);
  const aliveUndercover = alive.filter((p) => p.role === "undercover");
  const aliveMrWhite = alive.filter((p) => p.role === "mr-white");

  // Civilians win if all undercover and mr white are gone
  if (aliveUndercover.length === 0 && aliveMrWhite.length === 0) {
    return "civilians";
  }

  // Undercover wins if alive players <= 2 and undercover is still alive
  if (alive.length <= 2 && aliveUndercover.length > 0) {
    return "undercover";
  }

  return null;
}

// Role styling helpers
function getRoleColor(role: Player["role"]) {
  switch (role) {
    case "civilian":
      return { bg: "bg-indigo-500", text: "text-indigo-400", border: "border-indigo-500" };
    case "undercover":
      return { bg: "bg-pink-500", text: "text-pink-400", border: "border-pink-500" };
    case "mr-white":
      return { bg: "bg-slate-400", text: "text-slate-300", border: "border-slate-400" };
  }
}

function getRoleIcon(role: Player["role"]) {
  switch (role) {
    case "civilian":
      return Users;
    case "undercover":
      return EyeOff;
    case "mr-white":
      return Eye;
  }
}

function getRoleLabel(role: Player["role"]) {
  switch (role) {
    case "civilian":
      return "Civilian";
    case "undercover":
      return "Undercover";
    case "mr-white":
      return "Mr. White";
  }
}

export default function UndercoverPlay() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("card-pick");
  const [players, setPlayers] = useState<Player[]>([]);
  const [wordPair, setWordPair] = useState<WordPair | null>(null);
  const [cardSlots, setCardSlots] = useState<number[]>([]);
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [revealedCard, setRevealedCard] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const [currentSpeaker, setCurrentSpeaker] = useState(0);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [eliminatedPlayer, setEliminatedPlayer] = useState<Player | null>(null);
  const [winner, setWinner] = useState<"civilians" | "undercover" | "mr-white" | null>(null);
  const [mrWhiteGuess, setMrWhiteGuess] = useState("");
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [roleAssignments, setRoleAssignments] = useState<Player["role"][]>([]);
  const [pickedSlots, setPickedSlots] = useState<Set<number>>(new Set());

  // Load config from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("undercover-config");
    if (!stored) {
      router.push("/games/undercover/setup");
      return;
    }
    const cfg: GameConfig = JSON.parse(stored);
    setConfig(cfg);
    const { players, wordPair, cardSlots, roleAssignments } = initGame(cfg);
    setPlayers(players);
    setWordPair(wordPair);
    setCardSlots(cardSlots);
    setRoleAssignments(roleAssignments);
    setPickedSlots(new Set());
  }, [router]);

  // Current player for card pick
  const currentPickPlayer = players[currentPickIndex] || null;

  // Alive players list
  const alivePlayers = useMemo(
    () => players.filter((p) => p.isAlive),
    [players]
  );

  // Alive speakers for discussion
  const aliveSpeakers = useMemo(
    () => players.filter((p) => p.isAlive),
    [players]
  );

  // Remaining infiltrators info
  const remainingUndercover = players.filter(
    (p) => p.isAlive && p.role === "undercover"
  ).length;
  const remainingMrWhite = players.filter(
    (p) => p.isAlive && p.role === "mr-white"
  ).length;

  // ---- Card Pick handlers ----
  const handleCardPick = (slotIndex: number) => {
    if (pickedSlots.has(slotIndex)) return;
    // Assign the role from this card slot to the current player
    const role = roleAssignments[slotIndex];
    const word =
      role === "civilian"
        ? wordPair!.civilian
        : role === "undercover"
        ? wordPair!.undercover
        : null;

    setPlayers((prev) =>
      prev.map((p) =>
        p.id === currentPickIndex ? { ...p, role, word } : p
      )
    );
    setRevealedCard(slotIndex);
  };

  const handleCardOk = () => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === currentPickIndex ? { ...p, hasPickedCard: true } : p
      )
    );
    setPickedSlots((prev) => new Set(prev).add(revealedCard!));
    setRevealedCard(null);

    if (currentPickIndex < players.length - 1) {
      setCurrentPickIndex(currentPickIndex + 1);
    } else {
      setCurrentSpeaker(0);
      setPhase("discussion");
    }
  };

  // ---- Discussion handlers ----
  const handleNextSpeaker = () => {
    const nextIdx = currentSpeaker + 1;
    if (nextIdx >= aliveSpeakers.length) {
      // All spoken, move to voting
      setPhase("voting");
      setSelectedVote(null);
    } else {
      setCurrentSpeaker(nextIdx);
    }
  };

  // ---- Voting handlers ----
  const handleVote = (playerId: number) => {
    setSelectedVote(playerId);
  };

  const handleConfirmElimination = () => {
    if (selectedVote === null) return;
    const eliminated = players.find((p) => p.id === selectedVote);
    if (!eliminated) return;

    setPlayers((prev) =>
      prev.map((p) =>
        p.id === selectedVote ? { ...p, isAlive: false } : p
      )
    );
    setEliminatedPlayer(eliminated);

    if (eliminated.role === "mr-white") {
      setPhase("mr-white-guess");
    } else {
      setPhase("elimination");
    }
  };

  // ---- Elimination handlers ----
  const handlePostElimination = () => {
    const updatedPlayers = players.map((p) =>
      p.id === eliminatedPlayer?.id ? { ...p, isAlive: false } : p
    );

    const w = checkWinner(updatedPlayers);
    if (w) {
      setWinner(w);
      setPhase("game-over");
    } else {
      setRound(round + 1);
      setCurrentSpeaker(0);
      setEliminatedPlayer(null);
      setSelectedVote(null);
      setPhase("discussion");
    }
  };

  // ---- Mr. White Guess ----
  const handleMrWhiteSubmit = () => {
    if (!wordPair) return;
    const correct =
      mrWhiteGuess.trim().toLowerCase() === wordPair.civilian.toLowerCase();
    if (correct) {
      setWinner("mr-white");
      setPhase("game-over");
    } else {
      // Mr White guessed wrong — check if game continues
      const updatedPlayers = players.map((p) =>
        p.id === eliminatedPlayer?.id ? { ...p, isAlive: false } : p
      );
      const w = checkWinner(updatedPlayers);
      if (w) {
        setWinner(w);
        setPhase("game-over");
      } else {
        setPhase("elimination");
      }
    }
  };

  // ---- Restart ----
  const handlePlayAgain = () => {
    router.push("/games/undercover/setup");
  };

  if (!config || players.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Glow backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      {/* ============== CARD PICK PHASE ============== */}
      {phase === "card-pick" && (
        <div className="flex-1 flex flex-col relative z-10">
          {/* Header */}
          <div className="text-center pt-8 pb-4 px-4">
            <H2 className="text-2xl bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent !text-transparent">
              {currentPickPlayer?.name}
            </H2>
            <MutedText className="text-slate-400 mt-1">Please pick a card</MutedText>
          </div>

          {/* Info bar */}
          <div className="flex justify-center gap-3 px-4 mb-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2 text-sm">
              <span className="text-slate-400">Remaining infiltrators: </span>
              <span className="text-pink-400 font-bold">
                {config.undercoverCount + config.mrWhiteCount}
              </span>
            </div>
          </div>

          {/* Card Grid */}
          <div className="flex-1 px-6">
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              {cardSlots.map((_, slotIdx) => {
                const isPicked = pickedSlots.has(slotIdx);
                const isRevealed = revealedCard === slotIdx;

                if (isPicked) {
                  return (
                    <div
                      key={slotIdx}
                      className="aspect-[3/4] bg-slate-800/50 border border-slate-700/30 rounded-xl flex items-center justify-center opacity-40"
                    >
                      <Check size={28} className="text-slate-600" />
                    </div>
                  );
                }

                return (
                  <button
                    key={slotIdx}
                    onClick={() => handleCardPick(slotIdx)}
                    disabled={revealedCard !== null}
                    className="aspect-[3/4] bg-gradient-to-br from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 disabled:from-amber-400 disabled:to-yellow-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:hover:translate-y-0 transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    <div className="text-white/80">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <path
                          d="M24 8C18 8 14 12 14 18C14 22 16 25 18 27C14 29 10 33 10 38H38C38 33 34 29 30 27C32 25 34 22 34 18C34 12 30 8 24 8Z"
                          fill="currentColor"
                          opacity="0.8"
                        />
                        <text
                          x="24"
                          y="24"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="20"
                          fontWeight="bold"
                          fill="white"
                        >
                          ?
                        </text>
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Revealed Card Modal */}
          {revealedCard !== null && (() => {
            const pickingPlayer = players[currentPickIndex];
            return (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-4">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2 ${
                      getRoleColor(pickingPlayer.role).bg
                    }`}
                  >
                    {pickingPlayer.name[0].toUpperCase()}
                  </div>
                  <SolidBadge className={"rounded-full !px-3 !py-1 " + getRoleColor(pickingPlayer.role).bg}>
                    {getRoleLabel(pickingPlayer.role)}
                  </SolidBadge>
                </div>

                {/* Player name */}
                <H3 className="text-center bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text !text-transparent mb-1">
                  {pickingPlayer.name}
                </H3>
                <MutedText className="text-slate-400 text-center mb-4">
                  {pickingPlayer.role === "mr-white"
                    ? "You have no secret word"
                    : "Your secret word"}
                </MutedText>

                {/* Word reveal */}
                <div className="bg-slate-700/50 border border-slate-600/50 rounded-2xl p-6 mb-6">
                  <p className="text-center text-xl font-bold text-white">
                    {pickingPlayer.role === "mr-white"
                      ? "You are Mr. White"
                      : pickingPlayer.word}
                  </p>
                </div>

                {/* OK Button */}
                <Button variant="success" onClick={handleCardOk} className="w-full text-lg py-3">OK</Button>
              </div>
            </div>
            );
          })()}

          {/* Bottom spacer */}
          <div className="h-8" />
        </div>
      )}

      {/* ============== DISCUSSION PHASE ============== */}
      {phase === "discussion" && (
        <div className="flex-1 flex flex-col relative z-10">
          <div className="sticky top-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 px-4 py-3">
            <div className="max-w-lg mx-auto flex items-center justify-between">
              <h1 className="text-lg font-bold">Round {round}</h1>
              <span className="text-sm text-slate-400 flex items-center gap-1">
                <MessageCircle size={14} />
                Discussion
              </span>
            </div>
          </div>

          <div className="max-w-lg mx-auto w-full px-4 py-6 flex-1 flex flex-col">
            {/* Current speaker */}
            <div className="text-center mb-8">
              <MutedText className="text-slate-400 mb-2">Current Speaker</MutedText>
              <div className="inline-flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-2xl font-bold mb-2">
                  {aliveSpeakers[currentSpeaker]?.name[0].toUpperCase()}
                </div>
                <H3>{aliveSpeakers[currentSpeaker]?.name}</H3>
                <MutedText className="mt-1">
                  Give a one-word clue about your word
                </MutedText>
              </div>
            </div>

            {/* Turn order */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6">
              <H4 className="text-slate-500 mb-3">Turn Order</H4>
              <div className="space-y-2">
                {aliveSpeakers.map((p, i) => (
                  <div
                    key={p.id}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                      i === currentSpeaker
                        ? "bg-indigo-500/20 border border-indigo-500/30"
                        : i < currentSpeaker
                        ? "opacity-40"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        i === currentSpeaker
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {p.name[0].toUpperCase()}
                    </div>
                    <span
                      className={`font-medium ${
                        i === currentSpeaker ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {p.name}
                    </span>
                    {i < currentSpeaker && (
                      <Check size={16} className="ml-auto text-emerald-500" />
                    )}
                    {i === currentSpeaker && (
                      <ChevronRight
                        size={16}
                        className="ml-auto text-indigo-400"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="mt-auto pb-8">
              <Button variant="primary" onClick={handleNextSpeaker} className="w-full text-lg py-4">
                {currentSpeaker >= aliveSpeakers.length - 1
                  ? "Start Voting"
                  : "Next Speaker"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============== VOTING PHASE ============== */}
      {phase === "voting" && (
        <div className="flex-1 flex flex-col relative z-10">
          <div className="sticky top-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 px-4 py-3">
            <div className="max-w-lg mx-auto flex items-center justify-between">
              <h1 className="text-lg font-bold">Round {round}</h1>
              <span className="text-sm text-slate-400 flex items-center gap-1">
                <Vote size={14} />
                Voting
              </span>
            </div>
          </div>

          <div className="max-w-lg mx-auto w-full px-4 py-6 flex-1 flex flex-col">
            <div className="text-center mb-6">
              <H3 className="mb-1">Who is the impostor?</H3>
              <MutedText className="text-slate-400">
                Discuss and select who to eliminate
              </MutedText>
            </div>

            {/* Player vote grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {alivePlayers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleVote(p.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    selectedVote === p.id
                      ? "bg-red-500/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                      : "bg-slate-900/80 border-slate-700/50 hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      selectedVote === p.id
                        ? "bg-red-500 text-white"
                        : "bg-gradient-to-br from-indigo-500 to-pink-500 text-white"
                    }`}
                  >
                    {p.name[0].toUpperCase()}
                  </div>
                  <span className="font-medium text-sm">{p.name}</span>
                  {selectedVote === p.id && (
                    <span className="text-xs text-red-400 font-bold">
                      ELIMINATE
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Confirm */}
            <div className="mt-auto pb-8">
              <Button variant="danger" icon={<Skull size={20} />} onClick={handleConfirmElimination} disabled={selectedVote === null} className="w-full text-lg py-4 !bg-gradient-to-r !from-red-500 !to-red-600 !text-white !border-0">
                Confirm Elimination
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============== MR WHITE GUESS PHASE ============== */}
      {phase === "mr-white-guess" && eliminatedPlayer && (
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
          <div className="w-full max-w-sm">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
              {/* Mr White icon */}
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-slate-400 flex items-center justify-center text-2xl font-bold text-slate-900 mb-2">
                  {eliminatedPlayer.name[0].toUpperCase()}
                </div>
                <SolidBadge className="rounded-full !px-3 !py-1 !bg-slate-400 !text-slate-900">
                  Mr. White
                </SolidBadge>
              </div>

              <H3 className="text-center mb-1">
                {eliminatedPlayer.name}
              </H3>
              <MutedText className="text-slate-400 text-center mb-6">
                You&apos;ve been caught! Guess the civilian word to win.
              </MutedText>

              <input
                type="text"
                value={mrWhiteGuess}
                onChange={(e) => setMrWhiteGuess(e.target.value)}
                placeholder="Enter your guess..."
                className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition-colors mb-4"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && mrWhiteGuess.trim()) handleMrWhiteSubmit();
                }}
              />

              <Button variant="success" onClick={handleMrWhiteSubmit} disabled={!mrWhiteGuess.trim()} className="w-full py-3">
                Submit Guess
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============== ELIMINATION REVEAL PHASE ============== */}
      {phase === "elimination" && eliminatedPlayer && (
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
          <div className="w-full max-w-sm">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
              <div className="text-center mb-6">
                <Skull size={48} className="mx-auto text-red-400 mb-3" />
                <H2 className="text-2xl mb-1">Eliminated!</H2>
              </div>

              <div className="flex flex-col items-center mb-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2 ${
                    getRoleColor(eliminatedPlayer.role).bg
                  }`}
                >
                  {eliminatedPlayer.name[0].toUpperCase()}
                </div>
                <SolidBadge className={"rounded-full !px-3 !py-1 mb-2 " + getRoleColor(eliminatedPlayer.role).bg}>
                  {getRoleLabel(eliminatedPlayer.role)}
                </SolidBadge>
                <H3>{eliminatedPlayer.name}</H3>
                {eliminatedPlayer.word && (
                  <MutedText className="text-slate-400 mt-1">
                    Word: <span className="text-white font-medium">{eliminatedPlayer.word}</span>
                  </MutedText>
                )}
              </div>

              <Button variant="primary" onClick={handlePostElimination} className="w-full py-3 mt-4">
                {checkWinner(players) ? "See Results" : "Next Round"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============== GAME OVER PHASE ============== */}
      {phase === "game-over" && (
        <div className="flex-1 flex flex-col relative z-10">
          {/* Extra glow for celebration */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div
              className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl ${
                winner === "civilians"
                  ? "bg-indigo-500/20"
                  : winner === "undercover"
                  ? "bg-pink-500/20"
                  : "bg-slate-400/20"
              }`}
            />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="text-center mb-8">
              <Trophy size={56} className="mx-auto text-yellow-400 mb-4" />
              <H1 className="text-4xl mb-2">
                {winner === "civilians" && "Civilians Win!"}
                {winner === "undercover" && "Undercover Wins!"}
                {winner === "mr-white" && "Mr. White Wins!"}
              </H1>
              <BodyText className="text-lg">
                {winner === "civilians" &&
                  "All impostors have been found and eliminated!"}
                {winner === "undercover" &&
                  "The undercover agent survived to the end!"}
                {winner === "mr-white" &&
                  "Mr. White correctly guessed the civilian word!"}
              </BodyText>
            </div>

            {/* Reveal all roles */}
            <div className="w-full max-w-sm bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-8">
              <H4 className="text-slate-500 mb-3 text-center">All Players Revealed</H4>
              <div className="space-y-2">
                {players.map((p) => {
                  const roleColor = getRoleColor(p.role);
                  const RoleIcon = getRoleIcon(p.role);
                  return (
                    <div
                      key={p.id}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl ${
                        !p.isAlive ? "opacity-50" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${roleColor.bg} flex items-center justify-center text-sm font-bold text-white`}
                      >
                        {p.name[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-sm">{p.name}</span>
                        {!p.isAlive && (
                          <span className="text-xs text-red-400 ml-2">
                            eliminated
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <RoleIcon size={14} className={roleColor.text} />
                        <span className={`text-xs font-medium ${roleColor.text}`}>
                          {getRoleLabel(p.role)}
                        </span>
                      </div>
                      {p.word && (
                        <span className="text-xs text-slate-500">
                          {p.word}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Word pair reveal */}
              {wordPair && (
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <MutedText className="text-xs text-center">
                    Words: <span className="text-indigo-400">{wordPair.civilian}</span>
                    {" vs "}
                    <span className="text-pink-400">{wordPair.undercover}</span>
                  </MutedText>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button variant="gradient" icon={<RotateCcw size={20} />} onClick={handlePlayAgain} className="w-full py-4">
                Play Again
              </Button>
              <Link href="/games/undercover">
                <Button variant="secondary" icon={<Home size={20} />} className="w-full py-4">
                  Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="h-8" />
        </div>
      )}
    </div>
  );
}
