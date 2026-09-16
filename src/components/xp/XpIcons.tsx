import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const WindowsFlagIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    {/* Red pane */}
    <path d="M4 6.5C8 5 12 7.5 16 6.5V15C12 16 8 13.5 4 15V6.5Z" fill="url(#xp-red)" />
    {/* Green pane */}
    <path d="M17.5 6.2C21.5 5 25.5 7.5 29.5 6.5V15C25.5 16 21.5 13.5 17.5 15V6.2Z" fill="url(#xp-green)" />
    {/* Blue pane */}
    <path d="M4 16.5C8 15 12 17.5 16 16.5V25C12 26 8 23.5 4 25V16.5Z" fill="url(#xp-blue)" />
    {/* Yellow pane */}
    <path d="M17.5 16.2C21.5 15 25.5 17.5 29.5 16.5V25C25.5 26 21.5 23.5 17.5 25V16.2Z" fill="url(#xp-yellow)" />
    <defs>
      <linearGradient id="xp-red" x1="4" y1="6" x2="16" y2="15" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6B4A" />
        <stop offset="1" stopColor="#D92800" />
      </linearGradient>
      <linearGradient id="xp-green" x1="17.5" y1="6" x2="29.5" y2="15" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8EE000" />
        <stop offset="1" stopColor="#439800" />
      </linearGradient>
      <linearGradient id="xp-blue" x1="4" y1="16" x2="16" y2="25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00A2FF" />
        <stop offset="1" stopColor="#005BBB" />
      </linearGradient>
      <linearGradient id="xp-yellow" x1="17.5" y1="16" x2="29.5" y2="25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFDC33" />
        <stop offset="1" stopColor="#FF9900" />
      </linearGradient>
    </defs>
  </svg>
);

export const MyComputerIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Monitor Shadow */}
    <ellipse cx="24" cy="44" rx="16" ry="3" fill="#000" fillOpacity="0.25" />
    {/* Monitor Base */}
    <path d="M18 36H30L32 41H16L18 36Z" fill="url(#base-grad)" stroke="#6A7A90" strokeWidth="1" />
    <rect x="14" y="40" width="20" height="3" rx="1.5" fill="#8FA4BC" stroke="#52657A" strokeWidth="0.8" />
    {/* Monitor Casing */}
    <rect x="7" y="6" width="34" height="29" rx="3.5" fill="url(#case-grad)" stroke="#5B6F88" strokeWidth="1.2" />
    {/* Bezel inner */}
    <rect x="10" y="9" width="28" height="21" rx="1.5" fill="#1C2737" />
    {/* Screen Glass */}
    <rect x="11" y="10" width="26" height="19" rx="1" fill="url(#screen-grad)" />
    {/* Screen Glare */}
    <path d="M12 11L25 11L14 28H12V11Z" fill="white" fillOpacity="0.22" />
    {/* Power LED */}
    <circle cx="24" cy="32" r="1" fill="#4BFF36" />
    <defs>
      <linearGradient id="case-grad" x1="7" y1="6" x2="41" y2="35" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="0.3" stopColor="#D9E3EF" />
        <stop offset="1" stopColor="#9AB1CA" />
      </linearGradient>
      <linearGradient id="base-grad" x1="18" y1="36" x2="30" y2="41" gradientUnits="userSpaceOnUse">
        <stop stopColor="#CFDCEB" />
        <stop offset="1" stopColor="#7F94AB" />
      </linearGradient>
      <linearGradient id="screen-grad" x1="11" y1="10" x2="37" y2="29" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3A8BE9" />
        <stop offset="0.6" stopColor="#2562C4" />
        <stop offset="1" stopColor="#153B82" />
      </linearGradient>
    </defs>
  </svg>
);

