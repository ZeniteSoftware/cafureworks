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
} from './XpIcons';

interface XpIconRendererProps {
  icon: string;
  size?: number;
  className?: string;
}

export const XpIconRenderer: React.FC<XpIconRendererProps> = ({
  icon,
  size = 32,
  className = '',
}) => {
  // If icon is an image URL (e.g. http:// or /favicon.ico)
  if (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/')) {
    return (
      <img
        src={icon}
        alt=""
        style={{ width: size, height: size }}
        className={`object-contain ${className}`}
      />
    );
  }

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
      return <InternetExplorerIcon size={size} className={className} />;
    case 'notepad':
      return <NotepadIcon size={size} className={className} />;
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
