"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Play, Square, Trash2, Copy, Check, Download,
  Terminal, Code2, ChevronDown, Loader2, Zap, RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#030308]">
      <div className="flex items-center gap-3 text-neon-green/60">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="font-mono text-sm">Memuat editor...</span>
      </div>
    </div>
  ),
});

/* ── Supported languages ── */
interface LangConfig {
  label: string;
  pistonLang: string;
  version: string;
  monacoLang: string;
  icon: string;
  color: string;
  template: string;
}

const LANGUAGES: Record<string, LangConfig> = {
  python: {
    label: "Python", pistonLang: "python", version: "3.10.0",
    monacoLang: "python", icon: "🐍", color: "#3776AB",
    template: `# 🐍 Python — Arab Koding
def greet(name):
    return f"Halo, {name}! Selamat datang di Arab Koding 🚀"

names = ["Arding", "Arab Koding", "Python"]
for name in names:
    print(greet(name))

# List comprehension
squares = [x**2 for x in range(1, 11)]
print(f"Kuadrat 1-10: {squares}")

# Dictionary
lang = {"name": "Python", "year": 1991, "creator": "Guido van Rossum"}
for k, v in lang.items():
    print(f"  {k}: {v}")
`,
  },
  javascript: {
    label: "JavaScript", pistonLang: "javascript", version: "18.15.0",
    monacoLang: "javascript", icon: "⚡", color: "#F7DF1E",
    template: `// ⚡ JavaScript — Arab Koding
const greet = (name) => \`Halo, \${name}! Selamat datang di Arab Koding 🚀\`;

const names = ["Arding", "Arab Koding", "JavaScript"];
names.forEach(name => console.log(greet(name)));

// Array methods
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);
const even    = nums.filter(n => n % 2 === 0);
const sum     = nums.reduce((acc, n) => acc + n, 0);

console.log("Doubled:", doubled);
console.log("Even:   ", even);
console.log("Sum:    ", sum);

// Async simulation
const fetchData = async () => {
  return new Promise(resolve => 
    setTimeout(() => resolve({ status: "success", data: "Arab Koding!" }), 100)
  );
};

fetchData().then(res => console.log("Async result:", res));
`,
  },
  typescript: {
    label: "TypeScript", pistonLang: "typescript", version: "5.0.3",
    monacoLang: "typescript", icon: "🔷", color: "#3178C6",
    template: `// 🔷 TypeScript — Arab Koding
interface Language {
  name: string;
  year: number;
  creator: string;
  typed: boolean;
}

const greet = (lang: Language): string =>
  \`[\${lang.name}] Dibuat \${lang.year} oleh \${lang.creator} | Typed: \${lang.typed}\`;

const languages: Language[] = [
  { name: "TypeScript", year: 2012, creator: "Microsoft", typed: true },
  { name: "JavaScript", year: 1995, creator: "Brendan Eich", typed: false },
  { name: "Go",         year: 2009, creator: "Google",    typed: true },
];

languages.forEach(l => console.log(greet(l)));

// Generic function
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log("First:", getFirst(languages)?.name);
`,
  },
  java: {
    label: "Java", pistonLang: "java", version: "15.0.2",
    monacoLang: "java", icon: "☕", color: "#ED8B00",
    template: `// ☕ Java — Arab Koding
public class Main {
    static String greet(String name) {
        return "Halo, " + name + "! Selamat datang di Arab Koding 🚀";
    }

    public static void main(String[] args) {
        String[] names = {"Arding", "Arab Koding", "Java"};
        for (String name : names) {
            System.out.println(greet(name));
        }

        // Stream API
        int sum = 0;
        for (int i = 1; i <= 10; i++) sum += i;
        System.out.println("Sum 1-10: " + sum);

        System.out.println("Java version: " + System.getProperty("java.version"));
    }
}
`,
  },
  cpp: {
    label: "C++", pistonLang: "c++", version: "10.2.0",
    monacoLang: "cpp", icon: "⚙️", color: "#00599C",
    template: `// ⚙️ C++ — Arab Koding
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

string greet(const string& name) {
    return "Halo, " + name + "! Selamat datang di Arab Koding!";
}

int main() {
    vector<string> names = {"Arding", "Arab Koding", "C++"};
    for (const auto& name : names) {
        cout << greet(name) << endl;
    }

    // Vector operations
    vector<int> nums = {5, 3, 1, 4, 2};
    sort(nums.begin(), nums.end());
    cout << "Sorted: ";
    for (int n : nums) cout << n << " ";
    cout << endl;

    return 0;
}
`,
  },
  c: {
    label: "C", pistonLang: "c", version: "10.2.0",
    monacoLang: "c", icon: "🔩", color: "#A8B9CC",
    template: `// 🔩 C — Arab Koding
#include <stdio.h>
#include <string.h>

void greet(const char* name) {
    printf("Halo, %s! Selamat datang di Arab Koding!\\n", name);
}

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    const char* names[] = {"Arding", "Arab Koding", "C"};
    int len = sizeof(names) / sizeof(names[0]);
    
    for (int i = 0; i < len; i++) {
        greet(names[i]);
    }

    printf("\\nFaktorial:\\n");
    for (int i = 1; i <= 8; i++) {
        printf("  %d! = %d\\n", i, factorial(i));
    }

    return 0;
}
`,
  },
  rust: {
    label: "Rust", pistonLang: "rust", version: "1.68.2",
    monacoLang: "rust", icon: "🦀", color: "#CE412B",
    template: `// 🦀 Rust — Arab Koding
fn greet(name: &str) -> String {
    format!("Halo, {}! Selamat datang di Arab Koding! 🚀", name)
}

fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    let names = vec!["Arding", "Arab Koding", "Rust"];
    for name in &names {
        println!("{}", greet(name));
    }

    println!("\\nFibonacci:");
    for i in 0..10 {
        print!("{} ", fibonacci(i));
    }
    println!();

    // Ownership demo
    let s1 = String::from("Arab Koding");
    let s2 = s1.clone();
    println!("\\ns1: {}, s2: {}", s1, s2);
}
`,
  },
  go: {
    label: "Go", pistonLang: "go", version: "1.20.3",
    monacoLang: "go", icon: "🐹", color: "#00ADD8",
    template: `// 🐹 Go — Arab Koding
package main

import (
    "fmt"
    "strings"
)

func greet(name string) string {
    return fmt.Sprintf("Halo, %s! Selamat datang di Arab Koding! 🚀", name)
}

func fibonacci(n int) int {
    if n <= 1 { return n }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    names := []string{"Arding", "Arab Koding", "Go"}
    for _, name := range names {
        fmt.Println(greet(name))
    }

    fmt.Println("\\nFibonacci:", )
    fibs := make([]string, 10)
    for i := range fibs {
        fibs[i] = fmt.Sprintf("%d", fibonacci(i))
    }
    fmt.Println(strings.Join(fibs, " "))

    // Goroutine sederhana
    ch := make(chan string, 1)
    go func() { ch <- "Goroutine berhasil! 🎉" }()
    fmt.Println(<-ch)
}
`,
  },
  php: {
    label: "PHP", pistonLang: "php", version: "8.2.3",
    monacoLang: "php", icon: "🐘", color: "#777BB4",
    template: `<?php
// 🐘 PHP — Arab Koding
function greet(string $name): string {
    return "Halo, $name! Selamat datang di Arab Koding! 🚀";
}

$names = ["Arding", "Arab Koding", "PHP"];
foreach ($names as $name) {
    echo greet($name) . "\\n";
}

// Array functions
$nums = [5, 3, 1, 4, 2];
sort($nums);
echo "\\nSorted: " . implode(", ", $nums) . "\\n";

$squares = array_map(fn($n) => $n ** 2, range(1, 5));
echo "Squares: " . implode(", ", $squares) . "\\n";

// String functions
$str = "Arab Koding - Belajar Pemrograman";
echo "Upper: " . strtoupper($str) . "\\n";
echo "Words: " . str_word_count($str) . "\\n";
?>
`,
  },
  ruby: {
    label: "Ruby", pistonLang: "ruby", version: "3.2.1",
    monacoLang: "ruby", icon: "💎", color: "#CC342D",
    template: `# 💎 Ruby — Arab Koding
def greet(name)
  "Halo, #{name}! Selamat datang di Arab Koding! 🚀"
end

names = ["Arding", "Arab Koding", "Ruby"]
names.each { |name| puts greet(name) }

# Blocks & Iterators
puts "\\nKuadrat 1-5:"
(1..5).map { |n| n ** 2 }.each { |n| print "#{n} " }
puts

# Hash
lang = { name: "Ruby", year: 1995, creator: "Matz" }
puts "\\nBahasa:"
lang.each { |k, v| puts "  #{k}: #{v}" }

# String methods
str = "arab koding"
puts "\\n#{str.capitalize.split.map(&:capitalize).join(' ')}"
`,
  },
  kotlin: {
    label: "Kotlin", pistonLang: "kotlin", version: "1.8.20",
    monacoLang: "kotlin", icon: "🎯", color: "#7F52FF",
    template: `// 🎯 Kotlin — Arab Koding
fun greet(name: String) = "Halo, $name! Selamat datang di Arab Koding! 🚀"

data class Language(val name: String, val year: Int, val creator: String)

fun main() {
    listOf("Arding", "Arab Koding", "Kotlin")
        .forEach { println(greet(it)) }

    val languages = listOf(
        Language("Kotlin",     2011, "JetBrains"),
        Language("Swift",      2014, "Apple"),
        Language("TypeScript", 2012, "Microsoft"),
    )

    println("\\nBahasa Modern:")
    languages.forEach { println("  ${it.name} (${it.year}) by ${it.creator}") }

    // Null safety
    val nullable: String? = null
    println("\\nNull safe: \${nullable?.length ?: "null"}")

    // When expression
    val score = 85
    val grade = when {
        score >= 90 -> "A"
        score >= 80 -> "B"
        score >= 70 -> "C"
        else -> "D"
    }
    println("Score $score = Grade $grade")
}
`,
  },
  swift: {
    label: "Swift", pistonLang: "swift", version: "5.8.1",
    monacoLang: "swift", icon: "🍎", color: "#FA7343",
    template: `// 🍎 Swift — Arab Koding
import Foundation

func greet(_ name: String) -> String {
    "Halo, \\(name)! Selamat datang di Arab Koding! 🚀"
}

struct Language {
    let name: String
    let year: Int
    let creator: String
}

let names = ["Arding", "Arab Koding", "Swift"]
names.forEach { print(greet($0)) }

let langs = [
    Language(name: "Swift",  year: 2014, creator: "Apple"),
    Language(name: "Kotlin", year: 2011, creator: "JetBrains"),
]

print("\\nBahasa Modern:")
langs.forEach { print("  \\($0.name) (\\($0.year)) by \\($0.creator)") }

// Optional chaining
let optional: String? = "Arab Koding"
print("\\nOptional: \\(optional?.uppercased() ?? "nil")")
`,
  },
  bash: {
    label: "Bash", pistonLang: "bash", version: "5.2.0",
    monacoLang: "shell", icon: "💻", color: "#4EAA25",
    template: `#!/bin/bash
# 💻 Bash — Arab Koding

greet() {
    echo "Halo, $1! Selamat datang di Arab Koding! 🚀"
}

names=("Arding" "Arab Koding" "Bash")
for name in "\${names[@]}"; do
    greet "$name"
done

echo ""
echo "=== System Info ==="
echo "OS: $(uname -s)"
echo "Kernel: $(uname -r)"
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "=== Loop Demo ==="
for i in $(seq 1 5); do
    echo "  Angka: $i — Kuadrat: $((i * i))"
done

echo ""
echo "=== String Ops ==="
str="Arab Koding"
echo "Original:  $str"
echo "Uppercase: \${str^^}"
echo "Length:    \${#str}"
`,
  },
  lua: {
    label: "Lua", pistonLang: "lua", version: "5.4.4",
    monacoLang: "lua", icon: "🌙", color: "#2C2D72",
    template: `-- 🌙 Lua — Arab Koding
function greet(name)
    return string.format("Halo, %s! Selamat datang di Arab Koding! 🚀", name)
end

local names = {"Arding", "Arab Koding", "Lua"}
for _, name in ipairs(names) do
    print(greet(name))
end

-- Tables (Lua's main data structure)
local lang = {
    name = "Lua",
    year = 1993,
    creator = "PUC-Rio",
    features = {"lightweight", "embeddable", "fast"}
}

print("\\nBahasa: " .. lang.name)
print("Tahun: " .. lang.year)
print("Fitur: " .. table.concat(lang.features, ", "))

-- Closures
function counter(start)
    local count = start or 0
    return function()
        count = count + 1
        return count
    end
end

local c = counter(0)
print("\\nCounter:", c(), c(), c(), c(), c())
`,
  },
  r: {
    label: "R", pistonLang: "r", version: "4.1.1",
    monacoLang: "r", icon: "📊", color: "#276DC3",
    template: `# 📊 R — Arab Koding
greet <- function(name) {
  paste0("Halo, ", name, "! Selamat datang di Arab Koding! 🚀")
}

names <- c("Arding", "Arab Koding", "R")
sapply(names, function(n) cat(greet(n), "\\n"))

# Vectors & Statistics
data <- c(23, 45, 12, 67, 34, 89, 11, 56, 78, 90)
cat("\\n=== Statistik ===\\n")
cat("Mean:   ", mean(data), "\\n")
cat("Median: ", median(data), "\\n")
cat("SD:     ", round(sd(data), 2), "\\n")
cat("Min:    ", min(data), "\\n")
cat("Max:    ", max(data), "\\n")

# Data frame
df <- data.frame(
  lang    = c("Python", "R", "Julia"),
  year    = c(1991, 1993, 2012),
  purpose = c("General", "Stats", "Science")
)
print(df)
`,
  },
};

