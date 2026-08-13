import React from 'react';

export default function About({ companyName, slogan, darkMode }) {
  return (
    <section id="about" className={`py-16 px-6 border-y transition-colors ${darkMode ? 'bg-slate-950/60 border-slate-900' : 'bg-white border-slate-200'}`}>
      <div className="max-w-5xl mx-auto space-y-6 text-center">
        <span className="text-[#FF8C00] text-xs font-mono font-bold uppercase tracking-widest">
          Who We Are
        </span>
        <h2 className="text-3xl sm:text-4xl font-black">About {companyName}</h2>
        <p className={`text-base sm:text-lg leading-relaxed max-w-3xl mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          At <span className="text-[#00B4D8] font-bold">{companyName}</span>, we build innovative technology solutions that help businesses improve efficiency, enhance security, and accelerate digital growth. Our mission is simple—<span className="text-[#FF8C00] font-bold">{slogan}</span> through smart technology and exceptional service.
        </p>
      </div>
    </section>
  );
}