const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transport = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const sendEmail = async (from, to, subject, text) => {
  const msg = { from, to, subject, text };
  await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
  const from = process.env.EMAIL;
  const subject = "Reset password";
  const resetPasswordUrl = `http://localhost:5000/reset-password?token=${token}`;
  const text = `Dear user, To reset your password, please click on this link: ${resetPasswordUrl}`;
  await sendEmail(from, to, subject, text);
};

module.exports = {
  sendResetPasswordEmail,
};
