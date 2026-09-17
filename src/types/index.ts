export type SystemState = 'off' | 'turning-on' | 'login' | 'logging-in' | 'desktop';

export type WindowType = 
  | 'folder' 
  | 'notepad' 
  | 'system-properties' 
  | 'browser' 
  | 'project-manager' 
  | 'recycle-bin';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  url: string; // e.g. "https://prisma.cafureworks.link"
  icon: string; // Nome do ícone ou URL/SVG
  category: string;
  folderId?: string; // id da pasta onde reside (ou undefined se raiz/desktop)
  showOnDesktop?: boolean;
  badge?: string; // e.g. "Destaque", "Online", "v1.0"
  techStack?: string[];
  openInIframe?: boolean;
}

export interface FolderItem {
  id: string;
  name: string;
  description?: string;
  icon: string;
  parentId?: string;
  showOnDesktop?: boolean;
}

export interface WindowState {
  id: string;
  title: string;
  type: WindowType;
  icon: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  data?: {
    folderId?: string;
    project?: ProjectItem;
    browserUrl?: string;
    fileContent?: string;
  };
}

export interface DesktopIconPosition {
  id: string;
  x: number;
  y: number;
}
