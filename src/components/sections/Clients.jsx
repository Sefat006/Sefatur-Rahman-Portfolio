import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Building2 } from 'lucide-react';
import astana from '../../assets/clients/astana.webp';
import dhakaStudyAbroad from '../../assets/clients/dhaka-study-abroad.webp';
import interSpaceBd from '../../assets/clients/inter-space-bd.webp';
import newMultiTech from '../../assets/clients/new-multi-tech.webp';
import pacificFood from '../../assets/clients/pacific-food.webp';
import travelsBangla from '../../assets/clients/travels-bangla.webp';
import vapePark from '../../assets/clients/vapepark.webp';

const clientsData = [
  {
    id: 1,
    name: "New MultiTech International",
    logo: newMultiTech,
    category: "Industrial Equipment",
    url: "https://www.newmultitechint.com/"
  },
  {
    id: 2,
    name: "Travels Bangla",
    logo: travelsBangla,
    category: "Travel & Tourism",
    url: "https://travelsbangla.com/"
  },
  {
    id: 3,
    name: "Astana Resort",
    logo: astana,
    category: "Resort & Hospitality",
    url: "https://astana-mtnl.com/"
  },
  {
    id: 4,
    name: "Inter Space BD",
    logo: interSpaceBd,
    category: "Civil Engineering",
    url: "https://www.inter-bd.com/pages/index.php"
  },
  {
    id: 5,
    name: "Dhaka Study Abroad",
    logo: dhakaStudyAbroad,
    category: "Higher Education Consultancy",
    url: "https://dhakastudyabroad.com/"
  },
  {
    id: 6,
    name: "Pacific Food BD",
    logo: pacificFood,
    category: "E-commerce & Foods",
    url: "https://pacificfoodbd.com/"
  },
  {
    id: 7,
    name: "Vape Park",
    logo: vapePark,
    category: "E-Commerce Retail",
    url: "https://vapeparkbd.com/"
  }
];

// Duplicate list to make infinite continuous marquee seamless
const marqueeList = [...clientsData, ...clientsData, ...clientsData, ...clientsData];

const Clients = () => {
  return (
    <section id="clients" className="py-20 sm:py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center mb-12 sm:mb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
        >
          <Building2 size={14} />
          <span>Proud Collaborations</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
        >
          Companies <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">I've Worked With</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          Trusted by growing businesses, corporate agencies, and startups to craft high-performance digital platforms and web systems.
        </motion.p>
      </div>

      {/* Marquee Carousel Track (Right to Left) */}
      <div className="relative w-full overflow-hidden py-4 group">
        {/* Left smooth fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-52 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />

        {/* Right smooth fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-52 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

        {/* Continuous Marquee Rail moving right-to-left */}
        <div className="animate-marquee-left flex items-center gap-5 sm:gap-7">
          {marqueeList.map((client, index) => {
            const hasUrl = Boolean(client.url && client.url !== '#');

            return (
              <a
                key={`${client.id}-${index}`}
                href={hasUrl ? client.url : undefined}
                target={hasUrl ? "_blank" : undefined}
                rel={hasUrl ? "noopener noreferrer" : undefined}
                className={`flex-shrink-0 w-52 sm:w-64 h-28 sm:h-32 bg-white rounded-2xl p-4 sm:p-5 flex items-center justify-center shadow-lg shadow-black/30 border border-gray-100 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 group/card select-none cursor-pointer relative`}
                title={`${client.name} - ${client.category}`}
              >
                {/* Real Authentic Logo - Clean White Background, No Dark Mode filters */}
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain filter-none transform transition-transform duration-300 group-hover/card:scale-105"
                  loading="lazy"
                />

                {/* Subtle external link icon on hover if link exists */}
                {hasUrl && (
                  <span className="absolute top-2.5 right-2.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 bg-black/60 rounded-full p-1 text-white shadow">
                    <ExternalLink size={12} />
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Clients;
