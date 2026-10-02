import React from 'react';
import './ResumeButton.css';

const ResumeButton = ({
  text = 'Resume',
  tooltip = 'Size: 85KB',
  href = '/resume/Sefatur_Rahman_Resume_General_CS.pdf',
  className = '',
  onClick
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`resume-uiverse-btn ${className}`}
      data-tooltip={tooltip}
      aria-label="View and Download Resume"
      onClick={onClick}
    >
      <div className="button-wrapper">
        <div className="text">{text}</div>
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="20"
            height="20"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
            />
          </svg>
        </span>
      </div>
    </a>
  );
};

export default ResumeButton;
