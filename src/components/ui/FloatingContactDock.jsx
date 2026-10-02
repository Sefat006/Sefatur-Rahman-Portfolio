import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';

const FloatingContactDock = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past ~180px
      if (window.scrollY > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Universal email handler: opens Gmail web on desktop or native mail app on mobile
  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = 'sefatur.rahman25@gmail.com';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3"
        >
          {/* Email Button (Gmail Red background with white icon) */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sefatur.rahman25@gmail.com"
            onClick={handleEmailClick}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[#EA4335] text-white shadow-[0_4px_16px_rgba(234,67,53,0.45)] hover:shadow-[0_0_24px_rgba(234,67,53,0.85)] hover:scale-110 active:scale-95 transition-all duration-300 group relative border border-white/20"
            aria-label="Send Email to sefatur.rahman25@gmail.com"
            title="Email"
          >
            <Mail size={20} className="text-white drop-shadow-sm group-hover:scale-110 transition-transform" />
            <span className="hidden sm:group-hover:flex absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 text-white text-xs font-medium whitespace-nowrap shadow-lg pointer-events-none">
              Email
            </span>
          </a>

          {/* WhatsApp Button (WhatsApp Green background with pure white icon) */}
          <a
            href="https://wa.me/8801843489425"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:shadow-[0_0_24px_rgba(37,211,102,0.85)] hover:scale-110 active:scale-95 transition-all duration-300 group relative border border-white/20"
            aria-label="Chat on WhatsApp"
            title="WhatsApp"
          >
            <FaWhatsapp size={23} className="text-white drop-shadow-sm group-hover:scale-110 transition-transform" />
            <span className="hidden sm:group-hover:flex absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 text-white text-xs font-medium whitespace-nowrap shadow-lg pointer-events-none">
              WhatsApp
            </span>
          </a>

          {/* LinkedIn Button (LinkedIn Blue background with pure white icon) */}
          <a
            href="https://www.linkedin.com/in/sefatur-rahman/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[#0A66C2] text-white shadow-[0_4px_16px_rgba(10,102,194,0.45)] hover:shadow-[0_0_24px_rgba(10,102,194,0.85)] hover:scale-110 active:scale-95 transition-all duration-300 group relative border border-white/20"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <FaLinkedinIn size={19} className="text-white drop-shadow-sm group-hover:scale-110 transition-transform" />
            <span className="hidden sm:group-hover:flex absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 text-white text-xs font-medium whitespace-nowrap shadow-lg pointer-events-none">
              LinkedIn
            </span>
          </a>

          {/* Resume Button: Visible exclusively on small devices and mobile (md:hidden) */}
          <a
            href="/resume/Sefatur_Rahman_Resume_General_CS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex md:hidden items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-white border border-white/20 shadow-[0_4px_16px_rgba(139,92,246,0.5)] hover:shadow-[0_0_22px_rgba(139,92,246,0.85)] active:scale-95 transition-all cursor-pointer select-none"
            aria-label="View & Download Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
            </svg>
            <span className="font-bold text-xs text-white tracking-wide">Resume</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContactDock;
