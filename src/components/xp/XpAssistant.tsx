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
  const [character, setCharacter] = useState<'rover' | 'clippy'>('rover');
  const [actionState, setActionState] = useState<'idle' | 'action'>('idle');

  useEffect(() => {
    // Balloon appears after 3s
    const timer = setTimeout(() => {
      setShowBalloon(true);
      sounds.playBalloon();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextTip = () => {
    sounds.playClick();
    setActionState('action');
    setTimeout(() => setActionState('idle'), 2500);
    setTipIndex((prev) => (prev + 1) % TIPS.length);
    setShowBalloon(true);
  };

  const toggleCharacter = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playNotify();
    setCharacter((prev) => (prev === 'rover' ? 'clippy' : 'rover'));
    setActionState('action');
    setTimeout(() => setActionState('idle'), 2500);
  };

  if (!isVisible) return null;

  const getSpriteSrc = () => {
    if (character === 'rover') {
      return actionState === 'action'
        ? '/assistants/rover/rover_bark.gif'
        : '/assistants/rover/rover_idle.gif';
    } else {
      return actionState === 'action'
        ? '/assistants/clippy/clippy_think.gif'
        : '/assistants/clippy/clippy_idle.gif';
    }
  };

  return (
    <div className="fixed bottom-9 right-16 z-[9900] select-none pointer-events-auto flex flex-col items-end">
      {/* Speech Balloon */}
      {showBalloon && (
        <div
          style={{
            fontFamily: 'Tahoma, "Segoe UI", sans-serif',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
          }}
          className="relative mb-2 w-72 bg-[#FFFFE1] border border-black p-3 rounded-md text-black text-[11px] shadow-lg animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Close button */}
          <div className="flex items-center space-x-1 absolute top-1.5 right-1.5">
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

          <div className="flex items-center justify-between pr-4 mb-1">
            <div className="flex items-center space-x-1.5 font-bold text-blue-900">
              <Sparkles size={13} className="text-amber-500" />
              <span>{character === 'rover' ? 'Rover (Search Companion)' : 'Clippy (Office Assistant)'}</span>
            </div>
          </div>

          <p className="text-gray-800 leading-snug text-[11px] my-1">
            {TIPS[tipIndex]}
          </p>

          <div className="mt-2 pt-1.5 border-t border-[#D5D0B0] flex items-center justify-between text-[10px]">
            <button
              onClick={toggleCharacter}
              className="text-blue-800 hover:underline font-semibold cursor-pointer"
              title="Mudar entre Rover e Clippy"
            >
              Trocar p/ {character === 'rover' ? 'Clippy 📎' : 'Rover 🐶'}
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">
                {tipIndex + 1}/{TIPS.length}
              </span>
              <button
                onClick={nextTip}
                className="flex items-center space-x-0.5 font-bold text-blue-700 hover:underline cursor-pointer"
              >
                <span>Próxima</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* Balloon Arrow pointing to mascot */}
          <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
          <div className="absolute -bottom-[7px] right-8 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-[#FFFFE1]" />
        </div>
      )}

      {/* Official Animated Character */}
      <div
        onClick={nextTip}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsVisible(false);
        }}
        title={`Clique para interagir! (Botão direito para ocultar o ${character === 'rover' ? 'Rover' : 'Clippy'})`}
        className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <div className="relative w-[80px] h-[80px] flex items-center justify-center drop-shadow-md">
          <img
            src={getSpriteSrc()}
            alt={character}
            className="w-[80px] h-[80px] object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};
