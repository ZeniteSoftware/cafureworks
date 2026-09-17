import { useEffect } from 'react';
import { DesktopProvider, useDesktop } from './context/DesktopContext';
import { XpDesktop } from './components/xp/XpDesktop';
import { XpLoginScreen } from './components/xp/XpLoginScreen';
import { XpCrtTurnOn } from './components/xp/XpCrtTurnOn';
import { XpScreensaver } from './components/xp/XpScreensaver';

export function AppContent() {
  const { systemState, triggerScreensaver, isScreensaverActive } = useDesktop();

  // Preload desktop wallpaper in background so it's instant upon login
  useEffect(() => {
    const img = new Image();
    img.src = '/windows_xp_wallpaper.jpg';
  }, []);

  // Idle timer for screensaver (3 minutes of inactivity)
  useEffect(() => {
    if (systemState !== 'desktop' || isScreensaverActive) return;

    let timer = setTimeout(() => {
      triggerScreensaver();
    }, 180000);

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        triggerScreensaver();
      }, 180000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [systemState, isScreensaverActive, triggerScreensaver]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black select-none">
      {/* Desktop only mounts/shows when user is logged in */}
      {systemState === 'desktop' && (
        <>
          <XpDesktop />
          <XpScreensaver />
        </>
      )}

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
