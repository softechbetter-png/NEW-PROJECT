import React from 'react';

export default function BlogAndFAQ({ blogPosts, faqs, activeFAQ, setActiveFAQ, darkMode }) {
  return (
    <section id="blog" className="py-20 px-6 max-w-7xl mx-auto space-y-16">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[#00B4D8] text-xs font-mono font-bold uppercase tracking-widest">Insights</span>
          <h2 className="text-3xl font-black">Latest News & Articles</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, i) => (
            <div key={i} className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="space-y-2">
                <span className="text-[10px] font-mono bg-[#0056D2]/20 text-[#00B4D8] px-2 py-0.5 rounded font-bold">{post.category}</span>
                <h3 className="font-bold text-sm leading-snug">{post.title}</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{post.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="faqs" className="max-w-3xl mx-auto space-y-6 pt-8">
        <div className="text-center space-y-2">
          <span className="text-[#FF8C00] text-xs font-mono font-bold uppercase tracking-widest">Got Questions?</span>
          <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <button
                onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-sm flex justify-between items-center"
              >
                <span>{faq.q}</span>
                <span className="text-[#00B4D8] text-lg">{activeFAQ === idx ? '−' : '+'}</span>
              </button>
              {activeFAQ === idx && (
                <div className="px-4 pb-4 text-xs text-slate-400 border-t border-slate-800/40 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}