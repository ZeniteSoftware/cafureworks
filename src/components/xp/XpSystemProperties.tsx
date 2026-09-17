import React, { useState } from 'react';
import { SYSTEM_SPECS } from '../../data/projects';
import { WindowsFlagIcon, MyComputerIcon } from './XpIcons';
import { XpIconRenderer } from './XpIconRenderer';
import { ExternalLink } from 'lucide-react';
import { useDesktop } from '../../context/DesktopContext';

export const XpSystemProperties: React.FC = () => {
  const { closeWindow } = useDesktop();
  const [activeTab, setActiveTab] = useState<'geral' | 'stack' | 'sobre' | 'creditos'>('geral');

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] p-3 select-none text-[11px] font-sans">
      {/* Tabs */}
      <div className="flex items-center space-x-1 border-b border-[#919B9C] mb-3">
        <button
          onClick={() => setActiveTab('geral')}
          className={`px-3 py-1 text-[11px] rounded-t-sm border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'geral'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Geral
        </button>
        <button
          onClick={() => setActiveTab('stack')}
          className={`px-3 py-1 text-[11px] rounded-t-sm border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'stack'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Stack
        </button>
        <button
          onClick={() => setActiveTab('sobre')}
          className={`px-3 py-1 text-[11px] rounded-t-sm border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'sobre'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Pedro Cafure
        </button>
        <button
          onClick={() => setActiveTab('creditos')}
          className={`px-3 py-1 text-[11px] rounded-t-sm border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'creditos'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Créditos & Ícones
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 bg-[#ECE9D8] overflow-y-auto">
        {activeTab === 'geral' && (
          <div className="space-y-4">
            {/* Top Row: Windows logo and System Name */}
            <div className="flex items-start space-x-4">
              <div className="shrink-0 p-1 bg-white/40 rounded-sm border border-gray-300">
                <WindowsFlagIcon size={48} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[12px] text-gray-900">{SYSTEM_SPECS.osName}</p>
                <p className="text-gray-700">{SYSTEM_SPECS.version}</p>
                <p className="text-gray-500 text-[10px]">Cloudflare Edge Network Enabled</p>
              </div>
            </div>

            <div className="h-[1px] bg-[#D4CEB8]" />

            {/* Middle Row: Registered To */}
            <div className="pl-6 space-y-1">
              <p className="font-bold text-gray-700">Registrado para:</p>
              <p className="text-gray-900 font-medium pl-4">{SYSTEM_SPECS.registeredTo}</p>
              <p className="text-gray-700 pl-4">{SYSTEM_SPECS.company}</p>
              <p className="text-gray-500 text-[10px] pl-4 font-mono">ID: CAFURE-2026-XP-CLOUDFLARE</p>
            </div>

            <div className="h-[1px] bg-[#D4CEB8]" />

            {/* Bottom Row: Hardware specs */}
            <div className="flex items-start space-x-4">
              <div className="shrink-0">
                <MyComputerIcon size={36} />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-gray-700">Computador / Host:</p>
                <p className="text-gray-900 font-medium">{SYSTEM_SPECS.domain}</p>
                <p className="text-gray-700">{SYSTEM_SPECS.processor}</p>
                <p className="text-gray-700">{SYSTEM_SPECS.ram}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stack' && (
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-[12px]">Infraestrutura & Tecnologias</h4>
            <p className="text-gray-600">
              O portal <strong>cafureworks.link</strong> e seus subdomínios são construídos com foco em performance, baixa latência e alta disponibilidade:
            </p>
            <div className="grid grid-cols-1 gap-1.5 pl-2">
              {SYSTEM_SPECS.stack.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>
            <div className="p-2 bg-blue-50 border border-blue-200 rounded text-blue-900 text-[10px] mt-2">
              <strong>Deploy Cloudflare Pages:</strong> Distribuição global instantânea com suporte a roteamento de subdomínios e DNS seguro.
            </div>
          </div>
        )}

        {activeTab === 'sobre' && (
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-[12px]">Sobre Pedro Cafure</h4>
            <p className="text-gray-700 leading-relaxed">
              Desenvolvedor e entusiasta de tecnologia, focado em desenvolvimento full-stack, automações modernas, web apps e soluções escaláveis para seus projetos pessoais no domínio cafureworks.link.
            </p>
            <div className="pt-2 border-t border-gray-300 flex flex-col space-y-1">
              <a
                href="https://cafureworks.link"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:underline flex items-center space-x-1"
              >
                <span>↗ cafureworks.link</span>
              </a>
              <span className="text-gray-600">Contato: contato@cafureworks.link</span>
            </div>
          </div>
        )}

        {activeTab === 'creditos' && (
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-2.5 bg-white border border-[#919B9C] rounded-xs shadow-2xs">
              <div className="shrink-0 p-0.5">
                <XpIconRenderer icon="credits" size={36} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-900 text-[12px]">Windows XP High Resolution Icon Pack</p>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Autor:</span>
                  <span className="px-1.5 py-0.5 bg-[#05CC47] text-white font-bold rounded-2xs text-[10px]">
                    marchmountain
                  </span>
                  <span className="text-gray-500 text-[10px]">(DeviantArt)</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-[11px]">
              Todos os ícones clássicos em altíssima definição (256×256) exibidos nesta interface foram recriados e disponibilizados pelo artista <strong>marchmountain</strong> no DeviantArt.
            </p>

            <a
              href="https://www.deviantart.com/marchmountain/art/Windows-XP-High-Resolution-Icon-Pack-916042853"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-b from-[#F2F0E4] to-[#E3DFD0] hover:from-[#E3DFD0] hover:to-[#D5D0C0] border border-[#7A7565] rounded-xs font-semibold text-[#0B3A82] cursor-pointer shadow-2xs"
            >
              <span>Ver página no DeviantArt (marchmountain)</span>
              <ExternalLink size={12} />
            </a>

            <div className="pt-2 border-t border-gray-300 text-gray-600 space-y-1 text-[10px]">
              <p>• Efeitos Sonoros & Wallpaper Bliss: © Microsoft Corporation.</p>
              <p>• Engenharia e Desenvolvimento Web: Pedro Cafure (cafureworks.link).</p>
            </div>
          </div>
        )}
      </div>

      {/* Buttons OK / Cancel */}
      <div className="flex justify-end space-x-2 pt-3 border-t border-[#D4CEB8] mt-2">
        <button
          onClick={() => closeWindow('app-system-properties')}
          className="px-4 py-1 rounded-xs bg-gradient-to-b from-white to-[#ECE9D8] border border-[#7F9DB9] hover:brightness-105 active:brightness-95 font-semibold text-gray-800 shadow-xs cursor-pointer min-w-[70px]"
        >
          OK
        </button>
        <button
          onClick={() => closeWindow('app-system-properties')}
          className="px-4 py-1 rounded-xs bg-gradient-to-b from-white to-[#ECE9D8] border border-[#7F9DB9] hover:brightness-105 active:brightness-95 text-gray-700 shadow-xs cursor-pointer min-w-[70px]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