export const FolderIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Shadow */}
    <ellipse cx="24" cy="43" rx="18" ry="3" fill="#000" fillOpacity="0.2" />
    {/* Back tab */}
    <path d="M6 13C6 11.5 7.2 10.5 8.7 10.5H19L23 15H40C41.5 15 42.5 16 42.5 17.5V36C42.5 37.5 41.5 38.5 40 38.5H6V13Z" fill="url(#folder-back)" stroke="#B37C18" strokeWidth="1" />
    {/* White Paper Inside */}
    <rect x="11" y="14" width="26" height="18" rx="1" fill="#FFFFFF" stroke="#D3D3D3" strokeWidth="0.8" />
    <line x1="14" y1="18" x2="25" y2="18" stroke="#8CA1B9" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="14" y1="22" x2="33" y2="22" stroke="#8CA1B9" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="14" y1="26" x2="30" y2="26" stroke="#8CA1B9" strokeWidth="1.2" strokeLinecap="round" />
    {/* Front Flap with Classic XP yellow gloss */}
    <path d="M4 19.5C4 18 5.2 17 6.7 17H41.3C42.8 17 44 18 44 19.5L42 39C42 40.5 40.8 41.5 39.3 41.5H7.7C6.2 41.5 5 40.5 5 39L4 19.5Z" fill="url(#folder-front)" stroke="#C88E1C" strokeWidth="1" />
    {/* Highlight shine */}
    <path d="M6.5 18.5H41.5" stroke="white" strokeWidth="1.2" strokeOpacity="0.8" strokeLinecap="round" />
    <defs>
      <linearGradient id="folder-back" x1="6" y1="10" x2="42" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBD76B" />
        <stop offset="1" stopColor="#D99B16" />
      </linearGradient>
      <linearGradient id="folder-front" x1="4" y1="17" x2="44" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFECA0" />
        <stop offset="0.3" stopColor="#FFCF49" />
        <stop offset="1" stopColor="#E29C15" />
      </linearGradient>
    </defs>
  </svg>
);

export const FolderProjectsIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <FolderIcon size={size} className={className} />
    {/* Little gears/code badge overlay */}
    <circle cx="34" cy="32" r="9" fill="#1D62BD" stroke="white" strokeWidth="1.5" />
    <path d="M31 30L29 32L31 34M37 30L39 32L37 34M35 29L33 35" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const InternetExplorerIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Shadow */}
    <ellipse cx="24" cy="42" rx="16" ry="3.5" fill="#000" fillOpacity="0.25" />
    {/* Yellow Orbit Ring Back */}
    <path d="M41 12C38 8 29 9 19 16C12 21 7 28 8 33C9 35 11 36 14 36" stroke="url(#orbit-grad)" strokeWidth="3" strokeLinecap="round" />
    {/* Blue 'e' */}
    <path d="M25 8C14.5 8 7 15 7 24.5C7 34 14.5 41 25 41C33.5 41 39.5 36 41 29H18C18.5 33 21.5 36 26 36C29.5 36 32.5 34 34 31.5L39.5 34C37 38.5 32 42.5 25 42.5C13 42.5 5 34.5 5 24.5C5 14.5 13 6.5 25 6.5C36 6.5 41.5 13.5 41.5 23H17.5C17.5 17 21 12 25.5 12C29.5 12 33 14 35 17L40 13.5C37 9.5 31.5 8 25 8Z" fill="url(#ie-grad)" stroke="#094A9E" strokeWidth="0.8" />
    {/* Yellow Orbit Ring Front */}
    <path d="M12 35C15 37 20 37 26 34C36 29 44 19 41 13C40 11 37 10 33 11" stroke="url(#orbit-grad)" strokeWidth="3.2" strokeLinecap="round" />
    <defs>
      <linearGradient id="ie-grad" x1="10" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#43B0FF" />
        <stop offset="0.4" stopColor="#1E7CE0" />
        <stop offset="1" stopColor="#084EAA" />
      </linearGradient>
      <linearGradient id="orbit-grad" x1="10" y1="10" x2="42" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF275" />
        <stop offset="0.5" stopColor="#FFC700" />
        <stop offset="1" stopColor="#FF9500" />
      </linearGradient>
    </defs>
  </svg>
);

export const NotepadIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Shadow */}
    <ellipse cx="24" cy="43" rx="15" ry="3" fill="#000" fillOpacity="0.2" />
    {/* Notepad Cover / Back */}
    <rect x="9" y="8" width="30" height="34" rx="2" fill="#296DC2" stroke="#1B4D8C" strokeWidth="1" />
    {/* Spiral Binder Ring Top */}
    <rect x="9" y="8" width="30" height="7" rx="1.5" fill="#80B0ED" stroke="#1B4D8C" strokeWidth="0.8" />
    {/* White Paper Stack */}
    <rect x="11" y="15" width="26" height="25" rx="1" fill="#FFFFFF" />
    {/* Ruled lines */}
    <line x1="14" y1="20" x2="34" y2="20" stroke="#7BA8D9" strokeWidth="1" />
    <line x1="14" y1="24" x2="34" y2="24" stroke="#D1E0F2" strokeWidth="1" />
    <line x1="14" y1="28" x2="34" y2="28" stroke="#D1E0F2" strokeWidth="1" />
    <line x1="14" y1="32" x2="34" y2="32" stroke="#D1E0F2" strokeWidth="1" />
    <line x1="14" y1="36" x2="26" y2="36" stroke="#D1E0F2" strokeWidth="1" />
    {/* Pencil */}
    <path d="M36 22L26 38L22 39L23 35L33 19L36 22Z" fill="#FFC933" stroke="#9C6B00" strokeWidth="0.8" />
    <path d="M22 39L23 35L25 37L22 39Z" fill="#333333" />
    <path d="M33 19L36 22L38 19L35 16L33 19Z" fill="#E65A5A" />
  </svg>
);

