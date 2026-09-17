import { useEffect } from 'react';
import { DesktopProvider, useDesktop } from './context/DesktopContext';
import { XpDesktop } from './components/xp/XpDesktop';
import { XpLoginScreen } from './components/xp/XpLoginScreen';
import { XpCrtTurnOn } from './components/xp/XpCrtTurnOn';

export function AppContent() {
  const { systemState } = useDesktop();

  // Preload desktop wallpaper in background so it's instant upon login
  useEffect(() => {
    const img = new Image();
    img.src = '/windows_xp_wallpaper.jpg';
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black select-none">
      {/* Desktop only mounts/shows when user is logged in */}
      {systemState === 'desktop' && <XpDesktop />}

      {/* When not on desktop, show login and CRT overlays over solid black */}
      {systemState !== 'desktop' && (
        <div className="fixed inset-0 z-[99900] bg-black overflow-hidden">
          <XpLoginScreen />
          <XpCrtTurnOn />
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <DesktopProvider>
      <AppContent />
    </DesktopProvider>
  );
}

export default App;
