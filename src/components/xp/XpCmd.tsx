import React, { useState, useRef, useEffect } from 'react';
import { useDesktop } from '../../context/DesktopContext';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export const XpCmd: React.FC = () => {
  const { projects, closeWindow, openProject } = useDesktop();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: '',
      output: (
        <div className="space-y-1 mb-2 text-gray-300">
          <div>Microsoft Windows XP [Versão 5.1.2600]</div>
          <div>(C) Copyright 1985-2001 Microsoft Corp.</div>
          <div className="text-emerald-400 mt-2">
            CafureWorks Console Terminal. Digite <span className="text-yellow-300 font-bold">help</span> para ver os comandos.
          </div>
        </div>
      ),
    },
  ]);

  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [textColor, setTextColor] = useState<string>('#CCCCCC');
  const [bgColor] = useState<string>('#0C0C0C');

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) {
      setHistory((prev) => [
        ...prev,
        { command: '', output: null },
      ]);
      return;
    }

    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryPointer(-1);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: React.ReactNode = null;

    switch (command) {
      case 'help':
        output = (
          <div className="space-y-1 text-gray-300 my-1">
            <div className="text-yellow-300 font-bold mb-1">COMANDOS DISPONÍVEIS:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5">
              <div><span className="text-emerald-400 font-bold">whoami</span> - Dados do desenvolvedor Pedro Cafure</div>
              <div><span className="text-emerald-400 font-bold">projects</span> - Lista de subdomínios cadastrados</div>
              <div><span className="text-emerald-400 font-bold">open &lt;nome&gt;</span> - Abre um projeto</div>
              <div><span className="text-emerald-400 font-bold">ping &lt;host&gt;</span> - Testa conectividade</div>
              <div><span className="text-emerald-400 font-bold">dir</span> - Lista arquivos da Área de Trabalho</div>
              <div><span className="text-emerald-400 font-bold">type &lt;arq&gt;</span> - Exibe conteúdo de texto</div>
              <div><span className="text-emerald-400 font-bold">color &lt;hex&gt;</span> - Altera a cor do texto (ex: color green, color cyan)</div>
              <div><span className="text-emerald-400 font-bold">ver</span> - Versão do sistema operacional</div>
              <div><span className="text-emerald-400 font-bold">date</span> - Exibe a data atual</div>
              <div><span className="text-emerald-400 font-bold">echo &lt;msg&gt;</span> - Imprime mensagem na tela</div>
              <div><span className="text-emerald-400 font-bold">cls</span> - Limpa o terminal</div>
              <div><span className="text-emerald-400 font-bold">exit</span> - Fecha o Prompt de Comando</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-1 text-gray-200 my-1 border-l-2 border-emerald-500 pl-2">
            <div className="font-bold text-white">PEDRO CAFURE (Desenvolvedor Full-Stack)</div>
            <div>Domínio: <a href="https://cafureworks.link" target="_blank" rel="noreferrer" className="text-blue-400 underline">cafureworks.link</a></div>
            <div>Foco: Desenvolvimento Full-Stack, Aplicações Web, Infraestrutura e Automações.</div>
            <div>Rede: Cloudflare Global Edge Network</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1 my-1">
            <div className="font-bold text-yellow-300">SUBDOMÍNIOS & PROJETOS REGISTRADOS:</div>
            {projects.length === 0 ? (
              <div className="text-gray-400">Nenhum projeto cadastrado no momento. Use o aplicativo "Adicionar Projeto" na Área de Trabalho para cadastrar!</div>
            ) : (
              <div className="space-y-1 mt-1">
                {projects.map((p) => (
                  <div key={p.id} className="text-gray-300">
                    • <span className="text-emerald-400 font-bold">{p.title}</span> - {p.url} ({p.category})
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        break;

      case 'open':
        if (!args[0]) {
          output = <div className="text-red-400">Sintaxe incorreta. Exemplo: open prisma</div>;
        } else {
          const found = projects.find((p) => p.title.toLowerCase().includes(args[0].toLowerCase()) || p.id.includes(args[0].toLowerCase()));
          if (found) {
            openProject(found);
            output = <div className="text-emerald-400">Iniciando aplicativo {found.title}...</div>;
          } else {
            output = <div className="text-red-400">Projeto não encontrado: {args[0]}</div>;
          }
        }
        break;

      case 'ping':
        const host = args[0] || 'cafureworks.link';
        output = (
          <div className="space-y-0.5 text-gray-300 my-1">
            <div>Disparando {host} com 32 bytes de dados:</div>
            <div>Resposta de 104.21.45.12: bytes=32 tempo=12ms TTL=57</div>
            <div>Resposta de 104.21.45.12: bytes=32 tempo=11ms TTL=57</div>
            <div>Resposta de 104.21.45.12: bytes=32 tempo=14ms TTL=57</div>
            <div>Resposta de 104.21.45.12: bytes=32 tempo=11ms TTL=57</div>
            <div className="mt-1 text-gray-400">
              Estatísticas do Ping para {host}: Pacotes: Enviados = 4, Recebidos = 4, Perdidos = 0 (0% de perda).
            </div>
          </div>
        );
        break;

      case 'dir':
      case 'ls':
        output = (
          <div className="space-y-0.5 text-gray-300 my-1 font-mono text-xs">
            <div> O volume na unidade C é CAFUREWORKS</div>
            <div> O Número de Série do Volume é 7A1F-8C92</div>
            <div className="my-1"> Pasta de C:\Documents and Settings\Pedro Cafure\Desktop</div>
            <div>16/09/2026  17:00    &lt;DIR&gt;          .</div>
            <div>16/09/2026  17:00    &lt;DIR&gt;          ..</div>
            <div>16/09/2026  17:40         1.601.144 windows_xp_wallpaper.jpg</div>
            <div>16/09/2026  18:00             1.240 README.txt</div>
            <div>16/09/2026  18:30    &lt;DIR&gt;          Meus Projetos</div>
            <div>16/09/2026  19:00    &lt;DIR&gt;          Lixeira</div>
            <div className="mt-1 text-gray-400">2 arquivo(s)      1.602.384 bytes</div>
            <div className="text-gray-400">4 pasta(s)   48.291.820.544 bytes livres</div>
          </div>
        );
        break;

      case 'type':
      case 'cat':
        const file = (args[0] || '').toLowerCase();
        if (file.includes('readme')) {
          output = (
            <pre className="text-gray-300 font-mono text-[11px] whitespace-pre-wrap my-1">
=====================================================
 CAFUREWORKS - WINDOWS XP EDITION
 Domínio Principal: cafureworks.link
 Desenvolvedor: Pedro Cafure
=====================================================
Portal de projetos pessoais e automações.
            </pre>
          );
        } else {
          output = <div className="text-red-400">O sistema não pode encontrar o arquivo especificado.</div>;
        }
        break;

      case 'ver':
        output = <div className="text-gray-300 my-0.5">Microsoft Windows XP [Versão 5.1.2600] Service Pack 3</div>;
        break;

      case 'date':
        output = <div className="text-gray-300 my-0.5">A data atual é: {new Date().toLocaleDateString('pt-BR')}</div>;
        break;

      case 'time':
        output = <div className="text-gray-300 my-0.5">A hora atual é: {new Date().toLocaleTimeString('pt-BR')}</div>;
        break;

      case 'echo':
        output = <div className="text-gray-200 my-0.5">{args.join(' ')}</div>;
        break;

      case 'color':
        const targetCol = (args[0] || '').toLowerCase();
        if (targetCol === 'green' || targetCol === '0a') setTextColor('#00FF66');
        else if (targetCol === 'cyan' || targetCol === '0b') setTextColor('#00FFFF');
        else if (targetCol === 'yellow' || targetCol === '0e') setTextColor('#FFFF00');
        else if (targetCol === 'white' || targetCol === '0f') setTextColor('#FFFFFF');
        else if (targetCol === 'amber' || targetCol === '06') setTextColor('#FFB000');
        else if (targetCol === 'blue') setTextColor('#66AAFF');
        else {
          output = <div className="text-gray-400">Cores válidas: green, cyan, yellow, white, amber, blue</div>;
        }
        break;

      case 'cls':
      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        closeWindow('app-cmd');
        return;

      default:
        output = (
          <div className="text-red-400 my-0.5">
            '{command}' não é reconhecido como um comando interno ou externo, um programa operável ou um arquivo em lotes. Digite <span className="text-yellow-300 font-bold">help</span>.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      { command: trimmed, output },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyPointer < cmdHistory.length - 1) {
        const nextPtr = historyPointer + 1;
        setHistoryPointer(nextPtr);
        setInput(cmdHistory[nextPtr]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const nextPtr = historyPointer - 1;
        setHistoryPointer(nextPtr);
        setInput(cmdHistory[nextPtr]);
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: '"Lucida Console", "Courier New", monospace',
      }}
      className="flex flex-col h-full p-3 text-[12px] leading-snug select-text cursor-text overflow-y-auto"
    >
      {history.map((entry, idx) => (
        <div key={idx} className="space-y-0.5">
          {entry.command && (
            <div className="flex items-center space-x-1">
              <span className="text-gray-400 select-none">C:\Documents and Settings\Pedro Cafure&gt;</span>
              <span className="font-bold">{entry.command}</span>
            </div>
          )}
          {entry.output && <div>{entry.output}</div>}
        </div>
      ))}

      {/* Active Input Line */}
      <div className="flex items-center space-x-1 mt-1">
        <span className="text-gray-400 select-none">C:\Documents and Settings\Pedro Cafure&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          className="flex-1 bg-transparent border-none outline-none font-bold text-[12px] p-0 m-0"
          style={{ color: textColor }}
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
};
