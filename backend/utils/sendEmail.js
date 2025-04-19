const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Booking App" <no-reply@example.com>',
    to: email,
    subject,
    html,
  });
};

module.exports = sendEmail;
