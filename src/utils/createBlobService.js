const fs = require("fs");
const path = require("path");
const { updateProjectDependencies } = require("./helper");

let dependencies = [];
// function to create Blob services------------------------------------------------->
function createBlobService(nodePath, blobServiceName, blobTemplatePath, backEndPath) {
    const contents = fs.readFileSync(`${blobTemplatePath}.js`, "utf-8");
    const servicePath = path.join(backEndPath, "utils", "blob");
    fs.mkdirSync(servicePath);
    fs.writeFile(
        `${servicePath}` + "/" + `${blobServiceName}` + ".js",
        contents,
        (err) => {
            if (err) throw err;
            // console.log("Blob service created successfully.");
        },
    );
    if (blobServiceName == "azure") {
        dependencies = [...dependencies, { name: "@azure/storage-blob", version: "^12.11.0" }];
    }
    if (blobServiceName == "aws-s3") {
        dependencies = [...dependencies, { name: "@aws-sdk/client-s3", version: "^3.179.0" }];
    }
    updateProjectDependencies(nodePath, dependencies);
}
module.exports = createBlobService;
