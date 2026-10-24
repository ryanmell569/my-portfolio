// src/components/TechStack.jsx
import React from 'react';

/* ── Tech items with devicon SVG URLs ── */
const row1 = [
  { name: 'Flutter',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'React',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'HTML5',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'JavaScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'CSS3',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
];

const row2 = [
  { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PHP',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Laravel',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'Bootstrap',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'VS Code',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
];

function TechCard({ tech, isDark = true }) {
  const cardCls = isDark
    ? 'bg-[#070b12]/80 backdrop-blur-xl border-white/[0.07] hover:border-white/20 hover:bg-white/[0.04]'
    : 'bg-white border-amber-100 hover:border-amber-300 hover:bg-amber-50 shadow-sm';
  const textCls = isDark ? 'text-slate-200' : 'text-stone-700';

  return (
    <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border text-white shadow-lg hover:scale-105 transition-all duration-300 shrink-0 select-none cursor-default ${cardCls}`}>
      <img
        src={tech.icon}
        alt={tech.name}
        width={22}
        height={22}
        loading="lazy"
        draggable={false}
        className="w-[22px] h-[22px] object-contain"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <span className={`text-sm font-semibold tracking-wide whitespace-nowrap ${textCls}`}>{tech.name}</span>
    </div>
  );
}

export default function TechStack({ isDark = true }) {
  const badgeBg  = isDark ? 'bg-cyan-950/50 border-cyan-800/50 text-cyan-300' : 'bg-indigo-50 border-indigo-200 text-indigo-600';
  const gradFrom = isDark ? 'from-cyan-400 via-teal-300 to-indigo-400' : 'from-amber-500 via-rose-500 to-indigo-600';
  const subText  = isDark ? 'text-slate-400' : 'text-stone-500';
  const edgeFade = isDark ? 'from-[#04060a]' : 'from-[#fdf8f0]';

  /* quadruple for seamless loop */
  const r1 = [...row1, ...row1, ...row1, ...row1];
  const r2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section className="py-20 w-full overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-8 md:px-0 mb-10 max-w-7xl mx-auto">
        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-5 ${badgeBg}`}>
          <i className="fas fa-wrench text-[10px]" /> Expertise
        </span>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
          Tools &amp; technologies I{' '}
          <span className={`bg-gradient-to-r ${gradFrom} bg-clip-text text-transparent`}>
            work with.
          </span>
        </h2>
        <p className={`text-sm sm:text-base mt-3 max-w-xl ${subText}`}>
          A curated stack spanning front-end, back-end, databases, and modern tooling.
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative w-full overflow-hidden mb-4 py-1">
        {/* Edge fade masks */}
        <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r ${edgeFade} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l ${edgeFade} to-transparent z-10 pointer-events-none`} />
        <div className="tech-track-left flex gap-4 py-1">
          {r1.map((tech, i) => <TechCard key={`r1-${i}`} tech={tech} isDark={isDark} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative w-full overflow-hidden py-1">
        <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r ${edgeFade} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l ${edgeFade} to-transparent z-10 pointer-events-none`} />
        <div className="tech-track-right flex gap-4 py-1">
          {r2.map((tech, i) => <TechCard key={`r2-${i}`} tech={tech} isDark={isDark} />)}
        </div>
      </div>
    </section>
  );
}
