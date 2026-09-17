import React from 'react';
import { useDesktop } from '../../context/DesktopContext';

export const XpWallpaper: React.FC = () => {
  const { wallpaper } = useDesktop();
  const isColor = wallpaper?.startsWith('#');

  return (
    <div
      style={isColor ? { backgroundColor: wallpaper } : undefined}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-[#004e98]"
    >
      {!isColor && (
        <img
          src={wallpaper || '/windows_xp_wallpaper.jpg'}
          alt="Windows XP Wallpaper"
          className="w-full h-full object-cover object-center select-none pointer-events-none"
          draggable={false}
        />
      )}
    </div>
  );
};

