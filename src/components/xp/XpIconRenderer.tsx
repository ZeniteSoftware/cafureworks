import React from 'react';
import {
  MyComputerIcon,
  FolderIcon,
  FolderProjectsIcon,
  RecycleBinIcon,
  InternetExplorerIcon,
  NotepadIcon,
  PrismaIcon,
  ApiBotIcon,
  SystemPropertiesIcon,
  ProjectManagerIcon,
  GitHubIcon,
  CmdIcon,
  DisplayPropertiesIcon,
  MinesweeperIcon,
  MediaPlayerIcon,
  PaintIcon,
  CalcIcon,
} from './XpIcons';

interface XpIconRendererProps {
  icon: string;
  size?: number;
  className?: string;
}

const HD_ICON_MAP: Record<string, string> = {
  'my-computer': '/icons/my-computer.png',
  'my-documents': '/icons/my-documents.png',
  'folder': '/icons/folder.png',
  'folder-closed': '/icons/folder-closed.png',
  'folder-open': '/icons/folder-open.png',
  'folder-projects': '/icons/folder-projects.png',
  'notepad': '/icons/notepad.png',
  'paint': '/icons/paint.png',
  'calc': '/icons/calc.png',
  'calculator': '/icons/calc.png',
  'cmd': '/icons/cmd.png',
  'minesweeper': '/icons/minesweeper.png',
  'media-player': '/icons/media-player.png',
  'recycle-bin': '/icons/recycle-bin.png',
  'recycle-bin-empty': '/icons/recycle-bin-empty.png',
  'recycle-bin-full': '/icons/recycle-bin-full.png',
  'display-properties': '/icons/display-properties.png',
  'system-properties': '/icons/system-properties.png',
  'control-panel': '/icons/control-panel.png',
  'project-manager': '/icons/project-manager.png',
  'browser': '/icons/browser.png',
  'internet-explorer': '/icons/browser.png',
  'help': '/icons/help.png',
  'credits': '/icons/credits.png',
  'tour-xp': '/icons/tour-xp.png',
  'search': '/icons/search.png',
  'run': '/icons/run.png',
  'power': '/icons/power.png',
  'logoff': '/icons/logoff.png',
  'volume': '/icons/volume.png',
  'mute': '/icons/mute.png',
  'floppy': '/icons/floppy.png',
  'hard-drive': '/icons/hard-drive.png',
  'cd': '/icons/cd.png',
  'network': '/icons/network.png',
  'internet-shortcut': '/icons/internet-shortcut.png',
  'generic-doc': '/icons/generic-doc.png',
  'generic-app': '/icons/generic-app.png',
  'generic-media': '/icons/generic-media.png',
  'user-accounts': '/icons/user-accounts.png',
  'security': '/icons/security.png',
  'pinball': '/icons/pinball.png',
  'solitaire': '/icons/solitaire.png',
  'wordpad': '/icons/wordpad.png',
  'movie-maker': '/icons/movie-maker.png',
  'printer': '/icons/printer.png',
  'scanner': '/icons/scanner.png',
  'camera': '/icons/camera.png',
  'taskbar': '/icons/taskbar.png',
};

export const XpIconRenderer: React.FC<XpIconRendererProps> = ({
  icon,
  size = 32,
  className = '',
}) => {
  // If icon has a high resolution Windows XP icon
  const hdIconSrc = HD_ICON_MAP[icon];
  if (hdIconSrc) {
    return (
      <img
        src={hdIconSrc}
        alt=""
        draggable={false}
        style={{ width: size, height: size }}
        className={`object-contain select-none pointer-events-none drop-shadow-sm ${className}`}
      />
    );
  }

  // If icon is an external image URL
  if (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/')) {
    return (
      <img
        src={icon}
        alt=""
        draggable={false}
        style={{ width: size, height: size }}
        className={`object-contain select-none pointer-events-none drop-shadow-sm ${className}`}
      />
    );
  }

  // Fallback vector icons
  switch (icon) {
    case 'my-computer':
      return <MyComputerIcon size={size} className={className} />;
    case 'folder':
      return <FolderIcon size={size} className={className} />;
    case 'folder-projects':
      return <FolderProjectsIcon size={size} className={className} />;
    case 'recycle-bin':
      return <RecycleBinIcon size={size} className={className} />;
    case 'internet-explorer':
    case 'browser':
      return <InternetExplorerIcon size={size} className={className} />;
    case 'notepad':
      return <NotepadIcon size={size} className={className} />;
    case 'cmd':
      return <CmdIcon size={size} className={className} />;
    case 'display-properties':
      return <DisplayPropertiesIcon size={size} className={className} />;
    case 'minesweeper':
      return <MinesweeperIcon size={size} className={className} />;
    case 'media-player':
      return <MediaPlayerIcon size={size} className={className} />;
    case 'paint':
      return <PaintIcon size={size} className={className} />;
    case 'calc':
      return <CalcIcon size={size} className={className} />;
    case 'prisma':
      return <PrismaIcon size={size} className={className} />;
    case 'api-bot':
      return <ApiBotIcon size={size} className={className} />;
    case 'system-properties':
      return <SystemPropertiesIcon size={size} className={className} />;
    case 'project-manager':
      return <ProjectManagerIcon size={size} className={className} />;
    case 'github':
      return <GitHubIcon size={size} className={className} />;
    default:
      return <FolderIcon size={size} className={className} />;
  }
};

