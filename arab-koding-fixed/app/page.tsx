"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Code2, Zap, ArrowRight, BookOpen, Gamepad2, ChevronRight, Terminal, Star } from "lucide-react";
import { languages } from "@/data/languages";
import { useGameStore } from "@/lib/store";
import { formatCoins } from "@/lib/utils";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

const popularLanguages  = languages.filter((l) => l.popular).slice(0, 8);
const trendingLanguages = languages.filter((l) => l.trending).slice(0, 6);

const TYPING_WORDS = ["JavaScript", "Python", "Rust", "Go", "TypeScript", "Kotlin", "Swift", "Solidity", "C++", "Dart"];

function TypewriterText() {
  const [wordIdx,  setWordIdx]  = useState(0);
  const [shown,    setShown]    = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    let t: NodeJS.Timeout;
    if (!deleting && shown.length < word.length)     t = setTimeout(() => setShown(word.slice(0, shown.length + 1)), 75);
    else if (!deleting && shown.length === word.length) t = setTimeout(() => setDeleting(true), 1400);
    else if (deleting && shown.length > 0)           t = setTimeout(() => setShown(shown.slice(0, -1)), 35);
    else { setDeleting(false); setWordIdx((i) => (i + 1) % TYPING_WORDS.length); }
    return () => clearTimeout(t);
  }, [shown, deleting, wordIdx]);
  return (
    <span className="font-mono font-bold" style={{ color: "var(--neon)", textShadow: "0 0 20px rgba(0,255,136,0.5)" }}>
      {shown}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-5 ml-0.5 align-middle" style={{ background: "var(--neon)" }} />
    </span>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { coins, totalAnswered, correctAnswered } = useGameStore();
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="pt-16 relative">
      <AnimatedBackground />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative text-center max-w-3xl mx-auto z-10">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.8, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border text-xs font-semibold tracking-wide"
            style={{ background: "rgba(0,255,136,0.06)", borderColor: "rgba(0,255,136,0.25)", color: "var(--neon)" }}>
            <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Zap className="w-3.5 h-3.5" />
            </motion.div>
            Platform Coding #1 Indonesia • 105+ Bahasa
          </motion.div>

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mb-4">
            <motion.h1 className="font-display font-extrabold leading-tight tracking-tight">
              <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
                className="block text-3xl sm:text-4xl lg:text-5xl text-white">
                Belajar Pemrograman
              </motion.span>
              <motion.span initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}
                className="block text-3xl sm:text-4xl lg:text-5xl text-neon-gradient">
                Bersama Arding
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Arabic */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="font-arabic text-lg mb-4" style={{ color: "rgba(0,255,136,0.5)" }}>
            Arab Koding — أَرَبْ كُودِينْغ
          </motion.p>

          {/* Typewriter */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="text-base sm:text-lg text-gray-400 mb-3">
            Kuasai <TypewriterText /> dan 100+ bahasa lainnya
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
            className="text-gray-600 text-sm max-w-md mx-auto mb-8">
            Code runner online, game quiz interaktif, sistem koin & badge — semua gratis!
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/playground">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="btn-neon px-7 py-3 text-sm font-bold rounded-xl flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Coba Code Runner
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </Link>
            <Link href="/game">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="px-7 py-3 text-sm font-bold rounded-xl border text-gray-300 hover:text-white transition-all flex items-center gap-2"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <Gamepad2 className="w-4 h-4" />
                Main Quiz
              </motion.button>
            </Link>
            <Link href="/languages">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="px-7 py-3 text-sm font-bold rounded-xl border text-gray-400 hover:text-white transition-all flex items-center gap-2"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <BookOpen className="w-4 h-4" />
                105+ Bahasa
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats if played */}
          {totalAnswered > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
              className="mt-6 inline-flex items-center gap-6 glass rounded-2xl px-6 py-3">
              {[
                { label: "Koin", value: formatCoins(coins), color: "var(--gold)" },
                { label: "Benar", value: correctAnswered, color: "var(--neon)" },
                { label: "Total", value: totalAnswered, color: "var(--cyan)" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-bold text-base font-mono" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-gray-700 text-[10px]">{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "rgba(0,255,136,0.3)" }}>scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1px solid rgba(0,255,136,0.2)" }}>
            <div className="w-1 h-1.5 rounded-full" style={{ background: "rgba(0,255,136,0.5)" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "105+", l: "Bahasa", icon: "💻", c: "var(--neon)" },
              { v: "200+", l: "Soal Quiz", icon: "📝", c: "var(--cyan)" },
              { v: "15+",  l: "Code Runner", icon: "⚡", c: "var(--purple)" },
              { v: "∞",    l: "Koin",  icon: "🪙", c: "#f59e0b" },
            ].map((s) => (
              <motion.div key={s.l} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                <motion.div whileHover={{ y: -6, scale: 1.02 }} className="glass-card p-5 text-center">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }} className="text-2xl mb-2">{s.icon}</motion.div>
                  <div className="font-display font-extrabold text-2xl mb-0.5" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-gray-600 text-[11px]">{s.l}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <div className="category-pill inline-block mb-3">✨ Fitur Unggulan</div>
            <h2 className="font-display text-3xl font-bold text-white">Kenapa <span className="text-neon-gradient">Arab Koding?</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { emoji: "🖥️", title: "Code Runner Online",   desc: "Jalankan 15+ bahasa langsung di browser. Monaco editor premium + output real-time.",    border: "rgba(0,212,255,0.2)",  bg: "rgba(0,212,255,0.05)"  },
              { emoji: "🎮", title: "Game Quiz Interaktif", desc: "Pilih bahasa, 3 level, jawaban diacak, dan streak bonus koin tiap jawaban benar!",           border: "rgba(0,255,136,0.2)",  bg: "rgba(0,255,136,0.04)"  },
              { emoji: "🏆", title: "105+ Bahasa Lengkap",  desc: "Dari Python hingga Solidity. Detail lengkap, kategori, tingkat kesulitan, dan use cases.",  border: "rgba(191,0,255,0.2)",  bg: "rgba(191,0,255,0.04)"  },
            ].map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15 }} whileHover={{ y: -8 }}
                className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300"
                style={{ border: `1px solid ${f.border}`, background: f.bg }}>
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: i }}
                  className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-xl"
                  style={{ background: f.border }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR LANGUAGES */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center justify-between mb-7">
            <div>
              <div className="category-pill inline-block mb-2">⭐ Terpopuler</div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Bahasa Paling Diminati</h2>
            </div>
            <Link href="/languages">
              <motion.span whileHover={{ x: 4 }} className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors">
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {popularLanguages.map((lang, i) => (
              <motion.div key={lang.id}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={`/languages/${lang.slug}`}>
                  <motion.div whileHover={{ y: -8, scale: 1.04 }} className="glass-card p-4 cursor-pointer group text-center">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs mb-2.5 mx-auto"
                      style={{ backgroundColor: `${lang.color}18`, color: lang.color, border: `1px solid ${lang.color}28` }}>
                      {lang.icon}
                    </div>
                    <div className="font-display font-bold text-white text-xs mb-0.5 group-hover:text-cyber transition-colors">{lang.name}</div>
                    <div className="text-gray-600 text-[10px]">{lang.category}</div>
                    {lang.trending && (
                      <div className="mt-1 inline-flex items-center gap-0.5 text-[9px] font-semibold" style={{ color: "var(--neon)" }}>
                        <Zap className="w-2 h-2" /> Trending
                      </div>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-7">
            <div className="category-pill inline-block mb-2">🔥 Trending Now</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Sedang Naik Daun</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {trendingLanguages.map((lang, i) => (
              <motion.div key={lang.id}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={`/languages/${lang.slug}`}>
                  <motion.div whileHover={{ x: 8 }} className="glass-card p-4 flex items-center gap-3 cursor-pointer group">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0"
                      style={{ backgroundColor: `${lang.color}1a`, color: lang.color, border: `1px solid ${lang.color}28` }}>
                      {lang.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-white text-sm group-hover:text-cyber transition-colors">{lang.name}</div>
                      <div className="text-gray-600 text-[10px] truncate">{lang.description.slice(0, 45)}...</div>
                      <div className="flex gap-1 mt-1">
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(0,255,136,0.08)", color: "var(--neon)", border: "1px solid rgba(0,255,136,0.15)" }}>🔥 Hot</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(0,212,255,0.06)", color: "var(--cyan)", border: "1px solid rgba(0,212,255,0.15)" }}>{lang.category}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-white flex-shrink-0" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-10 text-center cyber-border"
            style={{ background: "rgba(7,7,15,0.9)" }}>
            <motion.div animate={{ background: ["radial-gradient(circle at 30%,rgba(0,255,136,0.06),transparent 60%)","radial-gradient(circle at 70%,rgba(0,212,255,0.06),transparent 60%)","radial-gradient(circle at 30%,rgba(0,255,136,0.06),transparent 60%)"] }}
              transition={{ duration: 6, repeat: Infinity }} className="absolute inset-0" />
            <div className="relative">
              <motion.div animate={{ y: [-5,5,-5], rotate: [0,5,-5,0] }} transition={{ duration: 4, repeat: Infinity }} className="text-5xl mb-5">🚀</motion.div>
              <h2 className="font-display text-3xl font-bold text-white mb-3">Siap Jadi <span className="text-neon-gradient">Programmer Handal?</span></h2>
              <p className="text-gray-600 text-sm mb-7">Mulai sekarang. Gratis, interaktif, dan seru!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/playground">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    className="btn-neon px-7 py-3 rounded-xl flex items-center gap-2 text-sm font-bold">
                    <Terminal className="w-4 h-4" /> Coba Code Runner
                  </motion.button>
                </Link>
                <Link href="/game">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    className="btn-cyber px-7 py-3 rounded-xl flex items-center gap-2 text-sm font-bold">
                    <Star className="w-4 h-4" /> Main Quiz
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
