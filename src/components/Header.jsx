import React from 'react';

export default function Header({ companyName, slogan, logoUrl, darkMode, setDarkMode, onOpenConsultation }) {
  return (
    <header className={`sticky top-0 px-6 py-4 shadow-md border-b z-40 flex items-center justify-between backdrop-blur-md transition-colors ${darkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
      <a href="#home" className="flex items-center gap-3 group">
        <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md border border-[#00B4D8] flex items-center justify-center bg-slate-900">
          <img 
            src={logoUrl} 
            alt={`${companyName} Logo`} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="font-black text-xl text-[#00B4D8] font-mono">S</span>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-wider text-[#0056D2] dark:text-[#00B4D8] font-mono">
            {companyName}
          </span>
          <span className="text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase -mt-1">
            {slogan}
          </span>
        </div>
      </a>

      <nav className="hidden lg:flex items-center gap-7 font-semibold text-sm tracking-wide">
        <a href="#home" className="hover:text-[#00B4D8] transition-colors">Home</a>
        <a href="#about" className="hover:text-[#00B4D8] transition-colors">About Us</a>
        <a href="#services" className="hover:text-[#00B4D8] transition-colors">Services</a>
        <a href="#portfolio" className="hover:text-[#00B4D8] transition-colors">Portfolio</a>
        <a href="#blog" className="hover:text-[#00B4D8] transition-colors">Blog</a>
        <a href="#faqs" className="hover:text-[#00B4D8] transition-colors">FAQs</a>
        <a href="#contact" className="hover:text-[#00B4D8] transition-colors">Contact</a>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenConsultation}
          className="hidden sm:inline-flex bg-[#FF8C00] hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow transition-transform active:scale-95"
        >
          Book Consultation
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2.5 rounded-lg border transition-colors ${darkMode ? 'bg-slate-900 border-slate-800 text-[#00B4D8]' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
          title="Toggle Theme"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}