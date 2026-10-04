import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, telefone, email, procedimentoId, mensagem } = body;

  const { data: cliente, error: erroCliente } = await supabase
  .from('clientes')
  .insert({ nome, telefone, email })
  .select()
  .single();

  if (erroCliente) {
    console.error(' Erro ao criar cliente: ', erroCliente);
    return NextResponse.json({ erro: ' Não foi possivel salvar o cliente' }, { status: 500 });
  }

  console.log('Dados recebidos:', body);

  return NextResponse.json({ mensagem: 'Cliente criado com sucesso', cliente });
}