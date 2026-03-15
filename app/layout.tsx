import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Belajar Pemrograman Bersama Arding | Arab Koding",
  description: "Platform belajar pemrograman 105+ bahasa dengan game quiz interaktif, sistem koin, dan animasi premium.",
  keywords: "belajar pemrograman, coding, programming, arab koding, arding",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-[#050510] antialiased overflow-x-hidden">
        <div className="relative z-10">
          <Navbar />
          <main className="relative">{children}</main>

          <footer className="relative z-10 border-t border-gold-500/10 mt-10 py-8 text-center">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex flex-col items-center gap-3">
                <div className="text-xl font-display font-bold text-gold-gradient">Arab Koding</div>
                <p className="text-gray-600 text-sm font-arabic">بَرْمَجَةٌ مَعَ أَرْدِينْغ</p>
                <p className="text-gray-700 text-xs">© 2024 Belajar Pemrograman Bersama Arding. Dibuat dengan ❤️ untuk programmer Indonesia.</p>
              </div>
            </div>
          </footer>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111128",
              color: "#e2e8f0",
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: "12px",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}
