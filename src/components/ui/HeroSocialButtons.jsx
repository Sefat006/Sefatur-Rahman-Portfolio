import React from 'react';
import './HeroSocialButtons.css';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/sefat006',
    childClass: 'child-github',
    title: 'GitHub - @sefat006',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#181717" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sefatur-rahman/',
    childClass: 'child-linkedin',
    title: 'LinkedIn - Sefatur Rahman',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#0A66C2" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    )
  },
  {
    name: 'Codeforces',
    url: 'https://codeforces.com',
    childClass: 'child-codeforces',
    title: 'Codeforces',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect x="2" y="9.5" width="4.8" height="11.5" rx="1.5" fill="#F4B400" />
        <rect x="9.6" y="3.5" width="4.8" height="17.5" rx="1.5" fill="#4285F4" />
        <rect x="17.2" y="6.5" width="4.8" height="14.5" rx="1.5" fill="#EA4335" />
      </svg>
    )
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/SefaturRahman0099/',
    childClass: 'child-leetcode',
    title: 'LeetCode - @SefaturRahman0099',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.794l3.76-4.028 5.406-5.788c.54-.54.54-1.414 0-1.955A1.378 1.378 0 0 0 13.483 0z" fill="#E7A41E" />
        <path d="M9.828 14.546a1.38 1.38 0 0 0-.978.404L5.617 18.2a1.38 1.38 0 0 0 0 1.955 1.38 1.38 0 0 0 1.955 0l3.233-3.25a1.38 1.38 0 0 0-.977-2.359z" fill="#FFA116" />
        <path d="M18.8 11.5H8.7a1.4 1.4 0 1 0 0 2.8h10.1a1.4 1.4 0 1 0 0-2.8z" fill="#FFA116" />
      </svg>
    )
  }
];

const HeroSocialButtons = () => {
  return (
    <div className="social-3d-parent">
      {socialLinks.map((item) => (
        <div key={item.name} className={`social-3d-child ${item.childClass}`}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-3d-btn"
            aria-label={item.name}
            title={item.title}
          >
            {item.icon}
          </a>
        </div>
      ))}
    </div>
  );
};

export default HeroSocialButtons;
