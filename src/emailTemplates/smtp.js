const nodemailer = require('nodemailer');
require("dotenv").config();

const sendMail=(FROM_ADDRESS, to, html, subject, text)=>{
  const { USERNAME, PASSWORD, HOST } = process.env

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port:465,
    secure: true, // true for 465, false for other ports
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
        user: 'test@gmail.com', // generated ethereal user
        pass: '*****', // generated ethereal password
    },
    tls:{
        rejectUnAuthorized:true
    }
  })
  
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from :FROM_ADDRESS, // sender address
    to:to, // list of receivers
    subject:subject,
    text:text,
    html:html,
  }
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }
  
      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
  });
  }