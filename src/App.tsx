import { DesktopProvider, useDesktop } from './context/DesktopContext';
import { XpDesktop } from './components/xp/XpDesktop';
import { XpLoginScreen } from './components/xp/XpLoginScreen';
import { XpCrtTurnOn } from './components/xp/XpCrtTurnOn';

export function AppContent() {
  const { systemState } = useDesktop();

  return (
    <>
      <XpDesktop />
      {systemState !== 'desktop' && (
        <>
          <XpLoginScreen />
          <XpCrtTurnOn />
        </>
      )}
    </>
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
