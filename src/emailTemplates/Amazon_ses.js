const AWS = require('aws-sdk')

AWS.config.update({ region: process.env.AWS_REGION })

const params = {
    
	Destination: {
		CcAddresses: ['CC Reciever Email'],
		ToAddresses: ['Reciever Email'],
	},
	Message: {
		Body: {
			Html: {
				Charset: 'UTF-8',
				Data: 'Message',
			},
			Text: {
				Charset: 'UTF-8',
				Data: 'Message',
			},
		},
		Subject: {
			Charset: 'UTF-8',
			Data: 'Subject',
		},
	},
	Source: 'Sender Email',
	ReplyToAddresses: ['Sender Email'],
}

const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise()

async function sendMail(){
    try{
        const data = await sendPromise
        console.log(data.MessageId)
    }
    catch(err){
        console.error(err, err.stack)
    }
}

module.exports = {
	sendMail,
}
