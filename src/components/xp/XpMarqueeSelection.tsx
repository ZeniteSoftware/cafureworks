import React, { useState, useEffect } from 'react';
import { useDesktop } from '../../context/DesktopContext';

export const XpMarqueeSelection: React.FC<{ containerRef: React.RefObject<HTMLDivElement | null> }> = ({
  containerRef,
}) => {
  const { setSelectedIconId } = useDesktop();
  const [rect, setRect] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      // Only trigger if clicked directly on container (desktop background)
      if (e.target !== container) return;
      setSelectedIconId(null);
      setRect({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
      });

      const handleMouseMove = (moveEvent: MouseEvent) => {
        setRect((prev) => (prev ? { ...prev, currentX: moveEvent.clientX, currentY: moveEvent.clientY } : null));
      };

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        setRect(null);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    container.addEventListener('mousedown', handleMouseDown);
    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
    };
  }, [containerRef, setSelectedIconId]);

  if (!rect) return null;

  const left = Math.min(rect.startX, rect.currentX);
  const top = Math.min(rect.startY, rect.currentY);
  const width = Math.abs(rect.currentX - rect.startX);
  const height = Math.abs(rect.currentY - rect.startY);

  if (width < 3 && height < 3) return null;

  return (
    <div
      style={{
        left,
        top,
        width,
        height,
        backgroundColor: 'rgba(49, 106, 197, 0.28)',
        borderColor: '#316ac5',
      }}
      className="absolute z-20 pointer-events-none border border-dashed select-none"
    />
  );
};
