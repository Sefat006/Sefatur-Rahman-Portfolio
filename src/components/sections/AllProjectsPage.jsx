import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, FolderKanban, Layers, ExternalLink } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import ProjectCard from './projects/ProjectCard';
import ProjectModal from './projects/ProjectModal';
import StarsGalaxyBackground from '../backgrounds/StarsGalaxyBackground';

const AllProjectsPage = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Extract unique categories for filter tabs
  const categories = useMemo(() => {
    const set = new Set();
    projectsData.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsData;
    return projectsData.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleBackToHome = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.pushState({}, '', '/');
      window.location.hash = '#projects';
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen text-white font-sans bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Background Ambience */}
      <StarsGalaxyBackground />

      {/* Decorative ambient gradient glows */}
      <div className="fixed top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[400px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBackToHome}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium active:scale-95"
          >
            <ArrowLeft size={16} className="text-primary group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Showing</span>
            <span className="font-semibold text-white">{filteredProjects.length}</span>
            <span>of {projectsData.length} Projects</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-20 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Sparkles size={14} />
            <span>Complete Project Archive</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Projects</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
            A comprehensive catalog of enterprise applications, full-stack web platforms, client solutions, and customized software systems built with modern technologies.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const count = category === 'All' 
              ? projectsData.length 
              : projectsData.filter(p => p.category === category).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.35)]' 
                    : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border-white/10'
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-gray-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid: Identical style to homepage */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-[1500px]"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx} 
                onSelectProject={setSelectedProject} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Back Button & Footer CTA */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Looking for a tailored solution?</h3>
            <p className="text-sm text-gray-400">Let's collaborate to build something remarkable together.</p>
          </div>
          <button
            type="button"
            onClick={handleBackToHome}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-primary/20 active:scale-95"
          >
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </button>
        </div>
      </main>

      {/* Project Details Modal Pop-up */}
      <ProjectModal 
        selectedProject={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

export default AllProjectsPage;
