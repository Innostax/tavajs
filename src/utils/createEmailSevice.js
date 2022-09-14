const fs = require("fs");
const { updateProjectDependencies } = require("./helper");
const path = require("path");
//function to create email services
function createEmailSevice(
  emailServiceName,
  emailTemplatePath,
  nodePath,
  __dirname
) {
  let package = { name: "dotenv", version: "^10.0.0" };
  updateProjectDependencies(nodePath, package);

  let contents = fs.readFileSync(emailTemplatePath + ".js", "utf-8");
  let servicePath = path.join(nodePath, "utils", "email");
  fs.mkdirSync(servicePath);
  if (emailServiceName === "sendgrid") {
    fs.copyFileSync(
      __dirname + "/envTemplates/.sendgridEnv",
      servicePath + "/.env"
    );
    package = { name: "@sendgrid/mail", version: "^7.4.6" };
    updateProjectDependencies(nodePath, package);
  } else if (emailServiceName === "smtp") {
    fs.copyFileSync(
      __dirname + "/envTemplates/.smtpEnv",
      servicePath + "/.env"
    );
    package = { name: "nodemailer", version: "^6.6.3" };
    updateProjectDependencies(nodePath, package);
  } else {
    fs.copyFileSync(__dirname + "/envTemplates/.sesEnv", servicePath + "/.env");
    package = { name: "aws-sdk", version: "^2.971.0" };
    updateProjectDependencies(nodePath, package);
  }

  fs.writeFile(
    `${servicePath}` + "/" + `${emailServiceName}` + ".js",
    contents,
    function (err) {
      if (err) throw err;
    }
  );
}
  module.exports=createEmailSevice