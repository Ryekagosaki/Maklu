"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, Trophy, RefreshCw, ChevronRight, Search, Check, Gamepad2, Flame, Star } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import { questions, type Difficulty, type Question } from "@/data/questions";
import { languages } from "@/data/languages";
import { useGameStore } from "@/lib/store";
import { formatCoins } from "@/lib/utils";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

type GameState = "select" | "playing" | "result" | "levelup";

const DIFFICULTY_ORDER: Difficulty[] = ["easy", "medium", "hard"];

const DIFF_CONFIG = {
  easy:   { label: "Pemula",    emoji: "🌱", time: 30, coins: 10, color: "emerald", next: "medium" as Difficulty },
  medium: { label: "Menengah",  emoji: "⚡", time: 25, coins: 20, color: "amber",   next: "hard"   as Difficulty },
  hard:   { label: "Sulit",     emoji: "🔥", time: 20, coins: 30, color: null       },
} as const;

// Shuffle array helper
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle the OPTIONS of a question but keep correct pointer accurate
function shuffleOptions(q: Question): Question & { shuffledOptions: string[]; shuffledCorrect: number } {
  const indexed = q.options.map((opt, i) => ({ opt, origIdx: i }));
  const shuffled = shuffleArray(indexed);
  return {
    ...q,
    shuffledOptions: shuffled.map((s) => s.opt),
    shuffledCorrect: shuffled.findIndex((s) => s.origIdx === q.correct),
  };
}

type ShuffledQuestion = Question & { shuffledOptions: string[]; shuffledCorrect: number };

