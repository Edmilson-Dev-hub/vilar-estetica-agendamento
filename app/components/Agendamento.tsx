"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Agendamento() {
  const [procedimentos, setProcedimentos] = useState<any[]>([]);

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
  return (
    <section id="contato" className="min-h-screen flex items-center justify-center  bg-[#f5efe6] px-6 lg:px-16 py-16">
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

          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#2a1a12] mb-2">Nome completo</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm placeholder:text-[#a89a86] focus:outline-none focus:border-[#b8794f]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#2a1a12] mb-2">Telefone / Whatsapp</label>
                <input
                  type="tel"
                  placeholder="(83) 986379361"
                  className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm placeholder:text-[#a89a86] focus:outline-none focus:border-[#b8794f]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#2a1a12] mb-2">E-mail</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm placeholder:text-[#a89a86] focus:outline-none focus:border-[#b8794f]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#2a1a12] mb-2">Procedimento de interesse</label>
                <select
                  className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm text-[#a89a86] focus:outline-none focus:border-[#b8794f]"
                >
                  <option value="">Selecione um procedimento</option>
                  {procedimentos.map((proc) => (
                    <option key={proc.id} value={proc.id}>
                      {proc.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#2a1a12] mb-2">
                Mensagem <span className="text-[#a89a86]">(opcional)</span>
              </label>
              <textarea
                placeholder="Conte mais sobre suas necessidades ou dúvidas..."
                rows={4}
                className="w-full bg-[#f5efe6] border border-[#e8ddd0] rounded-xl px-4 py-3 text-sm placeholder:text-[#a89a86] focus:outline-none focus:border-[#b8794f] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#b8794f] text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 mt-2"
            >
              Agendar Consulta
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}