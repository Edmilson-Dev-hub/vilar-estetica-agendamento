"use client";

import { useState } from 'react';

type Mensagem = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { role: 'assistant', content: 'Olá! Sou o assistente da VV Villar. Posso explicar os procedimentos e informar valores. Como posso ajudar?' },
  ]);
  const [texto, setTexto] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pergunta = texto.trim();
    if (!pergunta || carregando) return;

    const novas: Mensagem[] = [...mensagens, { role: 'user', content: pergunta }];
    setMensagens(novas);
    setTexto('');
    setCarregando(true);

    try {
      const resposta = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagens: novas }),
      });
      const dados = await resposta.json();
      const conteudo = resposta.ok ? dados.resposta : (dados.erro ?? 'Não foi possível responder agora.');
      setMensagens([...novas, { role: 'assistant', content: conteudo }]);
    } catch {
      setMensagens([...novas, { role: 'assistant', content: 'Falha de conexão. Tente novamente.' }]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {aberto && (
        <div className="w-[calc(100vw-3rem)] sm:w-96 h-[480px] max-h-[70vh] bg-white rounded-3xl shadow-xl border border-[#e8ddd0] flex flex-col overflow-hidden">
          <div className="bg-[#2a1a12] text-[#f5efe6] px-5 py-4">
            <p className="font-serif tracking-widest text-lg">VV VILLAR</p>
            <p className="text-xs text-[#c9b8a8]">Assistente virtual</p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f5efe6]">
            {mensagens.map((m, i) => (
              <p
                key={i}
                className={
                  m.role === 'user'
                    ? 'self-end max-w-[85%] bg-[#b8794f] text-white rounded-2xl rounded-br-md px-4 py-2 text-sm whitespace-pre-wrap'
                    : 'self-start max-w-[85%] bg-white text-[#2a1a12] border border-[#e8ddd0] rounded-2xl rounded-bl-md px-4 py-2 text-sm whitespace-pre-wrap'
                }
              >
                {m.content}
              </p>
            ))}
            {carregando && (
              <p className="self-start text-xs text-[#8a7460]">Digitando...</p>
            )}
          </div>

          <form onSubmit={enviar} className="flex gap-2 p-3 border-t border-[#e8ddd0] bg-white">
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite sua pergunta"
              maxLength={500}
              aria-label="Mensagem para o assistente"
              className="flex-1 bg-[#f5efe6] border border-[#e8ddd0] rounded-full px-4 py-2 text-sm placeholder:text-[#a89a86] focus:outline-none focus:border-[#b8794f]"
            />
            <button
              type="submit"
              disabled={carregando}
              className="bg-[#b8794f] text-white rounded-full px-4 py-2 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setAberto(!aberto)}
        aria-label={aberto ? 'Fechar chat' : 'Abrir chat'}
        className="bg-[#b8794f] text-white rounded-full px-5 py-3 text-sm font-medium shadow-lg"
      >
        {aberto ? 'Fechar' : 'Fale com a gente'}
      </button>
    </div>
  );
}