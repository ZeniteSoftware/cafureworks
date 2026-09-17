import React, { useRef, useState, useEffect } from 'react';
import { XpIconRenderer } from './XpIconRenderer';
import { useDesktop } from '../../context/DesktopContext';

export const GRID_CELL_W = 85;
export const GRID_CELL_H = 100;
export const GRID_START_X = 20;
export const GRID_START_Y = 20;

export const snapToGrid = (rawX: number, rawY: number) => {
  const maxRows = Math.max(1, Math.floor(((window.innerHeight || 800) - 50 - GRID_START_Y) / GRID_CELL_H));
  const maxCols = Math.max(1, Math.floor(((window.innerWidth || 1200) - GRID_START_X) / GRID_CELL_W));

  const col = Math.max(0, Math.min(maxCols - 1, Math.round((rawX - GRID_START_X) / GRID_CELL_W)));
  const row = Math.max(0, Math.min(maxRows - 1, Math.round((rawY - GRID_START_Y) / GRID_CELL_H)));

  return {
    x: GRID_START_X + col * GRID_CELL_W,
    y: GRID_START_Y + row * GRID_CELL_H,
  };
};

interface XpDesktopIconProps {
  id: string;
  title: string;
  icon: string;
  defaultX: number;
  defaultY: number;
  onOpen: () => void;
}

export const XpDesktopIcon: React.FC<XpDesktopIconProps> = ({
  id,
  title,
  icon,
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
    } else {
      setPos({ x: defaultX, y: defaultY });
    }
  }, [iconPositions, id, defaultX, defaultY]);

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
      const newY = Math.max(10, Math.min(window.innerHeight - 110, dragStartRef.current.startY + dy));
      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setIsDragging(false);

      if (dragStartRef.current) {
        const dx = Math.abs(upEvent.clientX - dragStartRef.current.mouseX);
        const dy = Math.abs(upEvent.clientY - dragStartRef.current.mouseY);
        // Only if dragged > 4px
        if (dx > 4 || dy > 4) {
          const rawX = dragStartRef.current.startX + (upEvent.clientX - dragStartRef.current.mouseX);
          const rawY = dragStartRef.current.startY + (upEvent.clientY - dragStartRef.current.mouseY);
          const snapped = snapToGrid(rawX, rawY);
          setPos(snapped);
          updateIconPosition(id, snapped.x, snapped.y);
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
      // Double click
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
      className={`absolute top-0 left-0 flex flex-col items-center justify-start w-[76px] p-1 select-none cursor-pointer rounded ${
        isDragging ? 'z-50 opacity-90' : 'z-1 transition-transform duration-150'
      } ${isSelected ? 'outline-1 outline-dotted outline-blue-300 bg-white/10' : 'hover:bg-white/10'}`}
    >
      <div className="relative flex items-center justify-center w-12 h-12">
        <XpIconRenderer icon={icon} size={40} />
      </div>

      <span
        style={{
          textShadow: '1px 1px 2px #000, 0 0 4px #000',
          fontFamily: 'Tahoma, "Segoe UI", sans-serif',
        }}
        className={`mt-1 text-[11px] leading-snug text-center px-1 rounded-2xs font-normal text-white max-w-[74px] break-words line-clamp-2 ${
          isSelected ? 'bg-[#0B61CD] text-white shadow-xs' : ''
        }`}
      >
        {title}
      </span>
    </div>
  );
};
