const fs = require("fs");
const path = require("path");
const { updateProjectDependencies } = require("./helper");
const { DEPENDENCIES } = require("../TavaJsExecutors/dependencies");
const { EMAIL_SERVICES } = require("../TavaJsExecutors/constants");
const { SMTP, SENDGRID, AMAZON_SES } = EMAIL_SERVICES;

// function to create email services
const createEmailSevice = (
    emailServiceName,
    emailTemplatePath,
    nodePath,
) => {
    let dependencies = [];

    // Reading email template file
    const emailTemplateFile = fs.readFileSync(`${emailTemplatePath}.js`, "utf-8");

    // Email service file path
    const emailServiceFilePath = path.join(nodePath, "utils", "email");

    // Creating directory of email service
    fs.mkdirSync(emailServiceFilePath);

    const isSendGrid = emailServiceName === SENDGRID;
    const isSMTP = emailServiceName === SMTP;
    const isAmazonSes = emailServiceName === AMAZON_SES;

    if (isSendGrid) {
        dependencies = [ ...dependencies, ...DEPENDENCIES.EMAIL_SERVICES.SENDGRID ];
    } else if (isSMTP) {
        dependencies = [ ...dependencies, ...DEPENDENCIES.EMAIL_SERVICES.SMTP ]
    } else if (AMAZON_SES) {
        dependencies = [ ...dependencies, ...DEPENDENCIES.EMAIL_SERVICES.AMAZON_SES ];
    }

    // Updating dependencies in package json file
    updateProjectDependencies(nodePath, dependencies);

    // Writing email service file
    fs.writeFile(
        `${emailServiceFilePath}` + "/" + `${emailServiceName}` + ".js",
        emailTemplateFile,
        (err) => {
            if (err) throw err;
        },
    );
};

module.exports = createEmailSevice;
