import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import ProjectCard from './projects/ProjectCard';
import ProjectModal from './projects/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ onNavigateToAllProjects }) => {
  const container = useRef();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive device breakpoint detection: mobile (< 768px) vs desktop (>= 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Display 3 projects on mobile, 6 on desktop and larger devices
  const visibleLimit = isMobile ? 3 : 6;
  const displayedProjects = projectsData.slice(0, visibleLimit);

  const handleShowAll = () => {
    if (onNavigateToAllProjects) {
      onNavigateToAllProjects();
    } else {
      window.history.pushState({}, '', '/projects');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section id="projects" ref={container} className="py-24 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="projects-title text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            A curated selection of production-ready applications, modern SaaS dashboards, and full-stack solutions.
          </p>
        </motion.div>

        {/* Responsive Grid: 1 column on mobile, 2 columns on tablet, 3 in a row on desktop */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-[1500px]">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelectProject={setSelectedProject}
            />
          ))}
        </div>

        {/* Show All Projects CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 sm:mt-16 flex flex-col items-center justify-center gap-3 text-center"
        >
          <button
            type="button"
            onClick={handleShowAll}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/20 via-purple-600/30 to-primary/20 hover:from-primary/30 hover:via-purple-600/40 hover:to-primary/30 border border-primary/40 hover:border-primary/70 text-white font-semibold text-base transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.25)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] active:scale-95 overflow-hidden"
          >
            {/* Shimmer animation */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
            
            <span className="relative z-10 flex items-center gap-2.5">
              <span>Show All Projects</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/30 text-purple-200 border border-primary/40">
                {projectsData.length}
              </span>
              <ArrowRight size={18} className="text-primary group-hover:translate-x-1.5 transition-transform duration-200" />
            </span>
          </button>
          <p className="text-xs text-gray-500">
            Showing {displayedProjects.length} of {projectsData.length} projects &bull; Click to view full archive
          </p>
        </motion.div>
      </div>

      {/* Project Details Modal Pop-up */}
      <ProjectModal
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
