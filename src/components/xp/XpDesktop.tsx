import React, { useRef, useState } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { XpWallpaper } from './XpWallpaper';
import { XpMarqueeSelection } from './XpMarqueeSelection';
import { XpDesktopIcon, GRID_CELL_W, GRID_CELL_H, GRID_START_X, GRID_START_Y } from './XpDesktopIcon';
import { XpTaskbar } from './XpTaskbar';
import { XpStartMenu } from './XpStartMenu';
import { XpShutdownDialog } from './XpShutdownDialog';
import { XpWindow } from './XpWindow';
import { XpExplorer } from './XpExplorer';
import { XpNotepad } from './XpNotepad';
import { XpSystemProperties } from './XpSystemProperties';
import { XpProjectManager } from './XpProjectManager';
import { XpBrowser } from './XpBrowser';
import { XpRecycleBin } from './XpRecycleBin';
import { XpCmd } from './XpCmd';
import { XpDisplayProperties } from './XpDisplayProperties';
import { XpMinesweeper } from './XpMinesweeper';
import { XpMediaPlayer } from './XpMediaPlayer';
import { XpPaint } from './XpPaint';
import { XpCalculator } from './XpCalculator';
import { XpCredits } from './XpCredits';
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
    openCmd,
    openDisplayProperties,
    openMinesweeper,
    openMediaPlayer,
    openPaint,
    openCalculator,
    openCredits,
    arrangeIconsToGrid,
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

  // Base layout grid calculation
  const getGridPosition = (index: number) => {
    const windowH = typeof window !== 'undefined' ? window.innerHeight : 800;
    const maxRows = Math.max(1, Math.floor((windowH - 50 - GRID_START_Y) / GRID_CELL_H));
    const col = Math.floor(index / maxRows);
    const row = index % maxRows;
    return {
      x: GRID_START_X + col * GRID_CELL_W,
      y: GRID_START_Y + row * GRID_CELL_H,
    };
  };

  let iconIndex = 0;
  const posMyComputer = getGridPosition(iconIndex++);
  const posMyProjects = getGridPosition(iconIndex++);
  const posCmd = getGridPosition(iconIndex++);
  const posPaint = getGridPosition(iconIndex++);
  const posMinesweeper = getGridPosition(iconIndex++);
  const posMediaPlayer = getGridPosition(iconIndex++);
  const posCalc = getGridPosition(iconIndex++);
  const posNotepad = getGridPosition(iconIndex++);
  const posProjectManager = getGridPosition(iconIndex++);
  const posCredits = getGridPosition(iconIndex++);

  // Custom user folders on desktop (if any)
  const desktopFolders = folders.filter((f) => f.showOnDesktop === true);
  const folderPositions = desktopFolders.map(() => getGridPosition(iconIndex++));

  // Custom user projects on desktop (if any)
  const desktopProjects = projects.filter((p) => p.showOnDesktop !== false);
  const projectPositions = desktopProjects.map(() => getGridPosition(iconIndex++));

  // Recycle bin positioned at the bottom of the first grid column
  const windowH = typeof window !== 'undefined' ? window.innerHeight : 800;
  const maxRows = Math.max(1, Math.floor((windowH - 50 - GRID_START_Y) / GRID_CELL_H));
  const recycleRow = Math.max(iconIndex, maxRows - 1);
  const posRecycle = { x: GRID_START_X, y: GRID_START_Y + recycleRow * GRID_CELL_H };

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

      {/* DESKTOP ICONS - ALIGNED TO GRID */}
      {/* 1. Meu Computador */}
      <XpDesktopIcon
        id="desktop-my-computer"
        title="Meu Computador"
        icon="my-computer"
        defaultX={posMyComputer.x}
        defaultY={posMyComputer.y}
        onOpen={openSystemProperties}
      />

      {/* 2. Meus Projetos */}
      <XpDesktopIcon
        id="desktop-my-projects"
        title="Meus Projetos"
        icon="folder-projects"
        defaultX={posMyProjects.x}
        defaultY={posMyProjects.y}
        onOpen={() => openFolderWindow('web-apps')}
      />

      {/* 3. Prompt de Comando */}
      <XpDesktopIcon
        id="desktop-cmd"
        title="Prompt de comando"
        icon="cmd"
        defaultX={posCmd.x}
        defaultY={posCmd.y}
        onOpen={openCmd}
      />

      {/* 4. Paint */}
      <XpDesktopIcon
        id="desktop-paint"
        title="Paint"
        icon="paint"
        defaultX={posPaint.x}
        defaultY={posPaint.y}
        onOpen={openPaint}
      />

      {/* 5. Campo Minado */}
      <XpDesktopIcon
        id="desktop-minesweeper"
        title="Campo Minado"
        icon="minesweeper"
        defaultX={posMinesweeper.x}
        defaultY={posMinesweeper.y}
        onOpen={openMinesweeper}
      />

      {/* 6. Windows Media Player */}
      <XpDesktopIcon
        id="desktop-media-player"
        title="Windows Media Player"
        icon="media-player"
        defaultX={posMediaPlayer.x}
        defaultY={posMediaPlayer.y}
        onOpen={openMediaPlayer}
      />

      {/* 7. Calculadora */}
      <XpDesktopIcon
        id="desktop-calc"
        title="Calculadora"
        icon="calc"
        defaultX={posCalc.x}
        defaultY={posCalc.y}
        onOpen={openCalculator}
      />

      {/* 8. Bloco de Notas (README.txt) */}
      <XpDesktopIcon
        id="desktop-readme"
        title="README.txt"
        icon="notepad"
        defaultX={posNotepad.x}
        defaultY={posNotepad.y}
        onOpen={() => openNotepad()}
      />

      {/* 9. Gerenciador de Projetos */}
      <XpDesktopIcon
        id="desktop-manager"
        title="Adicionar Projeto"
        icon="project-manager"
        defaultX={posProjectManager.x}
        defaultY={posProjectManager.y}
        onOpen={openProjectManager}
      />

      {/* 10. Créditos & Recursos */}
      <XpDesktopIcon
        id="desktop-credits"
        title="Créditos & Ícones"
        icon="credits"
        defaultX={posCredits.x}
        defaultY={posCredits.y}
        onOpen={openCredits}
      />

      {/* Custom folders on Desktop (if any) */}
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

      {/* Custom user projects on Desktop (if any) */}
      {desktopProjects.map((project, index) => (
        <XpDesktopIcon
          key={project.id}
          id={`desktop-project-${project.id}`}
          title={project.title}
          icon={project.icon}
          defaultX={projectPositions[index].x}
          defaultY={projectPositions[index].y}
          onOpen={() => openProject(project)}
        />
      ))}

      {/* Lixeira */}
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
            {win.type === 'recycle-bin' && <XpRecycleBin />}
            {win.type === 'cmd' && <XpCmd />}
            {win.type === 'display-properties' && <XpDisplayProperties />}
            {win.type === 'minesweeper' && <XpMinesweeper />}
            {win.type === 'media-player' && <XpMediaPlayer />}
            {win.type === 'paint' && <XpPaint />}
            {win.type === 'calc' && <XpCalculator />}
            {win.type === 'credits' && <XpCredits />}
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
          className="fixed z-[99999] w-52 bg-[#ECE9D8] border border-[#716F64] rounded-2xs py-1 text-[11px] text-gray-900 select-none shadow-md"
        >
          <button
            onClick={() => {
              arrangeIconsToGrid();
              closeContextMenu();
            }}
            className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer font-bold"
          >
            Organizar Ícones em Grade
          </button>
          <div className="h-[1px] bg-[#D4CEB8] my-1" />
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
          <button
            onClick={() => {
              openCredits();
              closeContextMenu();
            }}
            className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer"
          >
            Créditos & Recursos...
          </button>
          <div className="h-[1px] bg-[#D4CEB8] my-1" />
          <button
            onClick={() => {
              openDisplayProperties();
              closeContextMenu();
            }}
            className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer"
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
