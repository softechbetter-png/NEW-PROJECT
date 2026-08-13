import React, { useState } from 'react';

export default function Modals({ 
  selectedProject, 
  setSelectedProject, 
  quoteModalOpen, 
  setQuoteModalOpen, 
  consultationModalOpen, 
  setConsultationModalOpen, 
  whatsappNumber, 
  toasts, 
  removeToast, 
  showToast, 
  darkMode 
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    service: 'Cloud Engineering',
    details: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestType = consultationModalOpen ? 'Consultation' : 'Quote';

    try {
      const response = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: requestType,
          ...formData
        })
      });

      const data = await response.json();

      if (data.success) {
        showToast("Request submitted successfully! We'll get back to you shortly.", "success");
        setFormData({ fullName: '', email: '', service: 'Cloud Engineering', details: '' });
        setQuoteModalOpen(false);
        setConsultationModalOpen(false);
      } else {
        showToast(data.message || "Failed to submit request.", "error");
      }
    } catch (error) {
      console.error("Backend Submission Error:", error);
      showToast("Unable to reach server. Please try again or reach out on WhatsApp.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Project Detail Preview Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`rounded-2xl max-w-lg w-full p-6 relative border space-y-4 shadow-2xl ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title} 
              className="w-full h-48 object-cover rounded-xl bg-slate-900" 
            />
            <span className="text-[10px] font-bold bg-[#00B4D8]/20 text-[#00B4D8] px-2.5 py-1 rounded tracking-wide">
              {selectedProject.category}
            </span>
            <h3 className="text-xl font-bold">{selectedProject.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {selectedProject.tech.map((t, i) => (
                <span key={i} className="text-[10px] font-mono bg-[#0056D2]/10 text-[#00B4D8] px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Backend Quote & Consultation Modal */}
      {(quoteModalOpen || consultationModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`rounded-2xl max-w-md w-full p-6 relative border space-y-4 shadow-2xl ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button 
              onClick={() => { setQuoteModalOpen(false); setConsultationModalOpen(false); }} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>
            
            <h3 className="text-xl font-bold">
              {consultationModalOpen ? 'Book a Consultation' : 'Get a Custom Quote'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  required 
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe" 
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-[#00B4D8] ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-900'}`} 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@company.com" 
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-[#00B4D8] ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-900'}`} 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Service Interested In</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-[#00B4D8] ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-900'}`}
                >
                  <option value="Cloud Engineering">⚙️ Cloud Engineering & DevOps</option>
                  <option value="Software Development">💻 Custom Software Development</option>
                  <option value="Website Development">🌐 Website & E-commerce</option>
                  <option value="Cloud Solutions">☁️ Cloud Migration & Setup</option>
                  <option value="Cybersecurity">🔒 Cybersecurity & Network Audit</option>
                  <option value="IT Support">🖥 Managed IT Support</option>
                  <option value="IT Consulting">📊 IT Consulting</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Project Details</label>
                <textarea 
                  name="details"
                  required 
                  rows="3" 
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Tell us about your project requirements or timeline..." 
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-[#00B4D8] ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-900'}`}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0056D2] hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-lg text-xs shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Buttons & Toast Container */}
      <button 
        onClick={() => setQuoteModalOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-[#FF8C00] hover:bg-orange-600 text-white font-extrabold text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-transform hover:scale-105"
      >
        <span>💬</span>
        <span className="hidden sm:inline">Get a Quote</span>
      </button>

      <a
        href={`https://wa.me/${whatsappNumber}?text=Hello%20SOFTECH,%20I%20would%20like%20to%20inquire%20about%20your%20services!`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center group transition-transform duration-300 hover:scale-105"
      >
        <div className="bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center w-12 h-12 hover:bg-[#20ba5a]">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.333 5.003l-1.417 5.176 5.297-1.389c1.464.798 3.117 1.218 4.773 1.218h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.037-5.177-2.925-7.065-1.888-1.888-4.397-2.926-7.064-2.926zm5.82 14.161c-.246.692-1.431 1.328-1.966 1.397-.534.068-1.229.097-1.986-.145-.459-.147-1.049-.342-1.815-.672-3.218-1.388-5.311-4.636-5.471-4.851-.16-.215-1.303-1.734-1.303-3.308 0-1.574.823-2.348 1.116-2.668.293-.32.641-.4.855-.4h.614c.214 0 .428.007.614.453.214.507.728 1.777.791 1.905.063.128.106.277.021.448-.085.171-.128.277-.256.427-.128.15-.269.335-.384.45-.128.128-.261.267-.112.523.149.256.663 1.096 1.423 1.773.978.871 1.802 1.141 2.058 1.269.256.128.406.107.556-.064.15-.171.641-.747.812-1.003.171-.256.342-.214.577-.128.235.085 1.495.705 1.751.833.256.128.427.192.491.299.064.107.064.62-.182 1.312z" />
          </svg>
        </div>
      </a>

      <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-xs w-full pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-xl border text-xs font-semibold text-white animate-slide-up ${
              toast.type === 'error' ? 'bg-red-600 border-red-400' : 'bg-[#0056D2] border-blue-400'
            }`}
          >
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-3 font-bold">✕</button>
          </div>
        ))}
      </div>
    </>
  );
}