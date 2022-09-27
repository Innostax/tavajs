const fs = require("fs");
const path = require("path");
const { updateProjectDependencies } = require("./helper")
let dependencies = []
//function to create Blob services------------------------------------------------->
function createBlobService(nodePath, blobServiceName, blobTemplatePath, backEndPath) {
  let contents = fs.readFileSync(blobTemplatePath + ".js", "utf-8");
  let servicePath = path.join(backEndPath, "utils", "blob");
  fs.mkdirSync(servicePath);
  fs.writeFile(
    `${servicePath}` + "/" + `${blobServiceName}` + ".js",
    contents,
    function (err) {
      if (err) throw err;
      // console.log("Blob service created successfully.");
    }
  );
  if (blobServiceName == "azure") {
    dependencies = [...dependencies, { name: "@azure/storage-blob", version: "^12.11.0" }]
  }
  updateProjectDependencies(nodePath, dependencies);
}
module.exports = createBlobService;
