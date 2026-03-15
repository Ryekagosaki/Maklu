import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCoins(coins: number): string {
  if (coins >= 1000000) return `${(coins / 1000000).toFixed(1)}M`;
  if (coins >= 1000) return `${(coins / 1000).toFixed(1)}K`;
  return coins.toString();
}

export function getAccuracy(correct: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((correct / total) * 100)}%`;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "easy": return "text-emerald-400";
    case "medium": return "text-amber-400";
    case "hard": return "text-red-400";
    default: return "text-gray-400";
  }
}

export function getDifficultyBg(difficulty: string): string {
  switch (difficulty) {
    case "easy": return "bg-emerald-400/10 border-emerald-400/30";
    case "medium": return "bg-amber-400/10 border-amber-400/30";
    case "hard": return "bg-red-400/10 border-red-400/30";
    default: return "bg-gray-400/10 border-gray-400/30";
  }
}

export function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case "easy": return "Pemula";
    case "medium": return "Menengah";
    case "hard": return "Sulit";
    default: return difficulty;
  }
}
