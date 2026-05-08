"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  EyeOff,
  Eye,
  MessageCircle,
  Vote,
  Skull,
  Trophy,
  Lightbulb,
  CircleDot,
} from "lucide-react";
import { H2, H3, BodyText, MutedText, Button } from "../../../../components";

export default function UndercoverRules() {
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
          <h1 className="text-lg font-bold">How to Play</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* Overview */}
        <section>
          <H2 className="text-2xl mb-3 flex items-center gap-2">
            <CircleDot size={22} className="text-indigo-400" />
            Overview
          </H2>
          <BodyText>
            Undercover is a social deduction party game for{" "}
            <span className="text-white font-semibold">4–10 players</span>.
            Everyone receives a secret word — but the Undercover player gets a{" "}
            <span className="text-pink-400 font-semibold">similar but different</span>{" "}
            word. Through discussion and deduction, civilians must find and
            eliminate the impostors before it&apos;s too late!
          </BodyText>
        </section>

        {/* Roles */}
        <section>
          <H2 className="text-2xl mb-4 flex items-center gap-2">
            <Users size={22} className="text-indigo-400" />
            Roles
          </H2>
          <div className="space-y-3">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users size={18} className="text-indigo-400" />
                <H3 className="text-indigo-300">Civilian</H3>
                <span className="ml-auto text-xs bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full">
                  Majority
                </span>
              </div>
              <BodyText className="text-sm">
                You receive the <span className="text-white font-medium">main secret word</span>.
                Your goal is to identify and eliminate the Undercover agent(s)
                and Mr. White through clever discussion without revealing your
                word too obviously.
              </BodyText>
            </div>

            <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <EyeOff size={18} className="text-pink-400" />
                <H3 className="text-pink-300">Undercover</H3>
                <span className="ml-auto text-xs bg-pink-500/30 text-pink-300 px-2 py-0.5 rounded-full">
                  1–3 Players
                </span>
              </div>
              <BodyText className="text-sm">
                You receive a{" "}
                <span className="text-white font-medium">similar but different word</span>.
                Blend in with the civilians! Give clues that are vague enough to
                not expose yourself, but specific enough to seem like a civilian.
                Survive until only 2 players remain to win.
              </BodyText>
            </div>

            <div className="bg-slate-500/10 border border-slate-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye size={18} className="text-slate-300" />
                <H3 className="text-slate-200">Mr. White</H3>
                <span className="ml-auto text-xs bg-slate-500/30 text-slate-300 px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              <BodyText className="text-sm">
                You have <span className="text-white font-medium">no secret word</span> at all!
                Listen carefully to other players&apos; clues to figure out the
                topic. If you get caught, you get one chance to guess the
                civilian word — guess correctly and you win instantly!
              </BodyText>
            </div>
          </div>
        </section>

        {/* How to Play */}
        <section>
          <H2 className="text-2xl mb-4 flex items-center gap-2">
            <MessageCircle size={22} className="text-indigo-400" />
            How to Play
          </H2>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Setup",
                desc: "Choose the number of players (4–10), adjust the number of Undercover agents and Mr. White, then enter each player's name.",
                icon: Users,
              },
              {
                step: 2,
                title: "Pick Cards",
                desc: "Pass the device around. Each player taps a face-down card to secretly see their role and word. Tap OK and pass the device — don't show anyone!",
                icon: EyeOff,
              },
              {
                step: 3,
                title: "Discuss",
                desc: "Take turns giving a ONE-WORD or short clue about your word. Be descriptive enough to prove you're a civilian, but vague enough to not help the Undercover.",
                icon: MessageCircle,
              },
              {
                step: 4,
                title: "Vote",
                desc: "After everyone has spoken, discuss and vote to eliminate the player you think is the impostor.",
                icon: Vote,
              },
              {
                step: 5,
                title: "Elimination",
                desc: "The voted player is eliminated and their role is revealed. If Mr. White is caught, they get one guess at the civilian word.",
                icon: Skull,
              },
              {
                step: 6,
                title: "Repeat",
                desc: "Continue discussing and voting each round until a win condition is met.",
                icon: CircleDot,
              },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-indigo-400">
                    {step}
                  </span>
                </div>
                <div className="flex-1 pb-4 border-b border-slate-800/50 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={16} className="text-slate-400" />
                    <H3 className="text-base">{title}</H3>
                  </div>
                  <MutedText className="leading-relaxed">
                    {desc}
                  </MutedText>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Win Conditions */}
        <section>
          <H2 className="text-2xl mb-4 flex items-center gap-2">
            <Trophy size={22} className="text-yellow-400" />
            Win Conditions
          </H2>
          <div className="space-y-3">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
              <H3 className="text-indigo-300 mb-1">🛡️ Civilians Win</H3>
              <BodyText className="text-sm">
                All Undercover agents and Mr. White are eliminated.
              </BodyText>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
              <H3 className="text-pink-300 mb-1">🕵️ Undercover Wins</H3>
              <BodyText className="text-sm">
                Survives until only 2 players remain (1v1 with a civilian).
              </BodyText>
            </div>
            <div className="bg-slate-500/10 border border-slate-500/20 rounded-xl p-4">
              <H3 className="text-slate-200 mb-1">👻 Mr. White Wins</H3>
              <BodyText className="text-sm">
                When eliminated, correctly guesses the civilian word.
              </BodyText>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section>
          <H2 className="text-2xl mb-4 flex items-center gap-2">
            <Lightbulb size={22} className="text-yellow-400" />
            Pro Tips
          </H2>
          <ul className="space-y-3">
            {[
              "As a Civilian, don't be too specific with your clues — you might help the Undercover figure out the real word!",
              "As Undercover, listen carefully to what others say and mirror their energy — be vague but confident.",
              "As Mr. White, pay close attention to every clue. You need to piece together the word from context alone.",
              "Watch for players who hesitate, give overly generic clues, or seem to be fishing for information.",
              "Changing your clue style between rounds can help throw off suspicion — or raise it!",
            ].map((tip, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-400">{i + 1}</span>
                </span>
                <MutedText className="leading-relaxed">{tip}</MutedText>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="pt-4 pb-8">
          <Link href="/games/undercover/setup">
            <Button variant="hero" className="text-lg w-full">
              Start Playing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
