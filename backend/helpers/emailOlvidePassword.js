import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls:{
      rejectUnauthorized:false
    },
    dnsTimeout: 10000 // tiempo de espera 

  });

  const { email, nombre, token } = datos;

  // Enviar el email al usuario registrado
  const info = await transport.sendMail({
    from: "APV - Administrador de Paciente Veterinaria",
    to: email,
    subject: "Reestablece tu password",
    text: "Reestablece tu password",
    html: `
      <p>Hola, ${nombre}, Has solicitado cambiar tu password.</p>

      <p>Sigue el siguiente enlace para gerar el token:</p>
      <a href="${process.env.FRONTEND_URL}/olvidePassword/${token}">reestablecer password</a>

      <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>
    `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;
