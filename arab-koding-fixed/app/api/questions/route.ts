import { NextRequest, NextResponse } from "next/server";
import { questions, getRandomQuestions, type Difficulty } from "@/data/questions";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get("difficulty") as Difficulty | null;
  const lang = searchParams.get("lang");
  const count = parseInt(searchParams.get("count") || "10");

  let result = questions;

  if (difficulty) {
    result = result.filter((q) => q.difficulty === difficulty);
  }

  if (lang) {
    result = result.filter(
      (q) => q.languageSlug === lang || q.languageSlug === "general"
    );
  }

  // Shuffle and limit
  const shuffled = [...result].sort(() => Math.random() - 0.5).slice(0, count);

  return NextResponse.json({
    questions: shuffled,
    total: shuffled.length,
  });
}
