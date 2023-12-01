import nodeMailer from "nodemailer";
import dotenv from "dotenv";
// /helpers/email.js
// const nodeMailer = require("nodemailer");

dotenv.config();

export const sendEmailWithNodemailer = async (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: process.env.EMAIL_PASS, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message sent: ${info.response}`);
      return res.json({
        success: true,
      });
    })
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
