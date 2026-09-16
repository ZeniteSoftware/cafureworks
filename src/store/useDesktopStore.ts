import { useState, useEffect } from 'react';
import type { FolderItem, ProjectItem, WindowState, WindowType } from '../types';
import { DEFAULT_FOLDERS, DEFAULT_PROJECTS, README_CONTENT } from '../data/projects';
import { sounds } from '../utils/sound';

const STORAGE_PROJECTS = 'cafure_xp_projects';
const STORAGE_FOLDERS = 'cafure_xp_folders';
const STORAGE_POSITIONS = 'cafure_xp_icon_positions';
const STORAGE_SOUND = 'cafure_xp_sound';

export function useDesktopStore() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(false);
  const [isShutdownOpen, setIsShutdownOpen] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState<number>(10);

  // Projects & Folders
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROJECTS);
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [folders, setFolders] = useState<FolderItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FOLDERS);
      return saved ? JSON.parse(saved) : DEFAULT_FOLDERS;
    } catch {
      return DEFAULT_FOLDERS;
    }
  });

  // Icon positions
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_POSITIONS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sound preference init
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SOUND);
      if (saved !== null) {
        const val = saved === 'true';
        setIsSoundEnabled(val);
        sounds.enabled = val;
      }
    } catch {
      // Ignore
    }
  }, []);

  const toggleSound = () => {
    const next = !isSoundEnabled;
    setIsSoundEnabled(next);
    sounds.enabled = next;
    if (next) {
      sounds.playDing();
    }
    try {
      localStorage.setItem(STORAGE_SOUND, String(next));
    } catch {
      // Ignore
    }
  };

  const focusWindow = (id: string) => {
    setNextZIndex((z) => {
      const newZ = z + 1;
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w))
      );
      return newZ;
    });
    setActiveWindowId(id);
  };

  const openWindow = (options: {
    id: string;
    title: string;
    type: WindowType;
    icon: string;
    data?: WindowState['data'];
    defaultSize?: { width: number; height: number };
  }) => {
    sounds.playClick();
    setIsStartMenuOpen(false);

    // Check if already open
    const existing = windows.find((w) => w.id === options.id);
    if (existing) {
      if (existing.isMinimized) {
        setWindows((prev) =>
          prev.map((w) => (w.id === options.id ? { ...w, isMinimized: false } : w))
        );
      }
      focusWindow(options.id);
      return;
    }

    const defaultWidth = options.defaultSize?.width || Math.min(window.innerWidth * 0.75, 760);
    const defaultHeight = options.defaultSize?.height || Math.min(window.innerHeight * 0.7, 520);
    const offsetX = Math.max(20, 50 + (windows.length % 6) * 30);
    const offsetY = Math.max(20, 40 + (windows.length % 6) * 30);

    const newZ = nextZIndex + 1;
    setNextZIndex(newZ);

    const newWin: WindowState = {
      id: options.id,
      title: options.title,
      type: options.type,
      icon: options.icon,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZ,
      position: { x: offsetX, y: offsetY },
      size: { width: defaultWidth, height: defaultHeight },
      data: options.data,
    };

    setWindows((prev) => [...prev, newWin]);
    setActiveWindowId(options.id);
  };

  const closeWindow = (id: string) => {
    sounds.playClick();
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter((w) => w.id !== id);
      if (remaining.length > 0) {
        const top = [...remaining].sort((a, b) => b.zIndex - a.zIndex)[0];
        setActiveWindowId(top.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const minimizeWindow = (id: string) => {
    sounds.playMinimize();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      const visible = windows.filter((w) => w.id !== id && !w.isMinimized);
      if (visible.length > 0) {
        const top = [...visible].sort((a, b) => b.zIndex - a.zIndex)[0];
        setActiveWindowId(top.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const toggleMaximize = (id: string) => {
    sounds.playRestore();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    focusWindow(id);
  };

  const updateWindowPosition = (id: string, pos: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: pos } : w))
    );
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size } : w))
    );
  };

  const updateIconPosition = (id: string, x: number, y: number) => {
    setIconPositions((prev) => {
      const updated = { ...prev, [id]: { x, y } };
      try {
        localStorage.setItem(STORAGE_POSITIONS, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const openFolderWindow = (folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    const title = folder ? folder.name : 'Meus Projetos';
    openWindow({
      id: `folder-${folderId}`,
      title,
      type: 'folder',
      icon: 'folder',
      data: { folderId },
      defaultSize: { width: 720, height: 480 },
    });
  };

  const openProject = (project: ProjectItem) => {
    sounds.playClick();
    if (project.openInIframe) {
      openWindow({
        id: `browser-${project.id}`,
        title: `${project.title} - Internet Explorer`,
        type: 'browser',
        icon: 'internet-explorer',
        data: { browserUrl: project.url, project },
        defaultSize: { width: 880, height: 600 },
      });
    } else {
      // Abre o subdomínio diretamente em nova aba
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  const openNotepad = (fileContent = README_CONTENT, title = 'README.txt - Bloco de Notas') => {
    openWindow({
      id: 'app-notepad',
      title,
      type: 'notepad',
      icon: 'notepad',
      data: { fileContent },
      defaultSize: { width: 620, height: 440 },
    });
  };

  const openSystemProperties = () => {
    openWindow({
      id: 'app-system-properties',
      title: 'Propriedades do Sistema',
      type: 'system-properties',
      icon: 'system-properties',
      defaultSize: { width: 440, height: 480 },
    });
  };

  const openProjectManager = () => {
    openWindow({
      id: 'app-project-manager',
      title: 'Gerenciador de Projetos & Subdomínios',
      type: 'project-manager',
      icon: 'project-manager',
      defaultSize: { width: 680, height: 500 },
    });
  };

  const addProject = (item: ProjectItem) => {
    setProjects((prev) => {
      const updated = [item, ...prev];
      try {
        localStorage.setItem(STORAGE_PROJECTS, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
    sounds.playDing();
  };

  const deleteProject = (id: string) => {
    sounds.playRecycle();
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(STORAGE_PROJECTS, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const addFolder = (folder: FolderItem) => {
    setFolders((prev) => {
      const updated = [...prev, folder];
      try {
        localStorage.setItem(STORAGE_FOLDERS, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
    sounds.playDing();
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_PROJECTS);
    localStorage.removeItem(STORAGE_FOLDERS);
    localStorage.removeItem(STORAGE_POSITIONS);
    setProjects(DEFAULT_PROJECTS);
    setFolders(DEFAULT_FOLDERS);
    setIconPositions({});
    sounds.playDing();
  };

  return {
    windows,
    activeWindowId,
    isStartMenuOpen,
    isShutdownOpen,
    isSoundEnabled,
    selectedIconId,
    projects,
    folders,
    iconPositions,
    setIsStartMenuOpen,
    setIsShutdownOpen,
    setSelectedIconId,
    toggleSound,
    focusWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    updateWindowPosition,
    updateWindowSize,
    updateIconPosition,
    openFolderWindow,
    openProject,
    openNotepad,
    openSystemProperties,
    openProjectManager,
    addProject,
    deleteProject,
    addFolder,
    resetToDefaults,
  };
}

export type DesktopStoreType = ReturnType<typeof useDesktopStore>;
