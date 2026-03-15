# 🚀 Arab Koding — Belajar Pemrograman Bersama Arding

> Platform belajar 105+ bahasa pemrograman dengan game quiz interaktif, sistem koin, dan animasi premium.

![Arab Koding](https://img.shields.io/badge/Arab_Koding-Premium-gold?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

---

## ✨ Fitur Utama

- 📚 **105+ Bahasa Pemrograman** — Python, JavaScript, Rust, Go, Solidity, dan banyak lagi
- 🎮 **Game Quiz Interaktif** — 3 level: Pemula (🌱), Menengah (⚡), Sulit (🔥)
- 🪙 **Sistem Koin & Reward** — Koin untuk setiap jawaban benar, bonus streak
- 🏆 **Badge Achievements** — Unlock badge spesial berdasarkan pencapaian
- ⚡ **Animasi Premium** — Framer Motion dengan efek glass morphism
- 📱 **Fully Responsive** — Optimal di desktop, tablet, dan mobile
- 🌙 **Dark Theme** — Tema gelap premium dengan aksen emas
- 🔥 **Streak System** — Bonus koin saat jawab berturut-turut benar

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| State | Zustand (with persist) |
| UI Components | Custom + Lucide React |
| Notifications | React Hot Toast |
| Effects | React Confetti |

---

## 🚀 Cara Menjalankan

### Prerequisite
- **Node.js** versi 18 atau lebih baru
- **npm** atau **yarn** atau **pnpm**

### Langkah 1: Install dependencies

```bash
# Masuk ke folder proyek
cd arab-koding

# Install semua package
npm install
```

### Langkah 2: Jalankan development server

```bash
npm run dev
```

Buka browser dan akses: **http://localhost:3000**

### Langkah 3: Build untuk produksi (opsional)

```bash
# Build optimized production build
npm run build

# Jalankan production server
npm start
```

---

## 📁 Struktur Proyek

```
arab-koding/
├── app/
│   ├── layout.tsx          # Root layout dengan Navbar & Footer
│   ├── page.tsx            # Halaman utama (Hero, Stats, Languages)
│   ├── globals.css         # Global styles + custom CSS
│   ├── not-found.tsx       # Halaman 404
│   ├── languages/
│   │   ├── page.tsx        # Daftar semua 105+ bahasa
│   │   └── [slug]/
│   │       └── page.tsx    # Detail bahasa pemrograman
│   ├── game/
│   │   └── page.tsx        # Game Quiz (3 level)
│   ├── leaderboard/
│   │   └── page.tsx        # Papan skor & badge
│   └── api/
│       └── questions/
│           └── route.ts    # API endpoint soal quiz
├── components/
│   └── layout/
│       └── Navbar.tsx      # Navigasi dengan animasi
├── data/
│   ├── languages.ts        # Data 105+ bahasa pemrograman
│   └── questions.ts        # 60+ soal quiz multi-level
├── lib/
│   ├── store.ts            # Zustand store (coins, streak, badges)
│   └── utils.ts            # Helper functions
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 🎮 Cara Bermain

1. **Pilih Bahasa** — Browse 105+ bahasa di menu "Bahasa"
2. **Mulai Quiz** — Klik "Game Quiz" di navbar
3. **Pilih Level** — Pemula (10 koin), Menengah (20 koin), Sulit (30 koin)
4. **Jawab Soal** — 10 soal dengan timer per soal
5. **Kumpulkan Koin** — Jawab benar = dapat koin!
6. **Streak Bonus** — Jawab 3 berturut = +20 koin, 5 berturut = +50 koin
7. **Unlock Badge** — Capai milestone untuk badge khusus

---

## 🪙 Sistem Koin

| Level | Koin per Soal | Waktu |
|-------|--------------|-------|
| 🌱 Pemula | 10 koin | 30 detik |
| ⚡ Menengah | 20 koin | 25 detik |
| 🔥 Sulit | 30 koin | 20 detik |

**Bonus Streak:**
- 3 berturut-turut benar → +20 koin ekstra
- 5 berturut-turut benar → +50 koin ekstra

---

## 🏆 Badge System

| Badge | Syarat |
|-------|--------|
| 🌱 Pemula Baru | Jawab 10 soal benar |
| 📚 Murid Setia | Jawab 50 soal benar |
| 💰 Jutawan Koin | Kumpulkan 100 koin |
| 🔥 Master Streak | Capai streak 10 |
| 🌍 Polyglot | Selesaikan 5 bahasa |

---

## 🎨 Design System

- **Font Display:** Syne (heading)
- **Font Body:** DM Sans
- **Font Mono:** JetBrains Mono
- **Font Arabic:** Amiri
- **Primary Color:** Gold (#f59e0b)
- **Background:** Deep dark navy (#050510)
- **Effect:** Glass morphism + ambient glows

---

## ❓ Troubleshooting

### Error: Port already in use
```bash
# Gunakan port berbeda
npm run dev -- -p 3001
```

### Error: Module not found
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules .next
npm install
```

### Error: TypeScript errors
```bash
# Build tetap berjalan meskipun ada TS warnings
npm run build -- --no-lint
```

---

## 📝 Developer Notes

Data soal quiz tersimpan di `data/questions.ts`. Untuk menambah soal baru:

```typescript
{
  id: "unique-id",
  language: "Nama Bahasa",
  languageSlug: "slug-bahasa",
  difficulty: "easy" | "medium" | "hard",
  question: "Pertanyaan di sini?",
  options: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
  correct: 0, // Index jawaban benar (0-3)
  explanation: "Penjelasan mengapa jawaban ini benar",
  coins: 10, // Jumlah koin untuk soal ini
}
```

---

Dibuat dengan ❤️ untuk komunitas programmer Indonesia.

**Arab Koding** — *بَرْمَجَةٌ مَعَ أَرْدِينْغ*
