import nodemailer from 'nodemailer';

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

type DadosConfirmacao = {
  nome: string;
  email: string;
  procedimento: string;
};

function escapar(texto: string) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function enviarConfirmacao({ nome, email, procedimento }: DadosConfirmacao) {
  const primeiroNome = nome.trim().split(' ')[0];

  await transporter.sendMail({
    from: `"VV Villar" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Recebemos seu pedido de agendamento | VV Villar',
    text: `Olá, ${primeiroNome}! Recebemos seu pedido de agendamento para ${procedimento}. Entraremos em contato em breve para confirmar data e horário. Equipe VV Villar.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background-color: #f5efe6; color: #2a1a12;">
        <p style="font-size: 22px; letter-spacing: 3px; margin: 0 0 4px 0;">VV VILLAR</p>
        <p style="font-size: 11px; letter-spacing: 2px; color: #8a7460; margin: 0 0 28px 0;">ESTÉTICA FACIAL &amp; HARMONIZAÇÃO</p>
        <p style="font-size: 16px;">Olá, ${escapar(primeiroNome)}!</p>
        <p style="font-size: 16px; line-height: 1.6;">
          Recebemos seu pedido de agendamento para <strong>${escapar(procedimento)}</strong>.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          Entraremos em contato em breve para confirmar data e horário.
        </p>
        <p style="font-size: 14px; color: #8a7460; margin-top: 28px;">Equipe VV Villar</p>
      </div>
    `,
  });
}