import React, { useState } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { WindowsFlagIcon } from './XpIcons';
import { sounds } from '../../utils/sound';

export interface WallpaperOption {
  id: string;
  name: string;
  src: string;
  isColor?: boolean;
}

export const WALLPAPERS: WallpaperOption[] = [
  {
    id: 'bliss',
    name: 'Bliss (Original Windows XP)',
    src: '/windows_xp_wallpaper.jpg',
  },
  {
    id: 'royal-blue',
    name: 'Azul Windows XP (Clássico)',
    src: '#004E98',
    isColor: true,
  },
  {
    id: 'navy-solid',
    name: 'Azul Marinho Sólido',
    src: '#0A246A',
    isColor: true,
  },
  {
    id: 'deep-slate',
    name: 'Grafite Retrô',
    src: '#2A3439',
    isColor: true,
  },
];

export const XpDisplayProperties: React.FC = () => {
  const { closeWindow, wallpaper, setWallpaper, triggerScreensaver } = useDesktop();

  const [activeTab, setActiveTab] = useState<'desktop' | 'screensaver' | 'appearance'>('desktop');
  const [selectedWp, setSelectedWp] = useState<string>(wallpaper || '/windows_xp_wallpaper.jpg');
  const [screensaverChoice, setScreensaverChoice] = useState<string>('xp-3d');
  const [screensaverWait, setScreensaverWait] = useState<number>(3);

  const handleApply = () => {
    sounds.playDing();
    setWallpaper(selectedWp);
  };

  const handleOk = () => {
    handleApply();
    closeWindow('app-display-properties');
  };

  const activeOption = WALLPAPERS.find((w) => w.src === selectedWp) || WALLPAPERS[0];

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] p-3 select-none text-[11px] font-sans">
      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 border-b border-[#919B9C] mb-3">
        <button
          onClick={() => setActiveTab('desktop')}
          className={`px-3 py-1 text-[11px] rounded-t-sm border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'desktop'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Área de Trabalho
        </button>
        <button
          onClick={() => setActiveTab('screensaver')}
          className={`px-3 py-1 text-[11px] rounded-t-sm border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'screensaver'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Proteção de Tela
        </button>
        <button
          onClick={() => setActiveTab('appearance')}
          className={`px-3 py-1 text-[11px] rounded-t-sm border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'appearance'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Aparência
        </button>
      </div>

      {/* Main Tab Contents */}
      <div className="flex-1 flex flex-col items-center overflow-y-auto">
        {/* MINI CRT MONITOR PREVIEW BOX */}
        <div className="flex flex-col items-center justify-center my-1 shrink-0">
          {/* Monitor Casing */}
          <div className="relative w-44 h-32 bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] rounded-t-lg p-2 border-2 border-[#64748B] shadow-md flex items-center justify-center">
            {/* Bezel inner */}
            <div className="w-full h-full bg-[#1E293B] rounded-sm p-1 flex items-center justify-center overflow-hidden relative shadow-inner">
              {/* Screen Display Content */}
              {activeTab === 'desktop' && (
                <div className="w-full h-full rounded-2xs overflow-hidden relative">
                  {activeOption.isColor ? (
                    <div style={{ backgroundColor: activeOption.src }} className="w-full h-full" />
                  ) : (
                    <img
                      src={activeOption.src}
                      alt="Wallpaper preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Miniature Desktop Icons */}
                  <div className="absolute top-1 left-1 space-y-1 opacity-75">
                    <div className="w-2 h-2 rounded-2xs bg-blue-300" />
                    <div className="w-2 h-2 rounded-2xs bg-amber-300" />
                    <div className="w-2 h-2 rounded-2xs bg-emerald-300" />
                  </div>
                  {/* Miniature Taskbar */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-700 flex items-center px-0.5">
                    <div className="w-3 h-1.5 bg-green-500 rounded-2xs" />
                  </div>
                </div>
              )}

              {activeTab === 'screensaver' && (
                <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="animate-bounce">
                    <WindowsFlagIcon size={24} />
                  </div>
                  <span className="text-[7px] text-gray-300 font-mono mt-1">Windows XP</span>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="w-full h-full bg-[#3A6EA5] flex flex-col justify-between p-1">
                  <div className="h-3 bg-[#0055EA] rounded-2xs flex items-center px-1 text-[7px] text-white font-bold">
                    Estilo Luna Blue
                  </div>
                  <div className="h-2 bg-[#ECE9D8] rounded-2xs border border-gray-400" />
                </div>
              )}
            </div>

            {/* Power LED on Monitor */}
            <span className="absolute bottom-0.5 right-3 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_2px_#34D399]" />
          </div>

          {/* Monitor Stand */}
          <div className="w-12 h-3 bg-gradient-to-b from-[#94A3B8] to-[#64748B] -mt-0.5" />
          <div className="w-20 h-2 bg-gradient-to-b from-[#CBD5E1] to-[#94A3B8] rounded-b-sm border border-[#64748B]" />
        </div>

        {/* TAB 1: DESKTOP WALLPAPERS */}
        {activeTab === 'desktop' && (
          <div className="w-full mt-3 space-y-2">
            <span className="text-gray-700 font-bold block">Plano de Fundo:</span>
            <div className="bg-white border border-[#7F9DB9] rounded-2xs max-h-32 overflow-y-auto">
              {WALLPAPERS.map((wp) => (
                <div
                  key={wp.id}
                  onClick={() => setSelectedWp(wp.src)}
                  className={`px-3 py-1 cursor-pointer flex items-center space-x-2 text-xs ${
                    selectedWp === wp.src
                      ? 'bg-[#316AC5] text-white font-bold'
                      : 'hover:bg-blue-100 text-gray-800'
                  }`}
                >
                  <div
                    style={{ backgroundColor: wp.isColor ? wp.src : '#004E98' }}
                    className="w-4 h-3 rounded-2xs border border-gray-400 shrink-0 overflow-hidden"
                  >
                    {!wp.isColor && (
                      <img src={wp.src} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <span>{wp.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SCREENSAVER */}
        {activeTab === 'screensaver' && (
          <div className="w-full mt-3 space-y-3">
            <div className="space-y-1">
              <span className="text-gray-700 font-bold block">Proteção de Tela:</span>
              <div className="flex items-center space-x-2">
                <select
                  value={screensaverChoice}
                  onChange={(e) => setScreensaverChoice(e.target.value)}
                  className="bg-white border border-[#7F9DB9] px-2 py-1 rounded-2xs text-xs flex-1 cursor-pointer"
                >
                  <option value="xp-3d">Logo 3D do Windows XP (Clássico)</option>
                  <option value="none">(Nenhum)</option>
                </select>

                <button
                  onClick={() => triggerScreensaver()}
                  className="px-3 py-1 rounded-xs bg-gradient-to-b from-white to-[#ECE9D8] border border-[#7F9DB9] hover:brightness-105 active:brightness-95 font-semibold text-gray-800 shadow-xs cursor-pointer"
                >
                  Visualizar
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-gray-700 pt-1">
              <span>Aguardar:</span>
              <input
                type="number"
                min="1"
                max="30"
                value={screensaverWait}
                onChange={(e) => setScreensaverWait(Number(e.target.value))}
                className="w-14 bg-white border border-[#7F9DB9] px-1 py-0.5 rounded-2xs text-center"
              />
              <span>minuto(s) de inatividade.</span>
            </div>
          </div>
        )}

        {/* TAB 3: APARÊNCIA */}
        {activeTab === 'appearance' && (
          <div className="w-full mt-3 space-y-2">
            <span className="text-gray-700 font-bold block">Esquema de Cores & Janelas:</span>
            <div className="bg-white p-3 border border-[#7F9DB9] rounded-2xs space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#0055EA] border border-white shadow-xs" />
                <span className="font-bold text-gray-900">Windows XP Estilo Clássico (Luna Blue)</span>
              </div>
              <p className="text-gray-500 text-[10px]">
                O tema clássico azul royal do Windows XP está ativado por padrão em todo o portal cafureworks.link.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Dialog Buttons */}
      <div className="flex justify-end space-x-2 pt-3 border-t border-[#D4CEB8] mt-2">
        <button
          onClick={handleOk}
          className="px-4 py-1 rounded-xs bg-gradient-to-b from-white to-[#ECE9D8] border border-[#7F9DB9] hover:brightness-105 active:brightness-95 font-semibold text-gray-800 shadow-xs cursor-pointer min-w-[70px]"
        >
          OK
        </button>
        <button
          onClick={() => closeWindow('app-display-properties')}
          className="px-4 py-1 rounded-xs bg-gradient-to-b from-white to-[#ECE9D8] border border-[#7F9DB9] hover:brightness-105 active:brightness-95 text-gray-700 shadow-xs cursor-pointer min-w-[70px]"
        >
          Cancelar
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-1 rounded-xs bg-gradient-to-b from-white to-[#ECE9D8] border border-[#7F9DB9] hover:brightness-105 active:brightness-95 text-gray-700 shadow-xs cursor-pointer min-w-[70px]"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};
