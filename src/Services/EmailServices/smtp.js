const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (mailObj) => {
    const {
        from, recipients, subject, message,
    } = mailObj;

    const USERNAME = process.env.SMTP_USERNAME;
    const PASSWORD = process.env.SMTP_PASSWORD;
    const HOST = process.env.SMTP_HOST;
    try {
        const transporter = nodemailer.createTransport({
            host: HOST,
            port: 587,
            auth: {
                user: USERNAME,
                pass: PASSWORD,
            },
        });
        const mailStatus = await transporter.sendMail({
            from,
            to: recipients,
            subject,
            text: message,
        });

        console.log(`Message sent: ${mailStatus.messageId}`);
        return `Message sent: ${mailStatus.messageId}`;
    } catch (error) {
        console.error(error);
        throw new Error(
            `Something went wrong in the sendmail method. Error: ${error.message}`,
        );
    }
};

module.exports = {
    sendEmail,
};
