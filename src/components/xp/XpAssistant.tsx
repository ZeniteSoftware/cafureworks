import React, { useState, useEffect } from 'react';
import { sounds } from '../../utils/sound';
import { X, Sparkles, ChevronRight } from 'lucide-react';

const TIPS = [
  'Olá! Eu sou o assistente do CafureWorks. Sabia que você pode abrir o Prompt de comando digitando "cmd" ou clicando no ícone da Área de Trabalho?',
  'Dica: Clique no relógio da barra de tarefas para abrir o calendário e o relógio analógico clássico do Windows XP!',
  'Dica: No Campo Minado, clique com o botão direito do mouse para fincar bandeiras nas minas suspeitas!',
  'Dica: Abra o Paint para criar artes com a paleta original de 28 cores do Windows XP e fazer download em PNG!',
  'Dica: Experimente abrir o Gerenciador de Tarefas para ver o osciloscópio verde de uso da CPU em tempo real!',
  'Dica: Todos os ícones em alta resolução foram criados pelo artista marchmountain no DeviantArt. Veja a janela de Créditos!',
  'Dica: Clique com o botão direito na Área de Trabalho para reorganizar todos os ícones alinhados em grade!',
  'Dica: Você pode arrastar qualquer janela pela barra de título azul ou dar duplo clique para maximizar!',
];

export const XpAssistant: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showBalloon, setShowBalloon] = useState(true);
  const [tipIndex, setTipIndex] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);

  useEffect(() => {
    // Balloon appears after 4s
    const timer = setTimeout(() => {
      setShowBalloon(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const nextTip = () => {
    sounds.playClick();
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
    setTipIndex((prev) => (prev + 1) % TIPS.length);
    setShowBalloon(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-9 right-16 z-[9900] select-none pointer-events-auto flex flex-col items-end">
      {/* Speech Balloon */}
      {showBalloon && (
        <div
          style={{
            fontFamily: 'Tahoma, "Segoe UI", sans-serif',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
          }}
          className="relative mb-2 w-64 bg-[#FFFFE1] border border-black p-3 rounded-md text-black text-[11px] shadow-lg animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Close button */}
          <div className="flex items-center space-x-1 absolute top-1 right-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBalloon(false);
              }}
              className="text-gray-500 hover:text-black p-0.5 cursor-pointer"
              title="Fechar balão"
            >
              <X size={12} />
            </button>
          </div>

          <div className="flex items-center space-x-1.5 font-bold text-blue-900 mb-1">
            <Sparkles size={13} className="text-amber-500" />
            <span>Assistente CafureWorks</span>
          </div>

          <p className="text-gray-800 leading-snug text-[10.5px]">
            {TIPS[tipIndex]}
          </p>

          <div className="mt-2 pt-1.5 border-t border-[#D5D0B0] flex items-center justify-between text-[10px]">
            <span className="text-gray-500">
              {tipIndex + 1} de {TIPS.length}
            </span>
            <button
              onClick={nextTip}
              className="flex items-center space-x-0.5 font-bold text-blue-700 hover:underline cursor-pointer"
            >
              <span>Próxima dica</span>
              <ChevronRight size={12} />
            </button>
          </div>

          {/* Balloon Arrow pointing to mascot */}
          <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
          <div className="absolute -bottom-[7px] right-8 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-[#FFFFE1]" />
        </div>
      )}

      {/* Rover Dog / Animated XP Character */}
      <div
        onClick={nextTip}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsVisible(false);
        }}
        title="Clique para ver outra dica! (Botão direito para ocultar assistente)"
        className={`cursor-pointer transition-transform duration-200 group ${
          isWiggling ? 'scale-110 -rotate-6' : 'hover:scale-105'
        }`}
      >
        <div className="relative w-16 h-16 drop-shadow-md">
          {/* Pixel-styled Rover Companion Avatar */}
          <svg viewBox="0 0 64 64" className="w-full h-full">
            {/* Body */}
            <ellipse cx="32" cy="42" rx="18" ry="14" fill="#C68642" stroke="#8D5B28" strokeWidth="2" />
            <ellipse cx="32" cy="44" rx="12" ry="9" fill="#E0A96D" />

            {/* Head */}
            <circle cx="32" cy="24" r="14" fill="#C68642" stroke="#8D5B28" strokeWidth="2" />
            <ellipse cx="32" cy="27" rx="8" ry="6" fill="#E0A96D" />

            {/* Floppy Ears */}
            <path d="M 20 18 Q 12 24 16 34 Q 22 32 22 22 Z" fill="#8D5B28" />
            <path d="M 44 18 Q 52 24 48 34 Q 42 32 42 22 Z" fill="#8D5B28" />

            {/* Eyes */}
            <circle cx="27" cy="22" r="2.5" fill="#000" />
            <circle cx="28" cy="21" r="0.8" fill="#FFF" />
            <circle cx="37" cy="22" r="2.5" fill="#000" />
            <circle cx="38" cy="21" r="0.8" fill="#FFF" />

            {/* Cute Black Snout */}
            <ellipse cx="32" cy="27" rx="3.5" ry="2.5" fill="#1C1C1C" />
            <path d="M 32 29 Q 32 32 30 32 M 32 29 Q 32 32 34 32" stroke="#1C1C1C" strokeWidth="1.5" fill="none" />

            {/* Paws */}
            <ellipse cx="22" cy="54" rx="5" ry="3.5" fill="#C68642" stroke="#8D5B28" strokeWidth="1.5" />
            <ellipse cx="42" cy="54" rx="5" ry="3.5" fill="#C68642" stroke="#8D5B28" strokeWidth="1.5" />

            {/* Tail with Wag animation */}
            <path d="M 48 44 Q 58 38 54 30" stroke="#8D5B28" strokeWidth="3.5" strokeLinecap="round" fill="none" className="animate-pulse" />
          </svg>

          {/* Mini Speech icon badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 border border-amber-600 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-900 shadow-xs">
            ?
          </div>
        </div>
      </div>
    </div>
  );
};
