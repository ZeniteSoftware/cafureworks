import React, { useRef, useState, useEffect } from 'react';
import { XpIconRenderer } from './XpIconRenderer';
import { useDesktop } from '../../context/DesktopContext';

interface XpDesktopIconProps {
  id: string;
  title: string;
  icon: string;
  badge?: string;
  defaultX: number;
  defaultY: number;
  onOpen: () => void;
}

export const XpDesktopIcon: React.FC<XpDesktopIconProps> = ({
  id,
  title,
  icon,
  badge,
  defaultX,
  defaultY,
  onOpen,
}) => {
  const { selectedIconId, setSelectedIconId, iconPositions, updateIconPosition } = useDesktop();
  const isSelected = selectedIconId === id;

  const currentPos = iconPositions[id] || { x: defaultX, y: defaultY };
  const [pos, setPos] = useState(currentPos);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number } | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  useEffect(() => {
    if (iconPositions[id]) {
      setPos(iconPositions[id]);
    }
  }, [iconPositions, id]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIconId(id);

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: pos.x,
      startY: pos.y,
    };
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStartRef.current) return;
      const dx = moveEvent.clientX - dragStartRef.current.mouseX;
      const dy = moveEvent.clientY - dragStartRef.current.mouseY;
      const newX = Math.max(10, Math.min(window.innerWidth - 85, dragStartRef.current.startX + dx));
      const newY = Math.max(10, Math.min(window.innerHeight - 100, dragStartRef.current.startY + dy));
      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setIsDragging(false);

      if (dragStartRef.current) {
        const dx = Math.abs(upEvent.clientX - dragStartRef.current.mouseX);
        const dy = Math.abs(upEvent.clientY - dragStartRef.current.mouseY);
        // Only consider moved if moved > 4px
        if (dx > 4 || dy > 4) {
          const finalX = Math.max(10, Math.min(window.innerWidth - 85, pos.x));
          const finalY = Math.max(10, Math.min(window.innerHeight - 100, pos.y));
          updateIconPosition(id, finalX, finalY);
        }
      }
      dragStartRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastClickTimeRef.current < 450) {
      // Double click!
      onOpen();
      lastClickTimeRef.current = 0;
    } else {
      lastClickTimeRef.current = now;
      setSelectedIconId(id);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        touchAction: 'none',
      }}
      className={`absolute top-0 left-0 flex flex-col items-center justify-start w-20 p-1 select-none cursor-pointer rounded transition-shadow ${
        isDragging ? 'z-50 opacity-90' : 'z-1'
      } ${isSelected ? 'outline-1 outline-dotted outline-blue-300' : 'hover:bg-white/10'}`}
    >
      <div className="relative flex items-center justify-center w-12 h-12">
        <XpIconRenderer icon={icon} size={40} />
        {badge && (
          <span className="absolute -top-1 -right-1 px-1 py-0.2 text-[9px] font-bold text-white bg-red-600 rounded-full border border-white shadow-xs">
            {badge}
          </span>
        )}
      </div>

      <span
        style={{
          textShadow: '1px 1px 2px #000, 0 0 4px #000',
          fontFamily: 'Tahoma, "Segoe UI", sans-serif',
        }}
        className={`mt-1 text-[11px] leading-tight text-center px-1 rounded-xs font-normal text-white max-w-[80px] break-words line-clamp-2 ${
          isSelected ? 'bg-[#0B61CD] text-white shadow-xs' : ''
        }`}
      >
        {title}
      </span>
    </div>
  );
};
