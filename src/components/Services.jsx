import React from 'react';

export default function Services({ services, darkMode }) {
  return (
    <section id="services" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <span className="text-[#00B4D8] text-xs font-mono font-bold uppercase tracking-widest">What We Do</span>
        <h2 className="text-3xl sm:text-4xl font-black">Our Services</h2>
        <p className="text-xs sm:text-sm text-slate-400">Tailored technical expertise engineered for enterprise scale.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv, idx) => (
          <div 
            key={idx}
            className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-[#00B4D8] flex flex-col justify-between ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0056D2]/10 border border-[#0056D2]/30 flex items-center justify-center text-2xl">
                {srv.icon}
              </div>
              <h3 className="text-xl font-bold">{srv.title}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {srv.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#00B4D8]">▸</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}