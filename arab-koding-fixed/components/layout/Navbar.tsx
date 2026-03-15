"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, GamepadIcon, BookOpen, Home, Menu, X, Trophy, Terminal } from "lucide-react";
import { useGameStore } from "@/lib/store";
import { formatCoins } from "@/lib/utils";

const navLinks = [
  { href: "/",            label: "Beranda",    icon: Home        },
  { href: "/languages",   label: "Bahasa",     icon: BookOpen    },
  { href: "/playground",  label: "Playground", icon: Terminal    },
  { href: "/game",        label: "Quiz",       icon: GamepadIcon },
  { href: "/leaderboard", label: "Skor",       icon: Trophy      },
];

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const pathname = usePathname();
  const { coins, streak } = useGameStore();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(2,2,6,0.92)] backdrop-blur-xl border-b border-[rgba(0,255,136,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent"
        }`}
      >
        {/* Top neon line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, var(--neon), var(--cyan), var(--purple), transparent)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 rounded-lg border flex items-center justify-center"
              style={{ borderColor: "rgba(0,255,136,0.4)", background: "rgba(0,255,136,0.08)" }}
            >
              <Code2 className="w-4 h-4" style={{ color: "var(--neon)" }} />
            </motion.div>
            <div>
              <motion.span
                className="font-display font-bold text-base text-neon-gradient"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Arab Koding
              </motion.span>
              <div className="text-[9px] font-arabic leading-none" style={{ color: "rgba(0,255,136,0.4)" }}>
                أَرَبْ كُودِينْغ
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const Icon     = link.icon;
              const isActive = pathname === link.href;
              const isPlay   = link.href === "/playground";
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -2 }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                      isActive
                        ? "bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.3)]"
                        : "hover:bg-[rgba(0,255,136,0.05)] hover:border-[rgba(0,255,136,0.1)] border border-transparent"
                    }`}
                    style={{ color: isActive ? "var(--neon)" : isPlay ? "var(--cyan)" : "#9ca3af" }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.label}
                    {isPlay && (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-0.5 text-[8px] font-mono px-1 py-0.5 rounded"
                        style={{ background: "rgba(0,212,255,0.15)", color: "var(--cyan)", border: "1px solid rgba(0,212,255,0.3)" }}
                      >
                        NEW
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Coins + streak */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-xs font-bold font-mono"
              style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)", color: "#f59e0b" }}
            >
              🪙 {formatCoins(coins)}
            </motion.div>

            {streak > 0 && (
              <div className="hidden sm:flex items-center gap-1 rounded-full px-2.5 py-1.5 border text-xs font-bold font-mono"
                style={{ background: "rgba(255,107,0,0.08)", borderColor: "rgba(255,107,0,0.2)", color: "#ff6b00" }}>
                🔥{streak}
              </div>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "var(--neon)" }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 border-b"
            style={{ background: "rgba(2,2,6,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(0,255,136,0.1)" }}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid rgba(0,255,136,0.08)" }}>
                <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-xs font-bold font-mono"
                  style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                  🪙 {formatCoins(coins)}
                </div>
                {streak > 0 && (
                  <div className="flex items-center gap-1 rounded-full px-3 py-1.5 border text-xs font-bold font-mono"
                    style={{ background: "rgba(255,107,0,0.08)", borderColor: "rgba(255,107,0,0.2)", color: "#ff6b00" }}>
                    🔥{streak}
                  </div>
                )}
              </div>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all ${
                      pathname === link.href ? "bg-[rgba(0,255,136,0.08)]" : "hover:bg-white/3"
                    }`}
                      style={{ color: pathname === link.href ? "var(--neon)" : "#9ca3af" }}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                      {link.href === "/playground" && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold"
                          style={{ background: "rgba(0,212,255,0.15)", color: "var(--cyan)" }}>NEW</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
