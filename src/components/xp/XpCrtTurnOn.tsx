import React from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { Power } from 'lucide-react';

export const XpCrtTurnOn: React.FC = () => {
  const { systemState, powerOn } = useDesktop();

  if (systemState !== 'off' && systemState !== 'turning-on') {
    return null;
  }

  return (
    <div
      onClick={powerOn}
      className="fixed inset-0 z-[999999] bg-[#050505] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
    >
      {/* Off state: Standby indicator and prompt */}
      {systemState === 'off' && (
        <div className="flex flex-col items-center justify-center text-center p-6 space-y-6 animate-pulse">
          <div className="relative group">
            <div className="w-16 h-16 rounded-full bg-[#111] border-2 border-gray-700 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:border-green-500 transition-colors">
              <Power size={28} className="text-gray-400 group-hover:text-green-400 transition-colors" />
            </div>
            {/* Pulsing Standby LED */}
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_#F59E0B] animate-ping" />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_6px_#F59E0B]" />
          </div>

          <div className="space-y-2">
            <h2
              style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
              className="text-gray-200 text-lg md:text-xl font-semibold tracking-wide drop-shadow"
            >
              Monitor em espera
            </h2>
            <p
              style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
              className="text-gray-400 text-xs md:text-sm max-w-sm"
            >
              Clique em qualquer lugar da tela para ligar o computador e iniciar o áudio do Windows XP.
            </p>
          </div>

          <div className="pt-4 flex items-center space-x-2 text-[11px] text-gray-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>CafureWorks • Pedro Cafure</span>
          </div>
        </div>
      )}

      {/* Turning on state: CRT Beam / Flash Animation */}
      {systemState === 'turning-on' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* CRT Horizontal Line Flash */}
          <div className="w-full bg-white animate-crt-beam" />
          {/* CRT Screen Scanlines */}
          <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-40" />
        </div>
      )}
    </div>
  );
};
