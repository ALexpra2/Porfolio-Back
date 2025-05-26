const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de ${name}`,
      html: `<p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Correo:</strong> ${email}</p>
             <p><strong>Mensaje:</strong><br/>${message}</p>`
    });

    res.status(200).send('Correo enviado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar el correo');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));