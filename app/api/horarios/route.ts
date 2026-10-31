import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

const BLOCO_MINUTOS = 30;
const MAX_PROCEDIMENTOS = 2;
const MINUTO = 60 * 1000;
const FUSO = '-03:00'; // João Pessoa fica em UTC-3 o ano todo (sem horário de verão)
const FORMATO_DATA = /^\d{4}-\d{2}-\d{2}$/;
const FORMATO_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function recusar(mensagem: string) {
  return NextResponse.json({ erro: mensagem }, { status: 400 });
}

function soma(numeros: number[]) {
  return numeros.reduce((total, numero) => total + numero, 0);
}

function dataValida(data: string) {
  if (!FORMATO_DATA.test(data)) return false;

  // O JavaScript "empurra" datas que não existem (31/02 vira 03/03),
  // então convertemos e comparamos de volta com o que veio.
  const referencia = new Date(`${data}T12:00:00Z`);
  return !Number.isNaN(referencia.getTime()) && referencia.toISOString().slice(0, 10) === data;
}

function lerIds(texto: string) {
  const ids = texto.split(',').filter(Boolean);
  return [...new Set(ids)]; // remove repetidos
}

function idsValidos(ids: string[]) {
  const quantidadeOk = ids.length >= 1 && ids.length <= MAX_PROCEDIMENTOS;
  return quantidadeOk && ids.every((id) => FORMATO_UUID.test(id));
}

function diaDaSemana(data: string) {
  // 0 = domingo ... 6 = sábado, o mesmo padrão da tabela horario_funcionamento
  return new Date(`${data}T12:00:00Z`).getUTCDay();
}

function paraMinutos(hora: string) {
  // '09:30:00' vira 570 (minutos desde a meia-noite)
  const [horas, minutos] = hora.split(':').map(Number);
  return horas * 60 + minutos;
}

function rotulo(minutos: number) {
  // 570 vira '09:30'
  const horas = String(Math.floor(minutos / 60)).padStart(2, '0');
  const resto = String(minutos % 60).padStart(2, '0');
  return `${horas}:${resto}`;
}

function gerarHorarios(data: string, abre: string, fecha: string, duracao: number) {
  const meiaNoite = new Date(`${data}T00:00:00${FUSO}`).getTime();
  const horarios: { inicio: string; rotulo: string }[] = [];

  for (let minuto = paraMinutos(abre); minuto + duracao <= paraMinutos(fecha); minuto += BLOCO_MINUTOS) {
    horarios.push({
      inicio: new Date(meiaNoite + minuto * MINUTO).toISOString(),
      rotulo: rotulo(minuto),
    });
  }

  return horarios;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get('data') ?? '';
  const ids = lerIds(searchParams.get('procedimentos') ?? '');

  if (!dataValida(data)) return recusar('Data inválida.');
  if (!idsValidos(ids)) return recusar('Escolha de 1 a 2 procedimentos.');

  const { data: procedimentos, error } = await supabaseAdmin
    .from('procedimentos')
    .select('id, duracao_minutos, valor')
    .in('id', ids)
    .eq('ativo', true);

  if (error || !procedimentos) return recusar('Procedimento inválido.');

  const algumInvalido =
    procedimentos.length !== ids.length || procedimentos.some((p) => !p.duracao_minutos);
  if (algumInvalido) return recusar('Procedimento inválido.');

  const duracaoTotal = soma(procedimentos.map((p) => p.duracao_minutos));
  const valorTotal = soma(procedimentos.map((p) => Number(p.valor ?? 0)));
  const duracaoEmBlocos = Math.ceil(duracaoTotal / BLOCO_MINUTOS) * BLOCO_MINUTOS;

  const { data: funcionamento, error: erroHorario } = await supabaseAdmin
    .from('horario_funcionamento')
    .select('abre, fecha')
    .eq('dia_semana', diaDaSemana(data))
    .eq('ativo', true)
    .maybeSingle();

  if (erroHorario) {
    return NextResponse.json(
      { erro: 'Não foi possível consultar o horário de funcionamento.' },
      { status: 500 }
    );
  }

  const horarios = funcionamento
    ? gerarHorarios(data, funcionamento.abre, funcionamento.fecha, duracaoEmBlocos)
    : [];

  return NextResponse.json({ data, duracaoMinutos: duracaoEmBlocos, valorTotal, horarios });
}