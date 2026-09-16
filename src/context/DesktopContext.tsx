import React, { createContext, useContext } from 'react';
import { useDesktopStore } from '../store/useDesktopStore';
import type { DesktopStoreType } from '../store/useDesktopStore';

const DesktopContext = createContext<DesktopStoreType | null>(null);

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useDesktopStore();
  return <DesktopContext.Provider value={store}>{children}</DesktopContext.Provider>;
};

export const useDesktop = (): DesktopStoreType => {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
};
