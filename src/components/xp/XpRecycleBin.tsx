import React, { useState } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { XpIconRenderer } from './XpIconRenderer';
import { ArrowLeft, ArrowRight, ArrowUp, Trash2, RotateCcw, Folder, HardDrive } from 'lucide-react';
import type { ProjectItem } from '../../types';

export const XpRecycleBin: React.FC = () => {
  const {
    recycledProjects,
    emptyRecycleBin,
    restoreProject,
    openSystemProperties,
    openFolderWindow,
  } = useDesktop();

  const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null);

  const handleRestoreAll = () => {
    recycledProjects.forEach((p) => restoreProject(p.id));
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] select-none text-[11px] font-sans">
      {/* Navigation & Action Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-2 py-1 bg-[#ECE9D8] border-b border-[#D4CEB8]">
        {/* Back Button */}
        <button
          disabled
          className="flex items-center space-x-1 px-2 py-1 rounded-xs border border-transparent opacity-40 pointer-events-none"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <ArrowLeft size={12} />
          </div>
          <span className="font-semibold text-gray-800">Voltar</span>
        </button>

        {/* Forward Button */}
        <button
          disabled
          className="p-1 rounded-xs border border-transparent opacity-40 pointer-events-none"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <ArrowRight size={12} />
          </div>
        </button>

        {/* Up Button */}
        <button
          onClick={() => openFolderWindow('web-apps')}
          title="Para Cima"
          className="p-1 rounded-xs border border-transparent hover:border-[#7A96DF] hover:bg-white/60 active:bg-[#B5C7F0] cursor-pointer"
        >
          <div className="w-5 h-5 rounded-xs bg-[#F2C244] flex items-center justify-center text-gray-800 border border-[#B38C26]">
            <ArrowUp size={12} />
          </div>
        </button>

        <div className="h-5 w-[1px] bg-[#D4CEB8] mx-1" />

        {/* Empty Recycle Bin Button on Toolbar */}
        <button
          onClick={emptyRecycleBin}
          disabled={recycledProjects.length === 0}
          className="flex items-center space-x-1.5 px-2 py-1 rounded-xs border border-transparent hover:border-[#7A96DF] hover:bg-white/60 active:bg-[#B5C7F0] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <Trash2 size={15} className="text-red-600" />
          <span className="font-medium text-gray-900">Esvaziar Lixeira</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ECE9D8] border-b border-[#D4CEB8] space-x-2">
        <span className="text-gray-500 shrink-0">Endereço</span>
        <div className="flex-1 flex items-center bg-white border border-[#7F9DB9] px-2 py-0.5 rounded-2xs shadow-inner">
          <div className="w-4 h-4 mr-1.5 flex items-center justify-center shrink-0">
            <XpIconRenderer icon="recycle-bin" size={16} />
          </div>
          <span className="text-gray-900 font-sans text-xs">Lixeira</span>
        </div>
      </div>

      {/* Main Two-Column Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Classic Windows XP Sidebar (Luna Blue Task Pane) */}
        <div
          style={{
            background: 'linear-gradient(to bottom, #7BA2E7 0%, #6375D6 100%)',
          }}
          className="w-48 sm:w-56 p-2 space-y-3 overflow-y-auto shrink-0 border-r border-[#D4CEB8] hidden sm:block"
        >
          {/* Panel 1: Tarefas da Lixeira */}
          <div className="bg-white rounded-t-sm shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-2.5 py-1 bg-gradient-to-r from-[#215DC6] to-[#4585E8] text-white font-bold text-[11px]">
              <span>Tarefas da Lixeira</span>
              <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                ▲
              </span>
            </div>
            <div className="p-2.5 space-y-2 text-[11px] bg-[#D6DFF7]">
              <button
                onClick={emptyRecycleBin}
                disabled={recycledProjects.length === 0}
                className="flex items-center space-x-1.5 hover:underline text-left cursor-pointer w-full disabled:opacity-40 disabled:pointer-events-none text-blue-900"
              >
                <Trash2 size={13} className="text-red-600 shrink-0" />
                <span>Esvaziar a Lixeira</span>
              </button>
              <button
                onClick={handleRestoreAll}
                disabled={recycledProjects.length === 0}
                className="flex items-center space-x-1.5 hover:underline text-left cursor-pointer w-full disabled:opacity-40 disabled:pointer-events-none text-blue-900"
              >
                <RotateCcw size={13} className="text-emerald-700 shrink-0" />
                <span>Restaurar todos os itens</span>
              </button>
            </div>
          </div>

          {/* Panel 2: Outros Locais */}
          <div className="bg-white rounded-t-sm shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-2.5 py-1 bg-gradient-to-r from-[#215DC6] to-[#4585E8] text-white font-bold text-[11px]">
              <span>Outros Locais</span>
              <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                ▲
              </span>
            </div>
            <div className="p-2.5 space-y-2 text-[11px] bg-[#D6DFF7]">
              <button
                onClick={openSystemProperties}
                className="flex items-center space-x-1.5 hover:underline text-left cursor-pointer w-full text-blue-900"
              >
                <HardDrive size={13} className="text-blue-700 shrink-0" />
                <span>Meu Computador</span>
              </button>
              <button
                onClick={() => openFolderWindow('web-apps')}
                className="flex items-center space-x-1.5 hover:underline text-left cursor-pointer w-full text-blue-900"
              >
                <Folder size={13} className="text-amber-500 shrink-0" />
                <span>Meus Projetos</span>
              </button>
            </div>
          </div>

          {/* Panel 3: Detalhes */}
          <div className="bg-white rounded-t-sm shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-2.5 py-1 bg-gradient-to-r from-[#215DC6] to-[#4585E8] text-white font-bold text-[11px]">
              <span>Detalhes</span>
              <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                ▲
              </span>
            </div>
            <div className="p-2.5 space-y-1 text-[11px] bg-[#D6DFF7] text-gray-800">
              <span className="font-bold text-gray-900 block">Lixeira</span>
              <span className="text-gray-600 block text-[10px]">Pasta do Sistema</span>
              <span className="text-gray-600 block text-[10px]">
                {recycledProjects.length} objeto(s)
              </span>
            </div>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 bg-white p-4 overflow-y-auto border-l border-[#7F9DB9]">
          {recycledProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center select-none py-12">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <XpIconRenderer icon="recycle-bin" size={56} />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">A Lixeira está vazia.</h3>
              <p className="text-gray-500 text-xs mt-1 max-w-sm leading-relaxed">
                Nenhum projeto ou arquivo foi descartado. Todos os seus subdomínios em cafureworks.link estão seguros e online!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recycledProjects.map((project) => {
                const isSel = selectedItem?.id === project.id;
                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedItem(project)}
                    className={`flex items-start space-x-3 p-2.5 rounded border transition-colors cursor-pointer ${
                      isSel
                        ? 'bg-[#316AC5] text-white border-[#0A246A]'
                        : 'bg-gray-50 hover:bg-blue-50 border-gray-200 text-gray-900'
                    }`}
                  >
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                      <XpIconRenderer icon={project.icon} size={32} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs truncate">{project.title}</h4>
                      <p
                        className={`text-[10px] truncate ${
                          isSel ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {project.url}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            restoreProject(project.id);
                          }}
                          className={`px-2 py-0.5 rounded-xs text-[10px] font-semibold flex items-center space-x-1 shadow-2xs border ${
                            isSel
                              ? 'bg-white text-blue-900 border-white hover:bg-gray-100'
                              : 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-500'
                          }`}
                        >
                          <RotateCcw size={10} />
                          <span>Restaurar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-2 py-0.5 bg-[#ECE9D8] border-t border-[#D4CEB8] text-[10px] text-gray-700">
        <span>{recycledProjects.length} objeto(s) na Lixeira</span>
        <span>Windows XP Explorer</span>
      </div>
    </div>
  );
};
