import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Briefcase, 
  FolderKanban, 
  Cpu, 
  Layers, 
  Workflow, 
  Mail,
  Building2
} from 'lucide-react';
import ResumeButton from '../ui/ResumeButton';

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Projects', href: '#projects', icon: FolderKanban },
  { name: 'Skills', href: '#skills', icon: Cpu },
  { name: 'Services', href: '#services', icon: Layers },
  { name: 'Clients', href: '#clients', icon: Building2 },
  { name: 'Process', href: '#process', icon: Workflow },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/40 border-b border-gray-800"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 max-w-7xl mx-auto">
        {/* Logo Slot with Branded Loader S Icon */}
        <a 
          href="#home" 
          className="text-lg sm:text-xl font-bold tracking-tight text-white cursor-pointer select-none flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 rounded-lg bg-[#0b0b12] border border-primary/50 flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.4)] group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(139,92,246,0.7)] transition-all">
            <span className="font-black text-sm bg-gradient-to-br from-white via-primary to-purple-400 bg-clip-text text-transparent leading-none select-none">
              S
            </span>
          </div>
          <span>Sefatur Rahman</span>
        </a>

        {/* Desktop Navigation with Icons */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-gray-400">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-1.5 hover:text-white transition-colors text-xs xl:text-sm font-medium group py-1"
              >
                <Icon size={14} className="text-gray-500 group-hover:text-primary transition-colors duration-200" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA: Animated Resume Button with sliding text, download icon, and tooltip */}
        <div className="hidden md:block">
          <ResumeButton />
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="lg:hidden text-gray-400 hover:text-white p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Content with Icons */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-gray-800 bg-black/90 backdrop-blur-xl"
        >
          <div className="flex flex-col px-6 py-4 space-y-2 text-gray-300">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 hover:text-white transition-colors font-medium py-2.5 border-b border-gray-800/80 last:border-none group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/40 transition-colors">
                    <Icon size={16} />
                  </div>
                  <span className="text-sm">{item.name}</span>
                </a>
              );
            })}

            {/* Mobile Animated Resume Button */}
            <div className="pt-3 pb-1 flex justify-center">
              <ResumeButton onClick={() => setIsOpen(false)} />
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
