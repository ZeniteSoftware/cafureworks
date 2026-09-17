import React, { useState, useEffect, useRef } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { WindowsFlagIcon } from './XpIcons';

export const XpScreensaver: React.FC = () => {
  const { isScreensaverActive, dismissScreensaver } = useDesktop();

  const [pos, setPos] = useState({ x: 100, y: 100 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isScreensaverActive) return;

    const width = 180;
    const height = 80;

    let currX = Math.random() * (window.innerWidth - width - 40) + 20;
    let currY = Math.random() * (window.innerHeight - height - 40) + 20;
    let dx = 2.2;
    let dy = 1.8;

    const update = () => {
      currX += dx;
      currY += dy;

      if (currX <= 10) {
        currX = 10;
        dx = Math.abs(dx);
      } else if (currX >= window.innerWidth - width - 10) {
        currX = window.innerWidth - width - 10;
        dx = -Math.abs(dx);
      }

      if (currY <= 10) {
        currY = 10;
        dy = Math.abs(dy);
      } else if (currY >= window.innerHeight - height - 10) {
        currY = window.innerHeight - height - 10;
        dy = -Math.abs(dy);
      }

      setPos({ x: currX, y: currY });
      animFrameRef.current = requestAnimationFrame(update);
    };

    animFrameRef.current = requestAnimationFrame(update);

    const handleDismiss = () => {
      dismissScreensaver();
    };

    window.addEventListener('mousemove', handleDismiss);
    window.addEventListener('mousedown', handleDismiss);
    window.addEventListener('keydown', handleDismiss);
    window.addEventListener('touchstart', handleDismiss);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleDismiss);
      window.removeEventListener('mousedown', handleDismiss);
      window.removeEventListener('keydown', handleDismiss);
      window.removeEventListener('touchstart', handleDismiss);
    };
  }, [isScreensaverActive, dismissScreensaver]);

  if (!isScreensaverActive) return null;

  return (
    <div className="fixed inset-0 z-[9999999] bg-black cursor-none select-none overflow-hidden">
      {/* Floating 3D Windows XP Logo */}
      <div
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
        className="absolute top-0 left-0 flex items-center space-x-3 p-3 bg-black/60 rounded-xl"
      >
        <WindowsFlagIcon size={44} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
        <div className="flex flex-col">
          <span className="text-white font-bold text-xl tracking-tight leading-none drop-shadow">
            Windows<span className="text-amber-500 italic ml-1">XP</span>
          </span>
          <span className="text-blue-300 text-[10px] tracking-widest uppercase font-mono">
            CafureWorks
          </span>
        </div>
      </div>
    </div>
  );
};
