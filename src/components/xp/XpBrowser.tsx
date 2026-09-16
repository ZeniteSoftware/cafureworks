import React, { useState } from 'react';
import { RefreshCw, ExternalLink, Globe } from 'lucide-react';

interface XpBrowserProps {
  initialUrl?: string;
}

export const XpBrowser: React.FC<XpBrowserProps> = ({
  initialUrl = 'https://prisma.cafureworks.link',
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [iframeKey, setIframeKey] = useState(0);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = `https://${target}`;
    }
    setUrl(target);
    setInputUrl(target);
    setIframeKey((k) => k + 1);
  };

  const handleRefresh = () => {
    setIframeKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col h-full bg-white select-none text-[11px] font-sans">
      {/* Browser Toolbar & Address Bar */}
      <div className="flex items-center space-x-2 px-2 py-1.5 bg-[#ECE9D8] border-b border-[#D4CEB8]">
        <button
          onClick={handleRefresh}
          title="Atualizar"
          className="p-1 rounded-xs hover:bg-white/60 border border-transparent hover:border-[#7A96DF] cursor-pointer"
        >
          <RefreshCw size={14} className="text-emerald-700" />
        </button>

        <span className="text-gray-600 shrink-0 font-medium">Endereço</span>

        <form onSubmit={handleNavigate} className="flex-1 flex items-center bg-white border border-[#7F9DB9] rounded-2xs px-2 py-0.5 shadow-inner">
          <Globe size={13} className="text-blue-600 mr-1.5 shrink-0" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full text-[11px] outline-none text-gray-900 font-mono"
          />
        </form>

        <button
          onClick={handleNavigate}
          className="px-2 py-0.5 rounded-2xs bg-gradient-to-b from-white to-[#E1DEC9] border border-[#7F9DB9] hover:brightness-105 font-bold text-emerald-700 cursor-pointer shadow-xs"
        >
          Ir
        </button>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          title="Abrir em nova aba do navegador"
          className="flex items-center space-x-1 px-2 py-0.5 rounded-2xs bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer shadow-xs"
        >
          <span>Abrir Fora</span>
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Note about iframe permissions */}
      <div className="bg-amber-50 border-b border-amber-200 px-3 py-1 text-[10px] text-amber-800 flex items-center justify-between">
        <span>
          Alguns sites bloqueiam exibição em moldura (iframe) por segurança. Se a tela abaixo ficar em branco, clique em <strong>"Abrir Fora ↗"</strong>.
        </span>
      </div>

      {/* Frame view */}
      <div className="flex-1 w-full h-full relative bg-white">
        <iframe
          key={iframeKey}
          src={url}
          title="Internet Explorer Preview"
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>
    </div>
  );
};
