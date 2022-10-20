const fs = require("fs");
const path = require("path");
const { updateProjectDependencies } = require("./helper");
const { DEPENDENCIES } = require("../TavaJsExecutors/dependencies");
const { BLOB_SERVICES } = require("../TavaJsExecutors/constants");
const { AZURE, AWS_S3 } = BLOB_SERVICES;

let dependencies = [];
// function to create Blob services------------------------------------------------->
const createBlobService = (nodePath, blobServiceName, blobTemplatePath, backEndPath) => {
    const isAzure = blobServiceName == AZURE;
    const isAwsS3 = blobServiceName == AWS_S3;
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
    if (isAzure) {
        dependencies = [...dependencies, ...DEPENDENCIES.BLOB_SERVICES.AZURE];
    }
    if (isAwsS3) {
        dependencies = [...dependencies, ...DEPENDENCIES.BLOB_SERVICES.AWS_S3];
    }
    updateProjectDependencies(nodePath, dependencies);
};

module.exports = createBlobService;
