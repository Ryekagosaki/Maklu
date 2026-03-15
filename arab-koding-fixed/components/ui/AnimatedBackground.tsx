"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

/* ── Matrix rain canvas ── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols   = Math.floor(canvas.width / 18);
    const drops  = Array.from({ length: cols }, () => Math.random() * -100);
    const chars  = "01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\;:";

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.fillStyle = "rgba(2,2,6,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char  = chars[Math.floor(Math.random() * chars.length)];
        const x     = i * 18;
        const y     = drops[i] * 18;

        // Head char bright
        ctx.fillStyle = "#00ff88";
        ctx.font      = "bold 13px JetBrains Mono, monospace";
        ctx.shadowColor = "#00ff88";
        ctx.shadowBlur  = 6;
        ctx.fillText(char, x, y);

        // Trailing chars dimmer
        ctx.fillStyle = "rgba(0,255,136,0.25)";
        ctx.shadowBlur = 0;
        ctx.font       = "12px JetBrains Mono, monospace";
        for (let t = 1; t < 6; t++) {
          const tc = chars[Math.floor(Math.random() * chars.length)];
          const alpha = (0.25 * (6 - t)) / 6;
          ctx.fillStyle = `rgba(0,255,136,${alpha})`;
          ctx.fillText(tc, x, y - t * 18);
        }

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4;
      }
    };

    const interval = setInterval(draw, 50);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
    />
  );
}

/* ── Neural network nodes ── */
function NeuralNet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const nodes = Array.from({ length: 45 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,255,136,${alpha})`;
            ctx.lineWidth   = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle   = "rgba(0,255,136,0.6)";
        ctx.shadowColor = "#00ff88";
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.shadowBlur  = 0;

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }
    };

    const anim = setInterval(draw, 30);
    return () => clearInterval(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
}

/* ── Floating particles ── */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x:        Math.random() * 100,
  y:        Math.random() * 100,
  size:     Math.random() * 3 + 1,
  duration: Math.random() * 18 + 10,
  delay:    Math.random() * 6,
  color:    i % 3 === 0 ? "#00ff88" : i % 3 === 1 ? "#00d4ff" : "#bf00ff",
  opacity:  Math.random() * 0.5 + 0.15,
}));

/* ── Code snippets ── */
const SNIPPETS = [
  { text: "const x = () => {}", x: 6, y: 14 },
  { text: "def hello():",       x: 76, y: 22 },
  { text: "fn main() {}",       x: 14, y: 68 },
  { text: "SELECT * FROM",      x: 78, y: 60 },
  { text: "import React",       x: 4, y: 42 },
  { text: "console.log(42)",    x: 84, y: 38 },
  { text: "print('Arab')",      x: 58, y: 83 },
  { text: "class Main {}",      x: 28, y: 8  },
  { text: "go func() {}",       x: 50, y: 92 },
  { text: "use std::io;",       x: 90, y: 78 },
];

/* ── Main export ── */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,#0a1a0a_0%,#020206_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_85%,#0a0a1a_0%,transparent_55%)]" />

      {/* Cyber grid */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Matrix rain */}
      <MatrixRain />

      {/* Neural network */}
      <NeuralNet />

      {/* Moving orbs */}
      {[
        { x: -5, y: -5,  w: 55, color: "rgba(0,255,136,0.07)", dur: 22 },
        { x: 80, y: 15,  w: 40, color: "rgba(0,212,255,0.05)", dur: 28 },
        { x: 10, y: 75,  w: 45, color: "rgba(191,0,255,0.04)", dur: 18 },
        { x: 60, y: 60,  w: 35, color: "rgba(0,255,136,0.05)", dur: 32 },
        { x: 40, y: 30,  w: 25, color: "rgba(255,0,128,0.04)", dur: 25 },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}vw`, height: `${o.w}vw`, background: o.color, filter: "blur(70px)" }}
          animate={{ x: [0, 80, -50, 0], y: [0, -60, 70, 0], scale: [1, 1.3, 0.8, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", delay: i * 3 }}
        />
      ))}

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, opacity: p.opacity }}
          animate={{ y: [0, -140, 0], x: [0, Math.sin(p.id) * 50, 0], opacity: [p.opacity, p.opacity * 2.5, 0, p.opacity], scale: [1, 1.8, 0.3, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {/* Floating code snippets */}
      {SNIPPETS.map((s, i) => (
        <motion.div key={i}
          className="absolute text-[10px] font-mono select-none whitespace-nowrap"
          style={{ left: `${s.x}%`, top: `${s.y}%`, color: "rgba(0,255,136,0.18)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.2, 0.4, 0], y: [0, -40, -80], x: [0, 12, -8] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: i * 1.3 }}
        >
          {s.text}
        </motion.div>
      ))}

      {/* Rotating rings */}
      <motion.div className="absolute top-16 right-12 w-36 h-36 border border-[rgba(0,255,136,0.08)] rounded-full"
        animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute top-16 right-12 w-22 h-22 border border-[rgba(0,212,255,0.06)] rounded-full"
        animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute bottom-28 left-10 w-28 h-28 border border-[rgba(191,0,255,0.06)] rounded-full"
        animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />

      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(0,255,136,0.04)]"
          animate={{ width: ["0vw","80vw"], height: ["0vw","80vw"], opacity: [0.4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeOut", delay: i * 2 }}
        />
      ))}

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,255,136,0.15)] to-transparent"
        animate={{ top: ["0%","100%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      {/* Vertical scan line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(0,212,255,0.1)] to-transparent"
        animate={{ left: ["0%","100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Corner decorations */}
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((pos, i) => (
        <motion.div key={i}
          className={`absolute ${pos} w-10 h-10 border-[rgba(0,255,136,0.3)]`}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </div>
  );
}