// ─── Language picker ──────────────────────────────────────────────────────────
function LanguagePicker({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (s: string) => void;
}) {
  const [search, setSearch] = useState("");

  const filteredLangs = useMemo(() => {
    const s = search.toLowerCase();
    return languages.filter((l) => l.name.toLowerCase().includes(s)).slice(0, 30);
  }, [search]);

  // Count available questions per lang
  const getCount = (slug: string) =>
    questions.filter((q) => q.languageSlug === slug).length;

  return (
    <div>
      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari bahasa..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gold-500/40"
        />
      </div>

      {/* ALL option */}
      <button
        onClick={() => onSelect("all")}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl mb-2 text-sm font-medium transition-all ${
          selected === "all"
            ? "bg-gold-500/20 border border-gold-500/40 text-gold-400"
            : "bg-white/3 border border-white/8 text-gray-300 hover:border-white/20"
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">🌍</span> Semua Bahasa (Campuran)
        </span>
        {selected === "all" && <Check className="w-4 h-4 text-gold-400" />}
      </button>

      {/* Language grid */}
      <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1 custom-scroll">
        {filteredLangs.map((lang) => {
          const count = getCount(lang.slug);
          const isSelected = selected === lang.slug;
          return (
            <button
              key={lang.id}
              onClick={() => onSelect(lang.slug)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs transition-all ${
                isSelected
                  ? "bg-gold-500/20 border border-gold-500/40 text-gold-400"
                  : "bg-white/3 border border-white/8 text-gray-300 hover:border-white/20"
              }`}
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0"
                style={{ backgroundColor: `${lang.color}20`, color: lang.color }}
              >
                {lang.icon}
              </span>
              <div className="min-w-0">
                <div className="font-semibold truncate">{lang.name}</div>
                <div className="text-gray-600 text-[9px]">{count} soal</div>
              </div>
              {isSelected && <Check className="w-3 h-3 text-gold-400 ml-auto flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Game Page ───────────────────────────────────────────────────────────
export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>("select");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [selectedLang, setSelectedLang] = useState("all");
  const [currentQs, setCurrentQs] = useState<ShuffledQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answeredResults, setAnsweredResults] = useState<boolean[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const { recordAnswer, streak, coins } = useGameStore();
  const cfg = DIFF_CONFIG[difficulty];

  // ── Build question pool ──
  const buildQuestions = useCallback((diff: Difficulty, lang: string) => {
    let pool = questions.filter((q) => q.difficulty === diff);
    if (lang !== "all") {
      const langPool = pool.filter((q) => q.languageSlug === lang || q.languageSlug === "general");
      if (langPool.length >= 5) pool = langPool;
    }
    const shuffledPool = shuffleArray(pool).slice(0, 10);
    return shuffledPool.map(shuffleOptions);
  }, []);

  const startGame = useCallback(() => {
    const qs = buildQuestions(difficulty, selectedLang);
    setCurrentQs(qs);
    setCurrentIdx(0);
    setSelected(null);
    setShowAnswer(false);
    setTimeLeft(DIFF_CONFIG[difficulty].time);
    setCoinsEarned(0);
    setCorrectCount(0);
    setWrongCount(0);
    setAnsweredResults([]);
    setGameState("playing");
  }, [difficulty, selectedLang, buildQuestions]);

  // ── Timer ──
  useEffect(() => {
    if (gameState !== "playing" || showAnswer) return;
    if (timeLeft <= 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  });

  const handleAnswer = (idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);

    const q = currentQs[currentIdx];
    const isCorrect = idx === q.shuffledCorrect;
    recordAnswer(isCorrect, q.coins);
    setAnsweredResults((prev) => [...prev, isCorrect]);

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setCoinsEarned((c) => c + q.coins);
      toast.success(`+${q.coins} koin! 🎉`, { duration: 1200 });
    } else {
      setWrongCount((w) => w + 1);
      toast.error("Salah! 😅", { duration: 1200 });
    }

    setTimeout(() => {
      if (currentIdx + 1 >= currentQs.length) {
        setGameState("result");
        const newCorrect = isCorrect ? correctCount + 1 : correctCount;
        if (newCorrect / currentQs.length >= 0.8) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      } else {
        setCurrentIdx((i) => i + 1);
        setSelected(null);
        setShowAnswer(false);
        setTimeLeft(DIFF_CONFIG[difficulty].time);
      }
    }, 2000);
  };

  const goNextLevel = () => {
    const nextDiff = DIFF_CONFIG[difficulty].next;
    if (!nextDiff) return;
    setDifficulty(nextDiff);
    setGameState("levelup");
    setTimeout(() => {
      const qs = buildQuestions(nextDiff, selectedLang);
      setCurrentQs(qs);
      setCurrentIdx(0);
      setSelected(null);
      setShowAnswer(false);
      setTimeLeft(DIFF_CONFIG[nextDiff].time);
      setCoinsEarned(0);
      setCorrectCount(0);
      setWrongCount(0);
      setAnsweredResults([]);
      setGameState("playing");
    }, 2000);
  };

  const q = currentQs[currentIdx];
  const progress = currentQs.length > 0 ? (currentIdx / currentQs.length) * 100 : 0;
  const timePct = (timeLeft / cfg.time) * 100;
  const accuracy = correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;

  // ════════════════════════════════
  // SELECT SCREEN
  // ════════════════════════════════
  if (gameState === "select") {
    return (
      <div className="pt-20 pb-10 px-4 min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-5xl mb-3">🎮</motion.div>
            <h1 className="font-display text-4xl font-extrabold text-white mb-2">Game <span className="text-gold-gradient">Quiz</span></h1>
            <p className="text-gray-400 text-sm">Pilih bahasa & level, lalu buktikan kemampuanmu!</p>
            <div className="inline-flex items-center gap-4 glass rounded-2xl px-6 py-2.5 mt-4 border border-gold-500/15">
              <div className="text-center">
                <div className="text-gold-400 font-bold font-mono">{formatCoins(coins)}</div>
                <div className="text-gray-600 text-[10px]">Koin</div>
              </div>
              {streak > 0 && (
                <>
                  <div className="w-px h-6 bg-gold-500/20" />
                  <div className="text-center">
                    <div className="text-orange-400 font-bold font-mono">🔥{streak}</div>
                    <div className="text-gray-600 text-[10px]">Streak</div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Step 1: Language Picker */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="glass-card p-5 mb-4">
            <h2 className="font-display font-bold text-white mb-4 flex items-center gap-2 text-base">
              <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-bold">1</span>
              Pilih Bahasa Pemrograman
            </h2>
            <LanguagePicker selected={selectedLang} onSelect={setSelectedLang} />
          </motion.div>

          {/* Step 2: Difficulty */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="glass-card p-5 mb-5">
            <h2 className="font-display font-bold text-white mb-4 flex items-center gap-2 text-base">
              <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-bold">2</span>
              Pilih Level Kesulitan
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {(Object.entries(DIFF_CONFIG) as [Difficulty, typeof DIFF_CONFIG.easy][]).map(([diff, c]) => (
                <motion.button
                  key={diff}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setDifficulty(diff)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    difficulty === diff
                      ? "border-gold-500/60 bg-gold-500/12"
                      : "border-white/8 bg-white/3 hover:border-white/20"
                  }`}
                >
                  <div className="text-2xl mb-1">{c.emoji}</div>
                  <div className={`font-display font-bold text-sm ${difficulty === diff ? "text-gold-400" : "text-gray-300"}`}>{c.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">🪙{c.coins}/soal</div>
                  <div className="text-[10px] text-gray-600 mt-0.5">⏱ {c.time}s</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(245,158,11,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={startGame}
            className="btn-gold w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Mulai Quiz — {DIFF_CONFIG[difficulty].label} {DIFF_CONFIG[difficulty].emoji}
          </motion.button>
        </div>
      </div>
    );
  }

  // ════════════════════════════════
  // LEVEL UP ANIMATION
  // ════════════════════════════════
  if (gameState === "levelup") {
    const nextDiff = DIFF_CONFIG[difficulty];
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.8, repeat: 2 }}
            className="text-8xl mb-4"
          >
            🆙
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl font-extrabold text-gold-gradient"
          >
            Level Naik!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 mt-2 text-lg"
          >
            Sekarang masuk level <span className="text-gold-400 font-bold">{nextDiff.label}</span> {nextDiff.emoji}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, delay: 0.3 }}
            className="h-1 bg-gold-gradient rounded-full mt-6 mx-auto max-w-xs"
          />
        </motion.div>
      </div>
    );
  }

  // ════════════════════════════════
  // PLAYING SCREEN
  // ════════════════════════════════
  if (gameState === "playing" && q) {
    return (
      <div className="pt-18 pb-8 px-4 min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 max-w-xl mx-auto pt-4">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-3">
            {/* Dots trail */}
            <div className="flex items-center gap-1.5">
              {answeredResults.map((r, i) => (
                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className={`w-2.5 h-2.5 rounded-full ${r ? "bg-emerald-400" : "bg-red-400"}`} />
              ))}
              {Array.from({ length: currentQs.length - answeredResults.length }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-gray-700" />
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs font-mono font-bold">
              <span className="text-gold-400">🪙{coinsEarned}</span>
              {streak > 0 && <span className="text-orange-400">🔥{streak}</span>}
              <span className="text-gray-500">{currentIdx + 1}/{currentQs.length}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="progress-bar mb-3">
            <motion.div className="progress-fill" style={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>

          {/* Timer row */}
          <div className="flex items-center gap-3 mb-5">
            <div className={`flex items-center gap-1 text-xs font-mono font-bold flex-shrink-0 ${
              timeLeft <= 5 ? "text-red-400" : timeLeft <= 10 ? "text-amber-400" : "text-emerald-400"
            }`}>
              <Clock className="w-3.5 h-3.5" />
              {timeLeft}s
            </div>
            <div className="flex-1">
              <div className="progress-bar">
                <motion.div
                  className={`h-full rounded-full transition-all ${timeLeft <= 5 ? "bg-red-400" : timeLeft <= 10 ? "bg-amber-400" : "bg-emerald-400"}`}
                  animate={{ width: `${timePct}%` }}
                  style={{ boxShadow: timeLeft <= 5 ? "0 0 8px rgba(239,68,68,0.6)" : undefined }}
                />
              </div>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${
              difficulty === "easy" ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
              : difficulty === "medium" ? "text-amber-400 border-amber-400/30 bg-amber-400/10"
              : "text-red-400 border-red-400/30 bg-red-400/10"
            }`}>
              {DIFF_CONFIG[difficulty].label}
            </span>
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div key={q.id}
              initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
              className="glass-card p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] px-2.5 py-1 bg-gold-500/10 text-gold-500 rounded-full border border-gold-500/20 font-semibold">
                  {q.language}
                </span>
                <span className="text-[10px] text-gray-600">🪙 {q.coins}</span>
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">{q.question}</h2>
            </motion.div>
          </AnimatePresence>

          {/* Shuffled Answer options */}
          <div className="space-y-2.5">
            {q.shuffledOptions.map((opt, i) => {
              const isCorrectOpt = i === q.shuffledCorrect;
              const isSelectedOpt = selected === i;
              let cls = "answer-option";
              if (showAnswer) {
                if (isCorrectOpt) cls += " correct";
                else if (isSelectedOpt) cls += " incorrect";
                else cls += " opacity-40";
              } else if (isSelectedOpt) {
                cls += " selected";
              }

              return (
                <motion.button key={i}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={!showAnswer ? { x: 5 } : {}}
                  onClick={() => !showAnswer && handleAnswer(i)}
                  className={`${cls} w-full text-left flex items-center gap-3`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 ${
                    showAnswer && isCorrectOpt ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/40"
                    : showAnswer && isSelectedOpt && !isCorrectOpt ? "bg-red-400/20 text-red-400 border border-red-400/40"
                    : "bg-white/5 text-gray-500 border border-white/10"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className={`text-sm ${showAnswer && isCorrectOpt ? "text-emerald-300 font-semibold" : "text-gray-200"}`}>
                    {opt}
                  </span>
                  {showAnswer && isCorrectOpt && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto text-base">✅</motion.span>
                  )}
                  {showAnswer && isSelectedOpt && !isCorrectOpt && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto text-base">❌</motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }}
                className="mt-4 p-4 rounded-xl bg-blue-500/8 border border-blue-500/20"
              >
                <div className="text-blue-300 text-[10px] font-semibold uppercase tracking-wider mb-1">💡 Penjelasan</div>
                <p className="text-gray-300 text-sm leading-relaxed">{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ════════════════════════════════
  // RESULT SCREEN
  // ════════════════════════════════
  if (gameState === "result") {
    const isPerfect = correctCount === currentQs.length;
    const isGood = accuracy >= 70;
    const canLevelUp = DIFF_CONFIG[difficulty].next && isGood;

    return (
      <div className="pt-20 pb-10 px-4 min-h-screen flex items-center justify-center relative">
        {showConfetti && <Confetti recycle={false} numberOfPieces={250} colors={["#f59e0b", "#fbbf24", "#d97706", "#fff"]} />}
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-lg">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }} className="glass-card p-8 text-center">
            {/* Result emoji */}
            <motion.div
              animate={{ rotate: isPerfect ? [0, 15, -15, 0] : [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: 3 }}
              className="text-6xl mb-3"
            >
              {isPerfect ? "🏆" : isGood ? "🎉" : "💪"}
            </motion.div>
            <h2 className="font-display text-3xl font-extrabold text-white mb-1">
              {isPerfect ? "SEMPURNA!" : isGood ? "Keren!" : "Terus Berlatih!"}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Level: <span className="text-gold-400 font-semibold">{DIFF_CONFIG[difficulty].label}</span>
              {selectedLang !== "all" && ` · ${languages.find((l) => l.slug === selectedLang)?.name || selectedLang}`}
            </p>

            {/* Score grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-gold-500/10 border border-gold-500/20 rounded-xl p-4">
                <div className="text-2xl font-display font-extrabold text-gold-400 font-mono">{coinsEarned}</div>
                <div className="text-gray-500 text-xs">🪙 Koin Earned</div>
              </div>
              <div className={`rounded-xl p-4 border ${accuracy >= 80 ? "bg-emerald-500/10 border-emerald-500/20" : accuracy >= 50 ? "bg-amber-500/10 border-amber-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                <div className={`text-2xl font-display font-extrabold font-mono ${accuracy >= 80 ? "text-emerald-400" : accuracy >= 50 ? "text-amber-400" : "text-red-400"}`}>{accuracy}%</div>
                <div className="text-gray-500 text-xs">Akurasi</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <div className="text-2xl font-display font-extrabold text-emerald-400 font-mono">{correctCount}</div>
                <div className="text-gray-500 text-xs">✅ Benar</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="text-2xl font-display font-extrabold text-red-400 font-mono">{wrongCount}</div>
                <div className="text-gray-500 text-xs">❌ Salah</div>
              </div>
            </div>

            {/* Answer trail */}
            <div className="flex justify-center gap-1.5 flex-wrap mb-5">
              {answeredResults.map((r, i) => (
                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04 }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    r ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/40"
                      : "bg-red-400/20 text-red-400 border border-red-400/40"
                  }`}
                >
                  {r ? "✓" : "✗"}
                </motion.div>
              ))}
            </div>

            {/* Total coins */}
            <div className="bg-gold-500/8 border border-gold-500/20 rounded-xl p-3 mb-5">
              <div className="text-gray-500 text-xs mb-0.5">Total Koin Kamu</div>
              <div className="text-gold-400 font-bold text-xl font-mono">🪙 {formatCoins(coins)}</div>
            </div>

            {/* LEVEL UP button (if earned) */}
            {canLevelUp && (
              <motion.button
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(245,158,11,0.5)" }}
                whileTap={{ scale: 0.97 }}
                onClick={goNextLevel}
                className="btn-gold w-full py-3.5 mb-3 rounded-xl flex items-center justify-center gap-2 font-bold"
              >
                <Star className="w-4 h-4" />
                Lanjut ke Level {DIFF_CONFIG[difficulty].next === "medium" ? "Menengah ⚡" : "Sulit 🔥"}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => setGameState("select")}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:border-gold-500/30 hover:text-gold-400 transition-all flex items-center justify-center gap-1.5 text-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Pilih Ulang
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={startGame}
                className="flex-1 py-2.5 rounded-xl border border-gold-500/25 text-gold-400 hover:bg-gold-500/8 transition-all flex items-center justify-center gap-1.5 text-sm font-semibold"
              >
                <Zap className="w-3.5 h-3.5" /> Ulangi Quiz
              </motion.button>
            </div>

            <Link href="/leaderboard" className="mt-3 flex items-center justify-center gap-1.5 text-gray-600 hover:text-gray-400 transition-colors text-xs">
              <Trophy className="w-3.5 h-3.5" /> Lihat Papan Skor
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
