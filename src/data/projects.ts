import type { FolderItem, ProjectItem } from '../types';

export const DEFAULT_FOLDERS: FolderItem[] = [
  {
    id: 'web-apps',
    name: 'Projetos Web & Apps',
    description: 'Aplicações web, portais e dashboards',
    icon: 'folder-projects',
    showOnDesktop: false,
  },
  {
    id: 'apis-bots',
    name: 'Automações & APIs',
    description: 'Sistemas de automação, bots e webhooks',
    icon: 'folder',
    showOnDesktop: false,
  },
  {
    id: 'tools',
    name: 'Ferramentas & Utilitários',
    description: 'Scripts e utilitários auxiliares',
    icon: 'folder',
    showOnDesktop: false,
  },
];

// Sem programas hardcoded por padrão: adicione seus projetos pelo "Adicionar Projeto"
export const DEFAULT_PROJECTS: ProjectItem[] = [];

export const README_CONTENT = `=====================================================
 BEM-VINDO AO CAFUREWORKS - WINDOWS XP EDITION
 Domínio Principal: cafureworks.link
 Desenvolvedor: Pedro Cafure
=====================================================

Olá! Este portal reúne meus projetos pessoais, aplicações e
subdomínios em um só lugar, recriando a experiência clássica
do Windows XP.

COMO FUNCIONA:
- Duplo clique em qualquer ícone para abrir a aplicação ou pasta.
- Os ícones estão alinhados em grade; você pode reposicioná-los
  e eles se encaixarão perfeitamente na grade.
- Clique com o botão direito na Área de Trabalho para organizar
  os ícones automaticamente em grade.
- Use o aplicativo "Adicionar Projeto" para cadastrar novos
  subdomínios e ferramentas a qualquer momento.
- O botão "Iniciar" dá acesso rápido aos atalhos e utilitários.

=====================================================
 AGRADECIMENTOS E CRÉDITOS DE ARTE
=====================================================
Os ícones em alta resolução (256x256) utilizados neste
sistema são da incrível coleção:

• Pacote: Windows XP High Resolution Icon Pack
• Autor: marchmountain (DeviantArt)
• Link: https://www.deviantart.com/marchmountain/art/Windows-XP-High-Resolution-Icon-Pack-916042853

Um agradecimento especial a marchmountain pelo trabalho
artístico de recriação e restauração dos ícones históricos!

Divirta-se explorando o CafureWorks!
`;

export const SYSTEM_SPECS = {
  osName: 'Microsoft Windows XP Professional',
  version: 'Versão 2002 Service Pack 3 (Cafure Edition)',
  registeredTo: 'Pedro Cafure',
  company: 'CafureWorks (Projetos Pessoais)',
  computerName: 'CAFURE-DESKTOP',
  domain: 'cafureworks.link',
  processor: 'Antigravity Hyper-Threaded Neural Core',
  ram: '64.0 GB de RAM',
  stack: [
    'Cloudflare Pages & DNS',
    'React 19 & TypeScript',
    'Tailwind CSS XP Engine',
    'Node.js & Vite',
  ],
};