export const RecycleBinIcon: React.FC<IconProps & { isFull?: boolean }> = ({ className = '', size = 32, isFull = false }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Shadow */}
    <ellipse cx="24" cy="43" rx="15" ry="3" fill="#000" fillOpacity="0.25" />
    {/* Bin Lip */}
    <ellipse cx="24" cy="13" rx="16" ry="4.5" fill="#B3D0EC" stroke="#50789E" strokeWidth="1.2" />
    <ellipse cx="24" cy="13" rx="13" ry="3" fill="#1C3D5A" />
    {/* Paper in bin if full */}
    {isFull && (
      <g>
        <path d="M16 11L22 6L28 11H16Z" fill="#FFFFFF" stroke="#9BB1C9" strokeWidth="0.8" />
        <path d="M24 10L30 5L33 12H24Z" fill="#E8EEF5" stroke="#9BB1C9" strokeWidth="0.8" />
        <path d="M14 12L19 8L22 13H14Z" fill="#F4F8FC" stroke="#9BB1C9" strokeWidth="0.8" />
      </g>
    )}
    {/* Body of bin */}
    <path d="M10 14L14 39C14 41 18 42.5 24 42.5C30 42.5 34 41 34 39L38 14H10Z" fill="url(#bin-body)" stroke="#50789E" strokeWidth="1.2" />
    {/* Mesh / Rib lines */}
    <line x1="16" y1="16" x2="19" y2="39" stroke="#7AA2C8" strokeWidth="1.2" strokeOpacity="0.7" />
    <line x1="24" y1="16" x2="24" y2="40" stroke="#7AA2C8" strokeWidth="1.2" strokeOpacity="0.7" />
    <line x1="32" y1="16" x2="29" y2="39" stroke="#7AA2C8" strokeWidth="1.2" strokeOpacity="0.7" />
    {/* Green Recycling Mobius strip logo */}
    <circle cx="24" cy="27" r="7" fill="#2E7D32" stroke="white" strokeWidth="1.2" />
    <path d="M24 23L27 28H21L24 23Z" fill="white" />
    <defs>
      <linearGradient id="bin-body" x1="10" y1="14" x2="38" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E2F0FD" stopOpacity="0.85" />
        <stop offset="0.5" stopColor="#A8CFEE" stopOpacity="0.75" />
        <stop offset="1" stopColor="#6C9BCA" stopOpacity="0.9" />
      </linearGradient>
    </defs>
  </svg>
);

export const PrismaIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Windows XP App shortcut backplate */}
    <rect x="5" y="5" width="38" height="38" rx="8" fill="url(#prisma-bg)" stroke="#163A63" strokeWidth="1.2" />
    {/* Inner glossy highlight */}
    <path d="M6 13C6 9 9 6 13 6H35C39 6 42 9 42 13V22L6 22V13Z" fill="white" fillOpacity="0.18" />
    {/* Prisma Geometric Monolith / Triangle */}
    <path d="M22.5 12L13 34H33L25.5 12H22.5Z" fill="#16A394" />
    <path d="M24 12L33 34L25 36L18 34L24 12Z" fill="#2BE4D2" />
    <path d="M24 12L13 34H20L24 12Z" fill="#0D786D" />
    <path d="M24 12L27 25L33 34H24V12Z" fill="#58F7E8" />
    {/* Shortcut little arrow badge at bottom-left */}
    <rect x="6" y="32" width="10" height="10" rx="1.5" fill="white" stroke="#7A8A9E" strokeWidth="0.8" />
    <path d="M8 39L13 34M13 34H9M13 34V38" stroke="#1D64C2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="prisma-bg" x1="5" y1="5" x2="43" y2="43" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2A4B7C" />
        <stop offset="0.6" stopColor="#152B4D" />
        <stop offset="1" stopColor="#0B1930" />
      </linearGradient>
    </defs>
  </svg>
);

