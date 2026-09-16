import React, { useRef, useState } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { XpWallpaper } from './XpWallpaper';
import { XpMarqueeSelection } from './XpMarqueeSelection';
import { XpDesktopIcon } from './XpDesktopIcon';
import { XpTaskbar } from './XpTaskbar';
import { XpStartMenu } from './XpStartMenu';
import { XpShutdownDialog } from './XpShutdownDialog';
import { XpWindow } from './XpWindow';
import { XpExplorer } from './XpExplorer';
import { XpNotepad } from './XpNotepad';
import { XpSystemProperties } from './XpSystemProperties';
import { XpProjectManager } from './XpProjectManager';
import { XpBrowser } from './XpBrowser';
import { sounds } from '../../utils/sound';

export const XpDesktop: React.FC = () => {
  const {
    windows,
    folders,
    projects,
    setSelectedIconId,
    openWindow,
    openFolderWindow,
    openProject,
    openNotepad,
    openSystemProperties,
    openProjectManager,
  } = useDesktop();

  const desktopRef = useRef<HTMLDivElement>(null);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  // Base layout grid positions for default icons
  let currentGridY = 20;
  let currentGridX = 20;
  const gridGapY = 78;
  const gridGapX = 85;

  const nextPos = () => {
    const pos = { x: currentGridX, y: currentGridY };
    currentGridY += gridGapY;
    if (currentGridY > window.innerHeight - 150) {
      currentGridY = 20;
      currentGridX += gridGapX;
    }
    return pos;
  };

  // Pre-calculated default positions
  const posMyComputer = nextPos();
  const posMyProjects = nextPos();
  const posNotepad = nextPos();

  // Folders on desktop
  const desktopFolders = folders.filter((f) => f.showOnDesktop !== false);
  const folderPositions = desktopFolders.map(() => nextPos());

  // Projects on desktop
  const desktopProjects = projects.filter((p) => p.showOnDesktop !== false);
  const projectPositions = desktopProjects.map(() => nextPos());

  // Management & Tools
  const posProjectManager = nextPos();
  const posRecycle = { x: 20, y: Math.max(300, (window.innerHeight || 800) - 130) };

  return (
    <div
      ref={desktopRef}
      onContextMenu={handleContextMenu}
      onClick={() => {
        closeContextMenu();
        setSelectedIconId(null);
      }}
      className="relative w-screen h-screen overflow-hidden select-none"
    >
      {/* Bliss Wallpaper */}
      <XpWallpaper />

      {/* Marquee Area Drag Selection */}
      <XpMarqueeSelection containerRef={desktopRef} />

      {/* DESKTOP ICONS */}
      {/* 1. Meu Computador */}
      <XpDesktopIcon
        id="desktop-my-computer"
        title="Meu Computador"
        icon="my-computer"
        defaultX={posMyComputer.x}
        defaultY={posMyComputer.y}
        onOpen={openSystemProperties}
      />

      {/* 2. Meus Projetos (Explorer Root) */}
      <XpDesktopIcon
        id="desktop-my-projects"
        title="Meus Projetos"
        icon="folder-projects"
        badge="Hub"
        defaultX={posMyProjects.x}
        defaultY={posMyProjects.y}
        onOpen={() => openFolderWindow('web-apps')}
      />

      {/* 3. Folders on Desktop */}
      {desktopFolders.map((folder, index) => (
        <XpDesktopIcon
          key={folder.id}
          id={`desktop-folder-${folder.id}`}
          title={folder.name}
          icon={folder.icon}
          defaultX={folderPositions[index].x}
          defaultY={folderPositions[index].y}
          onOpen={() => openFolderWindow(folder.id)}
        />
      ))}

      {/* 4. Projects on Desktop (e.g. Prisma) */}
      {desktopProjects.map((project, index) => (
        <XpDesktopIcon
          key={project.id}
          id={`desktop-project-${project.id}`}
          title={project.title}
          icon={project.icon}
          badge={project.badge}
          defaultX={projectPositions[index].x}
          defaultY={projectPositions[index].y}
          onOpen={() => openProject(project)}
        />
      ))}

      {/* 5. Bloco de Notas (README.txt) */}
      <XpDesktopIcon
        id="desktop-readme"
        title="README.txt"
        icon="notepad"
        defaultX={posNotepad.x}
        defaultY={posNotepad.y}
        onOpen={() => openNotepad()}
      />

      {/* 6. Gerenciador de Projetos */}
      <XpDesktopIcon
        id="desktop-manager"
        title="Adicionar Projeto"
        icon="project-manager"
        defaultX={posProjectManager.x}
        defaultY={posProjectManager.y}
        onOpen={openProjectManager}
      />

      {/* 7. Lixeira */}
      <XpDesktopIcon
        id="desktop-recycle-bin"
        title="Lixeira"
        icon="recycle-bin"
        defaultX={posRecycle.x}
        defaultY={posRecycle.y}
        onOpen={() => {
          sounds.playRecycle();
          openWindow({
            id: 'app-recycle-bin',
            title: 'Lixeira',
            type: 'recycle-bin',
            icon: 'recycle-bin',
            defaultSize: { width: 500, height: 350 },
          });
        }}
      />

      {/* OPEN WINDOWS RENDERER */}
      {windows.map((win) => {
        return (
          <XpWindow key={win.id} window={win}>
            {win.type === 'folder' && (
              <XpExplorer currentFolderId={win.data?.folderId} />
            )}
            {win.type === 'notepad' && (
              <XpNotepad initialContent={win.data?.fileContent} />
            )}
            {win.type === 'system-properties' && <XpSystemProperties />}
            {win.type === 'project-manager' && <XpProjectManager />}
            {win.type === 'browser' && (
              <XpBrowser initialUrl={win.data?.browserUrl} />
            )}
            {win.type === 'recycle-bin' && (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center select-none bg-white">
                <div className="w-16 h-16 mb-3">
                  <XpDesktopIcon
                    id="inner-bin"
                    title=""
                    icon="recycle-bin"
                    defaultX={0}
                    defaultY={0}
                    onOpen={() => {}}
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-sm">A Lixeira está vazia.</h3>
                <p className="text-gray-500 text-xs mt-1 max-w-sm">
                  Nenhum projeto foi descartado. Todos os seus subdomínios em cafureworks.link estão seguros e online!
                </p>
              </div>
            )}
          </XpWindow>
        );
      })}

      {/* Right Click Context Menu */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            boxShadow: '2px 2px 6px rgba(0,0,0,0.35)',
            fontFamily: 'Tahoma, "Segoe UI", sans-serif',
          }}
          className="fixed z-[99999] w-48 bg-[#ECE9D8] border border-[#716F64] rounded-2xs py-1 text-[11px] text-gray-900 select-none shadow-md"
        >
          <button
            onClick={() => {
              sounds.playClick();
              window.location.reload();
            }}
            className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer"
          >
            Atualizar
          </button>
          <button
            onClick={() => {
              openProjectManager();
              closeContextMenu();
            }}
            className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer"
          >
            Adicionar Novo Projeto...
          </button>
          <div className="h-[1px] bg-[#D4CEB8] my-1" />
          <button
            onClick={() => {
              openFolderWindow('web-apps');
              closeContextMenu();
            }}
            className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer"
          >
            Abrir Meus Projetos
          </button>
          <button
            onClick={() => {
              openNotepad();
              closeContextMenu();
            }}
            className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer"
          >
            Ver README.txt
          </button>
          <div className="h-[1px] bg-[#D4CEB8] my-1" />
          <button
            onClick={() => {
              openSystemProperties();
              closeContextMenu();
            }}
            className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer font-bold"
          >
            Propriedades
          </button>
        </div>
      )}

      {/* Start Menu */}
      <XpStartMenu />

      {/* Shutdown Dialog Modal */}
      <XpShutdownDialog />

      {/* Taskbar */}
      <XpTaskbar />
    </div>
  );
};
