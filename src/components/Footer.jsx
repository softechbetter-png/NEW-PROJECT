import React from 'react';

export default function Footer({ companyName, slogan, newsletterEmail, setNewsletterEmail, handleNewsletterSubmit, darkMode }) {
  return (
    <footer id="contact" className={`border-t transition-colors ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-black text-2xl text-[#00B4D8] font-mono">{companyName}</span>
          </div>
          <p className="text-xs leading-relaxed max-w-sm">
            {slogan}. Your premier technology partner delivering cutting-edge software engineering, infrastructure, and cloud solutions.
          </p>
          <div className="space-y-1 text-xs">
            <p>📞 <a href="tel:+2347080367072" className="hover:text-[#00B4D8] transition-colors">+234 708 036 7072</a></p>
            <p>✉️ <a href="mailto:support@softech.com" className="hover:text-[#00B4D8] transition-colors">support@softech.com</a></p>
            <p>📍 Lagos, Nigeria</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-xs tracking-widest uppercase text-[#00B4D8]">Services</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#services" className="hover:text-[#00B4D8]">Software Dev</a></li>
            <li><a href="#services" className="hover:text-[#00B4D8]">Website Dev</a></li>
            <li><a href="#services" className="hover:text-[#00B4D8]">Cloud Solutions</a></li>
            <li><a href="#services" className="hover:text-[#00B4D8]">Cybersecurity</a></li>
            <li><a href="#services" className="hover:text-[#00B4D8]">IT Support</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-xs tracking-widest uppercase text-[#00B4D8]">Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#about" className="hover:text-[#00B4D8]">About Us</a></li>
            <li><a href="#portfolio" className="hover:text-[#00B4D8]">Portfolio</a></li>
            <li><a href="#blog" className="hover:text-[#00B4D8]">Blog</a></li>
            <li><a href="#faqs" className="hover:text-[#00B4D8]">FAQs</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-xs tracking-widest uppercase text-[#FF8C00]">Newsletter</h4>
          <p className="text-xs">Subscribe for the latest tech updates.</p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <input 
              type="email" 
              required 
              placeholder="Enter email" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}
            />
            <button type="submit" className="w-full bg-[#0056D2] hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className={`border-t py-4 text-center text-xs ${darkMode ? 'border-slate-900 text-slate-600' : 'border-slate-100 text-slate-400'}`}>
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </div>
    </footer>
  );
}