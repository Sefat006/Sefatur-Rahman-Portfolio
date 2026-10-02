import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  SearchCheck, 
  Wrench, 
  Sparkles, 
  ArrowUpRight,
  Database,
  Layers,
  Zap,
  ShieldCheck
} from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: "Custom Full-Stack Web Development",
    description: "End-to-end web applications engineered with MERN and LAMP stacks. Delivering robust backend APIs, interactive React frontends, secure authentication, and scalable database architecture.",
    tags: ["MERN & LAMP", "REST APIs", "Full-Stack"],
    gradient: "from-blue-500 via-indigo-500 to-cyan-400",
    glowColor: "rgba(59, 130, 246, 0.15)",
    icon: (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all" />
        <div className="relative w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300">
          <Code2 size={24} className="animate-pulse" />
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Website Redesign & Feature Integration",
    description: "Transform outdated sites into modern, high-converting platforms. Enhancing user experience with luxury aesthetics, mobile responsiveness, payment gateways, and custom module integrations.",
    tags: ["Modern UI/UX", "Feature Addons", "Responsive"],
    gradient: "from-purple-500 via-violet-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.15)",
    icon: (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all" />
        <div className="relative w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300">
          <Palette size={24} />
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "SEO-Optimized Web Architecture",
    description: "Building fast, discoverable websites structured with semantic HTML5, clean hierarchy, optimized Core Web Vitals, and lightning performance to elevate search engine rankings and organic reach.",
    tags: ["Core Web Vitals", "Semantic SEO", "Fast Speed"],
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    glowColor: "rgba(16, 185, 129, 0.15)",
    icon: (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all" />
        <div className="relative w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-300">
          <SearchCheck size={24} />
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Website Maintenance & Technical Support",
    description: "Reliable post-deployment maintenance, security hardening, bug fixes, server troubleshooting, and continuous performance tuning to keep your web infrastructure running 24/7 without friction.",
    tags: ["Bug Fixing", "Security Hardening", "Uptime Support"],
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    glowColor: "rgba(245, 158, 11, 0.15)",
    icon: (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all" />
        <div className="relative w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:text-amber-300 transition-all duration-300">
          <Wrench size={24} />
        </div>
      </div>
    )
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-24 relative z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>What I Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            High-impact web engineering solutions tailored to scale businesses, enhance digital experiences, and drive measurable results.
          </p>
        </motion.div>

        {/* 2 Cards per row on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-3.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl flex flex-col h-full border border-white/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 relative group overflow-hidden"
            >
              {/* Top Accent Gradient Border Glow */}
              <div 
                className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${service.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} 
              />

              {/* Ambient Card Backlight */}
              <div 
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: service.glowColor }}
              />

              {/* Service Icon: Centered on mobile, left-aligned on other devices */}
              <div className="mb-3 sm:mb-5 flex justify-center sm:justify-start">
                {service.icon}
              </div>

              {/* Title: Centered on mobile, original layout on other devices */}
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors flex items-center sm:items-start justify-center sm:justify-between text-center sm:text-left gap-1 sm:gap-2">
                <span>{service.title}</span>
                <ArrowUpRight size={18} className="text-gray-600 group-hover:text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-0.5" />
              </h3>

              {/* Short Description: Justified text */}
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow text-justify">
                {service.description}
              </p>

              {/* Tags / Highlights: Centered on mobile, left-aligned on other devices */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-auto pt-3 sm:pt-4 border-t border-white/5 justify-center sm:justify-start">
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-medium text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
