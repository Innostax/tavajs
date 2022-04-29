var aws     = require('aws-sdk');
require("dotenv/config");

aws.config=process.env;

const sendMail=(to,from,text,html,subject)=>{
    aws.config=process.env;
    var ses = new aws.SES();

      var ses_mail = "From: 'AWS Tutorial Series' <" + from + ">\n";
      ses_mail = ses_mail + "To: " + to + "\n";
      ses_mail = ses_mail + "Subject: "+subject+"\n";
      ses_mail = ses_mail + "Content-Type:"+html+"\n\n";
      ses_mail = ses_mail + "Content-Type: "+text+"text/plain;\n";
     
      
      var params = {
          RawMessage: { Data: new Buffer(ses_mail) },
          Destinations: [to],
          Source: from 
      };
      
      ses.sendRawEmail(params, function(err, data) {
          if(err) {
              console.log(err);
          } 
          else {
              console.log(data);
              res.send(data);
          }           
      });
  
};
      








