// src/components/UIOverlay.jsx
import React, { useState, useEffect, useRef } from 'react';
import TechStack from './TechStack';
import ryanImage from '../assets/ryan.jpg';

/* ─────────────────────────────────────────────
   Fade-up on scroll
───────────────────────────────────────────── */
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-visible'); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = '' }) {
  const ref = useFadeUp();
  return <div ref={ref} className={`fade-up ${className}`}>{children}</div>;
}

export default function UIOverlay() {
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [formStatus,     setFormStatus]     = useState(null);
  const [formData,       setFormData]       = useState({ name: '', email: '', message: '' });
  const [showScrollTop,  setShowScrollTop]  = useState(false);
  const [theme,          setTheme]          = useState('dark');   // 'dark' | 'light'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled,       setScrolled]       = useState(false);

  const isDark  = theme === 'dark';
  const isLight = theme === 'light';

  /* ── scroll listeners ── */
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── helpers ── */
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    try {
      const res = await fetch('https://formspree.io/f/xkoaaglj', {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setFormStatus({ type: 'success', text: "Message sent! I'll get back to you soon." });
        setFormData({ name: '', email: '', message: '' });
      } else throw new Error();
    } catch {
      setFormStatus({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(null), 6000);
    }
  };

  /* ── nav links ── */
  const navLinks = [
    { label: 'Home',     id: 'hero' },
    { label: 'About',    id: 'about' },
    { label: 'Toolkit',  id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact',  id: 'contact' },
  ];

  /* ── floating badges (fixed dark bg so they always look sharp) ── */
  const floatBadges = [
    { icon: 'fab fa-php',      label: 'PHP',     color: 'text-cyan-500',   border: 'border-cyan-500/40',    pos: 'absolute -top-5 -left-4 sm:-top-7 sm:-left-8',   anim: 'animate-float-slow' },
    { icon: 'fab fa-laravel',  label: 'Laravel', color: 'text-red-400',    border: 'border-red-500/40',     pos: 'absolute -top-3 -right-4 sm:-top-5 sm:-right-8', anim: 'animate-float-fast' },
    { icon: 'fab fa-js',       label: 'JS',      color: 'text-yellow-400', border: 'border-yellow-500/40',  pos: 'absolute top-1/4 -left-5 sm:-left-10',           anim: 'animate-float-fast' },
    { icon: 'fab fa-react',    label: 'React',   color: 'text-sky-400',    border: 'border-sky-400/40',     pos: 'absolute top-[62%] -left-5 sm:-left-10',         anim: 'animate-float-slow', spin: true },
    { icon: 'fas fa-database', label: 'MySQL',   color: 'text-blue-400',   border: 'border-blue-500/40',    pos: 'absolute top-1/2 -right-5 sm:-right-10',         anim: 'animate-float-slow' },
  ];

  /* ── projects ── */
  const projects = [
    {
      icon: 'fas fa-cash-register', iconColor: 'text-cyan-500',
      glow: 'from-cyan-500/10', title: 'Point of Sales',
      desc: 'Streamlines sales transactions, manages inventory stock, tracks checkouts, and produces instant performance reports.',
      tag: 'PHP / MySQL',
    },
    {
      icon: 'fas fa-book-open', iconColor: 'text-teal-500',
      glow: 'from-teal-500/10', title: 'Library System',
      desc: 'Digital cataloging platform for archiving books, managing active borrowings, and tracking member records.',
      tag: 'Database Management',
    },
    {
      icon: 'fas fa-shirt', iconColor: 'text-indigo-400',
      glow: 'from-indigo-500/10', title: 'Clothing Ordering',
      desc: 'Apparel e-commerce interface with customized selections, interactive shopping carts, and full order workflows.',
      tag: 'Full-Stack Web App',
    },
  ];

  /* ── contact info ── */
  const contactInfo = [
    { icon: 'fas fa-envelope',      label: 'Direct Email', value: 'mellomidajeanryan@gmail.com' },
    { icon: 'fas fa-map-marker-alt',label: 'Location',     value: 'Makilala, Cotabato, Philippines' },
    { icon: 'fas fa-circle-check',  label: 'Availability', value: 'Open for Remote Work' },
  ];

  const socials = [
    { icon: 'fab fa-github',      href: 'https://github.com',   title: 'GitHub' },
    { icon: 'fab fa-linkedin-in', href: 'https://linkedin.com', title: 'LinkedIn' },
    { icon: 'fab fa-facebook-f',  href: 'https://facebook.com', title: 'Facebook' },
  ];

  /* ════════════════════════════════════════
     THEME-AWARE CLASS TOKENS
     dark  = deep navy/black, cyan accent
     light = warm morning — amber + indigo split-complementary
             bg: cream #fdf8f0, accent: amber-600, badge: indigo-600
  ════════════════════════════════════════ */

  // Root
  const rootBg   = isDark ? 'bg-[#04060a]'   : 'bg-[#fdf8f0]';
  const rootText = isDark ? 'text-slate-100' : 'text-stone-900';

  // Header
  const headerScrolled = isDark
    ? 'bg-[#04060a]/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.7)]'
    : 'bg-[#fdf8f0]/95 backdrop-blur-2xl border-b border-amber-200/60 shadow-[0_4px_24px_rgba(180,83,9,0.06)]';

  // Logo
  const logoGradient = isDark
    ? 'from-white via-slate-300 to-cyan-400'
    : 'from-stone-900 via-amber-700 to-indigo-600';
  const dotClass = isDark ? 'bg-cyan-400 glow-dot-cyan' : 'bg-amber-500';

  // Nav links
  const navLinkCls = isDark
    ? 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
    : 'text-stone-500 hover:text-stone-900 hover:bg-amber-50';
  const navUnderline = isDark ? 'bg-cyan-400' : 'bg-amber-500';

  // Toggle button
  const toggleCls = isDark
    ? 'border-white/10 bg-white/[0.04] text-cyan-300 hover:bg-cyan-950/50 hover:border-cyan-800/60'
    : 'border-amber-200 bg-white text-amber-600 hover:bg-amber-50 hover:border-amber-400 shadow-sm';

  // Hamburger
  const hamburgerCls = isDark
    ? 'border-white/10 bg-white/[0.04] text-cyan-300 hover:bg-cyan-950/50'
    : 'border-amber-200 bg-white text-stone-500 hover:bg-amber-50 shadow-sm';

  // Mobile drawer
  const drawerCls = isDark
    ? 'border-white/[0.06] bg-[#04060a]/98'
    : 'border-amber-200/60 bg-[#fdf8f0]/98';
  const drawerLinkCls = isDark
    ? 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
    : 'text-stone-500 hover:text-stone-900 hover:bg-amber-50';

  // Primary CTA button — amber warm
  const accentBtn = isDark
    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.65)]'
    : 'bg-amber-500 hover:bg-amber-400 text-white font-bold shadow-[0_4px_16px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_24px_rgba(245,158,11,0.55)]';

  // Ghost button — indigo complement
  const ghostBtn = isDark
    ? 'border border-white/10 hover:border-cyan-700/60 bg-white/[0.03] hover:bg-cyan-950/30 text-slate-300 hover:text-white'
    : 'border border-stone-300 hover:border-indigo-400 bg-white hover:bg-indigo-50 text-stone-600 hover:text-indigo-700 shadow-sm';

  // Section badges — indigo (split-complement to amber)
  const sectionBadge = isDark
    ? 'inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-5'
    : 'inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-semibold tracking-widest uppercase mb-5';

  // Stat numbers — amber
  const statNum = isDark ? 'text-cyan-400'  : 'text-amber-600';
  const statLbl = isDark ? 'text-slate-500' : 'text-stone-400';

  // Hero status badge — amber tint
  const heroBadge = isDark
    ? 'bg-cyan-950/40 border-cyan-800/50 text-cyan-300'
    : 'bg-amber-50 border-amber-300 text-amber-700';
  const heroBadgeDot = isDark ? 'bg-cyan-400 glow-dot-cyan' : 'bg-amber-500';

  // Hero headline gradient — amber→rose→indigo (warm sunrise arc)
  const headlineGradient = isDark
    ? 'from-cyan-400 via-teal-300 to-indigo-400'
    : 'from-amber-500 via-rose-500 to-indigo-600';

  // Subtext
  const subText = isDark ? 'text-slate-400' : 'text-stone-500';

  // Cards
  const card = isDark
    ? 'bg-[#070b12]/80 backdrop-blur-2xl border border-white/[0.06] rounded-3xl shadow-2xl transition-all duration-500'
    : 'bg-white border border-amber-100 rounded-3xl shadow-[0_2px_28px_rgba(180,83,9,0.07)] transition-all duration-500';

  // Sub-card
  const subCard = isDark
    ? 'bg-white/[0.02] border-white/[0.06]'
    : 'bg-amber-50/60 border-amber-100';

  // Headings
  const sectionHeading = isDark ? 'text-white'      : 'text-stone-900';

  // Body text
  const bodyText = isDark ? 'text-slate-400' : 'text-stone-500';

  // Accent label (year, small caps)
  const accentLabel = isDark ? 'text-cyan-400' : 'text-amber-600';

  // Check icon
  const checkIcon = isDark ? 'text-cyan-500' : 'text-indigo-500';

  // Tech pills — indigo
  const pill = isDark
    ? 'px-3.5 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-900/50 text-cyan-300 text-xs font-semibold'
    : 'px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold';

  // Location icon box
  const locationBox = isDark
    ? 'bg-cyan-950/60 border border-cyan-900/50 text-cyan-400'
    : 'bg-amber-50 border border-amber-200 text-amber-600';

  // Divider
  const divider = isDark ? 'border-white/[0.06]' : 'border-amber-100';

  // Project cards
  const projectCard = isDark
    ? 'border-white/[0.06] bg-[#070b12]/70 backdrop-blur-xl'
    : 'border-amber-100 bg-white shadow-sm';
  const projectCardHover = isDark
    ? 'hover:border-white/[0.14] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]'
    : 'hover:border-amber-300 hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)]';
  const projectIconBox = isDark
    ? 'border-white/[0.05]'
    : 'border-amber-50';
  const projectTitle   = isDark ? 'text-white group-hover:text-cyan-400'   : 'text-stone-800 group-hover:text-amber-600';
  const projectDesc    = isDark ? 'text-slate-400' : 'text-stone-500';
  const projectTag     = isDark ? '' : '';
  const projectCodeBox = isDark
    ? 'bg-white/[0.04] border-white/[0.06] text-slate-400'
    : 'bg-amber-50 border-amber-100 text-stone-400';

  // Contact boxes
  const contactBox = isDark
    ? 'bg-white/[0.02] border-white/[0.06] hover:border-cyan-800/40'
    : 'bg-amber-50/50 border-amber-100 hover:border-amber-300';
  const contactIconBox  = isDark
    ? 'bg-cyan-950/60 border-cyan-900/50 text-cyan-400'
    : 'bg-amber-100 border-amber-200 text-amber-700';
  const contactLabelCls = isDark ? 'text-slate-500' : 'text-stone-400';
  const contactValueCls = isDark ? 'text-white'     : 'text-stone-800';

  // Socials
  const socialBtn = isDark
    ? 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-cyan-400 hover:border-cyan-700/50 hover:bg-cyan-950/30'
    : 'bg-white border-amber-200 text-stone-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 shadow-sm';

  // Form box
  const formBox = isDark
    ? 'bg-white/[0.02] border-white/[0.06]'
    : 'bg-amber-50/40 border-amber-100';

  // Input fields
  const inputCls = isDark
    ? 'w-full bg-[#070b12] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm'
    : 'w-full bg-white border border-amber-200 rounded-xl px-4 py-3.5 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200/70 transition-all text-sm shadow-sm';

  // Input label
  const labelCls = isDark
    ? 'text-[10px] font-bold uppercase tracking-widest text-slate-400'
    : 'text-[10px] font-bold uppercase tracking-widest text-stone-500';

  // Footer
  const footerCls = isDark
    ? 'border-white/[0.06] bg-[#04060a] text-slate-500'
    : 'border-amber-200/60 bg-[#fdf1e0] text-stone-400';

  // Scroll-to-top
  const scrollTopBtn = isDark
    ? 'bg-cyan-950/80 border-cyan-800/60 text-cyan-300 hover:bg-cyan-900/80 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_28px_rgba(6,182,212,0.5)]'
    : 'bg-white border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-500 shadow-[0_4px_16px_rgba(180,83,9,0.15)]';

  // Ambient glows — amber + rose + orange = sunrise sky
  const glow1      = isDark ? 'bg-cyan-500'   : 'bg-amber-400';
  const glow2      = isDark ? 'bg-indigo-600' : 'bg-rose-400';
  const glow3      = isDark ? 'bg-teal-600'   : 'bg-orange-300';
  const glowOpacity = isDark ? 'opacity-[0.07]' : 'opacity-[0.12]';

  return (
    <div className={`w-full min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-500 ${rootBg} ${rootText}`}>

      {/* ── Google Fonts + Font Awesome ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
      `}</style>

      {/* ── Full-page grid texture ── */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${isDark ? 'bg-grid' : ''}`} aria-hidden="true" />

      {/* ── Ambient radial glows ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className={`absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] ${glowOpacity} ${glow1}`} />
        <div className={`absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full blur-[140px] ${glowOpacity} ${glow2}`} />
        <div className={`absolute -bottom-40 right-1/3 w-[500px] h-[500px] rounded-full blur-[140px] ${glowOpacity} ${glow3}`} />
      </div>

      {/* ══════════════════════════════════════
          HEADER
      ══════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? headerScrolled : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-4 flex justify-between items-center">

          {/* Logo */}
          <button onClick={scrollToTop} className="flex items-center gap-3 focus:outline-none group cursor-pointer" aria-label="Scroll to top">
            <span className={`w-3 h-3 rounded-full shrink-0 transition-transform group-hover:scale-125 ${dotClass}`} />
            <span className={`text-base font-black tracking-[0.18em] uppercase bg-gradient-to-r bg-clip-text text-transparent ${logoGradient}`}>
              RYAN.DEV
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${navLinkCls}`}
              >
                {label}
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-4 transition-all duration-300 rounded-full ${navUnderline}`} />
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">

            {/* Dark / Light toggle */}
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all duration-300 border ${toggleCls}`}
            >
              <i className={isDark ? 'fas fa-sun' : 'fas fa-moon'} />
            </button>

            {/* Let's Talk — desktop only */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${accentBtn}`}
            >
              Let's Talk
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all duration-300 border ${hamburgerCls}`}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`} />
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className={`px-6 pt-2 pb-6 flex flex-col gap-1 border-t ${drawerCls}`}>
            {navLinks.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${drawerLinkCls}`}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${accentBtn}`}
            >
              Let's Talk
            </a>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-24 flex-grow">

        {/* ── HERO ── */}
        <section id="hero" className="w-full min-h-[calc(100vh-6rem)] flex items-center py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">

            {/* Left copy */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">

              {/* Status badge */}
              <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-semibold tracking-widest uppercase ${heroBadge}`}>
                <span className={`w-2 h-2 rounded-full ${heroBadgeDot}`} />
                BSIS Graduate &nbsp;·&nbsp; Makilala, Cotabato
              </div>

              {/* Headline */}
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black tracking-tight leading-[1.1] ${sectionHeading}`}>
                Hi, I'm{' '}
                <span className={`bg-gradient-to-r bg-clip-text text-transparent ${headlineGradient}`}>
                  Jean Ryan
                </span>
                <br />Mellomida.
              </h1>

              {/* Sub-copy */}
              <p className={`text-base sm:text-lg leading-relaxed max-w-xl ${subText}`}>
                An aspiring systems and web developer focused on architecting structured backends, clean interfaces, and full-stack solutions with modern PHP, Laravel, and JavaScript.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, 'projects')}
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${accentBtn}`}
                >
                  View Projects
                  <i className="fas fa-arrow-right text-xs" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${ghostBtn}`}
                >
                  Get in Touch
                </a>
              </div>

              {/* Stat strip */}
              <div className="flex flex-wrap gap-6 pt-4 justify-center lg:justify-start">
                {[
                  { num: '7+', label: 'Projects Built' },
                  { num: '4+', label: 'Years of Study' },
                  { num: '10+', label: 'Technologies' },
                ].map(({ num, label }) => (
                  <div key={label} className="flex flex-col items-center lg:items-start">
                    <span className={`text-2xl font-black ${statNum}`}>{num}</span>
                    <span className={`text-xs font-medium ${statLbl}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — profile card (always dark so photo renders well) */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative group w-64 h-80 sm:w-[300px] sm:h-[370px]">

                {/* Glow halo */}
                <div className="absolute -inset-3 rounded-[2.5rem] blur-2xl opacity-25 group-hover:opacity-50 transition-opacity duration-700 bg-gradient-to-tr from-cyan-600 via-teal-900 to-indigo-950" />

                {/* Floating badges */}
                {floatBadges.map(({ icon, label, color, border, pos, anim, spin }) => (
                  <div key={label} className={`${pos} z-30 ${anim} flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-[#0a0e17]/95 backdrop-blur-md ${border} border shadow-xl`}>
                    <i className={`${icon} ${color} text-sm ${spin ? 'animate-spin' : ''}`} style={spin ? { animationDuration: '8s' } : undefined} />
                    <span className="text-[11px] font-bold text-slate-200">{label}</span>
                  </div>
                ))}

                {/* Card */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden border bg-[#04060a]/90 border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.9)]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

                  <img
                    src={ryanImage}
                    alt="Jean Ryan W. Mellomida"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 relative z-10"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                    }}
                  />

                  {/* Name plate */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between px-3.5 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl border bg-[#070b12]/95 border-white/[0.08]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-cyan-400 glow-dot-cyan" />
                      <span className="text-xs font-semibold text-slate-200 truncate">Jean Ryan W. Mellomida</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-lg border shrink-0 ml-2 bg-cyan-950/80 border-cyan-800/60 text-cyan-300">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="w-full py-20">
          <FadeSection>
            <div className={`${card} p-8 sm:p-12 md:p-14`}>
              <span className={sectionBadge}><i className="fas fa-user-graduate text-[10px]" /> About Me</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight ${sectionHeading}`}>
                Education &amp; Core Background.
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 items-start">
                {/* Left */}
                <div className="lg:col-span-7 space-y-5">
                  <p className={`text-xs font-bold tracking-[0.2em] uppercase ${accentLabel}`}>
                    2025 – 2026 Academic Year
                  </p>
                  <h3 className={`text-xl sm:text-2xl font-bold ${sectionHeading}`}>
                    Bachelor of Science in Information Systems
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed ${bodyText}`}>
                    Graduated with a solid grounding in software development methodologies, systems analysis, and enterprise database administration. Academic projects emphasized solving real-world challenges through robust backend architectures and clean user flows.
                  </p>
                  <ul className="space-y-3 text-sm pt-1">
                    {[
                      'Specialized in relational database structures and server-side processing.',
                      'Experienced with collaborative version control and deployment practices.',
                      'Passionate about building modular, maintainable, and user-friendly systems.',
                    ].map((item) => (
                      <li key={item} className={`flex items-start gap-3 ${bodyText}`}>
                        <i className={`fas fa-circle-check mt-0.5 shrink-0 ${checkIcon}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right */}
                <div className={`lg:col-span-5 rounded-2xl border p-6 sm:p-8 space-y-7 ${subCard}`}>
                  <div>
                    <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-3 ${accentLabel}`}>
                      Primary Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['PHP', 'Laravel', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'].map((t) => (
                        <span key={t} className={pill}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-6 border-t ${divider} flex items-center gap-4`}>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${locationBox}`}>
                      <i className="fas fa-map-marker-alt" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${sectionHeading}`}>Makilala, Cotabato</p>
                      <p className={`text-xs mt-0.5 ${bodyText}`}>Philippines · Open for Remote Work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>
        </section>

        {/* ── TOOLKIT ── */}
        <section id="skills" className="w-full">
          <FadeSection>
            <TechStack isDark={isDark} />
          </FadeSection>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="w-full py-20">
          <FadeSection>
            <span className={sectionBadge}><i className="fas fa-folder-open text-[10px]" /> Portfolio</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-12 ${sectionHeading}`}>
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className={`group flex flex-col justify-between rounded-3xl border p-7 sm:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-default ${projectCard} ${projectCardHover}`}
                >
                  {/* Icon box */}
                  <div>
                    <div className={`h-36 sm:h-40 rounded-2xl bg-gradient-to-br ${p.glow} to-transparent border flex items-center justify-center mb-6 relative overflow-hidden ${projectIconBox}`}>
                      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${p.glow} via-transparent to-transparent opacity-60`} />
                      <i className={`${p.icon} ${p.iconColor} text-5xl relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                    </div>

                    <h3 className={`text-xl font-bold transition-colors duration-200 ${projectTitle}`}>
                      {p.title}
                    </h3>
                    <p className={`text-sm mt-3 leading-relaxed ${projectDesc}`}>{p.desc}</p>
                  </div>

                  {/* Footer */}
                  <div className={`mt-8 pt-4 border-t ${divider} flex items-center justify-between`}>
                    <span className={`text-xs font-semibold ${p.iconColor} ${projectTag}`}>{p.tag}</span>
                    <span className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs ${projectCodeBox}`}>
                      <i className="fas fa-code" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="w-full py-20 mb-16">
          <FadeSection>
            <div className={`${card} p-8 sm:p-12 md:p-14 relative overflow-hidden`}>
              {/* bg glows inside card */}
              <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-10 bg-cyan-500" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-10 bg-indigo-600" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">

                {/* Left info */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  <div>
                    <span className={sectionBadge}><i className="fas fa-paper-plane text-[10px]" /> Get In Touch</span>
                    <h2 className={`text-3xl sm:text-4xl font-black tracking-tight leading-tight ${sectionHeading}`}>
                      Let's build something{' '}
                      <span className={`bg-gradient-to-r bg-clip-text text-transparent ${headlineGradient}`}>
                        exceptional.
                      </span>
                    </h2>
                    <p className={`text-sm sm:text-base mt-4 leading-relaxed ${bodyText}`}>
                      Have a project in mind or want to talk tech? Drop a message or reach out through my socials below.
                    </p>
                  </div>

                  {/* Contact rows */}
                  <div className="space-y-3">
                    {contactInfo.map(({ icon, label, value }) => (
                      <div key={label} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${contactBox}`}>
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${contactIconBox}`}>
                          <i className={`${icon} text-sm`} />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-[10px] font-bold tracking-widest uppercase ${contactLabelCls}`}>{label}</p>
                          <p className={`text-sm font-medium mt-0.5 truncate ${contactValueCls}`}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Socials */}
                  <div className="flex items-center gap-3">
                    {socials.map(({ icon, href, title }) => (
                      <a
                        key={title}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        title={title}
                        aria-label={title}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 ${socialBtn}`}
                      >
                        <i className={`${icon} text-sm`} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right — form */}
                <div className={`lg:col-span-7 rounded-2xl border p-7 sm:p-9 ${formBox}`}>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className={labelCls}>Your Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className={inputCls} />
                      </div>
                      <div className="space-y-2">
                        <label className={labelCls}>Your Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className={inputCls} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={labelCls}>Your Message</label>
                      <textarea name="message" rows={5} value={formData.message} onChange={handleChange} required placeholder="Tell me about your project..." className={`${inputCls} resize-none`} />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${accentBtn}`}
                    >
                      {isSubmitting
                        ? <><i className="fas fa-spinner fa-spin" /><span>Sending…</span></>
                        : <><span>Send Message</span><i className="fas fa-paper-plane text-xs" /></>
                      }
                    </button>

                    {formStatus && (
                      <div className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${isDark
                        ? (formStatus.type === 'success' ? 'bg-emerald-950/60 border-emerald-800/50 text-emerald-300' : 'bg-rose-950/60 border-rose-800/50 text-rose-300')
                        : (formStatus.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700')
                      }`}>
                        <i className={`${formStatus.type === 'success' ? 'fas fa-circle-check' : 'fas fa-circle-exclamation'} mt-0.5 shrink-0`} />
                        {formStatus.text}
                      </div>
                    )}
                  </form>
                </div>

              </div>
            </div>
          </FadeSection>
        </section>

      </div>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className={`relative z-10 w-full border-t py-8 px-5 ${footerCls}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Jean Ryan W. Mellomida. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400 glow-dot-cyan' : 'bg-cyan-500'}`} />
            <span>Available for opportunities</span>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════
          SCROLL-TO-TOP
      ══════════════════════════════════════ */}


    </div>
  );
}
