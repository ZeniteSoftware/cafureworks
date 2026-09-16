import React from 'react';

export const XpWallpaper: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="bliss-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B56A4" />
            <stop offset="35%" stopColor="#2582D3" />
            <stop offset="65%" stopColor="#5EA9E8" />
            <stop offset="100%" stopColor="#A8D6FA" />
          </linearGradient>

          {/* Rolling Hills Gradients */}
          <linearGradient id="hill-back" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67B832" />
            <stop offset="50%" stopColor="#4D9624" />
            <stop offset="100%" stopColor="#306914" />
          </linearGradient>

          <linearGradient id="hill-mid" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#8BD838" />
            <stop offset="40%" stopColor="#6AB825" />
            <stop offset="100%" stopColor="#377A13" />
          </linearGradient>

          <linearGradient id="hill-front" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#9DE843" />
            <stop offset="30%" stopColor="#75C728" />
            <stop offset="70%" stopColor="#479615" />
            <stop offset="100%" stopColor="#276109" />
          </linearGradient>

          {/* Cloud Filters for softness */}
          <filter id="cloud-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>

        {/* Sky Background */}
        <rect width="1920" height="1080" fill="url(#bliss-sky)" />

        {/* Soft Cumulus Clouds */}
        <g filter="url(#cloud-blur)" opacity="0.85">
          {/* Main big cloud cluster */}
          <ellipse cx="650" cy="240" rx="350" ry="120" fill="#FFFFFF" opacity="0.6" />
          <ellipse cx="800" cy="210" rx="280" ry="130" fill="#FFFFFF" opacity="0.7" />
          <ellipse cx="500" cy="260" rx="220" ry="90" fill="#FFFFFF" opacity="0.5" />
          <ellipse cx="980" cy="270" rx="250" ry="80" fill="#FFFFFF" opacity="0.4" />

          {/* Wispy clouds top left */}
          <ellipse cx="200" cy="140" rx="180" ry="45" fill="#FFFFFF" opacity="0.45" />
          <ellipse cx="320" cy="120" rx="140" ry="35" fill="#FFFFFF" opacity="0.5" />

          {/* Clouds right side */}
          <ellipse cx="1400" cy="190" rx="320" ry="90" fill="#FFFFFF" opacity="0.55" />
          <ellipse cx="1600" cy="220" rx="260" ry="70" fill="#FFFFFF" opacity="0.4" />
          <ellipse cx="1250" cy="160" rx="180" ry="50" fill="#FFFFFF" opacity="0.45" />
        </g>

        {/* Distant Hills */}
        <path
          d="M-50 720 C 300 680, 600 620, 950 670 C 1300 720, 1650 650, 1970 630 L 1970 1100 L -50 1100 Z"
          fill="url(#hill-back)"
          opacity="0.8"
        />

        {/* Middle Hills with undulating curves */}
        <path
          d="M-50 780 C 250 720, 550 830, 900 740 C 1250 650, 1600 710, 1970 690 L 1970 1100 L -50 1100 Z"
          fill="url(#hill-mid)"
        />

        {/* Foreground Rolling Green Hill (Iconic Bliss Curve) */}
        <path
          d="M-50 860 C 280 810, 650 750, 1080 820 C 1450 880, 1720 780, 1970 760 L 1970 1100 L -50 1100 Z"
          fill="url(#hill-front)"
        />

        {/* Gentle Sun Glare on Hill Edge */}
        <path
          d="M-50 860 C 280 810, 650 750, 1080 820"
          stroke="#BAF75D"
          strokeWidth="6"
          fill="none"
          opacity="0.3"
          filter="url(#cloud-blur)"
        />
      </svg>
    </div>
  );
};
