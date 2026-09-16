import React, { useState, useEffect } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { WindowsFlagIcon } from './XpIcons';
import { XpIconRenderer } from './XpIconRenderer';
import { Volume2, VolumeX, Shield, Monitor } from 'lucide-react';
import { sounds } from '../../utils/sound';

export const XpTaskbar: React.FC = () => {
  const {
    windows,
    activeWindowId,
    isStartMenuOpen,
    setIsStartMenuOpen,
    focusWindow,
    minimizeWindow,
    isSoundEnabled,
    toggleSound,
    openNotepad,
  } = useDesktop();

  const [time, setTime] = useState<string>('');
  const [showBalloon, setShowBalloon] = useState<boolean>(true);

  // Digital clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-dismiss balloon after 12 seconds and play balloon sound
  useEffect(() => {
    const balloonSoundTimer = setTimeout(() => {
      sounds.playBalloon();
    }, 2800);
    const timer = setTimeout(() => {
      setShowBalloon(false);
    }, 12000);
    return () => {
      clearTimeout(balloonSoundTimer);
      clearTimeout(timer);
    };
  }, []);

  const handleStartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleTaskClick = (winId: string) => {
    const win = windows.find((w) => w.id === winId);
    if (!win) return;

    if (activeWindowId === winId && !win.isMinimized) {
      minimizeWindow(winId);
    } else {
      focusWindow(winId);
    }
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(to bottom, #245edc 0%, #3f8cf3 9%, #245edc 18%, #245edc 92%, #1941a5 100%)',
        borderTop: '1px solid #3b8cf8',
        fontFamily: 'Tahoma, "Segoe UI", sans-serif',
      }}
      className="fixed bottom-0 left-0 right-0 h-[30px] z-[9990] flex items-center justify-between select-none text-[11px] shadow-lg"
    >
      {/* Left: Start Button + Quick Launch */}
      <div className="flex items-center h-full">
        {/* The Legendary Windows XP Start Button */}
        <button
          id="xp-start-button"
          onClick={handleStartClick}
          style={{
            background: isStartMenuOpen
              ? 'radial-gradient(circle at 10% 20%, #3ca03c, #1f6b1f)'
              : 'linear-gradient(to bottom, #388e3c 0%, #58b843 30%, #43a047 70%, #2e7d32 100%)',
            boxShadow:
              'inset 1px 1px 2px rgba(255,255,255,0.7), inset -1px -1px 2px rgba(0,0,0,0.5), 2px 0 5px rgba(0,0,0,0.3)',
          }}
          className="relative h-full flex items-center space-x-1.5 pl-2.5 pr-4 rounded-r-xl border-r border-t border-emerald-300 hover:brightness-110 active:brightness-95 cursor-pointer text-white"
        >
          <WindowsFlagIcon size={18} />
          <span
            style={{
              textShadow: '1px 1px 2px #104e10',
              fontStyle: 'italic',
            }}
            className="font-black text-[13px] tracking-wide"
          >
            iniciar
          </span>
        </button>

        {/* Quick Launch Icons */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2 border-r border-[#1941a5] h-5/6">
          <button
            onClick={() => {
              // Minimize all
              windows.forEach((w) => minimizeWindow(w.id));
            }}
            title="Mostrar Área de Trabalho"
            className="p-1 hover:bg-white/20 rounded-xs cursor-pointer"
          >
            <Monitor size={14} className="text-blue-100" />
          </button>
          <button
            onClick={() => openNotepad()}
            title="Abrir README.txt"
            className="p-0.5 hover:bg-white/20 rounded-xs cursor-pointer"
          >
            <XpIconRenderer icon="notepad" size={16} />
          </button>
        </div>

        {/* Open Windows / Tasks Buttons */}
        <div className="flex items-center space-x-1 px-1 overflow-x-auto max-w-[calc(100vw-360px)]">
          {windows.map((win) => {
            const isActive = activeWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                onClick={() => handleTaskClick(win.id)}
                style={{
                  background: isActive
                    ? 'linear-gradient(to bottom, #1d4db7 0%, #153e99 100%)'
                    : 'linear-gradient(to bottom, #3b74e8 0%, #245edc 100%)',
                  boxShadow: isActive
                    ? 'inset 1px 1px 2px #0c2663, inset -1px -1px 1px #3b74e8'
                    : 'inset 1px 1px 1px #7ea7f7, inset -1px -1px 2px #0c2663',
                }}
                className={`h-[24px] max-w-[150px] min-w-[90px] flex items-center space-x-1.5 px-2 rounded-xs border border-[#1842a8] text-white cursor-pointer select-none transition-all ${
                  isActive ? 'font-bold' : 'hover:brightness-110'
                }`}
              >
                <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                  <XpIconRenderer icon={win.icon} size={14} />
                </div>
                <span className="truncate text-[10.5px] leading-none">{win.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: System Tray (Notification Area) */}
      <div
        style={{
          background: 'linear-gradient(to bottom, #0f3894 0%, #1654c8 100%)',
          boxShadow: 'inset 1px 1px 2px #092461',
        }}
        className="relative h-full flex items-center space-x-2.5 px-3 border-l border-[#1941a5] text-white shrink-0"
      >
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          title={isSoundEnabled ? 'Som ativado (clique para mutar)' : 'Som mudo (clique para ativar)'}
          className="hover:opacity-80 cursor-pointer"
        >
          {isSoundEnabled ? <Volume2 size={15} className="text-white" /> : <VolumeX size={15} className="text-red-300" />}
        </button>

        {/* Security / Cloudflare shield */}
        <div title="Cloudflare SSL & Proteção Ativa" className="hidden sm:block">
          <Shield size={14} className="text-emerald-400" />
        </div>

        {/* Digital Clock */}
        <span className="font-sans font-medium text-[11px] text-white tracking-wide">
          {time || '12:00'}
        </span>

        {/* Welcome Balloon Tooltip */}
        {showBalloon && (
          <div
            style={{
              fontFamily: 'Tahoma, "Segoe UI", sans-serif',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.35)',
            }}
            className="absolute bottom-[34px] right-2 w-64 bg-[#FFFFE1] border border-black p-2.5 rounded-sm text-black text-[11px] select-none z-[9999]"
          >
            {/* Balloon triangle arrow pointing to tray */}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
            <div className="absolute -bottom-[7px] right-6 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-[#FFFFE1]" />

            <div className="flex items-start justify-between">
              <span className="font-bold text-blue-900 text-[11.5px]">
                Bem-vindo ao CafureWorks!
              </span>
              <button
                onClick={() => setShowBalloon(false)}
                className="text-gray-500 hover:text-black font-bold text-xs ml-1 cursor-pointer leading-none"
              >
                ✕
              </button>
            </div>
            <p className="mt-1 text-gray-800 leading-tight">
              Acesse seus projetos nos ícones da área de trabalho ou dê duplo clique nas pastas para explorar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
