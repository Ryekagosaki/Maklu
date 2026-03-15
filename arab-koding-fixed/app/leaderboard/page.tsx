"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap, Award } from "lucide-react";
import { useGameStore, badges } from "@/lib/store";
import { formatCoins, getAccuracy } from "@/lib/utils";
import Link from "next/link";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function LeaderboardPage() {
  const { coins, totalAnswered, correctAnswered, streak, maxStreak, completedLanguages, unlockedBadges } = useGameStore();
  const accuracy = getAccuracy(correctAnswered, totalAnswered);

  const stats = [
    { label: "Total Koin", value: formatCoins(coins), icon: "🪙", color: "text-gold-400", bg: "bg-gold-500/10 border-gold-500/20" },
    { label: "Soal Dijawab", value: totalAnswered.toString(), icon: "📝", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "Jawaban Benar", value: correctAnswered.toString(), icon: "✅", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "Akurasi", value: accuracy, icon: "🎯", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
    { label: "Streak Terbesar", value: maxStreak.toString(), icon: "🔥", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
    { label: "Bahasa Selesai", value: completedLanguages.length.toString(), icon: "🌍", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  ];

  // Rank calculation
  const getRank = () => {
    if (coins >= 1000) return { title: "Grand Master", icon: "👑", color: "text-gold-400" };
    if (coins >= 500) return { title: "Expert", icon: "💎", color: "text-blue-400" };
    if (coins >= 200) return { title: "Intermediate", icon: "⚡", color: "text-amber-400" };
    if (coins >= 50) return { title: "Beginner", icon: "🌱", color: "text-emerald-400" };
    return { title: "Newbie", icon: "🐣", color: "text-gray-400" };
  };

  const rank = getRank();
  const nextRankCoins = coins >= 1000 ? null : coins >= 500 ? 1000 : coins >= 200 ? 500 : coins >= 50 ? 200 : 50;
  const rankProgress = nextRankCoins ? Math.min((coins / nextRankCoins) * 100, 100) : 100;

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen relative">
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="category-pill inline-block mb-4">🏆 Progress Kamu</div>
          <h1 className="font-display text-5xl font-extrabold text-white mb-4">
            Papan <span className="text-gold-gradient">Skor</span>
          </h1>
          <p className="text-gray-400">Lihat perkembangan belajar dan pencapaianmu!</p>
        </motion.div>

        {/* Rank Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 text-center mb-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-3"
            >
              {rank.icon}
            </motion.div>
            <h2 className={`font-display text-3xl font-extrabold ${rank.color} mb-1`}>
              {rank.title}
            </h2>
            <p className="text-gray-500 text-sm mb-6">Peringkat kamu saat ini</p>
            
            {/* Total Coins Big Display */}
            <div className="text-5xl font-display font-extrabold text-gold-gradient font-mono mb-2">
              🪙 {formatCoins(coins)}
            </div>
            <p className="text-gray-500 text-sm mb-6">Total koin terkumpul</p>

            {/* Progress to next rank */}
            {nextRankCoins && (
              <div className="max-w-xs mx-auto">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Progress ke rank berikutnya</span>
                  <span>{coins}/{nextRankCoins}</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${rankProgress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className={`glass-card p-5 border ${stat.bg}`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`font-display font-extrabold text-2xl font-mono mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mb-8"
        >
          <h2 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-gold-400" />
            Badge Achievements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badges.map((badge, i) => {
              const unlocked = unlockedBadges.includes(badge.id);
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    unlocked
                      ? "bg-gold-500/12 border-gold-500/30 shadow-gold-sm"
                      : "bg-white/2 border-white/5 opacity-40 grayscale"
                  }`}
                >
                  <div className={`text-3xl mb-2 ${!unlocked && "filter grayscale"}`}>
                    {badge.icon}
                  </div>
                  <div className={`font-display font-bold text-sm mb-1 ${unlocked ? "text-gold-400" : "text-gray-500"}`}>
                    {badge.label}
                  </div>
                  <div className="text-gray-500 text-xs">{badge.description}</div>
                  {unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 text-[10px] text-emerald-400 font-semibold"
                    >
                      ✓ UNLOCKED
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/game">
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card p-6 cursor-pointer text-center"
            >
              <Zap className="w-8 h-8 text-gold-400 mx-auto mb-3" />
              <div className="font-display font-bold text-white text-lg mb-1">Lanjut Bermain</div>
              <div className="text-gray-500 text-sm">Tambah koin & streak-mu</div>
            </motion.div>
          </Link>
          <Link href="/languages">
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card p-6 cursor-pointer text-center"
            >
              <Star className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="font-display font-bold text-white text-lg mb-1">Eksplorasi Bahasa</div>
              <div className="text-gray-500 text-sm">Pelajari bahasa baru</div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
