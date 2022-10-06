const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.AWS_REGION });

function sendMail({ to, from, subject, html, text }) {
    const params = {
        Destination: {
            ToAddresses: to,
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: html,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: text,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
        Source: from,
    };

    const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();
    sendPromise.then(function (data) {
        console.log(data.MessageId);
    })
        .catch(function (err) {
            console.error(err, err.stack);
        });
}

module.exports = {
    sendMail,
};
