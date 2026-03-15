"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          🔍
        </motion.div>
        <h1 className="font-display text-6xl font-extrabold text-gold-gradient mb-4">404</h1>
        <p className="text-gray-400 text-lg mb-8">Halaman tidak ditemukan</p>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold px-8 py-3 rounded-xl font-bold"
          >
            Kembali ke Beranda
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