export const ApiBotIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Base shadow */}
    <ellipse cx="24" cy="42" rx="14" ry="3" fill="#000" fillOpacity="0.2" />
    {/* Robot Head with XP aesthetic */}
    <rect x="10" y="14" width="28" height="24" rx="5" fill="url(#bot-grad)" stroke="#236BB3" strokeWidth="1.2" />
    {/* Antenna */}
    <line x1="24" y1="14" x2="24" y2="7" stroke="#236BB3" strokeWidth="2" />
    <circle cx="24" cy="7" r="3" fill="#E84A4A" stroke="#991515" strokeWidth="0.8" />
    {/* Eyes */}
    <circle cx="18" cy="23" r="3.5" fill="#3DFF5E" stroke="#15822B" strokeWidth="1" />
    <circle cx="30" cy="23" r="3.5" fill="#3DFF5E" stroke="#15822B" strokeWidth="1" />
    <circle cx="19" cy="22" r="1" fill="white" />
    <circle cx="31" cy="22" r="1" fill="white" />
    {/* Mouth grid */}
    <rect x="17" y="30" width="14" height="4" rx="1" fill="#1C3D5A" />
    <line x1="20" y1="30" x2="20" y2="34" stroke="#3DFF5E" strokeWidth="1" />
    <line x1="24" y1="30" x2="24" y2="34" stroke="#3DFF5E" strokeWidth="1" />
    <line x1="28" y1="30" x2="28" y2="34" stroke="#3DFF5E" strokeWidth="1" />
    {/* Shortcut arrow badge */}
    <rect x="6" y="32" width="10" height="10" rx="1.5" fill="white" stroke="#7A8A9E" strokeWidth="0.8" />
    <path d="M8 39L13 34M13 34H9M13 34V38" stroke="#1D64C2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="bot-grad" x1="10" y1="14" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E6F2FF" />
        <stop offset="0.4" stopColor="#B3D7FF" />
        <stop offset="1" stopColor="#6AA7EB" />
      </linearGradient>
    </defs>
  </svg>
);

export const SystemPropertiesIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <MyComputerIcon size={size} className={className} />
    {/* Checkmark or gear overlay */}
    <circle cx="35" cy="33" r="8.5" fill="#388E3C" stroke="white" strokeWidth="1.5" />
    <path d="M31 33L34 36L40 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ProjectManagerIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Toolbox */}
    <rect x="8" y="16" width="32" height="24" rx="3" fill="url(#tool-grad)" stroke="#8A4E08" strokeWidth="1.2" />
    {/* Handle */}
    <path d="M19 16V11C19 9.5 20.5 8.5 22 8.5H26C27.5 8.5 29 9.5 29 11V16" stroke="#4A5568" strokeWidth="2.5" fill="none" />
    {/* Latches */}
    <rect x="13" y="19" width="4" height="6" rx="0.5" fill="#FFD700" stroke="#8A6B00" strokeWidth="0.8" />
    <rect x="31" y="19" width="4" height="6" rx="0.5" fill="#FFD700" stroke="#8A6B00" strokeWidth="0.8" />
    {/* Plus badge */}
    <circle cx="35" cy="33" r="8" fill="#1976D2" stroke="white" strokeWidth="1.5" />
    <path d="M35 29V37M31 33H39" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="tool-grad" x1="8" y1="16" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F58E27" />
        <stop offset="1" stopColor="#B35900" />
      </linearGradient>
    </defs>
  </svg>
);

export const GitHubIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="20" fill="#24292E" stroke="#121416" strokeWidth="1" />
    <path d="M24 10C16.3 10 10 16.3 10 24C10 30.2 14 35.4 19.6 37.3C20.3 37.4 20.6 37 20.6 36.6C20.6 36.2 20.6 34.9 20.6 33.5C16.7 34.3 15.9 31.8 15.9 31.8C15.3 30.2 14.4 29.8 14.4 29.8C13.1 28.9 14.5 28.9 14.5 28.9C15.9 29 16.7 30.3 16.7 30.3C18 32.5 20.1 31.9 20.9 31.5C21 30.5 21.4 29.8 21.9 29.4C18.8 29 15.5 27.8 15.5 22.3C15.5 20.7 16 19.4 17 18.4C16.8 18 16.3 16.5 17.1 14.6C17.1 14.6 18.3 14.2 21 16C22.2 15.7 23.4 15.5 24.7 15.5C25.9 15.5 27.2 15.7 28.3 16C31 14.2 32.2 14.6 32.2 14.6C33.1 16.5 32.5 18 32.4 18.4C33.3 19.4 33.9 20.7 33.9 22.3C33.9 27.8 30.5 29 27.4 29.4C28 29.9 28.5 30.9 28.5 32.4C28.5 34.6 28.5 36.3 28.5 36.6C28.5 37 28.8 37.4 29.5 37.3C35.1 35.4 39.1 30.2 39.1 24C39.1 16.3 32.8 10 24 10Z" fill="white" />
  </svg>
);
