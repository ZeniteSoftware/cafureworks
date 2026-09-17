import React, { useState, useEffect, useRef } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { XpIconRenderer } from './XpIconRenderer';
import { sounds } from '../../utils/sound';

export const XpTaskManager: React.FC = () => {
  const { windows, closeWindow, focusWindow, openWindow } = useDesktop();

  const [activeTab, setActiveTab] = useState<'apps' | 'processes' | 'perf'>('apps');
  const [selectedWinId, setSelectedWinId] = useState<string | null>(null);

  // Performance live oscilloscope history (last 30 points)
  const [cpuHistory, setCpuHistory] = useState<number[]>([12, 18, 15, 24, 8, 14, 28, 10, 15, 20, 6, 12, 16]);
  const [memHistory, setMemHistory] = useState<number[]>([34, 34, 35, 34, 35, 36, 35, 35, 36, 35, 35]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuHistory((prev) => {
        const next = Math.max(3, Math.min(95, Math.floor(Math.random() * 25) + 5));
        const updated = [...prev.slice(1), next];
        return updated;
      });
      setMemHistory((prev) => {
        const next = Math.max(30, Math.min(45, Math.floor(Math.random() * 5) + 33));
        const updated = [...prev.slice(1), next];
        return updated;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Draw green CPU oscilloscope graph
  useEffect(() => {
    if (activeTab !== 'perf') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear background black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    // Draw dark green grid
    ctx.strokeStyle = '#003300';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 15) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw bright neon green CPU line
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    const step = w / (cpuHistory.length - 1);
    cpuHistory.forEach((val, idx) => {
      const x = idx * step;
      const y = h - (val / 100) * h;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [activeTab, cpuHistory]);

  const currentCpu = cpuHistory[cpuHistory.length - 1] || 10;
  const currentMem = memHistory[memHistory.length - 1] || 35;

  const mockProcesses = [
    { name: 'System Idle Process', pid: 0, cpu: 100 - currentCpu, mem: '16 K' },
    { name: 'System', pid: 4, cpu: 1, mem: '212 K' },
    { name: 'smss.exe', pid: 412, cpu: 0, mem: '348 K' },
    { name: 'csrss.exe', pid: 472, cpu: 0, mem: '1.420 K' },
    { name: 'winlogon.exe', pid: 512, cpu: 0, mem: '2.180 K' },
    { name: 'services.exe', pid: 568, cpu: 1, mem: '3.490 K' },
    { name: 'lsass.exe', pid: 580, cpu: 0, mem: '1.240 K' },
    { name: 'svchost.exe', pid: 748, cpu: 0, mem: '4.890 K' },
    { name: 'explorer.exe', pid: 1420, cpu: 2, mem: '14.280 K' },
    { name: 'cafureworks-edge.exe', pid: 1840, cpu: currentCpu > 20 ? 5 : 2, mem: '28.400 K' },
    { name: 'cloudflare-worker.exe', pid: 2104, cpu: 1, mem: '8.120 K' },
    { name: 'taskmgr.exe', pid: 2892, cpu: 1, mem: '3.190 K' },
  ];

  return (
    <div
      style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
      className="flex flex-col h-full bg-[#ECE9D8] text-[11px] text-gray-800 p-2 select-none"
    >
      {/* Top Menu Bar */}
      <div className="flex items-center space-x-3 pb-1.5 px-1 border-b border-[#D5D0C0] text-[11px] text-gray-800">
        <span className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded-2xs cursor-pointer">Arquivo</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded-2xs cursor-pointer">Opções</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded-2xs cursor-pointer">Exibir</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded-2xs cursor-pointer">Desligar</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded-2xs cursor-pointer">Ajuda</span>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 border-b border-[#919B9C] my-2">
        <button
          onClick={() => setActiveTab('apps')}
          className={`px-3 py-1 rounded-t-sm border-t border-l border-r cursor-pointer ${
            activeTab === 'apps'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Aplicações
        </button>
        <button
          onClick={() => setActiveTab('processes')}
          className={`px-3 py-1 rounded-t-sm border-t border-l border-r cursor-pointer ${
            activeTab === 'processes'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Processos
        </button>
        <button
          onClick={() => setActiveTab('perf')}
          className={`px-3 py-1 rounded-t-sm border-t border-l border-r cursor-pointer ${
            activeTab === 'perf'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Desempenho
        </button>
      </div>

      {/* Tab: Aplicações */}
      {activeTab === 'apps' && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 bg-white border border-[#7F9DB9] rounded-xs overflow-y-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-[#ECE9D8] sticky top-0 border-b border-[#D5D0C0]">
                <tr>
                  <th className="px-2 py-1 font-normal border-r border-[#D5D0C0]">Tarefa</th>
                  <th className="px-2 py-1 font-normal w-28">Status</th>
                </tr>
              </thead>
              <tbody>
                {windows.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-4 text-center text-gray-500 italic">
                      Nenhuma aplicação em execução.
                    </td>
                  </tr>
                ) : (
                  windows.map((win) => {
                    const isSelected = selectedWinId === win.id;
                    return (
                      <tr
                        key={win.id}
                        onClick={() => setSelectedWinId(win.id)}
                        onDoubleClick={() => focusWindow(win.id)}
                        className={`cursor-pointer select-none ${
                          isSelected ? 'bg-[#316AC5] text-white' : 'hover:bg-blue-50 text-gray-900'
                        }`}
                      >
                        <td className="px-2 py-1 flex items-center space-x-2 truncate">
                          <XpIconRenderer icon={win.icon} size={16} />
                          <span className="truncate">{win.title}</span>
                        </td>
                        <td className="px-2 py-1">Executando</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => {
                if (selectedWinId) {
                  sounds.playClick();
                  closeWindow(selectedWinId);
                  setSelectedWinId(null);
                }
              }}
              disabled={!selectedWinId}
              className="px-3 py-1 bg-gradient-to-b from-[#F2F0E4] to-[#E3DFD0] hover:from-[#E3DFD0] hover:to-[#D5D0C0] disabled:opacity-50 border border-[#7A7565] rounded-xs font-semibold text-gray-800 cursor-pointer shadow-xs min-w-[90px]"
            >
              Finalizar Tarefa
            </button>
            <button
              onClick={() => {
                if (selectedWinId) {
                  focusWindow(selectedWinId);
                }
              }}
              disabled={!selectedWinId}
              className="px-3 py-1 bg-gradient-to-b from-[#F2F0E4] to-[#E3DFD0] hover:from-[#E3DFD0] hover:to-[#D5D0C0] disabled:opacity-50 border border-[#7A7565] rounded-xs text-gray-800 cursor-pointer shadow-xs min-w-[90px]"
            >
              Alternar Para
            </button>
            <button
              onClick={() => {
                openWindow({
                  id: 'app-run',
                  title: 'Executar',
                  type: 'run',
                  icon: 'run',
                  defaultSize: { width: 400, height: 210 },
                });
              }}
              className="px-3 py-1 bg-gradient-to-b from-[#F2F0E4] to-[#E3DFD0] hover:from-[#E3DFD0] hover:to-[#D5D0C0] border border-[#7A7565] rounded-xs text-gray-800 cursor-pointer shadow-xs min-w-[90px]"
            >
              Nova Tarefa...
            </button>
          </div>
        </div>
      )}

      {/* Tab: Processos */}
      {activeTab === 'processes' && (
        <div className="flex-1 bg-white border border-[#7F9DB9] rounded-xs overflow-y-auto">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-[#ECE9D8] sticky top-0 border-b border-[#D5D0C0]">
              <tr>
                <th className="px-2 py-1 font-normal border-r border-[#D5D0C0]">Nome da Imagem</th>
                <th className="px-2 py-1 font-normal border-r border-[#D5D0C0] w-16">PID</th>
                <th className="px-2 py-1 font-normal border-r border-[#D5D0C0] w-20">Uso de CPU</th>
                <th className="px-2 py-1 font-normal w-24">Uso de Memória</th>
              </tr>
            </thead>
            <tbody>
              {mockProcesses.map((proc, idx) => (
                <tr key={idx} className="hover:bg-blue-50 text-gray-800">
                  <td className="px-2 py-0.5 font-mono text-[10.5px]">{proc.name}</td>
                  <td className="px-2 py-0.5 font-mono text-[10.5px]">{proc.pid}</td>
                  <td className="px-2 py-0.5 font-mono text-[10.5px]">{proc.cpu}</td>
                  <td className="px-2 py-0.5 font-mono text-[10.5px] text-right">{proc.mem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Desempenho */}
      {activeTab === 'perf' && (
        <div className="flex-1 grid grid-cols-2 gap-2 overflow-hidden">
          <div className="p-2 border border-[#919B9C] rounded-xs bg-[#FBFBFA] flex flex-col justify-between">
            <span className="font-bold text-gray-800">Uso de CPU: {currentCpu}%</span>
            <div className="h-40 relative rounded-xs overflow-hidden border border-[#004400] shadow-inner">
              <canvas ref={canvasRef} width={220} height={160} className="w-full h-full" />
            </div>
            <div className="text-[10px] text-gray-500">Histórico de Uso de CPU</div>
          </div>

          <div className="p-2 border border-[#919B9C] rounded-xs bg-[#FBFBFA] flex flex-col justify-between">
            <span className="font-bold text-gray-800">Uso do Arquivo de Paginação: {currentMem}%</span>
            <div className="p-3 bg-white border border-[#7F9DB9] rounded-xs space-y-2 text-[10.5px]">
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span>Total de Memória:</span>
                <span className="font-mono font-bold text-gray-900">67.108.864 KB</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span>Disponível:</span>
                <span className="font-mono font-bold text-emerald-700">43.621.140 KB</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span>Cache do Sistema:</span>
                <span className="font-mono font-bold text-gray-900">12.550.800 KB</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Threads Ativas:</span>
                <span className="font-mono font-bold text-blue-800">842</span>
              </div>
            </div>
            <div className="text-[10px] text-gray-500">Totalizadores de Memória Física</div>
          </div>
        </div>
      )}

      {/* Bottom Status Bar */}
      <div className="mt-2 pt-1 border-t border-[#D5D0C0] flex items-center justify-between text-[10px] text-gray-600 px-1">
        <span>Processos: {mockProcesses.length}</span>
        <span>Uso de CPU: {currentCpu}%</span>
        <span>Uso de Memória: {currentMem}%</span>
      </div>
    </div>
  );
};
