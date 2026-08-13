import React from 'react';

export default function CTA({ onOpenQuote }) {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto w-full">
      <div className="rounded-3xl bg-gradient-to-r from-[#0056D2] via-[#00B4D8] to-[#FF8C00] p-10 sm:p-14 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
        <h2 className="text-3xl sm:text-5xl font-black">Ready to Transform Your Business?</h2>
        <p className="text-sm sm:text-base max-w-2xl mx-auto font-medium opacity-90">
          Let's build innovative technology solutions together that scale your operations seamlessly.
        </p>
        <button 
          onClick={onOpenQuote}
          className="bg-slate-950 hover:bg-black text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl transition-transform hover:scale-105"
        >
          Contact Us Today
        </button>
      </div>
    </section>
  );
}