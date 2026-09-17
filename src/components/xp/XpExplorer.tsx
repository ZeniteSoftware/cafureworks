import React, { useState } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import type { ProjectItem } from '../../types';
import { XpIconRenderer } from './XpIconRenderer';
import { ArrowLeft, ArrowRight, ArrowUp, Search, Folder, ExternalLink, Globe } from 'lucide-react';

interface XpExplorerProps {
  currentFolderId?: string;
}

export const XpExplorer: React.FC<XpExplorerProps> = ({ currentFolderId: initialFolderId }) => {
  const {
    folders,
    projects,
    openProject,
    openSystemProperties,
    openNotepad,
    openProjectManager,
  } = useDesktop();


  const [activeFolderId, setActiveFolderId] = useState<string | undefined>(initialFolderId);
  const [history, setHistory] = useState<string[]>(initialFolderId ? [initialFolderId] : []);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<'icons' | 'list'>('icons');
  const [lastClickedId, setLastClickedId] = useState<string | null>(null);
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  const currentFolder = folders.find((f) => f.id === activeFolderId);
  const folderProjects = activeFolderId
    ? projects.filter((p) => p.folderId === activeFolderId)
    : projects;

  const navigateToFolder = (folderId: string | undefined) => {
    setActiveFolderId(folderId);
    setSelectedItem(null);
    if (folderId) {
      const nextHist = [...history.slice(0, historyIndex + 1), folderId];
      setHistory(nextHist);
      setHistoryIndex(nextHist.length - 1);
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevId = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setActiveFolderId(prevId);
      setSelectedItem(null);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextId = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setActiveFolderId(nextId);
      setSelectedItem(null);
    }
  };

  const handleUp = () => {
    navigateToFolder(undefined);
  };

  const handleProjectClick = (project: ProjectItem) => {
    const now = Date.now();
    if (lastClickedId === project.id && now - lastClickTime < 450) {
      // Double click
      openProject(project);
      setLastClickedId(null);
    } else {
      setSelectedItem(project);
      setLastClickedId(project.id);
      setLastClickTime(now);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] select-none text-[11px] font-sans">
      {/* Navigation & Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-2 py-1 bg-[#ECE9D8] border-b border-[#D4CEB8]">
        {/* Back Button */}
        <button
          onClick={handleBack}
          disabled={historyIndex <= 0}
          className="flex items-center space-x-1 px-2 py-1 rounded-xs border border-transparent hover:border-[#7A96DF] hover:bg-white/60 active:bg-[#B5C7F0] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <ArrowLeft size={12} />
          </div>
          <span className="font-semibold text-gray-800">Voltar</span>
        </button>

        {/* Forward Button */}
        <button
          onClick={handleForward}
          disabled={historyIndex >= history.length - 1}
          className="p-1 rounded-xs border border-transparent hover:border-[#7A96DF] hover:bg-white/60 active:bg-[#B5C7F0] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <ArrowRight size={12} />
          </div>
        </button>

        {/* Up Level */}
        <button
          onClick={handleUp}
          disabled={!activeFolderId}
          title="Nível acima"
          className="p-1.5 rounded-xs border border-transparent hover:border-[#7A96DF] hover:bg-white/60 active:bg-[#B5C7F0] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <ArrowUp size={16} className="text-yellow-700" />
        </button>

        <div className="w-[1px] h-5 bg-[#CCC7B5] mx-1" />

        {/* Search */}
        <button
          onClick={openProjectManager}
          className="flex items-center space-x-1 px-2 py-1 rounded-xs border border-transparent hover:border-[#7A96DF] hover:bg-white/60 active:bg-[#B5C7F0] cursor-pointer"
        >
          <Search size={15} className="text-blue-700" />
          <span>Pesquisar</span>
        </button>

        {/* Folders */}
        <button
          onClick={() => navigateToFolder(undefined)}
          className={`flex items-center space-x-1 px-2 py-1 rounded-xs border cursor-pointer ${
            !activeFolderId
              ? 'bg-[#B5C7F0] border-[#7A96DF]'
              : 'border-transparent hover:border-[#7A96DF] hover:bg-white/60'
          }`}
        >
          <Folder size={15} className="text-yellow-600" />
          <span>Pastas</span>
        </button>

        <div className="w-[1px] h-5 bg-[#CCC7B5] mx-1" />

        {/* View mode toggle */}
        <button
          onClick={() => setViewMode(viewMode === 'icons' ? 'list' : 'icons')}
          className="px-2 py-1 rounded-xs border border-transparent hover:border-[#7A96DF] hover:bg-white/60 text-gray-700 cursor-pointer"
        >
          Modo: <span className="font-semibold">{viewMode === 'icons' ? 'Ícones' : 'Lista'}</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center space-x-2 px-2 py-1 bg-[#ECE9D8] border-b border-[#D4CEB8]">
        <span className="text-gray-600 shrink-0 font-medium">Endereço</span>
        <div className="flex-1 flex items-center bg-white border border-[#7F9DB9] rounded-2xs px-2 py-0.5 shadow-inner">
          <Globe size={14} className="text-blue-600 mr-1.5 shrink-0" />
          <input
            type="text"
            readOnly
            value={
              currentFolder
                ? `C:\\CafureWorks\\${currentFolder.name}`
                : 'C:\\CafureWorks\\Meus Projetos'
            }
            className="w-full text-[11px] outline-none text-gray-800 font-mono"
          />
        </div>
        <button
          onClick={() => {
            if (selectedItem) openProject(selectedItem);
          }}
          className="flex items-center space-x-1 px-2 py-0.5 rounded-2xs bg-gradient-to-b from-white to-[#E1DEC9] border border-[#7F9DB9] hover:brightness-105 active:brightness-95 cursor-pointer shadow-xs"
        >
          <span className="text-emerald-700 font-bold">Ir</span>
        </button>
      </div>

      {/* Main Split Body: Left Sidebar + Right Files Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Classic XP Left Sidebar (Task Panels) */}
        <div className="w-56 shrink-0 bg-gradient-to-b from-[#7A96DF] to-[#607FC9] p-2 overflow-y-auto space-y-3 hidden sm:block border-r border-[#4A64A5]">
          {/* Panel 1: Tarefas de Projetos */}
          <div className="bg-white rounded-t-sm shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-2.5 py-1 bg-gradient-to-r from-[#215DC6] to-[#4585E8] text-white font-bold text-[11px]">
              <span>Tarefas de Projetos</span>
              <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                ▲
              </span>
            </div>
            <div className="p-2 space-y-1.5 bg-[#D3E5FA]/50 text-[#1B3E7A] text-[11px]">
              <button
                onClick={openProjectManager}
                className="flex items-center space-x-1.5 hover:underline text-left cursor-pointer w-full"
              >
                <span className="text-blue-600 font-bold">＋</span>
                <span>Adicionar novo projeto</span>
              </button>
              <button
                onClick={() => openNotepad()}
                className="flex items-center space-x-1.5 hover:underline text-left cursor-pointer w-full"
              >
                <span className="text-blue-600 font-bold">📄</span>
                <span>Ver documentação (README)</span>
              </button>
              <button
                onClick={() => window.open('https://cafureworks.link', '_blank')}
                className="flex items-center space-x-1.5 hover:underline text-left cursor-pointer w-full"
              >
                <ExternalLink size={12} className="text-blue-600" />
                <span>Portal CafureWorks</span>
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
            <div className="p-2 space-y-1.5 bg-[#D3E5FA]/50 text-[#1B3E7A] text-[11px]">
              <button
                onClick={() => navigateToFolder(undefined)}
                className="flex items-center space-x-1.5 hover:underline text-left cursor-pointer w-full"
              >
                <XpIconRenderer icon="folder" size={14} />
                <span>Todos os Projetos</span>
              </button>
              <button
                onClick={openSystemProperties}
                className="flex items-center space-x-1.5 hover:underline text-left cursor-pointer w-full"
              >
                <XpIconRenderer icon="system-properties" size={14} />
                <span>Meu Computador</span>
              </button>
            </div>
          </div>

          {/* Panel 3: Detalhes do Item Selecionado */}
          <div className="bg-white rounded-t-sm shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-2.5 py-1 bg-gradient-to-r from-[#215DC6] to-[#4585E8] text-white font-bold text-[11px]">
              <span>Detalhes</span>
              <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                ▲
              </span>
            </div>
            <div className="p-2 bg-[#D3E5FA]/50 text-gray-800 text-[11px]">
              {selectedItem ? (
                <div className="space-y-1">
                  <p className="font-bold text-[#1B3E7A] break-words">{selectedItem.title}</p>
                  <p className="text-gray-600 text-[10px] break-all">{selectedItem.url}</p>
                  <p className="text-gray-700 mt-1">{selectedItem.description}</p>
                  {selectedItem.techStack && (
                    <div className="mt-2 pt-1 border-t border-blue-200">
                      <span className="font-bold text-[#1B3E7A]">Tecnologias:</span>
                      <p className="text-[10px] text-gray-600">
                        {selectedItem.techStack.join(', ')}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => openProject(selectedItem)}
                    className="mt-2 w-full py-1 bg-[#215DC6] hover:bg-[#1A4AA0] text-white font-bold text-[10px] rounded-xs shadow-xs cursor-pointer text-center"
                  >
                    Abrir Subdomínio ↗
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Selecione um projeto para ver detalhes, stack e link direto.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Explorer Content Area */}
        <div className="flex-1 bg-white p-3 overflow-y-auto">
          {/* Folders Section if in root */}
          {!activeFolderId && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-600 mb-2 pb-1 border-b border-gray-200">
                Pastas de Categorias
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    onDoubleClick={() => navigateToFolder(folder.id)}
                    onClick={() => navigateToFolder(folder.id)}
                    className="flex items-center space-x-2.5 p-2 rounded border border-transparent hover:bg-[#E5F1FB] hover:border-[#7DA2CE] cursor-pointer transition-colors"
                  >
                    <XpIconRenderer icon={folder.icon} size={32} />
                    <div className="overflow-hidden">
                      <p className="font-medium text-gray-900 truncate">{folder.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">Pasta de Arquivos</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Category Title */}
          <div className="flex items-center justify-between pb-1 mb-2 border-b border-gray-200">
            <h3 className="text-xs font-bold text-gray-700">
              {currentFolder ? currentFolder.name : 'Todos os Projetos & Subdomínios'}
            </h3>
            <span className="text-[10px] text-gray-500">
              {folderProjects.length} projeto(s)
            </span>
          </div>

          {/* Projects Grid / List */}
          {folderProjects.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p>Nenhum projeto encontrado nesta pasta.</p>
              <button
                onClick={openProjectManager}
                className="mt-2 text-blue-600 hover:underline cursor-pointer"
              >
                + Adicionar um novo projeto aqui
              </button>
            </div>
          ) : viewMode === 'icons' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {folderProjects.map((project) => {
                const isSelected = selectedItem?.id === project.id;
                return (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className={`flex flex-col items-center p-2 rounded-xs border cursor-pointer select-none transition-all ${
                      isSelected
                        ? 'bg-[#316AC5] text-white border-[#1B4B8A]'
                        : 'border-transparent hover:bg-[#E5F1FB] hover:border-[#7DA2CE] text-gray-800'
                    }`}
                  >
                    <div className="relative mb-1">
                      <XpIconRenderer icon={project.icon} size={40} />
                      {project.badge && (
                        <span className="absolute -top-1 -right-1 px-1 py-0.2 text-[8px] font-bold text-white bg-blue-600 rounded-full border border-white">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-center font-medium leading-tight max-w-full truncate">
                      {project.title}
                    </span>
                    <span
                      className={`text-[9px] truncate max-w-full mt-0.5 ${
                        isSelected ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {project.url.replace(/^https?:\/\//, '')}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="divide-y divide-gray-100">
              <div className="grid grid-cols-12 gap-2 py-1 px-2 font-bold text-gray-600 text-[10px] bg-gray-50 border-b">
                <span className="col-span-5">Nome do Projeto</span>
                <span className="col-span-4">Subdomínio / URL</span>
                <span className="col-span-3">Categoria</span>
              </div>
              {folderProjects.map((project) => {
                const isSelected = selectedItem?.id === project.id;
                return (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className={`grid grid-cols-12 gap-2 py-1.5 px-2 items-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#316AC5] text-white'
                        : 'hover:bg-[#E5F1FB] text-gray-800'
                    }`}
                  >
                    <div className="col-span-5 flex items-center space-x-2 truncate">
                      <XpIconRenderer icon={project.icon} size={20} />
                      <span className="font-medium truncate">{project.title}</span>
                    </div>
                    <span
                      className={`col-span-4 truncate text-[10px] ${
                        isSelected ? 'text-blue-100' : 'text-blue-700'
                      }`}
                    >
                      {project.url}
                    </span>
                    <span
                      className={`col-span-3 truncate text-[10px] ${
                        isSelected ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
