import React from 'react';

export default function ValueProps({ companyName, valueProps, industries, darkMode }) {
  return (
    <section className={`py-16 px-6 border-y transition-colors ${darkMode ? 'bg-slate-950/80 border-slate-900' : 'bg-slate-100/70 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <span className="text-[#FF8C00] text-xs font-mono font-bold uppercase tracking-widest">Our Value Proposition</span>
          <h2 className="text-3xl font-black">Why Choose {companyName}?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {valueProps.map((val, i) => (
              <div key={i} className={`p-4 rounded-xl border flex items-center gap-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="w-7 h-7 rounded-full bg-[#00B4D8]/20 text-[#00B4D8] font-black flex items-center justify-center text-xs">{val.icon}</span>
                <span className="font-bold text-sm">{val.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <span className="text-[#00B4D8] text-xs font-mono font-bold uppercase tracking-widest">Domain Expertise</span>
          <h2 className="text-3xl font-black">Industries We Serve</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {industries.map((ind, i) => (
              <div key={i} className={`p-3 rounded-xl border text-center font-bold text-xs tracking-wide transition-colors ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                {ind}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}