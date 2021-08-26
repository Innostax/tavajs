require("dotenv/config");
const sgMail=require('@sendgrid/mail');

sendMail=(to,from,text,html,subject)=>{
    sgMail.setApiKey=process.env.ApiKey;
    
    try {
        const info = sgMail.send({
          from :from, // sender address
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

