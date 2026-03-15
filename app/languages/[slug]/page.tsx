"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Star, Zap, Play, Code2 } from "lucide-react";
import { languages } from "@/data/languages";
import { questions } from "@/data/questions";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export default function LanguageDetailPage({ params }: Props) {
  const lang = languages.find((l) => l.slug === params.slug);
  if (!lang) notFound();

  const langQuestions = questions.filter(
    (q) => q.languageSlug === params.slug
  );

  const easyCount = langQuestions.filter((q) => q.difficulty === "easy").length;
  const medCount = langQuestions.filter((q) => q.difficulty === "medium").length;
  const hardCount = langQuestions.filter((q) => q.difficulty === "hard").length;

  const difficultyText: Record<string, string> = {
    beginner: "Pemula — Cocok untuk baru mulai belajar",
    intermediate: "Menengah — Sudah ada dasar pemrograman",
    advanced: "Lanjutan — Membutuhkan pengalaman",
  };

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link href="/languages">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-gray-500 hover:text-gold-400 mb-8 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Bahasa
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-6"
        >
          <div className="flex items-start gap-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center font-mono font-bold text-xl flex-shrink-0"
              style={{
                backgroundColor: `${lang.color}20`,
                color: lang.color,
                border: `1px solid ${lang.color}30`,
                boxShadow: `0 0 20px ${lang.color}20`,
              }}
            >
              {lang.icon}
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display text-4xl font-extrabold text-white">
                  {lang.name}
                </h1>
                {lang.trending && (
                  <span className="flex items-center gap-1 text-xs bg-orange-500/15 text-orange-400 px-3 py-1 rounded-full font-semibold border border-orange-500/25">
                    <Zap className="w-3 h-3" /> Trending
                  </span>
                )}
                {lang.popular && (
                  <span className="flex items-center gap-1 text-xs bg-gold-500/15 text-gold-400 px-3 py-1 rounded-full font-semibold border border-gold-500/25">
                    <Star className="w-3 h-3" /> Populer
                  </span>
                )}
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">{lang.description}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="w-4 h-4 text-gold-600" />
                  <span>Dibuat tahun {lang.year}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <User className="w-4 h-4 text-gold-600" />
                  <span>oleh {lang.creator}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-gold-600" />
                  <span
                    className={`font-semibold ${getDifficultyColor(lang.difficulty)}`}
                  >
                    {getDifficultyLabel(lang.difficulty)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h2 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
              🚀 Digunakan untuk apa?
            </h2>
            <div className="space-y-2">
              {lang.useCases.map((uc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5"
                >
                  <div className="w-2 h-2 rounded-full bg-gold-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{uc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quiz Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h2 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
              🎯 Quiz Tersedia
            </h2>

            {langQuestions.length > 0 ? (
              <>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="text-emerald-400 text-sm font-medium">Pemula</span>
                    </div>
                    <span className="text-white font-bold font-mono">{easyCount} soal × 🪙10</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/8 border border-amber-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <span className="text-amber-400 text-sm font-medium">Menengah</span>
                    </div>
                    <span className="text-white font-bold font-mono">{medCount} soal × 🪙20</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/8 border border-red-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="text-red-400 text-sm font-medium">Sulit</span>
                    </div>
                    <span className="text-white font-bold font-mono">{hardCount} soal × 🪙30</span>
                  </div>
                </div>

                <Link href={`/game?lang=${lang.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-gold w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold"
                  >
                    <Play className="w-5 h-5" />
                    Mulai Quiz {lang.name}
                  </motion.button>
                </Link>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🛠️</div>
                <p className="text-gray-500 text-sm">Soal sedang disiapkan</p>
                <Link href="/game" className="mt-4 inline-block text-gold-400 text-sm hover:underline">
                  Lihat quiz umum →
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Category & Difficulty Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mt-6"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-2 font-semibold">Kategori</div>
              <div className="category-pill inline-block">{lang.category}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-2 font-semibold">Tingkat Kesulitan</div>
              <div className="text-sm text-gray-300">{difficultyText[lang.difficulty]}</div>
            </div>
          </div>
        </motion.div>

        {/* Related languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h3 className="font-display font-bold text-xl text-white mb-4">Bahasa Serupa</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {languages
              .filter((l) => l.category === lang.category && l.id !== lang.id)
              .slice(0, 4)
              .map((related) => (
                <Link key={related.id} href={`/languages/${related.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-card p-4 text-center cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs mx-auto mb-2"
                      style={{ backgroundColor: `${related.color}20`, color: related.color, border: `1px solid ${related.color}25` }}
                    >
                      {related.icon}
                    </div>
                    <div className="text-white text-xs font-bold truncate">{related.name}</div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
