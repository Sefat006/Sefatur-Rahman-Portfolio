import React, { useRef, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

// Custom Pure CSS Animated SVGs for each step
const DiscoveryCallIcon = ({ color }) => (
  <div className="relative w-7 h-7 flex items-center justify-center">
    {/* Radiating sound/call waves */}
    <span className="absolute -right-0.5 -top-0.5 w-2 h-2 rounded-full border border-sky-400 animate-ping opacity-75" />
    {/* Phone / Call SVG with subtle ringing animation */}
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-[pulse_2s_ease-in-out_infinite]"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  </div>
);

const ProposalContractIcon = ({ color }) => (
  <div className="relative w-7 h-7 flex items-center justify-center">
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="12" x2="16" y2="12" opacity="0.4" />
      <line x1="8" y1="16" x2="13" y2="16" opacity="0.4" />
      <path
        d="M9 15l2 2 4-4"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse"
      />
    </svg>
  </div>
);

const BuildIterateIcon = ({ color }) => (
  <div className="relative w-7 h-7 flex items-center justify-center">
    {/* Rotating Iteration Loop */}
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-[spin_6s_linear_infinite]"
    >
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" strokeDasharray="2 3" opacity="0.5" />
    </svg>
    {/* Pulsing Code Brackets */}
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    </div>
  </div>
);

const LaunchSupportIcon = ({ color }) => (
  <div className="relative w-7 h-7 flex items-center justify-center">
    {/* Floating Launch Rocket */}
    <div className="animate-[bounce_2s_ease-in-out_infinite]">
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    </div>
    {/* Animated exhaust thrust sparkle */}
    <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-emerald-400 blur-[2px] animate-ping" />
  </div>
);

const workflowSteps = [
  {
    step: "01",
    title: "Discovery Call",
    subtitle: "Consultation & Goals",
    description: "Free 30-minute consultation to understand your goals, budget, and vision.",
    icon: DiscoveryCallIcon,
    color: "#38bdf8", // Sky blue
    pingColor: "bg-sky-400",
    gradient: "from-sky-500 to-blue-600",
    glowColor: "rgba(56, 189, 248, 0.15)"
  },
  {
    step: "02",
    title: "Custom Proposal & Contract Finalization",
    subtitle: "Scope & Timeline",
    description: "Clear scope, timeline, and pricing. No hidden costs, no vague promises.",
    icon: ProposalContractIcon,
    color: "#a855f7", // Purple
    pingColor: "bg-purple-400",
    gradient: "from-purple-500 to-indigo-600",
    glowColor: "rgba(168, 85, 247, 0.15)"
  },
  {
    step: "03",
    title: "Build and Iterate",
    subtitle: "Milestone Sprints",
    description: "Rapid development with regular updates. You stay in the loop at every milestone.",
    icon: BuildIterateIcon,
    color: "#ec4899", // Pink
    pingColor: "bg-pink-400",
    gradient: "from-pink-500 to-rose-600",
    glowColor: "rgba(236, 72, 153, 0.15)"
  },
  {
    step: "04",
    title: "Launch and Support",
    subtitle: "Deploy & Team Training",
    description: "deploy your project, train your team and support you after launch.",
    icon: LaunchSupportIcon,
    color: "#10b981", // Emerald
    pingColor: "bg-emerald-400",
    gradient: "from-emerald-400 to-teal-600",
    glowColor: "rgba(168, 185, 129, 0.15)"
  }
];

const WorkProcess = () => {
  const container = useRef(null);
  const mobileTimelineRef = useRef(null);
  const mobileDotRef = useRef(null);
  const mobileLineRef = useRef(null);

  // Smooth scroll tracking for the mobile vertical timeline glowing dot and active rail
  useEffect(() => {
    let ticking = false;

    const updateMobileScroll = () => {
      if (!mobileTimelineRef.current) return;
      const rect = mobileTimelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startPoint = windowHeight * 0.75;
      const endPoint = windowHeight * 0.45;
      const totalDistance = rect.height + (startPoint - endPoint);
      const currentDistance = startPoint - rect.top;

      const progress = Math.min(Math.max(currentDistance / totalDistance, 0), 1);
      const percentage = `${progress * 100}%`;

      if (mobileDotRef.current) {
        mobileDotRef.current.style.top = percentage;
      }
      if (mobileLineRef.current) {
        mobileLineRef.current.style.height = percentage;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateMobileScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateMobileScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pure IntersectionObserver for instant entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-4');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px 0px 0px 0px',
        threshold: 0.01
      }
    );

    if (container.current) {
      const items = container.current.querySelectorAll('.process-fade-item');
      items.forEach((item, index) => {
        item.classList.add('opacity-0', 'translate-y-3', 'transition-all', 'duration-300', 'ease-out');
        item.style.transitionDelay = `${index * 40}ms`;
        observer.observe(item);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={container} className="py-20 lg:py-24 relative z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none -z-0 transform-gpu" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Heading */}
        <div className="process-fade-item text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>Workflow & Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            How I <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A battle-tested 4-step framework guaranteeing transparency, precision, and predictable delivery from the very first meeting to project launch.
          </p>
        </div>

        {/* MOBILE VIEW (< lg): Vertical timeline with moving glowing dot and active rail */}
        <div ref={mobileTimelineRef} className="lg:hidden relative flex flex-col gap-6 sm:gap-7">
          {/* Vertical Track Rail on the Left */}
          <div className="absolute left-3.5 sm:left-5 top-5 bottom-8 w-[2px] -translate-x-1/2 bg-white/10 z-0 pointer-events-none overflow-hidden">
            {/* Active Gradient Fill Progress Line */}
            <div
              ref={mobileLineRef}
              style={{ height: '0%' }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-sky-400 via-purple-500 to-emerald-400 shadow-[0_0_12px_#a855f7]"
            />
          </div>

          {/* Moving Glowing Dot as Scroll Goes Down */}
          <div
            ref={mobileDotRef}
            style={{ top: '0%' }}
            className="absolute left-3.5 sm:left-5 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_18px_6px_#22d3ee,0_0_30px_10px_#a855f7] z-20 pointer-events-none transform-gpu"
          >
            <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <span className="relative block w-full h-full rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>

          {/* Vertical Step Cards List */}
          {workflowSteps.map((step) => {
            const StepIconComponent = step.icon;
            return (
              <div key={step.step} className="relative w-full pl-8 sm:pl-12">
                {/* Static Step Node on the Left Vertical Rail */}
                <div
                  className="absolute left-3.5 sm:left-5 -translate-x-1/2 top-6 w-3.5 h-3.5 rounded-full bg-[#0b0b12] border-2 shadow-[0_0_10px_currentColor] z-10 flex items-center justify-center"
                  style={{ borderColor: step.color, color: step.color }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: step.color }}
                  />
                </div>

                {/* Card Container */}
                <div className="process-fade-item glass-card p-5 sm:p-6 rounded-2xl flex flex-col border border-white/10 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 relative group overflow-hidden transform-gpu">
                  {/* Top Accent Gradient Border */}
                  <div
                    className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${step.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Card Backlight */}
                  <div
                    className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: step.glowColor }}
                  />

                  {/* Header: Phase badge & Animated SVG Icon */}
                  <div className="flex items-center justify-between mb-4 w-full">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border"
                        style={{
                          borderColor: `${step.color}40`,
                          backgroundColor: `${step.color}15`,
                          color: step.color,
                        }}
                      >
                        Step {step.step}
                      </span>
                    </div>

                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                      style={{
                        borderColor: `${step.color}40`,
                        backgroundColor: `${step.color}15`,
                      }}
                    >
                      <StepIconComponent color={step.color} />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors text-left">
                    {step.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="text-xs font-medium mb-3 tracking-wide text-left"
                    style={{ color: step.color }}
                  >
                    {step.subtitle}
                  </p>

                  {/* Description: Justified */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-justify">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP VIEW (lg:block): Horizontal 4-in-a-row layout with pure CSS traveling laser light */}
        <div className="hidden lg:block relative">
          {/* Connecting Laser Beam Line */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-white/10 z-0 overflow-hidden">
            <div
              style={{ animation: 'laser-beam 3.5s linear infinite' }}
              className="h-full w-36 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] shadow-[0_0_15px_#22d3ee] transform-gpu"
            />
          </div>

          {/* 4 Cards in a Row on Desktop */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {workflowSteps.map((step, index) => {
              const StepIconComponent = step.icon;
              return (
                <div
                  key={step.step}
                  className="process-fade-item glass-card p-6 rounded-2xl flex flex-col h-full border border-white/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 relative group overflow-hidden transform-gpu"
                >
                  {/* Top Accent Gradient Border Glow */}
                  <div
                    className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${step.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Ambient Card Backlight */}
                  <div
                    className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: step.glowColor }}
                  />

                  {/* Top Header: Step Indicator with Glowing Dot + Animated SVG Icon */}
                  <div className="flex items-center justify-between mb-5 w-full">
                    {/* Glowing Dot + Step Number */}
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <div
                          className="absolute inset-0 rounded-full blur-sm opacity-50 animate-pulse"
                          style={{ backgroundColor: step.color }}
                        />
                        <div
                          className="relative w-2.5 h-2.5 rounded-full z-10"
                          style={{
                            backgroundColor: step.color,
                            boxShadow: `0 0 10px ${step.color}, 0 0 20px ${step.color}`,
                          }}
                        />
                      </div>

                      <span className="text-xs font-bold tracking-wider uppercase text-gray-400">
                        Step {step.step}
                      </span>
                    </div>

                    {/* Step Animated SVG Icon Badge */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                      style={{
                        borderColor: `${step.color}40`,
                        backgroundColor: `${step.color}15`,
                      }}
                    >
                      <StepIconComponent color={step.color} />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-primary transition-colors text-left">
                    {step.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="text-xs font-medium mb-3.5 tracking-wide text-left"
                    style={{ color: step.color }}
                  >
                    {step.subtitle}
                  </p>

                  {/* Description: Justified text */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow text-justify">
                    {step.description}
                  </p>

                  {/* Bottom Step Indicator Bar */}
                  <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="font-mono">Step 0{index + 1} / 04</span>
                    {index < 3 ? (
                      <span className="inline-flex items-center gap-1 text-gray-500 group-hover:text-primary transition-colors">
                        Next Step <ArrowRight size={12} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                        Launch &amp; Scale ✨
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
