import React from 'react';

export default function Testimonials({ testimonials, stats, darkMode }) {
  return (
    <section className={`py-16 px-6 border-y transition-colors ${darkMode ? 'bg-slate-950/80 border-slate-900' : 'bg-slate-100/70 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[#FF8C00] text-xs font-mono font-bold uppercase tracking-widest">Feedback</span>
            <h2 className="text-3xl font-black">Customer Testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className={`p-6 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[#FF8C00] text-sm">{"★".repeat(t.rating)}</div>
                <p className="text-sm italic text-slate-300">"{t.quote}"</p>
                <div>
                  <h4 className="font-bold text-sm text-[#00B4D8]">{t.author}</h4>
                  <span className="text-[11px] text-slate-400">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {stats.map((s, i) => (
            <div key={i} className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="text-2xl sm:text-3xl font-black text-[#00B4D8] font-mono">{s.count}</div>
              <div className="text-[11px] font-bold text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}