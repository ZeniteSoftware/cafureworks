import { useEffect } from 'react';
import { DesktopProvider } from './context/DesktopContext';
import { XpDesktop } from './components/xp/XpDesktop';
import { sounds } from './utils/sound';

export function AppContent() {
  // Play startup sound on first user gesture (to respect browser autoplay policies)
  useEffect(() => {
    let played = false;
    const handleFirstClick = () => {
      if (!played) {
        played = true;
        sounds.playStartup();
        window.removeEventListener('click', handleFirstClick);
        window.removeEventListener('keydown', handleFirstClick);
      }
    };
    window.addEventListener('click', handleFirstClick);
    window.addEventListener('keydown', handleFirstClick);
    return () => {
      window.removeEventListener('click', handleFirstClick);
      window.removeEventListener('keydown', handleFirstClick);
    };
  }, []);

  return <XpDesktop />;
}

export function App() {
  return (
    <DesktopProvider>
      <AppContent />
    </DesktopProvider>
  );
}

export default App;
