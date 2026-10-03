import React, { useRef, useEffect } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaBootstrap,
  FaGithub,
  FaGitAlt,
  FaPhp,
  FaLaravel,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiGreensock,
  SiFirebase,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiC,
  SiCplusplus,
} from "react-icons/si";

const techStack = [
  { name: "C", Icon: SiC, color: "text-blue-500" },
  { name: "C++", Icon: SiCplusplus, color: "text-indigo-400" },
  { name: "HTML", Icon: FaHtml5, color: "text-orange-500" },
  { name: "CSS", Icon: FaCss3Alt, color: "text-blue-500" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "text-cyan-400" },
  { name: "Bootstrap", Icon: FaBootstrap, color: "text-purple-500" },
  { name: "GSAP", Icon: SiGreensock, color: "text-green-500" },
  { name: "React", Icon: FaReact, color: "text-cyan-500" },
  { name: "Firebase", Icon: SiFirebase, color: "text-yellow-500" },
  { name: "Node.js", Icon: FaNodeJs, color: "text-green-600" },
  { name: "Express", Icon: SiExpress, color: "text-gray-300" },
  { name: "MongoDB", Icon: SiMongodb, color: "text-green-500" },
  { name: "PHP", Icon: FaPhp, color: "text-indigo-400" },
  { name: "Laravel", Icon: FaLaravel, color: "text-red-500" },
  { name: "MySQL", Icon: SiMysql, color: "text-blue-400" },
  { name: "Git", Icon: FaGitAlt, color: "text-orange-600" },
  { name: "GitHub", Icon: FaGithub, color: "text-white" },
];

const Skills = () => {
  const container = useRef(null);

  // IntersectionObserver for fast, zero-lag scroll entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-4");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "100px 0px 0px 0px",
        threshold: 0.01,
      }
    );

    if (container.current) {
      const animatedElements = container.current.querySelectorAll(".animate-fade-up");
      animatedElements.forEach((el) => {
        el.classList.add("opacity-0", "translate-y-4", "transition-all", "duration-400", "ease-out");
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={container} className="py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Text */}
          <div className="flex-1 skills-header text-center lg:text-left flex flex-col justify-center animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Tech{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Stack
              </span>
            </h2>
            <p className="text-gray-400 text-lg text-justify leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              A comprehensive toolkit for building robust, scalable, and
              beautiful digital experiences. I carefully select the right
              technology for each specific problem to ensure optimal performance
              and maintainability.
            </p>

            {/* Grouped Skills List */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="col-span-2 p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors duration-200">
                <h3 className="font-semibold text-white mb-1 sm:text-left flex items-center gap-2">
                  Problem Solving & DSA
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  Data Structures & Algorithms, Competitive Programming using C and C++
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors duration-200">
                <h3 className="font-semibold text-white mb-1 sm:text-left">
                  Frontend
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  React, HTML, CSS, Tailwind, Bootstrap, GSAP
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors duration-200">
                <h3 className="font-semibold text-white mb-1 sm:text-left">
                  Backend
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  Node.js, Express, PHP, Laravel, Firebase
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors duration-200">
                <h3 className="font-semibold text-white mb-1 sm:text-left">
                  Databases
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  MongoDB, MySQL
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors duration-200">
                <h3 className="font-semibold text-white mb-1 sm:text-left">
                  DevOps & Tools
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">Git, GitHub</p>
              </div>
            </div>
          </div>

          {/* Right Side: Floating Water Container */}
          <div className="flex-1 relative p-4 sm:p-8 rounded-3xl bg-surface/50 border border-white/5 overflow-hidden grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-6 min-h-[400px] content-center w-full animate-fade-up">
            {/* Subtle water reflection background effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>

            {techStack.map((tech, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  animation: `float-slow ${2.5 + (i % 4) * 0.5}s ease-in-out infinite ${(i % 5) * 0.25}s alternate`,
                }}
                className="glass px-2 py-3 sm:px-5 sm:py-4 rounded-xl flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-300 hover:scale-115 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:bg-white/10 hover:z-20 gap-1.5 sm:gap-2 min-w-0 sm:min-w-[100px] transform-gpu"
              >
                {/* Icon size adjusted responsively (w-6 h-6 for small, w-8 h-8 for sm+) */}
                <tech.Icon className={`${tech.color} w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110`} />
                <span className="font-semibold text-gray-300 tracking-wide text-xs sm:text-sm text-center truncate w-full">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