const LANG_KEYS = Object.keys(LANGUAGES);

/* ── Piston API runner ── */
async function runCode(lang: string, code: string, stdin = ""): Promise<string> {
  const cfg = LANGUAGES[lang];
  if (!cfg) return "Language not supported";
  try {
    const res = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: cfg.pistonLang,
        version:  cfg.version,
        files: [{ name: "main", content: code }],
        stdin,
      }),
    });
    const data = await res.json();
    const stdout = data?.run?.stdout || "";
    const stderr = data?.run?.stderr || "";
    const msg    = data?.message  || "";
    if (msg)    return `❌ Error: ${msg}`;
    if (stderr) return stdout ? `${stdout}\n⚠️ Stderr:\n${stderr}` : `⚠️ ${stderr}`;
    return stdout || "✅ Program selesai (no output)";
  } catch (e) {
    return `❌ Gagal terhubung ke server. Cek koneksi internet.\n${e}`;
  }
}

/* ── Main Component ── */
export default function PlaygroundPage() {
  const [lang,      setLang]      = useState("python");
  const [code,      setCode]      = useState(LANGUAGES["python"].template);
  const [output,    setOutput]    = useState("");
  const [running,   setRunning]   = useState(false);
  const [stdin,     setStdin]     = useState("");
  const [copied,    setCopied]    = useState(false);
  const [showLangs, setShowLangs] = useState(false);
  const [execTime,  setExecTime]  = useState<number | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Ctrl+Enter shortcut untuk menjalankan kode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRun]);

  const selectLang = (key: string) => {
    setLang(key);
    setCode(LANGUAGES[key].template);
    setOutput("");
    setExecTime(null);
    setShowLangs(false);
  };

  const handleRun = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setOutput("⏳ Menjalankan kode...\n");
    const start = Date.now();
    const result = await runCode(lang, code, stdin);
    const ms = Date.now() - start;
    setExecTime(ms);
    setOutput(result);
    setRunning(false);
    setTimeout(() => outputRef.current?.scrollTo(0, 99999), 50);
  }, [running, lang, code, stdin]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Kode disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const cfg  = LANGUAGES[lang];
    const exts: Record<string, string> = {
      python: "py", javascript: "js", typescript: "ts", java: "java",
      cpp: "cpp", c: "c", rust: "rs", go: "go", php: "php",
      ruby: "rb", kotlin: "kt", swift: "swift", bash: "sh", lua: "lua", r: "r",
    };
    const ext  = exts[lang] || "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `arab-koding.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`File arab-koding.${ext} diunduh!`);
  };

  const cfg = LANGUAGES[lang];

  return (
    <div className="pt-16 min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col h-[calc(100vh-64px)]">
        {/* ── Top bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(0,255,136,0.1)] bg-[rgba(2,2,6,0.8)] backdrop-blur-xl flex-wrap"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-neon-green" style={{ color: "var(--neon)" }} />
            </div>
            <span className="font-display font-bold text-sm text-white hidden sm:block">Code Runner</span>
          </div>

          <div className="w-px h-5 bg-white/10" />

          {/* Language picker */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowLangs(!showLangs)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.05)] text-sm font-medium text-white hover:border-[rgba(0,255,136,0.4)] transition-all"
            >
              <span className="text-base">{cfg.icon}</span>
              <span style={{ color: cfg.color }} className="font-mono font-bold">{cfg.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${showLangs ? "rotate-180" : ""}`} />
            </motion.button>

            <AnimatePresence>
              {showLangs && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 w-64 glass border border-[rgba(0,255,136,0.15)] rounded-xl overflow-hidden z-50 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                >
                  <div className="p-2 max-h-80 overflow-y-auto custom-scroll">
                    {LANG_KEYS.map((key) => {
                      const l = LANGUAGES[key];
                      return (
                        <button key={key} onClick={() => selectLang(key)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
                            lang === key
                              ? "bg-[rgba(0,255,136,0.1)] text-white"
                              : "text-gray-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className="text-base">{l.icon}</span>
                          <span className="font-medium">{l.label}</span>
                          {lang === key && <Check className="w-3.5 h-3.5 ml-auto" style={{ color: "var(--neon)" }} />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-xs font-medium transition-all hover:border-white/25"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Salin</span>
            </motion.button>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-xs font-medium transition-all hover:border-white/25"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unduh</span>
            </motion.button>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => { setCode(cfg.template); setOutput(""); setExecTime(null); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-xs font-medium transition-all hover:border-white/25"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRun}
              disabled={running}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                running
                  ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                  : "btn-neon"
              }`}
              style={!running ? { borderColor: "var(--neon)", color: "var(--neon)" } : {}}
            >
              {running
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Running...</>
                : <><Play className="w-4 h-4" /> Jalankan</>
              }
            </motion.button>
          </div>
        </motion.div>

        {/* ── Main Editor + Output ── */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Editor panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex flex-col overflow-hidden border-r border-[rgba(0,255,136,0.08)]"
          >
            {/* Editor header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[rgba(3,3,8,0.9)] border-b border-[rgba(0,255,136,0.08)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <span className="text-gray-600 text-xs font-mono ml-1">
                main.{lang === "javascript" ? "js" : lang === "typescript" ? "ts" : lang === "cpp" ? "cpp" : lang === "python" ? "py" : lang}
              </span>
              <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--neon)" }} />
                <span style={{ color: "var(--neon)", opacity: 0.7 }}>Live Editor</span>
              </div>
            </div>

            {/* Monaco */}
            <div className="flex-1 overflow-hidden monaco-container">
              <MonacoEditor
                height="100%"
                language={cfg.monacoLang}
                value={code}
                onChange={(v) => setCode(v || "")}
                theme="vs-dark"
                options={{
                  fontSize:            14,
                  fontFamily:          "'JetBrains Mono', monospace",
                  fontLigatures:       true,
                  minimap:             { enabled: false },
                  scrollBeyondLastLine: false,
                  padding:             { top: 16, bottom: 16 },
                  lineNumbers:         "on",
                  renderLineHighlight: "all",
                  bracketPairColorization: { enabled: true },
                  smoothScrolling:     true,
                  cursorBlinking:      "phase",
                  cursorSmoothCaretAnimation: "on",
                  wordWrap:            "on",
                  tabSize:             4,
                  automaticLayout:     true,
                }}
              />
            </div>
          </motion.div>

          {/* Right panel: stdin + output */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col w-full lg:w-[42%] overflow-hidden"
          >
            {/* Stdin */}
            <div className="border-b border-[rgba(0,255,136,0.08)]">
              <div className="flex items-center gap-2 px-4 py-2 bg-[rgba(3,3,8,0.9)]">
                <Code2 className="w-3.5 h-3.5" style={{ color: "var(--cyan)" }} />
                <span className="text-xs font-mono text-gray-500">stdin (input)</span>
              </div>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Masukkan input disini (opsional)..."
                className="w-full h-20 px-4 py-3 bg-[#030308] text-gray-300 text-xs font-mono resize-none focus:outline-none placeholder-gray-700 border-0"
              />
            </div>

            {/* Output */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-[rgba(3,3,8,0.9)] border-b border-[rgba(0,255,136,0.08)]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" style={{ color: "var(--neon)" }} />
                  <span className="text-xs font-mono" style={{ color: "var(--neon)", opacity: 0.8 }}>output</span>
                  {execTime !== null && (
                    <span className="text-[10px] font-mono text-gray-600 ml-2">
                      ⏱ {execTime}ms
                    </span>
                  )}
                </div>
                {output && (
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => { setOutput(""); setExecTime(null); }}
                    className="text-gray-600 hover:text-gray-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </div>

              <div
                ref={outputRef}
                className="flex-1 overflow-y-auto p-4 bg-[#030308] font-mono text-xs leading-relaxed custom-scroll"
              >
                {!output && !running ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-700">
                    <motion.div
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play className="w-10 h-10" />
                    </motion.div>
                    <span className="text-sm">Tekan <span style={{ color: "var(--neon)" }}>Jalankan</span> untuk melihat output</span>
                  </div>
                ) : running ? (
                  <div className="flex items-center gap-3" style={{ color: "var(--neon)" }}>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menjalankan {cfg.label}...</span>
                  </div>
                ) : (
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap break-words"
                    style={{
                      color: output.startsWith("❌") ? "#ff4444"
                           : output.startsWith("⚠️") ? "#f59e0b"
                           : "#c8d6e5",
                    }}
                  >
                    {output}
                  </motion.pre>
                )}
              </div>

              {/* Run shortcut hint */}
              <div className="px-4 py-2 border-t border-[rgba(0,255,136,0.06)] bg-[rgba(3,3,8,0.8)]">
                <p className="text-[10px] text-gray-700 font-mono">
                  Klik tombol <span style={{ color: "var(--neon)" }}>Jalankan</span> atau gunakan Ctrl+Enter untuk run
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t border-[rgba(0,255,136,0.08)] bg-[rgba(2,2,6,0.95)] text-[10px] font-mono text-gray-600">
          <div className="flex items-center gap-4">
            <span style={{ color: cfg.color }}>{cfg.icon} {cfg.label}</span>
            <span>v{cfg.version}</span>
            <span className="hidden sm:inline">Piston API</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{code.split("\n").length} baris</span>
            <span>{code.length} karakter</span>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-1"
              style={{ color: "var(--neon)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--neon)" }} />
              Arab Koding IDE
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
