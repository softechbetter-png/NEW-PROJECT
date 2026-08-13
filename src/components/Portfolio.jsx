import React, { useState } from 'react';

export default function Portfolio({ projects, setSelectedProject, darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter((p) => p.category === selectedCategory);

  const fallbackImage = "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80";

  return (
    <section id="portfolio" className="py-20 px-6 max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <span className="text-[#00B4D8] text-xs font-mono font-bold uppercase tracking-widest">
          Case Studies
        </span>
        <h2 className="text-3xl sm:text-4xl font-black">Featured Projects</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          A showcase of custom software, enterprise platforms, and digital solutions engineered by SOFTECH.
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-[#0056D2] text-white shadow-lg'
                : darkMode
                ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#00B4D8] flex flex-col justify-between ${
              darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="relative overflow-hidden bg-slate-900 h-48">
              <img
                src={project.image}
                alt={project.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 text-[10px] font-bold bg-[#0056D2] text-white px-2.5 py-1 rounded shadow-md">
                {project.category}
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold group-hover:text-[#00B4D8] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/50">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono bg-[#0056D2]/10 text-[#00B4D8] px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}