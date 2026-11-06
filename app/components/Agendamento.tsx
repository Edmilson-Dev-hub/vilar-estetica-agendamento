"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Agendamento() {
  const [procedimentos, setProcedimentos] = useState<any[]>([]);

  const [form, setForm] = useState({
  nome: '',
  telefone: '',
  email: '',
  procedimentoId: '',
  procedimentoId2: '',
  mensagem: '',
});

  const [ enviando, setEnviando ] = useState(false);
  const [ resultado, setResultado ] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  useEffect(() => {
    async function buscarProcedimentos() {
      const { data, error } = await supabase
        .from('procedimentos')
        .select('id, nome')
        .eq('ativo', true);

      if (error) {
        console.error('Erro ao buscar procedimentos:', error);
      } else {
        setProcedimentos(data);
      }
    }

    buscarProcedimentos();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setEnviando(true);
  setResultado(null);

  try {
    const resposta = await fetch('/api/agendamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      setResultado({ tipo: 'sucesso', texto: 'Recebemos seu pedido! Entraremos em contato em breve.' });
      setForm({ nome: '', telefone: '', email: '', procedimentoId: '', procedimentoId2: '', mensagem: '' });
    } else {
      setResultado({ tipo: 'erro', texto: dados.erro ?? 'Não foi possível enviar. Tente novamente.' });
    }
  } catch {
    setResultado({ tipo: 'erro', texto: 'Falha de conexão. Verifique sua internet e tente novamente.' });
  } finally {
    setEnviando(false);
  }
}
  return (
    <section id="contato" className="scroll-mt-24 min-h-screen flex items-center justify-center bg-[#f5efe6] px-6 lg:px-16 py-16">
      <div className="w-full max-w-6xl bg-white rounded-[40px] flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-6 lg:p-10">

        <div className="w-full h-[400px] relative lg:flex-[0.9] lg:h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=700&h=900&fit=crop&auto=format"
            alt="Atendimento personalizado"
            fill
            className="object-cover rounded-3xl"
          />
          <div className="absolute bottom-6 left-6 flex flex-col gap-2">
            <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#b8794f]"></span>
              <p className="text-sm text-[#2a1a12]">Atendimento Personalizado</p>
            </div>
            <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#b8794f]"></span>
              <p className="text-sm text-[#2a1a12]">Sigilo Total</p>
            </div>
          </div>
        </div>

        <div className="flex-[1.1] w-full">
          <p className="uppercase tracking-widest text-sm text-[#8a7460] mb-4">
            Agendamento
          </p>
          <h2 className="text-4xl font-semibold mb-4">
            Pronta para cuidar <span className="font-serif italic">de você?</span>
          </h2>
          <p className="text-lg text-[#5c4a3a] mb-8">
            Agende sua consulta e dê o primeiro passo para uma versão ainda mais confiante de você.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#2a1a12] mb-2">Nome completo</label>
                <input
                  type="text"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm placeholder:text-[#a89a86] focus:outline-none focus:border-[#b8794f]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#2a1a12] mb-2">Telefone / Whatsapp</label>
                <input
                type="tel"
                required
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                placeholder="(83) 986379361"
                className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm placeholder:text-[#a89a86] focus:outline-none focus:border-[#b8794f]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-[#2a1a12] mb-2">E-mail</label>
                <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm placeholder:text-[#a89a86] focus:outline-none focus:border-[#b8794f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:col-span-2">
              <div>
                <label className="block text-sm text-[#2a1a12] mb-2">Procedimento de interesse</label>
                <select
                  required
                  value={form.procedimentoId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      procedimentoId: e.target.value,
                      procedimentoId2: form.procedimentoId2 === e.target.value ? '' : form.procedimentoId2,
                    })
                  }
                  className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#b8794f]"
                >
                  <option value="">Selecione um procedimento</option>
                  {procedimentos.map((proc) => (
                    <option key={proc.id} value={proc.id}>
                      {proc.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#2a1a12] mb-2">
                  Segundo procedimento <span className="text-[#a89a86]">(opcional)</span>
                </label>
                <select
                  value={form.procedimentoId2}
                  onChange={(e) => setForm({ ...form, procedimentoId2: e.target.value })}
                  disabled={!form.procedimentoId}
                  className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#b8794f] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <option value="">Nenhum</option>
                  {procedimentos
                    .filter((proc) => proc.id !== form.procedimentoId)
                    .map((proc) => (
                      <option key={proc.id} value={proc.id}>
                        {proc.nome}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            </div>

            <div>
              <label className="block text-sm text-[#2a1a12] mb-2">
                Mensagem <span className="text-[#a89a86]">(opcional)</span>
              </label>
              <textarea
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                placeholder="Conte mais sobre suas necessidades ou dúvidas..."
                rows={4}
                className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm placeholder:text-[#a89a86] focus:outline-none focus:border-[#b8794f]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="bg-[#b8794f] text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {enviando ? 'Enviando...' : 'Agendar Consulta'}
              {!enviando && <span>→</span>}
            </button>
            {resultado && (
            <p
              role="status"
              className={`rounded-xl px-4 py-3 text-sm ${
                resultado.tipo === 'sucesso'
                  ? 'bg-[#eef6ee] text-[#2f5d3a] border border-[#cfe3d1]'
                  : 'bg-[#fbeeee] text-[#8a2f2f] border border-[#efcfcf]'
              }`}
            >
              {resultado.texto}
            </p>
          )}
          </form>
        </div>
      </div>
    </section>
  );
}