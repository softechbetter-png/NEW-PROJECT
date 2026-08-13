import React from 'react';

export default function Hero({ darkMode }) {
  return (
    <section id="home" className="relative py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 text-left">
        <span className="bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/30 font-bold text-xs px-3.5 py-1.5 rounded-full inline-block tracking-wide uppercase">
          🚀 Next-Gen Digital Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Innovative Technology Solutions for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0056D2] via-[#00B4D8] to-[#FF8C00]">Smarter Future</span>
        </h1>
        <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          We help businesses grow through custom software development, cloud solutions, cybersecurity, high-performance networking, IT consulting, and comprehensive digital transformation.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a href="#services" className="bg-[#0056D2] hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5">
            Get Started
          </a>
          <a href="#portfolio" className={`font-bold text-sm px-6 py-3.5 rounded-xl border transition-colors ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-300 hover:bg-slate-100'}`}>
            View Our Services
          </a>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-br from-[#0056D2]/20 via-[#00B4D8]/20 to-[#FF8C00]/20 border border-[#00B4D8]/30 p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00B4D8]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FF8C00]/20 rounded-full blur-3xl"></div>
          
          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-mono font-bold text-[#00B4D8]">SOFTECH ENGINE // LIVE</span>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8C00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF8C00]"></span>
            </span>
          </div>

          <div className="my-auto text-center space-y-3 z-10">
            <div className="text-5xl sm:text-6xl animate-pulse">⚡</div>
            <h3 className="font-mono font-bold text-lg sm:text-xl text-[#00B4D8]">Digital Acceleration Active</h3>
            <p className="text-xs text-slate-400">Transforming ideas into resilient software architectures.</p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono font-bold z-10">
            <div className={`p-2 rounded-lg border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>CLOUD SECURE</div>
            <div className={`p-2 rounded-lg border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>A.I. READY</div>
            <div className={`p-2 rounded-lg border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>24/7 MONITOR</div>
          </div>
        </div>
      </div>
    </section>
  );
}