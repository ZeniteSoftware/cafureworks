import React, { useRef, useEffect } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { XpIconRenderer } from './XpIconRenderer';
import { LogOut, Power, ChevronRight, Settings, HelpCircle, HardDrive, FolderOpen } from 'lucide-react';

export const XpStartMenu: React.FC = () => {
  const {
    isStartMenuOpen,
    setIsStartMenuOpen,
    setIsShutdownOpen,
    logoff,
    openNotepad,
    openSystemProperties,
    openProjectManager,
    openFolderWindow,
    openProject,
    projects,
  } = useDesktop();

  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isStartMenuOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Only if not clicking start button itself
        const startBtn = document.getElementById('xp-start-button');
        if (startBtn && startBtn.contains(e.target as Node)) return;
        setIsStartMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isStartMenuOpen, setIsStartMenuOpen]);

  if (!isStartMenuOpen) return null;

  const pinnedProjects = projects.slice(0, 5);

  return (
    <div
      ref={menuRef}
      style={{
        boxShadow: '4px -4px 15px rgba(0, 0, 0, 0.4), 0 0 0 1px #0A327E',
        fontFamily: 'Tahoma, "Segoe UI", sans-serif',
      }}
      className="fixed bottom-[30px] left-0 z-[9999] w-80 sm:w-96 rounded-t-md overflow-hidden bg-white border border-[#0A327E] flex flex-col select-none text-[11px]"
    >
      {/* Top Header: User Profile Banner */}
      <div
        style={{
          background: 'linear-gradient(to bottom, #104CA0 0%, #2062C7 60%, #1952AB 100%)',
        }}
        className="flex items-center space-x-3 px-3 py-2.5 text-white border-b-2 border-[#D3E5FA]"
      >
        {/* Avatar Frame */}
        <div className="w-10 h-10 rounded-sm bg-gradient-to-tr from-amber-400 to-orange-500 border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-lg">
          P
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[13px] text-white tracking-wide drop-shadow-sm">
            Pedro Cafure
          </span>
          <span className="text-[10px] text-blue-200">CafureWorks • cafureworks.link</span>
        </div>
      </div>

      {/* Main Two-Column Body */}
      <div className="flex flex-row border-b border-[#0A327E]">
        {/* Left Column: Apps & Projects (White background) */}
        <div className="w-1/2 p-2 space-y-1 bg-white border-r border-[#D3E5FA]">
          {/* Pinned Core Apps */}
          <button
            onClick={() => {
              openNotepad();
              setIsStartMenuOpen(false);
            }}
            className="flex items-center space-x-2 w-full p-1.5 rounded-xs hover:bg-[#316AC5] hover:text-white cursor-pointer group text-left"
          >
            <XpIconRenderer icon="notepad" size={24} />
            <div className="overflow-hidden">
              <p className="font-bold text-gray-900 group-hover:text-white truncate">
                README.txt
              </p>
              <p className="text-[9px] text-gray-500 group-hover:text-blue-100 truncate">
                Bloco de Notas
              </p>
            </div>
          </button>

          <button
            onClick={() => {
              openProjectManager();
              setIsStartMenuOpen(false);
            }}
            className="flex items-center space-x-2 w-full p-1.5 rounded-xs hover:bg-[#316AC5] hover:text-white cursor-pointer group text-left"
          >
            <XpIconRenderer icon="project-manager" size={24} />
            <div className="overflow-hidden">
              <p className="font-bold text-gray-900 group-hover:text-white truncate">
                Gerenciar Projetos
              </p>
              <p className="text-[9px] text-gray-500 group-hover:text-blue-100 truncate">
                Adicionar subdomínios
              </p>
            </div>
          </button>

          <div className="h-[1px] bg-gray-200 my-1" />

          {/* Dynamic Pinned Projects (Prisma, etc.) */}
          <span className="text-[9px] font-bold text-gray-400 px-1 uppercase tracking-wider">
            Projetos Recentes
          </span>

          {pinnedProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                openProject(p);
                setIsStartMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full p-1.5 rounded-xs hover:bg-[#316AC5] hover:text-white cursor-pointer group text-left"
            >
              <XpIconRenderer icon={p.icon} size={22} />
              <div className="overflow-hidden">
                <p className="font-medium text-gray-800 group-hover:text-white truncate">
                  {p.title}
                </p>
                <p className="text-[9px] text-gray-400 group-hover:text-blue-200 truncate">
                  {p.url.replace(/^https?:\/\//, '')}
                </p>
              </div>
            </button>
          ))}

          <div className="pt-2">
            <button
              onClick={() => {
                openFolderWindow('web-apps');
                setIsStartMenuOpen(false);
              }}
              className="flex items-center justify-between w-full p-1.5 font-bold text-gray-800 hover:bg-[#316AC5] hover:text-white rounded-xs cursor-pointer group"
            >
              <span>Todos os Projetos</span>
              <ChevronRight size={14} className="text-emerald-600 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Right Column: System Places (Light Blue #D3E5FA) */}
        <div className="w-1/2 p-2 space-y-1 bg-[#D3E5FA] text-[#1B3E7A]">
          <button
            onClick={() => {
              openFolderWindow('web-apps');
              setIsStartMenuOpen(false);
            }}
            className="flex items-center space-x-2 w-full p-1.5 rounded-xs hover:bg-[#316AC5] hover:text-white cursor-pointer text-left font-bold"
          >
            <FolderOpen size={18} className="text-yellow-600" />
            <span>Meus Projetos</span>
          </button>

          <button
            onClick={() => {
              openSystemProperties();
              setIsStartMenuOpen(false);
            }}
            className="flex items-center space-x-2 w-full p-1.5 rounded-xs hover:bg-[#316AC5] hover:text-white cursor-pointer text-left font-bold"
          >
            <HardDrive size={18} className="text-blue-700" />
            <span>Meu Computador</span>
          </button>

          <div className="h-[1px] bg-[#B5CDF2] my-1" />

          <button
            onClick={() => {
              openProjectManager();
              setIsStartMenuOpen(false);
            }}
            className="flex items-center space-x-2 w-full p-1.5 rounded-xs hover:bg-[#316AC5] hover:text-white cursor-pointer text-left"
          >
            <Settings size={16} className="text-gray-600" />
            <span>Painel de Controle</span>
          </button>

          <button
            onClick={() => {
              openNotepad();
              setIsStartMenuOpen(false);
            }}
            className="flex items-center space-x-2 w-full p-1.5 rounded-xs hover:bg-[#316AC5] hover:text-white cursor-pointer text-left"
          >
            <HelpCircle size={16} className="text-blue-600" />
            <span>Ajuda e Suporte</span>
          </button>

          <div className="h-[1px] bg-[#B5CDF2] my-1" />

          <a
            href="https://github.com/ZeniteSoftware"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 w-full p-1.5 rounded-xs hover:bg-[#316AC5] hover:text-white cursor-pointer text-left"
          >
            <XpIconRenderer icon="github" size={16} />
            <span>GitHub Zênite</span>
          </a>
        </div>
      </div>

      {/* Footer: Log Off & Turn Off Computer */}
      <div
        style={{
          background: 'linear-gradient(to bottom, #1D5FC5 0%, #154BA5 100%)',
        }}
        className="flex items-center justify-end space-x-3 px-3 py-2 text-white"
      >
        <button
          onClick={() => {
            logoff();
          }}
          className="flex items-center space-x-1.5 px-2 py-1 rounded-xs hover:bg-white/20 active:bg-white/30 cursor-pointer text-white"
        >
          <div className="w-5 h-5 rounded-xs bg-amber-500 flex items-center justify-center shadow-xs">
            <LogOut size={12} className="text-white" />
          </div>
          <span className="font-semibold text-[11px]">Fazer Logoff</span>
        </button>

        <button
          onClick={() => {
            setIsStartMenuOpen(false);
            setIsShutdownOpen(true);
          }}
          className="flex items-center space-x-1.5 px-2 py-1 rounded-xs hover:bg-white/20 active:bg-white/30 cursor-pointer text-white"
        >
          <div className="w-5 h-5 rounded-xs bg-red-600 flex items-center justify-center shadow-xs">
            <Power size={12} className="text-white" />
          </div>
          <span className="font-semibold text-[11px]">Desligar o computador</span>
        </button>
      </div>
    </div>
  );
};
