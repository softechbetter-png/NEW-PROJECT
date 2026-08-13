import React from 'react';

export default function Process({ processSteps, darkMode }) {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <span className="text-[#00B4D8] text-xs font-mono font-bold uppercase tracking-widest">Workflow</span>
        <h2 className="text-3xl sm:text-4xl font-black">Our Execution Process</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {processSteps.map((step, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border relative space-y-3 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="text-3xl">{step.num}</span>
            <h3 className="text-lg font-bold text-[#00B4D8]">{step.title}</h3>
            <p className="text-xs leading-relaxed text-slate-400">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}