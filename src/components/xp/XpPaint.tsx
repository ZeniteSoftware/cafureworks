import React, { useRef, useState, useEffect } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { sounds } from '../../utils/sound';

const XP_COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000', '#FFFFFF', '#C0C0C0',
  '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80',
  '#80FFFF', '#7F7FFF', '#FF0080', '#FF8040',
];

export const XpPaint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>('#000000');
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [tool, setTool] = useState<'pencil' | 'brush' | 'eraser'>('pencil');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill initial canvas with white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.lineWidth = tool === 'eraser' ? lineWidth * 4 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    sounds.playRecycle();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    sounds.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meu_desenho_xp.png';
    a.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] select-none text-[11px] font-sans">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-2 py-1 bg-[#ECE9D8] border-b border-[#D4CEB8]">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setTool('pencil')}
            className={`px-2 py-1 rounded-xs border cursor-pointer ${
              tool === 'pencil' ? 'bg-[#316AC5] text-white font-bold border-[#0A246A]' : 'bg-white/60 hover:bg-white text-gray-800 border-gray-300'
            }`}
          >
            ✏️ Lápis
          </button>
          <button
            onClick={() => setTool('brush')}
            className={`px-2 py-1 rounded-xs border cursor-pointer ${
              tool === 'brush' ? 'bg-[#316AC5] text-white font-bold border-[#0A246A]' : 'bg-white/60 hover:bg-white text-gray-800 border-gray-300'
            }`}
          >
            🖌️ Pincel
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`px-2 py-1 rounded-xs border cursor-pointer ${
              tool === 'eraser' ? 'bg-[#316AC5] text-white font-bold border-[#0A246A]' : 'bg-white/60 hover:bg-white text-gray-800 border-gray-300'
            }`}
          >
            🧹 Borracha
          </button>

          <div className="h-4 w-[1px] bg-gray-300 mx-1" />

          {/* Line width selector */}
          <span className="text-gray-700 text-xs">Espessura:</span>
          {[2, 4, 8].map((w) => (
            <button
              key={w}
              onClick={() => setLineWidth(w)}
              className={`w-5 h-5 rounded-xs flex items-center justify-center border cursor-pointer ${
                lineWidth === w ? 'bg-[#316AC5] border-[#0A246A]' : 'bg-white border-gray-300'
              }`}
            >
              <div
                style={{ width: w * 1.5, height: w * 1.5 }}
                className={`rounded-full ${lineWidth === w ? 'bg-white' : 'bg-black'}`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={clearCanvas}
            className="flex items-center space-x-1 px-2 py-1 rounded-xs bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 cursor-pointer shadow-2xs"
          >
            <Trash2 size={12} className="text-red-600" />
            <span>Limpar</span>
          </button>
          <button
            onClick={saveCanvas}
            className="flex items-center space-x-1 px-2 py-1 rounded-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold border border-emerald-700 cursor-pointer shadow-2xs"
          >
            <Download size={12} />
            <span>Salvar Imagem</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 bg-[#808080] p-3 overflow-auto flex items-center justify-center">
        <div className="border-2 border-[#404040] shadow-md bg-white">
          <canvas
            ref={canvasRef}
            width={600}
            height={380}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="cursor-crosshair bg-white block"
          />
        </div>
      </div>

      {/* Bottom Classic Palette */}
      <div className="flex items-center space-x-3 px-3 py-1.5 bg-[#ECE9D8] border-t border-[#D4CEB8]">
        {/* Active Color Preview */}
        <div className="flex flex-col items-center">
          <div
            style={{ backgroundColor: color }}
            className="w-7 h-7 rounded-sm border-2 border-white shadow-xs"
          />
        </div>

        {/* 28 XP Color Grid */}
        <div className="grid grid-rows-2 grid-flow-col gap-1">
          {XP_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{ backgroundColor: c }}
              className={`w-4 h-4 border border-gray-500 shadow-2xs cursor-pointer ${
                color === c ? 'scale-115 ring-2 ring-blue-600 z-10' : 'hover:scale-105'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
