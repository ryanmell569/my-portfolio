// src/components/TechStack.jsx
import React from 'react';

export default function TechStack() {
  const row1 = [
    { name: "Flutter", icon: "📱" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "TS" },
    { name: "Tailwind CSS", icon: "🌊" },
    { name: "HTML", icon: "🌐" },
    { name: "JavaScript", icon: "💛" },
    { name: "CSS", icon: "🎨" },
  ];

  const row2 = [
    { name: "Node.js", icon: "🟢" },
    { name: "PHP", icon: "🐘" },
    { name: "Laravel", icon: "🔴" },
    { name: "Bootstrap", icon: "💜" },
    { name: "Blackbox AI", icon: "🤖" },
    { name: "Claude", icon: "✨" },
    { name: "Gemini", icon: "💎" },
  ];

  return (
    <section id="skills" className="py-20 pointer-events-auto overflow-hidden select-none w-full">
      <div className="w-full px-6 md:px-16 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 mb-4">
          <span className="text-emerald-300 font-semibold tracking-wider text-xs uppercase">Expertise</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Tools & technologies I <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">work with.</span>
        </h3>
      </div>

      {/* Row 1: Marquee Track */}
      <div className="relative w-full overflow-hidden flex mb-4">
        <div className="tech-track-left flex gap-4 py-2 whitespace-nowrap">
          {[...row1, ...row1, ...row1, ...row1].map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 text-white shadow-lg hover:border-emerald-500/50 hover:scale-105 transition-all duration-300 shrink-0"
            >
              <span className="text-base">{tech.icon}</span>
              <span className="text-sm font-semibold tracking-wide text-slate-200">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Marquee Track */}
      <div className="relative w-full overflow-hidden flex">
        <div className="tech-track-right flex gap-4 py-2 whitespace-nowrap">
          {[...row2, ...row2, ...row2, ...row2].map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 text-white shadow-lg hover:border-emerald-500/50 hover:scale-105 transition-all duration-300 shrink-0"
            >
              <span className="text-base">{tech.icon}</span>
              <span className="text-sm font-semibold tracking-wide text-slate-200">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}