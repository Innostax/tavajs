const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendMail = () => {
    const msg = {
        to: "Change to your recipient",
        from: "Change to your sendgrid verified sender",
        subject: "enter mail subject here",
        text: "Enter mail Text",
        html: "Enter your html here",
    };
    sgMail
        .send(msg)
        .then(() => console.log("Email sent"))
        .catch((error) => console.error(error));
};
module.exports = { sendMail };

