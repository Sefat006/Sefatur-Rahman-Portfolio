import React from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { isValidUrl, DESCRIPTION_LIMIT } from '../../../data/projectsData';

const ProjectCard = ({ project, index = 0, onSelectProject }) => {
  const isLongDescription = project.description.length > DESCRIPTION_LIMIT;
  const shortDescription = isLongDescription
    ? `${project.description.slice(0, DESCRIPTION_LIMIT)}...`
    : project.description;
  const hasLive = isValidUrl(project.liveUrl);
  const hasGithub = isValidUrl(project.githubUrl);

  const handleLiveDemo = (e) => {
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

  const handleGitHubClick = (e) => {
    e.stopPropagation();
    if (!project.githubUrl || project.githubUrl === '#') {
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
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power1.out",
      duration: 0.3
    });
  };

  const handleCardMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.5
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onClick={() => onSelectProject(project)}
      className="project-card glass-card p-0 overflow-hidden flex flex-col h-full transform-gpu cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group relative"
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
    >
      {/* Full Image Area - No padding, No border */}
      <div 
        onClick={() => onSelectProject(project)}
        className="w-full h-48 sm:h-56 relative group/thumb cursor-pointer overflow-hidden bg-[#0d0d14]"
      >
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.gradient} opacity-25 flex items-center justify-center`}>
            <div className="w-24 h-24 rounded-full border border-white/15 animate-[spin_12s_linear_infinite]" />
            <div className="absolute w-16 h-16 rounded-full border-t-2 border-b-2 border-primary animate-[spin_5s_linear_infinite_reverse]" />
          </div>
        )}

        {/* Subtle dark vignette at the bottom for smooth blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16]/80 via-transparent to-transparent pointer-events-none" />

        {/* Category / Badge Pills */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white/95 border border-white/15 flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {project.badge}
        </div>

        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-gray-200 border border-white/15 shadow-md">
          {project.stack[0]}
        </div>

        {/* Hover Overlay Hint */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-xs font-medium text-white pointer-events-none">
          <Eye size={16} className="text-primary" />
          <span>Click to view details</span>
        </div>
      </div>

      {/* Card Content with Inner Padding */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        {/* Title & Category */}
        <div className="mb-2">
          <span className="text-xs font-semibold text-primary/90 uppercase tracking-wide">
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-200 mt-1 flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight size={18} className="text-gray-500 group-hover:text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
          </h3>
        </div>

        {/* Description with "Read more" if long */}
        <div className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">
          <span>{shortDescription}</span>
          {isLongDescription && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectProject(project);
              }}
              className="ml-1.5 text-primary hover:text-purple-300 font-medium text-xs inline-flex items-center gap-0.5 hover:underline focus:outline-none"
            >
              Read more
            </button>
          )}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.slice(0, 4).map((tech, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-400">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        {(hasLive || hasGithub) && (
          <div className="flex items-center gap-3 pt-3 border-t border-white/5 mt-auto w-full">
            {hasLive && (
              <button 
                type="button"
                onClick={handleLiveDemo}
                className="flex-1 w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-primary/20 hover:bg-primary/30 text-primary hover:text-white border border-primary/30 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95"
              >
                <ExternalLink size={15} />
                <span>Live</span>
              </button>
            )}
            {hasGithub && (
              <button 
                type="button"
                onClick={handleGitHubClick}
                className="flex-1 w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/10 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95"
              >
                <FaGithub size={15} />
                <span>GitHub</span>
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
