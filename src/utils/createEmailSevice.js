const fs = require("fs");
const { updateProjectDependencies } = require("./helper");
const path = require("path");

//function to create email services
function createEmailSevice(
    emailServiceName,
    emailTemplatePath,
    nodePath,
) {
    const dependencies = [];
    dependencies.push({ name: "dotenv", version: "^10.0.0" });

    // Reading email template file
    const emailTemplateFile = fs.readFileSync(emailTemplatePath + ".js", "utf-8");

    // Email service file path
    let emailServiceFilePath = path.join(nodePath, "utils", "email");

    // Creating directory of email service
    fs.mkdirSync(emailServiceFilePath);

    const isSendGrid = emailServiceName === "sendgrid";
    const isSMTP = emailServiceName === "smtp";

    if (isSendGrid) {
        dependencies.push({ name: "@sendgrid/mail", version: "^7.4.6" });
    } else if (isSMTP) {
        dependencies.push({ name: "nodemailer", version: "^6.6.3" });
    } else {
        dependencies.push({ name: "aws-sdk", version: "^2.1224.0" });
    }

    // Updating dependencies in package json file
    updateProjectDependencies(nodePath, dependencies);

    // Writing email service file
    fs.writeFile(
        `${emailServiceFilePath}` + "/" + `${emailServiceName}` + ".js",
        emailTemplateFile,
        function (err) {
            if (err) throw err;
        }
    );
}
module.exports=createEmailSevice;