import React, { useState } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import type { ProjectItem } from '../../types';
import { XpIconRenderer } from './XpIconRenderer';
import { Trash2, Plus, RefreshCw, ExternalLink } from 'lucide-react';

export const XpProjectManager: React.FC = () => {
  const { projects, folders, addProject, deleteProject, resetToDefaults } = useDesktop();

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [folderId, setFolderId] = useState(folders[0]?.id || 'web-apps');
  const [icon, setIcon] = useState('prisma');
  const [badge, setBadge] = useState('');
  const [showOnDesktop, setShowOnDesktop] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const selectedFolder = folders.find((f) => f.id === folderId);

    const newProject: ProjectItem = {
      id: `project-${Date.now()}`,
      title: title.trim(),
      url: formattedUrl,
      description: description.trim() || 'Projeto no domínio cafureworks.link',
      category: selectedFolder ? selectedFolder.name : 'Web',
      folderId,
      icon,
      badge: badge.trim() || undefined,
      showOnDesktop,
    };

    addProject(newProject);
    setTitle('');
    setUrl('');
    setDescription('');
    setBadge('');
  };

  const iconOptions = [
    { id: 'prisma', label: 'Prisma' },
    { id: 'api-bot', label: 'Bot / API' },
    { id: 'folder-projects', label: 'Projetos Web' },
    { id: 'internet-explorer', label: 'Navegador Web' },
    { id: 'github', label: 'GitHub' },
    { id: 'my-computer', label: 'Computador' },
    { id: 'notepad', label: 'Notepad' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] p-3 overflow-y-auto text-[11px] font-sans">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#D4CEB8]">
        <div>
          <h3 className="text-[13px] font-bold text-gray-800">
            Gerenciador de Projetos & Subdomínios
          </h3>
          <p className="text-gray-600 text-[10px]">
            Adicione subdomínios (ex: seuprojeto.cafureworks.link) ou atalhos que aparecem no Desktop e nas Pastas.
          </p>
        </div>
        <button
          onClick={resetToDefaults}
          title="Restaurar projetos padrão"
          className="flex items-center space-x-1 px-2 py-1 bg-white border border-[#7F9DB9] rounded-xs hover:bg-gray-50 text-gray-700 cursor-pointer shadow-2xs text-[10px]"
        >
          <RefreshCw size={11} />
          <span>Restaurar Padrões</span>
        </button>
      </div>

      {/* Form to Add Project */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border border-[#7F9DB9] rounded-sm shadow-xs mb-4">
        <h4 className="font-bold text-blue-900 mb-2 flex items-center space-x-1">
          <Plus size={14} className="text-blue-700" />
          <span>Cadastrar Novo Projeto ou Subdomínio</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Nome do Projeto:</label>
            <input
              type="text"
              required
              placeholder="Ex: Prisma Studio, Evolution Bot..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1 border border-[#7F9DB9] rounded-2xs text-[11px] outline-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">URL / Subdomínio:</label>
            <input
              type="text"
              required
              placeholder="Ex: prisma.cafureworks.link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-2 py-1 border border-[#7F9DB9] rounded-2xs text-[11px] outline-blue-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Pasta / Categoria:</label>
            <select
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="w-full px-2 py-1 border border-[#7F9DB9] rounded-2xs text-[11px] outline-blue-600 bg-white"
            >
              {folders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Ícone:</label>
            <div className="flex items-center space-x-2">
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="flex-1 px-2 py-1 border border-[#7F9DB9] rounded-2xs text-[11px] outline-blue-600 bg-white"
              >
                {iconOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="w-7 h-7 flex items-center justify-center p-1 bg-gray-100 border rounded">
                <XpIconRenderer icon={icon} size={20} />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">Descrição:</label>
            <input
              type="text"
              placeholder="Breve resumo do projeto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-2 py-1 border border-[#7F9DB9] rounded-2xs text-[11px] outline-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Badge (opcional):</label>
            <input
              type="text"
              placeholder="Ex: Novo, Subdomínio, Live..."
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full px-2 py-1 border border-[#7F9DB9] rounded-2xs text-[11px] outline-blue-600"
            />
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <label className="flex items-center space-x-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnDesktop}
                onChange={(e) => setShowOnDesktop(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="font-semibold text-gray-800">Criar atalho na Área de Trabalho</span>
            </label>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="px-4 py-1.5 bg-gradient-to-b from-[#2B72EE] to-[#0055EA] text-white font-bold rounded-xs shadow-xs hover:brightness-110 active:brightness-95 cursor-pointer"
          >
            Adicionar Projeto
          </button>
        </div>
      </form>

      {/* Projects List */}
      <h4 className="font-bold text-gray-800 mb-2">Projetos Atuais ({projects.length})</h4>
      <div className="space-y-2">
        {projects.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 bg-white border border-[#D4CEB8] rounded-xs shadow-2xs hover:bg-[#F8FAFC]"
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <XpIconRenderer icon={item.icon} size={28} />
              <div className="overflow-hidden">
                <div className="flex items-center space-x-2">
                  <p className="font-bold text-gray-900 truncate">{item.title}</p>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 text-[9px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.showOnDesktop && (
                    <span className="text-[9px] text-gray-500 bg-gray-100 px-1 rounded">
                      Área de Trabalho
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-blue-700 font-mono truncate">{item.url}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="p-1 text-gray-600 hover:text-blue-700 hover:bg-gray-100 rounded"
                title="Visitar link"
              >
                <ExternalLink size={14} />
              </a>
              <button
                onClick={() => deleteProject(item.id)}
                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded cursor-pointer"
                title="Remover projeto"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
