import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import { enviarConfirmacao } from '../../lib/email';

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, telefone, email, procedimentoId, mensagem } = body;

  if(!nome.trim() || !telefone?.trim() || !email?.trim() || !procedimentoId) {
    return NextResponse.json(
      { erro: 'Preencha nome, telefone, e-mail e procedimento.'},
      { status: 400 }
    );
  }

  const { data: procedimento, error: erroProcedimento } = await supabase
    .from('procedimentos')
    .select('id, nome')
    .eq('id', procedimentoId)
    .maybeSingle();

  if (erroProcedimento || !procedimento) {
    return NextResponse.json(
      { erro: 'Procedimento não encontrado' },
      { status: 400 }
    );
  }

  const { data: cliente, error: erroCliente } = await supabase
  .from('clientes')
  .insert({ nome, telefone, email })
  .select()
  .single();

  if (erroCliente) {
    console.error(' Erro ao criar cliente: ', erroCliente);
    return NextResponse.json({ erro: ' Não foi possivel salvar o cliente' }, { status: 500 });
  }

  const { data: agendamento, error: erroAgendamento } = await supabase
    .from('agendamentos')
    .insert({
      cliente_id: cliente.id,
      procedimento_id: procedimentoId,
      mensagem,
      status: 'pendente',
    })
    .select()
    .single();

  if (erroAgendamento) {
    console.error('Erro ao criar agendamento: ', erroAgendamento);
    return NextResponse.json({ erro: 'Não foi possível salvar o agendamento' }, { status: 500 });
  }
  try {
  await enviarConfirmacao({
    nome,
    email,
    procedimento: procedimento.nome,
  });
} catch (erro) {
  console.error(
    'Erro ao enviar e-mail de confirmação:',
    erro instanceof Error ? erro.message : erro
  );
}

  return NextResponse.json({ mensagem: 'Agendamento criado com sucesso', cliente, agendamento },
    { status: 201 }
  );
}