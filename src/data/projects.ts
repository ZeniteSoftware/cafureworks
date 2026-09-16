import type { FolderItem, ProjectItem } from '../types';

export const DEFAULT_FOLDERS: FolderItem[] = [
  {
    id: 'web-apps',
    name: 'Projetos Web & Apps',
    description: 'Aplicações web, portais e dashboards em produção',
    icon: 'folder-projects',
    showOnDesktop: true,
  },
  {
    id: 'apis-bots',
    name: 'Automações & APIs',
    description: 'Sistemas de mensageria, Evolution API, bots e webhooks',
    icon: 'folder',
    showOnDesktop: true,
  },
  {
    id: 'tools',
    name: 'Ferramentas & Utilitários',
    description: 'Dev tools, scripts e utilitários auxiliares',
    icon: 'folder',
    showOnDesktop: false,
  },
];

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'prisma',
    title: 'Prisma Project',
    description: 'Gerenciador de dados e infraestrutura Prisma no subdomínio prisma.cafureworks.link',
    url: 'https://prisma.cafureworks.link',
    icon: 'prisma',
    category: 'Web & Banco de Dados',
    folderId: 'web-apps',
    showOnDesktop: true,
    badge: 'Subdomínio',
    techStack: ['TypeScript', 'Prisma ORM', 'Node.js', 'PostgreSQL'],
    openInIframe: false,
  },
  {
    id: 'evolution-whatsapp',
    title: 'Evolution WhatsApp',
    description: 'Automação de mensagens, disparo de alertas e integração com a Evolution API',
    url: 'https://whatsapp.cafureworks.link',
    icon: 'api-bot',
    category: 'Automação & Mensageria',
    folderId: 'apis-bots',
    showOnDesktop: true,
    badge: 'API v2',
    techStack: ['Node.js', 'Evolution API', 'Webhooks', 'Docker'],
    openInIframe: false,
  },
  {
    id: 'zenite-hub',
    title: 'Zênite Software (GitHub)',
    description: 'Repositórios e projetos open-source da organização Zênite Software',
    url: 'https://github.com/ZeniteSoftware',
    icon: 'github',
    category: 'Repositórios',
    folderId: 'web-apps',
    showOnDesktop: true,
    badge: 'GitHub',
    techStack: ['Open Source', 'DevOps', 'Cloudflare'],
    openInIframe: false,
  },
  {
    id: 'cafure-core-api',
    title: 'Core Gateway API',
    description: 'Centralizador de microsserviços, roteamento de webhooks e autenticação',
    url: 'https://api.cafureworks.link',
    icon: 'api-bot',
    category: 'Backend & APIs',
    folderId: 'apis-bots',
    showOnDesktop: false,
    badge: 'Microserviço',
    techStack: ['FastAPI / Node.js', 'Redis', 'Cloudflare Workers'],
    openInIframe: false,
  },
  {
    id: 'analytics-dashboard',
    title: 'Cafure Metrics & Logs',
    description: 'Painel unificado de monitoramento de instâncias e status dos subdomínios',
    url: 'https://status.cafureworks.link',
    icon: 'project-generic',
    category: 'Monitoramento',
    folderId: 'tools',
    showOnDesktop: false,
    badge: 'Status',
    techStack: ['Grafana / Prometheus', 'Cloudflare Analytics'],
    openInIframe: false,
  },
];

export const README_CONTENT = `=====================================================
 BEM-VINDO AO CAFUREWORKS - WINDOWS XP EDITION
 Domínio Principal: cafureworks.link
 Desenvolvedor: Pedro Cafure (Zênite Software®)
=====================================================

Olá! Este portal reúne todos os meus projetos, aplicações e
subdomínios em um só lugar, recriando com carinho a experiência
clássica do Windows XP (Luna Blue Theme).

COMO FUNCIONA:
- Duplo clique em qualquer ícone para abrir o projeto ou pasta.
- Cada pasta abre uma janela do Windows Explorer clássico.
- Você pode arrastar os ícones pela tela livremente.
- O botão "Iniciar" dá acesso rápido aos projetos e atalhos.
- Você pode adicionar novos subdomínios a qualquer momento
  usando o aplicativo "Gerenciador de Projetos" ou editando
  o arquivo src/data/projects.ts!

PROJETOS EM DESTAQUE:
[1] Prisma (prisma.cafureworks.link)
    - Acesso direto ao painel Prisma ORM / Database Studio.
[2] Evolution WhatsApp (whatsapp.cafureworks.link)
    - Automações, bots e webhooks integrados.
[3] Zênite Software (github.com/ZeniteSoftware)
    - Repositórios e projetos da organização.

Obrigado pela visita! Divirta-se explorando o sistema.
`;

export const SYSTEM_SPECS = {
  osName: 'Microsoft Windows XP Professional',
  version: 'Versão 2002 Service Pack 3 (Cafure Edition)',
  registeredTo: 'Pedro Cafure',
  company: 'Zênite Software / CafureWorks',
  computerName: 'CAFURE-DESKTOP',
  domain: 'cafureworks.link',
  processor: 'Antigravity Hyper-Threaded Neural Core',
  ram: '64.0 GB de RAM',
  stack: [
    'Cloudflare Pages & DNS',
    'React 19 & TypeScript',
    'Tailwind CSS XP Engine',
    'Node.js & Vite',
    'Evolution WhatsApp API',
    'Prisma ORM & PostgreSQL',
  ],
};
