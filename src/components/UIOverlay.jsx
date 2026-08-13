// src/components/UIOverlay.jsx
import React, { useState, useEffect } from 'react';
import TechStack from './TechStack';
import ryanImage from '../assets/ryan.jpg';

export default function UIOverlay() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Toggle between dark and violet themes (no light/sun mode)
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'violet' : 'dark'));
  };

  // Monitor scroll position to show/hide the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Smooth scroll handler for anchor links
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);

    try {
      const response = await fetch('https://formspree.io/f/xkoaaglj', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setFormStatus({ type: 'success', text: "Message sent successfully! I'll get back to you soon." });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Network response failed.');
      }
    } catch (error) {
      setFormStatus({ type: 'error', text: 'Oops! There was a problem sending your message. Please try again.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(null), 6000);
    }
  };

  // Theme-based class definitions dynamically switching between dark and violet modes
  const isDark = theme === 'dark';
  const isViolet = theme === 'violet';

  const themeClasses = {
    container: isDark 
      ? 'w-full min-h-screen flex flex-col relative bg-[#04060a] text-slate-100 transition-colors duration-500'
      : 'w-full min-h-screen flex flex-col relative bg-slate-950 text-slate-100 transition-colors duration-500',
    header: isDark 
      ? 'fixed top-0 left-0 right-0 z-50 w-full bg-[#07090e]/85 backdrop-blur-2xl border-b border-cyan-950/60 shadow-[0_8px_30px_rgb(0,0,0,0.6)]'
      : 'fixed top-0 left-0 right-0 z-50 w-full bg-slate-900/85 backdrop-blur-2xl border-b border-violet-950/60 shadow-[0_8px_30px_rgb(0,0,0,0.6)]',
    title: isDark 
      ? 'text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-300 to-cyan-400 bg-clip-text text-transparent'
      : 'text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-300 to-violet-400 bg-clip-text text-transparent',
    navLink: isDark 
      ? 'hover:text-cyan-400 transition-colors text-slate-400 cursor-pointer'
      : 'hover:text-violet-400 transition-colors text-slate-400 cursor-pointer',
    badge: isDark 
      ? 'inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0a0f18]/80 border border-cyan-950/80 backdrop-blur-md shadow-sm'
      : 'inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-violet-950/80 backdrop-blur-md shadow-sm',
    badgeText: isDark 
      ? 'text-cyan-300 font-medium tracking-wide text-xs uppercase'
      : 'text-violet-400 font-medium tracking-wide text-xs uppercase',
    headingMain: 'text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-white',
    paragraph: 'text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-normal',
    secondaryBtn: isDark 
      ? 'border border-cyan-950/80 hover:border-cyan-700/60 bg-[#0a0f18]/60 backdrop-blur-md px-7 py-3.5 rounded-xl font-semibold text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95'
      : 'border border-violet-950/80 hover:border-violet-700/60 bg-slate-900/60 backdrop-blur-md px-7 py-3.5 rounded-xl font-semibold text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95',
    profileCardBg: isDark 
      ? 'relative w-full h-full rounded-[2.5rem] bg-[#04060a]/90 border border-cyan-950/80 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex items-end justify-center'
      : 'relative w-full h-full rounded-[2.5rem] bg-slate-950/90 border border-violet-950/80 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex items-end justify-center',
    profileFooter: isDark 
      ? 'absolute bottom-4 left-4 right-4 z-20 bg-[#07090e]/95 backdrop-blur-xl border border-cyan-900/50 px-4 py-3 rounded-2xl flex items-center justify-between shadow-2xl'
      : 'absolute bottom-4 left-4 right-4 z-20 bg-slate-900/95 backdrop-blur-xl border border-violet-900/50 px-4 py-3 rounded-2xl flex items-center justify-between shadow-2xl',
    profileName: 'text-xs font-semibold text-slate-200 tracking-wide',
    statusBadge: isDark 
      ? 'text-[10px] tracking-wider uppercase bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 px-2.5 py-1 rounded-lg font-medium shadow-inner'
      : 'text-[10px] tracking-wider uppercase bg-violet-950/80 border border-violet-800/60 text-violet-400 font-medium px-2.5 py-1 rounded-lg shadow-inner',
    cardBox: isDark 
      ? 'bg-[#07090e]/70 backdrop-blur-2xl border border-cyan-950/60 p-8 sm:p-12 md:p-16 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:border-cyan-800/40 w-full'
      : 'bg-slate-900/70 backdrop-blur-2xl border border-violet-950/60 p-8 sm:p-12 md:p-16 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:border-violet-800/40 w-full',
    subCardBox: isDark 
      ? 'lg:col-span-5 bg-[#04060a]/80 border border-cyan-950/60 p-6 sm:p-8 rounded-3xl space-y-6'
      : 'lg:col-span-5 bg-slate-950/80 border border-violet-950/60 p-6 sm:p-8 rounded-3xl space-y-6',
    techPill: isDark 
      ? 'px-3.5 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-900/50 text-cyan-300 text-xs font-semibold'
      : 'px-3.5 py-1.5 rounded-xl bg-violet-950/40 border border-violet-900/50 text-violet-400 font-medium text-xs',
    projectCard: isDark 
      ? 'bg-[#07090e]/70 backdrop-blur-2xl border border-cyan-950/60 p-8 rounded-[2rem] shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-700/50 group flex flex-col justify-between'
      : 'bg-slate-900/70 backdrop-blur-2xl border border-violet-950/60 p-8 rounded-[2rem] shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-violet-700/50 group flex flex-col justify-between',
    projectImgBox: isDark 
      ? 'h-44 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-[#04060a] border border-cyan-950/60 flex items-center justify-center overflow-hidden relative mb-6'
      : 'h-44 rounded-2xl bg-gradient-to-br from-violet-950/40 to-slate-950 border border-violet-950/60 flex items-center justify-center overflow-hidden relative mb-6',
    inputField: isDark 
      ? 'w-full bg-[#07090e] border border-cyan-950/80 rounded-xl px-4.5 py-3.5 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm shadow-inner'
      : 'w-full bg-slate-900 border border-violet-950/80 rounded-xl px-4.5 py-3.5 text-white focus:outline-none focus:border-violet-500 transition-colors text-sm shadow-inner',
    contactInfoBox: isDark 
      ? 'flex items-center gap-4 p-4 rounded-2xl bg-[#04060a]/80 border border-cyan-950/80'
      : 'flex items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-violet-950/80',
    socialBtn: isDark 
      ? 'w-11 h-11 rounded-xl bg-[#04060a]/80 border border-cyan-950/80 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-700/60 transition-all text-base'
      : 'w-11 h-11 rounded-xl bg-slate-950/80 border border-violet-950/80 flex items-center justify-center text-slate-300 hover:text-violet-400 hover:border-violet-700/60 transition-all text-base',
    contactFormBox: isDark 
      ? 'lg:col-span-7 bg-[#04060a]/90 border border-cyan-950/80 p-6 sm:p-8 rounded-3xl shadow-2xl'
      : 'lg:col-span-7 bg-slate-950/90 border border-violet-950/80 p-6 sm:p-8 rounded-3xl shadow-2xl',
  };

  return (
    <div className={themeClasses.container}>
      {/* Import Styles & Global Scroll Behavior */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');

        html {
          scroll-behavior: smooth;
        }

        @keyframes scrollLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .tech-track-left {
          display: flex;
          width: max-content;
          animation: scrollLeft 32s linear infinite;
        }
        .tech-track-right {
          display: flex;
          width: max-content;
          animation: scrollRight 32s linear infinite;
        }
        .tech-track-left:hover,
        .tech-track-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header / Sticky Navigation Bar */}
      <header className={themeClasses.header}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-4 flex justify-between items-center">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className={`w-3.5 h-3.5 rounded-full animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.9)] group-hover:scale-110 transition-transform ${isViolet ? 'bg-violet-500' : 'bg-cyan-500'}`}></div>
            <h1 className={themeClasses.title}>
              RYAN.DEV
            </h1>
          </button>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className={themeClasses.navLink}>Home</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={themeClasses.navLink}>About</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={themeClasses.navLink}>Toolkit</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={themeClasses.navLink}>Projects</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={themeClasses.navLink}>Contact</a>
          </nav>
          
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme"
              aria-label="Toggle Theme"
              className={isDark 
                ? "bg-cyan-950/40 border border-cyan-800/40 hover:bg-cyan-900/60 text-cyan-300 p-2.5 rounded-xl text-sm transition-all duration-300 shadow-inner cursor-pointer"
                : "bg-violet-950/40 border border-violet-800/40 hover:bg-violet-900/60 text-violet-400 p-2.5 rounded-xl text-sm transition-all duration-300 shadow-inner cursor-pointer"
              }
            >
              <i className={isDark ? "fas fa-moon" : "fas fa-palette"}></i>
            </button>

            <button
              onClick={scrollToTop}
              title="Back to Top"
              className={isDark
                ? "md:hidden bg-cyan-950/40 border border-cyan-800/40 hover:bg-cyan-900/60 text-cyan-300 p-2.5 rounded-xl text-sm transition-all duration-300 shadow-inner"
                : "md:hidden bg-violet-950/40 border border-violet-800/40 hover:bg-violet-900/60 text-violet-400 p-2.5 rounded-xl text-sm transition-all duration-300 shadow-inner"
              }
            >
              <i className="fas fa-arrow-up"></i>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={isDark
                ? "bg-cyan-950/40 border border-cyan-800/40 hover:bg-cyan-900/60 hover:border-cyan-500 text-cyan-300 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-inner hidden sm:inline-block cursor-pointer"
                : "bg-violet-950/40 border border-violet-800/40 hover:bg-violet-900/60 hover:border-violet-500 text-violet-400 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-inner hidden sm:inline-block cursor-pointer"
              }
            >
              Let's Talk
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col px-4 sm:px-8 md:px-16 max-w-7xl mx-auto w-full pointer-events-auto flex-grow pt-24">
        
        {/* Hero Section */}
        <main id="hero" className="w-full py-20 md:py-28 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className={themeClasses.badge}>
                <span className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)] ${isViolet ? 'bg-violet-400' : 'bg-cyan-400'}`}></span>
                <span className={themeClasses.badgeText}>BSIS Graduate • Makilala, Cotabato</span>
              </div>
              
              <h2 className={themeClasses.headingMain}>
                Hi, I'm Jean <span className={`bg-gradient-to-r bg-clip-text text-transparent ${isViolet ? 'from-violet-400 via-purple-300 to-indigo-400' : 'from-cyan-400 via-teal-300 to-indigo-400'}`}>Ryan Mellomida</span>.
              </h2>
              
              <p className={themeClasses.paragraph}>
                An aspiring systems and web developer focused on architecting structured backends, clean interfaces, and full-stack solutions with modern PHP, Laravel, and JavaScript.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, 'projects')}
                  className={`font-bold px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 ${isViolet ? 'bg-violet-600 hover:bg-violet-500 text-slate-950 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)]' : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)]'}`}
                >
                  <span>View Projects</span>
                  <i className="fas fa-arrow-right text-xs"></i>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className={themeClasses.secondaryBtn}
                >
                  Get in Touch
                </a>
              </div>
            </div>

            {/* Profile Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-72 h-[22rem] sm:w-80 sm:h-[25rem] flex items-end justify-center">
                <div className={`absolute -inset-2 bg-gradient-to-tr rounded-[2.5rem] blur-2xl opacity-30 group-hover:opacity-60 transition duration-700 ${isViolet ? 'from-violet-600 via-purple-900 to-indigo-950' : 'from-cyan-600 via-teal-900 to-indigo-950'}`}></div>

                <div className={themeClasses.profileCardBg}>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d405_1px,transparent_1px),linear-gradient(to_bottom,#06b6d405_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none"></div>

                  <img
                    src={ryanImage}
                    alt="Jean Ryan W. Mellomida"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 relative z-10"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
                    }}
                  />

                  <div className={themeClasses.profileFooter}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.9)] ${isViolet ? 'bg-violet-400' : 'bg-cyan-400'}`}></div>
                      <span className={themeClasses.profileName}>Jean Ryan W. Mellomida</span>
                    </div>
                    <span className={themeClasses.statusBadge}>Available</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* About Section */}
        <section id="about" className="w-full py-20">
          <div className={themeClasses.cardBox}>
            <div className={isDark ? "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-900/50 mb-4" : "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/40 border border-violet-900/50 mb-4"}>
              <span className={themeClasses.badgeText}>About Me</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Education & Core Background.
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 items-start">
              <div className="lg:col-span-7 space-y-4">
                <span className={isViolet ? "text-violet-400 font-semibold text-sm tracking-widest uppercase" : "text-cyan-400 font-bold text-sm tracking-widest uppercase"}>2025 - 2026 Academic Year</span>
                <h4 className="text-2xl sm:text-3xl font-bold text-white">Bachelor of Science in Information Systems</h4>
                <p className="text-slate-400 text-base leading-relaxed">
                  Graduated with a solid grounding in software development methodologies, systems analysis, and enterprise database administration. My academic projects emphasized solving real-world challenges through robust backend architectures and clean user flows.
                </p>
                <ul className="space-y-2.5 text-slate-400 text-sm pt-2">
                  <li className="flex items-center gap-2.5"><i className={`fas fa-check-circle ${isViolet ? 'text-violet-400' : 'text-cyan-500'}`}></i> Specialized in relational database structures and server-side processing.</li>
                  <li className="flex items-center gap-2.5"><i className={`fas fa-check-circle ${isViolet ? 'text-violet-400' : 'text-cyan-500'}`}></i> Experienced with collaborative version control and deployment practices.</li>
                  <li className="flex items-center gap-2.5"><i className={`fas fa-check-circle ${isViolet ? 'text-violet-400' : 'text-cyan-500'}`}></i> Passionate about building modular, maintainable, and user-friendly systems.</li>
                </ul>
              </div>
              <div className={themeClasses.subCardBox}>
                <div>
                  <h5 className={`${isViolet ? 'text-violet-400' : 'text-cyan-400'} mb-3 text-xs uppercase tracking-wider font-semibold`}>Primary Technologies</h5>
                  <div className="flex flex-wrap gap-2">
                    {['PHP', 'Laravel', 'MySQL', 'JavaScript', 'HTML5 / CSS3'].map((tech) => (
                      <span key={tech} className={themeClasses.techPill}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div className={isDark 
                  ? "pt-6 border-t border-cyan-950/60 flex items-center gap-3 text-slate-300 text-sm" 
                  : "pt-6 border-t border-violet-950/60 flex items-center gap-3 text-slate-300 text-sm"
                }>
                  <div className={isDark 
                    ? "w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-900/50 flex items-center justify-center text-cyan-400 shrink-0" 
                    : "w-10 h-10 rounded-xl bg-violet-950/50 border border-violet-900/50 flex items-center justify-center text-violet-400 shrink-0"
                  }>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Makilala, Cotabato</p>
                    <p className="text-xs text-slate-400">Philippines • Open for Remote Work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Render TechStack Component */}
        <div id="skills">
          <TechStack />
        </div>

        {/* Projects Section */}
        <section id="projects" className="w-full py-20">
          <div className={isDark ? "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-900/50 mb-4" : "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/40 border border-violet-900/50 mb-4"}>
            <span className={themeClasses.badgeText}>Portfolio</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-12">
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            
            <div className={themeClasses.projectCard}>
              <div>
                <div className={themeClasses.projectImgBox}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent"></div>
                  <i className={`fas fa-cash-register ${isViolet ? 'text-violet-400' : 'text-cyan-500'} text-4xl group-hover:scale-110 transition-transform duration-300`}></i>
                </div>
                <h4 className={`text-2xl font-bold text-white transition-colors ${isViolet ? 'group-hover:text-violet-400' : 'group-hover:text-cyan-400'}`}>Point of Sales</h4>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">Streamlines sales transactions, manages inventory stock levels, tracks checkouts securely, and produces instant performance records.</p>
              </div>
              <div className={isDark 
                ? "mt-8 pt-4 border-t border-cyan-950/60 flex items-center justify-between text-xs font-semibold text-cyan-400" 
                : "mt-8 pt-4 border-t border-violet-950/60 flex items-center justify-between text-xs text-violet-400 font-semibold"
              }>
                <span>PHP / MySQL System</span>
                <i className="fas fa-code text-slate-400"></i>
              </div>
            </div>

            <div className={themeClasses.projectCard}>
              <div>
                <div className={themeClasses.projectImgBox}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent"></div>
                  <i className="fas fa-book-reader text-teal-500 text-4xl group-hover:scale-110 transition-transform duration-300"></i>
                </div>
                <h4 className={`text-2xl font-bold text-white transition-colors ${isViolet ? 'group-hover:text-violet-400' : 'group-hover:text-teal-400'}`}>Library System</h4>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">Digital cataloging platform tailored for archiving book inventories, handling active resource borrowings, and managing member records.</p>
              </div>
              <div className={isDark 
                ? "mt-8 pt-4 border-t border-cyan-950/60 flex items-center justify-between text-xs font-semibold text-teal-400" 
                : "mt-8 pt-4 border-t border-violet-950/60 flex items-center justify-between text-xs text-violet-400 font-semibold"
              }>
                <span>Database Management</span>
                <i className="fas fa-code text-slate-400"></i>
              </div>
            </div>

            <div className={themeClasses.projectCard}>
              <div>
                <div className={themeClasses.projectImgBox}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
                  <i className={`fas fa-shirt ${isViolet ? 'text-violet-400' : 'text-cyan-500'} text-4xl group-hover:scale-110 transition-transform duration-300`}></i>
                </div>
                <h4 className={`text-2xl font-bold text-white transition-colors ${isViolet ? 'group-hover:text-violet-400' : 'group-hover:text-cyan-300'}`}>Clothing Ordering System</h4>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">Dynamic apparel e-commerce interface featuring customized selection options, interactive shopping carts, and order workflows.</p>
              </div>
              <div className={isDark 
                ? "mt-8 pt-4 border-t border-cyan-950/60 flex items-center justify-between text-xs font-semibold text-cyan-400" 
                : "mt-8 pt-4 border-t border-violet-950/60 flex items-center justify-between text-xs text-violet-400 font-semibold"
              }>
                <span>Full-Stack Web App</span>
                <i className="fas fa-code text-slate-400"></i>
              </div>
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-20">
          <div className={themeClasses.cardBox + " relative overflow-hidden"}>
            <div className="absolute -right-24 -top-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
              
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <div className={isDark ? "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-900/50 mb-4" : "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/40 border border-violet-900/50 mb-4"}>
                    <span className={themeClasses.badgeText}>Get In Touch</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Let's build something exceptional.</h3>
                  <p className="text-slate-400 text-base mt-4 leading-relaxed">
                    Have a project in mind, an inquiry about my background, or want to talk tech? Drop a message or reach out through my socials below.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className={themeClasses.contactInfoBox}>
                    <div className={isDark 
                      ? "w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-900/50 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner" 
                      : "w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-900/50 flex items-center justify-center text-violet-400 shrink-0 shadow-inner"
                    }>
                      <i className="fas fa-envelope text-lg"></i>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Direct Email</p>
                      <p className="text-white text-sm font-medium mt-0.5">mellomidajeanryan@gmail.com</p>
                    </div>
                  </div>

                  <div className={themeClasses.contactInfoBox}>
                    <div className={isDark 
                      ? "w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-900/50 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner" 
                      : "w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-900/50 flex items-center justify-center text-violet-400 shrink-0 shadow-inner"
                    }>
                      <i className="fas fa-map-marker-alt text-lg"></i>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Location</p>
                      <p className="text-white text-sm font-medium mt-0.5">Makilala, Cotabato, Philippines</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Connect Online</p>
                  <div className="flex space-x-3">
                    <a href="#contact" aria-label="Facebook" className={themeClasses.socialBtn}><i className="fab fa-facebook"></i></a>
                    <a href="#contact" aria-label="GitHub" className={themeClasses.socialBtn}><i className="fab fa-github"></i></a>
                    <a href="#contact" aria-label="LinkedIn" className={themeClasses.socialBtn}><i className="fab fa-linkedin"></i></a>
                  </div>
                </div>
              </div>

              <div className={themeClasses.contactFormBox}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={themeClasses.inputField}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={themeClasses.inputField}
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={themeClasses.inputField}
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>

                  {formStatus && (
                    <div className={`p-4 rounded-xl text-sm ${formStatus.type === 'success' ? 'bg-emerald-950/80 border border-emerald-800/60 text-emerald-300' : 'bg-rose-950/80 border border-rose-800/60 text-rose-300'}`}>
                      {formStatus.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${isViolet ? 'bg-violet-600 hover:bg-violet-500 text-slate-950 shadow-[0_0_20px_rgba(124,58,237,0.4)]' : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <i className="fas fa-paper-plane text-xs"></i>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* Footer / Copyright */}
      <footer className="w-full py-8 border-t border-slate-900 bg-[#04060a] text-center text-xs text-slate-500 relative z-10">
        <p>© {new Date().getFullYear()} Jean Ryan W. Mellomida. All rights reserved.</p>
      </footer>

      {/* Scroll-to-Top Floating Button */}
      
    </div>
  );
}