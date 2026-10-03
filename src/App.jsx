import React, { useState, useEffect } from 'react';
import Loader from './components/ui/Loader';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import AllProjectsPage from './components/sections/AllProjectsPage';
import ContactFooter from './components/sections/ContactFooter';
import ThreeBackground from './components/backgrounds/ThreeBackground';
import About from './components/sections/about/About';
import Services from './components/sections/Services';
import Clients from './components/sections/Clients';
import WorkProcess from './components/sections/WorkProcess';
import StarsGalaxyBackground from './components/backgrounds/StarsGalaxyBackground';
import FloatingContactDock from './components/ui/FloatingContactDock';

function App() {
  const [loading, setLoading] = useState(true);

  // Sync initial page with URL
  const getInitialPage = () => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/projects' || window.location.hash === '#all-projects') {
        return 'all-projects';
      }
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handleNavigation = () => {
      if (window.location.pathname === '/projects' || window.location.hash === '#all-projects') {
        setCurrentPage('all-projects');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  const navigateToAllProjects = () => {
    window.history.pushState({}, '', '/projects');
    setCurrentPage('all-projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/#projects');
    setCurrentPage('home');
    setTimeout(() => {
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-primary/30">
      {loading && <Loader />}

      {currentPage === 'all-projects' ? (
        <AllProjectsPage onBack={navigateToHome} />
      ) : (
        <>
          <ThreeBackground />
          <Navbar />
          
          <main className="relative">
            {/* Sticky Hero: Pinned behind as lower section overflows on top */}
            <div className="sticky top-0 z-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
              <Hero />
            </div>

            {/* Lower Content Wrapper: Overflows and slides OVER the Hero on scroll */}
            <div className="relative z-10 bg-background rounded-t-[36px] sm:rounded-t-[48px] border-t border-white/10 shadow-[0_-30px_70px_rgba(0,0,0,0.95)]">
              {/* Subtle curtain pill indicator */}
              <div className="flex justify-center pt-3.5 pb-1">
                <div className="w-12 h-1 rounded-full bg-white/20" />
              </div>

              <About />
              <Experience />

              {/* Fixed Stars Galaxy Background: Seamlessly active from Featured Projects all the way down to Footer */}
              <StarsGalaxyBackground />

              <Projects onNavigateToAllProjects={navigateToAllProjects} />
              <Skills />
              <Services />
              <Clients />
              <WorkProcess />
              <ContactFooter />
            </div>
          </main>
        </>
      )}

      {/* Floating Bottom-Right Contact & Resume Dock on Scroll */}
      <FloatingContactDock />
    </div>
  );
}

export default App;
