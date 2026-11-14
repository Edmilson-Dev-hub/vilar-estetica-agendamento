import 'server-only';
import nodemailer from 'nodemailer';

const FUSO_CLINICA = 'America/Fortaleza';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  tls: {
    // Só use EMAIL_TLS_INSECURE=true no .env.local de desenvolvimento,
    // quando antivírus ou proxy interceptam a conexão. Nunca na Vercel.
    rejectUnauthorized: process.env.EMAIL_TLS_INSECURE !== 'true',
  },
});

type ProcedimentoEmail = { nome: string; valor: number };

type DadosConfirmacao = {
  nome: string;
  email: string;
  inicio: string; // ISO, em UTC
  fim: string; // ISO, em UTC
  procedimentos: ProcedimentoEmail[];
  valorTotal: number;
};

function escapar(texto: string) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function moeda(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function hora(iso: string) {
  return new Date(iso).toLocaleTimeString('pt-BR', {
    timeZone: FUSO_CLINICA,
    hour: '2-digit',
    minute: '2-digit',
  });
}

function dia(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    timeZone: FUSO_CLINICA,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export async function enviarConfirmacao(dados: DadosConfirmacao) {
  const primeiroNome = dados.nome.trim().split(' ')[0];
  const quando = `${dia(dados.inicio)}, das ${hora(dados.inicio)} às ${hora(dados.fim)}`;

  const linhasTexto = dados.procedimentos.map((p) => `- ${p.nome}: ${moeda(p.valor)}`).join('\n');

  const linhasHtml = dados.procedimentos
    .map(
      (p) => `
        <tr>
          <td style="padding: 6px 0;">${escapar(p.nome)}</td>
          <td style="padding: 6px 0; text-align: right;">${moeda(p.valor)}</td>
        </tr>`
    )
    .join('');

  await transporter.sendMail({
    from: `"VV Villar" <${process.env.EMAIL_USER}>`,
    to: dados.email,
    subject: 'Agendamento confirmado | VV Villar',
    text: [
      `Olá, ${primeiroNome}! Seu agendamento está confirmado.`,
      '',
      `Quando: ${quando}`,
      'Procedimentos:',
      linhasTexto,
      `Total: ${moeda(dados.valorTotal)}`,
      '',
      'Se precisar remarcar ou cancelar, entre em contato com a clínica.',
      'Equipe VV Villar',
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background-color: #f5efe6; color: #2a1a12;">
        <p style="font-size: 22px; letter-spacing: 3px; margin: 0 0 4px 0;">VV VILLAR</p>
        <p style="font-size: 11px; letter-spacing: 2px; color: #8a7460; margin: 0 0 28px 0;">ESTÉTICA FACIAL &amp; HARMONIZAÇÃO</p>
        <p style="font-size: 16px;">Olá, ${escapar(primeiroNome)}! Seu agendamento está <strong>confirmado</strong>.</p>
        <p style="font-size: 16px; line-height: 1.6;"><strong>Quando:</strong><br>${escapar(quando)}</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 16px; margin-top: 16px;">
          ${linhasHtml}
          <tr>
            <td style="padding: 10px 0 0 0; border-top: 1px solid #e8ddd0;"><strong>Total</strong></td>
            <td style="padding: 10px 0 0 0; border-top: 1px solid #e8ddd0; text-align: right;"><strong>${moeda(dados.valorTotal)}</strong></td>
          </tr>
        </table>
        <p style="font-size: 14px; line-height: 1.6; margin-top: 24px;">Se precisar remarcar ou cancelar, entre em contato com a clínica.</p>
        <p style="font-size: 14px; color: #8a7460; margin-top: 28px;">Equipe VV Villar</p>
      </div>
    `,
  });
}