import React from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { WindowsFlagIcon } from './XpIcons';
import { Power, ArrowRight, Loader2 } from 'lucide-react';
import { sounds } from '../../utils/sound';

export const XpLoginScreen: React.FC = () => {
  const { systemState, login, turnOff } = useDesktop();

  if (systemState !== 'login' && systemState !== 'logging-in') {
    return null;
  }

  const isLoggingIn = systemState === 'logging-in';

  const handleUserClick = () => {
    if (isLoggingIn) return;
    login();
  };

  const handlePowerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    turnOff();
  };

  return (
    <div
      style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
      className="fixed inset-0 z-[99999] flex flex-col justify-between select-none overflow-hidden bg-[#0A327E] animate-crt-turn-on text-white"
    >
      {/* Top Header Bar */}
      <div className="relative z-10 w-full h-16 md:h-20 bg-gradient-to-r from-[#001859] via-[#003399] to-[#001859] flex items-center justify-between px-6 md:px-12 shadow-md">
        {/* Windows XP Brand Logo */}
        <div className="flex items-center space-x-3">
          <WindowsFlagIcon size={36} className="drop-shadow-md" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-300 font-sans tracking-wide">
              Microsoft®
            </span>
            <div className="flex items-baseline leading-none">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow">
                Windows
              </span>
              <span className="text-xl md:text-2xl font-bold text-amber-500 italic ml-1 drop-shadow">
                XP
              </span>
              <span className="text-[10px] text-blue-200 ml-2 font-medium">
                Professional
              </span>
            </div>
          </div>
        </div>

        {/* Portal Host Badge */}
        <div className="text-right hidden sm:block">
          <span className="text-xs font-semibold text-white/90 drop-shadow">
            CafureWorks Portal
          </span>
          <p className="text-[10px] text-blue-200">cafureworks.link</p>
        </div>

        {/* Crisp gold accent line at bottom of header */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </div>

      {/* Main Center Area */}
      <div className="flex-1 w-full flex items-center justify-center px-4 md:px-12 py-6 bg-gradient-to-b from-[#002B82] via-[#0A327E] to-[#001E6A] relative">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-11 items-center gap-6 md:gap-0">
          
          {/* Left Column: Instruction prompt */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right pr-0 md:pr-8">
            <h1 className="text-lg md:text-xl font-medium text-white drop-shadow-md leading-snug">
              Para começar, clique em seu nome de usuário
            </h1>
            <p className="text-xs text-blue-200 mt-2 max-w-xs drop-shadow-sm">
              Ambiente de trabalho pessoal com acesso aos seus projetos e subdomínios.
            </p>
          </div>

          {/* Center Divider: Iconic glowing XP vertical line */}
          <div className="hidden md:flex md:col-span-1 justify-center h-48 relative">
            <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_8px_#F59E0B]" />
          </div>

          {/* Right Column: User Account Tile */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start pl-0 md:pl-8">
            <div
              onClick={handleUserClick}
              className={`group flex items-center space-x-4 p-3 rounded-lg border transition-all cursor-pointer ${
                isLoggingIn
                  ? 'bg-blue-900/60 border-blue-400 shadow-lg'
                  : 'bg-transparent hover:bg-white/10 hover:border-blue-300/60 active:bg-white/20 border-transparent'
              }`}
            >
              {/* User Photo Frame */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-md bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center text-white font-bold text-2xl group-hover:scale-105 transition-transform">
                  P
                </div>
                {/* Status indicator on avatar */}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
              </div>

              {/* User Information and Action */}
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold text-white drop-shadow tracking-wide group-hover:text-amber-300 transition-colors">
                  Pedro Cafure
                </span>

                {isLoggingIn ? (
                  <div className="flex items-center space-x-2 mt-1">
                    <Loader2 size={13} className="animate-spin text-amber-400" />
                    <span className="text-xs text-amber-300 font-medium animate-pulse">
                      Carregando suas configurações pessoais...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 mt-1.5">
                    <span className="text-xs text-blue-200">Administrador</span>
                    <button
                      type="button"
                      className="px-3 py-0.5 rounded-sm bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 border border-white/40 text-white text-xs font-semibold shadow-sm flex items-center space-x-1 cursor-pointer transition-all group-hover:scale-105"
                    >
                      <span>Entrar</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Subtle scanline overlay for CRT immersion */}
        <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-20" />
      </div>

      {/* Bottom Footer Bar */}
      <div className="relative z-10 w-full h-14 md:h-16 bg-gradient-to-r from-[#001140] via-[#001E6A] to-[#001140] flex items-center justify-between px-6 md:px-12 shadow-inner">
        {/* Crisp gold accent line at top of footer */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Turn Off Computer Button */}
        <button
          onClick={handlePowerClick}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xs hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer text-white group"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-b from-red-500 to-red-700 border border-white/60 flex items-center justify-center shadow-md group-hover:brightness-110">
            <Power size={15} className="text-white" />
          </div>
          <span className="font-semibold text-xs text-gray-200 group-hover:text-white drop-shadow-sm">
            Desligar o computador
          </span>
        </button>

        {/* Hint text */}
        <span className="text-[11px] text-gray-400 hidden sm:block">
          Após fazer logon, todos os seus projetos estarão disponíveis na Área de Trabalho.
        </span>
      </div>
    </div>
  );
};
