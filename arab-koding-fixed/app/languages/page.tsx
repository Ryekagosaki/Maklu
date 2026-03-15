"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, Zap, Star, Filter, X } from "lucide-react";
import { languages, categories } from "@/data/languages";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function LanguagesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDiff, setActiveDiff] = useState("all");

  const filtered = useMemo(() => {
    return languages.filter((l) => {
      const matchSearch =
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.description.toLowerCase().includes(search.toLowerCase()) ||
        l.creator.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "All" || l.category === activeCategory;
      const matchDiff = activeDiff === "all" || l.difficulty === activeDiff;
      return matchSearch && matchCategory && matchDiff;
    });
  }, [search, activeCategory, activeDiff]);

  const difficultyColors: Record<string, string> = {
    beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/25",
    advanced: "text-red-400 bg-red-400/10 border-red-400/25",
  };
  const difficultyLabels: Record<string, string> = {
    beginner: "Pemula",
    intermediate: "Menengah",
    advanced: "Lanjutan",
  };

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen relative">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="category-pill inline-block mb-4">📚 Koleksi Lengkap</div>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-white mb-4">
            105+ Bahasa <span className="text-gold-gradient">Pemrograman</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dari bahasa pemula hingga bahasa sistem. Temukan bahasa yang ingin kamu pelajari!
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Cari bahasa pemrograman..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-dark-200/60 border border-gold-500/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/40 transition-colors font-body text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center justify-center gap-2">
            {[
              { value: "all", label: "Semua Level" },
              { value: "beginner", label: "Pemula" },
              { value: "intermediate", label: "Menengah" },
              { value: "advanced", label: "Lanjutan" },
            ].map((d) => (
              <button
                key={d.value}
                onClick={() => setActiveDiff(d.value)}
                className={`category-pill text-xs transition-all ${activeDiff === d.value ? "active" : ""}`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Category scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-pill whitespace-nowrap flex-shrink-0 ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-gray-500 text-sm">
            Menampilkan <span className="text-gold-400 font-bold">{filtered.length}</span> bahasa
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Filter className="w-3 h-3" />
            {activeCategory !== "All" && (
              <span className="text-gold-600">{activeCategory}</span>
            )}
          </div>
        </motion.div>

        {/* Language grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${search}-${activeCategory}-${activeDiff}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
          >
            {filtered.map((lang, i) => (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(i * 0.03, 0.5) }}
              >
                <Link href={`/languages/${lang.slug}`}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="glass-card p-4 cursor-pointer group relative overflow-hidden h-full"
                  >
                    {/* Trending badge */}
                    {lang.trending && (
                      <div className="absolute top-2 right-2">
                        <Zap className="w-3 h-3 text-orange-400" />
                      </div>
                    )}
                    {lang.popular && (
                      <div className="absolute top-2 right-2">
                        <Star className="w-3 h-3 text-gold-400" />
                      </div>
                    )}
                    {lang.trending && lang.popular && (
                      <div className="absolute top-2 right-2 flex gap-0.5">
                        <Zap className="w-3 h-3 text-orange-400" />
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xs mb-3 mx-auto"
                      style={{
                        backgroundColor: `${lang.color}18`,
                        color: lang.color,
                        border: `1px solid ${lang.color}25`,
                      }}
                    >
                      {lang.icon}
                    </div>

                    {/* Name */}
                    <div className="font-display font-bold text-white text-xs text-center mb-1 group-hover:text-gold-400 transition-colors truncate">
                      {lang.name}
                    </div>

                    {/* Category */}
                    <div className="text-center">
                      <span className="text-gray-500 text-[10px]">{lang.category}</span>
                    </div>

                    {/* Difficulty */}
                    <div className="mt-2 text-center">
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold ${
                          difficultyColors[lang.difficulty] || "text-gray-400"
                        }`}
                      >
                        {difficultyLabels[lang.difficulty]}
                      </span>
                    </div>

                    {/* Year */}
                    <div className="mt-1 text-center text-gray-600 text-[9px] font-mono">
                      {lang.year}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">Tidak ditemukan</h3>
            <p className="text-gray-500">Coba kata kunci yang berbeda</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
