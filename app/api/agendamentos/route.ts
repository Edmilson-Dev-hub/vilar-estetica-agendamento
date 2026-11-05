import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

const MAX_PROCEDIMENTOS = 2;
const FORMATO_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Pedido = {
  nome: string;
  telefone: string;
  email: string;
  mensagem: string | null;
  inicio: string;
  procedimentos: string[];
};

type Resultado = { pedido: Pedido } | { erro: string };

function recusar(mensagem: string) {
  return NextResponse.json({ erro: mensagem }, { status: 400 });
}

type ErroBanco = { code?: string; message?: string };

function respostaDeErro(erro: ErroBanco) {
  // P0001: uma das regras escritas na função (horário no passado, fora do expediente...)
  if (erro.code === 'P0001') {
    return NextResponse.json({ erro: erro.message ?? 'Pedido inválido.' }, { status: 400 });
  }

  // 23P01: a regra anti-sobreposição do banco (horário já ocupado)
  if (erro.code === '23P01') {
    return NextResponse.json(
      { erro: 'Esse horário acabou de ser ocupado. Escolha outro.' },
      { status: 409 }
    );
  }

  console.error('Erro ao criar agendamento:', erro.code, erro.message);
  return NextResponse.json(
    { erro: 'Não foi possível concluir o agendamento agora.' },
    { status: 500 }
  );
}

function textoLimpo(valor: unknown) {
  return typeof valor === 'string' ? valor.trim() : '';
}

function lerIds(valor: unknown) {
  if (!Array.isArray(valor)) return [];
  const ids = valor.filter((id): id is string => typeof id === 'string');
  return [...new Set(ids)]; // remove repetidos
}

function idsValidos(ids: string[]) {
  const quantidadeOk = ids.length >= 1 && ids.length <= MAX_PROCEDIMENTOS;
  return quantidadeOk && ids.every((id) => FORMATO_UUID.test(id));
}

function validarPedido(corpo: unknown): Resultado {
  const dados = (corpo && typeof corpo === 'object' ? corpo : {}) as Record<string, unknown>;

  const nome = textoLimpo(dados.nome);
  const telefone = textoLimpo(dados.telefone);
  const email = textoLimpo(dados.email);
  const mensagem = textoLimpo(dados.mensagem);
  const inicio = new Date(textoLimpo(dados.inicio));
  const procedimentos = lerIds(dados.procedimentos);

  if (!nome || !telefone || !email) return { erro: 'Preencha nome, telefone e e-mail.' };

  const grandeDemais =
    nome.length > 100 || telefone.length > 20 || email.length > 120 || mensagem.length > 500;
  if (grandeDemais) return { erro: 'Algum campo ficou grande demais.' };

  if (!FORMATO_EMAIL.test(email)) return { erro: 'E-mail inválido.' };
  if (Number.isNaN(inicio.getTime())) return { erro: 'Escolha um horário.' };
  if (!idsValidos(procedimentos)) return { erro: 'Escolha de 1 a 2 procedimentos.' };

  return {
    pedido: {
      nome,
      telefone,
      email,
      mensagem: mensagem || null,
      inicio: inicio.toISOString(),
      procedimentos,
    },
  };
}

export async function POST(request: Request) {
  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return recusar('Corpo da requisição inválido.');
  }

  const resultado = validarPedido(corpo);
  if ('erro' in resultado) return recusar(resultado.erro);

  const { pedido } = resultado;

  const { data, error } = await supabaseAdmin.rpc('criar_agendamento', {
    p_nome: pedido.nome,
    p_telefone: pedido.telefone,
    p_email: pedido.email,
    p_mensagem: pedido.mensagem,
    p_inicio: pedido.inicio,
    p_procedimentos: pedido.procedimentos,
  });

  if (error) return respostaDeErro(error);

  return NextResponse.json(
    { mensagem: 'Agendamento confirmado.', agendamento: data },
    { status: 201 }
  );
}