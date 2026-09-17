import React, { useState } from 'react';
import { sounds } from '../../utils/sound';

export const XpPinball: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div
      style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
      className="flex flex-col h-full bg-[#000000] text-white select-none overflow-hidden"
    >
      {/* Menu Bar */}
      <div className="flex items-center space-x-3 py-1 px-2 bg-[#ECE9D8] border-b border-[#7A7565] text-[11px] text-gray-800 shrink-0">
        <span
          onClick={() => sounds.playClick()}
          className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded-2xs cursor-pointer"
        >
          Novo Jogo (F2)
        </span>
        <span
          onClick={() => {
            sounds.playClick();
            setIsMuted(!isMuted);
          }}
          className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded-2xs cursor-pointer"
        >
          {isMuted ? 'Ativar Sons' : 'Desativar Sons'}
        </span>
        <span
          onClick={() => sounds.playClick()}
          className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded-2xs cursor-pointer"
        >
          Ajuda
        </span>
      </div>

      {/* Main Space Cadet Table Canvas / Emulator */}
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        <iframe
          src="https://alula.github.io/SpaceCadetPinball/"
          title="3D Pinball for Windows - Space Cadet"
          className="w-full h-full border-0"
          allow="autoplay; keyboard"
        />
      </div>

      {/* Control Help Bar */}
      <div className="py-1 px-3 bg-[#1A1A1A] border-t border-[#333333] flex items-center justify-between text-[10.5px] text-gray-300 font-mono shrink-0">
        <span>Z: Palheta Esquerda | / : Palheta Direita | Espaço: Lançar Bola | X: Inclinar</span>
        <span className="text-amber-400">Space Cadet • CafureWorks</span>
      </div>
    </div>
  );
};
