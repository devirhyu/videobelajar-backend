const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.EMAIL_PORT || 2525,
  auth: {
    user: process.env.EMAIL_USER || 'dummy_user',
    pass: process.env.EMAIL_PASS || 'dummy_pass',
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    if (!process.env.EMAIL_USER) {
      console.log(`[SIMULASI EMAIL] Kepada: ${to} | Subjek: ${subject}`);
      return true;
    }

    const info = await transporter.sendMail({
      from: `"EduCourse App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log('Email terkirim: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Gagal mengirim email (simulasi aktif):', error.message);
    return true;
  }
};

module.exports = { sendEmail };