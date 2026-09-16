import React from 'react';

export const XpWallpaper: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-[#004e98]">
      <img
        src="/windows_xp_wallpaper.jpg"
        alt="Windows XP Wallpaper"
        className="w-full h-full object-cover object-center select-none pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

