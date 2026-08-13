import React from 'react';

export default function TechStack({ technologies, darkMode }) {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[#00B4D8] text-xs font-mono font-bold uppercase tracking-widest">Tech Stack</span>
        <h2 className="text-2xl sm:text-3xl font-black">Technologies We Use</h2>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3">
        {technologies.map((tech, idx) => (
          <div key={idx} className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold transition-all hover:border-[#00B4D8] ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
            ⚡ {tech}
          </div>
        ))}
      </div>
    </section>
  );
}