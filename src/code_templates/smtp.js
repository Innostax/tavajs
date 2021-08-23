const nodemailer = require('nodemailer');
require("dotenv").config();

const sendMail=(FROM_ADDRESS, to, html, subject, text)=>{
  const { USERNAME, PASSWORD, HOST } = process.env

  const transporter = nodemailer.createTransport({
    host: HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: USERNAME,
      pass: PASSWORD,
    },
  })

  // send mail with defined transport object
  try {
    const info = transporter.sendMail({
      from :FROM_ADDRESS, // sender address
      to:to, // list of receivers
      subject:subject,
      text:text,
      html:html,
    })
    return info
  } catch (err) {
    console.log(err.response, 'error on sending mail.')
  }
}
