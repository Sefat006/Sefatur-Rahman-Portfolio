import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { isValidUrl } from '../../../data/projectsData';

const ProjectModal = ({ selectedProject, onClose }) => {
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject, onClose]);

  const handleLiveDemo = (e, project) => {
    e.stopPropagation();
    if (project.isOffline || project.liveUrl === '#') {
      Swal.fire({
        title: 'Demo Environment Notice',
        text: 'This full-stack production application is currently hosted locally. Feel free to explore the architecture via the GitHub repository!',
        icon: 'info',
        background: '#111111',
        color: '#fff',
        confirmButtonColor: '#8b5cf6',
        customClass: {
          popup: 'border border-white/10 rounded-2xl',
        }
      });
    } else {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGitHubClick = (e, url) => {
    e.stopPropagation();
    if (!url || url === '#') {
      Swal.fire({
        title: 'Repository Notice',
        text: 'Source code repository link will be available soon!',
        icon: 'info',
        background: '#111111',
        color: '#fff',
        confirmButtonColor: '#8b5cf6',
        customClass: {
          popup: 'border border-white/10 rounded-2xl',
        }
      });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0f0f15] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Banner Image */}
            <div className="relative w-full h-48 sm:h-60 bg-[#0a0a10] overflow-hidden border-b border-white/10">
              {selectedProject.image ? (
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} opacity-30`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f15] via-black/40 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 focus:outline-none"
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              {/* Category & Badge on Banner */}
              <div className="absolute bottom-4 left-5 sm:left-6 flex flex-wrap gap-2 items-center">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-semibold text-primary border border-primary/30">
                  {selectedProject.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white/90 border border-white/15">
                  {selectedProject.badge}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-11rem)] overflow-y-auto custom-scrollbar">
              {/* Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Key Features */}
              {selectedProject.features && (
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-primary" />
                    <span>Key Features & Highlights</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-purple-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              {(() => {
                const modalHasLive = isValidUrl(selectedProject.liveUrl);
                const modalHasGithub = isValidUrl(selectedProject.githubUrl);

                if (!modalHasLive && !modalHasGithub) return null;

                return (
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 w-full">
                    {modalHasLive && (
                      <button
                        type="button"
                        onClick={(e) => handleLiveDemo(e, selectedProject)}
                        className="flex-1 w-full flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-lg shadow-primary/20 active:scale-95"
                      >
                        <ExternalLink size={16} />
                        <span>View Live Website</span>
                      </button>
                    )}
                    {modalHasGithub && (
                      <button
                        type="button"
                        onClick={(e) => handleGitHubClick(e, selectedProject.githubUrl)}
                        className="flex-1 w-full flex items-center justify-center gap-2 py-3 px-5 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-xl font-medium text-sm transition-all duration-200 active:scale-95"
                      >
                        <FaGithub size={16} />
                        <span>View GitHub Source</span>
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
