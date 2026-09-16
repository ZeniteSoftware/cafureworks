import React, { useRef, useState } from 'react';
import type { WindowState } from '../../types';
import { useDesktop } from '../../context/DesktopContext';
import { XpIconRenderer } from './XpIconRenderer';

interface XpWindowProps {
  window: WindowState;
  children: React.ReactNode;
  menuItems?: string[];
  statusBarText?: string;
}

export const XpWindow: React.FC<XpWindowProps> = ({
  window: win,
  children,
  menuItems = ['Arquivo', 'Editar', 'Exibir', 'Favoritos', 'Ferramentas', 'Ajuda'],
  statusBarText,
}) => {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    updateWindowPosition,
    updateWindowSize,
  } = useDesktop();

  const isActive = activeWindowId === win.id;
  const isMax = win.isMaximized;

  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number } | null>(null);
  const resizeStartRef = useRef<{ mouseX: number; mouseY: number; startW: number; startH: number } | null>(null);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Title bar drag handler
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMax) return;
    e.stopPropagation();
    focusWindow(win.id);

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: win.position.x,
      startY: win.position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStartRef.current) return;
      const dx = moveEvent.clientX - dragStartRef.current.mouseX;
      const dy = moveEvent.clientY - dragStartRef.current.mouseY;
      const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.startX + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, dragStartRef.current.startY + dy));
      updateWindowPosition(win.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dragStartRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Resize handler
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isMax) return;
    e.stopPropagation();
    focusWindow(win.id);

    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startW: win.size.width,
      startH: win.size.height,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeStartRef.current) return;
      const dw = moveEvent.clientX - resizeStartRef.current.mouseX;
      const dh = moveEvent.clientY - resizeStartRef.current.mouseY;
      const newW = Math.max(340, Math.min(window.innerWidth, resizeStartRef.current.startW + dw));
      const newH = Math.max(240, Math.min(window.innerHeight - 32, resizeStartRef.current.startH + dh));
      updateWindowSize(win.id, { width: newW, height: newH });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      resizeStartRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  if (win.isMinimized) return null;

  const style: React.CSSProperties = isMax
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 30px)',
        zIndex: win.zIndex,
      }
    : {
        top: `${win.position.y}px`,
        left: `${win.position.x}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        zIndex: win.zIndex,
      };

  return (
    <div
      onMouseDown={() => focusWindow(win.id)}
      style={{
        ...style,
        boxShadow: isActive
          ? '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px #0831D9'
          : '0 4px 12px rgba(0, 0, 0, 0.25), 0 0 0 1px #6582A8',
      }}
      className={`fixed flex flex-col rounded-t-lg overflow-hidden bg-[#ECE9D8] select-none text-[11px] font-sans ${
        isMax ? 'rounded-none' : 'border-[3px]'
      } ${isActive ? 'border-[#0055EA]' : 'border-[#7697C6]'}`}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={() => toggleMaximize(win.id)}
        style={{
          background: isActive
            ? 'linear-gradient(to bottom, #0058EE 0%, #3593FF 4%, #288EFF 18%, #0C67E7 35%, #0055E5 70%, #0045C6 100%)'
            : 'linear-gradient(to bottom, #7697C6 0%, #9EB9DB 8%, #7697C6 93%, #5C7DA7 100%)',
        }}
        className="relative flex items-center justify-between h-[30px] px-2 text-white cursor-move select-none"
      >
        {/* Left: Icon & Title */}
        <div className="flex items-center space-x-1.5 overflow-hidden pr-2">
          <div className="w-4 h-4 flex items-center justify-center shrink-0">
            <XpIconRenderer icon={win.icon} size={16} />
          </div>
          <span
            style={{ textShadow: isActive ? '1px 1px 1px #0f2c7a' : 'none' }}
            className="font-bold text-[12px] truncate tracking-wide text-white"
          >
            {win.title}
          </span>
        </div>

        {/* Right: Window Controls (Minimize, Maximize, Close) */}
        <div className="flex items-center space-x-1 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
          {/* Minimize Button */}
          <button
            onClick={() => minimizeWindow(win.id)}
            title="Minimizar"
            className="w-[21px] h-[21px] rounded-xs flex items-center justify-center bg-gradient-to-b from-[#2B72EE] via-[#0055EA] to-[#0038A8] border border-white/40 shadow-xs hover:brightness-110 active:brightness-90 cursor-pointer"
          >
            <span className="w-2 h-[2px] bg-white translate-y-1.5 rounded-xs" />
          </button>

          {/* Maximize / Restore Button */}
          <button
            onClick={() => toggleMaximize(win.id)}
            title={isMax ? 'Restaurar' : 'Maximizar'}
            className="w-[21px] h-[21px] rounded-xs flex items-center justify-center bg-gradient-to-b from-[#2B72EE] via-[#0055EA] to-[#0038A8] border border-white/40 shadow-xs hover:brightness-110 active:brightness-90 cursor-pointer"
          >
            {isMax ? (
              <span className="w-2.5 h-2 border-t-2 border-r-2 border-white relative before:absolute before:-left-1 before:top-0.5 before:w-2 before:h-1.5 before:border before:border-white" />
            ) : (
              <span className="w-2.5 h-2.5 border-2 border-t-[3px] border-white rounded-2xs" />
            )}
          </button>

          {/* Close Button (Iconic XP Red) */}
          <button
            onClick={() => closeWindow(win.id)}
            title="Fechar"
            className="w-[21px] h-[21px] rounded-xs flex items-center justify-center bg-gradient-to-b from-[#E76C55] via-[#D33C27] to-[#A31D0A] border border-white/50 shadow-xs hover:brightness-115 active:brightness-90 cursor-pointer"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Classic Menu Bar */}
      {menuItems && menuItems.length > 0 && (
        <div className="flex items-center px-1 py-0.5 bg-[#ECE9D8] border-b border-[#D8D2BD] text-[11px] text-black">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveMenu(activeMenu === item ? null : item)}
              className="px-2 py-0.5 rounded-xs hover:bg-[#316AC5] hover:text-white cursor-pointer select-none"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {children}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between h-[22px] px-2 bg-[#ECE9D8] border-t border-[#D0C9B2] text-[11px] text-gray-700 select-none">
        <span className="truncate">{statusBarText || '1 objeto(s) selecionado(s)'}</span>

        {/* Window Resize Handle */}
        {!isMax && (
          <div
            onMouseDown={handleResizeMouseDown}
            className="cursor-se-resize flex items-end justify-end w-3 h-3 ml-2 pb-0.5 pr-0.5"
            title="Redimensionar"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="8" cy="8" r="1" fill="#716F64" />
              <circle cx="8" cy="5" r="1" fill="#716F64" />
              <circle cx="5" cy="8" r="1" fill="#716F64" />
              <circle cx="8" cy="2" r="1" fill="#716F64" />
              <circle cx="5" cy="5" r="1" fill="#716F64" />
              <circle cx="2" cy="8" r="1" fill="#716F64" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
