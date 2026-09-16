import React, { useState } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { WindowsFlagIcon } from './XpIcons';
import { Power, RotateCcw, Moon } from 'lucide-react';
import { sounds } from '../../utils/sound';

export const XpShutdownDialog: React.FC = () => {
  const { isShutdownOpen, setIsShutdownOpen } = useDesktop();
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  if (!isShutdownOpen) return null;

  const handleShutdown = () => {
    sounds.playShutdown();
    setIsShuttingDown(true);
  };

  const handleRestart = () => {
    sounds.playShutdown();
    setTimeout(() => {
      window.location.reload();
    }, 1800);
  };

  const handleCancel = () => {
    sounds.playClick();
    setIsShutdownOpen(false);
  };

  if (isShuttingDown) {
    return (
      <div className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center select-none text-center p-4">
        <h1
          style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
          className="text-amber-500 font-bold text-2xl md:text-3xl tracking-wide mb-4 animate-pulse"
        >
          Seu computador já pode ser desligado com segurança.
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Ou clique abaixo para voltar ao CafureWorks Desktop:
        </p>
        <button
          onClick={() => {
            setIsShuttingDown(false);
            setIsShutdownOpen(false);
            sounds.playStartup();
          }}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm shadow-md cursor-pointer text-sm"
        >
          Ligar Novamente (CafureWorks)
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99998] flex items-center justify-center select-none backdrop-grayscale-80 backdrop-brightness-75 bg-black/30">
      {/* Dialog Window */}
      <div
        style={{
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px #0A327E',
          fontFamily: 'Tahoma, "Segoe UI", sans-serif',
        }}
        className="w-[380px] bg-[#003399] rounded-md overflow-hidden border border-[#001E66] text-white"
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-[#003399] via-[#0055EA] to-[#003399] border-b border-[#002277]">
          <span className="font-bold text-[13px] text-white">Desligar o computador</span>
          <WindowsFlagIcon size={24} />
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-around py-8 px-4 bg-gradient-to-b from-[#003399] to-[#002277]">
          {/* Standby */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => {
                sounds.playLogoff();
                setIsShutdownOpen(false);
              }}
              title="Em espera"
              className="w-12 h-12 rounded-lg bg-gradient-to-b from-amber-400 to-amber-600 border-2 border-white/80 shadow-md flex items-center justify-center hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <Moon size={22} className="text-white" />
            </button>
            <span className="text-xs font-semibold text-gray-200">Em espera</span>
          </div>

          {/* Turn Off */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={handleShutdown}
              title="Desativar"
              className="w-12 h-12 rounded-lg bg-gradient-to-b from-red-500 to-red-700 border-2 border-white/80 shadow-md flex items-center justify-center hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <Power size={22} className="text-white" />
            </button>
            <span className="text-xs font-semibold text-gray-200">Desativar</span>
          </div>

          {/* Restart */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={handleRestart}
              title="Reiniciar"
              className="w-12 h-12 rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-700 border-2 border-white/80 shadow-md flex items-center justify-center hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <RotateCcw size={22} className="text-white" />
            </button>
            <span className="text-xs font-semibold text-gray-200">Reiniciar</span>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="flex justify-end p-3 bg-[#002277] border-t border-[#001E66]">
          <button
            onClick={handleCancel}
            className="px-4 py-1 rounded-xs bg-gradient-to-b from-white to-[#ECE9D8] border border-[#7F9DB9] hover:brightness-105 active:brightness-95 text-gray-800 font-semibold text-xs shadow-xs cursor-pointer min-w-[80px]"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
