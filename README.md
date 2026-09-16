# 🪟 CafureWorks - Windows XP Web Desktop & Project Hub

Um portal interativo e nostálgico que recria a experiência clássica do **Windows XP (Luna Blue Theme)** para reunir todos os projetos e subdomínios de **Pedro Cafure** no domínio principal:

🌐 **[cafureworks.link](https://cafureworks.link)**

---

## ✨ Recursos

- 🏞️ **Papel de Parede Bliss**: As clássicas colinas verdes com céu azul em vetor de alta fidelidade.
- 🗂️ **Organização por Pastas (Windows Explorer)**:
  - Navegue pelas pastas temáticas (*Projetos Web & Apps*, *Automações & APIs*, *Ferramentas & Utilitários*).
  - Barra de ferramentas clássica (Voltar, Avançar, Subir, Pesquisar, Pastas).
  - Painel lateral azul com "Tarefas de Projetos", "Outros Locais" e "Detalhes do Projeto".
- 🚀 **Atalhos e Subdomínios (ex: `prisma.cafureworks.link`)**:
  - Cada projeto conta com ícone temático, link direto, resumo técnico e tags.
  - Duplo clique abre o subdomínio ou janela de visualização.
  - Ícones arrastáveis livremente na área de trabalho e persistidos no navegador.
  - Seleção por caixa azul translúcida clássica do XP (marquee drag).
- 🟢 **Barra de Tarefas & Menu Iniciar**:
  - Botão "Iniciar" verde clássico 3D.
  - Menu Iniciar em 2 colunas com avatar de usuário, projetos fixados e atalhos rápidos.
  - Relógio digital ao vivo e controle de volume (com sintetizador de sons clássicos do XP via Web Audio API).
  - Diálogo nostálgico de **Desligar o Computador**.
- 🛠️ **Fácil de Configurar**:
  - Aplicativo "Gerenciador de Projetos" embutido na interface para cadastrar e testar novos projetos em tempo real.
  - Arquivo central de dados em `src/data/projects.ts` para versionar novos subdomínios.

---

## 📁 Como Adicionar ou Editar Projetos

Basta abrir o arquivo [`src/data/projects.ts`](src/data/projects.ts) e adicionar seu novo subdomínio na lista `DEFAULT_PROJECTS`:

```typescript
{
  id: 'meu-projeto',
  title: 'Meu Projeto',
  description: 'Descrição do meu novo subdomínio',
  url: 'https://meuprojeto.cafureworks.link',
  icon: 'prisma', // Opções: 'prisma', 'api-bot', 'folder-projects', 'internet-explorer', 'github', etc.
  category: 'Web & Apps',
  folderId: 'web-apps', // 'web-apps' | 'apis-bots' | 'tools'
  showOnDesktop: true, // true para aparecer direto na Área de Trabalho
  badge: 'Novo',
  techStack: ['React', 'TypeScript', 'Node.js']
}
```

---

## 💻 Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Compilar para produção
npm run build
```

---

## ☁️ Como Fazer o Deploy no Cloudflare Pages

### Método 1: Conectado ao Repositório GitHub (Recomendado - Automático)

1. Acesse o painel da **Cloudflare** em [dash.cloudflare.com](https://dash.cloudflare.com).
2. Vá em **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Selecione o repositório `ZeniteSoftware/cafureworks` (ou a conta onde foi criado).
4. Defina as configurações de build:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Clique em **Save and Deploy**.
6. Após a primeira compilação, vá na aba **Custom domains** do seu projeto Pages:
   - Adicione `cafureworks.link` (e `www.cafureworks.link` se desejar).
   - O Cloudflare configurará o DNS automaticamente com SSL ativo!

### Método 2: Via Wrangler CLI

```bash
npx wrangler pages deploy dist --project-name cafureworks
```

---

Desenvolvido por **Pedro Cafure** (Zênite Software®).
