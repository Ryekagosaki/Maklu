import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  coins: number;
  totalAnswered: number;
  correctAnswered: number;
  streak: number;
  maxStreak: number;
  completedLanguages: string[];
  unlockedBadges: string[];

  // Actions
  addCoins: (amount: number) => void;
  recordAnswer: (correct: boolean, coins?: number) => void;
  completeLanguage: (slug: string) => void;
  unlockBadge: (badge: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      coins: 0,
      totalAnswered: 0,
      correctAnswered: 0,
      streak: 0,
      maxStreak: 0,
      completedLanguages: [],
      unlockedBadges: [],

      addCoins: (amount) => {
        set((state) => ({ coins: state.coins + amount }));
      },

      recordAnswer: (correct, coins = 0) => {
        const state = get();
        const newStreak = correct ? state.streak + 1 : 0;
        const newMaxStreak = Math.max(state.maxStreak, newStreak);

        // Bonus coins for streak
        let bonusCoins = 0;
        if (correct && newStreak % 5 === 0 && newStreak > 0) bonusCoins = 50;
        else if (correct && newStreak % 3 === 0 && newStreak > 0) bonusCoins = 20;

        set({
          totalAnswered: state.totalAnswered + 1,
          correctAnswered: state.correctAnswered + (correct ? 1 : 0),
          streak: newStreak,
          maxStreak: newMaxStreak,
          coins: state.coins + (correct ? coins + bonusCoins : 0),
        });

        // Check badges
        const updatedState = get();
        if (updatedState.correctAnswered >= 10 && !updatedState.unlockedBadges.includes("newcomer")) {
          set((s) => ({ unlockedBadges: [...s.unlockedBadges, "newcomer"] }));
        }
        if (updatedState.correctAnswered >= 50 && !updatedState.unlockedBadges.includes("apprentice")) {
          set((s) => ({ unlockedBadges: [...s.unlockedBadges, "apprentice"] }));
        }
        if (updatedState.coins >= 100 && !updatedState.unlockedBadges.includes("wealthy")) {
          set((s) => ({ unlockedBadges: [...s.unlockedBadges, "wealthy"] }));
        }
        if (updatedState.maxStreak >= 10 && !updatedState.unlockedBadges.includes("streak_master")) {
          set((s) => ({ unlockedBadges: [...s.unlockedBadges, "streak_master"] }));
        }
      },

      completeLanguage: (slug) => {
        const state = get();
        if (!state.completedLanguages.includes(slug)) {
          set((s) => ({
            completedLanguages: [...s.completedLanguages, slug],
            coins: s.coins + 100, // Bonus for completing a language
          }));
        }
      },

      unlockBadge: (badge) => {
        set((s) => ({
          unlockedBadges: [...new Set([...s.unlockedBadges, badge])],
        }));
      },

      resetGame: () => {
        set({
          coins: 0,
          totalAnswered: 0,
          correctAnswered: 0,
          streak: 0,
          maxStreak: 0,
          completedLanguages: [],
          unlockedBadges: [],
        });
      },
    }),
    {
      name: "arab-koding-game",
    }
  )
);

export const badges = [
  { id: "newcomer", label: "Pemula Baru", icon: "🌱", description: "Jawab 10 soal dengan benar" },
  { id: "apprentice", label: "Murid Setia", icon: "📚", description: "Jawab 50 soal dengan benar" },
  { id: "wealthy", label: "Jutawan Koin", icon: "💰", description: "Kumpulkan 100 koin" },
  { id: "streak_master", label: "Master Streak", icon: "🔥", description: "Capai streak 10 jawaban benar" },
  { id: "polyglot", label: "Polyglot", icon: "🌍", description: "Selesaikan 5 bahasa berbeda" },
];
