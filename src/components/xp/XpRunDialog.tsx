import React, { useState, useRef, useEffect } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { XpIconRenderer } from './XpIconRenderer';
import { sounds } from '../../utils/sound';

export const XpRunDialog: React.FC = () => {
  const {
    closeWindow,
    openCmd,
    openCalculator,
    openPaint,
    openNotepad,
    openSystemProperties,
    openDisplayProperties,
    openCredits,
    openWindow,
    projects,
    openProject,
  } = useDesktop();

  const [command, setCommand] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleRun = () => {
    const trimmed = command.trim().toLowerCase();
    if (!trimmed) return;

    sounds.playClick();

    // Check registered commands
    if (trimmed === 'cmd' || trimmed === 'command' || trimmed === 'terminal') {
      openCmd();
      closeWindow('app-run');
      return;
    }

    if (trimmed === 'calc' || trimmed === 'calculator') {
      openCalculator();
      closeWindow('app-run');
      return;
    }

    if (trimmed === 'paint' || trimmed === 'mspaint' || trimmed === 'pbrush') {
      openPaint();
      closeWindow('app-run');
      return;
    }

    if (trimmed === 'notepad' || trimmed === 'bloco' || trimmed === 'readme') {
      openNotepad();
      closeWindow('app-run');
      return;
    }

    if (trimmed === 'timedate.cpl' || trimmed === 'clock' || trimmed === 'time') {
      openWindow({
        id: 'app-datetime',
        title: 'Propriedades de Data e Hora',
        type: 'datetime',
        icon: 'date-and-time',
        defaultSize: { width: 440, height: 420 },
      });
      closeWindow('app-run');
      return;
    }

    if (trimmed === 'taskmgr' || trimmed === 'taskmgr.exe' || trimmed === 'tarefas') {
      openWindow({
        id: 'app-taskmgr',
        title: 'Gerenciador de Tarefas do Windows',
        type: 'taskmgr',
        icon: 'taskbar',
        defaultSize: { width: 500, height: 460 },
      });
      closeWindow('app-run');
      return;
    }

    if (trimmed === 'pinball' || trimmed === 'pinball.exe') {
      openWindow({
        id: 'app-pinball',
        title: '3D Pinball for Windows - Space Cadet',
        type: 'pinball',
        icon: 'pinball',
        defaultSize: { width: 620, height: 500 },
      });
      closeWindow('app-run');
      return;
    }

    if (trimmed === 'sysdm.cpl' || trimmed === 'winver' || trimmed === 'sistema') {
      openSystemProperties();
      closeWindow('app-run');
      return;
    }

    if (trimmed === 'desk.cpl' || trimmed === 'display') {
      openDisplayProperties();
      closeWindow('app-run');
      return;
    }

    if (trimmed === 'credits' || trimmed === 'creditos') {
      openCredits();
      closeWindow('app-run');
      return;
    }

    if (trimmed === 'cleanmgr' || trimmed === 'recycle' || trimmed === 'lixeira') {
      sounds.playRecycle();
      openWindow({
        id: 'app-recycle-bin',
        title: 'Lixeira',
        type: 'recycle-bin',
        icon: 'recycle-bin',
        defaultSize: { width: 500, height: 350 },
      });
      closeWindow('app-run');
      return;
    }

    // Direct project matching
    const matchedProject = projects.find(
      (p) => p.id.toLowerCase() === trimmed || p.title.toLowerCase().includes(trimmed)
    );
    if (matchedProject) {
      openProject(matchedProject);
      closeWindow('app-run');
      return;
    }

    // Direct URL
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.includes('.')) {
      const url = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      openWindow({
        id: `browser-${Date.now()}`,
        title: trimmed,
        type: 'browser',
        icon: 'browser',
        data: { browserUrl: url },
        defaultSize: { width: 800, height: 560 },
      });
      closeWindow('app-run');
      return;
    }

    // If not found, show authentic XP error
    sounds.playError();
    setErrorMsg(`O Windows não pode encontrar '${command}'. Certifique-se de que o nome foi digitado corretamente e tente novamente.`);
  };

  return (
    <div
      style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
      className="flex flex-col h-full bg-[#ECE9D8] text-[11px] text-gray-800 p-3 select-none"
    >
      <div className="flex items-start space-x-3 mb-4">
        <div className="shrink-0 pt-0.5">
          <XpIconRenderer icon="run" size={36} />
        </div>
        <p className="text-gray-800 leading-relaxed">
          Digite o nome de um programa, pasta, documento ou recurso da Internet e o Windows o abrirá para você.
        </p>
      </div>

      <div className="flex items-center space-x-2 my-2">
        <label htmlFor="xp-run-input" className="font-semibold text-gray-700 w-12 shrink-0">
          Abrir:
        </label>
        <div className="flex-1 relative">
          <input
            id="xp-run-input"
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => {
              setCommand(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRun();
              if (e.key === 'Escape') closeWindow('app-run');
            }}
            placeholder="cmd, calc, paint, pinball, taskmgr, timedate.cpl..."
            className="w-full px-2 py-1 bg-white border border-[#7F9DB9] rounded-xs text-[12px] text-gray-900 outline-hidden focus:border-[#316AC5] shadow-inner"
          />
        </div>
      </div>

      {errorMsg && (
        <div className="my-2 p-2 bg-red-50 border border-red-300 rounded-xs text-red-700 text-[10.5px]">
          {errorMsg}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end space-x-2 mt-auto pt-3 border-t border-[#D4CEB8]">
        <button
          onClick={handleRun}
          className="px-5 py-1 bg-gradient-to-b from-[#F2F0E4] to-[#E3DFD0] hover:from-[#E3DFD0] hover:to-[#D5D0C0] active:from-[#CAC5B5] border border-[#003C74] rounded-xs font-semibold text-gray-900 cursor-pointer shadow-xs min-w-[75px] outline-1 outline-blue-400"
        >
          OK
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            closeWindow('app-run');
          }}
          className="px-5 py-1 bg-gradient-to-b from-[#F2F0E4] to-[#E3DFD0] hover:from-[#E3DFD0] hover:to-[#D5D0C0] active:from-[#CAC5B5] border border-[#7A7565] rounded-xs text-gray-800 cursor-pointer shadow-xs min-w-[75px]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
