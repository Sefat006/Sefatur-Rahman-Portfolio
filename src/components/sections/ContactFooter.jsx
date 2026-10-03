import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send } from 'lucide-react';
import { FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa';
import { SiCodeforces, SiLeetcode } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const ContactFooter = () => {
  const container = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(() => {
    gsap.from('.contact-item', {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });
  }, { scope: container });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    const { name, email, message } = formData;
    const phoneNumber = "8801843489425";

    // Format message professionally for WhatsApp
    const formattedText = 
      `👋 *Hello Sefat!*\n` +
      `You have a new message from your Portfolio:\n\n` +
      `👤 *Name:* ${name.trim()}\n` +
      `📧 *Email:* ${email.trim()}\n` +
      `💬 *Message:*\n${message.trim()}\n\n` +
      `_Sent via personal portfolio_`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedText)}`;

    // Open WhatsApp in a new tab on desktop or directly launch WhatsApp app on mobile
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

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
    <footer id="contact" ref={container} className="relative z-10 pt-24 pb-12 border-t border-white/5 bg-gradient-to-b from-transparent to-surface/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 mb-20">

          {/* Contact Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="contact-item text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Connect</span>
            </h2>
            <p className="contact-item text-gray-400 mb-5 max-w-md text-sm md:text-base leading-relaxed">
              I'm always open to discussing product design work or partnership opportunities. Let's build something extraordinary together.
            </p>

            <div className="space-y-2.5">
              {[
                { Icon: Mail, text: "sefatur.rahman25@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=sefatur.rahman25@gmail.com", isEmail: true },
                { Icon: FaWhatsapp, text: "01843-489425", href: "https://wa.me/8801843489425" },
                { Icon: FaLinkedin, text: "LinkedIn", href: "https://www.linkedin.com/in/sefatur-rahman/" },
                { Icon: FaGithub, text: "GitHub", href: "https://github.com/sefat006" },
                { Icon: SiCodeforces, text: "Codeforces", href: "https://codeforces.com" },
                { Icon: SiLeetcode, text: "LeetCode", href: "https://leetcode.com/u/SefaturRahman0099/" },
                { Icon: MapPin, text: "Dhaka, Bangladesh", href: null },
              ].map((item, i) => (
                <div key={i} className="contact-item flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                    <item.Icon size={17} />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={item.isEmail ? handleEmailClick : undefined}
                      target={item.isEmail ? '_blank' : '_blank'}
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white text-sm sm:text-base font-medium transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-300 text-sm sm:text-base font-medium">{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 contact-item">
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10">
              <h3 className="text-2xl font-semibold mb-8 text-white/90">Send a Message</h3>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="How can I help you?"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Opening WhatsApp...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Footer Copyright */}
        <div className="contact-item flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sefat. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
