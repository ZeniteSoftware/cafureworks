import React from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { XpIconRenderer } from './XpIconRenderer';
import { ExternalLink, Heart, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/sound';

export const XpCredits: React.FC = () => {
  const { closeWindow } = useDesktop();

  const showcaseIcons = [
    'my-computer',
    'browser',
    'media-player',
    'paint',
    'calc',
    'minesweeper',
    'cmd',
    'notepad',
    'control-panel',
    'display-properties',
    'recycle-bin',
    'credits',
  ];

  return (
    <div
      style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
      className="flex flex-col h-full bg-[#ECE9D8] text-[11px] text-gray-800 select-none overflow-hidden"
    >
      {/* Top Banner */}
      <div
        style={{
          background: 'linear-gradient(to bottom, #245DDA 0%, #103CA5 100%)',
        }}
        className="px-4 py-3 text-white flex items-center justify-between border-b-2 border-[#D3E5FA] shadow-xs"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-sm bg-white/20 p-1 flex items-center justify-center border border-white/40 shadow-xs">
            <XpIconRenderer icon="credits" size={32} />
          </div>
          <div>
            <h2 className="font-bold text-[13px] tracking-wide text-white drop-shadow">
              Windows XP High Resolution Icon Pack
            </h2>
            <p className="text-[10px] text-blue-200">
              Créditos de Arte & Restauração Visual
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-amber-300">
          <Sparkles size={16} />
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* Author Tribute Box */}
        <div className="p-3 bg-white border border-[#919B9C] rounded-xs shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[12px] text-[#0C3D92]">
                Criador & Artista:
              </span>
              <span className="px-2 py-0.5 font-bold text-white bg-[#05CC47] rounded-xs text-[11px] shadow-2xs">
                marchmountain
              </span>
            </div>
            <span className="text-[10px] text-gray-500">DeviantArt</span>
          </div>

          <p className="text-gray-700 leading-relaxed text-[11px]">
            Um agradecimento especial e honroso a <strong>marchmountain</strong> pelo trabalho
            primoroso de recriação, extração e restauração em alta definição dos clássicos
            ícones do Windows XP. Os ícones em resolução 256×256 restauram toda a estética
            atemporal do sistema operacional com fidelidade e nitidez moderna.
          </p>

          <div className="pt-1 flex items-center space-x-2">
            <a
              href="https://www.deviantart.com/marchmountain/art/Windows-XP-High-Resolution-Icon-Pack-916042853"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-b from-[#F2F0E4] to-[#E3DFD0] hover:from-[#E3DFD0] hover:to-[#D5D0C0] active:from-[#CAC5B5] border border-[#7A7565] rounded-xs font-semibold text-[#0B3A82] cursor-pointer shadow-2xs"
            >
              <span>Ver no DeviantArt (marchmountain)</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Icon Showcase Grid */}
        <div className="p-3 bg-[#FBFBFA] border border-[#919B9C] rounded-xs space-y-2">
          <p className="font-bold text-gray-700 text-[11px]">
            Amostra de Ícones Restaurados em Alta Resolução (256x256):
          </p>
          <div className="grid grid-cols-6 gap-2 p-2 bg-white border border-[#D5D0C0] rounded-xs">
            {showcaseIcons.map((ic) => (
              <div
                key={ic}
                className="flex flex-col items-center justify-center p-1 hover:bg-[#316AC5]/10 rounded-xs transition-colors"
                title={ic}
              >
                <XpIconRenderer icon={ic} size={36} />
              </div>
            ))}
          </div>
        </div>

        {/* Additional Credits */}
        <div className="p-3 bg-white border border-[#919B9C] rounded-xs space-y-1.5 text-gray-600 text-[10.5px]">
          <div className="flex items-center space-x-1.5 font-bold text-gray-800">
            <Heart size={13} className="text-red-500 fill-red-500" />
            <span>CafureWorks • Tributo Retrô</span>
          </div>
          <p>
            • <strong>Windows XP UI & Efeitos Sonoros:</strong> Microsoft Corporation (1985–2001).
          </p>
          <p>
            • <strong>Assistentes Rover & Clippy:</strong> Microsoft Office XP & Windows XP Search Companion.
          </p>
          <p>
            • <strong>UI Theme Sprites, Fontes & Cursores:</strong> Pack por NullTale (https://nulltale.itch.io/).
          </p>
          <p>
            • <strong>Papéis de Parede Oficiais (Bliss, Ascent, etc.):</strong> Microsoft Corporation / Charles O'Rear.
          </p>
          <p>
            • <strong>Engenharia & Implementação Web:</strong> Pedro Cafure (cafureworks.link).
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-[#E4E0D2] border-t border-[#D5D0C0] flex justify-end space-x-2">
        <button
          onClick={() => {
            sounds.playClick();
            closeWindow('app-credits');
          }}
          className="px-5 py-1 bg-gradient-to-b from-[#F2F0E4] to-[#E3DFD0] hover:from-[#E3DFD0] hover:to-[#D5D0C0] active:from-[#CAC5B5] border border-[#7A7565] rounded-xs font-semibold text-gray-800 cursor-pointer shadow-2xs min-w-[75px]"
        >
          OK
        </button>
      </div>
    </div>
  );
};
