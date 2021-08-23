require("dotenv/config");
var aws=require('aws-sdk');

sendMail=(to,from,text,html,subject)=>{
    aws.config=process.env;
    var AWS_SES = new aws.SES();
    
    try {
        const info = AWS_SES.sendEmail({
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