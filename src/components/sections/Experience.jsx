import React, { useRef, useEffect } from "react";
import ParticleGlobe from "../backgrounds/ParticleGlobe";

const experienceData = [
  {
    id: 1,
    title: "Web Developer & Junior Consultant",
    subtitle: "Dhaka Study Abroad",
    year: "NOW",
    period: "Apr 2026 - Present",
    description:
      "Joined Dhaka Study Abroad, an educational student consultancy agency, in April 2026 as a Junior Consultant and Web Developer. Guiding students through global education paths along with building and scaling the company's official website.",
  },
  {
    id: 2,
    title: "Web Developer (Remote)",
    subtitle: "IT PORI",
    year: "2025",
    period: "Nov 2025 - Present",
    description:
      "Joined IT PORI in November 2025 as a remote Web Developer. Mastered PHP and Laravel on the job, engineering scalable real-world client projects and developing full-stack web solutions.",
  },
  {
    id: 3,
    title: "MERN Stack Development",
    subtitle: "Self-taught Web Development",
    year: "2023-24",
    period: "2023 - 2024",
    description:
      "Started web development journey in 2023. Mastered full-stack MERN (MongoDB, Express.js, React, Node.js) development through 2024, building complete responsive web applications and RESTful APIs.",
  },
  {
    id: 4,
    title: "Video Editor",
    subtitle: "Photo Factory Agency",
    year: "2023",
    period: "Dec 2023 - Feb 2024",
    description:
      "Learned professional video editing using Adobe Premiere Pro at the creative agency 'Photo Factory', working on commercial and creative video editing projects.",
  },
  {
    id: 5,
    title: "CSE Student & Problem Solver",
    subtitle: "Academic Journey & DSA",
    year: "2022",
    period: "2022 - Present",
    description:
      "Took admission in Computer Science & Engineering (CSE) in 2021. Learned C and C++, practicing Data Structures & Algorithms, and engaging in continuous problem-solving.",
  },
];

const Experience = () => {
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const fillLineRef = useRef(null);

  // Smooth scroll tracking for the vertical timeline dot and glowing fill line
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start when container top enters 65% of viewport, reach end at 40%
      const startPoint = windowHeight * 0.65;
      const endPoint = windowHeight * 0.4;
      const totalDistance = rect.height + (startPoint - endPoint);
      const currentDistance = startPoint - rect.top;

      const progress = Math.min(Math.max(currentDistance / totalDistance, 0), 1);
      const percentage = `${progress * 100}%`;

      if (dotRef.current) {
        dotRef.current.style.top = percentage;
      }
      if (fillLineRef.current) {
        fillLineRef.current.style.height = percentage;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-2');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px 0px 0px 0px',
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.exp-fade-item');
      items.forEach((item, index) => {
        item.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-400', 'ease-out');
        item.style.transitionDelay = `${index * 70}ms`;
        observer.observe(item);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen bg-black text-white py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* 3D Particle Globe Background (Full width, centered, borderless) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
        <ParticleGlobe />
      </div>

      {/* Subtle ambient center glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 sm:w-96 md:w-[500px] h-80 sm:h-96 md:h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse transform-gpu" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            My Learning &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-primary">
              experiences
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            A chronological timeline of my learning journey and professional milestones.
          </p>
        </div>

        {/* Timeline Container with natural, comfortable gaps */}
        <div
          ref={containerRef}
          className="relative flex flex-col gap-5 sm:gap-6 md:gap-7"
        >
          {/* Main Vertical Timeline Track Line (In the back) */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 z-0 pointer-events-none overflow-hidden">
            {/* Active filled glowing line following the dot */}
            <div
              ref={fillLineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-400 via-primary to-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.7)]"
              style={{ height: '0%' }}
            />
          </div>

          {/* Animated Glowing Dot attached to scroll */}
          <div
            ref={dotRef}
            style={{ top: '0%' }}
            className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_20px_6px_rgba(168,85,247,0.8)] z-10 pointer-events-none transform-gpu"
          >
            <span className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-75" />
            <span className="relative block w-full h-full rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>

          {/* Experience Items List - Direct visibility with right-side border only */}
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="exp-fade-item relative w-full pl-10 sm:pl-14 md:pl-0 z-10"
            >
              {/* Static Anchor Node on the timeline (In the back) */}
              <div className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 top-5 md:top-1/2 md:-translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#0a0a0a] border-2 border-purple-500/70 shadow-[0_0_10px_rgba(168,85,247,0.4)] z-0" />

              {/* Experience Card with Right-side border only */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full p-4 sm:p-5 md:py-4 md:px-6 rounded-r-2xl border-r-2 sm:border-r-[3px] border-r-purple-500/50 hover:border-r-purple-400 bg-gradient-to-r from-transparent via-purple-950/[0.08] to-purple-900/[0.18] hover:to-purple-900/[0.28] transition-all duration-300 shadow-[4px_0_15px_-3px_rgba(168,85,247,0.15)] hover:shadow-[6px_0_25px_-2px_rgba(168,85,247,0.35)] group transform-gpu">
                {/* Mobile Year & Period Badge (Shown on mobile above title) */}
                <div className="md:hidden flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                    {exp.year}
                  </span>
                  <span className="text-[11px] text-purple-300/80 font-medium bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                    {exp.period}
                  </span>
                </div>

                {/* Left Column (Role & Subtitle) */}
                <div className="w-full md:w-5/12 flex flex-col md:text-right md:pr-6 lg:md:pr-10 mb-1.5 md:mb-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 tracking-tight leading-snug group-hover:text-purple-200 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-purple-400 font-semibold text-xs sm:text-sm mt-0.5">
                    {exp.subtitle}
                  </p>
                </div>

                {/* Center Column: Year & Period Badge (Desktop only, in front of the line) */}
                <div className="hidden md:flex md:w-2/12 flex-col justify-center items-center z-10 relative">
                  <div className="px-4 py-1 rounded-full bg-[#0d0d12]/95 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.35)] md:backdrop-blur-md">
                    <span className="text-base lg:text-lg font-bold tracking-wider text-gray-100">
                      {exp.year}
                    </span>
                  </div>
                  {/* Time Period underneath the year */}
                  <span className="text-[11px] text-purple-300/90 font-medium mt-1 whitespace-nowrap bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.2)]">
                    {exp.period}
                  </span>
                </div>

                {/* Right Column (Description) */}
                <div className="w-full md:w-5/12 md:pl-6 lg:md:pl-10 text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {exp.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;